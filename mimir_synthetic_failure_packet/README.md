# Synthetic Manufacturing Failure Packet

**Mimir Labs**

A self-contained demonstration of a single architectural claim, built entirely from synthetic data:

> Enterprise AI and autonomous agents cannot be reliably governed by wrappers, prompt filters, API harnesses, workflow screens, or application-layer guardrails if the underlying operational substrate still accepts semantically invalid business state. The correct architectural answer is governed write-path enforcement: business policy, provenance, semantic meaning, and audit invariants must be enforced at the point where state is committed.

## What this packet demonstrates

It follows one order through a fictional manufacturer's systems and shows a delivery that reports as on time while being 13 days late against the commitment the customer actually authorized. The failure is not a data-entry mistake or a broken integration. It is what happens when the controls that govern a business fact are attached to a specific workflow rather than to the state itself, so the fact can be changed through a path the control never watches. The systems record the change and never determine whether the resulting state is true.

The packet contains the raw synthetic data, an analysis of the conflicts, a machine-readable statement of the invariants that would prevent the failure, a set of example transactions showing exactly what commits and what is refused, and presentation material for investors, advisors, partners, and buyers.

## Why this is not a benchmark against any incumbent

This packet names no vendor and benchmarks nothing. It does not claim that SAP, Epicor, NetSuite, Odoo, or any specific system contains an exploitable defect, and it should not be read that way. The failure shown here is a **failure class**, not a product bug. It arises whenever enforcement lives in the application layer and the store beneath is passive, which is the default posture of most enterprise data architectures regardless of the badge on the front. Comparing on-time percentages or feature lists would miss the point. The point is architectural: where does enforcement live, and can every write path route around it.

## Why synthetic data is sufficient

The claim is about architecture, and architecture can be demonstrated with a correct, internally consistent example. Real customer data would add nothing to the argument and would carry confidentiality, provenance, and consent burdens that obscure it. The synthetic dataset is engineered so that one clean failure chain (order `SO-10482`, customer Northstar Defense Systems, part `BOLT-440-ZN`, supplier ACME) threads through sixteen exports and is verifiable row by row. Anyone skeptical can open the files and confirm each step. Synthetic data also lets us hold everything else constant and isolate the one variable that matters: whether invalid state can be committed. That is the honest way to demonstrate a failure class without implying a vendor-specific vulnerability.

## Workflow governance vs. write-path governance

**Workflow governance** places a control on a path. In this dataset, changing a customer's Requested Ship Date requires an approval step, and that step exists and runs. But it guards one screen. The same commitment is moved through a bulk import with validation disabled, a service-account API call, a substitute date field, and an ambiguous email accepted as consent. Each is a legitimate path that lacks the control. A control on one path is not a boundary.

**Write-path governance** places the control on the state. The rule "a delivery commitment cannot change without a matching, provenanced approval" is checked at the moment of commit and applies identically to the UI, the API, a bulk import, a service account, and an autonomous agent. There is no path that reaches the system of record without passing it. That is the difference between a workflow and a boundary.

## Audit logging vs. enforcement

An audit log is a record of what happened. Enforcement is the authority to decide what is allowed to happen. In this packet the audit log is complete and honest: every step of the failure is captured. Every step is also marked `semantic_validation = not_evaluated`, because logging observes activity and never judges validity. A complete audit trail can coexist with a completely unenforced substrate. The two properties are independent, and only one of them was ever built into these systems. Governed write-path enforcement makes the audit event a record of a *validated* change, because the event can exist only if a valid transaction produced it.

## How Ratatosk diagnoses the failure

Ratatosk is the diagnostic entry point. Given only the exports, with no production access and no customer data, it surfaces the failure class: the guarded date change backed by a non-authorizing artifact, the off-path change with no provenance, the report scoring an unauthorized date, one supplier fractured across five names with the fulfilling receipt booked to an unmapped alias, one physical part carried under four identifiers, and an audit log that proves activity while proving nothing about validity. Its output (`/analysis/ratatosk_findings.md`) is structured as a buyer deliverable: governance usage map, conflict and redundancy report, taxonomy distribution, automation risk findings, auditability findings, recommended canonical controls, and a Yggdrasil ERP pilot-fit assessment.

## How Yggdrasil ERP prevents the failure

Yggdrasil ERP is the governance-native operational substrate. It enforces canonical meaning and approval and provenance invariants at the write path. The commitment field cannot change unless the committing transaction carries an approval artifact matching the order, the field, and both values, and that rule binds to the state rather than the screen. The invalid transactions in this packet (`/manifest/rejected_transaction_examples.json`) are refused before they persist, each with a machine-readable reason, while the one valid change commits cleanly. Because the invalid state never lands, the false on-time record never forms, and no downstream report or agent can inherit a conclusion that was never true.

## Contents

```
mimir_synthetic_failure_packet/
├── README.md                     This file
├── summary.md                    File-by-file index + how to use each artifact
├── data/                         16 synthetic CSV exports
├── analysis/                     Semantic conflict map, failure chain, Ratatosk findings
├── manifest/                     Canonical governance manifest + rejected transaction examples
├── presentation/                 Memo, demo script, LinkedIn, HN, MCC blurb, nontechnical README
└── diagrams/                     Mermaid: wrapper failure, governed write path, failure sequence
```

Start with `/presentation/one_page_memo.md` for the argument, `/analysis/failure_chain.md` for the proof, and `summary.md` for a guide to everything else.

## Constraints honored

No real customer data. No benchmark claims against any named ERP. No paid APIs or external model calls. No implication that any incumbent has a specific exploitable vulnerability. The packet demonstrates an architectural failure class, kept realistic and internally consistent, in American English.
