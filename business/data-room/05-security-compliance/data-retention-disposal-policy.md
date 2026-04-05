# Data Retention and Disposal Policy

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

This policy defines how long Yggdrasil ERP retains different categories of data and how data is securely disposed of when it is no longer needed. It supports regulatory compliance (GDPR, CCPA), contractual obligations to tenants, and the principle of data minimization.

## 2. Scope

All data stored, processed, or transmitted by the Yggdrasil ERP platform — including PostgreSQL databases, Redpanda topics, application logs, backup archives, and any local caches.

## 3. Retention Schedule

### 3.1 Tenant Business Data

| Data type | Retention period | Rationale |
|-----------|-----------------|-----------|
| CRM records (accounts, contacts, opportunities) | Life of tenant subscription + 90 days | Needed for ongoing operations |
| Sales records (quotes, orders, invoices) | Life of subscription + 7 years | Tax and financial audit requirements |
| Financial records (GL, AR, AP, journal entries, bank transactions) | Life of subscription + 7 years | Tax and financial audit requirements |
| Purchasing records (POs, supplier data, receipts) | Life of subscription + 7 years | Tax and audit requirements |
| Manufacturing records (work orders, BOMs, shop floor data) | Life of subscription + 5 years | Product liability and traceability |
| Warehouse records (inventory transactions, picking lists) | Life of subscription + 5 years | Inventory audit and traceability |
| Quality records (8D, CAPA, NCR, audits) | Life of subscription + 10 years | Regulatory (ISO 9001, industry requirements) |
| PLM records (parts, revisions, ECRs) | Life of subscription + 10 years | Product lifecycle traceability |
| Service records (tickets, RMA, warranty, maintenance) | Life of subscription + 5 years | Warranty and liability |
| Project records (tasks, time entries, budgets) | Life of subscription + 3 years | Internal reference |
| HR records (employees, org structure) | Life of subscription + 7 years | Employment law |

### 3.2 System and Security Data

| Data type | Retention period | Rationale |
|-----------|-----------------|-----------|
| Audit log entries | 7 years | SOC 2 evidence; regulatory compliance |
| Application logs (structured JSON) | 12 months | Operational troubleshooting; incident investigation |
| Authentication logs (login success/failure) | 12 months | Security monitoring |
| Rate limiter state | Session only (in-memory) | No retention needed |
| Cache entries | TTL-based (in-memory) | No retention needed |
| Metrics data | 12 months | Performance trending |

### 3.3 Backups

| Data type | Retention period | Rationale |
|-----------|-----------------|-----------|
| Daily database backups (tenant) | 14 days (local) | Short-term recovery |
| Daily database backups (off-site copy) | 90 days | Disaster recovery |
| Monthly backup snapshots | 12 months | Long-term recovery |

### 3.4 B2B Event Data

| Data type | Retention period | Rationale |
|-----------|-----------------|-----------|
| Redpanda topic messages | 7 days (broker retention) | Event replay window |
| Dead-letter queue (`ygg.events.dlq`) | 30 days | Debugging failed deliveries |
| Mesh PostgreSQL (event routing metadata) | Life of tenant subscription | Routing state for federation |

### 3.5 Development and Build Artifacts

| Data type | Retention period | Rationale |
|-----------|-----------------|-----------|
| Source code (Git history) | Indefinite | Version history |
| CI build artifacts | 90 days | Rollback capability |
| Test results | 12 months | Regression tracking |

## 4. Tenant Subscription Termination

When a tenant cancels their Yggdrasil ERP subscription:

| Step | Timeline | Action |
|------|----------|--------|
| 1 | Day 0 | Subscription ends. Tenant admin access is revoked. User accounts are deactivated (`is_active = false`). |
| 2 | Day 0 - 30 | **Grace period.** Tenant data remains intact. A final export is offered to the tenant (SQL dump or structured CSV). |
| 3 | Day 30 | If the tenant has not requested an extension, data enters the disposal queue. |
| 4 | Day 30 - 90 | **Retention hold.** Data is retained but inaccessible (no active accounts). This covers the period where a tenant may re-subscribe. |
| 5 | Day 90 | **Disposal.** All tenant data is permanently deleted per section 5. |

Financial, quality, and PLM records that fall under extended retention (section 3.1) are retained in an archived, anonymized form if required by law, with tenant-identifying information removed.

## 5. Secure Disposal Methods

### 5.1 Database Records

- Tenant data is deleted via `DELETE FROM ... WHERE tenant_id = ?` cascading across all tables (enforced by `ON DELETE CASCADE` foreign keys).
- Following deletion, a `VACUUM FULL` is run on affected tables to reclaim disk space and overwrite freed pages.
- The deletion event is recorded in the audit log (which itself is retained per section 3.2).

### 5.2 Backup Archives

- Backups containing the deleted tenant's data are retained only until their normal retention period expires (14 days local, 90 days off-site).
- No early purge of backups is performed, but the backup encryption key ensures the data is inaccessible without authorization.
- After retention expiry, backup files are deleted from storage. On encrypted volumes, file deletion combined with key destruction is considered sufficient.

### 5.3 Redpanda Topics

- Events belonging to the terminated tenant naturally age out per the topic retention policy (7 days).
- If immediate purge is required, targeted message deletion is performed on the relevant partition.

### 5.4 Application Logs

- Logs containing the tenant's identifiers age out per the 12-month rotation.
- If early purge is required (e.g., GDPR erasure request), log entries are overwritten with anonymized placeholders.

### 5.5 Physical Media

If physical storage media (disks, SSDs) that held tenant data are decommissioned:

- Media is wiped using a NIST 800-88 compliant method (cryptographic erase for SSDs, overwrite for HDDs).
- Destruction is documented with date, method, and responsible person.

## 6. Data Subject Erasure Requests

Under GDPR Article 17 or CCPA, individual data subjects may request erasure of their personal data. See the [Privacy Policy](privacy-policy.md) for the full procedure. In summary:

1. The request is verified and logged.
2. Personal data (name, email, phone, etc.) in the `contacts`, `users`, and related tables is anonymized or deleted.
3. Records required for legal or financial compliance (e.g., invoices) are retained but anonymized (personal identifiers replaced with tokens).
4. Confirmation is sent to the requester within 30 days.

## 7. Exceptions

Retention periods may be extended when:

- A legal hold is in effect (litigation, regulatory investigation).
- A tenant contractually requires longer retention (documented in a data processing addendum).

The Security Lead approves all retention extensions and documents the justification.

## 8. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-01 | Security Lead | Initial release |
