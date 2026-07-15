export const meta = {
  name: 'mimir-twin-predictive',
  description: 'Disposition-aggregated iterative simulation of Mimir Labs (company twin) + Yggdrasil (platform twin)',
  whenToUse: 'Forecast Mimir Labs trajectory: raise/acquisition/runway/venture-scale, coupling company and platform with memory across steps.',
  phases: [
    { title: 'Seed', detail: 'load grounded starting state' },
    { title: 'Simulate', detail: 'step the coupled twins across the horizon (judgment pass)' },
    { title: 'Ensemble', detail: 'Monte-Carlo re-sample outcomes; classify tiers' },
  ],
}

// ───────────────────────── config (tunables — see HARNESS.md §9) ─────────────────────────
const HORIZON = (args && args.horizon) || 18          // simulated months
const RUNS    = (args && args.runs)    || 500          // Monte-Carlo trajectories
const SEED    = (args && args.seed)    || 1855         // PRNG seed (reproducible)
const BETA    = (args && args.disposition_gain) || 1.6 // how hard disposition bends odds (§3)
const KAPPA   = (args && args.learning_rate)    || 0.45 // belief move per period (§4)
const LAMBDA  = (args && args.decay)            || 0.10 // momentum reversion per step (§4)

const COUPLING = {
  capital_for_hire_usd: 250000,  // cumulative new capital that funds +1 eng FTE
  onboarding_lag_steps: 1,       // new hire adds net throughput after this many steps
  readiness_to_credibility: 0.30,// each step nudge platform_credibility toward sell_use_readiness
  pilot_incident_bump: 0.15,     // latent incident risk added when a pilot goes live
  slip_warmth_penalty: 0.30,     // investor_warmth signal applied next step on a platform slip
  slip_corpdev_penalty: 0.20,    // corp_dev_interest signal applied next step on a platform slip
  runway_risk_months: 6,
}

const DISPO_DIMS = ['investor_warmth','proof_traction','founder_visibility','narrative_resonance','corp_dev_interest','market_timing','platform_credibility']
const CORP_STAGES = ['identified','contacted','replied','briefing','diligence','LOI','term_sheet','close']

// ───────────────────────── math helpers ─────────────────────────
const clamp = (x,lo,hi) => Math.max(lo, Math.min(hi, x))
const sigmoid = z => 1 / (1 + Math.exp(-z))
const logit = p => { const q = clamp(p, 1e-6, 1-1e-6); return Math.log(q/(1-q)) }

// seeded LCG (Math.random is unavailable in workflow scripts)
function makeRng(seed) {
  let s = (seed >>> 0) || 1
  return () => { s = (1664525 * s + 1013904223) >>> 0; return s / 4294967296 }
}

// effective probability after disposition weighting (§3)
function pEff(p_base, depends_on, D) {
  let adj = 0
  for (const d of (depends_on || [])) if (D[d] != null) adj += (D[d] - 0.5)
  return clamp(sigmoid(logit(p_base) + BETA * adj), 0.01, 0.99)
}

// apply a sampled branch's disposition signals (§4, step 1)
function applySignals(D, signals) {
  if (!signals) return
  for (const d of DISPO_DIMS) {
    if (signals[d] != null) D[d] = clamp(sigmoid(logit(D[d]) + KAPPA * clamp(signals[d], -1, 1)), 0.02, 0.98)
  }
}

// decay every dimension toward prior (§4, step 2)
function decay(D, prior) {
  for (const d of DISPO_DIMS) D[d] = clamp(D[d] + LAMBDA * (prior[d] - D[d]), 0.02, 0.98)
}

// recognized metric_delta keys → mutate KPI vector K
function applyMetricDeltas(K, md) {
  if (!md) return
  if (md.cash_delta_usd)            K.cash_on_hand_usd += md.cash_delta_usd
  if (md.raise_committed_delta_usd) K.raise_committed_usd += md.raise_committed_delta_usd
  if (md.arr_delta_usd)             K.arr_usd += md.arr_delta_usd
  if (md.mrr_delta_usd)             K.arr_usd += 12 * md.mrr_delta_usd
  if (md.pilots_delta)              { K.pilots_live += md.pilots_delta; if (md.pilots_delta > 0) K.latent_incident_risk += COUPLING.pilot_incident_bump }
  if (md.design_partners_delta)     K.design_partners += md.design_partners_delta
  if (md.eng_capacity_delta)        K.eng_capacity_fte += md.eng_capacity_delta
  if (md.sell_use_readiness_delta)  K.sell_use_readiness = clamp(K.sell_use_readiness + md.sell_use_readiness_delta, 0, 1)
  if (md.build_readiness_delta)     K.build_readiness = clamp(K.build_readiness + md.build_readiness_delta, 0, 1)
  if (md.soc2_type1_ready)          K.soc2_type1_ready = true
  if (md.soc2_type2_start && K.soc2_type2_started_step == null) K.soc2_type2_started_step = K._t
  if (md.corp_dev_advance)          K.corp_dev_stage = clamp(K.corp_dev_stage + md.corp_dev_advance, 0, CORP_STAGES.length - 1)
  if (md.investor_advance)          K.investor_progress += md.investor_advance
}

// classify a finished trajectory into an outcome tier (§7)
function classify(K, D) {
  if (K.acquired) return 'acquired'
  if (K.runway_months <= 0 && !K.raise_closed) return 'shutdown'
  const composite = (D.proof_traction + D.platform_credibility + D.market_timing + D.narrative_resonance) / 4
  if (K.raise_closed || K.acquired) {
    if (composite > 0.85 && K.arr_usd >= 2_000_000) return 'dragon_path'
    if (composite > 0.75 && K.arr_usd >= 1_000_000) return 'unicorn_path'
    if (composite > 0.60 && K.arr_usd >=   300_000) return 'centaur_path'
    return 'seed_raised'
  }
  if (K.arr_usd > 0 || K.pilots_live > 0) return 'survival'
  return K.runway_months > 0 ? 'survival' : 'shutdown'
}

// ───────────────────────── Seed ─────────────────────────
phase('Seed')
const LOADER_SCHEMA = { type: 'object', properties: { state: { type: 'object' } }, required: ['state'] }
const loaded = await agent(
  'Read the file predictive-analysis/state/initial-state.json and return its full parsed contents under key "state". Return JSON only, no commentary.',
  { label: 'load-seed-state', phase: 'Seed', schema: LOADER_SCHEMA }
)
const S0 = loaded.state
const prior = {}
for (const d of DISPO_DIMS) prior[d] = S0.disposition[d].prior

// initial KPI vector from seed
function initialK() {
  const c = S0.company, p = S0.platform
  return {
    _t: 0,
    cash_on_hand_usd: c.cash_on_hand_usd,
    monthly_burn_usd: c.monthly_burn_usd,
    runway_months: c.runway_months,
    raise_target_usd: c.raise.target_raise_usd,
    raise_committed_usd: c.raise.committed_usd,
    raise_closed: false,
    acquired: false,
    arr_usd: c.arr_usd,
    pilots_live: p.pilots_live,
    design_partners: c.commercial.design_partners_signed,
    eng_capacity_fte: p.eng_capacity_fte,
    sell_use_readiness: p.sell_use_readiness,
    build_readiness: p.build_readiness,
    soc2_type1_ready: p.soc2.type1_ready,
    soc2_type2_started_step: null,
    corp_dev_stage: 0,
    investor_progress: 0,
    latent_incident_risk: p.latent_incident_risk,
    capital_raised_cumulative: 0,
    pending_capacity: [],
  }
}

// ───────────────────────── Simulate (judgment pass) ─────────────────────────
phase('Simulate')

const STEP_SCHEMA = {
  type: 'object',
  required: ['narrative','outcomes','metric_deltas','confidence'],
  properties: {
    narrative: { type: 'string' },
    actions: { type: 'array', items: { type: 'object' } },
    outcomes: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id','p_base','depends_on','on_success','on_failure'],
        properties: {
          id: { type: 'string' },
          label: { type: 'string' },
          p_base: { type: 'number' },
          depends_on: { type: 'array', items: { type: 'string' } },
          on_success: { type: 'object' },
          on_failure: { type: 'object' },
        },
      },
    },
    metric_deltas: { type: 'object' },
    flags: { type: 'array', items: { type: 'string' } },
    confidence: { type: 'number' },
  },
}

function snapshot(K, D) {
  const round = o => { const r = {}; for (const k in o) r[k] = typeof o[k] === 'number' ? Math.round(o[k]*1000)/1000 : o[k]; return r }
  return { kpis: round(K), disposition: round(D), corp_dev_stage_label: CORP_STAGES[K.corp_dev_stage] }
}

async function twinStep(which, K, D, t, fromOther, carryFlags) {
  const agentType = which === 'company' ? 'company-twin' : 'platform-twin'
  const prompt =
`You are simulating period (month) ${t} of ${HORIZON}.
Return ONE StepResult JSON object per your agent contract (HARNESS.md §"Agent output contract").
Give p_base as your HONEST pre-weighting probability; the engine applies disposition weighting, do NOT pre-apply it.
Use ONLY these recognized metric_deltas keys so the engine can apply them: cash_delta_usd, raise_committed_delta_usd, arr_delta_usd, mrr_delta_usd, pilots_delta, design_partners_delta, eng_capacity_delta, sell_use_readiness_delta, build_readiness_delta, soc2_type1_ready (bool), soc2_type2_start (bool), corp_dev_advance (int), investor_advance (int).

CURRENT STATE (numeric KPI vector + disposition):
${JSON.stringify(snapshot(K, D))}

SIGNALS FROM THE OTHER TWIN THIS PERIOD:
${JSON.stringify(fromOther)}

CARRIED FLAGS (from prior step / coupling): ${JSON.stringify(carryFlags || [])}

Ground in the repo docs as your agent definition instructs. Be calibrated and honest about the cold pipeline, pre-revenue status, capacity limits, and the immovable SOC 2 Type II window.`
  return await agent(prompt, { label: `${which}:m${t}`, phase: 'Simulate', schema: STEP_SCHEMA, agentType })
}

// canonical pass: collect per-step judgment; evolve canonical state with seeded sampling
const rng0 = makeRng(SEED)
const K = initialK()
const D = {}; for (const d of DISPO_DIMS) D[d] = S0.disposition[d].value
const judgments = []      // cached per-step {platform, company} StepResults for the ensemble
const trajectory = []     // canonical per-step record for the report
let carryFlags = []

for (let t = 1; t <= HORIZON; t++) {
  K._t = t
  // 1. burn + runway
  K.cash_on_hand_usd -= K.monthly_burn_usd
  K.runway_months = K.monthly_burn_usd > 0 ? K.cash_on_hand_usd / K.monthly_burn_usd : 999
  // apply any capacity that finished onboarding
  K.pending_capacity = K.pending_capacity.filter(s => { if (t >= s) { K.eng_capacity_fte += 1; return false } return true })
  if (K.runway_months < COUPLING.runway_risk_months) carryFlags.push('runway_risk')

  // 2. platform step, then 3. company step (company sees platform's fresh readiness)
  const fromCompanyToPlatform = { capital_raised_cumulative: K.capital_raised_cumulative, design_partners: K.design_partners, pilots_live: K.pilots_live }
  const pRes = await twinStep('platform', K, D, t, fromCompanyToPlatform, carryFlags)
  // tentatively reflect platform deterministic readiness so company sees it
  applyMetricDeltas(K, pRes.metric_deltas)
  const fromPlatformToCompany = { sell_use_readiness: K.sell_use_readiness, soc2_type1_ready: K.soc2_type1_ready, build_readiness: K.build_readiness, flags: pRes.flags || [] }
  const cRes = await twinStep('company', K, D, t, fromPlatformToCompany, carryFlags)
  applyMetricDeltas(K, cRes.metric_deltas)

  judgments.push({ platform: pRes, company: cRes })

  // 4. aggregate uncertain outcomes (canonical sampling)
  carryFlags = []
  for (const res of [pRes, cRes]) {
    for (const o of (res.outcomes || [])) {
      const p = pEff(o.p_base, o.depends_on, D)
      const hit = rng0() < p
      const branch = hit ? o.on_success : o.on_failure
      applySignals(D, branch && branch.disposition_signals)
      applyMetricDeltas(K, branch && branch.metric_deltas)
    }
    for (const f of (res.flags || [])) carryFlags.push(f)
  }

  // 5. coupling + capital→capacity + credibility spine
  if (K.raise_committed_usd >= 0.8 * K.raise_target_usd && !K.raise_closed) { K.raise_closed = true; K.cash_on_hand_usd += K.raise_committed_usd }
  if (CORP_STAGES[K.corp_dev_stage] === 'close') K.acquired = true
  const newCapital = K.raise_committed_usd + K.arr_usd - K.capital_raised_cumulative
  if (newCapital >= COUPLING.capital_for_hire_usd) { K.capital_raised_cumulative += COUPLING.capital_for_hire_usd; K.pending_capacity.push(t + COUPLING.onboarding_lag_steps) }
  applySignals(D, { platform_credibility: COUPLING.readiness_to_credibility * (K.sell_use_readiness - 0.5) })
  if (carryFlags.includes('slip') || carryFlags.includes('incident')) carryFlags.push('cooling')

  // 6. decay
  decay(D, prior)

  // 7. record + termination
  trajectory.push({ t, ...snapshot(K, D), tier_if_ended: classify(K, D), platform_narrative: pRes.narrative, company_narrative: cRes.narrative, flags: carryFlags.slice() })
  if (K.runway_months <= 0 && !K.raise_closed && !K.acquired) { log(`Canonical trajectory: shutdown at month ${t}`); break }
  if (K.acquired) { log(`Canonical trajectory: acquired at month ${t}`); break }
}

// ───────────────────────── Ensemble (pure JS, reuses cached judgments) ─────────────────────────
phase('Ensemble')
log(`Running ${RUNS} Monte-Carlo trajectories over ${judgments.length} judged steps…`)
const tally = {}
const endArr = [], endRunway = [], endCash = []
for (let r = 0; r < RUNS; r++) {
  const rng = makeRng(SEED + 1 + r * 2654435761)
  const Kr = initialK()
  const Dr = {}; for (const d of DISPO_DIMS) Dr[d] = S0.disposition[d].value
  let tier = 'survival'
  for (let i = 0; i < judgments.length; i++) {
    const t = i + 1; Kr._t = t
    Kr.cash_on_hand_usd -= Kr.monthly_burn_usd
    Kr.runway_months = Kr.monthly_burn_usd > 0 ? Kr.cash_on_hand_usd / Kr.monthly_burn_usd : 999
    Kr.pending_capacity = Kr.pending_capacity.filter(s => { if (t >= s) { Kr.eng_capacity_fte += 1; return false } return true })
    const { platform: pRes, company: cRes } = judgments[i]
    applyMetricDeltas(Kr, pRes.metric_deltas)
    applyMetricDeltas(Kr, cRes.metric_deltas)
    for (const res of [pRes, cRes]) for (const o of (res.outcomes || [])) {
      const p = pEff(o.p_base, o.depends_on, Dr)
      const branch = (rng() < p) ? o.on_success : o.on_failure
      applySignals(Dr, branch && branch.disposition_signals)
      applyMetricDeltas(Kr, branch && branch.metric_deltas)
    }
    if (Kr.raise_committed_usd >= 0.8 * Kr.raise_target_usd && !Kr.raise_closed) { Kr.raise_closed = true; Kr.cash_on_hand_usd += Kr.raise_committed_usd }
    if (CORP_STAGES[Kr.corp_dev_stage] === 'close') Kr.acquired = true
    const nc = Kr.raise_committed_usd + Kr.arr_usd - Kr.capital_raised_cumulative
    if (nc >= COUPLING.capital_for_hire_usd) { Kr.capital_raised_cumulative += COUPLING.capital_for_hire_usd; Kr.pending_capacity.push(t + COUPLING.onboarding_lag_steps) }
    applySignals(Dr, { platform_credibility: COUPLING.readiness_to_credibility * (Kr.sell_use_readiness - 0.5) })
    decay(Dr, prior)
    if ((Kr.runway_months <= 0 && !Kr.raise_closed && !Kr.acquired) || Kr.acquired) { tier = classify(Kr, Dr); break }
    tier = classify(Kr, Dr)
  }
  tally[tier] = (tally[tier] || 0) + 1
  endArr.push(Kr.arr_usd); endRunway.push(Kr.runway_months); endCash.push(Kr.cash_on_hand_usd)
}

const pct = n => Math.round(1000 * n / RUNS) / 10
const tierProbs = {}; for (const k in tally) tierProbs[k] = pct(tally[k]) + '%'
const median = a => { const s = a.slice().sort((x,y)=>x-y); return s[Math.floor(s.length/2)] }

const report = {
  config: { HORIZON, RUNS, SEED, BETA, KAPPA, LAMBDA },
  seed_state_as_of: S0._meta.as_of,
  outcome_tier_probabilities: tierProbs,
  ensemble_end_state: {
    median_arr_usd: Math.round(median(endArr)),
    median_runway_months: Math.round(median(endRunway) * 10) / 10,
    median_cash_usd: Math.round(median(endCash)),
  },
  canonical_trajectory: trajectory,
  caveats: [
    'Judgments are computed once on the canonical trajectory; the ensemble perturbs sampling around it (documented approximation — keeps agent calls at 2×horizon).',
    'Tier thresholds (centaur/unicorn/dragon) are tunable proxies, not promises.',
    'Re-seed state/initial-state.json as real progress lands so the forecast tracks reality.',
  ],
}

log(`Outcome tiers: ${JSON.stringify(tierProbs)}`)
return report
