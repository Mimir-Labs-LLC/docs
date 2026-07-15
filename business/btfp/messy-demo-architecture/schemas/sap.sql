-- =============================================================================
-- Messy multi-system demo -- SAP S/4HANA (system of record)
-- Schema/architecture only (no data). Real SAP table + field naming on purpose,
-- so the reliability diagnostic works against opaque ERP structure, not labels.
-- Load into its own database/schema; point the diagnostic at it.
-- =============================================================================

-- Customer master
CREATE TABLE kna1 (
    kunnr  char(10)    PRIMARY KEY,   -- customer number
    name1  varchar(35) NOT NULL,      -- name
    name2  varchar(35),
    ort01  varchar(35),               -- city
    regio  char(3),                   -- region/state
    land1  char(3),                   -- country
    ktokd  char(4),                   -- account group
    erdat  char(8),                   -- created on (YYYYMMDD, stored as char)
    loevm  char(1)                    -- deletion flag
);

-- Vendor master  (same real-world orgs can appear here AND in kna1 -- role overlap)
CREATE TABLE lfa1 (
    lifnr  char(10)    PRIMARY KEY,   -- vendor number
    name1  varchar(35) NOT NULL,
    ort01  varchar(35),
    regio  char(3),
    land1  char(3),
    erdat  char(8)
);

-- Material master
CREATE TABLE mara (
    matnr  char(18)    PRIMARY KEY,   -- material number
    maktx  varchar(40),               -- description
    meins  char(3),                   -- base unit of measure
    mtart  char(4),                   -- material type
    erdat  char(8)
);

-- Purchase order header
CREATE TABLE ekko (
    ebeln  char(10)    PRIMARY KEY,   -- purchasing document number
    bukrs  char(4),                   -- company code
    lifnr  char(10) REFERENCES lfa1(lifnr),
    bsart  char(4),                   -- PO type
    aedat  char(8),
    waers  char(5),                   -- currency
    netwr  numeric(15,2),             -- net value
    frgke  char(1)                    -- release (approval) indicator
);

-- Purchase order items
CREATE TABLE ekpo (
    ebeln  char(10) REFERENCES ekko(ebeln),
    ebelp  char(5),                   -- item number
    matnr  char(18) REFERENCES mara(matnr),
    menge  numeric(13,3),             -- quantity
    meins  char(3),
    netpr  numeric(11,2),
    netwr  numeric(15,2),
    PRIMARY KEY (ebeln, ebelp)
);

-- Sales order header
CREATE TABLE vbak (
    vbeln  char(10)    PRIMARY KEY,   -- sales document number
    auart  char(4),                   -- order type
    kunnr  char(10) REFERENCES kna1(kunnr),
    erdat  char(8),
    waers  char(5),
    netwr  numeric(15,2),
    gbstk  char(1)                    -- overall processing status
);

-- Sales order items
CREATE TABLE vbap (
    vbeln  char(10) REFERENCES vbak(vbeln),
    posnr  char(6),                   -- item number
    matnr  char(18) REFERENCES mara(matnr),
    kwmeng numeric(15,3),             -- order quantity
    vrkme  char(3),                   -- sales unit
    netpr  numeric(11,2),
    netwr  numeric(15,2),
    PRIMARY KEY (vbeln, posnr)
);

-- Accounting document header  (the "Document Number / Document Type" namespace)
CREATE TABLE bkpf (
    bukrs  char(4),
    belnr  char(10),                  -- accounting document number
    gjahr  char(4),                   -- fiscal year
    blart  char(2),                   -- document type
    budat  char(8),
    xblnr  varchar(16),               -- reference (external) doc number
    PRIMARY KEY (bukrs, belnr, gjahr)
);
