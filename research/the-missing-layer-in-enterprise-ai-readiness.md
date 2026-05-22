# The Missing Layer in Enterprise AI Readiness: Operational Canon, Runtime Policy Enforcement, and the Limits of Data Readiness

**Mimir Labs, LLC — Working Paper / Preprint**
**Draft, May 2026**

---

## Abstract

A growing and increasingly rigorous body of work has established that enterprise artificial intelligence readiness is not principally a question of model quality. Reports from MIT, Stanford, and the U.S. National Institute of Standards and Technology, together with a maturing "data readiness for AI" literature and the scientific community's FAIR data movement, converge on the conclusion that the binding constraints on enterprise AI are data quality, governance, contextual fit, integration architecture, and organizational process. This paper accepts that conclusion and argues that it stops one layer too high. Existing frameworks treat the enterprise substrate as a *source* of data and context to be made findable, clean, governed, and accessible. They do not treat it as a *runtime authority* that must constrain action. We introduce the concept of an **operational canon**: a machine-actionable representation of enterprise entities, valid states, allowed transitions, required evidence, semantic definitions, and audit obligations that determines what can validly happen inside the business — and the corresponding mechanism, **Operational Policy Enforcement (OPE)**, by which the canon is enforced at runtime, at ingress, before an action commits. We argue that data readiness must be extended in two directions — from field-level data quality to record-level operational sufficiency (canonical meaning, provenance, state, supporting evidence, and the constraints that make an action valid), and from properties of data-at-rest to properties of operations-in-motion — because enterprise AI agents do not merely observe the substrate; they act on it. Without enforceable operational canon, AI systems inherit and amplify the ambiguity, semantic drift, and invalid state that the substrate already permits. The paper positions this argument relative to the prior ERP "misfit" and shadow-system literature, distinguishes runtime enforcement from descriptive semantic layers and after-the-fact governance, and outlines implementation patterns without reducing the thesis to any one of them.

**Keywords:** enterprise AI readiness; operational canon; runtime policy enforcement; data readiness; semantic interoperability; ERP misfit; event sourcing; agentic AI; state validity; AI governance.

---

## 1. Introduction

For three decades, the worst that a defective enterprise data substrate could do was mislead a human reader. A dashboard fed by ambiguous entity definitions, stale aggregates, or invalid record states produced a wrong number, and a person with operational knowledge frequently caught it. The operator who knew that a work order marked *in process* was in fact held for engineering review reconciled the gap in their own judgment and acted correctly in spite of the system. The reporting layer was wrong by a known and roughly bounded margin, and the organization absorbed the error because a human stood between the substrate and the action.

Enterprise AI removes that human. Agentic systems, automated workflows, and machine-to-machine integrations do not merely *observe* the substrate; they *act* on it, at machine speed and scale, and they take the substrate's assertions literally. An agent that reads *in process* acts on *in process*. It has no second channel to the floor, no skepticism of a fluent but invalid record, and no patience for a system that is wrong in a way everyone has silently agreed to tolerate. The consequence is a qualitative change in the burden enterprise systems must bear. A substrate that was merely *describable* was sufficient when the consumer of its descriptions was a discerning human. A substrate that is now *actionable* by autonomous software must additionally be *constrainable*: it must be able to refuse operations that are not valid, before they propagate.

This paper argues that the current enterprise AI-readiness literature, which is serious and largely correct, does not yet make this distinction explicit. It identifies the symptoms of substrate inadequacy — poor ROI, brittle workflows, weak operational alignment, ambiguous data — and the adjacent requirements — clean data, shared semantics, integration, governance. But it stops before naming the requirement that ties them together: that the substrate must carry *runtime authority* over what can validly happen. We call the content of that authority the operational canon and the mechanism of its enforcement Operational Policy Enforcement. The contribution is not to claim that prior work is wrong, nor that anyone has neglected enterprise AI readiness. It is to argue that the prior work is *incomplete* in a specific and remediable way, and to specify the missing layer.

---

## 2. What the Literature Already Gets Right

The strongest recent empirical signal that enterprise AI failure is not a model problem comes from MIT's Project NANDA "GenAI Divide" report (MIT Project NANDA, 2025), which found that the overwhelming majority of enterprise generative-AI pilots failed to deliver measurable returns. Crucially, the report attributes the divide not to model capability — frontier models performed adequately in isolation — but to a "learning gap": deployed systems did not retain context, did not integrate with day-to-day operational workflows, and remained brittle at precisely the points where they touched the messy reality of the business. The failure was situated below the model and around it, in the operational fabric the model was asked to act within.

The MIT Center for Information Systems Research (MIT CISR) Enterprise AI Maturity Model (MIT CISR, 2024) formalizes the capabilities that distinguish organizations able to operationalize AI from those unable to. Maturity is cumulative: it requires accessible and well-described data, programmatic interfaces (APIs) to enterprise functions, simplified and automated processes, reusable architectural components, and decision support embedded in the flow of work rather than bolted on as a separate analytical exercise. The model's central insight is that AI capability is the *output* of prior enterprise capability, not a substitute for it. We accept this and observe what the ladder does not include: a rung for *enforced operational validity*. Each capability the model names sits on the path by which data and decisions are made *available*; none names the path by which invalid operations are *refused*.

Stanford's Digital Economy Lab Enterprise AI Playbook (Stanford Digital Economy Lab, 2025) reinforces the same conclusion from the deployment side: successful AI depends on everything surrounding the model — data quality, process documentation, integration architecture, permissioning, exception handling, and fit with how work is actually done. Notably, the playbook favors federated architectures over forced centralization, a point we adopt directly: the argument of this paper does *not* require that enterprise data be physically centralized. It requires that operational meaning and validity be *enforced consistently*, which is a property that can be realized in federated as well as centralized topologies.

The "data readiness for AI" literature supplies the property-level vocabulary. Building on Lawrence's notion of *data readiness levels* (Lawrence, 2017) and the broader survey literature (e.g., [author], [year]), this work establishes that poorly structured, inaccessible, incomplete, or contextually unsuitable data renders AI unreliable or unsafe, and that readiness is a graded property requiring deliberate engineering. This is correct, and we extend rather than dispute it in §3.

The scientific FAIR-data movement provides the most instructive analogy. The FAIR principles — Findable, Accessible, Interoperable, Reusable (Wilkinson et al., 2016) — and their concrete realization in particle physics, such as the FAIR and AI-ready Higgs-boson decay datasets released through the CERN Open Data effort (Chen et al., 2022; CERN Open Data Portal, n.d.), demonstrate that machine usability demands explicit structure, rich metadata, documented provenance, and standardized interoperability. The FAIR program is the gold standard for making *observed* data machine-usable. Its limits, when transposed to the enterprise, are precisely the subject of §3.

Finally, the governance dimension is well served by NIST's AI Risk Management Framework (NIST, 2023) and its Generative AI Profile (NIST, 2024), which articulate provenance, monitoring, downstream-impact assessment, supply-chain risk, and lifecycle risk management. These frameworks are essential and we rely on them. We note only that their dominant control posture is *detective and responsive* — measure, monitor, manage — and that they presuppose, rather than supply, a substrate capable of *preventing* invalid action at the point of action.

In sum: serious researchers already understand that enterprise AI readiness is mostly not about models. The literature is right. The remainder of this paper concerns what it leaves implicit.

---

## 3. The Gap: From Data Readiness to Operational Readiness

Every framework reviewed above treats the enterprise substrate in fundamentally the same posture: as a *source*. Data is to be made findable, accessible, clean, well-described, governed, and integrated so that it can be *consumed* — by a model, an analyst, a dashboard, or an agent. This is the analytical, observational posture, and it is inherited, largely unexamined, from the scientific data tradition that the FAIR principles formalize.

The posture is correct for observed data and incorrect for operational data, and the difference is decisive. A scientific dataset is a *record of something that already happened*. The Higgs decay events in a FAIR dataset are immutable; making them AI-ready means making them maximally *reusable for inference*. No FAIR principle has any notion of an operation that is *not allowed*, because nothing the consumer does can change what the data represents. Reading the dataset cannot make the universe inconsistent.

Enterprise operational data is categorically different. It is not a record of something that already happened in the external world; it *is* the live state of the business, and writing to it *changes the business*. When an agent posts a goods receipt, releases a work order, approves a payment, or transitions an order to *shipped*, the write is not an observation — it is an act with consequences in inventory, in cash, in obligation, in compliance. The data is *acted upon*, not merely consulted. This means readiness for action cannot be reduced to readiness for consumption.

The data-readiness literature describes properties of data *at rest*: is it accessible, structured, complete, suitable? A dataset can satisfy every such criterion and still encode an *invalid operational state*. Consider an order recorded as *shipped* with no corresponding payment authorization; a work order *closed* while an associated nonconformance remains open; an inventory lot simultaneously *quarantined* and *allocated to a customer order*; two systems asserting incompatible quantities for the same physical good. Each of these records may be perfectly clean, findable, well-typed, and richly described. Each is also a representation of something that should not be permitted to exist. Data readiness, as currently theorized, has no vocabulary for this failure, because it is a property not of the data but of the *operation* that produced it and the *state* that resulted.

Invalid state, moreover, is only one half of the insufficiency, and "dirty data" — bad values, duplicate records, uncontrolled custom fields, conflicting definitions — is too narrow a frame for either half. The data-quality literature established long ago that quality is multidimensional and relative to the consumer's task (Wang & Strong, 1996); a field can be accurate, complete, consistent, and timely by every such dimension while the record it belongs to remains an unsafe basis for autonomous action. Field-level correctness is not the same as *operational sufficiency*. A record is a safe substrate for agentic reasoning only if it carries, in machine-actionable form, five things that correct values alone do not supply: what the data *means* (canonical semantics), where it *came from* (provenance), what *state* it represents, what *evidence* supports that state, and which *actions* are valid in consequence (constraints). A record that omits these can be entirely correct and still tell an incomplete operational story, and an agent granted access to it cannot know what the record does not say. The failure mode is not bad data but *incomplete operational truth*, and no amount of field-level cleansing closes it, because cleansing operates on values while the missing content is the provenance, state, evidence, and constraint context that values never carry on their own. These five requirements are, not coincidentally, the operational canon (§5) viewed at the granularity of a single record.

The gap, stated precisely, is this: readiness frameworks address the *read path* — the path by which substrate content becomes available to consumers — and are silent on the *write path*, the path by which operations enter the substrate and mutate its state. Semantic layers, catalogs, business glossaries, BI models, and governance documentation all live on the read path. They describe, contextualize, and render legible what is already present. An invalid operation, however, is born on the write path; it is described, if at all, only afterward on the read path, by which time the ambiguity is already resident in the substrate and may already have been acted upon. To extend data readiness to *operational readiness* is to require that validity be a property enforced on the write path, at ingress, before commitment — not a property described after the fact.

---

## 4. ERP and the Operational Substrate

The enterprise substrate is not an abstraction; it is, for most organizations, the enterprise resource planning (ERP) system and its satellites. Davenport's foundational analysis (Davenport, 1998) established that an enterprise system is not a neutral container for data but an *imposed operating model*: in adopting it, the organization accepts the vendor's encoded assumptions about entities, processes, roles, and controls. The system encodes the organization's operating model through its entity definitions, status fields, workflow routings, permission structures, cost and posting rules, and audit and transaction constraints. Whatever the system enforces *is* the organization's de facto operating model, regardless of what policy documents say.

The difficulty, extensively documented, is that the encoded model routinely fails to match operational reality. Soh, Sia, and Tay-Yap (2000) characterized this as *misfit* — the gap between the generic functionality an ERP imposes and the specific structural and cultural requirements of the adopting organization. Strong and Volkoff (2010) refined the construct into a typology of organization–enterprise-system fit, distinguishing deficiencies of functionality from impositions of inappropriate structure, and showing that misfit is not a transient implementation defect but a durable structural condition. Where the official system cannot represent operational reality, that reality does not disappear; it migrates. The shadow-system and workaround literature (Behrens & Sedera, 2004; Boudreau & Robey, 2005; Alter, 2014) documents the result: spreadsheets, side databases, and local applications proliferate to hold the operational truth the official schema cannot, and these workarounds persist precisely because the implemented schema does not cover the represented work.

This produces a consequence whose significance for AI readiness has not been adequately drawn out. If, as the misfit and shadow-system literature jointly establish, the operational canon of the business frequently lives *outside* the official system of record, then an AI system reading the official system reads an incomplete and partly fictional account of the business — and an AI system *acting* through the official system acts on that fiction at machine speed. The enterprise's "system of record" is, in the misfit case, a record of what was *typed*, which is the closest legal value the system would accept, not a record of what *happened*. Human operators have compensated for this for thirty years by holding the real canon in their workarounds and their heads. Autonomous agents cannot, because the compensating knowledge was never written into the substrate the agent can reach.

The substrate, in other words, is not merely low-quality in the data-readiness sense. It is *under-specified as an authority*: it encodes an operating model that does not match operations, it accepts operations it should refuse, and it externalizes the validity rules that would have caught the mismatch into human practice that AI cannot inherit.

---

## 5. The Operational Canon

We define the **operational canon** as the enforceable set of:

1. **Canonical business entities** — single, authoritative definitions of the nouns the business operates on (customer, order, part, lot, work order, shipment), such that every consumer means the same thing by the same term;
2. **State models** — the legitimate states each entity may occupy;
3. **Allowed transitions** — the specific state changes that are permitted, and the conditions under which they are permitted;
4. **Evidence requirements** — the data, approvals, or artifacts that a transition must carry to be valid (an evidence-bound transition cannot occur without its evidence);
5. **Semantic definitions** — the meaning, units, and relationships of attributes, shared across modules and boundaries;
6. **Audit obligations** — the record each operation must leave so that what happened can be reconstructed and replayed.

The canon is not a document, a glossary, or a model of the business. It is the *operative constraint set* that determines what can validly happen inside the business. The distinction between describing the business and constraining it is the entire point: a description can be true while the system continues to permit operations the description forbids. The canon is the description made *binding*.

Three properties distinguish the canon from adjacent constructs. First, it is *machine-actionable*: every element is expressed in a form a runtime system can evaluate, not merely a form a human can read. Second, it is *prescriptive rather than descriptive*: it states what may happen, not what has happened, and its primary function is exercised on operations that have not yet committed. Third, it is *authoritative*: where it is in force, an operation that violates it does not occur, rather than occurring and being flagged.

The canon subsumes and operationalizes the requirements scattered across the readiness literature. Canonical entities and semantic definitions are the enforced form of the shared semantics that the semantic-interoperability and Industry 4.0 ontology literature calls for (e.g., Obrst, 2003; Panetto & Molina, 2008). State models and allowed transitions are the formalization of the operating model that Davenport (1998) showed the enterprise system encodes — but rendered explicit and inspectable rather than buried in vendor configuration. Evidence requirements and audit obligations are the substrate-level expression of the provenance and traceability that NIST's frameworks require (NIST, 2023, 2024). The canon's contribution is to gather these into a single enforceable authority rather than a federation of descriptions.

Importantly, the canon does not require centralized data. Its entities and rules can be enforced at multiple boundaries across a federated estate, provided the *meaning and validity* are consistent at each boundary. What must be singular is the authority, not the storage.

---

## 6. Why Semantic Layers Are Insufficient

The most important objection to this thesis is that the industry already builds the layer we describe, under names such as semantic layer, metrics layer, data catalog, business glossary, knowledge graph, and governance platform. These technologies are valuable and we do not dispute their utility. They are, however, insufficient for the readiness problem, and the reason is exact.

Semantic layers, catalogs, governance documentation, and BI models operate on the *read path*. Their function is to make the substrate's contents legible, consistent, and discoverable to consumers — to tell a query, a report, or a model what a field *means*. This is genuine value: a metrics layer that guarantees every consumer computes "active customer" identically eliminates a real and costly class of inconsistency. But a read-path artifact, by construction, acts *after* data exists. It can describe that an order is *shipped*; it cannot have prevented the order from reaching *shipped* without a payment authorization. It can surface that two systems disagree about a quantity; it cannot have refused the write that introduced the disagreement. The semantic layer is a lens, and a lens does not hold a gate.

The same limitation applies to governance in its prevailing form. Most enterprise governance is *descriptive and detective*: it documents policy, monitors for violations, and remediates after detection. The dominant control posture of even the strongest governance frameworks — including the measure-and-manage functions of the NIST AI RMF (NIST, 2023) — is to observe and respond. This is appropriate for risks that cannot be eliminated at the source, but it is structurally incapable of preventing invalid operational state, because by the time monitoring detects a violation the violation has already entered the substrate and may already have been acted upon by an agent operating at machine speed. After-the-fact governance and write-path enforcement are not substitutes; they are different controls addressing different moments.

The distinction that the readiness literature has not made sharply is therefore between *description* and *runtime authority*. A semantic layer that perfectly describes the business is fully compatible with a substrate that continuously accepts operations the description forbids, because nothing connects the description to the moment of action. The missing layer is not a better description. It is the binding of description to enforcement at the point and instant an operation is attempted.

---

## 7. Operational Policy Enforcement

We define **Operational Policy Enforcement (OPE)** as the mechanism by which the operational canon becomes executable: the runtime authority that evaluates each attempted operation against the canon and *refuses* operations that are not valid, before they commit and before any downstream consumer — AI, workflow, integration, report, or human — can propagate the resulting ambiguity.

OPE is characterized by five behaviors that correspond to the extensions of data readiness this paper argues for:

- **Canonical operational semantics enforced, not merely declared.** Every operation is interpreted against the single authoritative definition of the entities and attributes it touches, so that meaning is identical across all callers by construction rather than by convention.
- **State validity gated.** A transition occurs only if it is among the allowed transitions for the entity's current state. Invalid states are not representable, because no path produces them.
- **Evidence-bound transitions.** A transition that requires evidence (an approval, a measurement, an authorization, a linked artifact) cannot commit without that evidence. The evidence is part of the transition, not a later attachment.
- **Ingress rejection of invalid operations.** Enforcement occurs at the boundary, at the moment of the write attempt, on the write path — not in a downstream reconciliation, a nightly validation, or a monitoring alert. An invalid operation is rejected rather than recorded-and-flagged.
- **Auditability and replayability.** Every committed operation leaves an immutable, ordered record sufficient to reconstruct how the current state was reached and to replay it. This is the contribution of the event-sourcing tradition (Fowler, 2005): when state is the fold of an append-only sequence of events, audit, provenance, and point-in-time reconstruction are intrinsic properties of the substrate rather than features bolted onto it.

The combination yields a sixth, emergent property: **machine-actionable boundaries** for everything that acts on the substrate. Agents, automated workflows, integrations, and analytical pipelines all operate within the same enforced envelope, because the envelope is a property of the substrate they share, not of any one consumer's discipline. An agent does not need to be individually trusted to respect the canon; the canon refuses what the agent should not do.

OPE is not a model, a policy document, or a monitoring system. It is the gate. Its defining commitment is that *validity is enforced before propagation*, which is precisely the commitment that read-path semantics and detective governance cannot make.

---

## 8. Implications for Enterprise AI

The case for OPE strengthens, rather than merely persists, as enterprise AI becomes agentic. Three properties of agentic systems convert a tolerable substrate weakness into an intolerable one.

First, **agents act on the write path.** Earlier enterprise AI — recommendation, classification, forecasting, conversational retrieval — largely consumed the substrate and returned outputs to a human. Agentic systems initiate operations: they create records, trigger transitions, dispatch integrations. They are write-path actors, and the write path is exactly where the readiness literature is silent and where OPE operates.

Second, **agents take the substrate literally and lack the compensating channel.** The human operator's tolerance for a wrong system was underwritten by a parallel, informal canon — the whiteboard, the spreadsheet, the institutional memory — that the operator consulted instead of the screen. The agent has only the substrate. Whatever the substrate asserts is, for the agent, the truth, and whatever the substrate permits is, for the agent, allowed. The misfit and shadow-system findings (§4) therefore bear directly on agent safety: an agent inherits the official substrate's fictions without inheriting the human workarounds that corrected them.

Third, **agents act at machine speed and scale**, which collapses the latency that made after-the-fact governance survivable. When a human introduced an invalid state, detection-and-remediation had hours or days to operate before consequences compounded. When an agent introduces invalid state, it may propagate thousands of dependent actions before a monitoring system flags the first. Detective governance does not fail in principle for agents; it fails in *timing*, because the window between violation and consequence shrinks below the window between violation and detection.

The synthesis is straightforward. Without enforceable operational canon, enterprise AI *amplifies* operational ambiguity: it acts faster, more literally, and more pervasively on a substrate that already permits invalid action, and it removes the human who used to absorb the error. With OPE, the same agent operates inside validated boundaries: it cannot create an invalid state, cannot perform a transition without required evidence, and leaves a replayable record of everything it did. The value of AI capability is not diminished by these constraints; it is made *safe to deploy*, because the substrate, rather than the model's good behavior, guarantees that what the agent does is something the business permits. This reframes a substantial part of the "AI alignment" problem at the enterprise level: much of what an enterprise needs is not an agent that is trusted to behave, but a substrate that does not depend on the agent behaving.

---

## 9. Implementation Implications

The thesis is architectural and admits several implementation patterns; it is not identified with any one of them. We sketch the principal patterns to make the argument concrete, not to prescribe.

- **Governance-native ERP.** Build the operational canon and OPE into the system of record itself, so that entities, states, transitions, evidence, and audit are first-class and enforced by the platform rather than configured on top of it. This maximizes integrity but requires displacing or rebuilding the substrate.
- **Standalone enforcement layer beside existing ERP.** Place an enforcement gateway alongside an incumbent system, intercepting operations and rejecting invalid ones before they reach the system of record, while leaving the incumbent in place. This trades some integrity (the incumbent may still admit out-of-band writes) for deployability.
- **Pre-migration semantic diagnostic.** Before a data migration or AI initiative, analyze the existing substrate to surface the latent canon — the entity definitions, states, and rules that are implicit in the data and the workarounds — and the points at which the official schema and operational reality diverge.
- **AI-readiness assessment at the operational substrate.** Extend readiness scoring beyond data properties to operational-state properties: not only "is the data clean and accessible," but "can the substrate represent an invalid state, and does anything prevent it."
- **Runtime validation gateways for agents and integrations.** Interpose canon enforcement specifically on the channels through which agents and machine integrations act, so that autonomous and high-volume write paths are gated even where human-facing paths are not yet.

These patterns differ in cost, coverage, and integrity, and an organization may combine them. As one concrete instantiation, the present authors are developing such a stack at Mimir Labs: a governance-native ERP (*Yggdrasil*) built around an enforced canonical model with a runtime constraint engine (*Operational Policy Enforcement*), a pre-migration diagnostic tool (*Ratatosk*) that surfaces the latent canon in existing systems, and a planned enforcement-and-reconciliation layer (*Jormungandr*) for governing systems that cannot be replaced. We mention this only as an existence proof that the patterns are buildable; the architectural claim of this paper stands independently of any product, and the patterns above could be realized by others in entirely different ways.

---

## 10. Conclusion

The enterprise AI-readiness problem is not, at bottom, a model problem, and the best current research already knows this. It is also not, at bottom, only a data problem, though the data-readiness literature has correctly diagnosed a large part of it. It is an *operational architecture* problem. The substrate on which enterprise AI acts must do more than supply clean, governed, well-described data for consumption; it must carry runtime authority over what can validly happen, because AI systems act on the substrate and inherit whatever ambiguity it permits. The missing layer between "data readiness" and reliable enterprise AI is the enforceable operational canon and the runtime policy enforcement that makes it executable. Until operational truth becomes executable — until validity is enforced at ingress rather than described after the fact — enterprise AI will remain fragile, not because the models are weak, but because the ground beneath them does not refuse what should never have happened.

---

## Research Contribution

This paper makes three contributions. First, it identifies a specific and previously under-articulated gap in the enterprise AI-readiness literature: the transition from *data readiness*, conceived as properties of data at rest, to *operational readiness*, conceived as enforced validity of operations in motion. Second, it introduces and formally characterizes two constructs — the *operational canon* (the enforceable set of canonical entities, states, transitions, evidence requirements, semantics, and audit obligations) and *Operational Policy Enforcement* (the runtime authority that enforces the canon at ingress) — and connects them to existing constructs in the ERP misfit, semantic-interoperability, and event-sourcing literatures. Third, it argues that the shift to agentic AI converts these constructs from desirable to load-bearing, by removing the human compensation that made under-specified substrates survivable and by collapsing the latency on which after-the-fact governance depends.

---

## Limitations and Future Work

This is a conceptual and architectural argument, not an empirical study. It does not measure the incidence of invalid operational state across real enterprises, quantify the error amplification attributable to agentic action on under-enforced substrates, or report controlled comparisons between enforced and unenforced deployments; each is needed and each is future work. The construct of the operational canon would benefit from formalization — a precise specification language for entities, states, evidence-bound transitions, and their composition — and from analysis of its expressiveness limits and the operations it cannot constrain. The implementation patterns of §9 carry trade-offs (integrity versus deployability, coverage versus cost, and the risk that a standalone enforcement layer is bypassed by out-of-band writes) that deserve systematic evaluation. Finally, the relationship between enterprise-level operational enforcement and model-level AI alignment is sketched here only briefly and merits dedicated treatment, as does the federated case: how a single authoritative canon is maintained and enforced consistently across organizational and system boundaries without requiring the centralization this paper explicitly does not assume.

---

## References

*Citation details below are provided in APA style; entries marked [verify] should be confirmed against the primary source before external submission.*

Alter, S. (2014). Theory of workarounds. *Communications of the Association for Information Systems, 34*(1), 1041–1066.

Behrens, S., & Sedera, W. (2004). Why do shadow systems exist after an ERP implementation? Lessons from a case study. *PACIS 2004 Proceedings*, Paper 136.

Boudreau, M.-C., & Robey, D. (2005). Enacting integrated information technology: A human agency perspective. *Organization Science, 16*(1), 3–18.

CERN Open Data Portal. (n.d.). *CERN Open Data Portal.* European Organization for Nuclear Research. Retrieved [date]. [verify]

Chen, X., et al. (2022). A FAIR and AI-ready Higgs boson decay dataset. *Scientific Data, 9*, Article 31. [verify — authors, volume, article number]

Davenport, T. H. (1998). Putting the enterprise into the enterprise system. *Harvard Business Review, 76*(4), 121–131.

Fowler, M. (2005). *Event sourcing.* martinfowler.com. https://martinfowler.com/eaaDev/EventSourcing.html

Lawrence, N. D. (2017). *Data readiness levels.* arXiv preprint arXiv:1705.02245. [verify]

MIT Center for Information Systems Research (MIT CISR). (2024). *Enterprise AI maturity model.* [verify — authors, exact title, briefing/working-paper number]

MIT Project NANDA. (2025). *The GenAI divide: State of AI in business 2025.* Massachusetts Institute of Technology. [verify — exact title, authorship, publication venue]

National Institute of Standards and Technology (NIST). (2023). *Artificial intelligence risk management framework (AI RMF 1.0)* (NIST AI 100-1). U.S. Department of Commerce. https://doi.org/10.6028/NIST.AI.100-1

National Institute of Standards and Technology (NIST). (2024). *Artificial intelligence risk management framework: Generative artificial intelligence profile* (NIST AI 600-1). U.S. Department of Commerce. https://doi.org/10.6028/NIST.AI.600-1

Obrst, L. (2003). Ontologies for semantically interoperable systems. *Proceedings of the Twelfth International Conference on Information and Knowledge Management (CIKM '03)*, 366–369.

Panetto, H., & Molina, A. (2008). Enterprise integration and interoperability in manufacturing systems: Trends and issues. *Computers in Industry, 59*(7), 641–646.

Soh, C., Sia, S. K., & Tay-Yap, J. (2000). Cultural fits and misfits: Is ERP a universal solution? *Communications of the ACM, 43*(4), 47–51.

Stanford Digital Economy Lab. (2025). *The enterprise AI playbook.* Stanford University. [verify — authors, exact title]

Strong, D. M., & Volkoff, O. (2010). Understanding organization–enterprise system fit: A path to theorizing the information technology artifact. *MIS Quarterly, 34*(4), 731–756.

Wang, R. Y., & Strong, D. M. (1996). Beyond accuracy: What data quality means to data consumers. *Journal of Management Information Systems, 12*(4), 5–33.

Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., et al. (2016). The FAIR Guiding Principles for scientific data management and stewardship. *Scientific Data, 3*, Article 160018.

---

*Working paper. © 2026 Mimir Labs, LLC. Distributed as a preprint for scholarly discussion; not peer reviewed.*
