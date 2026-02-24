# Yggdrasil ERP - Maintenance & Operating Costs

This document outlines the estimated recurring and one-time costs associated with operating and maintaining the Yggdrasil ERP system. All estimates are based on industry-standard pricing as of early 2026 and assume a small-to-medium deployment. Actual costs will vary based on tenant count, usage patterns, and staffing model.

---

## Infrastructure Costs (Monthly)

| Resource | Provider Options | Est. Monthly Cost | Notes |
|----------|-----------------|-------------------|-------|
| Application Server (VPS) | AWS EC2 / DigitalOcean / Linode | $40-200 | Depends on tenant count and load |
| PostgreSQL Database | AWS RDS / Self-hosted | $50-300 | Scale with data volume |
| Redis Cache | AWS ElastiCache / Self-hosted | $15-50 | For B2B event relay |
| Redpanda/Kafka | Self-hosted / Confluent Cloud | $0-150 | For event streaming federation |
| SSL Certificate | Let's Encrypt / Commercial | $0-20 | Free with Let's Encrypt |
| Domain & DNS | Various | $1-5 | |
| CDN (Web App) | Vercel / Cloudflare | $0-20 | Free tier available |
| Backup Storage | AWS S3 / Backblaze B2 | $5-25 | Database + file backups |
| Monitoring | Datadog / Grafana Cloud | $0-50 | Free tiers available |
| **Subtotal** | | **$111-820** | |

---

## Development & Maintenance Costs

| Activity | Frequency | Est. Cost | Notes |
|----------|-----------|-----------|-------|
| Security patches | Monthly | | Depends on staffing model |
| Dependency updates | Quarterly | | Qt, PostgreSQL, Next.js versions |
| Bug fixes | Ongoing | | |
| Feature development | As planned | | See ROADMAP.md |
| Database migrations | Per release | | |
| Performance tuning | Quarterly | | |
| Code review & QA | Per release | | |

---

## Per-Tenant Costs

| Tier | Max Users | Storage | Est. Marginal Cost/mo | Notes |
|------|-----------|---------|----------------------|-------|
| Starter | 5 | 1 GB | | Shared infrastructure |
| Professional | 25 | 10 GB | | |
| Enterprise | Unlimited | 100 GB | | Dedicated resources recommended |

---

## One-Time Setup Costs

| Item | Est. Cost | Notes |
|------|-----------|-------|
| Initial server provisioning | | |
| Database schema deployment | | |
| SSL configuration | | |
| DNS setup | | |
| CI/CD pipeline setup | | |
| Load testing | | |
| Security audit | | |
| Initial data migration | | Depends on source system |
