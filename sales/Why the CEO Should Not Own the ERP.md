# Why the CEO Should Not Own the ERP

**Position Paper — Mimir Labs**

The most expensive ERP failures don't come from bad software. They come from the wrong person making the wrong decisions at the wrong level of abstraction. When a CEO takes direct ownership of an ERP system — selecting it, designing its workflows, defining its data model, or driving its timeline — the result is a system that reflects how the executive *imagines* the business runs, not how it actually operates.

The CEO's role is to set the business objectives from which the mission and constraints of the data system are derived. Everything below that belongs to the people who understand how data systems enforce those objectives — and what happens when they don't.

This document outlines six common failure patterns, identifies who should own each decision, and makes the case for why system custodianship belongs with domain experts in data systems, not with executive leadership.

---

## 1. The CEO Who Picks the System

**What happens:** A CEO hears "SAP" at a conference or from a peer and mandates it company-wide. The actual users — plant managers, warehouse leads, AP clerks — are not consulted. The system gets configured for how the CEO *thinks* the business runs, not how it actually runs. Six months post-go-live, every department is running shadow spreadsheets because the workflows don't match reality.

**Why it fails:** System selection requires evaluating fit against actual operational workflows, integration requirements, data volume, team capability, and total cost of ownership. These are technical and operational assessments. An executive sponsor provides the budget and the mandate — but the selection criteria must come from the people who will live in the system every day and the people who understand what makes a system viable long-term.

**Who should own this decision:**
- **CEO/CFO:** Sets the budget envelope, defines the business case (e.g., "we need to reduce order-to-ship from 5 days to 2"), and authorizes the investment.
- **CTO/CIO or systems lead:** Evaluates technical fit — infrastructure, security, integration architecture, vendor support model, long-term maintainability.
- **Operations leadership (VP Ops, Plant Manager, Controller):** Defines the functional requirements — what the system must do, which integrations are non-negotiable, and what the current pain points are.
- **Implementation partner (if external):** Provides independent assessment of vendor fit based on experience with similar companies.

**The CEO's correct role:** "We need to be on a modern system within 18 months that supports our growth plan. Here is the budget. I am authorizing [CTO/VP Ops] to lead the selection. Bring me the shortlist with your recommendation."

---

## 2. The CEO Who Owns the Data Model

**What happens:** The CEO decides that customer accounts should be structured by sales territory because that's how the board deck is organized. But operations needs customers grouped by shipping region, finance needs them by billing entity, and service needs them by contract. The CEO's view gets baked into the schema. Three departments now maintain parallel lookup tables to translate between the CEO's organizational model and the ones they actually need.

**Why it fails:** A data model must serve all consumers of the data, not just the consumer with the most authority. When the executive view is privileged in the schema, every other view becomes a workaround. Workarounds are where data quality goes to die. This is a structural decision with structural consequences — it requires someone who understands how schema choices propagate through every downstream process.

**Who should own this decision:**
- **CTO/CDO or data architect:** Designs the canonical data model that serves all departmental views without privileging any single one. Understands how schema decisions affect integration, migration, and long-term maintainability.
- **Department heads (Sales, Finance, Operations, Service):** Each defines what they need to see and how they need to slice the data. These become *views*, not structural decisions.
- **Database architect or implementation consultant:** Translates business requirements into a schema that supports multiple perspectives without redundancy.

**The CEO's correct role:** "I need revenue by territory on the board deck. Make sure the system can produce that view — but don't build the whole thing around my reporting needs."

---

## 3. The CEO Who Drives Timelines

**What happens:** The CEO promises the board a go-live date. That date becomes the immovable constraint — not data quality, not training, not testing, not validation. The implementation team cuts UAT, skips data cleansing, and goes live with known defects. Post-launch: inventory counts are wrong, invoices double-post, customer records are duplicated, and the company loses two quarters cleaning up a mess that could have been caught in testing.

**Why it fails:** ERP go-live dates are not product launch dates. They are operational cutover events that affect every transaction the company processes. Missing a launch date for a marketing campaign costs awareness. Missing a data quality milestone for an ERP cutover costs revenue, customer trust, and regulatory compliance. The person who sets the timeline must understand what the milestones actually measure.

**Who should own this decision:**
- **Program manager / implementation lead:** Owns the project plan, defines milestones, and is accountable for go/no-go criteria at each gate. Raises red flags early when timelines are at risk.
- **CTO/CIO:** Validates that the technical readiness criteria are sound and that the team's assessment is credible. Acts as the executive voice that can push back on an unrealistic timeline with authority.
- **Data migration lead:** Owns the data readiness gate — no go-live until data quality metrics meet the agreed threshold.
- **Department leads:** Each signs off on their functional area's readiness (UAT complete, training done, cutover plan tested).
- **CEO/CFO:** Sets the boundary ("we cannot afford another year on the legacy system") but does *not* override a no-go recommendation from the implementation team.

**The CEO's correct role:** "I need to understand why we're at risk of slipping and what resources would get us back on track. If the team says we're not ready, I want to know what 'ready' looks like and what it takes to get there — not a forced go-live."

---

## 4. The CEO Who Defines Workflows

**What happens:** The CEO mandates that all purchase orders over $5,000 require their personal approval. It sounds like responsible oversight. In practice, 60% of POs exceed the threshold, the CEO travels three weeks a month, and the approval queue backs up so badly that production lines stop for lack of parts. Middle managers start splitting POs into $4,999 chunks to avoid the bottleneck. The control the CEO intended is completely circumvented — and now the audit trail is worse than before.

**Why it fails:** Workflow design requires understanding transaction volume, timing constraints, delegation patterns, and exception handling. A rule that looks sensible in a board meeting can be operationally catastrophic when applied to hundreds of daily transactions. Someone who understands how workflow rules interact with real transaction patterns would have caught this before it was ever configured.

**Who should own this decision:**
- **Process owner (e.g., Purchasing Manager, Controller):** Designs the approval workflow based on actual transaction patterns, risk tolerance, and operational tempo. Proposes tiered thresholds with appropriate delegation.
- **CTO/CIO or systems lead:** Ensures the workflow design is implementable without creating system-level bottlenecks or audit gaps.
- **Internal audit or compliance:** Validates that the controls are adequate for the company's risk profile and regulatory obligations.
- **System configurator:** Implements the workflow with proper delegation rules, escalation paths, and exception handling.

**The CEO's correct role:** "I need confidence that we're not overspending and that large purchases have appropriate oversight. Design a control structure that gives me visibility without creating bottlenecks. I want to see exceptions, not approve every transaction."

---

## 5. The CEO Who Mandates Metrics

**What happens:** The CEO reads an article about OEE (Overall Equipment Effectiveness) and demands it on every production dashboard by next quarter. The plant doesn't have sensors on half its machines. The team starts manually entering estimated uptime numbers to produce the metric the CEO wants to see. The number goes on the dashboard. It looks authoritative. It is fiction. Decisions get made on fabricated data because the metric was mandated before the measurement infrastructure existed.

**Why it fails:** A metric is only as good as the data feeding it. Mandating a metric without ensuring the measurement capability exists creates perverse incentives: teams will produce the number they're told to produce, even if they have to fabricate it. The CEO ends up with a dashboard full of confident-looking numbers that reflect compliance with the request, not operational reality. A data systems expert would ask "can we actually measure this?" before "how do we display it?"

**Who should own this decision:**
- **CTO/CDO or data team lead:** Assesses measurement readiness — what data sources exist, which are reliable, and what instrumentation investment is needed to measure what's currently unmeasured.
- **Operations / engineering leadership:** Determines which measurements are currently reliable and provides ground truth on what's actually happening at the machine level.
- **Data / BI team:** Designs the metric calculations, validates data sources, and flags where measurement gaps exist.

**The CEO's correct role:** "I need to know where we're losing capacity. What can you measure reliably today? What would it take to measure the rest? Give me what's real now, and a roadmap to measure what's not."

---

## 6. The CEO Who Overrides the Migration Plan

**What happens:** The CEO decides that the legacy system should be shut off the day the new one goes live — no parallel run, no phased rollout. "We're not paying for two systems." The cutover happens on a Friday. By Monday, the new system can't process three types of transactions that the legacy system handled via customizations nobody documented. The company spends two weeks doing manual workarounds while the implementation team scrambles to patch the gaps.

**Why it fails:** Cutover strategy is a risk management decision, not a cost decision. A parallel run costs money. An unrecoverable failed cutover costs more — in emergency remediation, lost transactions, customer impact, and team morale. The people who understand the risk surface are the ones who understand what can go wrong at the data level — undocumented customizations, implicit dependencies, integration edge cases that only surface under production load.

**Who should own this decision:**
- **CTO/CIO or implementation lead:** Designs the cutover strategy (big bang, phased, parallel) based on risk assessment, rollback capability, and operational complexity. Owns the risk/cost tradeoff analysis.
- **Department leads:** Each assesses their area's readiness for cutover and the consequences of failure in their domain.
- **IT / infrastructure:** Ensures the rollback plan is viable and tested.

**The CEO's correct role:** "What is the risk of each cutover approach, and what does each one cost — including the cost of failure? Present me with options and your recommendation."

---

## The Pattern

In every case, the failure follows the same structure:

1. The CEO specifies the **solution** instead of the **problem**.
2. The people who know the work don't push back — because they can't, or because the organizational culture doesn't reward it.
3. The system gets built to satisfy the executive's mental model instead of operational reality.
4. The people who actually use the system build workarounds — shadow spreadsheets, split transactions, manual entries, offline processes.
5. The official system becomes an expensive filing cabinet. The real work happens outside it.

## The Underlying Principle

This paper uses the CEO as the example because the CEO is the most common and most consequential case — but the principle is not specific to the CEO.

**Any dynamic in which the custodian of a data system is not a domain expert in data systems is a failure mode.**

It does not matter whether that custodian is the CEO, the CFO, a VP of Sales, a plant manager, or an IT director who came up through desktop support. If the person who holds decision-making authority over the system's structure, behavior, and constraints does not deeply understand how data systems work — how schemas enforce meaning, how workflows create or destroy data quality, how integration points propagate errors, how migration decisions compound — the system will be shaped by assumptions instead of engineering.

This is not an argument for excluding business leadership from the process. It is the opposite. Business leadership defines the *objectives*. Data system expertise defines the *implementation*. The failure mode is when one of these roles absorbs the other — when a business leader makes implementation decisions without data expertise, or when a technologist makes structural decisions without understanding the business. Both produce systems that serve the wrong master.

The reason this matters for ERP specifically is that an ERP system is not a tool like a spreadsheet or an email client. It is the operational nervous system of the company. Every transaction, every approval, every inventory movement, every invoice passes through it. A structural error in the data model does not produce a bug report — it produces months of silently wrong data that surfaces only when someone tries to reconcile, audit, or migrate. By then, the cost of correction dwarfs the cost of the original implementation.

The custodian of that system must be someone who understands this. Not someone who uses the system. Not someone who pays for the system. Someone who understands what the system *is* — and what it can become if the wrong decisions are made at the foundation level.

This is why organizations that get this right tend to place custodianship in roles that reflect that expertise: CTO, CIO, CDO, VP of Enterprise Systems — titles that exist specifically because the work requires a domain expert with executive authority. These roles are not overhead. They are the organizational acknowledgment that data systems are complex enough to require dedicated leadership, and consequential enough to require that leader to sit at the table where business objectives are set.

A company that does not have such a role — or that has one but subordinates it to a non-technical executive on system decisions — is a company where the ERP will eventually be governed by whoever shouts loudest, spends most, or last talked to the CEO. That is not governance. That is politics with a database underneath it.

## The Correct Model

| Decision | CEO Owns | Data Systems Leadership Owns |
|----------|----------|-------------------------------|
| Business objectives | "Reduce lead time by 40%" | How the system enforces and measures that |
| Budget and authorization | Dollar amount and timeline boundaries | How to allocate within those boundaries |
| Risk tolerance | "We cannot afford X" | What controls achieve that threshold |
| Vendor relationship | Executive sponsor, escalation path | Selection criteria, technical evaluation, long-term viability |
| Go/no-go | Final authority on recommendation | The recommendation itself, with evidence |
| Metrics and reporting | "I need to understand X" | What's measurable, how to present it truthfully |
| Data model and schema | "The business operates this way" | How to represent that truthfully in the system |
| Cutover and migration | Cost and urgency constraints | Risk assessment, strategy, rollback planning |

**The CEO sets the destination. The data systems leader builds the road — and is accountable for whether it holds up under load.**

---

*Mimir Labs builds ERP systems for manufacturers who have learned this lesson. Yggdrasil's 10-module architecture enforces semantic integrity at the schema level — not because a CEO mandated a structure, but because the data model was designed by people who understand what happens when the wrong person makes structural decisions about data.*
