# ROPE-Readiness Assessment

*A scored rubric for deciding whether ROPE (or its portable form, a Jormungandr contract) can be grafted onto a target system — greenfield or existing — and at what level: evaluable, or actually enforceable. Companion to the multi-vertical editions plan.*

*Draft — July 2026.*

---

## 1. The one distinction that governs everything

There are two levels of readiness, and conflating them is the most common mistake:

- **Evaluable** — ROPE can bind a predicate to the data model and compute a verdict. This is a **schema** property.
- **Enforceable** — ROPE can block an invalid transition *before it becomes authoritative*. This is an **application** property (you must own an interposable gate with no bypasses).

A system can be perfectly evaluable and completely unenforceable. A pristine schema behind a dozen uncontrolled write paths yields *detection*, not *prevention*. So the assessment scores schema and application separately, and the **verdict is the weaker of the two**.

Score each criterion **Pass (2) / Partial (1) / Fail (0)**. Criteria marked **⛔ hard gate** cap the verdict when failed, regardless of the total.

---

## 2. Part A — Schema criteria (determines: *evaluable*)

| # | Criterion | Must be true | Hard gate | Common failure | Remediation |
|---|---|---|---|---|---|
| A1 | **Explicit columnar state** | Each governed entity carries its lifecycle state as a discrete, enumerable column. | ⛔ | State implied by a timestamp, by rows existing elsewhere, or by app logic. | Add an explicit status column, or derive one in a canonical view. |
| A2 | **Stable primary key** | Every governed table has a stable, addressable PK (natural or surrogate). | ⛔ | No PK; mutable/ambiguous keys. | Add a surrogate key; stabilize the natural key. |
| A3 | **Addressable, typed governed attributes** | Every field a policy tests is a real, typed column the engine can `SELECT`. | ⛔ (per referenced field) | Governed values in JSON blobs, EAV/key-value tables, serialized fields, or free-text. | Promote to columns (the UDF-promotion pattern generalizes); or lift into a canonical view. |
| A4 | **Explicit, enforced foreign keys** | Relationships a policy traverses are real FK constraints with referential integrity, and the FK graph is introspectable. | ⛔ (for multi-hop predicates only) | Join-by-convention; application-only integrity; dangling refs. | Add/enforce FKs; or model the joins in the contract mapping. |
| A5 | **Controlled vocabularies for coded values** | Coded columns (status, category, type) reference an enum / lookup / group-code scheme, stable over time. | — (degrades reliability) | Free-text codes with many spellings; drifting code sets. | Normalize to a lookup/enum; map variants in the contract. |
| A6 | **Clear scope boundary** | Where multi-tenant, governed rows carry a tenant/owner column so policy binds to one scope. | ⛔ (if multi-tenant) | Shared rows with no ownership column; scope inferred from app session only. | Add a scope column; enforce it with row-level security. |
| A7 | **Stable, canonical semantics** | The same field means the same thing everywhere a policy references it. | — (undermines trust) | Overloaded columns ("misc1", "flag7") carrying governed meaning; per-tenant redefinition; schema drift. | Retire overloaded columns into named ones; freeze semantics; monitor drift (Ratatosk / Jormungandr). |
| A8 | **Additive governance tables can coexist** | ROPE's own tables (decisions, artifacts, compiled constraints, semantic edges, evaluation log) can live alongside without collision. | — | Name collisions; no schema-change rights on the target. | Namespace the governance tables; or host them in a side database keyed to the target. |

> Note: ROPE brings its own governance tables (A8). Grafting does **not** require rewriting the target's tables to *store* policy — only that the target's data can be *addressed* (A1–A7).

---

## 3. Part B — Application criteria (determines: *enforceable*)

### 3.1 What MUST be true

| # | Criterion | Must be true | Hard gate | Failure mode if absent |
|---|---|---|---|---|
| B1 | **A single mediated write path (the gate)** | Every state transition on a governed entity passes through one interposable point (service / repository / API / gateway) where policy is evaluated with authority to reject. | ⛔ | No enforcement possible — evaluation only. |
| B2 | **Synchronous, pre-commit evaluation** | The gate evaluates *before* the transition is authoritative, inside the transaction (or a two-phase that can abort), so a rejected transition never commits. | ⛔ | Post-hoc "check then undo" — race conditions, partial commits. |
| B3 | **Actor + authority resolvable at the gate** | The app knows who is acting and their roles/authority at the moment of transition, and passes that context to the evaluator. | ⛔ | Role/approval artifacts can't resolve; no attribution. |
| B4 | **Changes are expressed as named transitions** | The app models a change as from-state → to-state on an identified entity it can intercept, not as an opaque bulk update. | ⛔ | The gate can't tell "what this record is trying to become." |
| B5 | **Evaluation context is readable in-transaction** | The record under transition and the relationships a predicate needs are readable at the gate within its transaction (a consistent snapshot). | — | Predicates read stale/uncommitted data; unsound verdicts. |
| B6 | **Rules-as-data hook** | The app defers the decision to the policy engine at the gate rather than hardcoding the rule in a branch. | ⛔ | The rule is welded into code; ROPE can't own it. |
| B7 | **The verdict is honored** | The app actually enforces the returned decision — block on reject, route on approval-required, apply derived values. | ⛔ | Calls the engine but ignores "block" → advisory by construction. |
| B8 | **Attributable, immutable audit** | The transition + the decision applied are recorded append-only (the app's log or ROPE's evaluation log). | — | No provable enforcement; fails the "governed" claim. |

### 3.2 What MUST NOT be true

| # | Anti-criterion | Must NOT be true | Why it's disqualifying |
|---|---|---|---|
| C1 | **Bypass paths / side-channels** | Direct DB writes, ETL/batch jobs, DB triggers, admin backdoors, or secondary services that mutate governed state without passing the gate. | Any bypass is a hole in enforcement. **This is the most common disqualifier on existing systems.** |
| C2 | **State as an inferred side-effect** | Lifecycle state derived from the existence of other rows or a timestamp instead of set through a transition. | No transition event to intercept. |
| C3 | **Post-commit-only evaluation** | The only hook is a trigger/watcher that runs after the write lands and tries to reverse it. | Not atomic; not prevention. |
| C4 | **Client/UI as the sole enforcer** | The only validation is client-side or in a bypassable layer. | Trivially circumvented; the gate must be server-authoritative. |
| C5 | **Out-of-band mutation of governed fields** | Background jobs or integrations writing governed columns directly. | Same as C1 — an unguarded write path. |
| C6 | **Eventual-consistency for the governed read** | The authoritative read at eval time may be stale. | The decision is computed against the wrong state. |

---

## 4. Part C — Scoring to a verdict

Apply in order; the first matching rule is the verdict.

1. **Not viable (redesign required)** — any **schema** hard gate (A1–A4, A6) is Fail and cannot be remediated (e.g., no state model at all, governed data irrecoverably unaddressable with no mapping possible).
2. **Advisory-only (evaluable, not enforceable)** — schema hard gates pass or are remediable, **but** B1 (no interposable gate) fails, or any **C-series bypass** is present and cannot be closed. ROPE runs in shadow/advisory mode: it reports "would have blocked," never prevents. (This maps to `enforcement_mode='advisory'`.)
3. **Graftable — contract-mediated (enforceable via Jormungandr)** — schema passes or is remediable; a gate can be *interposed* (a Jormungandr contract fronting a consolidatable write path) with bypasses closable; B2–B7 satisfiable through the contract layer. Enforcement is real but rides on the contract, not native ownership.
4. **Native ROPE-ready** — schema passes; the app *natively* owns the mediated gate (B1–B7) with no C-series bypasses. Full enforcement with no contract layer needed. (A greenfield system built to this rubric lands here.)

Record two sub-scores (Schema /16, Application /16) and the verdict tier. The verdict is bounded by the weaker dimension.

---

## 5. Part D — Remediation ladder (common gaps → the move)

| Gap | Move | Cost |
|---|---|---|
| Governed values in blobs / EAV / free-text (A3) | Promote to typed columns (UDF-promotion pattern), or project a canonical view/contract that lifts them out. | Low–Medium |
| Implicit relationships (A4) | Formalize FKs; or declare the joins in the Jormungandr contract mapping. | Low–Medium |
| No explicit state column (A1) | Add a status column, or derive one deterministically in a canonical view. | Low |
| Drifting / free-text codes (A5, A7) | Normalize to a lookup/enum; map variants in the contract; monitor with Ratatosk. | Medium |
| Many write paths / side-channels (B1, C1) | Consolidate mutations behind one server-authoritative gateway; retire or route the batch/trigger/integration writers through it. | **High — usually the hard part** |
| Post-commit-only hook (B2, C3) | Move evaluation to a synchronous pre-commit interceptor in the write path. | Medium–High |
| Rule welded into code (B6) | Extract the rule into a ROPE decision; replace the branch with an engine consult. | Medium |

The pattern: schema gaps are **remediable with data work** (promotion, views, normalization, contract mapping). The application gap that actually decides enforceability — **consolidating the write path and closing side-channels** — is the expensive, high-risk one, and it's where most "we have governance" claims quietly fail.

---

## 6. Part E — Reading the tiers in practice

- **A system in development** that follows this rubric — explicit columnar state, stable PKs, typed governed columns, enforced FKs, controlled vocabularies, a scope column, stable semantics, and *one* server-authoritative write path — lands at **Native ROPE-ready** with essentially no remediation. This is the cheapest place to be, and the argument for designing to the rubric early.
- **A well-modeled legacy ERP** with a clean schema but many integration/batch write paths typically scores high on schema, fails B1/C1, and lands at **Advisory-only** until the write path is consolidated — after which a Jormungandr contract moves it to **Graftable**.
- **A large clinical or enterprise platform you cannot modify** (e.g., an EHR) is usually schema-remediable through a contract/view but only **Graftable** where it exposes a mediated write API to front, and **Advisory-only** where it doesn't — which is exactly the boundary of what governing a system you can't replace can honestly promise.

The rubric's real purpose is to make that last sentence provable before anyone signs up to enforce, rather than after.
