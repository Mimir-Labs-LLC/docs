# Environment Management — Dev, Staging, Production & Tenant Isolation

**Document Owner:** Mimir Labs DevOps/SRE
**Last Updated:** 2026-03-14

---

## 1. Environment Overview

| Environment | Purpose | Data | Access | Refresh Cadence |
|-------------|---------|------|--------|-----------------|
| **Production** | Live customer workloads | Real customer data | Restricted (SRE + on-call L3) | N/A (primary) |
| **Staging** | Release validation, integration testing | Anonymized production mirror | Engineering team | Weekly (automated) |
| **QA** | Automated test suites, manual QA | Seed data + test fixtures | Engineering + QA | Per CI run |
| **Development** | Local development, feature branches | Local seed data | Individual developers | On demand |
| **Sandbox** | Customer training, demos | Demo Corp sample data | Customer admins (isolated) | Nightly reset |

---

## 2. Production Environment

### 2.1 Architecture

```
                    ┌─────────────┐
                    │  Load       │
                    │  Balancer   │
                    │  (Nginx)    │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
        ┌─────┴─────┐ ┌───┴─────┐ ┌───┴───────┐
        │ Yggdrasil │ │ Web App │ │ WebSocket │
        │ Server    │ │ (Next)  │ │ (:8081)   │
        │ (:8080)   │ │ (:3000) │ │           │
        └─────┬─────┘ └───┬─────┘ └───┬───────┘
              │            │            │
              └────────────┼────────────┘
                           │
                    ┌──────┴──────┐
                    │ PostgreSQL  │
                    │ Primary     │──── Streaming Replication ──── Replica
                    │ (:5432)     │
                    └──────┬──────┘
                           │
                    ┌──────┴──────┐
                    │  Redpanda   │
                    │  Broker     │
                    │  (:9092)    │
                    └─────────────┘
```

### 2.2 High Availability

| Component | HA Strategy | Failover |
|-----------|-------------|----------|
| **Server** | Multiple instances behind load balancer (future) | LB health check removes unhealthy instance |
| **Database** | Primary + streaming replica | Manual failover (promote replica); future: automatic with Patroni |
| **Web App** | PM2 cluster mode (multiple Node.js workers) | PM2 auto-restart on crash |
| **Redpanda** | Single broker (startup); 3-node cluster (scale) | Quorum-based (at 3 nodes) |
| **Load Balancer** | Nginx with systemd auto-restart | DNS failover to secondary (future) |

### 2.3 Backup Schedule

| What | Method | Frequency | Retention | Storage |
|------|--------|-----------|-----------|---------|
| Full database | `pg_dump -Fc` | Daily 2am ET | 30 days | Off-site (S3 or equivalent) |
| WAL archives | Continuous archiving | Continuous | 7 days | Same as above |
| Server config | Git-tracked | On change | Unlimited (git history) |
| Web app build | Git tag + npm lockfile | On release | Unlimited (git tags) |
| File attachments | Filesystem backup | Daily 3am ET | 30 days |

### 2.4 Disaster Recovery

| Scenario | RPO | RTO | Procedure |
|----------|-----|-----|-----------|
| Database corruption | < 5 minutes (PITR) | 1-2 hours | PITR from WAL archives |
| Server hardware failure | < 24 hours (daily backup) | 2-4 hours | Restore backup on new hardware |
| Full site loss | < 24 hours | 4-8 hours | Restore from off-site backups on new infrastructure |
| Ransomware | < 24 hours | 4-8 hours | Restore from immutable off-site backups |

**DR test cadence:** Quarterly — restore production backup to staging and verify data integrity.

---

## 3. Staging Environment

### 3.1 Configuration

- **Mirror of production** — same OS, same server version, same database version
- **Reduced resources** — fewer CPU/RAM (cost savings), acceptable for validation
- **URL:** `staging.yggdrasil.internal` (not publicly accessible)

### 3.2 Data Refresh

Weekly automated refresh from production:

```bash
# 1. Dump production (anonymized)
pg_dump -Fc -h prod-db -U yggdrasil_user -d yggdrasil -f /tmp/staging_refresh.dump

# 2. Anonymize sensitive data
psql -d staging_yggdrasil -c "
  UPDATE users SET email = 'user' || user_id || '@example.com', password_hash = 'REDACTED';
  UPDATE crm_entities SET phone = '555-0000', email = name || '@example.com' WHERE email IS NOT NULL;
  UPDATE hr_employees SET birth_date = '1990-01-01', ssn = NULL;
"

# 3. Restore to staging
pg_restore -h staging-db -U yggdrasil_user -d staging_yggdrasil --clean --if-exists /tmp/staging_refresh.dump
```

### 3.3 Usage Rules

- **No customer data in Slack/email** — staging has anonymized data but treat with care
- **Deploy before production** — all releases soak on staging for 24h minimum
- **Do not use for development** — staging is for validation only
- **Migration testing** — run new migrations on staging first to catch issues

---

## 4. Development / QA Environments

### 4.1 Local Development

```bash
# Developer setup
createdb yggdrasil_dev
psql -d yggdrasil_dev -f database/schema/yggdrasil_complete_schema.sql
cd server/build && cmake .. -DCMAKE_BUILD_TYPE=Debug && make -j$(nproc)
./YggdrasilServer  # Uses server.conf (local settings)
cd web-app && npm install && npm run dev
```

**Each developer runs:**
- Local PostgreSQL instance (or shared dev DB)
- Local server build
- Local web-app dev server
- Desktop client connected to local server

### 4.2 CI/CD Test Environments

| Environment | Lifecycle | Database | Purpose |
|-------------|-----------|----------|---------|
| CI container | Per-pipeline run | Fresh schema + seed data | Unit tests, lint, type-check |
| PR preview (future) | Per-PR, auto-destroyed | Ephemeral PostgreSQL | Feature preview for reviewers |

### 4.3 QA Environment

- Persistent environment for manual QA testing
- Reset to clean state on demand (seed data reload)
- Accessible to QA team at `qa.yggdrasil.internal`

---

## 5. Tenant Isolation

### 5.1 Multi-Tenancy Model

Yggdrasil uses **shared database, shared schema** multi-tenancy:
- Every table with customer data has a `tenant_id UUID` column
- All queries filter by `tenant_id` — enforced by server middleware
- No Row Level Security (RLS) at database level currently — isolation is application-enforced

### 5.2 Tenant Provisioning

```
1. Create tenant record in `tenants` table (tenant_id, name, domain, subscription_tier)
2. Create admin user in `users` table (linked to tenant_id)
3. Configure module access in `tenant_modules` table
4. Set subscription tier (Standard/Premium/Enterprise)
5. Send welcome email with admin credentials
6. Log provisioning event to audit_log
```

**Automated provisioning:** Portal onboarding wizard (`/portal/onboarding`) handles steps 1-5.

### 5.3 Tenant Deprovisioning

**Soft delete (default):**
1. Set `tenants.is_active = false`
2. Revoke all user sessions (JWT blacklist)
3. Data retained for 90 days (compliance + recovery window)
4. After 90 days: hard delete option available

**Hard delete (by request or after retention period):**
1. Delete all rows where `tenant_id = <target>` across all tables
2. Delete tenant record
3. Delete file attachments from storage
4. Log deletion event (retained in audit_log for compliance)

### 5.4 Tenant-Specific Configuration

| Setting | Scope | Storage |
|---------|-------|---------|
| Module activation | Per-tenant | `tenant_modules` table |
| Approval workflows | Per-tenant | `approval_rules` table |
| Custom fields (future) | Per-tenant | `tenant_custom_fields` table |
| Branding / logo (future) | Per-tenant | `tenant_settings` table |
| API rate limits | Per-tenant (by tier) | Server middleware config |

### 5.5 Tenant Data Boundaries

**Enforced:**
- Every API endpoint validates `tenant_id` from JWT matches request data
- List endpoints auto-filter by tenant_id (no cross-tenant data leakage)
- Audit log entries include tenant_id for traceability

**Verified:**
- Quarterly security audit: test cross-tenant access attempts
- Integration tests: create records in tenant A, verify invisible from tenant B

---

## 6. Secrets Management

### 6.1 Current Approach

| Secret | Storage | Rotation |
|--------|---------|----------|
| Database credentials | `server.conf` (file permissions 600) | On compromise or quarterly |
| JWT secret | `server.conf` | On compromise or annually |
| API keys (external) | `server.conf` or environment variables | Per vendor policy |
| TLS certificates | `/etc/ssl/` (Let's Encrypt) | Auto-renewed (certbot) |
| Jira API token | Environment variable | On compromise or annually |

### 6.2 Target State (HashiCorp Vault)

Migration to Vault for centralized secrets management:

| Feature | Benefit |
|---------|---------|
| Dynamic database credentials | Auto-rotating, per-instance credentials |
| Secret versioning | Audit trail of all secret changes |
| Access policies | Per-service, per-environment access control |
| Auto-rotation | Scheduled rotation without downtime |
| Encryption as a service | Transit secrets engine for field-level encryption |

**Implementation priority:** After 50 tenants (when secrets management complexity justifies Vault overhead).

---

## 7. Infrastructure as Code

### 7.1 Current State

| Component | IaC Status | Tool |
|-----------|-----------|------|
| CI/CD pipeline | Codified | GitHub Actions (`.github/workflows/ci.yml`) |
| Database schema | Codified | SQL migrations (`database/migrations/`) |
| Server config | Version-controlled | `server/config/server.conf` in git |
| Infrastructure | Manual | Server provisioned manually |

### 7.2 Target State (Terraform + Ansible)

```
infrastructure/
├── terraform/
│   ├── main.tf           # VPS provisioning (Hetzner/DO/AWS)
│   ├── database.tf       # PostgreSQL instance
│   ├── networking.tf     # VPC, firewall rules, DNS
│   ├── storage.tf        # Backup storage (S3-compatible)
│   └── variables.tf      # Environment-specific variables
├── ansible/
│   ├── playbooks/
│   │   ├── server.yml    # YggdrasilServer deployment
│   │   ├── web.yml       # Next.js web app deployment
│   │   ├── database.yml  # PostgreSQL setup + replication
│   │   └── monitoring.yml# Grafana + Prometheus
│   ├── roles/
│   │   ├── common/       # Base packages, users, firewall
│   │   ├── postgresql/   # DB install, config, backup
│   │   ├── yggdrasil/    # Server binary, service file, config
│   │   └── nginx/        # Reverse proxy, TLS, rate limiting
│   └── inventory/
│       ├── production    # Production hosts
│       └── staging       # Staging hosts
└── README.md
```

**Implementation priority:** After 25 tenants (when manual provisioning becomes bottleneck).

---

## 8. Monitoring & Alerting

| Tool | Purpose | Environment |
|------|---------|-------------|
| **Grafana** | Dashboards (API latency, error rate, DB connections, disk) | Production, Staging |
| **Prometheus** | Metrics collection | Production, Staging |
| **PagerDuty** | Alert routing, on-call scheduling | Production only |
| **Server /metrics** | Application metrics endpoint | All |
| **Server /health** | Health check endpoint | All |
| **PostgreSQL pg_stat** | Database performance views | All |

### Key Dashboards

| Dashboard | Metrics | Alert Threshold |
|-----------|---------|-----------------|
| API Health | Request rate, error rate, p95 latency | Error rate > 5%, latency p95 > 10s |
| Database | Connections, query time, replication lag, disk | Connections > 90%, disk > 80% |
| Tenant Activity | Active tenants, requests per tenant, storage per tenant | Unusual spikes |
| Event Streaming | Redpanda consumer lag, message throughput | Lag > 10K for 10min |

---

## 9. Related Documents

- [Release Management](release-management.md) — Deployment pipeline through environments
- [On-Call Rotation](on-call-rotation.md) — Production incident response
- [Operational Runbooks](runbooks/) — Per-component troubleshooting
- [SLA Framework](sla-framework.md) — Production availability targets
