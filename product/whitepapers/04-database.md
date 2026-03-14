# Yggdrasil ERP — Database Architecture White Paper

**Mimir Labs Technical Publication**
**Document Version:** 1.0
**Date:** March 2026
**Classification:** Public

---

## Executive Summary

Yggdrasil ERP's data layer is built on PostgreSQL, leveraging the database's advanced features — row-level security, JSONB columns, partial indexes, and custom ENUM types — to provide a multi-tenant, auditable, and performant foundation for 10 business modules. The schema comprises 166 tables, 301+ indexes, 51 ENUM types, and 33 sequential migrations, supporting manufacturing, sales, finance, quality, and service operations at scale. This white paper details the schema architecture, multi-tenancy model, audit infrastructure, migration strategy, and performance design.

---

## 1. Technology Choice

| Attribute | Specification |
|-----------|---------------|
| Database engine | PostgreSQL 13+ |
| Schema size | 166 tables, 12 views, 301+ indexes |
| ENUM types | 51 custom types |
| Migration count | 33 sequential migrations |
| Extensions required | `pgcrypto` (UUID generation, encryption) |
| Connection interface | Qt QPSQL driver (PostgreSQL wire protocol) |

PostgreSQL was chosen over alternatives for several ERP-critical capabilities:

- **Row-Level Security (RLS)** — Hardware-enforced tenant isolation at the database level, not just application logic
- **JSONB columns** — Flexible schema for audit payloads, form definitions, and configuration without sacrificing query performance
- **Partial indexes** — Index only the rows that matter (e.g., active records, specific status values), reducing storage and improving query speed
- **ENUM types** — Database-enforced value constraints on status fields, preventing invalid data from ever entering the system
- **Transactional DDL** — Schema migrations run inside transactions, ensuring atomicity

---

## 2. Schema Organization

The 166 tables are organized across 17 domains:

| Domain | Table Count | Key Tables |
|--------|-------------|------------|
| CRM | 12 | `crm_accounts`, `crm_contacts`, `crm_opportunities`, `crm_leads` |
| Sales | 10 | `crm_quotes`, `crm_sales_orders`, `sales_invoices`, `sales_commissions` |
| Purchasing | 8 | `finance_purchase_orders`, `purchasing_receipts`, `purchasing_suppliers` |
| Manufacturing | 10 | `manufacturing_work_orders`, `manufacturing_wo_operations`, `manufacturing_bom_headers` |
| Warehouse | 8 | `warehouse_items`, `warehouse_transactions`, `warehouse_locations`, `warehouse_pick_lists` |
| Finance | 12 | `finance_gl_accounts`, `finance_gl_entries`, `finance_invoices`, `finance_payments` |
| Projects | 6 | `pm_projects`, `pm_tasks`, `hr_time_entries`, `pm_issues` |
| PLM | 8 | `plm_parts`, `plm_ebom_headers`, `plm_ebom_lines`, `engineering_change_requests` |
| Quality | 8 | `quality_8d_reports`, `quality_capa`, `quality_ncr`, `quality_audits`, `quality_inspection_plans` |
| Service | 8 | `service_tickets`, `service_rma`, `service_maintenance_orders`, `service_orders` |
| HR | 6 | `hr_employees`, `hr_departments`, `hr_time_entries`, `hr_positions` |
| Logistics | 4 | `logistics_shipments`, `logistics_carriers`, `fleet_vehicles` |
| Integration | 7 | `integration_endpoints`, `integration_messages`, `integration_dead_letters` |
| Infrastructure | 15 | `tenants`, `users`, `roles`, `audit_change_log`, `record_locks`, `file_attachments` |
| Workflow | 6 | `workflow_templates`, `workflow_instances`, `workflow_instance_steps`, `approval_requests` |
| Form Builder | 2 | `form_templates`, `form_submissions` |
| Asset Management | 3 | `asset_registry`, `asset_ownership_history`, `product_serialization_config` |
| MRP | 3 | `mrp_run_log`, `mrp_demand`, `mrp_planned_orders` |
| Multi-Currency | 3 | `currencies`, `exchange_rates`, `currency_gain_loss` |

### 2.1 Naming Conventions

- **Tables** — `module_entity` format in snake_case (e.g., `crm_accounts`, `finance_gl_entries`)
- **Columns** — snake_case throughout (e.g., `tenant_id`, `created_at`, `lifecycle_status`)
- **Primary keys** — UUID type, column named `id`
- **Foreign keys** — `referenced_table_id` pattern (e.g., `account_id`, `order_id`)
- **Timestamps** — `created_at` and `updated_at` on all entity tables, with `DEFAULT NOW()` and trigger-based auto-update

---

## 3. Multi-Tenancy Architecture

### 3.1 Logical Isolation

Yggdrasil uses a shared-database, shared-schema multi-tenancy model with logical isolation via `tenant_id`:

```sql
-- Every tenant-scoped table includes:
tenant_id UUID NOT NULL REFERENCES tenants(id),
```

This column appears on 120+ of the 166 tables. System tables (migrations, configuration, enum definitions) are tenant-agnostic.

### 3.2 Row-Level Security (RLS)

PostgreSQL RLS policies provide database-enforced tenant isolation:

```sql
-- Example RLS policy on crm_accounts
ALTER TABLE crm_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY crm_accounts_tenant_isolation ON crm_accounts
    USING (tenant_id = current_setting('app.current_tenant_id')::uuid);
```

**How it works:**
1. The application sets a session variable before each transaction: `SET LOCAL app.current_tenant_id = '<uuid>'`
2. RLS policies automatically filter all SELECT, INSERT, UPDATE, and DELETE operations
3. Even if application code omits a `WHERE tenant_id = ?` clause, the database rejects cross-tenant access
4. This defense-in-depth model means no single application bug can cause a tenant data leak

### 3.3 Tenant Table

The `tenants` table is the root of the multi-tenancy hierarchy:

| Column | Purpose |
|--------|---------|
| `id` | UUID primary key |
| `name` | Organization display name |
| `slug` | URL-safe unique identifier |
| `settings` | JSONB for tenant-specific configuration |
| `subscription_tier` | Module access level |
| `is_active` | Soft deactivation flag |

---

## 4. ENUM Types

Yggdrasil defines 51 custom PostgreSQL ENUM types to enforce value constraints at the database level. Key examples:

| ENUM Type | Values | Used By |
|-----------|--------|---------|
| `quote_status` | draft, submitted, approved, converted, cancelled | `crm_quotes` |
| `order_status` | draft, confirmed, in_progress, shipped, delivered, invoiced, cancelled, pending_approval | `crm_sales_orders` |
| `po_status` | draft, submitted, approved, partial, received, billed, cancelled, pending_approval | `finance_purchase_orders` |
| `work_order_status` | planned, released, in_progress, completed, closed, cancelled | `manufacturing_work_orders` |
| `lifecycle_status` | design, review, released, obsolete | `plm_parts` |
| `ecr_status` | draft, submitted, under_review, approved, rejected, implemented, closed | `engineering_change_requests` |
| `ncr_status` | open, under_investigation, pending_disposition, closed | `quality_ncr` |
| `ticket_status` | open, in_progress, pending, resolved, closed, escalated | `service_tickets` |
| `journal_status` | draft, posted, reversed | `finance_gl_entries` |
| `approval_status` | pending, approved, rejected, cancelled | `approval_requests` |

ENUM types provide:
- **Type safety** — Invalid values are rejected at the database level, not just the application level
- **Self-documenting schema** — The valid values for any status field are visible in the schema definition
- **Coordination with StateMachine** — The server's StateMachine engine validates transitions within the ENUM's value set

---

## 5. Audit Infrastructure

### 5.1 Change Log

The `audit_change_log` table records every data mutation:

```sql
CREATE TABLE audit_change_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES tenants(id),
    user_id UUID REFERENCES users(id),
    action VARCHAR(20) NOT NULL,    -- INSERT, UPDATE, DELETE, STATUS_CHG
    table_name VARCHAR(100) NOT NULL,
    entity_id VARCHAR(255),
    old_values JSONB,
    new_values JSONB,
    changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 5.2 Audit Actions

| Action | When Recorded |
|--------|--------------|
| `INSERT` | New entity creation |
| `UPDATE` | Entity field modification |
| `DELETE` | Entity removal (soft or hard) |
| `STATUS_CHG` | Status transition via StateMachine |

### 5.3 Audit Indexes

Partial indexes optimize common audit queries:

```sql
-- Status change history for a specific entity
CREATE INDEX idx_audit_change_log_status_change
    ON audit_change_log (table_name, entity_id, changed_at DESC)
    WHERE action = 'STATUS_CHG';

-- Tenant-wide status change timeline
CREATE INDEX idx_audit_change_log_tenant_status
    ON audit_change_log (tenant_id, changed_at DESC)
    WHERE action = 'STATUS_CHG';
```

### 5.4 Soft Delete

Entity tables support soft deletion via `deleted_at` timestamps:
- Soft-deleted records are excluded from normal queries via `WHERE deleted_at IS NULL`
- The audit log captures the deletion event with the full JSONB snapshot of the deleted record
- Soft-deleted records can be restored by administrators

---

## 6. Index Strategy

The schema includes 301+ indexes across four categories:

### 6.1 Index Types

| Type | Count | Purpose |
|------|-------|---------|
| Primary key | 166 | UUID primary keys on all tables |
| Foreign key | ~80 | Relationship traversal (JOIN performance) |
| Tenant scoping | ~40 | `(tenant_id, ...)` composite indexes for filtered queries |
| Partial | ~15 | Conditional indexes on status fields, active records |

### 6.2 Composite Index Patterns

Common composite index patterns used throughout:

```sql
-- Tenant-scoped entity lookup (most common pattern)
CREATE INDEX idx_crm_accounts_tenant ON crm_accounts(tenant_id, id);

-- Status-filtered queries
CREATE INDEX idx_work_orders_active ON manufacturing_work_orders(tenant_id, status)
    WHERE status NOT IN ('closed', 'cancelled');

-- Date-range queries
CREATE INDEX idx_gl_entries_period ON finance_gl_entries(tenant_id, posting_date DESC);

-- Full-text search support
CREATE INDEX idx_crm_accounts_name ON crm_accounts(tenant_id, name);
```

### 6.3 Performance Characteristics

- **Covering indexes** — Key queries are served entirely from indexes without table lookups
- **Partial indexes** — Status-based filters use partial indexes that exclude closed/archived records, reducing index size by 60-80% on mature datasets
- **DESC ordering** — Date-based indexes use descending order to optimize "most recent first" queries without sort operations

---

## 7. Foreign Key Architecture

### 7.1 Cross-Module Relationships

Yggdrasil's 10 business modules are interconnected through foreign key relationships:

```
CRM Accounts ──→ Quotes ──→ Sales Orders ──→ Invoices ──→ Payments
                                  │
                                  ↓
                           Work Orders ──→ Operations ──→ Time Entries
                                  │
                                  ↓
                         Purchase Orders ──→ Receipts ──→ Bills
                                  │
                                  ↓
                           Inventory ──→ Transactions ──→ Pick Lists
```

### 7.2 Cascade Rules

| Relationship Type | ON DELETE | Rationale |
|-------------------|-----------|-----------|
| Parent → Child lines | CASCADE | Order lines, BOM lines, invoice lines |
| Entity → Audit log | SET NULL | Preserve audit history even if entity is deleted |
| Entity → Attachment | CASCADE | Remove attachments when parent is deleted |
| Module cross-references | RESTRICT | Prevent deletion of referenced entities |

### 7.3 Relationship Traversal API

The server exposes 24 dedicated GET endpoints for cross-module relationship traversal:
- `GET /crm/accounts/:id/contacts` — Contacts for an account
- `GET /crm/accounts/:id/orders` — Sales orders for an account
- `GET /plm/parts/:id/boms` — BOMs containing a part
- `GET /manufacturing/work-orders/:id/operations` — Operations for a work order
- And 20 more relationship endpoints

---

## 8. Migration System

### 8.1 Sequential Versioning

Migrations are numbered sequentially from `001` through `033`:

| Range | Scope |
|-------|-------|
| 001–013 | Core schema establishment (all 10 modules) |
| 014–018 | Notification system, receipts, RBAC tables |
| 019–024 | MRP engine, audit enhancements, form builder |
| 025–028 | Asset registry, finance wiring, serialization, RLS fixes |
| 029–031 | Multi-currency, quality improvements, MBOM linking |
| 032–033 | Approval engine, state machine audit indexes |

### 8.2 Migration Execution

- Migrations run automatically on server boot
- Each migration is tracked in a `schema_migrations` table with filename and applied timestamp
- Forward-only by default; rollback via `.down.sql` companion files
- Checksum verification detects modified migrations
- All DDL runs inside a transaction for atomicity

### 8.3 Rollback Support

Every migration has a corresponding `.down.sql` file:

```sql
-- 025_asset_registry.sql (forward)
CREATE TABLE asset_registry (...);

-- 025_asset_registry.down.sql (rollback)
DROP TABLE IF EXISTS asset_registry CASCADE;
DROP TABLE IF EXISTS asset_ownership_history CASCADE;
```

The server supports programmatic rollback via `POST /api/admin/data/rollback`.

---

## 9. Seed Data

The seed system pre-populates reference data required for system operation:

| Seed Category | Content |
|---------------|---------|
| GL Chart of Accounts | Standard account structure (Assets, Liabilities, Equity, Revenue, Expenses) |
| Warehouse locations | Default storage locations and bin structure |
| Quality templates | Standard 8D, CAPA, NCR templates |
| NAICS codes | North American Industry Classification System codes |
| Currencies | 15 common ISO 4217 currencies |
| System configuration | Default tenant settings, notification preferences |

Seed data is loaded idempotently — re-running seeds on an existing database uses `ON CONFLICT DO NOTHING` to avoid duplicates.

---

## 10. JSONB Usage

JSONB columns provide schema flexibility where rigid column definitions are impractical:

| Table | JSONB Column | Content |
|-------|-------------|---------|
| `audit_change_log` | `old_values`, `new_values` | Before/after snapshots of data changes |
| `form_templates` | `schema` | Dynamic form field definitions (8 field types) |
| `form_submissions` | `data` | User-submitted form responses |
| `tenants` | `settings` | Per-tenant configuration overrides |
| `integration_messages` | `payload` | Variable-structure integration payloads |
| `notification_preferences` | `preferences` | Per-user notification channel settings |

JSONB advantages over separate tables:
- No schema migration required when adding optional fields
- GIN indexes enable efficient querying within JSONB documents
- PostgreSQL JSONB operators (`->`, `->>`, `@>`, `?`) provide SQL-queryable access

---

## 11. Views

12 database views provide pre-computed query results for complex cross-module reports:

| View | Purpose |
|------|---------|
| Inventory valuation | Current stock value by location and item |
| Order fulfillment | Sales order → pick list → shipment status |
| Financial summary | GL account balances by period |
| Work order progress | Operation completion percentages |
| Quality dashboard | Open NCR/CAPA/8D counts by status |
| And 7 more | Various cross-module aggregations |

Views are used by the dashboard KPI endpoints to serve real-time SQL aggregates: open orders, revenue MTD, active work orders, quality scores, and more.

---

## 12. Backup and Recovery

### 12.1 Backup Strategy

- **Daily full backups** — `pg_dump` compressed archives
- **Encryption** — AES-256 before writing to disk
- **Integrity** — SHA-256 checksums alongside each backup
- **Retention** — Configurable retention period per data classification tier
- **Storage** — Separate from the database host at `/opt/yggdrasil/backups/`

### 12.2 Recovery Capabilities

- `GET /api/admin/data/backups` — List available backups with timestamps and sizes
- `POST /api/admin/data/restore` — Restore from backup JSON with `ON CONFLICT DO NOTHING` for safe idempotent restore
- Cross-tenant guard prevents restoring data into the wrong tenant
- Point-in-time recovery via PostgreSQL WAL archiving (when configured)

---

## 13. Schema Evolution Philosophy

The Yggdrasil schema follows these principles:

1. **Additive changes preferred** — New columns use `DEFAULT` values; new tables have no impact on existing queries.
2. **No destructive migrations in production** — Column drops and table removals are staged across multiple releases.
3. **ENUM extensions are additive** — New status values are appended; existing values are never removed or renamed.
4. **Mimisbrunnr is canonical** — The complete schema (166 tables) is the authoritative definition of the data model. External tools and migration engines must adapt to Mimisbrunnr, never the reverse.

---

*Copyright 2026 Mimir Labs. All rights reserved.*
