# Yggdrasil ERP — Demo Environment Runbook

**Last updated:** April 2026
**Owner:** Christopher Gaither
**VPS:** 5.161.101.211 (Hetzner, `cgaither`)

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Prerequisites](#2-prerequisites)
3. [Initial Deployment](#3-initial-deployment)
4. [Configuration](#4-configuration)
5. [Database Setup & Seed Data](#5-database-setup--seed-data)
6. [Starting the Demo Server](#6-starting-the-demo-server)
7. [Caddy Routing](#7-caddy-routing)
8. [Website Integration](#8-website-integration)
9. [Manually Provisioning Demo Users](#9-manually-provisioning-demo-users)
10. [Nightly Cleanup](#10-nightly-cleanup)
11. [Monitoring & Troubleshooting](#11-monitoring--troubleshooting)
12. [Updating the Demo](#12-updating-the-demo)
13. [Emergency Procedures](#13-emergency-procedures)

---

## 1. Architecture Overview

```
Prospect browser
    │
    ▼
mimirlabs.net/demo  ──►  /api/demo/request  ──►  Yggdrasil Server
(website container)       (provisions user)        (headless, port 8080)
    │                                                    │
    ▼                                                    ▼
Email w/ credentials                              PostgreSQL
(SendGrid)                                        (demo tenant)
    │                                                    │
    ▼                                                    ▼
erp.mimirlabs.net   ──►  Yggdrasil Web App  ──►  Yggdrasil Server
(or demo.mimirlabs.net)   (Next.js, port 3000)    (API, port 8080)
```

**Components on the VPS:**
- Yggdrasil Server (C++/Qt, headless mode, Docker container)
- Yggdrasil Web App (Next.js, Docker container)
- PostgreSQL (shared instance or dedicated demo DB)
- Caddy (reverse proxy, TLS termination)
- Nightly cron (demo_cleanup.sh)

**Shared tenant:** All demo users share one tenant (`Apex Precision Manufacturing`, tenant_id: `11111111-demo-0000-0000-000000000001`). Each user gets their own credentials with a 72-hour expiry. Seed data resets nightly.

**Throttling:** Demo users are rate-limited (60 req/min), concurrency-capped (2 simultaneous), and query-timeout-limited (5 seconds). Non-demo traffic is unaffected.

---

## 2. Prerequisites

**On the VPS:**
- Docker + Docker Compose
- PostgreSQL 13+ (existing instance or in Docker)
- Caddy (existing, handles TLS)
- Git access to the yggdrasil repo

**Environment variables needed:**

| Variable | Purpose | Example |
|----------|---------|---------|
| `YGG_DB_HOST` | PostgreSQL host | `localhost` or `ygg-mesh-postgres` |
| `YGG_DB_PORT` | PostgreSQL port | `5432` |
| `YGG_DB_NAME` | Database name | `yggdrasil_demo` |
| `YGG_DB_USER` | Database user | `ygg_demo` |
| `YGG_DB_PASSWORD` | Database password | (generate a strong one) |
| `YGG_JWT_SECRET` | Persistent JWT secret | (generate: `openssl rand -hex 32`) |
| `YGG_ENCRYPTION_KEY` | Persistent encryption key | (generate: `openssl rand -hex 32`) |
| `YGG_CORS_ORIGINS` | Allowed origins | `https://demo.mimirlabs.net` |
| `YGG_OPERATOR_EMAIL` | Headless operator email | `demo-operator@mimirlabs.net` |
| `YGG_OPERATOR_PASSWORD` | Headless operator password | (the seeded operator's password) |
| `YGG_FEDERATION_MODE` | B2B federation | `none` |
| `DEMO_SERVER_URL` | For website container | `http://ygg-demo-server:8080` |

---

## 3. Initial Deployment

### 3.1 Clone the repo (if not already present)

```bash
ssh cgaither@5.161.101.211
cd ~/yggdrasil
git pull origin claude/v0.5.0a
```

### 3.2 Create the demo database

```bash
# If using the existing PostgreSQL instance:
sudo -u postgres psql -c "CREATE DATABASE yggdrasil_demo OWNER ygg_demo;"

# Or if using Docker PostgreSQL:
docker exec ygg-mesh-postgres psql -U yggdrasil_mesh -c \
  "CREATE DATABASE yggdrasil_demo;"
```

### 3.3 Load the base schema

```bash
psql -h localhost -U ygg_demo -d yggdrasil_demo \
  -f ~/yggdrasil/database/schema/yggdrasil_complete_schema.sql
```

### 3.4 Build the server Docker image

```bash
cd ~/yggdrasil/server
docker build -t ygg-demo-server .
```

### 3.5 Build the web app Docker image

```bash
cd ~/yggdrasil/web-app
docker build -t ygg-demo-webapp \
  --build-arg NEXT_PUBLIC_API_URL=https://demo-api.mimirlabs.net \
  .
```

---

## 4. Configuration

### 4.1 Create the demo .env file

```bash
cat > ~/yggdrasil/infra/demo/.env << 'EOF'
YGG_DB_HOST=localhost
YGG_DB_PORT=5432
YGG_DB_NAME=yggdrasil_demo
YGG_DB_USER=ygg_demo
YGG_DB_PASSWORD=CHANGE_ME_GENERATE_A_STRONG_PASSWORD
YGG_JWT_SECRET=CHANGE_ME_RUN_openssl_rand_hex_32
YGG_ENCRYPTION_KEY=CHANGE_ME_RUN_openssl_rand_hex_32
YGG_CORS_ORIGINS=https://demo.mimirlabs.net
YGG_HTTP_PORT=8080
YGG_WS_PORT=8081
YGG_OPERATOR_EMAIL=demo-operator@mimirlabs.net
YGG_OPERATOR_PASSWORD=CHANGE_ME_SET_AFTER_SEEDING
YGG_FEDERATION_MODE=none
YGG_LOG_PATH=/var/log/yggdrasil/
YGG_STORAGE_PATH=/app/uploads
EOF
```

### 4.2 Generate secrets

```bash
# Generate and paste into .env:
echo "JWT Secret:     $(openssl rand -hex 32)"
echo "Encryption Key: $(openssl rand -hex 32)"
echo "DB Password:    $(openssl rand -base64 24)"
```

---

## 5. Database Setup & Seed Data

### 5.1 Run migrations

The server runs migrations automatically on startup. Alternatively, run them manually:

```bash
# If you have psql access:
for f in ~/yggdrasil/database/migrations/*.sql; do
  psql -h localhost -U ygg_demo -d yggdrasil_demo -f "$f" 2>&1 | tail -1
done
```

### 5.2 Seed the demo tenant

```bash
psql -h localhost -U ygg_demo -d yggdrasil_demo \
  -f ~/yggdrasil/database/seeds/demo_tenant_seed.sql
```

This creates:
- **Tenant:** Apex Precision Manufacturing
- **Operator:** demo-operator@mimirlabs.net (DevAdmin)
- **4 customers:** Summit Precision, Nordic Manufacturing, Cascade Components, Pacific Alloys
- **6 contacts** across customers
- **2 suppliers:** SteelCo Raw Materials, SealMax Components
- **10 parts** (bearings, seals, housings, shafts, assemblies, motors)
- **2 work centers** (CNC Mill, Assembly Station)
- **2 work orders** (one in progress, one planned)
- **5 sales orders** (draft, confirmed, shipped, invoiced, closed)
- **3 purchase orders** (open, received, closed)
- **10 inventory records** across 2 warehouses
- **5 GL accounts** + 2 invoices
- **1 NCR** linked to a work order
- **2 service tickets**
- **3 employees** in 2 departments

### 5.3 Set the operator password

The seed script creates the operator with a placeholder hash. Set the real password:

```bash
# Generate a password hash (use the server's hash function or:)
OPERATOR_PASS="YourSecureOperatorPassword123!"

# Update the user record:
psql -h localhost -U ygg_demo -d yggdrasil_demo -c "
  UPDATE users SET password_hash = crypt('${OPERATOR_PASS}', gen_salt('bf'))
  WHERE email = 'demo-operator@mimirlabs.net';"

# Then update .env with the same password:
# YGG_OPERATOR_PASSWORD=YourSecureOperatorPassword123!
```

### 5.4 Verify the seed

```bash
psql -h localhost -U ygg_demo -d yggdrasil_demo -c "
  SELECT 'tenants' AS tbl, count(*) FROM tenants
  UNION ALL SELECT 'crm_entities', count(*) FROM crm_entities
  UNION ALL SELECT 'plm_parts', count(*) FROM plm_parts
  UNION ALL SELECT 'sales_orders', count(*) FROM sales_orders
  UNION ALL SELECT 'manufacturing_work_orders', count(*) FROM manufacturing_work_orders
  UNION ALL SELECT 'logistics_inventory', count(*) FROM logistics_inventory
  UNION ALL SELECT 'finance_invoices', count(*) FROM finance_invoices;"
```

Expected: 1 tenant, 6 entities, 10 parts, 5 orders, 2 WOs, 10 inventory, 2 invoices.

---

## 6. Starting the Demo Server

### 6.1 Docker run (standalone)

```bash
docker run -d \
  --name ygg-demo-server \
  --restart unless-stopped \
  --env-file ~/yggdrasil/infra/demo/.env \
  -p 127.0.0.1:8080:8080 \
  -p 127.0.0.1:8081:8081 \
  -v /var/log/yggdrasil/demo:/var/log/yggdrasil \
  -v /var/data/yggdrasil/demo/uploads:/app/uploads \
  ygg-demo-server \
  ./YggdrasilServer --headless
```

### 6.2 Docker Compose (if using a compose file)

```yaml
# ~/yggdrasil/infra/demo/docker-compose.yml
services:
  demo-server:
    image: ygg-demo-server
    container_name: ygg-demo-server
    restart: unless-stopped
    command: ["./YggdrasilServer", "--headless"]
    env_file: .env
    ports:
      - "127.0.0.1:8080:8080"
      - "127.0.0.1:8081:8081"
    volumes:
      - /var/log/yggdrasil/demo:/var/log/yggdrasil
      - /var/data/yggdrasil/demo/uploads:/app/uploads

  demo-webapp:
    image: ygg-demo-webapp
    container_name: ygg-demo-webapp
    restart: unless-stopped
    environment:
      - API_URL=http://demo-server:8080
      - WS_URL=ws://demo-server:8081
    ports:
      - "127.0.0.1:3001:3000"
```

### 6.3 Verify the server is running

```bash
curl http://localhost:8080/health
# Expected: {"status":"ok","database":"connected",...}

curl http://localhost:8080/api/auth/login \
  -X POST -H "Content-Type: application/json" \
  -d '{"email":"demo-operator@mimirlabs.net","password":"YourPassword"}'
# Expected: {"token":"...","user":{...}}
```

---

## 7. Caddy Routing

Add to the Caddyfile (or Caddy config JSON) on the VPS:

```
demo-api.mimirlabs.net {
    reverse_proxy localhost:8080
}

demo.mimirlabs.net {
    reverse_proxy localhost:3001
}
```

Then reload Caddy:

```bash
sudo systemctl reload caddy
# or
docker exec caddy caddy reload --config /etc/caddy/Caddyfile
```

**Cloudflare:** Add DNS records for `demo-api.mimirlabs.net` and `demo.mimirlabs.net` pointing to the VPS IP (5.161.101.211), proxied through Cloudflare.

---

## 8. Website Integration

The mimirlabs.net website needs to know where the demo server is.

### 8.1 Add env var to the website service

In `~/yggdrasil/infra/vps/docker-compose.yml`, add to the website service's `environment:` section:

```yaml
- DEMO_SERVER_URL=http://ygg-demo-server:8080
```

Or if the demo server is on the same host but different container network:

```yaml
- DEMO_SERVER_URL=http://localhost:8080
```

### 8.2 Add "Request Demo" to website navigation

Add a link in the website's header/nav to `/demo`. This page is already built at `src/app/(marketing)/demo/page.tsx`.

### 8.3 Rebuild the website

```bash
cd ~/yggdrasil/infra/vps
docker compose up -d --build website
```

---

## 9. Manually Provisioning Demo Users

### 9.1 Via the API (preferred)

```bash
curl -X POST http://localhost:8080/api/demo/provision \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "email": "john@example.com",
    "company": "Acme Corp",
    "role": "VP Operations"
  }'
```

Response:

```json
{
  "success": true,
  "username": "demo_john_a7b3",
  "password": "Kj7mXp2qRt4v",
  "expires_at": "2026-04-12T15:30:00Z",
  "login_url": "https://demo.mimirlabs.net"
}
```

Send the credentials to the prospect manually (email, Slack, however you're communicating).

### 9.2 Via direct SQL (emergency)

```bash
psql -h localhost -U ygg_demo -d yggdrasil_demo << 'SQL'
INSERT INTO users (
  tenant_id, username, email, password_hash,
  first_name, last_name, role, is_active, demo_expires_at
) VALUES (
  '11111111-demo-0000-0000-000000000001',
  'demo_manual_001',
  'prospect@company.com',
  crypt('TempPassword123!', gen_salt('bf')),
  'Jane', 'Doe',
  'demo', true,
  NOW() + interval '72 hours'
);
SQL
```

Then send `demo_manual_001` / `TempPassword123!` to the prospect.

### 9.3 Extending a demo user's expiry

```bash
psql -h localhost -U ygg_demo -d yggdrasil_demo -c "
  UPDATE users SET demo_expires_at = NOW() + interval '72 hours'
  WHERE email = 'prospect@company.com' AND role = 'demo';"
```

### 9.4 Revoking a demo user immediately

```bash
psql -h localhost -U ygg_demo -d yggdrasil_demo -c "
  UPDATE users SET demo_expires_at = NOW(), is_active = false
  WHERE email = 'prospect@company.com' AND role = 'demo';"
```

---

## 10. Nightly Cleanup

### 10.1 Install the cron job

```bash
chmod +x ~/yggdrasil/database/seeds/demo_cleanup.sh

# Add to crontab:
crontab -e
# Add this line:
0 3 * * * /home/cgaither/yggdrasil/database/seeds/demo_cleanup.sh >> /var/log/yggdrasil/demo-cleanup.log 2>&1
```

### 10.2 What the cleanup does

1. Deletes all expired demo users (`role='demo' AND demo_expires_at < NOW()`)
2. Deletes all records created by demo users across 28 tables (preserving seed data)
3. Re-runs the seed script to restore any modified seed records
4. Logs a summary

### 10.3 Running cleanup manually

```bash
~/yggdrasil/database/seeds/demo_cleanup.sh
```

### 10.4 Checking cleanup history

```bash
tail -50 /var/log/yggdrasil/demo-cleanup.log
```

---

## 11. Monitoring & Troubleshooting

### 11.1 Check server health

```bash
curl http://localhost:8080/health
```

### 11.2 Check server logs

```bash
tail -100 /var/log/yggdrasil/demo/app.log
```

### 11.3 Check active demo users

```bash
psql -h localhost -U ygg_demo -d yggdrasil_demo -c "
  SELECT username, email, demo_expires_at,
         CASE WHEN demo_expires_at > NOW() THEN 'active' ELSE 'expired' END AS status
  FROM users
  WHERE tenant_id = '11111111-demo-0000-0000-000000000001'
    AND role = 'demo'
  ORDER BY demo_expires_at DESC;"
```

### 11.4 Check demo engagement

```bash
# Via API (requires admin token):
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  http://localhost:8080/api/demo/engagement/$USER_ID
```

### 11.5 Common issues

| Symptom | Cause | Fix |
|---------|-------|-----|
| Server won't start | Missing server.conf or bad credentials | Check `docker logs ygg-demo-server` |
| "Demo expired" on login | User's 72h window passed | Extend expiry or provision new user |
| 429 Too Many Requests | Demo throttle hit | Wait 1 minute (rate limit) or reduce parallel requests |
| Seed data missing/corrupted | Demo user modified seed records | Run cleanup script manually |
| Can't provision users | Rate limit on provisioning endpoint | Max 10/hour per IP — wait or provision via SQL |
| Queries timing out | Demo 5-second timeout on expensive query | Expected behavior — queries are capped at 5s |

### 11.6 Container management

```bash
# Restart the demo server:
docker restart ygg-demo-server

# View container resource usage:
docker stats ygg-demo-server ygg-demo-webapp

# Shell into the server container:
docker exec -it ygg-demo-server /bin/bash

# Rebuild from latest code:
cd ~/yggdrasil/server
git pull
docker build -t ygg-demo-server .
docker compose -f ~/yggdrasil/infra/demo/docker-compose.yml up -d
```

---

## 12. Updating the Demo

When the codebase is updated and you want the demo to reflect the changes:

### 12.1 Pull latest code

```bash
cd ~/yggdrasil
git pull origin claude/v0.5.0a
```

### 12.2 Rebuild and redeploy

```bash
# Server:
cd ~/yggdrasil/server
docker build -t ygg-demo-server .
docker stop ygg-demo-server && docker rm ygg-demo-server
# Re-run the docker run command from section 6.1

# Web app:
cd ~/yggdrasil/web-app
docker build -t ygg-demo-webapp \
  --build-arg NEXT_PUBLIC_API_URL=https://demo-api.mimirlabs.net .
docker stop ygg-demo-webapp && docker rm ygg-demo-webapp
# Re-run or use docker-compose up -d
```

### 12.3 Run new migrations

New migrations run automatically on server startup (headless mode runs `MigrationRunner::runAll()`). If you need to run them manually:

```bash
for f in ~/yggdrasil/database/migrations/*.sql; do
  psql -h localhost -U ygg_demo -d yggdrasil_demo -f "$f" 2>&1 | tail -1
done
```

### 12.4 Update seed data

If the seed script was updated:

```bash
~/yggdrasil/database/seeds/demo_cleanup.sh
```

This cleans and re-seeds in one step.

---

## 13. Emergency Procedures

### 13.1 Demo server is consuming too many resources

```bash
# Check resource usage:
docker stats ygg-demo-server

# If CPU/memory is excessive, restart:
docker restart ygg-demo-server

# If a specific demo user is abusing the system, revoke immediately:
psql -h localhost -U ygg_demo -d yggdrasil_demo -c "
  UPDATE users SET is_active = false, demo_expires_at = NOW()
  WHERE email = 'abuser@example.com';"
```

### 13.2 Demo database is corrupted

```bash
# Nuclear option: drop and recreate
psql -h localhost -U ygg_demo -c "DROP DATABASE yggdrasil_demo;"
psql -h localhost -U ygg_demo -c "CREATE DATABASE yggdrasil_demo;"
psql -h localhost -U ygg_demo -d yggdrasil_demo \
  -f ~/yggdrasil/database/schema/yggdrasil_complete_schema.sql

# Run migrations:
docker restart ygg-demo-server  # auto-runs migrations

# Re-seed:
psql -h localhost -U ygg_demo -d yggdrasil_demo \
  -f ~/yggdrasil/database/seeds/demo_tenant_seed.sql
```

### 13.3 Shutting down the demo entirely

```bash
docker stop ygg-demo-server ygg-demo-webapp
# Remove Caddy routes for demo.mimirlabs.net / demo-api.mimirlabs.net
# Remove the /demo page link from the website navigation
```

### 13.4 All demo users need to be kicked immediately

```bash
psql -h localhost -U ygg_demo -d yggdrasil_demo -c "
  UPDATE users SET is_active = false, demo_expires_at = NOW()
  WHERE role = 'demo';"
# Their next API call will get 401
```

---

## Appendix: File Locations

| File | Purpose |
|------|---------|
| `database/seeds/demo_tenant_seed.sql` | Seed data (Apex Precision Mfg) |
| `database/seeds/demo_cleanup.sh` | Nightly cleanup + re-seed |
| `database/migrations/095_demo_user_expiry.sql` | Adds demo_expires_at column |
| `server/src/routes/DemoRoutes.cpp` | Provisioning + engagement endpoints |
| `server/src/middleware/DemoThrottle.cpp` | Rate limit + timeout for demo users |
| `server/config/server.conf` | Server configuration (template) |
| `server/docker-entrypoint.sh` | Env → config generator for Docker |
| `web-app/components/shared/DemoBanner.tsx` | Demo countdown banner |
| `mimirlabs/website/src/app/(marketing)/demo/page.tsx` | Public demo request page |
| `mimirlabs/website/src/app/api/demo/request/route.ts` | Demo request API route |

---

*Mimir Labs — Internal Operations*
