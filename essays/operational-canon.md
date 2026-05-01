# The Operational Canon

*I built Mimir Labs because I believe enterprise software has the wrong purpose. Its job is to maintain the **operational canon** — the authoritative, adjudicated record of how the business is actually operating, against which every department, system, and decision can be checked. Every architectural and commercial choice that follows from that belief — and there are several — is downstream of it.*

*Foundational essay. Referenced by [Where ERP Actually Breaks](where-erp-actually-breaks.md), [No AI Will Fix Your Broken Data Layer](no-ai-will-fix-your-broken-data-layer.md), and [Glass Machines](glass-machines.md).*

---

## The wrong question

Most enterprise software is designed to answer the wrong question.

The question it answers: *did this transaction happen, did we record it, and what did we tell the auditor?*

The question it should answer: *what is actually happening right now, can we trust it, and when two people in this organization look at the same number, do they agree on what it means?*

These look similar. They are not. The first is about preserving a defensible record. The second is about producing operational truth. The first is a back-office function — it optimizes for completeness of capture, defensibility under audit, and orderly month-end close. The second is an operational function — it optimizes for currency, semantic clarity, and the trustworthiness of the data the business is acting on.

Almost every ERP on the market is designed for the first question. They were architected when month-end close was the calendar's most important event, when financial reporting was the canonical use of business data, and when "the system of record" meant "the place we keep the books in case someone asks." The architecture follows the purpose: batch processing, separate analytical layer, configurable per-customer customizations, audit logs that get added when someone remembers, integration through middleware that the vendor wants to charge for.

When you ask one of these systems the operational question — *what is actually happening right now in our supply chain?* — you get an answer that's three caches and one nightly ETL old, derived from data whose definitions vary by department, hosted alongside hundreds of customer-specific custom fields whose meanings only one person understood and that person left two years ago.

The system is not lying. It is doing exactly what it was built to do. The problem is that it was built to do the wrong thing.

---

## The right question

The right question — *what is actually happening right now, and can we trust it?* — demands a different answer pattern. The system has to maintain an *operational canon*: a single, adjudicated, authoritative record of operational state that every department and every system checks against rather than competes with. To do that, the system must have:

- **A single canonical model of what the business's nouns mean.** "Customer" means one thing. "Available inventory" means one thing. If two parts of the system mean different things by these terms, there is no truth — just competing local approximations.
- **Continuous, not periodic, observation.** If the operator typed it three minutes ago and the dashboard shows it twelve hours from now, the dashboard is not telling the truth about *now*. It is telling the truth about *then*.
- **Complete audit, not partial.** If half the modifications come through bulk operations that skip the audit log, the audit log is not a record of what happened. It is a record of *some* of what happened, sampled by mechanism, with the gaps invisible until they matter.
- **Governed state, not arbitrary mutation.** If a record's status can be changed by any code path that has database write privileges, the record's status is not the truth. It is whatever the most recent privileged caller said it was, with no guarantee that the change passed any business rule.
- **Shared semantics across organizational boundaries.** Truth is not a property of one system in isolation. If the supplier's record disagrees with the buyer's record about the same shipment, both records are wrong about the same shipment, and the disagreement is the truth that matters.

That is a different system. The architectural moves required to deliver it are not the same architectural moves that produce a defensible system of record.

This is why retrofitting the answer onto the wrong system fails. You can bolt on real-time analytics, but the operational data still flows through batch architecture beneath it. You can add audit logging, but the bulk operations still bypass it. You can publish webhooks, but the events don't carry the deltas that downstream consumers need. You can ship "AI insights," but the AI is reading the same fragmented, ambiguous, partially-audited data the dashboards are reading. The new layer inherits the old layer's truth posture, and the old layer's truth posture is *we have a record of what we said happened*.

---

## What follows architecturally

If you accept that maintaining the operational canon is the purpose, every architectural choice has a defensible answer rooted in that purpose. Yggdrasil's choices, traced back:

**Fixed module set, no plugin or custom-module extensibility.** Custom code creates truths only the customizer knows. A plugin's data model is true to the plugin's author. The audit log doesn't capture what the plugin meant. Six months later the plugin breaks during an upgrade, the customer hires a different consultant to fix it, and the meaning quietly drifts. Canon does not survive customer-side extensibility. We refuse it.

**Deterministic state engine governs every transition.** A record's status is what the state engine says it is, governed by rules the customer can read. Status cannot be changed except through a transition that passes its declared gates. If state can be quietly mutated, the state isn't true — it's just current.

**Audit-by-architecture, not audit-by-application.** The Repository layer is the only path that mutates business data, and the Repository writes a field-level delta to an append-only audit log on every mutation. There is no path that bypasses, because there is no other path. "What did this record look like six months ago" is a query, not a backup-restore exercise.

**One database. No module silos. No departmental copies.** Every business object — across every one of the ten modules, across every department in the customer's organization — lives in the same PostgreSQL database, in the same shared schema. There is no separate finance database, no separate manufacturing database, no per-module storage. The `crm_entities` row the sales team uses to track an opportunity is the same row the AR team queries when running a credit check. The `plm_parts` row engineering revises is the same row manufacturing builds against and quality inspects. Multi-tenancy is row-level, with PostgreSQL row-level security enforcing isolation — not separate schemas, not separate databases. There is no architectural opportunity for any department, module, or tenant to maintain its own private version of the canon, because there is no other table to write to. The canon exists in one place because, structurally, it can only exist in one place.

**Mimisbrunnr as canonical vocabulary.** A semantic model of more than three hundred tables across seventeen business domains — the same database described above — defining what every business noun means, shared across every product in the platform and across every tenant. There are no per-tenant data definitions because per-tenant definitions destroy cross-tenant canon. When the buyer's Yggdrasil tenant talks to the supplier's Yggdrasil tenant, they agree on the meaning of "purchase order line." That agreement is what makes coordination across the boundary possible without an intermediary translating in both directions.

**Jormungandr as canon enforcement.** The product is not metaphorically named. Jormungandr exists to validate that the canonical model holds — across versions, across tenants, against drift introduced by integration partners that don't share our discipline. Canon without enforcement is a wish. Jormungandr is the enforcement.

**B2B Event Hub as a continuous truth surface.** The same architecture that makes operational state observable to your own clients makes it observable to your B2B partners and your downstream analytical consumers. There is no nightly ETL because the operational data and the analytical data are the same data. There is no webhook-and-refetch dance because events carry the structured payload they describe. The system can answer "what is happening right now" without pulling from a separate store that's nine hours behind.

**Footprint Score pricing.** Per-seat pricing punishes the customer for letting more people read the canon. Per-module pricing fragments what the canon describes. We use neither. Customers pay based on the operational footprint they bring under the platform's governance — which is, directly, a measure of how much of the canon we are being asked to maintain.

**Audit Authority warranty pricing tier.** When a customer pays us to be the contractually warranted system of record for a compliance regime, we accept capped financial exposure for audit-finding remediation costs traceable to a Yggdrasil failure. This is the only honest version of charging for audit value: we charge for the value, and we own the failure when our system produces it. Most enterprise software vendors charge more for serving regulated customers without accepting any of the regulatory downside.

Each of these is a consequence of the ethos. They are not independent design preferences that happened to converge. They are the architectural moves that the purpose demands.

---

## What follows commercially

The pricing model has its own through-line.

A vendor whose primary purpose is record-of-business-as-told doesn't need pricing to align with what the customer is doing operationally. Per-seat works because the customer is paying for access to the system of record. Per-module works because the system of record can be partitioned into separately-licensed pieces. Hard implementations work because the partner channel is part of the value chain — when the product is configurable infrastructure, the configuration is the product.

A vendor whose primary purpose is maintaining the operational canon has to make different commercial choices. Per-seat punishes the inclusion that canon depends on (every operator who could read the canon and act on it, but doesn't, because their seat costs an organization $X per year). Per-module fragments the integrated picture that canon requires. Long, partner-led implementations introduce uncertainty about whose model of the canon the customer is actually deploying.

So: footprint-based pricing. No per-seat. No per-module. Activation done in-house, because we can't outsource the model-of-truth decision to a third party and still be answerable for it. Audit Authority warranties because if we are charging for the compliance system of record, we have to own the regulatory downside when we fail.

This isn't pricing as a separate strategic decision from architecture. It's pricing that follows from the same purpose the architecture follows.

---

## What this rejects

The prevailing industry thesis is something like: *enterprise software is a configurable platform that customers extend, integrators implement, and analysts validate. Its job is to be the system of record for the customer's business, structured around month-end close, supportable through a partner channel.*

Mimir Labs rejects most of this:

- **Configurability as a virtue:** rejected. Customer-side configurability creates truths only the configurer knows. Configuration belongs to data, not to code or schema.
- **Partner channel as primary delivery model:** rejected. The vendor that can't deploy its own product without a third party doesn't actually know what its product does. We deploy directly because we have to be answerable to the customer for the model of truth we're delivering.
- **Period-driven architecture:** rejected. The business operates continuously. The system that observes it should too.
- **Audit as a configurable feature:** rejected. Audit is the substrate. If you can turn it off, you have not built audit — you have built optional logging.
- **Per-seat pricing:** rejected. We do not charge customers for letting more of their own people see the truth.
- **Per-module pricing:** rejected. The platform is one integrated system. Selling its parts separately would misrepresent what we are delivering.

These rejections are coherent because they all serve the same purpose. None of them are independently chosen.

---

## The founding decision

I worked in manufacturing operations for fifteen years before I wrote a line of code for this company. The question I came back to, repeatedly, in environments running every major ERP vendor, was: *why are we — the operators — the last people to know what the system says about the operation we're running?*

The system was always slightly wrong, slightly stale, slightly disagreed-with by the next system over, and we were always the ones discovering the disagreement when it mattered. The "system of record" was always the system of record about something that had already happened, in a frame the auditors approved of, in a format that made the dashboards readable on Tuesday morning. The conclusions were defensible. The current state was approximate. The two were not the same thing, and the system did not seem to know that.

That isn't an ERP problem. That's an enterprise-software problem. The whole category was built to solve a different question than the one operators actually need answered.

So: Mimir Labs exists to build software that maintains the operational canon. *What is actually happening right now? Can the organization act on it?* The architecture we ship, the products we put in front of customers, the pricing we charge, the warranties we accept — they are all attempts to be honest about that purpose, and to refuse the choices that would erode it.

Yggdrasil ERP is the operational core of that effort. Mimisbrunnr is the canonical vocabulary that lets it speak across systems. Jormungandr enforces the canon as the canonical model evolves. Ratatosk surfaces the canon hidden in your existing data before you migrate. Ragnarok carries that canon into the new substrate. Bifrost keeps the canon aligned across systems that can't be replaced. Norn extends the same canon into the contract layer.

Every one of those products is a different facet of the same purpose. The platform is not a collection of products. The product is *the operational canon*. The platform is what we built because that is what maintaining the canon requires.

---

If you only take one thing away from anything we publish, take this: enterprise software has been built to do the wrong job for thirty years. We are building it to do the right one. The modules, the pricing model, the contracts, the warranty exposure, the way we deploy — everything else — is downstream of that single decision.

---

*April 2026. Foundational essay. **Operational canon** is the canonical phrase Mimir Labs uses to describe what enterprise software is for: the authoritative, adjudicated record of operational state, against which every department and every system can be checked. The phrase is deliberately distinct from "source of truth" / "system of record" — those describe a place data is kept; canon describes a thing that is maintained, defended, and held to. Subsequent essays in the series ([Where ERP Actually Breaks](where-erp-actually-breaks.md), [No AI Will Fix Your Broken Data Layer](no-ai-will-fix-your-broken-data-layer.md), [Glass Machines](glass-machines.md)) point back here for the why.*
