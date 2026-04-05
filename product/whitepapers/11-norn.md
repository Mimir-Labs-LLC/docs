---
title: "Norn — Contract Document Intelligence Architecture"
author: "Christopher Gaither"
date: "March 2026"
version: "1.0"
docnumber: "ML-WP-012"
classification: "Public"
logo: "mimir_labs_logo.png"
---

## Overview

Norn is the contract document intelligence layer of the Mimir Labs product suite. It transforms static PDF documents into articulable, fillable templates through a combination of optical character recognition, heuristic field detection, and human-in-the-loop field promotion.

Where the existing Mimir Labs tools operate on enterprise data structures — schemas, field definitions, and semantic models — Norn operates on the documents that govern the relationships between the organizations those data structures serve. Contracts, service agreements, statements of work, and compliance documents define the legal and commercial context within which enterprise data exists.

Norn addresses a problem that existing document management tools handle poorly: the gap between a static document and a reusable, governed template. Most organizations either start from scratch with every contract or maintain templates in word processors that drift from version to version with no structural control. Norn treats document structure as a first-class concern, just as Ratatosk treats data structure.

---

## Architectural Role

Norn extends the Mimir Labs platform lifecycle into the contractual domain:

- **Ratatosk:** discover and define meaning in enterprise data
- **Ragnarok:** migrate data into aligned structures
- **Bifrost:** maintain alignment across systems
- **Jormungandr:** enforce canonical governance
- **Norn:** govern the documents that define business relationships

The relationship between Norn and the data platform is bidirectional. Contract data flows into the enterprise through manifest export, and enterprise data can inform contract generation through template field pre-population.

---

## Design Principles

Norn is governed by four architectural constraints.

**Document-First Workflow.** The system starts with the document the customer already has — a scanned contract, a PDF from an attorney, a legacy agreement. It does not require the user to start from a blank template or adopt a proprietary format.

**OCR Abstraction.** All optical character recognition is performed behind an abstract interface. The v0.1 implementation uses Tesseract (free, local). Premium tiers use Google Document AI. The interface supports any future OCR provider without architectural changes.

**Human-in-the-Loop Field Promotion.** Automated field detection identifies candidate regions. Human operators review, accept, reject, or manually promote any document region to a field. The system suggests; the human decides.

**Compliance by Design.** Signed documents are immutable. All access is logged. Integrity is verified via cryptographic hash. Retention periods are enforced. These properties are not optional features — they are structural guarantees.

---

## Document Processing Pipeline

### PDF Ingestion

Norn accepts PDF documents as its primary input format. The ingestion pipeline:

Norn accepts multiple input formats:

| Format | Method | Text Extraction |
|--------|--------|----------------|
| PDF | QPdfDocument + Tesseract OCR | Rendered at 300 DPI, OCR via Tesseract CLI |
| DOCX | PowerShell Expand-Archive + XML parsing | Direct extraction from word/document.xml |
| ODT | PowerShell Expand-Archive + XML parsing | Direct extraction from content.xml |
| TXT, MD | Direct file read | Native text, split on page breaks or line count |

For PDF ingestion:
1. Loads the PDF via Qt's QPdfDocument
2. Computes a SHA-256 hash of the source document (integrity baseline)
3. Extracts text from every page immediately (native extraction first, Tesseract OCR fallback)
4. If a `.norn.json` template file exists alongside the document, auto-loads it

For text-based formats, text is extracted directly without OCR and displayed in the dual-pane editor immediately.

### OCR Processing

Each page of the ingested PDF is rendered to a high-resolution image (300 DPI) and processed through the active OCR engine. The OCR output includes:

- Text blocks with bounding boxes
- Individual lines and words with position data
- Per-word confidence scores

The OCR layer is abstracted behind the `IOcrEngine` interface:

| Method | Purpose |
|--------|---------|
| `initialize(dataPath, language)` | Load OCR model data |
| `recognize(image)` | Full-page OCR with structured output |
| `recognizeRegion(image, rect)` | Region-specific OCR for promoted selections |
| `engineName()` | Display identifier |

Swapping OCR engines requires changing a single instantiation line. No other code changes are needed.

### Heuristic Field Detection

The `FieldDetector` analyzes OCR output to identify candidate fields using pattern matching:

| Pattern | Detection Rule | Field Type | Confidence |
|---------|---------------|------------|------------|
| Blank lines | `___________` (3+ underscores) | Text | 0.70 |
| Date patterns | `Date:`, `MM/DD/YYYY`, `Effective Date:` | Date | 0.80 |
| Signature patterns | `Signature:`, `Authorized Representative:` | Signature | 0.85 |
| Checkbox patterns | `[ ]`, `[X]` | Checkbox | 0.75 |
| Label:Value patterns | `Company: ___`, `Name: ___` | Text | 0.60 |

All detections are suggestions. None are committed to the template without operator review.

### Field Promotion

Users can manually promote any selected region of the document to a field:

1. Shift+drag to select a region on the document
2. OCR runs on the selected region to extract label text
3. A field is created with the extracted text as its default label
4. If OCR has been run on the full document, the system searches all other pages for similar patterns and suggests additional fields

This "promote one, suggest many" workflow is Norn's key differentiator. Existing tools require either manual creation of every field or acceptance of automated detection with no middle ground.

---

## Template Format

Templates are stored as `.norn.json` files — JSON documents containing:

- **Metadata:** name, version, author, creation/update timestamps
- **Source binding:** PDF path and SHA-256 hash (integrity verification)
- **Field definitions:** each field includes:
  - Unique identifier (UUID)
  - Human-readable label
  - Field type (text, date, signature, initials, checkbox, radio, dropdown, currency, number, formula)
  - Page number and bounding rectangle (PDF points)
  - Optional: placeholder, default value, validation regex, group ID, options list
  - Required flag

Templates are portable. They can be shared, versioned, and archived independently of the source PDF, provided the PDF hash matches.

---

## Field Types

| Type | Widget | Use Case |
|------|--------|----------|
| Text | Free-form input | Names, addresses, company names, custom clauses |
| Date | Date picker (ISO 8601) | Effective dates, expiration dates, signatures |
| Signature | Capture region | Wet signature or typed name |
| Initials | Capture region | Page-level acknowledgment |
| Checkbox | Boolean toggle | Opt-in/opt-out, service selections |
| Radio | Grouped one-of-N | Mutually exclusive choices (tier selection, etc.) |
| Dropdown | Combo selection | Predefined option lists (jurisdiction, payment terms) |
| Currency | Numeric with symbol | Line item prices, totals, fees ($, EUR, etc.) |
| Number | Plain numeric | Quantities, percentages, counts |
| Formula | Computed (read-only) | Line totals, subtotals, tax, grand total |

---

## Formula Engine

Formula fields are computed from other field values using a built-in expression evaluator. Formulas are defined during template authoring and evaluated automatically during document filling. Formula fields are read-only in fill mode.

### Syntax

Field references use curly braces with the field's label:

```
{Quantity} * {Unit Price}
{Subtotal} + {Tax}
ROUND({Subtotal} * 0.07, 2)
SUM({Line 1 Total}, {Line 2 Total}, {Line 3 Total})
```

### Supported Operations

| Category | Syntax | Example |
|----------|--------|---------|
| Arithmetic | `+ - * /` | `{Qty} * {Price}` |
| Parentheses | `( )` | `({Subtotal} + {Tax}) * 1.0` |
| SUM | `SUM(a, b, c)` | `SUM({Line 1}, {Line 2}, {Line 3})` |
| MIN / MAX | `MIN(a, b)` | `MIN({Bid 1}, {Bid 2})` |
| ROUND | `ROUND(expr, places)` | `ROUND({Subtotal} * 0.07, 2)` |
| Literals | Numbers | `{Subtotal} * 0.07` |

### Evaluation

Formulas are evaluated after all manual fields are filled, in dependency order. A formula that references another formula field triggers multi-pass evaluation (up to 3 passes) to resolve chains like:

```
Line Total = {Quantity} * {Unit Price}
Subtotal   = SUM({Line 1 Total}, {Line 2 Total})
Tax        = ROUND({Subtotal} * 0.07, 2)
Grand Total = {Subtotal} + {Tax}
```

Currency fields are automatically formatted with the configured currency symbol and thousands separators.

---

## Licensing and Feature Gating

Norn uses a tiered licensing model that controls feature access and usage volume.

| Tier | Contracts/Month | OCR Engine | Templates | Additional |
|------|----------------|------------|-----------|------------|
| Free | 5 | Tesseract (local) | 3 | PDF export |
| Pro | 50 | Google Doc AI (user key) | Unlimited | 3 team seats |
| Business | 250 | Google Doc AI | Unlimited | API access, custom branding, priority support |
| Enterprise | Unlimited | Google Doc AI | Unlimited | SSO, SLAs, white-glove onboarding, Ratatosk integration |

License state is persisted locally and checked on each contract creation. Usage counters reset monthly.

---

## Lite CRM

Norn includes a lightweight contact and contract record management system:

**Contacts** are auto-populated from filled template fields. When a user fills in "Client Name," "Signer Email," and "Company," the CRM creates or updates a contact record automatically.

**Contract Records** track the lifecycle of each generated document:
- Draft (created, not yet sent)
- Sent (transmitted for signature)
- Viewed (recipient opened)
- Signed (signatures collected)
- Expired (signature deadline passed)
- Archived (moved to long-term storage)

The CRM is JSON-backed (no database required) and persists in a single file alongside the archive.

---

## Document Archive

All documents — signed contracts, unsigned drafts, and templates — are stored in a governed archive.

### Compliance Controls

**Immutability.** Signed contracts cannot be modified after archival. The file hash is computed at archive time and verified on every retrieval.

**Access Logging.** Every access — view, download, export, delete request — is logged with timestamp, user identifier, and action type. The access log is append-only.

**Retention Enforcement.** Signed contracts carry a configurable retention period (default: 7 years). Deletion requests are denied until the retention period expires. Denied requests are logged.

**Integrity Verification.** On-demand or batch SHA-256 hash verification detects any file corruption or unauthorized modification.

### Storage Backends

| Backend | Status | Use Case |
|---------|--------|----------|
| Local filesystem | Active | Single-user, Free/Pro tiers |
| Remote VPS | Ready (inactive) | Team access, Business/Enterprise tiers |

The remote backend is architecturally complete but not activated. Activation requires provisioning a storage volume on the VPS and enabling the `StorageBackend::Remote` configuration.

---

## Platform Integration

### Ratatosk Manifest Export

Norn can export filled contract data as a Ratatosk-compatible manifest. This bridges the gap between contractual data and enterprise data:

1. Contact fields map to `crm_entities` / `crm_contacts` (CRM taxonomy)
2. Contract metadata maps to a `norn_contracts` table (Sales taxonomy)
3. All filled field values become additional columns with Mimisbrunnr-aligned naming

The manifest follows the standard Ratatosk format and can be loaded directly for governance review. From there, Ragnarok can migrate the data into Yggdrasil ERP, or Jormungandr can validate it against the canonical model.

### Enterprise Direct Ingestion

Enterprise tier enables direct Yggdrasil API ingestion, bypassing the Ratatosk review step for trusted, recurring contract workflows (e.g., auto-provisioning a customer record when an MSA is signed).

---

## Security Model

Norn is designed for environments where document confidentiality is critical.

- OCR processing is local by default (Tesseract). No document content leaves the machine.
- Google Document AI processing (Pro+) sends page images to Google's API. Users supply their own API key and accept Google's data processing terms.
- No document content is transmitted to Mimir Labs infrastructure at any tier.
- Connection credentials for the remote archive are encrypted and stored locally.
- The archive access log provides a complete audit trail for compliance review.

---

## Technology Stack

| Component | Technology | Rationale |
|-----------|-----------|-----------|
| Language | C++17 | Performance, stability, consistency with Mimir Labs tools |
| UI Framework | Qt 6 Widgets | Cross-platform, native-feeling, PDF rendering built-in |
| PDF Rendering | Qt Pdf / PdfWidgets | No external dependency, high-quality rendering |
| OCR (Free) | Tesseract 5.x | Free, local, adequate for printed text |
| OCR (Premium) | Google Document AI | Superior accuracy, form detection, handwriting |
| HTTP Client | Qt Network | Built-in, handles API calls for Google Doc AI and remote archive |
| Persistence | JSON files | No database dependency, portable, human-readable |
| Integrity | SHA-256 (Qt Cryptographic) | Industry-standard document fingerprinting |

---

## Platform Significance

Norn addresses the document layer that the rest of the Mimir Labs platform does not cover.

Enterprise data has structure, governance, and enforcement. Enterprise documents — the contracts, agreements, and compliance artifacts that define the legal framework around that data — typically have none of these properties. They are static files passed between parties with no structural awareness, no version control, and no governed lifecycle.

Norn makes documents structurally aware. It identifies the points where human input is required, preserves those points as reusable templates, and governs the resulting documents through their lifecycle. When combined with the broader Mimir Labs platform, it creates a closed loop: contracts define relationships, data flows through those relationships, governance ensures alignment, and the archive preserves the record.

---

*Copyright 2024-2026 Mimir Labs LLC. All rights reserved.*
