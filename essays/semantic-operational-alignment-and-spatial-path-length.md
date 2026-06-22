# Semantic-Operational Alignment and Spatial Path-Length: A Formal Model for Reliability and Efficiency in Enterprise Automation

**Mimir Labs LLC — Technical White Paper 13**
**Version 1.1 — June 2026**

*v1.1 (2026-06-22): adds Appendix C, "Estimating δ and σ." No changes to the v1.0 model, assumptions, or results.*

---

## Abstract

Enterprise automation depends on formal representations of business reality: definitions of state, entities, invariants, permissions, valid transitions, and expected outputs. When automation acts on a representation that diverges from what the underlying system actually does, or on a copy of operational truth that has passed through many intermediary systems, reliability falls and operating cost rises. This paper formalizes two distinct sources of that divergence and treats them as a single risk surface.

The first is **semantic-operational separation** (`δ`): the probability that a system's actual operation differs from its formal definition for a given state and action. We show, using the union bound, that for an automation workflow of `n` dependent steps the failure probability is bounded by `nδ` plus an exogenous term, so reliability is bounded below by `1 − nδ − ε` and approaches its ceiling as `δ → 0`.

The second is **spatial path-length** (`h`): the number of hops or transformations between the canonical operational source of truth and the point where automation or decision-making occurs. Modeling the enterprise as a directed graph, end-to-end correctness under independent per-hop degradation is the product `Π(1 − δ_i)`, which decays geometrically in `h`, and total cost is monotone non-decreasing in `h`.

We combine the two into a single reliability bound, derive the corresponding efficiency results, apply the model to common enterprise data topologies, and describe, in neutral technical terms, how a governance-first architecture addresses both gaps. The model is presented as a conditional theorem under explicit assumptions, not a universal law. Its central, falsifiable claim: the most reliable automation acts on the shortest governed path from canonical operational truth.

---

## 1. Introduction

Most enterprise software does not fail because a single component is broken. It fails because the meaning an automated process relies on is not the meaning the operational system actually enforces, and because that meaning has been copied, transformed, aggregated, and reinterpreted many times before the process acts on it. The result is familiar: reports that disagree, integrations that silently drift, spreadsheets that override the system of record, and increasingly, AI agents that act confidently on data whose provenance and validity they cannot see.

These failures are usually treated as operational hygiene problems: better data quality, more reconciliation, tighter change management. That framing is incomplete because it does not separate two independent causes. A representation can be wrong in **meaning** (it says a purchase order is "received" when the operational reality is a partial receipt with an open variance), and it can be wrong because of **distance** (the figure on an executive's dashboard is four transformations and one overnight batch removed from the transaction that produced it). The first is a semantic problem. The second is a topological one. They compound.

This paper makes the distinction precise and gives each a model.

- **Semantic distance** is a mismatch in meaning or behavior between a system's formal definition `D` and its actual operation `O`. We quantify it as a probability `δ` and bound the reliability of an `n`-step workflow that depends on `D`.
- **Spatial distance** is the number of intermediary representations or transformations `h` between the canonical operational source of truth `v0` and the point of use `vh`. We model the enterprise as a directed graph and bound end-to-end correctness as a function of `h` and per-hop degradation.

We are deliberately conservative. Each result is stated as a conditional theorem under named assumptions. The strongest claims are upper bounds on failure and cost, which hold under weak assumptions (the union bound requires no independence), and equalities, which require stronger assumptions (independence of hop errors) that we flag wherever they are used. We do not claim that minimizing `δ` and `h` guarantees business value, or that every hop is waste. We claim something narrower and defensible: under the stated premises, reducing semantic mismatch and reducing ungoverned path-length each reduce a bound on failure probability and expected cost, and the architecture that minimizes both dominates on reliability and efficiency, all else equal.

The intended reader is technical: a founder, an enterprise architect, a data governance leader, or a technically literate investor. The mathematics is elementary on purpose. The contribution is not a new theorem in probability; it is the application of standard reliability reasoning to the specific structure of enterprise automation, and the separation of two gaps that are usually conflated.

---

## 2. Definitions and Key Terms

We fix notation. Throughout, "system" means any artifact that holds or transforms a representation of business state: an operational database, an ERP module, an ETL job, a warehouse table, a semantic layer, a report, a dashboard, a spreadsheet, a message queue, an API, a human process, or an automated agent.

| Symbol | Term | Definition |
|---|---|---|
| `D` | Formal definition | The declared model of state, entities, invariants, permissions, valid transitions, and expected outputs. `D(x,a)` is the result the definition prescribes for action `a` in state `x`. |
| `O` | Actual operation | What the running system does. `O(x,a)` is the observed result of action `a` in state `x`. |
| `x` | State | A configuration of the modeled system (e.g., a purchase order in a given status with given quantities). |
| `a` | Action | An attempted operation or transition (e.g., "mark received"). |
| `δ` | Semantic-operational separation | `δ = P(O(x,a) ≠ D(x,a))`, the probability that operation diverges from definition over the relevant distribution of `(x,a)`. |
| `n` | Workflow length | Number of dependent steps in an automation that each rely on `D`. |
| `R` | Reliability | Probability the workflow completes correctly, `R = 1 − P(\text{failure})`. |
| `ε` | Exogenous failure | Probability of failure from causes outside the semantic model (hardware, network, third-party outage). |
| `C0` | Baseline cost | Expected cost of the workflow when no mismatch occurs. |
| `k_i` | Exception/remediation cost | Cost incurred to detect, reconcile, and remediate a mismatch at step or hop `i`. |
| `E[C]` | Expected execution cost | Expected total cost including exception handling. |
| `η` | Efficiency | Useful output value divided by expected cost, `η = V / E[C]`. |
| `V` | Output value | Business value of a correct unit of output. |
| `G = (V, E)` | Enterprise system graph | Directed graph; nodes `V` are systems, edges `E` are data movements or transformations. |
| `v0` | Canonical operational source | The governed system of record where the fact originates. |
| `vh` | Point of use | The node where automation or decision-making occurs. |
| `h` | Hop count | Number of edges on the path from `v0` to `vh`. |
| `δ_i` | Per-hop degradation probability | Probability hop `i` introduces error, staleness, drift, transformation loss, permission mismatch, duplication, or reinterpretation. |
| `p_i` | Per-hop preservation probability | `p_i = 1 − δ_i`. |
| `σ` | Residual semantic mismatch | Semantic-operational mismatch remaining at the point of use after transport. |

A note on `G`'s two uses of `V`: in `G = (V, E)`, `V` is the vertex set; elsewhere `V` is output value. Context disambiguates, and we write `\mathcal{V}` for the vertex set where confusion is possible.

---

## 3. The Semantic-Operational Alignment Model

### 3.1 Setup

An automation depends on a formal definition `D` when its correctness is conditional on operation matching definition. If a workflow assumes that "status = received implies the goods are physically present and inspection-complete," and the operational system permits "received" to be set under conditions that violate that implication, then every downstream step that trusts the status inherits a defect with probability `δ`.

Let

$$\delta = P\big(O(x,a) \neq D(x,a)\big)$$

over the operative distribution of states and actions. Consider a workflow with `n` dependent steps, where step `i` relies on the definition and is mismatched with probability `δ_i ≤ δ`.

### 3.2 Reliability bound

Let `M_i` be the event "step `i` is mismatched" and `X` the event "exogenous failure." The workflow fails if any `M_i` occurs or `X` occurs. By the union bound (Boole's inequality), which requires **no independence assumption**,

$$P(\text{failure}) \;=\; P\!\left(\bigcup_{i=1}^{n} M_i \cup X\right) \;\le\; \sum_{i=1}^{n} P(M_i) + P(X) \;\le\; n\delta + \varepsilon.$$

Therefore

$$\boxed{\,R \;\ge\; 1 - n\delta - \varepsilon\,}$$

This bound is informative only when `nδ + ε < 1`; otherwise it is vacuous (`R ≥ 0`), which is itself a useful warning that the workflow is operating in a regime where mismatch dominates. Taking the limit of the bound,

$$\lim_{\delta \to 0} R \;\ge\; 1 - \varepsilon, \qquad \text{and if } \varepsilon \text{ is controlled, } \lim_{\substack{\delta \to 0 \\ \varepsilon \to 0}} R = 1.$$

Under the stronger assumption that mismatches are independent, the exact failure probability is smaller, `1 - \prod_i (1 - δ_i)`, which for small `δ` is `≈ nδ`. The union bound is the conservative, assumption-light version; we prefer it because it cannot be defeated by correlation between steps.

### 3.3 Interpretation

The quantity `nδ` is the **interpretive burden** of an automation. It says: the more steps depend on a definition, and the more the operation diverges from that definition, the more the automation must compensate with interpretation, exception handling, reconciliation, or manual review. Each unit of `δ` is a place where a human currently supplies the missing context for free, and where an automated process must either encode that compensation or fail.

The practical consequence is asymmetric. You can attack reliability by shortening `n` (fewer dependent steps) or by shrinking `δ` (closing the definition-operation gap). Shortening `n` is often impossible without removing function. Shrinking `δ` is an architectural choice: it is achieved by making the formal definition the thing the system actually enforces at the point of action, so that `O(x,a) = D(x,a)` by construction rather than by convention.

---

## 4. The Efficiency Model

Reliability is necessary but not sufficient; automation also has a cost, and mismatch is expensive even when it is caught. Let exception handling at step `i` cost `k_i` when a mismatch occurs there (probability `δ_i ≤ δ`). The expected cost is the baseline plus expected remediation:

$$E[C] \;\le\; C_0 + \sum_{i=1}^{n} k_i \delta_i.$$

If per-step remediation cost is bounded by `k`,

$$E[C] \;\le\; C_0 + n k \delta, \qquad \lim_{\delta \to 0} E[C] = C_0.$$

Define efficiency as useful output per unit expected cost:

$$\eta = \frac{V}{E[C]}.$$

For fixed output value `V`, `η` is monotone decreasing in `E[C]`, so as `δ → 0`,

$$\eta \;\to\; \frac{V}{C_0},$$

the efficiency ceiling. The interpretation is direct: semantic mismatch does not only cause failures, it imposes a standing tax even on the successful path, because organizations build reconciliation, review, and exception machinery in proportion to `δ`. That machinery is `Σ k_i δ_i`. As alignment improves, the machinery becomes unnecessary, and efficiency rises toward the cost floor of doing the work once, correctly.

---

## 5. The Spatial Path-Length Model

### 5.1 The enterprise as a graph

Model the enterprise as a directed graph `G = (\mathcal{V}, E)`. Nodes are systems; edges are data movements or transformations. A fact originates at the canonical operational source `v0` and is consumed for automation or decision at `vh`. Let `h` be the number of hops on the path actually taken from `v0` to `vh`.

For each hop `i`, let `δ_i` be the probability that the hop introduces any of: error, semantic drift, staleness, delay past usefulness, permission or scope mismatch, duplication, transformation loss, or the need for manual reinterpretation. A hop is a **stochastic boundary**: a place where the representation can change meaning, not because the hop is malicious or buggy, but because every transformation is an opportunity for the output's meaning to depart from the input's.

### 5.2 Correctness bound

Under the assumption that per-hop degradations are independent, end-to-end correctness is the product of per-hop preservation probabilities:

$$P(\text{correct}) \;=\; \prod_{i=1}^{h} (1 - \delta_i).$$

We write `≤` rather than `=` when additional, non-modeled failure modes exist at a hop, so in general

$$\boxed{\,P(\text{correct}) \;\le\; \prod_{i=1}^{h} (1 - \delta_i)\,}$$

If each hop has the same degradation probability `δ`,

$$P(\text{correct}) \le (1 - \delta)^h, \qquad P(\text{failure}) = 1 - (1-\delta)^h \;\approx\; h\delta \ \text{ for small } \delta.$$

When independence cannot be assumed, the union bound again gives the assumption-light version, `P(\text{failure}) \le \sum_{i} δ_i ≤ hδ`. Either way the conclusion is the same in form: **failure probability grows with hop count.** The product form decays geometrically; the union bound grows linearly; both are increasing in `h`.

### 5.3 Interpretation

This is the formal content of the intuition that "every copy degrades trust." It is not that any single hop is likely to corrupt the data. It is that correctness is a conjunction across the whole path. A chain that is correct only if all `h` independent boundaries preserve meaning is, structurally, a series system, and series systems are less reliable than their least reliable component. The path from operational truth to the point of action is exactly such a series system. Each additional intermediary lowers the ceiling on how correct the endpoint can be, regardless of how careful any one hop is.

A crucial corollary: a downstream representation can be **locally correct** — internally consistent, validated against its own model, trusted by its users — while being spatially and semantically distant from operational truth. Local correctness at `vh` says nothing about agreement with `v0`. The dashboard can be right about the warehouse table and wrong about the world.

---

## 6. The Spatial Efficiency Model

Each hop also has a cost, independent of whether it degrades correctness. Let `c_i ≥ 0` be the ordinary cost of hop `i`: processing, integration, storage, latency, governance, and maintenance. Total expected cost across the path is

$$E[C] \;=\; C_0 + \sum_{i=1}^{h} c_i + \sum_{i=1}^{h} k_i \delta_i.$$

The first sum is the standing cost of operating the hops; the second is the expected exception cost they introduce. Both are sums of non-negative terms. Therefore, holding the produced value fixed, **adding a hop cannot reduce `E[C]`**: it adds `c_i + k_i δ_i ≥ 0`. Formally, `E[C]` is monotone non-decreasing in the hop set, and `η = V / E[C]` is monotone non-increasing.

This does not imply hops are bad. A hop may be justified by a real business function (aggregation that produces information not present at `v0`), a security or scope boundary (a hop that restricts what a downstream consumer may see), regulatory isolation, or a domain-specific computation. The model's claim is narrower and harder to dispute: **a hop is never free.** Each one must be paid for in cost and in correctness risk, and an architecture that carries hops which serve no function is paying for nothing. The discipline the model recommends is not "minimize hops" but "justify every hop, and govern the ones you keep."

---

## 7. The Combined Model

Semantic distance and spatial distance are different gaps and can occur independently. A downstream automation can fail because (a) the operational reality at the source does not match its formal definition, (b) the fact passes through too many intermediary representations before use, or (c) both.

Let `Π(1 − δ_i)` be the probability the fact survives transport from `v0` to `vh` with meaning intact, and let `σ` be the residual semantic-operational mismatch at the point of use — the chance that, even given faithful transport, the definition the endpoint relies on does not match operation. Assuming transport degradation and point-of-use semantic mismatch are independent,

$$\boxed{\,P(\text{success}) \;\le\; \left(\prod_{i=1}^{h} (1 - \delta_i)\right)\cdot (1 - \sigma)\,}$$

Equivalently, total automation risk is a function of all the levers:

$$\text{Risk} \;=\; f(\sigma,\ h,\ \delta_i,\ k_i,\ \varepsilon),$$

monotone increasing in semantic mismatch `σ`, in hop count `h`, in per-hop degradation `δ_i`, in exception cost `k_i`, and in exogenous failure `ε`. The two architectural levers that an organization actually controls are the first two: drive `σ` toward zero (definition and operation converge at the source) and drive `h` toward its functionally justified minimum (automation acts as close as possible to governed operational truth). The strongest architecture minimizes both simultaneously, because the product structure means improvement in one cannot fully compensate for neglect of the other: a perfectly aligned source consumed at the end of a ten-hop chain is still bounded by `(1−δ)^{10}`, and a one-hop path off a badly defined source is still bounded by `(1−σ)`.

---

## 8. Worked Example: A Purchase Order

Consider a single fact: *purchase order #4471 has been received.* We trace it through both gaps.

**Semantic gap at the source.** The formal definition `D` states: a PO is `received` if and only if `received_quantity ≥ ordered_quantity` and inspection has passed. The operational reality `O` is that a receiving clerk can set status to `received` to clear the dock, recording the quantity variance and the pending inspection in a side spreadsheet that the ERP does not see. For the operative population of receipts, suppose this divergence occurs `5%` of the time, so `σ = 0.05`. Any automation that trusts `status = received` to mean "complete and inspected" is wrong about one receipt in twenty, and the error is invisible at the point of use because the record is locally well-formed.

**Spatial gap to the decision.** A procurement analyst's "open liabilities" dashboard derives from the PO state through a chain:

`v0` ERP transaction → `h1` nightly ETL extract → `h2` warehouse staging table → `h3` curated mart → `h4` BI semantic-layer measure → `h5` dashboard tile, which the analyst exports to a spreadsheet and reconciles by hand before the decision (`vh`).

Take `h = 5` and a modest per-hop degradation `δ = 0.02` (overnight staleness, a join that drops cancelled lines, a unit-of-measure transform, a manual copy). Transport correctness is

$$\prod_{i=1}^{5}(1-\delta_i) = (0.98)^5 \approx 0.904,$$

so roughly one decision in ten is made on a transported value that has already drifted, before semantics are even considered. Combining the two gaps,

$$P(\text{success}) \le (0.98)^5 \cdot (1 - 0.05) \approx 0.904 \times 0.95 \approx 0.859.$$

About one in seven decisions on this fact is exposed to either drift or definitional mismatch. None of the individual systems is "broken." The dashboard is correct about the mart; the mart is correct about the warehouse; each is locally trustworthy.

**The architectural contrast.** Now suppose the receive action is governed at the source: the status transition to `received` is evaluated against `D` inside the transaction and is refused unless `received_quantity ≥ ordered_quantity` and inspection passes, with any exception captured as a first-class, audited record rather than a spreadsheet. Then `σ → 0` at `v0`, and `O = D` by construction. Suppose further that the automation acts on the governed operational state directly, `h = 1`. Then

$$P(\text{success}) \le (1 - 0.02)^1 \cdot (1 - \sigma) \approx 0.98 \cdot 1.0 = 0.98.$$

The failure surface falls from ~14% to ~2%, and the difference is not better software at any one node. It is the removal of the gaps: definition meets operation at the source, and the path from truth to action is short and governed.

---

## 9. Enterprise Architecture Implications

The model explains several persistent enterprise pathologies as instances of one or both gaps.

- **The canonical chain `ERP → ETL → warehouse → semantic layer → dashboard → spreadsheet → executive interpretation`** is a long series system. It maximizes `h`. Even with disciplined hops, the geometric decay of `(1−δ)^h` puts a ceiling on the trustworthiness of the executive's number. The chain is often necessary for aggregation and access control, but its length is rarely justified hop by hop, and the final manual reinterpretation hop is pure `δ` with little function.
- **ERP customization and undocumented business logic** raise `σ` directly. They are modifications to `O` that are not reflected in any consumable `D`. Every customization that changes behavior without changing the shared definition widens the definition-operation gap for every downstream consumer.
- **Shadow systems** are unsanctioned edges added to `G`. They increase both `h` (alternate paths) and `δ` (uncontrolled transformations), and they fragment authority so that no node is unambiguously `v0`.
- **Manually reconciled reports** are visible `Σ k_i δ_i`. The reconciliation labor is the standing tax the efficiency model predicts; its existence is evidence that `δ` and `h` are large.
- **AI agents over stale or derived data** are the model's sharpest case. An agent at `vh` inherits the full `Π(1−δ_i)·(1−σ)` bound and cannot see it. A human at the same endpoint compensates for missing context with judgment; an agent does not. Pointing an agent at the long-chain endpoint makes the agent confidently wrong at the chain's failure rate.
- **Integration platforms that move data without resolving semantic authority** reduce friction on edges while leaving `σ` untouched. They make the graph faster, not more correct; they can even raise risk by increasing the number of low-`c_i`, nonzero-`δ_i` hops.
- **Governance tools that enforce policy after the substrate has drifted** act at the wrong place in the graph. Policy applied at `vh` (or at a late hop) cannot recover correctness that was lost at `v0` or in transport. Governance is most effective when it constrains `O` at the source so that `σ` is small to begin with, not when it audits derived representations after the fact.

The unifying observation: **local correctness is not global correctness.** A representation can be valid within its own model and still be far, in both senses, from operational truth. The model gives a vocabulary for saying exactly how far.

---

## 10. Application to a Governance-First Architecture

This section describes, in neutral technical terms, how a governance-first platform addresses both gaps. It maps mechanisms to terms in the model; it is not a completeness claim, and Section 11 states what the model does and does not establish. Mimir Labs builds such a platform; the relevant components are named where it aids precision.

- **Canonical schema / semantic authority (Mimisbrunnr).** A single shared semantic reference model gives every consumer the same `D`. This attacks `σ` at its root: when there is one authoritative definition rather than one per system, the cross-system mismatch term shrinks, because the definitions cannot disagree if there is only one. It is the precondition for measuring drift at all, since drift is defined relative to a canon.
- **Governed operational core (Yggdrasil ERP).** The operational state engine evaluates each transition against the formal definition *inside the write transaction* and refuses transitions that violate it. This drives `σ → 0` at `v0` by construction rather than convention: `O(x,a) = D(x,a)` because the system will not commit a write that would make them differ. This is the structural difference between recording state and governing it.
- **Immutable audit and state-machine workflows.** An append-only, tamper-evident change log and explicit legal-transition graphs make operation **replayable**: the actual `O` can be reconstructed exactly, which both bounds `ε`'s ambiguity (you can tell a real outage from a definitional error) and provides the evidence base for verifying `σ`.
- **Controlled synchronization paths (Bifrost).** When data must leave `v0`, governed, typed synchronization lanes lower per-hop `δ_i` (validated transforms rather than ad hoc copies) and, more importantly, constrain which edges exist in `G`, preventing the uncontrolled path proliferation that inflates `h`.
- **Governance validation / boundary enforcement (Jormungandr).** Boundary enforcement prevents bypass routes: it makes the governed path the only path, so that consumers cannot quietly add ungoverned edges from or around `v0`. This protects the `h` and `δ_i` the architecture has paid to control from being undermined by shadow integration.
- **Discovery and topology/semantic mapping (Ratatosk).** Discovery is the model's measurement instrument. It maps the existing graph `G`, estimates `h` along real paths, and surfaces where `δ_i` and `σ` are large. You cannot minimize what you have not measured; discovery makes the two gaps visible before any change is made.
- **Controlled migration (Ragnarok).** Migration that targets the canonical definitions moves data onto `v0` with the semantic mapping made explicit, reducing the transition risk of consolidating a long, drifted topology into a short, governed one.

In the model's terms, the architecture is an attempt to make `v0` a place where `σ ≈ 0` (the definition is enforced, not merely declared) and to keep the consumed path `h` short and every edge in it governed. The platform does not claim to make `δ` or `h` zero; it claims to make them measurable, to drive them down where function permits, and to prevent ungoverned increases.

---

## 11. Limitations and Assumptions

The model is a conditional framework, and its honest boundaries are part of its value.

1. **Conditional premise.** Every result assumes automation depends on formal definitions of state, entities, invariants, permissions, transitions, and outputs. For automation that does not depend on such definitions — purely numerical signal processing, say — the semantic term `σ` may be irrelevant.
2. **Necessary hops exist.** The spatial model does not claim fewer hops is always better. Aggregation, access control, regulatory isolation, and domain computation are legitimate functions that require hops. The claim is only that a hop is never free, so each must be justified.
3. **Reducing hop count can remove needed controls.** A naive collapse of the graph can destroy security boundaries, audit separation, or computational layers that produce real information. Minimizing `h` subject to preserving function is the objective, not minimizing `h` outright.
4. **Independence is an idealization.** The product forms assume independent per-hop and source/transport degradation. Real systems have correlated failures (a schema change that breaks three hops at once). Where independence is doubtful, the union bound (`P(\text{failure}) ≤ Σ δ_i`) is the defensible fallback, and we have stated it alongside each product form.
5. **Bounds can be vacuous.** `R ≥ 1 − nδ − ε` is informative only when `nδ + ε < 1`. In high-mismatch regimes the bound degenerates, which is a signal about the regime rather than a flaw in the model.
6. **Exogenous failure remains.** `ε` is irreducible by these means. Perfect alignment and a one-hop path do not survive a datacenter fire. The model bounds the controllable surface, not the uncontrollable one.
7. **Alignment does not guarantee value.** `σ → 0` raises the reliability ceiling and lowers the cost floor; it does not establish that the automated decision is the *right* decision, or that `V` is large. A perfectly aligned, perfectly short path can faithfully automate a bad policy.
8. **Scope of the claim.** This is a reliability-and-efficiency framework, not a universal proof of system superiority. It supports a specific, falsifiable thesis about where automation should act. It does not adjudicate every architectural trade-off, and it should not be cited as one.

---

## 12. Conclusion

Automation reliability is bounded by two distinct gaps. The **semantic-operational** gap is the divergence between what a system formally defines and what it actually does; it bounds reliability below by `1 − nδ − ε` and raises the standing exception cost `Σ k_i δ_i`. The **spatial** gap is the number of intermediary representations between canonical operational truth and the point of action; it bounds end-to-end correctness above by `Π(1 − δ_i)`, which decays in `h`, and makes total cost monotone non-decreasing in hop count. The two compound: success at the point of use is bounded by the product of transport survival and point-of-use alignment.

As definition and operation converge, reliability approaches its ceiling and exception cost approaches its minimum. As the consumed path lengthens, cumulative failure surface and operating cost increase, unless each hop is strongly justified and governed. The levers an organization controls are exactly these two, and the model says to pull both: govern the source so that operation equals definition, and act on the shortest governed path from that source.

> **The most reliable automation acts on the shortest governed path from canonical operational truth.**

---

## Theorems and Propositions (Summary)

> **Assumptions.** (A1) Automation correctness depends on a formal definition `D`. (A2) For product forms, per-hop and source/transport degradations are independent; otherwise replace products with the union bound. (A3) Costs are additive and non-negative. (A4) `δ, δ_i, σ, ε ∈ [0,1]`.
>
> **Proposition 1 (Workflow reliability bound).** For an `n`-step workflow with per-step mismatch `≤ δ` and exogenous failure `ε`, by the union bound `P(\text{failure}) ≤ nδ + ε`, hence `R ≥ 1 − nδ − ε`, informative when `nδ + ε < 1`. As `δ → 0`, `R ≥ 1 − ε`; with `ε → 0`, `R → 1`.
>
> **Proposition 2 (Efficiency ceiling).** With bounded remediation cost `k`, `E[C] ≤ C_0 + nkδ`, so `lim_{δ→0} E[C] = C_0` and `η = V/E[C] → V/C_0` for fixed `V`.
>
> **Proposition 3 (Spatial correctness decay).** End-to-end correctness `P(\text{correct}) ≤ Π_{i=1}^{h}(1 − δ_i)`; with equal `δ`, `(1−δ)^h`, and `P(\text{failure}) ≈ hδ` for small `δ`. Without independence, `P(\text{failure}) ≤ Σ_i δ_i`.
>
> **Proposition 4 (Hop monotonicity).** `E[C] = C_0 + Σ c_i + Σ k_i δ_i` is monotone non-decreasing in the hop set; `η` is monotone non-increasing. A hop is never free.
>
> **Theorem 5 (Combined success bound).** Under (A1)–(A4), `P(\text{success}) ≤ \big(Π_{i=1}^{h}(1−δ_i)\big)(1−σ)`. Total risk is monotone increasing in `σ, h, δ_i, k_i, ε`. The bound is maximized by jointly minimizing `σ` and the functionally justified `h`.

---

## Appendix A: Major Equations

**Semantic-operational separation**
$$\delta = P\big(O(x,a) \neq D(x,a)\big)$$

**Workflow failure and reliability (union bound)**
$$P(\text{failure}) \le n\delta + \varepsilon \qquad R \ge 1 - n\delta - \varepsilon$$

**Reliability limit**
$$\lim_{\delta \to 0} R \ge 1 - \varepsilon \qquad \lim_{\delta \to 0,\, \varepsilon \to 0} R = 1$$

**Expected cost and efficiency**
$$E[C] \le C_0 + \sum_{i=1}^{n} k_i \delta_i \le C_0 + nk\delta \qquad \eta = \frac{V}{E[C]} \to \frac{V}{C_0}\ \text{as}\ \delta \to 0$$

**Spatial correctness**
$$P(\text{correct}) \le \prod_{i=1}^{h} (1 - \delta_i) \le (1-\delta)^h \qquad P(\text{failure}) \approx h\delta\ \text{(small } \delta)$$

**Spatial cost**
$$E[C] = C_0 + \sum_{i=1}^{h} c_i + \sum_{i=1}^{h} k_i \delta_i$$

**Combined success**
$$P(\text{success}) \le \left(\prod_{i=1}^{h} (1 - \delta_i)\right)(1 - \sigma)$$

---

## Appendix B: Suggested References (for later validation)

The mathematics in this paper uses only standard, well-known results; it introduces no novel probability theory. The following general sources are suggested for a reader who wishes to verify the underlying tools. Specific editions and citations should be confirmed before formal publication; none are quoted here.

- The **union bound (Boole's inequality)** and elementary probability, as in any standard probability textbook.
- **Series-system reliability** (the product-of-reliabilities result for components in series), as in standard reliability-engineering references.
- General literature on **data lineage, semantic drift, and data-quality cost** in data management; treat specific claims as requiring citation before publication.
- General literature on **system-of-record authority and master data management** for the architectural framing.

No external citations are asserted as established here. This appendix marks the categories of source that should be validated if the paper is taken toward formal or academic publication.

---

## Appendix C: Estimating δ and σ

The body treats `δ` and `σ` as parameters. Limitation 4 flagged their estimation as open. This appendix addresses it directly, because it is the first question a technical reviewer asks: if the model's conclusions turn on two probabilities, how are those probabilities measured rather than assumed? The honest answer is that `δ` has a measurable majority and an irreducible minority, and that a governance-first architecture is precisely what shifts the boundary between the two.

### C.1 The estimand

Both `δ` and `σ` are Bernoulli rates over an operative distribution. Draw a `(state, action)` pair the way automation actually encounters it — weighted by where automation acts, not uniformly over all rows — ask whether operation matched the formal definition, and `δ` is the probability of "no." `σ` is the same quantity evaluated for the specific fact a consumer relies on at the point of use. The naïve estimator is therefore elementary: sample `n` events, count `d` divergences, take `δ̂ = d/n` with a confidence interval. Because `δ` is small, the Wilson score interval is preferred over the normal approximation, and for rare-event regimes (`δ ≈ 0.02`) either a large sample or a full-population count is required for a usable interval.

The entire difficulty is the word *divergence*. To count it, one needs ground truth for actual operation `O` and formal definition `D` simultaneously. If that were cheaply observable for every event, the divergence would be corrected rather than measured. So the real problem is not the estimator; it is the source of the ground-truth reference. There are three such sources, in increasing cost.

### C.2 The governed gate as a census instrument

When the state-constraint engine evaluates `D` *inside the write transaction*, every attempted transition is recorded with its outcome. The blocked fraction,

$$\hat{\delta}_{\text{would-be}} = \frac{N_{\text{blocked}}}{N_{\text{blocked}} + N_{\text{passed}} + N_{\text{warned}}},$$

is a direct estimate of how often operation *would have* diverged from definition had the gate not been present — the counterfactual ungoverned rate, and exactly the `σ = 0.05` of the worked example in Section 8. Crucially this is a **census, not a sample**: every attempt is logged, so the would-be component carries no sampling error. The architectural point is that only a governing substrate produces this signal at all. An ungoverned system commits the same divergences silently, leaving nothing to count. Governance does not merely lower `δ`; it converts the bulk of `δ` from a silent, unmeasurable quantity into a logged event that is tallied rather than estimated.

### C.3 Back-testing the definition against committed state

The gate measures *attempted* divergence. To measure what *escaped* — divergence that committed despite the gate — re-evaluate `D`'s invariants over committed rows using the append-only change log, and count failures. This exposes a decomposition of `δ` into three independent escape channels, which a union bound (consistent with the body's posture) combines:

$$\delta \;\le\; \gamma \;+\; \rho \;+\; \tau,$$

- `γ` — **coverage gap**: the fraction of `D`'s intended invariants that are not actually authored and enforced, weighted by event frequency. Estimated by auditing the enforced-constraint catalog against the obligation corpus (board, contract, framework). This is typically the dominant term and the most under-acknowledged.
- `ρ` — **escape rate**: among enforced invariants, the rate of out-of-band mutation that bypassed the gate. Read directly from the drift-event log.
- `τ` — **residual definitional error**: cases where `D` itself misstates the intended rule. The gate cannot catch this, because the gate trusts `D`. Only Section C.4 catches it.

The first two terms are computed continuously from the logs at near-zero marginal cost.

### C.4 Independent adjudication: the irreducible term

The `τ` term, and `σ` in general, require a reference *outside* the system. Sample consumed facts and verify each against an out-of-band channel: physical inspection, a second system of record, the shadow spreadsheet, a human adjudicator. In the worked example, "`σ = 0.05`" means operationally: draw `N` receipts marked `received`, independently confirm from inspection records how many were genuinely complete and inspected, and find that one in twenty was not. Stratify by entity type, transition, and value band; weight by automation frequency so the estimate reflects the distribution that matters.

This is the only genuinely irreducible cost, and it is a *sampling* cost, not a census — periodic (e.g. quarterly) rather than continuous. Its function is to calibrate the cheap estimators of C.2 and C.3 and to detect when they have drifted.

### C.5 The σ asymmetry: consumer-assumption drift

`σ` is not simply `δ` evaluated at the endpoint. It carries a term `δ` does not: the consumer may rely on an implication `D` never asserts. "Received means inspected" may appear nowhere in `D` — the consumer inferred it. Estimating `σ` therefore requires eliciting the consumer's *assumed* definition `D_consumer` and diffing it against `D_source`, a semantic-contract audit rather than a value check. This is why, in general, `σ` is at least the residual semantic error at the source, and why an agent at the end of a long chain is the dangerous case: its `D_consumer` is whatever it inferred from flattened data, and nothing adjudicated it.

### C.6 Estimating per-hop δᵢ and h

The spatial parameters are estimated by **reconciliation**: for the same fact, compare its representation at hop `i` against hop `i − 1` and count disagreements beyond legitimate transformation. The disagreement rate estimates `δ_i`; the measured path length on the real topology is `h`. The machinery is identical to the semantic case — a Bernoulli rate with the upstream hop as reference — and lineage/discovery tooling produces both the per-hop rates and the topology.

### C.7 What is measurable, and what is not

The defensible summary is that a governing substrate makes the would-be-divergence component a census (gate logs), the escape component continuous (drift plus back-test), and shrinks the manual residual to a stratified periodic sample. The irreducible minority is the definitional-error term `τ` and the consumer-assumption component of `σ`, both of which need human ground truth. Every estimate is conditional on the operative distribution being stationary: shift the workload and `δ` shifts. `δ` and `σ` are therefore monitored quantities, not constants — which is consistent with, and not a weakening of, the body's conditional claims.

---

*Mimir Labs LLC — White Paper 13, v1.1, June 2026. This document presents a conditional model under stated assumptions and is intended for technical evaluation. It is not a guarantee of system performance.*
