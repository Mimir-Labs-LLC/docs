# Mimir Labs -- Documentation

Central documentation repository for Mimir Labs and the Yggdrasil ERP platform.

---

## Repository Structure

```
docs/
├── onboarding/          New team member onboarding package
├── product/             Product documentation (features, roadmap, compliance)
├── business/            Business docs (market analysis, pricing, projections, costs)
├── legal/               Legal agreements and templates (contracts, NDAs, EULA, ToS)
├── sales/               Sales and marketing materials (demos, pitches, trade shows)
├── due-diligence/       Technical due diligence document set
└── research/            Research papers and whitepapers
```

---

## Quick Links

### New here? Start with the onboarding package:
**[onboarding/README.md](onboarding/README.md)** -- Checklist and reading order for new team members

### Product
- [Features](product/FEATURES.md) -- Feature inventory by implementation status
- [Roadmap](product/ROADMAP.md) -- 5-phase product roadmap (current through 2027+)
- [SOC 2 Roadmap](product/SOC2_ROADMAP.md) -- Compliance path to Type I/II attestation

### Business
- [Market Analysis](business/MARKET_ANALYSIS.md) -- Target market, competition, SWOT
- [Pricing](business/PRICING.md) -- Module pricing and bundled tiers
- [Projections](business/PROJECTIONS.md) -- 5-year financial model
- [Costs](business/COSTS.md) -- Infrastructure and operating cost estimates

### Legal
- [SaaS Contract](legal/CONTRACT.md) -- Subscription agreement
- [EULA](legal/EULA.txt) -- End-User License Agreement
- [Terms of Service](legal/ToS.txt) / [Terms of Use](legal/ToU.txt)

### Due Diligence
- [DD Index](due-diligence/DD-00-INDEX.md) -- Document set overview and reading order
- [DD-01: System Identity](due-diligence/DD-01-SYSTEM-IDENTITY.md) -- What the system is and is not
- [DD-02: Architecture & Trust](due-diligence/DD-02-ARCHITECTURE-AND-TRUST.md) -- Technical architecture and trust boundaries
- [DD-03: Data Custody](due-diligence/DD-03-DATA-CUSTODY-AND-AUDITABILITY.md) -- Data ownership, mutability, and audit trail
- [DD-04: Failure Modes](due-diligence/DD-04-FAILURE-MODES.md) -- Infrastructure, data, and trust failures
- [DD-05: Maturity & Risk](due-diligence/DD-05-MATURITY-AND-RISK.md) -- Honest gap analysis and production readiness

### Sales
- [Demo Script](sales/Full%20Demo%20Script) -- Full platform walkthrough
- [Trade Show Presentation](sales/Trade%20show%20presentation) -- Pitch script
- [2026 Validation Cohort](sales/2026%20Validation%20Cohort) -- Charter member program

---

## Related Repository

The main codebase lives in the **yggdrasil** repository, which contains:
- C++ backend server (Qt 6)
- Qt 6 desktop client
- Next.js 15 web application
- PostgreSQL schema and migrations
- Infrastructure and deployment configs
- CI/CD pipeline
- Integration and unit tests
- Compliance policies (`docs/policies/`)

See `CLAUDE.md` in the yggdrasil repo for the authoritative development guide.
