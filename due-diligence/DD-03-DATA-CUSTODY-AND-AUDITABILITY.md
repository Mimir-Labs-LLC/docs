# DD-03 — Data Custody and Auditability

---

## 1. Who Owns What

Data ownership in Yggdrasil follows from the deployment topology described in DD-02. Each tenant's business data — CRM records, sales orders, purchase orders, work orders, inventory, financial transactions, quality records, HR data — resides in a PostgreSQL database that the tenant controls. In a self-hosted deployment, this is the tenant's own infrastructure. In the managed SaaS deployment, it is an isolated PostgreSQL container (`ygg-db-{slug}`) provisioned on the VPS.

The SaaS Subscription Agreement (Article VI) codifies this: "Client retains all right, title, and interest in and to Client Data. Provider acquires no rights in Client Data except the limited rights expressly granted in this Agreement." The provider's license to client data is limited to "use, process, store, and transmit Client Data solely to the extent necessary to provide the Service." Upon termination, the provider must make data available for export in CSV, JSON, or SQL dump format within 30 days, with a 90-day retrieval window.

The central `ygg_central` database contains coordination metadata — organizations, users, subscriptions, invitations, support tickets, module activations, tenant connection status. This is provider-managed data about the tenancy relationship, not about the tenant's business operations.

The provider retains a license to anonymize and aggregate client data for "product improvement, benchmarking, and analytical purposes" (Article VI, Section 6.6). This clause supports a planned secondary revenue stream: anonymized industry benchmarks, trend indices, and aggregate demand signals derived from the tenant population. The aggregation pipeline is designed to consume statistical summaries, not identifiable records. The mechanism by which tenant data enters the aggregation layer — whether through event-stream taps, periodic ETL from tenant databases, or opt-in reporting — is not yet implemented. The contractual basis exists; the technical implementation does not. DD-01 Section 7 covers the business rationale.

The Redpanda event broker holds events in transit with a 7-day retention window. These events are structured messages about commercial transactions (order created, status changed, shipment confirmed). They are not indexed, queried, or retained beyond the retention window. The broker is a pipe with a short buffer, not a data store.

## 2. Mutability Rules

Business records in Yggdrasil are mutable. Users with appropriate RBAC permissions can create, read, update, and delete records across all modules. This is an intentional design choice. ERP systems must support corrections — a mistyped quantity on a purchase order, a reassigned sales territory, a voided invoice. Prohibiting edits would make the system unusable for its intended audience.

Deletion uses a soft-delete pattern on 16 key business entity tables (CRM entities, contacts, opportunities, sales orders, invoices, payments, purchase orders, PLM parts, ECOs, work orders, quality NCRs, 8D reports, CAPAs, service requests, RMAs, projects, and HR employees). These tables carry `deleted_at` (timestamp) and `deleted_by` (user UUID) columns, added in migration 006. A soft-deleted record is excluded from standard queries but remains in the database and in the audit trail. Physical deletion of business records is not exposed through the standard API.

The exception to mutability is the audit trail itself. The `audit_change_log` table is append-only by design. It records every INSERT, UPDATE, and DELETE operation on business entity tables, capturing the user who made the change, the timestamp, the table and entity affected, and JSONB snapshots of the old and new field values. There is no API endpoint or application-layer mechanism to modify or delete audit log entries.

This distinction — mutable records, immutable trail — is the system's answer to the tension between operational flexibility and evidentiary integrity. A user can correct an error on a sales order. They cannot erase the fact that the error existed or that it was corrected.

## 3. The Audit Trail

The audit trail is implemented through the `audit_change_log` table, introduced in migration 006.

The table schema is straightforward: `change_id` (BIGSERIAL primary key), `tenant_id` (UUID), `user_id` (UUID), `action` (VARCHAR — INSERT, UPDATE, or DELETE), `table_name` (VARCHAR), `entity_id` (VARCHAR), `changed_at` (TIMESTAMP WITH TIME ZONE, defaults to NOW()), `old_values` (JSONB), and `new_values` (JSONB). Five indexes support efficient querying: by tenant, by table name, by (table_name, entity_id) pair, by user, and by timestamp.

The C++ server writes to this table as part of its mutation flow. When a route handler performs an INSERT, UPDATE, or DELETE through the Repository layer, the corresponding audit entry is written within the same logical operation. The `old_values` field captures the previous state of modified fields (for UPDATEs and DELETEs); the `new_values` field captures the new state (for INSERTs and UPDATEs).

The web application exposes the audit trail through the Admin module's Audit Trail tab. Users can filter by table name, entity ID, date range, and action type. Change diffs show old versus new values per field. Results are paginated at 50 records.

There is also a legacy `audit_log` table (simpler, event-level — recording action, table, entity, and timestamp without field-level detail). Both tables exist in the schema; the `audit_change_log` with JSONB diff is the authoritative record.

## 4. What the Audit Trail Captures

The audit trail captures field-level changes to business entity records. For an UPDATE to a sales order that changes the quantity from 100 to 150 and the status from "draft" to "confirmed," the audit entry would contain `old_values: {"quantity": 100, "status": "draft"}` and `new_values: {"quantity": 150, "status": "confirmed"}`, along with the user, tenant, timestamp, and entity identifiers.

For cross-tenant B2B events, the audit trail operates independently on each side. When Tenant A creates a sales order that generates a purchase order on Tenant B's system, both tenants' audit logs record their respective operations: Tenant A logs the sales order creation, and Tenant B logs the purchase order creation with metadata indicating its B2B origin (`b2b_source_tenant`, `b2b_source_order_id`). There is no shared or centralized audit trail across tenants. Each organization's evidence is self-contained.

The audit trail does not currently capture authentication events (login attempts, failed logins, token refreshes), API access patterns (which endpoints were called, by whom, at what rate), or configuration changes to server settings. These are identified as gaps in the SOC 2 roadmap — Control 1.4 (login audit events) addresses authentication logging, and Control 4.1 (centralized log aggregation) addresses the broader observability gap.

## 5. Evidence Under Dispute

Consider a concrete scenario: Tenant A (seller) claims it shipped 500 units. Tenant B (buyer) claims it received 400. Both are Yggdrasil tenants with B2B federation enabled.

The system can produce the following evidence. On Tenant A's side: the sales order creation audit entry, any modifications to quantity or status, the shipment record (from the logistics module), the B2B event published to Redpanda (the `b2b_events` table records the event payload and delivery status). On Tenant B's side: the automatically created purchase order, its audit trail, any receiving transactions recorded in the warehouse module, and the inbound B2B event that triggered the PO creation.

The Redpanda broker retains event messages for 7 days. If the dispute arises within that window, the original event payload can be retrieved from the broker as a third-party record. After 7 days, the event exists only in the `b2b_events` tables on each tenant's server.

What the system cannot do is prove that the physical shipment matched the electronic record. It can prove what each party's system recorded and when. It can prove whether records were modified after the fact (the audit trail shows all changes). It cannot prove that neither party tampered with their database outside the application layer — there are no database-level triggers enforcing write-once semantics on the audit table, and a user with direct database access could modify audit records. This is a known limitation, addressed in the SOC 2 roadmap as Control 1.1 (immutable audit log with database triggers).

## 6. Data Portability

The system provides data export through multiple mechanisms. The Admin module's data management API supports tenant-wide JSON export (`POST /api/admin/data/export`) and per-table CSV export. The SaaS contract guarantees data availability in CSV, JSON, or SQL dump format within 30 days of a written request.

For self-hosted deployments, the tenant has direct access to the PostgreSQL database and can export using standard tools (`pg_dump`, COPY TO). The schema is documented and uses conventional naming (snake_case, standard SQL types, JSONB for flexible fields). There is no proprietary binary format or application-level encryption that would prevent a third party from reading the data.

The `provision-tenant.sh` script demonstrates the inverse operation — provisioning a new tenant database from the canonical schema, applying migrations, and optionally loading seed data. This same mechanism could support data migration into or out of the system.

Module activation and deactivation is tracked in the `ygg_central` database through the `ModuleActivation` model. Deactivating a module does not delete the module's data from the tenant's ERP database — it removes the tenant's access to that module's API endpoints and UI. Reactivating the module restores access to the existing data. This means a tenant that downgrades from Professional to Starter does not lose data in modules they can no longer access; the data persists and becomes accessible again if they upgrade.

## 7. Backup and Recovery

The VPS infrastructure includes a daily backup script (`infra/vps/backup-db.sh`) triggered by a systemd timer at 03:00 UTC. The script runs `pg_dump` against all tenant databases and the mesh database, with 14-day retention.

Backups are not encrypted at rest. The SOC 2 roadmap identifies this as Risk R8 and schedules AES-256 encryption of backup output as Phase 1, Control 1.5. Backups are not replicated off-site. There is no point-in-time recovery (PITR) capability — the system can restore to the last daily backup, but not to an arbitrary point between backups.

For the managed SaaS deployment, each tenant's database runs in its own Docker container with a named volume (`ygg-db-{slug}-data`). Recovery involves restoring the PostgreSQL dump into a fresh container. The mesh server maintains tenant registry metadata separately, so the coordination layer can be rebuilt independently of tenant data.

The system does not currently test backup restores automatically. Monthly restore testing is specified in the SOC 2 Phase 5 observation window (Section 5.3), but this has not been implemented.

## 8. What This Document Does Not Cover

The operational implications of these custody and audit mechanisms under various failure conditions — broker outage, tunnel loss, partial writes, sync divergence — are covered in DD-04. The gap analysis for compliance readiness, including the specific SOC 2 controls referenced throughout this document, is in DD-05.

---

*Document version: 1.0 — February 2026*
*System version: Yggdrasil v0.4.4a (alpha)*
