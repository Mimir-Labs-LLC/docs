# On-Call Rotation & Incident Response Process

**Document Owner:** Mimir Labs Engineering & Support Operations
**Applies To:** All production systems — Yggdrasil ERP, Ragnarok, Ratatosk, Bifrost, Jormungandr
**Last Updated:** 2026-03-14

---

## 1. Overview

This document defines the on-call rotation schedule, incident response process, communication protocols, and post-mortem procedures for Mimir Labs production systems. All severity classifications align with the [SLA Framework](sla-framework.md).

---

## 2. On-Call Schedule

### 2.1 Rotation Structure

| Role | Coverage | Rotation Length | Pool Size (min) |
|------|----------|----------------|-----------------|
| **Primary On-Call** | 24/7 for P1/P2; business hours for P3/P4 | 1 week (Mon 9am → Mon 9am ET) | 4 engineers |
| **Secondary On-Call** | Backup if primary is unreachable or needs support | Same week as primary | Same pool |
| **Incident Commander** | Activated for P1 only; coordinates cross-team response | Rotating monthly | Engineering leads |

### 2.2 Rotation Rules

- Schedule published **4 weeks in advance** in PagerDuty
- Engineers can **swap shifts** with mutual agreement; update PagerDuty and notify Support Manager
- **No back-to-back weeks** — minimum 2 weeks between on-call rotations
- **Holiday coverage** — volunteers first, then round-robin; compensated at 1.5x on-call rate
- **New engineers** shadow on-call for 2 rotations before entering the pool solo

### 2.3 Handoff Procedure

At every rotation change (Monday 9am ET):

1. Outgoing on-call writes a **handoff summary** in `#oncall-handoff` Slack channel:
   - Open incidents and their status
   - Flaky systems or known risks
   - Pending deployments or maintenance
2. Incoming on-call **acknowledges** in thread within 1 hour
3. Both engineers overlap for 1 hour (9-10am) for live Q&A
4. PagerDuty schedule auto-transitions at 9am ET

### 2.4 Compensation

| Activity | Compensation |
|----------|-------------|
| On-call week (no incidents) | Flat stipend per week ($500) |
| Incident response (paged) | Hourly rate for time worked outside business hours |
| Holiday on-call | 1.5x stipend + hourly for incidents |
| Incident Commander activation | Additional flat rate per P1 incident ($200) |

---

## 3. Incident Response Process

### 3.1 Lifecycle

```
Detection → Triage → Communication → Mitigation → Resolution → Post-Mortem
```

### 3.2 Phase 1: Detection

Incidents are detected via:

| Source | Channel | Auto-Page? |
|--------|---------|-----------|
| Monitoring alerts (Grafana/Prometheus) | PagerDuty | Yes — P1/P2 thresholds |
| Customer report (P1/P2 ticket) | Support escalation | Yes — L1/L2 pages on-call |
| Internal report (engineer notices issue) | Slack `#incidents` | Manual — engineer triggers page |
| Automated health checks | PagerDuty | Yes — if /health fails 3 consecutive checks |

**Auto-page thresholds:**
- Server HTTP error rate > 5% for 5 minutes
- Database connection pool > 90% utilization for 5 minutes
- API response time p95 > 10s for 5 minutes
- /health endpoint failure (3 consecutive)
- Disk usage > 90%
- Redpanda consumer lag > 10,000 messages for 10 minutes

### 3.3 Phase 2: Triage (First 15 minutes)

Primary on-call engineer:

1. **Acknowledge** PagerDuty alert within 5 minutes (or auto-escalate to secondary)
2. **Assess severity** using [SLA Framework](sla-framework.md) definitions
3. **Create incident channel** in Slack: `#incident-YYYY-MM-DD-brief-name`
4. **Post initial assessment** in incident channel:
   ```
   INCIDENT DECLARED
   Severity: P1/P2/P3
   Impact: [what's broken, who's affected]
   Current hypothesis: [best guess at cause]
   Next step: [what I'm doing right now]
   ```
5. **For P1:** Page Incident Commander; they take over coordination

### 3.4 Phase 3: Communication

#### Internal Communication

| Severity | Channel | Frequency |
|----------|---------|-----------|
| P1 | `#incidents` + incident channel + engineering-all | Every 15 minutes until mitigated |
| P2 | `#incidents` + incident channel | Every 30 minutes until mitigated |
| P3 | `#incidents` | On resolution only |

#### Customer Communication

| Severity | Channel | Timing |
|----------|---------|--------|
| P1 | Status page + email to affected tenants | Within 15 min of detection; updates every 30 min |
| P2 | Status page | Within 30 min; updates every hour |
| P3/P4 | Ticket update only | Per SLA response time |

#### Customer Notification Templates

**P1 — Initial Notification:**
> Subject: [Service Disruption] Yggdrasil ERP — {Component}
>
> We are currently experiencing a service disruption affecting {description of impact}. Our engineering team has been engaged and is actively working on resolution.
>
> **Impact:** {what customers cannot do}
> **Started:** {timestamp ET}
> **Status:** Investigating
>
> We will provide updates every 30 minutes. You can monitor real-time status at status.mimirlabs.com.

**P1 — Update:**
> **Update ({timestamp ET}):** {description of progress}. Estimated time to resolution: {ETA or "investigating"}. Next update in 30 minutes.

**P1 — Resolution:**
> Subject: [Resolved] Yggdrasil ERP — {Component}
>
> The service disruption affecting {description} has been resolved at {timestamp ET}. All systems are operating normally.
>
> **Root Cause:** {brief summary}
> **Duration:** {start} to {end} ({total time})
>
> We will publish a detailed post-mortem within 5 business days. We apologize for the inconvenience.

**P2 — Notification:**
> Subject: [Degraded Performance] Yggdrasil ERP — {Component}
>
> We are aware of degraded performance affecting {description}. A workaround is available: {workaround if applicable}. Our team is working on a permanent fix.
>
> **Status:** {Investigating / Identified / Monitoring}
> **Next update:** {time}

### 3.5 Phase 4: Mitigation

Goal: **Restore service as quickly as possible**, even if root cause is not yet understood.

Mitigation playbook (try in order):

1. **Restart** — If a single service is unhealthy, restart it
2. **Rollback** — If incident started after a deployment, rollback to previous version
3. **Scale** — If capacity-related, scale horizontally or increase resources
4. **Failover** — Switch to standby/replica if primary is unrecoverable
5. **Feature flag** — Disable the specific feature causing the issue
6. **Isolate** — If one tenant is causing system-wide impact, isolate their traffic

Document every mitigation action in the incident channel with timestamp.

### 3.6 Phase 5: Resolution

1. Confirm service is fully restored — verify via monitoring dashboards and customer confirmation
2. Update status page to "Resolved"
3. Send resolution notification to affected customers
4. Close PagerDuty incident
5. Post summary in `#incidents`:
   ```
   INCIDENT RESOLVED
   Severity: P1
   Duration: 2h 15m
   Impact: [summary]
   Root cause: [brief]
   Mitigation: [what fixed it]
   Post-mortem scheduled: [date]
   ```

### 3.7 Phase 6: Post-Mortem

See Section 5 below.

---

## 4. Incident Commander Role (P1 Only)

The Incident Commander (IC) is activated for all P1 incidents. The IC does **not** debug — they coordinate.

**Responsibilities:**
- Own the incident channel — keep it focused and organized
- Assign roles: debugging engineer(s), communications lead, customer liaison
- Make escalation decisions (engage additional engineers, notify leadership)
- Enforce communication cadence (15-min updates)
- Decide when to declare "mitigated" vs "resolved"
- Schedule post-mortem within 48 hours
- Ensure action items from post-mortem are tracked

**IC Rotation:** Monthly, among engineering leads and senior engineers. Current schedule maintained in PagerDuty as a separate rotation.

---

## 5. Post-Mortem Process

### 5.1 When Required

| Severity | Post-Mortem Required? | Timeline |
|----------|-----------------------|----------|
| P1 | Always | Within 5 business days |
| P2 | If duration > 2 hours or customer impact | Within 10 business days |
| P3/P4 | Optional — at team discretion | — |

### 5.2 Blameless Culture

- Post-mortems focus on **systems and processes**, not individuals
- Language like "human error" is replaced with "the system allowed X to happen"
- No disciplinary action from post-mortem findings
- Goal: make the system more resilient, not assign blame

### 5.3 Post-Mortem Template

```markdown
# Post-Mortem: [Incident Title]

**Date:** YYYY-MM-DD
**Severity:** P1/P2
**Duration:** HH:MM (start → end)
**Author:** [name]
**Reviewers:** [names]

## Summary
[2-3 sentence summary of what happened and impact]

## Impact
- **Tenants affected:** [count or "all"]
- **Users affected:** [estimate]
- **Revenue impact:** [if applicable]
- **Data loss:** [yes/no — describe if yes]

## Timeline (all times ET)
| Time | Event |
|------|-------|
| HH:MM | [Detection — how was it noticed?] |
| HH:MM | [Triage — on-call paged, severity assigned] |
| HH:MM | [Key debugging steps] |
| HH:MM | [Mitigation applied] |
| HH:MM | [Resolution confirmed] |

## Root Cause
[Detailed technical explanation of what went wrong and why]

## Contributing Factors
- [Factor 1 — e.g., missing monitoring for X]
- [Factor 2 — e.g., rollback procedure was untested]

## What Went Well
- [e.g., Detection was fast due to alerting]
- [e.g., Team coordination was smooth]

## What Could Be Improved
- [e.g., Rollback took 30 min because process was manual]
- [e.g., Customer communication was delayed]

## Action Items
| # | Action | Owner | Priority | Due Date | Status |
|---|--------|-------|----------|----------|--------|
| 1 | [action] | [name] | P1/P2/P3 | YYYY-MM-DD | Open |
| 2 | [action] | [name] | P1/P2/P3 | YYYY-MM-DD | Open |

## Lessons Learned
[Key takeaways for the team]
```

### 5.4 Post-Mortem Review

- Post-mortem document shared in `#engineering` Slack channel
- **Review meeting:** 30-minute meeting with involved engineers + IC + Support Manager
- **Action item tracking:** All items logged as Jira tickets under YGGDATA with `incident-followup` label
- **Monthly review:** Aggregate post-mortem trends reviewed in monthly engineering meeting

---

## 6. Tooling

| Tool | Purpose | Owner |
|------|---------|-------|
| **PagerDuty** | On-call scheduling, alerting, escalation policies | DevOps/SRE |
| **Grafana + Prometheus** | Monitoring dashboards, alert rules | DevOps/SRE |
| **Statuspage** (status.mimirlabs.com) | Customer-facing status page | Support Manager |
| **Slack** | `#incidents`, `#oncall-handoff`, incident channels | All |
| **Jira (YGGDATA)** | Post-mortem action items, incident-followup label | Engineering |
| **Google Docs / Confluence** | Post-mortem documents | IC (author) |

### 6.1 PagerDuty Escalation Policy

| Step | Timeout | Action |
|------|---------|--------|
| 1 | 0 min | Page primary on-call (push + SMS + phone) |
| 2 | 5 min | If unacknowledged, page secondary on-call |
| 3 | 10 min | If still unacknowledged, page engineering manager |
| 4 | 15 min | If still unacknowledged, page VP Engineering |

---

## 7. On-Call Readiness Checklist

Every on-call engineer must verify before their rotation starts:

- [ ] PagerDuty app installed and notifications enabled (push + SMS + phone)
- [ ] VPN access working
- [ ] SSH access to production servers verified
- [ ] Database read access confirmed
- [ ] Grafana dashboards bookmarked and accessible
- [ ] Runbooks reviewed for any recent updates
- [ ] Laptop + charger available at all times during rotation
- [ ] Personal schedule clear of activities that prevent 15-min response (flights, etc.)

---

## 8. Related Documents

- [SLA Framework](sla-framework.md) — Severity definitions and response/resolution targets
- [Support Tier Model](support-tier-model.md) — L1/L2/L3 escalation to on-call
- [Personnel Requirements](personnel-requirements.md) — On-call pool sizing
- [Operational Runbooks](runbooks/) — Per-component troubleshooting guides
