# Mimir Labs — 5-Year Financial Projections

*Yggdrasil ERP | B2B SaaS for Mid-Market Manufacturing*

*Refactored April 2026 under Footprint Score pricing.*

---

## Market Positioning

Yggdrasil targets a gap in the manufacturing ERP market: companies too large for horizontal tools (Odoo, Zoho) but priced out of or underserved by legacy incumbents (Epicor, Infor, Syspro). All ten Business Modules are included in every subscription — the platform operates as one integrated system, not a bundle of optional add-ons — and our modern tech stack (C++/Qt desktop, Next.js web, PostgreSQL) delivers a faster, more intuitive experience than aging on-premise solutions. The structural differentiator is **ROPE** (Runtime Operational Policy Enforcement): the customer's operating model — rules, legal states and transitions, authority, exceptions — is governed inside the system and enforced at every state transition, which is also what makes the platform safe to automate with AI agents. This is the basis of the Footprint Score pricing: customers pay for the share of the enterprise brought under governed operational control.

## Pricing Model

Three independently-priced components:

```
Annual License = $75,000 + ($15,000 × Footprint Score)
```

| Footprint Score | Annual License | Activation | Band |
|---|---|---|---|
| 1 – 4 | $90K – $135K | $50K – $75K | Compliance Core |
| 5 – 11 | $150K – $240K | $60K – $90K | Operational Core |
| 12 – 26 | $255K – $465K | $90K – $150K | Regulated Enterprise |
| 27+ | $480K+ | $150K – $300K+ | Portfolio / Strategic |

Plus optional Audit Authority designations ($35K / yr per named regime, minimum) and the 120-day Pilot Track ($35K fixed, 33% conversion credit).

Full pricing logic at [business/PRICING.md](../../PRICING.md).

## Key Assumptions (Humble Beginnings)

| Assumption | Value |
|---|---|
| Sales motion | Pilot-first. Most paid tenants come through the 120-day Pilot Track funnel before signing annual. |
| Pilot-to-paid conversion rate | 33% Y1, ramping to 60% by Y4 as platform credibility builds |
| Tier mix progression (new cohorts) | CC-heavy early, gradually shifting up-tier as sales motion matures and PE/regulated accounts close |
| Subscription pro-rating | Half-year averaging applied to new tenants in their first year |
| Pilot conversion credit | $11,500 per converted tenant deducted from first-year subscription |
| Activation credit (Ratatosk + Ragnarok prior) | Modeled at zero in early years (most early customers come direct via pilot, not through full diagnostic-then-migration funnel). Captured implicitly in lower activation realization in later years as the pre-Yggdrasil services funnel matures. |
| Audit Authority attach rate | 0% Y1-Y2; 30% from Y3 onward; average 1.2 regimes per opted-in tenant at $15K/yr |
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
| Compliance Core | $100,000 | $60,000 |
| Operational Core | $190,000 | $80,000 |
| Regulated Enterprise | $330,000 | $110,000 |
| Portfolio / Strategic | $550,000 | $200,000 |

These are conservative mid-band figures under the $75K + $15K × Footprint Score model. Real customers will land at points within their tier ranges; the figures used here represent the conservative-to-typical case.

## Revenue

| | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 |
|---|---|---|---|---|---|
| Pilot revenue (Pilot Track) | $105K | $280K | $490K | $875K | $1,400K |
| Activation revenue (gross) | $60K | $260K | $570K | $1,100K | $1,940K |
| Subscription revenue (net of pilot credits) | $39K | $299K | $1,103K | $2,833K | $6,078K |
| Audit Authority revenue | $0 | $0 | $164K | $353K | $668K |
| **Total Yggdrasil revenue** | **$204K** | **$839K** | **$2.33M** | **$5.16M** | **$10.09M** |
| | | | | | |
| Subscription ARR (EOY, full run-rate) | $100K | $590K | $1,800K | $4,210K | $8,520K |
| Audit Authority ARR (EOY) | $0 | $0 | $164K | $353K | $668K |
| **Recurring ARR (EOY)** | **$100K** | **$590K** | **$1.96M** | **$4.56M** | **$9.19M** |

Subscription revenue applies half-year averaging to the new-tenant cohort and deducts the $11.5K pilot conversion credit per new paid tenant. Activation is recognized at signing (front-loaded). Audit Authority is recognized as recurring.

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
| **Total revenue** | $204K | $839K | $2.33M | $5.16M | $10.09M |
| **Total expenses** | $103K | $280K | $810K | $1.72M | $3.15M |
| **Net income** | $101K | $559K | $1.52M | $3.44M | $6.94M |
| **Cumulative net** | $101K | $660K | $2.18M | $5.62M | $12.56M |
| **Net margin** | 50% | 67% | 65% | 67% | 69% |

Bootstrapped to profitability from Year 1. Net margins compress modestly in Y3 as we reinvest in the team to support the customer count ramp, then recover in Y4-Y5 as operational leverage compounds.

## Revenue Mix

| | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 |
|---|---|---|---|---|---|
| Pilot fees | 51% | 33% | 21% | 17% | 14% |
| Activation | 29% | 31% | 24% | 21% | 19% |
| Subscription | 19% | 36% | 47% | 55% | 60% |
| Audit Authority | 0% | 0% | 7% | 7% | 7% |
| **Recurring %** (sub + AA) | **19%** | **36%** | **54%** | **62%** | **67%** |

Revenue mix shifts toward recurring as the install base accumulates. Pilot fees and activation dominate in Y1-Y2 (the funnel-filling phase) and recede as a percentage as paying tenants compound. By Y5, recurring crosses 67% and continues climbing.

## Unit Economics

| Metric | Year 1 | Year 5 |
|---|---|---|
| Average annual subscription per paid tenant | $100K | $161K (blended across tiers) |
| Pilot CAC (per pilot sold) | ~$2K | ~$2K |
| Conversion CAC (per paid conversion) | ~$6K | ~$3K |
| First-year value per paid tenant (sub + activation, post-credits) | ~$150K | ~$250K |
| LTV (recurring only, at avg 1.5% annual churn from Y4) | $600K – $3M depending on tier | |
| LTV:CAC | 100× – 500× depending on tier | |
| Payback period | ~6 months on activation alone; ~12 months including subscription pro-rating | |

The Pilot Track itself is positive-margin: $35K pilot revenue against ~$10K delivery cost. This means the customer-acquisition motion *generates revenue* during the validation phase, which is unusual and a structural advantage over CAC-heavy SaaS comparables.

## Growth Trajectory

- **Year 1 (Validation):** 3 pilots, 1 conversion. Solo founder. $204K revenue, $101K net. Pilot funnel proves viable; first paying tenant validates Compliance Core fit.
- **Year 2 (First repeatable motion):** 8 pilots, 4 conversions. First Operational Core tenant lands. Team grows to 2. $839K revenue, $559K net.
- **Year 3 (Funnel maturity):** 14 pilots, 8 conversions. Audit Authority designations begin. First Regulated Enterprise tenant. Recurring crosses $1.9M ARR. $2.33M revenue, $1.52M net.
- **Year 4 (Compounding):** 25 pilots, 15 conversions. Operational Core becomes the dominant new-tenant tier. Recurring ARR $4.56M. $5.16M revenue, $3.44M net.
- **Year 5 (Scale validation):** 40 pilots, 25 conversions. First Portfolio/Strategic deal closes. 53 active tenants, $9.19M recurring ARR, $10.09M total revenue, $6.94M net. Cumulative earnings $12.56M, all bootstrapped. At 6–10× recurring ARR, implied valuation **$55M – $92M** at end of Y5.

## Sensitivity to Tier Mix

The tier mix assumption is the single largest driver of revenue at this stage. The model above assumes a humble, CC-dominant funnel. Two adjacent scenarios:

| Scenario | Y5 Recurring ARR | Y5 Total Revenue |
|---|---|---|
| **Humble (modeled)**: 55% CC / 34% OC / 9% RE / 2% Strategic at Y5 | $9.19M | $10.09M |
| **Mid case**: 40% CC / 40% OC / 15% RE / 5% Strategic | ~$13.8M | ~$15.1M |
| **Upside**: 30% CC / 45% OC / 18% RE / 7% Strategic | ~$17.7M | ~$19.3M |

Mid-case requires the Operational Core tier to displace Compliance Core as the dominant new-tenant size by Y3-Y4 — plausible if PE operating partner relationships materialize on plan. Upside requires a Portfolio/Strategic land-and-expand motion within an investor portfolio. We model the humble case as base, treat mid as planning case, and reserve upside for opportunistic execution.

## Risk Factors

| Risk | Mitigation |
|---|---|
| Long mid-market sales cycles at higher per-tenant prices | Pilot Track ($35K) gives buyers a low-friction proof path; pilot revenue itself funds the funnel |
| Slower pilot conversion than modeled | Pilot revenue is positive-margin even without conversion; downside is delayed compounding, not loss |
| Tier mix slower to shift up | Modeled humble case already CC-dominant; meaningful upside if mix shifts faster |
| Activation credit dilution as Ratatosk/Ragnarok funnel matures | Net activation realization will fall in later years — partially offset by larger gross activation on bigger tenants |
| Audit Authority warranty exposure | Capped per regime; designations gated on Mimir Labs engineering and legal sign-off; no regime accepted unless we can stand behind it |
| Customer concentration in Y2-Y3 | Single Strategic tenant could represent material % of revenue; diversification target ≥6 paying tenants by mid-Y2 |
| Churn at premium pricing | ERP is inherently sticky; deep workflow integration raises switching costs; activation investment is a structural retention lever |
