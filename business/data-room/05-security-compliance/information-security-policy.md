# Information Security Policy

**Mimir Labs — Yggdrasil ERP**

| Field | Value |
|-------|-------|
| Version | 1.0 |
| Effective date | 2026-03-01 |
| Owner | Chief Technology Officer, Mimir Labs |
| Review cycle | Annual (or after any material security incident) |
| Classification | Internal |

---

## 1. Purpose

This policy establishes the information security program for Mimir Labs and the Yggdrasil ERP platform. It defines the security principles, organizational roles, and baseline controls that protect the confidentiality, integrity, and availability of Yggdrasil ERP and the data it processes on behalf of our customers.

## 2. Scope

This policy applies to:

- All Mimir Labs employees, contractors, and third-party service providers who access Yggdrasil ERP systems or data.
- All components of the Yggdrasil ERP platform: the C++ backend server, Qt desktop client, Next.js web application, PostgreSQL databases, Redpanda event broker, Cloudflare tunnel infrastructure, and Go sidecar services.
- All environments: development, staging, and production.
- All tenant data processed through the multi-tenant architecture.

## 3. Security Principles

1. **Least privilege** — Users, services, and processes receive only the minimum access required to perform their function.
2. **Defense in depth** — No single control is relied upon. Overlapping controls (network, application, data layer) provide resilience against failure of any one layer.
3. **Tenant isolation** — Tenant data is logically separated at the database level (`tenant_id` foreign keys on all entity tables) and must never be exposed across tenant boundaries.
4. **Fail secure** — When a control fails, the system defaults to a denied/restricted state rather than an open one.
5. **Auditability** — All security-relevant actions are logged with sufficient detail to reconstruct what happened, when, and by whom.

## 4. Organizational Roles and Responsibilities

### 4.1 Executive Leadership

- Approves this policy and allocates budget for the security program.
- Reviews the risk register quarterly.
- Designates a Security Lead.

### 4.2 Security Lead

- Maintains and enforces this policy and all subordinate security policies.
- Coordinates incident response (see [Incident Response Plan](incident-response-plan.md)).
- Manages vulnerability assessments and penetration tests.
- Conducts access reviews on a quarterly basis.
- Acts as the primary contact for SOC 2 auditors.

### 4.3 Engineering

- Follows secure development practices as defined in the [Change Management Policy](change-management-policy.md).
- Remediates vulnerabilities within the SLAs defined in section 7.
- Protects credentials and secrets (see [Encryption Policy](encryption-policy.md)).

### 4.4 All Personnel

- Completes security awareness training within 30 days of onboarding and annually thereafter.
- Reports suspected security incidents immediately to the Security Lead.
- Does not share credentials, bypass access controls, or install unauthorized software on systems that process Yggdrasil ERP data.

## 5. Asset Inventory

Mimir Labs maintains an inventory of information assets including:

| Asset Category | Examples |
|---------------|----------|
| Infrastructure | Hetzner VPS (CPX31), Cloudflare tunnels, DNS records |
| Data stores | PostgreSQL databases (per-tenant), Redpanda topics, Redis |
| Applications | YggdrasilServer, YggdrasilClient, web-app, Go sidecar |
| Secrets | JWT signing key, database credentials, Cloudflare tunnel tokens, third-party API keys (Square, BoldSign, Mapbox) |
| Source code | GitHub repository (`yggdrasil`) |
| Backups | Daily `pg_dump` archives stored at `/opt/yggdrasil/backups/` |

The asset inventory is reviewed and updated at least annually or whenever infrastructure changes materially.

## 6. Risk Management

### 6.1 Risk Assessment

The Security Lead performs a formal risk assessment annually. Identified risks are recorded in the risk register (see `SOC2_ROADMAP.md` for the current register) with:

- Description and affected assets
- Likelihood and impact rating (Critical / High / Medium / Low)
- Assigned owner and remediation plan
- Target remediation date

### 6.2 Risk Acceptance

Risks rated Medium or below may be accepted by the Security Lead with documented justification. Risks rated High or Critical require Executive Leadership approval for acceptance.

## 7. Vulnerability Management

| Severity | Remediation SLA |
|----------|----------------|
| Critical | 72 hours |
| High | 7 calendar days |
| Medium | 30 calendar days |
| Low | Next scheduled release |

- Dependency scanning (`npm audit` for web-app, manual review for C++ libraries) runs in CI on every pull request.
- Static analysis is integrated into the build pipeline.
- Third-party penetration testing is conducted at least annually.

## 8. Network Security

- The VPS firewall (`ufw`) defaults to deny-all inbound; only SSH (port 22) is open externally.
- Application traffic (HTTP 8080, WebSocket 8081, Redpanda 19092) routes through Cloudflare Zero Trust tunnels — never exposed directly to the internet.
- `fail2ban` monitors SSH for brute-force attempts (5 retries, 1-hour ban).
- Internal service communication between containers uses Docker bridge networking with no published ports beyond what the Compose stack requires.

## 9. Endpoint Security

- Developer workstations must run full-disk encryption and a current operating system with automatic security updates enabled.
- Yggdrasil ERP production servers are provisioned via `infra/vps/provision.sh`, which applies OS hardening, firewall rules, and service isolation at first boot.
- No interactive logins are permitted on production infrastructure except through the `yggdrasil` system user account, which has no password-based SSH access.

## 10. Monitoring and Logging

- The Yggdrasil ERP server writes structured JSON logs with automatic file rotation (10 MB per file, 10 files retained).
- The `Logger::audit()` function records security-relevant events (authentication, authorization decisions, data mutations) with user ID, action, and detail fields.
- The `health-check.sh` script runs every 5 minutes via systemd timer to verify container health and logs results.
- Alerts for backup failures, container crashes, and health-check failures are routed to the Engineering team.

## 11. Subordinate Policies

This policy is supported by the following documents, each addressing a specific domain:

| Policy | Covers |
|--------|--------|
| [Access Control Policy](access-control-policy.md) | User provisioning, least privilege, reviews |
| [Data Classification Policy](data-classification-policy.md) | Public / Internal / Confidential / Restricted |
| [Encryption Policy](encryption-policy.md) | In-transit, at-rest, key management |
| [Incident Response Plan](incident-response-plan.md) | Detection, triage, containment, post-mortem |
| [Business Continuity / DR Plan](business-continuity-dr-plan.md) | RTO/RPO, failover, communication |
| [Data Retention & Disposal Policy](data-retention-disposal-policy.md) | Retention periods, secure destruction |
| [Vendor Risk Management Policy](vendor-risk-management-policy.md) | Third-party assessments |
| [Change Management Policy](change-management-policy.md) | Code review, CI gates, rollback |
| [Privacy Policy](privacy-policy.md) | PII handling, GDPR/CCPA |

## 12. Exceptions

Exceptions to this policy require written approval from the Security Lead and Executive Leadership. Approved exceptions are documented with:

- Scope and duration of the exception
- Compensating controls in place
- Review date (no longer than 90 days)

## 13. Enforcement

Violations of this policy may result in disciplinary action up to and including termination and, where applicable, legal action. Mimir Labs reserves the right to audit compliance with this policy at any time.

## 14. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-01 | Security Lead | Initial release |
