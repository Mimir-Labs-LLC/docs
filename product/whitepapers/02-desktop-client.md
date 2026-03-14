# Yggdrasil ERP — Desktop Client Architecture White Paper

**Mimir Labs Technical Publication**
**Document Version:** 1.0
**Date:** March 2026
**Classification:** Public

---

## Executive Summary

The Yggdrasil ERP desktop client is a native Qt 6 application built with C++17 and QML, serving as the reference implementation for all client-facing features. It provides a rich, responsive interface for manufacturing floor operations, warehouse management, and office workflows — environments where browser-based UIs may be impractical or insufficient. This white paper details the client's architecture, component model, backend integration, and design philosophy.

---

## 1. Technology Foundation

| Component | Specification |
|-----------|---------------|
| Language | C++17 (ISO/IEC 14882:2017) |
| UI Framework | Qt 6.2+ (Quick, QML, Controls 2) |
| Charting | Qt 6 Charts module |
| Build System | CMake 3.16+ with `CMAKE_AUTOMOC ON` |
| Communication | HTTP (REST API), WebSocket (real-time events) |
| Target Platforms | Windows, Linux, macOS |

### 1.1 Why Native Desktop?

Yggdrasil follows a **desktop-first development policy**. New client-facing features are designed and tested on the Qt desktop client first, then ported to the Next.js web application. The desktop client is the reference implementation — the web app follows it, not the other way around.

Desktop-native advantages for ERP workloads:

- **Offline capability** — Core operations continue without network connectivity (planned)
- **Hardware integration** — Barcode scanners, label printers, and measurement devices connect directly
- **Performance** — Native rendering and local computation for large datasets, complex BOMs, and real-time dashboards
- **Multi-window workflows** — Users can view a work order, its BOM, and inventory simultaneously across monitors
- **Shop floor durability** — No browser tab management, no accidental page closes, no memory pressure from unrelated tabs

---

## 2. Application Architecture

### 2.1 Initialization Sequence

The client's `main.cpp` orchestrates startup:

```
1. QGuiApplication initialization
2. QML Engine creation
3. Backend singleton registration (6 singletons)
4. QML module path configuration
5. Resource loading (qml.qrc)
6. Main window creation
7. Authentication check → login dialog or main view
```

### 2.2 Backend Singletons

Six C++ singleton objects are registered with the QML engine, providing the bridge between the UI layer and the server:

| Singleton | QML Name | Purpose |
|-----------|----------|---------|
| `ApiClient` | `ApiClient` | HTTP REST client for all server communication |
| `AuthManager` | `AuthManager` | Login, logout, token management, MFA |
| `WebSocketManager` | `WebSocketManager` | Real-time event subscriptions and notifications |
| `ThemeManager` | `Theme` | Application-wide color scheme, fonts, spacing |
| `SettingsManager` | `Settings` | User preferences, server URL, cached state |
| `NotificationManager` | `NotificationManager` | In-app notification display and management |

### 2.3 Singleton Registration

Singletons are registered as QML context properties, making them globally accessible from any QML file:

```cpp
engine.rootContext()->setContextProperty("ApiClient", &apiClient);
engine.rootContext()->setContextProperty("AuthManager", &authManager);
engine.rootContext()->setContextProperty("Theme", &themeManager);
```

This pattern avoids import dependencies and provides a clean separation between C++ business logic and QML presentation.

---

## 3. QML Architecture

### 3.1 Module Pages

Each business module has a dedicated QML page:

| Module | QML File | Key Features |
|--------|----------|-------------|
| Dashboard | `DashboardPage.qml` | KPI cards, charts (bar, pie, area), alerts, activity feed |
| CRM | `CrmPage.qml` | Accounts, contacts, opportunities, leads tabs |
| Sales | `SalesPage.qml` | Quotes, orders, invoices, commissions tabs |
| Purchasing | `PurchasingPage.qml` | POs, suppliers, receipts, asset registry tabs |
| Manufacturing | `ManufacturingPage.qml` | Work orders, BOMs, operations, MRP tabs |
| Warehouse | `WarehousePage.qml` | Inventory, locations, transactions, pick lists tabs |
| Finance | `FinancePage.qml` | GL, AR, AP, banking, currencies, exchange rates tabs |
| Projects | `ProjectsPage.qml` | Projects, tasks, time tracking, issues tabs |
| PLM | `PlmPage.qml` | Parts, EBOMs, MBOMs, ECRs tabs |
| Quality | `QualityPage.qml` | 8D, CAPA, NCR, audits, inspection plans tabs |
| Service | `ServicePage.qml` | Tickets, RMA, maintenance, service orders tabs |
| Settings | `SettingsPage.qml` | User profile, security (MFA), preferences |
| HR | `HrPage.qml` | Employees, departments, positions tabs |
| Logistics | `LogisticsPage.qml` | Shipments, carriers, fleet, asset registry tabs |
| Forms | `FormsPage.qml` | Form catalog, submissions, template management tabs |
| API Reference | `ApiReferencePage.qml` | Interactive API documentation (admin only) |

### 3.2 Reusable Components

A library of reusable QML components provides consistent UI patterns:

| Component | Purpose |
|-----------|---------|
| `DataTable` | Sortable, paginated table with search and column configuration |
| `RecordDetailPage` | Master-detail view with sections, custom actions, and attachments |
| `FormDialog` | Modal form for create/edit operations with field validation |
| `AttachmentPanel` | File upload, download, and delete for any entity type |
| `SearchBar` | Global search with debounced typeahead and module-badge results |
| `NotificationPanel` | Real-time notification display with read/dismiss actions |
| `ChartCard` | Reusable chart wrapper (bar, pie, area variants) |
| `TabBar` | Module sub-navigation with badge counts |
| `KpiCard` | Dashboard metric display with trend indicators |
| `AlertsBanner` | Warning/error notifications across the top of pages |

### 3.3 Resource Management

QML files and assets are compiled into the application binary via Qt's resource system (`qml.qrc`):

- All QML files are listed in `qml.qrc` for compile-time resource embedding
- Component registration via `qmldir` files enables clean import paths
- Icons and images are embedded as resources for offline availability

---

## 4. Data Flow

### 4.1 API Communication

The `ApiClient` singleton handles all server communication:

```
QML UI → ApiClient (C++) → HTTP Request → Server → HTTP Response → ApiClient → QML UI
```

Key capabilities:
- **Authentication** — JWT tokens managed automatically; refresh on 401 responses
- **Tenant context** — `X-Tenant-ID` header injected on every request
- **Error handling** — Network errors, 4xx/5xx responses surfaced to QML with structured error objects
- **File operations** — `uploadAttachment()` and `downloadFile()` for binary data transfer
- **Pagination** — `?page=`, `?limit=`, `?search=` parameters managed by DataTable

### 4.2 Real-Time Events

The `WebSocketManager` provides live data updates:

```
Server B2BEventHub → WebSocket → WebSocketManager (C++) → QML Signal → UI Update
```

- Connects to the server's WebSocket endpoint on port 8081
- Authenticates with the current JWT
- Subscribes to tenant-scoped event channels
- Emits Qt signals that QML components bind to for reactive updates
- Auto-reconnection on connection loss with exponential backoff

### 4.3 Notification Pipeline

```
Server Event → WebSocket → NotificationManager → In-app Toast / Notification Panel
                                                → Desktop System Notification (optional)
```

Notification preferences (which types, email vs in-app) are user-configurable via the Settings page.

---

## 5. Authentication Flow

### 5.1 Login

1. User enters email and password in the login dialog
2. `AuthManager` sends `POST /api/auth/login`
3. If MFA is enabled, a TOTP code dialog appears
4. On success, JWT tokens are stored securely
5. Main application view loads with module navigation

### 5.2 Session Management

- Access tokens (1-hour lifetime) are refreshed automatically before expiration
- WebSocket connections re-authenticate on token refresh
- Session persistence — returning users skip login if the refresh token is valid

### 5.3 Operator Login

For shared workstations (e.g., manufacturing floor), the operator login dialog provides:
- Quick user switching without full application restart
- PIN-based authentication for faster operator changes
- Audit trail maintained per operator

---

## 6. Desktop-First Development Pattern

### 6.1 Feature Implementation Sequence

```
1. Design → Define data model, API endpoints, and UI interactions
2. Server → Implement API endpoints and business logic
3. Desktop → Build the Qt/QML UI as the reference implementation
4. Web → Port the feature to Next.js, matching desktop behavior
```

### 6.2 Parity Tracking

Feature parity between desktop and web is tracked systematically. As of the current version:

- **Full parity** — All 10 business modules have corresponding desktop and web implementations
- **Desktop-only features** — Operator login, hardware integration (scanners, printers)
- **Web-only features** — Mobile-responsive layouts, progressive web app capabilities

### 6.3 Component Mapping

Desktop and web components are designed as conceptual pairs:

| Desktop (QML) | Web (React) | Function |
|---------------|-------------|----------|
| `DataTable` | `CrudPanel` | List/grid view with CRUD operations |
| `RecordDetailPage` | `RecordDetailPage` | Master-detail with sections |
| `FormDialog` | Modal form | Create/edit forms |
| `AttachmentPanel` | `AttachmentPanel` | File management |
| `SearchBar` | Sidebar search | Global search |
| `ChartCard` | `ChartCard` | Dashboard charts |

---

## 7. Theming and Design

### 7.1 Theme System

The `ThemeManager` provides application-wide design tokens:

| Token Category | Examples |
|---------------|----------|
| Colors | Primary (Yggdrasil green), background, surface, text, error, warning |
| Typography | Font family, sizes (header, body, caption), weights |
| Spacing | Margins, padding, gap values |
| Border radius | Card, button, input field rounding |
| Shadows | Elevation levels for cards and dialogs |

### 7.2 Consistent Styling

All QML components reference `Theme.*` properties rather than hardcoded values:

```qml
Rectangle {
    color: Theme.backgroundColor
    radius: Theme.borderRadius

    Text {
        color: Theme.textColor
        font.pixelSize: Theme.bodyFontSize
    }
}
```

This enables future theme switching (light/dark mode) by changing a single `ThemeManager` configuration.

---

## 8. Custom Actions and Workflows

### 8.1 Record-Level Actions

The `RecordDetailPage` component supports custom actions — context-specific operations that appear as buttons in the detail view:

| Entity | Custom Action | Server Operation |
|--------|--------------|-----------------|
| Quotes | Convert to Order | `POST /sales/quotes/:id/convert` |
| Sales Orders | Create Invoice | `POST /sales/orders/:id/invoice` |
| Service Orders | Create Invoice | `POST /service/orders/:id/invoice` |
| Purchase Orders | Create Bill | `POST /purchasing/orders/:id/bill` |
| Work Orders | Complete Units | `POST /manufacturing/work-orders/:id/complete-units` |
| Work Orders | View Serial Numbers | `GET /manufacturing/work-orders/:id/serial-numbers` |
| Projects | Billing Summary | `GET /projects/:id/billing-summary` |

### 8.2 Print/PDF Generation

The detail view includes a Print button that downloads server-generated PDFs:

- Quotes, sales orders, invoices — Commercial document templates
- Purchase orders — Procurement document template
- Pick lists — Warehouse operation template
- Work orders — Manufacturing operation template with operations and materials sections

---

## 9. Build and Distribution

### 9.1 Build Process

```bash
cd client && mkdir -p build && cd build
cmake ..
make -j$(nproc)
./YggdrasilClient
```

CMake configuration:
- Qt modules: Core, Quick, QuickControls2, Network, WebSockets, Charts
- `CMAKE_AUTOMOC ON` for automatic Meta-Object Compiler processing
- Resource compilation via `qt_add_resources`

### 9.2 Platform Targets

| Platform | Compiler | Status |
|----------|----------|--------|
| Windows 10/11 | MSVC 2019+ | Primary development platform |
| Linux (Ubuntu 22.04+) | GCC 10+ | Production deployment |
| macOS 13+ | Clang 13+ | Supported |

### 9.3 Application Identity

- **Window title** — "Yggdrasil ERP" with version suffix
- **Taskbar icon** — Yggdrasil logo (multi-resolution ICO)
- **System tray** — Notification badge for unread alerts

---

## 10. Performance Characteristics

### 10.1 Startup

- Application launch to login dialog: < 2 seconds
- Login to dashboard (including API calls): < 3 seconds on local network
- QML compilation is cached by Qt for subsequent launches

### 10.2 Data Handling

- DataTable handles 10,000+ rows with virtual scrolling
- Server-side pagination prevents loading full datasets
- Debounced search (300ms) prevents excessive API calls during typing
- WebSocket events update visible data in real-time without polling

### 10.3 Memory

- Base memory usage: ~80-120 MB (including Qt runtime)
- Per-module memory: ~10-20 MB for loaded QML and cached data
- Resource-embedded QML files avoid filesystem I/O during navigation

---

*Copyright 2026 Mimir Labs. All rights reserved.*
