# RATATOSK WORKSHOP DEMO: WHAT YOUR ENGAGEMENT LOOKS LIKE
## A Customer-Facing Walkthrough of the Data Governance Baseline Workshop

**Duration:** ~12 minutes
**Audience:** Prospective customers evaluating a Ratatosk engagement
**Tone:** You're showing them what they'll experience — not how the tool works internally

---

## SCENE 1: BEFORE THE WORKSHOP

**Duration:** 1.5 minutes
**Scribe:** Start recording

**Narrative:**
> "Before the workshop, we ask you to do two things. First, give us read-only access to your primary database — we'll connect via ODBC the day before and verify everything works. Second, if your teams maintain spreadsheets outside the main system — production trackers, inventory sheets, quality checklists — send those to us as-is. Excel files, Google Sheets exports, whatever you have. We handle the conversion on our end."

### Step 1 — Show What We Do With Your Spreadsheets
**Action:** Show a sample Excel workbook briefly (tabs visible at the bottom), then show the converted JSON output that Ratatosk will ingest.
**Scribe Step:** Open sample Excel workbook -> Show tabs at bottom -> Close -> Open converted JSON file -> Scroll briefly -> Close.

**Narrative:**
> "When you send us your spreadsheets, we extract the structure — tab names become tables, column headers become fields, data types are inferred automatically. No business data is retained, just the schema. Formulas, pivot tables, cross-sheet references — we flag all of that for discussion during the workshop. By the time we start, everything is ready to analyze alongside your database."

---

## SCENE 2: WORKSHOP DAY — CONNECTING YOUR SYSTEMS

**Duration:** 1.5 minutes
**Scribe:** Continue recording

**Narrative:**
> "On workshop day, we start by connecting to your systems. Here's what that looks like."

### Step 3 — Connect to the Database
**Action:** Ratatosk Source Select dialog is open. Select ODBC. Paste the connection string. Click [Test Connection]. Show success. Type source label: "Acme ERP - Production". Select "System of Record". Click [Load Schema].
**Scribe Step:** Click [ODBC] -> Paste connection string -> Click [Test Connection] -> Type label -> Select [System of Record] -> Click [Load Schema].

**Narrative:**
> "We connect to your database in read-only mode. Ratatosk reads table names, column names, data types, and foreign key relationships. It never reads your actual data — never sees a customer name, never sees an invoice amount, never stores a password. The connection is live only for this session."

### Step 4 — Load the Shadow System
**Action:** File > Add Source. Select CSV. Browse to the converted shadow system file. Label it "Weekly Production Tracker (Shadow)". Set classification to "Shadow System". Click [Load Schema].
**Scribe Step:** Click [File] -> [Add Source...] -> Click [CSV] -> Browse to file -> Type label -> Select [Shadow System] -> Click [Load Schema].

**Narrative:**
> "Now we bring in your spreadsheets alongside the database. This is where the interesting findings start — when we can compare what your ERP says about the business against what your teams actually track."

---

## SCENE 3: WORKSHOP DAY — WHAT WE DO TOGETHER

**Duration:** 3 minutes
**Scribe:** Continue recording

**Narrative:**
> "The next part is collaborative. This is where your team is in the room — or on the call — and we work through the data together."

### Step 5 — Classify Business Domains
**Action:** Select a table in the source tree. Assign a taxonomy group (e.g., "Sales"). Repeat for 3-4 tables: Manufacturing, Finance, Warehouse.
**Scribe Step:** Click table -> Select [Sales] from Taxonomy dropdown. Click next table -> Select [Manufacturing]. Repeat.

**Narrative:**
> "We go through every table and ask: which part of the business owns this? When your sales team and your finance team both claim the `orders` table means something different — that's a finding. We document it, not resolve it on the spot. The resolution comes from the action plan."

### Step 6 — Label What the Data Means
**Action:** Right-click a table > Auto-Label All Columns. Show labels populating. Then manually edit one — change "Quantity" to "Shipped Quantity".
**Scribe Step:** Right-click table -> Click [Auto-Label All Columns] -> Click a column -> Edit label to "Shipped Quantity" -> Press Enter.

**Narrative:**
> "We start with automatic labeling — our dictionary knows standard ERP terminology from SAP, Oracle, Epicor, and a dozen other systems. But the auto-labels are just suggestions. Your team tells us what each field actually means in your business. When someone says 'that's not just any quantity — that's the shipped quantity,' that correction is the most valuable thing that happens all day."

### Step 7 — Discover Conflicts
**Action:** Point to two tables from different sources that share a column name (e.g., `status` in ERP vs. `status` in the shadow system). Show that the business labels are different.
**Scribe Step:** Click ERP table -> show `status` labeled "Order Fulfillment Status" -> Click shadow system table -> show `status` labeled "Inspection Result".

**Narrative:**
> "This is the core finding. Both systems have a column called `status`. In your ERP, it means order fulfillment. In the production tracker, it means inspection pass/fail. If anyone ever tried to merge these systems — or even report across them — those two definitions would collide. Ratatosk surfaces this before it causes damage."

---

## SCENE 4: WORKSHOP DAY — WHAT THE TOOL FINDS FOR YOU

**Duration:** 2 minutes
**Scribe:** Continue recording

### Step 8 — Data Quality Findings
**Action:** View > Data Quality. Show the quality dashboard with flagged columns.
**Scribe Step:** Click [View] -> Click [Data Quality] -> Point to flagged columns.

**Narrative:**
> "While we're working through definitions, Ratatosk is profiling your data in the background — again, only aggregate statistics, never actual values. It flags things like: this column is 90% empty. This table has zero rows. This field has only one distinct value across 50,000 records. These are the data quality issues that blow up a migration if nobody catches them early."

### Step 9 — The Ecosystem Map
**Action:** View > Data Lineage. Show the bipartite graph with sources connected to business domains.
**Scribe Step:** Click [View] -> Click [Data Lineage].

**Narrative:**
> "This is your data ecosystem — every source system connected to the business domains it touches. Thicker lines mean more data. The color tells you whether it's an official system or a shadow system. When you see a shadow spreadsheet connected to three business domains, that's a risk indicator — informal data driving formal decisions."

### Step 10 — Accountability
**Action:** View > Stewardship Panel. Show steward assignments.
**Scribe Step:** Click [View] -> Click [Stewardship Panel].

**Narrative:**
> "Before we finish, we assign names. Who owns the Sales data? Who is accountable for inventory definitions? If nobody's name is next to a domain, nobody will validate it during migration. This matrix becomes part of your deliverables."

---

## SCENE 5: WHAT YOU RECEIVE

**Duration:** 3 minutes
**Scribe:** Continue recording

**Narrative:**
> "Within three business days of the workshop, you receive a complete governance baseline — eight deliverables, each designed for a different audience in your organization."

### Step 11 — Generate All Artifacts
**Action:** File > Export Governance Artifacts (Ctrl+Shift+G). Check each box one by one (slowly, so Scribe captures each name). Set output directory. Click [Generate].
**Scribe Step:** Click [File] -> Click [Export Governance Artifacts...] -> Check [Executive Summary] -> Check [Action Plan] -> Check [Governance Summary] -> Check [Conflict & Coverage Report] -> Check [Data Quality Report] -> Check [Policy Compliance Report] -> Check [Stewardship Matrix] -> Check [SVG Visualizations] -> Click [Browse...] -> Select folder -> Click [Generate].

### Step 12 — Walk Through Each Deliverable
**Action:** Open the output folder. Open each PDF one at a time, showing the first page.

**12a — Executive Summary**
**Scribe Step:** Double-click [executive_summary.pdf] -> Show first page.
**Narrative:**
> "The Executive Summary is a four-page PDF designed for your leadership team. It shows a visual field coverage score, color-coded health indicators, and a plain-language narrative of what we found — how many fields were assessed, where definitions conflict, and an overall governance maturity rating. This is what your CFO or COO reads."

**12b — Action Plan**
**Scribe Step:** Close previous -> Double-click [action_plan.pdf] -> Show first page.
**Narrative:**
> "The Action Plan is a prioritized remediation roadmap. Critical items first, then high-priority, then consolidation, then migration-prep. Each item has a description, expected outcome, affected tables, effort estimate, and impact score. This is what your project manager executes against."

**12c — Conflict & Coverage Report**
**Scribe Step:** Close previous -> Double-click [conflict_coverage_report.pdf] -> Show first page.
**Narrative:**
> "The Conflict Report documents every semantic collision we found — label collisions, name collisions, ownership divergences. This is the evidence that the problem exists, quantified and categorized. When your teams argue about who's right, this report gives them the data."

**12d — Data Quality Report**
**Scribe Step:** Close previous -> Double-click [data_quality.pdf] -> Show first page.
**Narrative:**
> "The Data Quality Report evaluates your source data against governance rules — primary key presence, foreign key coverage, null ratios, naming conventions. Each rule passes or fails with the specific threshold and actual value. This tells your IT team where the structural risk lives."

**12e — Governance Summary**
**Scribe Step:** Close previous -> Double-click [governance_summary.pdf] -> Show first page.
**Narrative:**
> "The Governance Summary is the full technical report. Coverage breakdowns, taxonomy distribution, schema quality profiles, annotation depth metrics, and migration readiness scoring. This is the deep-dive for your data governance team or implementation partner."

**12f — Stewardship Matrix**
**Scribe Step:** Close previous -> Double-click [stewardship_matrix.pdf] -> Show first page.
**Narrative:**
> "The Stewardship Matrix maps named individuals to data domains. Who owns CRM data? Who is accountable for inventory definitions? This is the accountability document that prevents the most common migration failure: nobody owns the data that migration depends on."

**12g — Visual Artifacts**
**Scribe Step:** Close previous -> Open SVG folder -> Show coverage chart and ecosystem map.
**Narrative:**
> "Finally, the visual artifacts — coverage gauges, taxonomy distribution charts, collision breakdowns, and the data ecosystem map. These are designed for presentations and printed materials. Put them in your board deck, your steering committee slides, or your migration RFP."

### Step 13 — The Manifest
**Action:** File > Export Manifest (Ctrl+E). Click [Export]. Show the JSON file briefly.
**Scribe Step:** Click [File] -> Click [Export Manifest...] -> Click [Export].

**Narrative:**
> "And one more thing — the taxonomy manifest. This is the machine-readable version of everything we built today. If you proceed to migration, this file is exactly what our migration engine consumes. There's no re-discovery, no re-mapping, no lost work. The workshop output is the migration input."

---

## SCENE 6: WHAT HAPPENS NEXT

**Duration:** 1 minute
**Scribe:** Stop recording

**Narrative:**
> "That's the full engagement. One day with your team, eight deliverables within three business days. You'll know exactly where your data definitions conflict, which systems are the source of truth for which entities, where data quality risk lives, and who's accountable for what.
>
> If you decide to move forward with migration, up to 50% of the workshop fee is credited toward migration services. The manifest we built together feeds directly into the migration tooling — no rework.
>
> If you're not migrating, the deliverables are still yours. Use them with any vendor, any consultant, any internal initiative. There's no lock-in.
>
> One day. Eight deliverables. Clarity before commitment."

---

## SCRIBE CAPTURE TIPS

| Tip | Detail |
|-----|--------|
| **Pacing** | This is a customer-facing demo, not a feature tour. Pause 2 seconds after each narrative line before clicking. Let the words land. |
| **PDFs** | When showing deliverables, maximize each PDF to fill the screen. Give Scribe 3 seconds on each first page before closing. |
| **Panel Layout** | Before recording, set the Annotation Window to ~30/70 split (source tree / detail panel). Ensure no scrolling is needed to see column labels. |
| **Right-Click Menus** | Move slowly on context menus. Hover on each option for 1 second before clicking. |
| **Shadow System** | Use a real-looking workbook name in the converter step — "Weekly_Production_Tracker.xlsx" reads better on screen than "test.xlsx". |
| **Conflict Moment** | Scene 3, Step 7 is the emotional peak. Slow down. Let the viewer see both labels side by side before narrating. |
| **Deliverable Names** | Check each artifact checkbox individually (not "Select All") so Scribe captures each name. Viewers need to see what they're getting. |
| **Window Sizing** | Record at 1920x1080. Ratatosk's multi-window UI needs room. Close or minimize windows you're not actively showing. |

---

## DEMO DATA CHECKLIST

- [ ] Demo database accessible via ODBC (connection string tested)
- [ ] Database has 10+ tables with recognizable names (orders, customers, products, etc.)
- [ ] At least one column is >50% null (data quality finding)
- [ ] At least two tables across sources share a column name with different meaning
- [ ] Shadow system Excel workbook pre-converted (JSON output ready to load)
- [ ] Workbook has a real-sounding name (not "test" or "demo")
- [ ] SAP or Epicor dictionary file available (load during demo, not pre-loaded)
- [ ] Output directory exists and is empty
- [ ] Ratatosk is freshly opened (no previous manifest loaded)
- [ ] Screen recording at 1920x1080, no other windows visible

---

## TIMING REFERENCE

| Scene | Section | Duration |
|-------|---------|----------|
| 1 | Before the Workshop (shadow converter) | 1:30 |
| 2 | Connecting Your Systems | 1:30 |
| 3 | What We Do Together (classification, labeling, conflicts) | 3:00 |
| 4 | What the Tool Finds (quality, lineage, stewardship) | 2:00 |
| 5 | What You Receive (all 8 deliverables) | 3:00 |
| 6 | What Happens Next (close) | 1:00 |
| **Total** | | **~12:00** |
