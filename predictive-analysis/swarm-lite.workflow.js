export const meta = {
  name: 'mimir-swarm-lite',
  description: 'MiroFish-style YEAR-BY-YEAR forecast with THREE concurrent capitalization tracks (revenue + investment + acquisition) valued in concert → continuous enterprise valuation, MRR/COGS/burn, staged rounds, exits, founder-millionaire (paper + liquid), growth potential',
  whenToUse: 'Token-efficient multi-year picture that parses every money-making/-getting opportunity in concert (revenue, rounds, acquisition) and tabulates growth potential + time-to-founder-millionaire. One reliable flat-schema agent per persona per year, ≤6 concurrent.',
  phases: [
    { title: 'Distill', detail: 'one agent → compact brief + financial model + investor/customer/acquirer personas' },
    { title: 'Years', detail: 'per year: every persona reacts (≤6 concurrent) → ledger advances all 3 capital tracks in concert' },
    { title: 'Synthesize', detail: 'one agent → emergent prediction + year-by-year financials + growth potential' },
  ],
}

// ───────── tunables ─────────
const QUESTION = (args && args.question) ||
  "Model Mimir Labs year by year (5 years): parse every capitalization opportunity in concert — revenue, investment rounds, and acquisition — and tabulate enterprise valuation / growth potential, runway, and time to founder becoming a millionaire (paper vs liquid)."
const PERSONAS = (args && args.personas) || 16       // ~9 investors + ~4 customers + ~3 acquirers
const YEARS    = (args && args.years)   || 5
const CONCURRENCY = 6
const MAX_AGENTS = 100

// ───────── stance + helpers ─────────
const STANCE = { passed:-2, cold:-1, skeptical:-0.5, curious:0.5, interested:1, engaged:1.5, committed:2 }
const score = s => (STANCE[s] != null ? STANCE[s] : 0)
const chunk = (a,n) => { const o=[]; for (let i=0;i<a.length;i+=n) o.push(a.slice(i,i+n)); return o }
const isCustomer = f => /prospect|customer|design.?partner|manufacturer|cohort/i.test(f || '')
const isAcquirer = f => /acquir/i.test(f || '')

async function runCapped(items, fn) {
  const out = []
  for (const batch of chunk(items, CONCURRENCY)) {
    const res = await parallel(batch.map((it, j) => () => fn(it, out.length + j)))
    out.push(...res)
  }
  return out
}

// ───────── financial model (mirrors state/initial-state.json → financial_model) ─────────
const FM_DEFAULT = {
  opening_cash_usd: 0,
  monthly_opex_usd: { infra_tooling:151, sales_marketing:1250, legal_accounting:833, insurance_compliance:417, ga:417, travel:667 },
  founder_compensation: { base_salary_usd:85000, draw_start_arr_multiple:3, founder_lifestyle_usd_monthly:4500, tax_rate:0,
    salary_savings_to_liquid:true, lifestyle_externally_funded_until_draw:true,
    salary_schedule_by_arr: [ {arr_floor_usd:255000,annual_salary_usd:85000}, {arr_floor_usd:1000000,annual_salary_usd:120000}, {arr_floor_usd:3000000,annual_salary_usd:150000}, {arr_floor_usd:8000000,annual_salary_usd:185000} ] },
  first_hire: { monthly_cost_usd:9167, onboarding_lag_months:1 },
  one_time_outlays_usd: { soc2_type1_audit:20000, pen_test:8000 },
  norn_saas: { paid_adds_per_month:1, arpa_usd:140, monthly_churn:0.04, cogs_pct:0.15 },
  services: { ratatosk_engagement_usd:8000, ratatosk_cogs_pct:0.15, ragnarok_engagement_usd:20000, ragnarok_cogs_pct:0.20 },
  yggdrasil: { pilot_fee_usd:35000, pilot_cogs_usd:1500, subscription_mrr_usd:2500, hosting_cogs_per_tenant_usd:30, recurring_cogs_pct:0.02 },
  payment_processing_pct:0.029,
  valuation: { arr_multiple:6 },
  raise: { min_viable_close_usd:300000, close_lag_months:1, founder_starting_ownership_pct:1.0,
    stages: [ {name:'pre-seed',arr_floor_usd:0,max_size_usd:750000,pre_money_usd:4000000}, {name:'seed',arr_floor_usd:600000,max_size_usd:4000000,pre_money_usd:12000000}, {name:'series_a',arr_floor_usd:2500000,max_size_usd:15000000,pre_money_usd:40000000} ] },
  founder_millionaire_index: { threshold_usd:1000000, current_marked_valuation_usd:null,
    liquidity: { acquisition_cash_portion:0.7, founder_secondary_usd:0, founder_liquid_start_usd:0 } },
}

function founderSalaryAnnual(FM, arr) {
  const fc = FM.founder_compensation || {}
  const gate = (fc.base_salary_usd || 0) * (fc.draw_start_arr_multiple || 3)
  if (arr < gate) return 0
  const sched = fc.salary_schedule_by_arr || [{ arr_floor_usd: gate, annual_salary_usd: fc.base_salary_usd || 0 }]
  let sal = fc.base_salary_usd || 0
  for (const t of sched) if (arr >= t.arr_floor_usd) sal = t.annual_salary_usd
  return sal
}

function initLedger(FM) {
  const op = FM.monthly_opex_usd
  const fmi = FM.founder_millionaire_index || {}
  const lq = fmi.liquidity || {}
  return { FM, LQ: lq, THRESH: (fmi.threshold_usd || 1000000),
    asserted_mark: (fmi.current_marked_valuation_usd || 0),
    cash:FM.opening_cash_usd, mrr_subscription:0, norn_paid:0, active_tenants:0,
    base_opex:Object.keys(op).reduce((a,k)=>a+op[k],0), hired:false, hire_start:null, soc2_engaged:false,
    founder_ownership:(FM.raise && FM.raise.founder_starting_ownership_pct != null ? FM.raise.founder_starting_ownership_pct : 1.0),
    // ── three concurrent capitalization tracks ──
    latest_post_money:0,            // investment track: best round post-money mark
    standing_offer:0,               // acquisition track: highest live offer (optionality mark)
    round_stage_idx:0, pending_round:null, rounds_closed:[],   // staged rounds
    acquired:false, acquisition_price:null,
    marked_valuation:0,             // = max(ARR×mult, latest_post_money, standing_offer, asserted_mark)
    founder_mm_month:null, founder_liquid:(lq.founder_liquid_start_usd || 0), founder_liquid_mm_month:null,
    prev_arr:0, years:[], _yr:null }
}

// MARK the company from all three capital sources in concert
function markValuation(led, arr) {
  const mult = (led.FM.valuation && led.FM.valuation.arr_multiple) || 0
  const arrVal = arr * mult
  const v = Math.max(arrVal, led.latest_post_money, led.standing_offer, led.asserted_mark)
  let src = 'revenue'
  if (v <= 0) src = 'none'
  else if (v === led.standing_offer && led.standing_offer > 0) src = 'acquisition_offer'
  else if (v === led.latest_post_money && led.latest_post_money > 0) src = 'round'
  led.marked_valuation = v
  return { value: v, source: src }
}

// one MONTH of mechanics (recurring revenue, COGS, OpEx, draw, round injection, valuation, founder indices)
function advanceMonth(led, gm, oneTimeRev, serviceCogs, platform) {
  const FM = led.FM, fc = FM.founder_compensation || {}
  led.norn_paid = (led.norn_paid + FM.norn_saas.paid_adds_per_month) * (1 - FM.norn_saas.monthly_churn)
  const norn_mrr = led.norn_paid * FM.norn_saas.arpa_usd
  const recurring = norn_mrr + led.mrr_subscription
  const processing = norn_mrr * FM.payment_processing_pct
  const saasCogs = norn_mrr * FM.norn_saas.cogs_pct + led.mrr_subscription * FM.yggdrasil.recurring_cogs_pct + led.active_tenants * FM.yggdrasil.hosting_cogs_per_tenant_usd
  const cogs = (serviceCogs || 0) + saasCogs + processing
  const arr = recurring * 12
  const salaryAnnual = founderSalaryAnnual(FM, arr)
  const draw_monthly = salaryAnnual / 12
  let opex = led.base_opex + draw_monthly
  if (led.hired && led.hire_start != null && gm >= led.hire_start) opex += FM.first_hire.monthly_cost_usd
  let oneTimeOut = 0
  if (platform && platform.soc2_type1_ready && !led.soc2_engaged) { oneTimeOut += FM.one_time_outlays_usd.soc2_type1_audit; led.soc2_engaged = true }
  const revenue = recurring + (oneTimeRev || 0)
  const net = revenue - cogs - opex - oneTimeOut
  led.cash += net
  // INVESTMENT TRACK — a scheduled round's proceeds land this month: inject cash, dilute, mark post-money
  if (led.pending_round && led.pending_round.close_month === gm) {
    const r = led.pending_round
    led.cash += r.proceeds
    const post = r.pre + r.proceeds
    led.founder_ownership *= (1 - r.proceeds / post)
    led.latest_post_money = Math.max(led.latest_post_money, post)
    led.founder_liquid += (led.LQ.founder_secondary_usd || 0)
    led.rounds_closed.push({ month: gm, name: r.name, proceeds: Math.round(r.proceeds), post_money: Math.round(post) })
    if (!led.hired) { led.hired = true; led.hire_start = gm + FM.first_hire.onboarding_lag_months }
    led.round_stage_idx += 1
    led.pending_round = null
  }
  // slow LIQUID path: (salary − lifestyle) only while drawing; pre-draw lifestyle externally funded → $0 drag
  if (fc.salary_savings_to_liquid !== false && draw_monthly > 0) {
    const savings = draw_monthly * (1 - (fc.tax_rate || 0)) - (fc.founder_lifestyle_usd_monthly || 0)
    if (savings > 0) led.founder_liquid += savings
  }
  // VALUATION in concert (revenue ∨ round ∨ offer) → founder paper net worth
  const mk = markValuation(led, arr)
  const founder_paper = led.founder_ownership * led.marked_valuation
  if (founder_paper >= led.THRESH && led.founder_mm_month == null) led.founder_mm_month = gm
  if (led.founder_liquid >= led.THRESH && led.founder_liquid_mm_month == null) led.founder_liquid_mm_month = gm
  const y = led._yr
  y.revenue += revenue; y.cogs += cogs; y.opex += (opex + oneTimeOut); y.net += net
  y.end_cash = led.cash; y.end_mrr = recurring; y.end_arr = arr; y.end_salary = salaryAnnual; y.drawing = draw_monthly > 0
  y.end_val = led.marked_valuation; y.val_source = mk.source; y.end_paper = founder_paper; y.end_liquid = led.founder_liquid; y.end_own = led.founder_ownership
}

// one YEAR = advance all three capital tracks in concert, then run 12 months
function advanceYear(led, year, events, committedCapital, platform, acqStanding, acqCommit) {
  const FM = led.FM
  const startMonth = (year - 1) * 12 + 1
  // REVENUE TRACK — customer-persona events (front-loaded so they compound through the year)
  let oneTimeRev = 0, serviceCogs = 0
  for (const ev of events) {
    if (ev === 'ratatosk_signed') { oneTimeRev += FM.services.ratatosk_engagement_usd; serviceCogs += FM.services.ratatosk_engagement_usd * FM.services.ratatosk_cogs_pct }
    else if (ev === 'ragnarok_signed') { oneTimeRev += FM.services.ragnarok_engagement_usd; serviceCogs += FM.services.ragnarok_engagement_usd * FM.services.ragnarok_cogs_pct }
    else if (ev === 'pilot_signed') { oneTimeRev += FM.yggdrasil.pilot_fee_usd; serviceCogs += FM.yggdrasil.pilot_cogs_usd; led.active_tenants += 1 }
    else if (ev === 'subscription_started') { led.mrr_subscription += FM.yggdrasil.subscription_mrr_usd }
    else if (ev === 'churned') { led.mrr_subscription = Math.max(0, led.mrr_subscription - FM.yggdrasil.subscription_mrr_usd); led.active_tenants = Math.max(0, led.active_tenants - 1) }
  }
  // ACQUISITION TRACK — standing offer marks valuation (optionality); a committed acquirer consummates a liquid exit
  if (acqStanding > 0) led.standing_offer = Math.max(led.standing_offer, acqStanding)
  if (acqCommit > 0 && !led.acquired) {
    led.acquired = true; led.acquisition_price = acqCommit
    led.founder_liquid += led.founder_ownership * acqCommit * (led.LQ.acquisition_cash_portion != null ? led.LQ.acquisition_cash_portion : 0.7)
    led.standing_offer = Math.max(led.standing_offer, acqCommit)
  }
  // INVESTMENT TRACK — fire the next stage if interest >= min_viable AND ARR clears the stage floor
  const stages = FM.raise.stages || []
  if (!led.pending_round && led.round_stage_idx < stages.length) {
    const stage = stages[led.round_stage_idx]
    if (committedCapital >= FM.raise.min_viable_close_usd && led.prev_arr >= stage.arr_floor_usd) {
      const pre = Math.max(stage.pre_money_usd, led.prev_arr * ((FM.valuation && FM.valuation.arr_multiple) || 0))
      const proceeds = Math.min(committedCapital, stage.max_size_usd)
      led.pending_round = { close_month: startMonth + (FM.raise.close_lag_months || 0), proceeds, pre, name: stage.name }
    }
  }
  // 12 monthly sub-steps (events applied only in the first month)
  led._yr = { revenue:0, cogs:0, opex:0, net:0 }
  for (let m = 0; m < 12; m++) advanceMonth(led, startMonth + m, m === 0 ? oneTimeRev : 0, m === 0 ? serviceCogs : 0, platform)
  const y = led._yr
  const gm = y.revenue > 0 ? (y.revenue - y.cogs) / y.revenue : null
  const arr_growth = led.prev_arr > 0 ? Math.round((y.end_arr / led.prev_arr - 1) * 100) / 100 : null
  const eoyRunwayMo = (y.net < 0 && y.end_cash > 0) ? Math.round(y.end_cash / (-y.net / 12) * 10) / 10 : (y.end_cash <= 0 ? -1 : 999)
  const line = { year, end_cash: Math.round(y.end_cash), end_mrr: Math.round(y.end_mrr), end_arr: Math.round(y.end_arr), arr_growth_yoy: arr_growth,
    revenue: Math.round(y.revenue), cogs: Math.round(y.cogs), opex: Math.round(y.opex), net: Math.round(y.net),
    gross_margin: gm == null ? null : Math.round(gm * 100) / 100, eoy_runway_months: eoyRunwayMo,
    marked_valuation_usd: Math.round(y.end_val), valuation_source: y.val_source,
    founder_salary_annual_usd: Math.round(y.end_salary), founder_drawing: y.drawing,
    founder_ownership_pct: Math.round(y.end_own * 10000) / 100,
    founder_paper_net_worth_usd: Math.round(y.end_paper), founder_liquid_usd: Math.round(y.end_liquid),
    active_tenants: led.active_tenants, committed_capital: committedCapital,
    rounds_closed_to_date: led.rounds_closed.length, standing_offer_usd: Math.round(led.standing_offer), acquired: led.acquired }
  led.prev_arr = y.end_arr
  led.years.push(line)
  return line
}

// ───────── budget guard ─────────
let years = YEARS
while (years * PERSONAS + 2 > MAX_AGENTS && years > 1) years--
if (years !== YEARS) log(`Clamped years ${YEARS}→${years} to stay under ${MAX_AGENTS} lifetime agents.`)
log(`Plan: 1 distill + ${years}×${PERSONAS} reactors + 1 synth ≈ ${years*PERSONAS + 2} agents, ≤${CONCURRENCY} concurrent (one reliable flat-schema call per persona/year). Three capital tracks + ledger are free JS.`)

// ───────── inline role instructions ─────────
const STANCE_SCALE = `Stance scale: passed(-2) cold(-1) skeptical(-0.5) curious(+0.5) interested(+1) engaged(+1.5) committed(+2).`
const PERSONA_INSTR = `You ROLE-PLAY a specific persona reacting to ONE YEAR of Mimir Labs' progress. Stay in character with that entity's real thesis, check size, objection, and decision GATE — a hard rule you do NOT jump unless the year's stimulus + the LIVE financials satisfy it.
ANCHOR TO LIVE TRACTION: base conviction and any check/offer on the financial_snapshot (real ARR, growth, marked valuation, cash, runway, rounds closed, standing acquisition offer) and the stimulus — NOT on any multi-year projection. At <$250K ARR, institutional VC term sheets do NOT materialize (angels / econ-dev / regional might); size everything to the real stage.
THREE CAPITAL SOURCES ACT IN CONCERT — react to what the others are doing (all visible in the snapshot/peers):
• INVESTOR/ACQUIRER: a standing acquisition offer creates competitive tension / FOMO and validates value; strong revenue traction lifts your conviction; a recently closed round means more runway and faster growth (raises your mark).
• INVESTOR personas: engaged/committed ⇒ name indicative_check_usd ≤ check_size (else 0), sized to the live valuation/stage.
• ACQUIRER personas (faction acquirer): if you'd table an offer THIS YEAR set acquisition_offer_usd to your indicative whole-company price (interested = a standing offer that marks value; committed = you'd actually close the deal); else 0.
• CUSTOMER/PROSPECT personas (faction prospect/design-partner/manufacturer): funnel curious→interested→engaged(paid Ratatosk diagnostic)→committed(Yggdrasil pilot/subscription). If you cross a buying threshold THIS YEAR set commercial_event ∈ {ratatosk_signed,ragnarok_signed,pilot_signed,subscription_started,churned} (else "none"); a funded/credible vendor (cash/runway in snapshot) converts you faster, open blockers (data-loss, no SOC 2) slow you. Do NOT invent dollar amounts — the ledger applies standard values.
Apply mean-field CONTAGION: nudge toward sentiment_prev by your contagion_susceptibility; a peer committing pulls you, a visible pass chills you. Year 1 starts cold/pre-revenue; stances can progress over years as proof accumulates. Keep "rationale" to ONE short sentence. ${STANCE_SCALE}`
const DISTILL_INSTR = `You are the SEED DISTILLER. Read predictive-analysis/state/initial-state.json (primary — includes a financial_model block with valuation + staged raise; consult business/PRE_SEED_TERM_SHEET.md, business/PROJECTIONS.md, business/COSTS.md, business/ceo-runbook.md, business/acquirer-strategic-fit.md, product/ROADMAP.md, due-diligence/DD-05-MATURITY-AND-RISK.md only to fill gaps). Produce the SMALLEST faithful seed brief. Return the financial_model VERBATIM from initial-state.json (the engine uses valuation + raise.stages). The roster must cover ALL THREE capital sources: ~9 CAPITAL personas (top investors by tier+relevance), ~4 CUSTOMER/PROSPECT personas (validation-cohort / South-Central-PA manufacturers; faction "prospect"/"design-partner"), and ~3 ACQUIRER personas (faction "acquirer": ServiceNow, Workday, NTT DATA, EPAM, Palantir, etc.). Each with terse thesis/objection/gate + cold/curious init_stance. Bake in honesty: pre-revenue, 0 customers/deploys, all cold; carry real GATEs; note platform blockers + SOC 2 status.`
const SYNTH_INSTR = `You are the SYNTHESIZER. Do NOT re-simulate — read the emergent end-state + the deterministic YEAR-BY-YEAR ledger (which runs the three capital tracks IN CONCERT) and explain them together. The ledger is authoritative for numbers. Cover all three money sources concurrently: REVENUE (ARR/MRR build, margin), INVESTMENT (which staged rounds closed, when, at what valuation/dilution), ACQUISITION (standing offers as optionality + any consummated exit). GROWTH POTENTIAL: read marked_valuation_usd (= max of ARR×multiple, round post-money, standing offer) each year and explain its trajectory, source, and CAGR. FOUNDER-MILLIONAIRE: PAPER = ownership × marked valuation (now can cross via revenue scale, a round, OR an offer — say which and when, or null); LIQUID = cash via exit/secondary or the slow (salary−lifestyle) accrual once drawing (ARR ≥ $255K; lifestyle externally funded until then). Be calibrated; anchor to the ledger, not the projection. Output JSON: {question, prediction:{headline, primary_probability (0..1 a priced round closes in-horizon), confidence, distribution:{closes,partial_or_bridge,stalls}, likely_lead, terms_estimate, raise_year}, financial_outlook:{per_year:[{year,end_arr_usd,end_cash_usd,net_usd,marked_valuation_usd,valuation_source}], ending_arr_usd, ending_cash_usd, blended_gross_margin, first_profitable_year_or_null, rounds_closed:[...], best_acquisition_offer_usd, founder_millionaire:{paper_year_or_null, liquid_year_or_null, note}, one_liner}, growth_potential:{ending_valuation_usd, arr_cagr, valuation_cagr, value_creation_story}, coalitions:[...], swing_factors:[{factor,impact,why}], causal_narrative (3-5 sentences across the years and the three tracks), key_personas:[{name,end_stance,role}], caveats:[...]}.`

// ───────── Distill ─────────
phase('Distill')
const DISTILL_SCHEMA = {
  type: 'object',
  required: ['question','company_state','platform_state','market_context','personas','stimuli_plan','financial_model'],
  properties: {
    question: { type: 'string' }, horizon: { type: 'string' },
    company_state: { type: 'object' }, platform_state: { type: 'object' }, market_context: { type: 'string' },
    financial_model: { type: 'object' },
    personas: { type: 'array', items: { type: 'object',
      required: ['id','name','faction','thesis','objection','gate','init_stance','contagion_susceptibility'] } },
    stimuli_plan: { type: 'array', items: { type: 'string' } },
  },
}
const brief = await agent(
  `${DISTILL_INSTR}\n\nScoped question: "${QUESTION}". Produce the compact seed brief, the financial_model (verbatim), a persona roster of EXACTLY ${PERSONAS} entries spanning capital + customers + acquirers, and a stimuli_plan of ${years} entries (one realistic YEAR-stimulus each, escalating as plausible). JSON only, matching the schema.`,
  { label: 'distill', phase: 'Distill', schema: DISTILL_SCHEMA }
)
const FM = brief.financial_model || FM_DEFAULT
const led = initLedger(FM)
let fin = { cash: FM.opening_cash_usd, recurring_mrr: 0, arr_usd: 0, arr_growth_yoy: null, marked_valuation_usd: 0, valuation_source: 'none', standing_offer_usd: 0, rounds_closed: 0, eoy_runway_months: (led.base_opex>0? Math.round(FM.opening_cash_usd/led.base_opex*10)/10 : 999) }

// ───────── Years ─────────
phase('Years')
const REACT_OBJ = {
  type: 'object',
  required: ['id','new_stance','delta','rationale','contagion_susceptibility'],
  properties: {
    id: { type: 'string' }, new_stance: { type: 'string' }, delta: { type: 'number' },
    rationale: { type: 'string' }, contagion_susceptibility: { type: 'number' },
    indicative_check_usd: { type: 'number' }, would_advance_if: { type: 'string' },
    commercial_event: { type: 'string' }, acquisition_offer_usd: { type: 'number' },
  },
}

let personas = brief.personas.map(p => ({ ...p, stance: p.init_stance, indicative_check_usd: 0 }))
let sentiment = personas.reduce((s,p)=>s+score(p.stance),0) / personas.length / 2
const year_log = []

async function reactOne(p, year, stimulus, sentiment_prev, peers) {
  const briefCompact = { company_state: brief.company_state, platform_state: brief.platform_state, market_context: brief.market_context, financial_snapshot: fin }
  const persona = { id:p.id, name:p.name, faction:p.faction, check_size:p.check_size, thesis:p.thesis, objection:p.objection, gate:p.gate, stance:p.stance }
  try {
    return await agent(
      `${PERSONA_INSTR}\n\nYou are persona ${p.name}. YEAR ${year} of ${years}. Stimulus: ${stimulus}\nContext:\n${JSON.stringify({ brief: briefCompact, year, sentiment_prev, peers, persona, question: QUESTION })}\nReturn ONLY the JSON object matching the schema (echo persona id; delta in [-2,+2]; commercial_event only if a customer crossing a buying threshold; acquisition_offer_usd only if an acquirer; size to LIVE traction). JSON only.`,
      { label: `y${year}:${p.name}`.slice(0,40), phase: 'Years', schema: REACT_OBJ }
    )
  } catch (e) {
    return { id: p.id, new_stance: p.stance, delta: 0, rationale: '(no response — held prior stance)', contagion_susceptibility: p.contagion_susceptibility ?? 0.3, indicative_check_usd: 0, commercial_event: 'none' }
  }
}

for (let year = 1; year <= years; year++) {
  const stimulus = (brief.stimuli_plan && brief.stimuli_plan[year-1]) || `Year ${year}: founder executes the next planned outreach / platform / commercial milestones.`
  const sentiment_prev = sentiment
  const committedNames = personas.filter(p => score(p.stance) >= 1.5).map(p => p.name)
  const peers = { committed_or_engaged: committedNames, engaged_count: committedNames.length, marked_valuation: fin.marked_valuation_usd, standing_offer: fin.standing_offer_usd, eoy_cash: fin.cash, eoy_arr: fin.arr_usd }

  const updates = (await runCapped(personas, (p) => reactOne(p, year, stimulus, sentiment_prev, peers))).filter(Boolean)

  const byId = {}; for (const u of updates) if (u && u.id) byId[u.id] = u
  const events = []
  let acqStanding = 0, acqCommit = 0
  personas = personas.map(p => {
    const u = byId[p.id]; if (!u) return p
    if (isCustomer(p.faction) && u.commercial_event && u.commercial_event !== 'none') events.push(u.commercial_event)
    if (isAcquirer(p.faction) && u.acquisition_offer_usd > 0) {
      if (score(u.new_stance) >= 1) acqStanding = Math.max(acqStanding, u.acquisition_offer_usd)
      if (score(u.new_stance) >= 2) acqCommit = Math.max(acqCommit, u.acquisition_offer_usd)
    }
    return { ...p, stance: u.new_stance,
      indicative_check_usd: (isCustomer(p.faction) || isAcquirer(p.faction)) ? 0 : (u.indicative_check_usd || 0),
      last_rationale: u.rationale, last_event: u.commercial_event || 'none',
      contagion_susceptibility: u.contagion_susceptibility ?? p.contagion_susceptibility }
  })

  sentiment = personas.reduce((s,p)=>s+score(p.stance),0) / personas.length / 2
  const committed_capital = personas.filter(p=>!isCustomer(p.faction) && !isAcquirer(p.faction) && score(p.stance)>=1.5).reduce((s,p)=>s+(p.indicative_check_usd||0),0)
  const coalitions = {}
  for (const p of personas) if (score(p.stance) >= 1) (coalitions[p.faction] = coalitions[p.faction] || []).push(p.name)

  const line = advanceYear(led, year, events, committed_capital, brief.platform_state, acqStanding, acqCommit)
  fin = { cash: line.end_cash, recurring_mrr: line.end_mrr, arr_usd: line.end_arr, arr_growth_yoy: line.arr_growth_yoy,
    marked_valuation_usd: line.marked_valuation_usd, valuation_source: line.valuation_source,
    standing_offer_usd: line.standing_offer_usd, rounds_closed: line.rounds_closed_to_date, eoy_runway_months: line.eoy_runway_months }

  year_log.push({ year, stimulus, sentiment: Math.round(sentiment*100)/100, momentum: Math.round((sentiment - sentiment_prev)*100)/100,
    committed_capital, commercial_events: events, acq_standing: acqStanding, acq_commit: acqCommit, financials: line, coalitions })
  log(`Y${year}: ARR $${line.end_arr.toLocaleString?.()||line.end_arr} | val $${line.marked_valuation_usd.toLocaleString?.()||line.marked_valuation_usd} (${line.valuation_source}) | cash $${line.end_cash.toLocaleString?.()||line.end_cash} | paper $${line.founder_paper_net_worth_usd.toLocaleString?.()||line.founder_paper_net_worth_usd} liquid $${line.founder_liquid_usd} | rounds ${line.rounds_closed_to_date} | offer $${line.standing_offer_usd}${line.acquired?' [ACQUIRED]':''}`)
}

// ───────── Synthesize ─────────
phase('Synthesize')
const SYNTH_SCHEMA = {
  type: 'object',
  required: ['question','prediction','financial_outlook','growth_potential','causal_narrative','caveats'],
  properties: {
    question: { type: 'string' },
    prediction: { type: 'object', required: ['headline','primary_probability','confidence'] },
    financial_outlook: { type: 'object', required: ['ending_arr_usd','ending_cash_usd','founder_millionaire','one_liner'] },
    growth_potential: { type: 'object', required: ['ending_valuation_usd','value_creation_story'] },
    coalitions: { type: 'array' }, swing_factors: { type: 'array' },
    causal_narrative: { type: 'string' }, key_personas: { type: 'array' }, caveats: { type: 'array' },
  },
}
const m2y = m => (m == null ? null : Math.ceil(m / 12))
const cagr = (a, b, n) => (a > 0 && b > 0 && n > 0) ? Math.round((Math.pow(b / a, 1 / n) - 1) * 1000) / 10 : null
const yrs = led.years
const arr_cagr = yrs.length >= 2 ? cagr(yrs[0].end_arr, yrs[yrs.length-1].end_arr, yrs.length-1) : null
const val_cagr = yrs.length >= 2 ? cagr(yrs[0].marked_valuation_usd, yrs[yrs.length-1].marked_valuation_usd, yrs.length-1) : null
const finalTable = personas.map(p => ({ name:p.name, faction:p.faction, end_stance:p.stance, indicative_check_usd:p.indicative_check_usd||0, last_event:p.last_event, gate:p.gate, last_rationale:p.last_rationale }))
const report = await agent(
  `${SYNTH_INSTR}\n\nQuestion: "${QUESTION}".\n` +
  `YEAR-BY-YEAR LEDGER (authoritative; three capital tracks in concert):\n${JSON.stringify(led.years)}\n` +
  `ROUNDS CLOSED:\n${JSON.stringify(led.rounds_closed)}\n` +
  `FOUNDER-MILLIONAIRE crossings: paper_year=${m2y(led.founder_mm_month)}, liquid_year=${m2y(led.founder_liquid_mm_month)}. ARR CAGR=${arr_cagr}%, valuation CAGR=${val_cagr}%, best standing offer=$${led.standing_offer}.\n` +
  `FINAL PERSONA TABLE:\n${JSON.stringify(finalTable)}\n` +
  `YEAR LOG:\n${JSON.stringify(year_log.map(r=>({year:r.year,stimulus:r.stimulus,sentiment:r.sentiment,committed_capital:r.committed_capital,commercial_events:r.commercial_events,acq_standing:r.acq_standing,acq_commit:r.acq_commit,coalitions:r.coalitions})))}\n` +
  `BRIEF (anchors):\n${JSON.stringify({ company_state:brief.company_state, platform_state:brief.platform_state, market_context:brief.market_context, financial_model:FM })}\n` +
  `Write your synthesis report now. JSON only, matching the schema.`,
  { label: 'synthesize', phase: 'Synthesize', schema: SYNTH_SCHEMA }
)

return {
  question: QUESTION,
  config: { personas: PERSONAS, years, concurrency_cap: CONCURRENCY, approx_agents_used: years*PERSONAS + 2 },
  report,
  financial_trajectory: led.years,
  ending: led.years[led.years.length - 1] || null,
  capitalization: {
    revenue: { ending_arr_usd: yrs.length ? yrs[yrs.length-1].end_arr : 0, arr_cagr_pct: arr_cagr },
    investment: { rounds_closed: led.rounds_closed, total_raised_usd: led.rounds_closed.reduce((s,r)=>s+r.proceeds,0) },
    acquisition: { best_standing_offer_usd: led.standing_offer, acquired: led.acquired, acquisition_price_usd: led.acquisition_price },
  },
  growth_potential: { ending_valuation_usd: yrs.length ? yrs[yrs.length-1].marked_valuation_usd : 0, arr_cagr_pct: arr_cagr, valuation_cagr_pct: val_cagr,
    valuation_by_year: yrs.map(y=>({ year:y.year, valuation_usd:y.marked_valuation_usd, source:y.valuation_source, arr:y.end_arr })) },
  founder_millionaire: {
    paper: { year: m2y(led.founder_mm_month), month: led.founder_mm_month,
      net_worth_at_horizon_usd: yrs.length ? yrs[yrs.length-1].founder_paper_net_worth_usd : 0,
      ownership_pct_at_horizon: yrs.length ? yrs[yrs.length-1].founder_ownership_pct : 100,
      basis: 'ownership × marked valuation, where valuation = max(ARR×multiple, round post-money, standing acquisition offer). ILLIQUID.' },
    liquid: { year: m2y(led.founder_liquid_mm_month), month: led.founder_liquid_mm_month,
      cash_at_horizon_usd: yrs.length ? yrs[yrs.length-1].founder_liquid_usd : 0, acquired: led.acquired,
      basis: 'acquisition cash-out + founder secondary + slow (salary − lifestyle) accrual once drawing (ARR ≥ $255K). Lifestyle externally funded until draw. A fundraise yields $0 liquid.' },
  },
  year_log,
  method: 'Three capitalization tracks (revenue, staged investment, acquisition) advance in concert each year; the company is marked continuously = max(ARR×multiple, round post-money, standing offer). Persona swarm (one reliable flat-schema call per persona/year, ≤6 concurrent) drives all three; deterministic ledger runs 12 months/year. Re-seed state/initial-state.json as reality changes.',
}
