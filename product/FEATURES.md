# Yggdrasil ERP - Feature Inventory

> **Version:** 0.2.0a (alpha)
> **Last Updated:** 2026-02-18
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
| [x] | PostgreSQL database | 108 tables, 12 views, 150+ indexes, full audit trail |
| [x] | Real-time B2B event streaming | WebSocket server on port 8081; Redpanda/Redis relay via `B2BEventHub` |
| [x] | Workflow engine | Template management, step/transition definition, instance tracking, auto-advance |
| [x] | 150+ REST API endpoints | Full coverage across all business modules |

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

---

## In Progress

| Status | Feature | Details |
|--------|---------|---------|
| [-] | Next.js 15 web application | Scaffolded with implementation guide; not yet connected to backend API |
| [-] | OEE trend chart visualization | Dashboard placeholder exists; charting not yet rendering real data |
| [-] | Gantt chart view for Projects | UI placeholder exists; interactive Gantt not yet functional |
| [-] | Financial report generation | Report buttons wired in UI; backend report logic is placeholder only |
| [-] | WebSocket real-time events in desktop client | B2BEventHub infrastructure exists; events not yet surfaced in the UI |

---

## Planned

### Infrastructure and DevOps

| Status | Feature | Details |
|--------|---------|---------|
| [ ] | CI/CD pipeline | GitHub Actions for build, lint, test, and deploy |
| [ ] | Automated test suite | Unit, integration, and E2E test frameworks |
| [ ] | Docker containerization | Container images and `docker-compose` for all services |
| [ ] | Deployment automation | Scripted production deployment workflows |
| [ ] | SSL/TLS configuration | HTTPS and WSS for production environments |
| [ ] | Database migration tooling | Versioned, reversible schema migrations |

### Authentication and Security

| Status | Feature | Details |
|--------|---------|---------|
| [ ] | Token refresh mechanism | JWT auto-renew before expiry to maintain sessions |
| [ ] | Auto-login from persisted credentials | Secure credential storage with automatic reconnection |

### Data Management

| Status | Feature | Details |
|--------|---------|---------|
| [ ] | Data export (CSV/PDF) | Export tables and reports to CSV and PDF formats |
| [ ] | Pagination for large data sets | Server-side pagination across all list endpoints |
| [ ] | Client-side data caching | Local caching layer for offline support and performance |
| [ ] | Search and filter on data tables | Column-level filtering and full-text search on list views |

### Additional Business Modules

| Status | Feature | Details |
|--------|---------|---------|
| [ ] | Logistics/Shipping module | 8 database tables exist; API and UI not yet built |
| [ ] | Project milestones, dependencies, issues, and budget tracking | Database tables exist; API and UI not yet built |
| [ ] | Quality inspection plans and results | Database tables exist; API and UI not yet built |
| [ ] | Sales commission tracking | Commission calculation and reporting |
| [ ] | Multi-currency support | Exchange rate management and currency conversion |
| [ ] | Document attachment management | File upload, storage, and association with records |

### User Experience

| Status | Feature | Details |
|--------|---------|---------|
| [ ] | Notification center | Real-time alerts and in-app notification feed |
| [ ] | Mobile-responsive web interface | Adaptive layouts for tablet and mobile browsers |

---

## Summary

| Category | Count |
|----------|-------|
| Fully Implemented | 70+ features across 14 modules |
| In Progress | 5 features |
| Planned | 18 features |
