# Yggdrasil ERP — Product Roadmap

**Last updated:** 2026-03-02
**Current version:** 0.4.5a
**Production readiness:** ~90% (build/run) | ~75% (sell/use)

---

## Completed

### Foundation (Oct 2025 – Feb 2026)

Core architecture, database schema, all 10 business module APIs, Qt desktop client, Next.js web app scaffold, CI/CD pipeline.

- 150+ table PostgreSQL schema with multi-tenant isolation
- 527+ REST API endpoints (319 operations) across 10 modules
- C++17/Qt 6 HTTP server with WebSocket real-time events
- Qt 6 QML desktop client with full module UI
- Next.js 15 web application with full module coverage
- B2B event federation via Redpanda with Cloudflare tunnel infrastructure
- Workflow engine with configurable templates, steps, transitions
- Build verification and 7-job CI/CD pipeline (GitHub Actions)

### Stabilization (Feb – Mar 2026)

Production-grade security hardening, data integrity, and operational tooling.

- JWT authentication with Argon2id hashing, TOTP MFA (RFC 6238), progressive lockout, password history
- Endpoint-level RBAC enforcement (enforceRbac middleware, fail-closed)
- PostgreSQL Row-Level Security on all tenant-scoped tables
- Immutable audit trail with DB triggers and admin viewer (filters, pagination)
- OpenAPI 3.0.3 spec with strict data contracts (additionalProperties:false on all Create schemas)
- StrictJsonParser — no type coercion, flat rejection errors
- Server-side search (?search= on all CRUD list endpoints)
- 24 cross-module relationship traversal endpoints
- Swagger UI at /api/docs (235 paths, 319 operations, 301 component schemas)
- httpOnly cookie auth for web app (YGGDATA-265)
- Per-line partial receiving for purchasing (YGGDATA-273)
- Data correction workflows — all 10 correction paths (YGGDATA-142)
- Task dependencies + budget tracking (YGGDATA-45)
- WO operations/materials + clock-in/clock-out (YGGDATA-274)
- Bulk operations — multi-select, bulk delete, CSV export (YGGDATA-275)
- PDF generation — 5 document types (PO, Invoice, Quote, Pick List, Work Order)
- Excel/CSV export from CrudPanel
- Email service (SMTP with STARTTLS/AUTH LOGIN)
- In-app notification system (WebSocket + email, user preferences)
- MRP engine — demand calculation, planned orders, exceptions, confirmation
- Quality inspection plans with auto-NCR on failure
- Standard forms catalog — template builder, form filler, submission lifecycle
- Health endpoint with DB connectivity probe
- Backup/restore admin endpoints
- Migration runner with rollback support (.down.sql)
- k6 load testing suite (smoke/load/stress/soak profiles)
- Desktop ↔ Web parity audit — reduced feature gap from ~22 to ~12
- 10 SOC 2 policy documents (all effective 2026-03-01)

---

## Current — Cohort Readiness

Goal: Everything needed for first validation cohort customers to run real manufacturing operations.

### Platform Completeness
- [ ] Remaining desktop ↔ web parity items (~12 gaps)
- [ ] Error boundary for 401/session expiry with auto-redirect to login
- [ ] Form field validation (client-side Zod schemas)
- [ ] Gantt chart implementation for Projects module
- [ ] OEE trend charts for Manufacturing
- [ ] Financial report generation (Balance Sheet, Income Statement, Cash Flow)

### Security & Compliance
- [ ] Secrets vault integration — HashiCorp Vault (YGGDATA-264)
- [ ] Field-level encryption for PII (pgcrypto or app-layer AES)
- [ ] JWT secret rotation with dual-key grace window
- [ ] Backup encryption at rest (AES-256)
- [ ] SOC 2 Type I readiness (Phase 3 of SOC2_ROADMAP.md)

### Operations
- [ ] Automated backup scheduling with off-site copy
- [ ] Tenant provisioning automation
- [ ] Demo environment with sample data
- [ ] Customer onboarding workflow

---

## Next — Production Hardening

Goal: Production deployment readiness and first paying customers.

### Infrastructure
- [ ] Docker containerization with docker-compose for tenant deployment
- [ ] Zero-downtime deployment strategy
- [ ] Database query optimization and index tuning
- [ ] Centralized log aggregation (ELK or equivalent)
- [ ] Automated alerting (failed logins, cross-tenant attempts, backup failures)
- [ ] Monitoring integration (Prometheus/Grafana)

### Security
- [ ] Security audit and penetration testing (third-party)
- [ ] SAST in CI pipeline
- [ ] Dependency scanning and SBOM generation

### Go-to-Market
- [ ] Marketing website connected to production (mimirlabs.net already live)
- [ ] In-app help and documentation
- [ ] Training materials
- [ ] Implementation playbooks (standardized onboarding)

---

## Future

Items on the long-term roadmap. Prioritized by customer demand from the validation cohort.

### Platform Expansion
- [ ] Mobile application (iOS/Android)
- [ ] Multi-currency with real-time exchange rates
- [ ] Multi-language / internationalization (i18n)
- [ ] Barcode/RFID scanning integration for warehouse
- [ ] EDI integration (X12/EDIFACT)
- [ ] Advanced analytics and BI dashboards

### Intelligence
- [ ] AI-powered demand forecasting
- [ ] Predictive maintenance integration (IoT)
- [ ] Anomaly detection in quality and inventory data

### Anonymized Data Trends (Data Dividend Program)
- [ ] Shadow database DMZ with one-way push (YGGDATA-210)
- [ ] Anonymization pipeline — PII stripping, identifier removal (YGGDATA-211)
- [ ] Cohort thresholding + niche market merge (YGGDATA-212)
- [ ] Outlier suppression (YGGDATA-213)
- [ ] Differential privacy noise injection (YGGDATA-214)
- [ ] K-anonymization binning (YGGDATA-215)
- [ ] Temporal jittering (7–14 day broadcast delay) (YGGDATA-216)
- [ ] Macro-signal aggregation (YGGDATA-217)
- [ ] Secure data exchange gateway (YGGDATA-218–222)
- [ ] Trust Center UI — opt-in/opt-out (YGGDATA-224)
- [ ] Data Dividend revenue sharing and addendum framework (YGGDATA-223)

### Integrations
- [ ] Microsoft Dynamics 365 Business Central connector (YGGDATA-228)
- [ ] Oracle NetSuite connector (YGGDATA-229)
- [ ] Acumatica Cloud ERP connector (YGGDATA-230)
- [ ] SAP S/4HANA & Business One connector (YGGDATA-231)
- [ ] Sage Intacct connector (YGGDATA-232)
- [ ] QuickBooks Online connector (YGGDATA-233)
- [ ] Salesforce CRM connector (YGGDATA-234)

---

## Key Milestones

| Milestone | Target | Status |
|-----------|--------|--------|
| Alpha release (v0.2.0a) | Feb 2026 | Done |
| Security hardening complete | Mar 2026 | Done |
| OpenAPI spec + Data DMZ | Mar 2026 | Done |
| SOC 2 policies complete | Mar 2026 | Done |
| Cohort readiness | Q2 2026 | In progress |
| SOC 2 Type I readiness | Q2 2026 | In progress |
| Production hardening complete | Q2-Q3 2026 | Not started |
| First validation cohort customer | Q3 2026 | Not started |
| General availability | Q4 2026 | Not started |
