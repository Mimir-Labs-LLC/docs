# Knowledge Base — Internal & Customer-Facing Article System

**Document Owner:** Mimir Labs Support Operations
**Applies To:** All Mimir Labs products
**Last Updated:** 2026-03-14

---

## 1. Overview

The Mimir Labs Knowledge Base (KB) serves two audiences:

- **Internal KB:** Used by L1/L2/L3 support engineers for troubleshooting, known issues, architecture reference, and environment details
- **Customer-facing KB:** Used by customers for self-service — how-to guides, FAQ, release notes, and module documentation

The existing portal help center (`/portal/help`) has 16 articles and serves as the customer-facing entry point. This document formalizes the KB structure, article lifecycle, and initial backlog.

---

## 2. KB Architecture

### 2.1 Hosting

| Audience | Platform | URL |
|----------|----------|-----|
| Customer-facing | Portal help center (`/portal/help`) | `https://app.yggdrasil.com/portal/help` |
| Internal | Confluence space "SUPPORT-KB" or Git-based `docs/kb/` | Internal only |

### 2.2 Content Hierarchy

```
Knowledge Base
├── Internal
│   ├── Troubleshooting Guides (per module, per component)
│   ├── Known Issues & Workarounds
│   ├── Architecture & Environment
│   ├── Vendor & Third-Party Contacts
│   └── Onboarding & Training Materials
└── Customer-Facing
    ├── Getting Started
    ├── Module Guides (10 modules)
    ├── Administration & Configuration
    ├── FAQ
    ├── Release Notes
    ├── API Reference
    └── Migration & Import Guides
```

---

## 3. Article Lifecycle

### 3.1 Workflow

```
Draft → Review → Published → Periodic Review → Archive/Update
```

| Stage | Owner | Action |
|-------|-------|--------|
| **Draft** | Author (L2/L3 engineer, Technical Writer) | Write article using template, tag with category and module |
| **Review** | Peer (another L2+ or Technical Writer) | Technical accuracy, clarity, formatting, completeness |
| **Published** | Technical Writer or Support Manager | Publish to appropriate KB (internal or customer-facing) |
| **Periodic Review** | Assigned reviewer | Every 90 days: verify accuracy, update for new versions, mark stale |
| **Archive** | Technical Writer | Obsolete articles moved to archive (not deleted); redirect added |

### 3.2 Review Triggers (Outside Regular Cycle)

- Product release or version update
- Post-mortem identifies KB gap
- Customer reports article is incorrect or confusing
- Support trend: 3+ tickets on same topic with no KB article

---

## 4. Article Template

### Internal Article Template

```markdown
# [Title — Action-Oriented]

**Category:** [Troubleshooting | Known Issue | Architecture | Reference]
**Module:** [CRM | Sales | Manufacturing | ... | Cross-Module | Infrastructure]
**Component:** [Server | Desktop | Web | Database | Redpanda | Integration]
**Last Verified:** YYYY-MM-DD
**Author:** [name]

## Symptoms
[What the user/engineer sees — error messages, behavior description]

## Root Cause
[Technical explanation of why this happens]

## Resolution
[Step-by-step fix, with commands/config changes]

## Workaround
[Temporary fix if root cause can't be addressed immediately]

## Related Tickets
- YGGDATA-XXX
- [Customer ticket IDs if applicable]

## Tags
[comma-separated: module, component, error-code, feature-name]
```

### Customer-Facing Article Template

```markdown
# [Title — Question or Task Format]

**Module:** [CRM | Sales | Manufacturing | ...]
**Difficulty:** [Beginner | Intermediate | Advanced]
**Last Updated:** YYYY-MM-DD

## Overview
[1-2 sentence summary of what this article covers]

## Prerequisites
[What the user needs before starting — permissions, module access, etc.]

## Steps
1. [Step with screenshot reference]
2. [Step with screenshot reference]
3. ...

## Tips
[Optional: best practices, common mistakes to avoid]

## Related Articles
- [Link to related how-to]
- [Link to FAQ entry]

## Need Help?
If you're still having trouble, [submit a support ticket](/portal/support).
```

---

## 5. Search & Discovery

### 5.1 Search Capabilities

| Feature | Implementation |
|---------|---------------|
| Full-text search | Existing portal help center search (`/portal/help`) |
| Category navigation | Articles organized by module and topic |
| Tagging | Each article tagged with module, component, keywords |
| Suggested articles | During ticket creation, suggest KB articles matching subject keywords |
| Most popular | Track article views, surface top-10 on help center landing |

### 5.2 Ticket Integration

- **Ticket creation form:** As user types subject, show top 3 matching KB articles ("Did you find your answer?")
- **Agent view:** When agent opens a ticket, sidebar shows suggested KB articles based on ticket content
- **Resolution linking:** When resolving a ticket, agent can link to the KB article used (tracks article effectiveness)
- **Gap detection:** Tickets resolved without a KB article link → candidate for new article creation

---

## 6. Existing Content (Portal Help Center)

The portal help center (`/portal/help`) currently has 16 articles:

| # | Title | Category |
|---|-------|----------|
| 1 | Getting Started with Yggdrasil ERP | Getting Started |
| 2 | Managing Your Account | Administration |
| 3 | Understanding Modules | Getting Started |
| 4 | CRM — Managing Contacts and Accounts | Module Guide |
| 5 | Sales — Quotes and Orders | Module Guide |
| 6 | Purchasing — Purchase Orders | Module Guide |
| 7 | Manufacturing — Work Orders | Module Guide |
| 8 | Warehouse — Inventory Management | Module Guide |
| 9 | Finance — General Ledger Basics | Module Guide |
| 10 | Projects — Task Management | Module Guide |
| 11 | Quality — NCR and CAPA | Module Guide |
| 12 | Using the Dashboard | Getting Started |
| 13 | Keyboard Shortcuts | Tips |
| 14 | Exporting Data to CSV | Tips |
| 15 | API Authentication | API |
| 16 | Troubleshooting Login Issues | FAQ |

---

## 7. Initial Article Backlog

### 7.1 Customer-Facing — High Priority (Net New)

| # | Title | Category | Module | Priority |
|---|-------|----------|--------|----------|
| 1 | PLM — Engineering Change Requests (ECR) and ECOs | Module Guide | PLM | High |
| 2 | Service — Managing RMAs and Warranty Claims | Module Guide | Service | High |
| 3 | Finance — Accounts Receivable and Invoicing | Module Guide | Finance | High |
| 4 | Finance — Accounts Payable and Bills | Module Guide | Finance | High |
| 5 | Manufacturing — BOM Management (EBOM + MBOM) | Module Guide | Manufacturing | High |
| 6 | Warehouse — Cycle Counting | Module Guide | Warehouse | High |
| 7 | Setting Up User Roles and Permissions | Administration | Cross-Module | High |
| 8 | Configuring Approval Workflows | Administration | Cross-Module | High |
| 9 | Printing Documents (Invoices, POs, Quotes) | Tips | Cross-Module | High |
| 10 | Understanding the Audit Trail | Administration | Cross-Module | Medium |
| 11 | File Attachments — Uploading and Managing | Tips | Cross-Module | Medium |
| 12 | Saved Views — Creating Custom Filters | Tips | Cross-Module | Medium |
| 13 | MRP — Running Material Requirements Planning | Module Guide | Manufacturing | Medium |
| 14 | HR — Employee Management and Time Tracking | Module Guide | HR | Medium |
| 15 | Notifications — Configuring Alerts | Administration | Cross-Module | Medium |
| 16 | Multi-Factor Authentication (MFA) Setup | Administration | Security | High |
| 17 | Desktop Client — Installation Guide | Getting Started | Infrastructure | High |
| 18 | Desktop Client vs Web App — Feature Comparison | Getting Started | Cross-Module | Medium |
| 19 | Importing Data from CSV | Tips | Cross-Module | Medium |
| 20 | API Reference — Common Endpoints | API | Cross-Module | Medium |

### 7.2 Internal KB — High Priority (Net New)

| # | Title | Category | Priority |
|---|-------|----------|----------|
| 1 | Tenant provisioning — step-by-step | Onboarding | High |
| 2 | Known issue: QPSQL prepare() fails on record_locks table | Known Issue | High |
| 3 | Database migration rollback procedures | Troubleshooting | High |
| 4 | State machine transition troubleshooting | Troubleshooting | High |
| 5 | Ledger service — how it works and when it triggers | Architecture | Medium |
| 6 | CacheManager — key patterns and invalidation | Architecture | Medium |
| 7 | Authentication flow — JWT + MFA | Architecture | Medium |
| 8 | Common SQL queries for data investigation | Reference | Medium |
| 9 | WebSocket event flow — server to client | Architecture | Medium |
| 10 | Environment details — production, staging, dev | Reference | High |
| 11 | Third-party vendor contacts (Redpanda, hosting, etc.) | Reference | Medium |
| 12 | Desktop client QML debugging cheat sheet | Troubleshooting | Medium |
| 13 | Bulk data operations — safe patterns | Reference | Medium |
| 14 | Multi-tenant isolation — what to check | Architecture | High |
| 15 | B2B event system — topics, partitions, consumer groups | Architecture | Medium |

---

## 8. Metrics

| Metric | Target | Purpose |
|--------|--------|---------|
| Article count (customer-facing) | 50+ within 6 months | Coverage of all common tasks |
| Article count (internal) | 30+ within 6 months | Coverage of all troubleshooting scenarios |
| Self-service deflection rate | >= 30% | Tickets avoided by KB usage |
| Article helpfulness rating | >= 80% positive | Customer thumbs-up/down on articles |
| Average article age | <= 90 days since last review | Content freshness |
| Articles linked to ticket resolution | >= 40% of tickets | Tracks KB utilization by agents |

---

## 9. Governance

| Role | Responsibility |
|------|---------------|
| **Technical Writer** | Owns article quality, formatting, publishing cadence |
| **Support Manager** | Prioritizes article backlog based on ticket trends |
| **L2 Engineers** | Primary authors for module-specific content |
| **L3 Engineers** | Primary authors for architecture and troubleshooting content |
| **Product Manager** | Reviews customer-facing articles for accuracy on feature scope |

### Review Schedule

- **Weekly:** Support Manager reviews "articles needed" queue (from unlinked ticket resolutions)
- **Monthly:** Technical Writer audits articles approaching 90-day review deadline
- **Per release:** All affected module articles updated before customer announcement

---

## 10. Related Documents

- [Support Tier Model](support-tier-model.md) — KB is primary L1 resolution tool
- [SLA Framework](sla-framework.md) — Self-service deflection reduces ticket volume
- [Operational Runbooks](runbooks/) — Deep technical references (internal KB supplements these)
