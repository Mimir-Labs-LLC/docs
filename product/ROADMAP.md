# Yggdrasil ERP - Product Roadmap

## Phase 0: Foundation (Complete)
Goal: Core architecture, database, and module APIs

### Database & Schema
- [x] PostgreSQL database schema (117+ tables, 12 views, 150+ indexes)
- [x] Multi-tenant architecture with tenant_id isolation on all tables
- [x] Audit trail timestamps (created_at, updated_at) on all entity tables
- [x] Foundation seed data (tenant config, 10 RBAC roles, permissions catalog, tenant settings)

### C++ Backend Server
- [x] Qt 6 HTTP server on port 8080 with thread pool
- [x] WebSocket server on port 8081 for real-time events
- [x] JWT authentication with password hashing and session management
- [x] Role-Based Access Control (10 default roles, permissions catalog)
- [x] In-memory cache with TTL and pattern invalidation (CacheManager)
- [x] Structured JSON logging with file rotation (Logger)
- [x] Performance metrics collection (MetricsCollector)
- [x] Per-endpoint rate limiting (RateLimiter)
- [x] Input validation framework (Validator)
- [x] B2B event hub with WebSocket streaming and federation (Redis/Redpanda)
- [x] Runtime configuration via server.conf

### Business Module APIs (152+ endpoints)
- [x] Dashboard API (KPIs, activity feed, alerts, metrics)
- [x] CRM module API (entities, contacts, opportunities, leads)
- [x] Sales module API (quotes, orders, invoices)
- [x] Purchasing module API (orders, suppliers, receipts)
- [x] Manufacturing module API (work centers, operations, work orders, shop floor, OEE)
- [x] Warehouse module API (inventory, transactions, cycle counts, pick lists with line items)
- [x] Finance module API (GL accounts, journal entries, invoices, payments)
- [x] Projects module API (projects, tasks, time entries)
- [x] PLM module API (parts, EBOMs, MBOMs, routings, ECOs, materials, engineering reports)
- [x] Quality module API (8D reports, CAPAs, NCRs, audits)
- [x] Service module API (tickets, RMA, warranty)
- [x] HR module API (employees, departments, positions, compensation, payroll, benefits, leave, reviews, training, garnishments, direct deposits)
- [x] Workflow engine API (templates, steps, transitions, instances, step progress)
- [x] Admin module API (users, roles, permissions, settings, tenant management)
- [x] Data management APIs (export, import, backup, purge, reset)

### PLM Advanced Features
- [x] Engineering BOM with option groups and choices
- [x] EBOM revision management and release workflow (draft/released/obsolete)
- [x] Manufacturing BOM generation from EBOM with option selections
- [x] Part number articulation system (definitions, values, auto-generation)
- [x] Engineering change orders (ECOs)
- [x] Engineering report with severity tracking and resolution
- [x] Part search with type-ahead

### Qt Desktop Client Foundation
- [x] QML application scaffold with singleton services
- [x] AuthManager with JWT handling and persistent credentials
- [x] ApiClient wrapper with GET/POST/PUT/DELETE
- [x] WebSocketClient for real-time events
- [x] ThemeManager with dark/light mode and custom palette

### Next.js Web Application Foundation
- [x] Next.js 15 App Router with TypeScript strict mode
- [x] Tailwind CSS with custom yggdrasil color palette
- [x] Sidebar navigation with module grouping
- [x] Zustand state management and React Query data fetching
- [x] Axios-based API client layer (admin, hr, plm, workflow)
- [x] TypeScript type definitions for Admin, HR, PLM, Workflow modules
- [x] Admin module fully connected (Users, Roles, Permissions, Settings — full CRUD)
- [x] HR module components (EmployeeTable, PayrollTable, PerformanceTable)
- [x] PLM module components (EbomPanel, MbomPanel, EngineeringReportPanel)
- [x] Module stub pages for all 13 modules (CRM, Sales, Purchasing, Manufacturing, Warehouse, Finance, Projects, PLM, Quality, Service, Admin, HR, Workflows)

### Build & Tooling
- [x] CMake build system for server and client
- [x] Build verification script (verify_build.sh)
- [x] Database seed scripts (seed_all.sh, seed_cleanup.sh)

## Phase 1: Stabilization (Current - Q2 2026)
Goal: Production-ready alpha release

- [x] Comprehensive automated test suite (unit + integration tests) — Vitest (web, 39 tests), Catch2 (server 27 tests + client tests), story-driven integration framework (23 arcs, 128 stories)
- [x] CI/CD pipeline with GitHub Actions — 8-job pipeline (web-lint, web-test, web-build, server-build, server-test, client-build, client-test, schema-validate)
- [x] JWT token refresh mechanism
- [x] Auto-login from persisted credentials (Qt client AuthManager)
- [ ] Fix all null-width GUI layout issues
- [ ] Convert remaining text fields to proper dropdowns
- [x] Ensure cross-module data linkage (e.g., CRM entities → Sales orders → Invoices) — PLM EBOM→MBOM linkage, CRM entity→contact→opportunity linkage, order-to-invoice flow, contact→address FK linkage
- [x] Form field validation (required fields, format checking) — server-side Validator utility with field-level error responses; web app displays field-level errors below form fields
- [ ] Error boundary for 401/session expiry with auto-redirect to login
- [x] Data table pagination for large result sets — server-side `?limit=N&offset=N` with total count; web and desktop clients paginated at 50 rows per page
- [ ] Search and filter functionality on all data tables — *in progress: PLM part search with type-ahead, CrudPanel substring search implemented; full-text search pending*
- [ ] API endpoint documentation (auto-generated)
- [ ] SSL/TLS configuration guide
- [ ] Database migration tooling — *in progress: 8 migrations exist (001 through 008); automated migration runner not yet built*

## Phase 2: Feature Completion (Q2-Q3 2026)
Goal: Full feature parity with mid-market competitors

- [x] Next.js web application connected to backend APIs — all 13+ module pages with functional CRUD panels connected to backend API; full PLM (EBOM, MBOM, Where Used, Scoped Where Used), MRP, Quote Builder, Reports, RFI/RFQ/RFP, Migration tools
- [ ] Gantt chart implementation for Projects module — *placeholder exists; interactive visualization not yet functional*
- [ ] OEE trend charts for Manufacturing — *in progress: OEE API endpoint exists (GET /api/manufacturing/oee); dashboard placeholder exists but charting not yet rendering real data*
- [ ] Financial report generation (Balance Sheet, Income Statement, Cash Flow, etc.) — *in progress: report buttons wired in UI; backend report logic is placeholder only*
- [ ] Data export (CSV, PDF) across all modules — *in progress: tenant-wide JSON export exists (POST /api/admin/data/export); per-module CSV/PDF not yet built*
- [ ] Document/file attachment support on records
- [x] Logistics/Shipping module with live carrier integration — shipment CRUD, carrier CRUD, tracking events, labels, packing lists, packages, warehouses, return shipments; live UPS/FedEx/USPS API integration (rate shopping, label generation, tracking, void) with tenant-isolated credentials, OAuth token caching, and API audit log; web UI with carrier settings panel
- [ ] Project milestones, dependencies, and budget tracking — *in progress: database tables exist (pm_milestones, pm_task_dependencies, pm_budget_items); API endpoints and UI pending*
- [ ] Quality inspection plans and results workflow — *in progress: database tables exist (quality_inspection_plans, quality_inspection_characteristics, quality_inspection_results); API endpoints and UI pending*
- [ ] Sales commission tracking
- [ ] Email notification integration
- [x] Audit trail viewer — filtered audit trail UI in Admin with table name, entity ID, date range, and action type filters; expandable change diff (old vs new values); paginated at 50 records
- [ ] Print-ready forms (POs, Invoices, Quotes, Pick Lists)
- [x] MRP (Material Requirements Planning) — run configuration, demand summary (color-coded stockout/reorder/sufficient), planned orders with confirm/confirm-all, exceptions tab; MRP summary embedded in Manufacturing page
- [x] Quote Builder — master-detail quote management with header editing, inline line items, auto-calculated totals, status workflow (Save Draft, Send, Approve, Reject)
- [x] RFI/RFQ/RFP procurement processes — full procurement request lifecycle in Purchasing module with line items and supplier responses (migration 008)
- [x] Reports module — Empty Fields Report showing records with missing data across all modules, with module/table selector, completion percentage, and summary stats
- [x] Migration tools — data import wizard supporting Business Central, Salesforce, CSV/Excel, QuickBooks, and Sage with four-step flow and import history tracking

## Phase 3: Production Hardening (Q3-Q4 2026)
Goal: Production deployment readiness

- [ ] Security audit and penetration testing
- [ ] SOC 2 Type I compliance preparation
- [ ] Load testing and performance optimization
- [ ] Database query optimization and index tuning — *in progress: 150+ indexes defined in schema; query-level tuning not yet performed*
- [ ] Docker containerization with docker-compose
- [ ] Kubernetes deployment manifests
- [ ] Automated backup and disaster recovery — *in progress: tenant backup API exists (POST /api/admin/data/backup); automated scheduling and off-site storage not yet built*
- [ ] Monitoring and alerting (Prometheus/Grafana) — *in progress: MetricsCollector with counters and durations exists at GET /metrics; Prometheus/Grafana integration pending*
- [ ] Rate limiting tuning and DDoS protection — *in progress: per-endpoint rate limiter implemented (100 req/60s default, 5 req/60s login); DDoS-specific hardening pending*
- [ ] Multi-region database replication
- [ ] Zero-downtime deployment strategy

## Phase 4: Market Entry (Q4 2026 - Q1 2027)
Goal: First paying customers

- [ ] Marketing website and product landing page
- [ ] Demo environment with sample data — *in progress: foundation seed data and integration test data provide sample dataset; dedicated demo environment not yet provisioned*
- [ ] Customer onboarding workflow — *in progress: workflow engine with templates/instances exists; customer-facing onboarding flow not yet configured*
- [ ] Tenant provisioning automation
- [ ] In-app help and documentation
- [ ] Video tutorials and training materials
- [ ] Support ticket system for customers
- [ ] Pricing tiers and billing integration
- [ ] Trial/freemium tier
- [ ] Partner program for implementation consultants

## Phase 5: Growth (2027+)
Goal: Market expansion and feature leadership

- [ ] Mobile application (iOS/Android)
- [ ] Multi-currency with real-time exchange rates
- [ ] Multi-language / internationalization (i18n)
- [ ] AI-powered demand forecasting
- [ ] Predictive maintenance integration (IoT)
- [ ] EDI integration (X12/EDIFACT)
- [ ] Marketplace for custom modules/plugins
- [ ] API marketplace for third-party integrations
- [ ] Advanced analytics and BI dashboards
- [ ] Customer self-service portal
- [ ] Barcode/RFID scanning integration for warehouse

## Key Milestones

| Milestone | Target Date | Status |
|-----------|-------------|--------|
| Alpha release (current state) | Feb 2026 | Done |
| CI/CD pipeline operational | Feb 2026 | Done |
| Automated test suites (Vitest, Catch2, integration) | Feb 2026 | Done |
| Web app connected to backend (all modules) | Feb 2026 | Done |
| Automated test coverage > 60% | Q2 2026 | In progress |
| First internal production deployment | Q3 2026 | Not started |
| Security audit complete | Q4 2026 | Not started |
| Beta release | Q4 2026 | Not started |
| First paying customer | Q1 2027 | Not started |
| 10 paying customers | Q2 2027 | Not started |
