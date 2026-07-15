# Messy Multi-System Demo — Data Architecture

*A typical messy manufacturing environment for the reliability-diagnostic demo. **Schema/architecture only** — the diagnostic introspects structure, not row values, so there is no seeded data. Load each schema into its own database (or schema) and point the diagnostic at all four.*

## The environment

One mid-market manufacturer whose business record spans four systems that model the same concepts differently:

| System | Vocabulary | File |
|---|---|---|
| **SAP S/4HANA** (system of record) | opaque ERP names (`kna1.kunnr`, `mara.matnr`, `ekko.ebeln`…) | `schemas/sap.sql` |
| **QuickBooks** (accounting) | friendly names (`customers.customer_id`, `items.sku`) | `schemas/quickbooks.sql` |
| **CRM** (Salesforce-style) | a third naming (`accounts.account_id`) | `schemas/crm.sql` |
| **Excel** (side-processes) | keyless flat sheets, text-typed columns | `schemas/excel_flat.sql` |

## What the diagnostic should surface (structural / semantic — not data values)

- **The same concept, modeled three or four ways, with no shared key.** "Customer" is `kna1` (SAP), `customers` (QuickBooks), and `accounts` (CRM); its identifier is `kunnr` / `customer_id` / `account_id`; its name is `name1` / `customer_name` / `account_name`. The column-mapping/synonym layer should recognize these as one concept across differently-named structures.
- **Role overlap across stores.** The "organization" concept appears as both `kna1` (customer) and `lfa1` (vendor) in SAP, and again as `customers` and `vendors` in QuickBooks — the same real orgs modeled in multiple tables.
- **Definition divergence.** CRM `accounts.type` (`Customer` | `Prospect`) makes the "customer" concept structurally *broader* in CRM than in the ERP/accounting stores. The diagnostic should flag that "customer" does not mean the same thing everywhere.
- **Weak / missing relationships.** QuickBooks `invoices.customer_name` and `invoices.item` are free text with **no foreign keys**; CRM `opportunities.product` is free text with no link to any item/material master. Structurally, records reference concepts they don't formally relate to.
- **Concept present in one system, absent in another.** `items.sku` / `opportunities.product` reference parts with no guaranteed counterpart in SAP `mara` — a structural signal that the item master is not authoritative everywhere.
- **Type divergence for the same field.** Amounts and dates are `numeric`/`date` in SAP and QuickBooks but **text** in the Excel-flat tables (`amount`, `list_price`, `approval_date` as `varchar`). Same concept, incompatible types — the classic reconciliation breaker.
- **Shadow structures.** The Excel flat tables are **keyless** and carry fields with no ERP counterpart (`production_tracker.real_status`, `po_approvals.approved_by`) — structurally, an operating record living outside the system of record.

## The false-positives (the interpretation walkthrough)

Not every structural echo is a conflict. Seed these so you can *show the discipline*:

- **`bkpf.belnr` ("Document Number") and `bkpf.blart` ("Document Type")** look like generic conflict-prone fields but are **normal SAP accounting-document structure**.
- **"Document Number" appears under multiple names** — `ekko.ebeln` (purchasing document number), `vbak.vbeln` (sales document number), `bkpf.belnr` (accounting document number). A naive read calls this a "same concept, three tables" conflict; it is actually **three legitimately distinct document namespaces** that share a label. The human clears it.

Demonstrating that the tool separates *normal ERP structure* from *real semantic divergence* is the most credibility-building moment in the demo.

## Loading

```
createdb demo_sap        && psql -d demo_sap        -f schemas/sap.sql
createdb demo_quickbooks && psql -d demo_quickbooks -f schemas/quickbooks.sql
createdb demo_crm        && psql -d demo_crm        -f schemas/crm.sql
createdb demo_excel      && psql -d demo_excel      -f schemas/excel_flat.sql
```

(Or load all four into one database under separate schemas.) Point the diagnostic at the four; it introspects the architecture and surfaces the structural findings above. Empty tables are fine — no data required.
