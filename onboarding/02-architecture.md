# Architecture Overview

This document provides a high-level overview of the Yggdrasil ERP system architecture.

---

## Three-Tier Architecture

Yggdrasil consists of three application tiers sharing a PostgreSQL database:

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Backend Server** | C++17 / Qt 6 | HTTP API (:8080), WebSocket (:8081), JWT auth, business logic |
| **Desktop Client** | Qt 6 QML Widgets | Native cross-platform UI for power users |
| **Web Application** | Next.js 15 / React / TypeScript | Browser-based access for casual users and management |
| **Database** | PostgreSQL 13+ | 117 tables, 150+ indexes, multi-tenant isolation |

---

## Deployment Topology

Each tenant site runs the full Yggdrasil stack locally. Cross-tenant B2B event streaming is handled by a central Redpanda broker accessed through Cloudflare Zero Trust tunnels via a lightweight Go sidecar.

```
                                  Central Server
  Tenant A                  (Hetzner VPS -> Mimir Labs           Tenant B
                                  on-prem)
 +------------------+           +----------------------+          +------------------+
 |  Server (C++/Qt) |           |  Redpanda (Kafka API)|          |  Server (C++/Qt) |
 |  HTTP API  :8080 |           |  Event Broker        |          |  HTTP API  :8080 |
 |  WebSocket :8081 |           |                      |          |  WebSocket :8081 |
 |        |         |           |  PostgreSQL (mesh DB) |          |        |         |
 |  +-----+------+  |           |  Redpanda Console    |          |  +-----+------+  |
 |  | PostgreSQL |  |           |  Cloudflare Tunnel   |          |  | PostgreSQL |  |
 |  | (117 tbl)  |  |           |                      |          |  | (117 tbl)  |  |
 |  +------------+  |           +----------+-----------+          |  +------------+  |
 |        |         |                      |                      |        |         |
 |  +-----+------+  |                      |                      |  +-----+------+  |
 |  | Go Sidecar |--+------ tunnel --------+------- tunnel ------+--| Go Sidecar |  |
 |  | cloudflared|  |                                              |  | cloudflared|  |
 |  +------------+  |                                              |  +------------+  |
 |                  |                                              |                  |
 |  Desktop Client  |                                              |  Desktop Client  |
 |  Web App         |                                              |  Web App         |
 +------------------+                                              +------------------+
```

The central server is currently hosted on a Hetzner CPX31 VPS. Long-term plan is to migrate to dedicated on-premises hardware at Mimir Labs.

### Federation Modes

The server supports two federation modes configured in `server/config/server.conf`:

| Mode | Backend | Use Case |
|------|---------|----------|
| **redis** | Shared Redis Pub/Sub | Simple deployments on a local network |
| **redpanda** | Central Redpanda broker via Cloudflare tunnel | Production B2B across organizations |

---

## Technology Stack Detail

### Backend Server

| Aspect | Detail |
|--------|--------|
| Language | C++17 |
| Framework | Qt 6.2+ (Core, Network, WebSockets) |
| Build | CMake 3.16+ |
| HTTP | Port 8080, thread pool (10 threads) |
| WebSocket | Port 8081 for real-time events |
| Auth | JWT (HS256, 1-hour expiry) |
| RBAC | 10 default roles, 33 permissions |
| Caching | In-memory with TTL (512 MB), key pattern `module:entity:id` |
| Logging | Structured JSON with file rotation (10 MB/file, 10 files) |
| Rate limiting | Per-endpoint sliding window (100/60s default, 50/60s auth) |
| Metrics | Counters + duration tracking at `/metrics` |

### Desktop Client

| Aspect | Detail |
|--------|--------|
| Language | C++17 |
| Framework | Qt 6 Widgets (Core, Widgets, Network, WebSockets, Charts) |
| Build | CMake 3.16+ |
| Features | Dark/light theme, persistent credentials, WebSocket events, 14-module navigation |

### Web Application

| Aspect | Detail |
|--------|--------|
| Framework | Next.js 15 with App Router |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS 3.4 with custom `yggdrasil` color palette |
| State | Zustand (client), TanStack React Query (server) |
| HTTP | Axios-based API client layer |
| Testing | Vitest 2.x |
| Charts | Recharts 2.12 |
| Maps | Maplibre GL 5.18 |

### Database

| Aspect | Detail |
|--------|--------|
| Engine | PostgreSQL 13+ |
| Schema | 117 tables, 150+ indexes |
| Multi-tenancy | `tenant_id` FK on all entity tables |
| Naming | snake_case for tables and columns |
| Timestamps | `created_at` / `updated_at` on all entity tables |
| Audit | `created_by` / `updated_by` fields + `audit_change_log` table |
| Schema file | `database/schema/yggdrasil_complete_schema.sql` |

### Infrastructure

| Component | Technology |
|-----------|-----------|
| Deployment | Docker Compose (node:20-alpine, postgres:16-alpine) |
| Reverse Proxy | Caddy 2-alpine |
| Event Streaming | Redpanda v24.1 (Kafka-compatible) |
| Zero Trust | Cloudflare tunnels via cloudflared |
| Sidecar | Go 1.22+ with franz-go Kafka client |
| CI/CD | GitHub Actions (8 jobs) |

---

## Key Architectural Concepts

### Multi-Tenancy

Every entity table includes a `tenant_id` column. All queries must scope to the current tenant. There is no per-tenant database -- isolation is enforced at the application layer through WHERE clauses. PostgreSQL Row-Level Security (RLS) is planned for Phase 3.

### Authentication Flow

1. Client sends `POST /api/auth/login` with credentials
2. Server validates password hash, returns JWT
3. All subsequent requests include JWT in `Authorization: Bearer <token>` header
4. Token expires after 1 hour; refresh mechanism exists

### B2B Event Streaming

The `B2BEventHub` (in `common/`) provides real-time event streaming:
- Local events are broadcast via WebSocket on port 8081
- Cross-tenant events are federated through Redpanda topics (one per module: `ygg.events.crm`, `ygg.events.sales`, etc.)
- The Go sidecar at each tenant site bridges the local server to the central Redpanda broker through a Cloudflare tunnel

### API Pattern

All REST endpoints follow a consistent pattern:
- `GET /api/{module}/{entity}` -- List all (with pagination)
- `GET /api/{module}/{entity}/{id}` -- Get by ID
- `POST /api/{module}/{entity}` -- Create
- `PUT /api/{module}/{entity}/{id}` -- Update
- `DELETE /api/{module}/{entity}/{id}` -- Soft delete

---

## Repository Structure

```
yggdrasil/
├── server/              # C++ backend (Qt 6 HTTP/WebSocket server)
│   ├── config/          # Runtime configuration (server.conf)
│   ├── src/             # Source code (main, auth, core, middleware, services, controllers, utils)
│   ├── include/         # Headers (mirrors src/ layout)
│   └── tests/           # Catch2 unit tests
├── client/              # Qt 6 QML desktop application
│   ├── src/             # Source + widgets for each module
│   └── resources/       # QRC resources
├── common/              # Shared C++ code (Repository, B2BEventHub)
├── database/            # PostgreSQL schema, migrations, seeds
├── web-app/             # Next.js 15 web application
│   ├── app/             # Next.js App Router pages (one dir per module)
│   ├── components/      # React components
│   ├── lib/             # Utilities and API clients
│   └── types/           # TypeScript type definitions
├── infra/               # Infrastructure (VPS broker, tenant sidecar, CI)
├── tests/               # Story-driven integration tests (TypeScript)
└── docs/                # Compliance policies (SOC 2)
```

For the full project structure, see `CLAUDE.md` in the yggdrasil repo.
