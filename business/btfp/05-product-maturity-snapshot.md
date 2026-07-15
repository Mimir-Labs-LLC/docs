# Product Maturity Snapshot

> **⚠ FIRST-PASS DRAFT — GROUND-TRUTH BEFORE ANY EXTERNAL USE.**
> This is a starting categorization, not a verified statement. Much of the codebase has not been build-verified recently, so several rows below are deliberately conservative. **Under-claim, then correct upward with evidence.** A maturity snapshot that over-states is the single fastest way to lose an advisor's or a buyer's trust — and BFTP asked for this precisely to keep the story honest. Every row marked *[confirm]* needs your validation.

*Categories:* **Production-ready** (a customer could rely on it today) · **Demonstrable** (shows real behavior in a controlled demo) · **Facilitated** (works as part of a Mimir-Labs-run engagement/workshop, not self-serve) · **Roadmap** (designed/partial, not demoable) · **Dependency** (what it needs to move up a category).

---

| Product (buyer term) | Honest category *(first pass — confirm)* | What that means in a conversation | Key dependency to advance |
|---|---|---|---|
| **Ratatosk** — reliability diagnostic | **Demonstrable + Facilitated** *[confirm]* | Generates real diagnostic artifacts (ran on an SAP sample); the human-review/workshop step is Mimir-facilitated, not self-serve. | A **messy multi-system run** (SAP + Excel + QuickBooks + CRM) — the proof that matters — is *to-produce*. |
| **Mimisbrunnr** — agreed business dictionary | **Facilitated** *[confirm]* | A reference model + definitions captured during a workshop; value is realized in-engagement, not as a product a buyer configures alone. | Reusable, customer-legible output of "the agreed definitions for path X." |
| **Ragnarok** — controlled migration | **Demonstrable (prototype)** *[confirm]* | A working migration tool with real engines; **not** proven on a live customer migration. | A referenceable migration on real (or realistic) customer data. |
| **Bifrost** — governed sync | **Roadmap → Demonstrable** *[confirm]* | Integration engine with playbooks; treat as prototype/roadmap in buyer conversations until a live sync is shown. | One demonstrable end-to-end governed sync. |
| **Jormungandr** — governance & drift enforcement | **Demonstrable (prototype)** *[confirm — unverified]* | Developed as a standalone product; not build-verified recently. Show as prototype, not production. | Build verification + one governed-external-schema demo. |
| **Yggdrasil** — governance-native ERP | **Demonstrable (large surface, unverified)** *[confirm]* | Broad platform; much of it is not build-verified. This is the *long-term destination*, not the first market test — do not lead with it. | Build verification of the surfaces you'd actually demo; the proof cell is the credible first slice. |
| **ROPE** — runtime policy enforcement | **Demonstrable (prototype)** *[confirm]* | The governed-state-change / policy-before-write behavior is the heart of the proof cell; core is built, much added recently is unverified by build. | Scope the demo to the one path that's been exercised; verify the build behind it before showing it live. |

## How to use this in the room

- **Lead with Ratatosk (demonstrable)** and the **proof cell (a proposal).** Those are the safest, truest claims.
- **Yggdrasil is the destination story**, explicitly framed as long-term — never the first proof.
- **When you show a governed workflow (ROPE)**, scope it to what's actually been run, and say so.
- **Volunteer the category.** "This part is demonstrable; this part we facilitate; this part is roadmap." Saying it first is what makes the demonstrable parts believable.

## The honest through-line

Mimir Labs' *most defensible* current claim is: **"We can diagnose business-record reliability on a messy environment and prove one governed operational slice, in weeks, without an ERP replacement."** Everything in this package is built to make exactly that claim true and demonstrable. The platform ceiling is real, but the near-term proof lives in the diagnostic and the proof cell — which is precisely BFTP's recommendation.

---

*Action to close the biggest gap in this snapshot: a build-verification pass on the surfaces you intend to demo (ROPE governed workflow; the diagnostic pipeline), and the messy multi-system Ratatosk run. Those two moves convert most of the "[confirm]" rows into evidence.*
