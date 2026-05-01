# Outline — ERP Operational Distortion paper

**Working title:** *From Workaround to Misrepresentation: A Unified Taxonomy and Vendor Analysis for ERP Operational Distortion*

**Genre:** Synthesis / position paper. Not original empirical research. Inductive taxonomy validated by survey of existing analyst data + vendor documentation. Direct structural analog to Shi et al. 2026 ("From Hallucination to Scheming") but for enterprise software instead of LLMs.

**Target length:** ~12–18 pages + appendices. arXiv-shaped.

**Target venue (in order):** arXiv preprint (`cs.SE`, `cs.HC`, or `cs.DB`), then *ACM Queue* or *IEEE Software* for practitioner reach, then a workshop submission at ICSE/FSE or VLDB Industrial Track.

---

## Section 1 — Introduction (~2 pages)

**Move:** Frame the problem; position against existing ERP-failure literature.

**Core argument structure:**
- Multiple research and analyst communities document ERP failure modes — implementation overruns (Panorama), customization-driven cost escalation (Gartner), workaround behavior (Strong & Volkoff IS literature), data quality degradation (Wand & Wang), audit findings (PCAOB / Big-Four reports). Each community frames its observations in its own vocabulary.
- These are not separate phenomena. They are downstream symptoms of a common upstream cause: ERP architectures **systematically induce operational distortion** as a side-effect of design choices made when the architectural primary purpose was record-keeping for month-end close, not real-time operational truth.
- We propose a unified taxonomy of operational distortion, organized along three axes plus an audience cross-cut, that explains the observations these communities each describe in isolation and identifies which architectural mechanisms produce which failure modes.

**Citations needed:**
- Panorama Annual ERP Report (most recent — 2024 or 2025 edition) — implementation success rates, customization rates, cost overrun rates, satisfaction scores
- Gartner Magic Quadrant for Cloud ERP (most recent) — vendor scoring, market context (cite sparingly due to paywall)
- Davenport (1998) "Putting the Enterprise into the Enterprise System" — foundational HBR piece
- Markus & Tanis (2000) "The Enterprise System Experience" — staged ERP failure model
- Strong & Volkoff (2010) "Understanding Organization-Enterprise System Fit" — workaround behavior
- Wand & Wang (1996) "Anchoring Data Quality Dimensions in Ontological Foundations" — IS data quality framework
- Shi et al. (2026) — explicit structural analog for our taxonomy

**Position statement:** This is not a critique of any specific vendor. It is a structural account of why the dominant ERP architecture pattern produces the failure modes that the analyst literature has documented for decades.

---

## Section 2 — A Taxonomy of Operational Distortion (~3 pages)

**Move:** Present the framework. This is the paper's primary intellectual contribution.

### 2.1 Three axes

**Axis 1 — Mechanism** (how distortion enters the canon):
- **Forced fabrication:** the system demands a value the situation does not provide; an operator types a "best-fit" answer to keep work moving.
- **Schema omission:** the system has no representation for a real-world state; the state is recorded somewhere outside the system or not at all.
- **Aggregation distortion:** the system reports technically-correct rolled-up values that mislead the consumer about underlying detail.
- **Provenance loss:** the system records a value but loses the chain of decisions that produced it; "who said this and why" is unrecoverable.
- **Semantic drift:** the same field, table, or business term comes to mean different things over time, across customizers, across versions, across departments, or across organizational boundaries — without that change being recorded as a change. The data is internally consistent at every moment; it stops referring to the same thing in the world. Sub-types:
  - *Temporal drift* — a field's working definition shifts as people repurpose it ("ship_date" originally meant "left the dock," now means "label printed")
  - *Customizer drift* — a custom field "approved_2" means one thing at customer A and a different thing at customer B; the vendor docs describe neither
  - *Version drift* — vendor renames or restructures fields between releases; meaning carried by upgrade scripts and tribal knowledge
  - *Departmental drift* — sales, finance, and operations use the same field with different conventions ("delivered" → handed to carrier vs. signed by customer)
  - *Cross-organizational drift* — buyer and supplier use the same shared term (PO number, shipment ID) with subtly different boundaries; reconciliation reveals the gap
- **Silo divergence:** the same business object exists in multiple stores (modules, departments, subsidiary instances, integrated systems) with no single authoritative copy; reconciliation produces conflict that is then resolved by convention, by the most recent writer, or by a human, but never by the architecture.

**Axis 2 — Object** (what is being misrepresented):
- World state (inventory levels, order status, production progress)
- Capability claims (what the system can / cannot do — surfaced as gaps the operator must fill)
- Provenance & justification (audit trail, decision rationale)
- **Term semantics** (what a field, status, or business noun *means* — and whether two readers agree on it)
- Inter-organizational reality (what the supplier / customer / partner believes about the same shared object)
- Future commitment (what we have promised — production schedules, delivery dates)

**Axis 3 — Structural cause** (where the distortion-pressure originates):
- **Schema rigidity** — the data model can't represent the situation
- **Workflow rigidity** — the state machine forbids the legal-but-unmodeled transition
- **Data silos** (the broader category — *module silo* is one of several sub-types):
  - *Module silos* — within one ERP, modules don't share a physical store; the same `Customer` is two records
  - *Departmental silos* — finance, sales, ops each maintain their own working store (often a spreadsheet) outside the ERP
  - *System silos* — ERP + CRM + WMS + custom apps each carry partial canon; no single store is authoritative
  - *Tenant / instance silos* — multi-tenant SaaS architectures with per-tenant schema divergence; subsidiary deployments running different instances
  - *Acquisition silos* — acquired companies bring their own ERPs that never get retired
  - *Geographic silos* — regional instances run separately for "performance" or "data residency" and never reconcile
- **Customization licensing** — the architectural answer to gaps is per-customer customization, which creates per-customer divergence in canon and is itself a primary source of *customizer drift* (above)
- **Periodic architecture** — batch / ETL design means the canon is always reflecting the past, not the present
- **Vocabulary fragmentation** — no canonical semantic vocabulary across the platform; every module / version / customer carries its own definitions, with no shared anchor against which drift can be detected
- **Definition mutability without record** — schema and field meanings can change without the change itself being audited; semantic drift is invisible by construction

### 2.2 Audience cross-cut

Distortion can be weighted differently depending on who is consuming the canon:
- **Operators** (the people doing the work) — see fabrication and omission first; build workarounds to compensate; the first to feel departmental drift
- **Auditors** (internal + external) — see provenance loss; can't reconstruct decisions; can't tell whether a field's definition was the same when the disputed transaction was recorded as it is now
- **Executives** (dashboards, board reports) — see aggregation distortion; act on rolled-up numbers whose underlying detail is not what it appears; silo divergence shows up as "the numbers from system A don't match the numbers from system B"
- **Counterparties** (suppliers, customers, regulators) — see inter-organizational reality breaks; reconciliation becomes a business function; cross-organizational drift shows up as recurring exceptions on the same business event
- **Future selves** (the same organization three years later) — version drift and customizer drift accumulate; the data the historical-record query returns is structurally indistinguishable from the data current operations are writing, but it no longer means the same thing

### 2.3 Behavioral vs. strategic distortion

**Borrowed directly from Shi et al.** Most ERP distortion is **behavioral** — emergent from architectural choices made for other reasons (closeability, auditability, configurability). It is not anyone's intent to mislead. It happens anyway.

A smaller but more dangerous category is **strategic distortion** — distortion that the system architecturally enables and that some actor instrumentally exploits. Examples: revenue recognition timing manipulated by booking-vs-shipping ambiguity; inventory write-offs hidden across module boundaries; production scrap routed through workaround spreadsheets to keep dashboards green.

This distinction matters because the remediation is different. Behavioral distortion responds to architectural change. Strategic distortion responds to architectural change *plus* governance.

---

## Section 3 — Vendor Architecture Survey (~3-4 pages)

**Move:** Take the taxonomy and apply it to the dominant ERP architectures. This is the empirical spine — and the part that needs the most careful research.

### 3.1 Methodology

- Survey scope: 8–10 dominant ERP platforms by market share (per Gartner / Apps Run The World) — SAP S/4HANA, Oracle Fusion Cloud ERP, Microsoft Dynamics 365 F&O / Business Central, NetSuite, Workday Financials, Infor CloudSuite, Epicor Kinetic, Acumatica, IFS Cloud, Odoo (open-source comparator).
- Sources: vendor schema documentation (where public), official customization / extension guides, partner implementation playbooks, public analyst commentary, vendor-published architecture white papers.
- For each vendor × each taxonomy cell: present, partially-present, prevented? With a one-line citation to source.

### 3.2 Findings table (will become Appendix A)

A matrix: rows = vendors, columns = taxonomy cells. Each cell answers: does this architecture *force*, *allow*, or *prevent* this failure mode?

### 3.3 Summary patterns

**Hypothesized findings to verify in research:**
- All major vendors *force* some flavor of fabrication in at least one common business scenario (e.g., required-field validation that doesn't admit the legal-but-unmodeled answer)
- All major vendors *allow* schema omission via the "extend with custom fields" escape hatch — which becomes its own omission mechanism (every customer's omissions are different) and the dominant production source of *customizer drift*
- Customization licensing turns omission into per-customer divergence: the same vendor's product has materially different canons across two implementations
- Most enterprise architectures *force* silo divergence by design: separate financial data warehouse, separate operational store, separate analytical layer, separate per-region instances. Reconciliation is a permanent business function rather than an architectural property
- Few vendors publish a *canonical semantic vocabulary* — definitions live in field-level documentation that itself drifts version to version. A platform-wide "what does `customer.status = active` mean" reference is the exception, not the rule
- Schema versioning and field-meaning versioning are typically **not** audited at the same fidelity as transactional data; semantic drift is invisible to the same audit machinery that captures every cent
- The few platforms architected with append-only or event-sourced primitives (specific Workday components, parts of Oracle Fusion's accounting engine) *prevent* certain provenance-loss cells but pay for it in other dimensions

---

## Section 4 — Harm Assessment (~2 pages)

**Move:** Quantify the cost of each failure mode using existing analyst data. This is where Panorama et al. carry the load.

**Map analyst-reported symptoms to taxonomy cells:**
- Implementation cost overrun rate → schema-rigidity + customization-licensing structural causes
- ROI realization gap → aggregation distortion + provenance loss (executives can't trace promised benefits to operational reality)
- User satisfaction / "ease of use" score → operator-audience harm
- Audit finding rates / SOX deficiencies → auditor-audience harm; provenance loss + module silo
- Restated earnings / financial-fraud cases → strategic distortion
- Time-to-go-live → schema-rigidity (fitting the business to the schema is the implementation)

**Risk prioritization** (mirror Shi et al. structure):
- **Current measured harm:** behavioral fabrication / omission produces ongoing friction at every operating ERP (universally documented in user satisfaction data)
- **Scaling risk:** strategic distortion under-detected because dominant audit methodology samples transactions, not architectural patterns
- **Tractability:** fabrication-pressure responds to schema work + perpetual-default-projects style remediation; provenance loss responds to append-only design; module silo requires shared-database architecture (the largest lift, smallest installed base)
- **Reversibility:** distortion that has accumulated for years is mostly not reversible without re-implementation

---

## Section 5 — Architectural Prescriptions (~3 pages)

**Move:** What does an *honest-by-construction* ERP architecture look like? Use the operational-canon principles as the worked answer.

### 5.1 Architectural moves the taxonomy implies

Each addresses specific cells:
1. **Single canonical model, no per-tenant schema divergence** — closes the customization-licensing structural cause; eliminates *customizer drift* by removing the per-customer divergence surface
2. **Append-only field-level audit at the data layer, not the application layer** — closes provenance loss across all consumers; provides the substrate against which *temporal drift* can later be detected
3. **State engine governs every transition; no privileged side channel** — closes schema-rigidity-driven fabrication for governed lifecycles
4. **One database, one schema, no per-module / per-department / per-instance silos** — closes the *silo divergence* mechanism at the only level it can be closed: by removing the second store, not by reconciling between two stores. The same `Customer` row is the row sales reads, finance reads, and the auditor reads. There is no second copy to disagree with.
5. **Continuous event surface, not batch ETL** — closes the periodic-architecture structural cause for currency-of-canon
6. **Canonical semantic vocabulary as a first-class platform artifact** — every business noun has one definition, published, versioned, and the same across every module, every tenant, and every consumer of the canon. Closes *vocabulary fragmentation* and gives *cross-organizational drift* a shared anchor. (In Yggdrasil, this is Mimisbrunnr.)
7. **Schema and field-meaning changes themselves audited** — when a field's definition changes, the change is itself a transaction in the audit log, with the new definition, the old definition, the actor, and the timestamp. Closes the *definition mutability without record* structural cause and makes *temporal drift* visible at the moment it happens.
8. **Cross-organizational coherence by event reconciliation, not nightly batch** — counterparties operate against the same shared semantic vocabulary and reconcile state through events that carry the structured payload they describe. Closes *cross-organizational drift* up to the point that two willing counterparties can hold a single coherent picture of a shared object without an intermediary translating in both directions.

### 5.2 Yggdrasil as worked example

One section (not the whole paper). Concrete realizations:
- Mimisbrunnr canonical schema (300+ tables, 17 domains) — the canonical semantic vocabulary in artifact form
- Repository pattern as single mutation path
- ConstraintEvaluator state engine
- `audit_change_log` field-level deltas
- B2B Event Hub for cross-tenant continuous surface — the cross-organizational coherence mechanism
- One physical PostgreSQL database, one shared schema, no per-module / per-department / per-tenant divergence — silo divergence closed at the architectural level rather than reconciled by middleware
- Per-tenant row-level security on the shared schema (no per-customer table proliferation, no per-customer schema, no per-customer custom fields that would seed *customizer drift*)
- Default perpetual projects as universal scoping (closes the recent RFx-housing fabrication-pressure cell — a worked example of taxonomy-driven design)

**Honest gap section** (mirror operational-canon.md):
- What we have not yet done at production scale
- Where the architecture ships honestly but the data behind it is "in design"
- Why this matters: every honest paper in this space has to declare what it has not yet operated through a year of production load

### 5.3 What the prescriptions reject

The same rejections in operational-canon.md, restated in taxonomy-cell language:
- Customer-side configurability → introduces customization-licensing-driven omission
- Per-module pricing → reinforces module silos
- Partner-led implementation → outsources the model-of-truth decision; provenance for "why is this cell modeled this way" is lost at handoff
- Audit as configurable feature → optional logging is provenance loss waiting to happen

---

## Section 6 — Discussion + Research Directions (~1 page)

**Move:** Acknowledge limits, point at open questions.

**Limits of the taxonomy:**
- Inductively derived from analyst literature, not formally complete
- Taxonomy cells are not orthogonal in all cases (forced-fabrication-by-omission is a frequent compound)
- Vendor classification depends on documentation that vendors update; the survey is a snapshot

**Open questions:**
- Empirical question: what is the actual installed-base distribution of architectural patterns across the live ERP market? (Current analyst data does not slice this way)
- Methodological question: can audit methodology be updated to sample architectural patterns rather than transactions? (Implication for SOX assertion design)
- Product question: what is the lift to retrofit existing deployments toward honest-by-construction? Or is this only achievable greenfield?

---

## Section 7 — Conclusion (~0.5 page)

**Move:** Restate the central claim, position the contribution.

The core observation: ERP failure modes documented across multiple research and analyst communities are not separate phenomena. They are coherent symptoms of architectural choices made for a different primary purpose than the one ERPs are now asked to serve. A unified taxonomy makes the structural cause visible and the architectural remediation specifiable. We propose this taxonomy, validate it against existing analyst data, survey current vendor architectures against it, and outline the architectural moves required to address it.

---

## Appendices

**A. Full vendor × taxonomy cell mapping table** (the core empirical artifact)

**B. Glossary** — taxonomy terms with one-paragraph definitions

**C. Reporting template** — for future vendor / implementation classification work using this taxonomy (mirrors Shi et al. Appendix G)

**D. Citations** — full reference list with public/paywalled marking

**E. Yggdrasil-as-example architectural detail** — for readers who want the worked-example specifics

---

## Research-phase deliverables (what the agents need to find)

1. **Panorama Annual ERP Report** — most recent, with specific stats: success/failure rates, average overrun %, customization rates, ROI realization rates, time-to-go-live distribution. Need URL + page reference for each stat. Free PDF, no paywall.
2. **Gartner Magic Quadrant for Cloud ERP** — most recent. Need vendor positioning + market commentary findings, sparingly cited. Paywalled — secondary citations from press coverage acceptable.
3. **Forrester Wave for ERP Suites** — most recent. Same pattern as Gartner.
4. **Davenport (1998) HBR** — primary source for "ERP forces the business to fit the system." Should be available open or via HBR archive.
5. **Strong & Volkoff (2010)** — IS journal for workaround behavior. Should be in JIT or MISQ.
6. **Wand & Wang (1996)** — data quality dimensions, cited often.
7. **PCAOB inspection reports / Big-Four audit reports** — for SOX deficiency rates and patterns. Public.
8. **Vendor schema/customization documentation** — SAP DataModel public docs, NetSuite SuiteScript records browser, Dynamics 365 entity reference, Salesforce object reference, Acumatica API spec, Odoo source. All public.
9. **G2 / TrustRadius user reviews** — for operator-audience quote-level evidence. Public.
10. **Restated-earnings databases / financial-fraud case data** — Audit Analytics is the canonical source but paywalled. Academic-aggregated alternatives exist.

---

*Outline written 2026-05-01. Draft to follow once research is in hand.*
