# Change Management Policy

**Mimir Labs — Yggdrasil ERP**

| Field | Value |
|-------|-------|
| Version | 1.0 |
| Effective date | 2026-03-01 |
| Owner | CTO, Mimir Labs |
| Review cycle | Annual |
| Classification | Internal |

---

## 1. Purpose

This policy defines how changes to the Yggdrasil ERP codebase, infrastructure, database schema, and configuration are proposed, reviewed, tested, deployed, and rolled back. It ensures that all changes are traceable, peer-reviewed, and validated before reaching production.

## 2. Scope

Covers all changes to:

- Application code (server, client, web app, Go sidecar, common libraries)
- Database schema and migrations
- Infrastructure configuration (VPS provisioning, Docker Compose, systemd units)
- CI/CD pipeline definitions
- Server and application configuration (`server.conf`, `next.config.js`, `.env` files)
- Third-party dependency versions

## 3. Change Categories

| Category | Definition | Approval required |
|----------|-----------|------------------|
| **Standard** | Planned feature work, refactoring, or non-urgent bug fixes following the normal release cycle | Peer review (1 approving reviewer) |
| **Expedited** | Urgent fix for a production issue that cannot wait for the next release cycle | Peer review + CTO or Security Lead verbal approval; written follow-up within 24 hours |
| **Emergency** | Hotfix during an active SEV-1/2 incident; deployed immediately to restore service | IC approval during incident; post-mortem review within 5 business days |
| **Infrastructure** | Changes to VPS configuration, Cloudflare settings, Docker Compose, DNS, or secrets | Security Lead approval |

## 4. Development Workflow

### 4.1 Branching

- `main` is the protected trunk. Direct pushes are blocked.
- Feature work happens on branches named after the task (e.g., `feat/audit-log`, `fix/tenant-isolation`).
- Version branches (e.g., `v0.3.0a`) are created when the build number iterates, per the versioning protocol in `CLAUDE.md`.

### 4.2 Versioning

Versions follow `v[Major].[Build].[Patch][Phase]` with a nudge suffix (`-N`) for unverified pushes. See `CLAUDE.md` for the full protocol. Every push iterates the patch number unless otherwise instructed.

### 4.3 Commit Standards

- Commit messages describe the *why*, not just the *what*.
- Each commit should be a logical unit of work — avoid mixing unrelated changes.
- Secrets, credentials, and PII must never appear in commit messages or diffs.

## 5. Code Review

### 5.1 Requirements

Every change to a protected branch requires:

| Check | Description |
|-------|------------|
| **Peer review** | At least 1 approving review from a team member who did not author the change |
| **CI pass** | All CI jobs must pass (see section 6) |
| **No unresolved comments** | All review comments must be resolved or acknowledged |
| **Up-to-date branch** | The branch must be rebased on or merged with the latest `main` |

### 5.2 Review Focus Areas

Reviewers should pay particular attention to:

- **Tenant isolation** — Every database query involving tenant data must include a `tenant_id` filter. Missing filters are a blocking finding.
- **Authentication and authorization** — New endpoints must be gated by appropriate permission checks.
- **Input validation** — User-supplied data must be validated before use.
- **Secret handling** — No hardcoded secrets; secrets loaded from vault or environment variables.
- **SQL injection** — Parameterized queries only; no string interpolation in SQL.
- **Dependency additions** — New dependencies must be justified and scanned for known vulnerabilities.
- **Schema changes** — Database migrations must be backwards-compatible or include a rollback migration.

### 5.3 Expedited and Emergency Reviews

- **Expedited:** The author self-reviews with a documented checklist and obtains verbal approval from the CTO or Security Lead. A follow-up PR is opened within 24 hours for formal review.
- **Emergency:** The Incident Commander approves the change during the incident. A retroactive PR with full review is opened within 5 business days.

## 6. CI/CD Pipeline

The GitHub Actions pipeline (`.github/workflows/ci.yml`) runs on every push and PR:

| Job | What it validates |
|-----|------------------|
| `web-lint` | ESLint + TypeScript strict type checking |
| `web-test` | Vitest unit tests |
| `web-build` | Next.js production build succeeds |
| `server-build` | CMake + Ninja build of C++ server in Docker |
| `server-test` | Catch2 unit tests |
| `client-build` | CMake + Ninja build of Qt desktop client |
| `schema-validate` | PostgreSQL schema applies cleanly; table count >= 101 |

### 6.1 CI Gates

- All 7 jobs must pass before a PR can be merged to `main`.
- Dependency scanning alerts block merge for Critical/High findings.
- SAST findings at Critical severity block merge.

### 6.2 Pipeline Changes

Changes to the CI/CD pipeline itself (workflow files, Docker images, CI secrets) require Security Lead review in addition to standard peer review.

## 7. Deployment

### 7.1 Tenant-Site Deployments

Tenant sites run the Yggdrasil ERP server locally. Updates are delivered as:

1. Tagged release in Git (e.g., `v0.3.2a`).
2. Build artifacts produced by CI.
3. Deployment instructions or automated update script delivered to the tenant admin.
4. Tenant admin applies the update during a maintenance window.

### 7.2 Central VPS Deployments

Changes to the central broker infrastructure (`infra/vps/`):

1. Tested in a staging environment or local Docker Compose.
2. Applied to production via SSH by an authorized operator.
3. Verified with `health-check.sh`.
4. Documented in the change log.

### 7.3 Web Application Deployments

The Next.js web app is built and deployed as a static/SSR application:

1. `npm run build` produces the production artifact.
2. Deployed to the hosting environment.
3. Smoke test confirms the app loads and API connectivity is healthy.

## 8. Rollback

### 8.1 Application Rollback

- The previous release artifact is retained in CI (last 5 builds).
- Rollback is performed by deploying the previous artifact.
- Rollback decision is made by the CTO or IC within 30 minutes of detecting a regression.

### 8.2 Database Rollback

- Schema migrations include a rollback script (reverse migration).
- If a migration cannot be reversed, this is documented in the PR and the reviewer confirms the risk is acceptable.
- Data-destructive migrations (dropping columns, tables) require CTO approval and a pre-migration backup.

### 8.3 Infrastructure Rollback

- Infrastructure configuration is version-controlled.
- The previous Docker Compose and `.env` configuration can be restored from Git history.
- VPS can be rebuilt from scratch using `provision.sh` (see [BC/DR Plan](business-continuity-dr-plan.md)).

## 9. Change Log

All changes reaching production are recorded:

- **Git history** provides the authoritative record of code changes.
- **`CHANGELOG.md`** summarizes user-facing changes per release.
- **PR descriptions** document the intent, scope, and testing of each change.
- **Infrastructure changes** are logged in the incident/change channel.

## 10. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-01 | CTO | Initial release |
