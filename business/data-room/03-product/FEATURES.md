# Yggdrasil ERP - Feature Inventory

> **Version:** 0.8.1a (alpha)
> **Last Updated:** 2026-06-21
>
> This document provides a comprehensive inventory of all features in the Yggdrasil ERP system,
> categorized by implementation status.
>
> Legend: [x] Fully Implemented | [-] In Progress | [ ] Planned

---

## Table of Contents

1. [Fully Implemented](#fully-implemented)
   - [Core Platform](#core-platform)
   - [Desktop Client (Qt 6)](#desktop-client-qt-6)
   - [Business Modules](#business-modules)
   - [API Layer](#api-layer)
2. [In Progress](#in-progress)
3. [Planned](#planned)

---

## Fully Implemented

### Core Platform

| Status | Feature | Details |
|--------|---------|---------|
| [x] | Multi-tenant architecture | `tenant_id` isolation on all tables; row-level data separation |
| [x] | JWT authentication | 1-hour token expiry, bcrypt password hashing, role-based access control (RBAC) |
| [x] | Structured JSON logging | File rotation at 10 MB per file, 10 files max |
| [x] | Per-endpoint API rate limiting | Configurable throttling per route |
| [x] | In-memory caching with TTL | 512 MB capacity, key pattern `module:entity:id` |
| [x] | Performance metrics collection | Counters and duration tracking exposed at `/metrics` |
| [x] | Input validation | Server-side validation for all API inputs |
| [x] | PostgreSQL database | 323 tables, 6 views, 806 indexes, full append-only audit trail with field-level deltas |
| [x] | Real-time B2B event streaming | WebSocket server on port 8081; Redpanda/Redis relay via `B2BEventHub` |
| [x] | Workflow engine | Template management, step/transition definition, instance tracking, auto-advance |
| [x] | 150+ REST API endpoints | Full coverage across all business modules |

### Operating-Model Governance — ROPE (Runtime Operational Policy Enforcement)

| Status | Feature | Details |
|--------|---------|---------|
| [x] | State Constraint Engine | Governed state transitions evaluated inside the transaction; an illegal transition is refused and rolled back, not warned-about-then-written |
| [x] | Signed policies with cited authority | Each rule is a signed administrative Decision (draft → in review → signed → active) carrying its regulatory anchor and authority citation as data |
| [x] | Predicate grammar | Boolean composition, quantifiers over child collections (any/none/count), multi-hop join paths, cross-entity references (e.g. a Purchasing rule reading a CRM customer's standing), and conditional THEN actions (block / require-extension / require-role / warn) |
| [x] | Governed status + narrative qualifier | Every status is a schema-constrained dropdown (not free text); operational nuance is captured beside it as audited structured data |
| [x] | Policy block surface | Desktop + web: a blocked transition surfaces a panel naming the governing policy, its decision code, and cited authority |
| [x] | Portable policy bundle | `mimirlabs.rope.policy-bundle` wire format — policies travel between tenants and back from a Jormungandr instance governing an external ERP |
| [x] | AI-safety property | An agent acts on the same governed substrate via a typed tools layer: it can propose, but cannot set a disallowed state or rewrite a policy |

### Desktop Client (Qt 6)

| Status | Feature | Details |
|--------|---------|---------|
| [x] | Qt 6 QML desktop client | Native cross-platform desktop application |
| [x] | Dark and light theme support | User-selectable appearance with font customization |
| [x] | Login with server auto-discovery | Connection configuration and server detection |
| [x] | 14-module navigation | Sidebar navigation with tabbed record detail pages |
| [x] | Save/error feedback | Animated notification system for user actions |
| [x] | Record detail pages | Workflow status bars, revision control, section-level CRUD |
| [x] | Settings module | Connection info, Appearance (theme/font), Admin (Users, password reset, data management) |

### Business Modules

#### CRM

- [x] Accounts (full CRUD + workflow)
- [x] Contacts (full CRUD + workflow)
- [x] Opportunities (full CRUD + workflow)
- [x] Quotes (full CRUD + workflow)
- [x] Sales Orders (full CRUD + workflow)
- [x] Leads (full CRUD + workflow)

#### Sales

- [x] Quotes (full CRUD + workflow)
- [x] Orders (full CRUD + workflow)
- [x] Invoices (full CRUD + workflow)

#### Purchasing

- [x] Purchase Orders (full CRUD + workflow)
- [x] Suppliers (full CRUD + workflow)
- [x] Receipts/Bills (full CRUD + workflow)

#### Manufacturing

- [x] Work Orders with BOM/Routing selection
- [x] Shop Floor operations
- [x] OEE dashboard (placeholder visualization)

#### Warehouse

- [x] Inventory tracking
- [x] Pick Lists with nested lines
- [x] Cycle Counts

#### Finance

- [x] GL Accounts
- [x] Journal Entries
- [x] AR Invoices with line items
- [x] Payments
- [x] Financial report buttons (backend placeholders)

#### Projects

- [x] Projects
- [x] Tasks
- [x] Time Entries
- [x] Gantt chart placeholder

#### PLM (Product Lifecycle Management)

- [x] Parts management
- [x] EBOMs: full revision control, release workflow, option groups, BOM lines CRUD
- [x] MBOMs: revision control, option selections
- [x] Routings with operations
- [x] ECOs (Engineering Change Orders)
- [x] Engineering Report: filterable, resolvable entries

#### Quality

- [x] 8D Reports with full D1-D8 stage tracking
- [x] CAPA (Corrective and Preventive Action)
- [x] NCR (Non-Conformance Reports)
- [x] Audits

#### Service

- [x] Ticket Kanban board
- [x] RMA (Return Merchandise Authorization)
- [x] Warranty Claims

#### HR (Human Resources)

- [x] Employees
- [x] Positions
- [x] Attendance
- [x] Leave Requests
- [x] Payroll Runs
- [x] Performance Reviews

#### Reports

- [x] 16 built-in reports with date filtering and dynamic columns

### Web Application (Next.js 15)

| Status | Feature | Details |
|--------|---------|---------|
| [x] | Full web client across all modules | App Router, TypeScript strict, Tailwind; connected to the live backend, not a scaffold |
| [x] | Unified full-pane record display | Records open full-pane as tabs with popout and multi-open, via shared `CrudPanel` / `DocumentBuilder` |
| [x] | ROPE policy authoring UI | Rule builder with dropdown field selection incl. cross-module parent fields; policy library, artifact viewer |
| [x] | CSV / XLSX / print export | Shared export menu (real `.xlsx`), print-ready PO/Invoice/Quote/PickList documents |
| [x] | Notifications, attachments, audit history | In-app notification feed, file upload/download per entity, field-level audit viewer |
| [x] | Tablet-first POS workspace | `/pos` sell flow reusing existing sales/payment APIs |
| [x] | SSO + multi-tenant | Cookie/JWT SSO hub; tenant switching for privileged roles |

---

## In Progress

| Status | Feature | Details |
|--------|---------|---------|
| [-] | OEE trend chart visualization | OEE API exists; richer trend charting still being built out |
| [-] | Gantt chart view for Projects | Interactive Gantt being refined |
| [-] | Live WebSocket event surfacing | `B2BEventHub` streams; some desktop surfaces still wiring real-time updates |
| [-] | Receipt-side ROPE enforcement panel | PO-side receive→block ships; routing the goods-receipt note's own transition through the engine is the next increment |

---

## Shipped Since the Original Inventory

Items previously listed as "planned" that are now implemented: CI/CD via GitHub
Actions (lint, type-check, web/server/client build, schema validate, integration
tests); Docker containerization + Compose; JWT token refresh + persisted
auto-login; CSV/XLSX/PDF export; server-side pagination, search, and filtering;
in-app notification center; the Logistics/Shipping module with live carrier
integration; quality inspection plans; document attachments per record; and the
full Next.js web application connected to the live backend.

## Planned

### Production Hardening & Compliance

| Status | Feature | Details |
|--------|---------|---------|
| [ ] | SOC 2 Type I | Target Q4 2026 |
| [ ] | Load/perf testing + query tuning | Index tuning, load profiles |
| [ ] | Automated backup + disaster recovery | Scheduling and off-site storage on top of the existing backup API |
| [ ] | Prometheus/Grafana monitoring | On top of the existing `/metrics` collector |

### Feature Depth

| Status | Feature | Details |
|--------|---------|---------|
| [ ] | OEE / Gantt rich visualizations | APIs exist; richer charting in progress |
| [ ] | Sales commission tracking | Calculation and reporting |
| [ ] | Full multi-currency | Real-time exchange rates (currency fields already present) |
| [ ] | Internationalization (i18n) | Multi-language UI |
| [ ] | Mobile application | iOS/Android |

> **Product constraint:** Yggdrasil ERP has 10 fixed business modules and is
> **not** user-extensible. There is no custom-module / plugin marketplace by
> design — governance integrity depends on a closed, canonical model.

---

## Summary

| Category | Count |
|----------|-------|
| Fully Implemented | Operating-model governance (ROPE), 10 core modules + HR/Logistics/Reports, full desktop + web clients, B2B mesh, live carrier APIs, export/notifications/attachments/audit |
| In Progress | Richer visualizations, live event surfacing, receipt-side enforcement panel |
| Planned | SOC 2, production hardening, feature depth (commission, multi-currency, i18n, mobile) |
