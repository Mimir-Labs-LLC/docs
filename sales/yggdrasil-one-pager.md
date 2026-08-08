# Yggdrasil ERP

### Manufacturing software that tells the truth about your operation.

*Built for the people who run the plant. Useful to the boardroom because of it.*

*Current as of July 2026 · Platform v0.8.x*

---

Yggdrasil is a complete manufacturing ERP — CRM, sales, purchasing, manufacturing, warehouse, finance, projects, PLM, quality, service — built around something everyone on the floor knows but no software vendor wants to admit. The system you use today asks the operation to fit *its* rules. We built ours the other way around.

## What's different about Yggdrasil

**Work orders look the way work actually happens.** When a job is held for engineering review because dimension 3.4 is out of tolerance, the operator can say so. The system doesn't make them pick *in process* because that's the closest state on the dropdown. When a kit shows up half-complete and the line manager wants to start what arrived, the system can model a split. When an NCR opens at 2 a.m., it's a real record, not a sticky note that someone has to walk to QA in the morning. The spreadsheets, SharePoint trackers, and shadow databases that grew up around your current ERP shrink and then go away, because Yggdrasil represents the situations they were invented to compensate for.

**You watch the operation move, not last night's version of it.** Because every business object moves through explicit, validated states — *released, kitted, staged, in setup, held for engineering review, in rework, complete* — the record and the process are the same thing. Work in process isn't a computed estimate; it's what's sitting in each state right now. Cycle time is measured from the transitions themselves, not sampled at month-end. A bottleneck shows up as dwell time accumulating while there's still time to act on it. The daily status meeting that exists to reconcile what the system says with what actually happened stops having a job to do.

**Your supply chain talks to itself, in real time.** Yggdrasil's B2B Event Hub is part of the platform, not a separately-licensed add-on, not an event mesh SKU, not a third-party iPaaS tax. When your supplier confirms a shipment, your purchasing team and your floor see it the same second — not after an overnight batch, not after a brittle EDI translation. When a customer changes an order, your planner knows now. Suppliers and customers who run on Yggdrasil join your event stream directly; the ones who don't get clean webhook output instead of a recurring integration subscription you'll renew forever.

**Built for the AI question your board is asking.** Most vendors are selling Copilot-style assistants bolted onto architectures that were never designed for software that acts. We took a different bet. In Yggdrasil, every change — from a person, a script, or an AI agent, through the desktop, the browser, an API, or an integration — passes through **ROPE (Runtime Operational Policy Enforcement)** before it commits. ROPE checks what the change means against the canonical model, who authorized it, what evidence supports it, whether the transition is legal, and whether it's legal against the record *as it stands at that instant* — not a snapshot from when some plan was made. Agents pointed at Yggdrasil can reason about real state and act inside real boundaries. They cannot invent inventory, hallucinate approvals, or rewrite history. You don't have to trust the agent. You have to trust the gate it has to pass through — and that gate treats a hurried administrator and a hallucinating model exactly alike.

**Compliance procedures run, instead of sitting in a PDF.** AS9100, ITAR, FDA 21 CFR Part 11, SOX, and GDPR procedures your compliance team writes become signed policies your runtime enforces. The CFO authorizes "POs over $250K require two signers from Finance and one from Engineering" in plain language with a citation and a date attached. Six months later the auditor asks who approved a $300K PO and on what authority. You answer in three clicks — the rule, its version, the evidence, and the state it was approved against. The audit trail is append-only at the database level, and there is no delete in any business module: errors are corrected the way a ledger corrects, by void, reversal, supersession, or obsolescence, each one itself a recorded decision. Your past is never quietly edited into a more convenient shape.

**No custom fields. The system doesn't decay.** We don't allow custom fields and we don't fork the data model per tenant. That sounds restrictive at first. Eight years in, when the consultants who customized your last ERP have moved on and nobody can tell you why work orders at one plant post differently than at another, you'll understand the trade. The platform you deploy today is the platform you have five years from now: cleaner upgrades, cleaner integrations, cleaner audits, no slow-motion technical-debt avalanche.

## What stays the same

You still close the month. You still run AR and AP, produce the GL and the statements the auditor expects. The difference is that those numbers are derived from what the floor actually did, in real time, instead of reconstructed at month-end from spreadsheets and tribal memory. The CFO's books come out cleaner because the inputs are honest. Nothing in your finance function has to change for that to be true.

## The argument in one paragraph

Most ERPs were built for the bookkeeper. The operator has to lie to the form to keep work moving, and somebody reconciles the lie at month-end. Cost variances grow. Inventory drifts. Shadow systems multiply. We built ours for the operator. Same books, fewer surprises, less work to close, less work to explain when the auditor calls.

## Two questions to ask us — and everyone else

We published the criteria we think decide this category, as a thirty-condition framework covering eleven enterprise platforms, including the incumbents' genuine strengths and our own weakest scores. Two questions out of it are worth asking any vendor you're evaluating:

1. **Can it refuse what shouldn't happen — no matter who or what asks?** Not "will it flag it," not "does it log it." Can an administrator, a data import, or a connected system create a record your rules forbid?
2. **Can it show you what's happening while it's still happening?** Not a report about yesterday. The state of the work, now.

Ask us those. Ask the other three vendors on your list. The framework and the full comparison are yours on request.

## What's included

Every subscription ships with all ten business modules, unlimited users, the real-time B2B Event Hub, ROPE policy enforcement, append-only audit at the database, the canonical state engine, multi-tenant supply-chain join, and the Standard SLA. No module add-ons. No per-seat fees. No premium tiers that gate the things you already need.

Pricing scales with the operating footprint we govern — governed transaction volume, legal entities, sites, integrated systems, and audit retention depth, adjusted for the rigor of the compliance regime we're governing under. Not with how many people log in. Higher SLA tiers, activation, and optional **Audit Authority** — a contractual designation of Yggdrasil as the warranted system of record for a named compliance regime, with capped remediation exposure we accept — are priced separately and transparently.

## How we deploy

We deploy our own product. No implementation army, no system-integrator middlemen, no partner channel passing accountability around the room. We are answerable to you, directly, for the system we deliver. Activation is typically 8–16 weeks for a single-site deployment; longer for migration-heavy or multi-site projects. We tell you which is yours before you sign.

## Who this is for

Discrete and process manufacturers in the $25M–$500M range, single-site or multi-site, especially shops carrying AS9100, ISO 9001, ISO 13485, ITAR, FDA 21 CFR Part 11, or SOX exposure. If you've been told by your current ERP that what your floor actually does is an "edge case" — we want to talk to you.

## The honest first conversation

About thirty minutes. We listen to how your operation actually runs, walk through how Yggdrasil represents the specific parts you describe, and tell you whether your environment is a fit. We say yes and no with equal candor. If a fit looks credible we'll talk through the 120-day pilot track that lets you test the system against real workflows before signing an annual license — and we'll tell you plainly where we are as a company, how many operations are running on Yggdrasil today, and what that means for you.

**→ mimirlabs.net/yggdrasil**

---

*Yggdrasil is built and delivered by Mimir Labs. Direct deployment, no partner channel. Pricing and the formula behind it are public at mimirlabs.net/pricing.*
