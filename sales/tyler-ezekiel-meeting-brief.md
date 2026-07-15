# Meeting Brief — Tyler McMullen + Ezekiel Templin

*Single-document meeting prep. Print or have on a second screen. Synthesized from ChatGPT's punch-list framing, tuned to the personas in the room.*

---

## Context — who is in the room

**Tyler McMullen.** Co-founder and CTO of Fastly. Built the first versions of Fastly's Instant Purging system, the API, and Real-time Analytics. Pre-Fastly: text analysis and recommendations at Scribd, large-scale web apps, performance. Self-described technology curmudgeon — has been deep enough in distributed systems for long enough to be reflexively cynical, which is exactly the read I want on the Event Hub. **~25 years of friendship.** He does not need to be pitched on me, and I do not need to perform credibility for him.

**Critical posture correction:** the angle with Tyler is **"help me make this bulletproof"** — not "this is a better use case for your philosophy." He's drawn to the Event Hub because it's an interesting distributed-systems problem in a pattern he's shipped at scale, not because it validates anything he already thinks. The asked-for transaction is *engineer-to-engineer, help me find where this breaks*, not *founder-to-CTO, bless what I've built*. Every Tyler-facing question and every framing of the Event Hub work below is tuned to that posture.

**Ezekiel Templin.** Senior Principal Engineer at Fastly (Oct 2016 – May 2018), overlapping with Tyler. Earlier: Software Engineer at Paper Cavalier; founder of Semantic Leap (2006–2012); IP Services. GitHub `ezkl`, 117 public repos. Type: deep IC / principal-engineer architect — the person whose job at Fastly was to find where the distributed-event-distribution layer would break before it broke in production.

**Combined posture they bring:** Fastly Instant Purge is, in effect, a B2B event hub for cache-invalidation events across thousands of edge nodes with at-least-once semantics, bounded retry, and multi-tenant authorization. They have lived the exact architectural pattern the YGGDATA-674 B2B Event Hub uses, at a scale we are nowhere near. **They will see through any framing that handwaves the hard parts of distributed events.** That is the point. Use them as critics, not introducers.

---

## The 5-minute thesis version

A typical enterprise runs on 37 systems and a parrot named Gerald. Each system thinks it owns the canon for some entity. None of them enforces canonical meaning at the write boundary, because all of them were built for an era when the question was *can we keep books closed at month-end* — not *can we make this substrate safe for an agent to act on at 2:13 in the afternoon*.

The result is what I have been calling **operational distortion**. The system represents the business as the bookkeeper would have liked, not as the floor actually runs. Every patch on the substrate — custom fields, workflow tools, shadow systems — adds to the distortion rather than fixes it, because the spine never moves.

The technical wedge: a runtime substrate that **refuses illegal state transitions at the database boundary**, carries provenance and authority as first-class data, and federates operational events across companies through a real-time event hub. That last piece — the **B2B Event Hub** — is the venture-scale move. Single-company operational truth has a market. **Cross-company operational truth on a shared authority envelope is infrastructure.**

We have built the substrate. The diagnostic layer (Ratatosk) ships. The canonical model (Mimisbrunnr, 323 concepts) ships. The governance plane (Jormungandr, OPE) ships. The operational engine (Yggdrasil ERP) ships. The Event Hub runs on JWT-authenticated WebSocket with persistent at-least-once delivery, federation pluggable between Redis pub/sub and Redpanda, sitting on the same PostgreSQL substrate as the operational record. Zero-knowledge by design, append-only audit at the database trigger level.

The question I'm here to answer with you: is this a strong ERP critique, or is the B2B Event Hub the spear tip that turns this into infrastructure?

---

## The 10-minute architecture walkthrough

*Four stops. The substrate gets the most weight because that is where the technical distinctive sits. The Event Hub gets the most time because that is where their read matters most. The product family is **named at the end as context, not walked through**.*

### Stop 1 — The substrate (3 minutes)

*What the database boundary actually owns, not what sits in the application layer above it.*

- **Canonical schema as runtime construct.** 323 concepts, ~2,600 attributes, 885 relationships, 35 state models across 17 business domains. Compiled into the server binary as Qt resource files, read-only at runtime, updated only through release. Customer extensions live in a separate PostgreSQL tier with row-level security; a collision with a platform name is rejected at the API layer with a 409 and the existing platform concept in the body.
- **State Constraint Engine — the runtime gate.** Sits between the user action and the database write and refuses any transition the active policy does not permit. **Refusal is at the database boundary, not the application boundary.** Even a privileged path that bypasses the application layer is rejected.
- **Append-only audit log enforced at the database trigger level.** `UPDATE` and `DELETE` on the audit table raise an exception via a trigger function. An attacker who compromises the application role cannot cover their tracks through the application; the audit row fires for every mutation including their own.
- **Multi-tenant isolation via PostgreSQL RLS** bound to the session variable `app.current_organization_id`. A session that forgets to set the variable returns the empty set, not someone else's data. **The system fails closed.**
- **All writes flow through a single Repository surface.** Bulk loads, integrations, scripted maintenance — every mutation hits the same constraint surface and the same audit. No side channels; drift cannot accumulate quietly.

*Hand across at this stop: the audit-trigger SQL, the RLS policy + session-variable pattern, the State Constraint Engine entry function.*

### Stop 2 — Yggdrasil ERP (1.5 minutes)

*The operational engine that proves the substrate works at one-company scale. Brief stop — the cross-company question lives at Stop 4.*

- Ten integrated business modules on the single shared data model. **Zero custom fields** — customization moves into the projection layer where its consequences are local and auditable.
- Operational events emit on a `<module>.<entity>.<verb>` convention (`sales.order.confirmed`, `quality.ncr.opened`). **The GL is one consumer of that stream, not the structural frame.**
- Every operator action hits the constraint engine, the audit log, and the RLS policy described at Stop 1. There is one path; there are no exceptions.

### Stop 3 — OPE + Jormungandr (1.5 minutes)

*Signed policy as runtime artifact — the governance plane that compiles into what the State Constraint Engine enforces.*

- The compliance officer (not the engineer) authors the rule in compound natural language with authority citation, evidence, signers, effective dates. The signed Decision compiles into four runtime artifact kinds: state constraints, role permissions, approval flows, workflow templates.
- **OPE** runs inside Yggdrasil at the transaction boundary. The State Constraint Engine consumes the compiled artifacts; the policy that compliance signed *is* the policy the runtime obeys.
- **Jormungandr** is the same engine for systems we cannot replace — wraps around an existing data landscape, enforces canonical meaning, valid state, governed mutation, auditability at the data-contract layer. JSON Schema contract emission, drift detection, versioned canon registries.

### Stop 4 — B2B Event Hub (4 minutes — *the heart of the conversation*)

Every consequential mutation is a typed, addressable event on a JWT-authenticated WebSocket, default port 8081, same authorization envelope as the rest of the API. Four operational responsibilities at once: live UI updates, integration substrate, cross-tenant publication, federation backbone.

**Three publication modes:**
- *Local broadcast* — system-wide to every authenticated client; reserved for platform-level signals.
- *Tenant-scoped delivery* — transient events to clients bound to a given tenant; primary mode for live UI.
- *Persisted publication* — durable B2B path: row inserted into `b2b_events` (status `pending`, full payload as JSONB), delivered locally, forwarded through the federation relay, marked `processed`. **At-least-once semantics. 30-second retry timer. Bounded retry budget of three attempts. Fifty events per batch. Events that exceed the budget remain as `failed` for operator review, never silently discarded.**

**Federation is pluggable.** Redis pub/sub for deployments where operational simplicity is the priority and the relay runs adjacent to app servers. Redpanda (Kafka-protocol) where Kafka infra already exists for analytics or archival. Both expose the same internal interface; only one relay active at a time; echo suppression inside the relay layer.

**Events live in the canonical PostgreSQL database** — same backup pipeline, same audit posture, no separate event store to maintain, no second source of truth to reconcile.

**The strange and load-bearing consequence:** the customer's GL and the customer's customer's PO can be on the same authenticated event protocol — with the same authorization envelope, the same audit guarantees, the same canonical schema — without a separate integration tier between companies.

*Hand across at this stop: the `b2b_events` schema, the sample event payload, the federation-relay interface.*

*The Fastly analogue (use only if Tyler reaches for it first):* this is the Instant Purge pattern applied to operational events instead of cache invalidations. Same primitives — typed events, pluggable transport, multi-tenant authorization, bounded retry, persistence for the durable path — applied to a substrate that owns canonical meaning rather than ephemeral cache state.

**The honest framing of where I want Tyler's hands.** I have built this in the pattern you've shipped at scale. I think it has failure modes I cannot see from the inside — backpressure under burst load, the persistence-vs-ephemeral split when the federation layer flaps, the multi-tenant authorization envelope when one tenant becomes hostile, the cost-of-correctness when at-least-once turns into accidental duplicate-delivery storms. **What I want is for you to operate this in your head as if you were going to run it in production at Fastly scale, and tell me where it breaks first.** That's the conversation.

---

### Product family — named, not walked through

The substrate above supports a product family that sits on top of it. Each ships, each is real, **none of them is what this meeting is about**:

- **Ratatosk** — zero-knowledge, AI-free data governance diagnostic. Surfaces substrate gaps before they get mislabeled as adoption / process / change problems. Recently extended with an audience-aware Advisory Output Layer (diligence, migration, audit, compliance, IT strategy).
- **Ragnarok** — target-agnostic data migration tool. Uses Mimisbrunnr as the Rosetta Stone; not locked to Yggdrasil as a target.
- **Bifrost** — real-time integration engine for legacy ERPs. Lets the canonical event protocol consume from systems that don't speak it natively.
- **Jormungandr** — canon governance + OPE for non-Yggdrasil systems. *Already covered at Stop 3.*
- **Norn** — contract intelligence. Pulls obligations out of contracts as structured operational data the rest of the platform can govern against.

*These are abstractions built on top of the substrate. They are not the substrate. If the platform conversation lands, the product family becomes the natural next conversation. We are not having it today.*

---

## Concrete proof path (in-person, no laptop)

*Original draft assumed a live demo. **I do not have a laptop.** The substitute is a small packet of printed artifacts plus phone access to the live GitHub repo. The principle stays the same: **show, don't describe**. The artifacts are real code and real schema from the actual codebase. Only the medium changes.*

*The packet is **platform-centric, not product-centric**. Ratatosk Advisory Briefs and Pre-emption Catalogs are intentionally not in the packet — they are abstractions over the platform, and abstractions land after the platform has landed. If the conversation reaches there, the artifacts are on the phone.*

### What to print before the meeting

A small folder, 5–6 pages. All from the real codebase — do not mock anything. **Fastly engineers read real source code faster than any slide could explain it.**

1. **Append-only audit-trigger SQL** — the `BEFORE UPDATE OR DELETE` trigger on the audit table that raises an exception. 8–12 lines. They will read it in ten seconds and know whether the discipline is real.
2. **RLS policy + session-variable pattern** — the `app.current_organization_id` setup, one representative `CREATE POLICY` statement, and the empty-set-on-missing-variable behavior. 6–10 lines.
3. **State Constraint Engine entry point** — the function signature, the policy-consultation call, the refusal path. 25–40 lines. **This is the gate-refusing-at-the-database-boundary claim, made concrete.**
4. **`b2b_events` schema** — the table definition (status enum, retry counter, JSONB payload, federation-relay reference) plus the `B2BEventHub` federation-relay interface. ~50 lines combined. Two pages tops.
5. **One pretty-printed sample event payload** — actual JSON. Envelope (event id, timestamp, tenant id, schema version) + the typed event body + the authorization claims attached. One page.
6. **One-page architecture diagram** *(optional but recommended)* — drawn or printed. Operational mutation → State Constraint Engine → audit row + b2b_events row → federation relay → subscriber. Boxes and arrows. Engineers love a napkin diagram, and you can also draw it on a sheet of paper in the room if a tangent calls for it.

### What to have ready on the phone

- **GitHub repo open**, bookmarks or open tabs:
  - The audit-trigger SQL and RLS policy (in `database/schema/yggdrasil_complete_schema.sql`)
  - The State Constraint Engine (`server/src/services/ConstraintEvaluator.cpp` or wherever it lives)
  - `common/src/B2BEventHub.cpp` and the `b2b_events` schema
- **Screenshots folder** with: a State Constraint Engine refusal + audit row, a `b2b_events` row in `psql` output, a WebSocket subscriber receiving a fired event. *System-in-motion shots — useful only if a question reaches there.*
- **Product-family artifacts as a fallback** — Advisory Brief PDF, Pre-emption Catalog, Provenance Trail entry. **Not in the printed packet. On the phone only.** Pull them up if and only if Tyler or Ezekiel asks specifically about the productized layer.

### How to use them in the walkthrough

- **Stop 1 (substrate):** hand them the **audit-trigger SQL**, the **RLS pattern**, the **State Constraint Engine entry**. These three are the substrate, made concrete. *This is the heaviest paper-handing of the meeting.*
- **Stop 2 (Yggdrasil ERP):** no artifact needed; verbal.
- **Stop 3 (OPE + Jormungandr):** no artifact needed; verbal. The State Constraint Engine code already in their hands from Stop 1 is what OPE compiles into; reference it.
- **Stop 4 (B2B Event Hub):** hand them the **`b2b_events` schema**, the **sample event payload**, the **federation-relay interface**. Pull the actual code up on the phone if they want to read more. **Fastly muscle memory engages here — let them read; do not over-narrate.**

If the product-family conversation surfaces unprompted, the Ratatosk artifacts are on the phone. Otherwise: skip.

### How to open the meeting (the honest acknowledgment)

Name the constraint once, in the first thirty seconds, then move on:

> *"Heads up — I don't have a laptop today, so the substitute is paper plus my phone. I'll send a recorded screen-walk afterward so you can see everything live. The printed pages are real code from the actual codebase, not mocks."*

**The constraint is not a weakness if it is named directly and the substitute is high quality.** Fastly engineers reading real source code from a printed page is a higher-credibility surface than a polished demo someone could have staged.

### Post-meeting follow-up (within 48 hours)

One email to both:

1. **5–8 minute recorded screen-walk of the platform** — Loom or similar — in the same order as the architecture walkthrough. *This is the most important post-meeting artifact.* The Event Hub portion should be the longest section.
2. **Links to the four key files on GitHub** — the audit trigger + RLS policy, the State Constraint Engine, the `B2BEventHub` + `b2b_events` schema.
3. **One next question per person**, drawn from whatever each of them reached for most strongly in the room.
4. *(Only if the product family came up):* links to the Ratatosk Advisory Output Layer strategy doc + the relevant essays. Otherwise omit — sending them unprompted reads as overreach.

The printed packet opens the door. The recorded screen-walk walks through it. Treat the follow-up as load-bearing, not optional.

---

## The "why now"

*Four converging forces, each strong on its own, hard to dismiss together.*

**AI agents.** Every enterprise is being asked to make their data and their operational systems agent-actionable in the next 18 months. Agents cannot safely act on substrate that does not carry provenance, state, evidence, and authority as part of the operating record. The *clean the data* framing misses the layer — it is not that the values are wrong, it is that the records do not carry what an agent needs to know to act. Operational canon is the missing layer.

**ERP fragility.** Panorama and Standish failure-rate data are not in dispute. The reason the rate is misattributed every cycle is structural — the people watching the substrate are watching uptime and access, not meaning and authority. The wedge is not *ERP but better*. The wedge is *the gate that catches what the security gate misses*.

**Semantic drift.** Every integration was correct on the day it was written. Cross-system reconciliation is a standing tax that scales superlinearly with system count. A canonical event protocol with enforced meaning at the source eliminates the pairwise translation surface. We are not fixing integrations — we are removing the need for them.

**Cross-company operational events.** Real-time supply-chain coordination, JIT inventory across vendor lines, agent-mediated procurement — none of these work on the current substrate because no two parties share an authoritative event protocol. SAP Event Mesh is a vendor-mediated mesh sold per delivery; Salesforce Platform Events likewise. The B2B Event Hub is part of the platform's authorization envelope. At scale the cost difference is not 30% — it is a different category of expense.

---

## The ask

*Three asks, in priority order. A possible fourth, only if it surfaces organically.*

1. **Hands-on hardening of the Event Hub** (Tyler, primarily). Operate the architecture in his head as if he were going to run it at Fastly scale and tell me where it breaks first. Backpressure model, federation flap behavior, multi-tenant authorization envelope under hostile-tenant pressure, at-least-once cost-of-correctness, persisted-path vs. ephemeral split. Not a blessing — a specific list of the failure modes I should be designing against now rather than discovering in production.
2. **Hard architectural read of the platform** (Ezekiel, primarily). Where does the rest of the architecture feel brittle, where would implementation complexity explode, what would he need to see to believe this is more than an ERP critique.
3. **Co-authored essay.** If the thesis holds after the hardening conversation, an essay the three of us put our names to — framing the B2B Event Hub as infrastructure rather than as an ERP feature. Single piece, Substack first.
4. **Three to five intros** to people who would understand this fastest — anyone running a B2B platform that has felt the integration-tax pain, anyone building agentic systems that need a substrate to act on.

**Possible fifth — do not ask in the room.** Advisor path. Only if one or both of them organically pulls toward it after the technical read. Closing aperture: *"if either of you ends up feeling pulled toward this after sitting with it, the advisor path is open."* Anything more direct kills the read.

---

## On funding and involvement

*The conversation can hold both the engineering truth and the financial truth at the same time. Do not separate them artificially. Do not lead with the money. Do not pretend the money does not matter, either.*

### The financial reality, stated as fact

I am on a $65k salary, living paycheck-to-paycheck, building this in the cracks of a day job. The architecture works. The artifacts ship. **What I cannot do from here is bootstrap to escape velocity.** To take this from *compelling demo plus ten essays* to *infrastructure that people can buy and operate*, I need capital, not just validation.

### The framing rule

**I would have asked Tyler for the sanity check whether or not he had Fastly money.** The 25 years and the engineering question are the actual reason for the conversation. The funding need is a parallel fact, not the underlying motive. Both are true at the same time and the brief must not collapse one into the other. When the moment to be honest about money arrives, name that truth — that I would be in this meeting regardless of his net worth, AND that the financial reality is real.

### The ladder of meaningful involvement

*For if Tyler asks "what would matter," or if the conversation arrives at the right moment on its own. **Co-founder or investor is the goal. Any rung of the ladder helps.***

| Level | What it means | Why it matters |
|---|---|---|
| **Quotable nod** | Public statement, on the record, that the architecture is serious. | Buoys outreach to anyone who needs a credibility signal. Lowest commitment from him; meaningful lift for me. |
| **Advisor** | Quarterly architectural reads, intros to his network, name on the website. | Real value, low commitment. Real wind in the sails. |
| **Investor** | A check, any size. | Capital changes the trajectory. The market signal — *someone with deep distributed-systems credibility is in* — is the larger half of the value. |
| **Co-founder** | The goal. | Not asked for in the room, not even named unless he reaches there himself. The kind of thing that emerges from a third or fourth conversation, not a first. |

### Language for when the topic surfaces (and not before)

- **If Tyler asks "what level of involvement would make sense":** *"Honestly, any. Even your willingness to be quoted publicly that this is serious would matter. Advisor is a natural fit. Investor would change the trajectory. And — full honesty — I would be open to co-founder if either of us ended up feeling pulled there, but I am not asking you to commit to that in a single conversation."*
- **If Tyler asks "do you need money":** *"Yes. I am on $65k and bootstrapping in the cracks. The architecture works; the capital is what would let me take it from artifact to infrastructure. I would have come to you for the technical conversation regardless, but I am not going to pretend the financial reality is not part of the picture."*
- **If the conversation never surfaces it:** do not introduce it in this meeting. The technical conversation is the door. Funding is what happens *after* he believes the door is real, not part of how we open it. A follow-up conversation, after he has had time to sit with the architecture, is the right venue.

### What this changes about the meeting

Nothing about the technical work. Stop 5 of the walkthrough is still where his hands belong. The five hardening questions for him are still the primary ask. The Do-Not on funding-leading is still right.

What changes: **the meeting is no longer pretending the financial truth doesn't exist.** If he asks, I answer honestly. If he doesn't ask but the conversation creates a natural opening, I take it — once, briefly, without escalating. If neither happens, I leave the meeting having had the technical conversation I came for, and I follow up in a second meeting where the money conversation can stand on its own legs.

---

## Five things to prove in the room

1. **I am not just complaining about ERP.** Lead with the substrate question, not the failure rate. The failure rate is a symptom; the substrate gap is the diagnosis.
2. **I understand the technical root cause.** Use the *right gate for the wrong threats* metaphor and the operational distortion thesis. Show I can name where the legacy spine sits and why the patches make it worse.
3. **I have built working artifacts, not just a theory.** **Show the artifacts. Don't describe; show.** No laptop in the room, but: printed audit-trigger SQL, RLS policy + session-variable pattern, State Constraint Engine entry point, `b2b_events` schema, sample event payload. Phone-pulled GitHub for the actual source. The artifacts are real code from the actual codebase — the medium is paper and phone, not a live demo. The substance is the same. Recorded screen-walk follows within 48 hours.
4. **The B2B Event Hub is the venture-scale wedge.** Make the cross-company claim explicit. Same protocol, same authorization, no integration tier between companies. That is what makes it infrastructure rather than tooling.
5. **I am here for help, not blessing.** Tyler-specific. The Event Hub is the thing I want him to break, not the thing I want him to admire. Frame the ask as a specific list of failure modes I should be designing against, not as "does this feel right to you."
6. **Their involvement has a clear path to leverage.** Be specific about the hardening → essay → intros sequence. An hour of their read should have a defined downstream artifact, not vanish into "interesting, keep me posted."

---

## Questions for Ezekiel

*The deep-IC read. Tune to break the architecture rather than to validate it.*

1. **"Where does this architecture feel technically brittle?"**
2. **"Does the B2B Event Hub make the thesis more concrete?"**
3. **"What would you need to see to believe this is more than an ERP critique?"**
4. **"Where would you expect implementation complexity to explode?"**
5. **"Who would understand this fastest?"**

*Optional follow-ups if there's space:*
- The persisted path on `b2b_events` with at-least-once + bounded retry budget — where does this strain at scale, and what's the right backpressure model?
- Redis pub/sub vs Redpanda as pluggable federation — where does the abstraction leak?
- Multi-tenant isolation via RLS on `app.current_organization_id` plus JWT-authenticated WebSocket — what's the failure mode that scares you?

## Questions for Tyler

*Engineer-to-engineer "help me make this bulletproof." He has shipped this pattern at scale; ask him to break what I have built.*

1. **"If you had to operate this in production at Fastly scale, where does it break first?"**
2. **"Where does the persisted-path / at-least-once / bounded-retry model under-fit a real workload? What's the failure mode I'm not seeing — backpressure storm, duplicate-delivery cascade, retry exhaustion under a noisy tenant?"**
3. **"The federation layer is pluggable between Redis pub/sub and Redpanda. Where does the abstraction leak when one of them flaps? What would you have done differently?"**
4. **"Multi-tenant authorization on the WebSocket plus RLS on `app.current_organization_id` — what's the failure mode that would scare you, and where would a hostile tenant first crack the envelope?"**
5. **"If this is infrastructure rather than tooling, what hard problem does it need to solve in year one that I'm not currently solving?"**

*Optional, only after the technical work is done:*
- **"Would this be worth co-authoring publicly if the framing is tight?"** *(Strategic-read question. Save it for after the hardening conversation — asking earlier collapses the posture into validation-seeking.)*
- **"Who should see this next?"** *(Same — intros come after the read, not before.)*
- *(Friend-to-friend register, only if the mood allows.)* **"If you sat with this for a week and decided it was the real thing, what would you do?"**

---

## Do not

1. **Do not lead with funding.** The thesis lives or dies on the architecture, not the round. *Caveat — see the "On funding and involvement" section above:* the rule is about sequencing, not about hiding the truth. If Tyler asks, be honest. If the conversation creates a natural opening late in the meeting, take it once and briefly. The funding need is real and stating it honestly is not the same as leading with it.
2. **Do not rant about consultants.** The consultants are doing a job inside a broken settlement. The settlement is the target, not the people.
3. **Do not over-explain every product name.** Yggdrasil, Ratatosk, Jormungandr, Mimisbrunnr, OPE, Bifrost are tools to the story, not the story. Use the names; don't lecture them.
4. **Do not frame Yggdrasil as "ERP but better" first.** That collapses the wedge. Lead with the substrate gap and the B2B Event Hub. Yggdrasil is what proves the substrate works at one-company scale; the Event Hub is what extends it to N-company scale.
5. **Do not ask for a cofounder commitment in the room.** *Refined — see the "On funding and involvement" section:* co-founder is the goal, but a first conversation is the wrong venue to ask. If Tyler asks "what level of involvement would make sense," it is acceptable to name co-founder as the upper end of the ladder *if* it is paired with "not asking you to commit to that in a single conversation." Anything more pressing — explicit ask, urgency framing, equity numbers — kills the read.

*Two persona-specific additions:*

6. **Do not lecture Tyler on what Fastly built.** Reference Instant Purge only if he reaches for it first, and only as a touchpoint for shared vocabulary. He doesn't need my read on his own product.
7. **Do not perform credibility for Tyler.** Twenty-five years means we skip the trust ramp. The framing is *I have built a thing and I want your help hardening it*, not *let me earn the right to your attention*.
8. **Do not frame the Event Hub as "a better use case for your philosophy."** That collapses the posture into validation-seeking and tells him implicitly that I want his blessing more than his help. His interest is piqued by the *engineering problem*, not by what it confirms about him. Ask him to break it, not bless it.
9. **Do not ask Tyler the strategic questions** (co-authoring, who-should-see-it-next, level of involvement) **before the technical-hardening conversation has happened.** Those questions ride on the back of his technical read, not the other way around. If the hardening conversation lands, the strategic ones become natural; if it doesn't, asking them earlier makes the meeting feel transactional.

---

## Close with

> *"I'm trying to determine whether this is merely a strong critique, or whether the B2B event hub plus canonical operational semantics is the wedge that turns it into infrastructure. That's where I'd value your hardest read."*

---

*Filed 2026-05-30. References: `tools/ratatosk/docs/advisory-output-strategy.md`, `essays/the-wrong-gate.md`, `essays/the-mimir-labs-omnibus.md`, `essays/operational-canon.md`, `essays/how-to-preserve-one-version-of-truth.md`.*
