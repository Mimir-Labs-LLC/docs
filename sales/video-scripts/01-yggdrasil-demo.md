# Yggdrasil ERP — Product Demo Script

**Target length:** 4-5 minutes
**Format:** Screen recording with voiceover (Doc narrating)
**Capture from:** Qt desktop client (reference implementation)

---

## SCRIPT

### Opening (15 sec)

[Show Yggdrasil logo, then open the desktop client]

This is Yggdrasil ERP — a manufacturing platform with ten integrated modules, one shared data model, and zero custom fields. Let me show you what that looks like in practice.

### The Operational Flow (90 sec)

[Navigate: CRM → Sales → Manufacturing → Warehouse]

Everything in Yggdrasil flows through a governed state machine. A sales order doesn't just sit in a table — it advances through defined states. Draft, confirmed, released to production, shipped, invoiced. Each transition is validated by the constraint engine before it's allowed.

[Show a sales order. Click through to the linked work order.]

This sales order created a work order automatically. The work order pulled the BOM, generated the material requirements, and the MRP engine flagged what we need to purchase.

[Navigate to the work order. Show BOM, routing, OEE.]

The work order is on the shop floor now. We can see the operation routing, track time against each step, and the OEE dashboard shows equipment effectiveness in real-time.

[Navigate to Warehouse. Show inventory with lot tracking.]

When this order ships, inventory decrements, the pick list generates, and the transaction flows to the general ledger. One action, multiple system updates, all governed.

### The State Machine (45 sec)

[Show the state engine panel on a record]

This is the constraint engine. Before any record can advance to the next state, the system evaluates rules: are all required fields populated? Is the approval workflow complete? Are there dependent records that need to be in a specific state first?

If the constraints aren't met, the transition is blocked — not with an error message after the fact, but structurally. The system won't let you create a state that violates the rules.

[Show the audit trail on the same record]

Every state transition is logged. Who did it, when, and what changed. This isn't optional — it's structural. Your quality auditor sees the same audit trail your operations team does.

### No Custom Fields (30 sec)

[Show the data model — navigate to any record detail]

Notice what's not here: no custom fields tab, no "user-defined fields" section, no BAQ customization layer. Every field you see exists for every tenant. The same schema, the same validation, the same API contracts.

This is what makes the data trustworthy year after year. There's nothing to drift.

Now, that doesn't mean the data model is frozen. Enterprise data evolves — new compliance requirements, new industry metrics, new operational needs. When a data point proves valuable across the manufacturing ecosystem, it becomes a first-class canonical field. Every tenant gets it simultaneously, with validation, reporting, and API support built in.

If your operation needs to track something specific — a pilot metric, an internal classification — it lives in a research sidecar: visible to you, exportable, but structurally isolated from the canonical model. It can't break cross-tenant compatibility, and it can't degrade data trust. If it proves its value across multiple customers, it graduates into the canon. If it doesn't, it stays contained.

The model evolves through governance, not through individual customization. That's how you get both stability and adaptability.

### B2B Event Hub & Network Effects (60 sec)

[Show the B2B event hub or describe with a diagram]

Yggdrasil ERP includes a real-time B2B Event Hub. When a purchase order is created in one tenant, it becomes a sales order in the supplier's tenant — automatically, in real-time, with full traceability. No EDI translation. No batch file exchange. No middleware. Just structured event propagation across organizational boundaries.

This is only possible because of the zero-customization architecture. Every tenant runs the identical schema. That means a purchase order in your tenant has the exact same structure as a sales order in your supplier's tenant. There's nothing to translate.

Other ERPs can't do this. When two Epicor customers try to exchange data, they need EDI or a middleware platform to translate between their customized schemas. When two SAP installations connect, it's a consulting engagement. The customization that vendors sell as "flexibility" is exactly what makes seamless cross-tenant data flow impossible.

Here's why this matters to your operation: every trading partner on the platform eliminates manual data entry for that relationship. Your supplier on Yggdrasil ERP means your purchase orders flow directly into their production queue. Your customer on Yggdrasil ERP means their orders flow directly into your shipping schedule. The more manufacturers on the platform, the more valuable each connection becomes.

### Closing (15 sec)

[Return to dashboard or module overview]

Ten modules. One data model. Every action governed, every change auditable, every integration structured. That's Yggdrasil ERP.

Visit mimirlabs.net/yggdrasil to learn more, or schedule a conversation to discuss whether it's the right fit for your operation.

---

## PRODUCTION NOTES

- **Capture at 1920x1080**, dark theme
- **Mouse movements should be deliberate** — no hunting for buttons
- **Pre-load demo data** so records are populated and states are interesting
- **Key moments to linger on:** State transition being blocked by constraint, audit trail entries, BOM → work order → GL flow
- **Avoid:** Empty states, loading spinners, error dialogs
- **Closing frame:** Yggdrasil logo, mimirlabs.net/yggdrasil
