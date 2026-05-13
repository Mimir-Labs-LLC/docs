# Enterprise Physics — Podcast Opener Sequence

**Use when:** appearing on an ERP-focused podcast or interview (Kimberling, ERP Today, Diginomica, IT Visionaries, Acquired-style operator shows) where the audience has lived through ERP failure modes and is allergic to vendor positioning. The sequence works for any interviewer who will let you reframe the conversation away from feature comparison.

**Do not use when:** appearing in front of a buyer who came specifically to evaluate against a NetSuite/SAP RFP. The frame-break is too aggressive when the audience already has a defined shortlist.

**Thesis carried by this sequence:** Mimir Labs did not build an ERP. We built a data layer that models the *core physics* every business shares — the universal substrate of identity, state, authority, and evidence — and the application surface ("the ERP") is what emerges from that model. The closest architectural peer is Palantir Foundry. We deliver the same architecture at ERP economics because the *core* physics is universal and the canonical model is built once, in advance, instead of per customer.

**Why "core" matters:** The single most important precision in this sequence is the word *core*. Without it, the physics claim is overreach — every business is in fact different in many ways, and a listener will reject "every business has the same physics" as obviously false. With *core*, the claim is defensible and structurally correct: every business shares the same foundational substrate (things have identity, state, authority, and evidence; transitions consume resources and produce records), while *peripheral physics* (industry-specific concepts like lot tracking, serial numbers, regulatory holds) and *customer rules* (approval thresholds, routing logic, exception handling) vary. The canon models the core and the peripheral physics for the verticals we serve; the policy layer captures the customer rules; the extension mechanism handles genuinely novel customer concepts. See the "Core vs. peripheral vs. rules" section below for the full taxonomy.

---

## The sequence

**Kimberling:** Let's start where I always start. Tell me what you've built. And I'll note for the audience — when my team booked you as an ERP vendor, you pushed back on the framing. Why?

**You:** Because we didn't build an ERP. We built a data layer that can run a business.

**Kimberling:** Okay. That's a hell of an opening. What does that actually mean? Isn't a data layer just a database with extra steps?

**You:** Different category. Think of it this way. Every business runs on the same *core* physics — the same foundational rules about how operations actually work. A part either has a supplier of record or it doesn't. An order either ships from a location with inventory or it doesn't. A state transition either has authority behind it or it doesn't. I say *core* deliberately, because that's the part that's universal. The peripheral physics — things specific to your industry, like serial-number tracking for medical devices or heat-number traceability for aerospace — those vary. The customer-specific rules — which approver, what threshold, which combination triggers which resolution — those vary too. But the core, the fact that things have identity and state and authority and evidence, doesn't vary. It can't. That's what makes it physics. The dirty secret of most ERPs is that they ignore the core physics and bolt application features on top — and because the core is the same everywhere, the consequence is that every ERP ends up reinventing the same substrate badly, then differentiating on the wrappers. That's why your audience watches them fail. What we built models the core physics first — the concepts a business is made of, the relationships between them, the states they can be in, the transitions allowed between states, the authority required for each transition, and the evidence the system keeps that the transition actually happened. Then it layers the peripheral physics on top of that, for the verticals we serve. Then the customer's rules go on top of that. Everything anyone thinks of as "the ERP" — the screens, the workflows, the reports — is what emerges from those layers. The applications are downstream of the physics, not the other way around.

**Kimberling:** That's not how most ERP vendors talk. Why are you the only one in this category making that argument?

**You:** Because most ERP vendors aren't in this category. SAP isn't. Oracle isn't. NetSuite isn't. Microsoft isn't. The closest serious competitor is Palantir Foundry — they made the same argument for intelligence operations and defense logistics fifteen years ago, and they've been making it ever since. The premise that operations should flow through a substrate that models the physics, instead of through a stack of customizable modules that obscure it, is rare. Palantir shares it. We share it. Almost nobody else does.

**Kimberling:** Palantir takes eighteen months and seven figures to deploy. How do you deliver the same architecture at price points my audience actually buys at?

**You:** By modeling the core once instead of per customer. Palantir's economics are services-led — they bring forward-deployed engineers and build the ontology with each customer as an engagement, because they treat every customer's physics as bespoke. Our bet is the opposite. The core physics is universal — it has to be, that's what makes it physics — so the canon is built. Three hundred twenty-three tables, covering the core plus the peripheral physics for manufacturing, finance, quality, service, the rest of the operational surface a real business has. A customer adopts the model instead of authoring it. The customer-specific variation — the rules, the approval thresholds, the workflow choices — lives in a signed policy layer on top. The peripheral physics for verticals we don't cover yet is where we extend the canon, not the customer's instance. The core underneath is the same for everyone, because it has to be. That's what makes it a product instead of a five-year consulting engagement.

**Kimberling:** Alright. Make it concrete. What does "modeling the physics" actually look like in practice?

**You:** Take a real rule a manufacturing business has. An order from Customer A includes a SKU whose bill of materials uses a part from Supplier X, and the order is shipping to a specific ZIP code. That combination requires either procurement approval, or an exception from the customer, or a review by a product engineer — any one of the three resolves it. Notice the three layers in that example. *Orders, customers, SKUs, parts, suppliers, ship-to addresses, approvals* — that's core physics. Every business that fulfills orders has those, in those relationships. *Bills of materials, exceptions, engineering reviews* — that's peripheral physics specific to manufacturing. Every manufacturing business has those; a pure distribution business might not. *Which combination of customer, supplier, and ZIP triggers which resolution path* — that's the customer's rule, layered on top of the core and peripheral physics underneath. We model the first two layers. The customer authors the third. The question every ERP has to answer is where that rule actually lives. In an SAP shop, it lives in ABAP code somewhere, written by a consultant five years ago, and nobody currently at the company can tell you who authored it or why it's there. In a Palantir shop, it lives in AIP Logic — better, but inside the Palantir runtime, requiring Palantir to maintain. In our system, that rule is a signed administrative decision. Your CFO signs it. Your auditor can read it in JSON. Your operations team can replay it against last quarter to see what it would have done. And when an order hits that condition, the data layer refuses to advance the order until one of the three resolution paths is satisfied — not because the application code says so, but because the layer enforces it as a gate on the state transition. That's the difference between recording a business and running one. Recording is what most ERPs do. They observe the physics and produce reports about it. Running it means the layer is the physics.

**Kimberling:** How many customers do you have doing this in production right now?

**You:** None. Pilots starting this year. I'd rather tell you that straight than dance around it, because the architectural claim is the load-bearing thing, and it either holds in deployment or it doesn't. We'll find out the same way Palantir found out in 2010 — by putting it in front of real businesses and seeing what breaks. What I can tell you is that everything I've described is built. The physics is modeled. The state engine exists. The authority artifacts are signed and audit-logged. The migration tooling, the integration governance, the cross-system enforcement layer for customers who aren't ready to leave their existing ERP — all of that exists. The open question isn't "does the architecture work in theory." It's "will it hold under the messy reality of the first ten customers." That's a question I'm willing to have. It's a better question than the one every ERP vendor on your show for the last twenty years has had to answer, which is "why does my implementation cost three times what you quoted me, and why is the actual data still in spreadsheets?" Because the spreadsheets are where the real physics has been hiding the whole time. The ERP just didn't model it.

---

## Structure notes — why the moves work in this order

**Move 1 — The opener: "We didn't build an ERP. We built a data layer that can run a business."**
Breaks the frame the audience expects. Refuses the ERP-vendor category before any feature-checklist evaluation can begin. Three audiences hear three different valid claims in the same sentence — engineers hear "data layer," executives hear "run a business," ERP veterans hear "we didn't build an ERP."

**Move 2 — The physics framing.**
This is the load-bearing move. Without it, "data layer" can be misread as a database vendor. The framing supplies a structural definition: every business runs on the same *core* operational substrate, and the system either models it accurately or fails. The qualifier *core* is essential — without it, the claim is overreach and a sophisticated listener will reject it. With it, the claim is structurally correct: the core is universal (identity, state, authority, evidence), the peripheral physics is industry-specific (lot tracking, serial numbers, regulatory holds), and the customer rules are always specific (thresholds, routing, exception handling). The universality of the core is what makes the canon-as-product economics defensible — if core physics varied per business, you couldn't ship a canon; you could only ship tools to build one. Lean on examples operators recognize from their own work (parts, suppliers, inventory, transitions, authority). Don't abstract upward, and never claim more universality than *core*.

**Move 3 — The Palantir anchor.**
By Move 3, the audience needs a credible reference architecture, not just a thesis. Palantir is the only existing vendor making the same physics-as-substrate argument at production scale. Naming it accomplishes three things: validates that the architectural premise is real (Palantir is fifteen years old and well-known), signals the tier of seriousness, and pre-empties the "why aren't other vendors doing this" objection.

**Move 4 — The cost differentiation.**
Most predictable Palantir objection: cost and FDE-heavy deployment. The answer ties directly back to physics: because the *core* physics is universal, the canon is pre-built. Palantir treats every customer's physics as bespoke and builds ontology per engagement; we built the core once. The economics flow from the architectural claim, which means the cost answer reinforces the physics claim instead of competing with it. The phrase "It has to be — that's what makes it physics" carries real weight here; let it land.

**Move 5 — The concrete example.**
The example puts SAP, Palantir, and Mimir Labs on a single axis (where does the rule live, who signs it, who can read it, who can replay it, what enforces it). The critical step is the three-layer decomposition — labeling which parts of the example are *core physics* (orders, customers, parts, suppliers), which are *peripheral physics* specific to manufacturing (BOMs, engineering reviews, exceptions), and which are *customer rules* layered on top of both (the specific combination that triggers resolution paths). This is the move that ties the example back to Move 2 and demonstrates the three-layer model in something the audience can recognize from their own operations. "Recording a business vs. running one" is the line that converts the technical claim into a buyer-recognizable distinction.

**Move 6 — The customer honesty.**
Pre-empts the deployment-record question Kimberling will ask anyway. Honest about no customers in production; reframes the gap as a better question than the one his audience has been answering for twenty years. The "data still in spreadsheets" closing line is the audience-tie that converts. Every operator listening has lived that experience. The physics framing is what makes the line sayable without sounding like a slogan — it lands as a diagnosis ("the spreadsheets are where the physics was hiding"), not as a pitch.

---

## Core vs. peripheral vs. rules — the three-layer taxonomy

The dialogue depends on this distinction being clean in the speaker's head. If you blur the layers, the claim collapses. If you keep them sharp, every objection has a defined home.

### Core physics — universal across all businesses

The substrate every business runs on, regardless of industry, size, geography, or maturity. Cannot be opted out of. Cannot be customized. Modeled once in the canon.

- **Identity** — things exist and have stable references (Customer, Part, Order, Invoice, Location, Person, Account, GL Account, Transaction)
- **Relationships** — things connect to other things in defined ways (Orders belong to Customers, Parts have Suppliers, Locations hold Inventory, Invoices reference Orders)
- **State** — things move through defined stages (Order: draft → submitted → fulfilled → invoiced → closed)
- **Transitions** — state changes that must be triggered, not just observed
- **Authority** — every transition requires a signing entity (a person, a role, a system with credentials)
- **Evidence** — every transition produces an immutable record of what happened, when, by whom, by what authority
- **Resources** — transitions consume and produce things (inventory deducts, GL posts, capacity allocates, cash moves)

If someone tries to tell you their business doesn't have one of these, they are describing an unmodeled gap, not a missing physics. Push back.

### Peripheral physics — industry-specific, deterministic

The concepts that exist universally *within* an industry but not across industries. Modeled in the canon for the verticals we serve; extended when entering new verticals.

- **Manufacturing**: Bills of Materials, Routings, Work Orders, Lots, Serials, Heat Numbers, Engineering Change Orders, Quality Holds, Inspection Plans
- **Distribution**: Pick Lists, Wave Plans, Cross-Docks, Demand Forecasts, Slotting, Allocation Rules
- **Project services**: Tasks, Milestones, Time Entries, Billing Rates, Phases, Deliverables, Resource Assignments
- **Healthcare** (future): Patients, Encounters, Claims, Diagnoses, Procedures, Eligibility, Prior Authorizations
- **Construction** (future): Job Phases, Change Orders, Lien Waivers, Progress Billing, Retention

A customer entering a vertical we don't yet cover may need peripheral physics we haven't modeled. That's a canon extension, not a customization, and every customer in that vertical benefits afterward.

### Customer rules — always specific

The policies, thresholds, and routing choices that vary not just by industry but by company, by department, sometimes by transaction. Captured in the OPE policy layer as signed administrative decisions; never embedded in the canon.

- Approval thresholds (over $10K requires manager sign-off; over $25K requires director; over $50K requires CFO)
- Routing logic (CAPAs from quality-critical SKUs go to engineering review; from non-critical go to ops manager)
- Exception handling (which roles can grant exceptions for which conditions)
- Capture requirements (require this extension field when this state transition occurs)
- Cross-entity gates (the canonical example: orders involving Supplier X and ZIP XXXXX require resolution path X, Y, or Z)

### What the layers buy you

Layer-clean thinking is the difference between a defensible architecture and snowflake debt:

- **Core physics in code (canon):** the architecture's enforcement guarantees rest on it. Cannot be touched by customers or implementers.
- **Peripheral physics in code (canon):** modeled per-vertical, extensible only by Mimir Labs, and only via canon extension — never per-customer.
- **Rules in signed data (OPE artifacts):** authored by customer operators, signed, audited, replayable, reversible. This is where customer-specific work lives. It does not touch the canon, it does not require code changes, and it travels with the customer if they ever leave.

The fatal mistake every prior ERP makes is letting customer rules leak down into the peripheral physics layer (custom fields, custom tables, custom workflows in code) or even into the core (custom record types, parallel object models). That's the conflation we refuse. The three-layer separation is what makes the architecture defendable for fifteen-year ownership horizons.

---

## Loaded answers for likely follow-up probes

**"Isn't this just MDM with extra steps?"**
MDM is descriptive — it catalogs and reconciles definitions of master data across systems. Enterprise physics is enforcement — the data layer is in the write path, refusing transitions that don't satisfy the modeled rules. MDM tells you Customer A is the same record across SAP and Salesforce. The physics layer decides whether Customer A's order is allowed to ship. Different category.

**"Aren't you describing a rules engine?"**
Rules engines evaluate rules against payloads. They don't own the substrate. They sit next to the application and answer questions. The physics layer *is* the substrate — every state change in operations passes through it. A rules engine is a feature; the physics layer is the architecture.

**"Why hasn't somebody done this already?"**
They have. Palantir did it for governments. SAP is trying to do it now with the Knowledge Graph + Joule push, but they're retrofitting onto a forty-year-old transactional core. Workday did it for HR and finance, narrowly. Nobody has done it for general commercial operations as a product, at ERP economics. The technical reasons are documented — until recently you couldn't author, sign, version, and evaluate business rules as portable artifacts; the tooling didn't exist. The commercial reasons are simpler: the ERP industry's services revenue depends on operational logic staying opaque. We don't have a services arm to protect.

**"What happens when a customer's physics doesn't match your canon?"**
Decompose the question. Core physics — identity, state, authority, evidence, the relationships between operational concepts — doesn't vary, and any customer who tells you it does is describing peripheral physics or rules, not core. Peripheral physics — the industry-specific concepts that sit on top of the core — does vary, and that's where the canon gets extended. When a customer in a vertical we haven't covered yet has a genuine concept the canon doesn't represent — a real one, not just a renamed version of something we already have — we extend the canon, and every future customer in that vertical benefits. That's how products work. That's not how customizations work. The customer's rules are always specific; that's what the policy layer is for. The conflation of these three layers is exactly what makes ERP customizations metastasize — every customer treats their rules as physics, every implementer agrees because billable hours, and five years later the system is a snowflake. We refuse to do that.

**"How is this different from low-code?"**
Low-code lets non-engineers build applications faster on top of an opaque substrate. The substrate underneath low-code platforms is the same broken architecture as traditional ERPs — modules, schemas, and customization debt. You can build applications faster but the underlying physics is still unmodeled. We modeled the physics. The application surface is a thinner concern after that.

---

## Delivery notes

- **Tempo:** Move 1 is fast and confident. Move 2 is slow and patient — the physics framing needs air to land. Move 5 is the most important moment; do not rush the example.
- **Tone:** Matter-of-fact throughout. The position is unusual enough that it doesn't need bravado. The architectural seriousness is the whole point.
- **What to never do:** Never call it "revolutionary," "disruptive," or "paradigm-shifting." Never compare yourself to SAP on features. Never apologize for the empty customer record — acknowledge it cleanly and reframe.
- **The closer:** The "data still in spreadsheets" line is the strongest line in the sequence. Land it deliberately. Hold a beat after it. The host will pick it up.
