# Ratatosk Workshop Playbook

**Document:** ML-SOP-001
**Version:** 1.0
**Date:** March 2026
**Author:** Christopher Gaither
**Classification:** Internal — Mimir Labs

---

## Purpose

This playbook defines the end-to-end process for selling, preparing, delivering, and following up on a Ratatosk Data Governance Workshop. It is the standard operating procedure for every engagement.

---

## 1. Engagement Overview

| Item | Detail |
|------|--------|
| Product | Ratatosk — Data Governance Baseline Workshop |
| Duration | 1 day (standard), multi-day for complex environments |
| Delivery | Remote (default) or on-site |
| Pricing | $9,500 remote / $14,500 on-site / $1,250 per additional day |
| Migration credit | Up to 50% of workshop fees credited toward a migration engagement within 12 months |
| Participants | 3–8 stakeholders (ideal), cross-department representation required |
| Prerequisites | At least one source system accessible via ODBC, DDL export, or CSV schema |
| Deliverables | 8 artifacts (see Section 6) |

---

## 2. Qualification

### Ideal Customer Profile

- Manufacturing or B2B company, 25–500+ employees
- Running 2+ disconnected systems (ERP, spreadsheets, WMS, CRM)
- Experiencing at least one of:
  - Departments define the same business concepts differently
  - Reporting conflicts across systems
  - Upcoming ERP evaluation or migration
  - Audit or compliance pressure on data definitions
  - Private equity rollup / multi-entity consolidation
- Data frustration level 3+ on the intake form (Regular conflict or worse)

### Disqualification Signals

- Single-system environment with no integration pressure
- Looking for a software license, not a service engagement
- No willingness to provide schema access (even read-only/exported)
- Expecting Ratatosk to fix their data — it discovers and documents, it doesn't remediate

### Intake Form Fields (from mimirlabs.net/ratatosk)

| Field | Purpose |
|-------|---------|
| Full Name + Company | Primary contact |
| Work Email + Phone | Scheduling |
| Current Systems | Scope indicator — more systems = more complexity |
| Company Size | Effort estimator |
| Departments Generating Reports | Cross-department conflict potential |
| Data Frustration Level (1–5) | Urgency signal |
| Primary Challenge | Opens the conversation with their words |

---

## 3. Pre-Workshop (1–2 Weeks Before)

### 3.1 Scoping Call (30 min)

**Goal:** Confirm fit, set expectations, identify sources.

Agenda:
1. Confirm the customer's primary pain point (in their words)
2. Inventory source systems — name, vendor, version, database type
3. Determine access method for each source:
   - **Tier A (preferred):** Direct ODBC connection (PostgreSQL, SQL Server)
   - **Tier B (acceptable):** DDL export or CSV schema description
4. Identify 3–8 workshop participants — must include at least 2 departments
5. Clarify: Ratatosk is read-only, zero-knowledge, and deterministic. No PII is stored. No changes are made to their systems.
6. Schedule the workshop date

**Output:** Scoping summary email (systems, access method, participants, date).

### 3.2 Access Setup (3–5 Days Before)

Work with the customer's IT team to establish connectivity:

**For ODBC connections:**
- Request a read-only database user with SELECT permission on the schema
- Confirm the ODBC driver is available (PostgreSQL or SQL Server)
- Test connectivity before workshop day — never burn workshop time on connection issues
- If the customer is uncomfortable with direct access, offer DDL/CSV as a fallback

**For DDL/CSV sources:**
- Request `pg_dump --schema-only` or equivalent schema export
- Alternatively, a CSV describing tables and columns (table_name, column_name, data_type, nullable)
- Note: DDL/CSV sources cannot be profiled for data quality (no row counts, null rates, etc.)

### 3.3 Pre-Load (Day Before)

1. Open Ratatosk
2. Create a new manifest for the engagement
3. Connect to each source and run schema introspection
4. Verify all tables and columns are visible
5. Run DataAuditBaseline on ODBC sources (this can take 15–60 min for large schemas)
6. Review the raw schema: note table count, column count, any obvious structural issues (empty tables, sparse columns)
7. Do NOT annotate or label anything — the workshop is collaborative, not pre-cooked

**If connection fails:** Escalate immediately. Do not wait until workshop morning.

---

## 4. Workshop Day — Agenda

### Standard 1-Day Workshop (6 hours of working time)

| Block | Duration | Activity |
|-------|----------|----------|
| **Opening** | 30 min | Introductions, ground rules, goals, architecture overview |
| **System Mapping** | 45 min | Walk through each source system — who owns it, what it does, what's trusted |
| **Taxonomy Classification** | 90 min | Assign every table to a business domain (CRM, Sales, Manufacturing, etc.) |
| **Break** | 15 min | |
| **Semantic Annotation** | 90 min | Label columns with business names, identify conflicts and collisions |
| **Lunch** | 45 min | |
| **Conflict Review** | 60 min | Walk through detected collisions — label vs. label, name vs. name, ownership |
| **Data Quality Review** | 30 min | Review profiling results — sparse columns, empty tables, constant values |
| **Wrap-Up** | 30 min | Summarize findings, preview deliverables, discuss next steps |

**Total:** ~7.5 hours including breaks (fits a standard workday)

### Facilitator Notes

**Opening (30 min)**
- Frame the workshop: "We're here to agree on what your data means — across departments, across systems."
- Set the ground rule: there are no wrong answers. If two departments define something differently, that's a finding, not a failure.
- Briefly explain Ratatosk's architecture: zero-knowledge, no PII stored, deterministic, all outputs are theirs to keep.
- Show the Ratatosk UI on screen (screen share for remote, projector for on-site).

**System Mapping (45 min)**
- For each source system, ask:
  - Who uses this system day-to-day?
  - What business processes does it support?
  - Is this the system of record for any entity (customers, orders, inventory)?
  - Does anyone maintain a spreadsheet alongside this system? (Shadow system detection)
- Assign source classifications in Ratatosk: System of Record, Shadow System, Legacy, Reference

**Taxonomy Classification (90 min)**
- This is the highest-value block. Work through tables in bulk.
- Use the Ratatosk taxonomy panel to assign each table to a domain: CRM, Sales, Purchasing, Manufacturing, Warehouse, Finance, Projects, PLM, Quality, Service, HR, Logistics, etc.
- Don't agonize over borderline cases — flag them and move on. The conflict report will surface disagreements.
- Tip: Start with the obvious tables (customers, orders, invoices) to build momentum, then work through the ambiguous ones.

**Semantic Annotation (90 min)**
- Work column by column through the most critical tables (start with highest-row-count tables).
- For each column, ask: "What does this mean in your business?"
- Use right-click > Auto-Label All Columns to pre-populate abbreviation expansions, then review and correct.
- Pay special attention to:
  - Status columns (what do the values mean?)
  - Amount/quantity columns (what unit? what currency? gross or net?)
  - Date columns (created? modified? effective? expiration?)
  - ID/key columns (natural key or surrogate? what does it reference?)
- When departments disagree on a label, document both interpretations — this is a collision, and it's exactly what we're here to find.

**Conflict Review (60 min)**
- Generate the Conflict and Coverage Report
- Walk through each collision category:
  - **Label collisions:** Same business concept, different labels across sources
  - **Name collisions:** Same column name, different semantic meaning
  - **Ownership divergences:** Multiple sources claiming to be the system of record for the same entity
- For each collision, ask: "Which definition should win?" Document the decision or flag it for follow-up.

**Data Quality Review (30 min)**
- Present the DataAuditBaseline results (ODBC sources only)
- Highlight:
  - Tables with 0 rows (are they still in use?)
  - Columns with >50% null (is this expected or a data entry problem?)
  - Constant columns (1 distinct value — likely a default or placeholder)
  - All-empty text columns (no usable data)
- These findings feed directly into the action plan as remediation items.

**Wrap-Up (30 min)**
- Summarize key findings: how many tables analyzed, collisions found, coverage achieved
- Preview deliverables: "You'll receive these within 3 business days."
- Discuss next steps:
  - If migration is on the horizon: introduce Ragnarok as the execution layer
  - If they need ongoing alignment: introduce Bifrost
  - If they need more annotation time: quote additional days at $1,250/day
- Thank participants for their time and candor

---

## 5. Post-Workshop (1–3 Business Days After)

### 5.1 Generate Deliverables

In Ratatosk, generate all artifacts from the completed manifest:

1. **Taxonomy Manifest (JSON)** — the machine-readable manifest
2. **Executive Summary (PDF)** — 4-page leadership brief
3. **Action Plan (PDF + JSON)** — prioritized remediation roadmap
4. **Governance Summary (PDF)** — full technical report
5. **Conflict and Coverage Report (PDF)** — collision analysis
6. **Data Quality Report (PDF)** — rules-based quality evaluation
7. **Stewardship Matrix (PDF)** — data ownership assignments
8. **Visual Artifacts (SVG)** — coverage chart, taxonomy distribution, collision summary, ecosystem map

### 5.2 Quality Check

Before sending deliverables:

- [ ] Executive summary reads clearly to a non-technical audience
- [ ] Action plan items reference specific tables/columns (not vague)
- [ ] Conflict report includes all collisions discussed during the workshop
- [ ] Data quality flags match what was reviewed live
- [ ] No participant names or sensitive details in wrong sections
- [ ] All PDFs render correctly (no broken charts, no truncated tables)
- [ ] JSON manifest validates (load it back into Ratatosk to confirm)

### 5.3 Delivery Email

Send deliverables to the primary contact with CC to all workshop participants.

**Subject:** Ratatosk Governance Baseline — [Company Name]

**Body structure:**
1. Thank them for their participation
2. Summarize the top 3 findings (in business terms, not technical)
3. Attach deliverables (or share via secure link)
4. Note the migration credit: "If your organization proceeds with a structured migration engagement within 12 months, up to 50% of workshop fees may be credited."
5. Offer a 30-minute follow-up call to walk through the action plan

### 5.4 Follow-Up Call (1–2 Weeks After Delivery)

**Goal:** Answer questions, reinforce findings, explore next steps.

- Walk through the action plan priorities
- Ask which findings were surprising vs. already known
- If they're considering migration: "The manifest we built together is exactly what Ragnarok consumes. There's no rework — we pick up where we left off."
- If they need ongoing system alignment: introduce Bifrost
- If they want deeper analysis: quote additional days

---

## 6. Deliverable Reference

| Artifact | Format | Audience | Purpose |
|----------|--------|----------|---------|
| Taxonomy Manifest | JSON | Technical / Downstream tools | Machine-readable semantic model |
| Executive Summary | PDF (4 pages) | Leadership / Steering committee | Investment and risk decisions |
| Action Plan | PDF + JSON | Project managers / Technical leads | Remediation roadmap |
| Governance Summary | PDF | Technical leads / Governance teams | Full analysis detail |
| Conflict Report | PDF | Cross-department stakeholders | Collision resolution |
| Data Quality Report | PDF | IT / Data teams | Source system health |
| Stewardship Matrix | PDF | Management / HR | Data ownership accountability |
| Visual Artifacts | SVG | Presentations / Workshops | Coverage, taxonomy, collisions, ecosystem |

---

## 7. Multi-Day Engagements

Standard 1-day workshops cover environments with:
- 1–3 source systems
- Up to ~200 tables total
- 3–5 departments

**Quote additional days ($1,250/day) when:**
- 4+ source systems
- 500+ tables
- 6+ departments needing representation
- Multiple facilities with different system landscapes
- Customer requests dedicated time for specific modules (e.g., a full day on just manufacturing data)

**Multi-day structure:**
- Day 1: System mapping + taxonomy classification (all sources)
- Day 2: Semantic annotation (deep dive on highest-priority domains)
- Day 3+: Remaining domains, conflict resolution, action plan review

---

## 8. Remote vs. On-Site

| Factor | Remote ($9,500) | On-Site ($14,500) |
|--------|----------------|-------------------|
| Screen sharing | Facilitator shares Ratatosk via Zoom/Teams | Facilitator projects Ratatosk on room screen |
| Participant engagement | Moderate — camera fatigue after 4 hours | High — physical presence drives commitment |
| Whiteboarding | Digital (Miro, FigJam) | Physical whiteboard for system mapping |
| Travel | None | Flights, hotel, meals (included in pricing) |
| Best for | Single-site, tech-comfortable teams | Multi-site kickoffs, executive involvement, high-value prospects |

**Default to remote.** Recommend on-site when:
- The customer has executive stakeholders who need to be in the room
- Multiple physical sites are being consolidated (the workshop becomes a forcing function for alignment)
- The deal size justifies the investment (likely proceeding to migration)

---

## 9. Objection Handling

**"We already know our data is messy."**
Knowing it's messy and having a structured, prioritized remediation plan are different things. Ratatosk doesn't tell you what you already know — it quantifies the problem, identifies the specific collisions, and produces a roadmap your team can execute against.

**"Can't we just do this during migration?"**
You can, and most companies do. That's why most migrations go over budget by 2–3x. Discovery during migration means you're making definitional decisions under time pressure, with migration consultants billing hourly while they wait for your team to agree on what "customer" means.

**"We don't have ODBC access to give you."**
That's fine. Ratatosk also works with DDL exports and CSV schema descriptions. You won't get data quality profiling (null rates, row counts), but the semantic alignment and conflict detection work the same way.

**"$9,500 for one day seems expensive."**
What's the cost of a migration that fails because departments couldn't agree on field definitions? Ratatosk compresses weeks of ambiguous discovery into a single structured day, and the output feeds directly into migration tooling without rework. Plus, up to 50% is credited toward migration services.

**"What if we're not migrating?"**
Ratatosk doesn't require a migration. Many customers use it purely for data governance — understanding what their data means, who owns it, and where the conflicts are. The deliverables are yours regardless of what you do next.

**"How is this different from a consulting engagement?"**
A consultant interviews people and writes a report. Ratatosk produces machine-readable, deterministic artifacts from your actual schema. The taxonomy manifest, conflict analysis, and data quality baseline are computed — not narrated. And the manifest is directly consumable by migration and integration tooling if you proceed.

---

## 10. Internal Checklist

### Before Engagement

- [ ] Scoping call completed — systems identified, participants confirmed
- [ ] Access method confirmed for each source (ODBC / DDL / CSV)
- [ ] Workshop date scheduled, calendar invites sent to all participants
- [ ] Connectivity tested for all ODBC sources
- [ ] Schema introspection and DataAuditBaseline completed (day before)
- [ ] Invoice sent (workshop is prepaid)

### During Workshop

- [ ] All participants present and introduced
- [ ] Every source system mapped and classified
- [ ] All tables assigned to taxonomy groups
- [ ] Critical tables annotated (business labels on key columns)
- [ ] Collisions documented and discussed
- [ ] Data quality findings reviewed (ODBC sources)
- [ ] Next steps discussed

### After Workshop

- [ ] All 8 deliverables generated and quality-checked
- [ ] Delivery email sent within 3 business days
- [ ] Follow-up call scheduled (1–2 weeks out)
- [ ] CRM updated with engagement status and notes
- [ ] If migration-ready: Ragnarok scoping discussion initiated

---

*Copyright 2024–2026 Mimir Labs LLC. All rights reserved.*
