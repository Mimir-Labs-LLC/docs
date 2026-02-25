# SOC 2 Compliance Roadmap — Yggdrasil ERP

> **Last updated:** 2026-02-20
> **Status:** Planning
> **Target:** Type I readiness by end of Phase 3; Type II observation begins Phase 4

---

## Current State

Yggdrasil has foundational elements in place but significant gaps remain before SOC 2 attestation.

### What exists today

| Area | Implementation | Gaps |
|------|---------------|------|
| **Authentication** | JWT (HS256, 1 hr expiry), salted SHA-256 passwords, refresh tokens | No MFA, no account lockout, no password complexity enforcement |
| **Authorization** | Database-driven RBAC (9 roles, 33 permissions, `tenant_roles`/`role_permissions` tables) | Not enforced per-endpoint; controllers must check manually |
| **Multi-tenancy** | `tenant_id` FK on all 117+ tables with cascade delete; app-layer enforcement on list, update, and delete operations via `resolveTenantId()` helper | No PostgreSQL RLS; isolation depends entirely on app-layer WHERE clauses |
| **Logging** | Structured JSON logger with file rotation (10 MB / 10 files); `Logger::audit()` method; `audit_change_log` table with field-level diffs (who, what, when, old/new as JSONB); `created_by`/`updated_by` on 35+ tables; soft-delete on 16 key tables | Audit viewer exists in Admin UI but not yet in desktop client; logs are still mutable flat files on disk |
| **Encryption in transit** | SSL config keys present in `server.conf` | `EnableSSL=false` by default; CORS set to `*` |
| **Encryption at rest** | Passwords salted+hashed | No field-level encryption for PII; backups unencrypted |
| **Secrets** | Config file values (`JWTSecret=change_me_in_production`) | No vault integration; no rotation mechanism |
| **Rate limiting** | Per-endpoint sliding window (100/60 s default, 50/60 s auth) | In-memory only; no per-IP or per-user limiting |
| **Input validation** | Validator utility (email, length, range, PO-specific) | Partial coverage; no CSRF tokens; no XSS filtering |
| **Backups** | Daily `pg_dump`, 14-day retention, systemd timer | Not encrypted; no restore testing; no off-site copy |
| **CI/CD** | 8-job GitHub Actions pipeline (web-lint, web-test, web-build, server-build, server-test, client-build, client-test, schema-validate) with minimal permissions | No SAST, no dependency scanning, no SBOM |
| **Compliance tests** | Arc 20 (compliance-audit) with 1 story on audit trail | Endpoint returns 404; minimal coverage |

---

## Type I — Design Effectiveness

Type I attests that controls are **suitably designed** at a point in time. Each phase below
maps controls to the AICPA Trust Services Criteria (TSC).

### Phase 1 — Audit & Encryption Foundations

_Target: controls designed and deployed_

| # | Control | TSC | Work Required |
|---|---------|-----|---------------|
| 1.1 | **Immutable audit log** | CC7.2, CC7.3 | *Partially done:* `audit_change_log` table exists with field-level diffs (who, what, when, old/new as JSONB); `GET /api/admin/change-log` endpoint with filters; `created_by`/`updated_by` on 35+ tables; soft-delete on 16 key tables. *Remaining:* Add DB triggers for immutability (append-only), ensure all INSERT/UPDATE/DELETE operations are captured via triggers (not just app-layer). |
| 1.2 | **Enable TLS by default** | CC6.1, CC6.7 | Set `EnableSSL=true` in `server.conf`. Document cert provisioning. Add HSTS header. Enforce HTTPS redirect in web app. |
| 1.3 | **Restrict CORS** | CC6.1 | Replace `CORSOrigins=*` with explicit allowed origins in `server.conf`. |
| 1.4 | **Login audit events** | CC7.2 | Log every login attempt (success/failure, user, IP, timestamp) to audit_log. |
| 1.5 | **Encrypt backups** | CC6.1, A1.2 | AES-256-encrypt `pg_dump` output in `backup-db.sh`. Store key separately. Add SHA-256 checksum verification. |

### Phase 2 — Access Control Hardening

| # | Control | TSC | Work Required |
|---|---------|-----|---------------|
| 2.1 | **Password policy enforcement** | CC6.1 | Min 12 chars, upper+lower+digit+special. Reject common passwords. Migrate hash from SHA-256 to Argon2id. |
| 2.2 | **Account lockout** | CC6.1, CC6.2 | Lock after 5 failed attempts in 15 min. Auto-unlock after 30 min or admin override. Log lockouts to audit. |
| 2.3 | **Server-side session expiry** | CC6.1 | Enforce `SessionTimeout` in AuthMiddleware. Track last-activity timestamp. Invalidate stale sessions. |
| 2.4 | **Endpoint-level RBAC** | CC6.3 | Create `PermissionMiddleware` that checks `role_permissions` before every controller method. Return 403 + audit entry on denial. |
| 2.5 | **PostgreSQL Row-Level Security** | CC6.3, CC6.5 | Enable RLS on all tenant-scoped tables. Create policies: `USING (tenant_id = current_setting('app.current_tenant')::uuid)`. Set `app.current_tenant` on each connection. |

### Phase 3 — Data Protection & Secrets

| # | Control | TSC | Work Required |
|---|---------|-----|---------------|
| 3.1 | **Field-level encryption for PII** | C1.1, C1.2 | Identify sensitive columns (SSN, bank account, carrier API keys). Encrypt via `pgcrypto` or app-layer AES. Document key management. |
| 3.2 | **Secrets vault integration** | CC6.1 | Migrate `JWTSecret`, DB password, third-party API keys out of config files into HashiCorp Vault or AWS Secrets Manager. |
| 3.3 | **JWT secret rotation** | CC6.1 | Support dual-key window (old key valid for grace period). Quarterly rotation schedule. |
| 3.4 | **MFA framework** | CC6.1, CC6.6 | TOTP-based second factor for admin and finance roles. Store TOTP seed encrypted. Enforce on sensitive endpoints. |

**Type I readiness checkpoint** — after Phase 3, engage an auditor to assess control design.

---

## Type II — Operating Effectiveness

Type II attests that controls **operated effectively** over a review period (typically 6-12 months).
The observation window starts once Phase 3 controls are live.

### Phase 4 — Monitoring, Testing & Evidence Collection

| # | Control | TSC | Work Required |
|---|---------|-----|---------------|
| 4.1 | **Centralized log aggregation** | CC7.2, CC7.3 | Ship structured logs + audit_log to ELK / CloudWatch / Datadog. Enforce read-only access for auditors. Define retention >= 12 months. |
| 4.2 | **Automated alerting** | CC7.2, CC7.4 | Alert on: >= 10 failed logins/hr, cross-tenant access attempts, permission denials, backup failures, elevated-privilege usage. |
| 4.3 | **SAST in CI** | CC8.1 | Add SonarQube or Clang Static Analyzer to GitHub Actions. Block merges on high/critical findings. |
| 4.4 | **Dependency scanning** | CC8.1 | Add `npm audit` and C++ dependency checks. Generate SBOM on each release. |
| 4.5 | **Penetration testing** | CC4.1 | Engage third-party firm. Scope: API, web app, multi-tenant isolation, auth flows. Remediate criticals before observation window. |
| 4.6 | **Automated compliance test suite** | CC4.1 | Expand Arc 20 or create new arc with stories for: cross-tenant isolation proof, RBAC enforcement per endpoint, audit completeness, session timeout, rate limiting. |

### Phase 5 — Observation Window (6 months)

| # | Activity | Evidence Produced |
|---|----------|-------------------|
| 5.1 | Run all controls continuously | Audit log entries, alert history, backup logs |
| 5.2 | Quarterly access reviews | Spreadsheet of user-role assignments reviewed by management |
| 5.3 | Monthly backup restore tests | Restore verification logs with timestamps |
| 5.4 | Incident response drills | Tabletop exercise reports (at least 1 during window) |
| 5.5 | Change management log | Git history + PR reviews + CI results for every production deploy |

### Phase 6 — Audit & Attestation

| # | Activity | Notes |
|---|----------|-------|
| 6.1 | Select auditor | Big 4 or SOC 2-specialized firm |
| 6.2 | Readiness assessment | Pre-audit gap check (optional but recommended) |
| 6.3 | Evidence package delivery | All artifacts from Phase 5 |
| 6.4 | Auditor fieldwork | Typically 4-8 weeks |
| 6.5 | Report issuance | SOC 2 Type II report with opinion |

---

## Required Policy Documents

All policies are in [`docs/policies/`](docs/policies/). They must be approved by management and in effect before the observation window opens.

| Document | File | Status |
|----------|------|--------|
| Information Security Policy | [`information-security-policy.md`](docs/policies/information-security-policy.md) | Draft |
| Access Control Policy | [`access-control-policy.md`](docs/policies/access-control-policy.md) | Draft |
| Data Classification Policy | [`data-classification-policy.md`](docs/policies/data-classification-policy.md) | Draft |
| Encryption Policy | [`encryption-policy.md`](docs/policies/encryption-policy.md) | Draft |
| Incident Response Plan | [`incident-response-plan.md`](docs/policies/incident-response-plan.md) | Draft |
| Business Continuity / DR Plan | [`business-continuity-dr-plan.md`](docs/policies/business-continuity-dr-plan.md) | Draft |
| Data Retention & Disposal Policy | [`data-retention-disposal-policy.md`](docs/policies/data-retention-disposal-policy.md) | Draft |
| Vendor Risk Management Policy | [`vendor-risk-management-policy.md`](docs/policies/vendor-risk-management-policy.md) | Draft |
| Change Management Policy | [`change-management-policy.md`](docs/policies/change-management-policy.md) | Draft |
| Privacy Policy | [`privacy-policy.md`](docs/policies/privacy-policy.md) | Draft |

---

## Risk Register

| ID | Risk | Severity | Phase | Mitigation |
|----|------|----------|-------|------------|
| R1 | Audit trail exists (`audit_change_log`) but not immutable — no DB triggers, records can be modified | High | 1 | Control 1.1: add DB triggers for immutability; make audit_change_log append-only |
| R2 | SSL disabled — traffic interceptable | Critical | 1 | Control 1.2: enable TLS |
| R3 | CORS `*` — any origin can call API | High | 1 | Control 1.3: restrict origins |
| R4 | No RLS — DB queries can leak cross-tenant data | Critical | 2 | Control 2.5: PostgreSQL RLS policies |
| R5 | RBAC not enforced — endpoints unprotected | High | 2 | Control 2.4: PermissionMiddleware |
| R6 | SHA-256 passwords — vulnerable to GPU attacks | High | 2 | Control 2.1: migrate to Argon2id |
| R7 | Secrets in config files — exposed in repo/backups | High | 3 | Control 3.2: vault integration |
| R8 | Backups unencrypted — data exposure if stolen | High | 1 | Control 1.5: AES-256 encryption |
| R9 | No SAST/dependency scanning — undetected vulns | Medium | 4 | Controls 4.3, 4.4 |
| R10 | No MFA — single-factor auth insufficient | Medium | 3 | Control 3.4: TOTP for sensitive roles |
| R11 | Sessions never expire server-side | High | 2 | Control 2.3: enforce SessionTimeout |
| R12 | No centralized logging — evidence gaps | Medium | 4 | Control 4.1: log aggregation |

---

## Key Files to Modify

| Control Area | Files |
|-------------|-------|
| Audit log | `database/schema/` (new table + triggers), `server/src/core/Logger.cpp` |
| TLS / CORS | `server/config/server.conf`, `server/src/main.cpp` |
| Password / session | `server/src/auth/AuthManager.cpp`, `server/include/auth/AuthManager.h` |
| RBAC middleware | `server/src/middleware/` (new), `server/src/controllers/` (wire up) |
| Row-Level Security | `database/schema/yggdrasil_complete_schema.sql` |
| Secrets | `server/config/server.conf`, new vault integration module |
| Backup encryption | `infra/vps/backup-db.sh` |
| CI security | `.github/workflows/ci.yml` |
| Compliance tests | `tests/stories/` (expand arc 20 or new arc) |
