-- =============================================================================
-- Messy multi-system demo -- QuickBooks (accounting)
-- Schema/architecture only. The same business concepts as SAP, modeled under a
-- different vocabulary and structure, with weaker referential integrity.
-- =============================================================================

-- Customers  (the "customer" concept again -- different key, different name field)
CREATE TABLE customers (
    customer_id    varchar(20) PRIMARY KEY,
    customer_name  varchar(100) NOT NULL,
    billing_city   varchar(50),
    billing_state  char(2),
    terms          varchar(20),          -- payment terms, free text ("Net 30")
    balance        numeric(15,2)
);

-- Items  (the "material/part" concept -- SKU here vs. matnr in SAP, no FK)
CREATE TABLE items (
    item_name   varchar(50) PRIMARY KEY, -- keyed on NAME, not a part number
    sku         varchar(40),             -- overlaps SAP matnr conceptually
    sales_desc  varchar(120),
    sales_price numeric(15,2),
    uom         varchar(20)              -- free text unit ("Box", "Each")
);

-- Invoices  (customer + item are TEXT, no FKs -- a structural weakness)
CREATE TABLE invoices (
    invoice_no    varchar(20) PRIMARY KEY,
    invoice_date  date,
    customer_name varchar(100),          -- text, NOT a FK to customers
    item          varchar(50),           -- text, NOT a FK to items
    qty           numeric(13,2),
    unit_price    numeric(15,2),
    amount        numeric(15,2),
    terms         varchar(20),
    due_date      date,
    paid_date     date
);

-- Vendors  (same real orgs may also be customers -- role overlap, different store)
CREATE TABLE vendors (
    vendor_name varchar(100) PRIMARY KEY, -- keyed on NAME
    terms       varchar(20),
    balance     numeric(15,2)
);
