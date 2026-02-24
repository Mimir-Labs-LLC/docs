# Key Resources

A directory of important documents, files, and references across both repositories.

---

## Yggdrasil Repository (Main Codebase)

### Primary References

| Document | Path | Description |
|----------|------|-------------|
| **CLAUDE.md** | `yggdrasil/CLAUDE.md` | Authoritative development guide -- architecture, build commands, conventions, CI/CD, testing |
| **README.md** | `yggdrasil/README.md` | Project overview, quick start, module list, tech stack |
| **TODO.md** | `yggdrasil/TODO.md` | Product readiness assessment (~45% sell-ready) with categorized blockers |
| **VERSION** | `yggdrasil/VERSION` | Current version and patch notes |
| **CHANGELOG.md** | `yggdrasil/CHANGELOG.md` | Version history |

### Configuration Files

| File | Path | Purpose |
|------|------|---------|
| Server config | `yggdrasil/server/config/server.conf` | Runtime settings (DB, ports, JWT, logging, federation) |
| Web app config | `yggdrasil/web-app/next.config.js` | API_URL, WS_URL environment variables |
| Tailwind theme | `yggdrasil/web-app/tailwind.config.ts` | Custom `yggdrasil` color palette |
| CI pipeline | `yggdrasil/.github/workflows/ci.yml` | 8-job GitHub Actions pipeline |
| Build env | `yggdrasil/.github/workflows/build-env.yml` | Build environment setup |

### Database

| File | Path | Purpose |
|------|------|---------|
| Complete schema | `yggdrasil/database/schema/yggdrasil_complete_schema.sql` | Canonical schema (117 tables, 150+ indexes) |
| Migrations | `yggdrasil/database/migrations/` | Versioned schema migrations |
| Seed data | `yggdrasil/database/seeds/` | Foundation data scripts |
| Database README | `yggdrasil/database/README.md` | Database documentation |

### Infrastructure

| File | Path | Purpose |
|------|------|---------|
| VPS Docker Compose | `yggdrasil/infra/vps/docker-compose.yml` | Central broker stack (Redpanda, PostgreSQL, Caddy) |
| VPS provisioning | `yggdrasil/infra/vps/provision.sh` | OS hardening script |
| VPS deployment guide | `yggdrasil/infra/vps/DEPLOY.md` | Deployment instructions |
| Sidecar Docker Compose | `yggdrasil/infra/sidecar/docker-compose.sidecar.yml` | Tenant-side tunnel stack |
| Sidecar source | `yggdrasil/infra/sidecar/main.go` | Go sidecar for cloudflared tunnel + health |
| Health check | `yggdrasil/infra/vps/health-check.sh` | Service monitoring script |
| Topic init | `yggdrasil/infra/vps/init-topics.sh` | Redpanda Kafka topic setup |

### Compliance Policies (SOC 2)

All policies are in `yggdrasil/docs/policies/`:

| Policy | File |
|--------|------|
| Information Security | `information-security-policy.md` |
| Access Control | `access-control-policy.md` |
| Data Classification | `data-classification-policy.md` |
| Encryption | `encryption-policy.md` |
| Incident Response | `incident-response-plan.md` |
| Business Continuity / DR | `business-continuity-dr-plan.md` |
| Data Retention & Disposal | `data-retention-disposal-policy.md` |
| Vendor Risk Management | `vendor-risk-management-policy.md` |
| Change Management | `change-management-policy.md` |
| Privacy | `privacy-policy.md` |

### Testing

| Resource | Path | Purpose |
|----------|------|---------|
| Testing manual | `yggdrasil/docs/TESTING_MANUAL.md` | Testing guide |
| Integration test runner | `yggdrasil/tests/runner.ts` | Story-driven test framework |
| Test stories | `yggdrasil/tests/stories/` | 20+ business-process arcs |
| Web unit tests | `yggdrasil/web-app/` (co-located `__tests__/`) | Vitest unit tests |
| Server unit tests | `yggdrasil/server/tests/` | Catch2 unit tests |
| Build verification | `yggdrasil/verify_build.sh` | Prereq and structure checks |

---

## Docs Repository (This Repo)

### Onboarding

| Document | Path | Description |
|----------|------|-------------|
| Onboarding index | `onboarding/README.md` | Checklist and reading order |
| Welcome | `onboarding/01-welcome.md` | Company overview, mission, product |
| Architecture | `onboarding/02-architecture.md` | System architecture overview |
| Dev environment | `onboarding/03-dev-environment.md` | Local setup guide |
| Dev workflow | `onboarding/04-development-workflow.md` | Git, CI/CD, coding standards, testing |
| Module reference | `onboarding/05-modules.md` | Business module guide |
| Key resources | `onboarding/06-key-resources.md` | This document |

### Product

| Document | Path | Description |
|----------|------|-------------|
| Features | `product/FEATURES.md` | Feature inventory by implementation status |
| Roadmap | `product/ROADMAP.md` | 5-phase product roadmap through 2027+ |
| SOC 2 Roadmap | `product/SOC2_ROADMAP.md` | 6-phase compliance roadmap for Type I/II |

### Business

| Document | Path | Description |
|----------|------|-------------|
| Market analysis | `business/MARKET_ANALYSIS.md` | Target market, competition, SWOT, differentiators |
| Pricing | `business/PRICING.md` | Module pricing, bundled tiers, implementation fees |
| Projections | `business/PROJECTIONS.md` | 5-year financial projections |
| Costs | `business/COSTS.md` | Operating and maintenance cost estimates |

### Legal

| Document | Path | Description |
|----------|------|-------------|
| SaaS contract | `legal/CONTRACT.md` | Full subscription agreement (BoldSign-ready) |
| EULA | `legal/EULA.txt` | End-User License Agreement |
| Terms of Service | `legal/ToS.txt` | Terms of Service |
| Terms of Use | `legal/ToU.txt` | Terms of Use |
| MNDA template | `legal/MNDA` | Mutual Non-Disclosure Agreement template |
| Phase 2 NDA | `legal/PROPRIETARY EVALUATION...` | Technical evaluation NDA |
| Sales rep NDA | `legal/Universal NDA (for sales reps)` | NDA for independent reps |
| Equity agreement | `legal/SWEAT EQUITY & ADVISORY AGREEMENT` | Sweat equity template |
| Signed MNDAs | `legal/*.pdf` | Executed agreements |

### Sales & Marketing

| Document | Path | Description |
|----------|------|-------------|
| Demo script | `sales/Full Demo Script` | Full platform walkthrough script |
| Trade show script | `sales/Trade show presentation` | "End of the ERP Software Tax" pitch |
| Trade show materials | `sales/Trade Show.pdf` | Printed trade show collateral |
| NSF pitch | `sales/NSF Pitch` | NSF SBIR Phase I application |
| BFTP application | `sales/BFTP application` | BFTP venture application |
| Validation cohort | `sales/2026 Validation Cohort` | 2026 charter member program |

### Research

| Document | Path | Description |
|----------|------|-------------|
| ERP whitepaper | `research/Yggdrasil-ERP-...pdf` | "Deterministic Enterprise Resource Planning for Industry 4.0" |
