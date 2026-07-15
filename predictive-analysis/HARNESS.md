# Twin-Agent Predictive Harness — Protocol & Math

**Disposition-Aggregated Iterative Simulation (DAIS)** for Mimir Labs.

Two coupled agents — [`company-twin`](../.claude/agents/company-twin.md) (the
business) and [`platform-twin`](../.claude/agents/platform-twin.md) (the Yggdrasil
product) — are stepped forward together over a horizon of simulated periods. Each
period, every agent proposes actions and an honest outcome distribution; a
deterministic engine weights those outcomes by the **accumulated disposition**,
samples them, updates the disposition and the world state, exchanges **coupling**
signals between the twins, and carries everything forward. The result of every
prior step therefore has a real, bounded influence on the next — which is exactly
the "iterative and disposition-aggregated" behavior requested.

> This file is the spec. The runnable engine is
> [`simulate.workflow.js`](./simulate.workflow.js). The seeded starting world is
> [`state/initial-state.json`](./state/initial-state.json).

---

## 1. Objects

### 1.1 World state `S`
The full, mutable snapshot of the company and platform (cash, runway, pipeline
stages, readiness, blockers, team, revenue, …). Seeded from repo docs; see
`state/initial-state.json` for the schema and starting values.

### 1.2 Disposition vector `D`
A small set of named beliefs, each `D[d] ∈ (0,1)`, representing accumulated
momentum. This is the **memory** of the simulation. Dimensions:

`investor_warmth, proof_traction, founder_visibility, narrative_resonance,
corp_dev_interest, market_timing, platform_credibility`

`platform_credibility` and `proof_traction` are **shared** — both twins read and
push them, which is the primary coupling spine.

### 1.3 Step
One simulated period. Default granularity: **1 month**. Default horizon: **18
steps** (matches the 18-month pre-seed runway in `PRE_SEED_TERM_SHEET.md`). Both
configurable via `args`.

---

## 2. Agent output contract (`StepResult`)

Each twin, when invoked for a step, returns **only** this JSON:

```jsonc
{
  "narrative": "string (3–6 sentences, concrete)",
  "actions": [
    { "id": "string", "type": "string", "description": "string", "effort": 0.0 } // effort ∈ [0,1] share of capacity/attention
  ],
  "outcomes": [
    {
      "id": "string",
      "label": "string",
      "p_base": 0.0,                       // honest probability BEFORE disposition weighting
      "depends_on": ["investor_warmth"],   // disposition dims that modulate p
      "on_success": {
        "disposition_signals": { "investor_warmth": 0.5 },  // each ∈ [-1,1]
        "metric_deltas": { "pipeline_advance": {"target":"Schematic Ventures","to":"meeting"} }
      },
      "on_failure": {
        "disposition_signals": { "narrative_resonance": -0.2 },
        "metric_deltas": {}
      }
    }
  ],
  "metric_deltas": { "cash_delta_usd": -5150 },  // deterministic, applied every step regardless of sampling
  "flags": ["runway_risk"],
  "confidence": 0.0
}
```

The agents supply **judgment** (what to do, base odds, effects). The engine owns
the **aggregation** (disposition weighting, sampling, updates, coupling, bounds).
Agents must NOT pre-apply disposition weighting to `p_base`.

---

## 3. The disposition weighting (how the past bends the present)

For an outcome with base probability `p_base` that `depends_on` dimensions `Δ`,
the **effective** probability used for sampling is computed in log-odds space:

```
logit(p)   = ln( p / (1 - p) )
adj        = β · Σ_{d ∈ Δ} ( D[d] − 0.5 )        // β = disposition_gain (default 1.6)
p_eff      = σ( logit(p_base) + adj )            // σ = logistic sigmoid
p_eff      = clamp(p_eff, 0.01, 0.99)
```

So when the dimensions an outcome depends on are warm (`D > 0.5`), the outcome
becomes more likely; when cold (`D < 0.5`), less likely. A pilot-close that
`depends_on: [platform_credibility, proof_traction]` is throttled hard while the
product is unproven, and lifts as those beliefs accumulate.

---

## 4. The disposition update (how the present becomes the past)

After an outcome is sampled (success/failure), its `disposition_signals s[d]`
update `D` in log-odds space with a learning rate, then every dimension decays
toward its prior so momentum fades if unreinforced:

```
// 1. apply each signal from the sampled branch
logit(D[d]) += κ · s[d]                 // κ = learning_rate (default 0.45)

// 2. decay toward prior at end of step
D[d] += λ · ( D_prior[d] − D[d] )       // λ = decay (default 0.10)

D[d] = clamp(D[d], 0.02, 0.98)
```

`κ` controls how much a single period's results move belief; `λ` controls how
fast unreinforced momentum reverts. Both are tunable in the engine config.

---

## 5. Coupling (the twins are not independent)

Between the platform step and the company step (and carried into the next
period), the engine applies fixed coupling channels. Defaults:

| Channel | Trigger | Effect |
|---|---|---|
| **capital → capacity** | company raises ≥ $250K cash this step | `platform.eng_capacity_fte += 1` next step (after a 1-step onboarding lag during which net throughput is unchanged) |
| **readiness → conversion** | `platform.sell_use_readiness` and SOC 2 status | multiplies company pilot-close / diligence-survival `p_base` via a `platform_credibility` push |
| **credibility spine** | either twin pushes `platform_credibility` / `proof_traction` | shared dimensions — the other twin reads the updated value next step |
| **pilot → deadline** | company signs a pilot/design partner | platform gains a deadline + `incident_risk` (first live deploy surfaces defects) |
| **slip → cooling** | platform emits `slip`/incident | depresses `investor_warmth` and `corp_dev_interest` next step |
| **runway → behavior** | company runway < 6 months | company weights toward grants + corp-dev + bridge; surfaces `runway_risk` |

Coupling is intentionally simple and legible. Tune the matrix in
`simulate.workflow.js` (`COUPLING`).

---

## 6. Step loop (per period `t`)

1. **Decay check / accrue burn** — apply deterministic monthly burn, runway recompute.
2. **Platform step** — invoke `platform-twin` with `{S, D, t, from_company}`.
3. **Company step** — invoke `company-twin` with `{S, D, t, from_platform}` (so
   the company sees the platform's just-decided readiness this period).
4. **Aggregate** — for each twin's `outcomes`: compute `p_eff` (§3), sample with
   the seeded PRNG, apply the sampled branch's `metric_deltas` + `disposition_signals`.
5. **Apply deterministic `metric_deltas`.**
6. **Update disposition** (§4) and **apply coupling** (§5).
7. **Record** the period to the trajectory log; check termination (§7).

### Determinism / reproducibility
The engine uses a seeded LCG PRNG (seed via `args.seed`, default 1855). Same
seed + same agent judgments ⇒ identical trajectory, so runs are reproducible and
the Workflow is resumable. (Workflow scripts cannot use `Math.random`/`Date.now`;
the LCG replaces them.)

### Ensemble (the actual "predictive" part)
A single pass yields one trajectory. To get **probabilities**, the engine runs an
**ensemble**: it reuses each step's agent judgment (cached) and re-samples the
outcomes across `args.runs` Monte-Carlo trajectories (default 500) with different
PRNG seeds, producing a distribution over end-states. Agent calls stay at
`2 × horizon` (judgment is deterministic given state); the ensemble is pure JS.

---

## 7. Termination & outcome scoring

A trajectory ends at the horizon, or early on:

- **Shutdown** — runway ≤ 0 with no raise, grant, or acquisition closed.
- **Acquired** — corp-dev funnel reaches `close`.
- **Raised** — pre-seed funnel reaches `wired`.

End-state is classified into the requested outcome tiers (nearest-term first):

| Tier | Condition (end of horizon or at event) |
|---|---|
| `shutdown` | runway exhausted, no capital event |
| `survival` | alive, some revenue, no venture-scale path (lifestyle/services) |
| `seed_raised` | pre-seed closed → positioned for seed at $8–15M (per term sheet) |
| `acquired` | corp-dev close (IP/acquihire exit) |
| `centaur_path` | trajectory + disposition imply a credible path to **$100M ARR** |
| `unicorn_path` | credible path to **$1B+ valuation** |
| `dragon_path` | fund-returning outcome (a single position that returns an entire fund) / both fast-growth *and* profitable |

The Centaur/Unicorn/Dragon tiers are **long-horizon tail labels**: they are
assigned probabilistically from the terminal disposition + revenue trajectory
slope, not expected within 18 months. The PROJECTIONS.md Year-5 figures
($11.4M ARR, $50–90M implied valuation) are the realistic-case anchor; the tail
tiers quantify the upside beyond it.

The ensemble reports, for each tier, the **fraction of trajectories** that land
there, plus medians and bands for cash, runway, ARR, pipeline depth, and platform
readiness over time.

---

## 8. How to run

This is a **reusable** setup — the twins and harness persist; run it whenever.

**Option A — full engine (Workflow):** ask Claude to *"run the predictive-analysis
workflow"* (the word "workflow" opts you into multi-agent orchestration), or
invoke it directly:
```
Workflow({ scriptPath: "predictive-analysis/simulate.workflow.js",
           args: { horizon: 18, runs: 500, seed: 1855 } })
```
Watch live progress with `/workflows`. The engine **returns a JSON report**
(tier probabilities + canonical trajectory + ensemble end-state); ask Claude to
save it under `predictive-analysis/runs/<id>.json` if you want to keep it.

**Option B — single twin, ad hoc:** invoke one agent for a one-off read, e.g.
*"Use the company-twin to simulate the next 3 months of fundraising given current
state."* Good for sanity checks; no aggregation/ensemble.

**Re-seeding:** edit `state/initial-state.json` (hybrid seed — hard numbers from
the docs, soft probabilities proposed and labeled `ASSUMPTION`). Re-running picks
up the new priors. Update it as real outreach/pipeline/platform progress lands so
the forecast tracks reality.

---

## 9. Tunables (engine config in `simulate.workflow.js`)

| Param | Default | Meaning |
|---|---|---|
| `horizon` | 18 | simulated months |
| `runs` | 500 | Monte-Carlo trajectories in the ensemble |
| `seed` | 1855 | PRNG seed (reproducibility) |
| `disposition_gain` β | 1.6 | how strongly disposition bends outcome odds (§3) |
| `learning_rate` κ | 0.45 | how much one period moves belief (§4) |
| `decay` λ | 0.10 | momentum reversion per step (§4) |
| `raise_size_usd` | 500000 | term-sheet opening (PROJECTIONS assumes 800000 — toggle) |
| `COUPLING` | see §5 | cross-twin channel strengths |

---

## 10. Honesty guardrails (baked into both agents)

- Pre-revenue, 0 customers, 0 production deploys at seed — no invented traction.
- All 37 investors start cold (`Lead, New`); realistic 5–10% cold-response ceiling.
- Investor gates in the pipeline data ("nurture until pilots/LOIs") are honored.
- SOC 2 Type II's 6-month window is immovable.
- Doc inconsistencies (DD-05 vs SOC2_ROADMAP; version 0.4.4a/0.4.5a) are
  reconciled conservatively and flagged.

This is a decision-support simulation, not a forecast of fact. Treat tier
probabilities as relative signal under stated assumptions, not promises.
