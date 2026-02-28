# DD-04 — Failure Modes and Recovery

---

## 1. Scope

This document examines what happens when components of the Yggdrasil system fail. It covers infrastructure failures, data integrity failures, and trust failures between organizations. For each failure mode, it describes the system's behavior, what is preserved, what is lost, and what manual intervention is required to recover.

The system is in alpha. Several of the recovery mechanisms described here are designed but not battle-tested under production load. Where a mechanism exists only as a design or configuration option rather than as tested code, this document says so.

## 2. Central Broker Failure

If the Hetzner VPS goes offline — hardware failure, network partition, or Cloudflare tunnel disruption — the following happens.

Tenant ERP servers continue operating normally. The C++ server, PostgreSQL database, desktop client, and web application at each tenant site are independent of the central infrastructure. Users can create, read, update, and delete records. Manufacturing, warehouse, finance, and all other modules function without interruption.

Cross-tenant B2B event propagation stops. The Go sidecar at each tenant site detects the tunnel failure and reports unhealthy at `/healthz`. The C++ server's RedpandaRelay enters an exponential backoff reconnection loop (1s, 2s, 4s, up to 30s maximum). Events generated during the outage are persisted to the local `b2b_events` table with status `pending`. They are not lost.

The portal (marketing site and customer dashboard at app.mimirlabs.net) becomes unavailable. Customers cannot access team management, support tickets, subscription settings, or the web-based ERP dashboard served through the mesh proxy. Direct access to tenant ERP servers via the desktop client or locally-deployed web application is unaffected.

When the central broker recovers, sidecars reconnect and re-establish tunnel connections. The B2BEventHub's retry mechanism (`retryPendingEvents()`, running every 30 seconds) picks up pending events from the `b2b_events` table and attempts redelivery. Events published during the outage are delivered in the order they were persisted locally. The Redpanda broker, if it lost data during the failure, does not have a mechanism to request replay from tenant servers — it relies on tenants pushing their pending events. Events that aged past the broker's 7-day retention window during an extended outage are effectively lost from the broker's perspective, though they remain in the source tenant's `b2b_events` table.

Recovery time depends on the cause of the VPS failure. The systemd service `ygg-broker.service` is configured to restart Docker Compose on boot. If the VPS itself recovers, the stack should come up automatically. If the VPS is unrecoverable, the Docker Compose configuration and Cloudflare tunnel token must be deployed to a new host. The mesh PostgreSQL data must be restored from the daily backup. RPO for the central infrastructure is one day (daily backup at 03:00 UTC). RTO is estimated at approximately one hour for a manual recovery — this has not been tested.

## 3. Tenant Database Failure

If a tenant's PostgreSQL database becomes unavailable — container crash, disk failure, corruption — the tenant's ERP functionality stops entirely. The C++ server cannot serve API requests without its database. The desktop client and web application will show errors on all data operations.

The C++ server includes graceful degradation for the in-memory cache — a cache hit can serve stale data for read requests when the database is temporarily unreachable. But writes fail immediately, and once the cache TTL expires, reads fail too. There is no offline mode in the current implementation.

Recovery requires restoring the tenant's PostgreSQL instance from backup. For managed SaaS tenants, this means restoring the Docker volume or running `pg_dump` from the most recent daily backup into a fresh container. For self-hosted tenants, recovery depends on their own backup procedures.

The audit trail survives to the extent that the backup captures it. Since the `audit_change_log` table lives in the same database as the business data, it is backed up and restored together. Any changes made between the last backup and the failure are lost from both the business data and the audit trail. There is no write-ahead log replication to a secondary database — this is a planned Phase 3 enhancement (PostgreSQL streaming replication), not a current capability.

B2B events that were in transit to or from the failed tenant at the time of failure remain in the Redpanda broker for up to 7 days. Once the tenant's database is restored and the C++ server restarts, the sidecar reconnects and the RedpandaRelay resumes consuming events from the broker. Events older than 7 days at the time of restoration are lost from the broker. The `b2b_events` table on the partner tenant's side retains the outbound event records regardless of broker retention.

## 4. Tunnel Failure Without Broker Failure

If a specific tenant's Cloudflare tunnel drops while the central broker remains healthy, that tenant enters standalone mode. Its own ERP functionality is unaffected. Events destined for that tenant accumulate in the Redpanda broker (the partner tenant's sidecar continues publishing). When the tunnel reconnects, the sidecar's consumer picks up from its last committed offset in Redpanda and processes the backlog.

If the tunnel failure is prolonged beyond the broker's 7-day retention, events published during the gap are lost. The partner tenant's `b2b_events` table retains records of what was published, so a manual reconciliation is possible but not automated.

## 5. Partial Write and Transaction Integrity

Within a single tenant, the C++ server uses Qt's QSqlQuery within explicit transaction blocks (BEGIN/COMMIT/ROLLBACK) for operations that span multiple tables. Creating a sales order with line items, for example, inserts into `crm_sales_orders` and `crm_sales_order_lines` within a single transaction. If the connection drops mid-transaction, PostgreSQL rolls back the incomplete changes.

The audit trail entry is written as part of the same logical operation but is not wrapped in the same database transaction in all cases. A failure between the business data write and the audit write could result in a business record change that is not captured in the audit trail. This is a correctness gap — the SOC 2 roadmap's Control 1.1 (immutable audit log with database triggers) would address it by moving audit capture to the database trigger level, where it would be transactionally bound to the data change.

Cross-tenant writes are not transactional. When Tenant A publishes a B2B event that triggers a purchase order creation on Tenant B, these are two independent database transactions on two separate servers. If Tenant A's event is published but Tenant B's PO creation fails, the system is in an inconsistent state: Tenant A believes the order was communicated, but Tenant B has no record of it. The event remains in Redpanda (or in the `b2b_events` table) and will be retried, but there is no two-phase commit or saga pattern that guarantees atomicity across tenants. This is a deliberate design choice — distributed transactions across organizational boundaries would require a central coordinator, which contradicts the system's distributed custody model. The trade-off is eventual consistency with manual reconciliation as a fallback.

## 6. Event Ordering and Duplication

Within a single Redpanda topic partition, events are ordered by publication time. The system assigns one topic per module (e.g., `ygg.events.sales` for all sales events across all tenants). Topics have 3 partitions. Since events from different tenants may land in different partitions, cross-tenant event ordering is not strictly guaranteed. Two events from Tenant A to Tenant B that land in different partitions may be consumed in a different order than they were produced.

In practice, this matters most for status transition sequences. If a sales order is confirmed and then shipped in rapid succession, and the two events land in different partitions, the buyer's system might process the shipment event before the confirmation event. The system does not currently include sequence numbers or vector clocks on B2B events. Each event carries a timestamp, but the receiving system does not enforce ordering based on it.

Event duplication is possible in at-least-once delivery scenarios: a producer retries after a timeout, or a consumer processes an event but fails to commit the offset before crashing. The system does not implement idempotency keys on the consumer side for B2B events. A duplicate event could result in a duplicate purchase order on the receiving tenant. This is identified as an area for improvement but is not currently addressed.

## 7. Application-Level Failures

If the C++ server process crashes (segfault, out-of-memory, unhandled exception), the WebSocket connections to all local clients drop immediately. The desktop client's WebSocket client enters reconnection with exponential backoff. The web application's `useWebSocket` hook does the same (1s to 30s maximum backoff). When the server restarts, clients reconnect automatically.

In-memory state is lost on server crash: the CacheManager's contents (up to 512 MB), the RateLimiter's bucket state, and the MetricsCollector's counters. The cache rebuilds lazily on subsequent reads. Rate limiter state resets (briefly allowing higher-than-configured request rates). Metrics reset to zero. None of this affects data integrity — all persistent state is in PostgreSQL.

The Go mesh server, if it crashes, is restarted by Docker's restart policy. During the outage, the portal cannot proxy requests to tenant servers, and tenant sidecar heartbeats go unacknowledged. Tenants are unaffected in their direct operations.

## 8. Trust Failures

Trust failures are scenarios where the technical infrastructure works correctly but the business relationship between tenants breaks down.

**Disputed transaction state.** Tenant A and Tenant B disagree about the contents or timing of a transaction. The system's response is evidentiary, not adjudicative. Each tenant's audit trail provides an independent record of what their system recorded and when. The `b2b_events` table on each side provides a record of what was communicated. If the event is still within the Redpanda retention window, the broker provides a third-party record. The system does not include a dispute resolution mechanism — the SaaS contract (Article XIII, Section 13.2) specifies escalation to senior management followed by binding arbitration through the American Arbitration Association if unresolved within 30 days.

**Unilateral record modification.** One tenant modifies records related to a cross-tenant workflow — changing a quantity, voiding an order, altering a price. The modification is recorded in that tenant's audit trail. The partner tenant's records are not automatically updated (events are advisory; the receiving system decides how to process them). If a tenant modifies an order after the B2B event was sent, the partner tenant's PO retains the original values unless a subsequent update event is published. The divergence is detectable by comparing the two sides' records, but the system does not automatically detect or flag it.

**Tenant departure.** When a tenant leaves the system, their data export is governed by the SaaS contract (Article XII and Article VI, Section 6.5). The departing tenant receives their data in standard format. Their trading partners lose the real-time event stream — orders revert to manual processes (email, EDI, phone). The partner's existing records (POs linked to the departed tenant's SOs) remain intact with the B2B linkage fields (`b2b_source_tenant`, `b2b_source_order_id`) preserved but pointing to a now-inactive tenant. There is no cascade deletion of cross-tenant references; the data remains as historical record.

**Malicious tenant.** A tenant that deliberately publishes false B2B events (e.g., fabricating orders, sending spurious shipment confirmations) can cause the partner to create incorrect records. The partner's server validates incoming events against the partner registry (the mesh server's `mesh_partners` table) to ensure the source is a recognized trading partner, but it does not validate the content of the event against external sources. Content validation is the receiving tenant's responsibility — the system's workflow engine can be configured to require human approval before auto-creating records from inbound events, but this is configuration, not default behavior.

## 9. What Cannot Be Recovered

Some losses are irreversible in the current architecture.

Audit log entries are lost if the tenant database is restored from a backup that precedes the entries in question and no off-site replica exists. Since the audit log lives in the same database as the business data, a database restore rewinds both.

Events that exceed the Redpanda retention window (7 days) and were not consumed by the destination tenant are permanently lost from the broker. They exist in the source tenant's `b2b_events` table but must be manually replayed if the destination tenant needs them.

The in-memory fallback DAL in the portal (the `globalThis` Maps in the `mimirlabs` repository's `dal.ts`) loses all data on process restart — organizations, users, subscriptions, tickets, everything. This is documented as the single most critical production-blocking issue in the feature audit. Until the portal's DAL is migrated to the Prisma/PostgreSQL implementation, any portal restart in the managed SaaS environment destroys coordination metadata. The ERP data on tenant servers is unaffected, but the portal's record of tenants, users, and subscriptions must be re-seeded.

---

*Document version: 1.0 — February 2026*
*System version: Yggdrasil v0.4.4a (alpha)*
