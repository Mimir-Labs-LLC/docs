-- =============================================================================
-- Messy multi-system demo -- CRM (Salesforce-style)
-- Schema/architecture only. A third representation of "customer" (as "Account"),
-- broader than the accounting/ERP sense (includes prospects), and a "product"
-- reference with no link to any item master.
-- =============================================================================

-- Accounts  (the "customer" concept, third naming -- and a Type that makes the
-- definition broader than SAP/QuickBooks: an Account may be a Prospect)
CREATE TABLE accounts (
    account_id    varchar(20) PRIMARY KEY,
    account_name  varchar(100) NOT NULL,
    type          varchar(20),          -- 'Customer' | 'Prospect'  <- definition divergence
    industry      varchar(50),
    city          varchar(50),
    state         char(2),
    payment_terms varchar(20)           -- overlaps QB 'terms' and SAP conditions
);

CREATE TABLE contacts (
    contact_id varchar(20) PRIMARY KEY,
    account_id varchar(20) REFERENCES accounts(account_id),
    name       varchar(100),
    title      varchar(60),
    email      varchar(120)
);

-- Opportunities  ('product' is free text -- no relationship to SAP mara / QB items)
CREATE TABLE opportunities (
    opp_id     varchar(20) PRIMARY KEY,
    account_id varchar(20) REFERENCES accounts(account_id),
    name       varchar(120),
    stage      varchar(30),             -- 'Prospecting' ... 'Closed Won'
    amount     numeric(15,2),
    close_date date,
    product    varchar(50)              -- text, no FK to any item/material master
);
