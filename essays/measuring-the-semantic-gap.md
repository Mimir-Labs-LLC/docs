# Measuring the Semantic Gap: How to Estimate δ and σ

**Mimir Labs LLC — Companion note to White Paper 13**
**June 2026**

---

White Paper 13, *Semantic-Operational Alignment and Spatial Path-Length*, models enterprise automation reliability in terms of two probabilities. `δ` is the semantic-operational separation: how often a system's actual operation diverges from its formal definition. `σ` is the residual version of that gap at the point where automation actually acts. The paper's conclusions turn on these two numbers, and it flagged their estimation as an open question.

This note answers it, because it is the first thing any technical reader asks. If the model rests on two probabilities, how are they measured rather than assumed? The honest answer is that `δ` has a measurable majority and an irreducible minority, and that a governance-first architecture is exactly what moves the boundary between them. (This text also appears as Appendix C of the paper; it is reproduced here for readers who already have v1.0.)

## What we are actually estimating

Both `δ` and `σ` are simple rates. Draw an event the way automation encounters it, ask whether operation matched the formal definition, and `δ` is the probability of "no." `σ` is the same question asked about the specific fact a consumer relies on. So the estimator is elementary: sample `n` events, count `d` divergences, take `d/n`, and put a confidence interval on it. Because the rate is small, use a Wilson interval rather than the normal approximation, and expect to need large samples or full-population counts when `δ` is on the order of a couple of percent.

The hard part is the word *divergence*. To count it you need to know, at once, what the system actually did and what its definition said it should do. If that were cheap to observe for every event, you would fix the divergence instead of measuring it. So the real question is not the arithmetic. It is where the ground-truth reference comes from. There are three sources, in increasing cost.

## 1. The gate is a measurement instrument

When the operational core evaluates the definition inside the write transaction, it logs every attempted transition and its outcome. The fraction that get blocked is a direct readout of how often operation *would have* diverged had nothing stopped it. That is the counterfactual ungoverned rate, and it is the strongest measurement claim the architecture makes.

It is also a census, not a sample. Every attempt is logged, so this component carries no sampling error. And only a governing system produces the signal at all: an ungoverned system commits those same divergences silently, leaving nothing to count. Governance does not just lower the gap. It turns most of the gap from a silent, unmeasurable thing into a logged event you tally.

## 2. Back-testing the definition against what committed

The gate measures *attempted* divergence. To see what *escaped* it, re-run the definition's invariants over records that actually committed and count the failures. Doing this exposes that the gap is really three separate leaks:

- **Coverage gap.** The fraction of the intended rules that were never actually authored and enforced. This is usually the biggest term and the least talked about. You estimate it by auditing the enforced-constraint catalog against the real obligation corpus — the board resolutions, the contracts, the framework controls.
- **Escape rate.** Among rules that *are* enforced, the rate of out-of-band changes that slipped past the gate. This comes straight off the drift log.
- **Definitional error.** Cases where the definition itself is wrong. The gate can never catch these, because the gate trusts the definition. Only the third source can.

The first two are computed continuously from the logs at almost no marginal cost.

## 3. Independent adjudication, the part that does not reduce

The definitional-error term, and `σ` in general, need a reference outside the system. You sample consumed facts and check each against an independent channel: a physical inspection, a second system, the shadow spreadsheet, a human. In the paper's worked example, "`σ` is five percent" means something concrete: pull a batch of purchase orders marked received, independently confirm from inspection records how many were genuinely complete, and find that one in twenty was not. Stratify the sample by entity, transition, and value band, and weight it by where automation actually acts.

This is the only genuinely irreducible cost. But it is a sampling cost, not a census — periodic rather than constant. Its job is to calibrate the cheap estimators above and to catch them when they drift.

## Why σ is worse than it looks

`σ` is not just the gap measured at the endpoint. It carries an extra failure the source gap does not: the consumer may rely on something the definition never said. "Received means inspected" may be nowhere in the formal definition. The consumer assumed it. Estimating `σ` therefore means eliciting the consumer's *assumed* definition and comparing it to the real one, which is a semantic-contract audit, not a value check. This is why an automated agent at the end of a long data chain is the dangerous case. Its assumed definition is whatever it inferred from flattened data, and nobody ever adjudicated it.

## The spatial side

The per-hop degradation rates are estimated the same way, by reconciliation: for one fact, compare its value at each hop against the hop before and count the disagreements that are not legitimate transformations. The disagreement rate is the per-hop gap; the measured path length is the hop count. Same machinery, with the upstream hop as the reference.

## What this leaves us with

A governing substrate makes the would-have-diverged component a census, makes the escape component continuous, and shrinks the manual residual to a periodic stratified sample. What stays irreducible is the definitional-error term and the consumer-assumption part of `σ`, both of which need human ground truth. And every estimate is conditional on the workload holding still. Change what the business does and the gap changes with it. These are monitored quantities, not constants — which is the same conditional posture the paper takes throughout.

---

*Companion to Mimir Labs LLC White Paper 13. Presents estimation methodology for a conditional model under stated assumptions; intended for technical evaluation.*
