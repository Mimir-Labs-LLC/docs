# Enterprise Physics — Podcast Opener Sequence

**Use when:** appearing on an ERP-focused podcast (Kimberling, ERP Today, Diginomica, IT Visionaries) where the audience is operations executives, CFOs, IT directors, and implementation consultants — people who have lived ERP failure modes.

**Do not use when:** in front of a buyer who came specifically to evaluate against a NetSuite/SAP RFP. The frame-break is too aggressive when the audience already has a shortlist.

**Core thesis:** Every business runs the same eight-step operational loop — *event, condition, decision, authorized action, state change, result, transactional record, new event*. That loop is the *core physics*. Most ERPs break the loop at predictable points; we close every link. The closest architectural peer is Palantir Foundry, not SAP. We deliver Palantir's architecture at ERP price points because the loop is universal and the model is built once instead of per customer.

**Voice rule:** Sound like a person on a podcast, not a person reading a brief. Short sentences. Plain words for technical concepts. Trust the host to ask the next question. But: *do not* drop the loop, do not drop the *core* qualifier, do not drop the furniture-vs-loop framing, do not drop the three-layer taxonomy. Those are the load-bearing points. They belong in the dialogue, just expressed conversationally.

---

## The sequence

**Kimberling:** Tell me what you've built. And I'll note for the audience — when my team booked you as an ERP vendor, you pushed back on the framing. Why?

**You:** Because we didn't build an ERP. We built a data layer that can run a business.

**Kimberling:** Okay. What does that mean? Isn't a data layer just a database with extra steps?

**You:** Different category. Quick test first. When your ERP blocks an order, can you find out *who* said no, *when*, and *why*? In most ERPs the answer is no — the rule that did the blocking lives in code somebody wrote five years ago, and the consultant who wrote it doesn't work there anymore. That's the entire problem your audience has been living through for twenty years. We made the rules into data. Signed by the people who own them, readable in plain language, replayable against any quarter you want. So when something gets blocked, you can answer "why" in thirty seconds instead of three weeks.

**Kimberling:** Make that concrete architecturally. Why does putting the rules into data change the architecture?

**You:** Because to see why it works, you have to see what business operations actually are — not from a software perspective, from an operations perspective. Every business runs the same loop. Something happens — an order comes in, a part arrives, a customer calls, a clock rolls over. You look at what's happening against what you already know — is the customer in good standing, is there inventory, is this within policy, is the part within tolerance. Somebody decides what to do about it. Somebody with the authority to act on that decision actually acts. Something in the operation moves — work advances, the order ships, the invoice posts, the bin gets replenished. There's an outcome — the customer is served, the books are updated, the next person's job opens up. You've got a record of the whole chain. And that record is what kicks off the next event downstream — the shipment triggers AR, the receipt triggers AP, the inspection triggers a CAPA, whatever fires next. That's the loop. Every business runs it, every operation goes through it. The formal names are *event, condition, decision, authorized action, state change, result, transactional record, new event*, but those are just labels for the steps your operations team already does every hour of every day. That loop is the *core physics* of every business. I say *core* deliberately — what's universal is the loop itself. The specific events, the specific decisions, the specific state machines — those vary by industry and by company. But the loop doesn't. It can't. That's what makes it physics. And once you see the loop, you can see where most ERPs break it.

**Kimberling:** Walk me through that.

**You:** Pick a link. The decision is the most common break. In most ERPs, the rule that decides whether an order can ship lives in code somebody wrote five years ago. The order ships, and the record shows that it shipped, but not the decision that let it ship. Six months later something goes wrong, and nobody can reconstruct who decided what or why. The audit trail has the result but not the reason. Or take authority — work moves forward through back doors, batch imports, somebody overriding the screen, and nobody can tell you afterward what gave them the right. Or the record itself — produced as a reporting view, filtered, paginated, soft-deleted when it gets inconvenient. Every one of those breaks is where ERP failures actually live. Your audience has lived through every one of them.

**Kimberling:** And what you built closes the loop.

**You:** Every link. When an order comes in, it lands in one place, not three places that have to be reconciled later. The check against what we know — what counts as a customer, what counts as a part, what counts as inventory — happens against one shared definition, used the same way everywhere. The decision is a written rule your CFO signed when it was put in place, in plain language, not buried in code. The action is gated — work doesn't advance without somebody with authority moving it. The record is permanent, written the moment work moves, not produced later as a reporting view. And that record is what triggers whatever fires next. Everything anyone thinks of as "the ERP" — the screens, the workflows, the reports — is downstream of that loop being closed. The applications are downstream of how the business actually runs, not the other way around.

**Kimberling:** That's a very different architectural choice. From a developer's perspective, what does that look like?

**You:** Honestly, it doesn't look like an ERP. And that's deliberate. Most incumbent ERPs optimize for what I'd call the *furniture* of the business. The records, the schemas, the fields, the screens, the object catalogs. The center of gravity is the data model. The loop is implicit — scattered across application code, stored procedures, workflow configurations, whatever a consultant wrote in 2014. We did the inverse. The loop is explicit. The records exist to serve the loop, not the other way around. So when a developer who's spent ten years inside a traditional ERP looks at our codebase, the first reaction is usually "this doesn't feel like an ERP." That's the right reaction. The industry has spent forty years optimizing the furniture. We spent the last few years modeling the room the furniture sits in.

**Kimberling:** Most ERP vendors I talk to position against SAP or NetSuite. You haven't mentioned either.

**You:** Because we don't compete with them. Architecturally, the closest competitor is Palantir Foundry. They made the same argument fifteen years ago for governments — that operations should flow through a substrate that owns the loop, not a stack of modules where the loop is hidden. We're making the same argument for commercial businesses, at ERP price points instead of government price points.

**Kimberling:** Palantir is famously expensive. How do you deliver the same architecture at the price points my audience can afford?

**You:** By modeling the loop once instead of per customer. Palantir's economics are services-led — they bring forward-deployed engineers and build the ontology with each customer as an engagement. They treat every customer's operations as bespoke. Our bet is the opposite. The loop is universal — that's the physics claim — so the model is in the box. Three hundred-plus operational concepts, already wired together. A customer adopts the model instead of authoring it. The customer-specific work lives in a layer on top.

**Kimberling:** Tell me more about that.

**You:** Three layers. The loop and its universal concepts — orders, customers, parts, suppliers, inventory, approvals — that's the bottom. Every business has those, in those relationships, period. Then the industry-specific layer — bills of materials in manufacturing, claims in healthcare, lot tracking in pharma. Those vary by sector but not by customer; when we enter a new vertical, we extend the model, and every customer in that vertical benefits. Then the customer-specific rules — *which* approver, *what* threshold, *which* combination triggers *what* resolution. That's signed policy, not custom code. Three layers, clean separation. The mistake every prior ERP makes is letting customer rules leak down into the lower layers — that's how you get a hundred snowflake instances five years later, all running different code, none of them upgradeable. We refuse the conflation.

**Kimberling:** Give me a concrete example.

**You:** Sure. An order comes in. Customer A, includes a SKU whose bill of materials uses a part from Supplier X, shipping to a specific ZIP code. Your business rule says: that combination needs procurement approval, or a customer exception, or a product-engineer review. Any one resolves it. Watch the loop run. The event is the order arriving. The system checks the conditions — customer, supplier, ZIP — against the shared model. The decision is the rule itself, which in our system is a signed artifact your CFO approved when it was put in place. Your auditor can read it. Your operations team can replay it against last quarter to see what it would have done. The authorized action is "advance the order" — but it's gated until one of the three resolution paths is satisfied. Until then, the data layer refuses to move it. Once it's resolved, state changes, the order ships, and the record captures every step — event, conditions, decision, authorization, state change, result. And the record becomes the trigger for the next event downstream — invoicing, revenue recognition, customer notification, whatever fires next. In a typical SAP shop, the decision step is broken. That rule lives in ABAP a consultant wrote, the record captures the state change but not the logic, and you can't reconstruct *why* a year later. In a Palantir shop, the loop runs cleanly, but the rule lives inside Palantir's runtime, requiring Palantir to maintain it. In ours, every link in the loop is in your data layer, every link is yours to read and replay. That's the difference between recording a business and running one. Recording is what happens when the loop is broken — you have data, but the data doesn't reconstruct the operation. Running it is what happens when the loop is closed — the data *is* the operation.

**Kimberling:** How many customers are doing this in production right now?

**You:** None. Pilots starting this year. I'd rather tell you that straight than dance around it, because the architectural claim is the load-bearing thing, and it either holds in deployment or it doesn't. We'll find out the same way Palantir found out in 2010 — by putting it in front of real businesses and seeing what breaks. Everything I've described is built. The loop is modeled. The state-transition gate works. The decision artifacts are signed. The audit trail is real. The portability layer for customers who aren't ready to leave their existing ERP — that works too. The open question isn't "does the architecture work in theory." It's "will it hold under the messy reality of the first ten customers." That's a better question than the one most ERP vendors on your show have had to answer for twenty years — "why is my implementation costing three times what you quoted, and why is all the real data still in spreadsheets?" Because the spreadsheets are where the loop has been closing all along. The decisions, the conditions, the records — they exist; they just exist outside the system, which is the same as saying the system isn't running the business. We are.

---

## Structure notes — why the moves are arranged this way

**Move 1 — The opener: "We didn't build an ERP. We built a data layer that can run a business."**
Breaks the frame. Refuses the ERP-vendor category before any feature-checklist evaluation can begin. Three audiences hear three different valid claims in the same sentence — engineers hear "data layer," executives hear "run a business," ERP veterans hear "we didn't build an ERP."

**Move 2a — The accessibility hook ("who said no, when, why").**
A non-technical listener cannot follow the eight-step loop cold. This beat starts with a question they have lived: when their ERP blocks an order, can they find out who said no, when, and why? The answer is no, the entire room knows it, and that single question makes the rest of the sequence land. The payoff sentence — "we made the rules into data" — is the plain-language version of everything that follows. Land it before the loop, so the audience knows what problem the architectural framing solves.

**Move 2b — Name the loop, name the core qualifier.**
The load-bearing architectural move. The host pulls you here with "make that concrete architecturally" — they're asking for the framework that makes Move 2a's claim possible. *Critical:* describe the loop from the operations perspective first, not the software perspective. "An order comes in. You check what you know. Somebody decides. Somebody with authority acts. Work moves. There's an outcome. You've got a record. The record triggers the next thing." That's the operations description. Only *after* that, name the formal labels: *event, condition, decision, authorized action, state change, result, transactional record, new event*. The labels are post-hoc names for what every operations team already does every hour of every day; presenting the loop as a software state machine is what loses the audience. Then anchor with "*core* physics" and the explanation: what's universal is the loop, not the specifics. The "*it can't — that's what makes it physics*" line is the load-bearing close of this beat. Closing with "and once you see the loop, you can see where most ERPs break it" hands the conversation back to the host for the next pull.

**Move 3 — Where ERPs break it.**
Diagnostic. Walk through the typical break-points (Decision, Authorized Action, Record) in language operators recognize from their own work — "the rule lives in code somebody wrote five years ago," "state changes happen through back doors," "the audit log gets soft-deleted when convenient." Every break is something the audience has lived. The closing line — "the applications are downstream of the physics, not the other way around" — flips the conventional ERP architecture inside out.

**Move 4 — Furniture vs. loop (the architectural inversion).**
Pre-empties the technical-evaluator reaction that *will* happen as soon as a developer with incumbent-ERP experience looks at the architecture. Names the inversion explicitly. The closing analogy ("they've spent forty years optimizing the furniture; we spent the last few years modeling the room") gives the audience a mental picture they can hold onto.

**Move 5 — The Palantir anchor.**
Names the real competitive frame. Validates the architecture by association. Tier-signal. Pre-empties "why aren't other vendors doing this."

**Move 6 — The cost differentiation.**
Defuses the most predictable Palantir objection. Ties cost directly to physics: because the loop is universal, the model is pre-built. The economics flow from the architectural claim instead of competing with it.

**Move 7 — The three-layer taxonomy.**
Explains *what* lives in the box vs. *what* the customer authors. Pre-empties the "what if my business is different" objection. The snowflake-debt diagnosis ("letting customer rules leak down into the lower layers") names the failure mode every implementation consultant in the audience has watched happen.

**Move 8 — The concrete example, walked through the loop.**
The most important moment. The Customer-A/Supplier-X/ZIP rule is told as a story, but every link in the loop gets named as it happens — event, conditions, decision, authorization, state change, result, record, next event. Walking the loop in the example proves the framing isn't abstract. The three-way comparison (SAP loses the decision, Palantir keeps it but inside a closed runtime, we keep it in the customer's data layer) shows where each architecture actually differs. "Recording a business vs. running one" is the closing line that converts the technical claim into a buyer-recognizable distinction.

**Move 9 — Customer honesty.**
Pre-empts the deployment-record question. Honest about no production customers; reframes the gap as a better question than the one his audience has been answering for twenty years. The spreadsheet line is the strongest in the sequence and works because every operator listening has watched their real operation run in Excel while the ERP held only the appearance of it.

---

## Likely follow-up probes

**"Isn't this just MDM?"**
MDM tells you what things *are*. Enterprise physics decides what's *allowed to happen* to them. MDM is descriptive; we sit in the write path and enforce. Different category.

**"Isn't this just a rules engine?"**
Rules engines occupy one step of the loop — the decision step — and they do it well. They don't own the substrate. The physics layer *is* the substrate; every step of the loop flows through it. A rules engine is a feature; the physics layer is the architecture.

**"Isn't this just a workflow engine?"**
Workflow engines model the state-change step. They don't model the decision as signed data, they don't evaluate conditions against a canonical model, and they don't produce the record as evidentiary. They orchestrate; we enforce.

**"Why hasn't somebody done this already?"**
Palantir did, for governments. SAP is trying now with their Knowledge Graph push, but they're retrofitting onto a forty-year-old core that breaks the loop in dozens of places. Workday did it for HR and finance, narrowly. Nobody has done it for general commercial operations as a product at our price point. The technical reason: until recently you couldn't author, sign, version, and evaluate business rules as portable artifacts. The commercial reason: the ERP industry's services revenue depends on the loop staying broken. Implementation partners get paid to bridge the breaks. We don't have a services arm to protect.

**"What if a customer's business doesn't match your model?"**
Three layers. The loop doesn't vary — any customer who tells you it does is describing the industry layer or their rules, not the loop. The industry layer varies by sector, and when we enter a new vertical we extend the model. The customer-specific rules always vary, and that's what the signed-policy layer is for. The conflation of those three is exactly what creates snowflakes.

**"How is this different from low-code?"**
Low-code lets non-engineers build applications faster on top of an opaque substrate. The substrate underneath low-code platforms is the same broken architecture as traditional ERPs. You can build applications faster but the loop is still broken. We fixed the loop. The application surface is a thinner concern after that.

**"What's actually under the hood, technically?"**
A canonical schema covering the universal concepts. A state-transition engine that gates every change. Signed policy artifacts that capture the decision logic at the gate. An append-only audit log written as part of every state change. And a portability layer that lets the same rules govern customers who haven't migrated off their existing ERP yet. Your audience doesn't need to care about the component names. They need to know that when something goes wrong, they can answer *why* in thirty seconds.

---

## Speaker prep — deep technical reference

The dialogue carries the load-bearing concepts. This section is the deeper reference the speaker internalizes but rarely surfaces.

### The eight steps in operational terms

| Step | What it is | Where typical ERPs break it |
|---|---|---|
| **Event** | The trigger — order arrives, part consumed, signal fires, person submits | Events bypass the loop via direct SQL, batch import, manual entry |
| **Condition** | Evaluation of current state against what the event implies | Conditions evaluated inconsistently across code, procs, middleware |
| **Decision** | The determination — allow/block/route/escalate/require-signature | Lives in code, spreadsheets, or heads. The most common break. |
| **Authorized Action** | The decision's execution by someone with proper authority | Authority verified after the fact, not at the gate |
| **State Change** | Inventory deducts, order advances, GL posts, status flips | Happens outside the loop via back doors; can't reconstruct what authorized it |
| **Result** | The downstream consequence — shipment, payment, notification, allocation | Causal chain back to event is lost; result exists but the *why* is opaque |
| **Transactional Record** | Immutable proof of the full causal chain | Filtered, paginated, soft-deleted; reporting view not evidentiary artifact |
| **New Event / State** | The record becomes input to the next cycle downstream | Handoff loses causal context; downstream system sees result but can't evaluate trust |

### Architectural components (rarely named on air)

- **Mimisbrunnr** — the canonical semantic model, 323 tables; the shared vocabulary the conditions evaluate against
- **State Constraint Engine** — gates every state transition; the "authorized action" enforcement point
- **OPE (Operational Policy Enforcement)** — signed administrative decisions; the "decision" step rendered as data
- **`audit_change_log`** — append-only event log; the "transactional record" mechanism
- **Jormungandr** — portability layer that extends the same rules to govern external ERPs (NetSuite, Business Central, SAP) without requiring migration

You almost never name these on air. If directly probed for technical depth, name one at a time, briefly, and return to the audience-facing framing.

---

## Delivery notes

- **Tempo:** Quick on Move 1. Brisk on Move 2 (recite the eight steps as a rhythm, not a list — they should sound internalized, not memorized). Slow on Move 3 (the break-points need air to land separately). Brisk on Moves 4–7. Slow on Move 8, especially the closing comparison. Slow on Move 9, especially the spreadsheet line.
- **The eight steps as recitable sequence:** Practice saying *event, condition, decision, authorized action, state change, result, transactional record, new event* without stumbling. This is the load-bearing rhythm. It should sound like a phrase you've said a thousand times, not eight things you're remembering one by one.
- **Tone:** Matter-of-fact. Slightly dry. Never enthusiastic. The architectural seriousness does the work; bravado would undercut it.
- **What to never say:** "Revolutionary." "Disruptive." "Paradigm." "Next-generation." "AI-powered." Any sentence that starts with "We're transforming."
- **What to never do:** Compare yourself to SAP on features. Apologize for the empty customer record — acknowledge it cleanly and reframe. Say "Mimisbrunnr" or "OPE" on air unless directly asked what the components are called.
- **The closer:** "The spreadsheets are where the loop has been closing all along." Land it deliberately. Hold the beat. The host will pick it up — that observation is the most resonant thing in the sequence for an audience of ERP veterans, because every one of them has watched the real operation run in Excel while their ERP held only the appearance of it.
