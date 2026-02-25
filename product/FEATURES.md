# Yggdrasil ERP - Feature Inventory

> **Version:** 0.4.5a (alpha)
> **Last Updated:** 2026-02-25
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
   - [Web Application (Next.js 15)](#web-application-nextjs-15)
   - [Business Modules](#business-modules)
   - [API Layer](#api-layer)
2. [In Progress](#in-progress)
3. [Planned](#planned)

---

## Fully Implemented

### Core Platform

| Status | Feature | Details |
|--------|---------|---------|
| [x] | Multi-tenant architecture | `tenant_id` isolation on all tables; row-level data separation; enforced on list, update, and delete operations |
| [x] | JWT authentication | 1-hour token expiry, bcrypt password hashing, role-based access control (RBAC), token refresh |
| [x] | Structured JSON logging | File rotation at 10 MB per file, 10 files max |
| [x] | Per-endpoint API rate limiting | Configurable throttling per route |
| [x] | In-memory caching with TTL | 512 MB capacity, key pattern `module:entity:id` |
| [x] | Performance metrics collection | Counters and duration tracking exposed at `/metrics` |
| [x] | Input validation | Server-side validation for all API inputs with field-level error responses |
| [x] | PostgreSQL database | 117+ tables, 12 views, 150+ indexes, full audit trail |
| [x] | Real-time B2B event streaming | WebSocket server on port 8081; Redpanda/Redis relay via `B2BEventHub` |
| [x] | Workflow engine | Template management, step/transition definition, instance tracking, auto-advance |
| [x] | 150+ REST API endpoints | Full coverage across all business modules |
| [x] | CI/CD pipeline | 8-job GitHub Actions (lint, test, build for web/server/client, schema validation) |
| [x] | Automated test suites | Vitest (web), Catch2 (server + client), story-driven integration tests (23 arcs, 128 stories) |
| [x] | Pagination | Server-side `?limit=N&offset=N` with total count; web and desktop clients paginated |
| [x] | Error feedback | Structured error responses with field-level errors; inline UI error banners and toast notifications |
| [x] | Transactional integrity | `ScopedTransaction` RAII guard; order-to-invoice, journal posting, BOM operations wrapped in transactions |
| [x] | Audit trail | `audit_change_log` table with field-level diffs; `created_by`/`updated_by` on 35+ tables; soft-delete on 16 key tables |
| [x] | Data correction policy | No DELETE on business data; corrections via void, cancel, supersede, or reversing entries; DELETE only for HR/Projects administrative data |

### Desktop Client (Qt 6)

| Status | Feature | Details |
|--------|---------|---------|
| [x] | Qt 6 QML desktop client | Native cross-platform desktop application |
| [x] | Dark and light theme support | User-selectable appearance with font customization |
| [x] | Login with server auto-discovery | Connection configuration and server detection |
| [x] | 14-module navigation | Sidebar navigation with tabbed record detail pages |
| [x] | Save/error feedback | Animated toast notification system (color-coded, auto-dismiss, deduplicated) |
| [x] | Record detail pages | Workflow status bars, revision control, section-level CRUD |
| [x] | Settings module | Connection info, Appearance (theme/font), Admin (Users, password reset, data management) |
| [x] | Pagination | DataTable footer with Previous/Next, "1-50 of N" display, limit/offset on all module pages |

### Web Application (Next.js 15)

| Status | Feature | Details |
|--------|---------|---------|
| [x] | Full module coverage | All 13+ module pages with functional CRUD panels connected to backend API |
| [x] | Admin module | Users, Roles, Permissions, Settings -- full CRUD |
| [x] | HR module | Employee, Payroll, Performance tables |
| [x] | PLM module | EbomPanel, MbomPanel, EngineeringReportPanel, Where Used, Scoped Where Used |
| [x] | Pagination | CrudPanel fetches 50 rows per page with Previous/Next controls |
| [x] | Error handling | Error banners on load failure, inline server error messages, field-level validation errors, success auto-dismiss |
| [x] | Carrier settings | Credential management, rate shopping UI, API call log viewer |
| [x] | Sidebar navigation | Module grouping with collapsible sections |
| [x] | Tailwind CSS theming | Custom `yggdrasil` color palette |

### Business Modules

#### CRM

- [x] Accounts (full CRUD + workflow)
- [x] Contacts (full CRUD + workflow, address linking via FK to `crm_addresses`)
- [x] Opportunities (full CRUD + workflow)
- [x] Quotes (full CRUD + workflow)
- [x] Sales Orders (full CRUD + workflow)
- [x] Leads (full CRUD + workflow)
- [x] NAICS codes on accounts (indexed search by code/description)

#### Sales

- [x] Quotes (full CRUD + workflow)
- [x] Quote Builder -- master-detail quote management with header editing, inline line items, auto-calculated totals (subtotal, discount, tax, total), status workflow (Save Draft, Send, Approve, Reject)
- [x] Orders (full CRUD + workflow)
- [x] Invoices (full CRUD + workflow)

#### Purchasing

- [x] Purchase Orders (full CRUD + workflow)
- [x] Suppliers (full CRUD + workflow)
- [x] Receipts/Bills (full CRUD + workflow)
- [x] RFI/RFQ/RFP processes -- full procurement request lifecycle with line items and supplier responses (migration 008)

#### Manufacturing

- [x] Work Orders with BOM/Routing selection
- [x] Shop Floor operations
- [x] OEE dashboard (placeholder visualization)
- [x] MRP (Material Requirements Planning) -- run configuration, demand summary (color-coded stockout/reorder/sufficient), planned orders with confirm/confirm-all, exceptions tab; MRP summary embedded in Manufacturing page

#### Warehouse

- [x] Inventory tracking
- [x] Pick Lists with nested lines
- [x] Cycle Counts

#### Finance

- [x] GL Accounts
- [x] Journal Entries (with transactional posting and debit=credit validation)
- [x] AR Invoices with line items
- [x] Payments
- [x] Order-to-invoice flow (atomic: creates invoice header + lines, updates SO status, posts GL entries)

#### Projects

- [x] Projects
- [x] Tasks
- [x] Time Entries
- [x] Gantt chart placeholder

#### PLM (Product Lifecycle Management)

- [x] Parts management (collapsed into EBOMs view; parts accessed through linked EBOM)
- [x] EBOMs: full revision control, release workflow, option groups, BOM lines CRUD, full API wiring for all callbacks (release, revision, update, add/delete lines)
- [x] Supplier info on EBOMs (preferred supplier from linked part record)
- [x] MBOMs: revision control, option selections
- [x] Routings with operations
- [x] ECOs (Engineering Change Orders)
- [x] Engineering Report: filterable, resolvable entries
- [x] Where Used -- part number search with results table (BOM Number, Type, Qty, UOM) and scope filter (all/ebom/mbom)
- [x] Scoped Where Used -- pathfinding tool that finds all paths through the BOM tree from top-level assembly to target part; recursive traversal with breadcrumb visualization
- [x] Option groups as relationships -- OptionGroupEditor with base BOM line selection, alternative part choices, add/delete via API with validation

#### Quality

- [x] 8D Reports with full D1-D8 stage tracking
- [x] CAPA (Corrective and Preventive Action)
- [x] NCR (Non-Conformance Reports)
- [x] Audits

#### Service

- [x] Ticket Kanban board
- [x] RMA (Return Merchandise Authorization)
- [x] Warranty Claims
- [x] Service Orders -- cost tracking (labor, parts, travel) and customer-facing pricing (labor, parts, travel, total, margin, billing status)

#### HR (Human Resources)

- [x] Employees
- [x] Positions
- [x] Attendance
- [x] Leave Requests
- [x] Payroll Runs
- [x] Performance Reviews

#### Logistics

- [x] Shipment lifecycle management (planned through delivered) with lines, packages, packing lists
- [x] Carrier CRUD and warehouse management
- [x] Live carrier API integration (UPS, FedEx, USPS) -- rate shopping, label generation, tracking, void
- [x] Tenant-isolated carrier credentials with OAuth2 token caching
- [x] Return shipment management with RMA integration
- [x] Carrier API audit log

#### Reports

- [x] 16 built-in reports with date filtering and dynamic columns
- [x] Empty Fields Report -- records with missing data across all modules, with module/table selector, completion percentage, and summary stats

#### Admin

- [x] Filtered audit trail UI with table name, entity ID, date range, and action type filters; expandable change diff (old vs new values); paginated at 50 records
- [x] Migration tools -- data import wizard supporting Business Central, Salesforce, CSV/Excel, QuickBooks, and Sage; four-step flow (connection config, field mapping with auto-map, preview/validation, import with progress); import history tracking

---

## In Progress

| Status | Feature | Details |
|--------|---------|---------|
| [-] | OEE trend chart visualization | Dashboard placeholder exists; charting not yet rendering real data |
| [-] | Gantt chart view for Projects | UI placeholder exists; interactive Gantt not yet functional |
| [-] | Financial report generation | Report buttons wired in UI; backend report logic is placeholder only |
| [-] | WebSocket real-time events in desktop client | B2BEventHub infrastructure exists; events not yet surfaced in the UI |
| [-] | PLM web UI depth | Parts, EBOMs, MBOMs, Routings, ECOs functional but some views still being refined |

---

## Planned

### Data Management

| Status | Feature | Details |
|--------|---------|---------|
| [ ] | Data export (CSV/PDF) | Export tables and reports to CSV and PDF formats |
| [ ] | Client-side data caching | Local caching layer for offline support and performance |
| [ ] | Full-text search | Global search across modules beyond basic substring |

### Additional Business Features

| Status | Feature | Details |
|--------|---------|---------|
| [ ] | Project milestones, dependencies, issues, and budget tracking | Database tables exist; API and UI not yet built |
| [ ] | Quality inspection plans and results | Database tables exist; API and UI not yet built |
| [ ] | Sales commission tracking | Commission calculation and reporting |
| [ ] | Multi-currency support | Exchange rate management and currency conversion |
| [ ] | Document attachment management | File upload, storage, and association with records |

### Infrastructure

| Status | Feature | Details |
|--------|---------|---------|
| [ ] | SSL/TLS configuration | HTTPS and WSS for production environments |
| [ ] | Docker containerization | Container images and `docker-compose` for all services |
| [ ] | Deployment automation | Scripted production deployment workflows |

### User Experience

| Status | Feature | Details |
|--------|---------|---------|
| [ ] | Notification center | Real-time alerts and in-app notification feed |
| [ ] | Email integration | Outbound email for order confirmations, invoice sends, password resets |
| [ ] | Mobile-responsive web interface | Adaptive layouts for tablet and mobile browsers |
| [ ] | Print-ready forms | POs, Invoices, Quotes, Pick Lists as printable/PDF documents |
| [ ] | User preferences / saved views | Column reordering, saved filters, default sort persistence |

---

## Summary

| Category | Count |
|----------|-------|
| Fully Implemented | 90+ features across 14 modules |
| In Progress | 5 features |
| Planned | 13 features |
