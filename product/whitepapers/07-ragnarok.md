# Ragnarok — Data Migration Tool White Paper

**Mimir Labs Technical Publication**
**Document Version:** 1.0
**Date:** March 2026
**Classification:** Public
**Status:** Implemented (v0.1.0)

---

## Executive Summary

Ragnarok is a standalone, air-gapped Qt 6 desktop application that migrates data between enterprise systems. It operates as a five-stage linear wizard — taxonomy classification, heuristic auto-mapping, semantic review, gap analysis, and bulk ingestion — with zero AI, LLM, or cloud dependency. All logic is deterministic and local, with no network access beyond the two database connections (source and target).

Ragnarok uses the Mimisbrunnr semantic model as its Rosetta Stone — a universal reference schema of 166 tables across 17 business domains that provides the shared vocabulary for classifying, mapping, and validating data across any source and target system. While Yggdrasil ERP is the default and most common target, Ragnarok is system-agnostic: any PostgreSQL or SQL Server database can serve as the migration target.

Ragnarok is the second tool in the Mimir Labs data platform trilogy, consuming the `.ratatosk.json` manifests produced by Ratatosk to execute the actual data migration.

---

## 1. Platform Position

| Tool | Role | Lifecycle |
|------|------|-----------|
| **Ratatosk** | Migration Scouter — schema discovery, taxonomy classification, manifest generation | One-time (Migration-Key license) |
| **Ragnarok** | Migration Executor — heuristic mapping, semantic review, bulk ingestion | One-time (Migration-Key license) |
| **Bifrost** | Live Data Bridge — persistent sync, event orchestration, conflict resolution | Ongoing (subscription) |

```
Ratatosk (.ratatosk.json) ──→ Ragnarok (one-time bulk migration)
                           └──→ Bifrost  (persistent live sync)
```

Ragnarok and Ratatosk form the **Migration Suite**, licensed under a Migration-Key model — single-use activation per tenant migration. For persistent synchronization after migration, see Bifrost.

---

## 2. Technology Foundation

| Component | Specification |
|-----------|---------------|
| Language | C++17 (ISO/IEC 14882:2017) |
| Framework | Qt 6.2+ (Core, Gui, Widgets, Sql) |
| Build System | CMake 3.16+ with `CMAKE_AUTOMOC ON` |
| Database Support | PostgreSQL (Tier A), SQL Server via ODBC (Tier A), CSV/JSON (Tier B — stub) |
| Authentication | Standalone PBKDF2 (PasswordUtil), DevAdmin/TenantAdmin gate |
| Semantic Layer | Mimisbrunnr (166 tables, 17 domains) — used as the classification Rosetta Stone |
| Target Support | Any PostgreSQL or SQL Server database (Yggdrasil ERP is the default target) |

### 2.1 Design Constraints

- **Air-gapped operation** — No internet access required. Operates entirely between two database connections.
- **No AI/ML dependency** — All matching, classification, and mapping is deterministic and rule-based.
- **Target-preserving** — Target tables and columns are never dropped, renamed, or modified. Source elements must adapt to the target schema, never the reverse.
- **System-agnostic** — Mimisbrunnr provides the semantic reference model for classification and mapping, but the migration target is not limited to Yggdrasil ERP. Any database with a compatible schema can serve as the target.

---

## 3. Architecture

### 3.1 Five-Stage Wizard

Ragnarok operates as a linear wizard with each stage building on the output of the previous:

| Stage | Name | Purpose |
|-------|------|---------|
| 0.5 | Taxonomy | Analyze source schema, classify tables into 17 business domains using FK graph + column archetypes + name heuristics |
| 1 | Auto-Mapping | Match source tables/columns to target schema using Mimisbrunnr-derived Levenshtein distance + synonym groups |
| 2 | Review | Human review and correction of automated mappings in an interactive UI |
| 3 | Gap Analysis | Identify unmapped source elements and missing target requirements |
| 4 | Ingestion | Execute the migration with topological sort, FK resolution, and data validation |

### 3.2 Core Engines

#### TaxonomyEngine

Classifies source tables into 17 business domains (derived from Mimisbrunnr's universal taxonomy) using three complementary techniques:

- **FK graph analysis** — Builds the foreign key graph of the source schema and identifies clusters of related tables. Tables with FK relationships to known domain anchors (e.g., tables referencing `customers` are likely CRM) are classified by association.
- **Column archetype detection** — Recognizes common column patterns (e.g., `total_amount`, `unit_price` → Finance; `serial_number`, `lot_number` → Manufacturing) to infer table domain membership.
- **Name heuristics** — Table and column name prefixes, suffixes, and keywords are matched against domain dictionaries (e.g., `wo_`, `work_order` → Manufacturing).

#### MappingEngine

Domain-scoped matching with multiple scoring techniques:

- **Levenshtein distance** — Edit distance between source and target names, normalized by string length for comparable scoring across different name lengths.
- **Synonym groups** — 50+ groups covering ERP terminology variants (e.g., "customer" = "client" = "account" = "debtor"; "purchase_order" = "po" = "buy_order").
- **Domain scoping** — Matches are constrained within the taxonomy domain assigned in Stage 0.5, preventing false matches across unrelated domains (e.g., a Finance "account" vs. a CRM "account").

#### TypeCompat

Normalizes data type names across database platforms:

- PostgreSQL types → canonical type system
- SQL Server / MSSQL types → canonical type system
- Compatibility scoring between source and target types (exact match, lossless cast, lossy cast, incompatible)

### 3.3 Migration Plan

The `MigrationPlan` is the central data structure:

- **JSON-serializable** — Plans can be saved to disk and resumed later for interrupted migrations
- **Topological sort** — Tables are ordered by FK dependency graph to ensure parent records exist before child records are inserted
- **Per-table configuration** — Each table mapping includes column mappings, type transformations, default values for missing required fields, and validation rules
- **Save/resume** — Large migrations can be paused and resumed without data loss

---

## 4. Source Tier Architecture

### 4.1 Tier A — Direct Database Connections

| Source | Driver | Change Detection |
|--------|--------|------------------|
| PostgreSQL | Qt QPSQL | Schema introspection via `information_schema` |
| SQL Server | ODBC | Schema introspection via `INFORMATION_SCHEMA` views |

Tier A sources connect directly to the source database, introspect the schema (tables, columns, types, foreign keys, indexes), and extract data for migration.

### 4.2 Tier B — File-Based Sources (Stub)

| Source | Format | Status |
|--------|--------|--------|
| CSV | Comma-separated values with header row | Stub implementation |
| JSON | JSON array of objects or NDJSON | Stub implementation |

Tier B sources accept schema information and data from flat files, enabling migration from systems that don't provide direct database access.

---

## 5. User Interface

### 5.1 Wizard Flow

The UI presents each stage as a dedicated screen with clear progress indication:

1. **Source Selection** — Connect to source database, display connection status and schema statistics
2. **Taxonomy View** — Interactive domain classification with drag-and-drop table reassignment
3. **Mapping Review** — Side-by-side source→target column mapping with confidence indicators and manual override
4. **Gap Report** — Visual summary of unmapped fields, missing required columns, and type incompatibilities
5. **Ingestion Progress** — Real-time progress bars per table with row counts, error counts, and elapsed time

### 5.2 Key UI Components

| Component | Purpose |
|-----------|---------|
| `SourceSelectDialog` | Database connection configuration and testing |
| `CatalogPanel` | Source schema browser with domain color-coding |
| `ReviewDialog` | Interactive mapping review with accept/reject/edit actions |
| `LineageWindow` | Visual FK relationship graph between tables |
| `AnnotationWindow` | Business label and note editor for source columns |
| `ExportDialog` | Export migration plan and results |
| `GovernanceExportDialog` | Export governance artifacts for Jormungandr |
| `PolicyDashboard` | Migration policy configuration and compliance status |
| `QualityDashboard` | Data quality metrics and validation results |
| `StewardshipPanel` | Data stewardship assignment and tracking |

---

## 6. Data Quality and Validation

### 6.1 Quality Engine

The `QualityEngine` validates data during migration:

- **Type validation** — Values conform to target column data types
- **Constraint validation** — NOT NULL, UNIQUE, CHECK constraints are verified before insertion
- **Referential integrity** — FK references resolve to existing target records
- **Business rule validation** — Domain-specific rules (e.g., order totals match line item sums)

### 6.2 Metrics Engine

The `MetricsEngine` tracks migration health:

- Row counts per table (source vs. target)
- Error rates and error categorization
- Migration throughput (rows/second)
- Data coverage (percentage of source data successfully migrated)

### 6.3 Policy Engine

The `PolicyEngine` enforces configurable migration policies:

- Required field handling (reject, use default, prompt)
- Type mismatch handling (cast, truncate, reject)
- Duplicate record handling (skip, update, reject)
- Orphan record handling (create placeholder parent, skip, reject)

---

## 7. Ingestion Pipeline

### 7.1 Execution Flow

```
1. Load migration plan (from JSON or from wizard stages)
2. Topological sort: order tables by FK dependencies
3. For each table (in dependency order):
   a. SELECT from source with pagination (batch size configurable)
   b. Transform: apply column mappings, type conversions, defaults
   c. Validate: run QualityEngine checks
   d. INSERT into target (COPY protocol for bulk performance)
   e. Record results: success count, error count, error details
4. FK resolution pass: resolve deferred FK references
5. Generate migration report
```

### 7.2 Performance

- **Batch processing** — Data is read and written in configurable batch sizes to manage memory usage
- **COPY protocol** — PostgreSQL's COPY command is used for bulk inserts, achieving significantly higher throughput than row-by-row INSERT
- **Deferred FK resolution** — Self-referencing and circular FK relationships are handled with a deferred resolution pass after initial data load

---

## 8. Governance Artifacts

Ragnarok generates governance artifacts that feed downstream tools:

- **Migration manifest** — Complete record of what was mapped, transformed, and migrated
- **Data lineage report** — Source-to-target traceability for every migrated field
- **Gap analysis export** — Unmapped fields and coverage metrics for governance review
- **Quality report** — Validation results, error details, and data health metrics

These artifacts are system-agnostic and consumable by **Ratatosk** (for audit baseline), **Jormungandr** (for canonical schema establishment), and any downstream governance or integration tooling.

---

## 9. Security

### 9.1 Authentication

- **Operator authentication** — DevAdmin or TenantAdmin role required to launch the tool
- **PBKDF2 password hashing** — Standalone password utility for secure credential verification
- **No credential storage** — Database connection credentials are entered at runtime, not persisted

### 9.2 Data Protection

- **Air-gapped by design** — No internet connectivity required or used
- **In-memory processing** — Sensitive data is processed in memory and not written to temporary files
- **Audit trail** — All migration actions are logged with timestamps and operator identity

---

## 10. Build and Distribution

```bash
cd tools/ragnarok && mkdir -p build && cd build
cmake ..
make -j$(nproc)
./Ragnarok
```

| Dependency | Version |
|-----------|---------|
| Qt 6 | Core, Gui, Widgets, Sql |
| CMake | 3.16+ |
| C++ Standard | C++17 |
| PostgreSQL | libpq (for QPSQL driver) |

---

*Copyright 2026 Mimir Labs. All rights reserved.*
