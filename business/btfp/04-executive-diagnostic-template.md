# Executive Diagnostic — Customer-Ready Template

*The 2–3 page artifact a COO, CFO, VP Operations, controller, or CIO can act on. Fill from real diagnostic output. Every finding must connect to a business decision, not a technical metric. This is the leave-behind that replaces "internal diagnostic artifacts."*

*Format below; a worked mini-example follows to show the tone.*

---

## [Company Name] — Business Record Reliability Diagnostic

**Scope:** [systems reviewed — e.g., SAP S/4HANA + purchasing spreadsheet + QuickBooks + CRM] · **Date:** [ ] · **Prepared for:** [role]

### Executive summary *(3–4 sentences, plain language)*
> We reviewed [scope] to test whether your systems, reports, spreadsheets, and workflows tell the same story about the business. We found [N] areas where they don't, [K] of which carry real operating risk to [close / audit / production / delivery / a specific initiative]. The highest-priority issue is [one sentence]. We recommend proving the fix on one path first: [proof-cell candidate].

### Top findings *(3–5; ranked by business risk, not by technical severity)*

For each:

| Field | Content |
|---|---|
| **Finding** | *What disagrees, in one plain sentence.* |
| **What it means for the business** | *The consequence — for close, audit, migration, integration, production, delivery, or decision confidence.* |
| **Operating risk** | High / Medium / Low *(true operating risk, validated in workshop — not a raw signal count)* |
| **Likely owner** | *The role who should own the fix.* |
| **Recommended action** | *The next concrete step.* |

### Business-record reliability snapshot *(one simple visual)*
A traffic-light across the reviewed systems for the reviewed path(s): do they agree on **state**, **amount/quantity**, **ownership**, and **timing**? Green = they agree; amber = they disagree without material impact; red = they disagree in a way that costs money, time, or defensibility.

### Recommended proof cell
> The fastest way to turn this from a report into value is to prove one slice. We recommend **[path]** because [it carries real risk / it's legible / it's bounded]. Scope, timeline, and effort: see the proof-cell outline. Weeks, one path, no ERP replacement.

### What this is — and isn't
- **Is:** a reliability check on the reviewed scope, validated with your SMEs.
- **Isn't:** a full audit, a system replacement recommendation, or a claim that every signal is a problem. We separate real operating risk from normal system structure (see the interpretation note).

---

## Worked mini-example *(illustrates tone — replace with real findings)*

**Executive summary.** We reviewed your S/4HANA purchasing data alongside the approval spreadsheet Purchasing maintains and the spend report Finance uses at close. The three disagree on which purchase orders were approved, and by whom, for [X]% of POs above [threshold]. Two of these disagreements create audit exposure at quarter close. The highest-priority issue: approvals recorded in the spreadsheet have no corresponding evidence in the system of record, so the audit trail has to be rebuilt by hand every quarter. We recommend proving the fix on the PO-approval path first.

**Finding 1 — Approvals live outside the system.**
- *What it means:* At close, Finance reconstructs who approved what from a spreadsheet and email. That's [hours] per quarter and it's the exact evidence an auditor asks for and it doesn't come from the operating path.
- *Operating risk:* **High** (audit + close).
- *Likely owner:* Controller / Purchasing lead.
- *Action:* Make approval authority an enforced step on issuance in the proof cell.

**Interpretation note — not everything that differs is a problem.**
> Example: *Document Number* and *Document Type* fields appeared as "conflicts" in the raw signal set. On review, these are **normal ERP structure**, not a business-definition conflict — the same logical document is represented under standard SAP conventions. We flagged and cleared them in the workshop. This is why raw signals are reviewed with your SMEs before anything reaches this page: **the diagnostic surfaces candidates; humans confirm which are real.** A report that cried wolf on normal structure would be worse than no report.

---

*[Confirm before external use: fill from the messy multi-system run, not the clean SAP sample — the clean sample undersells the wedge. Keep to 2–3 pages; if it grows, move detail to an appendix.]*
