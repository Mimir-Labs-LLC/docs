# Incident Response Plan

**Mimir Labs — Yggdrasil ERP**

| Field | Value |
|-------|-------|
| Version | 1.0 |
| Effective date | 2026-03-01 |
| Owner | Security Lead, Mimir Labs |
| Review cycle | Annual (or after every Severity 1/2 incident) |
| Classification | Internal |

---

## 1. Purpose

This plan defines how Mimir Labs detects, responds to, contains, and recovers from security incidents affecting the Yggdrasil ERP platform and its tenants' data.

## 2. Scope

Any event that threatens the confidentiality, integrity, or availability of:

- Yggdrasil ERP application services (server, client, web app)
- Tenant data in PostgreSQL databases
- Infrastructure components (VPS, Redpanda broker, Cloudflare tunnels, Go sidecar)
- Mimir Labs corporate systems used to develop or operate Yggdrasil ERP

## 3. Incident Classification

### 3.1 Severity Levels

| Severity | Definition | Example | Response SLA |
|----------|-----------|---------|-------------|
| **SEV-1** (Critical) | Active data breach, complete service outage, or compromise of Restricted data | Unauthorized access to production database; JWT signing key leaked publicly | Acknowledge within 15 minutes; all-hands response |
| **SEV-2** (High) | Partial service degradation with data risk, or confirmed vulnerability under active exploitation | Cross-tenant data leak in a single endpoint; ransomware on a dev machine with production credentials | Acknowledge within 1 hour; Security Lead + Engineering |
| **SEV-3** (Medium) | Security event with no confirmed data exposure | Failed brute-force attack blocked by `fail2ban`; dependency with known CVE (no exploit observed) | Acknowledge within 4 hours; Security Lead |
| **SEV-4** (Low) | Policy violation or informational finding | Developer committed a test secret to a feature branch; audit finding with no immediate risk | Acknowledge within 1 business day |

### 3.2 Incident vs. Event

A **security event** is any observable occurrence (e.g., a failed login). An event becomes an **incident** when it indicates a confirmed or probable violation of security policy. The Security Lead makes this determination.

## 4. Roles

| Role | Person / Team | Responsibilities |
|------|--------------|-----------------|
| **Incident Commander (IC)** | Security Lead (default) or CTO for SEV-1 | Owns the response; makes containment decisions; coordinates communication |
| **Engineering Responder** | On-call engineer | Investigates technical root cause; executes containment and remediation |
| **Communications Lead** | CTO or designated person | Drafts customer notifications; handles external inquiries |
| **Scribe** | Any available team member | Maintains the incident timeline in real time |

## 5. Response Phases

### 5.1 Detection

Sources of detection:

| Source | What it catches |
|--------|----------------|
| Application audit log | Unauthorized data access, permission denials, unusual query patterns |
| `fail2ban` / firewall logs | SSH brute-force, port scanning |
| `health-check.sh` (runs every 5 min) | Container crashes, broker unavailability |
| CI/CD pipeline | Dependency vulnerabilities, SAST findings |
| External report | Customer-reported anomaly, security researcher disclosure |
| Third-party vendor notification | Breach at Square, BoldSign, Mapbox, or Cloudflare |

Anyone who detects a potential incident reports it immediately to the Security Lead.

### 5.2 Triage

The Security Lead (or IC delegate):

1. Confirms whether the event qualifies as an incident.
2. Assigns a severity level.
3. Opens an incident record with: timestamp, reporter, initial description, severity.
4. Assembles the response team per the severity's staffing requirement.
5. Establishes a dedicated communication channel (e.g., private Slack channel or war room).

### 5.3 Containment

**Short-term containment** — stop the bleeding without destroying evidence:

| Scenario | Containment action |
|----------|--------------------|
| Compromised user account | Deactivate user (`is_active = false`); invalidate sessions; rotate password |
| Leaked secret (JWT key, DB creds, API key) | Rotate the secret immediately; restart affected services |
| Exploited API vulnerability | Disable the affected endpoint or apply an emergency rate-limit; deploy a hotfix |
| Compromised VPS | Isolate the host (firewall deny-all); snapshot disk for forensics |
| Cross-tenant data leak | Shut down the affected endpoint; identify scope of exposure |

**Long-term containment** — stabilize while preparing the permanent fix:

- Apply temporary patches or configuration changes.
- Enable enhanced logging on affected components.
- Confirm containment is holding before moving to eradication.

### 5.4 Eradication

1. Identify and remove the root cause (patch vulnerability, remove malware, close misconfiguration).
2. Review related code and infrastructure for similar weaknesses.
3. Verify eradication with targeted testing.

### 5.5 Recovery

1. Restore affected services from known-good state (redeploy from CI, restore database from backup if necessary).
2. Monitor closely for recurrence (enhanced logging for 72 hours minimum).
3. Confirm tenant data integrity.
4. Communicate service restoration to affected tenants.

### 5.6 Post-Mortem

Conducted within 5 business days of incident closure. The post-mortem document includes:

- **Timeline** — Chronological record from detection to resolution.
- **Root cause analysis** — What failed and why.
- **Impact assessment** — Which tenants, data, and services were affected.
- **Action items** — Remediation tasks with owners and due dates.
- **Lessons learned** — What went well, what didn't, what to change.

Post-mortem documents are stored in the internal documentation repository and reviewed during the next quarterly security review.

## 6. Communication

### 6.1 Internal Communication

- SEV-1/2: Real-time updates in the incident channel every 30 minutes until resolved.
- SEV-3/4: Updates in the daily standup or asynchronous thread.

### 6.2 Customer Notification

| Severity | Notification required | Timeline |
|----------|----------------------|----------|
| SEV-1 with confirmed data exposure | Yes — direct notification to affected tenants | Within 72 hours of confirmation (per GDPR Article 33 timeline) |
| SEV-2 with potential data exposure | Yes — notification with status updates | Within 72 hours |
| SEV-3/4 | Not required unless regulatory obligations apply | N/A |

Notification includes: what happened, what data was affected, what Mimir Labs is doing about it, and what (if anything) the tenant should do.

### 6.3 Regulatory Notification

If the incident involves personal data of EU residents, the Security Lead assesses whether notification to a supervisory authority is required under GDPR (72-hour window). For California residents, CCPA notification requirements apply.

## 7. Evidence Preservation

- Do not modify or delete logs, database records, or configuration files related to the incident until the post-mortem is complete.
- Take filesystem snapshots of compromised hosts before remediation.
- Export relevant audit_log entries and application logs to a tamper-evident archive.
- Chain of custody: record who accessed what evidence and when.

## 8. Tabletop Exercises

The Security Lead conducts at least one tabletop exercise annually to validate this plan. Exercises simulate scenarios such as:

- Leaked JWT signing key
- Cross-tenant data exposure via a controller bug
- Ransomware on the VPS
- Compromised third-party vendor (e.g., Cloudflare tunnel token revoked)

Findings from exercises are treated as action items and tracked to resolution.

## 9. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-01 | Security Lead | Initial release |
