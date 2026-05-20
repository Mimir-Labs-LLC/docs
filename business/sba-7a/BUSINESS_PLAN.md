# Mimir Labs LLC — Business Plan

**Prepared for SBA 7(a) Loan Application**
**April 2026**

---

## 1. Company Overview

**Legal Name:** Mimir Labs LLC
**Structure:** Single-member LLC (Pennsylvania)
**Founder:** Christopher Gaither
**Location:** South Central Pennsylvania
**Industry:** Enterprise Software (Manufacturing ERP, Data Governance)
**Website:** mimirlabs.net
**NAICS:** 511210 (Software Publishers)

Mimir Labs builds data infrastructure software for small and mid-market manufacturers. The company's products help manufacturers organize, govern, migrate, and integrate the operational data that drives their business, replacing fragmented legacy systems with a unified, semantically consistent data platform.

---

## 2. Problem

The enterprise resource planning (ERP) market generates over $10 billion annually in the manufacturing sector alone, growing at 8-10% CAGR. Despite this spending, implementation failure rates remain persistently high: 56% of ERP implementations experience cost overruns, and fewer than 30% deliver full intended functionality (Panorama Consulting, 2023; Standish Group, 2020).

Small and mid-market manufacturers (10-500 employees) face a particularly acute version of this problem:

- **Enterprise solutions** (SAP, Oracle) cost $250K+ to implement, require 12-24 months, and demand dedicated IT staff to operate.
- **Mid-market incumbents** (Epicor, Sage, Infor) run on aging technology stacks with expensive upgrade paths and limited integration capabilities.
- **Lightweight tools** (MRPeasy, Katana, Fishbowl) lack the depth required for serious manufacturing operations: no PLM, limited quality management, no engineering change control.

The result: mid-market manufacturers either overspend on systems they can't fully utilize, or underinvest in systems they quickly outgrow. In both cases, critical operational data ends up fragmented across spreadsheets, personal databases, and shadow systems that no ERP vendor acknowledges.

---

## 3. Solution

Mimir Labs addresses this problem through five products that form a complete data platform:

### Norn — Contract Intelligence (SaaS)
AI-assisted contract analysis tool for manufacturing agreements. Self-serve SaaS model with free, Pro ($99/mo), Business ($399/mo), and Enterprise ($1,499/mo) tiers. Serves as the low-friction entry point to the Mimir Labs platform.

**Status:** Deployed, pilot infrastructure live.

### Ratatosk — Data Governance Engine (Services)
Deterministic data governance tool that analyzes database schemas, surfaces semantic conflicts, maps data lineage, and produces actionable governance artifacts. Delivered as a professional services engagement ($5,000-$12,500 per workshop).

**Status:** Desktop application built, governance chatbot operational.

### Ragnarok — Data Migration Tool (Services)
Target-agnostic data migration engine with 170-table domain classification, semantic matching, and topological sort for dependency-safe ingestion. Delivered as a professional services engagement ($15,000-$75,000 per migration).

**Status:** Desktop application built, 12 engine components operational.

### Bifrost — Integration Engine (SaaS)
Real-time integration platform connecting disparate ERP systems through a canonical semantic model. Subscription pricing ($2,000-$5,000/mo) with 13 pre-built integration playbooks for major ERP vendors.

**Status:** Desktop application built, playbook library complete.

### Yggdrasil ERP — Manufacturing ERP (SaaS + Implementation)
Comprehensive 10-module ERP system for discrete and mixed-mode manufacturers. Includes CRM, Sales, Purchasing, Manufacturing, Warehouse, Finance, Projects, PLM, Quality, and Service modules. Subscription pricing ($500-$4,800/mo) plus one-time implementation fees ($6,000-$25,000).

**Status:** C++ server, Qt desktop client, and Next.js web application built. 101 database tables, 150+ API endpoints, 10 business modules operational. Pre-production.

### Mimisbrunnr — Universal Semantic Reference Model
A 166-table reference model spanning 17 business domains that serves as the shared vocabulary for all Mimir Labs products. Mimisbrunnr enables semantic interoperability across tools and customer engagements without requiring Yggdrasil as the target system.

---

## 4. Revenue Model

Mimir Labs generates revenue through two business models:

**Recurring SaaS Revenue (target: 74% of revenue by Year 5)**
- Norn subscriptions (self-serve, credit card)
- Bifrost subscriptions (sales-assisted)
- Yggdrasil ERP subscriptions (enterprise sales)

**Professional Services Revenue (target: 26% of revenue by Year 5)**
- Ratatosk governance workshops
- Ragnarok data migrations
- Yggdrasil ERP implementation services

The business starts services-heavy and shifts to SaaS-dominant as the installed base grows. Services engagements serve dual purpose: they generate immediate revenue and create the relationships that drive SaaS adoption.

### Pricing Summary

| Product | Model | Price Range |
|---------|-------|-------------|
| Norn | SaaS | Free - $1,499/mo |
| Ratatosk | Services | $5,000 - $12,500/engagement |
| Ragnarok | Services | $15,000 - $75,000/engagement |
| Bifrost | SaaS | $2,000 - $5,000/mo |
| Yggdrasil ERP | SaaS + implementation | $500 - $4,800/mo + $6K-$25K impl |

### Bundle Pricing

| Bundle | Price | Contents |
|--------|-------|----------|
| Ratatosk + Ragnarok Standard | $20,000 | Governance + migration (up to 50 tables) |
| Ratatosk + Ragnarok Complex | $42,000 | Governance + migration (50-200 tables) |
| Ratatosk + Ragnarok Enterprise | $82,000 | Governance + enterprise migration (200+) |

---

## 5. Go-to-Market Strategy

| Phase | Timeline | Lead Product | Expansion Path |
|-------|----------|-------------|----------------|
| Wedge | Now - Q4 2026 | Norn (self-serve) | Standalone value, no IT approval needed |
| Services | Q3 2026 - Q2 2027 | Ratatosk workshops | Governance findings reveal migration needs |
| Platform | Q1 2027 - Q4 2027 | Ragnarok + Bifrost | Migration and integration from governance |
| ERP | Q3 2027+ | Yggdrasil ERP | Full platform for net-new ERP customers |

### Sales Channels

1. **Direct self-serve** — Norn free tier drives paid conversion (no sales team required)
2. **Consultative sales** — Ratatosk and Ragnarok workshops sold directly to manufacturing decision-makers
3. **Channel partnerships** — Manufacturing Extension Partnerships (MEPs), regional ERP implementation partners, M&A integration specialists
4. **Content marketing** — Technical publications, industry essays, conference presentations

### Target Customer Profile

- Discrete or mixed-mode manufacturer
- 10-500 employees
- $5M-$250M annual revenue
- Operating on legacy ERP (Epicor, Sage, Made2Manage) or outgrowing lightweight tools
- Located in a manufacturing-dense region (PA, OH, IN, MI, WI, TX, NC)

---

## 6. Competitive Advantage

1. **Mimisbrunnr reference model** — A pre-built 166-table canonical vocabulary that eliminates the per-customer ontology build required by competitors. No other vendor offers a universal semantic reference model for manufacturing.

2. **Workshop-to-platform pipeline** — Ratatosk workshops produce a manifest that provisions Bifrost integration and informs Ragnarok migration. The diagnostic engagement naturally leads to the remediation product. Each product sells the next.

3. **Desktop-first architecture** — Native Qt 6 desktop applications for power users (warehouse operators, production planners, shop floor), complemented by web access. Competitors offer web-only interfaces that sacrifice performance for convenience.

4. **No per-user licensing** — Flat-rate pricing eliminates the cost anxiety that prevents manufacturers from giving all employees appropriate system access. Competitors charge $50-200/user/month.

5. **Self-hosted option** — Manufacturers in regulated industries (defense, medical devices, food safety) can deploy on-premise for data sovereignty. Cloud and self-hosted from the same codebase.

6. **Integrated PLM** — Native product lifecycle management with engineering BOMs, manufacturing BOMs, option groups, ECRs/ECOs, and engineering change control. Most mid-market competitors require separate PLM software.

---

## 7. Financial Summary

*(Detailed projections in PROJECTIONS.md)*

| | Year 1 | Year 2 | Year 3 | Year 4 | Year 5 |
|---|--------|--------|--------|--------|--------|
| Total revenue | $92K | $721K | $2.73M | $7.25M | $15.4M |
| Total expenses | $115K | $553K | $1.30M | $2.49M | $4.00M |
| Net income | ($23K) | $168K | $1.43M | $4.76M | $11.4M |
| Net margin | (25%) | 23% | 52% | 66% | 74% |
| Recurring ARR | $40K | $384K | $1.68M | $4.96M | $11.4M |
| Team size | 1 | 3 | 7 | 14 | 22 |

Cash-flow positive in Year 2. The business is self-sustaining before the loan's principal repayment period becomes material.

---

## 8. Management

**Christopher Gaither — Founder & CEO**

Full qualifications detailed in `OWNER_QUALIFICATIONS.md`. Summary:

- Enterprise software development and data architecture experience
- Domain expertise in manufacturing operations, ERP systems, and data governance
- Built the entire Mimir Labs product suite (5 applications, 6 codebases) from first commit (February 16, 2026) to current state in 8 weeks
- CMMC Level 1 self-attested for defense manufacturing compliance readiness
- Located in South Central Pennsylvania's manufacturing corridor

---

## 9. Risk Factors and Mitigations

| Risk | Severity | Mitigation |
|------|----------|------------|
| Pre-revenue business | High | SaaS metrics are projections; services revenue (Ratatosk workshops) can begin immediately with minimal additional investment. Loan proceeds accelerate the timeline to first revenue, not fund speculative R&D — the products are built. |
| Solo founder | High | First hire funded by loan proceeds. Product architecture documented; bus factor addressed by Year 2 team expansion. |
| Long ERP sales cycle | Medium | ERP is Phase 4 (Q3 2027+). Norn and services revenue fund the business before ERP revenue matters. Loan repayment is not dependent on ERP sales. |
| Competitive market | Medium | Mid-market manufacturing ERP incumbents have aging technology stacks and 56% implementation failure rates. The gap is well-documented and growing. |
| Technology risk | Low | Products are built and operational. This is not a loan to fund development — it is a loan to fund go-to-market for working software. |

---

## 10. Loan Request Summary

| Item | Value |
|------|-------|
| Loan amount requested | $150,000 - $350,000 |
| Loan type | SBA 7(a) |
| Term | 10 years |
| Purpose | Working capital, equipment, first hire, go-to-market |
| Collateral | Business assets + personal guarantee |

Detailed use of proceeds in `USE_OF_PROCEEDS.md`.

---

*Mimir Labs LLC — South Central Pennsylvania*
*mimirlabs.net*
