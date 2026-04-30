# Yggdrasil ERP — Pricing

*Mimir Labs | Truth-First ERP for Manufacturing*

---

## Positioning

> Yggdrasil is licensed by **governed operating footprint** — the portion of your enterprise brought under deterministic state, canonical data governance, and audit-ready operational control. **Not by seat. Not by module.**

Every subscription includes all ten Business Modules, unlimited users, the full B2B Event Hub, the canonical state engine, the append-only audit log, and the standard SLA. The price reflects the scope of operations brought under the platform — nothing else.

---

## The Formula

Yggdrasil pricing has three independently-priced components.

### 1. Annual Platform License

```
Annual License = $30,000 + ($10,000 × Footprint Score)
```

The Footprint Score is the sum of seven verifiable inputs that measure the actual operational scope under Yggdrasil's governance.

| Input | Points |
|---|---|
| **Physical sites** | 1 point per site (1st included) |
| **Legal entities** | 1 point per entity beyond the first |
| **Integrated systems** | First 3 included. 1 point per additional system up to 8; 1 point per pair thereafter (Bifrost-connected, replaced at cutover, or B2B counterparty using the event hub) |
| **Annual governed transitions** | < 50K = 0 / 50K–500K = **2** / 500K–2M = **4** / 2M–10M = **7** / 10M+ = **10+** |
| **Compliance posture** | Ordinary commercial = 0 / ISO 9001/AS9100/ISO 13485 = **2** / CMMC L2 or defense-adjacent = **3** / FDA, CMMC L3, aerospace prime = **4** |
| **SLA tier** | Standard (99.5% / business-hours) = 0 / Critical (99.9% / 24×7 P1) = **2** / Mission-Critical (99.95% / 24×7 P1+P2, RTO committed) = **4** |
| **Audit retention depth** | 3 years online = 0 / 7 years = **1** / 10 years = **2** / Indefinite = **3** |

### 2. Activation Fee

```
Activation = $25,000 + ($5,000–$15,000 per source system migrated at cutover)
            + ($15,000 per additional site beyond first)
            + ($15,000–$40,000 for heavy compliance documentation)
```

Activation covers canonical model setup, tenant configuration, governance boundary definition, role design, initial workflows, migration planning, and validation testing. Ratatosk and Ragnarok engagements paid prior are credited 1:1 against activation.

Standard deployment range: **$25K – $75K**. Migration-heavy or multi-site deployments: **$75K – $200K+**.

### 3. Audit Authority (Optional)

Each Audit Authority designation makes Yggdrasil the contractually warranted system of record for one named compliance regime. Mimir Labs commits to audit-readiness for the designation and accepts capped warranty exposure if a finding traces to a Yggdrasil failure.

| Designation | Annual fee | Warranty cap |
|---|---|---|
| 1st regime | Included with Footprint Score ≥ 10 | $50K |
| Each additional regime, 2nd–3rd | $15K / yr | +$50K each |
| Each additional regime, 4th+ | $25K / yr | +$100K each |

Eligible regimes: ISO 9001, AS9100, ISO 13485, ITAR, FDA 21 CFR Part 11, CMMC L2/L3, SOC 2, SOX, HIPAA. Each requires Mimir Labs engineering and legal sign-off before designation.

---

## Bands (How the Formula Looks From the Outside)

The formula produces these ranges. Bands are descriptive, not prescriptive — the price is what the formula produces, not what the band suggests.

| Footprint Score | Annual License | Band | Profile |
|---|---|---|---|
| 1 – 4 | $40K – $70K | **Compliance Core** | Single-site, controlled scope, audit-integrity-first |
| 5 – 11 | $80K – $140K | **Operational Core** | Single-site or small multi-site, full operational running |
| 12 – 26 | $150K – $290K | **Regulated Enterprise** | Multi-site, heavier integrations, CMMC/FDA/aerospace posture |
| 27+ | $300K+ | **Portfolio / Strategic** | PE rollup, multi-entity, OEM/SI partnership |

---

## Worked Examples

**Example A — Single-site ISO manufacturer, light scope.**
1 site (1) + 1 entity (0) + 4 integrations (1) + 200K transitions (2) + ISO (2) + Standard SLA (0) + 7-year retention (1) = **Score 7**
→ $30K + (7 × $10K) = **$100K / yr** (Operational Core)

**Example B — Three-plant aerospace supplier.**
3 sites (3) + 2 entities (1) + 9 integrations (4) + 1.5M transitions (4) + AS9100+CMMC L2 (5, taking the higher) + Critical SLA (2) + 10-year retention (2) = **Score 21**
→ $30K + (21 × $10K) = **$240K / yr** (Regulated Enterprise)

**Example C — PE portfolio, six-entity manufacturing rollup.**
Score will land north of 30. Skip the formula; run a Strategic conversation.

---

## 120-Day Pilot Track

For validation/proof engagements that need to clear without a full procurement cycle.

| Component | Value |
|---|---|
| Pilot activation | **$15,000** (flat) |
| Monthly subscription, 4 months | **$5,000 / mo** |
| Total pilot contract | **$35,000** |
| Conversion credit (signing annual within 90 days of pilot end) | **33% of pilot fees ($11,500) credited to first annual license** |

Low enough friction to clear without a board cycle. High enough that no one mistakes Yggdrasil for cheap tooling.

---

## Validation Cohort

Yggdrasil is currently in pre-release. We are selecting a small group of manufacturing companies to run the platform before general availability.

Cohort members get:

- Direct access to the people who built the platform
- **Locked-in cohort pricing for the life of the subscription**
- Real-world workflows that shape the final product

We are selecting for fit, not volume.

---

## Why This Pricing Model

- **Mathematically honest.** Every dollar maps to a verifiable customer input. No inflated tiers, no hidden levers, no per-seat surprises.
- **Defensible in procurement.** A CFO can take the formula apart and reproduce it. There is nothing dressed up to begin with.
- **Architecturally consistent.** The pricing logic mirrors what Yggdrasil actually charges Mimir Labs to deliver — more sites, integrations, throughput, and SLA all carry real engineering cost.
- **No perverse incentives.** No reason to restrict access (no per-seat fees), no reason to fragment the customer's view of an integrated platform (no per-module fees).
- **Scope-aligned expansion.** Customers pay more when their *use* grows — another plant, another entity, more transactions, tighter SLA — not when they enable a feature or hire two more people.
- **Audit liability internalized.** When customers pay for Audit Authority, Mimir Labs takes on capped remediation exposure. We charge for the value we stand behind.

---

## Why We Don't Customize

Custom fields are where ERP trust goes to die. Every custom field creates a fork. The fork has to be maintained through every upgrade, validated in every audit, accounted for in every integration, and explained to every new hire. **One custom field can cost an organization roughly $165,000 over five years** when the upgrade friction, audit overhead, integration rework, and slow erosion of data trust are accounted for.

Yggdrasil has no custom fields. No bespoke logic. No per-tenant code paths.

Every tenant runs the same data model, the same validation rules, the same API contracts. If a data point is useful, it becomes part of the shared platform for everyone. If it is not useful enough to be universal, it does not belong in the system.

---

*Pricing model effective April 2026. Calculator available at [mimirlabs.net/yggdrasil#pricing](https://mimirlabs.net/yggdrasil#pricing).*
