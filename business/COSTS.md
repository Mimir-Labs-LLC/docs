# Yggdrasil ERP — Operating Costs

**Last updated:** 2026-03-02

This document outlines the current and projected operating costs for the Yggdrasil ERP platform. Costs are organized by category: central infrastructure (Mimir Labs operated), per-tenant marginal costs, development tooling, and third-party services.

---

## Central Infrastructure (Monthly)

The central server coordinates tenant connectivity, event streaming, and the marketing/portal website. Currently hosted on Hetzner; long-term plan is migration to Mimir Labs on-premises hardware.

| Resource | Provider | Est. Monthly Cost | Notes |
|----------|----------|-------------------|-------|
| Central VPS (CPX31) | Hetzner | $18 | 8 vCPU, 16 GB RAM, 240 GB NVMe |
| PostgreSQL (ygg_central) | Self-hosted on VPS | $0 | Included in VPS cost |
| Redpanda (event broker) | Self-hosted on VPS | $0 | Included in VPS cost; Docker container |
| Cloudflare Tunnel | Cloudflare (Free) | $0 | Zero-trust connectivity for tenant sites |
| SSL/TLS | Cloudflare / Let's Encrypt | $0 | Auto-provisioned via Cloudflare |
| DNS | Cloudflare | $0 | mimirlabs.net, mimirlabs.net |
| Domain registration | Registrar | $4 | ~$48/yr across domains |
| Backup storage | Hetzner Storage Box | $4 | 100 GB, daily pg_dump, 14-day local + 90-day off-site |
| **Subtotal** | | **~$26/mo** | |

### Projected scaling (by tenant count)

| Tenants | Infrastructure Change | Est. Monthly Cost |
|---------|----------------------|-------------------|
| 1–10 | Current CPX31 is sufficient | $26 |
| 10–30 | Upgrade VPS or add second node | $50–80 |
| 30–100 | Dedicated database server, monitoring stack | $150–300 |
| 100+ | Multi-node cluster, dedicated Redpanda, load balancer | $500–1,200 |

---

## Per-Tenant Marginal Cost

The standard deployment model is **Mimir Labs-hosted**: each tenant's server, database, and web app run on Mimir Labs-managed infrastructure, accessed through Cloudflare tunnels. Self-hosting is available only for clients with strict data sovereignty requirements (ITAR, defense, etc.) and carries additional implementation complexity.

### Hosted (standard)

| Resource | Est. Monthly Cost | Notes |
|----------|-------------------|-------|
| Tenant compute (VPS instance) | $15–40 | Dedicated or shared node depending on tenant size |
| PostgreSQL per tenant | $0–15 | Shared DB server for smaller tenants; dedicated for larger |
| Cloudflare Tunnel (per tenant) | $0 | Free tier covers connectivity |
| Central DB storage per tenant | ~$0.50 | ~50 MB in ygg_central for coordination metadata |
| Redpanda topic overhead | ~$0.10 | 10 module topics per tenant, negligible at current scale |
| Backup storage per tenant | $1–5 | Daily pg_dump, scaled by data volume |
| Support allocation | Varies | Scales with support tier (Standard / Priority / Dedicated) |
| **Subtotal** | **$17–60/mo** | Scales with tenant complexity and data volume |

### Self-hosted (data sovereignty only)

For self-hosted tenants, Mimir Labs provides the software and tunnel configuration. The tenant bears their own compute, storage, and database costs. Mimir Labs marginal cost per self-hosted tenant is < $1/mo (tunnel + coordination DB only).

---

## Development Tooling (Monthly)

| Resource | Provider | Est. Monthly Cost | Notes |
|----------|----------|-------------------|-------|
| AI development (Claude Code) | Anthropic | $100 | Primary development engine |
| GitHub (private repos) | GitHub | $0 | Free tier for private repos |
| GitHub Actions CI | GitHub | $0 | Free tier minutes sufficient for current pipeline |
| Jira (project management) | Atlassian | $0 | Free tier (up to 10 users) |
| **Subtotal** | | **~$100/mo** | |

---

## Third-Party Services (Monthly)

Services used by the marketing website and portal. Costs scale with customer volume.

| Resource | Provider | Est. Monthly Cost | Notes |
|----------|----------|-------------------|-------|
| Payment processing | Square | Transaction-based | 2.9% + $0.30 per transaction; no monthly fee |
| Contract signing | BoldSign | $0–30 | Free tier for low volume; scales with contract count |
| Email (transactional) | SMTP provider (TBD) | $0–20 | Currently using built-in SMTP; may move to SendGrid/Postmark |
| **Subtotal** | | **~$0–50/mo** | |

---

## Total Operating Cost Summary

| Category | Monthly | Annual |
|----------|---------|--------|
| Central infrastructure | $26 | $312 |
| Development tooling | $100 | $1,200 |
| Third-party services | $25 | $300 |
| **Total (current, pre-revenue)** | **~$151** | **~$1,812** |

### Projected at scale

| Stage | Tenants | Monthly Infra | Monthly Total | Notes |
|-------|---------|---------------|---------------|-------|
| Pre-revenue (now) | 0 | $26 | $151 | Current state |
| Validation cohort | 3–5 | $30 | $180 | Minimal incremental cost |
| Year 1 EOY | ~5 | $50 | $300 | Possible VPS upgrade |
| Year 2 EOY | ~15 | $100 | $500 | Monitoring stack added |
| Year 3 EOY | ~40 | $250 | $900 | Dedicated DB, second node |
| Year 5 EOY | ~140 | $800 | $1,800 | Multi-node, dedicated Redpanda |

---

## One-Time Costs (Completed or Planned)

| Item | Est. Cost | Status |
|------|-----------|--------|
| Domain registration (mimirlabs.net, .io) | $48/yr | Done |
| Hetzner VPS initial provisioning | $0 | Done (hourly billing) |
| SOC 2 Type I audit (when engaged) | $15K–30K | Planned |
| Penetration testing (third-party) | $5K–15K | Planned |
| On-premises hardware migration | $2K–5K | Planned (replaces Hetzner VPS) |

---

## Cost Structure Advantages

1. **AI-first development** — Claude Code at $100/mo replaces $10K+/mo in traditional developer salary for equivalent output.
2. **Low per-tenant infrastructure** — At $17–60/mo hosting cost per tenant against $45K+/yr subscription revenue, infrastructure is < 2% of recurring revenue.
3. **No cloud markup** — Self-managed Redpanda, PostgreSQL, and Cloudflare free tier eliminate SaaS middleware markups.
4. **Sub-linear scaling** — Central infrastructure (event broker, coordination DB, monitoring) serves all tenants. Per-tenant marginal cost is dominated by compute, which can be shared across smaller tenants.
5. **Gross margin potential** — At $45K+/yr per tenant and $200–720/yr hosting cost, gross margins exceed 98% on recurring revenue.
