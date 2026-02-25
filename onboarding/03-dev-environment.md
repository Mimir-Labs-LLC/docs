# Development Environment Setup

This guide walks you through setting up a local development environment for Yggdrasil ERP.

---

## Prerequisites

Install the following before you begin:

### Required

| Tool | Version | Purpose |
|------|---------|---------|
| **C++17 compiler** | GCC 9+, Clang 10+, or MSVC 2019+ | Server and desktop client |
| **CMake** | 3.16+ | Build system for C++ components |
| **Qt 6** | 6.2+ (Core, Widgets, Network, WebSockets, Charts, Qml) | Server framework + desktop UI |
| **PostgreSQL** | 13+ | Database |
| **Node.js** | 18+ | Web application |
| **npm** | (bundled with Node.js) | Package management |
| **Git** | Latest | Version control |

### Optional

| Tool | Purpose |
|------|---------|
| **Docker** | Running infrastructure stack (Redpanda, Caddy) |
| **Go 1.22+** | Building the tenant sidecar |
| **cloudflared** | Cloudflare tunnel client for B2B federation |

---

## Repository Setup

### Clone the repositories

```bash
# Main application repository
git clone <yggdrasil-repo-url>
cd yggdrasil

# Documentation repository (separate)
git clone <docs-repo-url>
```

### Understand the branch model

- `main` -- Stable branch; do not push directly
- `claude/v{X.Y.Za}` -- Active development branches created at each build/major version iteration
- Feature branches are created off the active development branch

---

## Database Setup

### 1. Create the database

```bash
createdb yggdrasil
```

### 2. Load the schema

```bash
psql -d yggdrasil -f database/schema/yggdrasil_complete_schema.sql
```

This creates all 117 tables, views, and 150+ indexes.

### 3. Load seed data (optional)

```bash
cd database/seeds
./seed_all.sh
```

Seed scripts populate foundation data: tenant configuration, 10 RBAC roles, permissions catalog, and tenant settings.

### 4. Verify

```bash
psql -d yggdrasil -c "\dt" | head -20
```

You should see tables like `tenants`, `users`, `roles`, `crm_accounts`, etc.

---

## Building the Server

```bash
cd server
mkdir -p build && cd build
cmake ..
make -j$(nproc)
```

### Run

```bash
./YggdrasilServer
```

The server starts with:
- HTTP API on port **8080**
- WebSocket on port **8081**

### Configuration

Runtime configuration is in `server/config/server.conf`. Key settings:

| Setting | Default | Notes |
|---------|---------|-------|
| `DatabaseHost` | localhost | PostgreSQL host |
| `DatabasePort` | 5432 | PostgreSQL port |
| `DatabaseName` | yggdrasil | Database name |
| `HttpPort` | 8080 | REST API port |
| `WebSocketPort` | 8081 | Real-time events port |
| `JWTSecret` | change_me_in_production | **Change this for any shared environment** |
| `LogLevel` | INFO | DEBUG, INFO, WARNING, ERROR |
| `FederationMode` | none | none, redis, or redpanda |

---

## Building the Desktop Client

```bash
cd client
mkdir -p build && cd build
cmake ..
make -j$(nproc)
```

### Run

```bash
./YggdrasilClient
```

The client will prompt for server connection details on first launch. Point it to `localhost:8080`.

---

## Running the Web Application

```bash
cd web-app
npm install
npm run dev
```

The development server starts at `http://localhost:3000`.

### Available scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run lint` | ESLint |
| `npm run type-check` | TypeScript type checking (`tsc --noEmit`) |
| `npm test` | Vitest unit tests |
| `npm run test:watch` | Vitest in watch mode |
| `npm run test:coverage` | Vitest with coverage report |

### Environment

The web app reads `API_URL` and `WS_URL` from `next.config.js`, defaulting to `localhost:8080` and `localhost:8081`.

---

## Build Verification

Run the full verification script from the yggdrasil root:

```bash
./verify_build.sh
```

This checks:
- Prerequisites are installed
- File structure is intact
- Source code integrity
- CMake configuration is valid

---

## Running Tests

### C++ Unit Tests (Catch2)

```bash
cd server/build
cmake .. -DBUILD_TESTING=ON
make -j$(nproc)
ctest --output-on-failure
```

### Web Application Unit Tests (Vitest)

```bash
cd web-app
npm test
```

### Story-Driven Integration Tests

These require a running server instance:

```bash
cd tests
npm install
npm test
```

This runs 23 business-process arcs with 128 story files covering end-to-end workflows.

---

## Quick Verification Checklist

After setup, verify each component is working:

- [ ] `psql -d yggdrasil -c "SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public'"` returns 117+ tables
- [ ] Server starts without errors on ports 8080/8081
- [ ] `curl http://localhost:8080/health` returns a success response
- [ ] Desktop client connects to the server and shows the login screen
- [ ] `http://localhost:3000` loads the web application
- [ ] `npm run lint` passes in `web-app/`
- [ ] `npm run type-check` passes in `web-app/`

---

## Troubleshooting

### Server won't start
- Check PostgreSQL is running: `pg_isready`
- Verify database exists: `psql -l | grep yggdrasil`
- Check `server.conf` database credentials match your local setup

### Web app build fails
- Ensure Node.js 18+: `node --version`
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Desktop client build fails
- Verify Qt 6.2+ is installed with all required modules: `qmake6 --version`
- Check CMake can find Qt: `cmake .. -DCMAKE_PREFIX_PATH=/path/to/qt6`
