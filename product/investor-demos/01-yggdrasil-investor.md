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

### The Moat (30 sec)

[Back to founder or slide]

The moat isn't features — competitors have more features. The moat is the data model. Once a manufacturer runs on Yggdrasil for a year, their data is clean, their reports are trustworthy, and their audit trail is complete. Going back to a system that allows custom fields would mean reintroducing the entropy they just eliminated.

The switching cost isn't contractual. It's architectural.

### The Numbers (20 sec)

[Slide: pricing and unit economics]

Implementation starts at $25,000. Annual subscriptions range from $35,000 to $250,000 depending on organizational size. All ten modules are included — no per-user licensing, no add-on fees. Blended LTV targets $150K+ per tenant at 74% gross margin by year five.

### Closing (10 sec)

Ten modules. One data model. Zero drift. That's Yggdrasil.

---

## PRODUCTION NOTES

- **This is NOT a feature tour.** Investors don't care about individual modules. They care about defensibility and unit economics.
- **Show just enough UI** to prove the product is real and working — then move to the business case.
- **Key visual:** A state transition being validated by the constraint engine. This is the "aha" moment that shows the architecture isn't just marketing.
- **Closing frame:** Yggdrasil logo, pricing summary
