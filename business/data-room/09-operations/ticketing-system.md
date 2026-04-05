# Support Ticketing System — Tooling Selection & Workflow Configuration

**Document Owner:** Mimir Labs Support Operations
**Last Updated:** 2026-03-14

---

## 1. Tooling Evaluation

### 1.1 Options Assessed

| Tool | Strengths | Weaknesses | Cost (50 agents) | Verdict |
|------|-----------|------------|-------------------|---------|
| **Jira Service Management (JSM)** | Already using Jira (YGGDATA); native engineering escalation; Confluence KB integration | Steeper learning curve for customers; UI less polished than Zendesk | ~$1,250/mo (Standard) | **Recommended** |
| Zendesk | Best-in-class customer UX; rich marketplace; excellent reporting | No native Jira integration (requires plugin); separate vendor from engineering tools | ~$2,750/mo (Professional) | Strong alternative |
| Freshdesk | Good value; clean UI; built-in KB | Less mature Jira integration; smaller enterprise ecosystem | ~$1,250/mo (Pro) | Viable |
| Built-in Portal (`/portal/support`) | Zero additional cost; fully customizable; native integration | Must build everything: SLA engine, automation, reporting, email integration | Development time | Phase 2 upgrade path |

### 1.2 Recommendation: Jira Service Management

**Primary reasons:**
1. **Engineering alignment** — Support tickets (JSM) and engineering bugs (Jira Software) share the same Atlassian instance. Escalation from support ticket → engineering bug is a native link, not a cross-tool sync.
2. **Existing investment** — Team already trained on Jira; cloudId and project structure established.
3. **Confluence integration** — KB articles in Confluence surface automatically in customer portal.
4. **SLA engine** — Built-in SLA timers per request type and priority, with clock pause/resume.
5. **Cost efficiency** — Standard tier covers all requirements at reasonable price point.

**Portal (`/portal/support`) role:** Remains the primary customer entry point. Integrates with JSM via API — ticket creation, status tracking, and history are rendered in the portal UI, with JSM as the backend.

---

## 2. Ticketing Workflow

### 2.1 Status Flow

```
New → Triaged → In Progress → Waiting on Customer → Resolved → Closed
                     ↑              ↓
                     └──────────────┘  (customer responds)
```

| Status | Description | SLA Clock |
|--------|-------------|-----------|
| **New** | Ticket created, not yet reviewed | Running |
| **Triaged** | Severity assigned, routed to appropriate tier/agent | Running |
| **In Progress** | Agent actively working the issue | Running |
| **Waiting on Customer** | Agent needs information from customer | Paused |
| **Resolved** | Fix or answer provided, pending customer confirmation | Running (48h auto-close) |
| **Closed** | Customer confirmed or 48h auto-close elapsed; CSAT survey sent | Stopped |

### 2.2 Transitions

| From | To | Trigger |
|------|-----|---------|
| New | Triaged | Agent reviews ticket, sets severity and priority |
| Triaged | In Progress | Agent begins work |
| In Progress | Waiting on Customer | Agent asks customer for info |
| Waiting on Customer | In Progress | Customer responds |
| In Progress | Resolved | Agent provides solution |
| Resolved | In Progress | Customer reports issue not fixed (reopen) |
| Resolved | Closed | Customer confirms or 48h auto-close |
| Any | Closed | Agent closes as duplicate/cancelled |

### 2.3 Additional Fields

| Field | Type | Required | Values |
|-------|------|----------|--------|
| Severity | Select | Yes (at triage) | P1 Critical, P2 Major, P3 Moderate, P4 Minor |
| Module | Select | Yes | CRM, Sales, Purchasing, Manufacturing, Warehouse, Finance, Projects, PLM, Quality, Service, General, Integration |
| Component | Select | No | Server, Desktop, Web, Database, API, Other |
| Tenant ID | Text | Auto-filled | From customer's authenticated session |
| Environment | Select | No | Production, Staging, Development |

---

## 3. Automation Rules

### 3.1 Auto-Assignment

| Condition | Action |
|-----------|--------|
| Module = Manufacturing, Quality, or PLM | Assign to L2 Make-to-Ship specialist queue |
| Module = Finance or Purchasing | Assign to L2 Procure-to-Pay specialist queue |
| Module = CRM, Sales, or Service | Assign to L2 Order-to-Cash specialist queue |
| Module = General or Integration | Assign to L2 general queue (round-robin) |
| Severity = P1 | Auto-assign to L2 + page L3 on-call |

### 3.2 SLA Timer Enforcement

Configured per the [SLA Framework](sla-framework.md):

| Severity × Tier | Response SLA | Resolution SLA |
|-----------------|-------------|----------------|
| P1 Standard | 2h | 8h |
| P1 Premium | 30m | 4h |
| P1 Enterprise | 15m | 2h |
| P2 Standard | 4h | 2 business days |
| ... | (per SLA framework) | ... |

**SLA breach automation:**
- 50% elapsed → yellow warning badge on ticket
- 75% elapsed → email alert to agent + team lead
- 100% elapsed (breach) → email to Support Manager + reassign to next available

### 3.3 Escalation Rules

| Trigger | Action |
|---------|--------|
| P1 ticket created | Immediate notification to L2 queue + L3 on-call page |
| Ticket in "In Progress" > 75% of resolution SLA | Auto-escalate to next tier |
| Ticket in "Waiting on Customer" > 5 business days | Send reminder email to customer |
| Ticket in "Waiting on Customer" > 7 business days | Auto-close with "No response" resolution |
| Ticket reopened 3+ times | Flag for Support Manager review |

### 3.4 Customer Communication Automation

| Event | Automation |
|-------|-----------|
| Ticket created | Email confirmation with ticket ID, severity, expected response time |
| Status changed | Email notification with new status and explanation |
| Agent comment (public) | Email notification with comment content |
| Ticket resolved | Email with resolution summary + "Was this helpful?" link |
| Ticket closed | CSAT survey email (1-5 rating + free text) |
| SLA breach | Email apology with escalation notice |

---

## 4. Customer Portal Integration

### 4.1 Portal (`/portal/support`) Features

| Feature | Implementation |
|---------|---------------|
| Submit ticket | Form with module, severity, description, attachments → creates JSM ticket via API |
| View my tickets | List of open/closed tickets with status, severity, SLA indicator |
| Ticket detail | Full conversation thread, status timeline, attachments |
| KB search | Integrated search before ticket creation ("Did you find your answer?") |
| Status page link | Banner showing active incidents from status.mimirlabs.com |

### 4.2 JSM API Integration

```
Portal → POST /rest/servicedeskapi/request → JSM creates ticket
Portal → GET /rest/servicedeskapi/request/{id} → Status display
JSM webhook → Portal notification banner → Customer sees update
```

---

## 5. Reporting Dashboards

### 5.1 Operational Dashboard (Support Manager, Real-Time)

| Widget | Metric |
|--------|--------|
| Open ticket count | By severity, by module, by age |
| SLA compliance (today) | % of tickets within response/resolution target |
| Agent workload | Tickets per agent, avg resolution time |
| Escalation count | L1→L2, L2→L3 escalations today |
| Breaches | Active SLA breaches requiring attention |

### 5.2 Executive Dashboard (VP, Weekly)

| Widget | Metric |
|--------|--------|
| Ticket volume trend | Weekly ticket count (4-week rolling) |
| CSAT score | Average satisfaction rating (target >= 4.2/5) |
| First-contact resolution | % resolved at L1 without escalation |
| Mean time to resolution | By severity (trend line) |
| Top ticket categories | Most common module/issue type combinations |
| Self-service deflection | KB views vs tickets created ratio |

### 5.3 Customer Dashboard (Per-Tenant, Portal)

| Widget | Metric |
|--------|--------|
| My open tickets | Count + list with status |
| Average resolution time | For their tickets this month |
| SLA compliance | % of their tickets resolved within SLA |

---

## 6. Engineering Escalation Integration

### JSM → Jira Software Flow

1. L2 confirms a bug → clicks "Escalate to Engineering" in JSM ticket
2. Creates a linked Jira Software issue in YGGDATA project (type: Bug)
3. JSM ticket shows "Linked: YGGDATA-XXX" with live status
4. When YGGDATA bug is resolved → JSM ticket notified → L2 verifies → resolves customer ticket
5. Customer sees: "Your issue has been fixed in version X.Y.Z"

---

## 7. Implementation Plan

| Phase | Timeline | Scope |
|-------|----------|-------|
| **Phase 1** (Month 1) | Setup | Create JSM project, configure workflow, SLA rules, auto-assignment |
| **Phase 2** (Month 1-2) | Portal integration | Wire `/portal/support` to JSM API for ticket CRUD |
| **Phase 3** (Month 2) | Automation | Email notifications, escalation rules, CSAT survey |
| **Phase 4** (Month 2-3) | Reporting | Dashboards for ops, executive, and customer views |
| **Phase 5** (Month 3) | Training | L1/L2 agent training on JSM workflows |

---

## 8. Related Documents

- [SLA Framework](sla-framework.md) — SLA timers configured in ticketing system
- [Support Tier Model](support-tier-model.md) — Routing and escalation tiers
- [Knowledge Base](knowledge-base.md) — KB integration with ticket creation
- [On-Call Rotation](on-call-rotation.md) — P1 auto-page from ticketing system
