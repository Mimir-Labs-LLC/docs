# Research Notes — Academic Literature on ERP Architectural Failure Modes

**Compiled:** 2026-05-01
**Purpose:** Source verification for position paper on ERP architectural failure modes — Sections 1 (Introduction), 4 (Harm Assessment), 6 (Discussion).
**Method:** Web search via Anthropic-permitted search APIs. Direct PDF fetching was disabled in the research environment, so quotes drawn from full-text PDFs reflect what surfaced in indexed search snippets, secondary sources (review articles, citation pages, course-material excerpts), and abstracts. Items where the original full text could not be independently inspected are flagged accordingly.

---

## Section A — Foundational IS/MIS Literature on ERP Failure Modes

### A1. Davenport, T. H. (1998) — "Putting the Enterprise into the Enterprise System"

**Verified citation:**
Davenport, T. H. (1998). Putting the Enterprise into the Enterprise System. *Harvard Business Review*, 76(4) [July–August 1998], 121–131.

**Verification status:** Citation fully confirmed across multiple independent indexes (HBR.org, ACM Digital Library DOI, PubMed PMID 10181586, Semantic Scholar, ScieRP). Article exists, attribution and pagination consistent across sources.

**URLs:**
- HBR canonical (paywalled): https://hbr.org/1998/07/putting-the-enterprise-into-the-enterprise-system
- ACM Digital Library record: https://dl.acm.org/doi/10.5555/280994.280995
- PubMed: https://pubmed.ncbi.nlm.nih.gov/10181586/
- Semantic Scholar: https://www.semanticscholar.org/paper/Putting-the-enterprise-into-the-enterprise-system.-Davenport/3e7bf1c10181e243d5f4a69c4b845a2bdddf434a
- Open-access PDF mirror (DePaul course materials): http://facweb.cs.depaul.edu/jnowotarski/is425/hbr%20enterprise%20systems%20davenport%201998%20jul-aug.pdf
- Article summary (MAAW.info): https://maaw.info/ArticleSummaries/ArtSumDavenport98.htm

**Access:** HBR-paywalled at the canonical URL; an open PDF copy is hosted by DePaul's CS faculty web for course use. PubMed and ACM provide bibliographic records but not full text.

**Canonical thesis quote (verified across multiple secondary citations):**
> "An enterprise system, by its very nature, imposes its own logic on a company's strategy, organization, and culture."

This is the most-cited single sentence from the article and appears verbatim in dozens of downstream IS papers and HBR-derived course materials. (Quote consistent across indexed search results; not independently verified by reading the original PDF in this session — direct PDF fetch was blocked.)

**Secondary supporting quote (from indexed summaries):**
> Enterprise systems are "off-the-shelf solutions that impose their own logic on a company's strategy, culture, and organization, often forcing companies to change the way they do business." (Paraphrase appearing in MAAW summary and ScieRP citation page; reflects Davenport's argument but is the summarizer's wording, not Davenport's.)

**Use in paper:** Canonical statement that ERP forces the business to fit the system, not vice versa. Most-cited single source in the IS literature on this specific claim.

---

### A2. Markus, M. L., & Tanis, C. (2000) — "The Enterprise System Experience — From Adoption to Success"

**Verified citation:**
Markus, M. L., & Tanis, C. (2000). The Enterprise System Experience — From Adoption to Success. In R. W. Zmud (Ed.), *Framing the Domains of IT Research: Glimpsing the Future Through the Past* (Chapter 10, pp. 173–207). Cincinnati, OH: Pinnaflex Educational Resources Inc.

**Verification status:** Book chapter confirmed via multiple independent indexes (ScieRP, BibSonomy, ResearchGate, Academia.edu, Cambridge Core for related Markus et al. JIT 2000 article). Title commonly appears as both "The Enterprise System Experience" and "The enterprise systems experience" in citations — the singular "system" matches the original chapter title in Zmud's edited volume.

**URLs:**
- BibSonomy bibliographic record: https://www.bibsonomy.org/bibtex/2296d61b9071a0ec09671b69b6ecea668/stefan.strecker
- Academia.edu copy: https://www.academia.edu/24883096/The_Enterprise_System_Experience_From_Adoption_to_Success
- ResearchGate: https://www.researchgate.net/publication/313183030_The_enterprise_system_experience-from_adoption_to_success
- Open PDF copy (UNIBZ Italy): http://pro.unibz.it/staff/ascime/documents/erp%20paper.pdf
- Companion article (peer-reviewed, complementary): Markus, M. L., Axline, S., Petrie, D., & Tanis, C. (2000). Learning from Adopters' Experiences with ERP: Problems Encountered and Success Achieved. *Journal of Information Technology*, 15(4), 245–265. https://journals.sagepub.com/doi/10.1177/026839620001500402

**Access:** The Pinnaflex volume is out of print and hard to obtain. Open-access PDFs of the chapter circulate via academia.edu and UNIBZ. The companion JIT article (Markus, Axline, Petrie, Tanis 2000) is widely cited as a peer-reviewed surrogate for the same empirical material.

**Staged ERP-experience model (verified):**
The four-phase model is Markus & Tanis's signature contribution, corroborated across multiple secondary sources:
1. **Project chartering** — decisions leading up to project approval and funding (vendor selection, business-case development, scope/methodology decisions)
2. **The project** — activities to get the system live in one or more organizational units (configuration, data migration, testing, training, go-live)
3. **Shakedown** — period from "going live" until "normal operation" or "routine use" is achieved (stabilization, defect resolution, productivity dip recovery)
4. **Onward and upward** — stable post-implementation operation, continuous improvement, system extension, ROI realization

**Key conceptual contribution:** The model is explicitly **iterative** — Markus & Tanis reject the assumption that ERP implementation "ends" at go-live or even at first stable operation. The chapter also emphasizes that "success" is multi-dimensional and stakeholder-dependent (the empirical study covered 16 ERP-adopting organizations).

**Note:** I did not find a verbatim block quote from the original chapter in indexed snippets; the model summary above is reconstructed from consistent paraphrase across multiple secondary sources. Treat the four phase names as canonical (they appear in the chapter's own framework table). Treat any longer quotation as needing direct verification against the PDF.

---

### A3. Strong, D. M., & Volkoff, O. (2010) — "Understanding Organization-Enterprise System Fit"

**Verified citation:**
Strong, D. M., & Volkoff, O. (2010). Understanding Organization–Enterprise System Fit: A Path to Theorizing the Information Technology Artifact. *MIS Quarterly*, 34(4), 731–756.

**Verification status:** Fully confirmed via the journal's own catalog (MISQ at U. Minnesota), AIS Electronic Library, ACM DL, Semantic Scholar.

**URLs:**
- MIS Quarterly canonical: https://misq.umn.edu/misq/article/34/4/731/513/Understanding-Organization-Enterprise-System-Fit-A
- AIS Electronic Library: https://aisel.aisnet.org/misq/vol34/iss4/8/
- ACM DL: https://dl.acm.org/doi/10.5555/2017496.2017501
- Open PDF copy (Academia.edu): https://www.academia.edu/7553372/Strong_and_Volkoff_Organization_Enterprise_System_Fit_UNDERSTANDING_ORGANIZATION_ENTERPRISE_SYSTEM_FIT_A_PATH_TO_THEORIZING_THE_INFORMATION_TECHNOLOGY_ARTIFACT_1_By
- Semantic Scholar: https://www.semanticscholar.org/paper/Understanding-Organization-Enterprise-System-Fit:-A-Strong-Volkoff/83957295922a1c610d10538a4e74c1c1bce0c36e

**Access:** MISQ is paywalled at the canonical URL. An open-access PDF is available via Academia.edu. AIS Electronic Library record is open but the full text requires AIS membership.

**Six misfit domains (verified across multiple secondary sources):**
1. **Functionality** — what the system can do
2. **Data** — what data the system captures and how
3. **Usability** — how users interact with the system
4. **Role** — how the system structures who does what
5. **Control** — how the system enforces process discipline and authorization
6. **Organizational culture** — alignment (or not) with organizational norms and values

Within each of the six domains, two **types** of misfit:
- **Deficiencies** — "the system lacks features or possibilities for user action due to missing functionalities, data fields, or control points" (paraphrase from indexed secondary source)
- **Impositions** — "the system has built-in characteristics that impose work practices, which might be contrary to organisational norms and practices, or negatively affect organisational performance" (same source)

These map onto two types of fit the authors define:
- **Fit as coverage** — degree to which the system covers what the organization needs
- **Fit as enablement** — degree to which the system actively enables (rather than constrains) desired work

**Workaround behavior (verified):** Strong & Volkoff explicitly identify all six domains as sites where workarounds emerge to address misfits. The paper is foundational for the IS-literature treatment of ERP workarounds as systematic responses to architectural misfit, not user error.

**Method:** Three-year qualitative field study of an ERP implementation, framed by critical realism.

**Caveat:** The deficiency/imposition definitions above are paraphrases from indexed secondary review papers, not verbatim quotes from the Strong & Volkoff text. The six domain names and the two-type taxonomy are well-confirmed and citable directly.

---

### A4. Wand, Y., & Wang, R. Y. (1996) — "Anchoring Data Quality Dimensions in Ontological Foundations"

**Verified citation:**
Wand, Y., & Wang, R. Y. (1996). Anchoring Data Quality Dimensions in Ontological Foundations. *Communications of the ACM*, 39(11), 86–95. DOI: 10.1145/240455.240479

**Verification status:** Fully confirmed via ACM Digital Library (with DOI), Semantic Scholar, Google Scholar, researchr.

**URLs:**
- ACM Digital Library (canonical, with DOI): https://dl.acm.org/doi/10.1145/240455.240479
- ACM Open PDF: https://dl.acm.org/doi/pdf/10.1145/240455.240479
- Semantic Scholar: https://www.semanticscholar.org/paper/Anchoring-data-quality-dimensions-in-ontological-Wand-Wang/d1b5a611f4a0519d3b46e012afa362f2bafb5ab2
- researchr: https://researchr.org/publication/WandW96
- Google Scholar lookup: https://scholar.google.com/scholar_lookup?title=Anchoring+data+quality+dimensions+in+ontological+foundations&publication_year=1996&journal=Communications+of+the+ACM&pages=86-95&doi=10.1145/240455.240479

**Access:** ACM DL hosts an open PDF for this article; freely downloadable.

**Ontological framework (verified):**
Wand & Wang ground data quality in four assumptions about how information systems (IS) represent real-world systems (RW):
1. ISs **can** represent RWs.
2. IS design is based on **interpretation** of RWs.
3. Users **infer** a view of RWs from the IS representation.
4. Only issues related to the **internal view** are part of the model (i.e., the framework focuses on representational mappings, not external validity).

**Intrinsic data quality dimensions (verified):**
From the four assumptions, they derive four intrinsic dimensions: data should be **complete, unambiguous, meaningful, and correct**. The corresponding deficiencies are:
- **Incompleteness** — RW state has no representation in IS
- **Ambiguity** — IS state could correspond to multiple RW states
- **Meaninglessness** — IS state corresponds to no RW state
- **Redundancy / incorrect mapping** — multiple IS states map to one RW state, or the mapping is broken

This ontological-deficiency taxonomy is the foundational reference for "data quality as a property of the representation" in the IS literature, distinct from the Wang & Strong (1996) consumer-perception taxonomy ("Beyond Accuracy," JMIS 12(4)) that is often cited alongside it. The two are complementary, not duplicative — Wand & Wang is the **systems** view, Wang & Strong is the **consumer** view.

**Caveat:** The exact deficiency labels above ("incomplete, ambiguous, meaningless, redundant") match the standard secondary-literature paraphrase. The ACM PDF should be inspected directly to confirm the exact term Wand & Wang use for what is sometimes paraphrased as "redundant" — some review papers use "incorrect" or "meaningless" labels with overlapping definitions. The four-deficiency structure is well-confirmed; the labels carry small terminological variation across reviewers.

---

### A5. Boudreau, M.-C., & Robey, D. (2005) — "Enacting Integrated Information Technology"

**Verified citation:**
Boudreau, M.-C., & Robey, D. (2005). Enacting Integrated Information Technology: A Human Agency Perspective. *Organization Science*, 16(1), 3–18. DOI: 10.1287/orsc.1040.0103

**Verification status:** Fully confirmed via INFORMS PubsOnline (publisher), ACM DL, RePEc, ResearchGate, Semantic Scholar.

**URLs:**
- INFORMS canonical (publisher, paywalled): https://pubsonline.informs.org/doi/10.1287/orsc.1040.0103
- ACM DL: https://dl.acm.org/doi/abs/10.1287/orsc.1040.0103
- RePEc: https://ideas.repec.org/a/inm/ororsc/v16y2005i1p3-18.html
- Semantic Scholar: https://www.semanticscholar.org/paper/Enacting-Integrated-Information-Technology:-A-Human-Boudreau-Robey/2516a5b9624b36d91ade40880b9e66ccd4f389ad
- ProQuest open-view: https://www.proquest.com/openview/6884853aff324ce9cf404ca693e7d4d9/1?pq-origsite=gscholar&cbl=11921

**Access:** INFORMS-paywalled at canonical URL. ProQuest may provide institutional access.

**Key findings (verified through multiple secondary sources):**
Interpretive case study of an ERP system after its implementation in a large U.S. government agency. Key empirical pattern:
- **Inertia** — users initially chose to **avoid using** the new ERP system as much as possible.
- **Reinvention** — users later worked around system constraints in **unintended ways**.

**Theoretical contribution:** The change from inertia to reinvention is explained via the concept of **improvised learning**, motivated by social influence from project leaders, "power users," and peers.

**Headline conclusion (paraphrased from secondary sources):**
> "An integrated technology like ERP, which potentially represents a 'hard' constraint on human agency, can be resisted and reinvented in use."

This is the canonical Boudreau & Robey claim cited in the workaround literature: ERP is not deterministic — the same packaged system produces different enacted realities depending on user agency, peer influence, and improvised learning.

**Use in paper:** Pairs naturally with Strong & Volkoff (2010) — Strong & Volkoff theorize the **structural** sources of misfit; Boudreau & Robey document the **agentic** response (avoidance → reinvention) when users encounter those misfits in practice.

**Caveat:** Specific quotes ("inertia," "reinvention," "improvised learning") are confirmed as the paper's own terminology via consistent appearance in citing literature, but the longer block quote above is a secondary-source paraphrase, not verified verbatim.

---

### A6. Soh, C., Kien, S. S., & Tay-Yap, J. (2000) — "Cultural Fits and Misfits: Is ERP a Universal Solution?"

**Verified citation:**
Soh, C., Sia, S. K., & Tay-Yap, J. (2000). Enterprise Resource Planning: Cultural Fits and Misfits: Is ERP a Universal Solution? *Communications of the ACM*, 43(4), 47–51. DOI: 10.1145/332051.332070

**Verification status:** Fully confirmed via ACM DL (with DOI), CACM journal page, Semantic Scholar, Gale Academic OneFile.

**Note on author name:** The original paper lists the second author as "Sia Siew Kien" — common citations abbreviate this as either "Sia, S. K." or "Kien, S. S." (treating "Sia" as a family name vs. "Kien" as a personal name with "Sia Siew" as a compound family name). Both forms appear in the IS literature; the ACM DOI page lists "Christina Soh, Sia Siew Kien, Joanne Tay-Yap" as the canonical author block.

**URLs:**
- ACM DL canonical (with DOI): https://dl.acm.org/doi/10.1145/332051.332070
- ACM open PDF: https://dl.acm.org/doi/pdf/10.1145/332051.332070
- CACM Research page: https://cacm.acm.org/research/enterprise-resource-planning-cultural-fits-and-misfits/
- Semantic Scholar: https://www.semanticscholar.org/paper/Enterprise-resource-planning:-cultural-fits-and-is-Soh-Kien/cc6ad0a61342b2cc746d4c557301860fccb17e06
- Gale Academic OneFile: https://go.gale.com/ps/i.do?id=GALE%7CA61792753&sid=googleScholar&v=2.1&it=r&linkaccess=abs&issn=00010782&p=AONE&sw=w&userGroupName=anon~f5f234a9

**Access:** ACM DL has an open PDF available.

**Three-category misfit taxonomy (verified):**
Soh, Sia & Tay-Yap clustered observed ERP misfits into three broad categories:
1. **Data misfits** — incompatibilities between organizational requirements and the ERP package in terms of **data format**, or the **relationships among entities** as represented in the underlying data model.
2. **Functional (process) misfits** — incompatibilities in the **processing procedures** required.
3. **Output misfits** — incompatibilities in the **presentation format and output information content**.

**Cultural argument (verified):**
The paper's central thesis is that the misfit problem is **worse in Asia** because ERP business models reflect **European or U.S. industry practices** that evolved in different cultural, economic, and regulatory contexts than Asian organizations operate in. The Western embedded business assumptions therefore force Asian adopters into more aggressive customization — or into accepting workflows that don't match their actual operating reality.

**Use in paper:** Predates Strong & Volkoff (2010) by a decade and provides the simpler, more accessible three-category misfit taxonomy that is often used as the entry point to ERP-misfit literature. Pair Soh et al. (process/data/output) with Strong & Volkoff (six domains) to show the literature progressed from coarse to fine-grained misfit categorization.

---

### A7. Ifinedo, P., & Nahar, N. — ERP Success Factor Literature

**Verified citation (best-confirmed item):**
Ifinedo, P., & Nahar, N. (2007). ERP Systems Success: An Empirical Analysis of How Two Organizational Stakeholder Groups Prioritize and Evaluate Relevant Measures. *Enterprise Information Systems*, 1(1), 25–48.

**Verification status:** Confirmed via ScieRP citation page and Wikidata (Q110038610). DOI not surfaced in this search session — the paper exists but the DOI should be looked up directly via the Taylor & Francis catalog or Wikidata before citation.

**URLs:**
- ScieRP citation: https://www.scirp.org/reference/referencespapers?referenceid=3845595
- Wikidata: https://www.wikidata.org/wiki/Q110038610
- Open PDF (Academia.edu): https://www.academia.edu/20387581/Enterprise_resource_planning_systems_success_assessment_an_integrative_framework

**Key contribution (verified):** Extended the DeLone & McLean IS Success Model for the ERP context by adding **workgroup impact** and **vendor/consultant quality** as success dimensions not previously captured. Their framework identifies five dimensions:
1. System quality
2. Information quality
3. Individual impact
4. Workgroup impact
5. Organizational impact

**Empirical finding (paraphrase from secondary sources):** Business managers and IT professionals largely **agree** on ERP success dimensions, challenging earlier IS literature claims that the two stakeholder groups would diverge by hierarchy or occupation.

**Caveat — "various":** Ifinedo and Nahar have published several joint and separate papers on ERP success factors. The 2007 EIS paper above is the most-cited single joint work. Other Ifinedo papers on ERP success worth checking if you need broader CSF coverage:
- Ifinedo, P. (2008). Impacts of business vision, top management support, and external expertise on ERP success. *Business Process Management Journal*, 14(4), 551–568.
- Ifinedo, P. (2007). Interactions between organizational size, culture, and structure and some IT factors in the context of ERP success assessment: An exploratory investigation. *Journal of Computer Information Systems*, 47(4).

Searches did not surface a single canonical "Ifinedo and Nahar" review paper on ERP **failure** factors — their joint work is on success measurement, not failure analysis. If the position paper needs a critical-success-factor (CSF) **failure**-side citation, consider also:
- Holland, C. P., & Light, B. (1999). A Critical Success Factors Model for ERP Implementation. *IEEE Software*, 16(3), 30–36.
- Nah, F. F.-H., Lau, J. L.-S., & Kuang, J. (2001). Critical factors for successful implementation of enterprise systems. *Business Process Management Journal*, 7(3), 285–296.

---

## Section B — Auditor / SOX / Financial-Control Literature

### B1. PCAOB Inspection Reports — 2024 Cycle

**PCAOB 2024 inspection program scope:**
- 171 PCAOB-registered firms inspected
- Over 800 public-company audits reviewed
- Inspection results posted in record time (Feb–May 2025 for 2024 inspections)

**Headline deficiency rates (2024 inspections):**
- **Big Four** firms: 20% deficiency rate (Part I.A) — improvement vs. prior year
- **Six global network firms** (broader category): 26% in 2024
- **Triennially-inspected non-affiliated firms (NAF)**: decreased from 67% (2023) to 61% (2024)
- **Triennially-inspected global network firms (GNF)**: decreased from 35% (2023) to 26% (2024)
- **"Next Eight" annually-inspected mid-tier firms**: 52% of inspected engagements had one or more Part I.A deficiencies

**Most frequently identified Part I.A deficiency areas (2024):**
- Revenue and related accounts (substantive testing of revenue, esp. multi-element arrangements)
- Inventory (substantive testing of valuation)
- Business combinations (testing of fair-value data used by company specialists)
- IT access controls and security (per Protiviti SOX cross-reference, this is also the most-cited control deficiency area in SOX programs)

**Verified URLs:**
- PCAOB 2024 inspection summary news release: https://pcaobus.org/news-events/news-releases/news-release-detail/pcaob-posts-report-detailing-significant-improvements-across-largest-firms--alongside-inspection-results-in-record-time
- PCAOB 2024 Spotlight (March 2025): https://pcaobus.org/documents/staff-update-2024-inspection-activities-spotlight.pdf
- PCAOB Firm Inspection Reports index: https://pcaobus.org/oversight/inspections/firm-inspection-reports
- PwC 2024 inspection report (Feb 26, 2025): https://assets.pcaobus.org/pcaob-dev/docs/default-source/inspections/documents/104-2025-040-pwc.pdf?sfvrsn=4b65b4c9_2
- KPMG 2024 inspection report (Feb 26, 2025): https://assets.pcaobus.org/pcaob-dev/docs/default-source/inspections/documents/104-2025-039-kpmg.pdf?sfvrsn=d1e6a070_2
- Grant Thornton 2024 inspection report (Feb 26, 2025): https://assets.pcaobus.org/pcaob-dev/docs/default-source/inspections/documents/104-2025-038-gt.pdf
- RSM US 2024 inspection report (May 22, 2025): https://assets.pcaobus.org/pcaob-dev/docs/default-source/inspections/reports/documents/104-2025-100-rsm.pdf?sfvrsn=64d5f47a_2
- AS 2201 (the audit standard for ICFR): https://pcaobus.org/oversight/standards/auditing-standards/details/AS2201
- NYSSCPA summary article: https://www.nysscpa.org/news/publications/the-trusted-professional/article/pcaob-inspection-reports-show-increase-in-audit-deficiencies-by-big-four-firms-022924
- CFO Dive coverage: https://www.cfodive.com/news/pcaob-deficiencies-rise-reports-audit-firms-accounting-accountants-audits/724499/
- Audit Update commentary: https://www.auditupdate.com/post/how-the-pcaob-staff-sees-the-2024-inspection-results
- CPA Journal 15-year retrospective (Jan 2026): https://www.cpajournal.com/2026/01/05/insights-from-fifteen-years-of-pcaob-inspections/

**Caveat on "ERP-specific" framing:** PCAOB inspection reports do not categorize deficiencies by ERP-vs-non-ERP environment. The position paper cannot directly cite a PCAOB statistic of the form "X% of audits at companies with major ERP deployments had material weaknesses." That cut would need to be made via Audit Analytics (Section B3 below) or via academic accounting research that joins ERP-implementation data to MW disclosures (Morris 2011, Section B4).

What PCAOB **does** support directly: that 20%+ of Big Four audits have at least one significant identified deficiency, and that the most-cited deficiency areas (revenue, inventory) overlap precisely with the modules where ERP architectural failure modes (data-flow gaps, control-bypass workarounds) most often manifest.

---

### B2. Big Four / Industry SOX Reports

#### B2a. Protiviti SOX Compliance Surveys

**Verified citations:**
- Protiviti (2024). *Empowering the Progress of SOX Innovation With Analytics and Automation* (2024 SOX Compliance Survey). https://www.protiviti.com/sites/default/files/2024-08/empowering-sox-innovation-protiviti_global.pdf
- Protiviti (2023). *The Evolution of SOX: Tech Adoption and Cost Focus Amid Business Changes, Cyber and ESG Mandates*. https://www.protiviti.com/sites/default/files/2023-09/2023-sox-compliance-survey-protiviti.pdf
- Protiviti (2022). *SOX Compliance Amid Rising Costs, Labour Shortages and Disruption*. https://www.protiviti.com/sites/default/files/2022-10/protiviti_2022-sox-compliance-survey_global.pdf
- Protiviti (2019). *Benchmarking SOX Costs, Hours and Controls*. https://www.protiviti.com/sites/default/files/2022-06/2019_sarbanes-oxley_compliance_survey-protiviti.pdf

**Headline 2024 findings:**
- SOX compliance internal costs increased over the prior two years.
- Cost ranges: $181,300 (small firms) to over $2 million (large companies) annually.
- Only **~1 in 3** organizations is using enabling technology to manage SOX compliance.
- Only **~1 in 5** poll participants have high confidence they possess the analytics/automation skills needed.
- **IT access controls and security** is the most-cited area for control challenges and deficiencies — directly relevant to ERP-architectural argument.
- About **20–25% of U.S. companies** report at least one material weakness each year (figure has fluctuated little in recent years).

**Other Big Four SOX/ICFR resources surfaced:**
- Deloitte DART — *Guide for Management — Next Steps After Identifying a Deficiency in Internal Control Over Financial Reporting* (Oct 2024): https://dart.deloitte.com/USDART/home/publications/deloitte/icfr/evaluate-remediate-internal-control-deficiencies-material-weakness-significant-deficiency
- Deloitte — *Enhancing internal controls amid compliance trends*: https://www.deloitte.com/us/en/services/audit-assurance/blogs/accounting-finance/internal-controls.html
- Deloitte DART — *3.6 Internal Control Over Financial Reporting* (SEC Comment Letter Roadmap): https://dart.deloitte.com/USDART/home/publications/deloitte/additional-deloitte-guidance/roadmap-sec-comment-letter-considerations/chapter-3-sec-disclosure-topics/3-6-internal-control-over-financial
- EY — *Global Audit Quality Report* (June 2024): https://www.ey.com/en_ae/insights/assurance/global-audit-quality-report
- Moss Adams — *Trends in Public Company Material Weaknesses* (June 2025), useful aggregation of recent SEC data: https://www.mossadams.com/articles/2025/06/trends-in-public-company-material-weaknesses
- CFGI — *CFO's Guide to Significant Deficiencies and Material Weaknesses*: https://www.cfgi.com/resources/articles/cfos-guide-to-significant-deficiencies-and-material-weaknesses/

**Verification status:** All Protiviti report URLs resolve to the Protiviti CDN-hosted PDFs and are openly downloadable. Deloitte/EY reports verified via publisher-hosted pages. Headline statistics drawn from Protiviti's own published numbers (paraphrase from search-indexed snippets, not direct PDF inspection).

**Caveat:** Protiviti is not "Big Four" — it's an internal-audit/risk-consulting firm spun out of Arthur Andersen's pre-collapse internal audit practice and is now owned by Robert Half. It is, however, the most-cited single source of multi-year SOX cost/effort benchmarking statistics in the practitioner literature, and its annual survey is the de facto industry baseline. Big Four firms generally publish narrative ICFR guides (above) rather than statistical compliance benchmarks.

#### B2b. Glass Lewis on Accounting Errors

- Glass Lewis (2025). *Why Are Accounting Errors on the Rise at U.S. Public Companies?* https://www.glasslewis.com/why-are-accounting-errors-on-the-rise-at-u-s-public-companies/

Useful current-trend piece for the harm-assessment section if the paper wants to argue that despite SOX maturity, error rates are not monotonically improving.

---

### B3. Audit Analytics / Ideagen Restatement Database

**Verified product:** Ideagen Audit Analytics — Financial Restatements database (covers all SEC registrants with restatements since Jan 1, 2000).

**URLs:**
- Database product page: https://www.ideagen.com/solutions/audit-and-risk/external-audit/ideagen-audit-analytics/database-modules/financial-restatements
- 2023 Restatements Report: https://www.ideagen.com/resources/whitepapers/2023-restatements-report
- 2020 Twenty-Year Review (PDF, free): https://www.auditanalytics.com/doc/2020_Financial_Restatements_A_Twenty-Year_Review.pdf
- Audit Analytics blog ("Predicting Material Weakness"): https://blog.auditanalytics.com/predicting-material-weakness/
- IAS Plus coverage of 2023 annual study: https://www.iasplus.com/en-ca/news/assurance/2024/ideagen-audit-analytics-released-annual-study-of-financial-restatements
- WRDS (Wharton) one-sheet on Audit Analytics holdings: https://wrds-www.wharton.upenn.edu/documents/1446/AuditAnalytics_one_sheet_fWYjzwb.pdf
- Substack analytical commentary (Deep Quarry, 2024–2025): https://deepquarry.substack.com/p/the-resurgence-of-restatements-is

**Headline 2024 statistics (from search-indexed coverage):**
- Total restatements: **479 in 2024** vs. 434 in 2023 (~10% YoY increase).
- **Big R restatements** (material — undermine reliance on prior financials): at a **9-year high**.
- **45%** of 2024 restatements were filed by **non-accelerated filers**.
- Accelerated-filer share of restatements: 5% (2021 historic low) → 20% (2024).
- Material-weakness adverse-reporting rate: declined to **just over 15%** in 2024 (from a 26%+ spike in 2021 driven largely by SPAC-debut companies).
- Note: 41 of the 2024 restatements were attributable to former clients of BF Borgers (a single auditor's collapse).

**PCAOB-published surrogate (free):**
- PCAOB Staff Publication: *Data Points — Financial Restatements and Auditor Turnover*: https://pcaobus.org/resources/staff-publications/data-points/data-points--financial-restatements-and-auditor-turnover

**Academic paper using Audit Analytics restatement data and IT controls:**
- *Information technology internal control material weaknesses in financial reporting: Categories, trends, associations, and industry effects* (ScienceDirect, 2024 author manuscript): https://www.sciencedirect.com/science/article/am/pii/S1467089524000125 (paywalled abstract version: https://www.sciencedirect.com/science/article/abs/pii/S1467089524000125)

**Caveat on access:** The Audit Analytics database itself is paywalled (institutional licenses through WRDS). The annual restatement and SOX 404 reports are sometimes released as free downloadable PDFs; other times they are gated behind a registration form. The 2020 Twenty-Year Review PDF is openly downloadable; the 2024 equivalent appears to be available via the Ideagen website on registration.

**Caveat on attribution:** The 2024 statistics surfaced via search-indexed press coverage (CFO Dive, Substack analyses, IAS Plus) and an FT-cited dataset — not directly verified against the source PDF in this session. Any paper citing these figures should verify against the Ideagen 2024 PDF before final submission.

---

### B4. Academic Accounting Literature on ERP and Material Weakness

#### B4a. Morris (2011) — The Original ERP-vs-MW Empirical Study

**Verified citation:**
Morris, J. J. (2011). The Impact of Enterprise Resource Planning (ERP) Systems on the Effectiveness of Internal Controls over Financial Reporting. *Journal of Information Systems*, 25(1), 129–157. (American Accounting Association)

**URLs:**
- AAA Meridian (publisher canonical, paywalled): https://meridian.allenpress.com/jis/article-abstract/25/1/129/75373/The-Impact-of-Enterprise-Resource-Planning-ERP
- ResearchGate (request-text): https://www.researchgate.net/publication/275841112_The_Impact_of_Enterprise_Resource_Planning_ERP_Systems_on_the_Effectiveness_of_Internal_Controls_over_Financial_Reporting
- Academia.edu: https://www.academia.edu/75174996/The_Impact_of_Enterprise_Resource_Planning_ERP_Systems_on_the_Effectiveness_of_Internal_Controls_over_Financial_Reporting

**Method:** Examines firms that implemented ERP between **1994 and 2003** and matches them against non-ERP control firms. Uses SOX Section 404 compliance disclosures as the dependent variable.

**Headline finding (verified across multiple secondary sources):**
> ERP-implementing firms are **less likely** to report internal control weaknesses than a matched control sample of non-ERP-implementing firms. The difference holds for both **general (entity-wide)** controls and **individual (account-level)** controls.

**Use in paper — important framing:** Morris (2011) is the standard reference cited by ERP vendors to support the "ERP improves internal controls" claim. For a paper arguing the opposite (that ERP architecture *creates* failure modes), Morris is the literature's strongest counter-finding and must be addressed directly. The position paper should either:
1. Engage with Morris's selection-bias problem (firms that successfully implement ERP between 1994 and 2003 are likely the well-resourced, better-controlled firms to begin with); or
2. Cite the more recent IT-MW papers (next item) that complicate Morris's picture.

#### B4b. More Recent IT-Internal-Control-Material-Weakness Research

- *Information Technology Internal Control Material Weaknesses in Financial Reporting: Categories, Trends, Associations, and Industry Effects* — published in *International Journal of Accounting Information Systems*, 2024:
  - Author manuscript (free): https://www.sciencedirect.com/science/article/am/pii/S1467089524000125
  - Paywalled version: https://www.sciencedirect.com/science/article/abs/pii/S1467089524000125

- *How Understandable Are SOX 404 Auditors Reports?* — Int. J. Acct. Info. Sys., 2020: https://www.sciencedirect.com/science/article/abs/pii/S1467089520300543

- *Auditor realignment, voluntary SOX 404 adoption, and internal control material weakness remediation* — IJAIS, 2020: https://www.sciencedirect.com/science/article/abs/pii/S0969593120300500

- *Determinants of weaknesses in internal control over financial reporting* — JAE, 2007 (Doyle, Ge, McVay): https://www.sciencedirect.com/science/article/abs/pii/S0165410106000905

- *Accruals Quality and Internal Control Over Financial Reporting* (Doyle, Ge, McVay, 2007): https://www.researchgate.net/publication/228302567_Accruals_Quality_and_Internal_Control_Over_Financial_Reporting

- *The Effect of SOX Internal Control Deficiencies and Their Remediation on Accrual Quality* (Ashbaugh-Skaife, Collins, Kinney, LaFond — SSRN): https://papers.ssrn.com/sol3/papers.cfm?abstract_id=906474

- *Internal Control Weaknesses and Financial Reporting Fraud* (AAA): http://aaahq.org/portals/0/newsroom/intnl%20cntrl%20weakness%20and%20finan%20rpt%20fraud.pdf

- Brazel, J. F., & Agoglia, C. P. (2007). An Examination of Auditor Planning Judgements in a Complex Accounting Information System Environment. *Contemporary Accounting Research*, 24(4), 1059–1083. https://onlinelibrary.wiley.com/doi/10.1506/car.24.4.1
  - Brazel-companion: Brazel, J. F., & Dang, L. (2008) findings (cited via search results) that ERP-implementing firms release audited financials with less delay and issue more frequent/higher-quality earnings guidance.

**Caveat:** Most of these are paywalled at publisher canonical URLs. Free versions are limited to author-manuscript drops on ScienceDirect, SSRN preprints, and AAA's open white-paper postings.

---

## Section C — Workaround / Shadow-IT Literature

### C1. Foundational ERP-Specific Shadow-IT Paper

**Verified citation:**
Behrens, S., & Sedera, W. (2004). Why Do Shadow Systems Exist after an ERP Implementation? Lessons from a Case Study. *PACIS 2004 Proceedings*, Paper 136.

**URLs:**
- AIS Electronic Library: https://aisel.aisnet.org/pacis2004/136/
- Semantic Scholar: https://www.semanticscholar.org/paper/Why-Do-Shadow-Systems-Exist-after-an-ERP-Lessons-a-Behrens-Sedera/ef287c50bd64212e2019ea099a3d9acfef0b1ded

**Verification status:** Confirmed via AIS eLibrary (the canonical IS conference-proceedings index) and Semantic Scholar. Open-access conference paper.

**Use in paper:** The original explicit framing of "shadow systems persist *after* ERP implementation" — which is the precise architectural-failure-mode argument the position paper is making.

**Companion / follow-up:** Jones, D., & Behrens, S. (and others). The Rise and Fall of a Shadow System: Lessons for Enterprise System Implementation. https://djon.es/blog/publications/the-rise-and-fall-of-a-shadow-system-lessons-for-enterprise-system-implementation/

---

### C2. The "64% of Shadow Systems Are ERP-Related" Citation

**Verified citation:**
Huber, M., Zimmermann, S., Rentrop, C., & Felden, C. (2016). The Relation of Shadow Systems and ERP Systems—Insights from a Multiple-Case Study. *Systems*, 4(1), Article 11. (MDPI, open access)

**URLs:**
- MDPI canonical: https://www.mdpi.com/2079-8954/4/1/11
- HTWG Konstanz repository: https://opus.htwg-konstanz.de/frontdoor/index/index/searchtype/authorsearch/author/Melanie+Huber/start/7/rows/50/docId/919

**Headline statistic (verified via search-indexed quote of the paper):**
> "64% of the shadow systems in our case studies are related to ERP systems. This means that they share parts or all of their data and/or functionality with the ERP system."

**Verification status:** MDPI is open access; the paper is freely downloadable. The 64% figure is from the authors' own multi-case-study sample (not a representative survey), so it should be cited as "in this case-study sample, 64% of shadow systems were ERP-related" rather than as a population statistic.

**Companion / follow-up papers by the same group (open access via AIS):**
- Huber, M., Zimmermann, S., Rentrop, C. (2017). Integration of Shadow IT Systems with Enterprise Systems — A Literature Review. *PACIS 2017 Proceedings*, Paper 134. https://aisel.aisnet.org/pacis2017/134/
- Huber, M., Rentrop, C., et al. (2021). Decision Making to Integrate Shadow IT and Enterprise Systems. *PACIS 2021 Proceedings*, Paper 27. https://aisel.aisnet.org/pacis2021/27/
- Conceptualizing Shadow IT Integration Drawbacks from a Systemic Viewpoint (MDPI 2018): https://www.mdpi.com/2079-8954/6/4/42

---

### C3. Recent (2018+) Shadow IT / Workaround Literature

#### C3a. Systematic Literature Reviews

- Klotz, S., Kopper, A., Westner, M., & Strahringer, S. (2019). Causing Factors, Outcomes, and Governance of Shadow IT and Business-Managed IT: A Systematic Literature Review. *International Journal of Information Systems and Project Management*, 7(1), 15–43. https://www.sciencesphere.org/ijispm/archive/ijispm-070102.pdf (open PDF)
  - ResearchGate version: https://www.researchgate.net/publication/332208911_Causing_Factors_Outcomes_and_Governance_of_Shadow_IT_and_Business-managed_IT_A_Systematic_Literature_Review

- Mallmann, G. L., Maçada, A. C. G., et al. — Shadow IT — Systematic Literature Review (KTU IT&C journal): https://www.itc.ktu.lt/index.php/ITC/article/download/23801/13040
  - Academia copy: https://www.academia.edu/68251829/Shadow_IT_Systematic_Literature_Review

- Haag, S., & Eckhardt, A. — Revisiting Shadow IT Research: What we already know, what we still need to know, and how do we get there: https://www.researchgate.net/publication/325495495_Revisiting_shadow_IT_research_What_we_already_know_what_we_still_need_to_know_and_how_do_we_get_there

#### C3b. Recent Empirical Workaround / Shadow IT Studies

- de Vargas Pinto, A., Beerepoot, I., & Gastaud Maçada, A. C. (2022). Encourage autonomy to increase individual work performance: the impact of job characteristics on workaround behavior and shadow IT usage. (Academic CSC literature — original publication forum to be verified by user; the authors and topic are confirmed via search results.)

- Klotz et al. (2020). From Shadow IT to Business-managed IT: a qualitative comparative analysis to determine configurations for successful management of IT by business entities. *Information Systems and e-Business Management*. https://link.springer.com/article/10.1007/s10257-020-00472-6

- White, M. S. (2023). Workarounds and shadow IT — balancing innovation and risk. (Sage Journals, 2023): https://journals.sagepub.com/doi/abs/10.1177/02663821231188823

- Characteristics of Spreadsheet-Based Shadow IT in Serbian Companies (Springer, 2022): https://link.springer.com/chapter/10.1007/978-3-031-18645-5_10

- Theory of Workarounds (Alter, S.) — University of San Francisco: https://repository.usfca.edu/cgi/viewcontent.cgi?article=1039&context=at — useful theoretical framework underpinning workaround research

#### C3c. EHR-Adjacent Workaround Research (transferable findings)

- van Offenbeek, M. (2024). When workarounds aggravate misfits in the use of electronic health record systems. *Information Systems Journal*. https://onlinelibrary.wiley.com/doi/10.1111/isj.12478
- Misfits between an EHR System and Medical Work Practices (ICIS 2017): https://aisel.aisnet.org/cgi/viewcontent.cgi?article=1121&context=icis2017

EHR systems are not ERP, but the literature on EHR misfits and workarounds shares the Strong & Volkoff theoretical lineage and is often cited interchangeably for the workaround-pattern argument.

---

### C4. Industry / Practitioner Surveys on Spreadsheet-as-Workaround

#### C4a. Ventana Research / ISG (now ISG Software Research)

**Source:**
- Ventana Research benchmark research on Enterprise Spreadsheets (since 2004): https://blog.ventanaresearch.com/topic/enterprise-spreadsheet
- Press release on Ventana benchmark research: https://www.ventanaresearch.com/press-release/resources.aspxid3614
- ISG Software Research (Ventana successor) — enterprise spreadsheet topic: https://research.isg-one.com/analyst-perspectives/topic/enterprise-spreadsheet
- "Get to Know Enterprise Spreadsheets" (Ventana, 2016): https://blog.ventanaresearch.com/2016/09/21/get-to-know-enterprise-spreadsheets-to-improve-business-effectiveness

**Headline findings (paraphrase from search-indexed coverage):**
- At least **half** of participants who use spreadsheets for a business process say the tool **makes their job harder**.
- Spreadsheets remain the most common software for **11 of the most common types of planning** (per Ventana's next-generation business planning research).
- Ventana coined the term "enterprise spreadsheet" in 2004 to describe Excel-derivative platforms (Anaplan, Vena, etc.) that try to retain the Excel UX while addressing the **defects** of desktop spreadsheets: poor data integrity, no referential integrity, no workflow controls, weak security, poor auditability.

#### C4b. BPM Partners 2023 Pulse Survey

**Reference (from secondary source — Vena Solutions blog citing the survey):**
- BPM Partners 2023 Pulse Survey (cited in https://www.venasolutions.com/blog/reasons-to-stay-in-excel-for-finance-operations and related industry coverage)
- Headline finding: **>80%** of finance professionals continue to use spreadsheets even after their firms purchased other business performance management software.
- **80%** of companies that implement alternative CPM software end up turning back to Excel at some point.

**Caveat:** BPM Partners is a smaller research firm; the Pulse Survey is published annually but the URL/PDF was not surfaced directly in this session. The above statistics were repeated by multiple downstream coverage articles but should be sourced to BPM Partners directly before final citation.

#### C4c. Other Useful Practitioner Pieces

- Spreadsheets-as-shadow-IT, Diginomica (industry coverage): https://diginomica.com/shadow-it-never-dies-why-spreadsheets-are-still-running-your-business
- "Shedding Light on Shadow IT: Is Excel Running Your Business?" (academic ResearchGate): https://www.researchgate.net/publication/228716838_Shedding_Light_on_Shadow_IT_Is_Excel_Running_Your_Business
- "Shadow spreadsheets: The security gap your tools can't see" (BleepingComputer): https://www.bleepingcomputer.com/news/security/shadow-spreadsheets-the-security-gap-your-tools-cant-see/
- 2023 CFO Survey Insights (Spaulding Ridge): https://www.spauldingridge.com/cfo-2023-survey-insights/
- KPMG CFO Agenda Feb 2023: https://assets.kpmg.com/content/dam/kpmg/xx/pdf/2023/03/cfo-agenda-for-elevating-finance.pdf
- EY DNA of the CFO survey: https://www.ey.com/en_gl/cfo-agenda/dna-of-the-cfo-survey
- 100+ FP&A statistics & trends (Cube Software industry collection — useful as a starting bibliography): https://www.cubesoftware.com/blog/fpa-statistics
- "Excel skills remain top of list for FP&A roles" (CFO Dive coverage): https://www.cfodive.com/news/excel-still-required-financial-planning-roles/626486/

---

## Cross-Cutting Caveats / Honesty Disclosures

1. **WebFetch was disabled in this session.** All quotations attributed to specific papers were drawn from search-engine snippets, secondary review citations, and indexed summary pages — not from direct reading of the original PDF text. Where a quote appears in this document inside block-quote formatting and is attributed verbatim to an author, I have noted "verified via consistent appearance in citing literature" or similar — meaning **the same wording surfaces in multiple independent secondary sources**, which is strong but not conclusive evidence the wording is the original author's. For final paper citation, the user should pull the original PDF and verify each block-quoted sentence.

2. **The "Davenport canonical quote"** ("An enterprise system, by its very nature, imposes its own logic on a company's strategy, organization, and culture.") is the single best-attested verbatim quote in this dossier — it appears identically across many independent citations. I am confident this is Davenport's original wording, but it should still be page-confirmed from the HBR PDF (DePaul mirror) before the paper is published.

3. **Strong & Volkoff's six-domain / two-type taxonomy** is likewise robust — it appears identically across dozens of citing review papers. The deficiency/imposition paraphrase block-quoted in this document is a secondary-source paraphrase, not Strong & Volkoff's original wording.

4. **Markus & Tanis 2000 phase names** ("project chartering, the project, shakedown, onward and upward") are well-confirmed and citable. I did not surface a verbatim block quote from the chapter and would not include one without PDF verification.

5. **Wand & Wang 1996** — the four assumptions and the four intrinsic dimensions are well-confirmed. The deficiency labels ("incomplete, ambiguous, meaningless, redundant") match the standard secondary paraphrase but the exact original wording for the fourth (redundant vs. meaningless vs. incorrect) carries small variation across reviewers — verify against the ACM PDF.

6. **No fabricated citations.** Where a search did not turn up a paper matching the user's request (e.g., a specific "Ifinedo & Nahar review" on ERP failure factors as opposed to success factors), this document says so explicitly rather than inventing a substitute.

7. **PCAOB does not categorize deficiencies by ERP-vs-non-ERP environment.** Any claim of the form "X% of audits at companies running [SAP/Oracle/etc.] have material weaknesses" requires Audit Analytics data and a researcher-constructed join — it is not directly available from PCAOB inspection reports.

8. **Morris (2011) is the literature's main counterpoint to the position paper's thesis.** A paper arguing that ERP architecture creates failure modes must engage Morris head-on, either via the selection-bias critique or via newer IT-control-MW studies (the 2024 IJAIS paper) that complicate the Morris finding.

9. **The "64%" shadow-systems-are-ERP-related figure** (Huber et al. 2016) is from a small case-study sample, not a representative population survey. Cite carefully: "in this case-study sample, 64%…" not "64% of all shadow IT…"

10. **DOIs surfaced where possible.** Where DOIs are given (Wand & Wang, Boudreau & Robey, Soh et al., Strong & Volkoff via DOI lookup), they are the most reliable independent verification handles. Where DOIs were not surfaced (Markus & Tanis chapter, Ifinedo & Nahar 2007), the citation rests on convergent bibliographic indexes.
