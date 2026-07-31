# Enterprise Data & AI Capability Benchmark — Annotated Edition

**Mimir Labs, LLC — Research**
**Version 1.1 (annotated) | July 30, 2026**
**Companion to:** *Enterprise Data and AI Capability Benchmark* v1.0 (score matrix adopted verbatim), interactive radar (`erp-vendor-radar.html`), machine-readable matrix (`erp-vendor-benchmark-scores.csv`).

> **Status note (July 31, 2026).** The published scoring instrument is now the **Enterprise Execution Readiness Index 2026** (`Enterprise_Execution_Readiness_Index_2026.pdf`, `eeri-2026-scores.csv`), which expands this benchmark to **11 vendors × 30 conditions in five domains**, adding Infor, Epicor, Sage X3, Acumatica, Odoo, and Rappit, and six architecture-sensitive indexes (authoritative execution surface, pre-commit enforcement universality, policy portability, governance-preserving extensibility, concurrency/stale-state protection, agent observability). Where the two matrices differ, **EERI 2026 governs** — notable updates: Salesforce gains on data indexes via Informatica; SAP/Oracle rise on agent capability; Mimir Labs records the highest unweighted average (18.0, vs. Oracle 17.9 and SAP 17.6) while its shape is unchanged. This annotated edition remains the roadmap and trade-off companion; its per-index reasoning, trade-off register, and roadmap ledger carry over to the EERI framing, and the new EERI conditions land squarely on existing entries (policy portability → the bundle roadmap item; governance-preserving extensibility → trade T3; concurrency/audit → trades T4/T5).

This is Mimir Labs' own reading of the 24-index benchmark. It keeps the v1.0 scores and rubric unchanged and adds what a score matrix cannot carry: *why* each rating is what it is, stated specifically enough to be checked; **where our roadmap intends to outpace the incumbents**; and — just as important — **where a lower score is a deliberate trade, not a gap we failed to notice**. A benchmark that shows us behind on an index we chose to be behind on is working as intended; this document says which indexes those are and what we bought with the trade.

Scores are directional analyst judgments, not vendor-certified benchmarks. Incumbents are evaluated at full-portfolio level (SAP including Datasphere and Business Data Cloud; Oracle including Fusion, OCI, and GoldenGate; Microsoft including Purview, Fabric, Entra, Dataverse, and Copilot Studio; Salesforce including Data 360, MuleSoft, and Agentforce) — not their ERP products in isolation. Mimir Labs is graded on designed and implemented capability, discounted for deployment maturity per the rubric.

---

## How to read each entry

Every index carries a score line and up to four annotations:

- **Incumbent reality** — the specific products and mechanisms behind the incumbent scores. We name them so the ratings are falsifiable; if a named capability is stronger or weaker than described, the score should move.
- **Our position** — why the Mimir Labs score is what it is, including the maturity discounts we accept.
- **Roadmap** — where we intend to *outpace* the incumbents on this index, with the concrete vehicle (a shipped tool, a whitepaper-specified mechanism, or a planned program). Absent when we do not intend to lead on the index.
- **Trade-off** — present only where the score is deliberately lower because we exchanged this capability for one we judged more important. The trade is stated as *what we gave up → what we bought*.

### Scoring rubric (unchanged from v1.0)

| Score | Level | Interpretation |
|---|---|---|
| 0–3 | Absent | No meaningful native capability; substantial custom development required. |
| 4–7 | Limited | Narrow, immature, or highly dependent on external products. |
| 8–11 | Partial | Useful capability, but material gaps in coverage, enforcement, or maturity. |
| 12–15 | Strong | Credible native capability with limitations in breadth, consistency, or deployment. |
| 16–18 | Very strong | Mature and broadly applicable; only bounded gaps remain. |
| 19–20 | Exceptional | Category-leading or architecturally central, with comprehensive native support. |

Evaluation rules: native capability outranks partner/custom capability; mandatory enforcement outranks optional configuration and after-the-fact remediation; architectural design is credited but undeployed capability is discounted for operational maturity.

### Score matrix

| # | Functional condition | SAP | Oracle | Microsoft | Salesforce | **Mimir Labs** |
|---|---|---|---|---|---|---|
| 1 | Canonical semantic model | 18 | 18 | 16 | 17 | **20** |
| 2 | Data discovery | 17 | 16 | 19 | 17 | **18** |
| 3 | Data lineage | 18 | 17 | 20 | 16 | **17** |
| 4 | Master data governance | 20 | 19 | 16 | 18 | **19** |
| 5 | Data quality enforcement | 17 | 17 | 17 | 16 | **20** |
| 6 | Schema governance | 17 | 18 | 17 | 16 | **20** |
| 7 | Semantic interoperability | 18 | 17 | 18 | 17 | **20** |
| 8 | Migration capability | 17 | 17 | 16 | 13 | **16** |
| 9 | Cross-system synchronization | 17 | 17 | 19 | 16 | **17** |
| 10 | Integration breadth | 20 | 19 | 20 | 18 | **11** |
| 11 | Operational workflow | 20 | 20 | 17 | 19 | **18** |
| 12 | ERP transaction depth | 20 | 20 | 14 | 14 | **17** |
| 13 | Manufacturing operational depth | 19 | 18 | 13 | 10 | **18** |
| 14 | AI/agent capability | 18 | 19 | 20 | 20 | **12** |
| 15 | AI business context | 19 | 19 | 18 | 19 | **18** |
| 16 | Agent orchestration | 17 | 19 | 20 | 20 | **12** |
| 17 | AI governance | 18 | 19 | 20 | 19 | **19** |
| 18 | Identity & authorization | 19 | 19 | 20 | 19 | **18** |
| 19 | Pre-write policy enforcement | 15 | 17 | 14 | 15 | **20** |
| 20 | State-transition validation | 16 | 17 | 13 | 14 | **20** |
| 21 | Immutable auditability | 18 | 18 | 18 | 17 | **20** |
| 22 | Deterministic execution | 15 | 17 | 13 | 14 | **20** |
| 23 | Drift detection | 17 | 16 | 19 | 16 | **19** |
| 24 | Human oversight | 19 | 19 | 19 | 19 | **17** |
| | **Average** | **17.9** | **18.0** | **17.3** | **16.6** | **17.8** |

The averages are nearly flat. That is the finding: the incumbents hold broad, even profiles; ours is sharp — 19–20 across the execution-governance and semantics clusters, 11–12 exactly where the incumbents peak. The rest of this document explains each point of that shape.

---

## Cluster A — Data foundation & semantics

### 1. Canonical semantic model — SAP 18 · Oracle 18 · Microsoft 16 · Salesforce 17 · **Mimir Labs 20**

**Incumbent reality.** SAP's semantics are genuinely strong — S/4HANA business objects, Datasphere's business layer, and Business Data Cloud give consistent meaning wherever SAP-managed metadata reaches — but canonicality is distributed across products, generations, and implementation choices; two SAP shops rarely mean the same thing by "order status." Oracle Fusion's unified application data model is the most internally consistent incumbent estate, yet its authority stops at the edge of the Oracle application footprint. Microsoft offers modeling *tools* (Fabric semantic models, Dataverse, Common Data Model) rather than a mandatory ontology; nothing forces the estate to agree. Salesforce's Data 360 metadata is coherent but strongest in the customer domain.

**Our position.** Canonical semantics are the organizing principle of the stack, not a feature: every governed record resolves to a Mimisbrunnr definition (whitepaper 05), and Yggdrasil treats that resolution as authoritative — a consumer cannot opt out of the canon and remain governed. The 20 reflects architectural centrality, not breadth of deployed vocabulary.

**Roadmap.** Hold the lead by keeping the canon *enforced* rather than descriptive as coverage grows. The incumbents' structural constraint — semantic layers that describe rather than bind — is not something they can retrofit without breaking their extensibility models; we intend to keep that gap open permanently.

### 2. Data discovery — SAP 17 · Oracle 16 · Microsoft 19 · Salesforce 17 · **Mimir Labs 18**

**Incumbent reality.** Microsoft leads: Purview's estate-wide scanning, classification, and cataloging cover heterogeneous third-party sources better than anyone else's native tooling. SAP's Datasphere/BDC cataloging is extensive but configuration- and partner-dependent; Oracle's discovery is solid within its own database/analytics estate; Salesforce discovers customer and engagement data well but was not designed to crawl a plant's ODBC estate.

**Our position.** Ratatosk (whitepaper 08) is purpose-built for the part Purview does worst: undocumented operational reality — schemas, BI models, structured exports, spreadsheet lineages, and embedded VBA logic (the OLE2 parser, VBA decompressor, and pattern recognizer extract and classify the automation where shadow operations actually live). The discount from 20 is connector coverage and production deployment breadth.

**Roadmap — intend to outpace.** Purview discovers *data*; Ratatosk discovers *operations* — including the workbook macros and side systems that constitute the real process. As connector coverage grows through pilot engagements, we expect this index to pass Microsoft's 19 for operational (as opposed to analytical) estates.

**Trade-off.** Ratatosk is zero-knowledge (no PII stored) and deterministic (AI-free, human-in-the-loop-authoritative). We gave up cloud-scale ML-assisted classification and persistent central catalogs → we bought an engagement posture a regulated manufacturer can accept without a data-processing negotiation, and findings that are reproducible in an audit.

### 3. Data lineage — SAP 18 · Oracle 17 · Microsoft 20 · Salesforce 16 · **Mimir Labs 17**

**Incumbent reality.** Microsoft's 20 is earned: Purview plus Fabric traces sources → pipelines → models → Power BI end-to-end. SAP lineage is mature wherever SAP-managed metadata exists; Oracle's is mature across database and analytics services but can need extra tooling across vendors; Salesforce sees its own platform well and outside systems less well.

**Our position.** The architecture requires observable, mapped integrations (every Bifrost crossing is registered and evented), so lineage is a structural byproduct rather than a scanning product. But continuous lineage across a *large production connector estate* is not yet demonstrated at incumbent scale — the 17 is an honest maturity discount, not a design gap.

**Roadmap.** Lineage quality tracks connector deployment. As Bifrost estates go to production, governed-boundary lineage (which records *why* a crossing was admissible, not just that it happened) becomes a differentiated artifact Purview cannot produce. We do not expect to beat Purview on breadth of passive scanning; we intend to beat it on the evidentiary value of each recorded hop.

### 4. Master data governance — SAP 20 · Oracle 19 · Microsoft 16 · Salesforce 18 · **Mimir Labs 19**

**Incumbent reality.** SAP Master Data Governance is the category benchmark — domain-rich, mature stewardship workflows, deeply integrated into core processes; the 20 is deserved. Oracle's Fusion-native master-data controls across product, customer, supplier, and financial domains are close behind. Microsoft has no comparably dominant native MDM application (Dataverse plus Purview plus partners is a program, not a product). Salesforce is excellent at customer identity resolution, less complete for manufacturing and finance masters.

**Our position.** The canonical manifest plus Mimisbrunnr give architectural master-data *authority* — a governed record has exactly one canonical identity, by construction. What we lack against SAP MDG is stewardship workflow maturity and deployment evidence; that gap is tooling and time, not architecture.

**Roadmap.** Reach parity with SAP MDG on stewardship ergonomics (queues, merge review, delegation) during the validation-cohort horizon. The structural difference — our masters cannot drift from canon because writes that disagree with it are refused, whereas MDG governs by workflow around an extensible schema — is the long-term wedge.

### 5. Data quality enforcement — SAP 17 · Oracle 17 · Microsoft 17 · Salesforce 16 · **Mimir Labs 20**

**Incumbent reality.** All four incumbents have mature validation and remediation: SAP data-quality services, Oracle application controls, Microsoft's distributed rules across Fabric/Purview/Dataverse/Power Platform, Salesforce validation rules and duplicate management. The shared ceiling is the same in each case: enforcement is *configurable*, distributed across services, and tolerant of downstream-correction patterns — bad data gets in, then gets fixed.

**Our position.** Prevention is the rule, not the aspiration: strict schema validation, no-coercion parsing, and rejection of nonconforming inputs at ingress. A value that does not conform does not commit; there is no "load now, cleanse later" path to protect.

**Trade-off.** We gave up ingestion tolerance — the incumbent pattern where a permissive write path keeps operators unblocked and a cleansing pipeline mops up → we bought a substrate on which a record's presence *is* evidence of its validity, which is precisely the property autonomous consumers require. The cost is real: integrations must conform before they connect (see index 10).

### 6. Schema governance — SAP 17 · Oracle 18 · Microsoft 17 · Salesforce 16 · **Mimir Labs 20**

**Incumbent reality.** Oracle is the strongest incumbent here — database-grade schema control plus Fusion metadata. SAP governs its business objects strongly but three decades of Z-tables, extensions, and product generations defeat uniformity. Microsoft's openness is the point of its platform — and the reason schemas proliferate across Dataverse, lakes, and connectors. Salesforce orgs are well-governed internally but packages and custom objects introduce variation.

**Our position.** A fixed canonical schema, contracts derived from it, and explicit rejection of nonconforming writes. Custom discriminators live as first-class, planner-visible columns in the canon — not side-table UDFs or opaque JSONB.

**Trade-off — the deliberate one.** We gave up freeform customer extensibility — the ability for every customer (and every consultant) to add arbitrary fields and objects → we bought immunity from the misfit → workaround → shadow-system spiral that the ERP literature has documented for twenty-five years and that ultimately destroys the incumbents' semantic scores. Their 16–18 on this index and their extensibility are the *same fact* viewed from two sides; we chose the other side. Where the canon genuinely lacks a concept, the remedy is extending the canon (a governed schema change), not escaping it.

### 7. Semantic interoperability — SAP 18 · Oracle 17 · Microsoft 18 · Salesforce 17 · **Mimir Labs 20**

**Incumbent reality.** SAP's business-object APIs and partner network interoperate broadly across SAP-heavy estates; Microsoft supports more formats and connectors than anyone but leaves conflicting business definitions unresolved — transport-level interoperability, semantic-level ambiguity. Oracle is strong within its estate with less neutral authority outside it; Salesforce's MuleSoft reach is broad but ontology coverage thins outside CRM.

**Our position.** Cross-system mappings must resolve to one canonical representation before data crosses a governed boundary — the interoperability is semantic by construction, which is what the index measures.

**Roadmap — intend to outpace (mechanism already shipped).** The portable policy bundle wire format (whitepaper 12; import/export live in Yggdrasil's RopeService, library export in Jormungandr, cross-tenant migration in Heimdall) extends interoperability from *data* to *policy*: an admissibility rule authored once moves between systems as a signed, versioned artifact. No incumbent can offer policy portability because their governance is distributed across application logic, identity systems, and trust layers with no common representation — this is the interoperability axis on which we intend to be not just ahead but alone.

---

## Cluster B — Integration & operations

### 8. Migration capability — SAP 17 · Oracle 17 · Microsoft 16 · Salesforce 13 · **Mimir Labs 16**

**Incumbent reality.** SAP and Oracle have enormous migration tooling and services capacity — and a documented tendency for projects to preserve or faithfully recreate the source system's semantic inconsistency, because the tooling moves values, not meaning. Microsoft's migration services are broad but portfolio-fragmented. Salesforce's tooling is CRM-adoption tooling, not an operational-system migration stack.

**Our position.** Ragnarok (whitepaper 07) is built around ontology-to-ontology transformation: taxonomy mapping, status mapping, date normalization, orphan detection, gap analysis, and reversible staging — migration as semantic translation rather than bulk transport. Production scale and connector maturity warrant the discount to 16.

**Roadmap — intend to outpace.** Every pilot migration hardens the engine, and Ragnarok/Ratatosk fees credit 1:1 against Yggdrasil activation — the migration tool is the commercial wedge, so it gets production mileage earliest. Target: demonstrable superiority over incumbent tooling on *semantic fidelity* (mapping coverage, orphan rates, post-migration validity) rather than raw throughput.

**Trade-off.** Reversible staging and per-record validation cost speed. We gave up bulk-load velocity → we bought migrations that can be inspected, partially reverted, and defended in front of an auditor mid-project.

### 9. Cross-system synchronization — SAP 17 · Oracle 17 · Microsoft 19 · Salesforce 16 · **Mimir Labs 17**

**Incumbent reality.** Microsoft's transport breadth is exceptional — Power Platform connectors, Fabric pipelines, Azure Integration Services, Event Grid. Oracle GoldenGate is the industry's replication workhorse. SAP Integration Suite and Salesforce MuleSoft/platform events are both mature.

**Our position.** Bifrost synchronizes through CDC listeners, routing tables, conflict resolution, circuit breakers, and dead-letter handling — with the differentiating property that a synchronized change is *policy-conforming*, not merely delivered (the `ropeConsultation` path in the Yggdrasil playbook checks admissibility before a foreign change commits). Implementation maturity and connector breadth trail the incumbents; hence 17.

**Roadmap.** Grow with the playbook inventory (index 10). We will not chase GoldenGate on replication throughput; we intend to lead on *governed* synchronization — the guarantee that no sync path can inject an inadmissible state.

### 10. Integration breadth — SAP 20 · Oracle 19 · Microsoft 20 · Salesforce 18 · **Mimir Labs 11**

**Incumbent reality.** This is the incumbents' strongest ground and the scores say so plainly: SAP's certified ecosystem and business network, Microsoft's 1,000+ connectors, Oracle's application/database/cloud coverage, Salesforce's AppExchange and MuleSoft. Decades of accumulated surface.

**Our position — our largest gap, scored without flinching.** The architecture is vendor-neutral, but the field-tested inventory today is 13 Bifrost playbooks (SAP ECC, Salesforce, NetSuite, Dynamics, Business Central, Epicor, Infor, Acumatica, Sage 100, QuickBooks, Oracle EBS, Teamcenter, Yggdrasil). Thirteen governed integrations against a thousand connectors is an 11, and pretending otherwise would discredit the twenty-point scores elsewhere.

**Roadmap.** Expand playbooks in the order the pilot pipeline demands them — depth-first through the mid-market manufacturing stack, not breadth-first through a connector catalog. We do not intend to reach numerical parity with Azure or MuleSoft, ever.

**Trade-off — the honest statement of it.** We gave up connector count → we bought the property that *every* crossing that exists is observable, canonically mapped, and policy-checked. An ungoverned connector would raise this score and quietly falsify indexes 5, 19, 20, and 21; the refusal to ship one is the whole company thesis applied to its least flattering index.

### 11. Operational workflow — SAP 20 · Oracle 20 · Microsoft 17 · Salesforce 19 · **Mimir Labs 18**

**Incumbent reality.** SAP and Oracle model end-to-end enterprise processes — finance, supply chain, manufacturing, HR, service — with a depth that reflects decades of encoded practice; both 20s are earned. Salesforce is exceptional in customer-facing workflows; Microsoft's coverage is broad with partner-dependent depth.

**Our position.** Yggdrasil ships ten business modules whose workflows are explicit state machines with enforced transitions, but commercial deployment depth is far below SAP/Oracle; 18 credits the modeled breadth while discounting the mileage.

**Roadmap.** Depth follows the wedge: manufacturing and B2B process families first (index 13), horizontal breadth later. We intend to match incumbent depth in the governed verticals we serve, not across every industry they serve.

### 12. ERP transaction depth — SAP 20 · Oracle 20 · Microsoft 14 · Salesforce 14 · **Mimir Labs 17**

**Incumbent reality.** SAP and Oracle are the benchmark transaction platforms — global localization, tax regimes, edge cases accumulated over decades. Dynamics 365 is credible but the wider Microsoft portfolio dilutes uniform depth; Salesforce is not a general-purpose ERP.

**Our position.** 323 tables across ten modules, full transactional coverage of the core flows, correction-status machinery throughout — but not the field history, localization, and edge-case coverage of thirty-year platforms. 17 is accurate.

**Trade-off.** We gave up accumulated edge-case breadth (much of which encodes the workaround culture we exist to end) → we bought a transaction core clean enough that every mutation can pass through one state-machine gate. Depth we add from here is added *inside* the governed model; the incumbents cannot move their depth inside such a gate without rebuilding it.

### 13. Manufacturing operational depth — SAP 19 · Oracle 18 · Microsoft 13 · Salesforce 10 · **Mimir Labs 18**

**Incumbent reality.** SAP's manufacturing, planning, asset, and quality depth across industries is exceptional; Oracle's manufacturing/SCM execution close behind. Dynamics is credible but less specialized; Salesforce depends on partners for plant-floor reality.

**Our position.** Yggdrasil was *designed around* manufacturing and distribution — work orders, BOMs, shop floor, OEE, 8D/CAPA/NCR quality, warehouse, PLM with ECR/revision control — and the EBOM/CAD/BIM/CNC capability line extends it toward engineering data. Field deployment and industry-vertical breadth remain unproven; 18.

**Roadmap — intend to outpace.** This is the vertical where we intend to pass SAP: not on breadth of industries served, but on *governed* manufacturing operations — where a quality hold, a traveler state, or an evidence-bound release gate is enforced at commit rather than described in a work instruction. The compliance-wedge program (8D/CAPA/NCR with evidence-bound transitions, index 19–21) is the spearhead.

---

## Cluster C — AI & agent platform

### 14. AI/agent capability — SAP 18 · Oracle 19 · Microsoft 20 · Salesforce 20 · **Mimir Labs 12**

**Incumbent reality.** Microsoft (Copilot Studio, Azure AI Foundry, M365 Copilot, Fabric agents) and Salesforce (Agentforce) are legitimate 20s — the broadest and best-packaged agent platforms in the enterprise market. Oracle's 2026 AI-native Fusion work embeds agents that act on Fusion business objects natively; SAP's Joule portfolio is grounded in real process context.

**Our position.** 12, by choice. We do not train models, ship a copilot, or compete on agent-development breadth.

**Trade-off — the defining one.** We gave up being an agent platform → we bought being the substrate *any* agent platform must commit through. The strategic read: every point the incumbents add to this index increases the value of indexes 19–22, because more capable agents acting on operational data raise the cost of an ungoverned write path. We are structurally aligned with their success here, not racing it. This trade is permanent — reversing it would put us in competition with the actors we intend to govern and would compromise the model-agnostic neutrality the governance position requires.

### 15. AI business context — SAP 19 · Oracle 19 · Microsoft 18 · Salesforce 19 · **Mimir Labs 18**

**Incumbent reality.** SAP's deepest asset is structured process/transaction context for its agents; Oracle's shared Fusion data model likewise; Salesforce grounds Agentforce in unified customer data; Microsoft's context is broad but distributed across Graph, Fabric, and Dynamics.

**Our position.** What we hand an agent is smaller but *load-bearing*: canonical definitions, authoritative state, and — the part no incumbent provides — the record-level operational sufficiency set (meaning, provenance, state, evidence, constraints). An agent reading a governed record knows not just the value but which actions on it are admissible. The deployed context corpus is not yet broad; 18.

**Roadmap.** As ROPE policy inventories grow per tenant, the constraint context becomes the differentiator: incumbents can tell an agent what *is*; we can tell it what *may validly happen next*. We intend to lead this index once that distinction is measurable in deployed estates.

### 16. Agent orchestration — SAP 17 · Oracle 19 · Microsoft 20 · Salesforce 20 · **Mimir Labs 12**

**Incumbent reality.** Copilot Studio/AI Foundry and Agentforce provide mature multi-agent orchestration, tooling, and connector ecosystems; Oracle's Agent Studio executes natively inside Fusion; SAP is earlier and more application-bounded.

**Our position & trade-off.** Same trade as index 14, same permanence: ROPE constrains what *any* orchestrator's agents can commit; we do not build the orchestration workbench. A 12 here is the price of neutrality, and neutrality is what makes the governance position credible to a customer running Agentforce and Copilot side by side.

### 17. AI governance — SAP 18 · Oracle 19 · Microsoft 20 · Salesforce 19 · **Mimir Labs 19**

**Incumbent reality.** Take these seriously: Microsoft's Purview + Entra + Copilot admin plane is the broadest cross-environment AI-governance suite that exists; Oracle agents inherit Fusion security, approvals, and audit with native observability; Salesforce ships the Trust Layer and agent audit; SAP embeds authorization and workflow into Joule. Any Mimir Labs positioning premised on "incumbents lack AI governance" is false and will be rebutted in the first competitive cycle.

**Our position.** Our 19 rests on governing a different object. Incumbent AI governance governs the *AI layer* — prompts, responses, identity, data access, model usage. ROPE governs the *resulting operational action* at the authoritative state boundary: an agent, human, or script proposing an inadmissible transition is refused at commit, whatever passed upstream. Microsoft's 20 reflects breadth; our 19 reflects depth-at-the-boundary without breadth.

**Roadmap.** Not to replicate the incumbent AI-governance surface, but to make the commit gate consumable *by* it — policy bundles as the artifact a Purview- or Trust-Layer-governed estate imports to gain an execution boundary. Complementary, not substitutive.

### 18. Identity & authorization — SAP 19 · Oracle 19 · Microsoft 20 · Salesforce 19 · **Mimir Labs 18**

**Incumbent reality.** Entra is the market-leading identity plane, full stop. SAP and Oracle carry mature IAM with segregation-of-duties depth; Salesforce's permission model is granular and battle-tested.

**Our position.** MFA, deterministic RBAC, and role-bound action logging are architecturally solid; ecosystem breadth and administrative tooling maturity trail decades-old IAM suites. 18 is fair, and we treat identity as a layer to *integrate* (SSO/IdP federation with the customer's existing plane, usually Entra) rather than a market to win.

---

## Cluster D — Execution governance

*The cluster the company exists for. The incumbent scores here are respectable — and structurally capped, because in every incumbent the enforcement is distributed across application logic, identity, workflow engines, database constraints, and trust layers, with no single mandatory admissibility boundary. Ours are 19–20 because that boundary is the product.*

### 19. Pre-write policy enforcement — SAP 15 · Oracle 17 · Microsoft 14 · Salesforce 15 · **Mimir Labs 20**

**Incumbent reality.** Oracle is the strongest incumbent: Fusion agents inherit workflows/approvals and Oracle Database enforces genuinely powerful declarative constraints — 17. SAP enforces many application rules pre-completion, but universality fails at extensions and external write paths (a BAPI or IDoc path can land what the GUI would refuse). Salesforce validation rules, flows, and Apex can block writes but are object- and implementation-dependent. Microsoft's estate has no single mandatory pre-commit boundary spanning Dataverse, Fabric, and agents.

**Our position.** Every governed action passes deterministic policy validation before authoritative commit — the write path *is* the policy engine (ROPE, whitepaper 11). There is no alternate path that skips it, which is the property the incumbent architectures cannot claim.

**Roadmap — intend to outpace measurably.** Convert this index from analyst judgment to test protocol: the planned Enterprise Execution Readiness Index (EERI) — attempt unauthorized state transitions, split transactions, stale-state writes, alternate-tool writes, schema drift, and provenance failures against each platform and publish pass/fail. We intend to be the vendor that *proposes* the adversarial benchmark, because we expect to be the only one that passes it clean.

### 20. State-transition validation — SAP 16 · Oracle 17 · Microsoft 13 · Salesforce 14 · **Mimir Labs 20**

**Incumbent reality.** SAP business processes constrain many transitions but customization and direct-integration patterns create alternate paths; Oracle's workflow and object rules are strong without one universal engine; Dynamics/Dataverse business-process flows vary by implementation; Salesforce requires no state-machine token for a mutation.

**Our position.** Transition legality is bound to execution: a validated state-machine authorization precedes SQL compilation (the ConstraintEvaluator service), so an unmodeled transition is not slow or discouraged — it is unexpressible. Complementing it, the correction-policy design removes DELETE from every business-facing module: erroneous records are obsoleted, superseded, voided, or reversed, never destroyed.

**Trade-off.** We gave up escape hatches — the admin backdoor, the direct-SQL fix, the "just delete it" path that every incumbent estate quietly relies on → we bought a substrate where the state history is complete and every current state was reached legally. Operators feel this cost in edge cases; auditors and agents collect the benefit continuously.

### 21. Immutable auditability — SAP 18 · Oracle 18 · Microsoft 18 · Salesforce 17 · **Mimir Labs 20**

**Incumbent reality.** All four are strong: SAP change documents, Oracle tamper-resistant audit options, Microsoft's Purview/platform logs, Salesforce field history and event monitoring. The shared ceiling: immutability and completeness vary by product, edition, configuration, and — critically — by write path; bulk operations and integrations routinely bypass application-level audit.

**Our position.** Append-only audit structures, transaction traceability, and deterministic replay are platform properties. Because there is no un-audited write path (index 19) and no destructive delete (index 20), the audit trail is complete by construction rather than by configuration diligence.

### 22. Deterministic execution — SAP 15 · Oracle 17 · Microsoft 13 · Salesforce 14 · **Mimir Labs 20**

**Incumbent reality.** Core SAP and Oracle transactions are deterministic; the scores fall where agent reasoning, low-code flows, Apex, and distributed process logic enter the execution path — end-to-end behavior becomes variable precisely where the platforms are investing hardest (their agent layers).

**Our position.** The core thesis: probabilistic proposal is architecturally separated from deterministic admissibility and commit. A model may propose anything; what commits is decided by deterministic evaluation of tenant-authored policy, reproducibly. ROPE-N (the neural-governance research program) explores governing the *reasoning trajectory* as well — and its own position paper states the discipline: reasoning governance is ergonomics layered above the gate, never a safety guarantee; the execution gate alone bears that weight.

### 23. Drift detection — SAP 17 · Oracle 16 · Microsoft 19 · Salesforce 16 · **Mimir Labs 19**

**Incumbent reality.** Microsoft is the incumbent leader — Purview's scanning and policy services give excellent data-estate drift visibility. SAP and Salesforce monitor their own estates well; semantic drift across third-party systems generally requires governance programs.

**Our position.** Jormungandr (whitepaper 10) is purpose-built for schema drift, canonical-concept enforcement, and integration compliance across governed boundaries; SaaS maturity is the remaining discount.

**Roadmap — intend to outpace.** Purview detects drift in *data structures*; Jormungandr detects drift against *canon and policy* — a divergence between what a connected system does and what the governed contract says it may do. As the SaaS surface hardens, target 20 on this index: drift detection that triggers enforcement, not just a catalog annotation.

### 24. Human oversight — SAP 19 · Oracle 19 · Microsoft 19 · Salesforce 19 · **Mimir Labs 17**

**Incumbent reality.** Uniform incumbent strength, honestly scored: SAP workflow inboxes and SoD controls, Oracle configurable approvals and exception handling, Microsoft's Power Platform/Copilot approval patterns, Salesforce queues and agent-handoff. Decades of approval-UX polish.

**Our position.** Human authority is structural — HITL decisions are authoritative inputs the system records and enforces (Ratatosk treats human annotation as ground truth; ROPE overrides are traced), but our oversight *tooling* — inbox ergonomics, delegation, escalation UX at scale — is younger than theirs. 17.

**Roadmap.** Close the tooling gap during the pilot horizon (approval queues and oversight dashboards are roadmap items in the product TODO). The structural difference to preserve while doing so: in incumbent estates a human approval is a workflow step that application logic can route around; here an evidence-bound transition *cannot occur* without its recorded human authorization.

---

## The trade-off register

Every deliberate trade in one place. These are commitments, not apologies; each names what the lower score purchased.

| # | Index (our score) | We gave up | We bought | Permanence |
|---|---|---|---|---|
| T1 | AI/agent capability (12), Agent orchestration (12) | Building an agent platform / orchestration workbench | Model- and vendor-neutral governance position over *every* actor's writes; alignment with (not competition against) incumbent agent investment | Permanent — reversing it destroys the neutrality the governance position requires |
| T2 | Integration breadth (11) | Connector count (13 governed playbooks vs. 1,000+ connectors) | Every crossing that exists is observable, canonically mapped, policy-checked; no ungoverned path falsifies the governance claims | Breadth grows; the *no ungoverned connector* rule is permanent |
| T3 | Schema/extensibility flexibility (schema governance 20 held against market expectation) | Freeform customer fields, side-table UDFs, consultant-driven schema sprawl | Immunity from the misfit → workaround → shadow-system spiral; canon extension as the only escape valve | Permanent |
| T4 | Ingestion tolerance (data quality 20 held against operator convenience) | "Load now, cleanse later" permissive write paths | A substrate where presence implies validity — the property agentic consumers require | Permanent |
| T5 | Destructive operations (state-transition 20, auditability 20) | DELETE endpoints, admin backdoors, direct-SQL fixes | Complete state history; every current state reached legally; correction by obsolete/supersede/void/reverse | Permanent |
| T6 | Catalog richness (data discovery 18) | Cloud-scale ML classification, persistent central catalogs of customer data | Zero-knowledge, deterministic, reproducible analysis a regulated customer can accept without a data-processing negotiation | Permanent for the analysis engine |
| T7 | Migration throughput (16) | Bulk-load velocity | Reversible staging, per-record validation, auditable semantic fidelity mid-project | Permanent |
| T8 | Accumulated ERP edge-case breadth (17) | Thirty years of localization and workaround-encoding depth | A transaction core clean enough to sit entirely behind one state-machine gate; depth added inside the governed model | Depth grows; the gate is permanent |
| T9 | Oversight UX maturity (17) | Years of approval-inbox polish (for now) | Structural human authority — evidence-bound transitions that cannot occur without recorded authorization | Gap closes on roadmap; not a permanent trade |

## The roadmap ledger

Where we intend to outpace, by horizon. Vehicles are named so progress is checkable.

**Near term (validation cohort / pilot horizon)**

- **Data discovery (18 → lead):** Ratatosk operational-reality discovery (incl. VBA/shadow-logic extraction) past Purview's 19 for operational estates, as pilot connector coverage grows.
- **Migration (16 → lead on fidelity):** Ragnarok production hardening through wedge engagements; superiority measured in mapping coverage and post-migration validity, not throughput.
- **Human oversight (17 → 19):** approval-queue and oversight tooling to incumbent ergonomic parity, preserving structural authority.
- **Manufacturing depth (18 → lead in governed verticals):** compliance-wedge program — 8D/CAPA/NCR with evidence-bound transitions as the spearhead against SAP's 19.

**Mid term**

- **Semantic interoperability / AI governance (hold 20 / 19, change the game):** portable policy bundles (whitepaper 12; shipped in Yggdrasil RopeService, Jormungandr export, Heimdall cross-tenant migration) as the policy-interchange standard no distributed-governance incumbent can emit or consume.
- **Drift detection (19 → 20):** Jormungandr SaaS maturity; drift that triggers enforcement, not annotation.
- **Pre-write enforcement / state validation / determinism (hold 20, make it measurable):** ~~publish the Enterprise Execution Readiness Index~~ **Delivered July 31, 2026** — EERI 2026 published as an 11-vendor, 30-condition instrument with six architecture-sensitive indexes and buyer threshold guidance. Next step per its own §8: the empirical revision — adversarial test protocols (unauthorized transitions, transaction slicing, stale-state writes, alternate-tool writes, direct-integration bypass, drift, provenance failures, replay, privileged mutation) scored on observed behavior, not documentation.
- **Data lineage (17 → parity+):** governed-boundary lineage across production Bifrost estates; each hop carries admissibility evidence Purview's passive scan cannot.

**Long term / research (capability-gated)**

- **ROPE-N neural governance:** governing the reasoning trajectory before an action is proposed — pursued as research, explicitly never relied upon as the safety guarantee (the execution gate bears that weight alone). If interpretability matures, this becomes the ergonomic layer above the gate; if it does not, nothing in the guarantee changes.

**Where we do not intend to compete — stated so the roadmap is believable**

- Agent-platform and orchestration breadth (Copilot Studio, AI Foundry, Agentforce): permanent non-goal (T1).
- Integration-surface parity with Azure/MuleSoft: permanent non-goal (T2); breadth grows demand-driven and governed.
- Identity-plane market (Entra et al.): integrate, don't replace.
- Near-term global localization parity with SAP/Oracle ERP depth: depth is added vertical-by-vertical inside the governed model.

---

## Limitations

Incumbent characterizations rely on public documentation current to July 2026; product velocity in the agent space is high and scores should be revisited at least quarterly. Mimir Labs scores distinguish architectural intent from commercial maturity, and several claims (production-scale lineage, connector estates, oversight tooling) are explicitly discounted pending deployment evidence — the roadmap ledger above is the list of what would move them. All 24 conditions are weighted equally; a regulated manufacturer would rationally overweight Cluster D, a digital-native overweight Cluster C. The benchmark deliberately excludes commercial dimensions (total cost, pricing transparency, implementation capacity, localization, installed base); those would favor incumbents on scale and support, and Mimir Labs on published formula-based pricing, unlimited users, and per-tenant database isolation.

## References

- Mimir Labs Research, *Enterprise Execution Readiness Index 2026*, July 31, 2026 (final published instrument; archived in this directory with `eeri-2026-scores.csv`).
- *Enterprise Data and AI Capability Benchmark* v1.0, July 30, 2026 (source score matrix for this edition; archived in this directory).
- Mimir Labs, *The Missing Layer in Enterprise AI Readiness* (working paper, May 2026) — operational canon, OPE, record-level operational sufficiency.
- Mimir Labs, *Why ERP Is Inadequate* (structural-failure catalog) — misfit/shadow-system basis for T3–T5.
- Mimir Labs whitepapers 05 (Mimisbrunnr), 07 (Ragnarok), 08 (Ratatosk), 09 (Bifrost), 10 (Jormungandr), 11 (ROPE), 12 (Portable Policy Bundle Format).
- Mimir Labs, *Governing Reasoning Before Execution* (ROPE-N position paper, v0.1.1a) — capability-gated reasoning-governance roadmap.
- Vendor documentation as cited in the source benchmark (SAP Sapphire 2026; Oracle AI-native Fusion, July 2026; Microsoft Purview/Fabric; Salesforce Trust Layer / Data 360).
