# Packet Summary and Usage Guide

A file-by-file index of the Synthetic Manufacturing Failure Packet, and how to use each piece across six situations.

## File index

**Root**
- `README.md` — executive overview and the full argument. The definitive statement of what the packet demonstrates and why.
- `summary.md` — this guide.

**/data — the synthetic evidence (16 CSVs)**
- `customers.csv` — customer master; contains a duplicate Northstar Defense Systems record.
- `customer_orders.csv` — orders with three competing date fields; `SO-10482` is the failure case.
- `order_line_items.csv` — lines; the zinc bolt appears under three part identifiers.
- `requested_ship_date_changes.csv` — controlled date changes; `RSDC-0007` is the invalid one.
- `customer_approval_emails.csv` — approval artifacts; `EMAIL-3391` authorizes nothing specific.
- `expected_ship_date_updates.csv` — off-workflow date changes; `ESDU-0031` is decisive.
- `suppliers.csv` — supplier master (canonical ACME = `SUP-2001`).
- `supplier_aliases.csv` — five ACME surface names; `Acme Industrial` maps to nothing.
- `parts.csv` — one physical bolt carried under four identifiers.
- `inventory_snapshot.csv` — `LOT-77Z` fractured across part and supplier identities.
- `receiving_log.csv` — `RCV-0091` receives against the unmapped alias.
- `quality_inspections.csv` — the same lot inspected under conflicting identities.
- `finance_margin_report.csv` — `FMR-10482` scores on-time against the unauthorized date.
- `api_update_log.csv` — off-path API changes; `API-5583` is an agent optimizing a metric.
- `bulk_import_log.csv` — imports that touch commitment fields with validation off.
- `audit_log.csv` — every event, all marked `not_evaluated` for validity.

**/analysis — the interpretation**
- `semantic_conflict_map.md` — all conflicts, cited to specific rows, in seven categories.
- `failure_chain.md` — the nine-step narrative of `SO-10482`, human misuse through enforcement.
- `ratatosk_findings.md` — a buyer-ready diagnostic report with pilot-fit assessment.

**/manifest — the enforcement model**
- `canonical_governance_manifest.json` — canonical entities and write-path invariants; the strict Requested Ship Date rule.
- `rejected_transaction_examples.json` — five transactions (one commits, four rejected with reasons).

**/presentation — the messaging**
- `one_page_memo.md` — the argument in buyer/investor language.
- `demo_script.md` — a 3-minute narrated walkthrough for a Loom recording.
- `linkedin_post.md` — thesis-forward public post.
- `hn_post.md` — technical argument framed for criticism.
- `mcc_partner_blurb.md` — Mark Cuban Companies partner-form version (under 2,000 characters).
- `README_for_nontechnical_reviewers.md` — plain-language explanation for advisors.

**/diagrams — the pictures (Mermaid)**
- `traditional_wrapper_failure.md` — controls in the app layer, bypass paths to a passive database.
- `governed_write_path.md` — one transaction boundary, invalid state refused before commit.
- `failure_chain_sequence.md` — the `SO-10482` manipulation as a sequence diagram.

## How to use it, by situation

**Investor outreach.** Lead with `presentation/one_page_memo.md`. It states the problem, the failure, and the two products in one read. Follow with `diagrams/traditional_wrapper_failure.md` and `governed_write_path.md` as the visual before/after. If the investor is nontechnical, substitute `presentation/README_for_nontechnical_reviewers.md`.

**Advisor education.** Send `presentation/README_for_nontechnical_reviewers.md` first (five plain statements), then `analysis/failure_chain.md` if they want to see the mechanism. The goal is to leave them able to explain "audit is not enforcement" in their own words.

**MCC partner submission.** Paste `presentation/mcc_partner_blurb.md` into the form. If a longer artifact is invited, attach `README.md` and `presentation/one_page_memo.md`.

**LinkedIn post.** Publish `presentation/linkedin_post.md` as written; it already carries the failure chain and 5–7 hashtags. Optionally attach one diagram image.

**Customer conversation.** Open with `analysis/failure_chain.md` against a screen share of `/data`, then show `manifest/rejected_transaction_examples.json` to demonstrate what enforcement changes. Close with the pilot scope in `analysis/ratatosk_findings.md` section 8. The message: we find your version of this in days, then prove the fix on a bounded domain.

**Synthetic demo walkthrough.** Record with `presentation/demo_script.md`. It is timed to three minutes and cues the exact files to open. Keep `/data`, `analysis/failure_chain.md`, and `manifest/rejected_transaction_examples.json` open in tabs before you start.

## The one line to remember

The system can tell that something happened. It cannot prove that the state now recorded is valid. Governed write-path enforcement closes that gap, and this packet shows it without a single row of real data.
