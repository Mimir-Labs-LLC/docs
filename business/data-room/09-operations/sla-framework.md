# SLA Framework — Response Times, Resolution Targets & Severity Definitions

**Document Owner:** Mimir Labs Support Operations
**Applies To:** All Mimir Labs products and support tiers
**Last Updated:** 2026-03-14

---

## 1. Overview

This document defines the Service Level Agreement (SLA) framework governing customer support interactions. SLAs vary by **issue severity** and **subscription tier**. All times are measured from ticket creation (SLA clock start) and pause only during "Waiting on Customer" status.

---

## 2. Severity Definitions

| Severity | Name | Definition | Examples |
|----------|------|-----------|----------|
| **P1** | Critical | Complete system outage or data loss affecting all users in a tenant. No workaround available. Business operations halted. | Server unreachable, database corruption, authentication system down, payment processing failure |
| **P2** | Major | A core business function is broken or severely degraded. Workaround may exist but is impractical for sustained use. | Cannot create invoices, GL posting fails, work order scheduling broken, inventory counts incorrect |
| **P3** | Moderate | A feature is degraded or behaving incorrectly, but a reasonable workaround exists. Business operations continue. | Report filters not working (can export raw data), slow page load (< 30s), print formatting issue, notification delays |
| **P4** | Minor | Cosmetic issue, enhancement request, documentation question, or minor inconvenience with easy workaround. | UI alignment issue, tooltip text error, feature request, "how do I" question |

### Severity Assignment Rules

- **Customer proposes** severity at ticket creation
- **L1 validates** severity within first response — may adjust with explanation
- **P1 auto-escalates** to L3 on-call immediately regardless of tier
- **Severity downgrades** require customer notification and acknowledgment
- **Severity upgrades** can be done unilaterally by support when business impact increases

---

## 3. Subscription Tiers

| Tier | Coverage Hours | P1 On-Call | Typical Customer Profile |
|------|---------------|------------|-------------------------|
| **Standard** | Business hours (8am-6pm ET, M-F) | Best-effort after hours | SMB, < 25 users |
| **Premium** | Extended hours (7am-9pm ET, M-F) | 24/5 on-call | Mid-market, 25-100 users |
| **Enterprise** | 24/7 | 24/7 on-call with dedicated TAM | Large, 100+ users, multi-site |

---

## 4. Response Time Targets

**Response time** = time from ticket creation to first meaningful human response (not an auto-acknowledgment).

| Severity | Standard | Premium | Enterprise |
|----------|----------|---------|------------|
| **P1 — Critical** | 2 hours | 30 minutes | 15 minutes |
| **P2 — Major** | 4 hours | 2 hours | 1 hour |
| **P3 — Moderate** | 1 business day | 4 hours | 2 hours |
| **P4 — Minor** | 2 business days | 1 business day | 4 hours |

*Business hours apply for Standard/Premium (clock pauses outside coverage). Enterprise P1/P2 are 24/7 calendar hours.*

---

## 5. Resolution Time Targets

**Resolution time** = time from ticket creation to issue resolved (customer confirms or 48h auto-close after proposed resolution).

| Severity | Standard | Premium | Enterprise |
|----------|----------|---------|------------|
| **P1 — Critical** | 8 hours | 4 hours | 2 hours |
| **P2 — Major** | 2 business days | 1 business day | 8 hours |
| **P3 — Moderate** | 5 business days | 3 business days | 2 business days |
| **P4 — Minor** | 10 business days | 5 business days | 3 business days |

### Resolution vs. Workaround

- A **workaround** that restores business operations can downgrade severity (P1→P2, P2→P3) but does not stop the resolution clock on the root cause
- **Temporary fix** with a committed permanent fix timeline counts as resolution — a follow-up ticket tracks the permanent fix
- **Feature requests** (P4) may be resolved by adding to the product roadmap with a target release

---

## 6. Escalation Timers

Automatic escalation triggers when response or resolution targets are at risk.

### 6.1 Response Escalation

| Condition | Action |
|-----------|--------|
| 50% of response time elapsed, no response | Alert assigned agent + team lead |
| 75% of response time elapsed, no response | Reassign to next available agent; notify Support Manager |
| 100% of response time elapsed (breach) | Notify Support Manager + VP; incident logged |

### 6.2 Resolution Escalation

| Condition | Action |
|-----------|--------|
| 50% of resolution time elapsed, no progress | Alert assigned engineer + team lead |
| 75% of resolution time elapsed | Auto-escalate to next tier (L1→L2, L2→L3) |
| 100% of resolution time elapsed (breach) | Notify Support Manager + VP; customer account manager notified |
| P1 unresolved after 1 hour | Engage L3 on-call + engineering leadership |
| P1 unresolved after 4 hours | Activate incident command; all-hands engineering |

### 6.3 Stale Ticket Escalation

| Condition | Action |
|-----------|--------|
| No update for 24 hours (P1/P2) | Alert assigned agent; notify team lead |
| No update for 3 business days (P3/P4) | Alert assigned agent; auto-reassign if no response in 4 hours |
| Waiting on Customer > 5 business days | Send reminder; auto-close after 2 more business days with no response |

---

## 7. SLA Clock Rules

### 7.1 Clock Start
- Ticket creation timestamp (email receipt, portal submission, or phone log entry)

### 7.2 Clock Pause
- **Waiting on Customer:** When support has asked for information and is blocked on customer response
- **Scheduled Maintenance:** Pre-announced maintenance windows (with 48h notice)
- **Third-Party Dependency:** When resolution requires action from a third-party vendor (documented)

### 7.3 Clock Resume
- Customer responds with requested information
- Maintenance window ends
- Third-party delivers their component

### 7.4 Clock Stop
- Issue resolved and customer confirms (or 48h auto-close)
- Ticket closed as duplicate (linked to master ticket)
- Ticket cancelled by customer

### 7.5 Business Hours Calculation
- Standard: M-F 8am-6pm ET (10h/day)
- Premium: M-F 7am-9pm ET (14h/day)
- Enterprise P1/P2: 24/7 calendar hours
- Enterprise P3/P4: M-F 7am-9pm ET (14h/day)
- US Federal holidays excluded for Standard/Premium

---

## 8. SLA Reporting & Dashboards

### 8.1 Key Metrics

| Metric | Formula | Target |
|--------|---------|--------|
| **Response SLA Compliance** | Tickets responded within target / total tickets | >= 95% |
| **Resolution SLA Compliance** | Tickets resolved within target / total tickets | >= 90% |
| **Mean Time to Response (MTTR)** | Avg first response time across all tickets | Trending down |
| **Mean Time to Resolution (MTTR)** | Avg resolution time across all tickets | Trending down |
| **SLA Breach Rate** | Breached tickets / total tickets | <= 5% |
| **P1 MTTR** | Avg resolution time for P1 tickets only | <= 4 hours |
| **Reopen Rate** | Reopened tickets / resolved tickets | <= 10% |
| **Escalation Rate** | Escalated tickets / total tickets | <= 30% |

### 8.2 Dashboard Views

| Audience | Dashboard | Refresh |
|----------|-----------|---------|
| Support Agents | Active tickets, approaching SLA, assigned queue | Real-time |
| Support Manager | SLA compliance %, breach list, agent utilization, CSAT | Hourly |
| VP / Leadership | Monthly SLA summary, trend lines, top breach categories | Weekly |
| Customer (Portal) | Their open tickets, status, SLA status (met/at-risk) | Real-time |

### 8.3 Breach Alerts

| Severity | Alert Channel | Recipients |
|----------|--------------|------------|
| P1 breach | PagerDuty + Slack #incidents + Email | On-call L3, Support Manager, VP Engineering |
| P2 breach | Slack #support-alerts + Email | Support Manager, Team Lead |
| P3/P4 breach | Slack #support-alerts | Team Lead |
| Compliance < 90% (weekly) | Email report | Support Manager, VP |

---

## 9. SLA Breach Response

When an SLA is breached:

1. **Immediate:** Assign highest-available resource; treat as priority override
2. **Within 1 business day:** Support Manager reviews root cause of breach
3. **Within 1 week:** Add to weekly SLA review meeting agenda
4. **Customer communication:** Account manager notifies customer of breach and remediation steps
5. **Remediation tracking:** Breach logged in SLA tracker with root cause category:
   - Staffing gap
   - Knowledge gap (missing KB article / runbook)
   - Tool limitation
   - Third-party dependency
   - Process failure
6. **Recurring breaches:** 3+ breaches in same category within 30 days triggers process improvement project

---

## 10. SLA Exclusions

The following are **not covered** by SLA targets:

- Issues caused by customer modifications to the system outside documented APIs
- Issues in customer-managed infrastructure (on-premise deployments without managed services add-on)
- Feature requests and enhancement proposals (P4 — tracked on roadmap, not SLA-governed)
- Issues during pre-announced maintenance windows
- Force majeure events (natural disasters, widespread internet outages, government actions)
- Beta/preview features explicitly marked as unsupported

---

## 11. Ticketing System Requirements

The support ticketing system **must** support the following for SLA enforcement:

| Requirement | Detail |
|-------------|--------|
| **SLA clock** | Configurable per severity + subscription tier; auto-pause/resume on status change |
| **Business hours calendar** | Per-tier coverage hours with holiday exclusions |
| **Escalation rules** | Time-based triggers at 50%, 75%, 100% of target |
| **Breach alerting** | Multi-channel (Slack, email, PagerDuty) with configurable recipients |
| **SLA reporting** | Compliance %, MTTR, breach rate with date-range filtering |
| **Customer portal** | Ticket submission, status view, SLA status indicator |
| **Audit trail** | All clock start/pause/resume/stop events logged immutably |
| **API access** | REST API for integration with internal dashboards and automation |

---

## 12. Annual SLA Review

- **Quarterly:** Review SLA compliance metrics; adjust escalation timers if needed
- **Annually:** Full SLA framework review — adjust targets based on actual performance data, customer feedback, and competitive benchmarks
- **On contract renewal:** Customer-specific SLA adjustments negotiated by account management

---

## 13. Related Documents

- [Support Tier Model](support-tier-model.md) — L1/L2/L3 responsibilities and escalation
- [Personnel Requirements](personnel-requirements.md) — Roles, headcount, skill profiles
- [On-Call Rotation](on-call-rotation.md) — Incident response process
- [Operational Runbooks](runbooks/) — Per-component troubleshooting guides
