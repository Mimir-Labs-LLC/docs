# Mimir Labs -- New Team Member Onboarding

Welcome to Mimir Labs. This package will get you up to speed on the company, the product, and our development practices.

---

## Reading Order

Work through these documents in order. Each builds on the previous one.

| # | Document | What You'll Learn | Est. Time |
|---|----------|-------------------|-----------|
| 1 | [Welcome & Company Overview](01-welcome.md) | Who we are, what Yggdrasil is, target market, business model, roadmap | 15 min |
| 2 | [Architecture Overview](02-architecture.md) | System architecture, tech stack, deployment topology, key concepts | 20 min |
| 3 | [Development Environment Setup](03-dev-environment.md) | Prerequisites, repo setup, database, building/running all components | 60 min |
| 4 | [Development Workflow & Standards](04-development-workflow.md) | Git conventions, versioning, CI/CD, code standards, testing | 15 min |
| 5 | [Business Module Reference](05-modules.md) | All 11 modules, their entities, workflows, and cross-module links | 20 min |
| 6 | [Key Resources](06-key-resources.md) | Directory of every important document and file across both repos | Reference |

---

## First-Week Checklist

### Day 1 -- Context

- [ ] Read [01-welcome.md](01-welcome.md) -- Company overview, product, and business model
- [ ] Read [02-architecture.md](02-architecture.md) -- System architecture and tech stack
- [ ] Sign your NDA / equity agreement (see [legal/](../legal/))
- [ ] Get access to the GitHub repositories (yggdrasil + docs)

### Day 2 -- Environment

- [ ] Follow [03-dev-environment.md](03-dev-environment.md) to set up your local environment
- [ ] Verify the server starts and responds on port 8080
- [ ] Verify the web app loads at localhost:3000
- [ ] Run the build verification script (`./verify_build.sh`)

### Day 3 -- Workflow

- [ ] Read [04-development-workflow.md](04-development-workflow.md) -- Git, versioning, CI/CD, testing
- [ ] Read `CLAUDE.md` in the yggdrasil repo (the authoritative dev guide)
- [ ] Run the web app linter and type checker (`npm run lint && npm run type-check`)
- [ ] Run the unit tests (`npm test` in web-app, `ctest` in server/build)

### Day 4 -- Product

- [ ] Read [05-modules.md](05-modules.md) -- Business module reference
- [ ] Explore the desktop client -- click through each module
- [ ] Explore the web application -- navigate the module pages
- [ ] Browse the database schema (`database/schema/yggdrasil_complete_schema.sql`)

### Day 5 -- Deep Dive

- [ ] Read [product/ROADMAP.md](../product/ROADMAP.md) -- Where we're headed
- [ ] Read [product/FEATURES.md](../product/FEATURES.md) -- What's built, in progress, and planned
- [ ] Read `TODO.md` in the yggdrasil repo -- Current blockers and priorities
- [ ] Run the integration test suite (`cd tests && npm test`)
- [ ] Review [06-key-resources.md](06-key-resources.md) and bookmark what's relevant to your role

---

## Deeper Reading (As Needed)

Depending on your role, these documents provide additional depth:

### Engineering
- `yggdrasil/CLAUDE.md` -- Full development reference
- `yggdrasil/IMPLEMENTATION_GUIDE.md` -- Deployment architecture and containerization
- `yggdrasil/docs/TESTING_MANUAL.md` -- Testing methodology
- `yggdrasil/docs/policies/` -- SOC 2 compliance policies (10 documents)
- [product/SOC2_ROADMAP.md](../product/SOC2_ROADMAP.md) -- Security and compliance roadmap

### Business / Sales
- [business/MARKET_ANALYSIS.md](../business/MARKET_ANALYSIS.md) -- Market size, competition, SWOT, differentiators
- [business/PRICING.md](../business/PRICING.md) -- Module pricing and bundled tiers
- [business/PROJECTIONS.md](../business/PROJECTIONS.md) -- 5-year financial model
- [sales/](../sales/) -- Demo scripts, trade show materials, grant applications

### Operations
- [business/COSTS.md](../business/COSTS.md) -- Infrastructure and operating costs
- [product/SOC2_ROADMAP.md](../product/SOC2_ROADMAP.md) -- Compliance path
- `yggdrasil/infra/vps/DEPLOY.md` -- Deployment procedures

---

## Questions?

If something is unclear or missing from this package, flag it. Improving these docs benefits everyone who follows you.
