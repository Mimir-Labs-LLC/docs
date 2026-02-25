# Yggdrasil ERP — Automated Testing Manual

This document covers all automated testing infrastructure across the Yggdrasil ERP system: the Next.js web application (Vitest), the C++ server (Catch2), the Qt desktop client (Catch2), and the story-driven integration test suite.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Web Application Tests (Vitest)](#2-web-application-tests-vitest)
3. [Server Tests (Catch2)](#3-server-tests-catch2)
4. [Desktop Client Tests (Catch2)](#4-desktop-client-tests-catch2)
5. [Integration Tests (Story Runner)](#5-integration-tests-story-runner)
6. [CI Pipeline](#6-ci-pipeline)
7. [Writing New Tests](#7-writing-new-tests)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Overview

| Suite | Framework | Language | Location | Runs Without Server |
|-------|-----------|----------|----------|---------------------|
| Web App | Vitest 2.x + Testing Library | TypeScript/React | `web-app/` | Yes |
| Server | Catch2 v3.7.1 | C++17 | `server/tests/` | Yes |
| Desktop Client | Catch2 v3.7.1 | C++17 | `client/tests/` | Yes |
| Integration | Custom TypeScript runner | TypeScript | `tests/` | No (requires live server) |

### Prerequisites

- **Web App:** Node.js 20+, npm
- **Server/Client C++:** CMake 3.16+, Qt 6.2+, C++17 compiler, Ninja (optional)
- **Integration:** Node.js 20+, npm, running Yggdrasil server instance

---

## 2. Web Application Tests (Vitest)

### Quick Start

```bash
cd web-app
npm install          # first time only
npm test             # run all tests (single run, CI mode)
npm run test:watch   # interactive watch mode (re-runs on file changes)
npm run test:coverage  # run with coverage report
```

### Configuration

| File | Purpose |
|------|---------|
| `web-app/vitest.config.ts` | Vitest configuration (jsdom environment, path aliases, JSX transform) |
| `web-app/vitest.setup.ts` | Global setup — imports `@testing-library/jest-dom/vitest` matchers |

Key settings in `vitest.config.ts`:
- **Environment:** `jsdom` (simulates a browser DOM)
- **Globals:** `true` (no need to import `describe`, `it`, `expect`)
- **JSX:** `esbuild: { jsx: 'automatic' }` (enables JSX without explicit React imports)
- **Alias:** `@` maps to the `web-app/` root directory

### Test File Locations

Tests live in `__tests__/` directories alongside the source code they test:

```
web-app/
├── lib/
│   ├── api/
│   │   └── __tests__/
│   │       └── client.test.ts        # API client (Axios interceptors, auth, tenant headers)
│   └── geo/
│       └── __tests__/
│           └── territory.test.ts     # Territory geometry calculations
└── components/
    └── shared/
        └── __tests__/
            └── CrudPanel.test.tsx    # CrudPanel component (CRUD UI, pagination, errors)
```

### Test Categories

**API Client Tests** (`lib/api/__tests__/client.test.ts`) — 7 tests
- Axios instance creation with correct base URL
- Request interceptor injects `Authorization` header from localStorage
- Request interceptor injects `X-Tenant-ID` header from localStorage
- Handles missing localStorage values gracefully

**Territory/Geo Tests** (`lib/geo/__tests__/territory.test.ts`) — 12 tests
- Territory state management (CRUD operations)
- Geography parsing and GeoJSON conversion
- Territory assignment and region calculations

**CrudPanel Component Tests** (`components/shared/__tests__/CrudPanel.test.tsx`) — 20 tests
- Loading spinner display during data fetch
- Data table rendering with rows and columns
- Error alert display on fetch failure
- Pagination controls (Next/Previous)
- Create dialog opening and submission
- Edit dialog pre-population and submission
- Search/filter input
- Auto-dismiss of success messages (timed)
- Refresh button triggers re-fetch
- PUT update success and error handling

### Mocking Patterns

**API Client Mock:**
```typescript
vi.mock('@/lib/api/client', () => ({
  default: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}));
```

**Fake Timers (for auto-dismiss, debounce):**
```typescript
vi.useFakeTimers();
// ... trigger the timer-dependent action ...
await vi.advanceTimersByTimeAsync(5000);
vi.useRealTimers();
```

**Important:** Use `vi.advanceTimersByTimeAsync()` (not the sync version) when React state updates are involved.

---

## 3. Server Tests (Catch2)

### Quick Start

```bash
cd server
mkdir -p build && cd build
cmake .. -DBUILD_TESTING=ON
make -j$(nproc)
ctest --output-on-failure
```

Or with Ninja:
```bash
cmake -B build -S . -G Ninja -DBUILD_TESTING=ON
cmake --build build --target YggdrasilServerTests --parallel
cd build && ctest --output-on-failure
```

### Configuration

| File | Purpose |
|------|---------|
| `server/tests/CMakeLists.txt` | Test target definition, Catch2 FetchContent, link libraries |
| `server/CMakeLists.txt` | `BUILD_TESTING` option gates `add_subdirectory(tests)` |

### Test Files

```
server/tests/
├── CMakeLists.txt
├── test_validation_result.cpp    # ValidationResult struct tests
├── test_validator.cpp            # Input validation rules (email, UUID, length, etc.)
└── test_cache_manager.cpp        # In-memory cache (insert, TTL expiry, eviction, patterns)
```

### Test Categories

**ValidationResult Tests** (`test_validation_result.cpp`)
- Result construction (valid/invalid states)
- Error message aggregation
- Field-level error reporting

**Validator Tests** (`test_validator.cpp`)
- Email format validation
- UUID format validation
- String length constraints (min/max)
- Required field checks
- Numeric range validation
- Date format validation

**CacheManager Tests** (`test_cache_manager.cpp`)
- Cache insertion and retrieval
- TTL-based expiration
- Cache size limits and eviction
- Key pattern matching (`module:entity:id`)
- Cache invalidation

### Disabling Tests

To build the server without tests:
```bash
cmake .. -DBUILD_TESTING=OFF
```

---

## 4. Desktop Client Tests (Catch2)

### Quick Start

```bash
cd client
mkdir -p build && cd build
cmake .. -DBUILD_TESTING=ON
make -j$(nproc)
ctest --output-on-failure
```

Or with Ninja:
```bash
cmake -B build -S . -G Ninja -DBUILD_TESTING=ON
cmake --build build --target YggdrasilClientTests --parallel
cd build && ctest --output-on-failure
```

### Configuration

| File | Purpose |
|------|---------|
| `client/tests/CMakeLists.txt` | Test target definition, Catch2 FetchContent, link libraries |
| `client/CMakeLists.txt` | `BUILD_TESTING` option gates `add_subdirectory(tests)` |

The test executable links against `Qt6::Core`, `Qt6::Network`, and `Qt6::WebSockets` (not `Qt6::Quick` or `Qt6::QuickControls2`, since the tests exercise C++ backend logic only).

### Test Files

```
client/tests/
├── CMakeLists.txt
├── test_theme_manager.cpp       # Theme switching, colors, font sizes
├── test_auth_manager.cpp        # Login validation, logout, state management
├── test_api_client.cpp          # API client properties, signals, defaults
└── test_websocket_client.cpp    # WebSocket client initial state
```

### Test Categories

**ThemeManager Tests** (`test_theme_manager.cpp`)
- Default state: light mode, font size 10
- Theme switching: "Dark" enables dark mode, "Light" restores, non-"Dark" strings stay light
- Signal behavior: `themeChanged` only emits on actual change, not redundant sets
- Font size clamping: values outside 8–24 are clamped to boundaries
- Derived font sizes: small (base-1), large (base+3), title (base+10)
- Brand colors: `primary` is constant (#2a7453), `primaryHover` differs per theme
- Surface colors: 5 surface properties differ between light and dark
- Text colors: 3 text properties differ between light and dark
- Status colors: success/warning/danger/info are constant, neutral differs
- Cell background colors: 5 status cell backgrounds differ between light and dark
- Border colors: 2 border properties differ between light and dark

**AuthManager Tests** (`test_auth_manager.cpp`)
- Default state: not authenticated, not busy, no error, empty token/tenant
- Login validation: empty email rejects with error message, whitespace-only email rejects, empty password rejects
- Logout: clears authenticated, authToken, tenantId, userData; emits `authenticatedChanged`
- `selectTenant()`: clears `tenantSelectionRequired` flag and emits signal
- Property accessors: `databaseName`, `httpPort`, `wsPort` defaults

**ApiClient Tests** (`test_api_client.cpp`)
- Default state: baseUrl is `http://localhost:8080/api`, empty tenantId/authToken, not loading
- `setBaseUrl()`: updates value and emits `baseUrlChanged` only on actual change
- `setTenantId()`: updates value and emits `tenantIdChanged` only on actual change
- `setAuthToken()`: updates value and emits `authTokenChanged` only on actual change
- Empty token can be set (for logout flow)
- Multiple properties can be configured together

**WebSocketClient Tests** (`test_websocket_client.cpp`)
- Default state: not connected, statusText is "Disconnected"
- Calling `disconnect()` without prior `connect()` does not crash

### QCoreApplication Requirement

All client tests instantiate a `QCoreApplication` because Qt's signal/slot mechanism (used by `QSignalSpy`) requires one. Each test file includes a helper:

```cpp
static QCoreApplication* ensureApp() {
    if (!QCoreApplication::instance()) {
        static int argc = 1;
        static char arg0[] = "test";
        static char* argv[] = { arg0, nullptr };
        static QCoreApplication app(argc, argv);
    }
    return QCoreApplication::instance();
}
```

This is called at the start of every `TEST_CASE`.

### Disabling Tests

```bash
cmake .. -DBUILD_TESTING=OFF
```

---

## 5. Integration Tests (Story Runner)

### Quick Start

```bash
cd tests
npm install          # first time only
npm test             # run all arcs (except performance)
npm run test:verbose # verbose output with per-assertion detail
```

### Prerequisites

The integration tests require a **running Yggdrasil server** with a seeded database:

```bash
# Terminal 1: Start server
cd server/build && ./YggdrasilServer

# Terminal 2: Run integration tests
cd tests && npm test
```

### Architecture

The runner (`tests/runner.ts`) executes **stories** organized into **arcs**. Each story is a TypeScript file that:

1. Logs in as a specific **persona** (admin, user, viewer, etc.)
2. Performs a sequence of API calls against the live server
3. Uses assertion helpers to validate responses

**Key files:**

| File | Purpose |
|------|---------|
| `tests/runner.ts` | Main test runner — discovers arcs, runs stories, reports results |
| `tests/story.ts` | `StoryDef` interface that all stories implement |
| `tests/api.ts` | `ApiClient` class for HTTP requests (wraps Axios) |
| `tests/context.ts` | Shared context (`ctx.ids`, `ctx.store`, `ctx.personas`) passed between stories |
| `tests/reporter.ts` | Test result collection and reporting |
| `tests/helpers/assertions.ts` | `expectSuccess`, `expectStatus`, `expectTruthy`, `expectMinLength`, `skip` |

### Story Structure

Every story file exports a `StoryDef`:

```typescript
import type { StoryDef } from "../../story.js";
import { expectSuccess, expectTruthy } from "../../helpers/assertions.js";

const story: StoryDef = {
  name: "1500-pagination-response",
  arc: "23-v042-feature-coverage",
  persona: "admin",

  async run(ctx, api, reporter) {
    const result = await api.get("/api/crm/entities?limit=2&offset=0");
    expectSuccess(reporter, "GET entities with limit=2 returns 200", result, "...");
    // ... more assertions ...
  },
};

export default story;
```

### Test Arcs (23 total, 128 story files)

| # | Arc | Description | Script |
|---|-----|-------------|--------|
| 01 | Foundation | Admin login, RBAC, CRM/PLM/Finance data setup | `test:foundation` |
| 02 | Manufacturing | Work orders, BOMs, shop floor | `test:manufacturing` |
| 03 | Order to Cash | Quotes, sales orders, invoices | `test:order-to-cash` |
| 04 | Quality to Resolution | 8D, CAPA, NCR | `test:quality` |
| 05 | Procure to Pay | POs, suppliers, receipts | `test:p2p` |
| 06 | Record to Report | GL, AR, AP, financial close | `test:r2r` |
| 07 | Quote to Order | Quote lifecycle | `test:q2o` |
| 08 | Lead to Cash | CRM pipeline to invoice | `test:l2c` |
| 09 | Data Validation | Input validation across modules | `test:data-validation` |
| 10 | Authorization RBAC | Role-based access control | `test:auth-rbac` |
| 11 | Concurrent Access | Multi-user concurrent operations | `test:concurrent` |
| 12 | Financial Accuracy | Precision, rounding, reconciliation | `test:financial` |
| 13 | Inventory Accuracy | Stock levels, cycle counts | `test:inventory` |
| 14 | Cross-Module Integrity | FK relationships, cascading effects | `test:cross-module` |
| 15 | Workflow Engine | State machines, transitions | `test:workflow` |
| 16 | Performance/Load | Response times, throughput | `test:performance` |
| 17 | Report Accuracy | Report generation and data correctness | `test:reports` |
| 18 | Regression/Schema | Schema migration, backward compatibility | `test:regression` |
| 19 | API Contract | Endpoint shape, status codes, content types | `test:api-contract` |
| 20 | Compliance/Audit | Audit trails, regulatory compliance | `test:compliance` |
| 21 | Dev/Admin Foundation | Developer tools, admin setup | `test:devadmin` |
| 22 | Customer Deployment | Multi-tenant provisioning, onboarding | `test:customer-deploy` |
| 23 | v0.4.2 Feature Coverage | Pagination, DELETE, tenant mutations, error format, corrections | N/A (runs with `npm test`) |

### Running Individual Arcs

```bash
npm run test:foundation        # Run arc 01 only
npm run test:quality           # Run arc 04 only
npm run test:deploy            # Run arcs 21 + 22
npm run test:all-with-perf     # All arcs including performance
npm run test:verbose           # All arcs with detailed output
```

### Assertion Helpers

| Helper | Purpose |
|--------|---------|
| `expectSuccess(reporter, name, result, context)` | Assert HTTP 2xx response |
| `expectStatus(reporter, name, result, code, context)` | Assert specific HTTP status code |
| `expectTruthy(reporter, name, value, failMsg)` | Assert a boolean condition |
| `expectMinLength(reporter, name, array, min, context)` | Assert array has at least N items |
| `expectSuccessOrDuplicate(reporter, name, result, context)` | Accept 2xx or 400 (duplicate) |
| `skip(reporter, name, reason)` | Mark a test as skipped |

### Shared Context

Stories within the same arc share a `ctx` object:
- `ctx.personas` — Login credentials for each role (admin, user, viewer)
- `ctx.ids` — Entity IDs created by earlier stories (e.g., `ctx.ids.employeeId`)
- `ctx.store` — Free-form key-value storage for passing data between stories

---

## 6. CI Pipeline

The GitHub Actions pipeline (`.github/workflows/ci.yml`) runs on every push to `main`, `v*`, `alpha`, and `claude/**` branches.

### Jobs

| Job | Depends On | What It Does |
|-----|------------|--------------|
| `web-lint` | — | ESLint + TypeScript strict check |
| `web-test` | `web-lint` | Vitest unit tests (39 tests) |
| `web-build` | `web-lint`, `web-test` | Next.js production build |
| `server-build` | — | CMake + Ninja build in Docker |
| `server-test` | `server-build` | Catch2 unit tests (27 tests) |
| `client-build` | — | CMake + Ninja build in Docker |
| `client-test` | `client-build` | Catch2 unit tests |
| `schema-validate` | — | PostgreSQL schema + migrations + seed |
| `notify` | All above | Email notification with results |

### Build Environment

Server and client CI jobs run inside a Docker container (`ghcr.io/<repo>/build-env:latest`) that provides CMake, Ninja, Qt 6, and a C++17 compiler.

### Adding New Test Files

**Web tests:** Automatically discovered — any `*.test.ts` or `*.test.tsx` file in a `__tests__/` directory is included.

**Server/Client C++ tests:** Must be added to the respective `tests/CMakeLists.txt`:
```cmake
add_executable(YggdrasilServerTests
    test_existing.cpp
    test_new_file.cpp        # Add new test file here
    ${SERVER_TESTABLE_SOURCES}
)
```

**Integration stories:** Automatically discovered by the runner from `tests/stories/<arc>/`.

---

## 7. Writing New Tests

### Web App (Vitest + Testing Library)

1. Create a `__tests__/` directory next to the module you're testing.
2. Create a file named `*.test.ts` (logic) or `*.test.tsx` (components).
3. Use `vi.mock()` to mock external dependencies (API client, etc.).
4. For components, use `@testing-library/react`'s `render()` and query helpers.

**Example — logic test:**
```typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from '../myModule';

describe('myFunction', () => {
  it('returns expected value', () => {
    expect(myFunction('input')).toBe('output');
  });
});
```

**Example — component test:**
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import MyComponent from '../MyComponent';

vi.mock('@/lib/api/client', () => ({
  default: { get: vi.fn() },
}));

it('renders title', () => {
  render(<MyComponent />);
  expect(screen.getByText('Title')).toBeInTheDocument();
});
```

### Server/Client C++ (Catch2)

1. Create a new `test_*.cpp` file in the `tests/` directory.
2. Include `<catch2/catch_test_macros.hpp>`.
3. If Qt signals are involved, include `<QSignalSpy>` and use the `ensureApp()` pattern.
4. Add the file to `CMakeLists.txt`.
5. If testing a new source file, add it to the `*_TESTABLE_SOURCES` list.

**Example:**
```cpp
#include <catch2/catch_test_macros.hpp>
#include "MyClass.h"

TEST_CASE("MyClass does something", "[myclass]") {
    MyClass obj;
    REQUIRE(obj.value() == 42);

    SECTION("Subcase A") {
        obj.increment();
        REQUIRE(obj.value() == 43);
    }
}
```

### Integration Stories

1. Create a new `.ts` file in the appropriate `tests/stories/<arc>/` directory.
2. Name it with a numeric prefix for ordering (e.g., `1550-my-new-test.ts`).
3. Export a default `StoryDef` with `name`, `arc`, `persona`, and `run()`.
4. Use assertion helpers from `../../helpers/assertions.js`.

**Example:**
```typescript
import type { StoryDef } from "../../story.js";
import { expectSuccess, expectTruthy } from "../../helpers/assertions.js";

const story: StoryDef = {
  name: "1550-my-new-test",
  arc: "23-v042-feature-coverage",
  persona: "admin",

  async run(ctx, api, reporter) {
    const result = await api.get("/api/some/endpoint");
    expectSuccess(reporter, "GET returns 200", result, "GET /api/some/endpoint");

    const items: any[] = Array.isArray(result.data) ? result.data : [];
    expectTruthy(reporter, "Has at least one item", items.length > 0, "Empty response");
  },
};

export default story;
```

---

## 8. Troubleshooting

### Web App Tests

**"React is not defined"**
The Vitest config uses `esbuild: { jsx: 'automatic' }` to handle JSX without explicit React imports. If this error appears, verify `web-app/vitest.config.ts` has the `esbuild` block.

**Fake timer test timeouts**
Use `vi.advanceTimersByTimeAsync()` instead of the synchronous `vi.advanceTimersByTime()` when React state updates or promises are involved. Always call `vi.useRealTimers()` after.

**Module resolution errors (`@/lib/...`)**
Ensure the `resolve.alias` in `vitest.config.ts` maps `@` to `path.resolve(__dirname, '.')`.

### C++ Tests (Server & Client)

**Catch2 fetch fails during CMake**
Catch2 is fetched via `FetchContent` from GitHub. Ensure internet access during the first build. Subsequent builds use the cached download.

**"No QCoreApplication" errors**
All Qt-dependent tests require a `QCoreApplication` instance for signals/slots. Use the `ensureApp()` helper at the start of each `TEST_CASE`.

**Missing Qt modules**
Server tests link `Qt6::Core` only. Client tests link `Qt6::Core`, `Qt6::Network`, and `Qt6::WebSockets`. Ensure the required Qt components are installed.

### Integration Tests

**"Connection refused" errors**
The server must be running on `localhost:8080` before starting integration tests. Check with `curl http://localhost:8080/health`.

**Stories fail because of missing data**
Stories within an arc run sequentially and may depend on data created by earlier stories. Always run the full arc (or at least the Foundation arc first) to ensure prerequisite data exists.

**Tenant isolation test failures**
Tenant-scoped tests use a hardcoded Tenant B ID (`00000000-0000-0000-0000-000000000098`). Ensure this tenant does not exist in your database, or the test may produce unexpected results.

### CI Pipeline

**Docker image not found**
The `ghcr.io/<repo>/build-env:latest` image must be pre-built and pushed to the GitHub Container Registry. See the build environment setup documentation.

**Schema validation fails**
Ensure `database/schema/yggdrasil_complete_schema.sql` loads cleanly into PostgreSQL 16. The CI job expects at least 101 tables.
