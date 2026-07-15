# Mimir Labs — 5-Year Financial Projections

*Yggdrasil ERP | B2B SaaS for Mid-Market Manufacturing*

*Updated July 2026 under Footprint Score pricing (canonical).*

---

## Market Positioning

Yggdrasil targets a gap in the manufacturing ERP market: companies too large for horizontal tools (Odoo, Zoho) but priced out of or underserved by legacy incumbents (Epicor, Infor, Syspro). All ten Business Modules are included in every subscription — the platform operates as one integrated system, not a bundle of optional add-ons — and our modern tech stack (C++/Qt desktop, Next.js web, PostgreSQL) delivers a faster, more intuitive experience than aging on-premise solutions. The structural differentiator is **ROPE** (Runtime Operational Policy Enforcement): the customer's operating model — rules, legal states and transitions, authority, exceptions — is governed inside the system and enforced at every state transition, which is also what makes the platform safe to automate with AI agents. This is the basis of the Footprint Score pricing: customers pay for the share of the enterprise brought under governed operational control.

## Pricing Model

Three independently-priced components:

```
Annual License = $100,000 + ($17,500 × Footprint Score)
```

| Footprint Score | Annual License | Activation | Band |
|---|---|---|---|
| 1 – 4 | $117.5K – $170K | $50K – $125K | Compliance Core |
| 5 – 9 | $187.5K – $257.5K | $50K – $125K | Operational Core |
| 10 – 24 | $275K – $520K | $125K – $300K | Regulated Enterprise |
| 25+ | $537.5K+ | $150K – $300K+ | Portfolio / Strategic |

Plus optional Audit Authority designations ($35K / yr per named regime, minimum) and the 120-day Pilot Track ($55K fixed, 50% conversion credit).

Full pricing logic at [business/PRICING.md](../../PRICING.md).

## Key Assumptions

| Assumption | Value |
|---|---|
| Sales motion | Pilot-first. Most paid tenants come through the 120-day Pilot Track funnel before signing annual. |
| Pilot-to-paid conversion rate | 33% Y1, ramping to 60% by Y4 as platform credibility builds |
| Tier mix progression (new cohorts) | CC-heavy early, gradually shifting up-tier as sales motion matures and PE/regulated accounts close |
| Subscription pro-rating | Half-year averaging applied to new tenants in their first year |
| Pilot conversion credit | $27,500 per converted tenant deducted from first-year subscription |
| Activation credit (Ratatosk + Ragnarok prior) | Modeled at zero in early years (most early customers come direct via pilot, not through full diagnostic-then-migration funnel). Captured implicitly in lower activation realization in later years as the pre-Yggdrasil services funnel matures. |
| Audit Authority attach rate | 0% Y1-Y2; 30% from Y3 onward; average 1.2 regimes per opted-in tenant at $35K/yr |
| Churn | 0% Y1-Y3 (small base, pilot-validated fits); 1.5% annual from Y4 |
| Team model | Solo founder Y1, scaling to ~18 FTE by Y5. AI-augmented engineering and ops throughout. |
| Funding | Bootstrapped to profitability. Optional growth capital at Y3+ inflection. |

## Tenant Funnel and Tier Mix

| | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 |
|---|---|---|---|---|---|
| Pilots sold | 3 | 8 | 14 | 25 | 40 |
| Pilot → paid conversions | 1 | 4 | 8 | 15 | 25 |
| Conversion rate | 33% | 50% | 57% | 60% | 63% |
| | | | | | |
| **New paid tenants by tier** | | | | | |
| Compliance Core | 1 | 3 | 5 | 8 | 12 |
| Operational Core | 0 | 1 | 2 | 5 | 10 |
| Regulated Enterprise | 0 | 0 | 1 | 2 | 2 |
| Portfolio / Strategic | 0 | 0 | 0 | 0 | 1 |
| | | | | | |
| **Active tenants (EOY)** | **1** | **5** | **13** | **28** | **53** |
| of which: Compliance Core | 1 | 4 | 9 | 17 | 29 |
| of which: Operational Core | 0 | 1 | 3 | 8 | 18 |
| of which: Regulated Enterprise | 0 | 0 | 1 | 3 | 5 |
| of which: Portfolio / Strategic | 0 | 0 | 0 | 0 | 1 |

## Per-Tenant Pricing (Mid-Band Conservative)

| Tier | Annual License | Activation (gross) |
|---|---|---|
| Compliance Core | $150,000 | $60,000 |
| Operational Core | $220,000 | $80,000 |
| Regulated Enterprise | $380,000 | $110,000 |
| Portfolio / Strategic | $650,000 | $200,000 |

These are representative mid-band figures under the $100K + $17.5K × Footprint Score model. Real customers land at points within their tier ranges depending on Footprint Score and compliance multiplier.

## Revenue

| | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 |
|---|---|---|---|---|---|
| Pilot revenue (Pilot Track) | $165K | $440K | $770K | $1,375K | $2,200K |
| Activation revenue (net of pilot credit) | $48K | $190K | $380K | $713K | $1,188K |
| Subscription revenue (recognized) | $75K | $485K | $1,605K | $3,920K | $8,155K |
| Audit Authority revenue | $0 | $0 | $164K | $353K | $668K |
| **Total Yggdrasil revenue** | **$288K** | **$1.12M** | **$2.92M** | **$6.36M** | **$12.21M** |
| | | | | | |
| Subscription ARR (EOY, full run-rate) | $150K | $820K | $2,390K | $5,450K | $10,860K |
| Audit Authority ARR (EOY) | $0 | $0 | $164K | $353K | $668K |
| **Recurring ARR (EOY)** | **$150K** | **$820K** | **$2.55M** | **$5.80M** | **$11.53M** |

Subscription revenue applies half-year averaging to the new-tenant cohort. Activation is recognized at signing (front-loaded) net of the $27.5K pilot conversion credit per new paid tenant. Audit Authority is recognized as recurring.

## Expenses

| | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 |
|---|---|---|---|---|---|
| Team size (FTE) | 1 | 2 | 5 | 10 | 18 |
| Payroll + benefits | $80K | $200K | $570K | $1.20M | $2.20M |
| Infrastructure | $5K | $15K | $50K | $130K | $260K |
| Sales & marketing | $10K | $40K | $120K | $250K | $450K |
| AI tooling | $3K | $5K | $10K | $20K | $35K |
| G&A | $5K | $20K | $60K | $120K | $200K |
| **Total expenses** | **$103K** | **$280K** | **$810K** | **$1.72M** | **$3.15M** |

Operating model is intentionally lean. Year 1 is solo founder with deferred comp; Year 2 adds first hire. AI-augmented engineering and operations consistently deliver output comparable to teams 2–3× our headcount.

## Profitability

| | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 |
|---|---|---|---|---|---|
| **Total revenue** | $288K | $1.12M | $2.92M | $6.36M | $12.21M |
| **Total expenses** | $103K | $280K | $810K | $1.72M | $3.15M |
| **Net income** | $185K | $835K | $2.11M | $4.64M | $9.06M |
| **Cumulative net** | $185K | $1.02M | $3.13M | $7.77M | $16.83M |
| **Net margin** | 64% | 75% | 72% | 73% | 74% |

Bootstrapped to profitability from Year 1. Net margins compress modestly in Y3 as we reinvest in the team to support the customer count ramp, then recover in Y4-Y5 as operational leverage compounds.

## Revenue Mix

| | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 |
|---|---|---|---|---|---|
| Pilot fees | 57% | 39% | 26% | 22% | 18% |
| Activation | 17% | 17% | 13% | 11% | 10% |
| Subscription | 26% | 44% | 55% | 62% | 67% |
| Audit Authority | 0% | 0% | 6% | 6% | 5% |
| **Recurring %** (sub + AA) | **26%** | **44%** | **61%** | **67%** | **72%** |

Revenue mix shifts toward recurring as the install base accumulates. Pilot fees and activation dominate in Y1-Y2 (the funnel-filling phase) and recede as a percentage as paying tenants compound. By Y5, recurring crosses 72% and continues climbing.

## Unit Economics

| Metric | Year 1 | Year 5 |
|---|---|---|
| Average annual subscription per paid tenant | $150K | $205K (blended across tiers) |
| Pilot CAC (per pilot sold) | ~$2K | ~$2K |
| Conversion CAC (per paid conversion) | ~$6K | ~$3K |
| First-year value per paid tenant (sub + activation, post-credits) | ~$150K | ~$250K |
| LTV (recurring only, at avg 1.5% annual churn from Y4) | $600K – $3M depending on tier | |
| LTV:CAC | 100× – 500× depending on tier | |
| Payback period | ~6 months on activation alone; ~12 months including subscription pro-rating | |

The Pilot Track itself is positive-margin: $55K pilot revenue against ~$12K delivery cost. This means the customer-acquisition motion *generates revenue* during the validation phase, which is unusual and a structural advantage over CAC-heavy SaaS comparables.

## Growth Trajectory

- **Year 1 (Validation):** 3 pilots, 1 conversion. Solo founder. $288K revenue, $185K net. Pilot funnel proves viable; first paying tenant validates Compliance Core fit.
- **Year 2 (First repeatable motion):** 8 pilots, 4 conversions. First Operational Core tenant lands. Team grows to 2. $1.12M revenue, $835K net.
- **Year 3 (Funnel maturity):** 14 pilots, 8 conversions. Audit Authority designations begin. First Regulated Enterprise tenant. Recurring crosses $2.55M ARR. $2.92M revenue, $2.11M net.
- **Year 4 (Compounding):** 25 pilots, 15 conversions. Operational Core becomes the dominant new-tenant tier. Recurring ARR $5.80M. $6.36M revenue, $4.64M net.
- **Year 5 (Scale validation):** 40 pilots, 25 conversions. First Portfolio/Strategic deal closes. 53 active tenants, $11.53M recurring ARR, $12.21M total revenue, $9.06M net. Cumulative earnings $16.83M, all bootstrapped. At 6–10× recurring ARR, implied valuation **$69M – $115M** at end of Y5.

## Sensitivity to Tier Mix

The tier mix assumption is the single largest driver of revenue at this stage. The model above assumes a conservative, CC-dominant funnel. Two adjacent scenarios:

| Scenario | Y5 Recurring ARR | Y5 Total Revenue |
|---|---|---|
| **Base (modeled)**: 55% CC / 34% OC / 9% RE / 2% Strategic at Y5 | $11.53M | $12.21M |
| **Mid case**: 40% CC / 40% OC / 15% RE / 5% Strategic | ~$17.3M | ~$18.3M |
| **Upside**: 30% CC / 45% OC / 18% RE / 7% Strategic | ~$22.1M | ~$23.4M |

Mid-case requires the Operational Core tier to displace Compliance Core as the dominant new-tenant size by Y3-Y4 — plausible if PE operating partner relationships materialize on plan. Upside requires a Portfolio/Strategic land-and-expand motion within an investor portfolio. We model the conservative case as base, treat mid as planning case, and reserve upside for opportunistic execution.

## Risk Factors

| Risk | Mitigation |
|---|---|
| Long mid-market sales cycles at higher per-tenant prices | Pilot Track ($55K) gives buyers a low-friction proof path; pilot revenue itself funds the funnel |
| Slower pilot conversion than modeled | Pilot revenue is positive-margin even without conversion; downside is delayed compounding, not loss |
| Tier mix slower to shift up | Modeled conservative case already CC-dominant; meaningful upside if mix shifts faster |
| Activation credit dilution as Ratatosk/Ragnarok funnel matures | Net activation realization will fall in later years — partially offset by larger gross activation on bigger tenants |
| Audit Authority warranty exposure | Capped per regime; designations gated on Mimir Labs engineering and legal sign-off; no regime accepted unless we can stand behind it |
| Customer concentration in Y2-Y3 | Single Strategic tenant could represent material % of revenue; diversification target ≥6 paying tenants by mid-Y2 |
| Churn at premium pricing | ERP is inherently sticky; deep workflow integration raises switching costs; activation investment is a structural retention lever |
