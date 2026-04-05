# Ragnarok — Service Demo Script

**Target length:** 3-4 minutes
**Format:** Screen recording of client-facing outputs + voiceover (Doc narrating)
**Focus:** The migration experience from the client's perspective — what they see, approve, and receive

---

## SCRIPT

### Opening (15 sec)

[Show Ragnarok logo]

Ragnarok is migration orchestration for ERP replacement. When you're ready to move off a legacy system, Ragnarok ensures every record is semantically mapped, structurally validated, and accounted for — before any data moves.

Here's what the migration experience looks like from your side.

### Step 1: Source Discovery (45 sec)

[Show a source schema overview — tables, domains, classification]

First, we connect to your legacy system — Epicor, SAP, Sage, Oracle, Dynamics, any of 11 supported platforms — and build a complete structural map.

Every table, every column, every relationship is cataloged. If you've already done a Ratatosk workshop, we import that taxonomy manifest directly. If not, Ragnarok runs its own classification pass.

The output is a source map: here are your 300 tables, here's how they break into business domains, here's what we found. You review this before anything else happens.

### Step 2: Semantic Mapping (60 sec)

[Show a mapping view — source column → target column with confidence scores]

This is where Ragnarok differs from a consultant with a spreadsheet. Every source column is mapped to its target with a confidence score.

High confidence means the match is unambiguous — the name, type, and business context all align. Low confidence means human review is needed. Ragnarok proposes and scores. Your team approves.

[Show a conflict example]

When "Status" means different things in different modules, Ragnarok surfaces that conflict explicitly. You decide how to resolve it — before migration, not during.

[Show gap analysis]

The gap analysis shows what's unmapped. Not because it can't be mapped — because a decision needs to be made. Migrate it, transform it, archive it, or explicitly reject it. Every column is accounted for.

### Step 3: Migration Plan (45 sec)

[Show a phased migration plan]

Before any data moves, Ragnarok produces a phased migration plan. The phases are topologically sorted by foreign key dependencies — parent tables migrate before child tables, reference data before transactional data.

Each phase has a validation checkpoint. If referential integrity fails, the migration stops at that phase. Not two weeks after go-live.

[Show coverage summary]

100% coverage guarantee. Every source table is classified as migrate, transform, archive, or reject. No "we'll deal with it later."

### Step 4: Execution and Validation (30 sec)

[Show post-migration validation output]

After each phase executes, Ragnarok runs structural validation: referential integrity checks, orphan detection, hierarchy verification, and a post-ingestion validation report.

You see exactly what migrated, what was transformed, and what needs attention — before proceeding to the next phase.

### Closing (15 sec)

Ragnarok doesn't automate judgment. It accelerates it. Every mapping is reviewable. Every decision is documented. Every phase validates before advancing.

Visit mimirlabs.net/ragnarok or start with a Ratatosk governance workshop to assess your data landscape first.

---

## PRODUCTION NOTES

- **Do NOT show the Ragnarok operator console** — it's internal tooling. Show only client-facing deliverables: mapping reports, coverage summaries, migration plans, validation output.
- **If real output screenshots aren't available,** use annotated mockups that faithfully represent the actual output format (JSON mapping views, coverage percentages, phase diagrams).
- **Emphasize the human-in-the-loop:** Every mapping requires approval. This is not "press a button and hope."
- **Closing frame:** Ragnarok logo, mimirlabs.net/ragnarok
