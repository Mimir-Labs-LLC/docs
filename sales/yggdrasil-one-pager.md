# Yggdrasil ERP

### Manufacturing software that tells the truth about your operation.

*Built for the people who run the plant. Useful to the boardroom because of it.*

---

Yggdrasil is a complete manufacturing ERP — CRM, sales, purchasing, manufacturing, warehouse, finance, projects, PLM, quality, service — built around something everyone on the floor knows but no software vendor wants to admit. The system you use today asks the operation to fit *its* rules. We built ours the other way around.

## What's different about Yggdrasil

**Work orders look the way work actually happens.** When a job is held for engineering review because dimension 3.4 is out of tolerance, the operator can say so. The system doesn't make them pick *in process* because that's the closest state on the dropdown. When a kit shows up half-complete and the line manager wants to start what arrived, the system can model a split. When an NCR opens at 2 a.m., it's a real record, not a sticky note that someone has to walk to QA in the morning. The spreadsheets, SharePoint trackers, and shadow databases that grew up around your current ERP shrink and then go away, because Yggdrasil represents the situations they were invented to compensate for.

**Your supply chain talks to itself, in real time.** Yggdrasil's B2B Event Hub is part of the platform, not a separately-licensed add-on, not an event mesh SKU, not a third-party iPaaS tax. When your supplier confirms a shipment, your purchasing team and your floor see it the same second — not after an overnight batch, not after a brittle EDI translation. When a customer changes an order, your planner knows now. Suppliers and customers who run on Yggdrasil join your event stream directly; the ones who don't get clean webhook output instead of a recurring integration subscription you'll renew forever.

**Built for the AI question your board is asking.** Most vendors are selling Copilot-style assistants bolted onto architectures that were never designed for agentic AI. We took a different bet. Yggdrasil was built from day one for AI agents to operate *against*: every value carries its origin and authority chain, every policy is signed by the human who owns it and enforced at the moment of action, every consequential change is observable in real time, every record is tamper-evident at the database level. AI agents pointed at Yggdrasil can reason about real state and act inside real boundaries. They cannot invent inventory, hallucinate approvals, or rewrite history. That's what AI-readiness actually requires — the AI strategy your board is looking for is the one whose substrate doesn't lie.

**Compliance procedures run, instead of sitting in a PDF.** AS9100, ITAR, FDA 21 CFR Part 11, SOX, and GDPR procedures your compliance team writes become signed *Decisions* your runtime enforces. The CFO authorizes "POs over $250K require two signers from Finance and one from Engineering" in plain language with a citation and a date attached. Six months later the auditor asks who approved a $300K PO and on what authority. You answer in three clicks. The audit trail is append-only at the database level — an attacker who compromises your application cannot rewrite history through it.

**No custom fields. The system doesn't decay.** We don't allow custom fields and we don't fork the data model per tenant. That sounds restrictive at first. Eight years in, when the consultants who customized your last ERP have moved on and nobody can tell you why work orders at one plant post differently than at another, you'll understand the trade. The platform you deploy today is the platform you have five years from now: cleaner upgrades, cleaner integrations, cleaner audits, no slow-motion technical-debt avalanche.

## What stays the same

You still close the month. You still run AR and AP, produce the GL and the statements the auditor expects. The difference is that those numbers are derived from what the floor actually did, in real time, instead of reconstructed at month-end from spreadsheets and tribal memory. The CFO's books come out cleaner because the inputs are honest. Nothing in your finance function has to change for that to be true.

## The argument in one paragraph

Most ERPs were built for the bookkeeper. The operator has to lie to the form to keep work moving, and somebody reconciles the lie at month-end. Cost variances grow. Inventory drifts. Shadow systems multiply. We built ours for the operator. Same books, fewer surprises, less work to close, less work to explain when the auditor calls.

## What's included

Every deployment ships with all ten business modules, unlimited users, the real-time B2B Event Hub, signed Operational Policy Enforcement, append-only audit at the database, the canonical state engine, multi-tenant supply-chain join, and the standard SLA. No module add-ons. No per-seat fees. No premium tiers that gate the things you already need. Pricing scales with the operating footprint we govern — sites, integrations, throughput, audit retention. Not with how many people log in.

## How we deploy

We deploy our own product. No implementation army, no system-integrator middlemen, no partner channel passing accountability around the room. We are answerable to you, directly, for the system we deliver. Activation is typically 8–16 weeks for a single-site deployment; longer for migration-heavy or multi-site projects. We tell you which is yours before you sign.

## Who this is for

Discrete and process manufacturers in the $25M–$500M range, single-site or multi-site, especially shops carrying AS9100, ISO 9001, ISO 13485, ITAR, FDA 21 CFR Part 11, or SOX exposure. If you've been told by your current ERP that what your floor actually does is an "edge case" — we want to talk to you.

## The honest first conversation

About thirty minutes. We listen to how your operation actually runs, walk through how Yggdrasil represents the specific parts you describe, and tell you whether your environment is a fit. We say yes and no with equal candor. If a fit looks credible we'll talk through a 120-day pilot track that lets you test the system against real workflows before signing an annual license.

**→ mimirlabs.net/yggdrasil**

---

*Yggdrasil is built and delivered by Mimir Labs. Direct deployment, no partner channel. Pricing and the formula behind it are public at mimirlabs.net/pricing.*
