# Personnel Requirements — Roles, Headcount & Skill Profiles

**Document Owner:** Mimir Labs Support Operations
**Applies To:** Full Mimir Labs product stack
**Last Updated:** 2026-03-14

---

## 1. Overview

This document defines the roles, skill profiles, and headcount projections needed to operate Mimir Labs support at three growth stages: **Startup** (10 tenants), **Growth** (50 tenants), and **Scale** (200 tenants). Headcount assumes a mix of SMB and mid-market manufacturing customers with moderate ticket volume per tenant.

---

## 2. Role Definitions & Skill Profiles

### 2.1 L1 — Support Analyst

**Mission:** First-contact resolution for known issues; triage and escalation for unknowns.

| Attribute | Requirement |
|-----------|-------------|
| **Education** | Associate's or Bachelor's degree (any field); ERP experience preferred |
| **Domain Knowledge** | General ERP concepts: orders, invoices, inventory, BOMs, GL |
| **Technical Skills** | Ticketing systems, admin portal navigation, basic SQL SELECT (read-only) |
| **Soft Skills** | Clear written/verbal communication, empathy, time management |
| **Certifications** | Internal Yggdrasil L1 certification (within 30 days of hire) |

**Career Path:** L1 Analyst → Senior L1 → L2 Application Engineer

---

### 2.2 L2 — Application Support Engineer

**Mission:** Module-specific troubleshooting, data corrections, integration diagnosis.

| Attribute | Requirement |
|-----------|-------------|
| **Education** | Bachelor's in CS, IT, Business, or equivalent experience |
| **Domain Knowledge** | Deep expertise in 2-3 ERP modules; working knowledge of all 10 |
| **Technical Skills** | SQL (read/write with audit), REST API debugging, log analysis, JSON/XML |
| **Tools** | PostgreSQL client, Postman/curl, browser dev tools, server log access |
| **Soft Skills** | Analytical thinking, clear documentation, customer de-escalation |
| **Certifications** | Internal Yggdrasil L2 certification (within 60 days of hire) |

**Module Specializations** (each L2 engineer covers 2-3 primary modules):

| Specialization Track | Primary Modules | Secondary |
|---------------------|-----------------|-----------|
| Order-to-Cash | CRM, Sales, Finance (AR) | Service |
| Procure-to-Pay | Purchasing, Finance (AP, GL) | Warehouse |
| Make-to-Ship | Manufacturing, Warehouse, Quality | PLM |
| Engineering | PLM, Quality, Projects | Manufacturing |

**Career Path:** L2 Engineer → Senior L2 → L3 Engineering or Support Team Lead

---

### 2.3 L3 — Software Engineer (Support)

**Mission:** Code-level debugging, hotfixes, database operations, infrastructure.

| Attribute | Requirement |
|-----------|-------------|
| **Education** | Bachelor's in CS/SE or equivalent experience |
| **Technical Skills** | C++17/Qt 6 (server & desktop), TypeScript/React/Next.js (web), PostgreSQL internals |
| **Infrastructure** | Linux administration, systemd, Nginx, Docker, CI/CD pipelines |
| **Security** | OWASP Top 10, JWT/auth systems, incident response fundamentals |
| **Tools** | GDB/LLDB, Git, CMake, npm, psql, Grafana, server SSH |
| **Soft Skills** | Root cause analysis, written RCA reports, cross-team collaboration |

**Career Path:** L3 Support Engineer → Senior Engineer → Staff Engineer / Engineering Manager

---

### 2.4 DevOps / SRE Engineer

**Mission:** Infrastructure reliability, deployment, monitoring, incident response automation.

| Attribute | Requirement |
|-----------|-------------|
| **Technical Skills** | Linux, Docker, CI/CD (GitHub Actions), PostgreSQL replication, Redpanda/Kafka |
| **Monitoring** | Grafana, Prometheus, alerting rules, SLI/SLO definition |
| **Automation** | Bash/Python scripting, infrastructure-as-code, backup/restore procedures |
| **Networking** | TLS/SSL, DNS, load balancing, firewall rules, VPN |

---

### 2.5 Support Manager

**Mission:** Queue management, SLA tracking, hiring, training, process improvement.

| Attribute | Requirement |
|-----------|-------------|
| **Experience** | 3+ years managing a technical support team; ERP industry preferred |
| **Skills** | SLA reporting, workforce planning, coaching, escalation management |
| **Responsibilities** | Hire & onboard support staff, monitor KPIs, conduct 1:1s, manage vendor relationships |

---

### 2.6 Technical Writer

**Mission:** Knowledge base maintenance, release notes, customer-facing documentation.

| Attribute | Requirement |
|-----------|-------------|
| **Skills** | Technical writing, Markdown/HTML, screenshot/video tooling, information architecture |
| **Domain** | ERP workflows, API documentation, user guides |
| **Output** | KB articles, release notes, onboarding guides, runbook updates |

---

## 3. Headcount Projections

### 3.1 Assumptions

- **Ticket volume:** ~15-25 tickets/month per tenant (industry average for manufacturing ERP)
- **L1 capacity:** ~150 tickets/month per agent (with KB tooling)
- **L2 capacity:** ~60 complex tickets/month per engineer
- **L3 allocation:** 30% support, 70% product development (at Startup/Growth); dedicated at Scale
- **Business hours:** 8am-8pm ET (12h coverage) for L1; 9am-6pm ET for L2; on-call for L3

### 3.2 Staffing Matrix

| Role | Startup (10 tenants) | Growth (50 tenants) | Scale (200 tenants) |
|------|---------------------|--------------------|--------------------|
| **L1 Support Analyst** | 1 | 3 | 8-10 |
| **L2 Application Engineer** | 1 (generalist) | 2-3 (specialized) | 6-8 (full coverage) |
| **L3 Support Engineer** | 0 (dev team covers) | 1 dedicated | 3-4 dedicated |
| **DevOps / SRE** | 0 (dev team covers) | 1 | 2-3 |
| **Support Manager** | 0 (founder covers) | 1 | 1-2 (L1 lead + L2 lead) |
| **Technical Writer** | 0 (engineers write) | 0.5 (part-time/contract) | 1-2 |
| **Total Support FTE** | **2** | **8-9** | **21-27** |

### 3.3 On-Call Coverage

| Scale | L1 Coverage | L2 Coverage | L3/SRE On-Call |
|-------|-------------|-------------|----------------|
| Startup (10) | Business hours (12h, M-F) | Business hours (8h, M-F) | Best-effort; dev team Slack |
| Growth (50) | Extended hours (12h, M-F) | Business hours (8h, M-F) | 24/5 rotation (2-person) |
| Scale (200) | 16h coverage (M-F) + weekend on-call | Extended (12h, M-F) | 24/7 rotation (4-person) |

---

## 4. Cross-Training Plan

### 4.1 L1 → L2 Pipeline

| Phase | Duration | Content |
|-------|----------|---------|
| Shadow | 2 weeks | Observe L2 ticket handling, attend module deep-dives |
| Assisted | 4 weeks | Handle L2 tickets with mentor review before customer response |
| Solo | 4 weeks | Independent L2 work on 1 module specialization |
| Certification | 1 week | Internal L2 exam (module knowledge + SQL + API skills) |

### 4.2 Module Rotation

- Every L2 engineer rotates to a new secondary module **quarterly**
- Goal: every L2 can handle basic tickets in **all 10 modules** within 18 months
- Deep specialization maintained in 2-3 primary modules

### 4.3 L2 → L3 Pipeline

| Phase | Duration | Content |
|-------|----------|---------|
| Code orientation | 2 weeks | Codebase walkthrough, build system, local dev setup |
| Bug triage | 4 weeks | Reproduce bugs, write failing test cases, identify root cause |
| Supervised fixes | 8 weeks | Develop patches with code review from senior engineer |
| On-call shadow | 4 weeks | Shadow L3 on-call, participate in incident response |

---

## 5. Hiring Timeline

| Milestone | Trigger | Hires Needed |
|-----------|---------|-------------|
| First paying customer | Contract signed | L1 x1, L2 x1 |
| 25 tenants | Ticket volume exceeds L1 capacity | L1 x1, L2 x1 |
| 50 tenants | SLA pressure, on-call needed | L3 x1, SRE x1, Manager x1, Writer x0.5 |
| 100 tenants | Module coverage gaps | L1 x3, L2 x2, L3 x1 |
| 200 tenants | 24/7 coverage required | L1 x3, L2 x2, L3 x1, SRE x1, Writer x1, Manager x1 |

---

## 6. Budget Estimates (Annual, USD)

| Role | Comp Range (US, fully loaded) | Startup Total | Growth Total | Scale Total |
|------|-------------------------------|---------------|--------------|-------------|
| L1 Support Analyst | $55K-75K | $65K | $195K | $600K |
| L2 Application Engineer | $80K-110K | $95K | $260K | $665K |
| L3 Support Engineer | $120K-160K | — | $140K | $560K |
| DevOps / SRE | $130K-170K | — | $150K | $450K |
| Support Manager | $110K-140K | — | $125K | $250K |
| Technical Writer | $70K-95K | — | $42K (0.5) | $165K |
| **Total Annual** | | **$160K** | **$912K** | **$2.69M** |

*Note: Figures are fully loaded (salary + benefits + equipment). Remote-first reduces office overhead. Offshore L1 option can reduce L1 costs by 40-50% at Scale.*

---

## 7. Related Documents

- [Support Tier Model](support-tier-model.md) — L1/L2/L3 responsibilities and escalation
- [SLA Framework](sla-framework.md) — Response and resolution targets
- [On-Call Rotation](on-call-rotation.md) — Incident response process
