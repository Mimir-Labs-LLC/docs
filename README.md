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
- [Testing Manual](product/TESTING_MANUAL.md) -- Automated testing guide (Vitest, Catch2, integration tests, CI pipeline)

### Business
- [Market Analysis](business/MARKET_ANALYSIS.md) -- Target market, competition, SWOT
- [Pricing](business/PRICING.md) -- Module pricing and bundled tiers
- [Projections](business/PROJECTIONS.md) -- 5-year financial model
- [Costs](business/COSTS.md) -- Infrastructure and operating cost estimates

### Legal
- [SaaS Contract](legal/CONTRACT.md) -- Subscription agreement
- [EULA](legal/EULA.txt) -- End-User License Agreement
- [Terms of Service](legal/ToS.txt) / [Terms of Use](legal/ToU.txt)

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
