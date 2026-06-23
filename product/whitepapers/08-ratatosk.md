---
title: "Ratatosk — Discovering What Your Data Actually Means"
author: "Christopher Gaither"
date: "April 2026"
version: "1.2"
docnumber: "ML-WP-009"
classification: "Public"
logo: "mimir_labs_logo.png"
---

## Why This Matters

Most enterprise software initiatives fail for the same reason. It is not because the new system was wrong. It is because the organization could not articulate what its old data actually meant.

The first migration meeting is always optimistic. By the third meeting, someone is asking what "customer" means in the legacy system. By the fifth, two departments are arguing about it. By the time someone realizes the answer changes depending on which warehouse the order was fulfilled from, the project is months in and the budget has already moved.

Every ERP migration, every system consolidation, every data warehouse build, every AI-on-our-own-data pilot eventually hits the same wall: the organization does not have a structured, agreed-upon description of its own enterprise meaning. The knowledge exists, but it lives in spreadsheets, in macros, in the heads of three controllers and two solution architects, and in tribal lore that has never been written down.

Ratatosk exists to extract that knowledge into a structured form before the project depends on it.

---

## What Ratatosk Does

Ratatosk is a desktop application that connects to your existing enterprise systems — ERPs, warehouse systems, CRMs, manufacturing systems, the Access database that runs your shipping department, the Excel workbook that runs your invoicing — and produces a single artifact that describes what all of it actually means.

The artifact is called the Ratatosk Manifest. It is a machine-readable document that captures every source system, every table, every column, every relationship, every recognized business pattern, and every named owner — all classified against a shared canonical vocabulary.

Once that manifest exists, the rest becomes possible. Migrations can be planned against it. Integrations can be configured against it. Governance policies can be evaluated against it. AI agents have a stable surface to operate on.

The manifest is the deliverable. Everything else Ratatosk produces — executive summaries, action plans, governance reports, lineage diagrams — is derived from it.

---

## How It Works

Ratatosk is deployed through a structured discovery engagement. Either internal data stewards or a consulting partner runs it; the workflow is the same.

**Connect.** Ratatosk reads from your existing systems through standard ODBC connections. It does not move row-level data off your premises. Profiling happens entirely against aggregate SQL functions — counts, averages, distincts, lengths — never against actual values.

**Classify.** A deterministic engine reviews every table and column, suggests a canonical classification, and presents the suggestion to a human operator with a confidence score. The operator confirms, overrides, or refines. Suggestions are never persisted as fact without explicit human disposition.

**Extract embedded logic.** Where business rules live in Office automation — VBA macros in Excel workbooks, query trees in Access databases — Ratatosk decompresses the modules and recognizes patterns: lookups, validations, postings, transformations. The recognized logic enters the manifest alongside formal database structures, so migration and governance can account for it instead of discovering it after cutover.

**Catalog and assign.** Tables and taxonomy groups get named owners. The "stewardship matrix" is a deliverable in its own right — many organizations discover, during this step, that there is no agreed owner for half the data their business runs on.

**Generate artifacts.** When the discovery is complete, Ratatosk produces a layered set of deliverables aimed at different audiences: an executive summary for the steering committee, an action plan for the project office, a governance report for IT, a lineage map and ecosystem diagram for workshops, and the canonical manifest itself for the downstream tools.

---

## Human-Authoritative by Design

Ratatosk's classification engine is deterministic, not a black-box AI. The auto-label algorithm uses string distance, synonym dictionaries that span hundreds of groups across all seventeen canonical domains, and type compatibility scoring. Suggestions are prefixed `SUGGESTED:` and capped at 0.80 confidence so the operator is always the authority on what gets accepted.

A governance chatbot lets operators drive the engine conversationally — ask it to classify a table, draft annotations, or merge synonym candidates — but every chatbot suggestion arrives as a typed proposal that must be explicitly accepted, rejected, or modified before any change is persisted. Nothing slips into the manifest because an AI was confident.

This posture matters because the manifest is going to be used as evidence later. It will drive a migration plan. It will define a governance baseline. It will shape an integration. The organization needs to be able to point at every classification and say *we agreed to this*. Ratatosk's structure makes that statement defensible.

---

## What's In the Manifest

The Ratatosk Manifest captures, for every connected source system:

- **Source descriptors** — what kind of system this is (system of record, shadow system, legacy, reference) and what its profiling capabilities are
- **Table-level annotations** — business labels, taxonomy assignments, semantic notes, ontology concepts, review status, and full audit history of who reviewed what and when
- **Column-level annotations** — per-column business labels, semantic notes, and provenance origin
- **Mapping hints** — for every column that maps to a canonical target, the proposed target table, target column, any WHERE-clause filters, and a confidence score
- **Stewardship assignments** — named owners for taxonomy groups and individual tables
- **Quality and policy rule configurations** — the governance thresholds the organization has chosen to evaluate against
- **Reproducibility metadata** — the algorithm version, dictionary versions, and confidence caps that produced every auto-suggestion, so the analysis can be re-run and produce the same result
- **Aggregate profiling baselines** — row counts, null rates, distinct counts, string length distributions, captured under zero-knowledge constraints
- **Embedded logic findings** — for Office sources, the structured representations of recognized macro patterns and the data flows they imply

The manifest is not a report. It is an operational artifact that downstream tools consume directly.

---

## What You Get Out of It

**For executives:** a four-page Executive Summary showing where you stand on data governance maturity (Foundational, Developing, or Structured), with color-coded indicators for definition consistency, ownership clarity, governance maturity, migration readiness, and schema completeness. It tells you, in business language, where the risk is and what investment closes it.

**For the project office:** a phased Action Plan in PDF and JSON form, organized into Critical, High Priority, Consolidation, and Migration-Prep buckets. Each item carries an effort estimate, an impact score, and a list of affected entities. The plan also includes an operational risk inventory that calls out scenarios — duplicate order propagation, financial reconciliation failures, lost ownership during a migration cutover — that governance gaps could produce.

**For IT and data architecture:** a Governance Summary covering field coverage, source classification, taxonomy distribution, structural collisions, schema quality, annotation depth, and migration readiness with confidence histograms.

**For workshop facilitation:** four SVG visualizations — coverage chart, taxonomy distribution, collision summary, and a data ecosystem map showing how data flows between organizational boundaries — designed for presentations and printed materials.

**For migration, integration, and governance tooling:** the canonical manifest, ready to consume.

---

## Where Ratatosk Fits

Ratatosk is the discovery layer of the Mimir Labs data architecture. It feeds the rest of the platform:

- **Ragnarok** consumes Ratatosk manifests to plan and execute deterministic migrations between systems
- **Bifrost** consumes them to configure live cross-system synchronization
- **Jormungandr** consumes them to enforce governance policies as an ongoing subscription
- **Yggdrasil ERP** is one possible target — but not the required one

Every Mimir Labs tool is system-agnostic. You can run Ratatosk on your existing SAP, NetSuite, Dynamics, or custom environment and never adopt anything else from us. The manifest you produce remains useful regardless. If you later choose to migrate, integrate, or govern with the rest of the suite, the work you did in Ratatosk carries forward.

---

## When to Engage Ratatosk

The natural moment is *before* a migration, integration, AI initiative, or compliance program — but most organizations come to it during one, after the discovery problem has already started costing money.

Common triggers include:

- An ERP migration in the planning phase, where the organization needs to know what it actually has before scoping the project
- A consolidation after an acquisition, where two operational systems need to be reconciled
- A data warehouse or analytics initiative that has stalled because no one can agree on what the source data means
- An AI or agent automation pilot that needs a reliable target schema to operate on
- A compliance audit that exposed gaps in data ownership or definition consistency
- A governance program that needs a baseline to enforce against

Ratatosk also serves a quieter purpose: the artifacts it produces — particularly the executive summary, the stewardship matrix, and the action plan — give technical leaders a credible way to present the state of their organization's data to people who do not normally engage with that question.

---

## Strategic Role

Most enterprises operate on approximations of their own state. The systems describing the business have never agreed on what the words mean, so every report, every integration, every migration spends most of its time translating between dialects. The ones who never confront this pay for it forever.

Ratatosk is how organizations confront it. It produces a structured, human-authoritative description of enterprise meaning that stops being tribal lore and starts being a documented foundation. From that foundation, migrations become tractable, integrations become stable, governance becomes enforceable, and AI becomes trustworthy.

The manifest is the artifact. The clarity is the value.

---

*Copyright 2026 Mimir Labs. All rights reserved.*
