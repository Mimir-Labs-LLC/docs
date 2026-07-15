# Yggdrasil ERP and the Requirements of a Governing Architecture for AI

**Purpose.** A concern-by-concern mapping of a recent essay's requirements for a
governing architecture for AI to the corresponding capabilities in Yggdrasil ERP.
Written to be shareable: it describes capabilities and architectural principles,
not implementation internals. Status is one of **Addressed**, **Partial**, or
**Frontier** (active work, not yet complete).

**The framing that matters.** The essay's requirements are not a wish-list for a
new monitoring tool. They describe a governing *architecture* — a system that
enforces authority and meaning at the point of action. That is exactly what an
external, log-watching governance layer cannot provide and a system of record can.
Yggdrasil ERP already supplies the substrate such an architecture needs: identity,
role-based access that resolves who holds a role now, organizational structure in
which a vacant seat is a known state, approval routing, notification and deadline
infrastructure, and an append-only audit trail. The operational policy-enforcement
layer is the policy surface on top of that substrate. Several of the essay's
requirements are therefore served by the application as a whole, not by a single
module.

## Problems the essay names

| # | Concern | Yggdrasil ERP capability | Status |
|---|---------|--------------------------|--------|
| 1 | Detection without disposition fails silently | Drift is recorded as a residual with a disposition lifecycle (open → under investigation → reverted / ratified / dismissed), not a terminal alert; each watched assumption pre-declares its response | Addressed (triage); Partial (forced disposition → #3) |
| 2 | Ownership erosion over time | Policies bind accountability to roles; the platform resolves who currently holds a role, and organizational/HR structure makes a vacant seat a first-class, known state | Partial — the platform resolves holders and tracks vacancy; the policy layer does not yet re-resolve at routing time or treat a vacancy as a governance fault (→ Frontier) |
| 3 | Absence of decision deadlines | Review deadlines and cadences are declared per policy and per watched assumption; the platform's notification, task, and approval-routing infrastructure provides the escalation substrate | Partial — deadlines and substrate exist; automated escalation on an aging residual is the remaining work (→ Frontier) |
| 4 | No cryptographic accountability | Policy activation requires named signers with signed, timestamped attestation; every runtime evaluation is recorded with the acting party, the outcome, and a correlation identifier that ties the event to the originating intent; data changes are captured in an append-only audit trail | Addressed (the specific signing primitive is confirmed before any claim about a particular scheme) |
| 5 | Misaligned vendor incentives | Structural rather than a control point to withhold: governance is enforced by the system of record itself, which owns both the action gate and the data-mutation gate | Addressed (architecture / positioning) |
| 6 | Intent-to-action gap (decomposition routes around procedural governance) | Enforcement fires at the actual state transition, not on a declared plan. An agent that decomposes a goal into substeps still executes each substep as a transition, and each transition is evaluated against policy | Addressed |
| 7 | Time-of-check-to-time-of-use | Conditions are evaluated at the moment of execution, not pre-flighted and cached; a separate observer detects when a policy's declared premise stops matching the live record between checks; governed classifications carry a decision-time snapshot so "loosen, then act" is detectable | Addressed (assumption observer recently shipped) |

## Architecture the essay says is required

| # | Required component | Yggdrasil ERP capability | Status |
|---|--------------------|--------------------------|--------|
| 1 | Machine-evaluable representation (contracts, I/O schemas, preconditions, risk class) | Rules use a machine-evaluable grammar (typed conditions, boolean composition, relationship traversal, quantifiers); each rule declares the entity and transition it governs (its I/O surface) and its preconditions; a portable, schema-anchored contract format extends this to external systems | Addressed; Partial (a formal risk-classification taxonomy is light) |
| 2 | Conjunctive, ordered gate structure | Policies carry ordered, short-circuiting evaluation phases (pre-gate → gate → post-gate → observer) | Partial — ordering primitive present; not a literal 1:1 of the three named gates |
| 3 | Disposition clock with escalation | Deadlines and cadences declared; escalation substrate (notifications, tasks, approval routing) present | Partial — substrate exists; automatic escalation is the remaining work (→ Frontier) |
| 4 | Live role resolution, vacancy = fault | Role-based access resolves current holders; org/HR structure tracks vacancy | Partial — the platform provides this; the policy layer's consumption of it, with vacancy treated as a fault, is the remaining work (→ Frontier) |
| 5 | Pre-declared fail-safe posture (per-rule) | Each policy pre-declares its enforcement posture (enforced vs. advisory) and fail-mode (closed vs. open), with a required justification for any fail-open; default is enforced and closed, so nothing fails open by accident; watched assumptions pre-declare a drift response | Addressed (pre-declared posture); Partial (aging-residual → auto-suspend depends on the disposition-clock frontier) |
| 6 | First-class cryptographic attestation bound to an intent id | Named-signer attestation plus a correlation identifier on every evaluation (see Problem 4) | Addressed |
| 7 | Observer neutrality | A monitoring layer reflects the enterprise's own declared assumptions against its own live record and records a contradiction for human review. By design it never blocks an action and never declares a policy invalid on its own judgment | Addressed (recently shipped) |
| 8 | Explicit accountability — a named human signs the decision to continue | A change to the operating envelope, or acceptance of a drifted assumption, requires a named human's signature or disposition | Addressed |

## Where the architecture is strong, and where the work continues

- **Strong / substantively in place:** enforcing on the action rather than the stated intent (P6); evaluating at execution rather than pre-flight, which closes the check-to-use gap (P7); observer neutrality (C7), where the system surfaces contradiction and stops short of deciding the business is wrong; and a pre-declared, per-rule fail-safe posture (C5). The essay's meta-point — that real governance is an architecture, not a bolt-on — is the structural reason these are feasible here: the system of record already supplies identity, role resolution, organizational vacancy, approval routing, notification, and audit.
- **Frontier (the remaining work is connection, not invention):** (a) a **disposition clock** that acts on declared deadlines through the existing notification and escalation infrastructure, so a flag cannot age into permanence; and (b) **live ownership** — resolving a policy's role to a present holder at routing time and treating a vacant seat as a fault rather than a silent pass. The substrate for both exists; the work is wiring the policy layer to it.

*No architecture is finished. Naming the two open items above is deliberate: the
alignment on the hard problems is the substance, and the honesty about the
frontier is part of it.*
