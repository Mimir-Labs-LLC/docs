# BFTP Call — Punch List

**Purpose:** controlled pilot program + commercialization-readiness conversation. Not a public launch, not a general sales push.
**Format:** 25–30 minutes.
**Leave the call with:** (1) what Mimir Labs does, (2) why timing is improving, (3) why the substrate layer matters, (4) what pilot candidates we need, (5) what BFTP can do to help, (6) why Central PA should be the first region to run on this infrastructure.

**One-sentence company description:**
> Mimir Labs builds governance-first enterprise data infrastructure that makes operational state verifiable at the point of action — so automation and AI can act on data the business can actually trust.

---

## 1. Pre-Call Preparation Checklist

**Demo readiness**
- [ ] Demo environment up and confirmed working end-to-end the morning of the call (run the receive → block flow once before dialing).
- [ ] Backup: a 60–90 second screen recording of the same flow, in case live env hiccups. Have it open in a tab.
- [ ] Browser zoom and font size set for screen-share legibility. Close noisy tabs/notifications.
- [ ] Demo tenant seeded with the draft purchase order that violates a policy (the one that gets blocked).

**Files / links to have open (and nothing else)**
- [ ] Live demo (or the recording fallback).
- [ ] One-page pilot brief (draft — send after, but have it open for reference).
- [ ] One slide: the substrate diagram (operational truth → governed write-path → verifiable point of use).
- [ ] One slide: pilot candidate profile + what a pilot proves.
- [ ] This punch list, on a second screen.

**The 2-minute demo (rehearse it cold)**
- [ ] Open on a real operational action a person actually takes (receiving goods against a PO).
- [ ] Trigger a state change that violates a governed policy.
- [ ] Show the system refuse the transition *inside the transaction*, name the exact policy, and write the audit trail.
- [ ] Close with: "Nothing downstream ever sees a bad state, because it was never allowed to commit."

**Framing to lock in before the call**
- [ ] Pilot framing, said out loud once: "We're running a small, controlled pilot program. I'm here for 2–3 qualified pilot conversations and commercialization guidance, not broad exposure."
- [ ] Specific asks written on a sticky note where you can see them (see §8), so you don't leave without making them.
- [ ] The three differentiators on the same note — **AI-Safety, B2BEventHub, Runtime Reality** — plus the one-line Central PA first-mover case (§5), so they surface naturally.

---

## 2. Call Agenda (25–30 min)

| Time | Segment | Goal |
|---|---|---|
| 0:00–2:00 | **Company framing** | They can repeat what we do in one sentence. |
| 2:00–4:00 | **Market signal** | Timing is improving; the market is naming our problem. |
| 4:00–6:00 | **Problem statement** | Why automation/AI fails on unverifiable operational state. |
| 6:00–11:00 | **Product / demo** | Show, don't tell — the governed write-path in action. |
| 11:00–16:00 | **Pilot structure** | What a pilot is, who qualifies, what it proves. |
| 16:00–21:00 | **BFTP fit + asks** | Concrete asks; non-dilutive + intros + advisors. |
| 21:00–30:00 | **Q&A / next steps** | Lock a follow-up and permission to send the brief. |

Keep a soft eye on the clock at the 6, 11, and 16 marks. If the demo runs long, cut from pilot structure, not from the asks.

**Note:** the three differentiators (AI-Safety, B2BEventHub, Runtime Reality) and the Central PA first-mover case — §5 — are woven into the framing, the demo, and the BFTP-fit beat, not given a separate time block. For a BFTP (economic-development) audience, the regional first-mover case is the part to land hardest.

---

## 3. Core Talk Track (founder-level, natural)

**Company framing (2 min)**
> "Mimir Labs builds the data layer underneath enterprise software. Most companies run on an ERP, a pile of Excel, and a handful of integrations stitched together over years. The data those systems produce is usually inconsistent, copied many times over, and impossible to fully trust by the time anyone — or any AI — acts on it.
>
> We fix that at the source. We make operational truth governed: every important state change is checked against the company's own rules at the moment it happens, and refused if it would break one. The result is data that's verifiable at the point you use it, with a full audit trail of why it's allowed to be what it is.
>
> We're past the build phase. The core platform works. I'm here to talk about running it with a few real operators and about what commercialization looks like from here."

**Problem statement (2 min)**
> "Here's the failure mode everyone's hitting. You point automation — or now an AI agent — at your operational data, and it acts confidently on something that isn't true. The purchase order says 'received' but the goods failed inspection. The number on the dashboard is four systems and one overnight batch away from the transaction that produced it. Nobody's lying; every system is locally correct. But the meaning drifted, and the distance hid it.
>
> Companies treat this as a data-quality problem and throw cleanup and reconciliation at it forever. It's actually a structural problem: the rules that define what's true aren't enforced where the data is written. So we enforce them there."

**Transition to demo:** "Let me show you the smallest possible version of that, because it's easier to see than to describe."

*(go to §6 demo framing)*

**Close of the substance section**
> "That's the whole thesis in one action. The business's own policy, enforced inside the transaction, with a record of it. Do that across the operational core and your automation stops acting on things that were never true."

**Regional beat (for BFTP — say it after the close):**
> "And here's why this is a regional story, not just a company one. Three things make us different: AI-Safety — the safety lives in the database, not in a prompt; the B2BEventHub — real-time, governed operational events flowing between businesses; and Runtime Reality — a record that can't drift from what's actually happening. Central PA could be the first region to run its industrial base on all three. The pilots prove it firm by firm; the event hub makes it compound across the region. Whoever gets there first has a manufacturing edge that's hard to copy."

---

## 4. Market Signal Talking Points (sober, commercial — not "I was right")

Lead with *convergence*, not vindication. The point is that demand is forming, independently of us.

- "What's changed in the last year isn't our technology — it's that the market started naming the problem out loud."
- "People who don't talk to each other — data scientists, AI-governance folks, the dirty-data advisory crowd, the runtime-authority people — are independently landing on the same sentence: *AI can't act reliably on operational state it can't verify.*"
- "That convergence matters commercially because it means we no longer have to sell the problem. The buyer increasingly already believes it. Our job shrinks to showing that we solve it at the layer where it's actually solvable."
- "The AI wave is the forcing function. Dashboards tolerated drift because a human read them with judgment. An agent doesn't. So the cost of unverifiable state just went from 'annoying' to 'blocking.'"
- Tone discipline: no "I called this." Say "the timing is catching up to the architecture," not "I was early." Keep it about the buyer's readiness, not our foresight.

---

## 5. The Three Differentiators — Tenant Value and the Central PA First-Mover Case

Three things separate Mimir Labs from data-governance tools, integration platforms, and AI wrappers. For BFTP specifically, each is also a regional economic-development lever: Central PA can be the first region to operate on this infrastructure.

**1. AI-Safety — the safety is the database, not the prompt.**
- *What it is:* The governed substrate refuses any state change that violates the company's rules inside the database transaction. An AI agent cannot commit an action that breaks policy — safety is a property of the system of record, not a guardrail bolted onto a model.
- *Tenant benefit:* Put AI and automation on core operations without betting the business on a model behaving well. The substrate is the backstop; a confident-but-wrong agent simply cannot corrupt operational truth.
- *Why Central PA first:* The first region whose manufacturers can safely run AI on the floor and in the back office. "AI-safe industrial operations, proven in Central PA" is a regional moat — a magnet for AI-forward talent, capital, and customers, and a flagship story for the region's manufacturing base exactly as AI adoption accelerates.

**2. B2BEventHub — a real-time, governed operational fabric between businesses.**
- *What it is:* A real-time event hub that streams governed operational events — orders, receipts, shipments, quality holds — between businesses as they happen, carrying verified state rather than nightly copies.
- *Tenant benefit:* Real-time, trustworthy integration with trading partners. No batch lag, no reconciliation; the events are already true when they arrive. Faster, lower-friction B2B operations.
- *Why Central PA first:* This is where the regional story compounds. A cluster of Central PA manufacturers, suppliers, and distributors on the same governed fabric becomes a connected regional supply chain — real-time, verified, resilient. The network effect is local: each operator that joins makes it more valuable for the next. The first region with a live governed B2B operational fabric has a structural supply-chain advantage, and BFTP is positioned to seed it.

**3. Runtime Reality — the record cannot diverge from what is actually happening.**
- *What it is:* Operational state is a governed, verifiable reflection of reality at runtime. Illegal transitions are refused in-transaction and the audit log is immutable, so the record cannot drift from operational truth.
- *Tenant benefit:* Every decision, report, audit, and automated action runs on state that is true at the moment of use. The reconciliation tax and the "which number is right" problem disappear; compliance and audit-readiness become a byproduct.
- *Why Central PA first:* Operators that run on verifiable runtime reality are more bankable, auditable, insurable, and acquirable. Lower operational risk across the regional economy makes Central PA firms more attractive to lenders, investors, and acquirers — and gives BFTP a portfolio of operators whose numbers can be trusted.

**The regional thesis (one breath, for BFTP):**
> "Central PA can be the first region to run its industrial base on AI-safe, real-time, verifiable operational infrastructure. The pilots prove it firm by firm; the B2BEventHub makes it compound across the region. The first region to get there has a manufacturing-competitiveness edge that's hard to copy — and BFTP would be the institution that seeded it."

---

## 6. Demo Framing (the 2-minute demo)

**How to introduce it:**
> "This is one real action — receiving goods against a purchase order. Watch three things: *what the system refuses to do, why it refuses, and what it leaves behind.*"

**What the listener should pay attention to (say it before you click):**
1. **The refusal happens at the moment of action** — not in a later report, not in a nightly check. The bad state never commits.
2. **The system names the exact governing policy** — it's not a generic error, it's "this transition violates *this* rule the company authored."
3. **There's an audit trail** — you can reconstruct exactly why the state is what it is.

**Close the demo with the one line that generalizes it:**
> "Multiply that across the operational core, and every downstream consumer — every report, every integration, every AI agent — is reading state that was never allowed to be wrong in the first place."

Do not narrate the architecture. If they ask how, one sentence: "The rules are enforced inside the database transaction by a policy engine the company controls." Then stop.

---

## 7. Pilot Program Framing

**The frame:** "I'm looking for 2–3 qualified pilot conversations, not broad market exposure. A pilot is a controlled engagement with one operator, scoped to one painful workflow, that proves the governed write-path on their real data."

**Who qualifies (say which of these the intro target looks like):**
- **Manufacturers** — work orders, receiving, quality holds, traceability obligations. State that has to be right or product ships wrong.
- **Distributors** — inventory, fulfillment, multi-system order state; lots of "the number disagrees across systems."
- **ERP-constrained operators** — running an ERP they can't change, bleeding logic into customizations and side spreadsheets.
- **Compliance-exposed organizations** — audit traceability, regulated transitions (quality, finance, aerospace/medical), where "prove why this was allowed" is a real requirement.
- **Excel / shadow-system-dependent companies** — the real rules live in spreadsheets next to the system of record. Classic semantic gap.

**What we keep small (so it converts):** one workflow, their real data, a fixed short engagement, a clear before/after. We are not proposing an ERP rip-and-replace to run a pilot.

---

## 8. Specific Asks for BFTP (make all of these — don't leave without them)

1. **Pilot intros.** "Can you introduce me to 2–3 regional manufacturers or distributors with ERP, Excel, reporting, compliance, audit-traceability, or AI-readiness pain? That's the single most useful thing you can do."
2. **Pilot positioning feedback.** "I'd value a read on whether this pilot framing lands with operators in your network — is 'one workflow, your real data, short engagement' the right shape, or should it be tighter?"
3. **Commercialization / operator advisors.** "Introductions to commercialization advisors or industrial-software operators who've taken infrastructure into manufacturing would be high-leverage right now."
4. **Non-dilutive funding guidance.** "What non-dilutive and grant paths fit a company at our stage — and what would make us competitive for them? Happy to be pointed at the right program officer."
5. **Regional pilot identification.** "Help me identify early regional pilot candidates specifically — the operators near you who feel this pain most acutely."
6. **Champion the Central PA first-mover case.** "Would BFTP help position Central PA as the first region to run on AI-safe, real-time, verifiable operational infrastructure — and help seed a small cluster of local operators on it? The B2BEventHub only compounds when several regional operators are on it, so a cluster is worth more than any single pilot."

Pick the top 2 if time is short: **(1) pilot intros** and **(4) funding guidance**. If the room is energized by the regional angle, lead with **(6)** — it reframes the whole conversation from "fund a startup" to "give the region a first-mover asset."

---

## 9. Likely Objections / Confusion Points (crisp answers)

**"Is this an ERP replacement?"**
> "No. We can run alongside the ERP you have. We govern the write-paths and the rules; the pilot doesn't touch your system of record's day job. We do also build a governed ERP, but that's not what a pilot requires."

**"Is this an AI product?"**
> "No — it's the layer that makes AI safe to use. We don't sell a model. We make operational state verifiable so that whatever automation or AI you run acts on something true."

**"How is this different from data governance?"**
> "Most governance documents the rules and audits violations after the fact. We *enforce* the rules at the moment of the write, so the violation never commits. Governance tells you what went wrong; we don't let it go wrong."

**"Why would a manufacturer care now?"**
> "Two reasons. Traceability and quality holds are already a live cost for them. And the minute they try to put automation or AI on top of their operational data, the unverifiable-state problem stops being tolerable. The AI pressure is what turns this from 'someday' into 'now.'"

**"What exactly would a pilot prove?"**
> "That on their real data, in one painful workflow, the governed write-path stops bad state from committing, names the rule, and produces the audit trail — and that this is something their current stack does not do. Concrete before/after, scoped, short."

**"What do you need from us?"**
> "Two or three warm introductions to operators who feel this, and guidance on the non-dilutive and commercialization side. That's the help that moves us fastest."

---

## 10. Success Criteria for the Call

A good outcome is **all or most** of:
- [ ] **At least 3 named intro targets** (people or companies, not categories).
- [ ] **Agreement on the pilot framing** — they think "one workflow, real data, short engagement" is right, or give a specific adjustment.
- [ ] **One concrete follow-up** booked — a second meeting or an advisor introduction.
- [ ] **Clarity on funding/commercialization resources** — at least one named program, person, or path.
- [ ] **Permission to send the one-page pilot brief** (and to whom).

If you get the 3 names and the permission to send the brief, the call succeeded.

---

## 11. Post-Call Follow-Up Checklist

**Same day (within a few hours):**
- [ ] Send the thank-you email — short, specific, restates the one-sentence description and the pilot frame.
- [ ] Attach: the one-page pilot brief and the substrate one-slide. Link the demo recording.
- [ ] Restate the asks in writing: the intro targets discussed, the funding path mentioned, the follow-up agreed.
- [ ] For each intro they offered: provide a forwardable blurb (2–3 sentences they can paste) so the intro is zero-effort for them.

**Logging / CRM:**
- [ ] Log the call: who, date, what was agreed, named intro targets, objections raised, funding/program leads.
- [ ] Create follow-up tasks with dates for each promised intro and the next meeting.

**Next-action deadlines:**
- [ ] Pilot brief sent: **same day.**
- [ ] Forwardable intro blurbs sent: **same day or next morning.**
- [ ] Gentle nudge on any unfulfilled intro: **+5 business days.**
- [ ] Follow-up meeting confirmed on calendar: **within 1 week.**

---

*Internal prep document — Mimir Labs LLC. Pilot-stage; controlled commercialization conversation. Keep technical architecture light; keep focus on pilot conversion and commercialization support.*
