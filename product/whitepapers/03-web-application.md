# Yggdrasil ERP — Web Application Architecture White Paper

**Mimir Labs Technical Publication**
**Document Version:** 1.0
**Date:** March 2026
**Classification:** Public

---

## Executive Summary

The Yggdrasil ERP web application is a Next.js 15 application built with React, TypeScript, and Tailwind CSS. It provides browser-based access to all 10 business modules, designed to match the feature set of the reference Qt desktop client while adding responsive layouts for tablet and mobile use. This white paper covers the application architecture, component model, state management, real-time integration, and deployment characteristics.

---

## 1. Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | Next.js | 15 |
| Language | TypeScript | Strict mode |
| UI Library | React | 18+ |
| Styling | Tailwind CSS | 3.4.1 |
| Server State | TanStack React Query | 5.51.1 |
| Client State | Zustand | 4.5.4 |
| HTTP Client | Axios | Latest |
| Charts | Recharts | Latest |
| Validation | Zod | Latest |
| Testing | Vitest + Testing Library | 2.x |

---

## 2. Application Architecture

### 2.1 Next.js App Router

The application uses Next.js 15's App Router for file-system-based routing:

```
web-app/app/
├── layout.tsx              — Root layout (sidebar, auth provider)
├── page.tsx                — Dashboard
├── crm/page.tsx            — CRM module
├── sales/page.tsx          — Sales module
├── purchasing/page.tsx     — Purchasing module
├── manufacturing/page.tsx  — Manufacturing module
├── warehouse/page.tsx      — Warehouse module
├── finance/page.tsx        — Finance module
├── projects/page.tsx       — Projects module
├── plm/page.tsx            — PLM module
├── quality/page.tsx        — Quality module
├── service/page.tsx        — Service module
├── hr/page.tsx             — HR module
├── logistics/page.tsx      — Logistics module
├── forms/page.tsx          — Form Builder
├── approvals/page.tsx      — Approval center
├── settings/page.tsx       — User settings
├── admin/page.tsx          — Admin panel
├── api-reference/page.tsx  — API documentation
├── documents/page.tsx      — Document templates
├── login/page.tsx          — Authentication
└── portal/                 — Customer portal (separate layout)
    ├── page.tsx            — Portal dashboard
    ├── team/page.tsx       — User management
    ├── subscription/       — Module activation
    ├── settings/           — Organization settings
    ├── support/            — Support tickets
    ├── documents/          — Document library
    ├── help/               — Help center (16 articles)
    ├── api-docs/           — API reference
    └── onboarding/         — New account wizard
```

### 2.2 Rendering Strategy

The application uses a hybrid rendering approach:

- **Server Components** — Layout components, metadata, and static content render on the server
- **Client Components** — Interactive modules, forms, tables, and real-time elements use `"use client"` directive
- **API Routes** — No Next.js API routes; all data flows through the C++ backend server

---

## 3. Component Architecture

### 3.1 Shared Components

38+ reusable components in `components/shared/`:

| Component | Purpose |
|-----------|---------|
| `CrudPanel` | Generic CRUD list/detail view with search, pagination, inline editing, row actions, export, and attachments |
| `AttachmentPanel` | File upload, download, and delete for any entity type |
| `PrintableDocument` | Print-ready document framework (DocHeader, DocParties, DocLineItems, DocTotals, DocNotes, DocFooter) |
| `ExportButton` | CSV/XLSX export with column selection |
| `DocumentBuilder` | Quote/Invoice/PO document builder with line items and totals |
| `RecordDetailPage` | Master-detail view with configurable sections |

### 3.2 Chart Components

Recharts-based visualization components in `components/shared/charts/`:

| Component | Type |
|-----------|------|
| `ChartCard` | Base wrapper with title and loading state |
| `BarChartCard` | Vertical/horizontal bar charts |
| `LineChartCard` | Time-series line charts |
| `PieChartCard` | Pie/donut charts |
| `AreaChartCard` | Stacked area charts |

### 3.3 Navigation

The `Sidebar` component provides:

- Module navigation with icons and labels
- Collapsible sections for module grouping
- Active route highlighting
- Role-based visibility (admin-only items hidden for regular users)
- Global search with 300ms debounced typeahead
- Notification badge for unread alerts
- User profile and logout

### 3.4 CrudPanel — The Core Component

`CrudPanel` is the primary data interaction component, used by every module page. Its props enable full customization:

| Prop | Purpose |
|------|---------|
| `entityType` | API endpoint path segment |
| `columns` | Column definitions with sort, filter, and format options |
| `formFields` | Create/edit form field definitions with validation |
| `tabs` | Sub-entity navigation within the module |
| `rowActions` | Per-row action buttons (e.g., Convert, Invoice, Complete) |
| `attachmentEntityType` | Enable attachment panel for the entity |
| `pdfEndpoint` | Enable print/PDF download button |
| `searchable` | Enable server-side search |
| `exportable` | Enable CSV/XLSX export |

---

## 4. State Management

### 4.1 Server State (React Query)

TanStack React Query manages all server-side data:

```typescript
// Automatic caching, background refetch, and stale-while-revalidate
const { data, isLoading, error } = useQuery({
    queryKey: ['sales-orders', page, search],
    queryFn: () => api.salesOrders.list({ page, search })
});
```

Benefits:
- **Automatic caching** — Responses cached by query key, reducing redundant API calls
- **Background refetch** — Stale data is served immediately while fresh data loads
- **Optimistic updates** — UI updates before server confirmation for snappy interactions
- **Query invalidation** — Mutations automatically invalidate related queries
- **Pagination** — Built-in support for cursor and offset-based pagination

### 4.2 Client State (Zustand)

Zustand stores manage client-side state:

| Store | Purpose |
|-------|---------|
| `auth` | User session, JWT tokens, role, permissions |
| `notifications` | Unread count, notification list, preferences |
| `sidebar` | Collapsed state, active module |
| `theme` | Color scheme preferences |

```typescript
// Lightweight, TypeScript-typed stores
const useAuth = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    login: async (email, password) => { /* ... */ },
    logout: () => set({ user: null, isAuthenticated: false })
}));
```

### 4.3 State Architecture Separation

- **React Query** handles everything that comes from the server: entity data, lists, aggregations, KPIs
- **Zustand** handles everything that lives on the client: auth session, UI preferences, notification state
- This separation prevents the common pitfall of using a global store for server data, which leads to stale data and manual cache management

---

## 5. API Integration

### 5.1 API Client Layer

23+ API client modules in `lib/api/`:

| Module | Endpoints |
|--------|-----------|
| `auth.ts` | Login, logout, refresh, MFA enrollment |
| `crm.ts` | Accounts, contacts, opportunities, leads |
| `sales.ts` | Quotes, orders, invoices, commissions |
| `purchasing.ts` | POs, suppliers, receipts |
| `manufacturing.ts` | Work orders, BOMs, operations, MRP |
| `warehouse.ts` | Inventory, locations, transactions, picks |
| `finance.ts` | GL, AR, AP, banking, currencies |
| `projects.ts` | Projects, tasks, time entries, issues |
| `plm.ts` | Parts, EBOMs, MBOMs, ECRs |
| `quality.ts` | 8D, CAPA, NCR, audits, inspections |
| `service.ts` | Tickets, RMA, maintenance, orders |
| `hr.ts` | Employees, departments, positions |
| `admin.ts` | Users, roles, system configuration |
| `search.ts` | Global search across 12 module tables |
| `notifications.ts` | Notification management |
| `forms.ts` | Form templates and submissions |
| `approvals.ts` | Approval workflows |
| `integration.ts` | Dead letter management |
| `attachments.ts` | File upload, download, delete |
| `export.ts` | CSV/XLSX generation |
| `dashboard.ts` | KPIs, charts, alerts, activity |

### 5.2 Authentication Flow

```
1. User submits login form
2. POST /api/auth/login (email + password + optional TOTP)
3. Server sets HttpOnly Secure cookies (access + refresh tokens)
4. Zustand auth store updates (user, role, permissions)
5. Middleware.ts checks auth on every navigation
6. 401 responses trigger automatic token refresh
7. Refresh failure → redirect to login
```

### 5.3 Axios Configuration

The Axios instance is configured with:
- **Base URL** — `API_URL` from `next.config.js` environment variable
- **Credentials** — `withCredentials: true` for cookie-based auth
- **Interceptors** — Automatic 401 → refresh → retry pipeline
- **Tenant header** — `X-Tenant-ID` injected on every request

---

## 6. Real-Time Features

### 6.1 WebSocket Integration

The `lib/ws.ts` module manages WebSocket connections:

```typescript
// Connect to server's B2B Event Hub
const ws = new WebSocket(`${WS_URL}?token=${accessToken}`);

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    switch (data.type) {
        case 'notification': handleNotification(data); break;
        case 'state_transition': invalidateQueries(data); break;
        case 'data_change': invalidateQueries(data); break;
    }
};
```

### 6.2 Live Updates

WebSocket events trigger React Query cache invalidation:

- Status changes on viewed entities update in real-time
- Dashboard KPIs refresh on relevant data changes
- Notification badges update immediately
- No polling — all updates are server-pushed

### 6.3 Reconnection

The WebSocket client handles connection interruptions:
- Automatic reconnection with exponential backoff
- Re-authentication on reconnect
- Missed events recovered on next data fetch

---

## 7. Validation

### 7.1 Zod Schemas

Input validation uses Zod schemas in `lib/validation/schemas/`:

| Schema File | Entities Validated |
|-------------|-------------------|
| `crm.ts` | Accounts, contacts, opportunities, leads |
| `sales.ts` | Quotes, orders, invoices |
| `purchasing.ts` | POs, suppliers |
| `manufacturing.ts` | Work orders, BOMs, operations |
| `warehouse.ts` | Inventory items, locations, transactions |
| `finance.ts` | GL entries, payments, currencies |
| `quality.ts` | 8D, CAPA, NCR, audits, inspections |
| `service.ts` | Tickets, RMA, maintenance |
| `approval.ts` | Approval requests |
| `hr.ts` | Employees, departments |

### 7.2 Validation Strategy

- **Client-side** — Zod schemas validate form input before submission, providing instant feedback
- **Server-side** — The C++ server validates all input independently (never trusts client validation)
- **OpenAPI** — `additionalProperties: false` on all create/update schemas rejects unknown fields
- **Type safety** — Zod infers TypeScript types from schemas, ensuring compile-time type checking

---

## 8. Styling and Theming

### 8.1 Tailwind Configuration

Custom Yggdrasil theme defined in `tailwind.config.ts`:

```typescript
theme: {
    extend: {
        colors: {
            yggdrasil: {
                50: '#f0fdf4',   // Lightest green
                500: '#22c55e',  // Primary green
                900: '#14532d',  // Darkest green
                // Full 50-900 scale
            }
        }
    }
}
```

### 8.2 Design Principles

- **Consistent spacing** — Tailwind's spacing scale used throughout (no arbitrary pixel values)
- **Component-level styling** — Styles are co-located with components, not in global stylesheets
- **Responsive design** — All pages use Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`) for responsive layouts
- **Dark mode ready** — Color palette supports dark mode through Tailwind's `dark:` variant (not yet enabled)

---

## 9. Portal

### 9.1 Separate Layout

The customer portal (`/portal/*`) uses a separate layout from the main ERP application:

- **No sidebar** — Cleaner navigation for non-ERP functions
- **Simplified header** — Organization name, user profile, logout
- **Limited scope** — Administration and configuration, not data entry

### 9.2 Portal Pages

| Page | Purpose |
|------|---------|
| Dashboard | Health status, module overview, quick actions |
| Team | User management, invitations, CSV export |
| Subscription | Module activation and tier management |
| Settings | Profile, password, organization, deletion |
| Support | Support ticket management with CSV export |
| Documents | Print-ready document templates (PO, Invoice, Quote, Pick List) |
| Help | 16-article help center with category search |
| API Docs | 19-endpoint API reference |
| Onboarding | New account setup wizard |

---

## 10. Export and Printing

### 10.1 Data Export

The `ExportButton` component provides CSV and XLSX export:

- **Client-side generation** — `lib/export.ts` utilities generate files in the browser
- **Column selection** — Users choose which columns to include
- **Filename convention** — `{entity-type}_{date}.csv` format
- **Large dataset support** — Streaming generation for datasets > 10,000 rows

### 10.2 Document Printing

Server-generated PDFs for commercial documents:

- `PrintableDocument` component renders print-ready HTML
- Server endpoints generate branded PDF files with HTML templates
- Supported documents: Quotes, Sales Orders, Invoices, Purchase Orders, Pick Lists, Work Orders

---

## 11. Testing

### 11.1 Unit Tests

```bash
npm test              # Run all tests (single run)
npm run test:watch    # Watch mode for development
npm run test:coverage # Coverage report
```

| Aspect | Configuration |
|--------|--------------|
| Framework | Vitest 2.x with jsdom environment |
| Component testing | `@testing-library/react` |
| Assertions | Vitest built-in + `@testing-library/jest-dom` |
| Test location | Co-located `__tests__/` directories |
| Naming | `*.test.ts` / `*.test.tsx` |

### 11.2 Type Checking

```bash
npm run type-check    # tsc --noEmit
```

TypeScript strict mode is enabled with:
- `strict: true` — Enables all strict type checking options
- `noUncheckedIndexedAccess` — Array/object access returns `T | undefined`
- `noImplicitReturns` — All code paths must return a value

### 11.3 Linting

```bash
npm run lint          # ESLint with next config
```

ESLint rules enforce:
- React hooks rules (dependency arrays, hook order)
- Import ordering
- No unused variables
- Accessibility (jsx-a11y)

---

## 12. Build and Deployment

### 12.1 Build Process

```bash
npm run build         # Next.js production build
npm run start         # Production server
```

Build output:
- Server-rendered pages pre-compiled as static HTML where possible
- Client-side JavaScript bundles with automatic code splitting
- CSS extracted and minified

### 12.2 Environment Configuration

| Variable | Purpose | Default |
|----------|---------|---------|
| `API_URL` | C++ backend server URL | `http://localhost:8080` |
| `WS_URL` | WebSocket server URL | `ws://localhost:8081` |

### 12.3 CI/CD Pipeline

| Job | Purpose |
|-----|---------|
| `web-lint` | ESLint + TypeScript strict checking |
| `web-test` | Vitest unit tests |
| `web-build` | Next.js production build verification |

---

## 13. Email System

### 13.1 Email Templates

8 email templates defined in `lib/email.ts`:

| Template | Trigger |
|----------|---------|
| Welcome | New user account creation |
| Password reset | Password reset request |
| Password changed | Successful password change |
| MFA enabled | TOTP enrollment confirmation |
| Approval request | New approval submitted |
| Approval decision | Approval approved/rejected |
| Notification digest | Daily/weekly notification summary |
| Support ticket | New support ticket created |

### 13.2 Delivery

- **Production** — SMTP delivery via the C++ server's EmailService
- **Development** — stdout fallback for local testing without SMTP configuration

---

*Copyright 2026 Mimir Labs. All rights reserved.*
