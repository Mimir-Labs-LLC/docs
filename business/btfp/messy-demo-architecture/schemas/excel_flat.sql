-- =============================================================================
-- Messy multi-system demo -- Excel side-processes, represented as flat tables
-- Schema/architecture only. The "architecture" of a spreadsheet is its sheet +
-- column structure. Modeled here as keyless flat tables with weakly-typed
-- columns (amounts and dates as text) -- the structural signature of a shadow
-- system of record living in Excel.
-- =============================================================================

-- Sheet: "PO Approvals"  (approval authority modeled OUTSIDE the ERP)
CREATE TABLE po_approvals (
    po_number     varchar(20),          -- overlaps SAP ekko.ebeln, no key/FK
    vendor        varchar(100),         -- text name, overlaps lfa1/vendors
    amount        varchar(20),          -- TEXT ("$85,000.00") -- type divergence
    requested_by  varchar(60),
    approved_by   varchar(20),
    approval_date varchar(20),          -- TEXT ("06/15/2026") -- type divergence
    notes         varchar(255)
    -- NO primary key
);

-- Sheet: "Price List 2026"  (pricing modeled outside SAP conditions / QB items)
CREATE TABLE price_list_2026 (
    part           varchar(40),         -- overlaps mara.matnr / items.sku
    description    varchar(120),
    unit           varchar(20),         -- free text unit ("Case (12)")
    list_price     varchar(20),         -- TEXT ("$45.00") -- type divergence
    effective_date varchar(20)          -- TEXT
    -- NO primary key
);

-- Sheet: "Production Tracker"  (the REAL operating status lives here)
CREATE TABLE production_tracker (
    so_number     varchar(20),          -- overlaps SAP vbak.vbeln, no key/FK
    customer      varchar(100),         -- text name, overlaps every "customer" store
    part          varchar(40),
    qty           varchar(20),          -- TEXT
    system_status varchar(30),          -- what the ERP says
    real_status   varchar(60),          -- what operators actually rely on (shadow field)
    notes         varchar(255)
    -- NO primary key
);
