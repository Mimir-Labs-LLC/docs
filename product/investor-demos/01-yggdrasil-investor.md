# Yggdrasil ERP — Investor Demo Script

**Target length:** 2-3 minutes
**Format:** Screen recording with voiceover
**Audience:** Pre-seed investors
**Focus:** Architecture as moat, not feature tour

---

## SCRIPT

### The Problem (30 sec)

[Show a slide or text overlay — no product yet]

The mid-market manufacturing ERP space is dominated by platforms built 15-20 years ago. Epicor, Sage, Infor — they all share the same architectural flaw: they let every customer customize the data model. After five years, no two installations look alike, nobody trusts the data, and migration away is a six-figure consulting engagement.

That customization is what creates the lock-in. And it's what creates our opportunity.

### The Architecture (60 sec)

[Open the desktop client. Show a record flowing through modules.]

Yggdrasil is a manufacturing ERP with one architectural decision that changes everything: zero custom fields.

Every tenant runs the same schema — 101 tables, same validation rules, same API contracts. When you look at a sales order here, it has exactly the same structure as a sales order in every other Yggdrasil tenant. That means the data is trustworthy by design, not by discipline.

[Show the state machine — a record advancing through states]

Every record flows through a governed state machine. The constraint engine evaluates rules before allowing transitions. This isn't workflow automation bolted on — it's structural. The system physically cannot enter an invalid state.

[Show the audit trail]

Full audit trail on every change. Not optional, not configurable — structural.

### The Moat (60 sec)

[Back to founder or slide]

The moat isn't features — competitors have more features. The moat is the constraint.

Yggdrasil ERP has zero custom fields. Every tenant runs the identical schema. That means a purchase order in Tenant A can become a sales order in Tenant B with zero translation — because the data structures are structurally identical. This is the B2B Event Hub: real-time, cross-tenant supply chain propagation with no EDI, no middleware, no mapping tables.

No other ERP architecture can do this. SAP customers have diverged schemas after five years of customization — connecting two SAP tenants requires MuleSoft and a consulting engagement. NetSuite allows custom fields and custom objects — the platform can't guarantee structural compatibility between tenants. Odoo allows Studio customizations. Even industry standards like OAGIS are interchange formats, not operational schemas — every ERP translates at the boundary, and that translation is where integrity dies.

The zero-customization constraint is the *prerequisite* for the network effect, not a side effect. And here's why no incumbent can copy it: every major ERP vendor has millions of customers with billions of custom fields. They cannot retroactively remove customization without destroying their installed base. They are architecturally locked out of building what we've built.

Now — "zero custom fields" sounds rigid. It isn't. Enterprise data evolves. The question is *how*.

When a data point proves valuable across the manufacturing ecosystem — a new compliance requirement, a supply chain metric, an industry-standard classification — it becomes a first-class field in the canonical schema. Every tenant gets it simultaneously. It's validated, indexed, API-accessible, and reportable from day one.

When a customer needs to track something specific to their operation — an internal classification, a pilot metric, an experimental workflow attribute — it lives in a one-way sidecar: observable, exportable, but structurally isolated from the canonical model. We call these research fields. They don't participate in cross-tenant propagation, they don't affect core validation, and they can't break anyone else's schema. If a research field proves its value across multiple customers, it graduates into the canon. If it doesn't, it stays contained.

The canon evolves. It just evolves through governance, not through individual customization.

### The Network Effect (30 sec)

[Show B2B Event Hub diagram]

Every manufacturer on the platform makes the platform more valuable to every other manufacturer. Your supplier is on Yggdrasil ERP — your purchase orders flow directly into their sales queue. Your customer is on Yggdrasil ERP — their orders flow directly into your production schedule. Each new tenant reduces manual data entry for everyone they trade with.

The switching cost compounds with every trading partner connection. This isn't contractual lock-in — it's operational dependency. Leaving means re-introducing EDI translation, batch reconciliation, and manual data entry for every trading relationship on the platform.

### The Numbers (20 sec)

[Slide: pricing and unit economics]

Implementation starts at $25,000. Annual subscriptions range from $35,000 to $250,000 depending on organizational size. All ten modules are included — no per-user licensing, no add-on fees. Blended LTV targets $150K+ per tenant at 74% gross margin by year five.

### Closing (10 sec)

Ten modules. One data model. Zero drift. That's Yggdrasil ERP.

---

## PRODUCTION NOTES

- **This is NOT a feature tour.** Investors don't care about individual modules. They care about defensibility and unit economics.
- **Show just enough UI** to prove the product is real and working — then move to the business case.
- **Key visual:** A state transition being validated by the constraint engine. This is the "aha" moment that shows the architecture isn't just marketing.
- **Closing frame:** Yggdrasil logo, pricing summary
