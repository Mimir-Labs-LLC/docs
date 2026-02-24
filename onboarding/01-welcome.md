# Welcome to Mimir Labs

Welcome to the team. This document covers who we are, what we're building, and where we're headed.

---

## About Mimir Labs

Mimir Labs is an enterprise software company based in Harrisburg, PA. We build **Yggdrasil ERP** -- a multi-tenant enterprise resource planning platform designed for small-to-medium manufacturers (10-500 employees) and B2B distributors.

**Founded by:** Christopher "Doc" Gaither, CEO/COO

**Operating model:** Lean, engineering-first team augmented by AI-assisted development and operations. We hire for leverage, not coverage.

---

## What is Yggdrasil?

Yggdrasil is a modern, full-stack ERP system that replaces the fragmented, expensive, and dated platforms that mid-market manufacturers are currently forced to use (Epicor, Sage, Infor, SAP). It covers the complete operational lifecycle -- from customer relationship management and sales through manufacturing, warehouse management, quality control, and financial accounting.

### What makes it different

1. **Integrated PLM** -- Native Product Lifecycle Management with EBOM/MBOM revision control, engineering change orders, and part numbering articulation. Most competitors require separate, expensive PLM software.

2. **Multi-tenant by design** -- Tenant isolation built into every table from day one, not retrofitted.

3. **Real-time B2B event streaming** -- WebSocket + Redpanda/Redis federation for cross-tenant supply chain visibility. No batch EDI.

4. **Live carrier integration** -- Server-side UPS, FedEx, and USPS API integration with rate shopping, label generation, and tracking.

5. **Dual interface** -- Native Qt 6 desktop client for power users + Next.js web application for browser-based access.

6. **Self-hosted option** -- Manufacturers in regulated industries (defense, aerospace, medical) can keep data on-premise.

7. **No per-user licensing** -- Flat-rate pricing by tier instead of $50-200/user/month.

8. **Modern tech stack** -- C++17 backend (high performance, no JVM overhead), Next.js 15 frontend, PostgreSQL.

---

## Target Market

### Primary
Small-to-medium manufacturers (10-500 employees) who need robust manufacturing capabilities but cannot justify the $100K+ annual spend and multi-year implementation timelines of enterprise ERP platforms.

### Secondary
- **B2B distributors** -- Integrated purchasing, warehouse, logistics, and sales with real-time supply chain events
- **Job shops** -- Flexible work order management, quoting, and shop floor tracking
- **Make-to-order / Engineer-to-order manufacturers** -- Tight PLM-ERP integration for managing engineering changes, revision control, and BOM lifecycle

### Market size
The manufacturing ERP market was valued at $10B+ in 2024 with 8-10% CAGR. The SMB manufacturing segment represents ~30-40% of revenue but over 80% of potential customers.

---

## Product Status

**Current version:** v0.4.4a (alpha)

**Readiness:** ~45% ready for paying customers

The core infrastructure, all 11 business module APIs (150+ endpoints), the desktop client, and the database schema (117 tables) are implemented. Key gaps remain in the web application (partially connected), file attachments, email notifications, reporting/visualization, and full-text search.

See [product/ROADMAP.md](../product/ROADMAP.md) for the full development roadmap.

---

## Business Model

Revenue comes from two streams:

1. **Recurring subscriptions** -- Monthly per-tenant fees based on module count
2. **Implementation fees** -- One-time onboarding fees covering discovery, data migration, integration setup, training, and 30-day go-live support

| Tier | Modules | Monthly | Annual | Impl Fee | First-Year Total |
|------|---------|---------|--------|----------|------------------|
| Starter | Any 3 | $800 | $9,600 | $6,000 | $15,600 |
| Professional | Any 6 | $1,900 | $22,800 | $14,000 | $36,800 |
| Enterprise | All 10 | $4,800 | $57,600 | $25,000 | $82,600 |

This positions Yggdrasil at 10-50% of incumbent TCO (Epicor, Infor, Syspro).

See [business/PRICING.md](../business/PRICING.md) and [business/PROJECTIONS.md](../business/PROJECTIONS.md) for details.

---

## Roadmap at a Glance

| Phase | Target | Goal |
|-------|--------|------|
| **Phase 0** | Complete | Core infrastructure, modules, APIs, desktop client, web foundation |
| **Phase 1** | Current - Q2 2026 | Stabilization -- tests, CI/CD, web app connection, form validation |
| **Phase 2** | Q2-Q3 2026 | Feature completion -- reporting, Gantt, OEE viz, file attachments |
| **Phase 3** | Q3-Q4 2026 | Production hardening -- security audit, SOC 2, load testing, Docker/K8s |
| **Phase 4** | Q4 2026 - Q1 2027 | Market entry -- onboarding, demos, billing, first paying customers |
| **Phase 5** | 2027+ | Growth -- mobile, AI/ML, EDI, marketplace |

---

## Confidentiality

All code, architecture, business data, and internal documentation are proprietary to Mimir Labs. As a team member, you are bound by your NDA and/or equity agreement. Do not share any confidential information outside the organization without explicit authorization.

See the [legal/](../legal/) directory for agreement templates.
