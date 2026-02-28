# DD-05 — Maturity and Risk Assessment

---

## 1. Purpose

This document provides an honest inventory of the system's current state — what is built, what is incomplete, and what is absent. It is written for someone who needs to decide whether to invest in, partner with, or deploy this system, and who needs to know precisely where the risks are. The system is at version 0.4.4a, alpha maturity, with zero production deployments and zero paying customers.

## 2. What Is Built and Working

The C++ backend server implements 150+ REST endpoints across 22 route modules. All 11 business modules — CRM, Sales, Purchasing, Manufacturing, Warehouse, Finance, Projects, PLM, Quality, Service, and HR — have functional CRUD operations with tenant-scoped data access, JWT authentication, and role-based authorization. The B2BEventHub provides real-time WebSocket event streaming with Redis and Redpanda federation. The database schema covers 140+ tables with 150+ indexes, a field-level audit trail with database-enforced immutability (migration 014 — triggers prevent UPDATE, DELETE, and TRUNCATE on the audit log), soft-delete support, and a workflow engine.

The Qt 6 desktop client provides a native interface to all modules with WebSocket event integration, dark/light theming, persistent credentials, and module-specific views. PLM features are particularly mature: EBOM with option groups and revision control, MBOM generation from EBOM, routing management, and engineering change orders.

The infrastructure layer works: Docker Compose orchestration, Cloudflare Zero Trust tunneling, Caddy reverse proxying, Redpanda event brokering, Go mesh server with tenant registry and API proxying, Go sidecar with tunnel health checks, tenant provisioning scripting, systemd service management, and a CI/CD pipeline with 12 jobs covering lint, unit tests, builds, schema validation, migration linting (Data Preservation Policy enforcement with checksum verification), schema backward-compatibility testing (golden SQL queries against N-1 API versions), and automatic version tagging.

The carrier integration is complete: server-side UPS, FedEx, and USPS REST API integration with tenant-isolated credentials, multi-carrier rate shopping, label generation, live tracking, and shipment void. OAuth token caching, audit logging, and the carrier settings UI in the web application are all implemented.

The marketing site and portal have complete public pages (pricing, features, modules, checkout), authentication flows, team management, support tickets, service requests, and Square/BoldSign integrations for payment and contract signing.

## 3. What Is Incomplete

The **web application** is the largest area of incomplete work. Thirteen module pages are scaffolded with CRUD panels, but several critical features are missing or partially implemented. Line items on sales orders, purchase orders, invoices, and journal entries were recently added via the DocumentBuilder component, but the web application lacks WebSocket client integration (no real-time updates anywhere), session/token refresh (long sessions expire silently), pagination (large tables lag), global search, PDF/print generation, file attachments, notification/toast system, and bulk operations. The dashboard displays hardcoded statistics rather than querying the backend.

The **business flow integrations** between modules are broken. Quote-to-sales-order conversion has a server endpoint but no UI button. Sales-order-to-invoice creation has an endpoint (`POST /sales/orders/{id}/invoice`) but no UI trigger. MRP generates planned orders but provides no mechanism to confirm them into real purchase orders or work orders. Receiving is header-level only — per-line partial receiving is not implemented. Work order material issuing and operation clock-in/out are read-only or absent. The order-to-cash, procure-to-pay, and make-to-order workflows all require manual data re-entry at transition points. For a manufacturing ERP, these broken flows are the most significant functional gap.

The **portal DAL** uses in-memory Maps (`globalThis` stores in `dal.ts`) instead of the Prisma/PostgreSQL implementation. Every process restart loses all portal data — organizations, users, subscriptions, tickets, everything. The Prisma schema defines 13 models, migrations exist, and the database connection code is stubbed. The swap has not been made. This is the single most critical production-blocking defect.

**Email sending** is not functional. The system uses `nodemailer` but falls back to `console.log` when SMTP is not configured, which is the current state of the managed deployment. Password resets, team invitations, support ticket acknowledgments, and order confirmations all log to stdout rather than sending email.

## 4. Security Posture

The security posture is early-stage. Foundations exist, but hardening has not been performed.

**Authentication weaknesses.** No MFA on either the ERP server or the portal. No account lockout after failed login attempts. No password complexity enforcement (the portal requires 8 characters minimum; the ERP server uses bcrypt but does not enforce complexity rules). The ERP server's JWT secret is set to `change_me_in_production` in the default configuration file. The web application stores auth tokens in `localStorage`, which is vulnerable to XSS — the portal correctly uses `httpOnly` cookies. No email verification is performed on signup, allowing fake accounts.

**Authorization weaknesses.** RBAC permissions exist in the database (50+ permissions across modules), but enforcement is not automatic. Each route handler must manually call the authorization check. There is no middleware that intercepts requests before reaching the handler. A missed check means an endpoint is effectively unprotected. PostgreSQL Row-Level Security is designed but not enabled — tenant isolation depends entirely on application-layer WHERE clauses. A bug in any query that omits the tenant filter could leak data across tenants.

**Encryption weaknesses.** SSL is disabled by default in the server configuration (`EnableSSL=false`). CORS is configured to accept all origins (`CORSOrigins=*`). Backups are not encrypted. Carrier API credentials are stored as plaintext in the database. The JWT secret, database passwords, and other sensitive configuration values are stored in plaintext config files with no vault integration.

**Rate limiting.** The C++ server implements per-endpoint rate limiting (100 requests/60 seconds default, 50/60 for auth). The portal has no rate limiting on authentication endpoints.

## 5. Compliance Readiness

The SOC 2 roadmap identifies 12 risks across 6 phases. Three risks were originally rated Critical: no immutable audit trail (R1), SSL disabled (R2, configuration change), and no RLS (R4, PostgreSQL policy deployment). R1 has been partially addressed — migration 014 installs database triggers that prevent modification or deletion of audit records, closing the immutability gap. The remaining piece of R1 — moving audit capture itself from application-level writes to database-level triggers so that capture is transactionally bound to the data change — is not yet implemented. The remaining Critical risks (R2, R4) are unchanged. Four risks are rated High: CORS wildcard (R3), RBAC not enforced at endpoint level (R5), SHA-256 passwords on the ERP server — the document references SHA-256, though the code uses bcrypt (R6), secrets in plaintext config files (R7), and unencrypted backups (R8).

Phase 1 (audit and encryption foundations) and Phase 2 (access control hardening) contain the controls needed for basic security hygiene. Phase 3 (data protection and secrets) addresses field-level encryption, vault integration, and MFA. Type I readiness — attesting that controls are suitably designed — is targeted after Phase 3. Type II — attesting that controls operated effectively over a review period — requires a 6-month observation window after Phase 3 controls are live.

Ten policy documents are drafted (Information Security, Access Control, Data Classification, Encryption, Incident Response, Business Continuity/DR, Data Retention, Vendor Risk Management, Change Management, Privacy). All are in draft status. None have been approved by management or put into operational effect.

The system does not address GDPR, ITAR, FDA 21 CFR Part 11, or any industry-specific compliance framework. The contractual language (SaaS agreement) includes data location, data portability, and data protection clauses, but these are not backed by implemented technical controls beyond the tenant isolation model.

## 6. Testing Coverage

Testing coverage is thin. The C++ server has approximately 5 test files covering CacheManager and Validator with 21 unit tests (Catch2). The web application has 3 test files covering the API client, geo/territory utilities, and CrudPanel with approximately 14 tests (Vitest). The desktop client has zero tests. The marketing site has zero tests.

The integration test framework is more substantial: 20 business-process arcs with 106 story files covering CRUD operations, cross-module workflows, security, and compliance scenarios. However, these require a running C++ server and database, do not run in CI, and are not executed automatically on any code change.

The CI pipeline runs 12 jobs: web linting, web unit tests, web build, server build, server unit tests, client build, client tests, schema validation, migration linting (enforces Data Preservation Policy — no column/table drops, idempotent DDL, checksum integrity), schema backward-compatibility testing (golden SELECT queries verifying N-1 API compatibility), automatic version tagging (creates git tags when the VERSION file changes), and a notification job summarizing results. Integration tests are not part of CI. There are no end-to-end browser tests (no Playwright or Cypress). There is no SAST, dependency scanning, or SBOM generation.

## 7. Architectural Risks

**Single-VPS concentration.** All SaaS tenant servers, databases, the Redpanda broker, and the portal run on a single Hetzner VPS. A VPS failure is a total outage for all tenants, not a degraded-mode scenario. There is no automatic failover, no database replication, and no geographic redundancy. The Redpanda instance is a single node with no replication. Multi-node deployment with database replication is planned but not implemented.

**In-memory portal DAL.** As noted, the portal's use of in-memory Maps means that any restart of the portal process — planned deployment, crash, VPS reboot — destroys all coordination metadata. This is not a theoretical risk; it will occur on the first production deployment if not addressed.

**Tenant isolation without RLS.** Row-Level Security at the PostgreSQL level would provide defense-in-depth for tenant data isolation. Without it, a single query bug in any of the 150+ API endpoints could expose one tenant's data to another. The application-layer enforcement is consistent in pattern but has not been formally verified across all endpoints.

**No distributed transaction guarantees.** Cross-tenant workflows rely on eventual consistency with manual reconciliation as a fallback. There are no saga patterns, compensation transactions, or automatic conflict detection. For low-volume B2B relationships (tens of orders per day), this is manageable. For high-volume integrations, the lack of idempotency keys and ordering guarantees could produce data quality issues.

**Small development team.** The system is built by a small team at Mimir Labs. Feature development, bug fixes, security hardening, customer support, and infrastructure operations must all be served from the same capacity pool. The roadmap is ambitious relative to the team size.

## 8. Financial and Operational Risks

**Zero revenue.** The system has no paying customers and no production deployments. The pricing model (Starter at $800/month, Professional at $1,900/month, Enterprise at $4,800/month) is untested against market willingness to pay. The competitive landscape includes well-funded incumbents with established sales channels and open-source alternatives with large communities.

**Infrastructure costs are low.** The VPS runs on a Hetzner CPX31 at approximately EUR 12.49/month, hosting all tenant containers and coordination services. Cloudflare Zero Trust tunneling is free at the current usage tier. Redpanda is self-hosted. Total infrastructure cost for the current architecture is under $50/month, which is favorable for a pre-revenue product but also reflects the single-VPS concentration risk — scaling to production load will require larger or multiple hosts, and the cost model will change accordingly.

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

Yggdrasil is an architecturally sound system with a large functional surface area and a clear technical vision for cross-enterprise coordination. The database schema is comprehensive. The server-side business logic covers 11 modules with 150+ endpoints. The multi-tenant container model — each tenant provisioned as an isolated set of containers on provider infrastructure, with a self-hosted option for data sovereignty cases — is practical for the target market.

The system is not production-ready. The security posture has known critical gaps. The web application is partially implemented. Core business workflows are disconnected. The portal's data persistence is ephemeral. Test coverage is thin. Compliance preparation is in planning, not in execution.

The distance from the current state to a production-capable state is measurable and finite. The gaps are enumerated in the audit documents and the SOC 2 roadmap. None of them require rearchitecting the system. They require finishing work that has been started, hardening configurations that have been left in development defaults, and testing what has been built. The question for any evaluator is whether the team has the capacity to close those gaps within the timeframe required by the business plan.

---

*Document version: 1.1 — February 2026*
*System version: Yggdrasil v0.4.4a (alpha)*
