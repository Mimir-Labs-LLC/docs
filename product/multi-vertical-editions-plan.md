# Yggdrasil ERP — Multi-Vertical Editions Plan

*How Yggdrasil ERP becomes one config-driven application that serves Manufacturing, Government (broad public sector), and Healthcare administration from a single deployable — by extracting a domain-agnostic platform and expressing each vertical as canon + configuration rather than a code fork.*

*Draft — July 2026. Status: planning. Decisions of record: (1) config-driven single app; (2) Government = broad public sector (agency administration + municipal utility operations); (3) sequence platform extraction first, re-express Manufacturing as the first profile, then one new vertical.*

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

## 7. Cross-cutting concerns (consequences of the single-app choice)

- **Schema bloat.** Namespace every vertical's tables by domain prefix; keep them out of a tenant's reachable surface via module gating + RLS; document the profile→table map in `app-manifest.json`. Postgres handles the table count; the discipline is in access-scoping, not raw count.
- **Release coupling.** Profile-scoped feature flags; profile-scoped seeds/migrations; a CI matrix that provisions one tenant per profile and runs each profile's story tests. A change is not shippable until every profile's matrix is green.
- **Security surface.** PHI logging, field encryption, and break-glass are built as platform capabilities gated on by profile — so the healthcare-driven controls harden the whole product rather than living in a silo.
- **The gated-code budget.** Track the set of vertical-specific *code* modules (EDI, GASB, PHI logging) as a deliberate, small, named list. Anything that can be expressed as ROPE policy or vocabulary must be, not written as code. This keeps the "config-driven" claim honest.

---

## 8. Sequencing

1. **Phase 0 — platform extraction** (Section 4). The unlock; nothing new-vertical ships until this is proven with Manufacturing.
2. **Phase 1 — first new vertical.** Recommendation to confirm: pick the vertical whose earliest slice is the most self-contained. Government administration's permitting/licensing/procurement slice is largely State-Constraint-Engine + ROPE + vocabulary (little new code) and is a strong first proof; GASB fund accounting and the full utility-operations scope follow as later slices. Healthcare's earliest slice is gated behind the standards layer + PHI logging, so it is more code-heavy up front.
3. **Phase 2 — second new vertical**, plus the deferred heavier slices of the first (government utility operations; healthcare EDI depth).

Each vertical ships in slices, not as a monolith: register the profile, add the first module group + its ROPE library + vocabulary, prove the state machines with story tests, then widen.

---

## 9. Risks and honest caveats

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
