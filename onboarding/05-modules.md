# Business Module Reference

Yggdrasil ERP includes 14 business modules, a workflow engine, and system administration. This document provides a reference for each.

---

## Module Overview

| Module | API Prefix | Key Entities | Status |
|--------|-----------|-------------|--------|
| **CRM** | `/api/crm/` | Accounts, Contacts, Opportunities, Leads, Quotes, Sales Orders | Complete |
| **Sales** | `/api/sales/` | Quotes, Quote Builder, Orders, Invoices, Commissions | Complete |
| **Purchasing** | `/api/purchasing/` | Purchase Orders, Suppliers, Receipts/Bills, RFI/RFQ/RFP | Complete |
| **Manufacturing** | `/api/manufacturing/` | Work Orders, BOMs, Shop Floor Ops, Work Centers, OEE, MRP | Complete |
| **Warehouse** | `/api/warehouse/` | Inventory, Locations, Transactions, Pick Lists, Cycle Counts | Complete |
| **Finance** | `/api/finance/` | GL Accounts, Journal Entries, AR/AP Invoices, Payments | Complete |
| **Projects** | `/api/projects/` | Projects, Tasks, Time Entries, Budgets | Complete |
| **PLM** | `/api/plm/` | Parts, EBOMs, MBOMs, Routings, ECOs, Engineering Reports, Where Used | Complete |
| **Quality** | `/api/quality/` | 8D Reports, CAPA, NCR, Audits | Complete |
| **Service** | `/api/service/` | Tickets (Kanban), RMA, Warranty Claims, Service Orders | Complete |
| **HR** | `/api/hr/` | Employees, Departments, Positions, Payroll, Benefits, Leave, Reviews, Training | Complete |
| **Logistics** | `/api/logistics/` | Shipments, Carriers, Tracking, Labels, Packages, Returns | Complete |

### System Modules

| Module | API Prefix | Purpose |
|--------|-----------|---------|
| **Admin** | `/api/admin/` | Users, Roles, Permissions, Settings, Tenant Management, Data Export/Import/Backup, Audit Trail, Migration Tools |
| **Workflow** | `/api/workflows/` | Workflow Templates, Steps, Transitions, Instances |
| **Dashboard** | `/api/dashboard/` | KPIs, Activity Feed, Alerts, Metrics |
| **Reports** | `/reports` | 16 built-in reports with date filtering and dynamic columns, Empty Fields Report |

---

## Module Details

### CRM

The customer relationship management module tracks the full sales pipeline from lead to closed deal.

**Entities:** Accounts, Contacts, Opportunities, Leads, Quotes, Sales Orders

**Key features:**
- Lead capture and qualification
- Opportunity pipeline tracking
- Quote creation and approval
- Quote-to-order conversion
- NAICS codes on accounts (indexed search by code/description)
- Contacts link to entity addresses via FK to `crm_addresses`

**Cross-module links:** CRM accounts link to Sales orders, Purchasing suppliers, and Finance invoices.

---

### Sales

Manages the order-to-cash cycle.

**Entities:** Quotes, Orders, Invoices, Commission Tracking

**Key features:**
- Quote Builder -- master-detail quote management with header editing, inline line items, auto-calculated totals (subtotal, discount, tax, total), status workflow (Save Draft, Send, Approve, Reject)
- Quote generation from CRM opportunities
- Order processing and fulfillment
- Invoice generation and payment tracking
- Order-to-invoice flow (atomic: creates invoice header + lines, updates SO status, posts GL entries)

---

### Purchasing

Handles procurement and supplier management.

**Entities:** Purchase Orders (with line items), Suppliers, Goods Receipts/Bills, RFIs, RFQs, RFPs

**Key features:**
- Purchase order creation and approval
- Three-way matching (PO, receipt, invoice)
- Supplier performance tracking
- RFI/RFQ/RFP processes -- full procurement request lifecycle with line items and supplier responses (database migration 008)

---

### Manufacturing

Manages shop floor operations from work order to completion.

**Entities:** Work Centers, Operations, Work Orders, Shop Floor Operations, OEE Metrics

**Key features:**
- Work order creation from BOMs and routings
- Shop floor operation tracking (start, pause, complete)
- OEE (Overall Equipment Effectiveness) calculation
- MRP (Material Requirements Planning) -- run configuration, demand summary (color-coded stockout/reorder/sufficient), planned orders with confirm/confirm-all, exceptions tab; MRP summary embedded in Manufacturing page

**Note:** OEE dashboard visualization is in progress (placeholder exists, charting not yet rendering real data).

---

### Warehouse

Inventory management and warehouse operations.

**Entities:** Inventory Items, Locations (zones), Stock Transactions, Pick Lists (with lines), Cycle Counts

**Key workflows:**
- Inventory receipt and put-away
- Pick list generation and fulfillment
- Cycle count scheduling and reconciliation
- Real-time stock level tracking

---

### Finance

General ledger and financial management.

**Entities:** GL Accounts, Journal Entries, AR Invoices (with line items), AP Invoices, Payments

**Key features:**
- Double-entry journal posting (transactional with debit=credit validation)
- Accounts receivable invoicing and payment collection
- Accounts payable processing
- Order-to-invoice flow (atomic transaction: creates invoice header + lines, updates SO status, posts GL entries)
- Financial report generation (Balance Sheet, Income Statement, Cash Flow -- in progress, buttons wired but backend is placeholder)

---

### Projects

Project management with time tracking and budgets.

**Entities:** Projects, Tasks, Time Entries, Budgets

**Key workflows:**
- Project creation with task breakdown
- Time entry tracking against tasks
- Budget allocation and tracking

**Note:** Gantt chart is a placeholder; interactive visualization is planned for Phase 2.

---

### PLM (Product Lifecycle Management)

A core differentiator. Manages the engineering-to-manufacturing lifecycle.

**Entities:** Parts, EBOMs (Engineering BOMs), MBOMs (Manufacturing BOMs), Routings (with Operations), ECOs (Engineering Change Orders), Engineering Reports

**Key features:**
- **EBOM revision control** with release workflow (Draft -> Released -> Obsolete)
- **Option groups and choices** on EBOMs for configurable products -- OptionGroupEditor with base BOM line selection, alternative part choices, add/delete via API with validation
- **MBOM generation** from EBOMs with option selections
- **Part number articulation** system (definitions, values, auto-generation)
- **ECOs** for managing engineering changes with approval workflow
- **Engineering report** with severity tracking and resolution
- **Parts collapsed into EBOMs view** -- parts are accessed through their linked EBOM, eliminating the separate Parts tab; EBOM detail shows linked part with supplier info
- **Where Used** -- part number search with results table (BOM Number, Type, Qty, UOM) and scope filter (all/ebom/mbom)
- **Scoped Where Used** -- pathfinding tool that finds all paths through the BOM tree from a top-level assembly to a target part; recursive traversal handles multiple BOM levels and shows each unique path with breadcrumb visualization
- **Supplier info on EBOMs** -- EBOM detail header displays the preferred supplier from the linked part record
- Full API wiring for all EBOM/MBOM callbacks (release, revision, update, add/delete lines)

---

### Quality

Quality management for regulated manufacturing environments.

**Entities:** 8D Reports (D1-D8 stages), CAPA (Corrective and Preventive Action), NCR (Non-Conformance Reports), Audits

**Key workflows:**
- 8D problem-solving methodology (team formation through lessons learned)
- CAPA initiation, investigation, and verification
- NCR creation, disposition, and closure
- Audit scheduling and findings tracking

**Compliance relevance:** Supports ISO 9001, AS9100, and IATF 16949 quality standards.

---

### Service

Customer service and post-sale support.

**Entities:** Tickets (Kanban board), RMA (Return Merchandise Authorization), Warranty Claims, Service Orders

**Key features:**
- Ticket creation, assignment, and Kanban-based resolution
- RMA processing and return tracking
- Warranty claim evaluation and resolution
- Service Orders -- cost tracking (labor_cost, parts_cost, travel_cost) and customer-facing pricing (labor_price, parts_price, travel_price, total_price, margin, billing_status)

---

### HR (Human Resources)

Workforce management.

**Entities:** Employees, Departments, Positions, Compensation, Payroll Runs, Benefits, Leave Requests, Performance Reviews, Training, Garnishments, Direct Deposits

**Key workflows:**
- Employee onboarding and record management
- Payroll processing
- Leave request and approval
- Performance review cycles
- Training tracking

---

### Logistics

Shipping and carrier integration.

**Entities:** Shipments (with lines, packages, packing lists), Carriers, Tracking Events, Labels, Warehouses, Return Shipments

**Key features:**
- Full shipment lifecycle (planned -> picked -> shipped -> delivered)
- **Live carrier API integration** with UPS, FedEx, and USPS
- Multi-carrier **rate shopping** (compare rates across carriers in a single request)
- **Label generation** (PDF, ZPL, PNG)
- **Live tracking** with event history
- Shipment void/cancellation through carrier APIs
- Tenant-isolated carrier credentials
- OAuth2 token management with automatic caching and refresh
- Carrier API audit log

---

### Reports

Cross-module reporting and data quality tools.

**Key features:**
- 16 built-in reports with date filtering and dynamic columns
- Empty Fields Report -- shows records with missing important data across all modules, with module/table selector, completion percentage, and summary stats

---

### Admin

System administration and data management.

**Key features:**
- Users, Roles, Permissions, Settings management
- Tenant management
- Data export/import/backup
- Filtered audit trail UI -- filters for table name, entity ID, date range, and action type; expandable change diff showing old vs new values per field; paginated at 50 records
- Migration tools -- data import wizard supporting Business Central, Salesforce, CSV/Excel, QuickBooks, and Sage; four-step flow (connection config, field mapping with auto-map, preview/validation, import with progress); import history tracking

---

## Validated End-to-End Business Processes

These cross-module workflows have been validated through integration testing:

| Process | Abbreviation | Flow |
|---------|-------------|------|
| **Order-to-Cash** | O2C | Customer order -> Fulfillment -> Shipment -> Payment collection |
| **Procure-to-Pay** | P2P | Purchase requisition -> PO -> Receipt -> Supplier payment |
| **Lead-to-Cash** | L2C | Lead capture -> Qualification -> Closed deal -> Revenue |
| **Quote-to-Order** | Q2O | Quote creation -> Approval -> Order confirmation |
| **Record-to-Report** | R2R | Transaction recording -> Journal entries -> Financial reports |
| **Quality-to-Resolution** | Q2R | Non-conformance detection -> Investigation -> Corrective action closure |
