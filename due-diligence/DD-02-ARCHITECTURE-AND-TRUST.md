# DD-02 — Architecture and Trust Model

---

## 1. Deployment Topology

In the default SaaS deployment, the entire server-side stack runs on provider-managed infrastructure — currently a Hetzner CPX31 VPS. Each tenant is provisioned as an isolated set of Docker containers (C++ server, PostgreSQL database, Go sidecar) alongside the shared coordination services (Redpanda broker, mesh server, portal, Caddy reverse proxy). Clients — the Qt 6 desktop application and web browsers — run at the tenant's site and connect to the VPS through Cloudflare Zero Trust tunnels.

A self-hosted deployment option exists for organizations with data sovereignty requirements that cannot be met by the managed model — defense contractors, aerospace manufacturers, or tenants subject to jurisdictional data residency mandates. In this mode, the tenant runs the full server-side stack on their own infrastructure and connects to the central broker through a Cloudflare tunnel for B2B federation. This is the exception, not the default.

The central infrastructure provides coordination services: the Redpanda event broker for cross-tenant B2B event federation, the Go mesh server for tenant registry and API proxying, and the Caddy reverse proxy for routing. The tenant registry knows that a tenant exists, what its subscription tier is, and which containers serve it. The broker sees events in transit — structured messages about commercial transactions — but does not store or index the underlying business records.

The consequence of this design is that the VPS is operationally critical. If it goes offline, all SaaS tenants lose access to their ERP servers and databases, not just the coordination layer. Self-hosted tenants lose only cross-tenant event propagation and portal access.

## 2. The Tenant Stack

Each tenant is provisioned with the following server-side components, running as Docker containers on the VPS in the SaaS deployment (or on the tenant's own infrastructure in the self-hosted case).

The **C++ server** (Qt 6, port 8080) handles all business logic, REST API endpoints, authentication, and database access. It exposes 150+ endpoints across 22 route modules. The server runs a thread pool (default 10 threads) and includes an in-memory cache (512 MB default, TTL-based eviction), a per-endpoint rate limiter, structured JSON logging with file rotation, and a metrics collector exposed at `/metrics`.

The **PostgreSQL database** (version 13+) contains 127 tables, 150+ indexes, and the complete ERP schema — CRM, sales, purchasing, manufacturing, warehouse, finance, quality, service, HR, projects, PLM, workflow engine, and audit trail. Every entity table carries a `tenant_id` column. The schema is deployed from a single canonical SQL file (3,810 lines) with eight numbered migrations applied in sequence.

The **B2BEventHub** (port 8081) is a WebSocket server embedded in the C++ process. It handles real-time event delivery to locally connected clients and, when federation is enabled, forwards events to the central Redpanda broker through a relay. Clients authenticate their WebSocket connection by sending a JWT as their first message.

The **Go sidecar** bridges the tenant's C++ server to the central Redpanda broker. In the SaaS deployment, it runs alongside the other tenant containers on the VPS and connects to Redpanda on the Docker network. In a self-hosted deployment, it establishes a Cloudflare Access tunnel outbound to the central broker. In both cases, it registers the tenant's endpoints with the mesh server and exposes a health check at `/healthz`. If connectivity to the broker drops, the sidecar reports unhealthy and the C++ server's relay enters a reconnection loop with exponential backoff.

The following components run at the tenant's site, not on the VPS:

The **desktop client** (Qt 6 Widgets/QML) provides a native interface for power users — warehouse operators, production planners, finance teams — who need fast, dense interfaces. It connects to the tenant's C++ server via HTTP and WebSocket through the Cloudflare tunnel.

The **web application** (Next.js 14, App Router) provides browser-based access. It communicates with the C++ server via Axios with bearer token authentication and subscribes to WebSocket events for real-time updates. In the current alpha, the web application is partially implemented: 13 module pages are scaffolded with CRUD panels, but several lack full feature parity with the desktop client.

## 3. The Central Infrastructure

The central VPS runs five always-on services and several optional ones.

The **mesh PostgreSQL** instance stores tenant registry metadata: tenant IDs, slugs, subscription tiers, database container names, connection logs, tunnel endpoints, and trading partner relationships. It does not store any tenant business data. This is the `ygg_central` database, which has 13 models managed by a Prisma schema in the marketing site repository.

The **Go mesh server** (port 8080 internally) provides tenant registry CRUD, API proxying from the portal to tenant servers via tunnels, health monitoring with periodic checks, credential notification via SMTP, and trading partner management. When the portal needs to query a tenant's ERP data, the mesh server resolves the tenant's slug to a tunnel endpoint and proxies the request.

**Redpanda** (Kafka-compatible, ports 9092 internal / 19092 external) hosts 12 event topics — one per business module (`ygg.events.crm`, `ygg.events.sales`, etc.), a dead-letter queue, and a mesh command topic. Topics are configured with 3 partitions and 7-day retention. Events flow through Redpanda; they are not aggregated or analyzed there. The broker is a pipe, not a warehouse.

**Caddy** handles reverse proxying based on hostname. The marketing site, web portal, and Redpanda console each get their own subdomain, all routed to the appropriate container. TLS terminates at the Cloudflare edge.

The **Cloudflare tunnel** provides zero-trust ingress. External hostnames (mimirlabs.net, app.mimirlabs.net, broker.mimirlabs.net, db.mimirlabs.net) route through Cloudflare to the Caddy proxy or directly to TCP services. Desktop clients and web browsers at tenant sites reach their tenant's server through these tunnels. Self-hosted tenants run their own outbound tunnel to the broker for B2B federation.

## 4. Multi-Tenancy and Data Isolation

Yggdrasil's multi-tenancy operates at two levels.

At the **database level**, the system uses a shared-schema, tenant-scoped model. All 127 tables carry a `tenant_id` UUID column. Every query filters by tenant. Unique constraints are scoped to the tenant (e.g., `(tenant_id, role_name)` prevents cross-tenant role name collisions). Soft-delete columns (`deleted_at`, `deleted_by`) exist on 16 business entity tables to support correction workflows without physical deletion.

The current enforcement mechanism is application-layer WHERE clauses. The C++ server's route handlers and the Repository abstraction include tenant filtering on all queries. PostgreSQL Row-Level Security (RLS) policies are designed but not yet enforced — they are on the SOC 2 roadmap as a Phase 2 control (Control 2.5). This is a known gap. Until RLS is enabled, isolation depends entirely on the correctness of the application layer.

At the **infrastructure level**, the SaaS deployment provisions a separate PostgreSQL container per tenant (`ygg-db-{slug}`) on the VPS, which provides container-level isolation in addition to the schema-level isolation. Each tenant's database runs in its own Docker container with its own named volume — tenants do not share a PostgreSQL process. Self-hosted tenants (data sovereignty exceptions) run their own PostgreSQL instance entirely, making the isolation question moot at that layer.

The marketing site and portal (the `mimirlabs` repository) maintain a separate database (`ygg_central`) with a Prisma schema covering organizations, users, subscriptions, invitations, support tickets, service requests, module activations, and tenant connection metadata. This database has no access to any tenant's ERP data. The portal reaches tenant ERP data only through the mesh server proxy, which routes requests through the Cloudflare tunnel to the tenant's C++ server.

## 5. Authentication

The system has two separate authentication domains.

The **ERP server** uses JWT tokens with HS256 signing. Token expiry is 60 minutes. Refresh tokens extend sessions to 7 days. Passwords are hashed with bcrypt (cost factor 12). The JWT payload includes `userId`, `tenantId`, and custom claims. A user who belongs to multiple tenants is prompted to select one at login; the selected tenant is encoded in the JWT and enforced via the `X-Tenant-ID` header on all subsequent requests.

The **portal** (marketing site) uses a separate JWT system: HS256 signing via the `jose` library, 7-day expiry, stored in an `httpOnly` cookie (`ygg_session`). Passwords are hashed with bcryptjs (cost factor 10). The portal JWT payload includes `userId`, `tenantId`, `email`, `role`, `slug`, and `plan`. There is no single sign-on between the portal and the ERP server at this time.

Both systems lack MFA, account lockout on failed attempts, and password complexity enforcement. These are identified as gaps in the SOC 2 roadmap (Phase 2, Controls 2.1-2.2; Phase 3, Control 3.4).

## 6. Authorization

The ERP server implements role-based access control through four tables: `tenant_roles` (custom roles per tenant), `permissions` (system-wide permission catalog, 50+ entries), `role_permissions` (assignments), and `user_roles` (user-to-role mapping, many-to-many). Permissions are module-scoped (e.g., `crm.read`, `sales.write`, `manufacturing.execute`). System roles (Admin, User) cannot be deleted. Tenants can define custom roles and assign arbitrary permission combinations.

Authorization checks happen at the controller level. Route handlers call `checkModuleAccess(req, "module_name")` or use `RouteHelpers::requirePermission()`. The enforcement is manual — each endpoint must include the check. There is no middleware that automatically enforces RBAC before the handler runs. This is a second known gap, addressed in the SOC 2 roadmap as Phase 2, Control 2.4 (PermissionMiddleware).

The portal uses a simpler three-tier role system: `owner`, `admin`, `member`. Owners can delete organizations and manage billing. Admins can manage team members and invitations. Members have read access to portal features. These roles are checked inline in each API route handler.

## 7. Cross-Tenant Event Federation

When two tenants establish a trading partnership — registered in the `mesh_partners` table via the mesh server — the system enables automatic event propagation between them. The federation mechanism works as follows.

A mutation on Tenant A's C++ server (e.g., creating a sales order with `b2b_sync_enabled=true`) triggers a PostgreSQL `NOTIFY` on the `sales_order_status_changed` channel. The C++ server's pg_notify listener intercepts this and calls `B2BEventHub::publishEvent()` with the source tenant, destination tenant, event type, and payload. The event hub persists the event to the `b2b_events` table with status `pending`, delivers it to any locally connected WebSocket clients, and forwards it to the configured federation relay.

If the federation mode is `redpanda`, the RedpandaRelay serializes the event as a Kafka message and publishes it to the appropriate module topic (e.g., `ygg.events.sales`). The destination tenant's sidecar, connected to the central broker through its Cloudflare tunnel, consumes the event. The sidecar's RedpandaRelay delivers it to the local B2BEventHub, which updates the event status and pushes it to connected clients.

The system includes echo suppression — events are tagged with their source node ID, and relays discard events that originated from the local node. Failed events are marked in the `b2b_events` table and retried every 30 seconds.

Three federation modes are supported, configured in `server.conf`: `none` (standalone, no cross-tenant sync), `redis` (Redis Pub/Sub for simple local-network deployments), and `redpanda` (Kafka-compatible broker for production B2B across organizations). The mode can be changed at runtime by restarting the server.

## 8. Trust Boundaries

The system has four trust boundaries that matter for due diligence purposes.

**Tenant to ERP server.** The tenant trusts the C++ server and PostgreSQL database provisioned for them to enforce access control, maintain data integrity, and correctly scope queries. In the SaaS deployment, these run on the provider's VPS as isolated containers — the tenant trusts the provider to maintain that isolation and to not access the tenant's data outside the scope of service delivery. In a self-hosted deployment, the tenant controls the infrastructure directly. This trust boundary is the most consequential one: it is where the provider's operational access and the tenant's data sovereignty overlap.

**Tenant to event broker.** The tenant trusts the Redpanda broker to deliver cross-tenant events without modification, not to persist them beyond the configured retention window, and not to expose them to unauthorized consumers. In the SaaS deployment, the broker runs on the same VPS as the tenant's server, so this is a trust boundary within provider-managed infrastructure rather than across a network. The broker does not authenticate consumers at the application level — any sidecar with access to the Docker network (or, for self-hosted tenants, a valid Cloudflare Access token) can consume from the shared topics. Topic-level ACLs are not currently configured. Events contain `sourceTenantId` and `destTenantId` fields; the receiving tenant's server validates the source against its partner registry before processing.

**Tenant to trading partner.** When Tenant A sends an event to Tenant B, both tenants trust that the event schema is accurate (enforced by the shared software) and that the event represents an actual business action (enforced by the source tenant's server logic). Neither tenant trusts the other to maintain their copy of the data correctly — each side keeps its own records. The event is an advisory notification, not a binding instruction. Tenant B's server decides what to do with incoming events based on its own business rules and workflow configuration.

**Portal to tenant.** The portal (marketing site / customer dashboard) trusts the mesh server to correctly resolve tenant slugs and proxy requests to the right tenant server. The tenant server trusts the portal's JWT to identify the requesting user and tenant. The mesh server does not inspect or cache the request/response payload — it is a transparent proxy.

## 9. What the Architecture Does Not Do

The architecture does not provide a unified query layer across tenants. There is no way to run a query that spans two tenants' databases. Cross-tenant visibility happens through events, not through shared queries.

The architecture does not enforce ordering guarantees on cross-tenant events beyond what Kafka provides within a partition. Events within the same topic partition are ordered; events across partitions or topics are not. The system does not implement distributed transactions across tenants.

The architecture does not provide automatic conflict resolution for cross-tenant workflows. If Tenant A ships an order and Tenant B disputes the shipment, there is no system-level arbitration. Both tenants record their own version of events. The audit trail on each side provides evidence, but resolution is a business process, not a technical mechanism.

The architecture does not currently provide end-to-end encryption of event payloads. Events are encrypted in transit (Cloudflare tunnel TLS) but are readable in plaintext at the broker and at both tenant servers. Field-level encryption for sensitive data within events is not implemented.

---

*Document version: 1.0 — February 2026*
*System version: Yggdrasil v0.4.4a (alpha)*
