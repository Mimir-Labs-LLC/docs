# DD-05 — Maturity and Risk Assessment

---

## 1. Purpose

This document provides an honest inventory of the system's current state — what is built, what is incomplete, and what is absent. It is written for someone who needs to decide whether to invest in, partner with, or deploy this system, and who needs to know precisely where the risks are. The system is at version 0.4.4a, alpha maturity, with zero production deployments and zero paying customers.

## 2. What Is Built and Working

The C++ backend server implements 150+ REST endpoints across 22 route modules. All 11 business modules — CRM, Sales, Purchasing, Manufacturing, Warehouse, Finance, Projects, PLM, Quality, Service, and HR — have functional CRUD operations with tenant-scoped data access, JWT authentication, and role-based authorization. The B2BEventHub provides real-time WebSocket event streaming with Redis and Redpanda federation. The database schema covers 140+ tables with 150+ indexes, a field-level audit trail with database-enforced immutability (migration 014 — triggers prevent UPDATE, DELETE, and TRUNCATE on the audit log), soft-delete support, and a workflow engine.

The Qt 6 desktop client provides a native interface to all modules with WebSocket event integration, dark/light theming, persistent credentials, and module-specific views. PLM features are particularly mature: EBOM with option groups and revision control, MBOM generation from EBOM, routing management, and engineering change orders.

The infrastructure layer works: Docker Compose orchestration, Cloudflare Zero Trust tunneling, Caddy reverse proxying, Redpanda event brokering, Go mesh server with tenant registry and API proxying, Go sidecar with tunnel health checks, tenant provisioning scripting, systemd service management, and a CI/CD pipeline with 12 jobs covering lint, unit tests, builds, schema validation, migration linting (Data Preservation Policy enforcement with checksum verification), schema backward-compatibility testing (golden SQL queries against N-1 API versions), and automatic version tagging.

The carrier integration is complete: server-side UPS, FedEx, and USPS REST API integration with tenant-isolated credentials, multi-carrier rate shopping, label generation, live tracking, and shipment void. OAuth token caching, audit logging, and the carrier settings UI in the web application are all implemented.

The web application is connected to all 11 backend module APIs, with client-side form validation using Zod schemas, a 401/session expiry error boundary with automatic redirect to login, and a charting library (Recharts) integrated with module-specific analytics dashboards for warehouse, manufacturing, and finance. File attachments use a polymorphic schema with server-side upload, download, and delete endpoints across Quality, Service, and PLM modules.

The marketing site and portal have complete public pages (pricing, features, modules, checkout), authentication flows, team management, support tickets, service requests, and Square/BoldSign integrations for payment and contract signing.

## 3. What Is Incomplete

The **web application** has made significant progress but remains the largest area of incomplete work. All 13 module pages are scaffolded with CRUD panels and connected to the backend APIs. Line items on sales orders, purchase orders, invoices, and journal entries are implemented via the DocumentBuilder component. Client-side Zod validation, a 401/session expiry error boundary, file attachments, and charting dashboards have been added. However, the web application still lacks WebSocket client integration (no real-time push updates — planned, YGGDATA-162), server-side pagination (large tables lag — planned, YGGDATA-34), global search (planned, YGGDATA-170), PDF/print generation (planned, YGGDATA-146), notification/toast system (planned, YGGDATA-162/245), and bulk operations (planned, YGGDATA-275). The main dashboard still displays some hardcoded statistics alongside the new module-specific analytics charts (live dashboard counters planned, YGGDATA-248).

The **business flow integrations** between modules are broken. Quote-to-sales-order conversion has a server endpoint but no UI button (planned, YGGDATA-270). Sales-order-to-invoice creation has an endpoint (`POST /sales/orders/{id}/invoice`) but no UI trigger (planned, YGGDATA-271). MRP generates planned orders but provides no mechanism to confirm them into real purchase orders or work orders (planned, YGGDATA-272). Receiving is header-level only — per-line partial receiving is not implemented (planned, YGGDATA-273). Work order material issuing and operation clock-in/out are read-only or absent (planned, YGGDATA-274). The order-to-cash, procure-to-pay, and make-to-order workflows all require manual data re-entry at transition points. For a manufacturing ERP, these broken flows are the most significant functional gap. All six workflow transition gaps have been cataloged as stories under the Workflow Transition UI Triggers epic (YGGDATA-262).

The **portal DAL** uses in-memory Maps (`globalThis` stores in `dal.ts`) instead of the Prisma/PostgreSQL implementation. Every process restart loses all portal data — organizations, users, subscriptions, tickets, everything. The Prisma schema defines 13 models, migrations exist, and the database connection code is stubbed. The swap has not been made. This is the single most critical production-blocking defect (planned, YGGDATA-258).

**Email sending** is not functional. The system uses `nodemailer` but falls back to `console.log` when SMTP is not configured, which is the current state of the managed deployment. Password resets, team invitations, support ticket acknowledgments, and order confirmations all log to stdout rather than sending email (planned, YGGDATA-144 epic).

## 4. Security Posture

The security posture is early-stage. Foundations exist, but hardening has not been performed. All security gaps described below have been cataloged in the Security Hardening epic (YGGDATA-261) with individual stories for each remediation area.

**Authentication weaknesses.** No MFA on either the ERP server or the portal. No account lockout after failed login attempts. No password complexity enforcement (the portal requires 8 characters minimum; the ERP server uses bcrypt but does not enforce complexity rules). The ERP server's JWT secret is set to `change_me_in_production` in the default configuration file. The web application stores auth tokens in `localStorage`, which is vulnerable to XSS — the portal correctly uses `httpOnly` cookies. No email verification is performed on signup, allowing fake accounts. Planned remediation: YGGDATA-263 (MFA, lockout, complexity), YGGDATA-265 (localStorage to httpOnly), YGGDATA-266 (email verification).

**Authorization weaknesses.** RBAC permissions exist in the database (50+ permissions across modules), but enforcement is not automatic. Each route handler must manually call the authorization check. There is no middleware that intercepts requests before reaching the handler. A missed check means an endpoint is effectively unprotected. PostgreSQL Row-Level Security is designed but not enabled — tenant isolation depends entirely on application-layer WHERE clauses. A bug in any query that omits the tenant filter could leak data across tenants. Planned remediation: YGGDATA-267 (RBAC middleware), YGGDATA-268 (RLS enablement).

**Encryption weaknesses.** SSL is disabled by default in the server configuration (`EnableSSL=false`). CORS is configured to accept all origins (`CORSOrigins=*`). Backups are not encrypted. Carrier API credentials are stored as plaintext in the database. The JWT secret, database passwords, and other sensitive configuration values are stored in plaintext config files with no vault integration. Planned remediation: YGGDATA-27/182 (SSL), YGGDATA-264 (vault integration, JWT secret, credential encryption, backup encryption), YGGDATA-269 (CORS restriction).

**Rate limiting.** The C++ server implements per-endpoint rate limiting (100 requests/60 seconds default, 50/60 for auth). The portal has no rate limiting on authentication endpoints (planned remediation: YGGDATA-269).

## 5. Compliance Readiness

The SOC 2 roadmap identifies 12 risks across 6 phases. Three risks were originally rated Critical: no immutable audit trail (R1), SSL disabled (R2, configuration change), and no RLS (R4, PostgreSQL policy deployment). R1 has been partially addressed — migration 014 installs database triggers that prevent modification or deletion of audit records, closing the immutability gap. The remaining piece of R1 — moving audit capture itself from application-level writes to database-level triggers so that capture is transactionally bound to the data change — is not yet implemented. The remaining Critical risks (R2, R4) are unchanged. Four risks are rated High: CORS wildcard (R3), RBAC not enforced at endpoint level (R5), SHA-256 passwords on the ERP server — the document references SHA-256, though the code uses bcrypt (R6), secrets in plaintext config files (R7), and unencrypted backups (R8).

Phase 1 (audit and encryption foundations) and Phase 2 (access control hardening) contain the controls needed for basic security hygiene. Phase 3 (data protection and secrets) addresses field-level encryption, vault integration, and MFA. Type I readiness — attesting that controls are suitably designed — is targeted after Phase 3. Type II — attesting that controls operated effectively over a review period — requires a 6-month observation window after Phase 3 controls are live.

Ten policy documents are drafted (Information Security, Access Control, Data Classification, Encryption, Incident Response, Business Continuity/DR, Data Retention, Vendor Risk Management, Change Management, Privacy). All are in draft status. None have been approved by management or put into operational effect.

The system does not address GDPR, ITAR, FDA 21 CFR Part 11, or any industry-specific compliance framework. The contractual language (SaaS agreement) includes data location, data portability, and data protection clauses, but these are not backed by implemented technical controls beyond the tenant isolation model.

## 6. Testing Coverage

Testing coverage is thin. The C++ server has approximately 5 test files covering CacheManager and Validator with 21 unit tests (Catch2). The web application has 3 test files covering the API client, geo/territory utilities, and CrudPanel with approximately 14 tests (Vitest). The desktop client has zero tests. The marketing site has zero tests.

The integration test framework is more substantial: 20 business-process arcs with 106 story files covering CRUD operations, cross-module workflows, security, and compliance scenarios. However, these require a running C++ server and database, do not run in CI, and are not executed automatically on any code change.

The CI pipeline runs 12 jobs: web linting, web unit tests, web build, server build, server unit tests, client build, client tests, schema validation, migration linting (enforces Data Preservation Policy — no column/table drops, idempotent DDL, checksum integrity), schema backward-compatibility testing (golden SELECT queries verifying N-1 API compatibility), automatic version tagging (creates git tags when the VERSION file changes), and a notification job summarizing results. Integration tests are not part of CI. There are no end-to-end browser tests (planned, YGGDATA-184). There is no SAST, dependency scanning, or SBOM generation (planned, YGGDATA-276).

## 7. Architectural Risks

**Coordination VPS concentration.** The central VPS hosts the coordination infrastructure — the Redpanda event broker, Go mesh server, customer portal, and Caddy reverse proxy. Each tenant's C++ server and PostgreSQL database run locally on tenant hardware, not on the VPS. A VPS failure therefore does not affect tenant ERP operations — tenants continue running in standalone mode. What fails is the coordination layer: cross-tenant B2B event federation stops, the customer portal becomes unreachable, and the mesh server's health monitoring and API proxying halt. The Redpanda instance is a single node with no replication. Mimir Labs is pursuing partnerships with Fastly and/or Cloudflare for edge-level redundancy and CDN-based failover, which would distribute the coordination layer across multiple points of presence and eliminate the single-VPS dependency for the management plane (planned, YGGDATA-252).

**In-memory portal DAL.** As noted, the portal's use of in-memory Maps means that any restart of the portal process — planned deployment, crash, VPS reboot — destroys all coordination metadata. This is not a theoretical risk; it will occur on the first production deployment if not addressed (planned remediation: YGGDATA-258).

**Tenant isolation without RLS.** Row-Level Security at the PostgreSQL level would provide defense-in-depth for tenant data isolation. Without it, a single query bug in any of the 150+ API endpoints could expose one tenant's data to another. The application-layer enforcement is consistent in pattern but has not been formally verified across all endpoints (planned remediation: YGGDATA-268).

**No distributed transaction guarantees.** Cross-tenant workflows rely on eventual consistency with manual reconciliation as a fallback. There are no saga patterns, compensation transactions, or automatic conflict detection. For low-volume B2B relationships (tens of orders per day), this is manageable. For high-volume integrations, the lack of idempotency keys and ordering guarantees could produce data quality issues. Planned improvements include event sequence numbers (YGGDATA-254), consumer-side idempotency keys (YGGDATA-255), and cross-tenant divergence detection (YGGDATA-257).

**Small development team.** The system is built by a small team at Mimir Labs. Feature development, bug fixes, security hardening, customer support, and infrastructure operations must all be served from the same capacity pool. The roadmap is ambitious relative to the team size.

## 8. Financial and Operational Risks

**Zero revenue.** The system has no paying customers and no production deployments. The pricing model (Starter at $800/month, Professional at $1,900/month, Enterprise at $4,800/month) is untested against market willingness to pay. The competitive landscape includes well-funded incumbents with established sales channels and open-source alternatives with large communities.

**Infrastructure costs are low.** The coordination VPS runs on a Hetzner CPX31 at approximately EUR 12.49/month, hosting the Redpanda broker, mesh server, portal, and Caddy reverse proxy. Tenant servers and databases run on tenant hardware, not on the VPS. Cloudflare Zero Trust tunneling is free at the current usage tier. Redpanda is self-hosted. Total provider infrastructure cost for the current architecture is under $50/month, which is favorable for a pre-revenue product. Scaling the coordination layer to handle more tenants and higher event throughput will require a larger VPS or distributed deployment, but tenant-side infrastructure scales independently with each customer.

**Licensing.** The system uses open-source components (Qt 6, PostgreSQL, Redpanda, Cloudflare, Node.js, React) under permissive or compatible licenses. Redpanda uses the BSL 1.1 license, which converts to Apache 2.0 after the change date. The ERP itself is proprietary under the Mimir Labs EULA. No third-party commercial licenses are required for the current stack.

## 9. What Would Need to Be True for Production

The following conditions would need to be met before the system could be responsibly deployed to a production environment with paying customers. This is not a roadmap — it is a minimum viable set of prerequisites.

The portal DAL must be migrated from in-memory Maps to the Prisma/PostgreSQL implementation. This is a data-loss-on-restart defect that is incompatible with any form of production use.

Email sending must work. Password resets, team invitations, and critical notifications cannot log to stdout in production.

The business flow transitions — quote to order, order to invoice, MRP to purchase order, sales order to work order — must have UI triggers. Without them, the system requires manual re-entry at every workflow transition, which defeats the purpose of an integrated ERP.

SSL must be enabled by default. CORS must be restricted to explicit origins. The JWT secret must not be a placeholder string in a plaintext config file. Auth tokens in the web application must move from `localStorage` to `httpOnly` cookies.

PostgreSQL RLS should be enabled on all tenant-scoped tables. The RBAC authorization check should be enforced via middleware rather than relying on each handler to call it manually.

Backups must be encrypted and restore-tested. The backup schedule must be validated, and at least one successful restore from backup must be documented.

The web application's WebSocket client must be connected so that real-time updates propagate to browser-based users. Without this, the web application is a polling-only interface to a system designed around real-time events.

None of these items represent architectural changes. They are implementation completion, configuration hardening, and testing. The architecture supports all of them; the work has not been done.

## 10. Assessment

Yggdrasil is an architecturally sound system with a large functional surface area and a clear technical vision for cross-enterprise coordination. The database schema is comprehensive. The server-side business logic covers 11 modules with 150+ endpoints. The deployment model — each tenant running its own C++ server and PostgreSQL database on local hardware, with a central coordination VPS for B2B event federation and portal services — provides natural data isolation and operational independence from the provider's infrastructure.

The system is not production-ready. The security posture has known critical gaps. The web application is partially implemented. Core business workflows are disconnected. The portal's data persistence is ephemeral. Test coverage is thin. Compliance preparation is in planning, not in execution.

The distance from the current state to a production-capable state is measurable and finite. The gaps are enumerated in the audit documents and the SOC 2 roadmap. None of them require rearchitecting the system. They require finishing work that has been started, hardening configurations that have been left in development defaults, and testing what has been built. The question for any evaluator is whether the team has the capacity to close those gaps within the timeframe required by the business plan.

---

*Document version: 1.2 — February 2026*
*System version: Yggdrasil v0.4.4a (alpha)*
