# Ratatosk — Service Demo Script

**Target length:** 3-4 minutes
**Format:** Screen recording of deliverable artifacts + voiceover (Doc narrating)
**Focus:** Client-facing experience — what they receive, not the internal tooling

---

## SCRIPT

### Opening (15 sec)

[Show Ratatosk logo]

Ratatosk is a structured data governance workshop for manufacturers. In as little as one day, we map the meaning of your existing data landscape and deliver a governance baseline you can use to make informed decisions about migration, integration, or system consolidation.

Let me walk you through what a client receives.

### The Intake (30 sec)

[Show a simple visual: schema exports, ERD, data dictionary — can be a slide or annotated screenshot]

Before the workshop, we ask for read-only schema access — DDL exports, ERDs, or data dictionaries from your source systems. We don't touch production data. We don't need credentials to your live environment. We work from the structural metadata.

And it's not just the ERP. We ingest everything — the shadow systems too. The Access databases, the Excel workbooks with macros, the departmental tools that grew into critical infrastructure when nobody was looking. If it holds business data, it goes into the analysis. That's usually where the most important conflicts are hiding.

For a typical manufacturer on Epicor or SAP, the ERP export is a 15-minute job from your DBA. The shadow systems take longer to inventory, but they're often more revealing.

### The Analysis (45 sec)

[Show the Mimisbrunnr reference model — can be the schema diagram from docs]

Every table and column in your schema is classified against Mimisbrunnr — our universal semantic reference model. 170 tables across 17 business domains: CRM, Sales, Purchasing, Manufacturing, Warehouse, Finance, PLM, Quality, Service, and more. Alternatively, we can also target any one the top ERP/BI systems standard dictionaries.

The classification is deterministic. No AI inference, no fuzzy matching. Levenshtein distance for name similarity, foreign key graph analysis for relationship detection, column archetype heuristics for type classification. Same input produces the same output every time.

### Deliverable: Taxonomy Manifest (30 sec)

[Show a taxonomy manifest output — JSON or structured view]

The taxonomy manifest is the core deliverable. It's a machine-readable map of your data: every table classified by domain, every column labeled with its semantic role, confidence scores on every classification.

This isn't a slide deck. It's a JSON artifact that can be imported directly into our Ragnarok migration planning tool, or used by your team to evaluate any ERP vendor's data model against your current reality.

### Deliverable: Coverage Report (30 sec)

[Show a coverage report — percentages, domain breakdown]

The coverage report answers a simple question: of all the data in your source systems, what percentage can we structurally account for?

90% coverage means 10% of your data is unclassified — and that 10% is where migration surprises live. Most manufacturers discover they have 15-30% more data complexity than they thought.

### Deliverable: Conflict Summary (30 sec)

[Show conflict examples]

The conflict summary surfaces definition disagreements. "Customer" means three different things across three departments. "Status: Active" means available-for-sale in Sales but currently-in-production in Manufacturing.

These aren't data quality issues — they're definition issues. Resolving them before migration costs a fraction of discovering them after go-live.

### Deliverable: Executive Briefing (20 sec)

[Show a summary page — governance score, key findings]

The executive briefing is the non-technical summary: here's your governance score, here are the three things that will cause problems if you don't address them, and here's what we recommend.

### Closing (15 sec)

One day. $9,500 remote, $14,500 on-site. Machine-readable artifacts, not slide decks. And if you engage us for migration within 12 months, 50% of the workshop fee is credited back.

Visit mimirlabs.net/ratatosk to schedule your workshop.

---

## PRODUCTION NOTES

- **This video cannot show the Ratatosk operator tool** — it's internal. Show only deliverable artifacts.
- **If real deliverable screenshots aren't available yet,** use the structured placeholder visuals from the website product preview, or ask Doc for actual workshop output samples.
- **Tone:** Authoritative, not salesy. This is a service, not software — the video should feel like an expert explaining their methodology.
- **Closing frame:** Ratatosk logo, mimirlabs.net/ratatosk, $9,500 price visible
