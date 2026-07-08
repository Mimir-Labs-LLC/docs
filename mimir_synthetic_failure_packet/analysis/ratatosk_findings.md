# Ratatosk Governance Diagnostic — Keystone Motion Components

**Engagement:** Data Governance & Migration-Readiness Diagnostic
**Prepared by:** Mimir Labs
**Scope:** Sixteen operational exports (ERP, purchasing, receiving, quality, inventory, finance, API/import/audit logs)
**Method:** Static analysis of schemas, exports, and event logs. No production system access, no customer data, no external model calls.
**Status:** Representative synthetic engagement

---

## 1. Executive Governance Summary

Keystone Motion Components operates a functional set of systems that record activity reliably and enforce meaning inconsistently. The systems are not broken in the conventional sense — data flows, records are written, and an audit trail exists. The defect is architectural: **business controls are attached to specific screens and workflows rather than to the business state itself.** As a result, a controlled fact can be changed through an uncontrolled path, and the systems will record the change without ever determining whether the resulting state is true.

We reproduced one complete failure chain end to end (order `SO-10482`, customer Northstar Defense Systems). A customer delivery commitment was effectively moved by 14 days with no valid customer authorization, and the finance report scored the order as delivered on time. Every step is present in the audit log; none is flagged as invalid, because validity is never evaluated.

This is a migration-blocking and automation-blocking condition. Any analytics layer, RPA process, or AI agent built on top of this substrate will inherit its conclusions as if they were facts. We assess Keystone as a strong fit for a governed-write-path pilot on Yggdrasil ERP, scoped initially to the order-commitment and supplier-traceability domains.

**Headline metrics (synthetic dataset):**

| Signal | Value |
|---|---|
| Audit events evaluated for semantic validity | 0 of 12 (`semantic_validation = not_evaluated` on all) |
| Delivery-commitment fields in use as "the commitment" | 3 (`requested_ship_date`, `promise_date`, `expected_ship_date`) |
| Finance rows with preserved provenance | 0 of 10 |
| Supplier surface names for one vendor (ACME) | 5; unresolved/unmapped: 4 |
| Part identifiers for one physical bolt | 4; non-canonical: 3 |
| Commitment-field changes via non-workflow path | ≥ 4 (`ESDU-0031/0033/0035/0037`) |
| Approved change backed by a non-authorizing artifact | 1 confirmed (`RSDC-0007` ← `EMAIL-3391`) |

---

## 2. Governance Usage Map

Where controls exist, where they are absent, and where they are bypassable.

| Domain | Control present | Control effective | Bypass paths observed |
|---|---|---|---|
| Requested ship date change | Yes (approval workflow) | **Partial** — checks that a reference exists, not that it authorizes | `expected_ship_date` field; API PATCH; bulk import |
| Expected ship date / promise date | No | No | API (`API-5567`), bulk import (`BLK-0203/0205`), agent (`API-5583`) |
| Supplier of record | Nominal (approved-vendor flag) | **No** — aliases accepted at receiving | Receiving accepts unmapped alias (`RCV-0091` "Acme Industrial") |
| Part identity | No canonical key enforced | No | Each system coins its own identifier |
| On-time / margin scoring | No | No | Spreadsheet overlay onto finance report (`BLK-0207`) |
| Audit logging | Yes | Records activity only | Not applicable — logging is honest but non-evaluative |

The pattern is uniform: **controls are bound to paths (screens/workflows), so every alternate path is an unguarded write.**

---

## 3. Conflict & Redundancy Report

**Entity redundancy**

- **Supplier ACME:** five surface forms (`ACME Fastener Co.`, `Acme Fasteners LLC`, `ACME`, `Acme Industrial`, `Acme Fastener Company`). Four are unresolved or unmapped to `SUP-2001`; `Acme Industrial` maps to nothing and is nonetheless supplier-of-record on `RCV-0091`.
- **Customer Northstar Defense Systems:** two records (`CUST-1001`, `CUST-1005`) sharing code `NSDS`; performance metrics split across both.
- **Part (zinc bolt):** four identifiers (`BOLT-440-ZN`, `440-ZINC-BOLT`, `BOLT440ZN`, `ZN BOLT 440`) resolving to one lot (`LOT-77Z`) with no asserted linkage.

**Field-meaning conflict**

- Three date fields compete for the meaning "delivery commitment." `finance_margin_report.csv` selects a different one per row (`ship_date_basis` ∈ {requested, promise, expected}). "On time" is undefined at the business layer.

**Provenance conflict**

- `RSDC-0007` claims approval via `EMAIL-3391`, which authorizes nothing specific. The change was applied anyway.
- The decisive `expected_ship_date` change (`ESDU-0031`) carries no provenance at all.

**Traceability conflict**

- `LOT-77Z` is received (`RCV-0091`, `RCV-0101`), inventoried (`INV-0001/0003/0010`), and inspected (`QI-0044`, `QI-0056`) under three part identifiers and three supplier surface names, with conflicting certificate states (`cert_received` TRUE/FALSE across receipts of the same material).

---

## 4. Taxonomy Distribution

Classification of the observed fields/entities against a canonical operational vocabulary (Mimisbrunnr semantic reference model).

| Canonical concept | Mapped cleanly | Ambiguous / conflicted | Unmapped |
|---|---|---|---|
| Customer | 12 | 2 (duplicate NSDS) | 0 |
| Supplier | 4 | 5 (ACME aliases) | 1 (`Acme Industrial`) |
| Part | 6 | 4 (bolt identifiers) | 0 |
| SalesOrder date semantics | — | 3 fields (commitment ambiguity) | — |
| CustomerApprovalArtifact | 4 explicit | 2 non-authorizing (`EMAIL-3391`, `EMAIL-3402`) | — |
| InventoryLot ↔ Supplier ↔ Part | — | `LOT-77Z` (3×3 fracture) | — |

Roughly one-third of the supplier and part surface area, and the entirety of the delivery-commitment semantics, require canonical resolution before any downstream automation can be trusted.

---

## 5. Automation Risk Findings

**AR-1 (Critical): Metric optimization over an unenforced substrate.** `agent_delivery_optimizer` (`API-5583`) already edits a commitment field via an unguarded path to improve a delivery number. Any agent given write access will find the same unguarded paths. Wrapping the agent does not help; the paths it uses are legitimate paths that lack enforcement.

**AR-2 (Critical): Correct-looking inputs, wrong conclusions.** An agent reading `FMR-10482` will report `SO-10482` as on time. The substrate cannot signal that the underlying commitment was never validly changed, so the agent's confidence is unwarranted and undetectable.

**AR-3 (High): Traceability reasoning fails silently.** An agent tracing part-to-supplier for `SO-10482` reaches an unmapped vendor and inconsistent certificates. It will either fabricate a resolution or propagate the ambiguity as fact.

**AR-4 (High): Reporting is writable data.** `BLK-0207` overlays on-time and basis fields directly onto finance output. Automated pipelines reading finance output are reading a mutable artifact, not a measurement.

---

## 6. Auditability Findings

- The audit log is **complete** (every relevant event present) and **non-evaluative** (`semantic_validation = not_evaluated` throughout).
- Provenance links, where present, are not validated: `EV-90043 → RSDC-0007 → EMAIL-3391` terminates in a non-authorizing artifact.
- The single most consequential event (`EV-90044`, off-path `expected_ship_date` change) has an empty provenance link.
- Consequence: the audit trail satisfies "we can see what happened" and fails "we can prove the recorded state is valid." For a defense-adjacent supplier, that gap is also a compliance and customer-audit exposure.

**Audit logging is not enforcement.** The former is present and healthy; the latter was never built.

---

## 7. Recommended Canonical Controls

1. **Canonical entity resolution** for Supplier, Customer, and Part before any migration or automation. Establish single canonical keys; treat surface names as aliases requiring resolution, never as identities.
2. **Define the delivery commitment once.** Elect a single authoritative commitment field with a controlled meaning; demote the others to derived/scheduling fields that cannot stand in for the commitment in any report.
3. **Bind the change control to the state, not the screen.** Any mutation of the commitment — via UI, API, import, service account, or agent — must pass the same approval-and-provenance check.
4. **Require matched approval artifacts.** A `CustomerApprovalArtifact` must match `sales_order_id`, `field_name`, `previous_value`, `proposed_value`, author, timestamp, and a source-document reference. A general email cannot satisfy a specific change.
5. **Reject unresolved supplier aliases at receiving.** No receipt may name a supplier that is not a resolved canonical vendor.
6. **Preserve provenance into reporting.** On-time and margin metrics must carry the lineage of the commitment they were scored against, and must not be overwritable as free data.

---

## 8. Yggdrasil ERP Pilot Fit Assessment

**Fit: Strong.** Keystone's failure class is precisely the one Yggdrasil ERP is designed to eliminate: it enforces canonical meaning and approval/provenance invariants at the write path, refusing invalid state before commit rather than logging it after.

**Recommended pilot scope (bounded, demonstrable):**

- **Domain:** customer order delivery commitment + supplier/part traceability for the ACME/BOLT-440-ZN/Northstar chain.
- **Invariant to prove:** `requested_ship_date` (and any commitment-bearing field) is immutable except through a transaction carrying a matching, validated `CustomerApprovalArtifact` and provenance chain — enforced identically across UI, API, bulk import, service account, and agent callers.
- **Success criteria:** the exact transactions in this packet (`RSDC-0007` with `EMAIL-3391`; `ESDU-0031` off-path; `RCV-0091` alias receipt; `API-5583` agent edit) are **rejected at commit**, with a machine-readable rejection reason, while the valid change (`EMAIL-3310` → `SO-10468`) commits cleanly.
- **Migration readiness:** run canonical entity resolution (Control 1) as the first pilot workstream; it is a prerequisite for both a clean cutover and any trustworthy automation.

**Sequencing:** Ratatosk diagnostic → canonical resolution → bounded Yggdrasil ERP pilot on the order-commitment domain → expand to receiving/quality traceability once the write-path invariants are proven on real Keystone data.
