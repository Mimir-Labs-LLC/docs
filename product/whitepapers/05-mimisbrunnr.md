# Yggdrasil ERP — Mimisbrunnr: Data Architecture & Integration Framework

**Mimir Labs Technical Publication**
**Document Version:** 1.0
**Date:** March 2026
**Classification:** Public

---

## Executive Summary

Mimisbrunnr — named for the well of wisdom in Norse mythology — is both the canonical name for Yggdrasil ERP's complete database schema and the integration framework that connects Yggdrasil to external systems. This white paper covers both aspects: the 166-table schema that serves as the single source of truth for all business data, and the event-driven integration architecture that enables real-time communication with external systems, B2B partners, and cross-deployment synchronization.

---

## 1. What is Mimisbrunnr?

Mimisbrunnr serves two distinct but interrelated roles within the Yggdrasil ERP ecosystem:

### 1.1 The Canonical Schema

Mimisbrunnr is the authoritative definition of Yggdrasil's data model — 166 PostgreSQL tables organized across 17 domains. It is the single source of truth for:

- Table structures and column definitions
- Foreign key relationships between modules
- ENUM types and their valid values
- Index strategies and performance optimizations
- Row-level security policies
- Audit trail infrastructure

**The cardinal rule:** Mimisbrunnr is canonical. Target tables and columns are never dropped or modified to accommodate external systems. Source elements must adapt to Mimisbrunnr, never the reverse.

### 1.2 The Integration Framework

Mimisbrunnr is also the name of the integration subsystem — 7 dedicated tables and a suite of services that enable:

- Event-driven communication via WebSocket and Kafka-compatible protocols
- Dead letter queue for failed message processing
- Endpoint registration for external system connections
- Message transformation and routing
- Cross-tenant event isolation

---

## 2. Schema Architecture

### 2.1 Domain Organization

The 166 tables are organized into 17 logical domains:

```
Mimisbrunnr Schema (166 tables)
├── CRM (12)                    — Accounts, contacts, opportunities, leads
├── Sales (10)                  — Quotes, orders, invoices, commissions
├── Purchasing (8)              — Purchase orders, suppliers, receipts
├── Manufacturing (10)          — Work orders, BOMs, operations, routings
├── Warehouse (8)               — Inventory, locations, transactions, picking
├── Finance (12)                — GL, AR, AP, banking, multi-currency
├── Projects (6)                — Tasks, time tracking, budgets, issues
├── PLM (8)                     — Parts, EBOMs, MBOMs, ECRs, revisions
├── Quality (8)                 — 8D, CAPA, NCR, audits, inspection plans
├── Service (8)                 — Tickets, RMA, warranty, maintenance
├── HR (6)                      — Employees, departments, time entries
├── Logistics (4)               — Shipments, carriers, fleet
├── Integration (7)             — Endpoints, messages, dead letters, transforms
├── Infrastructure (15)         — Tenants, users, roles, audit, locks, attachments
├── Workflow (6)                — Templates, instances, steps, approvals
├── Form Builder (2)            — Templates, submissions
├── Asset & MRP (9)             — Registry, serialization, MRP engine
└── Multi-Currency (3)          — Currencies, exchange rates, gain/loss
```

### 2.2 Cross-Domain Relationships

Mimisbrunnr's power lies in the relationships between domains. Key relationship chains:

**Order-to-Cash:**
```
CRM Account → Quote → Sales Order → Invoice → Payment → GL Entry
                         ↓
                    Work Order → Operations → Time Entries
                         ↓
                    Pick List → Shipment → Delivery
```

**Procure-to-Pay:**
```
Supplier → Purchase Order → Receipt → Bill → Payment → GL Entry
                ↓
           Inventory Transaction → Warehouse Location
```

**Design-to-Manufacture:**
```
PLM Part → EBOM → MBOM → Work Order → Operations → Completed Units
  ↓                                         ↓
ECR → Revision                        Serial Numbers → Asset Registry
```

**Issue-to-Resolution:**
```
Service Ticket → NCR → 8D Report → CAPA → Audit Finding
       ↓                    ↓
      RMA              Root Cause → Corrective Action
```

### 2.3 Universal Patterns

Every entity table in Mimisbrunnr follows consistent patterns:

| Pattern | Implementation |
|---------|---------------|
| Primary key | `id UUID PRIMARY KEY DEFAULT gen_random_uuid()` |
| Tenant isolation | `tenant_id UUID NOT NULL REFERENCES tenants(id)` |
| Timestamps | `created_at TIMESTAMPTZ DEFAULT NOW()`, `updated_at TIMESTAMPTZ DEFAULT NOW()` |
| Soft delete | `deleted_at TIMESTAMPTZ` (nullable, NULL = active) |
| Creator tracking | `created_by UUID REFERENCES users(id)` |
| Status tracking | PostgreSQL ENUM type with StateMachine-enforced transitions |

---

## 3. Integration Framework

### 3.1 Integration Tables

The 7 integration tables form the backbone of external system connectivity:

| Table | Purpose |
|-------|---------|
| `integration_endpoints` | Registered external system connections (URL, auth credentials, protocol) |
| `integration_messages` | Message queue for outbound/inbound payloads (JSONB) |
| `integration_message_log` | Delivery attempt history with status and error details |
| `integration_dead_letters` | Failed messages after retry exhaustion, pending manual resolution |
| `integration_transforms` | Data mapping rules between Mimisbrunnr fields and external schemas |
| `integration_webhooks` | Registered webhook listeners for event-driven callbacks |
| `integration_sync_state` | Last-sync timestamps and cursors for incremental synchronization |

### 3.2 Message Lifecycle

```
1. Event occurs (status change, CRUD operation)
   ↓
2. B2BEventHub publishes to WebSocket channels
   ↓
3. RedpandaRelay forwards to Kafka-compatible topics
   ↓
4. Integration message created in database
   ↓
5. Delivery attempted to registered endpoints
   ↓
6. Success → message_log entry (delivered)
   Failure → retry (up to 3 attempts, exponential backoff)
   ↓
7. Retry exhaustion → dead_letter entry (pending manual resolution)
```

### 3.3 Dead Letter Queue

Failed messages are preserved in the `integration_dead_letters` table with:

- Original message payload (JSONB)
- Error details from each delivery attempt
- Source event reference
- Tenant context

Dead letters can be:
- **Resolved** — Manually marked as handled (via StateMachine: `pending → resolved`)
- **Retried** — Re-queued for delivery after the underlying issue is fixed
- **Investigated** — Full context preserved for root cause analysis

---

## 4. B2B Event Hub

### 4.1 Architecture

The `B2BEventHub` (implemented in `common/src/B2BEventHub.cpp`) provides real-time event streaming:

```
Server Event Sources          B2BEventHub              Consumers
┌─────────────────┐    ┌───────────────────────┐    ┌──────────────────┐
│ StateMachine     │──→ │                       │──→ │ Desktop Client   │
│ CRUD Operations  │──→ │  WebSocket Server     │──→ │ Web Application  │
│ Workflow Engine  │──→ │  Port 8081            │──→ │ External Systems │
│ Approval Engine  │──→ │                       │──→ │ Redpanda Topics  │
│ Notification Svc │──→ │  Tenant-scoped        │    └──────────────────┘
└─────────────────┘    │  channels              │
                       └───────────────────────┘
```

### 4.2 Event Schema

All events follow a standardized JSON structure:

```json
{
    "type": "state_transition",
    "table": "crm_sales_orders",
    "entity_id": "550e8400-e29b-41d4-a716-446655440000",
    "from_state": "draft",
    "to_state": "confirmed",
    "user_id": "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    "tenant_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "timestamp": "2026-03-14T15:30:00Z"
}
```

### 4.3 Event Types

| Event Type | Source | Content |
|-----------|--------|---------|
| `state_transition` | StateMachine | Entity status changes across 23 entity types |
| `notification` | NotificationService | User-facing alerts and messages |
| `data_change` | Route handlers | CRUD operations on entity tables |
| `workflow_event` | WorkflowRoutes | Step completions, instance transitions |
| `approval_event` | ApprovalRoutes | Approval submissions, decisions |

### 4.4 Tenant Isolation

Events are scoped to tenant-specific WebSocket channels:

- Each tenant has its own channel namespace
- Clients authenticate with a JWT before subscribing to channels
- The Event Hub validates tenant membership before delivering events
- Cross-tenant event leakage is architecturally impossible — the channel routing code checks `tenant_id` before every `send()`

---

## 5. Redpanda Relay

### 5.1 Purpose

The `RedpandaRelay` service bridges the internal B2BEventHub to an external Redpanda (Kafka-compatible) message broker, enabling:

- **External system integration** — Third-party systems subscribe to Yggdrasil events via Kafka consumer protocol
- **Event archival** — Persistent event storage beyond the in-memory Event Hub queue
- **Cross-deployment synchronization** — Multiple Yggdrasil instances share events through a central broker
- **Analytics pipelines** — Stream processing systems consume events for business intelligence

### 5.2 Configuration

| Setting | Default |
|---------|---------|
| Broker address | Configured via `server.conf [Redpanda]` section |
| Protocol | Kafka wire protocol over TLS |
| Topic naming | Tenant-scoped: `{tenant_slug}.{event_type}` |
| Delivery | At-least-once with consumer offset tracking |
| Retry | 3 attempts with exponential backoff |

### 5.3 Topic Architecture

```
redpanda/
├── {tenant-a}.state_transition    — Status changes for Tenant A
├── {tenant-a}.data_change         — CRUD events for Tenant A
├── {tenant-a}.workflow_event      — Workflow events for Tenant A
├── {tenant-b}.state_transition    — Status changes for Tenant B
├── {tenant-b}.data_change         — CRUD events for Tenant B
└── ...
```

Each tenant's events are published to tenant-prefixed topics, maintaining isolation at the message broker level.

---

## 6. Data Migration (Ragnarok)

### 6.1 Overview

Ragnarok is Yggdrasil's standalone data migration tool — a Qt 6 C++17 application designed to migrate data from legacy ERP systems into Mimisbrunnr. The tool understands Mimisbrunnr's schema intimately and ensures that all migrated data conforms to its constraints.

### 6.2 Architecture

Ragnarok operates as a 4.5-stage wizard:

| Stage | Name | Purpose |
|-------|------|---------|
| 0.5 | Taxonomy | Analyze source schema, classify tables into 17 domains using FK graph + column archetypes + name heuristics |
| 1 | Auto-Mapping | Match source tables/columns to Mimisbrunnr targets using Levenshtein distance + 50+ synonym groups |
| 2 | Review | Human review and correction of automated mappings |
| 3 | Gap Analysis | Identify unmapped source elements and missing Mimisbrunnr requirements |
| 4 | Ingestion | Execute the migration with topological sort, FK resolution, and data validation |

### 6.3 Key Engines

- **TaxonomyEngine** — Classifies source tables into Yggdrasil's 17 domains using FK graph analysis, column archetype detection, and name heuristics
- **MappingEngine** — Domain-scoped matching with Levenshtein distance + synonym groups (50+ groups covering ERP terminology variants)
- **TypeCompat** — Normalizes type names across PostgreSQL and SQL Server dialects for compatible type matching
- **MigrationPlan** — JSON-serializable plan with topological sort for FK-safe insertion order, supporting save/resume for interrupted migrations

### 6.4 Source Tiers

| Tier | Sources | Status |
|------|---------|--------|
| A (Direct DB) | PostgreSQL, SQL Server | Implemented |
| B (File) | CSV, JSON | Stub |

### 6.5 The Cardinal Rule

**Mimisbrunnr is canonical.** During migration:
- Target tables and columns are never dropped, renamed, or modified
- Only source elements can be rejected or transformed
- Type incompatibilities are resolved by transforming source data, not by changing target types
- Missing required fields in source data generate gap reports, not schema modifications

---

## 7. Schema Diagram

The complete Mimisbrunnr schema is documented in `docs/mimisbrunnr-schema.md` with:

- Mermaid ER diagrams for each of the 17 domains
- Cross-domain relationship maps
- Migration history (001–033)
- Table-level documentation with column descriptions
- State machine diagrams for status-tracked entities
- Index strategy documentation

This living document is updated with each schema migration.

---

## 8. Integration Patterns

### 8.1 Event-Driven (Push)

For systems that need real-time awareness of Yggdrasil events:

1. Register a webhook endpoint in `integration_webhooks`
2. Subscribe to specific event types (e.g., `state_transition` on `crm_sales_orders`)
3. Yggdrasil pushes events to the registered URL as they occur
4. Failed deliveries retry with exponential backoff, then dead-letter

### 8.2 Polling (Pull)

For systems that periodically sync data from Yggdrasil:

1. Use the REST API with `?updated_since=` parameter
2. Track the last sync timestamp in `integration_sync_state`
3. Incrementally fetch only changed records
4. The `updated_at` column on all entity tables enables efficient delta queries

### 8.3 Batch Import

For bulk data loading (initial migration, periodic sync from external systems):

1. Prepare data in Mimisbrunnr's expected format
2. Use the admin data import API with `ON CONFLICT DO NOTHING` for idempotency
3. Cross-tenant guard prevents accidental cross-contamination
4. Ragnarok tool provides automated mapping for legacy system migrations

### 8.4 Message Transformation

The `integration_transforms` table stores data mapping rules:

```json
{
    "source_field": "CustomerNumber",
    "target_table": "crm_accounts",
    "target_column": "external_id",
    "transform": "TRIM(UPPER(?))"
}
```

Transforms are applied automatically during message processing, normalizing external data formats to Mimisbrunnr's conventions.

---

## 9. Observability

### 9.1 Integration Health

The integration framework provides visibility into system health:

| Metric | Source |
|--------|--------|
| Message throughput | `integration_message_log` — delivery count per time window |
| Failure rate | `integration_dead_letters` — pending count |
| Endpoint availability | `integration_endpoints` — last successful connection timestamp |
| Event latency | B2BEventHub — time from event generation to consumer delivery |

### 9.2 Dead Letter Dashboard

The integration dead letter queue is accessible via:
- `GET /api/integration/dead-letters` — List pending dead letters
- `PUT /api/integration/dead-letters/:id/resolve` — Mark as resolved (via StateMachine)
- Full payload and error history preserved for each failed message

---

## 10. Design Principles

1. **Schema-first** — The database schema is the authoritative definition. Application code, APIs, and integrations derive from it, not the other way around.
2. **Tenant-scoped everything** — Every integration message, event, and transform is scoped to a tenant. No shared-state leakage.
3. **At-least-once delivery** — Events may be delivered more than once; consumers must be idempotent.
4. **Fail-open for reads, fail-closed for writes** — Read failures return empty results; write failures abort the transaction.
5. **Dead letters over data loss** — Failed messages are preserved for investigation, never silently dropped.
6. **Additive schema evolution** — New columns, tables, and ENUM values are added; existing structures are not modified or removed.

---

*Copyright 2026 Mimir Labs. All rights reserved.*
