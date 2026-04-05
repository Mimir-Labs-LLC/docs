# Business Continuity and Disaster Recovery Plan

**Mimir Labs — Yggdrasil ERP**

| Field | Value |
|-------|-------|
| Version | 1.0 |
| Effective date | 2026-03-01 |
| Owner | CTO, Mimir Labs |
| Review cycle | Annual (or after any DR invocation) |
| Classification | Internal |

---

## 1. Purpose

This plan ensures that Mimir Labs can restore Yggdrasil ERP services and tenant data within defined recovery targets after a disruptive event — whether infrastructure failure, data loss, natural disaster, or cyberattack.

## 2. Scope

Covers all production Yggdrasil ERP components:

- Tenant-site deployments (server, desktop client, web app, PostgreSQL)
- Central VPS infrastructure (Redpanda broker, mesh PostgreSQL, Cloudflare tunnel)
- Go sidecar tunnel endpoints at each tenant site
- Supporting services (DNS, secrets vault, CI/CD)

## 3. Recovery Objectives

| Component | RPO (max data loss) | RTO (max downtime) | Justification |
|-----------|----|----|---------------|
| Tenant PostgreSQL database | 24 hours | 4 hours | Daily backups; ERP users can tolerate a business-day gap if restore is fast |
| Central Redpanda broker | 0 (event replay) | 2 hours | Events are replayed from tenant databases; broker is reconstructible |
| Central mesh PostgreSQL | 24 hours | 4 hours | Daily backups on VPS |
| Cloudflare tunnels | N/A (stateless) | 1 hour | Recreate tunnel from token; no data at rest |
| Yggdrasil ERP server binary | N/A (reproducible) | 1 hour | Rebuild from Git; CI produces artifacts |
| Web application | N/A (reproducible) | 1 hour | Rebuild from Git; static deploy |

## 4. Backup Strategy

### 4.1 Database Backups

| Parameter | Value |
|-----------|-------|
| Tool | `pg_dump` via `backup-db.sh` |
| Frequency | Daily at 03:00 UTC (systemd timer `ygg-backup.timer`) |
| Retention | 14 days on local disk |
| Encryption | AES-256 (per [Encryption Policy](encryption-policy.md)) |
| Integrity check | SHA-256 checksum generated alongside each archive |
| Off-site copy | Replicated to a geographically separate storage target within 1 hour of creation |
| Format | Compressed SQL dump (`pg_dump --no-owner --no-privileges | gzip`) |

### 4.2 Configuration and Secrets

- `server.conf` (minus secrets): version-controlled in Git.
- Secrets (JWT key, DB credentials, tunnel tokens): stored in secrets vault with its own backup/replication.
- `.env` files: documented in `.env.example` templates; actual values in vault.

### 4.3 Source Code

- All source code is hosted in a private GitHub repository with branch protection on `main`.
- GitHub provides geo-redundant storage.
- CI artifacts (server binary, client binary, web build) are retained for the most recent 5 builds.

## 5. Disaster Scenarios and Recovery Procedures

### 5.1 Tenant Database Corruption or Loss

**Trigger:** Hardware failure, accidental `DROP`, ransomware encryption of data directory.

| Step | Action | Owner | Target time |
|------|--------|-------|-------------|
| 1 | Stop the Yggdrasil ERP server to prevent further writes | Tenant admin or Mimir support | Immediate |
| 2 | Identify the most recent clean backup | Engineering | 15 min |
| 3 | Provision a new PostgreSQL instance (or repair existing) | Engineering | 30 min |
| 4 | Restore from backup: `gunzip < backup.sql.gz \| psql -d yggdrasil` | Engineering | 1-2 hours (depending on size) |
| 5 | Verify table counts and row integrity | Engineering | 15 min |
| 6 | Restart server; confirm health endpoint returns OK | Engineering | 5 min |
| 7 | Notify tenant of data restored and any gap | Communications | 30 min |

**Data gap mitigation:** Tenant users may need to re-enter transactions from the last backup to the point of failure. Mimir Labs provides a list of audit_log entries from the backup to help identify the gap.

### 5.2 Central VPS Failure

**Trigger:** Hetzner host failure, OS corruption, or VPS termination.

| Step | Action | Owner | Target time |
|------|--------|-------|-------------|
| 1 | Provision a new VPS (CPX31 or equivalent) | Engineering | 15 min |
| 2 | Run `provision.sh` to harden OS and install Docker | Engineering | 20 min |
| 3 | Copy broker files to `/opt/yggdrasil/broker/` | Engineering | 5 min |
| 4 | Restore `.env` from secrets vault | Engineering | 5 min |
| 5 | Restore mesh PostgreSQL from most recent backup | Engineering | 30-60 min |
| 6 | Start broker stack: `systemctl start ygg-broker` | Engineering | 5 min |
| 7 | Initialize Redpanda topics: `init-topics.sh` | Engineering | 2 min |
| 8 | Update Cloudflare tunnel to point to new VPS IP | Engineering | 5 min |
| 9 | Verify tenant sidecar connectivity | Engineering | 15 min |
| 10 | Confirm `health-check.sh` passes | Engineering | 5 min |

### 5.3 Cloudflare Tunnel Disruption

**Trigger:** Cloudflare outage, tunnel token revocation, or DNS failure.

| Step | Action | Owner | Target time |
|------|--------|-------|-------------|
| 1 | Check Cloudflare status page; confirm scope of outage | Engineering | 5 min |
| 2 | If token revoked: generate new token in Zero Trust dashboard | Security Lead | 10 min |
| 3 | Update `.env` on VPS and affected sidecars | Engineering | 15 min |
| 4 | Restart tunnel containers | Engineering | 5 min |
| 5 | Verify end-to-end B2B event flow | Engineering | 10 min |

**Fallback:** If Cloudflare is fully unavailable, tenants continue to operate in standalone mode (`FederationMode=none`). B2B events queue locally and sync when the tunnel is restored.

### 5.4 Ransomware or System-Wide Compromise

See also: [Incident Response Plan](incident-response-plan.md)

| Step | Action | Owner | Target time |
|------|--------|-------|-------------|
| 1 | Isolate all affected systems (firewall deny-all) | IC | Immediate |
| 2 | Snapshot affected disks for forensics | Engineering | 30 min |
| 3 | Provision clean infrastructure from scratch | Engineering | 1-2 hours |
| 4 | Restore databases from known-clean backups (verify checksums) | Engineering | 1-2 hours |
| 5 | Rotate all secrets (JWT key, DB creds, tunnel tokens, API keys) | Security Lead | 1 hour |
| 6 | Rebuild and deploy from Git (clean CI build) | Engineering | 1 hour |
| 7 | Restore service; enhanced monitoring for 72 hours | Engineering | Ongoing |

## 6. Communication Plan

### 6.1 Internal Escalation

| Severity | Who is notified | How |
|----------|----------------|-----|
| Service degradation (single tenant) | Engineering team | Chat notification |
| Full outage (central VPS or multiple tenants) | CTO + Engineering | Phone call + chat |
| Data breach combined with outage | CTO + Security Lead + Legal | Phone call |

### 6.2 Customer Communication

| Event | Notification method | Timeline |
|-------|-------------------|----------|
| Planned maintenance | Email to tenant admins | 72 hours in advance |
| Unplanned outage (< 1 hour) | Status page update | During event |
| Unplanned outage (> 1 hour) | Email to affected tenant admins + status page | Within 1 hour of detection |
| Data loss event | Direct call to affected tenant admin + written follow-up | Within 4 hours |

### 6.3 Vendor Communication

If the disruption involves a third-party vendor (Cloudflare, Hetzner, Square), the Security Lead opens a support case with the vendor and tracks it alongside the internal incident.

## 7. Testing

### 7.1 Backup Restore Tests

- Frequency: Monthly.
- Procedure: Restore the most recent tenant backup to an isolated PostgreSQL instance. Verify table count (>= 101), run schema validation, and spot-check row counts.
- Results are logged with date, backup file used, and pass/fail.

### 7.2 VPS Rebuild Drill

- Frequency: Annually.
- Procedure: Provision a fresh VPS, run `provision.sh`, deploy the broker stack, and verify sidecar connectivity.
- Target: Complete within 2 hours (matching the RTO).

### 7.3 Failover Exercise

- Frequency: Annually.
- Procedure: Simulate central VPS failure by shutting down the broker stack. Verify tenants fall back to standalone mode. Restore broker and verify event replay/sync.

## 8. Plan Maintenance

This plan is reviewed:

- Annually as part of the security program review.
- After any actual DR invocation (lessons learned are incorporated).
- When infrastructure changes materially (e.g., new hosting provider, new federation mode).

## 9. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-01 | CTO | Initial release |
