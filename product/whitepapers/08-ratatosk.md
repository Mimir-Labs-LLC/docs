# Ratatosk — Pre-Migration Taxonomy & Data Governance Tool White Paper

**Mimir Labs Technical Publication**
**Document Version:** 1.0
**Date:** March 2026
**Classification:** Public
**Status:** Implemented (v0.1.0)

---

## Executive Summary

Ratatosk is a standalone Qt 6 desktop application that scouts and analyzes customer database schemas, classifies tables and columns into business domains, generates governance metadata, and produces JSON manifests that drive the entire Mimir Labs data platform. Named for the squirrel that runs along the World Tree in Norse mythology, Ratatosk is the first tool in the data platform trilogy — it discovers and annotates what exists before Ragnarok migrates it and Bifrost synchronizes it.

Ratatosk uses the Mimisbrunnr semantic model as its Rosetta Stone — a universal reference schema of 166 tables across 17 business domains that provides a shared vocabulary for classifying enterprise data regardless of the source or target system. While Mimisbrunnr originates from Yggdrasil ERP, Ratatosk is system-agnostic: it can scout and classify schemas destined for any target platform.

Ratatosk operates without AI, LLM, or cloud dependency. All classification and analysis is deterministic and rule-based.

---

## 1. Platform Position

| Tool | Role | Lifecycle |
|------|------|-----------|
| **Ratatosk** | Migration Scouter — schema discovery, taxonomy classification, manifest generation | One-time (Migration-Key license) |
| **Ragnarok** | Migration Executor — heuristic mapping, semantic review, bulk ingestion | One-time (Migration-Key license) |
| **Bifrost** | Live Data Bridge — persistent sync, event orchestration, conflict resolution | Ongoing (subscription) |

Ratatosk is the entry point for every customer engagement. Its output — the `.ratatosk.json` manifest — is consumed by both Ragnarok (for migration) and Bifrost (as the foundational routing table), and can be imported into Jormungandr (for ongoing governance enforcement).

---

## 2. Technology Foundation

| Component | Specification |
|-----------|---------------|
| Language | C++17 (ISO/IEC 14882:2017) |
| Framework | Qt 6.2+ (Core, Gui, Widgets, Sql) |
| Build System | CMake 3.16+ with `CMAKE_AUTOMOC ON` |
| Optional | Qt Network + OpenSSL (telemetry subsystem, compile-time flag) |
| Source Support | PostgreSQL (ODBC), SQL Server (ODBC), CSV, JSON |

---

## 3. Architecture

### 3.1 Module Structure

Ratatosk is organized into five subsystems:

```
ratatosk/src/
├── core/          — Business logic engines (taxonomy, quality, policy, metrics)
├── engine/        — DDL parsing and schema analysis
├── ingest/        — Schema loading from databases and files
├── ui/            — Qt Widgets user interface
└── telemetry/     — Optional usage analytics (consent-gated)
```

### 3.2 Core Engines

#### TaxonomySessionModel

Manages the interactive taxonomy classification session:

- Holds the current state of all table-to-domain assignments
- Supports undo/redo for classification changes
- Tracks classification confidence scores
- Serializable to/from JSON for session persistence

#### ManifestModel / ManifestSerializer

The manifest is the primary output artifact:

- **ManifestModel** — In-memory representation of the classified schema with all metadata
- **ManifestSerializer** — Reads/writes `.ratatosk.json` manifest files

The manifest contains:
- Table definitions with business labels and domain classifications
- Column definitions with data types, labels, and semantic annotations
- FK relationship graph
- Taxonomy group hierarchy
- Quality metrics and coverage statistics
- Source metadata (database, timestamp, operator)

#### QualityEngine

Assesses data quality characteristics of the source schema:

- Column completeness (percentage of non-null values)
- Value distribution analysis
- Data type consistency (mixed types in string columns)
- Referential integrity health (orphan FK references)
- Generates quality scores per table and per column

#### PolicyEngine

Enforces classification policies and governance rules:

- Mandatory domain assignment (no unclassified tables)
- Business label requirements (critical columns must have labels)
- Minimum confidence thresholds for auto-classification
- Custom policy rules per engagement

#### MetricsEngine

Collects and reports engagement-level metrics:

- Schema statistics (table count, column count, FK count, index count)
- Classification coverage (percentage of tables classified)
- Quality scores (aggregated from QualityEngine)
- Time tracking per stage

#### ActionPlanGenerator

Produces a structured action plan for the customer:

- Recommended migration order based on FK dependencies
- Risk assessment per table (complexity, data quality, FK depth)
- Estimated effort for manual review requirements
- Gap identification (tables that don't map cleanly to the Mimisbrunnr reference model or the intended target schema)

#### ArtifactGenerator

Generates deliverable documents from the analysis:

- Executive summary report
- Detailed schema analysis
- Taxonomy classification report
- Data quality assessment
- Recommended migration plan

#### DataAuditBaseline

Establishes the pre-migration data baseline:

- Row counts per table
- Data freshness (most recent timestamps)
- Volume estimates for migration planning
- Checksums for post-migration verification

#### GLPeriodDiscovery

Specialized engine for financial data:

- Discovers General Ledger fiscal period boundaries
- Identifies chart of accounts structure
- Maps financial reporting hierarchy
- Critical for Finance domain classification accuracy

### 3.3 Engine Layer

#### DdlParser

Parses DDL (Data Definition Language) from multiple sources:

- PostgreSQL CREATE TABLE statements
- SQL Server CREATE TABLE statements
- Extracts: table names, column definitions, data types, constraints, FK relationships, indexes
- Builds the in-memory schema graph used by all other engines

### 3.4 Ingest Layer

| Loader | Source | Method |
|--------|--------|--------|
| `OdbcIntrospector` | PostgreSQL, SQL Server | ODBC connection → `INFORMATION_SCHEMA` queries |
| `CsvSchemaLoader` | CSV files | Header row analysis + type inference |
| `JsonSchemaLoader` | JSON files | Structure analysis + type inference |
| `SchemaIngestorBase` | Abstract base | Common interface for all loaders |

---

## 4. User Interface

### 4.1 Workshop Flow

Ratatosk is designed for use during facilitated workshops with the customer's data stewards:

1. **Source Selection** — Connect to source database or load schema files
2. **Schema Discovery** — Automatic schema introspection with statistics
3. **Taxonomy Classification** — Interactive domain assignment with auto-suggestions
4. **Annotation** — Business label entry and semantic notes per column
5. **Quality Assessment** — Review data quality metrics and flag concerns
6. **Review & Export** — Final review and manifest generation

### 4.2 UI Components

| Component | Purpose |
|-----------|---------|
| `SourceSelectDialog` | Database/file source configuration |
| `CatalogPanel` | Schema browser with domain color-coding and search |
| `AnnotationWindow` | Business label and semantic note editor |
| `LineageWindow` | Visual FK relationship graph (table lineage) |
| `ReviewDialog` | Final classification review before export |
| `ExportDialog` | Manifest export with format options |
| `GovernanceExportDialog` | Export governance artifacts for Jormungandr |
| `PolicyDashboard` | Policy configuration and compliance monitoring |
| `QualityDashboard` | Data quality visualization and drill-down |
| `StewardshipPanel` | Data steward assignment and responsibility tracking |
| `WorkshopDisplayWindow` | Presentation-mode view for workshop facilitation |

The `WorkshopDisplayWindow` provides a large-format, presentation-friendly view designed to be projected during customer workshops, allowing real-time collaborative classification.

---

## 5. Telemetry Subsystem

### 5.1 Architecture

Ratatosk includes an optional telemetry subsystem (compile-time flag: `RATATOSK_ENABLE_TELEMETRY`):

| Component | Purpose |
|-----------|---------|
| `ConsentManager` | GDPR-compliant consent collection and persistence |
| `TelemetryController` | Central telemetry coordinator |
| `TelemetryKeyValidator` | Validates telemetry API keys |
| `PayloadBuilder` | Constructs anonymized telemetry payloads |
| `SessionTimer` | Tracks session duration and stage timing |
| `TelemetryTransmitter` | HTTPS transmission to Mimir Labs analytics |
| `AuditLog` | Local audit trail of all telemetry transmissions |
| `TelemetryStatusDialog` | User-facing telemetry status and controls |

### 5.2 Consent Model

- **Opt-in only** — Telemetry is disabled by default
- **Granular consent** — Users choose which data categories to share
- **Transparency** — Every payload is viewable before transmission
- **Revocable** — Consent can be withdrawn at any time
- **Local audit** — All transmissions are logged locally for the user's records

### 5.3 Ratatosk Key

The `ratatosk-keygen` companion tool generates `.ratatosk-key` files:

- **Ed25519 digital signatures** — Keys are cryptographically signed by Mimir Labs
- **Consent verification** — Keys are generated only from verified consent documents
- **Expiration** — Keys have configurable expiry (default: 90 days)
- **Engagement-bound** — Each key is tied to a specific customer engagement

The keygen is an internal Mimir Labs tool, not distributed to customers.

---

## 6. Manifest Format

The `.ratatosk.json` manifest is the primary output and the data contract between all Mimir Labs tools:

```json
{
    "version": "1.0",
    "engagement": {
        "id": "eng-2026-0042",
        "customer": "ACME Manufacturing",
        "date": "2026-03-14",
        "facilitator": "Data Steward"
    },
    "source": {
        "type": "postgresql",
        "database": "legacy_erp",
        "table_count": 85,
        "column_count": 1200
    },
    "taxonomy": {
        "groups": [
            {
                "domain": "CRM",
                "tables": ["customers", "contacts", "opportunities"],
                "confidence": 0.95
            }
        ]
    },
    "tables": [
        {
            "source_name": "customers",
            "domain": "CRM",
            "business_label": "Customer Accounts",
            "columns": [
                {
                    "source_name": "cust_id",
                    "data_type": "integer",
                    "business_label": "Customer Identifier",
                    "semantic_notes": "Primary key, auto-increment",
                    "quality_score": 1.0,
                    "nullable": false
                }
            ],
            "foreign_keys": [
                {
                    "column": "region_id",
                    "references": "regions.id"
                }
            ]
        }
    ],
    "quality": {
        "overall_score": 0.87,
        "completeness": 0.92,
        "consistency": 0.83,
        "referential_integrity": 0.91
    },
    "metrics": {
        "classified_tables": 82,
        "unclassified_tables": 3,
        "total_columns": 1200,
        "labeled_columns": 1150,
        "session_duration_minutes": 240
    }
}
```

### 6.1 Manifest Consumers

| Consumer | How It Uses the Manifest |
|----------|------------------------|
| **Ragnarok** | Loads as the migration plan foundation — table/column mappings, domain classification, quality scores |
| **Bifrost** | Loads as the foundational routing table — sync routes, field ownership, domain scoping |
| **Jormungandr** | Imports as the baseline canonical schema — establishes the governance canon |

---

## 7. Security

- **Air-gapped operation** — No internet required (telemetry is opt-in and optional)
- **No credential storage** — Database credentials entered at runtime
- **Operator authentication** — DevAdmin/TenantAdmin gate
- **Ed25519 key verification** — Engagement keys are cryptographically verified
- **Consent-gated telemetry** — No data leaves the machine without explicit opt-in

---

## 8. Build and Distribution

```bash
cd tools/ratatosk && mkdir -p build && cd build
cmake ..                                    # Without telemetry
cmake .. -DRATATOSK_ENABLE_TELEMETRY=ON     # With telemetry
make -j$(nproc)
./Ratatosk
```

Companion keygen tool:
```bash
cd tools/ratatosk-keygen && mkdir -p build && cd build
cmake ..
make -j$(nproc)
./RatatoskKeygen --consent consent.json --private-key ed25519.pem
```

---

## 9. Relationship to Jormungandr

Ratatosk produces manifests. Jormungandr consumes and enforces them:

```
Ratatosk discovers and proposes canon.
Jormungandr owns and enforces canon.
```

After a Ratatosk engagement, the manifest is imported into Jormungandr as the baseline canonical schema. Jormungandr then monitors for schema drift, validates new data structures against the canon, and produces governance compliance reports — converting a one-time engagement into an ongoing governance subscription.

---

*Copyright 2026 Mimir Labs. All rights reserved.*
