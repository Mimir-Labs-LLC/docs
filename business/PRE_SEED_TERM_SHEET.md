# Mimir Labs — Pre-Seed Term Sheet

**Confidential — Not a binding offer**
**Date:** July 2026

---

## Round Summary

| Term | Value |
|------|-------|
| **Instrument** | Priced equity (preferred stock) |
| **Raise amount** | $800,000 |
| **Pre-money valuation** | $7,200,000 |
| **Post-money valuation** | $8,000,000 |
| **Equity issued (base)** | 10.0% |
| **Performance warrants** | Up to 5.0% additional (see below) |
| **Maximum dilution** | 15.0% |
| **Minimum founder ownership post-close** | 85.0% |

---

## Use of Funds (18-Month Runway)

| Category | Allocation |
|----------|-----------|
| Founder compensation (18 mo @ $110K/yr) | $165,000 |
| Hire 1 — Sr. Backend Engineer (15 mo @ $140K/yr) | $175,000 |
| Hire 2 — Sr. Frontend Engineer (12 mo @ $145K/yr) | $145,000 |
| Hire 3 — Sales / BD Lead (base; commission from sales) | $65,000 |
| Infrastructure & tooling | $35,000 |
| Legal, IP & SOC 2 prep | $30,000 |
| SOC 2 Type I audit | $25,000 |
| Sales & marketing (trade shows, content, travel) | $70,000 |
| Service delivery (Ratatosk/Ragnarok) | $30,000 |
| Operating reserve | $60,000 |
| **Total** | **$800,000** |

Sales/BD commission is earned from sales revenue, not funded from the raise.

---

## Performance Warrants

### Structure

In addition to the 10% base equity, the investor may earn up to 5% additional equity through performance-based warrants tied to platform adoption by the investor's portfolio companies.

### Vesting Mechanic

For every **$100 million in annual revenue represented by portfolio companies** the investor brings to the Mimir Labs platform, the investor earns **0.1% additional equity**.

**Each qualifying agreement is a separate vesting event.** A single portco that signs multiple qualifying agreements (e.g., Ratatosk recurring governance, then Ragnarok annual maintenance, then Yggdrasil ERP subscription) counts its annual revenue toward the cumulative threshold **per agreement**. This rewards investors who drive full-platform adoption, not just single-product introductions.

**Example:** A portco with $100M annual revenue signs three qualifying agreements over 18 months. The investor receives $300M in cumulative vesting credit (3 × $100M), earning 0.3%.

| Cumulative Portco ARR Credit | Additional Equity Earned |
|------------------------------|-------------------------|
| $100M | 0.1% |
| $500M | 0.5% |
| $1B | 1.0% |
| $2B | 2.0% |
| $5B (cap) | 5.0% (maximum) |

### Definitions

- **"Portfolio company" (portco):** An entity in which the investor holds an equity or debt position at the time of introduction.
- **"Annual revenue represented":** The portco's trailing twelve-month revenue as reported at the time of platform contract execution. This is the portco's own business revenue, not the subscription fee they pay Mimir Labs.
- **"Brought to the platform":** A warm introduction, documented with the investor as referral source, that results in a **qualifying agreement** (defined below) executed within 12 months of introduction.
- **"Qualifying agreement":** A recurring or annualized service agreement with a **minimum annual contract value (ACV) of $10,000**. Qualifying agreements include:
  - Yggdrasil ERP subscription (any tier)
  - Bifrost subscription (any paid tier)
  - Norn subscription (Pro tier or above)
  - Ratatosk governance workshop series (recurring annual engagement, not a single one-time workshop)
  - Ragnarok migration engagement with annual maintenance/support component
  - Any other Mimir Labs service agreement with a recurring annual commitment of $10,000 or more
- **Non-qualifying engagements:** One-time Ratatosk workshops without a recurring commitment, Norn free tier usage, trial entitlements, and pilot agreements at discounted rates do not qualify on their own.
- **Upgrade provision:** A non-qualifying agreement that upgrades to or above the $10,000 ACV threshold within 24 months of initial execution qualifies retroactively. The investor receives vesting credit as of the upgrade date. This ensures that relationships the investor created which expand into meaningful platform commitments are properly credited.
- **Trigger event:** Warrant vesting credit accrues on the date the qualifying agreement is fully executed (signed by both parties), or on the date of qualifying upgrade if the upgrade provision applies. Credit does not accrue on the date of introduction or the date of first payment.

### Terms

- **Exercise window:** 5 years from close
- **Vesting is cumulative:** Multiple portcos aggregate toward thresholds
- **Cap:** 5.0% total additional equity regardless of cumulative portco ARR
- **Anti-dilution:** Warrants are exercisable at the original pre-money valuation ($7.2M) regardless of subsequent round pricing

### Anti-Gaming Provisions

- Introductions must be documented in writing (email to founder) before the portco's first engagement with Mimir Labs
- Portcos already in active pipeline at time of close do not qualify
- Investor must hold an equity or debt position in the portco at the time of introduction (not retroactive)
- Disputed attribution resolved by mutual agreement; if unresolved, introduction does not vest

---

## Negotiation Parameters

**Internal — do not share with investors.**

### What Moves

| Term | Opening | First Concession | Final Position |
|------|---------|-------------------|----------------|
| Warrant rate | 0.1% per $100M | 0.15% per $100M | 0.2% per $100M |
| ARR divisor | $100M | $75M | $50M |
| Exercise window | 5 years | 6 years | 7 years |

With per-agreement vesting, a PE firm with 5 portcos averaging $100M each, all walked through 3 products = $1.5B cumulative credit at opening terms (1.5% earned). At final position (0.2% per $50M): same scenario = 6% earned, capped at 5%. The per-agreement mechanic already makes the warrants substantially more achievable — move the rate and divisor only if the investor pushes hard on valuation.

### Floor Analysis

**Test scenario:** Active PE investor, 5 portcos at $75M avg, 2.5 agreements each = $937M cumulative credit.

| Rate | Divisor | Earned | Total Equity | Effective Valuation |
|------|---------|--------|-------------|-------------------|
| 0.1% | $100M | 0.9% | 10.9% | $4.59M |
| 0.2% | $100M | 1.9% | 11.9% | $4.20M |
| 0.2% | $75M | 2.5% | 12.5% | $4.00M |
| **0.2%** | **$50M** | **3.7%** | **13.7%** | **$3.65M** |
| 0.25% | $50M | 4.7% | 14.7% | $3.40M |

**Individual floors (if only one term moves):**
- Rate: **0.25% per $100M** — active investor earns 2.3%, total 12.3%. Safe.
- Divisor: **$50M at 0.1%** — active investor earns 1.9%, total 11.9%. Safe.

**Combined floor: 0.2% per $50M.** Active investor earns 3.7%, total 13.7%, effective valuation $3.65M. Above walkaway. The dilution is justified — they've delivered 5 manufacturing customers worth $500K+/year in platform revenue.

**Hard stop: Never cross 0.25% per $50M.** That puts the active investor at 4.7% earned, effectively guaranteeing they hit the 5% cap. Total 14.7%, effective valuation $3.40M — below walkaway threshold.

### What Doesn't Move

| Term | Position | Reason |
|------|----------|--------|
| Base equity | 10% | Preserves cap table for seed, Series A, option pool |
| Warrant cap | 5% | 85% minimum founder ownership post-raise is non-negotiable |
| Pre-money valuation | $7.2M | Working six-product platform in market, not a deck. If they want lower valuation, counter with warrant-rate flexibility. |
| Raise amount | $800K | Funds three hires plus an 18-month runway. Less compresses the hiring plan; materially more can't be productively deployed by a small team in 18 months. |

### Walkaway

If the investor demands more than 15% total (base + warrants) for $800K, or a pre-money valuation below $5.0M, walk. These terms would compress the cap table too early and signal desperation.

---

## Milestones (18-Month Targets)

These are operational targets, not contractual obligations. They define what success looks like at the end of the runway.

| Milestone | Target |
|-----------|--------|
| Ratatosk workshops completed | 3-5 |
| Named case studies on website | 2+ |
| Ragnarok migration engagements | 1-2 |
| Yggdrasil ERP pilots in production | 1 |
| Norn free tier users | 50+ |
| Norn paid conversions | 3-5 |
| ARR run rate | ~$500K |
| Team size | 2-3 FTE |

Achievement of these milestones positions the company for a seed round at $8-15M valuation.

---

## Investor Profile (Ideal)

The warrant structure is designed to attract a specific investor profile:

- **Manufacturing-focused PE firm or family office** with 10+ portcos in discrete/process manufacturing
- **Operating partner model** where the investor actively helps portcos with technology decisions
- **Geographic proximity to South Central PA** manufacturing corridor (preferred, not required)
- **Previous ERP or enterprise software investment experience**

A generalist fintech investor who writes a check and disappears gets 10%. A manufacturing-focused investor who actively channels their portfolio onto the platform can earn up to 15%. The structure rewards the investor who is most valuable to the business, not just the one with the largest check.

---
