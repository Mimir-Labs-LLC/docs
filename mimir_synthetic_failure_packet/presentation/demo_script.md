# Demo Script — 3-Minute Walkthrough

For a screen-recorded Loom. Direct delivery, no theatrics. Times are guides. Screen cues in brackets.

---

**[0:00–0:30] Setup**

"This is a synthetic dataset for a fictional manufacturer, Keystone Motion Components. Forty-two million in revenue, defense-adjacent, running a legacy ERP with the usual spreadsheets around it: purchasing, receiving, quality, finance. No real customer data, no ERP license, nothing paid. The point is to show a failure that has nothing to do with any specific vendor. It is an architecture problem, and you can see the whole thing in one order."

**[0:30–1:15] The messy data**

"[Open `/data`.] Sixteen exports. Watch what happens to identity. [Open `supplier_aliases.csv`.] One supplier, ACME, shows up as five different names across systems. The one that matters, 'Acme Industrial,' maps to nothing, and it's the supplier on the receipt that fills our order. [Open `parts.csv`.] The same physical bolt is carried under four different part numbers depending on which system wrote the row. [Open `customer_orders.csv`.] And there are three different date fields that each get used somewhere as 'the delivery commitment.' Nothing here is labeled wrong. It's just that no field, no name, and no number has an agreed meaning."

**[1:15–2:00] The failure chain**

"Follow order SO-10482 for Northstar Defense Systems. [Open `failure_chain.md` alongside the CSVs.] Customer's authorized ship date is August 15th. A user wants it moved to the 29th. [Open `customer_approval_emails.csv`, row EMAIL-3391.] Here's the approval they attached. It says, quote, 'we have some flexibility on the August deliveries.' No order number, no field, no dates. It authorizes nothing specific, but the workflow saw a reference was attached and accepted it. Then the decisive move: [open `api_update_log.csv`, row API-5567] a service account changes a *different* field, Expected Ship Date, over the API. That never touches the approval screen. [Open `finance_margin_report.csv`, FMR-10482.] Finance scores the order against that changed date and reports it on time. It was thirteen days late against what the customer actually agreed to. [Open `audit_log.csv`.] Every step is logged. Every row says 'not evaluated.' The system recorded everything and verified nothing."

**[2:00–2:30] The manifest and rejections**

"[Open `/manifest/canonical_governance_manifest.json`.] Here's the enforcement model. A Requested Ship Date can't change unless the transaction carries an approval that matches the order, the field, and both values, and that rule applies to every write path, not just the screen. [Open `rejected_transaction_examples.json`.] Same transactions, evaluated at the write path. The valid change commits. The ambiguous approval is rejected. The off-path date substitution is rejected for missing provenance. The alias receipt is rejected. The AI agent trying to optimize the metric is rejected. Each one refused before it saves, with a reason."

**[2:30–3:00] Tie to the products**

"Two pieces. Ratatosk is the diagnostic. It reads exports like these and surfaces this failure class without touching a live system. Yggdrasil ERP is the substrate that enforces meaning and provenance at the point of commit, so invalid state never lands and the on-time claim never forms. The takeaway is simple. You cannot govern enterprise AI with wrappers and filters if the system underneath still accepts invalid business state. Governance has to live on the write path. That's what this packet demonstrates, and it's what Mimir Labs builds."
