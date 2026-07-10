# ROPE-Readiness Assessment

*A scored assessment of whether a system — greenfield or existing — can receive ROPE governance (natively, or via a Jormungandr contract), and at what level: policy that can be evaluated, or policy that can be enforced before an invalid change becomes authoritative. Designed to be run jointly by Mimir Labs and a partner or prospective customer against a target system.*

*Draft — July 2026.*

> **Confidentiality & IP.** © 2026 Mimir Labs, LLC. Shared with partners and prospective customers under a confidentiality agreement; not for onward distribution or public posting. This document describes the *requirements* a target system must meet to receive ROPE governance — it is not the implementation. The State Constraint Engine, the policy compiler and evaluator, semantic-edge extraction, and the Jormungandr contract layer are proprietary Mimir Labs technology, protected separately.

---

## 1. The one distinction that governs everything

There are two levels of readiness, and conflating them is the most common mistake:

- **Evaluable** — ROPE can bind a predicate to the data model and compute a verdict. This is a **schema** property.
- **Enforceable** — ROPE can block an invalid transition *before it becomes authoritative*. This is an **application** property: it requires an interposable write gate, with no bypasses, that the enforcement layer can control.

A system can be perfectly evaluable and completely unenforceable. A pristine schema behind a dozen uncontrolled write paths yields *detection*, not *prevention*. So the assessment scores schema and application separately, and the **verdict is the weaker of the two**.

Score each criterion **Pass (2) / Partial (1) / Fail (0)**. Criteria marked **⛔ hard gate** cap the verdict when failed, regardless of the total.

---

## 2. Part A — Schema criteria (determines: *evaluable*)

| # | Criterion | Must be true | Hard gate | Common failure | Remediation |
|---|---|---|---|---|---|
| A1 | **Explicit columnar state** | Each governed entity carries its lifecycle state as a discrete, enumerable column. | ⛔ | State implied by a timestamp, by rows existing elsewhere, or by app logic. | Add an explicit status column, or derive one in a canonical view. |
| A2 | **Stable primary key** | Every governed table has a stable, addressable PK (natural or surrogate). | ⛔ | No PK; mutable/ambiguous keys. | Add a surrogate key; stabilize the natural key. |
| A3 | **Addressable, typed governed attributes** | Every field a policy tests is a real, typed column the engine can `SELECT`. | ⛔ (per referenced field) | Governed values in JSON blobs, EAV/key-value tables, serialized fields, or free-text. | Promote the values into typed columns; or lift them into a canonical view. |
| A4 | **Explicit, enforced foreign keys** | Relationships a policy traverses are real FK constraints with referential integrity, and the FK graph is introspectable. | ⛔ (for multi-hop predicates only) | Join-by-convention; application-only integrity; dangling refs. | Add/enforce FKs; or model the joins in the contract mapping. |
| A5 | **Controlled vocabularies for coded values** | Coded columns (status, category, type) reference an enum / lookup / group-code scheme, stable over time. | — (degrades reliability) | Free-text codes with many spellings; drifting code sets. | Normalize to a lookup/enum; map variants in the contract. |
| A6 | **Clear scope boundary** | Where multi-tenant, governed rows carry a tenant/owner column so policy binds to one scope. | ⛔ (if multi-tenant) | Shared rows with no ownership column; scope inferred from app session only. | Add a scope column; enforce it with row-level security. |
| A7 | **Stable, canonical semantics** | The same field means the same thing everywhere a policy references it. | — (undermines trust) | Overloaded columns ("misc1", "flag7") carrying governed meaning; per-tenant redefinition; schema drift. | Retire overloaded columns into named ones; freeze semantics; monitor drift (Ratatosk / Jormungandr). |
| A8 | **Additive governance tables can coexist** | ROPE's own tables (decisions, artifacts, compiled constraints, semantic edges, evaluation log) can live alongside without collision. | — | Name collisions; no schema-change rights on the target. | Namespace the governance tables; or host them in a side database keyed to the target. |

> Note: ROPE brings its own governance tables (A8). Grafting does **not** require rewriting the target's tables to *store* policy — only that the target's data can be *addressed* (A1–A7).

---

## 3. Part B — Application criteria (determines: *enforceable*)

**The enforcement machinery is part of the graft, not a precondition.** The interceptor/gate, the predicate evaluator, the policy engine and rules-as-data store (decisions, artifacts, compiled constraints), the governance evaluation and audit log, the semantic-edge graph, and — for a foreign target — the contract and mapping layer all ship *with* ROPE / Jormungandr. Do **not** score the target on whether it already has them. This section lists only what the target application must independently *be* or *permit* for that machinery to attach and act.

### 3.1 What MUST be true of the target application

| # | Criterion | Must be true | Hard gate | Failure mode if absent |
|---|---|---|---|---|
| B1 | **Consolidatable write topology** | Every mutation of governed state can be routed through a single interposition point; there is no *irreducible* second write path. The gate is supplied — the requirement is only that a chokepoint is *achievable*. | ⛔ | The graft can observe but never guarantee it saw the change. Enforcement is impossible. |
| B2 | **Pre-commit interceptability** | The write path permits synchronous interception before the change becomes authoritative, inside a transaction (or two-phase step) that can be aborted. | ⛔ | Only post-hoc reversal is available — races, partial commits, not prevention. |
| B3 | **Actor + authority present at the mutation point** | The application carries the authenticated identity and role/authority of whoever performs the change, and can hand it to the interception point. | ⛔ | Role/approval predicates can't resolve; the decision can't be attributed. |
| B4 | **Governed changes are named transitions** | The application performs governed-state changes as identifiable from→to transitions on an identified entity, not opaque bulk writes that hide intent. | ⛔ | Nothing to evaluate against — the seam can't tell what the record is becoming. |
| B5 | **Consistent in-transaction read** | At the interception point, the record under change and the relationships a predicate needs are readable as a consistent snapshot. | — | Predicates read stale or uncommitted data; unsound verdicts. |
| B6 | **The application cedes final authority to the seam** | It honors the returned verdict — block, route-for-approval, or apply a derived value — and does not proceed anyway, retry around it, or re-mutate the governed field out of band. Any rule the app enforces itself must be allowed to be superseded by the gate. | ⛔ | Consults the seam but overrides it → advisory by construction. |

### 3.2 What MUST NOT be true of the target application

| # | Anti-criterion | Must NOT be true | Why it's disqualifying |
|---|---|---|---|
| C1 | **Irreducible bypass paths** | Direct DB writes, ETL/batch jobs, DB triggers, admin backdoors, or integrations that mutate governed state and *cannot* be routed through the interception point or disabled. | Any surviving bypass is a permanent hole in enforcement. **The most common disqualifier on existing systems.** |
| C2 | **State inferred as a side-effect** | Lifecycle state derived from a timestamp or the existence of other rows instead of set through a transition. | No transition event exists to intercept. |
| C3 | **No pre-commit seam** | The only available hook runs after the write has already landed. | Not atomic; detection, not prevention. |
| C4 | **UI/client as the sole enforcer** | The only authoritative validation is client-side or in a bypassable tier. | Trivially circumvented; the seam must be server-authoritative. |
| C5 | **Un-reroutable out-of-band mutation** | Background jobs or integrations that write governed columns directly and cannot be brought behind the seam. | Same as C1 — an unguarded writer. |
| C6 | **Stale governed reads at the seam** | The authoritative read available at interception can lag (eventual consistency on the governed data). | The verdict is computed against the wrong state. |

---

## 4. Part C — Scoring to a verdict

Apply in order; the first matching rule is the verdict.

1. **Not viable (redesign required)** — any **schema** hard gate (A1–A4, A6) is Fail and cannot be remediated (e.g., no state model at all, governed data irrecoverably unaddressable with no mapping possible).
2. **Advisory-only (evaluable, not enforceable)** — schema hard gates pass or are remediable, **but** B1 (no consolidatable chokepoint) fails, or any **C-series bypass** is present and cannot be closed. ROPE runs in shadow/advisory mode: it reports "would have blocked," never prevents. (This maps to `enforcement_mode='advisory'`.)
3. **Graftable — contract-mediated (enforceable via Jormungandr)** — schema passes or is remediable; a chokepoint can be *interposed* (a Jormungandr contract fronting a consolidatable write path) with bypasses closable; B2–B6 satisfiable through the contract layer. Enforcement is real but rides on the contract, not native ownership.
4. **Native ROPE-ready** — schema passes; the app *natively* routes all governed mutations through one server-authoritative seam (B1–B6) with no C-series bypasses. Full enforcement with no contract layer needed. (A greenfield system built to this rubric lands here.)

Record two sub-scores (Schema /16, Application /12) and the verdict tier. The verdict is bounded by the weaker dimension.

---

## 5. Part D — Remediation ladder (common gaps → the move)

| Gap | Move | Cost |
|---|---|---|
| Governed values in blobs / EAV / free-text (A3) | Promote the values into typed columns, or project a canonical view/contract that lifts them out. | Low–Medium |
| Implicit relationships (A4) | Formalize FKs; or declare the joins in the Jormungandr contract mapping. | Low–Medium |
| No explicit state column (A1) | Add a status column, or derive one deterministically in a canonical view. | Low |
| Drifting / free-text codes (A5, A7) | Normalize to a lookup/enum; map variants in the contract; monitor with Ratatosk. | Medium |
| Many write paths / side-channels (B1, C1) | Consolidate mutations behind one server-authoritative gateway; retire or route the batch/trigger/integration writers through it. | **High — usually the hard part** |
| No pre-commit seam (B2, C3) | Add a synchronous pre-commit interception point to the write path (the interceptor logic is supplied by the graft). | Medium–High |
| App enforces a competing rule it won't cede (B6) | Let the gate be authoritative; the app's hardcoded rule is superseded or removed so it doesn't re-mutate around the verdict. | Medium |

The pattern: schema gaps are **remediable with data work** (promotion, views, normalization, contract mapping). The application gap that actually decides enforceability — **consolidating the write path and closing side-channels** — is the expensive, high-risk one, and it's where most "we have governance" claims quietly fail.

---

## 6. Part E — Reading the tiers in practice

- **A system in development** that follows this rubric — explicit columnar state, stable PKs, typed governed columns, enforced FKs, controlled vocabularies, a scope column, stable semantics, and *one* server-authoritative write path — lands at **Native ROPE-ready** with essentially no remediation. This is the cheapest place to be, and the argument for designing to the rubric early.
- **A well-modeled legacy ERP** with a clean schema but many integration/batch write paths typically scores high on schema, fails B1/C1, and lands at **Advisory-only** until the write path is consolidated — after which a Jormungandr contract moves it to **Graftable**.
- **A large clinical or enterprise platform that cannot be modified** (e.g., an EHR) is usually schema-remediable through a contract/view but only **Graftable** where it exposes a mediated write API to front, and **Advisory-only** where it doesn't — which is exactly the boundary of what governing a system that cannot be replaced can honestly promise.

The assessment's real purpose is to make that boundary provable before an enforcement commitment is made, rather than after.
