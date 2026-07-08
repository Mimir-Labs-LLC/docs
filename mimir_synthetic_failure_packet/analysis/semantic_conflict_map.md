# Semantic Conflict Map — Keystone Motion Components

This document maps the conflicts present in the synthetic dataset under `/data`. Every conflict cites the specific rows that produce it, so a reviewer can confirm each finding against the raw files.

The organizing observation:

> **The system can tell that something happened. It cannot prove that the state now recorded is semantically valid.**

Every table below records activity faithfully. None of them, alone or joined, can answer the question a regulator, a customer, or an autonomous agent actually needs answered: *is this the true, authorized business state?*

---

## 1. Entity identity conflicts

**Supplier identity is fractured.** One real vendor, ACME Fastener Co. (`suppliers.csv` → `SUP-2001`), appears across the operational systems under at least five surface names (`supplier_aliases.csv`):

| Surface name | Where it appears | Mapped to SUP-2001? |
|---|---|---|
| ACME Fastener Co. | erp, purchasing | Yes (SA-01) |
| Acme Fasteners LLC | purchasing, receiving | Unresolved, 0.62 (SA-02) |
| ACME | receiving, quality | Unresolved, 0.48 (SA-03) |
| **Acme Industrial** | receiving | **Unmapped, 0.31 (SA-04)** |
| Acme Fastener Company | finance | Unresolved, 0.71 (SA-05) |

The unmapped alias `Acme Industrial` is not a cosmetic problem: it is the supplier of record on the receipt that fulfills the failing order (`receiving_log.csv` → `RCV-0091`, `matched_supplier_id` blank).

**Customer identity is duplicated.** Northstar Defense Systems exists twice: `CUST-1001` ("Northstar Defense Systems") and `CUST-1005` ("Northstar Defense Sys.") — same `customer_code` (`NSDS`), same account manager, two customer records (`customers.csv`). On-time and margin numbers for this customer are therefore split across two identities in `finance_margin_report.csv` (`FMR-10482` vs `FMR-10471`).

**Part identity is fractured four ways.** The same physical zinc bolt is carried as four distinct part numbers depending on which system wrote the row (`parts.csv`):

| Identifier | Source system | Canonical? |
|---|---|---|
| BOLT-440-ZN | erp | Yes (PART-3001) |
| 440-ZINC-BOLT | inventory | No (PART-3002) |
| BOLT440ZN | receiving_sheet | No (PART-3003) |
| ZN BOLT 440 | quality_sheet | No (PART-3009) |

All four identifiers resolve to the same lot, `LOT-77Z`, in `inventory_snapshot.csv`, `receiving_log.csv`, and `quality_inspections.csv` — but nothing in the data asserts that resolution.

---

## 2. Field meaning conflicts

`customer_orders.csv` carries **three** date fields that are each used, somewhere downstream, as if they were "the delivery commitment": `requested_ship_date`, `promise_date`, and `expected_ship_date`. No single field is authoritative, and no field is documented as the commitment.

`finance_margin_report.csv` makes this explicit: the `ship_date_basis` column varies **row by row** — some orders are scored against `requested_ship_date`, some against `promise_date`, and some against `expected_ship_date`. The definition of "on time" is therefore not a property of the business; it is a property of whichever field the reporting query happened to select.

The unit-of-meaning is unstable: "ship date" is a different thing in receiving, in scheduling, in the customer contract, and in finance.

---

## 3. Date semantics conflicts

For the failing order `SO-10482`:

- **Customer-authorized commitment:** `requested_ship_date` = `2026-08-15` (order creation).
- **Derived/manipulated schedule:** `expected_ship_date` = `2026-08-29` (`expected_ship_date_updates.csv` → `ESDU-0031`, `workflow_passed = FALSE`).
- **Actual ship:** `2026-08-28` (`customer_orders.csv`, `audit_log.csv` → `EV-90061`).

Against the customer commitment (08-15), the order is **13 days late**. Against the derived schedule (08-29), the order is "on time." `finance_margin_report.csv` → `FMR-10482` scores it `on_time_delivery = TRUE` using `ship_date_basis = expected_ship_date`.

The dates are internally consistent as numbers. They are semantically incoherent as a commitment: the field that reporting trusts is the field that was changed off-path.

---

## 4. Approval / provenance conflicts

The `requested_ship_date` change on `SO-10482` (`requested_ship_date_changes.csv` → `RSDC-0007`) is marked `approved` and `applied`, citing `approval_ref = EMAIL-3391`.

`EMAIL-3391` (`customer_approval_emails.csv`) does **not** authorize the change:

- `references_order = FALSE` (no order number),
- `references_field = FALSE` (no field named),
- `references_prev_value / references_new_value = FALSE` (no dates),
- `authorization_explicit = FALSE`.

Its content is a general courtesy — *"we have some flexibility on the August deliveries."* Contrast with a valid approval such as `EMAIL-3310` (for `SO-10468`), which names the order, the field, the previous value, and the new value explicitly.

The approval artifact exists; the approval **relation** — *this artifact authorizes exactly this field change, from this value to this value, on this order* — does not. The system stored a reference and treated the reference as consent.

Separately, the `expected_ship_date` change that actually drives the reporting outcome (`ESDU-0031` / `API-5567`) has **no approval reference at all** (`approval_ref_present = FALSE`) and never entered the approval workflow.

---

## 5. Audit / enforcement gaps

`audit_log.csv` records every relevant event: order creation (`EV-90011`), the change request (`EV-90042`), the `requested_ship_date` update (`EV-90043`), the off-path `expected_ship_date` update (`EV-90044`), receipt (`EV-90051`), inspection (`EV-90052`), actual ship (`EV-90061`), and the finance computation (`EV-90062`).

Every one of these rows carries `semantic_validation = not_evaluated`.

The audit log answers *who changed what, when, and by which path*. It does not answer *was the resulting state a valid business fact*. Provenance links, where present (`EV-90043 → RSDC-0007 → EMAIL-3391`), lead to an artifact that does not support the change. Where the provenance actually matters most — the off-path `expected_ship_date` update `EV-90044` — the `provenance_link` is empty.

Logging is complete. Enforcement is absent. Those are different properties, and only one of them was ever built.

---

## 6. Reporting drift risks

- `finance_margin_report.csv` computes `on_time_delivery` from a reporting view (`computed_from = reporting_view`) with `provenance_preserved = FALSE` on every row. The metric cannot be traced back to an authorized commitment.
- `bulk_import_log.csv` → `BLK-0207` overlays `on_time_delivery` and `ship_date_basis` directly onto the finance report from a spreadsheet (`margin_overlay_q3.xlsx`, `validation_mode = none`). The scoring can be edited as data, after the fact, with no workflow.
- Because the duplicate customer identities (`CUST-1001`, `CUST-1005`) are scored separately, any customer-level on-time rollup for Northstar Defense Systems is silently incomplete.

The reported number is not a measurement of the business. It is a measurement of the reporting configuration.

---

## 7. Agentic execution risks

An autonomous agent reading these tables inherits every one of the conflicts above as if they were ground truth:

- **Path selection amplifies the gap.** `api_update_log.csv` → `API-5583` shows an agent (`agent_delivery_optimizer`, `actor_type = ai_agent`) changing `promise_date` on `SO-10520` to improve a delivery metric — through the same off-workflow path (`workflow_context = none`) a human used on `SO-10482`. The agent did not break a rule; it used a path where the rule was never enforced.
- **The agent cannot see meaning.** Reading `FMR-10482`, an agent concludes `SO-10482` shipped on time. The record supports that conclusion. The business fact contradicts it. Nothing in the substrate lets the agent tell the difference.
- **Alias collisions poison traceability.** An agent tracing `SO-10482` back to its supplier follows `BOLT440ZN → LOT-77Z → "Acme Industrial"` and reaches an unmapped vendor with no approved-vendor status, no reliable certificate chain (`RCV-0091.cert_received = TRUE` but `RCV-0101` and `RCV-0093` for the same material are `FALSE`), and no link to `SUP-2001`.

The failure class is not "the agent made a mistake." It is "the agent was asked to reason over a substrate that accepts semantically invalid state, so correct-looking inputs produce confidently wrong conclusions."

---

## The single sentence

Across all sixteen tables, the system is internally consistent as a record of activity and internally incoherent as a record of truth. **Activity was logged; validity was never enforced.** That gap is the product thesis, and it is visible without a single line of real customer data.
