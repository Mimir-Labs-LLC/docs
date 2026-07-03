# Jormungandr Decision Service — Case-B Embed Interface

*How a host system (e.g., an AI orchestration gateway) embeds Jormungandr as a binding, deterministic decision point over data it does not own or hold. Companion to [11-rope.md] (the co-located enforcement engine) and [12-policy-bundle-format.md] (the portable policy format). This document specifies the request/response contract, the **fact-declaration** mechanism, the two fact-sourcing modes (pull via connectors, push via host context), and the integration requirements that make the decision **enforcement**, not advice.*

*Status: interface design (v0.1). Implementation in progress under `tools/jormungandr/`.*

---

## 1. The model

ROPE, inside Yggdrasil, fuses three roles: it **enforces** at the gate, **evaluates** the policy, and **reads** the data — all co-located, because it owns the data. To govern a system where we do **not** own (or may not hold) the data, those roles separate. Jormungandr becomes a stateless **decision point** that a host's **enforcement point** calls, and it obtains the **facts** it needs on demand — holding none of them.

Three properties define the model:

1. **Fact-declarative.** A policy declares exactly the facts it needs to evaluate, derived from its predicate's field and relationship references. The decision service never assumes it can query a data store.
2. **Two fact sources, one interface.** Facts arrive either **pulled** by Jormungandr through mapped read connectors (Case B — the default), or **pushed** by the host in the request context (Case A — fallback for air-gapped or connector-less facts). The same request/response contract supports both.
3. **Binding, not advisory.** The host's enforcement point must treat the decision as **dispositive** — the action cannot proceed on a `deny`. If it can, this is observation, not governance (see §7).

Jormungandr persists its own governance records (policies, signed decision receipts). It does **not** persist fetched facts. That is what makes it deployable where holding the record is forbidden.

## 2. The decision request  (host → Jormungandr)

Sent by the host's gate, before a proposed action commits.

```json
{
  "request_id": "axis-7f3c...",                 // host correlation / intent identifier
  "actor":  { "kind": "agent|human|integration|system", "id": "svc-flow-42", "roles": ["clinician"] },
  "action": {
    "entity_type": "medication_order",          // canonical entity-type key (Jormungandr canon)
    "operation":   "release",                   // the transition/operation being gated
    "subject_id":  "MO-88213"                   // the record the action targets
  },
  "context": {                                  // OPTIONAL: facts the host already holds (push mode)
    "medication_order": { "amount": 85000, "site": "VAMC-042" }
  },
  "options": { "explain": true, "dry_run": false }
}
```

## 3. The decision response  (Jormungandr → host)

```json
{
  "request_id": "axis-7f3c...",
  "decision":  "allow | deny | require | facts_required",
  "requirements": [                             // for "require": what must be satisfied to proceed
    { "kind": "approval", "required_role": "attending_physician" }
  ],
  "explanation": "Order amount 85000 exceeds site limit 50000; policy ROPE-2026-0142 requires attending sign-off; actor role 'clinician' insufficient.",
  "governing": [ { "decision_code": "ROPE-2026-0142", "authority": "VHA Directive 1108.xx" } ],
  "receipt": {                                  // signed, immutable decision record (the audit unit)
    "receipt_id": "...", "evaluated_at": "2026-07-03T...Z",
    "actor": { "...": "..." }, "action": { "...": "..." },
    "outcome": "deny", "policy_digest": "sha256:...", "signature": "..."
  },
  "facts_required": [ ... ]                      // only when decision == "facts_required" (push mode, §5)
}
```

`deny` and `require` are both non-proceed outcomes; `allow` is the only proceed outcome. `facts_required` means the service could not obtain a needed fact and asks the host to supply it and re-call.

## 4. Fact declaration

A policy publishes the facts it needs, computed at compile time by walking its predicate for field and join-path references. Each required fact has a **key** (how the predicate names it), a **source descriptor** (where the value comes from), and a **type**.

```json
{
  "entity_type": "medication_order",
  "operation":   "release",
  "required_facts": [
    { "key": "amount",          "source": "subject.field:amount",                          "type": "number" },
    { "key": "site_limit",      "source": "related:site(via site_id).field:order_limit",    "type": "number" },
    { "key": "actor_role",      "source": "actor.role",                                     "type": "string" }
  ]
}
```

**Source-descriptor grammar (v1):**
- `subject.field:<col>` — a field of the record the action targets.
- `actor.role` / `actor.attr:<name>` — an attribute of the acting principal.
- `related:<entity>(via <fk>).field:<col>` — a field of a related record reached by a foreign key (the external analog of ROPE's join-path).
- `context.<path>` — a value the host already supplied inline.

The declaration is what lets the rich predicate grammar survive when Jormungandr can't traverse a database itself: it names precisely what it must be handed or must fetch.

## 5. Fact sourcing — pull (Case B) and push (Case A)

For each declared fact not already present in the request `context`:

- **Pull (default, Case B):** Jormungandr resolves the source descriptor against a **connector** (an API-dictionary entry, §6), fetches the value from the client's read endpoint, holds it **in memory for the evaluation only**, and discards it after. This preserves the observer half (§8) because the connectors are available for background premise sweeps too.
- **Push (fallback, Case A):** if no connector can satisfy a fact, Jormungandr returns `decision: "facts_required"` with the `facts_required` list; the host fetches the values, populates `context`, and re-calls. Data still never persists in Jormungandr.

A deployment may mix modes per fact.

## 6. Connector binding (API-dictionary entry)

Maps a fact source to a client read endpoint. This is the per-deployment integration artifact — the licensed engine consumes it; the connectors are built per client system.

```json
{
  "entity_type": "site",
  "read": {
    "protocol":  "rest",
    "endpoint":  "GET /facilities/{id}",
    "auth_ref":  "axis.facility_api",
    "id_from":   "subject.field:site_id",       // how to get the {id}
    "field_map": { "order_limit": "$.orderLimitUsd" }
  }
}
```

### 6a. Implemented surface (v0.8.1a)

The engine's read side is built (`tools/jormungandr/server/src/services/ConnectorFetch.cpp`). The shipped binding is **capability-keyed** rather than the per-entity `read` block sketched above; the two reconcile as follows.

- A connector is an entry in the source system's `connection_metadata.api_endpoints`, installed by binding an **API Dictionary** (`POST /api/source-systems/{id}/bind-dictionary`). Read endpoints use the capability key `"<concept>.read"` (e.g. `purchase_order.read`, `supplier.read`), each `{ http_method: "GET", request_path, response_expectation.record_path }`. The `generic-rest` dictionary ships read keys for the core concepts.
- **Fetch:** `ConnectorFetch::fetchEntity` templates `{id}` (and any `{param}`) into `request_path`, prepends `connection_metadata.base_url`, applies auth (`bearer` / `header` / `basic`), GETs, and narrows the body by `record_path` (`$` or a dotted path).
- **Eval-time hydration (Case B):** the decision request carries a `fetch` directive array — `[{concept, entity_id, as?, fields?}]`. `evaluate()` pulls each record and merges it into the payload **nested under its `as` key**, so a path predicate (`field: "supplier.zip"`) resolves. `fetchFacts` collects per-directive failures under `_fetch_errors` — a policy that can't be hydrated fails safe (its cross-entity predicate sees a missing field) rather than passing silently.
- **Construction-time access:** `POST /api/rope/connector/fetch` (one record) and `POST /api/rope/connector/fetch-facts` (merged fact-map) let an author preview real client data while building a predicate.

Honest deltas from the §5–6 design, still open: (1) the whole record is merged and referenced by path — declarative `field_map` / `id_from` resolution (auto-deriving `{id}` from a source descriptor) is not yet wired; (2) auth honors a literal token in the binding — vault resolution (`auth_hint.vault_key_pattern`) is the production path, not yet built; (3) the fetch is caller-declared per request — automatic fact-declaration extraction (deriving the `fetch` list from a policy's predicate field references) is the next step; (4) `netsuite` / `business-central` dictionaries carry push/guard keys only — their read keys are per-deployment work.

## 7. The binding-gate contract  (the make-or-break)

The embed is only **governance** if the host is architected so that a proposed action **cannot proceed on a `deny` or unsatisfied `require`**. This is a hard integration requirement, not a recommendation:

- The host calls the decision service **synchronously, before commit**, on the action path.
- On any non-`allow` outcome, the host **does not perform the action**.
- The signed `receipt` is retained by the host as the audit record — including for any attempt that was denied.

If the host can proceed past a `deny`, the deployment is **advisory**, and must not be described as governed. Jormungandr's receipt still records that a decision was rendered, so even a violated deny is evidenced.

## 8. The observer half (premise monitoring)

Enforcement (§2–7) is per-request and stateless. **Premise monitoring is not** — it re-checks whether a policy's declared premises still hold against live state, over time. In Case B this is possible precisely because connectors exist: a background sweep uses the same read connectors to evaluate premise watches and records drift residuals. In an air-gapped, push-only deployment with no connectors, enforcement survives but the observer does not — say so honestly rather than promise it.

## 9. Data handling (PHI / federal)

- Jormungandr **persists no fetched facts.** They exist only for the duration of an evaluation.
- Receipts store what explainability requires, **minimized** — prefer derived facts ("amount exceeded site limit") over raw values where the raw value is sensitive; the minimization policy is configurable per deployment.
- The embedded service runs **inside the host's accreditation boundary** and reads facts transiently. The honest ATO claim is "reads in-boundary, transiently, retains nothing" — not "never sees the data."

## 10. Embed & license boundary

- **Embed form:** a co-deployed decision service the host calls (synchronous decision API). Not the standalone desktop app.
- **License boundary:** the **engine** (evaluator, fact-declaration, receipt signing, decision API) is the licensed asset. The **connectors / API dictionaries** for a given client's systems are per-deployment integration — scoped services on top of the licensed engine.

## 11. Relation to ROPE

Same authored, signed, authority-cited **policy** and the same **predicate grammar**. The only architectural difference is the **fact source**: ROPE reads an owned database; the Jormungandr decision service evaluates against a declared fact-map sourced by connector or context. The evaluator is shared logic operating on a fact-map instead of SQL. Everything downstream — determinism, explanation, the signed receipt — is identical.

## 12. Sequence (Case B, deny)

```
Host gate                Jormungandr Decision Service            Client read API
   |  proposed action (pre-commit)   |                               |
   |-- POST /decide (request, §2) -->|                               |
   |                                 |-- resolve active policies     |
   |                                 |-- compute required_facts (§4) |
   |                                 |-- pull missing facts -------->|  GET /facilities/{id}
   |                                 |<---------------- order_limit --|
   |                                 |-- evaluate predicate (det.)   |
   |                                 |-- sign receipt; discard facts |
   |<-- decision: deny + receipt ----|                               |
   |-- DO NOT perform the action     |                               |
   |-- retain receipt (audit)        |                               |
```

---

*Next: the runtime fact-map evaluator and the fact-declaration extractor (the engine core), then the decision endpoint, then the connector layer. See `tools/jormungandr/`.*
