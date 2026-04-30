# SOC 2 Compliance Roadmap — Yggdrasil ERP

> **Last updated:** 2026-03-02
> **Status:** Phase 2 Complete; Phase 3 In Progress
> **Target:** Type I readiness by end of Phase 3; Type II observation begins Phase 4

---

## Current State

Yggdrasil ERP has completed significant security hardening through v0.4.5a. Phases 1 and 2 are substantially complete.

### What exists today

| Area | Implementation | Remaining Gaps |
|------|---------------|----------------|
| **Authentication** | JWT (HS256, 1 hr expiry), Argon2id password hashing, TOTP MFA (RFC 6238) for admin/finance roles, password complexity (12+ chars, upper+lower+digit+special), progressive lockout (5 attempts), password history enforcement | Token refresh mechanism not yet implemented |
| **Authorization** | Database-driven RBAC (9 roles, 33 permissions), `enforceRbac()` middleware auto-detects module from table name, fail-closed for unmatched routes | — |
| **Multi-tenancy** | `tenant_id` FK on all 150+ tables with cascade delete, PostgreSQL Row-Level Security (migration 015) | — |
| **Logging** | Structured JSON logger with file rotation (10 MB / 10 files), immutable `audit_log` table (migration 014) with DB triggers, `/api/admin/audit` endpoint with filters and pagination | No centralized log aggregation (ELK/Datadog) yet |
| **Encryption in transit** | SSL config keys present in `server.conf`, Cloudflare tunnel provides TLS termination | `EnableSSL=false` on local server (tunnel handles TLS) |
| **Encryption at rest** | Passwords hashed with Argon2id | No field-level encryption for PII; backup encryption not yet implemented |
| **Secrets** | Config file values (`JWTSecret` read from server.conf) | No vault integration; no rotation mechanism |
| **Rate limiting** | Per-endpoint sliding window (100/60 s default, 50/60 s auth) | In-memory only; no per-IP or per-user limiting |
| **Input validation** | Validator utility, OpenAPI 3.0.3 spec with `additionalProperties:false` on all 150 Create schemas, 1,404 format constraints, 878 maxLength limits, StrictJsonParser (no type coercion) | CSRF tokens not yet implemented |
| **Backups** | Daily `pg_dump`, 14-day local + 90-day off-site retention, admin backup/restore endpoints | Backups not yet encrypted at rest |
| **CI/CD** | 7-job GitHub Actions pipeline (lint, test, build for web/server/client, schema validation) | No SAST, no dependency scanning, no SBOM |
| **Compliance tests** | 20 integration test arcs, 106 story files, k6 load testing suite | Compliance-specific arc coverage still limited |

---

## Type I — Design Effectiveness

Type I attests that controls are **suitably designed** at a point in time. Each phase below
maps controls to the AICPA Trust Services Criteria (TSC).

### Phase 1 — Audit & Encryption Foundations ✓ COMPLETE

_All controls designed and deployed._

| # | Control | TSC | Status |
|---|---------|-----|--------|
| 1.1 | **Immutable audit log** | CC7.2, CC7.3 | ✓ Done — `audit_log` table (migration 014), DB triggers on all entity tables, read-only `/api/admin/audit` with filters and pagination (YGGDATA-21). |
| 1.2 | **Enable TLS by default** | CC6.1, CC6.7 | ✓ Done — Cloudflare tunnel provides TLS termination for all external traffic. HSTS via Cloudflare. |
| 1.3 | **Restrict CORS** | CC6.1 | ✓ Done — CORS restricted to configured origins. |
| 1.4 | **Login audit events** | CC7.2 | ✓ Done — All login attempts logged (success/failure, user, IP, timestamp). |
| 1.5 | **Encrypt backups** | CC6.1, A1.2 | ○ Partial — Backup/restore endpoints exist. Encryption at rest not yet implemented. |

### Phase 2 — Access Control Hardening ✓ COMPLETE

| # | Control | TSC | Status |
|---|---------|-----|--------|
| 2.1 | **Password policy enforcement** | CC6.1 | ✓ Done — Min 12 chars, upper+lower+digit+special, password history (YGGDATA-263). Argon2id hashing. |
| 2.2 | **Account lockout** | CC6.1, CC6.2 | ✓ Done — Progressive lockout (5 attempts), admin unlock endpoint (YGGDATA-263). |
| 2.3 | **Server-side session expiry** | CC6.1 | ✓ Done — JWT 1-hour expiry enforced server-side. httpOnly cookie auth for web (YGGDATA-265). |
| 2.4 | **Endpoint-level RBAC** | CC6.3 | ✓ Done — `enforceRbac()` middleware auto-detects module from table name, fail-closed (YGGDATA-267). |
| 2.5 | **PostgreSQL Row-Level Security** | CC6.3, CC6.5 | ✓ Done — RLS policies on all tenant-scoped tables (migration 015). |

### Phase 3 — Data Protection & Secrets (IN PROGRESS)

| # | Control | TSC | Status |
|---|---------|-----|--------|
| 3.1 | **Field-level encryption for PII** | C1.1, C1.2 | ○ Not started — Identify sensitive columns, encrypt via pgcrypto or app-layer AES. |
| 3.2 | **Secrets vault integration** | CC6.1 | ○ Not started — Migrate secrets from config files to HashiCorp Vault (YGGDATA-264). |
| 3.3 | **JWT secret rotation** | CC6.1 | ○ Not started — Dual-key window with quarterly rotation. |
| 3.4 | **MFA framework** | CC6.1, CC6.6 | ✓ Done — TOTP MFA (RFC 6238) for admin and finance roles, encrypted seed storage (YGGDATA-263). |

**Type I readiness checkpoint** — Controls 3.1–3.3 remain. After completion, engage an auditor to assess control design.

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
| Information Security Policy | [`information-security-policy.md`](docs/policies/information-security-policy.md) | Complete (2026-03-01) |
| Access Control Policy | [`access-control-policy.md`](docs/policies/access-control-policy.md) | Complete (2026-03-01) |
| Data Classification Policy | [`data-classification-policy.md`](docs/policies/data-classification-policy.md) | Complete (2026-03-01) |
| Encryption Policy | [`encryption-policy.md`](docs/policies/encryption-policy.md) | Complete (2026-03-01) |
| Incident Response Plan | [`incident-response-plan.md`](docs/policies/incident-response-plan.md) | Complete (2026-03-01) |
| Business Continuity / DR Plan | [`business-continuity-dr-plan.md`](docs/policies/business-continuity-dr-plan.md) | Complete (2026-03-01) |
| Data Retention & Disposal Policy | [`data-retention-disposal-policy.md`](docs/policies/data-retention-disposal-policy.md) | Complete (2026-03-01) |
| Vendor Risk Management Policy | [`vendor-risk-management-policy.md`](docs/policies/vendor-risk-management-policy.md) | Complete (2026-03-01) |
| Change Management Policy | [`change-management-policy.md`](docs/policies/change-management-policy.md) | Complete (2026-03-01) |
| Privacy Policy | [`privacy-policy.md`](docs/policies/privacy-policy.md) | Complete (2026-03-01) |

---

## Risk Register

| ID | Risk | Severity | Phase | Status |
|----|------|----------|-------|--------|
| R1 | No audit trail — cannot prove data integrity | Critical | 1 | ✓ RESOLVED — Immutable audit_log table with triggers (migration 014) |
| R2 | SSL disabled — traffic interceptable | Critical | 1 | ✓ RESOLVED — Cloudflare tunnel provides TLS termination |
| R3 | CORS `*` — any origin can call API | High | 1 | ✓ RESOLVED — CORS restricted to configured origins |
| R4 | No RLS — DB queries can leak cross-tenant data | Critical | 2 | ✓ RESOLVED — PostgreSQL RLS on all tenant-scoped tables (migration 015) |
| R5 | RBAC not enforced — endpoints unprotected | High | 2 | ✓ RESOLVED — enforceRbac() middleware, fail-closed (YGGDATA-267) |
| R6 | SHA-256 passwords — vulnerable to GPU attacks | High | 2 | ✓ RESOLVED — Migrated to Argon2id (YGGDATA-263) |
| R7 | Secrets in config files — exposed in repo/backups | High | 3 | ○ OPEN — Vault integration planned (YGGDATA-264) |
| R8 | Backups unencrypted — data exposure if stolen | High | 1 | ○ OPEN — Backup endpoints exist, encryption at rest not yet implemented |
| R9 | No SAST/dependency scanning — undetected vulns | Medium | 4 | ○ OPEN — Phase 4 work |
| R10 | No MFA — single-factor auth insufficient | Medium | 3 | ✓ RESOLVED — TOTP MFA for admin/finance roles (YGGDATA-263) |
| R11 | Sessions never expire server-side | High | 2 | ✓ RESOLVED — JWT 1-hour expiry, httpOnly cookies (YGGDATA-265) |
| R12 | No centralized logging — evidence gaps | Medium | 4 | ○ OPEN — Phase 4 work |

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
