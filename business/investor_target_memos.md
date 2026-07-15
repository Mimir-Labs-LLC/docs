# Mimir Labs — Investor Target Memos

**Prepared:** June 2026. **Author:** Christopher Gaither. **Status:** Internal / outbound draft.

---

## Overview and usage notes

This file holds seven one-page memos tailored to specific investors whose thesis, pattern recognition, and language fit Mimir Labs. It also holds two outbound email templates and two short ask templates.

Each memo is written to be sendable in raw form to the right partner at the firm with light personalization at the top. Each makes a different argument, in a different voice, because the partners reading them care about different things. Do not consolidate. The whole point is that the wrong argument for the right firm reads as not understanding their thesis.

The seven memos:

1. **Amplify Partners** — data infrastructure and developer primitives
2. **8VC** — industrial operations, defense-adjacent enterprises
3. **In-Q-Tel** — deterministic substrate for contested logistics and mission systems
4. **Redpoint** — enterprise AI infrastructure and the limits of semantic layers
5. **Founders Fund** — contrarian architectural claim; Palantir/Anduril-style seriousness
6. **Benchmark** — architecture-forward, concentrated, founder-insight
7. **Goldman Sachs PSI / Tier-1 financial strategic arms** — transaction-state integrity for autonomous financial operations

Voice rules across all seven:

- Founder-led, technical, contrarian without theatrics
- No "unlock value," no "AI-powered platform," no "revolutionize"
- No services-business framing; Mimir Labs is infrastructure, not consulting with a product attached
- Ratatosk is the wedge offer. Yggdrasil ERP is the strategic destination
- Norse names appear only when explaining architecture, not as positioning
- Preserve: dirty data ≠ incomplete operational meaning; semantic description ≠ enforceable substrate; governing the agent ≠ governing the world the agent acts on

Proof claims used are limited to what is actually in the repo as of v0.8.0a (June 2026). See the bottom of the file for a list of what was used and what was deliberately not claimed.

---

# 1. Amplify Partners

## The missing substrate for safe enterprise agents

**One-sentence thesis.** Enterprise AI agents are about to acquire write access to systems whose underlying substrate does not contain enough operational meaning to make the agent's actions safe, and Mimir Labs is building the primitive that closes the gap — beginning with a diagnostic that gets us into the customer's stack before they make the next platform mistake.

**Why now.** The capital flowing into agent platforms (Sierra, Cognition, Decagon, the labs' own enterprise products) requires enterprise-scale customer references, which means production deployment of agents against operational systems — finance, supply chain, scheduling, procurement — within the next eighteen months. Most of those systems were built around a transactional center of gravity and never carried the operational rule set the agent will reason against. The substrate failure that was a reporting problem in 2024 becomes a control problem in 2027 as soon as agents have write access. The early customers buying substrate-aware language in late 2026 are the ones who will not be the case study.

**What broke.** Enterprise ERPs record that a transaction happened. They do not preserve, in the substrate, the policy state, authority, evidence, and admissibility context that made the transaction valid. That meaning lives in spreadsheets, exception meetings, integration mappings, and the heads of operators who know when the documented process doesn't apply. This is not a dirty data problem. The fields are usually correct. The rules that should have decided what the fields say are not in the system at all. An agent reading correct-but-incomplete records produces confident automation over partial reality.

**What Mimir Labs built.** Ratatosk is a five-to-eight-day diagnostic that maps one value stream end-to-end across the customer's ERP, side stores, integrations, and shadow systems, and surfaces where operational meaning is being lost. Yggdrasil ERP is the governance-native ERP we're building for customers who decide their answer is a substrate that carries operational meaning as first-class data — states, authorities, policies, exceptions enforced at the moment of the state transition through a constraint engine with Runtime Operational Policy Enforcement (ROPE). Same engineering primitive — substrate-gated transitions — surfaces as both a diagnostic and a system of record.

**Why this is investable.** Ratatosk has the unit economics of a developer-tools wedge: scoped, short, repeatable, lands without an ERP replacement decision, produces a written artifact the customer keeps. The wedge teaches us the customer's operating model before any platform conversation. Customers who decide they want the substrate become Yggdrasil ERP. Customers who don't keep their existing stack and we install ROPE through Jormungandr as the contract layer against their incumbent ERP. The same architectural primitive scales from a sub-$20K diagnostic to a seven-figure platform.

**Proof / current signal.** Yggdrasil ERP is at v0.8.0a — 323-table multi-tenant Postgres schema with row-level security, 900+ REST endpoints, native Qt 6 desktop client, Next.js web app, integration test arcs covering O2C, P2P, L2C, Q2O, R2R, Q2R, and policy round-trip equivalence. ROPE engine is in production with multi-hop join paths, quantifiers, nested boolean composition, and conditional THEN actions. Policy bundle format (`mimirlabs.rope.policy-bundle` v1) carries policies portably between Jormungandr-governed external ERPs and Yggdrasil ERP. Published academic preprint on the missing layer in enterprise AI readiness; twelve technical whitepapers; partnerships with Penn State LaunchBox and MANTEC; 2026 Validation Cohort of five PA manufacturers running discovery now.

**What we need.** A pressure-test of the wedge thesis from a partner who has invested in primitives that scale from CLI to platform. If the diagnostic-to-substrate motion holds up in conversation, the next ask is right-person introductions inside two or three of your portfolio companies whose customers would buy the Ratatosk engagement off the description alone.

**Closing.** If the data infrastructure thesis at Amplify includes the layer underneath the layer everyone is investing in, this is the conversation.

---

# 2. 8VC

## Canonical operational infrastructure for manufacturing, logistics, and defense-adjacent enterprises

**One-sentence thesis.** Industrial enterprises run on substrates that lost operational meaning thirty years ago, and Mimir Labs is the canonical operating substrate the next generation of industrial software was supposed to be built on but wasn't — starting with a diagnostic that exposes the gap in the customer's current ERP/MES/WMS sprawl before a migration or AI-deployment makes it permanent.

**Why now.** Industrial operations are under three concurrent pressures: ERP fleets aging into forced replacement decisions, AI deployment pushing into operational systems faster than the substrate was designed to support, and defense-adjacent compliance (CMMC Level 2, AS9100, ITAR audit posture) requiring evidence the existing systems cannot produce on demand. The customers feeling all three are the ones who recognize that the answer is not another tier of consulting. It is a substrate whose default behavior is auditable, deterministic, and resistant to side-channel logic.

**What broke.** Industrial enterprises sit on three or four operational systems that should have agreed on the meaning of a part, a supplier, a state transition, an authority, and don't. The reconciliation labor between them is what consultants sell. The integration drift between them is what creates the audit gap. The undocumented rules in operator heads are what survive every ERP cutover because the new system can't carry them either. The result is an industrial substrate that records transactions but cannot prove operational truth — supplier qualification at the time of acceptance, BOM revision at the time of release, authority at the time of approval, policy version at the time of decision.

**What Mimir Labs built.** Ratatosk is the diagnostic engagement that walks one value stream from demand through fulfillment across every system and side store, and produces a canonical operating model the customer can act on with or without us. Yggdrasil ERP is the governance-native ERP for customers who decide they want the substrate that carries the operating model directly — built around canonical concepts (Mimisbrunnr), state-machine governance enforced at the database gate, and Runtime Operational Policy Enforcement that carries authority, evidence, and version through every decision. For customers who can't or won't replace their current ERP, Jormungandr is the same enforcement layer emitted as JSON Schema contracts the integration surface honors before a transition commits. The portable policy library that accumulates inside Jormungandr is the migration bridge into Yggdrasil ERP when the customer is ready to consolidate.

**Why this is investable.** Industrial operations is one of the few categories where the architectural answer and the regulatory pressure converge: customers who solve the AI-readiness problem solve the CMMC problem solve the migration problem at the same time, because they all reduce to the same substrate question. The diagnostic engagement is priced inside executive discretionary spend (starts at $14,500, typically $17K-$21K fully scoped for a five-to-eight-day engagement), produces an artifact that justifies the next platform conversation, and is repeatable across the mid-market manufacturing segment. Yggdrasil ERP is positioned at 30-70% of incumbent TCO when consulting, customization, and integration maintenance are accounted for honestly.

**Proof / current signal.** v0.8.0a in alpha, ~90% build/run readiness; full 10-module ERP, 900+ endpoints, real-time B2B event mesh, native carrier API integration with UPS/FedEx/USPS, validated end-to-end business processes including Quality-to-Resolution with NCR/CAPA cascade. Engineering change control and PLM integrated natively (EBOM/MBOM/ECO). 2026 Validation Cohort with five PA manufacturers identified through MANTEC; Penn State LaunchBox incubation. ROPE policy library demonstrated against GRN-receipt gates including supplier ZIP mismatch detection, supplier-mismatch enforcement, and over-receipt variance. Twelve technical whitepapers; academic preprint on AI-readiness substrate gaps. Founder is a USMC veteran and mechanical engineer.

**What we need.** Pressure-test the industrial operating-substrate thesis with a partner whose pattern-match includes Palantir-adjacent operational seriousness. If the thesis holds up, introductions to two or three industrial operators in your portfolio or extended network whose current ERP/MES/WMS sprawl is forcing a decision in the next twelve months.

**Closing.** The industrial software category was built around the wrong premise. We're building what it was supposed to be.

---

# 3. In-Q-Tel / IQT

## Deterministic operational substrate for contested logistics and AI-mediated mission systems

**One-sentence thesis.** Mission-support systems and contested-logistics environments cannot safely run autonomous workflows on substrates that do not deterministically preserve operational state, authority, evidence, and policy version at the moment of every transition, and Mimir Labs is building the substrate that does — beginning with a diagnostic that exposes the meaning gaps in the operational systems mission elements already depend on.

**Why now.** Mission systems are being asked to carry AI-mediated workflows at exactly the moment the underlying operational substrate is least ready to support them. The commercial ERP, MES, WMS, and integration layers that mission-adjacent industrial enterprises run on were built around transactional integrity, not operational admissibility. As AI agents acquire write paths into those systems — for forecasting, scheduling, sustainment, decision support, contested-logistics coordination — the gap between what the substrate records and what the mission requires becomes a control problem with national-security consequences. Zero-trust architectures address the perimeter and the identity. They do not address whether the system of record can prove what was admissible at the time of the action. That is the next layer.

**What broke.** Commercial enterprise systems do not carry, in the substrate, the operational meaning that mission elements rely on: supplier qualification at the time of acceptance, item revision at the time of release, authority at the time of approval, policy version at the time of decision, exception status at the time of action. The meaning lives in side stores, integration translations, and operator knowledge. Humans absorb the missingness through reconciliation and meetings. Agents inheriting write access do not. An agent acting on a substrate of correct-but-incomplete records produces confident automation over partial reality, at machine speed, against the mission's interests.

**What Mimir Labs built.** Yggdrasil ERP is a deterministic, governance-native operational substrate that carries canonical concepts, state transitions, authority, evidence, and policy version as first-class data. Every state transition passes through a single State Constraint Engine. Every constraint is a signed, versioned policy artifact compiled from administrative decisions with cited authority and full lifecycle. AI agents communicate with the substrate through a typed tools layer that can read scoped data and emit typed proposals; they cannot call SQL, cannot commit state, cannot bypass the constraint engine. Ratatosk is the discovery engagement that maps one operational chain — demand to sustainment — through every system and side store the customer runs, surfacing where operational truth is currently lost. Jormungandr is the same enforcement model exported as JSON Schema contracts that govern external systems through the integration surface, enabling deterministic operational policy across multi-vendor environments without consolidating onto a single platform.

**Why this is investable.** The architecture is system-agnostic by design. The same primitive — state-machine substrate with policy enforcement at the transition gate — covers commercial manufacturing, defense-adjacent industrial bases, mission-support sustainment, and AI-mediated operational workflows. The diagnostic engagement is short, scoped, and produces evidence regulators and program offices can consume. The substrate is implementable on customer-controlled infrastructure (self-hosted, ITAR-compatible deployment). The founder is a USMC veteran and mechanical engineer building this with operational seriousness rather than commercial SaaS framing.

**Proof / current signal.** v0.8.0a in alpha; 323-table Postgres schema with row-level security on every tenant-scoped table; native desktop and web clients; 900+ REST endpoints; immutable audit trail at field level; integration test coverage across O2C, P2P, quality-to-resolution, and policy round-trip equivalence. ROPE engine evaluates multi-hop predicates, quantifiers, and conditional actions over canonical operational state with cited authority and policy version captured per decision. Portable policy bundle format (`mimirlabs.rope.policy-bundle` v1) lets policies travel between governance instances without depending on shared infrastructure. Native compliance posture covering SOX, ISO 9001, AS9100, CMMC Level 2, NIST SP 800-171, FDA 21 CFR Part 11, ASC 606, OFAC, ITAR, GDPR, and NIST AI RMF as starter templates. Twelve technical whitepapers; published academic preprint on AI-readiness substrate gaps.

**What we need.** Technical diligence on the deterministic state-machine substrate from a partner who can route it inside the IQT investment committee. If the thesis fits the portfolio shape, introductions to mission elements or defense-adjacent industrial operators whose current operational systems are forcing autonomy-readiness decisions in the next eighteen months.

**Closing.** The mission cannot afford to give agents write access to substrates that don't preserve operational truth. We are building the substrate that does.

---

# 4. Redpoint

## Why agentic AI needs a governed system of reality, not another semantic layer

**One-sentence thesis.** The current investment thesis in agent infrastructure — orchestrators, evaluation harnesses, semantic layers over read paths, vector stores — sits on top of operational substrates that do not contain enough meaning to make the agent's actions safe, and Mimir Labs is the layer underneath that closes the gap.

**Why now.** Three waves of agent infrastructure have shipped: orchestration (LangChain, Agentforce-class platforms), evaluation (eval harnesses, observability), and semantic layers (knowledge graphs, vector stores, retrieval). None of them addresses the underlying problem that the operational systems agents act on do not carry the rules, authority, evidence, or admissibility context that would make the agent's actions provably valid. The fatigue cycle around AI hype is accelerating. The first visible enterprise failure lands in 2027 on a primed audience. The customers who already understand the substrate problem are the ones quietly fixing it now, not the ones still arguing about which orchestrator wins.

**What broke.** Semantic layers and knowledge graphs sit on the read path. They describe data the operational system already produced. They do not change what the operational system was willing to record. If a transaction was written without the policy state, authority, evidence, and admissibility context that made it valid, no downstream layer can reconstruct what was lost. The market has agreed that "AI needs clean data." The market has not yet agreed that clean data is necessary but not sufficient. The data can be correct in every field and still be unsafe for an agent to act on, because the rule that should have decided what the field carries is not in the system. This is not a description problem. It is a substrate problem on the write path.

**What Mimir Labs built.** Yggdrasil ERP is a governance-native ERP whose substrate carries operational meaning — states, authority, policy, evidence, exception path — as first-class data, with every state transition gated through a constraint engine that evaluates Runtime Operational Policy Enforcement rules at the moment the transition is recorded. Ratatosk is the diagnostic that gets us into the customer's environment first: a scoped engagement that walks one value stream end-to-end and surfaces where operational meaning is currently being lost across their existing systems. The diagnostic is honest standalone — customer keeps the artifact whether or not they buy the platform — and it teaches the platform conversation. Jormungandr extends the same enforcement to external ERPs through JSON Schema contracts, so customers who cannot replace their current stack can still close the substrate gap.

**Why this is investable.** This is category creation in the layer beneath where every current AI infrastructure bet sits. The vocabulary forms in 2027. Whoever teaches the market the difference between governing the agent and governing the world the agent acts on owns the second half of the agent-infrastructure category. The wedge — Ratatosk diagnostic — sells today against AI-readiness budgets that are already allocated. The strategic destination — Yggdrasil ERP — is the substrate buyers will be looking for once the first visible agent failure makes the substrate question impossible to defer. We are early enough to write the vocabulary into procurement RFPs before the demand spike brings competitors in.

**Proof / current signal.** v0.8.0a in alpha; full ten-module ERP with 900+ endpoints, multi-tenant Postgres, real-time event mesh; ROPE engine in production with multi-hop path traversal, ANY/ALL/COUNT quantifiers, nested boolean composition, conditional THEN actions, and multi-phase rules. Portable policy bundle format flows policies between Jormungandr-governed external ERPs and Yggdrasil ERP. Twelve technical whitepapers; published academic preprint on the missing layer in enterprise AI-readiness; companion essays already circulating in operator and analyst circles. Founder writing publicly through the operational-canon doctrine: the substrate is the AI safety question.

**What we need.** A pressure-test of the category-creation thesis from a partner who has invested in the read-path side of the agent infrastructure space and is looking for what comes underneath. If the thesis holds up, the most useful next step is two or three introductions to enterprise AI buyers who are already past the orchestration tier and looking at the substrate question.

**Closing.** Every agent infrastructure investment that succeeds in 2027 will be paired with a substrate investment. Mimir Labs is the substrate side of the trade.

---

# 5. Founders Fund

## ERP was the wrong primitive. Autonomous enterprise systems need a state-machine substrate.

**One-sentence thesis.** The enterprise software category accepted the wrong premise forty years ago when it agreed that ERP would be a transactional financial application suite rather than the canonical operating model of the business — and the AI bubble is about to expose that premise at machine speed; Mimir Labs is built on the architecture the category should have chosen and didn't.

**Why now.** The first generation of AI agents will be deployed against operational systems whose substrate was never designed to support autonomous action. The substrate carries enough meaning for human operators to fill in the gaps in meetings and spreadsheets. It does not carry enough meaning for an agent to act safely. Capital flowing into agent platforms requires production deployment against operational substrates inside eighteen months. The visible incidents are coming. The market vocabulary that names the substrate gap forms in 2027. Customers who deploy the substrate-aware answer in 2026-2027 are the ones who are not the public failure.

**What broke.** Enterprise Resource Planning was an operational discipline name from manufacturing — MRP extended from materials to resources to the whole enterprise. The category implemented it as a transactional financial application suite because the chart of accounts was the only structure strong enough to unify the modules and finance owned the budget. Forty years of buyers have signed contracts for Enterprise Resource Planning and received Enterprise Financial Application Suites. The operating model — the rules that decide what is admissible, who is authorized, what state is real, what evidence is required — went somewhere else: spreadsheets, exception meetings, integration mappings, the heads of the operators who know when the documented process does not apply. This was a survivable architectural error in a human-mediated operating loop. It is a category-defining failure in an agent-mediated one.

**What Mimir Labs built.** Yggdrasil ERP is the ERP that takes the name seriously. It carries the operating model as canonical data — states, authority, evidence, policy, exceptions — and enforces transitions through a single State Constraint Engine compiled from signed administrative Decisions through Runtime Operational Policy Enforcement. Agents communicate with the substrate through a typed tools layer that can read scoped data and emit typed proposals; they cannot call SQL, cannot commit state, cannot bypass the constraint engine. The substrate, not the model wrapper, is where the safety guarantee lives. Ratatosk is the diagnostic that gets us into the customer's environment first; Jormungandr is the same enforcement layer applied to incumbent ERPs through contract-style integration governance, so customers who can't or won't replace their current system can still close the substrate gap. The portable policy library that accumulates inside Jormungandr migrates into Yggdrasil ERP when the customer consolidates.

**Why this is investable.** This is the architectural-error thesis. The forty-year-old category premise is wrong, and the AI deployment cycle is the forcing function that makes the wrongness expensive. Palantir's Foundry made an architectural-error claim about the analytical layer of the enterprise. Anduril made one about the defense industrial base. Mimir Labs is the operational layer claim: the operating model belongs in the substrate, not in the consultants' decks. The market is teachable in 2026-2027 because the alternative — continuing to fix the substrate with more consultants — visibly stops working when agents are in the loop. We are not riding the AI bubble. We are the substrate the AI bubble lands on, and we are early enough to be the answer when it does.

**Proof / current signal.** v0.8.0a in alpha; 323-table multi-tenant Postgres schema with row-level security; State Constraint Engine in production; ROPE engine evaluates predicates over canonical state with cited authority and policy version captured per decision; integration test arcs prove end-to-end business processes including round-trip equivalence of the portable policy format. Self-hosted deployment option for ITAR / regulated environments. Twelve technical whitepapers; published academic preprint; companion essays establish the operational-canon doctrine in public. Founder is a USMC veteran and mechanical engineer. Pre-revenue, pre-customer, early stage by design — the architecture has to be in place before the customer is, because the substrate is the asset.

**What we need.** A conversation with the partner whose pattern recognition includes architectural-error theses at the category level. If the architecture holds up under technical diligence, the question is whether Mimir Labs fits the firm's contrarian-infrastructure thesis at the seed stage.

**Closing.** The enterprise software category is forty years into a wrong premise. The AI deployment cycle is what makes the premise visible. We built the substrate the next forty years will run on.

---

# 6. Benchmark

## A new system of record for agentic operations

**One-sentence thesis.** The enterprise system of record needs to be rebuilt around state-machine discipline before autonomous agents can be safely placed on top of it, and Mimir Labs is the team and architecture doing it from the substrate up.

**Why now.** AI agents are about to acquire operational write access to systems whose substrate was designed for human-mediated workflows. Human operators absorbed the missingness; agents will not. The customers who solve this before the visible incident lands are the references the rest of the market will buy from. The architecture has to be in place before the demand arrives, because the substrate is the asset and substrates are not retrofitted.

**What broke.** The system of record is not the system of reality. The ERP records that a transaction happened; it does not preserve, in the substrate, what made the transaction valid — policy state, authority, evidence, admissibility, version. That meaning lives in side stores and operator heads. The gap is a survivable inconvenience under human mediation. It is the safety boundary under autonomous mediation. The category has not yet acknowledged the distinction in product terms.

**What Mimir Labs built.** Yggdrasil ERP is a governance-native ERP where every state transition passes through a single State Constraint Engine. Every constraint is a signed, versioned policy artifact compiled from administrative Decisions through Runtime Operational Policy Enforcement. The substrate carries operational meaning — states, authority, evidence, policy, exception path — as first-class data. AI agents act on the substrate through a typed tools layer that can read scoped data and emit typed proposals but cannot commit state or bypass the constraint engine. The safety guarantee lives in the database, not the prompt. Ratatosk is the diagnostic engagement that gets us into the customer's environment first — a scoped, repeatable walkthrough of one value stream that produces a written operating model the customer keeps. The wedge teaches the platform. The platform is where the substrate lives.

**Why this is investable.** The architecture is clean. The wedge has its own unit economics. The substrate is the moat — once the canonical operational model is captured for a customer, the migration path back out is the same painful path every ERP cutover takes today, only this time the customer is moving away from a substrate that worked rather than one that didn't. The category is teachable in the 2026-2027 window before competitors learn the vocabulary; whoever owns the vocabulary owns the procurement RFPs that follow.

**Proof / current signal.** v0.8.0a in alpha; State Constraint Engine in production; ROPE engine with multi-hop join paths, quantifiers, nested boolean composition, conditional THEN actions, multi-phase rules; integration test arcs covering O2C, P2P, L2C, Q2O, R2R, Q2R, and round-trip equivalence of the portable policy bundle. Native Qt 6 desktop client and Next.js web client. 323-table multi-tenant Postgres schema with row-level security; immutable audit trail at field level. Twelve technical whitepapers; academic preprint; companion essays establishing the operational-canon doctrine. Penn State LaunchBox incubation; MANTEC partnership; 2026 Validation Cohort of five PA manufacturers in discovery now. Founder: USMC veteran, mechanical engineer, architect-of-record on the system.

**What we need.** A technical diligence conversation that goes deep on the state-machine substrate and the ROPE policy model, with the partner whose pattern recognition matches "system of record" investments at the category level. If the architecture stands up, the next question is whether the wedge-to-platform motion is the right shape for a Benchmark seed.

**Closing.** The system of record is being rebuilt. We are the team rebuilding it.

---

# 7. Goldman Sachs Principal Strategic Investments / Tier-1 Financial Strategic Arms

## Deterministic transaction-state integrity for autonomous financial operations

**One-sentence thesis.** Autonomous and AI-mediated workflows in financial operations will only be safe to deploy on substrates that preserve transaction state, authority, evidence, and policy version deterministically at the moment of every state transition, and Mimir Labs is building that substrate.

**Why now.** Financial institutions are evaluating AI-mediated workflows across operations, clearing, reconciliation, settlement, control environments, and customer-adjacent workflows. The underlying operational systems were built for human-mediated transaction processing with manual exception handling and reconciliation discipline. The substrate that supported the old loop will not support the new one. Regulators are watching. Insurance markets are repricing. Boards are asking specifically about agent exposure. The substrate question reaches the financial sector first because the consequences are loudest and the auditors are nearest.

**What broke.** Operational substrates record transactions but do not preserve, as first-class data, the policy state, authority, evidence, and admissibility context that made the transaction valid. Reconciliation labor and control environments compensate for what the substrate doesn't carry. Human controllers absorb the gap. Agents in the path do not. An agent operating on a substrate of correct-but-incomplete transaction records produces confident automation over partial reality at clearing speeds. The reconciliation function — the implicit guarantor of transaction-state integrity in human-mediated workflows — disappears at the moment the substrate is asked to be the guarantor itself.

**What Mimir Labs built.** Yggdrasil ERP is a governance-native operational substrate that carries transaction state, authority, policy, evidence, and version as first-class data. Every state transition passes through a single State Constraint Engine. Every constraint is a signed, versioned policy artifact compiled from administrative Decisions through Runtime Operational Policy Enforcement, with cited authority and full lifecycle. Agents communicate with the substrate through a typed tools layer that can read scoped data and emit typed proposals but cannot commit state or bypass the constraint engine. The audit trail is immutable at field level. The policy version that produced any given decision is recoverable from the substrate, not reconstructed from documentation. Ratatosk is the diagnostic engagement that maps one operational chain — a clearing flow, a reconciliation chain, a control environment — through every system and side store, and surfaces where transaction-state integrity is currently dependent on labor rather than substrate. Jormungandr is the same enforcement model applied to external systems through JSON Schema contracts, governing transition admissibility at the integration surface without requiring substrate replacement.

**Why this is investable.** Transaction-state integrity is the substrate question reframed in language the financial sector already takes seriously. The architecture serves operational deployment of AI in environments where the control function and the audit function are not optional. Diligence-friendly: deterministic by design, auditable by construction, self-hosted-capable, ROPE policy provenance is independently verifiable. Strategic fit is the substrate underneath every clearing, reconciliation, and operational-control workflow the firm runs internally or sells to its institutional clients. A strategic investment is not only a financial bet; it is access to a substrate posture the firm's own AI deployment program can leverage.

**Proof / current signal.** v0.8.0a in alpha; State Constraint Engine in production; ROPE policy library demonstrated against transaction-gate scenarios including value-threshold dual-signing, exception grants, supplier verification, and inspection-cascade flows. Compliance template library covering SOX 302/404, ASC 606, OFAC sanctions, internal-control posture, NIST AI Risk Management Framework as starter Decisions. Immutable audit trail; portable policy bundle format with stable cryptographic signature. 323-table multi-tenant Postgres schema with row-level security. Self-hosted deployment option for institutional data sovereignty. Twelve technical whitepapers; academic preprint on the AI-readiness substrate gap. Founder: USMC veteran, mechanical engineer.

**What we need.** A conversation with the strategic-investment team whose mandate includes substrate-layer AI safety for financial operations. Technical diligence on the deterministic transaction-state architecture, and — if the strategic fit holds — introductions to operational owners inside the firm who would be the natural design partners for a substrate-aware control environment.

**Closing.** The control environment is moving into the substrate. We built the substrate it moves into.

---

# Outbound emails

## A. General technical infrastructure investor

**Subject:** Mimir Labs — governed substrate for enterprise agents

Hi [first name],

Quick note. I'm building Mimir Labs. The thesis in one sentence: enterprise AI agents are about to acquire write access to systems whose substrate does not contain enough operational meaning to make the agent's actions safe, and the substrate gap is what every current AI infrastructure bet sits on top of.

Most enterprises have a system of record. They do not necessarily have a system of reality. The ERP records that the transaction happened. The rules that made it valid — policy state, authority, evidence, admissibility, version — live in spreadsheets, exception meetings, integration mappings, and operators' heads. Human operators absorbed the missingness. Agents will not. This is not a dirty data problem; the fields are correct. It is a missing-rule problem on the write path.

Our wedge is Ratatosk — a five-to-eight-day diagnostic that walks one value stream end-to-end across the customer's systems and side stores and surfaces where operational meaning is being lost. The strategic destination is Yggdrasil ERP, a governance-native ERP where every state transition is gated by Runtime Operational Policy Enforcement at the database layer rather than described in documentation.

Status: v0.8.0a in alpha, full 10-module ERP, 900+ endpoints, native desktop + web clients, multi-tenant Postgres with row-level security, integration test arcs covering end-to-end business processes including portable policy round-trip equivalence. Twelve technical whitepapers; academic preprint on AI-readiness substrate gaps. Penn State LaunchBox + MANTEC partnerships; 2026 Validation Cohort in discovery.

Two asks:

1. A short call to pressure-test the substrate thesis. Twenty minutes.
2. If it lands, an introduction to the right person at the firm — or in your portfolio — who should see this.

Founder-led, technical, pre-revenue by design. Happy to send the whitepapers and preprint ahead of the call.

Best,
Christopher Gaither
Mimir Labs

---

## B. Defense / IQT / strategic infrastructure

**Subject:** Deterministic substrate for AI-mediated operational systems

[first name] —

A short note. I'm building Mimir Labs. We are constructing the deterministic operational substrate that AI-mediated workflows in contested logistics, sustainment, and mission-support environments will require but do not have today.

The architectural problem: commercial enterprise systems record transactions but do not preserve, in the substrate, the operational meaning that mission elements rely on — supplier qualification at the time of acceptance, item revision at the time of release, authority at the time of approval, policy version at the time of decision. The meaning lives in side stores and operator knowledge. Humans absorb the gap through reconciliation and meetings. Agents inheriting write access do not. The result is a substrate where autonomous action is structurally unsafe regardless of how good the agent is.

Our architecture: every state transition passes through a single State Constraint Engine. Every constraint is a signed, versioned policy artifact compiled from administrative Decisions through Runtime Operational Policy Enforcement (ROPE), with cited authority and full lifecycle. Agents communicate through a typed tools layer that can read scoped data and emit typed proposals; they cannot call SQL, cannot commit state, cannot bypass the constraint engine. The safety guarantee lives in the database, not the prompt. Zero-trust at the operational substrate layer rather than only at the perimeter.

We start with Ratatosk, a discovery engagement that maps one operational chain across all the systems and side stores the customer runs, and surfaces where operational truth is currently lost. Yggdrasil ERP is the substrate built on the resulting canonical model, with self-hosted, ITAR-compatible deployment options. Jormungandr extends the same enforcement model to external systems through JSON Schema contracts so substrates that can't or won't be replaced can still be governed.

Founder is a USMC veteran and mechanical engineer.

Asks:

1. A short call to test the deterministic-substrate thesis against your investment frame.
2. If it holds up, technical diligence and — where appropriate — introductions to mission-adjacent industrial operators or program offices whose autonomy-readiness decisions are forcing the substrate question.

Best,
Christopher Gaither
Mimir Labs

---

# Templates

## Warm intro ask

> [Name] —
>
> I'm looking for an introduction to [investor name / firm] — specifically [partner name] if possible. The connection point: we're building the substrate layer underneath where their current AI infrastructure thesis sits, and the one-page memo we wrote for them lands cleanly against their pattern recognition.
>
> If you'd be willing, the cleanest path is forwarding the memo with a one-line note. I'm happy to send a draft of that note if useful. No pressure if the timing isn't right — I'd rather wait for a clean shot than burn the relationship on a soft one.
>
> Memo attached. Public materials (preprint, whitepapers, essays) at mimirlabs.net if you want to vet the thesis before forwarding.
>
> — Chris

## Operator pressure-test ask

> [Name] —
>
> Quick favor. I want to pressure-test a thesis with an operator who has lived through a real ERP cutover and would smell something that didn't ring true.
>
> The claim: most ERP projects do not fail because the business failed to obey the system; they fail because the system never fully contained the business. The real operating model lives in spreadsheets, exception meetings, integration mappings, and operator heads — and that gap is about to become a control problem when AI agents acquire write access to those systems.
>
> Twenty minutes. I want your honest read on whether the frame holds up against what you saw on the ground. If it falls apart, I'd rather know now than three months from now.
>
> Cheat sheet attached. The conversation goes wherever your experience pushes it.
>
> — Chris

---

# Provenance and proof discipline

## Proof claims used

All proof claims in the memos above are sourced from the current repo state as of v0.8.0a (June 2026):

- **Product state.** v0.8.0a alpha, ~90% build/run readiness, ~75% sell/use readiness (per CLAUDE.md). 323-table multi-tenant Postgres schema with row-level security on every tenant-scoped table. 900+ unique REST endpoint paths (976 distinct paths counted across `server/src/routes/*.cpp` as of June 2026; 1,300+ method registrations). Native Qt 6 desktop client and Next.js web application. Multi-tenant by design (not retrofitted).
- **State Constraint Engine and ROPE.** Production code in `server/src/services/ConstraintEvaluator.cpp` and `server/src/services/RopeService.cpp`. Multi-hop join paths, ANY/ALL/COUNT quantifiers, nested boolean composition, conditional THEN actions, multi-phase rules — all confirmed in v0.7.1a-46 and v0.8.0a code.
- **Portable policy bundle.** Format spec at `docs/whitepapers/12-policy-bundle-format.md`. Round-trip equivalence integration test arc at `tests/stories/25-rope-policy-roundtrip/`.
- **Business processes validated.** O2C, P2P, L2C, Q2O, R2R, Q2R — confirmed in MARKET_ANALYSIS.md and integration test arc list.
- **Carrier API integration.** UPS, FedEx, USPS REST APIs (sandbox), tenant-isolated credentials, multi-carrier rate shopping, label generation, OAuth token management — confirmed in MARKET_ANALYSIS.md.
- **Compliance template library.** SOX 302/404, ISO 9001, AS9100, AS9102, CMMC Level 2, NIST SP 800-171, FDA 21 CFR Part 11, GAMP 5, ASC 606, OFAC, ITAR, GDPR, NIST AI RMF — confirmed in whitepaper 11-rope.md §16.
- **Whitepapers.** Twelve published whitepapers (00-platform-overview through 12-policy-bundle-format) in `docs/whitepapers/`.
- **Academic preprint.** `the-missing-layer-in-enterprise-ai-readiness.md` in `docs/research/`.
- **Partnerships and cohort.** Penn State LaunchBox incubation, MANTEC partnership, 2026 Validation Cohort of five PA manufacturers in discovery — confirmed in COMPANY_FACT_SHEET.md and EXECUTIVE_SUMMARY.md. No signed pilots yet; cohort is in discovery.
- **Founder bio.** USMC veteran, mechanical engineer, founder/CEO — confirmed in COMPANY_FACT_SHEET.md.

## Claims deliberately not made

I avoided fabricating or overstating the following because the repo does not support them:

- **No signed pilot customers** are claimed. The 2026 Validation Cohort is described as "in discovery," which matches the current state.
- **No revenue, ARR, or LTV/CAC numbers** are cited. The financial projections in EXECUTIVE_SUMMARY.md are presented as forward projections, not as traction, and the memos avoid the temptation to wave at them as proof.
- **No specific named investors, advisors, or partners** beyond Penn State LaunchBox and MANTEC.
- **No certifications** are claimed (SOC 2 is on the roadmap for Q4 2026, not earned).
- **No press, podcast appearances, or media coverage** is cited. The user mentioned podcast/media as possible signal; I included it as a *target* (for the Amplify and Redpoint memos under "public footprint") but not as completed proof.
- **No specific customer logos or design partners** beyond what's documented.
- **No traction metrics** beyond the publicly verifiable Crunchbase top-100k visibility milestone (omitted from memos because it doesn't earn its line).
- **No claims of category leadership** or analyst recognition.

## Assumptions made

- I treated the OPE → ROPE rename completed today as the canonical naming for new investor-facing material. All seven memos use ROPE.
- I treated the Yggdrasil ERP product framing as the "governance-native operational substrate" rather than "deterministic B2B marketplace" — the latter appears in older sales materials (EXECUTIVE_SUMMARY.md from February 2026) but the more recent positioning (the-system-the-business-runs-on.md, the missing-layer preprint, and the 2026-05-22 LinkedIn post) has shifted toward the substrate framing. The memos use the current positioning.
- I treated the pre-seed/seed ask in the memos as an opening for conversation, not a fixed term sheet. The $200K ask from EXECUTIVE_SUMMARY.md is a BFTP-specific number; the memos do not name a number, because each investor's appropriate ask varies.
- File location: I saved this to `docs/business/investor_target_memos.md` alongside other investor-facing materials (Investor Deck.pdf, MARKET_ANALYSIS.md, acquirer-strategic-fit.md). If a dedicated `business/data-room/13-investor-memos/` or equivalent is preferred, the file can move; the content is location-independent.

---

*Mimir Labs LLC. Confidential and internal. Update the proof section as new traction lands.*
