# Predictive Analysis — Mimir Labs

Two ways to forecast Mimir Labs' trajectory live here. **Start with the lean
swarm** — it's the lightweight, token-efficient, MiroFish-style method and the
current primary path. The deterministic twin engine below it is a heavier
alternative kept for reference.

---

## ① Lean swarm + financial ledger (primary) — MiroFish-style, token-efficient

Emulates MiroFish's **swarm-intelligence** methodology — a population of market
personas (your real investors / acquirers **and** validation-cohort customers),
monthly rounds of reaction with **mean-field contagion**, emergent coalitions,
one prediction report — but with a **bounded, cheap** cadre: many small agents,
**never more than 6 concurrent**, ~30–50 total. The persona stance table carried
between months *is* the iterative, disposition-aggregated memory you asked for.

A deterministic **financial ledger** (pure JS — zero tokens) runs **three
capitalization tracks in concert** and marks the company continuously:
- **Revenue** — customer-persona conversions generate MRR + one-time revenue; the
  ledger applies COGS, OpEx, the ARR-gated founder draw, and one-time outlays.
- **Investment** — staged rounds (pre-seed → seed → Series A), ARR-gated and
  size-capped, that inject cash, dilute the founder, and mark a post-money.
- **Acquisition** — offers that mark valuation (optionality) and can consummate a
  liquid exit.

The company's **marked valuation each period = max(ARR × multiple, latest round
post-money, standing acquisition offer)** — so growth potential compounds with
revenue *between* financing events, not just at a priced event. Every persona
sees the live valuation / standing offer / runway / rounds, so the three sources
cross-influence (offer → investor FOMO, traction lifts all, a round accelerates
growth). Output is a year-by-year operating picture, a **growth-potential**
tabulation (valuation trajectory + source + CAGR), and the raise/exit prediction.

**Why it's cheap:** one distill agent compresses the repo into a small shared
brief (reactors never touch raw docs); each persona agent is tiny; personas react
to the *prior month's aggregate* (mean-field), not pairwise (no N² blowup); all
accounting is plain JS (free).

| File | Role |
|---|---|
| [`swarm-lite.workflow.js`](./swarm-lite.workflow.js) | The engine: distill → monthly persona rounds (≤6 concurrent) + financial ledger → synthesize. |
| [`.claude/agents/oracle.md`](../.claude/agents/oracle.md) | Bookend agent — DISTILL (brief + financial model + roster) and SYNTHESIZE (prediction + financial outlook). |
| [`.claude/agents/persona.md`](../.claude/agents/persona.md) | One tiny reactor — capital persona (check) or customer persona (commercial_event). |
| [`state/initial-state.json`](./state/initial-state.json) | Seed material: company/platform state, the investor/acquirer roster, **and the `financial_model`** (opening cash, OpEx, COGS rates, pricing, hire, raise rule). |

**Run it** (multi-agent → needs opt-in: say *“run the swarm-lite workflow”*, or):
```
Workflow({ scriptPath: "predictive-analysis/swarm-lite.workflow.js",
           args: { years: 5, personas: 14 } })
```
Cadence is **year-by-year** (each persona reacts once per year; the ledger steps
12 months/year under the hood for accurate compounding, churn, and mid-year
salary-gate crossings). Reliability: **one flat-schema call per persona per year**
(the path that ran with zero failures), ≤6 concurrent, with a graceful
hold-prior-stance fallback if a call ever fails — no more dropped reactions.
Tunables: `question`, `personas` (mix of capital + ~3–4 customers), `years`.
A guard keeps total agents under 100 (5×14+2 = 72). Returns the prediction
report, a **year-by-year financial trajectory**, the ending snapshot, the year
log, and a **founder-millionaire index** reporting
*both* **paper** (ownership × marked valuation — gated by a priced close;
illiquid) and **liquid** (actual cash — gated by an acquisition cash-out or
secondary; a fundraise yields $0 liquid). In a raise-only scenario, expect paper
to cross at the close month and liquid to read *null / not within horizon*.

**Before the next run, correct `opening_cash_usd`** in `state/initial-state.json`
(currently a $50K placeholder) — it's the single biggest driver of the runway
and cash-out results.

---

## ② Deterministic twin engine (heavier alternative)

A pair of coupled simulator agents and a deterministic engine. Iterative and
**disposition-aggregated**: each simulated period's results update a running
**disposition vector** that weights the next period's odds. The past bends the
present, with bounded momentum and decay. More machinery, more tokens than the
lean swarm — use it when you want the explicit coupling-matrix model.

## The two twins
- **`company-twin`** — Mimir Labs the *business*: raise, 37-investor pipeline,
  grants (BFTP/NSF), acquisition/corp-dev track, runway, hiring, pilots, revenue.
  → [`.claude/agents/company-twin.md`](../.claude/agents/company-twin.md)
- **`platform-twin`** — Yggdrasil the *product*: roadmap, production blockers,
  SOC 2 Type I/II, security hardening, demo/pilot readiness, capacity.
  → [`.claude/agents/platform-twin.md`](../.claude/agents/platform-twin.md)

They are **coupled**: capital → eng capacity → platform velocity; platform
readiness/SOC 2 → pilot-close & diligence odds; slips → investor cooling. The
shared `platform_credibility` and `proof_traction` dispositions are the spine.

## Files
| File | What |
|---|---|
| [`HARNESS.md`](./HARNESS.md) | The protocol + the disposition-aggregation math (read this). |
| [`state/initial-state.json`](./state/initial-state.json) | Hybrid-seeded starting world — hard numbers from repo docs, soft probabilities tagged `ASSUMPTION`. |
| [`simulate.workflow.js`](./simulate.workflow.js) | Runnable engine: steps the twins, aggregates, runs a Monte-Carlo ensemble, returns a tier-probability report. |

## Run it
This is a multi-agent workflow, so it needs explicit opt-in. Either:
- Tell Claude: **“run the predictive-analysis workflow”** (the word *workflow* opts in), or
- Invoke directly:
  ```
  Workflow({ scriptPath: "predictive-analysis/simulate.workflow.js",
             args: { horizon: 18, runs: 500, seed: 1855 } })
  ```
Default run ≈ 2 × horizon agent calls (e.g. ~36 for 18 months) + a pure-JS
ensemble. Watch progress with `/workflows`. It returns a JSON report; ask Claude
to save it under `runs/` to keep it.

For a quick ad-hoc read without the full engine, just ask Claude to *“use the
company-twin to simulate the next 3 months of fundraising.”*

## Outcome tiers it scores
`shutdown · survival · seed_raised · acquired · centaur_path ($100M ARR) ·
unicorn_path ($1B valuation) · dragon_path (fund-returning)`. The venture-scale
tail tiers are long-horizon labels assigned from terminal disposition + revenue
slope, anchored on the PROJECTIONS.md Year-5 case.

## Keep it honest
Re-seed `state/initial-state.json` as real outreach/pipeline/platform progress
lands. The simulation is decision support under stated assumptions — tier
probabilities are relative signal, not promises. Both agents are read-only and
take no real-world actions (no emails sent, no code changed).

## Tunables
`horizon, runs, seed, disposition_gain (β), learning_rate (κ), decay (λ),
raise_size_usd`, and the `COUPLING` matrix — see [`HARNESS.md` §9](./HARNESS.md).
Note: `PROJECTIONS.md` assumes an $800K pre-seed while the term sheet opens at
$500K — toggle `raise_size_usd` to compare.
