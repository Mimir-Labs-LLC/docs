# The Shortest Path

*Draft — May 2026. Substack-bound editorial. Companion to [The Missing Layer](the-missing-layer.md) and [The Wrong Gate](the-wrong-gate.md); complements the operational-canon line.*

---

If what is in your reports did not take the shortest possible route from the data layer, then it is lossy and fragile, and you should trust it less with each hop. The fix is not better reporting tools. It is moving what reports need into the data layer itself (canon, authority, provenance, audit), so the shortest path is also the one that loses the least.

The reason this matters now is not that reports have gotten worse. It is that something has changed about who, and what, is reading them.

## What a hop costs

A hop is any place where a report's content has to traverse a boundary the data layer did not impose. A warehouse extract is a hop. A BI tool's semantic layer is a hop. A materialized view is a hop. A dashboard query against a federated catalog is a hop. An event stream is a hop. A nightly batch job is a hop. A CDC feed is a hop. A "single source of truth" dashboard that joins seven sources is six hops.

The first thing to know about hops is that there is no such thing as a free one. Even the gold-standard, fidelity-preserving hop costs you something. Not necessarily the data. The bytes can survive, the schema can survive, the meaning can survive. Trust decays anyway, across at least six dimensions any honest engineer will recognize.

Freshness decays. Every hop is asynchronous on some axis; by the time the report reads, the operational reality has moved.

Replayability decays. Every hop is a point at which *what would this have said yesterday at 2:13 PM* becomes a question with a worse answer than it had at the source.

The deserializer surface grows. Every hop is a contract between two systems, and that contract can break, version-drift, or get reinterpreted by a downstream consumer that thinks it understands the schema.

Schema drift compounds. Every hop is a place where one side can change without the other learning, and that desynchronization manifests as silent failure rather than loud error.

Time-of-snapshot semantics intrude. Every hop captures a slice of state at one moment. The report consumer wants *now*; the hop gives them *then*. The difference is invisible until it matters.

Operational complexity multiplies. Every hop has a failure mode, a monitoring story, a recovery procedure, an on-call rotation. None of these add to the value the report produces. All of them add to the surface across which something can go wrong.

The well-designed hop pays less of these costs than the badly designed one. None of them pay zero. The platonic ideal of a hop (typed, idempotent, replayable, with full provenance carried in-band) still loses freshness, still has a deserializer surface, still has operational complexity. What we are building at Mimir Labs is not designed to abolish hops, which is impossible. It is designed to minimize the cost per hop, by making the hops that exist carry more than the alternatives, and to minimize the number of hops, by moving as much of what reports need as possible to the place where reports start.

## The standard counter-move adds hops

For thirty years the industry's answer to *reports decay across hops* has been to add another layer between the report and the data. A layer that claims to fix the previous layers' lossiness. Each generation of the layer made progress. None of them addressed the underlying problem.

The data warehouse added a hop to centralize what the source systems failed to. The data lake added a hop to defer what the warehouse forced too early. The semantic layer added a hop to standardize what the BI tools each interpreted differently. The data mesh added a hop to federate what the centralized warehouse couldn't scale. The data observability layer added a hop to surface what the previous hops had silently broken. The semantic catalog added a hop to disambiguate what the semantic layer had only standardized syntactically.

Each layer is a hop that promises to redeem the lossiness of the layers below it. Each one absorbs that lossiness rather than eliminating it. The integration tax, the reconciliation tax, the freshness tax, the trust tax. These are paid at every layer, and adding a layer pays them again.

The honest engineer's question is not which layer is the best. It is whether any layer at all is the right answer.

## What "the data layer" carries when it is not lying

The phrase *data layer* is doing a lot of work. In most enterprises it means *the database the application happens to use*. That is not what is being proposed here.

The data layer worth being proximate to carries four things that the typical operational store does not.

**Canon.** A shared, enforced vocabulary. Not a wiki. Not a metadata catalog. A controlled set of business nouns with their attributes, relationships, and state models, defined once at the substrate, read-only at runtime, updated only through release. Every report, every integration, every downstream consumer reads the canonical concept by the same name and with the same definition. The reconciliation problem evaporates because there is nothing to reconcile.

**Authority.** State transitions that the substrate refuses when the policy does not permit them. Not a workflow engine on top of the database. A runtime gate at the database boundary that consults the active policy and rejects illegal transitions before they commit. The audit log records the attempt regardless. The data layer is the place where authority is enforced, not the place where authority is logged after the fact.

**Provenance.** Who said this, when, on what authority, with what evidence. Recorded in the record itself, not in a parallel system. The provenance is part of the data the report reads. The report does not have to ask a separate system for the lineage; the lineage is part of the answer.

**Audit.** Append-only. Enforced at the database trigger level, not the application. A compromised application role cannot cover its tracks through the application because the audit row fires at the substrate, not at the app. The audit is part of the substrate; turning it off would mean turning off the database.

A data layer that carries these four things is a different category of artifact from a database. A report reading from it inherits canon, authority, provenance, and audit as part of the read. A report two hops removed from it inherits an approximation of those things, filtered through whatever the intermediate layers decided to preserve.

The closer the report is to this data layer, the less of those four things it has to reconstruct or take on faith. That is what *trust* means in this context.

This is the platform Mimir Labs is building. Yggdrasil ERP is the operational engine that demonstrates a data layer carrying these four things at one-company scale. The B2B Event Hub is the federation surface that demonstrates the same four things crossing the company boundary. Jormungandr is the same enforcement, made portable to systems we cannot replace. The argument of this essay is about the four things, not the brand. The brand exists because we got tired of waiting for someone else to build them.

## The locus of the rule

The four things above are about the data the substrate carries. There is a fifth thing the substrate either carries or does not carry, and which determines how badly everything above degrades across hops: the rule about the data.

Business logic (what counts as a *qualified customer*, what makes a transaction *complete*, when an invoice is *issued* versus *posted*, how revenue is recognized for a multi-element contract) lives somewhere in every architecture. The question is where. The further from the substrate, the more inconsistent the rule's application across every consumer of every hop.

In the standard architecture, business logic lives downstream. The application encodes some of it. The data warehouse's transformation pipeline (Airflow, dbt) encodes more. The BI tool's semantic layer (LookML, Tableau calculated fields, Power BI measures) encodes some. The report's own query may encode the rest. Every consumer applies the rule on the way to producing a number. Every consumer's version of the rule has its own release cycle, its own change-control story, its own author who is not the author of the substrate. Two teams who think they are reporting the same KPI are usually reporting two different KPIs that happen to share a name. The reconciliation tax is the visible symptom of distant-locus business logic. The standard answer (*we need a semantic layer*) is to add yet another locus.

Benn Stancil's essays on the *metric layer*, the *context layer*, and the *entity layer* have been documenting this discourse on Substack for five years. Multiple companies built metric-layer products in 2021 and 2022 to solve the divergence problem; most stalled or were acquired; dbt Labs has kept the dbt Semantic Layer on the roadmap and acquired Transform to consolidate the category. The diagnosis the discourse converges on is correct: KPIs diverge across consumers because the rule lives in multiple downstream locations. The prescription it converges on does not move the rule; it duplicates the rule into yet another semantic abstraction layered over the data.

A narrower take has been built and shipped in production. Chad Sanderson's work at Convoy on data contracts (later codified in *Data Contracts: Developing Production-Grade Pipelines at Scale*, O'Reilly 2023, with Mark Freeman and B. E. Schmidt) moves the locus of the rule to the source system: typed schemas, strongly-typed events, contracts authored by the engineers who own the upstream data. The scope is narrower than what is proposed here (data contracts cover the shape and meaning of what the source emits, not the operational semantics of how the source's state is allowed to change), but the principle is the same. The rule belongs at the source, not in the dbt model downstream. The platform's contribution is to extend that principle from data-contract scope to canon-and-authority-and-provenance-and-audit scope, and to make it the default behavior of the operational engine rather than a discipline layered on top.

When the rule lives at the substrate, every consumer's path goes through the same rule. The state machine refuses the transition. The authority gate rejects the privileged path that bypasses the app. The validation runs at the database boundary, not at the application layer where a different application can skip it. Reports do not have to recompute *is this order valid*; the substrate already enforced that the order was valid before it became a row. KPI definitions live with the entity definitions; you cannot have two competing answers to *what is a qualified customer* because the canonical model defines one and the substrate enforces it.

Distance from the substrate is not just lossiness about the data. It is divergence about the rule. The first kind of distance you can patch with a better dashboard. The second kind is the one that produces the meeting where finance and sales spend an hour arguing whose revenue number is real. Both kinds compound with each hop. Both kinds are minimized by making the substrate carry the rule, not just the data.

## Why now

The reason this matters in 2026 is not that reports have gotten worse. It is that something is reading them that did not used to.

For the last twenty years the consumer of reports was a human who could exercise judgment. The human could see *this number looks wrong* and check the source. The human could ask *what is this column actually capturing* and find the answer in a tribal-knowledge conversation. The human could detect the absurd and refuse to act on it.

The consumer that is being added in 2026 is an agent. The agent does not have judgment. The agent has access. The agent acts on what the report says, immediately, at the speed and confidence the substrate allows. The agent does not see *this number looks wrong*; it sees a number and acts. The agent does not ask *what is this column actually capturing*; it consumes the schema and binds to it. The agent does not detect the absurd; it operates on the assumption that what is in the substrate is the truth.

A lossy substrate produces confident agents that act on misinterpretations. A fragile substrate produces agents that act on stale snapshots. The agent will not stop and check. The agent will execute.

This is not speculation about a future failure mode. MIT's 2025 NANDA *State of AI in Business* report, based on 150 leader interviews, 350 employee surveys, and analysis of 300 public AI deployments, found that 95% of enterprise generative-AI initiatives yield no measurable business return. The researchers were explicit about the failure pattern: not talent, not infrastructure, not regulation, but *the lack of learning, integration, and contextual adaptation*. That last phrase is the substrate problem named in another vocabulary.

And the volume is about to grow sharply. IBM's 2026 CEO Study, surveying 2,000 CEOs globally, found that 76% of organizations now have a Chief AI Officer (up from 26% one year prior), and the CEOs surveyed expect 48% of operational decisions to be made by AI without human intervention by 2030, up from 25% today. The substrate those agents act on is the same substrate that produced the 95% failure rate above. The agents are arriving on it whether it is ready or not.

The standard answer to this (*we have to clean the data*) misses the layer. The values being clean is necessary and not sufficient. What the agent needs is not clean data but a substrate that carries what the agent needs to know to act safely: what the data means, where it came from, what state it represents, what evidence supports it, what actions are valid because of it. That is canon, authority, provenance, and audit at the data layer. Exactly the four things that minimize the cost of every hop between the data and whatever is consuming it.

The window in which agents can be made to act safely on enterprise substrate is not long. It is the window between now and the moment a critical-system agent acts on a misinterpretation in a way that becomes visible to regulators, customers, or shareholders. The enterprises that load their data layer with what reports and agents actually need will be operating in the upper register of that window. The enterprises that add another semantic layer or another observability layer will be operating in the lower register.

## What this does not claim

The platform does not eliminate hops. It minimizes their cost.

The substrate itself has hops internally. Operational events propagate from Yggdrasil ERP to the B2B Event Hub. The Event Hub federates across nodes through a pluggable relay (Redis pub/sub or Redpanda, depending on what the operator already runs). Subscribers read from the hub on their own timing. Each of those is a hop. Each of those costs something. The claim is that those hops preserve more than the alternatives, because they ride on a substrate that carries canon, authority, provenance, and audit by construction, and because the protocol between the hops is the same protocol the substrate itself uses to record the truth.

The platform does not eliminate reporting tools. The dashboards, the BI surfaces, the data-science notebooks, the executive scorecards. These are not going away. They exist because human consumers want a particular shape of summary. The platform's claim is about what those tools are reading from. A reporting tool whose shortest path is to a data layer carrying the four things above produces more trustworthy output than the same reporting tool whose shortest path is to a warehouse three hops removed.

The platform does not eliminate the integration tax. It changes who pays it. In the standard architecture the integration tax is paid by the consumer of every report. In the platform architecture the integration tax is paid once, at the substrate, by the people who built and govern the canonical model.

What the platform does claim is that the question every reporting consumer should be asking, and is not, is: *what hop is between this number and the data layer, and what did each one cost?* If the answer is *I don't know* or *several, and I don't track them*, the right posture toward the number is suspicion. If the answer is *one, and that hop preserves canon and authority by construction*, the right posture is trust commensurate with the integrity of the substrate.

The current default in the enterprise is the first answer. The platform is built so that the second answer becomes possible.

## The question to take with you

The next time you look at a report, ask one question.

How many hops between this number and the data layer where it originated?

If you cannot answer, the trust deficit is your problem, not the report's.

If you can answer, and the number is large, the trust deficit is the architecture's problem.

If the answer is small, and the hops are well-designed, the trust deficit is residual. The way to make it smaller is to make the data layer carry more of what the report needs, so the next consumer's answer can be smaller still.

That is the shortest path. The work of the next decade is making it the default. It is the work we are doing at Mimir Labs, and it is the work you should expect to see more enterprises ask for as soon as the first agent acts on a number that did not survive the trip.

---

## Sources and further reading

- **R. Y. Wang and D. M. Strong (1996), *Beyond Accuracy: What Data Quality Means to Data Consumers*.** *Journal of Management Information Systems*. Foundational definition of data quality as a multi-dimensional construct (intrinsic, contextual, representational, accessibility), not accuracy alone.
- **S. Behrens and W. Sedera (2004), *Why Do Shadow Systems Exist after an ERP Implementation? Lessons from a Case Study*.** PACIS 2004. Introduces the *gap* construct between stakeholder requirements and what the ERP implementation provides; foundational to the operational-distortion argument.
- **MIT NANDA Initiative (2025), *The GenAI Divide: State of AI in Business 2025*.** 150 leader interviews, 350 employee surveys, 300 enterprise AI deployments. 95% of enterprise generative-AI initiatives yield no measurable business return; failure pattern attributed to lack of learning, integration, and contextual adaptation rather than to talent, infrastructure, or regulation.
- **IBM Institute for Business Value (2026), *CEO Study: 5 Plays for AI-First Transformation*.** 2,000 CEOs globally. 76% of organizations now have a Chief AI Officer (up from 26% a year prior); CEOs expect 48% of operational decisions to be made by AI without human intervention by 2030, up from 25% today.
- **Benn Stancil, *benn.substack.com*.** The metric-layer, context-layer, and entity-layer essays. Documents the BI community converging on the divergence diagnosis and on the prescriptive dead-end of adding another semantic abstraction.
- **C. Sanderson, M. Freeman, and B. E. Schmidt (2023), *Data Contracts: Developing Production-Grade Pipelines at Scale*.** O'Reilly. Production evidence that source-resident contracts work at scale; codifies the data-contract pattern Sanderson built at Convoy.
- **Panorama Consulting Group, *ERP Report* (annual).** Failure rates, budget overruns, and the recurring causes; documents the operational-distortion symptom set in the field.

---

*Filed May 2026. Companion essays: [The Missing Layer](the-missing-layer.md) (incomplete operational truth and the AI-readiness gap), [The Wrong Gate](the-wrong-gate.md) (why ERP failure roots never surface), [How to Preserve One Version of Truth Using 37 Systems and a Parrot](how-to-preserve-one-version-of-truth.md) (satirical companion).*
