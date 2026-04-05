# Data Classification Policy

**Mimir Labs — Yggdrasil ERP**

| Field | Value |
|-------|-------|
| Version | 1.0 |
| Effective date | 2026-03-01 |
| Owner | Security Lead, Mimir Labs |
| Review cycle | Annual |
| Classification | Internal |

---

## 1. Purpose

This policy defines a classification scheme for data processed, stored, and transmitted by the Yggdrasil ERP platform. Classification drives the handling, encryption, retention, and disposal requirements documented in companion policies.

## 2. Scope

Applies to all data managed by Yggdrasil ERP across every tenant, environment, and component — including PostgreSQL databases, Redpanda event topics, application logs, backups, and any data transiting Cloudflare tunnels.

## 3. Classification Levels

### 3.1 Restricted

Data whose unauthorized disclosure would cause severe harm to Mimir Labs or its customers. Requires the strictest controls.

**Examples in Yggdrasil ERP:**

| Data | Location |
|------|----------|
| Database credentials | `server.conf`, secrets vault |
| JWT signing key | `server.conf` (`JWTSecret`), secrets vault |
| Cloudflare tunnel tokens | `.env` files, secrets vault |
| Third-party API secrets | Square, BoldSign tokens |
| Password hashes and salts | `users.password_hash` column |
| Encryption keys | Secrets vault |
| Backup archives (contain all tenant data) | `/opt/yggdrasil/backups/` |

**Handling requirements:**

- Encrypted at rest and in transit.
- Stored only in approved secrets vaults or encrypted volumes — never in source code, chat, or email.
- Access limited to the Security Lead and explicitly authorized personnel.
- Logged on every access.

### 3.2 Confidential

Data that is private to a tenant or to Mimir Labs and is not intended for public disclosure.

**Examples in Yggdrasil ERP:**

| Data | Location |
|------|----------|
| Customer records | CRM tables (`accounts`, `contacts`, `opportunities`) |
| Financial data | Finance tables (`gl_accounts`, `ap_invoices`, `ar_invoices`, `bank_transactions`) |
| Sales pricing and commissions | Sales tables (`quotes`, `sales_orders`, `commission_rules`) |
| Employee / HR records | HR tables (`employees`, `org_units`) |
| Purchase orders and supplier terms | Purchasing tables (`purchase_orders`, `suppliers`) |
| Manufacturing BOMs and processes | Manufacturing / PLM tables |
| Audit log entries | `audit_log` table, application log files |
| User profiles and role assignments | `users`, `user_roles`, `tenant_roles` |

**Handling requirements:**

- Encrypted in transit (TLS). Encrypted at rest where technically feasible.
- Tenant-isolated: accessed only through tenant-scoped queries (`WHERE tenant_id = ...`) enforced by Row-Level Security.
- Shared only with the owning tenant's authorized users or with Mimir Labs personnel who require access for support purposes.

### 3.3 Internal

Data used for Mimir Labs operations that is not sensitive to individual tenants but should not be publicly shared.

**Examples in Yggdrasil ERP:**

| Data | Location |
|------|----------|
| Source code | GitHub repository |
| Internal documentation and policies | `docs/policies/`, `CLAUDE.md` |
| CI/CD pipeline configuration | `.github/workflows/ci.yml` |
| Infrastructure provisioning scripts | `infra/vps/`, `infra/sidecar/` |
| Non-sensitive server configuration | `server.conf` (excluding secrets) |
| Performance metrics | MetricsCollector output |
| Internal bug reports and feature plans | GitHub Issues |

**Handling requirements:**

- Not published externally without approval.
- Stored in access-controlled repositories (private GitHub repo).
- No special encryption beyond standard transport security.

### 3.4 Public

Data intended for or already available to the general public.

**Examples in Yggdrasil ERP:**

| Data | Location |
|------|----------|
| Product marketing materials | External website |
| Published API documentation | Public docs site (when available) |
| Open-source dependency licenses | `package.json`, CMake fetch |
| EULA | `EULA.txt` |

**Handling requirements:**

- No access restrictions.
- Review before publication to ensure no Confidential or Restricted data is included.

## 4. Classification by Database Table

For quick reference, the following grouping covers the 101 Yggdrasil ERP schema tables:

| Classification | Tables (representative) |
|---------------|------------------------|
| Restricted | `users` (password_hash column only), secrets vault entries |
| Confidential | `accounts`, `contacts`, `opportunities`, `quotes`, `sales_orders`, `invoices`, `purchase_orders`, `suppliers`, `work_orders`, `bom_headers`, `gl_accounts`, `journal_entries`, `ap_invoices`, `ar_invoices`, `bank_transactions`, `employees`, `tickets`, `rma_requests`, `quality_audits`, `capa_actions`, `ncr_reports`, `parts`, `ecr_requests`, `audit_log`, `user_roles`, `tenant_roles`, `tenant_settings` |
| Internal | `tenants` (metadata), `permissions`, `workflow_templates`, `report_definitions`, `edi_mappings` |
| Public | None by default |

## 5. Labeling

- Database columns containing Restricted data must be commented in the schema file.
- Documents stored outside the repository (slides, spreadsheets) must carry a classification label in the header or footer.
- Commit messages and PR descriptions must not contain Restricted data.

## 6. Handling Matrix

| Action | Restricted | Confidential | Internal | Public |
|--------|-----------|--------------|----------|--------|
| Encrypt at rest | Required | Required where feasible | Not required | Not required |
| Encrypt in transit | Required (TLS) | Required (TLS) | Required (TLS) | Best effort |
| Store in secrets vault | Required | Not required | Not required | Not required |
| Include in backups | Yes (backup itself is Restricted) | Yes | Yes | Yes |
| Share externally | Never | Only with data owner consent | With CTO approval | Freely |
| Log access | Required | Recommended | Not required | Not required |
| Retention | Per [Data Retention Policy](data-retention-disposal-policy.md) | Per retention policy | Per retention policy | Indefinite |

## 7. Reclassification

Data may be reclassified when business conditions change (e.g., a feature becomes publicly documented, or a data field begins storing PII). Reclassification requests are reviewed by the Security Lead and recorded in the policy revision history.

## 8. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-01 | Security Lead | Initial release |
