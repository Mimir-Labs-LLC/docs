# Development Workflow & Standards

This document covers our Git conventions, CI/CD pipeline, coding standards, and testing practices.

---

## Versioning Protocol

Versions follow the format: `v[Major].[Build].[Patch][Phase]`

- **Major** -- Breaking changes or significant milestones
- **Build** -- New feature sets or module additions
- **Patch** -- Bug fixes and incremental improvements
- **Phase** -- Alphabetical suffix indicating release stage (e.g., `a` for alpha)

**Current version:** v0.4.4a

### Rules

| Event | Action |
|-------|--------|
| Every push | Iterate the **Patch** number |
| Build or Major iteration | Reset trailing numbers to 0; create new branch `claude/v{version}` |
| Unverified push | Append nudge suffix: `-1`, `-2`, etc. |
| Next verified patch | Nudge resets and drops off |

**Examples:**
- `v0.2.1a` -- Verified patch
- `v0.2.1a-1` -- First unverified follow-up (nudge)
- `v0.2.1a-2` -- Second unverified follow-up
- `v0.2.2a` -- Next verified patch (nudge drops off)
- `v0.3.0a` -- Build iteration (patch resets, new branch created)

### VERSION File

Every patch-level (or higher) push must update the `VERSION` file with a summary of what changed. If nudges occurred since the last patch, the VERSION entry must summarize those too.

---

## Git Workflow

### Branch naming

- `main` -- Stable, protected
- `claude/v{X.Y.Za}` -- Active development branch (created at each build/major iteration)
- Feature branches follow the pattern: `claude/{description}-{id}`

### Commit messages

Write clear, descriptive commit messages. Format:

```
v{version}: Brief summary of what changed

Optional longer description if needed.
```

### Pull requests

- All changes go through pull requests
- PRs are reviewed before merging to the active development branch
- CI must pass before merge

---

## CI/CD Pipeline

CI is configured via GitHub Actions in `.github/workflows/ci.yml`. The pipeline runs 8 jobs:

| Job | What it does |
|-----|-------------|
| `web-lint` | ESLint + TypeScript strict check |
| `web-test` | Vitest unit tests |
| `web-build` | Next.js production build |
| `server-build` | CMake + Ninja build in Docker |
| `server-test` | Catch2 unit tests in Docker |
| `client-build` | CMake + Ninja build in Docker |
| `schema-validate` | PostgreSQL schema + migrations + seed data |

All jobs must pass before a PR can be merged.

---

## Code Conventions

### C++ (Server & Client)

| Aspect | Convention |
|--------|-----------|
| Standard | C++17 |
| Build | CMake with `CMAKE_AUTOMOC ON` for Qt |
| Warnings | `-Wall -Wextra -Wpedantic` (GCC/Clang), `/W4` (MSVC) |
| Header layout | Headers in `include/` mirror the `src/` directory structure |
| Shared code | Reusable components in `common/` with headers in `common/include/` |
| Services | Singleton pattern for core services (AuthManager, Logger, etc.) |
| Controllers | Business logic in `server/src/controllers/` |

### TypeScript (Web Application)

| Aspect | Convention |
|--------|-----------|
| Framework | Next.js 15 with App Router |
| Strict mode | TypeScript strict mode enabled |
| Styling | Tailwind CSS with custom `yggdrasil` color palette |
| Data fetching | TanStack React Query for server state |
| Client state | Zustand stores |
| HTTP client | Axios |
| Linting | ESLint with `eslint-config-next` |

### Database

| Aspect | Convention |
|--------|-----------|
| Table/column naming | snake_case |
| Multi-tenancy | All entity tables include `tenant_id` |
| Timestamps | `created_at` and `updated_at` on all entity tables |
| Audit fields | `created_by` and `updated_by` where applicable |
| Primary keys | UUID (`gen_random_uuid()`) |

---

## Testing

### Unit Tests -- C++ Server (Catch2)

```bash
cd server/build
cmake .. -DBUILD_TESTING=ON
make -j$(nproc)
ctest --output-on-failure
```

- **Framework:** Catch2 v3 (fetched via CMake FetchContent)
- **Test target:** `YggdrasilServerTests`
- **Location:** `server/tests/`
- **Naming:** `test_*.cpp`

### Unit Tests -- Web Application (Vitest)

```bash
cd web-app
npm test
```

- **Framework:** Vitest 2.x with jsdom environment
- **Assertions:** Vitest built-in + `@testing-library/jest-dom`
- **Component testing:** `@testing-library/react`
- **Config:** `web-app/vitest.config.ts`
- **Location:** Co-located `__tests__/` directories alongside source
- **Naming:** `*.test.ts` / `*.test.tsx`

### Story-Driven Integration Tests

```bash
cd tests
npm install
npm test
```

- **Framework:** Custom TypeScript runner (`tests/runner.ts`)
- **Coverage:** 20+ business-process arcs with 100+ story files
- **Requires:** Running server instance
- **Arcs cover:** Foundation, manufacturing, order-to-cash, quality-to-resolution, procure-to-pay, record-to-report, and more

### Build Verification

```bash
./verify_build.sh
```

Checks prerequisites, file structure, source code integrity, and CMake configuration.

---

## Key Files for Common Tasks

| Task | File(s) |
|------|---------|
| Add a new API endpoint | `server/src/controllers/`, `server/src/main.cpp` |
| Add a new database table | `database/schema/yggdrasil_complete_schema.sql` |
| Modify authentication | `server/src/auth/AuthManager.cpp`, `server/include/auth/AuthManager.h` |
| Add server-side caching | `server/src/services/CacheManager.cpp` |
| Add a desktop UI module | `client/src/widgets/`, `client/src/MainWindow.cpp` |
| Change web app theme | `web-app/tailwind.config.ts` |
| Update server config | `server/config/server.conf` |
| Shared data layer | `common/src/Repository.cpp`, `common/include/Repository.h` |
| B2B event streaming | `common/src/B2BEventHub.cpp`, `common/include/B2BEventHub.h` |
| CI pipeline | `.github/workflows/ci.yml` |
| Integration tests | `tests/stories/` |
| Compliance policies | `docs/policies/` (in yggdrasil repo) |

---

## Development Tips

1. **Read `CLAUDE.md` in the yggdrasil repo** -- It is the authoritative development guide and contains architecture details, build commands, and conventions. Keep it updated as you work.

2. **Run lint and type-check before pushing** -- `npm run lint && npm run type-check` in `web-app/` catches most issues before CI.

3. **The desktop client uses consolidated implementation files** -- `COMPLETE_CLIENT_IMPLEMENTATION.cpp` and `REMAINING_CLIENT_MODULES.cpp` contain large amounts of UI code. These are intentional, not technical debt.

4. **Multi-tenant scoping is critical** -- Every database query must include `WHERE tenant_id = ?`. Missing this causes cross-tenant data leaks.

5. **The schema file is the source of truth** -- Migrations exist, but the complete schema in `database/schema/yggdrasil_complete_schema.sql` is the canonical definition.
