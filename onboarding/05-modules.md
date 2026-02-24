# Business Module Reference

Yggdrasil ERP includes 11 business modules, a workflow engine, and system administration. This document provides a reference for each.

---

## Module Overview

| Module | API Prefix | Key Entities | Status |
|--------|-----------|-------------|--------|
| **CRM** | `/api/crm/` | Accounts, Contacts, Opportunities, Leads, Quotes, Sales Orders | Complete |
| **Sales** | `/api/sales/` | Quotes, Orders, Invoices, Commissions | Complete |
| **Purchasing** | `/api/purchasing/` | Purchase Orders, Suppliers, Receipts/Bills | Complete |
| **Manufacturing** | `/api/manufacturing/` | Work Orders, BOMs, Shop Floor Ops, Work Centers, OEE | Complete |
| **Warehouse** | `/api/warehouse/` | Inventory, Locations, Transactions, Pick Lists, Cycle Counts | Complete |
| **Finance** | `/api/finance/` | GL Accounts, Journal Entries, AR/AP Invoices, Payments | Complete |
| **Projects** | `/api/projects/` | Projects, Tasks, Time Entries, Budgets | Complete |
| **PLM** | `/api/plm/` | Parts, EBOMs, MBOMs, Routings, ECOs, Engineering Reports | Complete |
| **Quality** | `/api/quality/` | 8D Reports, CAPA, NCR, Audits | Complete |
| **Service** | `/api/service/` | Tickets (Kanban), RMA, Warranty Claims | Complete |
| **HR** | `/api/hr/` | Employees, Departments, Positions, Payroll, Benefits, Leave, Reviews, Training | Complete |
| **Logistics** | `/api/logistics/` | Shipments, Carriers, Tracking, Labels, Packages, Returns | Complete |

### System Modules

| Module | API Prefix | Purpose |
|--------|-----------|---------|
| **Admin** | `/api/admin/` | Users, Roles, Permissions, Settings, Tenant Management, Data Export/Import/Backup |
| **Workflow** | `/api/workflows/` | Workflow Templates, Steps, Transitions, Instances |
| **Dashboard** | `/api/dashboard/` | KPIs, Activity Feed, Alerts, Metrics |
| **Reports** | (module-specific) | 16 built-in reports with date filtering and dynamic columns |

---

## Module Details

### CRM

The customer relationship management module tracks the full sales pipeline from lead to closed deal.

**Entities:** Accounts, Contacts, Opportunities, Leads, Quotes, Sales Orders

**Key workflows:**
- Lead capture and qualification
- Opportunity pipeline tracking
- Quote creation and approval
- Quote-to-order conversion

**Cross-module links:** CRM accounts link to Sales orders, Purchasing suppliers, and Finance invoices.

---

### Sales

Manages the order-to-cash cycle.

**Entities:** Quotes, Orders, Invoices, Commission Tracking

**Key workflows:**
- Quote generation from CRM opportunities
- Order processing and fulfillment
- Invoice generation and payment tracking

---

### Purchasing

Handles procurement and supplier management.

**Entities:** Purchase Orders (with line items), Suppliers, Goods Receipts/Bills

**Key workflows:**
- Purchase order creation and approval
- Three-way matching (PO, receipt, invoice)
- Supplier performance tracking

---

### Manufacturing

Manages shop floor operations from work order to completion.

**Entities:** Work Centers, Operations, Work Orders, Shop Floor Operations, OEE Metrics

**Key workflows:**
- Work order creation from BOMs and routings
- Shop floor operation tracking (start, pause, complete)
- OEE (Overall Equipment Effectiveness) calculation

**Note:** OEE dashboard visualization is in progress.

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

**Key workflows:**
- Double-entry journal posting
- Accounts receivable invoicing and payment collection
- Accounts payable processing
- Financial report generation (Balance Sheet, Income Statement, Cash Flow -- in progress)

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
- **Option groups and choices** on EBOMs for configurable products
- **MBOM generation** from EBOMs with option selections
- **Part number articulation** system (definitions, values, auto-generation)
- **ECOs** for managing engineering changes with approval workflow
- **Engineering report** with severity tracking and resolution

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

**Entities:** Tickets (Kanban board), RMA (Return Merchandise Authorization), Warranty Claims

**Key workflows:**
- Ticket creation, assignment, and Kanban-based resolution
- RMA processing and return tracking
- Warranty claim evaluation and resolution

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
