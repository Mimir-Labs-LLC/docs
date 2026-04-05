# Release Management & Patch Deployment Process

**Document Owner:** Mimir Labs Engineering
**Last Updated:** 2026-03-14

---

## 1. Release Cadence

| Release Type | Frequency | Scope | Approval |
|-------------|-----------|-------|----------|
| **Major** (v1.0 → v2.0) | Quarterly | Breaking changes, large features, schema overhauls | VP Engineering + Product |
| **Minor** (v1.0 → v1.1) | Monthly | New features, non-breaking enhancements | Engineering Lead |
| **Patch** (v1.1.0 → v1.1.1) | As-needed (weekly) | Bug fixes, security patches, small improvements | Engineering Lead |
| **Hotfix** | Emergency | Critical bug or security vulnerability in production | On-call L3 + Engineering Lead |

### Version Format

Per `CLAUDE.md`: `v[Major].[Build].[Patch][Phase]`
- Major/Build/Patch are numerical; Phase is alphabetical (e.g., `a` for alpha)
- Nudge suffix (`-N`) for unverified pushes

---

## 2. Release Pipeline

```
Development → Code Review → QA/Testing → Staging → Production
```

### Gate Criteria

| Gate | From → To | Requirements |
|------|-----------|-------------|
| **Code Review** | Dev → Review | PR approved by 1+ reviewer; CI passes (lint, type-check, unit tests) |
| **QA** | Review → QA | All CI jobs green; no known P1/P2 regressions |
| **Staging** | QA → Staging | QA sign-off; integration tests pass; schema migration tested |
| **Production** | Staging → Prod | 24h soak on staging (72h for major); no new issues; release notes prepared |

### CI Pipeline (GitHub Actions)

| Job | What | Blocks Merge? |
|-----|------|---------------|
| `web-lint` | ESLint + TypeScript strict | Yes |
| `web-test` | Vitest unit tests | Yes |
| `web-build` | Next.js production build | Yes |
| `server-build` | CMake + Ninja C++ build | Yes |
| `server-test` | Catch2 unit tests | Yes |
| `client-build` | CMake + Ninja desktop build | Yes |
| `schema-validate` | PostgreSQL schema + migrations + seed | Yes |

---

## 3. Deployment Process

### 3.1 Server (C++/Qt)

```bash
# 1. Build on CI or build server
cd server/build && cmake .. -DCMAKE_BUILD_TYPE=Release && make -j$(nproc)

# 2. Transfer binary to staging/production
scp build/YggdrasilServer deploy@prod:/opt/yggdrasil/server/YggdrasilServer.new

# 3. Stop current server
ssh deploy@prod "sudo systemctl stop yggdrasil-server"

# 4. Swap binary
ssh deploy@prod "cd /opt/yggdrasil/server && mv YggdrasilServer YggdrasilServer.prev && mv YggdrasilServer.new YggdrasilServer && chmod +x YggdrasilServer"

# 5. Start (migrations auto-apply)
ssh deploy@prod "sudo systemctl start yggdrasil-server"

# 6. Health check
curl -s https://api.yggdrasil.com/health | jq .
```

### 3.2 Database Migrations

- Migrations execute automatically on server startup via `Migrations.cpp`
- Each migration uses `IF NOT EXISTS` guards for idempotency
- **Pre-deployment:** Review migration SQL for irreversible operations (DROP, ALTER TYPE)
- **Major migrations:** Test on staging with production-sized data first

### 3.3 Web App (Next.js)

```bash
# 1. Build
cd web-app && npm ci && npm run build

# 2. Deploy (PM2 on production)
ssh deploy@prod "cd /opt/yggdrasil/web-app && git pull && npm ci && npm run build && pm2 restart yggdrasil-web"

# 3. Verify
curl -s -o /dev/null -w "%{http_code}" https://app.yggdrasil.com
```

### 3.4 Desktop Client

| Distribution Method | Mechanism |
|---------------------|-----------|
| Auto-update (future) | Client checks server `/api/version` endpoint; prompts download if newer |
| Manual distribution | Installer uploaded to download portal; customers notified via email |
| Enterprise deployment | MSI/pkg package for IT deployment tools (SCCM, Jamf) |

**Version compatibility:** Desktop client must be within 1 minor version of server. Server returns `X-Min-Client-Version` header; client shows upgrade prompt if below minimum.

---

## 4. Rollback Procedures

### 4.1 Server Rollback

```bash
# Swap to previous binary
ssh deploy@prod "cd /opt/yggdrasil/server && sudo systemctl stop yggdrasil-server && mv YggdrasilServer YggdrasilServer.failed && mv YggdrasilServer.prev YggdrasilServer && sudo systemctl start yggdrasil-server"
```

### 4.2 Database Migration Rollback

- **No automatic rollback** — migrations are forward-only
- For each migration, maintain a reversal script in `database/migrations/rollback/`
- **Before applying risky migrations:** Take full database backup
- Rollback procedure:
  1. Stop server
  2. Restore database from pre-migration backup (or run reversal script)
  3. Deploy previous server binary
  4. Start server

### 4.3 Web App Rollback

```bash
# PM2 with versioned deploys
ssh deploy@prod "cd /opt/yggdrasil/web-app && git checkout <previous-tag> && npm ci && npm run build && pm2 restart yggdrasil-web"
```

### 4.4 Desktop Client Rollback

- Users can manually install previous version from download portal
- Previous version installers retained for 6 months
- Auto-update can be pointed to previous version if critical regression found

---

## 5. Change Management

### 5.1 Release Notes

Generated for every minor and major release. Format:

```markdown
# Yggdrasil ERP vX.Y.Z Release Notes

**Release Date:** YYYY-MM-DD
**Type:** Major / Minor / Patch

## Highlights
- [1-3 headline features or fixes]

## New Features
- [Feature description] (Module)

## Improvements
- [Enhancement description] (Module)

## Bug Fixes
- [Fix description] (Module) — fixes YGGDATA-XXX

## Breaking Changes (Major releases only)
- [What changed and migration steps]

## Database Migrations
- Migration NNN: [brief description]

## Known Issues
- [Any known issues in this release]
```

### 5.2 Customer Notification

| Release Type | Notification | Timing |
|-------------|-------------|--------|
| Major | Email + portal banner + release webinar | 2 weeks before + day of |
| Minor | Email + portal banner | 3 days before + day of |
| Patch | Portal banner + release notes update | Day of |
| Hotfix | Email to affected customers | Immediately after deployment |

### 5.3 Maintenance Windows

| Type | Window | Notice Period |
|------|--------|---------------|
| Scheduled (major/minor) | Saturday 2-6am ET | 1 week |
| Scheduled (patch) | Tuesday/Thursday 2-4am ET | 48 hours |
| Emergency (hotfix) | Any time | Best effort (status page updated immediately) |

**During maintenance:**
- Status page updated to "Maintenance" with expected completion time
- Server returns HTTP 503 with `Retry-After` header
- Desktop client shows maintenance banner
- Web app shows maintenance page

---

## 6. Deployment Checklist

### Pre-Deployment

- [ ] All CI jobs passing on release branch
- [ ] Release notes written and reviewed
- [ ] Database migration reviewed for reversibility
- [ ] Full database backup taken
- [ ] Staging deployment completed and soaked (24h minimum)
- [ ] No P1/P2 regressions on staging
- [ ] Customer notification sent (per schedule above)
- [ ] On-call engineer briefed on release contents
- [ ] Rollback plan documented and tested on staging

### Deployment

- [ ] Status page updated to "Maintenance" (if applicable)
- [ ] Server binary deployed
- [ ] Health check passes
- [ ] Database migrations applied successfully
- [ ] Web app deployed
- [ ] Smoke test: login, create record, view dashboard
- [ ] WebSocket connectivity verified
- [ ] Status page updated to "Operational"

### Post-Deployment

- [ ] Monitor error rate for 1 hour (< baseline + 10%)
- [ ] Monitor API response time (p95 < baseline + 20%)
- [ ] Release notes published to portal
- [ ] Jira release marked as shipped
- [ ] VERSION file updated
- [ ] Git tag created: `git tag -a vX.Y.Z -m "Release vX.Y.Z"`

---

## 7. Hotfix Process

For critical production issues requiring immediate fix:

1. **Identify:** P1 incident confirmed requiring code change
2. **Branch:** Create `hotfix/vX.Y.Z` from current production tag
3. **Fix:** Minimal targeted fix only — no other changes
4. **Test:** Abbreviated QA (focused on the fix + regression on affected module)
5. **Deploy:** Follow deployment checklist (skip staging soak for hotfix)
6. **Notify:** Email affected customers; update incident channel
7. **Merge back:** Cherry-pick fix into main development branch

---

## 8. Related Documents

- [Versioning Runbook](../versioning-runbook.md) — Version numbering protocol
- [On-Call Rotation](on-call-rotation.md) — On-call for deployment issues
- [Environment Management](environment-management.md) — Dev/staging/prod environments
- [Operational Runbooks](runbooks/) — Component-specific deployment details
