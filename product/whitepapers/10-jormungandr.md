# Jormungandr — Canon Governance & Enforcement Layer White Paper

**Mimir Labs Technical Publication**
**Document Version:** 0.1 (Evolving — Pre-Development)
**Date:** March 2026
**Classification:** Public
**Status:** Planned (YGGDATA-326, 12 stories, all To Do)

---

## Executive Summary

Jormungandr is a multi-tenant SaaS platform that owns and enforces the canonical enterprise data model ("the canon") established during Ratatosk governance extraction engagements. Named for the World Serpent that encircles Midgard in Norse mythology, Jormungandr wraps around an organization's data landscape, detecting when new structures, integrations, or schema changes diverge from the approved canonical model.

Jormungandr converts one-time Ratatosk engagements into long-term recurring governance subscriptions while enforcing data discipline across the enterprise stack.

**This is an evolving document. Jormungandr is not yet implemented. Content reflects the planned architecture as defined in the YGGDATA-326 epic and its child stories.**

---

## 1. Platform Position

```
Ratatosk discovers and proposes canon.
Jormungandr owns and enforces canon.
```

| Tool | Function | Relationship to Jormungandr |
|------|----------|---------------------------|
| **Ratatosk** | Discovers schema, classifies domains, produces manifest | Jormungandr imports Ratatosk manifests as the baseline canon |
| **Ragnarok** | Executes one-time data migration | Independent — operates before Jormungandr |
| **Bifrost** | Persistent live sync between systems | Jormungandr validates the sync routing configuration against canon |
| **Mimisbrunnr** | Universal semantic reference model (166 tables, 17 domains) | Jormungandr uses Mimisbrunnr as the Rosetta Stone for semantic matching; canon applies to any system |

Ratatosk is an engagement-based discovery tool. Jormungandr is the persistent governance layer that ensures the canonical model stays enforced across the enterprise after the engagement ends.

---

## 2. Core Capabilities

1. **Canonical schema storage and versioning** — Import Ratatosk output as baseline, version all changes
2. **Governance taxonomy editing** — Edit canonical definitions (tables, columns, labels, classifications)
3. **Controlled vocabulary and synonym management** — Maintain synonym maps for deterministic semantic matching
4. **Schema validation** — Compare incoming structures against canon, detect drift
5. **Governance compliance reporting** — Canonical coverage, violations, drift trends over time
6. **Integration ingestion** — Accept DDL, JSON schema, CSV headers, and API schemas for validation
7. **Alerting** — Flag unknown data structures for review or rejection

All capabilities operate **without AI dependency**. Matching and classification are deterministic and rule-based.

---

## 3. Planned Architecture

### 3.1 Technology Stack (Planned)

| Component | Specification |
|-----------|---------------|
| Deployment | Multi-tenant SaaS |
| Database | PostgreSQL with row-level security |
| Authentication | JWT + API keys |
| Authorization | RBAC (Governance Admin, Analyst, Viewer) |
| API | REST with OpenAPI/Swagger documentation |

### 3.2 Data Model

#### Canon Registry (YGGDATA-327)

The foundational schema for storing canonical definitions:

| Table | Purpose |
|-------|---------|
| `canon_manifests` | Top-level container per organization's canonical schema (name, source engagement, versions) |
| `canonical_tables` | Table-level definitions with business labels, domain assignments, ownership |
| `canonical_columns` | Column-level definitions with data type, label, classification, constraints |
| `taxonomy_groups` | Domain hierarchy from Ratatosk output |
| `canon_versions` | Version history with diffs between versions |
| `canon_metadata` | Organization, engagement origin, import context |

All tables scoped by `tenant_id` with row-level security.

### 3.3 Canon Versioning

Every change to the canonical schema creates a new version:

- **Immutable versions** — Previous versions are never modified
- **Diff computation** — Changes between versions are computed and stored
- **Rollback** — Can revert to any previous version
- **Active version** — Only one version is "active" at a time for validation

---

## 4. Ratatosk Manifest Import (YGGDATA-329)

The import pipeline accepts `.ratatosk.json` manifests:

1. **Parse** — Validate manifest structure and completeness
2. **Conflict detection** — If a canon exists, compare against incoming manifest
3. **Import modes:**
   - "Create new canon" — First import establishes version 1
   - "Merge into existing" — Subsequent engagements produce a diff before merging
4. **Source tracking** — Record engagement ID, date, facilitator
5. **Idempotency** — Re-importing the same manifest is a no-op

---

## 5. Controlled Vocabulary & Synonyms (YGGDATA-330)

### 5.1 Synonym Dictionary

Maps alternative terms to canonical terms for deterministic semantic matching:

```
customer_id = cust_id = client_id = account_number → canonical: "customer_id"
purchase_order = po = buy_order = procurement_order → canonical: "purchase_order"
quantity = qty = amount = count → canonical: "quantity"
```

### 5.2 Features

- **Domain scoping** — Synonyms scoped per taxonomy domain (a term may mean different things in different domains)
- **Seeded defaults** — Ships with a baseline dictionary of common ERP/manufacturing synonyms (derived from Ratatosk's 50+ synonym groups)
- **Bulk import** — Import dictionaries from CSV or JSON
- **Versioned** — Changes versioned alongside canon changes

---

## 6. Schema Validation Engine (YGGDATA-331)

The core value proposition — detecting when data structures diverge from canon.

### 6.1 Validation Process

```
1. Incoming schema submitted (DDL, JSON, CSV headers, API schema)
2. Parse into normalized table/column structure
3. Compare against active canonical schema
4. Classify each element:
   - Exact match — name and type match canon
   - Semantic match — name matches via synonym dictionary
   - Type mismatch — name matches but type differs
   - Label mismatch — name matches but business label differs
   - Missing from canon — exists in input but not in canon (drift)
   - Missing from source — canonical element not in input (coverage gap)
5. Generate structured validation report
```

### 6.2 Configurable Strictness

Per-tenant policies:
- Auto-accept semantic matches
- Reject all unknowns
- Warn-only mode
- Custom thresholds per severity level

---

## 7. Semantic Matching Engine (YGGDATA-332)

Deterministic semantic equivalence detection without AI:

### 7.1 Matching Techniques

| Technique | Description |
|-----------|-------------|
| **Synonym lookup** | Resolve against controlled vocabulary |
| **Structural similarity** | Levenshtein distance, common prefix/suffix |
| **Abbreviation expansion** | "qty" → "quantity", "desc" → "description" |
| **Type-aware weighting** | Higher confidence when data types match |
| **Positional heuristics** | Consider column position and surrounding context |

### 7.2 Confidence Scoring

Each match gets a confidence score:
- **High** — Synonym match + type match
- **Medium** — Structural similarity + type match
- **Low** — Structural similarity only

Low-confidence matches are queued for human review rather than auto-accepted.

---

## 8. Governance Drift Reporting (YGGDATA-334)

### 8.1 Report Types

| Report | Content |
|--------|---------|
| **Compliance summary** | Percentage matching canon (exact + semantic), broken down by table and domain |
| **Violation report** | Detailed list: missing tables, unknown columns, type mismatches, label conflicts |
| **Drift trend** | Validation results over time — is compliance improving or degrading? |
| **Per-system breakdown** | Compliance per source system when multiple are validated |

### 8.2 Severity Classification

| Severity | Description | Example |
|----------|-------------|---------|
| **Critical** | Structural violations | Missing required table, incompatible type on key field |
| **Warning** | Semantic mismatches | Field exists but label/type differs from canon |
| **Info** | New fields outside canon | Unknown column that may be legitimate extension |

### 8.3 Export Formats

- **JSON** — Machine-readable for CI/CD integration
- **PDF** — Executive summary for governance committees
- **CSV** — Tabular detail for analyst review

### 8.4 Scheduled Reports

Configurable periodic generation:
- Weekly governance digest
- Monthly compliance trend
- On-demand per validation run

---

## 9. Multi-Tenant SaaS Architecture (YGGDATA-337)

### 9.1 Tenant Isolation

- All data scoped by `tenant_id` with PostgreSQL row-level security
- Fully independent configuration per tenant
- No cross-tenant data leakage

### 9.2 Authentication & Authorization

- **JWT-based authentication** with secure login and session management
- **API key management** — Tenants generate keys for programmatic access (CI/CD)
- **RBAC roles:**

| Role | Capabilities |
|------|-------------|
| **Governance Admin** | Full edit: canon, synonyms, policies, users |
| **Analyst** | Validate schemas, view reports, review matches |
| **Viewer** | Read-only access to reports and canon |

### 9.3 Subscription Management

- Track tenant subscription status (active, trial, expired)
- Feature gating per plan tier
- Audit logging of all tenant actions

---

## 10. REST API (YGGDATA-338)

### 10.1 Planned Endpoints

| Category | Endpoints |
|----------|-----------|
| **Canon** | GET/POST/PUT/DELETE `/api/canon`, versions, diff, import |
| **Validation** | POST `/api/validate`, GET validations history and reports |
| **Synonyms** | GET/POST/PUT `/api/synonyms`, bulk import |
| **Reporting** | GET `/api/reports/compliance`, drift, export (JSON/PDF/CSV) |
| **Admin** | POST `/api/auth/login`, GET `/api/tenant`, POST `/api/keys` |

### 10.2 API Design

- All endpoints require authentication (JWT or API key)
- RBAC enforced per endpoint
- REST conventions with consistent error responses
- OpenAPI/Swagger spec auto-generated
- Rate limiting per tenant

---

## 11. Business Model

### 11.1 Revenue Path

```
Ratatosk engagement (one-time fee)
  → Produces manifest
  → Manifest imported into Jormungandr
  → Ongoing governance subscription (recurring revenue)
```

### 11.2 Value Proposition

Without Jormungandr, the canonical model discovered by Ratatosk decays over time as systems evolve independently. Jormungandr ensures the investment in governance extraction pays ongoing dividends through continuous enforcement, drift detection, and compliance reporting.

---

## 12. Implementation Roadmap

| Story | Title | Status |
|-------|-------|--------|
| YGGDATA-327 | Canon registry schema and data model | To Do |
| YGGDATA-329 | Ratatosk manifest import pipeline | To Do |
| YGGDATA-330 | Controlled vocabulary and synonym dictionary | To Do |
| YGGDATA-331 | Schema validation engine | To Do |
| YGGDATA-332 | Semantic matching engine | To Do |
| YGGDATA-334 | Governance drift reporting | To Do |
| YGGDATA-337 | Multi-tenant SaaS architecture and auth | To Do |
| YGGDATA-338 | REST API | To Do |

### 12.1 Stretch Goals

- **Data lineage tracking** — Trace how canonical entities propagate through integrations and downstream systems
- **Lineage graph** — Maintain a graph of data flow between systems
- **Violation origin tracking** — Identify where canonical violations originate
- **CI/CD webhook** — Trigger validation on schema deployment events

---

## 13. Technical Constraints

- Must work without AI dependency for core functionality
- Must operate purely on schema structures and business labels
- Must accept Ratatosk JSON manifests as input
- System-agnostic — canon enforcement applies to any enterprise system, not limited to Yggdrasil ERP
- Deployable as a service layer in the Mimir Labs stack or independently
- Multi-tenant SaaS architecture with full tenant isolation

---

*Copyright 2026 Mimir Labs. All rights reserved.*
*This document will be updated as implementation progresses.*
