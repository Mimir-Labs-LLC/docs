# Where ERP Actually Breaks

*The headline failures of enterprise software are not random. They are the predictable outputs of architectural and commercial choices that the incumbents' business models are structurally aligned with — and that the vendors have little commercial reason to remove. An honest replacement has to make different choices — and live with the trades that follow.*

*Companion to [No AI Will Fix Your Broken Data Layer](no-ai-will-fix-your-broken-data-layer.md) and [Glass Machines](glass-machines.md). The exhaustive failure-mode catalog that this essay draws from lives at [why-erp-is-broken](../research/why-erp-is-broken.md).*

---

## The pattern, not the anecdote

Lidl wrote off €500 million on a SAP implementation in 2018 after seven years of effort.[^1] National Grid took a $945 million charge after its 2012 SAP cutover broke billing for months.[^2] Revlon's 2018 Microsoft Dynamics go-live disrupted shipments badly enough to trigger a class-action shareholder suit.[^3] Hershey's 1999 SAP go-live arrived in time for Halloween and missed it, costing roughly $150 million in lost sales.[^4] MillerCoors and Oracle sued each other for $100 million each in 2014 over a stalled implementation.[^5] Panorama Consulting's annual ERP report has, for years, found that more than half of ERP implementations miss their budget and a third miss their timeline by more than 20%.[^6]

The standard read of these stories is that ERP is hard, partners are uneven, and large companies make large mistakes. That read is true, but it is not useful. It treats the carnage as random, when it is not. The same five failure modes show up across vendors, across decades, and across customer sizes. They are not bugs. They are the consequences of design choices that the incumbent business models are structurally aligned with — and that the vendors have, at best, weak commercial incentive to fix.

This essay takes those five failure modes one at a time, explains why the architecture invites each one, and asks what an alternative would have to do differently. Yggdrasil ERP is the alternative I have built. I will be specific about where its architecture addresses each failure mode, partial about where it only mitigates, and honest about where it does not yet close the gap at all.

---

## Failure mode one: customization debt

The mainstream ERP architecture is built around extensibility. SAP has ABAP enhancements and side-by-side BTP extensions. Microsoft Dynamics has X++ extensions and Power Platform overlays. NetSuite has SuiteScript. Odoo has its module system. Acumatica has graph extensions. Every one of these vendors ships a base product that the customer is *expected* to modify, and every one of them sells the modification path as a virtue.

The economics of this design are clean for everyone except the customer. The vendor ships a product that fits no business in particular, which protects the vendor from having to take a position on what the business should look like. The implementation partner sells the modification work, which is where most of the deal value lives. The customer signs because the product can, in principle, be made to do anything they need.

The debt arrives quietly, on a delay. Custom fields land in side tables or JSONB blobs and never appear in standard reports. Workflow rules get configured by a consultant, then the consultant leaves. Module-level extensions get written against an SDK whose stability ends at the next major version. None of this looks like debt at the time. It looks like the system being responsive to the business.

Five years later the upgrade arrives. The customizations don't carry over. The vendor's response is that the customer should have used configuration, not customization, and the line between the two is drawn by the vendor's marketing team. The customer is left with the choice of paying to redo the customizations on the new platform, or sitting on the old version while the rest of the customer base moves forward. The "transformation projects" the industry sells every seven to ten years are, in practice, the previous implementation plus accumulated patched compromises plus the new vendor's compromises. Each one is more expensive than the last.

The architectural choice that produces this is the decision to make the system extensible at the code and schema level. Once that decision is made, customization debt is structural, not preventable.

**What Yggdrasil does about it.** Yggdrasil ships ten fixed business modules and no plugin or custom-module surface. There is no extensibility point at the code level. There is no JSONB user-fields blob. The modules are versioned together; the schema migrates together; the upgrade path is the same upgrade path for every customer.

Configurability lives in two places, and only two. The first is data — every business object has the fields it has, and customers configure values, not structures. The second is the constraint engine: a declarative state-transition layer ([described in the platform overview](https://mimirlabs.net/publications/platform-overview)) that lets workflow gates be expressed as data rather than code. Twelve named pattern types — required-field checks, threshold gates, role gates, temporal ordering, dependency completion, document presence, value matches, mutual exclusion, time windows, immutability, status cascade, custom — cover the workflow shapes that, in mainstream ERPs, are usually implemented as code customizations. Customers configure constraints. They do not write code.

The trade is real and worth naming. A customer whose business genuinely requires a behavior that none of the ten modules expresses has no escape valve. In SAP they would build it; in Yggdrasil they would have to either change how the business operates, wait for the module to evolve, or pick a different system. The product position takes that trade as the point: the failure mode is structural, and the only way to remove it is to remove the choice that produces it. Customers who need code-level extensibility are not the customers Yggdrasil is built for.

---

## Failure mode two: the implementation industrial complex

The single most consistent feature of large ERP deployments is that the implementation partner gets paid more than the vendor. The annual SaaS bill for an enterprise NetSuite or SAP S/4HANA Cloud deployment runs in the hundreds of thousands to low millions. The system integrator's bill on the same project runs $2–10 million for the initial cutover, plus ongoing managed-services fees that often exceed the license cost in steady state.[^7]

This is not a bug in the procurement model. It is the model. The vendor sells the seat licenses; the partner sells the work. The vendor's channel program depends on partners making margin, which depends on implementations being hard enough to require partners. A vendor whose product was easy to deploy would collapse the partner economy and lose the deals where the partner is the trusted advisor. Whether by design or by drift, the product remains complex enough to require an integrator, and the integrator is rewarded for closing implementations rather than for delivering operationally fit systems.

The customer experiences this as a long timeline, a partner-dependent skillset they cannot bring in-house, and a go-live that is judged on whether the cutover happened rather than on whether the business runs better afterward. Six months after go-live, the partner is gone, the customizations are undocumented, and the operational issues that emerge are billed as new engagements.

The architectural and commercial choice that produces this is the decision to ship a product that requires an integrator to make useful. Once that decision is made, implementation cost dominates total cost of ownership, and the customer's relationship with the system is mediated by a third party whose interests are not aligned.

**What Yggdrasil does about it.** Yggdrasil is designed to be deployed without a system integrator. The production stack is a single C++ server binary, a single PostgreSQL database, and a Docker Compose file. Configuration lives in one INI-style config file. The schema is shipped as a single SQL file. There is no implementation framework, no consulting kit, no certified-partner program.

The two parts of an ERP deployment that the mainstream genuinely cannot productize — getting clean data from the legacy system and connecting the new system to the rest of the customer's stack — are productized as separate first-party tools. Ragnarok handles migration. Bifrost handles integration. Both ship with the platform. Both are operated by the customer or by Mimir Labs directly, not by a partner channel. (More on each below.)

The honest gap is the partner safety net. The mainstream's partner ecosystem is a real asset for customers in distress. When a deployment goes sideways at SAP, there are tens of thousands of consultants who can be hired to recover it. Yggdrasil does not have that, and will not have it for years. A customer who hits a wall on a Yggdrasil deployment is dependent on Mimir Labs to recover. That is a smaller surface to fail through, but it is also a single point of failure. Customers who consider partner ecosystem availability as a procurement criterion will weigh that against the elimination of the partner cost. For most mid-market manufacturers it is a favorable trade. For an F500 with a regulatory load and an M&A roadmap it may not be.

---

## Failure mode three: the migration disaster

More ERP go-lives die at data migration than at any other phase. The pattern is consistent. The vendor accepts a CSV import of customers, products, and orders. They will not accept a relational dump that preserves the joins. The customer's historical data lands as flat tables that cannot be correlated. The mapping logic between the legacy schema and the new one lives in a consultant's spreadsheet. The migration team leaves the day after go-live. The data quality issues they could not resolve become "training opportunities" for the new system's users.

The deeper issue is that migration is treated as a one-time event with a deliverable, rather than as an ongoing capability. Once the cutover happens, the legacy system stays in read-only mode "for reference," and three years later it is still running because nobody knows how to decommission it safely. The "single source of truth" the new system was sold as turns out to be one source among several, and the reconciliation problem the customer was trying to solve has been replaced with a slightly different reconciliation problem.

The architectural choice that produces this is the decision to treat migration as outside the product. The vendor ships an import API; everything beyond that is partner work or customer work. There is no shared semantic layer between the two systems, and no tool that understands both ends.

**What Yggdrasil does about it.** Migration is a first-party product. [Ragnarok](https://mimirlabs.net/publications/ragnarok) is a standalone Qt 6 desktop application that handles source-system introspection, taxonomy mapping, type compatibility, mapping engine, gap analysis, ingestion, post-ingestion validation, and plan persistence. It is target-agnostic — Yggdrasil is one of its supported targets, but it works against any PostgreSQL or ODBC destination. It is target-preserving — the destination schema is never modified by Ragnarok, only the source can be rejected.

The semantic substrate is Mimisbrunnr, a 166-table universal reference model that originated in the Yggdrasil schema but is system-agnostic. Mimisbrunnr functions as a Rosetta Stone: source schemas map to it, target schemas map from it, and the mapping engine reasons in shared vocabulary rather than in pairwise translations. A customer migrating from NetSuite to Yggdrasil benefits from the same vocabulary as a customer migrating from Dynamics to Acumatica, because the intermediate model is what the engines reason against.

The trade-offs here are smaller than for customization debt. Ragnarok is a real product, used in real deployments, and its existence is a structural answer to the migration disaster pattern. The honest qualifier is that no migration tool eliminates the human work of deciding what data is worth preserving, how to handle records that don't translate cleanly, and how to reconcile the legacy system's accumulated lies. Ragnarok makes that work tractable. It does not make it disappear.

---

## Failure mode four: integration brittleness

"We have an API" is not the same as "you can integrate it." The API surfaces of mainstream ERPs vary by vendor age. Older systems — Sage, Infor M3, Epicor 9, legacy Dynamics — are still substantially structured around the vendor's UI screens, with endpoints like `/api/v1/account-screen` returning the same payload the account-detail page renders. Newer surfaces (SAP S/4 OData, NetSuite SuiteTalk REST, Acumatica's REST API) are more domain-oriented, but still inherit much of the same operational drag: aggressive pagination, partial responses, inconsistent field naming across modules, and missing streaming endpoints for the bulk operations integration actually needs. Pulling a million orders takes eighteen hours of paginated calls. There is no `COPY TO STDOUT` equivalent in any major vendor's API, because that would undermine the per-record-priced "data API" SKU.

Webhooks fire reliably but don't carry diffs. The webhook says "order updated." It doesn't say what changed. The subscriber refetches the whole order, then refetches related records, then runs a diff. This is called "event-driven."

The result is the iPaaS economy. Mulesoft, Boomi, Workato, Tray, Zapier — these companies exist because the underlying systems can't talk to each other directly. The customer pays for that shortcoming as a recurring cost forever. Master data conflicts between the ERP and the CRM and the ecommerce system each have a third vendor's reconciliation tool between them. The actual source of truth is whichever reconciliation tool the customer trusts most, which is rarely the ERP.

The architectural choice that produces this is the decision to expose APIs that mirror the UI rather than the domain, and to ship an event surface that signals occurrence without conveying delta. Once that decision is made, integration is structurally an external project.

**What Yggdrasil does about it.** Yggdrasil exposes one HTTP surface for both UI clients and third-party integrators — there is no public/private API split — and pairs it with a [WebSocket B2B event hub](https://mimirlabs.net/publications/b2b-event-hub) that carries persisted, replayable events. The hub supports three publish modes: local broadcast, per-tenant delivery, and federated publish through an optional Redis or Redpanda relay for cross-node deployments. Events are persisted at publish time, retried on a timer if delivery fails, and queryable as a stream. Cross-tenant publication and federation are first-class operations.

Integration with external systems is productized as [Bifrost](https://mimirlabs.net/publications/bifrost), a desktop integration engine that ships with thirteen playbooks for SAP, Salesforce, NetSuite, Dynamics 365 Business Central, and other major systems. Bifrost handles change-data-capture listeners, routing tables, conflict resolution, dead-letter queueing, and per-route circuit breakers. It runs as a tenant-side process, not as a vendor-hosted middleware product. The customer owns the integration, the routing rules, and the failure handling, instead of paying an iPaaS vendor for a recurring share of those concerns.

The honest qualifier is that integration is the failure mode hardest to solve from one side of the wire. Yggdrasil controls how Yggdrasil emits events and exposes data; it does not control how the customer's other systems do, and most of them do badly. Bifrost is good at making Yggdrasil-side integration concerns tractable. It cannot fix the partner system's webhook design or its rate limits. The structural improvement is real, but the customer's overall integration cost is still bounded below by whatever the *worst* system in the stack does.

---

## Failure mode five: recording, not running

The deepest architectural failure in mainstream ERP is the one that sounds the least technical. Most of the platforms still in active deployment were designed when month-end close was the most important event in the calendar, and the data-model orientation persists. Modern entrants (SAP S/4HANA, Oracle Cloud ERP, Workday) have added real-time analytics in places, but the operational-vs-analytical split typically remains: operational data lives in the ERP, analytical data lives in BI, and the gap is closed by an ETL job that runs nightly. Period closes are events the business treats as natural, when in fact they are scaffolding for a manual closing process that automation should have eliminated twenty years ago and largely didn't.

The CEO asks "how are we doing right now" and the answer is yesterday's data with a PowerPoint timestamp on it. The dashboard pipeline runs through three caches. The transaction landed at 9:00; the dashboard shows it at 9:47. The dashboard says "real time" in the header.

Workflow engines model the world as a state machine with one cursor — single-threaded approval chains marching through a linear sequence. Real work is asynchronous and parallel. Asking three people in parallel and acting on the first two responses is "outside the model." So the real work happens in email and Slack and on whiteboards, and the ERP records the decision after the fact. The ERP is the system of record for the conclusion, not the system of operation.

The architectural choice that produces this is the decision to treat the database as a transactional batch system with reporting as a separate phase. Once that decision is made, the business runs continuously and the ERP records continuously-late.

**What Yggdrasil does about it.** Mutations through the Repository layer ([described in the platform overview](https://mimirlabs.net/publications/platform-overview)) are committed transactionally and observable in the same instant by every connected client. The B2B event hub carries the event to local subscribers and across the federation in milliseconds. The [audit log](https://mimirlabs.net/publications/security-architecture) captures field-level deltas — old value, new value, changed_by, changed_at — for every CRUD path that goes through the Repository. The desktop client and the web app read from the same database the operator just wrote to. There is no nightly ETL because there is no separate analytical store; queries hit the operational database, possibly through warm in-process caches with TTL.

The constraint engine described above is not a single-cursor approval workflow. It evaluates per-transition: a transition either passes its declared gates or it does not, but the gates are independent rules, and parallel approvals can be modeled as count-existence constraints rather than as serial state hops.

The honest gap, and it is a real one, is the general-ledger posting framework. SAP, Oracle, Dynamics, and the other enterprise-tier systems have decades of investment in posting rules — operational events automatically generating journal entries by configurable mappings, with intercompany handling, multi-currency settlement, period accruals, and tax calculation embedded in the posting layer. Yggdrasil's finance module has accounts, AR, AP, banking, and explicit endpoints that wire operational events to invoices and bills. It does not yet have a generalized posting framework, and for a business above roughly $50 million in revenue with serious finance complexity, that gap matters. This is the single most credible objection to Yggdrasil at the mid-enterprise tier today, and the path to closing it is years of work, not months.

The recording-not-running failure mode is mostly addressed by Yggdrasil's architecture. The finance side of it is partially addressed and consciously incomplete. Customers should know that distinction at procurement time.

---

## The bonus failure mode: audit as afterthought

This one deserves its own section because it shows up in every regulated-industry deployment and the mainstream's response is consistently inadequate.

Audit trails in mainstream ERPs are typically bolted on, not designed in. The audit log is a separate table the application writes to when it remembers. Half the modifications come through bulk operations that skip it. SAP Change Documents capture some changes but not all; NetSuite System Notes have a notion of audit but the granularity is inconsistent across modules; Dynamics' audit settings can be turned off per-table. Newer platforms (Oracle Cloud ERP, SAP S/4HANA on the HANA database) have improved the audit-by-architecture story materially, but the older systems that still dominate mid-market deployments — and most of the long-tail ERPs that mid-market manufacturers actually run — carry the original limitation. Compliance reviews discover the gaps only during the audit.

History and versioning are similarly inadequate. Asking "what did this record look like six months ago" routinely cannot be answered in mainstream ERPs without restoring a backup. The system has been continuously deleting your past since you bought it.

**What Yggdrasil does about it.** The [audit log](https://mimirlabs.net/publications/security-architecture) is wired into the Repository layer rather than into individual controllers. Every CRUD path writes a field-level delta. There is no path to mutate business data that bypasses the audit log, because there is no other path to mutate business data — the Repository is the only abstraction. Bulk operations go through the same layer. The log is append-only. Field-level granularity means "what did this record look like six months ago" is a query, not a backup-restore exercise.

The trade is that the Repository abstraction is thin, and a developer determined to write directly to PostgreSQL could in principle bypass it. In practice the controllers don't, because the Repository is the only place the SQL helpers live. The architectural property is enforced by convention plus convenience, not by database trigger. A future hardening would be to add audit triggers at the database level so the property is enforced even for direct writes; that is on the roadmap, not in production.

---

## Where Yggdrasil does not yet close the gap

A list essay would stop here on a self-congratulatory note. This is not a list essay, and the case for Yggdrasil is not honest if I omit the gaps that remain. Three of them are worth naming:

**The general-ledger maturity gap.** Discussed above. For enterprise-tier finance, Yggdrasil is not yet competitive. The architectural improvements over the mainstream are real, but they do not substitute for posting framework maturity at scale.

**The compliance pedigree gap.** SAP has decades of SOX, GAAP, IFRS, FDA 21 CFR Part 11, and ITAR validations in production. Yggdrasil's architecture supports the requirements; it does not yet have the validations. For a regulated-industry buyer, that distinction matters at procurement time, even if the underlying audit log is structurally better than what the incumbent ships.

**The vendor-survival gap.** Mimir Labs is small. A buyer evaluating Yggdrasil at the F500 tier is asking whether the vendor will be around in ten years. The answer is not yet "yes, obviously," the way it is for SAP. Source escrow, third-party support contracts, and partner-of-record arrangements can mitigate this, but they are not the same as buying from a vendor whose survival is not in doubt.

These gaps are not arguments against Yggdrasil's architecture. They are arguments that Yggdrasil's architecture, applied to the segments where these gaps don't dominate the procurement decision, is more reliable than the mainstream alternative. Applied to the segments where they do, it is not yet.

---

## What others have already attempted

Yggdrasil is not the first system to recognize any of these failure modes. Several adjacent platforms have made meaningful structural moves against one or more of them, and an honest essay has to acknowledge what's working elsewhere before asserting where Yggdrasil's choices are different.

**Acumatica** has the closest pricing analogue: resource-based licensing rather than per-seat, which removes the perverse incentive to restrict access. They retain a partner channel and an extensibility surface (Acumatica Customization Projects, the framework formerly known as Acumatica Framework), so customization debt remains structurally available. Audit infrastructure is moderate. Multi-tenancy is real but row-discriminator, similar to Yggdrasil.

**Odoo** addresses vendor lock-in via open source: the customer can fork, host, and modify freely. This resolves the off-boarding asymmetry and the upgrade-trap dynamic in a way Yggdrasil does not. The cost is that Odoo refuses no customization at all — it embraces extensibility as the product, which means customization debt is back, just on the customer's side of the wall.

**ERPNext** is closer to Yggdrasil in spirit: open source, opinionated, narrower extensibility surface. Where it differs from Yggdrasil is the depth of its state-engine governance (lighter), its audit infrastructure (less rigorous), and its packaged migration story (effectively absent — the customer's migration is the customer's problem).

**NetSuite** has a modern API surface and disciplined audit infrastructure for an enterprise-tier vendor, and it has scaled the SaaS-ERP model further than anyone else in the mid-market. Where it sits on the spectrum: the customization framework (SuiteScript) and the partner channel are load-bearing for the business model; both produce the failure modes this essay names.

**Oracle Cloud ERP and SAP S/4HANA** have improved audit-by-architecture, real-time analytics, and API quality versus their predecessors. They retain the customization, partner-economy, and per-seat / per-module structures that produce the original failure modes; the improvements are around the edges of the same business model.

What's left for Yggdrasil to claim distinctively, after acknowledging the above:

- **The combination** is novel: governed-by-architecture audit + fixed module set + no code-level extensibility + footprint-based pricing + first-party migration tool + first-party integration tool + audit-warranty pricing tier. No incumbent we are aware of pairs all of these in one platform. Some pair two or three.
- **The audit-warranty pricing tier** specifically appears to be unique. We have not found another vendor offering capped warranty exposure on a customer-designated compliance regime. If one exists, the claim of novelty deserves to be retracted.
- **The refusal of code-level extensibility** as a stance is more uncompromising than Acumatica's, ERPNext's, or any enterprise-tier platform's. Whether this is a feature or a flaw depends on the customer; it is not the standard industry choice.

The cleanest framing is: the failure modes are real, multiple vendors have addressed individual pieces, and Yggdrasil's contribution is the specific *combination* and the explicit *refusal* of the choices that produce the failure modes. Customers comparing Yggdrasil to Acumatica, Odoo, or ERPNext will find more overlap than they would comparing it to SAP — and that's the honest comparison set, not the F500 incumbents.

---

## What this adds up to

The argument is not that Yggdrasil is a better ERP than SAP or Oracle or Dynamics. The argument is narrower and, I think, more defensible:

The failure modes that account for most of the visible carnage in enterprise software — customization debt, the implementation industrial complex, the migration disaster, integration brittleness, recording-not-running, audit-as-afterthought — are not accidents. They are the outputs of architectural and commercial choices the incumbents' business models are aligned with, and that the vendors have weak commercial reason to remove. Customization locks customers in. Hard implementations sustain the partner channel. Outsourcing migration to partners makes leaving the vendor harder. UI-mirror APIs preserve the integration layer the vendor (or its iPaaS partners) want to charge for. Batch-oriented architecture sustains the period-close consulting practice. Bolted-on audit avoids exposing the customizations that the upgrade story can't survive. Whether or not any individual vendor *deliberately* engineers these properties, the structural incentive is to leave them in place — and the empirical record across decades and platforms is that they do.

A system that addresses these failure modes has to refuse the choices that produce them. That refusal has costs — less flexibility, smaller ecosystem, narrower regulatory pedigree, real bus-factor risk — that are honest and worth pricing into the procurement decision. For a customer in the lower mid-market with a manufacturing or B2B operation and no exotic regulatory load, the trade is favorable. For a customer in the messy middle, it is genuinely contested and depends on which gaps dominate the buyer's risk model. For an F500 in a regulated industry, the trade is not favorable today, and pretending otherwise would be the kind of marketing claim this essay is written against.

What good would look like is a system designed for change instead of one designed for migration projects. A system that exports its own data the way it imports anyone else's, so that off-boarding is a non-event. A system whose audit log is the substrate, not a feature. A system whose extensibility is configuration over data, not customization over code. A system whose integration story is a real event surface rather than a webhook with a refetch tax. A system whose finance module posts continuously rather than closing periodically.

Yggdrasil is not yet all of those things. It is most of them. The gap between most and all is the work of the next several years, and it is bounded by architecture rather than by business model. The mainstream's gap is bounded by business model. That is the difference worth caring about.

---

[^1]: Lidl scrapped its eLWIS SAP project after seven years and approximately €500 million in invested cost. The German press reporting from July 2018 (Computerwoche, Manager Magazin) is the primary source; English-language coverage in *The Register* and *ComputerWeekly* summarizes the timeline.

[^2]: National Grid's 2014 SEC filings disclosed a $585 million write-down related to its 2012 SAP cutover, with subsequent litigation and remediation pushing total disclosed costs above $945 million. Wipro, the system integrator, settled for $75 million in 2017.

[^3]: Revlon's February 2019 disclosures and the subsequent shareholder class action (*In re Revlon, Inc. Securities Litigation*, S.D.N.Y.) detail the SAP-related shipping disruption following its 2018 Microsoft Dynamics 365 deployment for its Elizabeth Arden subsidiary.

[^4]: Hershey's Q3 1999 earnings call and contemporaneous reporting in *The Wall Street Journal* and *CIO Magazine* document the Halloween shipping disruption following the company's SAP R/3, Manugistics, and Siebel cutover.

[^5]: *MillerCoors LLC v. HCL Technologies Ltd.* (Cook County, Illinois, 2017) and the related Oracle litigation document a stalled Oracle EBS implementation. Both parties claimed roughly $100 million in damages.

[^6]: Panorama Consulting's *ERP Report* has been published annually since 2009. Year-over-year, the report has consistently found 50–60% of implementations exceed budget and 40–55% miss timeline by more than 20%.

[^7]: This ratio is widely cited but not centrally tracked. Forrester's *ERP Implementation Costs* research from 2019–2023 is the most reliable industry source; per-deal anecdata from Gartner's reference calls confirms the pattern.

---

*Draft — April 2026. Companion to the no-AI essay and Glass Machines. Comments and corrections welcome.*
