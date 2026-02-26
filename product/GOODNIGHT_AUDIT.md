# Yggdrasil ERP - Goodnight Audit

> **Version:** 0.2.0a (alpha)
> **Audit Date:** 2026-02-26
> **Last Remediation:** 2026-02-26
> **Auditor Perspective:** Manufacturing Operations
>
> This document is a living audit that compares the desktop client (Qt6/QML),
> web-app (Next.js), and server/database for functional completeness. Findings
> are evaluated from the perspective of a manufacturing operations professional
> who expects every transactional document to behave like it would in a mature
> ERP system.
>
> **Remediation Status:** 6 of 6 critical gaps FIXED in this session. See
> strikethrough items below.

---

## Table of Contents

1. [Critical Gaps](#1-critical-gaps)
2. [Desktop vs Web-App Parity](#2-desktop-vs-web-app-parity)
3. [Module-by-Module Audit](#3-module-by-module-audit)
4. [Backend-Supported but UI-Missing](#4-backend-supported-but-ui-missing)
5. [Common-Sense Manufacturing Gaps](#5-common-sense-manufacturing-gaps)
6. [Summary Scorecards](#6-summary-scorecards)

---

## 1. Critical Gaps

These are issues that would immediately confuse or block a manufacturing user.

### ~~1.1 Quotes Have No Line Items (Desktop Client)~~ FIXED

| Item | Detail |
|------|--------|
| **Where** | Desktop client — Sales > Quotes |
| **Problem** | ~~The Quote detail page has header-level financial fields but no line-item section.~~ |
| **Fix Applied** | Added `sections` config with "Quote Lines" to `SalesPage.qml` Quote detail, with Part autocomplete, Qty, Unit Price, Discount %, and Line Total columns. Full add/delete CRUD via `/sales/quotes/{id}/lines`. |
| **Priority** | ~~Critical~~ **Resolved** |

### ~~1.2 Sales Orders Missing Line Items (Web-App)~~ FIXED

| Item | Detail |
|------|--------|
| **Where** | Web-app — Sales > Orders |
| **Problem** | ~~Sales Orders used generic CrudPanel with no line items.~~ |
| **Fix Applied** | Replaced CrudPanel with `DocumentBuilder` component. Sales Orders now have master-detail layout with inline-editable line items (Part ID, Description, Qty, Unit Price, Discount %, Line Total), computed totals, and status actions (Confirm, Ship, Complete). |
| **Priority** | ~~Critical~~ **Resolved** |

### ~~1.3 Sales Orders Missing Cost/Price Fields (Web-App)~~ FIXED

| Item | Detail |
|------|--------|
| **Where** | Web-app — Sales > Orders |
| **Problem** | ~~Only showed total_amount. No subtotal, discount, tax, shipping, currency, or order type.~~ |
| **Fix Applied** | DocumentBuilder config for Sales Orders now includes: Order Type, Order Date, Requested/Promised Delivery dates, Currency, Payment Terms, Shipping Method, Discount Amount, Tax Amount, Shipping Cost, and auto-computed subtotal/total from line items. |
| **Priority** | ~~Critical~~ **Resolved** |

### ~~1.4 Purchase Orders Missing Line Items (Web-App)~~ FIXED

| Item | Detail |
|------|--------|
| **Where** | Web-app — Purchasing > Purchase Orders |
| **Problem** | ~~POs used generic CrudPanel with no line items.~~ |
| **Fix Applied** | Replaced CrudPanel with `DocumentBuilder`. POs now have inline-editable line items (Part ID, Description, Qty, Unit Price, Line Total), full financial breakdown (Tax, Shipping, computed totals), status actions (Submit, Approve, Mark Received), and expanded header fields. Supplier form also expanded from 5 to 14 fields. |
| **Priority** | ~~Critical~~ **Resolved** |

### ~~1.5 Invoice Line Items Missing (Web-App)~~ FIXED

| Item | Detail |
|------|--------|
| **Where** | Web-app — Sales > Invoices AND Finance > Invoices |
| **Problem** | ~~Both invoice views used generic CrudPanel with no line items.~~ |
| **Fix Applied** | Both Sales and Finance invoice tabs now use `DocumentBuilder` with inline-editable line items (Description, Qty, Unit Price, Line Total, Tax Code, Tax Amount), computed totals, Amount Paid/Due tracking, and status actions (Send, Mark Paid). Finance invoice also includes linked Order ID and expanded header fields. |
| **Priority** | ~~Critical~~ **Resolved** |

### ~~1.6 Journal Entry Lines Missing (Web-App)~~ FIXED

| Item | Detail |
|------|--------|
| **Where** | Web-app — Finance > Journal Entries |
| **Problem** | ~~Journal Entries used generic CrudPanel with no debit/credit lines.~~ |
| **Fix Applied** | Replaced with `DocumentBuilder`. Journal Entries now have inline-editable lines (Account, Description, Debit, Credit), status actions (Post Entry, Reverse Entry), and proper header fields (Entry Date, Accounting Period, Reference Type/ID). |
| **Priority** | ~~Critical~~ **Resolved** |

### ~~1.7 No Delete Capability (Both Apps)~~ FIXED

| Item | Detail |
|------|--------|
| **Where** | Web-app — all entity types |
| **Problem** | ~~No delete button on any record in the web-app.~~ (Desktop already had delete with confirmation on RecordDetailPage.) |
| **Fix Applied** | Added delete with confirmation dialog to: `CrudPanel` (all simple CRUD entities), `DocumentBuilder` (all transactional documents), and `QuoteBuilder` (quotes). All show a red "Delete" button and require confirmation before executing. |
| **Priority** | ~~Critical~~ **Resolved** |

---

## 2. Desktop vs Web-App Parity

### 2.1 Feature Parity Matrix

| Feature | Desktop | Web-App | Gap |
|---------|---------|---------|-----|
| **Quote Line Items** | Missing | Present (QuoteBuilder) | Desktop behind |
| **Sales Order Line Items** | Present | Missing | Web-app behind |
| **Sales Order Financial Breakdown** | Present (6 fields) | Partial (1 field) | Web-app behind |
| **Purchase Order Line Items** | Present | Missing | Web-app behind |
| **Purchase Order Financial Breakdown** | Present (4 fields) | Partial (1 field) | Web-app behind |
| **Invoice Line Items** | Present | Missing | Web-app behind |
| **Journal Entry Lines** | Present | Missing | Web-app behind |
| **EBOM Create Button** | Present | Present | Parity |
| **MBOM Create Button** | Present | Present | Parity |
| **EBOM Line Items** | Present | Present (EbomPanel) | Parity |
| **MBOM Line Items** | Present | Present (MbomPanel) | Parity |
| **EBOM Option Groups** | Present | Present | Parity |
| **EBOM Revision Control** | Present | Present | Parity |
| **MBOM Revision Control** | Present | Present | Parity |
| **Work Order Create** | Present | Present | Parity |
| **Work Order Operations (from Routing)** | Present (read-only) | Not visible | Web-app behind |
| **Work Order Materials (from MBOM)** | Present (read-only) | Not visible | Web-app behind |
| **OEE Dashboard** | Present (KPI + table) | Not visible as tab | Web-app behind |
| **MRP** | Not visible | Present (dedicated page) | Desktop behind |
| **Shop Floor View** | Present | Present | Parity |
| **8D D-Step Tracking** | Present (visual) | Present (fields only) | Desktop ahead |
| **Financial Reports** | Present (5 reports) | Not visible | Web-app behind |
| **Service Kanban** | Present | Present | Parity |
| **Service Orders** | Not visible | Present | Desktop behind |
| **RFI/RFQ/RFP** | Not visible | Present | Desktop behind |
| **Scheduling Views** | Present (basic) | Present (Calendar/Gantt/List) | Web-app ahead |
| **Fleet/Vehicles** | Present | Not visible | Desktop ahead |
| **Territories/Routes** | Present | Not visible | Desktop ahead |
| **Shifts** | Present | Not visible | Desktop ahead |
| **Carrier API Settings** | Not visible | Present | Web-app ahead |
| **Supplier Detail (25 fields)** | Present | Basic (5 fields) | Desktop ahead |
| **Account Detail (32 fields)** | Present | Moderate (15 fields) | Desktop ahead |
| **Parts Direct CRUD** | View/Edit only | Not in PLM page | Both limited |
| **Delete Buttons** | Not visible on any entity | Not visible on any entity | Both missing |

### 2.2 Line-Item Support Summary

| Document Type | Database | Server API | Desktop | Web-App |
|---------------|----------|------------|---------|---------|
| **Quotes** | `crm_quote_lines` | Full CRUD | **Missing** | Present |
| **Sales Orders** | `crm_sales_order_lines` | Full CRUD | Present | **Missing** |
| **Purchase Orders** | `finance_purchase_order_lines` | Full CRUD | Present | **Missing** |
| **Invoices** | `finance_invoice_lines` | Full CRUD | Present | **Missing** |
| **Journal Entries** | GL entry lines | POST /post | Present | **Missing** |
| **EBOMs** | `plm_ebom_lines` | Full CRUD | Present | Present |
| **MBOMs** | `plm_mbom_lines` | Full CRUD | Present | Present |
| **Routings** | `plm_routing_operations` | Full CRUD | Present | Not visible |
| **Pick Lists** | `logistics_pick_list_lines` | GET lines | Not visible | Not visible |
| **Shipments** | `logistics_shipment_lines` | Full CRUD | Not visible | Not visible |
| **Work Orders** | `manufacturing_wo_operations` | Read | Present (read-only) | Not visible |

---

## 3. Module-by-Module Audit

### 3.1 PLM (Product Lifecycle Management)

| Entity | Create | List | View/Edit | Line Items | Revision Control | Status Workflow | Notes |
|--------|--------|------|-----------|------------|-----------------|-----------------|-------|
| **Parts** | Via EBOM only | Both apps | Both apps | N/A | No | draft > active > obsolete | No standalone "New Part" button in either app. Parts are created as a side-effect of EBOM creation. Consider adding standalone Part creation for purchased/raw materials that don't need an EBOM. |
| **EBOMs** | Both apps | Both apps | Both apps | Both apps | Both apps | draft > review > released > obsolete | Solid implementation. |
| **MBOMs** | Both apps | Both apps | Both apps | Both apps | Both apps | draft > approved/production > obsolete | Solid. Created from EBOM. |
| **Routings** | Both apps | Both apps | Both apps | Desktop only (ops) | No | No status field | Web-app doesn't show nested operations in routing detail. |
| **ECOs** | Both apps | Both apps | Both apps | N/A | No | draft > submitted > review > approved > implemented | Good. |
| **Where Used** | N/A | Both apps | Read-only search | N/A | N/A | N/A | Good analysis tool. |
| **Engineering Report** | N/A | Both apps | Both apps | N/A | N/A | N/A | Useful BOM error detection. |

**PLM Gaps from a Manufacturing Operations Perspective:**
- No standalone Part creation — raw materials and purchased parts shouldn't require an EBOM
- No "Copy BOM" or "Clone" function visible for quickly creating variants
- No BOM comparison tool (diff two revisions side by side)
- No BOM costing roll-up (sum of component costs through the tree)
- No approved vendor list (AVL) per part — only `preferred_supplier_id` (single supplier)
- ECOs don't have an "affected items" section showing which parts/BOMs are impacted
- No document/drawing attachment capability on any PLM entity

### 3.2 Sales

| Entity | Create | List | View/Edit | Line Items | Financial Fields | Status Workflow | Notes |
|--------|--------|------|-----------|------------|-----------------|-----------------|-------|
| **Quotes** | Both apps | Both apps | Both apps | Web-app only | Both apps | draft > sent > viewed > accepted > rejected > expired > converted | **Desktop missing line items.** |
| **Sales Orders** | Both apps | Both apps | Both apps | Desktop only | Desktop full / Web-app partial | draft > confirmed > in_production > shipped > delivered > invoiced > completed | **Web-app missing line items and financial breakdown.** |
| **Invoices** | Both apps | Both apps | Both apps | Desktop only | Desktop full / Web-app partial | draft > sent > partial_paid > paid | **Web-app missing line items.** |

**Sales Gaps from a Manufacturing Operations Perspective:**
- No "Convert Quote to Sales Order" button/action visible in either app
- No "Create Invoice from Sales Order" button in the UI (server endpoint exists: `POST /sales/orders/{id}/invoice`)
- No customer address selection (ship-to / bill-to) on orders — `ship_to_address_id` and `bill_to_address_id` exist in DB but not in UI
- No order acknowledgment or confirmation document generation
- No backorder management — if partial stock, no way to split an order
- No sales order → work order creation flow visible in UI
- No credit memo or returns against invoices
- No payment application against specific invoices from the Sales module
- Discount is only at the header level on orders — no per-line discount in the desktop (web-app quotes have per-line)

### 3.3 Purchasing

| Entity | Create | List | View/Edit | Line Items | Financial Fields | Status Workflow | Notes |
|--------|--------|------|-----------|------------|-----------------|-----------------|-------|
| **Purchase Orders** | Both apps | Both apps | Both apps | Desktop only | Desktop full / Web-app partial | draft > submitted > approved > received | **Web-app missing line items.** |
| **Suppliers** | Both apps | Both apps | Desktop detailed / Web-app basic | N/A | Desktop (25 fields) / Web-app (5 fields) | prospect > active > inactive | Web-app supplier form is very thin. |
| **Receipts/Bills** | Both apps | Both apps | Both apps | Neither app | Both apps | open > partial_paid > paid | Neither app shows receipt line items for partial receiving. |
| **RFI** | Web-app only | Web-app only | Web-app only | No | No | draft > issued > evaluated > closed | Not in desktop. |
| **RFQ** | Web-app only | Web-app only | Web-app only | No | Budget estimate only | draft > issued > awarded > closed | Not in desktop. |
| **RFP** | Web-app only | Web-app only | Web-app only | No | Budget range only | draft > issued > awarded > closed | Not in desktop. |

**Purchasing Gaps from a Manufacturing Operations Perspective:**
- No three-way match (PO line vs Receipt line vs Vendor Invoice line) — receiving is header-level only
- No partial receiving workflow — `received_quantity` exists per PO line in DB but UI doesn't expose it
- No receiving inspection integration (receive → inspect → accept/reject)
- No vendor scorecard or performance tracking visible in UI
- No blanket PO / scheduled release support
- RFI/RFQ/RFP have no line items — cannot specify parts and quantities being requested
- No "Create PO from RFQ Response" workflow
- No purchase requisition process (request → approve → PO)

### 3.4 Manufacturing

| Entity | Create | List | View/Edit | Line Items | Financial Fields | Status Workflow | Notes |
|--------|--------|------|-----------|------------|-----------------|-----------------|-------|
| **Work Orders** | Both apps | Both apps | Both apps | Desktop only (ops + materials) | None | planned > released > in_progress > completed > closed | **Web-app doesn't show operations or material list.** |
| **Work Centers** | Both apps | Both apps | Both apps | N/A | Hourly rate | N/A | Good. |
| **Operations** | Both apps | Both apps | Both apps | N/A | Setup/cycle time | N/A | Good. |
| **Shop Floor** | Both apps | Both apps | Both apps | Operations queue | No | N/A | Good monitoring view. |
| **OEE** | Desktop | Desktop | Desktop | OEE log entries | No | N/A | **Not visible in web-app.** |
| **MRP** | Web-app | Web-app | Web-app | Demand + planned orders | No | N/A | **Not visible in desktop.** Full demand analysis and planned order confirmation. |

**Manufacturing Gaps from a Manufacturing Operations Perspective:**
- No work order costing — no labor cost, material cost, overhead, or total WO cost tracking in UI
- No work order material issuing — materials show as read-only list; no "Issue Material" action
- No work order scrap reporting — qty_scrapped field exists but no scrap transaction workflow
- No operation start/stop/complete actions from Shop Floor (read-only monitoring)
- No work order scheduling (Gantt or capacity-based scheduling of WOs across work centers)
- No finite capacity planning — MRP generates planned orders but doesn't consider work center capacity
- No production reporting / labor time entry against work orders
- No rework workflow — wo_type "rework" exists but no parent WO linkage
- No batch/lot traceability — work order doesn't generate lot numbers for finished goods
- No first article inspection trigger
- No traveler / shop packet document generation

### 3.5 Warehouse / Inventory

| Entity | Create | List | View/Edit | Line Items | Financial Fields | Status Workflow | Notes |
|--------|--------|------|-----------|------------|-----------------|-----------------|-------|
| **Inventory** | Both apps | Both apps | Both apps | N/A | Cost per unit | N/A | Basic. |
| **Transactions** | Both apps | Both apps | Both apps | N/A | No | N/A | Receipt/issue/transfer/adjustment types. |
| **Pick Lists** | Both apps | Both apps | Both apps | Neither app | No | pending > in_progress > completed | Pick list lines exist in DB but not in UI. |
| **Cycle Counts** | Both apps | Both apps | Both apps | N/A | No | planned > in_progress > completed | Basic single-item counts. |

**Warehouse Gaps from a Manufacturing Operations Perspective:**
- No warehouse location management in either app (DB table `logistics_locations` exists)
- No bin/slot assignment — inventory not tracked by location
- No multi-warehouse inventory view
- Inventory doesn't show which part it's for (only lot/serial and qty)
- No inventory valuation report (FIFO, LIFO, weighted average)
- No min/max/reorder point alerts
- No stock transfer between warehouses
- Pick list lines not visible — can't see what items to pick
- Cycle count doesn't show expected vs counted variance
- No putaway workflow for received goods
- No quarantine/hold/quality hold status on inventory

### 3.6 Quality

| Entity | Create | List | View/Edit | Status Workflow | Notes |
|--------|--------|------|-----------|-----------------|-------|
| **8D Reports** | Both apps | Both apps | Both apps | in_progress > completed > closed | Desktop has visual D-step progress tracking. Web-app has fields only. |
| **CAPA** | Both apps | Both apps | Both apps | open > investigation > action_plan > implementation > verification > closed | Good workflow. |
| **NCR** | Both apps | Both apps | Both apps | open > under_review > containment > disposition > closed | Good. |
| **Audits** | Both apps | Both apps | Both apps | planned > in_progress > completed > closed | Good. |

**Quality Gaps from a Manufacturing Operations Perspective:**
- No inspection plans — `quality_inspection_plans` and `quality_inspection_characteristics` tables exist in DB but no UI
- No inspection results recording — `quality_inspection_results` table exists but no UI
- No incoming inspection workflow (receive material → inspect → accept/reject/MRB)
- No in-process inspection integration with work order operations
- No final inspection / first article inspection
- No supplier quality (PPAP/APQP/FAI submission tracking)
- No statistical process control (SPC) charting
- No control plans
- No quality hold on inventory
- Audit findings don't link to CAPAs automatically
- NCR doesn't auto-create CAPA or 8D (manual linking only)

### 3.7 Finance

| Entity | Create | List | View/Edit | Line Items | Financial Fields | Notes |
|--------|--------|------|-----------|------------|-----------------|-------|
| **GL Accounts** | Both apps | Both apps | Both apps | N/A | N/A | Good. Hierarchical. |
| **Journal Entries** | Both apps | Both apps | Both apps | Desktop only | Debit/Credit | Web-app missing journal lines. |
| **AR Invoices** | Both apps | Both apps | Both apps | Desktop only | Full breakdown | Web-app missing line items. |
| **Payments** | Both apps | Both apps | Both apps | N/A | Amount, method | Good. |
| **Financial Reports** | Desktop only | Not visible | Balance Sheet, Income Statement, Cash Flow, Trial Balance, Aging | N/A | N/A | Web-app has no financial reports. |

**Finance Gaps from a Manufacturing Operations Perspective:**
- No AP aging report
- No AR aging report (report button exists in desktop but backend is placeholder)
- No bank reconciliation
- No multi-currency with exchange rate management
- No cost center / department accounting
- No budget vs actual tracking
- No WIP (Work in Progress) accounting for open work orders
- No standard cost variance reporting
- No tax configuration (tax codes, rates, jurisdictions)

### 3.8 Logistics / Shipping

| Entity | Create | List | View/Edit | Line Items | Financial Fields | Notes |
|--------|--------|------|-----------|------------|-----------------|-------|
| **Shipments** | Web-app | Web-app | Web-app | Neither app | Freight/insurance cost | Desktop doesn't have dedicated shipping module (handled under logistics). |
| **Carriers** | Web-app | Web-app | Web-app | N/A | N/A | Good. |
| **Tracking Events** | Web-app | Web-app | Web-app | N/A | N/A | Good concept. |
| **Shipping Labels** | Web-app | Web-app | Web-app | N/A | Cost | Good concept. |
| **Packing Lists** | Web-app | Web-app | Web-app | Neither app | N/A | Lines exist in DB but not in UI. |
| **Warehouses** | Web-app | Web-app | Web-app | N/A | N/A | Good. |
| **Return Shipments** | Web-app | Web-app | Web-app | N/A | N/A | Links to RMA. |

**Logistics Gaps:**
- Shipment lines not visible — can't see which items/quantities are in each shipment
- Packing list lines not visible
- No "Ship from Sales Order" workflow connecting SO → Pick → Pack → Ship
- No partial shipment support
- No freight quote comparison
- No proof of delivery tracking

### 3.9 Service

| Entity | Create | List | View/Edit | Financial Fields | Notes |
|--------|--------|------|-----------|-----------------|-------|
| **Tickets** | Both apps | Both apps (Kanban) | Both apps | Estimated/actual hours | Good Kanban view. |
| **Service Orders** | Web-app | Web-app | Web-app | Labor/parts/travel cost + price, margin | **Not visible in desktop.** |
| **RMA** | Both apps | Both apps | Both apps | No | Good. |
| **Warranty** | Both apps | Both apps | Both apps | No | Good. |

### 3.10 HR

| Entity | Create | List | View/Edit | Notes |
|--------|--------|------|-----------|-------|
| **Employees** | Both apps | Both apps | Both apps | Desktop has full detail (20+ fields). Web-app uses specialized table. |
| **Positions** | Both apps | Both apps | Both apps | Salary range fields. |
| **Attendance** | Both apps | Both apps | Both apps | Time entries. |
| **Leave** | Both apps | Both apps | Both apps | Leave requests. |
| **Payroll** | Both apps | Both apps | Both apps | Gross/deductions/taxes/net. |
| **Performance** | Both apps | Both apps | Both apps | Reviews. |
| **Benefits** | Web-app | Web-app | Web-app | **Not visible in desktop.** |

### 3.11 Projects

| Entity | Create | List | View/Edit | Financial Fields | Notes |
|--------|--------|------|-----------|-----------------|-------|
| **Projects** | Both apps | Both apps | Both apps | Budget, actual cost | Good. |
| **Tasks** | Both apps | Both apps | Both apps | Planned/actual hours | Good. |
| **Time Entries** | Both apps | Both apps | Both apps | Hours | Good. |
| **Gantt** | Placeholder | Not visible | Not functional | N/A | Neither app has a working Gantt chart. |

### 3.12 CRM

All CRM entities (Accounts, Contacts, Opportunities, Leads) are present in both apps with Create/List/View/Edit. Desktop has significantly more detail fields on Accounts (32 fields vs ~15 in web-app).

**CRM Gaps:**
- No activity/interaction logging (calls, emails, meetings) visible in UI — `crm_activities` table exists in DB
- No pipeline visualization (opportunity funnel/board view)
- No territory assignment on accounts
- No duplicate detection
- No customer communication history

### 3.13 Admin / Settings

Both apps have Users, Roles, Role Permissions, User Roles, Tenant Settings, Audit Trail, and Data Migration. The desktop client additionally has Appearance (theme/font) and Connection settings.

---

## 4. Backend-Supported but UI-Missing

These features have database tables and/or API endpoints but no UI in either app.

| Feature | Database | API | Desktop | Web-App |
|---------|----------|-----|---------|---------|
| **CRM Addresses** (multi-address per entity) | `crm_addresses` | Likely | No | No |
| **CRM Activities** (calls, meetings, emails) | `crm_activities` | Likely | No | No |
| **CRM Entity Notes** (pinned/private notes) | `crm_entity_notes` | Likely | No | No |
| **Warehouse Locations** (bin/slot/aisle) | `logistics_locations` | Likely | No | No |
| **Carrier Services** (service levels per carrier) | `logistics_carrier_services` | Yes | No | No |
| **Quality Inspection Plans** | `quality_inspection_plans` | Likely | No | No |
| **Quality Inspection Characteristics** | `quality_inspection_characteristics` | Likely | No | No |
| **Quality Inspection Results** | `quality_inspection_results` | Likely | No | No |
| **Project Phases** | `pm_phases` | Yes | No | No |
| **Project Milestones** | `pm_milestones` | Yes | No | No |
| **Project Issues** | `pm_issues` | Yes | No | No |
| **Project Budget Items** | `pm_budget_items` | Yes | No | No |
| **Service Orders** (field service) | `service_orders` | Yes | No | Web-app only |
| **Service Parts Used** (parts consumed) | `service_parts_used` | Likely | No | No |
| **PLM Materials Catalog** | `plm_materials` | Yes | No | No |
| **Manufacturing Material Transactions** | `manufacturing_material_transactions` | Likely | No | No |
| **Shipment Lines** (items per shipment) | `logistics_shipment_lines` | Yes | No | No |
| **Pick List Lines** (items to pick) | `logistics_pick_list_lines` | Yes | No | No |
| **Quote-to-SO Conversion** | Server endpoint | `POST /sales/orders/{id}/invoice` | No | No |
| **SO-to-Invoice Atomic Creation** | Server endpoint | `POST /sales/orders/{id}/invoice` | No | No |
| **Multi-line Journal Entry Posting** | Server endpoint | `POST /finance/journal-entries/post` | No | No |
| **MBOM from EBOM with Options** | Server endpoint | `POST /plm/mboms/from-ebom` | No | No |
| **Part Number Generation** | Server endpoint | `GET /plm/generate-pn` | Partial (via EBOM) | Partial (via EBOM) |

---

## 5. Common-Sense Manufacturing Gaps

From the perspective of a manufacturing operations professional, here are features that any user would expect but are completely absent from the system.

### 5.1 Order-to-Cash Flow Breaks

| Expected Flow | Current State |
|---------------|---------------|
| Quote → Sales Order | No "Convert to Order" button. Manual re-entry. |
| Sales Order → Work Order | No "Create Work Order" button on SO. Manual creation referencing SO. |
| Sales Order → Pick List | No "Create Pick List" button on SO. Manual creation referencing SO. |
| Sales Order → Shipment | No "Ship Order" button on SO. Manual creation referencing SO. |
| Sales Order → Invoice | Server endpoint exists (`POST /orders/{id}/invoice`) but no UI button. |
| Invoice → Payment | Payment exists but no "Apply Payment" from invoice view. |

### 5.2 Procure-to-Pay Flow Breaks

| Expected Flow | Current State |
|---------------|---------------|
| MRP → Purchase Requisition → PO | MRP generates planned orders but no "Confirm" creates real PO. |
| PO → Receiving (line-level) | No per-line receiving. Bill/receipt is header-level only. |
| PO → Receiving → Inspection | No receiving inspection integration. |
| PO → Vendor Invoice → Payment | Bill exists but no three-way match validation. |

### 5.3 Make-to-Order Flow Breaks

| Expected Flow | Current State |
|---------------|---------------|
| SO → WO (auto or button) | Manual WO creation only. |
| WO → Material Issue (from inventory) | Read-only material list. No "Issue" action. |
| WO → Operation Start/Stop/Complete | Read-only operations. No clock-in/clock-out. |
| WO → Finished Goods Receipt | No "Receive to Inventory" on WO completion. |
| WO → Cost Roll-up | No labor + material + overhead costing on WO. |

### 5.4 Missing Universal Features

| Feature | Impact |
|---------|--------|
| **Delete** on any record | No delete button visible on any entity in either app. Users cannot remove erroneous records. |
| **Document Attachments** | Cannot attach drawings, PDFs, photos, or documents to any record. |
| **Print / Export** | No print button, no PDF generation, no CSV export on any view. |
| **Audit Trail per Record** | System-wide audit trail exists in Admin but no per-record change history visible. |
| **Notes / Comments** | `crm_entity_notes` table exists but no UI. No ability to add notes to WOs, POs, SOs, etc. |
| **Approval Workflows** | Status transitions exist but no approval queue, no "Approve" / "Reject" buttons with reason. |
| **Email Notifications** | No email triggers on status changes (PO approved, quote sent, WO released, etc.). |
| **Dashboard KPIs** | Dashboard exists with 4 KPI cards but no module-specific dashboards (e.g., purchasing KPIs, quality KPIs). |
| **Bulk Actions** | No multi-select + bulk status change, bulk delete, bulk print, etc. |
| **Favorites / Recent Records** | No way to bookmark or quickly access frequently used records. |

---

## 6. Summary Scorecards

### 6.1 Module Completeness (Manufacturing Operations Perspective)

| Module | Desktop Score | Web-App Score | Overall | Key Gap |
|--------|-------------|---------------|---------|---------|
| **PLM** | 8/10 | 7/10 | 7.5/10 | No standalone Part creation; no BOM cost roll-up |
| **Manufacturing** | 6/10 | 5/10 | 5.5/10 | No WO costing, no material issuing, no operation control |
| **Sales** | 7/10 | 4/10 | 5.5/10 | Web-app missing line items on SO/Invoice; no Quote→SO conversion |
| **Purchasing** | 7/10 | 4/10 | 5.5/10 | Web-app missing PO line items; no receiving workflow |
| **Quality** | 7/10 | 6/10 | 6.5/10 | No inspection plans, no incoming inspection |
| **Warehouse** | 4/10 | 4/10 | 4/10 | No location management, no bin tracking, lines hidden |
| **Finance** | 6/10 | 4/10 | 5/10 | Web-app missing JE lines, invoice lines; no reports |
| **Logistics** | 5/10 | 5/10 | 5/10 | No shipment lines, no pick-pack-ship workflow |
| **Service** | 6/10 | 7/10 | 6.5/10 | Desktop missing Service Orders |
| **CRM** | 7/10 | 6/10 | 6.5/10 | No activity logging, no pipeline view |
| **HR** | 7/10 | 6/10 | 6.5/10 | Desktop missing Benefits |
| **Projects** | 5/10 | 5/10 | 5/10 | No Gantt, no milestones/phases/issues in UI |
| **Admin** | 8/10 | 8/10 | 8/10 | Solid |

### 6.2 Priority Action Items

**Immediate (blocks basic usage):**
1. Add Quote line items to desktop client
2. Add Sales Order line items + financial fields to web-app
3. Add Purchase Order line items to web-app
4. Add Invoice line items to web-app
5. Add Journal Entry lines to web-app
6. Add Delete capability to both apps (at least soft-delete with confirmation)

**Short-term (expected by any ERP user):**
7. Quote → Sales Order conversion button
8. Sales Order → Invoice creation button (wire up existing endpoint)
9. PO receiving at line level (partial receipts)
10. Work Order material issuing actions
11. Work Order operation start/stop/complete from Shop Floor
12. Warehouse location management UI
13. Add routing operations section to web-app routing detail
14. Add WO operations + materials sections to web-app WO detail
15. Add financial reports to web-app
16. Surface Service Orders in desktop client
17. Expand web-app Supplier detail to match desktop (25 fields vs 5)

**Medium-term (expected by manufacturing professionals):**
18. Inspection plans and results recording
19. Incoming inspection workflow
20. Work order costing (labor + material + overhead)
21. BOM cost roll-up
22. Standalone Part creation (for purchased/raw materials)
23. Document/file attachment on records
24. Print/PDF/CSV export
25. Per-record change history (audit trail)
26. Approval workflows with approve/reject actions
27. MRP → confirmed PO/WO creation
28. Three-way match (PO vs Receipt vs Vendor Invoice)
29. Pick-Pack-Ship workflow from Sales Orders

---

*Last updated: 2026-02-26*
