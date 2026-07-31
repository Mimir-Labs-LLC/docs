# Mimir Labs — Derived Asset Value (DAV)

**Date:** July 31, 2026
**Classification:** Internal — fundraising and strategy reference
**Prepared from:** direct measurement of the yggdrasil, mimirlabs, and docs repositories; `COSTS.md`; `PROJECTIONS.md`; `PRE_SEED_TERM_SHEET.md`; product TODO readiness assessment (2026-03-15)

---

## Headline

> **DAV base case: ≈ $5.0M** (range **$4.0M – $6.0M**), derived as AI-adjusted replacement cost of the measured software estate ($3.5–5.0M) plus commissioned-equivalent value of the knowledge and commercial asset corpus ($0.5–1.0M).
>
> This is coherent with the two external anchors on file: it sits **above** the internal walkaway effective valuation ($3.65M) and **below** the negotiated pre-seed pre-money ($7.2M) — which is exactly where an asset-only figure should sit, since pre-money additionally prices the team, execution velocity, and option value that DAV deliberately excludes.

**What DAV is:** the value of what has actually been built, derived from measurable artifacts under stated methods. **What it is not:** a fair-market valuation, a price, or a negotiation position. It is the defensible floor story underneath the equity story.

---

## 1. Asset register (measured, July 31, 2026)

### 1.1 Software estate — 362,878 product lines measured

| Asset | Lines | Files | Notes |
|---|---:|---:|---|
| Yggdrasil server (C++17/Qt 6) | 93,931 | 303 | 10 business modules, ROPE runtime policy engine, state-constraint engine, auth/RBAC, cache, metrics |
| Yggdrasil desktop client (Qt Widgets/QML) | 49,934 | 98 | Reference implementation, all modules |
| Yggdrasil web app (Next.js 15/TS strict) | 66,440 | 282 | Full module parity target, admin + OPE surfaces |
| Common layer (Repository, B2BEventHub) | 8,914 | 26 | Shared server/client data + event layer |
| Database schema (PostgreSQL) | 31,503 | 1 | 323 tables, 800+ indexes, multi-tenant, correction-status machinery, no-DELETE design |
| Ratatosk (governance analysis) | 31,074 | 116 | Zero-knowledge discovery incl. OLE2/VBA extraction + pattern recognition |
| Jormungandr (drift & contract compliance) | 22,011 | 134 | Canon/policy drift detection, policy library export |
| Bifrost (integration engine) | 12,610 | 73 | CDC listeners, routing, conflict resolution, ROPE consultation |
| Ragnarok (migration tool) | 11,756 | 71 | Ontology-to-ontology migration, reversible staging, 12 engine components |
| Heimdall (tenant operations) | 5,355 | 81 | Cross-tenant policy migration tooling |
| mimirlabs.net portal (Next.js 14 + Prisma) | 29,350 | — | Marketing site, portal, checkout (Square), contracts (BoldSign), event streaming |
| **Product subtotal** | **362,878** | **~1,185** | |
| Test estate (Catch2 + Vitest + 161 story files, 20 arcs) | 25,693 | 205 | Story-driven integration coverage of business processes |
| **Total measured** | **388,571** | **~1,390** | |

*Excluded from measurement:* Norn (separate repo, not in this workspace — its 5-year projection line reaches $5.76M ARR, so its inclusion would raise DAV), the `agent-mcp` and `manifest` tools (small), and all VPS/runtime configuration. Exclusions make this register conservative.

### 1.2 Knowledge & IP corpus

- **Mimisbrunnr** universal semantic reference model + schema map — the canon underlying all five tools
- **13 technical whitepapers** (platform, server, client, web, database, Mimisbrunnr, security, Ragnarok, Ratatosk, Bifrost, Jormungandr, ROPE, policy-bundle wire format)
- **Two research papers** (*The Missing Layer in Enterprise AI Readiness*, working paper; *Governing Reasoning Before Execution* / ROPE-N position paper)
- **EERI 2026** — 32-page, 11-vendor, 30-condition benchmark + interactive instrument + machine-readable matrix + plain-language executive brief (a category-defining asset: it names the market Mimir Labs leads)
- **13 Bifrost integration playbooks** (SAP ECC, Salesforce, NetSuite, Dynamics, Business Central, Epicor, Infor, Acumatica, Sage 100, QuickBooks, Oracle EBS, Teamcenter, Yggdrasil)
- **Portable policy bundle format** — specified wire format with three shipped implementations (Yggdrasil import/export, Jormungandr export, Heimdall cross-tenant migration); a potential interchange standard
- **Due-diligence pack** (DD-00 through DD-05) + populated data room

### 1.3 Commercial infrastructure

Pricing architecture (governed-operating-footprint formula, published), CONTRACT/LOI templates with the validation-cohort price lock, 5-year financial projections, pre-seed term-sheet structure with PE warrant mechanics, sales collateral (demo scripts, one-pagers, objection handling, outreach command center).

---

## 2. Derivation — three lenses

### Lens A — Cost basis (rejected as the measure; reported for honesty)

Cash costs are negligible by design: central infrastructure runs ≈ **$26/month** (Hetzner + Cloudflare), tooling is minimal, and there is no payroll. Book cost is essentially founder time plus well under $100K of cumulative cash. Cost basis is the wrong lens for AI-era solo development — it measures burn, not asset — but it establishes that DAV is not a recovery-of-costs number. **Floor: < $0.5M.**

### Lens B — Replacement cost (the core of DAV)

**B1. Traditional-team upper bound.** COCOMO II (organic) on 363 KLOC of product code yields ~1,100–1,200 person-months (~95 person-years); at a $180K loaded rate that is **$15–17M**, before the test estate. Discounting ~30% for requirements knowledge that now exists (the schema, state machines, and manifests are themselves the spec) gives a **traditional replacement bound of $11–13M**. This is reported as a bound, not claimed as DAV — no rational actor would rebuild this the traditional way in 2026.

**B2. AI-adjusted informed rebuild (used).** Assume a competent team rebuilding *with* current AI tooling *and* access to the design artifacts: 4–6× productivity on breadth code (module CRUD, UI surfaces, portal), materially less acceleration on the load-bearing engine work (ROPE, constraint evaluator, VBA extraction chain, mapping engines, 323-table schema design, event architecture). Effective effort: **20–28 person-years → $3.5–5.0M** at $180K loaded. The spread between B1 and B2 is not lost value — it is the value of the design knowledge already embodied in the artifacts, which is why B2 is only possible for someone who has them.

**B3. Knowledge & commercial corpus at commissioned-equivalent rates.**

| Asset class | Basis | Value |
|---|---|---:|
| Research corpus (13 whitepapers, 2 papers, EERI + instrument + brief, DD pack) | Analyst/consulting commissioning equivalent | $250–500K |
| Integration playbooks | 13 × $15–25K engineering-research equivalent | $200–325K |
| Commercial infrastructure (pricing, contracts, projections, collateral) | Advisory/legal drafting equivalent | $75–150K |
| **Subtotal** | | **$0.5–1.0M** |

**Replacement-cost DAV: $4.0–6.0M** (B2 + B3).

### Lens C — Market calibration (coherence check)

- Negotiated pre-seed terms on file: **$7.2M pre-money / $8.0M post** — prices assets **plus** team, velocity, and option value.
- Internal walkaway effective valuation: **$3.65M** — the floor at which dilution mechanics were judged still acceptable.
- Pre-seed enterprise-infrastructure rounds in the current market cluster at $5–9M pre-money for teams with working product and no revenue.

An asset-only figure belonging strictly between the walkaway floor and the pre-money — $4–6M — is exactly what Lens B derives independently. The two lenses agreeing is the reason to believe the number.

### Income lens — noted, not used

Year-1 projected revenue across products is modest (≈ $90–100K ex-Yggdrasil-platform, per `PROJECTIONS.md`) and no production customer exists yet; an income approach is premature and would understate the asset. The validation-cohort LOIs (price-locked at prior rates) evidence demand for the tools whose replacement cost Lens B carries.

---

## 3. DAV statement

| | Low | **Base** | High |
|---|---:|---:|---:|
| Software estate (AI-adjusted replacement) | $3.5M | **$4.2M** | $5.0M |
| Knowledge & commercial corpus | $0.5M | **$0.8M** | $1.0M |
| **Derived Asset Value** | **$4.0M** | **≈ $5.0M** | **$6.0M** |

**Relationship to the equity story:** pre-money $7.2M ≈ DAV base × 1.4 — the premium is the founder, the velocity (this asset base was built at ~$26/month of infrastructure), and the category option (EERI/authoritative execution governance). That framing turns DAV into a fundraising asset itself: *"the assets alone underwrite most of the valuation; the round prices the trajectory."*

---

## 4. Discounts already applied, and what would move DAV

**Embedded discounts (named, not hidden):** single-founder key-person risk and AI-generated-code review debt are absorbed in the conservative end of the B2 productivity assumption; pre-production status (EERI's 20/20 execution scores are architectural, pending production validation; product TODO self-assesses ~75% pilot-ready) is why B2, not B1, is the operative lens; no SOC 2 attestation yet; Norn excluded entirely.

**Catalysts that re-derive DAV upward (next 2–3 quarters):**
1. **First production reference** — converts architectural scores to demonstrated ones; largest single step-change.
2. **EERI empirical test suite published and passed** — makes the differentiated asset class (execution governance) externally verifiable.
3. **SOC 2 Type I** — unlocks regulated-buyer pipeline the pricing model targets.
4. **Playbook inventory growth** — each governed playbook adds directly at commissioned-equivalent value.
5. **Norn measurement and inclusion** — currently a zero in this register against a projected $5.76M Year-5 ARR line.

**Method notes.** Line counts measured directly from the repositories on July 31, 2026 (excluding `node_modules`, build artifacts, and vendored code). COCOMO II organic-mode parameters; $180K fully-loaded engineer-year. Commissioned-equivalent rates from current analyst/consulting market norms. All ranges are stated so a skeptical reader can substitute their own parameters — the arithmetic is reproducible from the register in §1.
