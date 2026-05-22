# The Operational Canon Doctrine

## What enterprise software is for, what follows architecturally and commercially, and what we refuse

*Mimir Labs, LLC. Draft — May 2026.*

---

## Abstract

We hold that enterprise software's purpose is the maintenance of an *operational canon* — the authoritative, adjudicated record of how the business is actually operating, against which every department, every system, and every decision can be checked. We hold that the dominant Enterprise Resource Planning (ERP) architecture pattern was built for a different purpose — defensible record-keeping for periodic financial close — and that the gap between what current ERPs were built for and what the modern business now needs them to do produces a structural failure mode we name *operational distortion*: the systematic, architectural-side-effect divergence between what the system represents and what the business is actually doing.

This paper states the doctrine, names the eight architectural commitments that follow from holding it, names the commercial commitments that follow from the same source, surveys eleven dominant ERP architectures as evidence the doctrine is presently violated industry-wide, engages the strongest standing counter-position from the academic accounting literature, and admits the gaps in our own implementation. The intellectual move is not synthesis or taxonomy. It is a stance — and an argument for why holding it is the architectural and commercial precondition for the next generation of enterprise software.

---

## 1. The doctrine

We hold that the purpose of enterprise software is to maintain the *operational canon*: the authoritative, adjudicated record of operational state, currently maintained, semantically coherent, audited by structure rather than by feature, and shared across the boundaries the business actually crosses — between departments, between vendors and partners, between the present and any future audit.

We hold that this purpose is not what current ERP architectures were built to satisfy. Current architectures were built when the canonical use of business data was financial close, when periodic batch processing was the design pattern that fit available compute, and when configurable customization was the value proposition that distinguished one vendor from another. Architectures designed for that purpose produce systems excellent at periodic close and configurable customization. They produce *operational distortion* — the gap between operational reality and the system's representation of it — as a side effect of the choices they made for the purpose they were optimized for.

We hold that closing this gap is an architectural problem, not a moral or process one. ERP vendors do not intend the distortion this paper describes. The architecture they ship produces it as the path of least resistance for ordinary work. Closing the gap therefore requires architectural moves the dominant pattern was not designed to support — and commercial commitments the dominant business model was not designed to make.

This paper is a doctrine, not a taxonomy. We state what we hold, what we hold to follow, what we hold to refuse, and where our own implementation does not yet meet the standard. The reader is invited to be either an adherent or an opponent. We have built and continue to build Yggdrasil ERP and the surrounding Mimir Labs platform as our attempt to instantiate the doctrine. We are not the only group of people in the field who could plausibly hold this position. We are, as far as we know, the first to have stated it as a doctrine, with the architectural and commercial commitments that follow from holding it made explicit.

The intellectual lineage closest to the structural move of this paper is Shi, Zhang, Jin, and Conitzer's 2026 unified taxonomy of LLM deception [13], which organizes a fragmented research literature on LLM hallucination, sycophancy, and alignment-faking under one framework. Their move is taxonomic — they are organizing what already exists. Our move is doctrinal — we are stating what we hold should exist, what follows from holding it, and what we will refuse on its account.

---

## 2. The problem the doctrine names

This section presents the symptoms of the violation. The information-systems, analyst, and auditor literatures each document these symptoms in their own vocabularies. We review them not to validate the doctrine — the doctrine stands on what it commits to, not on the harm of its absence — but to demonstrate that the violation produces measurable, sustained, multi-decade economic harm that no community of practitioners can reasonably dispute.

### 2.1 The IS literature documents the violation as misfit

Davenport's foundational 1998 *Harvard Business Review* article observed that "an enterprise system, by its nature, imposes its own logic on a company's strategy, organization, and culture" [1]. The observation is not casual; it is the founding diagnostic of an entire research program. Markus and Tanis, in 2000, framed ERP adoption as a multi-stage experience — chartering, project, shakedown, onward and upward — whose "shakedown" phase, the period from go-live until "normal operation" or "routine use" is achieved, is the stage at which workaround behavior most often crystallizes [2]. Strong and Volkoff, in 2010, catalogued six domains of organization-system *misfit* (functionality, data, usability, role, control, organizational culture), each producing predictable workaround behavior [3]. Boudreau and Robey documented the agentic response: users move from initial *inertia* (avoidance of the new system) to *reinvention* (working around system constraints in unintended ways) [4]. Behrens and Sedera asked, in 2004, why shadow systems persist *after* an ERP implementation — i.e., when the system that was supposed to subsume them is in production — and answered that the implemented schema does not cover the represented work [14]. Huber, Zimmermann, Rentrop, and Felden, in 2016, found in a multi-case study that 64% of identified shadow systems were ERP-related, sharing data and/or functionality with the official ERP system [15].

The IS literature has, in other words, been documenting the violation of the doctrine for at least a quarter-century, in a vocabulary native to its discipline. The vocabulary is real; the underlying observation is the same one we hold the doctrine to address.

### 2.2 The analyst literature documents the violation as project failure

The same observation appears in market-research vocabulary. Gartner, in a May 2024 Strategic Planning Assumption, predicts that "by 2027, more than 70% of recently implemented ERP initiatives will fail to fully meet their original business case goals" [5]. The same Gartner research note quantifies the underlying basis: "Based on over 6,000 interactions with Gartner clients, we estimate that more than 70% of recently implemented ERP initiatives will fail to fully meet their original business use case goals, and as many as 25% of these will fail catastrophically" [5]. The same document reports — citing the 2023 Gartner ERP, Procurement, HCM and Finance Apps Survey — that "87% of respondents from organizations that have implemented ERP applications have plans to replace or upgrade their ERP applications within the next three years," and explicitly interprets the finding: "the implemented ERP strategy was not well-aligned to expectations" [5]. From the same survey: "almost 75% of respondents from organizations with an ERP strategy reported that their ERP strategies were not strongly aligned with their overall business strategy" [5].

The 87% replacement-intent figure is the most direct organizational measure of the doctrine's violation we have. Organizations have implemented an ERP and are already planning to replace it. They are doing so in numbers that suggest the implemented ERP is not maintaining the canon they need.

The Panorama Consulting Annual ERP Report series, surveying ERP-implementing organizations as a free industry baseline, has tracked specific outcome metrics across the last four editions [6, 7, 8, 9]. The share of ERP-implementing organizations whose projects came in at or under budget has held within a narrow band: 53% in 2023, 67% in 2024, 69% in 2025, 70% in 2026 — across four years, roughly one in three organizations runs over budget on a typical engagement, and that share is not declining materially as the underlying architectures mature. The share of organizations completing on or under timeline rose across the same four years (58%, 69%, 81%, 78%), driven in part by a shift in the reported median project duration from 15.5 months in 2023 and 2024 to 9 months in 2025 and 2026; the duration compression is large enough to be noted as potentially confounded with a shift in respondent profile (median annual revenue $1.5B in 2023, $200.5M in 2024 [6, 7]).

The leading reason cited for budget overruns shifted between editions in a way that is itself diagnostic: "project staffing was underestimated" was the top reason in 2023 (38% of overrun cases); "additional technology needed to be purchased to meet project goals" became the top reason in 2024 and held that position through 2026 (52%, 52%, 55% respectively) [6, 7, 8, 9]. The leading reason for budget overrun in three of the last four editions is, in plain language, *we discovered we needed more software than the ERP we bought*. That is a direct measurement of the violation: the implemented system did not cover the work, and the work response was to buy more software.

Only the 2023 Panorama edition contains a customization-rate breakdown chart. That edition reports a five-tier distribution: 7.1% no customization with strong out-of-the-box match; 11.5% no customization but configuration; 15.8% no customization but configuration with process modifications; 44.8% moderate customization with process modifications; 20.8% heavy customization [6, p. 18]. The "any customization" share is therefore 65.6% of respondent organizations. Configuration-without-customization is the optimistic case in the dataset (34.4%); customization-with-process-modification is the modal case (44.8%). The 2024, 2025, and 2026 editions dropped this chart. We note the absence: a series that tracked customization rates and then stopped tracking them is itself a small piece of evidence about what the analyst community considers a settled fact about ERP implementations.

### 2.3 The auditor literature documents the violation as control deficiency

PCAOB inspections of public-company audits in 2024 identified Part I.A deficiencies in 20% of Big Four audit engagements and 52% of "Next Eight" annually-inspected mid-tier firms [10]. The most-cited deficiency areas — revenue accounts, inventory accounts, IT access controls — overlap precisely with the ERP modules where workaround behavior most often manifests. PCAOB does not categorize deficiencies by ERP-vs-non-ERP environment, so we cannot make a direct claim of the form "X% of audits at companies running [vendor Y] have material weaknesses." We can claim only the weaker but still consequential observation: the audit-deficiency hot zones and the operational-distortion hot zones are the same modules.

Annual Protiviti SOX compliance surveys identify IT access controls and security as the most-cited area of control challenges and report that approximately 20–25% of U.S. public companies disclose at least one material weakness each year, a figure that has fluctuated little in recent years [11]. Internal SOX compliance costs in 2024 were reported in a range from $181,300 (small firms) to over $2 million annually (large companies), with only roughly one in three organizations using enabling technology to manage SOX compliance.

### 2.4 The pattern across literatures

These literatures describe the violation in different vocabularies. The IS literature speaks of *misfit* and *workaround*. The analyst literature speaks of *implementation failure*, *cost overrun*, *replacement intent*. The auditor literature speaks of *control deficiency* and *material weakness*. The phenomena are routinely cross-referenced in introductory paragraphs of ERP papers but are rarely treated as a single object of analysis.

We hold that they are a single object. Each vocabulary describes a different audience's encounter with the same architectural failure: operators encounter it as workaround pressure; project sponsors encounter it as cost overrun and replacement intent; auditors encounter it as control deficiency. The architecture is what produces the encounter. Naming the architecture is the precondition for changing it.

The remainder of this paper states what we hold the architecture should commit to (Section 3), what we hold the commercial model should commit to (Section 4), provides a diagnostic vocabulary for naming the failure modes that the doctrine refuses (Section 5), evidences that the doctrine is presently violated industry-wide (Section 6), names what we explicitly refuse (Section 7), engages the strongest counter-position from the literature (Section 8), admits where our own implementation does not yet meet the standard (Section 9), and closes with the commitment we are making (Section 10).

---

## 3. What we hold to follow architecturally

Eight commitments. Each is stated as a commitment, not a recommendation. Each follows from the doctrine — the operational canon must be faithful, current, semantically coherent, structurally audited, shared across boundaries — and refuses a specific class of distortion that the dominant ERP architecture admits as a side effect of its design.

### 3.1 A single canonical model. No per-tenant schema divergence.

The schema is one. Every customer of the platform runs against the same model. There are no per-customer custom fields, no per-customer custom tables, no per-customer schema extensions. The vendor publishes the model; the model is what every tenant runs against; the meaning of `customer.status = active` is the same at one customer as at the next.

This commitment refuses the customization-licensing structural cause of distortion: the architectural pattern in which the answer to schema gaps is per-customer customization, and per-customer customization produces per-customer divergence in canon. Every customer's customizations are different; no two implementations of the same vendor's product are the same product; the vendor's documentation describes a system that does not, in production, exist anywhere. We refuse this. Customization belongs to data — values, mappings, organizational settings — not to schema or code.

### 3.2 Append-only field-level audit. At the data layer, not the application layer.

The audit log is a structural property of the database, not a configurable application feature. Every mutation through any path writes a per-field delta with old value, new value, actor, and timestamp. There is no path that does not write to the audit log because there is no other path. The audit cannot be turned off because there is no preference, no configuration, no role, no batch tool that bypasses it.

This commitment refuses the provenance-loss mechanism. Six months later, the question "what did this row look like, and who changed it, and when, and why" is a query, not a backup-restore exercise. Auditors do not have to take application discipline on faith because the audit guarantee is a structural property of the data layer, not a convention enforced by application code.

### 3.3 A state engine governs every transition. There is no privileged side channel.

Every governed lifecycle transition routes through a constraint engine whose rules are stored as data, queryable by the customer, and auditable in the same way every other change is auditable. Direct field updates that would mutate a record's state are refused by the engine, not merely discouraged by application convention. The engine's rules are part of the product; the customer can read them; the engine's enforcement is at the database layer where it cannot be circumvented.

This commitment refuses workflow-rigidity-driven forced fabrication for governed lifecycles. When the operational reality does not fit the state machine, the response is to extend the state machine — explicitly, auditably, with the change recorded — not to bypass it via a privileged update path. State that has been mutated is mutated through the engine; state that has not been mutated through the engine is not state in the canon.

### 3.4 One database. One schema. No silos — physical, logical, departmental, or geographic.

There is one PostgreSQL database. One shared schema. Multi-tenancy is row-level with database-enforced row-level security. There are no per-module databases, no separate finance database, no per-region instances, no per-subsidiary deployments running different schema versions. The same `Customer` row is the row sales reads, the row finance reads, the row the auditor reads, and the row the supplier-side counterparty reconciles against.

This commitment refuses the silo-divergence mechanism at the only level it can be refused: by removing the second store, not by reconciling between two stores. Reconciliation is a permanent business function in current ERP environments because the architecture admits silos as a design feature. We refuse the design feature. There is no second copy because, structurally, there cannot be a second copy.

### 3.5 The operational store and the analytical surface are the same data.

There is no nightly ETL because the operational data and the analytical data are the same data. There is no separate analytical layer that is hours behind the operational layer. The dashboards are reading the operational store, in real time, with the same row-level security that governs operational reads. Continuous event streams — not batch — surface state to consumers (downstream systems, partner tenants, internal analytics) at the rate the canon changes.

This commitment refuses the periodic-architecture structural cause of currency-of-canon distortion. The dashboard is telling the truth about now, not the truth about then. When the operator typed it three minutes ago, the canon reflects it three minutes ago, not twelve hours from now.

### 3.6 A canonical semantic vocabulary, as a first-class platform artifact.

Every business noun has one definition. The definition is published. The definition is versioned. The definition is the same across every module of the platform, every tenant, every counterparty. When two tenants of the platform exchange a `purchase_order_line`, both sides agree on what the boundaries of the term are. When a customer's finance team and a customer's operations team query the same field, they get the same meaning, not the same column name with different meanings attached.

This commitment refuses vocabulary-fragmentation as a structural cause of distortion. It also gives cross-organizational drift a shared anchor: trading partners can reconcile state via events that carry the structured payload of a vocabulary they both share, without an intermediary translating the boundaries in each direction.

In Yggdrasil, the canonical semantic vocabulary is *Mimisbrunnr* — a model of more than three hundred tables across seventeen business domains, defining what every business noun in the platform means. Mimisbrunnr is the schema everyone runs.

### 3.7 Schema and field-meaning changes themselves audited.

When a field's definition changes — when `ship_date` is repurposed, when the meaning of `status = closed` is tightened, when a new enum value is added — the change is itself a transaction in the audit log, with the new definition, the old definition, the actor, and the timestamp. The historical-record query does not return data that has the old structure but the new meaning, because the meaning's change is recorded alongside the data's structure.

This commitment refuses *temporal drift* and *definition mutability without record* as structural causes. The standard the doctrine sets is that semantic drift is visible at the moment it happens, not three years later when an audit notices the historical data no longer means what current operations are writing.

### 3.8 Cross-organizational coherence by event reconciliation, not nightly batch.

Counterparties operate against the same shared semantic vocabulary and reconcile state through events that carry the structured payload they describe. There is no EDI translator. There is no nightly batch sync. There is no vendor-mediated B2B network the trading partners pay a third party to operate. When the buyer's tenant and the supplier's tenant disagree about the state of a shared object, the disagreement surfaces at the event level, immediately, against a vocabulary both sides hold.

This commitment refuses cross-organizational drift up to the point that two willing counterparties can hold a single coherent picture of a shared object without an intermediary translating in both directions. (We acknowledge it does not address the case of unwilling counterparties or counterparties on incompatible architectures; those are the integration-engine problem, addressed by other components of the platform.)

In Yggdrasil, the cross-organizational coherence mechanism is the *B2B Event Hub*: a continuous WebSocket-plus-broker event surface that publishes shared-object events under the canonical vocabulary to subscribed counterparty tenants.

---

## 4. What we hold to follow commercially

The doctrine has commercial consequences as well as architectural ones. The pricing, delivery, and warranty model of a vendor that has committed to maintaining the canon is materially different from the pricing, delivery, and warranty model of a vendor that has committed to selling configurable infrastructure. We name the commercial commitments here because they follow from the same source as the architectural ones, and because a vendor who makes the architectural commitments without the commercial ones is not, in the end, holding the doctrine.

### 4.1 No per-seat pricing.

A vendor whose primary purpose is maintaining the operational canon cannot charge customers for letting more of their own people see the canon. Per-seat pricing punishes the inclusion the canon depends on: every operator who could read the canon and act on it, but doesn't, because their seat costs the organization $X per year, is a hole in the canon's coverage. We refuse per-seat pricing. The customer pays based on the operational footprint they bring under the platform's governance — not on how many of their own people the customer permits to see what the canon contains.

### 4.2 No per-module pricing.

The platform is one integrated system. Selling its parts separately would misrepresent what is being delivered. Per-module pricing also incentivizes the customer to deploy fewer modules, which directly produces silo divergence in the form of "we run module X here and module Y over there in a different system" — exactly the failure mode the doctrine refuses architecturally. A canon-maintaining vendor cannot sell the canon's parts separately because the parts are not separately useful for canon maintenance.

### 4.3 No partner-led implementation as the primary delivery model.

A vendor who cannot deploy its own product without a third party is not, in any meaningful sense, answerable for the model of canon being delivered. The configurations the partner channel makes — the field meanings, the workflow rules, the integration boundaries — are decisions about the canon. The vendor that outsources those decisions to a partner has outsourced the doctrine. We deploy directly because we have to be answerable to the customer for the model of truth we are delivering.

### 4.4 Audit Authority warranty pricing.

When a customer pays us to be the contractually warranted system of record for a compliance regime, we accept capped financial exposure for audit-finding remediation costs traceable to a Yggdrasil failure. This is the only honest version of charging for audit value: we charge for the value, and we own the failure when our system produces it. Most enterprise software vendors charge more for serving regulated customers without accepting any of the regulatory downside. We hold the doctrine demands the inverse: if we are the system of record for the compliance regime, we own the regulatory downside when we fail.

We acknowledge the Audit Authority pricing tier is structurally novel and not yet underwritten by experience. The first customer to elect it will be doing pioneering work alongside us. We have priced the tier accordingly. The warranty is real; the operational machinery for honoring it is in development. We name this as a gap in Section 9 alongside the architectural gaps.

### 4.5 Footprint-based pricing.

What we charge for is the operational footprint the customer brings under the platform's governance — measured in a way that scales with how much of the canon we are being asked to maintain, not with how many seats access it or how many modules are activated. The Footprint Score is an explicit measure: the customer pays based on what the platform is being asked to be the system of record for, not on consumption of any feature axis the vendor would otherwise have an incentive to fragment.

---

## 5. The vocabulary we use for naming the violation

We have so far stated what we hold and what we hold to follow. To say cleanly what we refuse — and to engage the architectural surface of the dominant pattern as evidence of the violation — we need names for the failure modes the doctrine commits to preventing. This section provides those names. The vocabulary is diagnostic; it is not the contribution. The doctrine is the contribution; this is the language for naming what the doctrine refuses.

We name six mechanisms by which operational distortion enters the canon:

**Forced fabrication.** The system requires a value the situation does not provide; the operator picks the closest legal answer to keep work moving; the audit trail captures the fabricated value with the same fidelity as every other value, so downstream consumers cannot distinguish it from a faithful entry. Forced fabrication is endemic to ERPs because every required field is, in operational reality, a forced-fabrication risk: situations the modeler did not anticipate must be encoded as situations the modeler did anticipate.

**Schema omission.** The system has no representation for a real-world state at all. The state is recorded outside the system — spreadsheet, side database, whiteboard — or not at all. The official record is silent on a fact the operating staff knows. Behrens and Sedera, asking why shadow systems persist after an ERP implementation, found that the implemented schema does not cover the represented work [14]; Huber et al. found 64% of identified shadow systems were ERP-related [15]. Omission is the mechanism the shadow systems testify to.

**Aggregation distortion.** The system reports technically-correct rolled-up values that mislead the consumer about underlying detail. The dashboard sums the records faithfully; the records contain forced-fabricated values, omitted entries, or items in materially different states collapsed into a single category. The aggregator is not lying; the aggregator does not know what it does not know. Aggregation distortion is what executives experience when the dashboards do not match their intuition about the operation.

**Provenance loss.** The system records a value but loses the chain of decisions that produced it. Six months later, the row says `status = approved`, but no record exists of who approved it, when, or under what set of facts. PCAOB inspections routinely identify "insufficient evidence of management's controls" as a deficiency category [10]; this is provenance loss surfaced by the auditor audience.

**Semantic drift.** The same field, table, or business term comes to mean different things over time, across customizers, across versions, across departments, or across organizational boundaries — without the change being recorded as a change. The data is internally consistent at every moment; it stops referring to the same thing in the world. Sub-types include temporal drift (a field's working definition shifts as people repurpose it), customizer drift (the same nominally-similar custom field means different things at different customers), version drift (vendor renames or restructures fields between releases), departmental drift (the same field used by sales, finance, and operations with subtly different conventions), and cross-organizational drift (buyer and supplier use the same shared term with different boundaries).

**Silo divergence.** The same business object exists in multiple stores with no single authoritative copy. The two copies disagree; the disagreement is resolved by convention, by the most recent writer, or by a human, but never by the architecture. Silo divergence is widespread in current ERP architectures because the dominant pattern bundles modules around object types (sales operates against its Customer object, service against its Customer object, finance against its Customer object, etc.), with cross-module synchronization performed by integration middleware after the fact.

We use these six names in Section 6 to characterize what current vendors do that the doctrine refuses, and in Section 9 to characterize the gaps in our own implementation.

---

## 6. What current vendors do that the doctrine refuses

This section surveys the dominant ERP architectures by the doctrine's standard. The purpose is not to attack vendors. The purpose is to document, with primary citations to vendor documentation, that the doctrine is presently violated industry-wide — that no major vendor in the dominant pattern ships an architecture that holds the eight commitments in Section 3. The violations follow recognizable patterns, several of which are universal across the surveyed vendors.

The vendors surveyed are SAP S/4HANA, Oracle Fusion Cloud ERP, Microsoft Dynamics 365 Finance & Operations, Microsoft Dynamics 365 Business Central, Oracle NetSuite, Workday Financials, Infor CloudSuite, Epicor Kinetic, Acumatica, IFS Cloud, and Odoo (open source, included as a comparator). The full per-vendor evidence is maintained as a working appendix; the synthesis below identifies five recurring violations.

### 6.1 Audit logging is application-layer convention, not database enforcement — universal.

Section 3.2 commits to append-only audit at the data layer. No surveyed vendor implements this. Across all eleven, audit logging is a configurable application-layer feature with documented bypasses.

NetSuite documents an administrator preference, *Log System Notes on Update Only*, that prevents NetSuite from logging system notes when records are created — only updates produce audit entries [16]. A separate CSV import preference disables audit-trail entries for custom fields specifically: "If you turn off system-generated notes for custom fields, specific changes related to custom fields within the imported record are not recorded in NetSuite, although all changes for standard fields are logged as usual" [17]. The line-level audit trail is restricted to updates: "The line-level audit trail only tracks updates to existing line items, not their creation or deletion" [18].

Oracle Fusion permits administrators to set the Audit Level to None per object: "If you don't want an object to be audited, you can stop the audit process by setting the Audit Level option to None ... When you remove an attribute from the list, you stop auditing it even when the parent object is selected for audit" [19].

Acumatica's field-level audit is opt-in (enable per feature, configure per screen and per field) and not retroactive: "dates will be tracked only from the date the new audits are configured forward, not for historical documents that posted before audits were configured" [20]. IFS Cloud's history log is configured per Logical Unit and per column [21]. Epicor Kinetic ships with no comprehensive built-in audit; customers build audit trails using BPM Data Directives, with the implication that audit completeness becomes a customer-implemented feature [22, 23]. Odoo's tracking is opt-in via the `tracking=True` field attribute, only for models inheriting from `mail.thread`, and is bypassed by direct SQL or non-ORM writes: "Tracking is triggered through the Odoo ORM when records are modified using the standard write() method, but direct SQL updates, bulk imports that bypass the ORM, or certain low-level API calls will not trigger tracking" [24].

SAP S/4HANA records change documents in the CDHDR (header) and CDPOS (positions) tables, but field-level audit is opt-in at design time: "Change Document entry is only possible if the field of the database table is assigned a data element because you can only enable Change Document at data element level" [25]. SAP Knowledge Base article 2925251 documents a known consequence: "BP - Change History does not show changes for LFA1 or KNA1 table, only for BUT* tables" [26] — meaning the legacy customer/vendor tables are not audited even when the unified Business Partner is.

The doctrine commits to audit as substrate — a property of the data layer that no role, no batch tool, and no preference can disable. The dominant pattern ships audit as a configurable feature. The violation is universal.

### 6.2 One business object exists in many physical representations — common.

Section 3.4 commits to one database, one schema, no silos. The dominant pattern admits silos as a design feature, frequently within a single vendor's product family.

SAP's Business Partner unification: from S/4HANA release 1709 onward, the Business Partner object is the leading representation for what was previously stored separately in KNA1 (customers) and LFA1 (vendors); the Customer/Vendor Integration (CVI) layer maintains backward-compatible writes into the legacy tables [27, 28]. The unification is real but incomplete: "code that references KNA1 or LFA1 for customer/vendor master data will not update properly in S/4 unless redirected through BP APIs or tables" [28]. Two physical representations, one logical object, with the migration cost borne per customer.

Microsoft's Dynamics architecture exhibits the same pattern across product boundaries. Dynamics 365 Finance & Operations stores customer master data in the `CustTable` object; Dynamics 365 Customer Engagement uses Dataverse with separate Account and Contact entities; Business Central is a third data layer. Cross-product synchronization is bidirectional and asynchronous. Same logical Customer; three physical representations.

Infor CloudSuite, assembled through acquisition, contains products (CloudSuite Industrial / SyteLine, M3, LN) that each maintain their own Customer concept; cross-product mediation is performed by Infor ION using Business Object Documents [29]. ION exists precisely because the underlying products do not share a schema.

By contrast, Odoo unifies customers, vendors, and contacts under a single `res.partner` model; from v13 onward, the customer/vendor distinction is captured by `customer_rank` and `supplier_rank` integer fields rather than booleans, allowing a single partner to be both [30, 31]. NetSuite uses a single `customer` record type across CRM, Sales, AR, and Service. Acumatica, Epicor Kinetic, IFS Cloud, and Workday Financials are likewise structurally unified at the operational layer for the Customer object specifically.

The taxonomic implication is clear: silo divergence is not equally distributed across vendors. Architectures that grew through acquisition (Infor) or maintain cross-product compatibility surfaces (SAP, Microsoft) carry it as a structural feature; architectures designed greenfield around a unified model (Odoo, NetSuite) avoid it for the unified objects. The trade-off is well documented but rarely framed in distortion terms — the vendors that pay the silo-divergence cost gain product breadth; the vendors that avoid it gave up some breadth in exchange.

### 6.3 Customization is segmented into "blessed" surfaces with implicit limits — universal.

Section 3.1 commits to a single canonical model. Every surveyed vendor, by contrast, publishes a customization model whose explicit capabilities are documented and whose implicit limits the customer discovers mid-implementation.

Acumatica distinguishes Attributes (limited to leads, opportunities, customers, and inventory items), User-Defined Fields (where attributes are not supported), and Custom Fields (required for line-level grid customization) — three mechanisms whose applicability boundaries are non-obvious [32, 33].

SAP S/4HANA Cloud Public Edition restricts extensibility to Key User Extensibility plus SAP-released Cloud BAdIs; classic ABAP exits are unavailable [34]. SAP Knowledge Base article 2793752 documents that "SAP S/4HANA Cloud Public Edition does not provide any SSCUI/Configuration Activity to make fields mandatory, optional, or hidden in the App Manage Product Master Data" [35]. The complaint pattern surfaces in multiple SAP Community threads where customers attempt to enforce mandatory-field rules where the standard configuration provides no hook.

Microsoft Dynamics 365 Business Central restricts table extension to tables with the `Extensible` property set to true; system and virtual tables cannot be extended [36]. Per-tenant extensions cannot have the same top-level object declared multiple times or fields with the same name defined multiple times [37], producing a known upgrade-time conflict surface when a per-tenant extension adds a field that Microsoft later adds to the base table.

Workday's customization model is calculated fields, custom report fields, and business processes — no code against the database. Calculated fields are bound to a Calculated Field Business Object at creation, and the binding cannot be changed: "Business object selection cannot be changed after creation, and if you select the wrong object, you must delete and recreate the calculated field" [38].

NetSuite documents that "Not all fields in the SuiteScript Records Browser can be set using SuiteScript, as some fields are read only. Generally, if you can set a field in the UI, you can set it using SuiteScript, and if you cannot set a field in the UI, you cannot set it using SuiteScript" [39]. The vendor's editorial decisions about which fields are writable propagate into the customer's integration surface.

Every vendor says: you can extend the schema. Every vendor also has a list of things you cannot extend. Customers consistently underestimate the segmentation until they encounter it. The doctrine's response is to refuse customer-side schema extensibility entirely, on the ground that the only honest version of "extensible schema" is one that does not seed customizer drift.

### 6.4 State engines are per-object, not global — common.

Section 3.3 commits to a state engine that governs every transition. Among the surveyed vendors, only Workday operates a single suite-wide workflow engine — the Business Process Framework — that governs every action that creates, updates, or deletes a business object across modules. The other ten implement state transitions per business object type.

SAP distinguishes system status (predefined, unchangeable) from user status (configurable per status profile), with profiles defined per object type — production orders, sales orders, maintenance orders each have their own [40]. SAP Business Workflow is a separate engine used for approval routing rather than record-status transitions [41]. NetSuite's SuiteFlow is per record type [42]. Microsoft Dynamics has separate workflow frameworks for Finance & Operations, Customer Engagement, and Business Central. Acumatica governs state via per-entity Customization Project mechanisms. Odoo state is a Selection field per model, with transitions implemented in business methods (the legacy workflow engine was removed in v9; transitions are now plain Python method calls) [43, 44].

The taxonomic implication is direct: when operators describe a current ERP as "rigid," they typically mean a specific object type's state machine forbids a specific transition, not that the system as a whole is unyieldingly governed. The distortion responses (workarounds, side-channel updates) cluster around specific object types whose state machines least accommodate the variation in their lifecycle in the field. The doctrine's response is to extend governed state to every business object on a single substrate, not to govern some object types thoroughly and others by convention.

### 6.5 Event-driven integration is additive, not foundational — universal.

Section 3.5 commits to operational store and analytical surface as the same data. For every surveyed vendor with a transactional architecture (SAP, Oracle Fusion, NetSuite, Dynamics 365 F&O, Acumatica, IFS, Epicor), the underlying transaction layer is request/response or batch. Event mesh, Synapse Link, NetSuite Analytics Warehouse, IFS Streams, Acumatica Push Notifications, SAP Advanced Event Mesh — these are overlays that capture changes and republish them downstream, with documented latency or refresh-cadence caveats.

SAP S/4HANA gained native support for Advanced Event Mesh in release 2308 (2023) [45, 46]; event-driven integration is an additive layer, not the foundational pattern. NetSuite Analytics Warehouse runs on a default 24-hour refresh; the "Frequent Data Refresh v2" capability is an enhancement reserved for Premium and Enterprise tiers. Microsoft's BYOD (Bring Your Own Database) export is documented by partner sources as carrying "high latency from batch-based exports that result in stale data" [47]; Synapse Link for Dynamics is the event-streaming alternative.

Workday and Odoo are partial exceptions. Workday is event-driven internally to its in-memory object model but exposes a relatively limited external event-streaming surface. Odoo has no native event-streaming layer; the Odoo Community Association provides webhook and Kafka modules.

The doctrine commits to the operational and analytical surfaces being the same data, observable in real time by every consumer that has the right to observe it. The dominant pattern offers real-time observation as an additive product line at additional cost. The dashboard, by default, lags the operation.

---

## 7. What we refuse

Each architectural commitment in Section 3 implies a corresponding rejection. We name the rejections explicitly because doctrines are clearer about what they reject than about what they affirm, and because the rejections together name a position recognizable by anyone in the field.

**Customer-side configurability of schema and code.** Refused because it creates truths only the configurer knows. The audit log does not capture what the configurer's custom code meant. Six months later the custom code breaks during an upgrade; the meaning quietly drifts. Canon does not survive customer-side schema extensibility. Customization belongs to data; not to schema or code.

**Per-module pricing.** Refused because it incentivizes the customer to deploy fewer modules, which directly produces silo divergence. A canon-maintaining vendor cannot sell its parts separately because the parts are not separately useful for canon maintenance.

**Per-seat pricing.** Refused because it punishes inclusion. Every operator who could read the canon and act on it, but doesn't, because their seat costs the organization $X per year, is a hole in the canon's coverage.

**Partner-led implementation as the primary delivery model.** Refused because the vendor that cannot deploy its own product directly cannot be answerable for the model of canon being delivered. Provenance for "why is this cell modeled this way" is lost at handoff.

**Audit as a configurable feature.** Refused because optional logging is provenance loss waiting to happen. Audit must be substrate; if it can be turned off, it has not been built.

**Periodic-architecture analytical layer.** Refused because the moment the operational store and the analytical store are different stores, the analytical store is a stale projection of operational reality. The dashboards will not match the floor.

**The "ERP improves controls" lineage as currently constituted.** Refused not because internal-control improvement is a wrong goal but because the empirical literature making this claim (engaged in Section 8) studied an architectural environment that is now two decades obsolete. Continuing to cite the claim against current architectures is a category error.

These rejections are coherent because they all serve the same purpose. None are independently chosen.

---

## 8. The standing counter-position

The strongest empirical counter-position to the doctrine is Morris (2011), which examined firms that implemented ERP between 1994 and 2003 and concluded that ERP-implementing firms were *less* likely to report internal control weaknesses than a matched sample of non-ERP-implementing firms [12]. The finding holds, in Morris's analysis, for both general entity-wide controls and individual account-level controls, and is the standard citation invoked by ERP vendors who claim that ERP improves rather than creates control deficiencies.

A doctrine that argues current ERP architectures *create* failure modes must engage Morris head-on. We engage in two ways.

On selection. Firms that successfully implemented ERP between 1994 and 2003 are a non-random sample of all firms. The implementation was structurally more difficult in that period than it is today; the firms that completed it had the resources to undertake it, the management discipline to finish it, and the disclosure environment to report the post-implementation control state. The matched control sample is matched on observables, not on the unobservables that selected firms into the treatment. Morris's finding is consistent with the simpler interpretation that the firms with sufficient resources and discipline to implement ERP between 1994 and 2003 are the firms whose internal controls were already better than a matched non-ERP sample. The ERP did not make them better; the same characteristics that made them able to implement ERP made them better controlled.

On currency. Morris's data window is 1994 to 2003, which predates the dominant cloud / SaaS ERP architecture, the dominant low-code customization model, and most of the integration-platform-as-middleware industry. The 2024 ERP architectural environment does not match the architectural environment Morris studied. Newer IT-internal-control-material-weakness research [49] complicates the simpler version of the Morris finding by examining failure modes that are specific to the post-2010 architectural environment.

We do not claim Morris was wrong. We claim Morris's finding does not generalize to the architectural environment this doctrine names. The position-paper-internal version of the engagement is: *Morris is the one finding any honest doctrine in this space has to engage. We engage on selection and currency. The doctrine and the architectural commitments in this paper apply to architectures shipped after roughly 2010, not to the architectures Morris studied.*

---

## 9. Where we do not yet meet the standard

The architecture above describes what we hold the platform should commit to. Some of these commitments are presently met in Yggdrasil. Several are aspirational in degree, even where they are correctly implemented in design. A doctrine that does not name its unmet standards is just marketing. We name the gaps explicitly, because the standard the operational canon sets is harder than any current ERP fully delivers — including ours.

**No production customers at sustained scale.** The platform has been built with this purpose in mind. It has not yet been operated at sustained production scale by a real customer. The architectural claims survive scrutiny on paper and in the validation cohort being assembled; they have not yet survived a year of a real organization writing to them daily. Until they do, every commitment above carries an implicit *in design* qualifier.

**Audit enforcement is application-level convention, not yet database-level structure.** The Repository layer is the only path *by application discipline*. A developer with direct PostgreSQL write privileges could bypass it. Database-level audit triggers — the structural enforcement that would make the audit guarantee true regardless of caller — are on the roadmap, not in production. Today the canon's audit posture rests on application convention plus the fact that no actor has reason to write outside the Repository. That is sufficient; it is not yet structural.

**State-engine coverage is broad but not universal.** The constraint engine governs the major lifecycle transitions — order confirmation, work-order release, invoice posting, NCR opening, the document-status changes that matter to compliance. Some operational mutations (configuration updates, tenant settings changes, certain master-data edits) still happen by direct field update without traversing the state engine. OPE (Operational Policy Enforcement), the runtime policy layer now shipped over that constraint engine, is the mechanism that closes this: it brings evidence-bound, role-aware enforcement to the transitions the engine governs, so the remaining work is routing those still-ungated mutations through it rather than building new enforcement. That work is incremental and ongoing.

**Cross-tenant canon is event-coherent, not single-instance.** Within a Yggdrasil tenant, the canon lives in one database. *Across* tenants, the canon lives in the shared semantic vocabulary plus the event coherence the B2B Event Hub provides. That is meaningfully better than vendor-mediated EDI or partner-by-partner integration, but it is not a literally shared physical canon. Two tenants who disagree about a shipment's state will discover the disagreement, but the discovery happens through event reconciliation, not by reading the same row.

**The general-ledger posting framework is incomplete.** The finance module has accounts, AR, AP, banking, and explicit endpoints wiring operational events to invoices and bills. It does not yet have a generalized posting framework — automated journal entries by configurable mappings, intercompany handling, multi-currency settlement at scale. For a customer above roughly $50M revenue with serious finance complexity, the canon claim is currently incomplete in finance. This is the single most credible objection to Yggdrasil at the mid-enterprise tier and the path to closing it is years of work.

**Jormungandr is built, but not yet proven against a real external system.** Canon enforcement against drift, against external systems that do not share our discipline, and against the canonical model's own version evolution is a role we have now implemented rather than merely named. Jormungandr is a developed product on the platform, and it is the standalone expression of OPE: the same operational-policy enforcement Yggdrasil applies to its own transitions, turned outward as a product that governs systems that are not Yggdrasil. It carries canon governance, state-model and transition definitions, and contract emission. What it has not yet done is govern one in production. Inside a Yggdrasil deployment, the canon's structural integrity still rests on the architectural properties already named: Mimisbrunnr being the schema everyone runs, the Repository being the only write path, the constraint engine governing transitions, the single shared database refusing per-module silos. Jormungandr extends that integrity outward to the systems a customer cannot replace. The code exists; the production track record against external systems does not yet.

**The Audit Authority warranty is structurally novel and not yet underwritten by experience.** The pricing tier exists in the contract template and in the published pricing surface. We have not yet engaged a customer at this tier, have not finalized which regimes we can credibly stand behind in operational detail, and have no formal insurance backstop should a claim arrive within the warranty period. The first customer to elect Audit Authority will be doing pioneering work alongside us, and we have priced accordingly. The warranty is real; the operational machinery for honoring it is in development.

**Mimir Labs is small.** As of this draft, the company is one founder, building with leverage from AI-augmented development. The canon-maintenance discipline scales with the team that maintains it. The architecture is designed to require a smaller maintenance team than mainstream ERPs, but "smaller" is not "one." Hiring is on the immediate roadmap; until it happens, the bus factor is real and worth pricing into the procurement decision.

These are not arguments against the doctrine. They are arguments for procurement honesty. The standard the operational canon sets is harder than any current ERP fully delivers, including this one. We make architectural and commercial choices that move toward the standard. We are not claiming to have arrived.

---

## 10. The commitment

We hold that enterprise software's purpose is to maintain the operational canon. We hold that the dominant ERP architecture pattern was built for a different purpose, and that the gap between the two is what produces the failure modes the IS, analyst, and auditor literatures have been documenting for a quarter-century. We hold that closing the gap requires the eight architectural commitments in Section 3 and the commercial commitments in Section 4. We hold that no major vendor in the dominant pattern presently meets these commitments. We hold that our own implementation does not yet meet them at the standard our own doctrine demands.

We are building Yggdrasil ERP and the surrounding Mimir Labs platform — Mimisbrunnr as the canonical vocabulary, Ratatosk to surface the canon hidden in existing data, Ragnarok to migrate it, Bifrost to keep it aligned across systems we cannot replace, Norn to extend it into the contract layer, Jormungandr (the standalone expression of OPE) to enforce it against drift across versions and external systems — as our attempt to instantiate the doctrine.

We commit to:
- *Naming the unmet standards.* The Section 9 list is part of our public posture. We update it as the gaps close and as we discover new ones.
- *Refusing the rejections in Section 7.* We will not introduce per-seat pricing because a customer pressures us; we will not introduce per-module pricing because it would simplify a sales conversation; we will not outsource implementation because the partner channel would be a faster path to revenue. Each of these refusals has a financial cost. We accept it.
- *Owning the regulatory downside* when a customer elects the Audit Authority warranty tier and a failure traceable to our system produces an audit finding. Most vendors charge more for serving regulated customers without accepting any of the regulatory exposure. We refuse that arrangement.
- *Publishing the doctrine, the rejections, and the unmet standards together,* because the rejections and the unmet standards are part of the doctrine, and because no one in the field is in a position to evaluate the doctrine if they only see the part that flatters us.

We invite the field to commit, or to oppose. The 87% replacement-intent figure Gartner reports is a measure of how much demand exists for ERP vendors who can complete the work. The smaller number — vendors who have completed it — is the empirical question this paper does not answer. The doctrine is one position; the architectural commitments are eight specific ones; the rejections are seven. The implementation, against real customer load, is the next step — and the harder one.

We hold that it is the right step. We are building toward it. We name the standard publicly so that the field, the customers, and our future selves can hold us to it.

---

## References

[1] Davenport, T. H. (1998). Putting the Enterprise into the Enterprise System. *Harvard Business Review*, 76(4), 121–131.

[2] Markus, M. L., & Tanis, C. (2000). The Enterprise System Experience — From Adoption to Success. In R. W. Zmud (Ed.), *Framing the Domains of IT Research: Glimpsing the Future Through the Past* (Chapter 10, pp. 173–207). Pinnaflex Educational Resources.

[3] Strong, D. M., & Volkoff, O. (2010). Understanding Organization-Enterprise System Fit: A Path to Theorizing the Information Technology Artifact. *MIS Quarterly*, 34(4), 731–756.

[4] Boudreau, M.-C., & Robey, D. (2005). Enacting Integrated Information Technology: A Human Agency Perspective. *Organization Science*, 16(1), 3–18. doi:10.1287/orsc.1040.0103

[5] Torii, D. (2024, May 10). *What IT Leaders Must Do to Avoid Disappointing ERP Initiatives*. Gartner Research, Document ID G00812598. https://emt.gartnerweb.com/ngw/globalassets/en/chief-information-officer/documents/what-it-leaders-must-to-do-to-avoid-disappointing-erp-initiatives.pdf

[6] Panorama Consulting Group. (2023). *The 2023 ERP Report*. https://4439340.fs1.hubspotusercontent-na1.net/hubfs/4439340/Reports/ERP%20Report/2023-ERP-Report-Panorama-Consulting.pdf

[7] Panorama Consulting Group. (2024). *The 2024 ERP Report*. https://4439340.fs1.hubspotusercontent-na1.net/hubfs/4439340/Reports/ERP%20Report/2024-erp-report-panorama-consulting-group.pdf

[8] Panorama Consulting Group. (2025). *The 2025 ERP Report*. https://4439340.fs1.hubspotusercontent-na1.net/hubfs/4439340/Reports/ERP%20Report/2025-ERP-Report-Panorama-Consulting.pdf

[9] Panorama Consulting Group. (2026). *The 2026 ERP Report*. https://4439340.fs1.hubspotusercontent-na1.net/hubfs/4439340/Reports/ERP%20Report/2026-erp-report-panorama-consulting-group.pdf

[10] PCAOB. (2025, March). *Staff Update: 2024 Inspection Activities Spotlight*. https://pcaobus.org/documents/staff-update-2024-inspection-activities-spotlight.pdf

[11] Protiviti. (2024). *Empowering the Progress of SOX Innovation With Analytics and Automation* (2024 SOX Compliance Survey). https://www.protiviti.com/sites/default/files/2024-08/empowering-sox-innovation-protiviti_global.pdf

[12] Morris, J. J. (2011). The Impact of Enterprise Resource Planning (ERP) Systems on the Effectiveness of Internal Controls over Financial Reporting. *Journal of Information Systems*, 25(1), 129–157.

[13] Shi, J., Zhang, T. J., Jin, Z., & Conitzer, V. (2026). From Hallucination to Scheming: A Unified Taxonomy and Benchmark Analysis for LLM Deception. arXiv:2604.04788v1.

[14] Behrens, S., & Sedera, W. (2004). Why Do Shadow Systems Exist after an ERP Implementation? Lessons from a Case Study. *PACIS 2004 Proceedings*, Paper 136. https://aisel.aisnet.org/pacis2004/136/

[15] Huber, M., Zimmermann, S., Rentrop, C., & Felden, C. (2016). The Relation of Shadow Systems and ERP Systems — Insights from a Multiple-Case Study. *Systems*, 4(1), Article 11. https://www.mdpi.com/2079-8954/4/1/11

[16] Oracle NetSuite. *Viewing an Audit Trail for a Record Type*. NetSuite Help Center. https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N675070.html

[17] Oracle NetSuite. *Setting CSV Import Preferences*. NetSuite Help Center. https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N355760.html

[18] Oracle NetSuite. *Line-Level Audit Trail for Transactions*. NetSuite Help Center. https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N557476.html

[19] Oracle. *Set Up Auditing for Oracle Fusion Applications*. https://docs.oracle.com/en/cloud/saas/applications-common/24d/facia/set-up-auditing-for-oracle-fusion-applications.html

[20] Net at Work. *Acumatica Cloud ERP Tips: Setting up Audit History within Acumatica*. https://netatwork.com/setting-up-audit-history-within-acumatica-erp/

[21] IFS. *History Log*. IFS Cloud Technical Documentation. https://docs.ifs.com/techdocs/24r2/030_administration/120_monitoring/010_history/010_history_log/

[22] Epicforce Tech. *Track Changes in Epicor BPMs Easily*. https://epicforcetech.com/audit-trails-with-epicor-bpms-how-to-track-changes-without-custom-code/

[23] Epicor User Help Forum. *Does Epicor have an audit trail feature?* https://epiusers.help/t/does-epicor-have-an-audit-trail-feature/38829

[24] Dasolo. *Odoo Tracking Field: Monitor Record Changes and Build Audit Trails*. https://dasolo.ai/blog/odoo-data-api-5/odoo-tracking-field-explained-127

[25] Techlorean. *Utilizing CDHDR and CDPOS SAP Tables for Change Logs*. https://techlorean.com/2021/02/28/utilizing-cdhdr-and-cdpos-sap-tables-for-change-logs/

[26] SAP. Knowledge Base Article 2925251. https://userapps.support.sap.com/sap/support/knowledge/en/2925251

[27] SAP. Knowledge Base Article 2662616 — *S/4 HANA Data Migration error in LFA1/KNA1 table*. https://userapps.support.sap.com/sap/support/knowledge/en/2662616

[28] SAPinsider. *Tips for Business Partner Adoption for SAP S/4HANA*. https://sapinsider.org/articles/tips-for-business-partner-adoption-for-sap-s-4hana/

[29] Visual South. *Syteline Integration: How to Make Infor CSI ERP Work with Existing Systems*. https://visualsouth.com/blog/infor-cloudsuite-industrial-integrate-existing-systems

[30] Technaureus. *Odoo res.partner Concept on Odoo 18*. https://technaureus.com/blog-detail/odoo-partner-respartner-concept-2

[31] Dasolo. *The res.partner Model: Odoo's Contact Architecture Explained*. https://dasolo.ai/blog/odoo-data-api-5/odoo-res-partner-model-guide-154

[32] Acumatica Community. *Attributes, User Defined Fields and Custom fields*. https://community.acumatica.com/develop-customizations-288/attributes-user-defined-fields-and-custom-fields-8076

[33] Acumatica. *Customization Guide* (PDF). https://acumatica.com/media/2020/02/AcumaticaERP_CustomizationGuide.pdf

[34] SAP Learning. *Using the Key-User In-App Extensibility Tools in SAP S/4HANA Cloud Private Edition*. https://learning.sap.com/courses/implementing-sap-s-4hana-cloud-private-edition/

[35] SAP. Knowledge Base Article 2793752. https://userapps.support.sap.com/sap/support/knowledge/en/2793752

[36] Microsoft Learn. *Table extension object - Business Central*. https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-table-ext-object

[37] Microsoft Learn. *Upgrading Per-Tenant Extensions that conflicts with other extensions*. https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/upgrade/upgrade-pte-merge-conflict

[38] UBC CIO. *Workday Calculated Fields Report Standard*. https://cio.ubc.ca/data-governance/policies-standards-guidelines/report-standards/workday-calculated-fields-report

[39] Oracle NetSuite. *Using SuiteScript to Set Values for Custom Segment Fields*. https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4570062208.html

[40] SAP Learning. *Configuring Status Profiles for Production Orders*. https://learning.sap.com/courses/configuring-sap-s-4hana-cloud-public-edition-manufacturing-execution/configuring-status-profiles-for-production-orders

[41] SAP Learning. *Explaining Workflow at SAP and in SAP S/4HANA*. https://learning.sap.com/courses/sap-workflow-overview-basics-strategy-and-extensibility/explaining-workflow-at-sap-and-in-sap-s-4hana

[42] Oracle NetSuite. *SuiteFlow Overview*. https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4068260113.html

[43] Odoo Forum. *Odoo 10: how to change the state of workflow under condition*. https://odoo.com/forum/help-1/odoo-10-how-to-change-the-state-of-workflow-under-condition-132061

[44] Odoo Forum. *[workflow] Adding a custom state and transition to Sales Order (Quotation)*. https://odoo.com/forum/help-1/workflow-adding-a-custom-state-and-transition-to-sales-order-quotation-73410

[45] SAP Community. *SAP S/4HANA integration with SAP Integration Suite, Advanced Event Mesh*. https://community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/sap-s-4hana-integration-with-sap-integration-suite-advanced-event-mesh/ba-p/13577271

[46] SAP Architecture Center. *Designing Event-Driven Applications*. https://architecture.learning.sap.com/docs/ref-arch/fbdc46aaae

[47] Hitachi Solutions. *Bring Your Own Database (BYOD) for Dynamics 365 Finance & Operations*. https://global.hitachi-solutions.com/blog/bring-your-own-database-for-dynamics-365-finance-operations-part-1/

[48] Mimir Labs. (2026, April). *The Operational Canon*. https://mimirlabs.net/essays/operational-canon

[49] Author manuscript: *Information Technology Internal Control Material Weaknesses in Financial Reporting: Categories, Trends, Associations, and Industry Effects*. *International Journal of Accounting Information Systems* (2024). https://www.sciencedirect.com/science/article/am/pii/S1467089524000125

---

*Comments and corrections to the author. The doctrine, the architectural commitments, the rejections, and the unmet standards are intended to be a public posture maintained over time. Subsequent revisions will be tracked.*
