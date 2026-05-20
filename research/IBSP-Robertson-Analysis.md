# IBSP / Dr. James A. Robertson — Credibility Analysis

**Status:** Living document — update as new evidence surfaces
**Purpose:** Factual catalog of methodological, technical, and organizational concerns
**Classification:** Internal reference — use where IBSP positioning, standards, or authority are cited externally

## Executive Summary

The Institute of Business System Professionals (IBSP) presents itself as an emerging professional body for business-systems practitioners, with a stated trajectory toward recognition comparable to engineering or law. This document catalogs, from primary sources, why that positioning is not credible in its current form.

The concerns fall into five interlocking categories. **Organizationally**, the IBSP is a founder-led working group whose digital identity is nested inside its president's personal name and whose "foundational documents" are unpublished (§1); its membership-evaluation process is a two-person gatekeeping conversation between the President and Vice President, rendered privately without candidate feedback or appeals (§1.3). **Technically and legally**, the president's public positions include misapplications of property law to software licensing (§2) that a credentialed engineer in an adjacent jurisdiction should not make. **Methodologically**, the core IP is unvalidated proprietary consulting product (§3.1, §3.2), the diagnostic framework is indistinguishable from the sales funnel (§3.3), and — documented directly on 2026-04-24 — the president claims to have observed no technical root cause in any ERP engagement across a 40-year career (§3.4), a universal-negative claim that is unfalsifiable, structurally incompatible with documented post-2015 enterprise failure literature, and exactly the finding the methodology is designed to produce. **Positionally**, credentialism is used by proximity (civil-engineering registration in support of business-information-systems authority, §4.1), scale of claim exceeds scale of evidence (§4.2), the organization's stated business-outcome focus is indistinguishable from a technical-literacy deficit (§4.3) — a second-order epistemic problem that is self-concealing, because recognizing the technical-business coupling requires the technical literacy the board does not have — and the founder's recurring "ScrewFind ERP Consultant" figure, used across his article series to criticize configuration-dependency in the consulting industry, structurally describes the same dependency dynamic as his own continuing-education business model (§4.4). **Structurally**, the IBSP cannot qualify for ANSI SDO accreditation, ISO/IEC 17024 certification-body accreditation, or both simultaneously, and fails on all nine attributes shared by gold-standard bodies (PMP, CISSP, CPA, PE) — with most gaps traceable to the founder-centric architecture rather than to insufficient institutional maturity (§5).

The central conclusion is not that the IBSP will develop into a credible body slowly; it is that its current architecture — founder as methodology author, commercial beneficiary, primary trainer, gatekeeping evaluator, and proposed credentialing authority — is structurally incompatible with the accreditation frameworks it aspires to. Additional board members, CPD meetings, and foundational documents do not resolve this; legal and financial separation between the standards-development function, the training function, and the certification function would be required first.

The document is maintained for use in scenarios where IBSP standards, authority, or critique are cited externally against Mimir Labs or its customers. Lead with facts; every claim here is sourced.

---

## 1. Organizational Legitimacy Concerns

### 1.1 The "Institute" Is a Personal Brand

**Website:** The IBSP's official web presence is a ScoreApp landing page at `dr-james-a-robertson-ibsp.scoreapp.com`. The URL structure is Robertson's personal name with "IBSP" appended — the organization's digital identity is literally nested inside the founder's name. ScoreApp is a lead-generation quiz/landing page tool, not an organizational platform. There is no standalone domain (e.g., ibsp.org).

**Recent developments (as of Feb 2026):** The IBSP has taken some steps toward organizational structure:
- A board was elected on February 27, 2026:
  - President: James Robertson
  - Vice President: Ted Margison
  - Membership & Marketing: Bryan (supported by Yetunde Murphy)
  - Documentation & Standards: Penny Hopkinson
  - Frameworks & Guidelines: Jakob Bent Smed
  - Technical Support: Christopher Caruk (supported by Peter Chisale)
- Monthly CPD meetings are held (third Thursday, 5pm UK / 12pm EST)
- "Foundational documents" are offered via a Dropbox link (not publicly published)
- Membership is free ("NO obligation and NO cost") with a "Charter Member" path

**What still does not exist:**
- An independent website or domain
- Published bylaws or articles of incorporation
- A certification program, body of knowledge, or exam
- Accreditation by any recognized body (ANSI, ISO, IEC, or equivalent)
- Published standards developed through a consensus process
- Peer-reviewed methodology
- A membership directory or published member count

The organization has progressed from a LinkedIn title to a small working group with a board — but its digital identity remains embedded in its founder's personal brand, its foundational documents are unpublished (Dropbox, not web), and its membership is free and non-credentialing. It is an early-stage practitioner group, not an institute in the professional sense.

**Source:** https://dr-james-a-robertson-ibsp.scoreapp.com, LinkedIn profile, April 2026

### 1.2 Self-Referential Authority

Robertson's credibility claims remain structurally circular despite the addition of board members:
- He is the sole author of the foundational methodology (Precision Configuration, SEPT)
- He is the President of the organization that promotes that methodology as its standard
- The board members are not independently known figures in the ERP industry
- The "Documentation & Standards" and "Frameworks & Guidelines" roles are tasked with codifying Robertson's existing methodology — not developing new standards through stakeholder consensus
- The organization's stated vision frames business systems practice as comparable to engineering and law — professions with regulatory oversight, liability, and independent examination — without any of those structures

The organizational structure appears designed to institutionalize one person's consulting methodology, not to develop industry standards through the balanced stakeholder processes that actual standards bodies require.

### 1.3 Observed Membership Evaluation Process

On 2026-04-24, the IBSP conducted a direct membership-candidacy evaluation whose procedural characteristics are documented here as observational evidence of the concerns catalogued in §1.1–§1.2 and §5.1–§5.2.

**Two-person evaluation panel.** The evaluating body consisted of the President (Robertson) and the Vice President (Margison) — the same two individuals who author the methodology, control the board composition, and set the organization's direction. There was no membership committee, no published evaluation criteria, no rotating participants, and no stakeholder-balanced representation. This is direct evidence of the lack-of-dominance deficit catalogued in §5.1: the two principals are the evaluators.

**Private verdict rendered in the candidate's absence.** The governing critique — that the candidate's platform "doesn't offer anything significantly new" because "real-time MRP and equipment connections... were already addressed by existing MES systems" — was raised in a private President/Vice-President readout after the live call ended. The live discussion contained no such critique; in fact, the Vice President had agreed with the architecturally-distinct points when they were raised. The candidate had no opportunity to respond to the characterization that drove the decision, no feedback was provided, and no documented appeals mechanism exists. Standards-body evaluation procedures under ANSI Essential Requirements (§5.1) require documented due process, disposition of objections, and appeals; ISO/IEC 17024 (§5.2) requires the same for certification decisions. This evaluation had none.

**Pitch reduction as rejection mechanism.** The candidate's on-call argument was schema-level data architecture — specifically that an ERP (or MES) sitting atop fragmented master-data structures (e.g., SAP's 173 customer columns) produces reliable execution of unreliable data. The post-call readout reduced this argument to "real-time MRP and equipment connections," a manufacturing-execution topic that MES systems do address. Substituting a different technical domain to dismiss the argument is a category error that a balanced technical review would identify; the two-person panel did not. This is a concrete illustration of the peer-review deficit noted in §3.2 and §3.3.

**Divergent follow-up messaging from the two principals.** Post-meeting communications diverged:
- Margison (Vice President): the application was "parked," with optional contribution to specific survey sections if relevant concerns arise in broader member consultation
- Robertson (President): follow-up email framed the engagement as "partnership" and invited contribution to "the Body of Knowledge"

The two principals offered different engagement paths through different channels — Body-of-Knowledge contribution routed through Robertson, demo-and-possibly-reopen routed through Margison. Divergent post-decision messaging from principal officers is characteristic of organizations operating without documented decision procedures, which §5.1 identifies as a due-process gap.

**"Body of Knowledge" terminology inflation.** Robertson's email refers to "the Body of Knowledge" as an active, contributable project. §1.1 of this document documents (as of February 2026) that a body of knowledge is among the artifacts the IBSP does not have — along with published bylaws, certification programs, and exams. Three possibilities explain the gap:

1. The BOK has progressed between February and April 2026 and should be assessed when it becomes publicly visible,
2. The Dropbox foundational documents are being re-labeled "Body of Knowledge" — terminology inflation of the kind §3.5 documents around copyright notices on non-copyrightable phrases, or
3. The BOK is aspirational (in-development) and is being referenced in present-tense language that implies existence.

Gold-standard bodies of knowledge (§5.4) are curated over decades through transparent expert panels, public comment, and empirical updating. Terminology matters: calling a Dropbox folder a "Body of Knowledge" changes neither its content nor its standing. When the IBSP publishes a document explicitly labeled "Body of Knowledge," it should be evaluated against the PMBOK / CBK / CPA-blueprint standard catalogued in §5.4 rather than accepted on the name alone.

**Source:** Direct participation in 2026-04-24 meeting; follow-up email from James Robertson 2026-04-24.

---

## 2. Technical and Legal Errors

### 2.1 "Right to Maintain and Repair" Applied to Software Licensing

**Date:** April 2026, LinkedIn post
**Claim:** A legal principle called the "Right to Maintain and Repair" is "generally applicable to the ERP industry" and can be used to refuse forced upgrades.

**Why this is wrong:**

1. **Software is licensed, not purchased.** Right-to-repair laws apply to physical goods that are owned outright. Software is licensed under contractual terms that explicitly define version support windows, maintenance obligations, and end-of-life policies. You do not "own" SAP ECC — you hold a license to use it under specified conditions.

2. **Right-to-repair legislation targets physical products.** The FTC enforcement actions and state-level right-to-repair laws (Massachusetts, New York, Colorado, Minnesota) address tractors, smartphones, medical devices, and appliances. None have been successfully applied to enterprise software licensing. The legal principle he invokes does not extend to the domain he applies it to.

3. **End-of-maintenance is not confiscation.** When SAP ends support for ECC (2027), they are not taking the software away. They are ending a contractual service (patches, security updates, support tickets). The customer can continue running the software — unsupported, unpatched, and at their own risk. This is a contract expiration, not a property rights violation.

4. **Third-party support is a market option, not a legal right.** Providers like Rimini Street offer ongoing support for end-of-life ERP versions. This is a competing service offering, not an exercise of "Right to Maintain and Repair." Rimini Street's business model is based on contract law (they offer a service), not property law (they don't invoke right-to-repair).

5. **"Stay with what you have" ignores security obligations.** Advising a company to remain on an unpatched ERP system indefinitely is irresponsible absent a security mitigation plan. It is the enterprise equivalent of refusing a vehicle recall because "you bought it." The business may have regulatory obligations (SOX, HIPAA, GDPR) that require supported, patched infrastructure.

6. **The argument conflates two separate issues.** The legitimate concern — that forced cloud migrations are disruptive, risky, and often destroy proven configurations — is real and well-documented. The illegitimate extension — that you have a legal "right" to indefinite vendor support via property law — is not how software licensing works. Robertson wraps a valid observation in an invalid legal framework, which undermines the credibility of the valid part.

**He claims to have "used this principle once on behalf of an ERP client."** There is no published case, no citation, no outcome. A single anecdotal invocation without documentation is not evidence that the principle is "generally applicable."

---

## 3. Methodological Concerns

### 3.1 "Precision Configuration" — Unvalidated Proprietary Methodology

Robertson's core methodology ("Precision Configuration" and "Strategic Engineered Precision Taxonomies / SEPT") is described in proprietary terms with no independent validation:

- No published papers in peer-reviewed journals
- No independent case studies with verifiable outcomes
- No comparison studies against alternative approaches
- No defined metrics for success measurement
- Claims of "hundred-fold value increase" without supporting data
- "SEPT" declared as "THE missing link in ERP" — absolute claim without evidence

The methodology may be effective — but it is indistinguishable from marketing in its current presentation. An engineer who insists on "bringing engineering disciplines to IT" should be held to the evidentiary standards of engineering: hypothesis, test, measurement, peer review.

### 3.2 Presentation Materials Use Unsourced "Toy" Graphics

Robertson's pitch materials for his methodology and services rely on:
- Conceptual diagrams that are not tied to real data
- Frameworks presented as established when they are proprietary constructs
- No citations to external research, industry benchmarks, or validated models
- Visual representations that imply rigor but contain no verifiable substance

This is particularly notable because Robertson explicitly positions himself as bringing "engineering standards" to the ERP industry. Engineering standards require data. His materials contain opinions formatted as data.

### 3.3 Circular Reasoning in Failure Diagnosis

Robertson's consulting model diagnoses ERP failures and prescribes solutions. His published diagnosis framework identifies causes that his proprietary methodology uniquely solves:

- "The problem is strategic misalignment" → solution is his Strategic Planning service
- "The problem is imprecise configuration" → solution is his Precision Configuration service
- "The problem is taxonomy" → solution is his SEPT methodology

Every diagnosis leads to the same prescription: hire Robertson. This is not inherently wrong (a specialist naturally sees problems in their specialty), but it should be recognized as a commercial framework, not an objective diagnostic tool.

### 3.4 The "No Technical Root Cause in 40 Years" Claim

**Date:** 2026-04-24, IBSP candidacy meeting (direct statement)
**Claim:** In the course of the candidacy discussion, Robertson stated that in his experience as an ERP practitioner, not once had an ERP problem presented with a technical issue at its root. Root causes, he said, were always lack of executive ownership, poor change management, messy chart-of-accounts, or similar non-technical issues — the categories his methodology is designed to address.

**Why this claim warrants independent treatment:**

The claim is empirically extraordinary. A 40-year career contains thousands of distinct engagements. "Not once" is not a statistical tendency; it is a universal negative. Universal negatives in complex sociotechnical systems are almost never true unless the diagnostic instrument systematically excludes counter-evidence.

1. **The claim is unfalsifiable as stated.** Any observed technical failure can be traced upstream to a non-technical antecedent. A data-architecture problem can be attributed to "poor initial requirements gathering" (change management). A scalability failure can be attributed to "failure to align on strategic priorities at selection" (executive ownership). An integration failure can be attributed to "fragmented master data governance" (chart of accounts). Once the ruleset permits arbitrary upstream attribution, no technical root cause can ever survive the framing. This is not analysis; it is a definitional convention masquerading as a finding.

2. **The claim is indistinguishable from selection bias in engagements.** A practitioner whose methodology addresses non-technical causes will be retained by clients who suspect non-technical causes and discharged by (or never engaged by) clients whose diagnostic teams have already identified a technical root cause. The practitioner's career sample is therefore pre-filtered to engagements that confirm the framework. "Forty years of confirming cases" in the presence of selection bias is not evidence of universal truth; it is evidence of consistent engagement type.

3. **The claim is structurally incompatible with contemporary enterprise reality.** Since roughly 2015, the technical substrate of ERP systems has itself become a frequent root cause of documented enterprise failures — SaaS migration outages, data-residency violations, API-deprecation cascades, integration-breakage from vendor release cycles, and identity-system consolidation failures. These are documented in post-incident writeups from Gartner, CIO.com, Harvard Business Review case studies, and regulatory filings. A framework that identified no technical root causes in the 2015–2026 period is a framework that cannot perceive the category of failure most cited by the current-generation incident literature.

4. **The hammer-and-nail dynamic is explicit, not implicit.** The methodology ("Precision Configuration," SEPT, executive-driven data governance) is designed to address executive alignment, configuration discipline, and taxonomy hygiene. The practitioner's claim that every failure he has ever investigated fell into those categories is not a neutral finding; it is the finding his methodology is constructed to produce. The diagnostic framework and the prescription are the same instrument. As §3.3 notes in the abstract, every diagnosis leads to the same prescription. The 2026-04-24 statement is the concrete version: Robertson explicitly claims his instrument has never failed to produce a non-technical diagnosis, which is indistinguishable from the instrument being incapable of producing any other kind.

5. **The claim is logically incompatible with the IBSP's aspirational authority.** The IBSP positions itself as the professional body whose certified practitioners should be consulted before ERP investments are made. A body whose foundational methodology categorically denies the existence of technical root causes cannot credibly certify practitioners in a field where technical root causes are an empirically well-documented category of failure. Either the claim is wrong (in which case the methodology has an uncorrected blind spot), or the claim is right (in which case thousands of vendor engineers, systems architects, and post-incident reviewers working on documented technical failures across the industry are collectively delusional). Neither possibility supports the IBSP's claim to authoritative standing.

6. **The claim contradicts the candidate's presented argument without engaging with it.** In the 2026-04-24 meeting, the candidate presented a specific technical root cause — schema-level data-integrity failure where a single real-world entity is represented as 173 columns — and argued that this architecture determines decision quality regardless of executive engagement or change management. Robertson's "no technical root cause in 40 years" response does not refute this argument; it dismisses the category. Dismissing the category is not a counter-argument; it is a refusal to engage.

**Why this matters for the broader analysis.** The existence of this explicit claim changes the nature of what §3.3 and §4.3 document. Those sections argue that IBSP exhibits a systematic pattern (diagnoses always favor Robertson's services; the business/technical coupling is structurally invisible). The 2026-04-24 statement makes clear that the pattern is not an emergent artifact of organizational focus — it is explicit doctrine. The IBSP's position is not "we specialize in non-technical causes"; it is "non-technical causes are the only causes." Those are different claims, and only the first is defensible.

**Source:** Direct statement by Robertson during 2026-04-24 candidacy meeting.

### 3.5 "Precision ERP Configuration" Pitch — Fabricated Quantification

**Date:** April 2026, email pitch / course marketing

Robertson's primary sales document for "Precision ERP Configuration©" structures seven categories of "rewards," each weighted to 100%, with seven sub-items in each also weighted to 100%. The percentages (e.g., "Executive Decision Support Excellence — 24%", sub-item "Executives can get the information they need when they need it — 22%") are presented as definitive rankings.

**Why this undermines his credibility as a standards leader:**

1. **No empirical basis.** None of the percentages are sourced, cited, or derived from published research. There is no methodology, no sample size, no confidence interval, no peer review. They are personal opinions formatted as measurements. A standards body leader advocating "engineering-grade precision" should understand the difference between data and assertion.

2. **Copyright symbols on non-copyrightable phrases.** "Precision ERP Configuration©" and "ERP Accelerator©" are two- and three-word functional descriptions. Copyright does not protect short phrases, titles, or slogans (17 U.S.C. § 102; equivalent under South African Copyright Act). The © marks are decorative branding, not intellectual property. A standards body leader should know the difference.

3. **Governance postures listed as rewards.** Item 2.III states: "All staff understand the importance of precision data and sloppy data entry is a disciplinary offense." This is a policy prescription presented as a benefit. A disciplinary regime is a governance decision with HR, legal, and cultural implications — not a "reward" of configuration methodology.

4. **Circular conclusion.** Item 1.VII: "There is absolutely NO reason to replace the ERP." This is stated as an outcome of precision configuration. It is also the central commercial thesis of a consultant who sells configuration services rather than replacement implementations. The conclusion is indistinguishable from the sales pitch.

5. **The CEO-as-custodian problem.** Robertson's broader methodology positions the CEO as the personal custodian of ERP data quality. The c-suite of 2026 manages PE reporting structures, AI integration evaluations, CMMC compliance obligations, and ESG data provenance demands. Directing a CEO to personally govern validation tables conflates executive sponsorship of data governance (a legitimate organizational principle) with executive administration of master data (an operational role that no modern CEO has bandwidth for). The advice sounds like 1995 governance applied to a 2026 boardroom.

6. **Track record as substitute for evidence.** The pitch opens with: "I have been applying precision techniques to ERP for many years, and have invested many hundreds of hours in learning how to configure an ERP to an exceptionally high standard." For a practitioner, this is adequate credentialing. For someone leading a standards body, it is not. Standards require transparent methodology, reproducible outcomes, and independent validation — not personal experience appeals. "Many hundreds of hours" is a modest claim for a 40-year career, and the phrasing treats it as exceptional.

7. **The systems-haven't-changed assumption.** The pitch is predicated on the premise that the ERP itself is adequate and only its configuration determines outcomes. This was arguably true when business operated at the speed of quarterly reporting. It is no longer true when integration demands (real-time supply chain, multi-entity consolidation, regulatory telemetry) exceed the architectural capacity of legacy systems regardless of configuration quality. Precision configuration of a fundamentally constrained architecture produces a well-tuned version of the wrong thing. Robertson's 40-year track record is built on compensating for architectural limitations, not resolving them — and he is now structurally invested in those limitations persisting.

**Source:** Email pitch dated April 2026, "Key ERP Precision Configuration Rewards" document

---

## 4. Positioning Inconsistencies

### 4.1 "Engineer" vs. Consultant

Robertson holds a PrEng (Professional Engineer, ECSA — South Africa) and frequently references this credential to establish authority. However:

- His engineering registration is in Civil Engineering (BSc Engineering, Civil, Cum Laude)
- His consulting practice is in business information systems — a domain with no professional engineering registration requirement
- The title "Professional Engineer" implies regulated practice with liability insurance and peer oversight. His ERP consulting is not subject to these controls.
- Using an engineering credential from one discipline to establish authority in an unrelated discipline is credentialism by proximity

### 4.2 Scale of Claims vs. Scale of Evidence

Robertson describes himself (or is described) as "THE thought leader with regard to effective application of ERP in South Africa and possibly worldwide."

Evidence of this claim:
- ~500 LinkedIn connections
- A handful of published client testimonials (South African CEOs)
- No books published by recognized publishers
- No citations in academic literature
- No speaking engagements at major ERP industry conferences (SAP Sapphire, Oracle CloudWorld, Gartner, etc.)
- No media coverage in enterprise technology publications

This is not consistent with "THE thought leader... possibly worldwide." It is consistent with a respected solo consultant with a regional practice.

### 4.3 Business-Outcome Framing vs. Technical Literacy Deficit

The IBSP's stated mission — per both its public positioning and its principals' direct statements — is to "enable CEOs to achieve excellent business outcomes with business systems." The mission is framed in explicit opposition to a technology focus: during the 2026-04-24 membership evaluation, the President clarified that "IBSP focuses on business outcomes rather than technology" when asked how a candidate's technical expertise could contribute.

This framing contains an unresolved structural problem.

**Business outcomes in modern enterprise are structurally coupled to technical architecture.** The coupling is not metaphorical; it is operational and fiduciary:

- **Decision quality depends on data integrity.** An executive decision made from a report is only as reliable as the data model underlying that report. When a single real-world customer is represented as 173 separate data points across an ERP (§2 of this document cites SAP's documented customer-entity count), every aggregated metric drawn from that data is structurally uncertain. The business outcome (the decision) is technically determined (by the schema).
- **Strategic agility depends on integration capacity.** When a business needs to adopt a new capability — AI integration, real-time supply-chain telemetry, ESG reporting — its ability to do so is bounded by the integration architecture of its core systems. A business-outcome framework that does not engage with integration architecture cannot distinguish an "ERP problem" from a "change-management problem" in a domain where the two are inseparable.
- **Fiduciary exposure depends on data provenance.** SOX, HIPAA, GDPR, CMMC, and equivalent frameworks impose legal obligations whose satisfaction is technical (data lineage, access controls, retention policies, immutable audit trails). A CEO's fiduciary duty in these regimes cannot be discharged through business-outcome judgment alone — it requires that the underlying system architecture support the claims being audited.

An organization positioned as the CEO's authoritative reference on "business systems" that chooses not to engage with the technical architecture of those systems is choosing to address half of a coupled problem. The choice is defensible only if the coupling is acknowledged and the organization explicitly disclaims the technical half. No such disclaimer exists in IBSP materials; instead, the technical half is treated as out-of-scope in a way that implies the business half is meaningfully addressable without it.

**The structural problem is that this blind spot is self-concealing.** A board composed entirely of business-methodology consultants cannot recognize the technical-literacy gap in its own analysis because recognizing it requires the technical literacy the board does not have. This is a second-order epistemic problem, not a first-order preference:

1. **First-order:** The board declines to engage with technical architecture.
2. **Second-order:** The board does not recognize that declining to engage with technical architecture in this domain leaves the business-outcome analysis incomplete.
3. **Third-order:** The board cannot recognize (2) because doing so would require evaluating the technical-architecture arguments the board has already declared out-of-scope.

The 2026-04-24 evaluation documented in §1.3 provides direct evidence of this pattern. The candidate's argument centered on the schema-level coupling between data architecture and decision quality — a business-outcome argument whose mechanism is technical. The board's rejection reframed it as "real-time MRP and equipment connections," a manufacturing-execution topic whose coverage by existing MES systems is true but orthogonal. Substituting a different technical domain to dismiss a data-architecture argument is only possible for an evaluator who cannot distinguish the two. The category error is not incidental; it is diagnostic.

**Why this matters for IBSP's positioning.** The IBSP stated ambition is comparability to engineering and law as professions. Both of those professions require deep fluency in the technical substrate their practitioners work with — engineers understand materials and physics; lawyers understand doctrine and procedure. A profession that aspires to comparable authority in "business systems" cannot credibly declare the technical substrate of business systems out-of-scope. Doing so either reduces the field to management consulting (which already has its own institutional structures) or positions the IBSP as an authority on a domain it has structurally excluded itself from fully understanding.

**What would resolve this.** Either (a) the IBSP reframes its mission as explicitly covering only the non-technical half of the business-systems problem, with a clear statement that technical-architecture questions belong to a different profession — at which point its "business systems" positioning becomes "business-process consulting" and collapses into an existing field — or (b) the IBSP incorporates technical expertise into its board, its methodology, and its evaluation processes in a way that allows technical-business coupling to be analyzed on its merits. The current posture — claiming authority over business systems while structurally excluding the technical half — is not a stable position for an organization pursuing accreditation or gold-standard recognition.

**Source:** Direct statements by the IBSP President during 2026-04-24 candidacy meeting, reinforced by the post-call rejection pattern documented in §1.3.

### 4.4 The "ScrewFind Consultant" / "ScrewFind Instructor" Inversion

A recurring rhetorical figure in Robertson's writing is the **"ScrewFind ERP Consultant"** — the configuration-cleanup consultant whose business model depends on clients permanently failing to clean up their master data, ensuring recurring billable engagements to "unscramble" the same persistent messes. The figure recurs across his article series and is given a prominent role in the May 2026 *"Precision ERP Configuration© — Summing Up"* piece, where it is one of the core illustrations of the configuration problem and is used to vilify the configuration-cleanup consultancy industry as parasitic.

The structural inversion is unstated but visible in the same article. The "summing up" piece closes with two paid offerings:

- A **free 90-Minute Briefing** ("How to maximize ERP value") — the lead funnel
- A **Four-Day Practitioner Course** ("Turbocharging your ERP") at GBP £1,950 introductory fee, with group discounts and early-bird pricing available

**A note on what is and is not verifiable here.** The course landing page is a ScoreApp lead-capture funnel (`dr-james-a-robertson-four-day-course.scoreapp.com`), which gates scheduling and cohort information behind a contact form. Direct evidence of how the course is delivered — single rolling cohort, recurring scheduled cohorts, on-demand bookings, or some combination — is not publicly available without submitting contact information. The pricing language ("introductory fee," "early-bird," "group discount") is consistent with a scheduled-cohort program but does not by itself prove recurrence, and the section that follows is careful not to claim more than the visible evidence supports.

The mode of extraction is structurally similar to the pattern Robertson criticizes. The "ScrewFind ERP Consultant" gets paid by the engagement, and his revenue depends on the customer's master-data discipline failing to hold between visits. The "ScrewFind ERP Instructor" gets paid by the seat, and his revenue depends on the methodology being seen as something that requires his training apparatus to access — whether that's the same student attending repeatedly (demand-side recurrence) or a steady stream of new students paying to enter the methodology (supply-side recurrence). Either resolves to a continuing-education business model attached to a configuration methodology. The venue changes (job site → classroom); the practitioner-dependency does not.

The contradiction is not that Robertson sells paid education — paid education is a normal business. The contradiction is in the claim. Robertson's "Precision Gravity©" thesis holds that a precision-configured ERP exhibits a self-sustaining pull toward disciplined operation — that the configuration, once correct, holds. If that thesis were true, the natural commercial corollary would be that customer demand for the methodology decreases over time as customers internalize the discipline and the gravity holds them in place. The fact that the methodology is sold through a paid four-day course funneled by a free briefing — rather than, for example, an open-source body of knowledge or a published textbook with a one-time price — is the economic shape of an ongoing relationship, not a one-time intervention. A methodology that held under its own gravity would not need a paid practitioner-training apparatus; a methodology that does not hold (because it cannot, on substrate that does not enforce it) would.

This pattern is the §3.3 dynamic ("every diagnosis leads to the same prescription") elevated one level: every prescription requires the prescriber's continuing presence. §3.3 documents that the diagnostic framework is indistinguishable from the sales funnel. §4.4 documents that the prescriptive framework is indistinguishable from the practitioner-training apparatus.

The inversion matters specifically because it is the same critique Robertson levels at the consultancy industry. He has named the dependency pattern in others without recognizing it in his own positioning. A standards body whose founder sells a configuration methodology that requires the founder's training apparatus to access is not, structurally, distinguishable from the consultant-dependency model the founder spends his article series criticizing. The figure he uses to vilify the consulting industry — the practitioner whose revenue depends on the customer's failure to internalize the fix — describes the shape of his own business with the venue swapped.

**Source:** *"Precision ERP Configuration© — Summing Up,"* Dr. James A. Robertson, LinkedIn Pulse, May 2026. Course landing page (gated): `https://dr-james-a-robertson-four-day-course.scoreapp.com` (verified 2026-05-08, redirects to ScoreApp; cohort/scheduling information not publicly visible).

---

## 5. Structural Roadblocks to Accreditation and Industry Recognition

The IBSP's stated trajectory is toward becoming a recognized professional body comparable to "engineering and law." That language implies a specific institutional infrastructure — accreditation, published standards, credentialing exams, regulatory recognition — that the IBSP does not have and cannot acquire without fundamental structural changes. This section catalogs the specific roadblocks.

### 5.1 ANSI Accreditation as a Standards Developer (SDO)

ANSI accredits standards developing organizations under the ANSI Essential Requirements: Due Process Requirements for American National Standards. An SDO that achieves ANSI accreditation can publish documents as American National Standards, which carry weight in procurement, regulation, and industry practice. The requirements are not negotiable.

**ANSI Essential Requirements (summarized):**

| Requirement | What It Demands |
|-------------|-----------------|
| **Openness** | Participation shall be open to all persons materially and directly affected by the standard, without undue barriers. Membership cannot be by invitation. |
| **Lack of dominance** | The standards process shall not be dominated by any single interest, company, or individual. |
| **Balance** | Participation must reflect a balance of interests — producers, users, general-interest representatives. No category may exceed a majority. |
| **Due process** | Written procedures governing the methods for standards development, including notification, comment period, disposition of negative votes, and appeals. |
| **Consensus** | Substantial agreement by directly and materially affected interests. Consensus is more than concurrence; it requires resolution of all negative votes or documentation that they cannot be resolved. |
| **Public review** | Draft standards must be made available for public comment. |
| **Appeals** | A documented, accessible appeals process for any participant who believes the procedures were not followed. |
| **Audit** | ANSI audits accredited SDOs every five years against these requirements. |

**Where IBSP cannot currently meet these:**

1. **Openness:** Membership exists but is informal, unstructured, and invitation-adjacent. There is no application process, no membership roster, no dues-paying constituency, no mechanism by which a materially affected party (e.g., an SAP customer, a Salesforce partner, an Oracle developer) can participate in standards development as a matter of right.

2. **Lack of dominance:** The organization's president authored the methodology being codified. The "Documentation & Standards" and "Frameworks & Guidelines" board roles are tasked with codifying Robertson's existing work. A standards process in which the subject matter is the founder's consulting IP cannot satisfy lack-of-dominance, by definition.

3. **Balance:** The known board is composed of Robertson's professional network. No producers (ERP vendors), no users (customer IT organizations), no general-interest representatives (academics, consumer advocates, government) are publicly represented. Balance is not an optional feature of the process — it is a structural requirement that the current board composition actively fails.

4. **Due process:** No written procedures for standards development have been published. Foundational documents are circulated via Dropbox rather than published on an organizational website. There is no documented comment period, negative-vote disposition procedure, or appeals mechanism.

5. **Consensus:** There is no demonstrated consensus process because there is no multi-stakeholder constituency. A standard developed by a homogeneous working group is not a consensus standard; it is a group opinion.

6. **Public review:** The IBSP has not released draft standards for public comment because it has not developed standards at all — only foundational documents behind a Dropbox link.

7. **Audit readiness:** Every item above is auditable. The IBSP would fail an ANSI audit in its current form on at least six of the seven dimensions.

**Realistic timeline:** An organization starting from IBSP's current posture — no published standards, no documented procedures, no multi-stakeholder membership — typically requires five to ten years of sustained institutional investment to become ANSI-eligible. That investment includes a professional staff, legal counsel, documented governance, a funded membership program with balanced representation, a standards development committee structure with documented procedures, and an initial body of work that can be presented as developed through the process. The IBSP has none of these, and the founder-centric structure actively works against each of them.

**Source:** ANSI Essential Requirements: Due Process Requirements for American National Standards (current edition), https://www.ansi.org

### 5.2 ISO/IEC 17024 Accreditation as a Personnel Certification Body

ISO/IEC 17024 is the international standard for bodies operating certification of persons. It is the accreditation pathway that makes certifications like PMP, CISSP, and CCNA credible to employers and regulators. Accreditation is granted by national accreditation bodies that are IAF signatories — ANAB in the United States, UKAS in the United Kingdom, SANAS in South Africa.

**Key ISO/IEC 17024 requirements:**

| Requirement | What It Demands |
|-------------|-----------------|
| **Impartiality** | The certification body shall be structured to safeguard impartiality. Commercial, financial, or other pressures that could compromise impartiality must be documented and mitigated. |
| **Structural independence** | The certification body shall be independent of any training organization that delivers content for the certification. Same entity cannot both train and certify. |
| **Scheme committee** | A committee responsible for the certification scheme must include balanced representation from interested parties — candidates, employers, regulators, operators — and cannot be controlled by the certification body's management. |
| **Competency-based scheme** | The certification shall be based on a documented job task analysis, defined competencies, and criteria for evaluating those competencies. The body of knowledge must be developed through a defensible process. |
| **Exam validity** | Examinations must be developed using recognized psychometric methods. This includes item writing by qualified SMEs, item analysis, pretesting, cut-score setting by defensible method (modified Angoff is typical), and periodic equating. |
| **Management system** | Documented procedures, management review, internal audits, corrective action, record retention, financial controls. |
| **Appeals and complaints** | Documented process independent of the decision-makers whose decisions are being appealed. |
| **Surveillance and recertification** | Ongoing competency demonstration, not one-time certification. |

**Where IBSP cannot currently meet these:**

1. **Impartiality:** The IBSP president is the author of the methodology and the operator of a consulting practice that sells services based on that methodology. Certifying practitioners in that methodology would create a direct financial interest in both the certification revenue and the downstream demand for the founder's consulting. ISO/IEC 17024 requires this conflict be structurally eliminated, not just disclosed.

2. **Structural independence from training:** A legitimate certification body cannot also be the primary provider of training materials for the certification. The IBSP / The ERP Doctor dual identity means training, methodology authorship, and proposed certification all flow from the same source. This is prohibited by 17024.

3. **Scheme committee composition:** The scheme committee must be multi-stakeholder and cannot be controlled by the certification body's management. The current IBSP board does not meet this standard and is not structured to do so.

4. **Job task analysis:** No published job task analysis exists for "business systems practitioner." A defensible JTA requires surveying hundreds of practicing professionals across multiple industries and geographies, with statistical analysis of task frequency, criticality, and difficulty. This is a six-to-twelve-month funded research exercise before any exam development can begin.

5. **Psychometric exam development:** No exam exists, and developing one to 17024 standards typically costs $500K–$2M and requires two to three years. This includes hiring a credentialed psychometrician, recruiting SME item writers, pretesting with hundreds of candidates, conducting item analysis, setting defensible cut scores, and establishing exam equating procedures.

6. **Management system documentation:** Dropbox foundational documents are not a documented management system. 17024 requires a quality manual, documented procedures, records retention, and internal audits.

**Realistic timeline:** A new certification program built to 17024 standards takes three to five years from inception to first accredited credential, assuming consistent funding of at least $1M per year for staff, psychometric development, and accreditation fees. The IBSP has no apparent funding model at all — membership is free and non-credentialing.

**Source:** ISO/IEC 17024:2012, Conformity assessment — General requirements for bodies operating certification of persons

### 5.3 Structural Conflict: An SDO and a CB Cannot Be the Same Entity

Even if the IBSP could overcome the individual roadblocks to ANSI SDO accreditation *and* ISO/IEC 17024 CB accreditation, it cannot overcome both simultaneously as presently structured. The accreditation frameworks explicitly require structural separation between the organization that develops a standard and the organization that certifies persons or products against it. This separation exists to prevent the conflict of interest that arises when the same entity writes the test, grades the test, and sells the training for the test.

The IBSP's current posture — a founder-led group developing a methodology, training practitioners in that methodology, and proposing to certify practitioners against that methodology — is the exact conflict the separation rule was written to prevent. No accreditor operating under the ISO/IEC 17000 series or under ANSI's Essential Requirements would approve an entity that occupies all three roles. Resolving this would require spinning off the standards-development function, the training function, and the certification function into three legally and financially distinct organizations with separate governance, separate boards, and separate revenue streams. None of that infrastructure currently exists.

### 5.4 Roadblocks to "Gold Standard" Industry Recognition

Accreditation is necessary but not sufficient for a certification to become an industry "gold standard" (PMP, CISSP, CPA, PE, CFA). The additional requirements are market and institutional rather than procedural.

**What the gold standards share:**

| Attribute | PMP (PMI) | CISSP (ISC²) | CPA (AICPA/NASBA) | PE (NSPE/NCEES) |
|-----------|-----------|---------------|---------------------|------------------|
| Founded | 1969 | 1989 | 1887 | 1934 |
| Members / certified | 1.3M members, 1.2M PMPs | 170K+ CISSPs | 658K CPAs (US) | 335K PEs (US) |
| Independent governance | Yes, member-elected | Yes, member-elected | Yes, state boards + NASBA | Yes, state licensing + NCEES |
| Published body of knowledge | PMBOK (40+ years of revisions) | CBK (8 domains, peer-curated) | Uniform CPA Examination blueprint | NCEES FE/PE exam specifications |
| Psychometrically valid exam | Yes, 17024-accredited | Yes, 17024-accredited | Yes, extensive psychometric rigor | Yes, state-administered with NCEES |
| Regulatory / employer demand | Federal contracts, many employers | DoD 8570, federal CISO roles | Required by law to sign audits | Required by law to stamp engineering drawings |
| International reciprocity | Yes, via PMI chapters in 200+ countries | Yes, ISO/IEC 17024 + global recognition | Limited (IQEX) | Limited (state-by-state) |
| Financial independence from any single consultancy | Yes | Yes | Yes | Yes |
| Transparent finances | Yes, IRS Form 990 | Yes, IRS Form 990 | Yes, IRS Form 990 | Yes, IRS Form 990 |

**Where IBSP cannot currently meet these:**

1. **Time in existence.** The closest comparable body (ISC² for CISSP) took approximately 20 years from founding to general "gold standard" recognition. The IBSP is less than two years old as a named organization and has no published membership numbers.

2. **Independent governance.** Every gold-standard body has member-elected governance and term-limited leadership. The IBSP president is the founder, the methodology author, the primary instructor, and the commercial beneficiary — a governance concentration no accredited body tolerates.

3. **Published body of knowledge.** Gold standards rest on decades of iterative body-of-knowledge curation, revised through transparent expert panels, public comment, and empirical updating based on practice surveys. The IBSP's "body of knowledge" is Robertson's consulting methodology and a Dropbox folder.

4. **Regulatory or major-employer forcing function.** PE is legally required to stamp drawings. CPA is legally required to sign audits. CISSP is required for DoD 8570 roles. PMP is a common federal contracting requirement. No regulator, government body, or major employer requires IBSP membership or certification for any role, and there is no path by which one would. Without a forcing function, adoption plateaus at whoever the founder can personally persuade.

5. **Financial independence.** Every gold-standard body is a nonprofit with audited financials independent of any commercial consultancy. Robertson is the active principal of The ERP Doctor, a commercial consulting firm, while simultaneously serving as IBSP president. There is no financial separation visible, no IRS Form 990 equivalent, no disclosure of consulting revenue that depends on IBSP positioning.

6. **International reciprocity.** Gold-standard bodies negotiate reciprocity with national equivalents through formal mutual-recognition agreements (e.g., PMI chapter network, NCEES Model Law, IFAC for accountancy). The IBSP has no chapters, no national equivalents, and no reciprocity framework.

7. **Transparent practice surveys.** Each gold-standard body conducts periodic job-role studies, published statistically, to keep the body of knowledge current. The IBSP has published no practice survey data.

8. **Chapter / local presence.** PMI has 300+ local chapters. ISC² has 150+. These provide practitioner-level engagement, governance feedback, and professional development independent of the central body. The IBSP has none.

9. **Peer-reviewed research tradition.** Gold-standard bodies publish peer-reviewed journals (PMI's *Project Management Journal*, ISC²'s work with IEEE) that advance the field independent of any consulting practice. The IBSP has no publication program.

**What "gold standard" actually requires.** It requires an institution that, over decades, has separated itself so thoroughly from any individual's commercial interest that its positions carry the weight of accumulated professional judgment rather than the weight of its founder's opinions. The IBSP's entire architecture — founder as president, methodology as standard, consulting practice as beneficiary, Dropbox as archive — is structured to prevent that separation from ever occurring. Gold standard recognition is not a marketing goal to be pursued; it is the emergent property of institutions that gave up founder control decades ago.

### 5.5 Summary of Structural Roadblocks

| Target | Required | IBSP Status | Realistic Gap |
|--------|----------|-------------|---------------|
| ANSI-accredited SDO | Balanced multi-stakeholder membership, documented due process, published standards via public comment, lack of dominance | Founder-led, invitation-adjacent, Dropbox documents, single-author methodology | 5–10 years + substantial funding + structural reorganization |
| ISO/IEC 17024-accredited CB | Impartial governance, independent from training, multi-stakeholder scheme committee, JTA-based exam with psychometric validity | Same entity owns methodology, training, and proposed certification; no JTA, no exam, no psychometric infrastructure | 3–5 years + $1M+/year funding + legal separation from consulting practice |
| SDO + CB simultaneously | Legal and financial separation between standards-development and certification entities | All functions reside in one founder-led organization | Spin-off into three distinct legal entities with separate governance |
| Industry "gold standard" | Decades of independent governance, regulatory forcing function, peer-reviewed body of knowledge, financial transparency, international reciprocity | Founder-led, no regulatory adoption, no peer review, consulting-firm-adjacent, no chapters | 20+ years of institutional investment *after* the above structural changes |

The pattern across all four targets is the same. Every roadblock traces back to the founder-centric structure in which the IBSP president is simultaneously the methodology author, the commercial beneficiary, the primary trainer, and the proposed credentialing authority. No accreditation framework in the professional-body ecosystem tolerates this configuration, and no amount of additional board members, CPD meetings, or foundational documents will satisfy the requirements until the underlying structure is changed.

---

## 6. Strategic Relevance to Mimir Labs

### Why This Matters

If the IBSP were to become a recognized body in the ERP practitioner space, its methodology and positions would carry institutional weight. Robertson's current positions include:

- Advising clients to stay on unsupported legacy systems using legally dubious property rights arguments
- Promoting a proprietary methodology as the universal solution without independent validation
- Positioning himself as the sole authority within an organization he created and solely governs

If Mimir Labs or its customers are ever evaluated against IBSP "standards," it is important to establish that:

1. The IBSP is not a standards body — it has no standards development process and cannot currently qualify for ANSI accreditation under the Essential Requirements (see §5.1)
2. The IBSP is not a certification body — it has no body of knowledge, job task analysis, or psychometrically validated exam, and cannot currently qualify for ISO/IEC 17024 accreditation (see §5.2)
3. The IBSP's structural architecture prevents it from ever being both an SDO and a CB simultaneously (see §5.3)
4. The IBSP's methodology is unvalidated proprietary consulting IP, not an industry framework
5. The IBSP's President has made public technical and legal claims that do not withstand scrutiny
6. Claims of "gold standard" status or comparison to engineering/law as professions are not supported by the institutional infrastructure gold standards require (see §5.4)

### When to Use This Document

- If Robertson or the IBSP publicly criticizes Mimir Labs' approach
- If a prospect references IBSP "standards" as evaluation criteria
- If the IBSP attempts to establish itself as an accreditation or certification body
- If an investment or partnership due diligence references the IBSP

### How to Use This Document

Lead with facts, not attacks. Every entry in this document is sourced from Robertson's own public statements, published materials, and organizational presence (or lack thereof). The goal is not to discredit a person — it is to accurately represent the institutional credibility of an organization that presents itself as an authority.

---

## Appendix: Source Links

- [IBSP "Website" (ScoreApp under Robertson's name)](https://dr-james-a-robertson-ibsp.scoreapp.com) — Note the URL structure
- [LinkedIn: Dr James A Robertson](https://www.linkedin.com/in/drjamesarobertson/)
- [The ERP Doctor (primary site)](https://the-erp-doctor.com)
- [The ERP Doctor (.net site)](https://www.the-erp-doctor.net/about.aspx)
- [Who is Dr James Robertson?](https://the-erp-doctor.com/portfolio/who-is-dr-james-robertson-the-erp-doctor/)
- [Competencies](https://www.the-erp-doctor.net/About/CompetenciesofJamesRobertson.aspx)
- [Testimonials](https://www.the-erp-doctor.net/About/Testimonials.aspx)
- [Precision Configuration service page](https://the-erp-doctor.com/our-services/precision-erp-configuration/)
- ["Precision ERP Configuration© — Summing Up" (LinkedIn Pulse, May 2026)](https://www.linkedin.com/pulse/precision-erp-configuration-summing-up-dr-james-a-robertson-wstje/)

## Appendix: Evidence Log

| Date | Type | Summary | Source |
|------|------|---------|--------|
| Apr 2026 | LinkedIn post | "Right to Maintain and Repair" — applies physical property law to software licensing to advise against ERP upgrades | LinkedIn |
| Feb 2026 | Organizational | IBSP board elected; website is a ScoreApp page under Robertson's personal name | dr-james-a-robertson-ibsp.scoreapp.com |
| Ongoing | Methodology | Pitch materials use unsourced conceptual graphics presented as validated frameworks | the-erp-doctor.com, course materials |
| Ongoing | Positioning | Claims "THE thought leader... possibly worldwide" with ~500 LinkedIn connections and no industry conference presence | the-erp-doctor.net/about.aspx |
| Apr 2026 | Methodology | "Precision ERP Configuration" pitch uses fabricated weighted percentages (7×7 matrix) with no empirical basis, © symbols on non-copyrightable phrases, circular conclusion that ERP never needs replacement | Email pitch / course marketing |
| Apr 2026 | Governance | CEO-as-custodian-of-ERP advice ignores modern c-suite structure; "sloppy data entry is a disciplinary offense" listed as a "reward" | Email pitch / course marketing |
| Apr 2026 | Accreditation | IBSP structurally cannot qualify for ANSI SDO accreditation under the Essential Requirements (openness, balance, lack of dominance, due process, consensus, public review, appeals, audit) — fails on at least 6 of 7 dimensions | ANSI Essential Requirements |
| Apr 2026 | Accreditation | IBSP structurally cannot qualify for ISO/IEC 17024 CB accreditation — impartiality conflict (founder owns methodology + consulting practice), no separation from training, no scheme committee, no JTA, no psychometric exam | ISO/IEC 17024:2012 |
| Apr 2026 | Structural | IBSP cannot simultaneously be an SDO and a CB — accreditation frameworks require legal/financial separation between standards-development and certification functions | ANSI + ISO/IEC 17000 series |
| Apr 2026 | Gold-standard gap | IBSP fails on 9 of 9 attributes shared by PMP/CISSP/CPA/PE gold-standard bodies: time in existence, independent governance, published BOK, regulatory forcing function, financial independence, international reciprocity, practice surveys, chapters, peer-reviewed publications | Comparative analysis of PMI, ISC², AICPA/NASBA, NSPE/NCEES |
| 2026-04-24 | Evaluation process | Membership candidacy evaluated by a two-person panel (President + Vice President) — the same principals who author the methodology and control the board. No membership committee, no published criteria, no rotating participants | Direct observation, IBSP candidacy meeting |
| 2026-04-24 | Due process | Governing rejection critique raised privately after the candidate left the call; candidate had no opportunity to respond to the characterization that drove the decision. On-call discussion had VP agreeing with points later reframed and rejected in private | Direct observation, IBSP candidacy meeting |
| 2026-04-24 | Technical review | Candidate's schema-level data-architecture argument was reduced in post-call readout to "real-time MRP + equipment connections" (a different technical domain MES systems address), then rejected on the substituted framing. Category substitution as rejection mechanism | Direct observation, IBSP candidacy meeting |
| 2026-04-24 | Governance | Post-decision messaging diverged between President and Vice President: VP parked the application with a survey-contribution carve-out; President emailed the same day framing engagement as "partnership" and inviting contribution to "the Body of Knowledge." Two principals, two engagement paths, two channels | Direct observation + follow-up email from James Robertson |
| 2026-04-24 | Terminology | Follow-up email references "the Body of Knowledge" as an active project worth contributing to. §1.1 documents (Feb 2026) that IBSP has no body of knowledge; foundational documents remain on Dropbox. Either recent development, terminology inflation applied to existing Dropbox content, or aspirational framing | Follow-up email from James Robertson, 2026-04-24 |
| 2026-04-24 | Positioning | President's live-call statement that "IBSP focuses on business outcomes rather than technology" establishes the business-outcome/technology split as explicit organizational posture. Coupled with the §1.3 evaluation pattern (category substitution, rejection on a substituted technical framing), this is direct evidence of the technical-literacy deficit analyzed in §4.3 | Direct statement, 2026-04-24 IBSP candidacy meeting |
| 2026-04-24 | Doctrine | President's claim that "in 40 years as a practitioner, not once did an ERP problem present with a technical issue at its root" — root causes were always executive ownership, change management, chart-of-accounts, etc. Universal-negative claim that is unfalsifiable as stated, indistinguishable from selection bias, structurally incompatible with documented post-2015 enterprise failure literature, and exactly the finding the methodology is designed to produce. Analyzed in §3.4 | Direct statement, 2026-04-24 IBSP candidacy meeting |
| 2026-05-08 | Methodology + Positioning | "Precision ERP Configuration© — Summing Up" article published. Sharpest articulation to date of Robertson's thesis: *"an ERP is fundamentally a precision data-processing machine, and the value derived from that machine is determined primarily by the quality and discipline of its configuration architecture rather than by the software brand itself."* Closes with paid funnel: free 90-Minute Briefing → £1,950 Four-Day Practitioner Course (introductory fee, group + early-bird discounts). Course landing page is a ScoreApp lead-capture funnel; cohort/scheduling information is not publicly visible (verified 2026-05-08). The pricing language is consistent with a scheduled-cohort program but recurrence is not directly verifiable from public sources. The structural critique in §4.4 holds either way: a configuration methodology sold through a paid practitioner-training apparatus runs the same dependency dynamic Robertson criticizes in the "ScrewFind ERP Consultant" figure used throughout the article series — venue swapped (classroom for job site), extraction model unchanged | LinkedIn Pulse, https://www.linkedin.com/pulse/precision-erp-configuration-summing-up-dr-james-a-robertson-wstje/ |

---

*Last updated: May 2026*
*Maintained by: Mimir Labs — Internal Use Only*
