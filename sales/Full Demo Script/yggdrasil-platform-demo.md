# Yggdrasil ERP — Full Platform Demo Playbook

**Audience:** prospects, design partners, investors, podcast hosts, anyone whose first encounter with the product is over a screen share.

**Purpose:** a step-by-step, click-by-click rundown of a live demo of Yggdrasil ERP. Each scene names the exact click target, what appears on screen, what to say, and the substrate-aware story beat the scene is supposed to carry. Use the click instructions verbatim; the narrative is the floor, not the ceiling.

**Voice.** The demo follows the positioning in the recent essays (`the-system-the-business-runs-on.md`, `operational-canon.md`, `why-nobody-wants-to-blame-the-erp.md`) and the investor memos. Lead with the substrate / system-of-record-vs-reality argument. Do NOT lead with "Deterministic B2B Marketplace" or "Universal BI" — those phrases pre-date the current positioning.

---

> **Reality note (read before demoing).** Two always-on governance moments need
> no setup: **governed status fields** (every status is a schema-constrained
> dropdown, not free text) plus the **narrative qualifier** (sub-status preset +
> free note), and the **ROPE policy library** (each rule a signed policy whose
> `state_constraint` artifact is the exact predicate the engine evaluates). These
> carry the "the rules live in the system" story on any slot, Scenes 5 and 6.
>
> **NEW as of v0.8.1a-15 — the live receive → block IS now a shipped surface.**
> When a ROPE policy blocks a governed transition, the system rolls the action
> back and shows a **block panel that names the policy** (title, decision code,
> cited authority). The wired trigger is the **"Receive Goods"** action on a
> **Purchase Order** (not a receipt edit). It only fires if a ROPE policy gates
> the PO's `received` transition in this slot, so **verify it in pre-flight
> (step 0.9) before staging it live** — if no gating policy is seeded, the
> receive just succeeds, and you fall back to the governed-status moment.
> Also new: the narrative qualifier is now a ROPE predicate operand, so a policy
> can block a transition based on the qualifier an operator selected (the
> Scene 5 → Scene 5b → Scene 6 arc). (Keep this in sync with the short-form
> playbook's reality note.)
>
> **UI note.** Records now open **full-pane as tabs** (with a popout button), not
> in a modal overlay; you can have several records open at once across a module.
> The click targets below are unchanged — "open a record" lands on the full-pane
> detail.

---

## 0. Pre-demo setup (run before the call connects)

Five-minute checklist before the prospect dials in.

| # | Step | What to verify |
|---|------|----------------|
| 0.1 | Open Chrome (or your demo browser of choice) in an incognito window. | Cache and prior session state do not bleed into the demo. |
| 0.2 | Navigate to **`https://app.mimirlabs.net/yggdrasil`** (the SSO landing for the ERP; confirm the active host in `infra/runtime-manifest.json`). | Page loads in under three seconds. The login form is the first thing the prospect would see. |
| 0.3 | Log in with the demo credentials for the **apex** archetype. (Credentials live in `business/data-room/02-financial/` or the operator's password manager — DO NOT show the credential paste in screen share.) A **per-slot operator** is single-tenant and lands straight on the Dashboard. If you log in with a **devadmin** (`cgaither@mimirlabs.net`), login shows a **tenant picker** — choose "Apex Precision Manufacturing." | Successful login lands on the Dashboard. |
| 0.4 | Confirm the tenant company name in the top-left badge reads **"Apex Precision Manufacturing"** (verify in `database/seeds/archetypes/apex.sql`). | If a different archetype is loaded, switch via the tenant picker, or log out and re-enter the correct slot. |
| 0.5 | Open a second tab to `https://mimirlabs.net/whitepapers` — be ready to drop links into the chat. | Whitepaper page loads. Not required for the demo but useful for follow-up. |
| 0.6 | Verify the sidebar shows: Operations, Production, Finance & Projects, Quality & Service, System. | If a group is collapsed by default, expand them all before screen share starts. |
| 0.7 | Close every browser tab that is not part of the demo. Close Slack, email notifications, calendar pop-ups. | Clean screen. The product carries the demo, not the founder's window-management. |
| 0.8 | Start the screen share. Confirm the prospect can see the browser, not the full desktop. | Verbal confirmation. |

**Pre-flight dry-run (do once before the call).** Operations → Purchasing → Receipts → open a receipt → Edit → confirm **Status** is a governed **dropdown** (no free typing) and that a hold-type status reveals the **qualifier** preset list + note. This is the Scene 5 moment; make sure it's wired on the record you'll use. Also confirm Production → Manufacturing → Work Orders → open a WO shows the nested **Operations** list (Scene 9).

**0.9 — Pre-flight the live block (only if you intend to stage Scene 5b).** Operations → Purchasing → **Purchase Orders** → open a PO in **approved** or **submitted** state → click **Receive Goods**. If a ROPE policy gates this slot's PO `received` transition, a **block panel** appears naming the policy — that confirms Scene 5b is live; click "Understood" and DO NOT receive it again before the demo. If instead the receive succeeds (a real receipt is created), this slot has no gating policy seeded: either author one (ROPE Policies → a `state_constraint` on `finance_purchase_orders` → `received`, e.g. block when the qualifier is "quality hold") or skip Scene 5b and rely on Scenes 5–6. Do this on a throwaway/extra PO so you don't consume the one you want to demo against.

**Known issue to acknowledge if it surfaces.** The sidebar entry "ROPE Policies" may still resolve to the legacy `/ope` slug and 404. Navigate by typing `/rope` in the address bar. (If records ever come up empty right after a server redeploy, it's a stale `ygg_tenant` cookie — a fresh incognito window avoids it; fixed in current builds.)

**Time budget.** Full walkthrough below is 25 minutes. If the call is 15 minutes, cut scenes 9, 10, and 12. If the call is 45 minutes, expand scenes 6 and 7 with the prospect's own example data.

---

## Intro — what you're about to see (say this before you share your screen)

A 30-second frame so the prospect knows what to watch for. Don't skip it — without
it, the walkthrough reads as a feature tour instead of a thesis.

> *"Before I share my screen, here's the shape of the next twenty minutes, so you
> know what you're looking at. You're going to see one manufacturing ERP — but the
> thing I want you watching isn't the modules, and it isn't governance running
> live. It's the structure underneath that makes governance possible in the first
> place. The whole walkthrough is really one claim: the operating model itself —
> the rules, the legal states and the moves between them, who holds authority,
> where the exceptions live, how every record relates to every other — is captured
> as first-class, governed data inside the system, not scattered across
> spreadsheets, config screens, and people's heads. We'll follow one thread
> through the business so you can watch that same structure surface everywhere: on
> a purchase order and the receipt against it, in a policy library where each rule
> is a signed object you can open and read, on a work order and the operations
> beneath it, in a GL entry that traces straight back to the operational event.
> I'm showing you the foundation, not staging the enforcement. Because once the
> operating model is represented this completely and this faithfully, two things
> become possible that a conventional ERP can't deliver — governing every
> transition with cited authority, and letting an AI agent act on the system
> without being able to break the rules. Today is about the structure that makes
> both of those possible. Let me share my screen."*

---

## 1. The Dashboard — set the frame

Goal: land the system-of-record-vs-system-of-reality argument before clicking anything substantive.

| # | Click target | What appears | What to say |
|---|--------------|--------------|-------------|
| 1.1 | (You are already on the Dashboard after login.) Pause for three seconds before clicking anything. Let the prospect see the layout. | Dashboard widgets: substrate widget showing schema/policy counts, recent activity, demo-environment banner. | *"Before I click into anything, I want to name what you're looking at. Every enterprise has a system of record. Most enterprises also have a system of reality — the spreadsheet, the exception meeting, the side database where the business actually runs when the documented process doesn't apply. Yggdrasil ERP is built so the system of record and the system of reality are the same system. The thing you're going to see across the next twenty minutes is what it looks like when the substrate carries the operational truth, not the post-hoc description of it."* |
| 1.2 | Point at the substrate widget on the dashboard (do not click it yet). | Widget shows table count, policy count, last audit event. | *"Quick orientation: this widget shows the substrate counts. Tables in the canonical model. Active policies. Last audit event. We'll come back to those numbers when the substrate story lands."* |
| 1.3 | (No click required.) | Pause. | Wait for the prospect to react or ask. Do not advance to the next scene if they are processing. |

---

## 2. CRM — canonical concepts, not modules

Goal: show that the "account" is the same canonical concept whether the role is customer or supplier. Plant the seed of canonical operating model.

| # | Click target | What appears | What to say |
|---|--------------|--------------|-------------|
| 2.1 | Sidebar: **Operations** group → **CRM**. | CRM list page with accounts table. Columns: name, type, status, owner. | *"Quick CRM stop. Every entity in this list — customer, supplier, partner, prospect — is the same canonical concept. The role is an attribute, not a different schema. That matters in a minute when we show how a purchase order in one tenant's CRM becomes a sales order in the supplier's tenant without an integration layer."* |
| 2.2 | Click any row to open the account detail page. (Pick one that is visibly an active customer with linked orders.) | Account detail page: sections for contacts, addresses, opportunities, orders, invoices, payments, audit history. | *"One account, one canonical record. Everything below it — the contact list, the address list, the order history, the audit trail — is a relation on the same root. No master-data-management reconciliation needed because there's nothing to reconcile."* |
| 2.3 | Scroll down to the **Audit history** section if present. | Audit log entries with field-level change deltas. | *"Notice the audit. This isn't a separate audit module bolted on. The substrate audits itself at the field level on every write, with the actor identity and timestamp. We'll come back to this when we get to the ROPE policy story."* |
| 2.4 | Sidebar: **Operations** → **CRM** (to return to the list). Do not linger; the substrate story is the point, not the CRM features. | Back to CRM list. | (No narrative — transition.) |

---

## 3. Sales — quote to order, lifecycle gates

Goal: introduce the idea that state transitions are governed, not just recorded.

| # | Click target | What appears | What to say |
|---|--------------|--------------|-------------|
| 3.1 | Sidebar: **Operations** → **Sales**. | Sales module landing. Tabs across the top: Quotes, Sales Orders, Invoices, Payments. | *"Sales next. I want to make one specific point here, then we move on. Watch the lifecycle states."* |
| 3.2 | Click the **Sales Orders** tab. | Sales orders list with state column visible. | *"Each sales order has a state. Draft, submitted, approved, released, partially shipped, shipped, invoiced, paid. The state column isn't a label someone typed in — it's the actual position of the record in a state machine the substrate enforces."* |
| 3.3 | Click a row that is in **Submitted** or **Approved** state. | Sales order detail page with line items, customer, totals, current state, transition history. | *"This order is in [state]. To move it to the next state, the substrate has to allow the transition. If a policy says 'orders above $50K require CFO sign-off,' the substrate refuses the transition until the signature is captured. Not a workflow on top of the system. A constraint inside the system."* |
| 3.4 | Scroll to the **Transition history** section or the **Activity log**. | Transition events with actor, timestamp, prior state, new state, policy that allowed it. | *"Every transition is recorded with the policy version that was in effect at the moment. The auditor can reconstruct, six months later, exactly which rule allowed this order to ship and which authority signed it."* |

---

## 4. Purchasing — set up the ROPE moment

Goal: walk into purchasing and tee up the GRN policy demo that's coming in scene 6. Don't deliver the punchline yet — set it up.

| # | Click target | What appears | What to say |
|---|--------------|--------------|-------------|
| 4.1 | Sidebar: **Operations** → **Purchasing**. | Purchasing module landing. Tabs: Purchase Orders, Suppliers, Receipts (GRN). | *"Purchasing. We're going to spend a minute on receipts in particular, because this is where the substrate story gets concrete."* |
| 4.2 | Click the **Purchase Orders** tab if not already there. | PO list. | *"Quick orientation: a purchase order in Yggdrasil ERP is not a document in a folder. It's a state machine with a defined transition graph, signed authority on every move, and a policy enforcement layer that decides what is admissible at each gate. Let me show you what that looks like at the receipt point."* |
| 4.3 | Click the **Receipts** tab (the GRN — Goods Receipt Note — list). | Receipts list. Each row is a delivery the warehouse has acknowledged. | *"This is the goods-receipt list. Every row is a delivery the warehouse has acknowledged. I want to open one and show you how the system governs its state — because this is where 'the operating model lives in the substrate' stops being a slogan."* |
| 4.4 | Click into a receipt to open its full-pane detail. (Pick one whose Status field carries the governed qualifier — confirmed in your pre-flight dry-run.) | Receipt detail page (full-pane). | (No narrative — this is the setup for scene 5.) |

---

## 5. The substrate moment — status is governed, not typed

This is the demo's center of gravity. Do not rush it.

**Reality note:** the always-on, no-prerequisite enforcement moment is the
**governed status dropdown + narrative qualifier** — drive the status field here
in Scene 5. The **live "Receive → block" panel is now shipped** (v0.8.1a-15) and
gets its own optional beat in **Scene 5b**, triggered from a Purchase Order's
**Receive Goods** action — but only if a gating policy is seeded in this slot
(confirm in pre-flight 0.9). If you didn't confirm it, skip 5b and let Scene 6
(the policy library) carry the rule. The two are complementary: Scene 5 shows the
governed value, 5b shows the substrate refusing an illegal move, Scene 6 shows
where that rule is authored.

| # | Click target | What appears | What to say |
|---|--------------|--------------|-------------|
| 5.1 | On the receipt detail page, click **Edit**, then click the **Status** field. | Status opens as a dropdown of allowed states (Draft, Received, Inspecting, Accepted, Rejected). There is no free-text option. | *"Watch the status field. I can't type whatever I want. The system only offers the states it actually defines, straight from the schema. The status isn't a label someone typed in — it's a value the system governs."* |
| 5.2 | Try to enter an undefined state; show that only the schema-defined values are selectable. | Only governed values available. | *"There's no 'whatever the operator felt like' option. The set of legal states is part of the model, not a convention people are supposed to remember to follow."* |
| 5.3 | Set Status to a **hold / exception** state. The **Qualifier** appears — pick a preset ("quality hold"), then type a short note ("awaiting CMM report, balance on next PO"). | Governed base status + the qualifier preset dropdown + the free-text note. | *"But real operations have nuance. So the system keeps the governed status clean, and captures the story right beside it — a quality hold, a partial delivery — as data, not a note in a spreadsheet nobody else can see. The record of the business and the reality of the business are the same record."* |
| 5.4 | Save, and point at the record: governed status + qualifier + note, all on the canonical record. | The saved record carrying both the governed value and the structured narrative. | *"This is exactly the thing a conventional ERP pushes into a side spreadsheet or a free-text comment nobody can query. Here the exception is structured data on the canonical record — queryable, auditable, visible to everyone who touches this receipt."* |
| 5.5 | (Transition into Scene 5b if a gating policy is seeded; otherwise jump to Scene 6.) | — | *"And the rule that decides which states are legal here, and under what authority, isn't buried in this form. It's a signed policy. Let me show you what happens when you try to cross one."* |

---

## 5b. (Optional) The live block — the substrate refuses an illegal move

**Stage this ONLY if pre-flight 0.9 confirmed a gating policy exists on this
slot's PO `received` transition.** If you didn't confirm it, skip straight to
Scene 6 — a receive that silently succeeds on camera kills the moment. This beat
is the payoff: the system does not just *describe* the rule, it *enforces* it,
and tells you which policy stopped you.

| # | Click target | What appears | What to say |
|---|--------------|--------------|-------------|
| 5b.1 | Sidebar: **Operations** → **Purchasing** → **Purchase Orders**. Open a PO in **approved**/**submitted** state that you confirmed is gated. | PO detail (full-pane) with action buttons including **Receive Goods**. | *"Here's a purchase order, approved, ready to receive. Receiving it moves it through a governed transition. Watch what the system does."* |
| 5b.2 | Click **Receive Goods**. | A **block panel** appears: "Action blocked by policy," the transition (Receive · Purchase Order, from → to), and a card naming the policy — title, decision code, cited authority, and the reason. Nothing is saved. | *"It refused. Not a warning I can click past — the receipt was rolled back inside the transaction. And it tells me exactly which policy stopped me, the decision code, and the authority it cites. The rule didn't live in this button. It lives in the substrate, and the substrate enforced it before anything was written."* |
| 5b.3 | Read the policy name on the panel aloud, then click **Understood**. | Panel closes; the PO is unchanged (still not received). | *"That same rule is a first-class object I can open and read. Let me show you the library it came from."* |
| 5b.4 | (Transition into Scene 6 — and when you open the policy library, open the very policy that just blocked you.) | — | *"This is the difference between a workflow that reminds people and a substrate that governs. An AI agent driving this same action hits the same wall — it can't write what the policy forbids."* |

> **Note on the qualifier tie-in.** The cleanest staged version of this beat
> gates the block on the **narrative qualifier**: in Scene 5 you set a "quality
> hold" qualifier, and the seeded policy blocks the `received` transition while
> that qualifier is set (the qualifier became a ROPE predicate operand in
> v0.8.1a-15). That makes Scenes 5 → 5b → 6 a single arc: govern the value,
> watch it block, read the rule. Author the policy that way if you want the
> tightest narrative.

---

## 6. ROPE Policies — the library

Goal: show the policy library as a first-class object, so the substrate story compounds: not just one rule, the whole governance posture.

| # | Click target | What appears | What to say |
|---|--------------|--------------|-------------|
| 6.1 | Sidebar: **System** group → **ROPE Policies**. | ROPE Policies list page. (NOTE: the sidebar link may resolve incorrectly in v0.8.0a — if it 404s, type `/rope` in the URL bar.) | *"This is the policy library for this tenant. Every active rule the substrate enforces is here. Each row is a signed administrative Decision with cited authority and a lifecycle — draft, in review, signed, active, suspended, expired, superseded."* |
| 6.2 | Use the status filter at the top to filter to **Active**. | Filtered list. | *"Filter to active. These are the policies enforcing every state transition in the substrate right now. Notice the framework column — SOX, ISO 9001, AS9100, CMMC, ASC 606, FDA 21 CFR Part 11 — each policy carries its regulatory anchor as data, not as a label."* |
| 6.3 | Click into one of the GRN-related policies (e.g., "Block GRN when supplier ZIP differs from PO supplier ZIP" or the over-receipt variance policy). | Policy detail page with sections: Identity, Signers, Evidence, Artifacts. | *"Open the policy. Identity tab is the metadata. Signers tab shows who signed and in what order. Evidence tab is the supporting documentation cited at signing. The Artifacts tab is where the rule lives — and this is the part most enterprise governance tools never get to."* |
| 6.4 | Click the **Artifacts** tab. | List of artifacts. Each one shows kind (state_constraint, role, approval_rule, workflow_template) and a readable rendering of the rule. | *"Each artifact is what the policy compiles into at runtime. The state_constraint artifact you're looking at is the actual predicate. Notice it's rendered as readable English, not raw JSON — but underneath, this is the structured rule the constraint engine evaluates at every transition."* |
| 6.5 | Click into one artifact to show the rule structure. | Predicate viewer: IF clauses, THEN actions, evidence required, conditional alternatives. | *"Multi-hop join paths, quantifiers over child collections, nested boolean composition, conditional THEN actions. This is the grammar the substrate evaluates. The reason this matters — the reason this isn't just a rule engine — is that the substrate runs this evaluation inside the transaction. The constraint isn't checked and then the data is written. The constraint and the write are the same act."* |
| 6.6 | Browser back to the ROPE Policies list. | Policy list. | *"One more thing about this library. It's portable. The format is called `mimirlabs.rope.policy-bundle` — policies written here can travel to another Yggdrasil tenant, or back from a Jormungandr instance that governs an external ERP. We can show that flow if there's interest."* |

---

## 7. Quality — the cascade

Goal: prove the policy story isn't just refusal — the substrate can trigger downstream effects, like opening a quality NCR when an inspection fails.

| # | Click target | What appears | What to say |
|---|--------------|--------------|-------------|
| 7.1 | Sidebar: **Quality & Service** group → **Quality**. | Quality module landing. Tabs: NCRs, CAPA, 8D Reports, Audits, Inspection Plans. | *"Quality module. The reason we're here next is that the substrate doesn't just refuse transitions — it can trigger downstream state changes when a policy fires. Easiest example is the inspection-failure cascade."* |
| 7.2 | Click the **NCRs** (Non-Conformance Reports) tab. | NCR list. | *"Look for an NCR with source type 'inspection_fail' or similar. These are NCRs that were not opened by a human — they were opened by the substrate itself when an inspection-plan transition failed."* |
| 7.3 | Click an NCR with a substrate-opened source. | NCR detail with linked inspection result, source policy, linked work order, automated CAPA assignment. | *"This NCR exists because an inspection plan failed for a part, and the policy on that transition said 'inspection fail → open NCR with severity X, link to source work order, assign to the configured quality engineer, due in N days.' The substrate did all of that in one transaction. The quality team didn't have to remember to open the NCR. The system did, with provenance."* |
| 7.4 | Scroll to the **Linked records** section showing source inspection and target CAPA. | Cross-linked records. | *"The traceability is back-pointed. From the NCR you can trace to the inspection that triggered it, the work order that produced the part, the PO that received the part, the supplier that shipped it, and forward to the CAPA opened in response. One canonical chain, one audit trail."* |

---

## 8. PLM — engineering change control

Goal: brief, fast. Show that engineering changes flow through the same substrate.

| # | Click target | What appears | What to say |
|---|--------------|--------------|-------------|
| 8.1 | Sidebar: **Production** group → **PLM**. | PLM module. Tabs: Parts, EBOMs, MBOMs, Routings, ECRs/ECOs/ECNs. | *"PLM is where engineering changes live. The point I want to make is that ECR-to-ECO-to-ECN flows through the same state machine and the same policy layer as everything else. Engineering revision governance isn't a separate module pretending to integrate with manufacturing."* |
| 8.2 | Click the **ECOs** tab. | ECO list. | *"Each ECO has the same lifecycle scaffolding: signed authority, cited justification, evidence trail, downstream effects. When an ECO is released, in-flight work orders against the prior revision are flagged automatically by the substrate."* |
| 8.3 | Click any released ECO. | ECO detail with affected parts, work orders, sales orders if applicable. | *"Notice the impact analysis is a live join across the substrate, not a precomputed report. The substrate knows which work orders are currently consuming the prior revision because it knows the relationship at first-class data, not at integration-time."* |

---

## 9. Manufacturing — work order state with policy

Goal: short. Reinforce that production also lives in the same substrate.

| # | Click target | What appears | What to say |
|---|--------------|--------------|-------------|
| 9.1 | Sidebar: **Production** → **Manufacturing**. Note the groups: **Production** (Work Orders, WO Operations, Shop Floor, OEE), **Resources** (Work Centers, Operations, Tooling), **Planning** (MRP). | Manufacturing module with the grouped tabs. | *"Manufacturing. Same model. Work orders are state machines. But notice the Resources group — the operating model itself, the operation library, the work centers, the tooling, is first-class data here, not config buried in a setup screen."* |
| 9.2 | Click **Work Orders**, open an in-process WO, and scroll to the nested **Operations** list. | WO detail with its **Operations** listed underneath it — op #, operation, work center, status, qty done, and **labor (man) hours + machine hours** as separate columns. | *"This work order lists its operations right on it — and they're derived from the part's routing, which comes from the BOM. Each operation names the work center it runs on and carries man-hours and machine-hours separately. That's the routing made concrete on this specific order. Production management can add or modify an operation as needed, and it's still the same governed record. Postings are constrained too — you can't post against an operation that hasn't started, or close one that hasn't met its inspection plan."* |
| 9.3 | Sidebar: **Resources** → **Operations** (then glance at **Work Centers** and **Tooling**). | Operation library: each operation with its work center, standard setup/cycle time, and standard labor + machine minutes. Tooling shows each tool's work center and the operation it's used in. | *"And the routing those WO operations come from is itself first-class. The operation library, the work centers they run on, the tooling assigned to each operation — the whole operating model is data in the substrate. This is exactly what an AI agent would need to reason about a production change safely, and exactly what's missing in a conventional ERP where it lives in spreadsheets and tribal knowledge."* |
| 9.4 | (Optional, if present.) Open a WO held by an ECO cascade. | WO with ECN-cascade hold, source ECO linked. | *"This work order is held because the ECO we looked at flushed in-process production for that revision. The hold was placed by the substrate, with the source ECO linked — the supervisor sees the hold reason and the upstream change in the same view."* |

---

## 10. Finance — the immutable audit trail

Goal: financial side of the substrate story. Brief.

| # | Click target | What appears | What to say |
|---|--------------|--------------|-------------|
| 10.1 | Sidebar: **Finance & Projects** → **Finance**. | Finance module. Tabs: GL, AR, AP, Bank, Reconciliations, Period Close. | *"Finance. The reason we're brief here is the substrate story applies the same way — GL entries are constrained, period close is policy-governed, three-way match enforces at the receipt-bill-PO level."* |
| 10.2 | Click the **GL** tab. | GL entries list with debit/credit, account, posting date, source document. | *"Every GL entry is sourced from an operational event that the substrate already governed. The journal entry is the substrate's record of the financial implication, not a separate posting the finance team has to reconcile against operations."* |
| 10.3 | Click into a recent entry sourced from a paid invoice. | GL entry detail with linked invoice, PO, receipt, three-way match. | *"From the GL entry, the chain back to the originating operational event is one click. Auditors love this. Field-level audit at every step. Policy version captured at the moment of posting." |

---

## 11. Reports / Analytics — substrate-aware

Goal: very brief. Don't oversell BI; the point is that reports run against the substrate, not a downstream warehouse.

| # | Click target | What appears | What to say |
|---|--------------|--------------|-------------|
| 11.1 | Sidebar: **System** → **Reports**. | Reports explorer with 16 reports listed in a sidebar and a date-range header. | *"Reports module. Same as the desktop — left sidebar lists every report, top is a date range. Every report runs against the live substrate, not against a downstream warehouse."* |
| 11.2 | Click any operational report (e.g., AR aging, working capital, supplier performance). | Report results with charts and data table. | *"Operating intelligence with the substrate's audit guarantee underneath. The number on this chart can be traced to a specific set of source records, and those records carry their policy version. If a regulator asks 'what rule was in effect when this revenue was recognized,' the report has an answer."* |

---

## 12. The recap — close the substrate loop

This is not a click scene. This is the verbal close that brings the substrate argument home.

> *"Quick recap. You saw the system of record. You saw a state machine refuse a transition because a policy with cited authority said it wasn't admissible. You saw the policy library where every rule is signed, versioned, and traceable. You saw a quality cascade open an NCR automatically because the substrate fired a downstream effect. You saw engineering changes propagate to in-process production through the same model. You saw the GL inherit from the operational event with full provenance. Every one of those things would be a separate integration, a separate audit conversation, or a separate consulting engagement in a conventional ERP. Here it's one substrate, and the operating model is in the substrate as first-class data."*
>
> *"The thing you didn't see — because we didn't have to bring it up — is how an AI agent would act on this system. The substrate already refuses transitions a human can't justify. The same refusal applies to an agent. The safety guarantee is in the database, not in the prompt. That's the AI-readiness story I'd lead with if your team is thinking about agentic deployment in the next eighteen months."*

**The benefit, in one breath (the outro — land this last).**

> *"So strip away the modules, and here's what you'd actually be buying. First,
> one system that captures your operating model accurately and completely — the
> rules, the legal states and their transitions, who may grant an exception, the
> authority behind every move, the provenance of every record — not as
> documentation about the business, but as the live substrate the business runs
> on. Not an approximation that leaks into spreadsheets the moment reality gets
> complicated. The real model, governed at the moment each event is recorded.*
>
> *And second — because it's captured that faithfully — the system can serve that
> same governed truth to everyone who needs it, in the form each one needs.
> Your people get it as governed forms, queryable exceptions, traceable reports,
> and an audit trail that answers the regulator six months later. Your AI agents
> get it as a typed tools layer: they can read scoped data and propose actions,
> and the exact same constraint engine refuses anything a policy forbids — they
> propose, the substrate disposes. Same operating model. Same guarantees. Two
> kinds of consumer, human and machine, drinking from the same source of truth.*
>
> *That's the whole thesis. Govern the operating model once, completely, in the
> substrate — then serve it to both your people and your agents without it
> drifting, degrading, or having to be reconstructed later by a consultant. Every
> conventional ERP makes you choose between a system humans can use and a system
> machines can trust. This is one system that is both."*

Then stop talking. Let the prospect react.

---

## Time budget

| Scene | Target time | If short on time, skip |
|-------|-------------|------------------------|
| 0 (setup) | 5 min before call | Cannot skip. |
| 1 (Dashboard) | 2 min | Cannot skip. |
| 2 (CRM) | 1.5 min | Skippable in a 15-min call. |
| 3 (Sales) | 2 min | Skippable if the substrate argument is landing without it. |
| 4 (Purchasing) | 1.5 min | Setup for scene 5; cannot skip if scene 5 runs. |
| **5 (Governed status + qualifier)** | **4-6 min** | **The demo's center of gravity. Never skip.** |
| 6 (ROPE Policies) | 3 min | Skippable in a 15-min call; cover with a screenshot in follow-up. |
| 7 (Quality cascade) | 2 min | Skippable if AI/agent angle isn't the focus. |
| 8 (PLM) | 1.5 min | First to cut in a 15-min call. |
| 9 (Manufacturing) | 1.5 min | First to cut in a 15-min call. |
| 10 (Finance) | 1.5 min | Skip if the prospect is operations/quality, not finance/audit. |
| 11 (Reports) | 1 min | Skip in a 15-min call. |
| 12 (Recap) | 2 min | Cannot skip. |

**Full walkthrough: ~25 min.** 15-min cut: scenes 1, 4, 5, 6, 12. 45-min walkthrough: expand scenes 5 and 6 with the prospect's own example, and offer to drive the policy library through their RFP-style "what if" questions.

---

## Recovery moves

What to do when something goes wrong on the demo.

| Symptom | Move |
|---------|------|
| The page is slow to load and the prospect is watching the spinner. | "While that's loading — quick question for you: in your current system, when something doesn't work the way you expect, how do you find out which rule is in effect?" The substrate argument applies even when the demo lags. |
| The sidebar "ROPE Policies" link 404s (legacy `/ope` slug). | Type `/rope` in the address bar. Acknowledge once: "Minor sidebar drift, we'll clean it up." Don't dwell. |
| The governed Status dropdown / qualifier (scene 5) doesn't appear on the receipt you opened. | The field you opened isn't qualifier-wired. Use the receiving **Status** (it is wired), or another record whose primary status carries the qualifier. If nothing cooperates, jump to scene 6 and show the rule on the policy page instead. |
| Records come up empty right after a redeploy. | Stale `ygg_tenant` cookie on an old build — open a fresh incognito window (or, if you must, switch tenant and back). Fixed in current builds. |
| The prospect interrupts with a "this sounds like X" objection. | Use the objection-handling document (`business/Objection handling.txt`). The 20 entries there cover dirty data, knowledge graphs, RAG, MDM, governance, customization, and AI. |
| The prospect asks for a copy of the demo recording. | Yes, after the call. Don't promise raw screen capture; promise the deck and the whitepapers, and a follow-up call. |
| The screen share fails mid-demo. | Restart the share. Don't try to drive the prospect through the rest by voice — the substrate story is visual. |

---

## Common questions and one-line answers

| Question | One-line answer | Where to expand |
|----------|-----------------|-----------------|
| "Is this just a rules engine?" | "A rules engine evaluates conditions. ROPE evaluates operational admissibility against governed business meaning, inside the transaction." | Objection handling entry 8. |
| "Isn't this just data governance?" | "Governance describes data after the system created it. We govern when the event is recorded, not after." | Objection handling entry 15. |
| "How is this different from MDM?" | "MDM answers 'is this the same supplier.' We answer 'was this supplier approved for this part revision when this order shipped.'" | Objection handling entry 16. |
| "What about AI agents?" | "Agents act on the substrate through a typed tools layer. They can read scoped data and emit typed proposals. They cannot call SQL, cannot commit state, cannot bypass the constraint engine. The safety guarantee is in the database, not the prompt." | Whitepaper 11 (ROPE) and the academic preprint. |
| "What's the entry point?" | "Ratatosk. A five-to-eight-day diagnostic that walks one value stream end-to-end and surfaces where operational meaning is being lost. Starts at $14,500." | Ratatosk workshop demo doc + pricing memo. |
| "Is this an ERP replacement?" | "Eventually, for customers who decide they want the substrate. Not for the ones who only need the diagnostic. Both are valid outcomes." | George call flow script in Objection handling. |
| "Who else is using this?" | "We're in alpha. 2026 Validation Cohort with five PA manufacturers in discovery now. Penn State LaunchBox incubation, MANTEC partnership. No signed production customers yet, by design — we're at the point in the company where the architecture has to be in place before the customer is." | Honest answer; do not invent traction. |

---

## After the demo

Standard follow-up within 24 hours:

1. Send the two relevant whitepapers (00 platform overview + 11 ROPE), the academic preprint on the missing layer in AI readiness, and the operational-canon essay. Pull URLs from `mimirlabs.net`.
2. Drop a one-line note in `business/mimir_labs_outreach_command_center.xlsx` with the call date, key reactions, and next action.
3. If a follow-up call is scheduled, prep one prospect-specific Ratatosk diagnostic scope outline — the `sales/Full Demo Script/ratatosk-workshop-demo.md` is the source.
4. If the prospect asked about pricing during the call, send the Ratatosk pricing block (`project_ratatosk_pricing.md` reference: starts at $14,500, $17K-$21K fully scoped) and link to `mimirlabs.net/pricing` for Yggdrasil ERP pricing.

---

*Last updated 2026-06-21 (v0.8.1a-15 pass): added an **Intro** (the 30-second frame before Scene 1) and an **Outro** (the dual-consumer benefit thesis closing Scene 12 — govern the operating model accurately and completely, then serve it to both human and AI consumers); added Scene 5b (the now-shipped live Receive→block) + pre-flight 0.9; Scene 5 reframed from the unshipped receipt-block modal to the live governed-status + qualifier flow; Scene 9 updated for nested WO operations with man/machine hours derived from BOM/routing, plus the Resources operation/work-center/tooling library; demo URL → app.mimirlabs.net/yggdrasil; login tenant-picker noted; full-pane record UI noted. Kept in sync with `sales/Short Form Demo/yggdrasil-shortform-clickbyclick.md`. Maintainer: Christopher Gaither, cgaither@mimirlabs.net. Update whenever the sidebar structure, demo archetype, the governed-status/qualifier flow, the ROPE policy library, or substrate-aware positioning materially changes. Do not let the script drift from the product.*
