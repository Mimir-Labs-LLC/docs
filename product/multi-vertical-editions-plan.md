# Yggdrasil ERP — Multi-Vertical Editions Plan

*How Yggdrasil ERP becomes one config-driven application that serves many verticals — Manufacturing, Government (broad public sector), Healthcare administration, Insurance, Distribution, Field/Professional Service, Hospitality, and beyond — from a single deployable, by extracting a domain-agnostic platform and expressing each vertical as canon + configuration composed from reusable domain packs rather than a code fork. Manufacturing, Government, and Healthcare are the worked near-term examples; §8 is the strategic catalog.*

*Draft — July 2026. Status: planning. Decisions of record: (1) config-driven single app; (2) Government = broad public sector (agency administration + municipal utility operations); (3) sequence platform extraction first, re-express Manufacturing as the first profile, then one new vertical.*

> **Confidentiality & IP — Controlled asset (NDA-gated).** © 2026 Mimir Labs, LLC. Confidential; not for public distribution. Share only with qualified counterparties under a confidentiality agreement. This document describes *requirements and strategy*, not implementation — the State Constraint Engine, the ROPE compiler and evaluator, semantic-edge extraction, the Jormungandr contract layer, and the accumulated governed-policy corpus are protected separately as trade secrets. Do not post publicly or excerpt without approval.

---

## 1. The decision and what it commits us to

We are **not** forking the codebase per vertical, and we are **not** compiling separate builds. There is one Yggdrasil application. A tenant is assigned a **vertical profile**, and that profile selects which modules are active, which ROPE policy library seeds, which Mimisbrunnr vocabularies load, and which integration connectors are available. Vertical behavior is, as far as possible, **data**: module definitions, governed policy, reference vocabulary. This is the same thesis the product sells — rules are data, not code — turned inward on the product itself.

**Accepted tradeoffs of the config-driven single app (design around these, do not pretend they are free):**
- **One schema holds every vertical's tables.** 345 today plausibly becomes 700+. Non-active tables are hidden per tenant by module gating + row-level security, but the schema is shared. Mitigation: strict table namespacing by domain, and a module-activation layer so a tenant never sees another vertical's surface.
- **One release train.** A healthcare change ships to government tenants. Mitigation: per-vertical feature flags, profile-scoped migrations/seeds, and a test matrix that runs each profile.
- **Some vertical behavior is code, not config.** EDI/HL7/FHIR (healthcare), GASB fund accounting (government), PHI access logging (healthcare) are compiled into the single app and gated by profile. The goal is to keep this set small and push everything expressible into ROPE policy + vocabulary instead.

---

## 2. The vertical-profile mechanism (the core new concept)

A new tenant-level construct drives everything:

- **`tenants.vertical_profile`** — enum: `manufacturing | government | healthcare` (extensible; a tenant may later carry more than one via a profile set if a public utility also wants manufacturing-style asset work).
- **Module registry gating.** The client shells (Qt desktop + Next.js) already render from a module registry. The registry gains a `profiles: []` field per module; a tenant sees only modules whose profile set includes theirs. The server's `moduleFromTable` / RBAC layer enforces the same gate so hidden modules are unreachable, not merely unrendered.
- **ROPE policy libraries.** Each profile ships a starter policy library (importable ROPE decisions + artifacts) seeded on tenant provisioning: Manufacturing (AS9100, ITAR, FDA 21 CFR Part 11 — already exist); Government (procurement thresholds, records-retention schedules, appropriation control); Healthcare (claim edits, minimum-necessary access, credentialing gates).
- **Mimisbrunnr vocabularies.** The semantic model is the mechanism; the vocabularies are per-profile reference data: Manufacturing (materials, units, UNSPSC); Government (NIGP/UNSPSC commodity codes, fund/object codes, retention categories); Healthcare (ICD-10, CPT/HCPCS, NPI, taxonomy).
- **Bifrost connectors.** Available connector set is profile-scoped: Government (state financial systems, e-procurement, payment portals); Healthcare (X12 EDI, HL7 v2, FHIR, NCPDP).
- **Compliance posture.** Profile determines the default control set surfaced (Government: FedRAMP/StateRAMP, CJIS where relevant, Section 508, statutory retention; Healthcare: HITRUST, HIPAA/HITECH; Manufacturing: the current set).

**Phase 0 is exactly this layer plus proving it with Manufacturing.** Introduce `vertical_profile`, the module `profiles` gate, the profile-scoped seed of policy libraries + vocabularies, and re-express today's manufacturing modules as the `manufacturing` profile. Nothing user-visible changes for existing tenants; the seam now exists.

---

## 3. Shared platform vs. per-vertical pack

**Shared platform (built once, all profiles use it):** multi-tenant isolation, JWT/RBAC auth, rate limiting, cache, metrics, the audit spine; the **State Constraint Engine + ROPE** (the moat, fully domain-agnostic); governed extension fields, group codes, the repository/CRUD layer; the Mimisbrunnr framework; the client shells and their module-registry rendering; Ratatosk, Ragnarok, Bifrost, and Jormungandr (already system-agnostic).

**A vertical pack is:** a schema domain (namespaced tables) + module definitions (registry entries with `profiles`) + a ROPE policy library + Mimisbrunnr vocabularies + Bifrost connectors + a small set of gated code modules for behavior that cannot be expressed as policy + a compliance-control set. Everything but the last two is data/config.

---

## 4. Phase 0 — platform extraction (prerequisite)

1. Add `tenants.vertical_profile` (default `manufacturing` so existing tenants are unaffected) to `yggdrasil_complete_schema.sql`.
2. Add `profiles` to the module registry (server module map + both client registries) and enforce it in module RBAC.
3. Introduce a **profile-seed step** in tenant provisioning: given a profile, seed its ROPE policy library + load its vocabularies. (Reuses the existing ROPE starter-template import + Mimisbrunnr reference-data load.)
4. Re-tag the current ten modules and their ROPE/vocabulary content as the `manufacturing` profile. Verify an existing tenant is byte-for-byte unchanged.
5. Establish table-namespacing conventions for new verticals (domain prefixes) and a profile test-matrix in CI.

Deliverable: the single app serves the manufacturing profile through the new mechanism, with the other two profiles registered but empty. This proves the seam before any new domain is built.

---

## 5. Government edition (broad public sector: administration + utility operations)

The largest scope of the three; itself internally phased (administration first, utility operations second). Module/domain groups:

**Government administration:**
- **Constituent & Case Management** (the CRM analog): constituents, cases, service requests, correspondence.
- **Permitting & Licensing:** application → review → approval workflows, inspections, renewals, fees. Strong State Constraint Engine fit.
- **Procurement:** solicitations, public bidding rules, vendor management, POs, contracts — governed by ROPE (bid thresholds, sole-source justification, conflict-of-interest gates). NIGP/UNSPSC vocabularies.
- **Fund & Grant Accounting (GASB):** fund accounting (not commercial GL), appropriations/budgetary control, encumbrances, grant tracking. This is the largest *code* build in the government pack — governmental accounting differs structurally from the commercial Finance module.
- **Public Records / FOIA + Retention:** request handling, statutory retention schedules as governed policy, legal hold.

**Municipal utility operations:**
- **Meter-to-Cash:** service accounts, meters, reads, rate schedules, billing, collections. (Rate schedules are natural governed data.)
- **Service & Work Orders:** service requests, crews, assets, outage management.
- **Asset & Infrastructure Management:** asset registry, maintenance, inspections (the existing asset/work-order patterns extend here).
- **Regulatory Reporting:** utility-commission and environmental reporting.

**Cross-cutting government requirements:** fund/appropriation control that blocks over-spend at the transition (a signature ROPE use); records retention as enforced policy; accessibility (Section 508); compliance posture (FedRAMP/StateRAMP, CJIS if law-enforcement-adjacent). Connectors: state financial systems, e-procurement, payment portals.

---

## 6. Healthcare edition (administration / revenue cycle)

Boundary decision of record: **administrative, not clinical** — no diagnosis/treatment, to avoid ONC certification and clinical-safety obligations. Module/domain groups:

- **Patient / Member Management** (CRM analog): patients, guarantors, members, coverage.
- **Scheduling & Encounters:** appointments, providers, resources, check-in.
- **Revenue-cycle spine:** Eligibility & Benefits (270/271) → Prior Authorization (278) → Charge Capture/Coding → Claims (837) → Remittance/Posting (835) → Denials & Appeals → Patient AR. Every stage is a state machine; claim edits and medical-necessity rules are ROPE policy.
- **Payer & Contract Management:** payers, fee schedules (governed data), contract terms.
- **Credentialing & Provider Enrollment:** application → primary-source verification → committee → approval → re-credentialing, with license-expiry gates enforced at the transition.
- **Compliance & Incident:** HIPAA controls, incident reporting, audit packets.
- Reused from Manufacturing: Finance (GL/AR/AP), HR/workforce (with licensure tracking), Purchasing/Warehouse (clinical supplies, pharmacy par levels).

**The genuinely new platform work healthcare forces (mostly gated code, not config):**
1. **PHI access logging** — the audit spine logs *changes*; HIPAA also requires logging *reads* of PHI, plus minimum-necessary + purpose-of-use + break-glass. This is a platform addition (it benefits all verticals but is mandatory here).
2. **The standards layer** — X12 EDI (837/835/270-271/278/834), HL7 v2 / FHIR, NCPDP, and the code sets (ICD-10, CPT/HCPCS, NPI). Mimisbrunnr carries the vocabularies; Bifrost carries the connectors. This is the single largest build in the healthcare pack.
3. **Field-level PHI encryption + BAA-compliant infrastructure**, and **HITRUST** as an enterprise sales prerequisite (mostly non-engineering, but months and money).

---

## 7. Composable domain packs (verticals compose, they don't duplicate)

The single most important consequence of the config-driven model: **a vertical is not a monolith, it is a composition of reusable domain packs plus a thin unique slice.** A pack is a coherent bundle — schema domain + module definitions + ROPE policy library + Mimisbrunnr vocabulary — that *more than one* profile activates. Build the pack once; every profile that needs it turns it on.

This is the compounding return on the platform investment: the first vertical pays to build the packs it needs; the fifth vertical is mostly *choosing* packs it already has, with a small domain-specific remainder. It is the "rules are data, not code" thesis applied to product-line economics.

**The pack library (the building blocks):**
- **Core Financials** — GL, AR, AP, banking. Every profile.
- **Fund Accounting** — restricted funds, appropriations, encumbrances, grant tracking. Government, Nonprofit, Higher-Ed.
- **Projects / PSA** — projects, resource staffing, time & expense, milestone / T&M billing, utilization. Service, Construction, Legal, Consulting, research administration.
- **Field Service** — work orders, dispatch/scheduling, assets, SLAs, mobile, truck-stock. Field Service, Utilities, Facilities, Equipment dealers.
- **Inventory & Warehouse** — multi-location, lot/serial, picking, replenishment. Manufacturing, Distribution, Retail, Healthcare supply, 3PL.
- **Trading-Partner EDI** — X12 850/810/856/832/etc., AS2. Distribution, Retail, Logistics; Healthcare's 837/835 is a specialized member of this pack.
- **Pricing & Rebates** — tiered/contract pricing, rebates, chargebacks. Distribution, Manufacturing, Retail.
- **CRM / Constituent** — accounts, contacts, cases, correspondence (relabeled per profile: customers, constituents, members, donors, students). Every profile.
- **Contract & Lifecycle Admin** — a governed lifecycle object (draft → active → amend/renew → terminate). Insurance policies, Legal matters, Subscriptions/SaaS, Leases, Loans.
- **Claims / Case Adjudication** — intake → assess → decide → pay → appeal. Insurance claims, Healthcare claims, Government benefits, Warranty.
- **Credentialing / Licensing** — apply → verify → approve → renew → expire, with expiry gates enforced at the transition. Healthcare credentialing, Government licensing, Education certification, HR licensure.
- **Scheduling & Resources** — appointments, resources, calendars. Healthcare, Field Service, Hospitality, Education.
- **Metering / Subscription Billing** — meter-to-cash, usage rating, recurring billing. Utilities, SaaS, Telecom.

Each pack's *rules* are ROPE policy and its *reference data* is Mimisbrunnr vocabulary, so a pack ships governed and auditable by construction. A vertical profile is then a manifest: which packs, which policy libraries, which vocabularies, plus a short list of profile-unique modules and gated code.

**Relabeling, not duplicating (the vocabulary layer).** Reuse goes deeper than turning the same pack on: entities that are notionally similar *and share the same relationships* are the **same canonical table, relabeled per profile** — they are never rebuilt vertical by vertical. Yggdrasil already ships this as **Tenant Label Overrides** (rename modules and entities without touching code — Item Masters → Recipes, Sales Orders → Tickets) plus one-click vocabulary presets (Restaurant, Field Service, Light Retail). The canonical column and its foreign keys carry the governed meaning; the label carries the vertical's language on top. A *customer* becomes a *guest* (Hospitality), a *constituent* (Government), a *member* (Healthcare), or a *donor* (Nonprofit) with no new schema, and a *sales order* becomes a *ticket*, a *reservation*, or a *check*. Two consequences: first, this is the schema-bloat concern answered positively — most of what looks like a new vertical's entities is existing canonical entities wearing new vocabulary, so net-new tables are the exception, not the rule; second, because the semantics underneath are unchanged, a single ROPE policy written against the canonical column governs *every* vertical that relabels it — you do not re-author the rule per vertical any more than you re-create the table.

## 8. The vertical catalog

### 8.1 The fit rubric

A domain is a strong Yggdrasil vertical to the degree it is:
1. **Rule-dense** — operational rules that today live in heads, spreadsheets, and code (ROPE turns them into governed, signed policy).
2. **State-driven** — the domain is fundamentally records moving through gated lifecycles (the State Constraint Engine is the spine).
3. **Audit-mandated** — regulators or auditors demand provable *who did what, under what authority, when* (the audit spine + signed decisions).
4. **Fragmented / legacy-served** — the incumbents are siloed, legacy, or customization nightmares (the governed-canon / no-custom-field-sprawl wedge).
5. **Composable** — the more it reuses existing packs, the cheaper and faster it is to stand up.

The strongest candidates score high on 1–3 (which is where the moat lives) *and* high on 5 (which is where the economics live).

### 8.2 The catalog

Beyond the three worked examples, the reachable set. "Packs" lists the reusable §7 packs each composes; "unique" is the profile-specific remainder (mostly gated code); adjacency notes how close it sits to existing Yggdrasil code.

| Vertical | Fit (rules/state/audit) | Composes from packs | Profile-unique / gated code | Compliance surface |
|---|---|---|---|---|
| **Insurance** (P&C carrier + agency) | Very high | Contract & Lifecycle, Claims/Adjudication, Core Financials, CRM (producers) | Rating engine (much ROPE-expressible), ACORD forms/data, reinsurance | State DOI filings, NAIC |
| **Distribution / Wholesale** | High | Inventory & Warehouse, Trading-Partner EDI, Pricing & Rebates, Core Financials, CRM | Drop-ship, chargeback reconciliation | Light |
| **Field / Professional Service** | High | Field Service, Scheduling, Projects/PSA, Core Financials, CRM | Dispatch optimization, mobile | Light (varies by trade) |
| **Construction / E&C** | High | Projects/PSA, Field Service, Core Financials | Job costing, AIA/progress billing, retainage, change orders, subcontracts | Prevailing wage, lien waivers, certified payroll |
| **Nonprofit / NGO** | High | Fund Accounting, CRM (donors), Core Financials | Donor-restricted funds, grant outcomes, program budgets | FASB (nonprofit), grantor reporting |
| **Lending / Loan Servicing** | Very high | Contract & Lifecycle (loan), Claims/Adjudication (underwriting/collections), Core Financials, CRM | Amortization/servicing, escrow, KYC/AML | Heavy — lending/consumer-finance regulation (flag: high regulatory surface) |
| **Higher-Ed Administration** | High | CRM (students), Fund Accounting (grants/research), Scheduling, Credentialing (certification), Core Financials | Student-record lifecycle, financial aid | FERPA, Title IV |
| **Sports & Athletics** (governing bodies, leagues/clubs, collegiate athletic depts, facilities) | Very high | Credentialing/Licensing (athlete eligibility & official certification), Scheduling & Resources (fixtures, venues, officials assignment), CRM (athletes/members/teams), Contract & Lifecycle (scholarships/NLI, player & sponsor contracts), Core Financials (dues/fees/sponsorship), Projects/PSA (seasons/tournaments) | Competition module (fixtures → results → standings), roster/transfer & selection rules | Segment-dependent — SafeSport/safeguarding + waivers (youth/amateur); NCAA eligibility/amateurism/NIL + Title IX (collegiate); WADA/USADA anti-doping (governing bodies) |
| **Legal / Professional Firms** | Medium-High | Projects/PSA (matters), Contract & Lifecycle, Core Financials | Trust / IOLTA accounting, conflicts checking | Bar trust-accounting rules |
| **Real Estate / Property Mgmt** | Medium-High | Contract & Lifecycle (leases), Field Service (maintenance), Core Financials, CRM | CAM reconciliation, rent roll, escalations | Light |
| **Logistics / 3PL / Transport** | High | Inventory & Warehouse, Trading-Partner EDI, Field Service (fleet), Core Financials | Freight rating, 3PL activity billing | DOT / carrier |
| **Retail / Omnichannel** | Medium | Inventory & Warehouse, Pricing & Rebates, Trading-Partner EDI, Core Financials (+ existing POS Lite) | Merchandising, replenishment, loyalty | PCI (payments) |
| **Hospitality / Food Service** | Medium | Scheduling (reservations), Inventory & Warehouse, Core Financials (+ POS Lite) | Recipe/F&B costing (Yggdrasil already ships Restaurant vocabulary presets) | Light |
| **Subscription / SaaS Ops** | Medium-High | Contract & Lifecycle, Metering/Subscription Billing, CRM, Core Financials | Usage rating, revenue recognition (ASC 606) | ASC 606 / audit |
| **Pharma / Life-Sciences (GxP)** | High | Manufacturing + Quality (existing) + Inventory | Serialization / track-and-trace (DSCSA) | 21 CFR Part 11 (already in ROPE library), GxP |
| **Agriculture / Agribusiness** | Medium | Manufacturing, Inventory & Warehouse, Distribution | Lot traceability, commodity/contract pricing | Food-safety traceability |

### 8.3 Reading the catalog

Three things fall out of it:

- **The cheapest next verticals are the ones nearest existing code.** Distribution and Field/Professional Service reuse Yggdrasil's Purchasing/Warehouse/Sales/Finance and Service/Projects modules almost directly — they are the lowest-effort profiles after the three worked examples, and good candidates to prove composability before a from-scratch domain.
- **A few packs unlock a disproportionate share of the catalog.** Contract & Lifecycle Admin and Claims/Adjudication together underwrite Insurance, Lending, Legal, Real Estate, Subscriptions, and (with Healthcare) most of the "policy/claim" world. Projects/PSA underwrites Service, Construction, Legal, and research administration. Building those packs well is high-leverage.
- **Regulatory surface, not technical fit, is the real gating variable.** Almost everything in the catalog is a strong *technical* fit (that is the point of a governed state engine). The differentiator between "fast" and "slow" verticals is compliance/certification and sales-cycle drag — Lending and Government sit at the heavy end; Distribution, Service, Hospitality, and Real Estate at the light end. Sequence accordingly.
- **Eligibility is credentialing, which is why Sports scores so high on a thin build.** An athlete's or team's *eligibility to compete* is a gated lifecycle — register → eligible → suspended → reinstated → expired — governed by rules that today live in compliance-office folklore, spreadsheets, and dispute letters. That is the Credentialing/Licensing pack (apply → verify → approve → renew → expire, with expiry gates enforced at the transition) relabeled, plus Scheduling for fixtures and officials assignment and CRM relabeled to athletes/teams. So Sports is mostly a *composition*, and its profile-unique remainder (competition/standings, roster/transfer rules) is small. Its differentiated wedge is the exact ROPE pitch dropped into a domain notorious for opaque, contested rule enforcement: *can this athlete play in this fixture, on whose authority, under the rule as it stood that day* — provable eligibility governance with point-in-time provenance. Sequence it light-end-first the way Government sequences permitting before GASB: amateur/youth-league + facility + officials management (SafeSport, waivers — light compliance) proves the vertical; collegiate (NCAA eligibility / NIL / Title IX) and governing-body anti-doping are the high-value, heavy-compliance later slices. It also reinforces the point above — Credentialing/Licensing is another pack that pays for itself across Healthcare, Government, Education, *and* Sports.

## 9. Cross-cutting concerns (consequences of the single-app choice)

- **Schema bloat.** First mitigated at the source by relabeling over duplicating (§7): notionally-similar entities are shared canonical tables under vertical vocabulary, so most verticals add few net-new tables. For the tables that genuinely are new: namespace them by domain prefix; keep them out of a tenant's reachable surface via module gating + RLS; document the profile→table map in `app-manifest.json`. Postgres handles the count; the discipline is in access-scoping and in relabeling before creating, not in raw count.
- **Release coupling.** Profile-scoped feature flags; profile-scoped seeds/migrations; a CI matrix that provisions one tenant per profile and runs each profile's story tests. A change is not shippable until every profile's matrix is green.
- **Security surface.** PHI logging, field encryption, and break-glass are built as platform capabilities gated on by profile — so the healthcare-driven controls harden the whole product rather than living in a silo.
- **The gated-code budget.** Track the set of vertical-specific *code* modules (EDI, GASB, PHI logging) as a deliberate, small, named list. Anything that can be expressed as ROPE policy or vocabulary must be, not written as code. This keeps the "config-driven" claim honest.

---

## 10. Sequencing

1. **Phase 0 — platform extraction** (Section 4). The unlock; nothing new-vertical ships until this is proven with Manufacturing.
2. **Phase 1 — first new vertical.** Recommendation to confirm: pick the vertical whose earliest slice is the most self-contained. Government administration's permitting/licensing/procurement slice is largely State-Constraint-Engine + ROPE + vocabulary (little new code) and is a strong first proof; GASB fund accounting and the full utility-operations scope follow as later slices. Healthcare's earliest slice is gated behind the standards layer + PHI logging, so it is more code-heavy up front.
3. **Phase 2 — second new vertical**, plus the deferred heavier slices of the first (government utility operations; healthcare EDI depth).

Each vertical ships in slices, not as a monolith: register the profile, add the first module group + its ROPE library + vocabulary, prove the state machines with story tests, then widen.

---

## 11. Risks and honest caveats

- **The config-driven choice trades operational leanness for release coupling.** If one vertical's compliance/regulatory cadence diverges sharply (healthcare HITRUST re-cert, government FedRAMP), the shared release train becomes a constraint. Revisit the single-app decision if a vertical's release governance can no longer tolerate coupling.
- **Government "broad public sector" is the largest scope and the slowest sales motion** (procurement cycles, certification). Sequencing its self-contained administrative slice first limits exposure.
- **Healthcare's standards + compliance lift is real and front-loaded.** It is the reason to consider government-administration-first, despite healthcare's arguably clearer ROI narrative.
- **Incumbents are entrenched in both** (government: Tyler Technologies, OpenGov, Workday; healthcare: Epic, athenahealth, Availity, Waystar). The wedge in both is the same one Yggdrasil ERP already sells: governed operational canon enforced at the moment of action, provably auditable — a stronger fit in these regulated verticals than in manufacturing, and the reason the platform is worth extracting once and reusing.

---

## Appendix — what changes vs. stays, at a glance

| Layer | Shared platform | Per-vertical (config/data) | Per-vertical (gated code) |
|---|---|---|---|
| Auth / RBAC / audit / multi-tenant | ✓ | | PHI access logging (HC) |
| State Constraint Engine + ROPE | ✓ | policy libraries | |
| Mimisbrunnr framework | ✓ | vocabularies / code sets | |
| Schema | extension/UDF, group codes, core | vertical domain tables | |
| Modules | registry + rendering | module definitions (`profiles`) | GASB accounting (Gov) |
| Integration (Bifrost) | engine | connector availability | EDI/HL7/FHIR (HC), e-procurement (Gov) |
| Clients (desktop/web) | shells | profile-gated module surface | |
| Compliance | control framework | profile control set | HITRUST/FedRAMP evidence |
