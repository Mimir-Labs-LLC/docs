# Support Tier Model — L1 / L2 / L3

**Document Owner:** Mimir Labs Support Operations
**Applies To:** Yggdrasil ERP (all modules), Ragnarok, Ratatosk, Bifrost, Jormungandr
**Last Updated:** 2026-03-14

---

## 1. Overview

Mimir Labs operates a three-tier support model. Every customer interaction enters at L1 and escalates only when the current tier cannot resolve it within its defined scope. The goal is **first-contact resolution at the lowest feasible tier** to minimize customer wait time and engineering distraction.

---

## 2. Tier Definitions

### 2.1 L1 — Help Desk (First Contact)

| Attribute | Detail |
|-----------|--------|
| **Role** | Support Agent / Help Desk Analyst |
| **Scope** | Known issues, guided troubleshooting, configuration questions |
| **Tools** | Ticketing system, knowledge base, admin portal |

**Responsibilities:**

- Receive and triage all inbound support requests (email, portal, phone)
- Start the SLA clock — classify severity and assign priority per the [SLA Framework](sla-framework.md)
- Verify customer identity, tenant, and entitlement (active subscription, module access)
- Resolve known issues using the knowledge base (KB) and runbooks
- Password resets, MFA enrollment assistance, account unlock
- Basic configuration questions (field visibility, saved views, user roles)
- Collect diagnostic information for escalation: screenshots, error messages, browser/OS, steps to reproduce
- Log all interactions in the ticketing system with structured notes

**Resolution Target:** 70% first-contact resolution rate

**Does NOT handle:**
- Code-level debugging or database queries
- Data corrections requiring direct DB access
- Custom report development
- Security incidents

---

### 2.2 L2 — Application Support (Module Specialists)

| Attribute | Detail |
|-----------|--------|
| **Role** | Application Support Engineer |
| **Scope** | Module-specific troubleshooting, data issues, integration diagnosis |
| **Tools** | Ticketing system, KB, admin portal, database read access, server logs |

**Responsibilities:**

- Module-specific troubleshooting across all 10 Yggdrasil modules:
  - **CRM:** Account/contact merge issues, opportunity pipeline problems, duplicate detection
  - **Sales:** Quote-to-order conversion failures, invoice generation, commission calculation
  - **Purchasing:** PO approval workflow issues, three-way match failures, supplier portal
  - **Manufacturing:** Work order scheduling, BOM explosion errors, OEE data gaps
  - **Warehouse:** Inventory discrepancies, pick list generation, cycle count issues
  - **Finance:** GL posting errors, bank reconciliation, period close, tax calculation
  - **Projects:** Time entry corrections, budget variance, resource allocation
  - **PLM:** ECR/ECO workflow, BOM revision conflicts, routing errors
  - **Quality:** NCR disposition, CAPA workflow, inspection plan failures
  - **Service:** Ticket routing, RMA processing, warranty claim validation
- Data corrections via admin tools or approved SQL scripts (read/write access with audit trail)
- Report assistance — help customers build saved views and configure dashboards
- Integration issue diagnosis — API errors, webhook failures, Redpanda event issues
- Bug reproduction and documentation for L3 escalation
- Configuration changes beyond L1 scope (workflow rules, approval chains, notification settings)

**Resolution Target:** 85% resolution without L3 escalation

**Does NOT handle:**
- Source code changes or patch development
- Infrastructure issues (server, database, network)
- Security incident response (beyond initial containment)
- Performance tuning requiring server-side changes

---

### 2.3 L3 — Engineering (Development & Infrastructure)

| Attribute | Detail |
|-----------|--------|
| **Role** | Software Engineer / DevOps Engineer / DBA |
| **Scope** | Code fixes, database operations, infrastructure, security incidents |
| **Tools** | Full codebase access, production DB access, server SSH, monitoring dashboards |

**Responsibilities:**

- Code-level debugging of server (C++/Qt), desktop client (Qt/QML), and web app (Next.js/React)
- Hotfix and patch development for confirmed bugs
- Database-level fixes: schema corrections, data migration scripts, constraint resolution
- Performance tuning: query optimization, index analysis, connection pool tuning, cache configuration
- Security incident response: breach investigation, vulnerability patching, forensic analysis
- Infrastructure issues: server health, PostgreSQL, Redpanda/Kafka, WebSocket connectivity
- Release engineering: emergency patch builds, deployment coordination
- Root cause analysis (RCA) for P1/P2 incidents — deliver written RCA within SLA

**Resolution Target:** 100% (terminal escalation tier)

---

## 3. Escalation Triggers

### 3.1 L1 → L2 Escalation

Escalate when **any** of the following are true:

| Trigger | Example |
|---------|---------|
| Issue not in KB and not resolvable with standard procedures | Unknown error code, undocumented behavior |
| Data correction needed beyond admin portal capabilities | Orphaned records, FK constraint violations |
| Module-specific domain knowledge required | Manufacturing routing logic, GL posting rules |
| Integration/API troubleshooting needed | Webhook not firing, API returning 500 |
| Customer requests configuration change beyond L1 scope | Approval workflow modification |
| Issue unresolved after 30 minutes of L1 effort | Time-boxed investigation exceeded |
| Severity 1 or 2 issue | Auto-escalate per SLA framework |

### 3.2 L2 → L3 Escalation

Escalate when **any** of the following are true:

| Trigger | Example |
|---------|---------|
| Confirmed software bug requiring code change | Reproducible defect with steps documented |
| Database operation requiring DBA privileges | Schema change, bulk data repair, migration fix |
| Performance issue not resolvable by configuration | Slow queries, memory leaks, connection exhaustion |
| Security incident suspected or confirmed | Unauthorized access, data exposure, vulnerability |
| Infrastructure failure | Server crash, DB replication lag, disk full |
| Issue unresolved after 2 hours of L2 effort | Time-boxed investigation exceeded |
| All Severity 1 issues | Auto-escalate immediately to L3 on-call |

### 3.3 Emergency Bypass (Direct to L3)

The following conditions skip L1/L2 and go directly to L3 on-call:

- **Complete system outage** (all tenants affected)
- **Data breach or suspected security incident**
- **Data loss or corruption** affecting production data
- **Payment processing failure** affecting customer billing

---

## 4. Escalation Handoff Procedure

### 4.1 Required Information for Every Escalation

The escalating tier **must** provide:

1. **Ticket ID** and current severity/priority
2. **Customer context:** Tenant ID, affected users, module(s)
3. **Problem statement:** Clear 1-2 sentence summary
4. **Steps to reproduce** (if applicable)
5. **Diagnostic data collected:** Error messages, logs, screenshots
6. **Actions already taken:** What was tried and what was the result
7. **Business impact:** How many users affected, workflow blocked, revenue at risk

### 4.2 Handoff Protocol

1. Update ticket status to "Escalated" with target tier noted
2. Add structured escalation note with all required information (Section 4.1)
3. Notify receiving tier via:
   - **L2:** Assign ticket to L2 queue; Slack notification to `#support-l2`
   - **L3:** Assign ticket to L3 queue; page on-call engineer for Sev 1/2
4. **Warm handoff** for Severity 1/2: escalating agent stays on until receiving engineer acknowledges
5. Original agent remains as **secondary contact** for customer communication
6. SLA clock **does not reset** on escalation — original receipt time governs

### 4.3 De-escalation

If a higher tier determines the issue belongs at a lower tier:

1. Add resolution guidance or KB article reference to the ticket
2. Reassign to originating tier with clear next steps
3. This counts as a **training opportunity** — flag for L1/L2 knowledge gap review

---

## 5. Tier Staffing Guidelines

| Tier | Ratio (per 100 tenants) | Coverage | Notes |
|------|------------------------|----------|-------|
| L1 | 2-3 agents | Business hours + extended (12h) | Scale with ticket volume |
| L2 | 1-2 engineers | Business hours (8h) | Module specialization preferred |
| L3 | On-call rotation | 24/7 for Sev 1; business hours otherwise | See [On-Call Rotation](on-call-rotation.md) |

---

## 6. Metrics & KPIs

| Metric | Target | Measured By |
|--------|--------|-------------|
| L1 First-Contact Resolution | >= 70% | Tickets resolved without escalation / total L1 tickets |
| L2 Resolution without L3 | >= 85% | L2-resolved tickets / total L2 tickets |
| Mean Time to Escalate | <= 30 min (L1), <= 2 hr (L2) | Time from ticket receipt to escalation |
| Escalation Quality Score | >= 90% | % of escalations with all required info (Section 4.1) |
| Customer Satisfaction (CSAT) | >= 4.2 / 5.0 | Post-resolution survey |

---

## 7. Training Requirements

| Tier | Onboarding | Ongoing |
|------|-----------|---------|
| L1 | Product overview (all modules), ticketing system, KB navigation, SLA framework, escalation procedures | Weekly KB review, monthly product update briefing |
| L2 | Deep-dive on 2-3 modules, SQL basics, API/integration fundamentals, log reading | Quarterly module rotation, bug reproduction workshops |
| L3 | Full codebase orientation, infrastructure runbooks, incident response training | Blameless postmortems, architecture review sessions |

---

## 8. Related Documents

- [SLA Framework](sla-framework.md) — Response times, resolution targets, severity definitions
- [Personnel Requirements](personnel-requirements.md) — Roles, headcount, skill profiles per tier
- [On-Call Rotation](on-call-rotation.md) — Incident response process
- [Operational Runbooks](runbooks/) — Per-component troubleshooting guides
- [Knowledge Base](knowledge-base.md) — Internal and customer-facing article system
