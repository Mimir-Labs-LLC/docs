# Research Notes — ERP Analyst Data for Section 4 (Harm Assessment)

**Compiled:** 2026-05-01
**Purpose:** Collected statistics and citations from industry analysts (Panorama, Gartner, Forrester, Nucleus, IDC, Apps Run The World, McKinsey, Standish) for use in the academic-style position paper on ERP architectural failure modes.

---

## CRITICAL METHODOLOGY DISCLOSURE — READ BEFORE CITING

**The research environment for this session blocked the WebFetch and direct-download tools.** Every attempt to either (a) fetch the primary-source PDFs (e.g. the Panorama Consulting 2024/2025/2026 ERP Report PDFs hosted on HubSpot) or (b) fetch the analyst publishers' own HTML pages (e.g. panorama-consulting.com, gartner.com, forrester.com) returned a permissions denial. PowerShell `Invoke-WebRequest` and bash `curl` were also denied.

**What I could do:** call the WebSearch tool, which returns search-engine result snippets and a short summary. Search snippets are themselves derived from the primary documents, but they are not verified excerpts and they do not carry page numbers.

**What this means for citation discipline:**

- Every statistic in this document is tagged with one of three confidence levels:
  - **\[SNIPPET\]** — appears in WebSearch result summaries that themselves cite the named primary source. The URL of the primary source is known and listed, but I have *not* opened the PDF and confirmed the stat appears at a specific page. **Before citing in the paper, you (or a human researcher) must open the PDF and verify the stat.** I have flagged where the snippet's wording is consistent enough across multiple secondary sources that I have higher confidence the stat exists in the primary; and where it appears in a single secondary source, where the risk of paraphrase drift is higher.
  - **\[SECONDARY\]** — appears only in third-party reporting (vendor press releases, trade press, analyst commentary). Cite as "as reported in [secondary source]" — never as a direct primary-source citation.
  - **\[UNVERIFIED\]** — found in the wild but I could not ground it to any specific named report or page. Listed in the "Could Not Verify" section at the bottom.

- I have **not** fabricated statistics. Where I could not find a number, I say so.
- I have **not** fabricated URLs. Every URL listed below was returned by a WebSearch result. **However**, I did not open them, so I cannot guarantee the URL is currently live or that the named PDF is the file actually served at that URL. The Panorama HubSpot PDF URLs follow a consistent and known-public pattern, so I have higher confidence in those; the Gartner and Forrester PDF URLs are more variable and you should treat them as candidate URLs to verify manually.

**Recommended workflow for the paper:** treat this document as a research worksheet, not a finished bibliography. For every \[SNIPPET\] stat you intend to cite, open the listed primary-source URL, locate the stat, capture the page number, and then promote the citation to verified.

---

# 1. Panorama Consulting Group — Annual ERP Report

## Reports identified

Panorama Consulting publishes a free annual ERP Report. Three recent editions are publicly hosted on their HubSpot CDN (URLs returned by WebSearch — patterns are consistent with Panorama's public release model):

- **2026 ERP Report**: `https://4439340.fs1.hubspotusercontent-na1.net/hubfs/4439340/Reports/ERP%20Report/2026-erp-report-panorama-consulting-group.pdf` (returned title in result: "1 Copyright © 2026 Panorama Consulting Group. All rights reserved." — consistent with the typical first-page header of their reports). **Status: candidate URL, not opened.**
- **2025 ERP Report**: hosted at the same path pattern; available via Scribd at `https://www.scribd.com/document/857403624/2025-ERP-Report-Panorama-Consulting` (Scribd is a re-upload, not the publisher; cite Panorama as primary).
- **2024 ERP Report**: `https://4439340.fs1.hubspotusercontent-na1.net/hubfs/4439340/Reports/ERP%20Report/2024-erp-report-panorama-consulting-group.pdf` (returned title: "1 Copyright © 2024 Panorama Consulting Group. All rights reserved.").
- **2023 ERP Report**: `https://4439340.fs1.hubspotusercontent-na1.net/hubfs/4439340/Reports/ERP%20Report/2023-ERP-Report-Panorama-Consulting.pdf`.
- **Resource center landing page** (lists current edition): `https://www.panorama-consulting.com/resource-center/erp-report/`.
- **Archive page**: `https://www.panorama-consulting.com/resource-center/erp-report-archives/`.

**Licensing:** Panorama publishes these reports as free lead-magnet PDFs; the format is the standard "give us your email, get the PDF." Stats are widely re-cited in trade press, suggesting fair-use quoting is normal practice. Direct republication of the full PDF would not be permissible without permission, but quoting individual stats with attribution is common practice.

## 1.1. Implementation success / failure / overrun rates

### Cost overrun

- **\[SNIPPET\]** "64% of ERP projects experience budget overruns" — appears in summary derived from Panorama 2026 ERP Report search results. Causes broken down: "underestimated staffing requirements (38%), scope expansion during implementation (35%), and technical issues requiring additional work (34%)." **Page reference: not captured. Verify against Panorama 2026 PDF.**
- **\[SNIPPET\] (older edition, conflicting framing)** Panorama 2024 ERP Report: "More than half of organizations stayed within their expected budget"; "more than a quarter of organizations exceeded their project budgets, with additional technology needs cited as the leading cause." **Implication:** the 2024 report frames the budget data more positively (>50% on budget) than the 2026 report (64% overrun). If both numbers are accurate, the year-over-year deterioration is itself a finding worth flagging — but I cannot rule out paraphrase drift in one of the two summaries. **Verify both PDFs before treating this as a real trend.**
- **\[SNIPPET\]** Panorama 2025 ERP Report: "more than half of organizations stayed within their expected ERP-implementation budget." Consistent with the 2024 framing.

### Schedule / on-time go-live

- **\[SNIPPET\]** Panorama 2024 ERP Report: "58% of organizations finish their ERP projects on time, and 11% even wrap up ahead of schedule." (Implication: ~31% are late.) Verify page in 2024 PDF.
- **\[SNIPPET\]** From a separate summary citing recent Panorama data: "Just 49% of ERP implementations go live on schedule." Note the conflict with the 58% figure above — these may be different editions, different cohorts (e.g. all projects vs. completed projects), or paraphrase drift. **Both need primary-source verification before citing.**

### Time-to-go-live distribution

- **\[SECONDARY\]** Quoted from Panorama context: "ERP consultants in the US charge between $150 and $400 per hour, with projects lasting anywhere from 6 to 18 months." This is duration commentary, not a distribution. The 2024/2025/2026 Panorama PDFs typically include a "duration of implementation" chart; I could not extract that chart from search results.

### Cost benchmark (absolute dollars)

- **\[SNIPPET\]** Panorama 2025 benchmark: "ERP implementation costs average $450,000." With range "$150,000 to $750,000."

## 1.2. Customization rates

- **\[SNIPPET\]** Panorama (cited as "Panorama research" in their own customization commentary, via summary of `panorama-consulting.com/hidden-erp-project-costs/` and related): **"only 11% of companies implement without any customization."** Strongly worded; appears in multiple secondary summaries; confidence higher than typical \[SNIPPET\] but **page not captured**.
- **\[SNIPPET\]** Panorama 2025 ERP Report: "45% of organizations opt for moderate customizations to tailor ERP systems to their specific needs."
- **\[SNIPPET\]** Panorama 2023 ERP Report (older edition, included for the trend line): "44.8% of organizations implemented their ERP software without any customization, followed by 20.8% with heavy customization, and 15.8% with no customization but with system configuration and personalization with process modifications." This conflicts with the "only 11% implement without customization" claim — they may be using different definitions of "customization" (code modification vs. configuration). **Verify primary-source definitions before reconciling.**

## 1.3. Operational disruption post-go-live

- **\[SNIPPET\]** Panorama 2024 ERP Report: **"54% of organizations experience some type of operational disruption after go-live."** This is the headline disruption stat for the paper. Verify page in 2024 PDF.
- **\[SNIPPET\] (anecdotal example from same report)** "A company decided to go-live before they were ready. Although Panorama consultants advised them to wait 30 days to finalize key project activities, they decided to go forward to save roughly $100,000 in additional project costs. However, they went live before their order entry processes were ready – a decision that cost an estimated $2 million-plus in cancelled shipments from disgruntled customers." Useful as a case anecdote if you confirm it's in the 2024 PDF.

## 1.4. ROI realization

- **\[SNIPPET\]** Panorama 2024 ERP Report: "Among organizations that performed ROI analysis before implementation, 83% met their ERP ROI expectations." Note the conditional clause — this is **not** "83% of all ERP projects realize ROI"; it is "83% of those who measured." Do not paraphrase to strengthen.
- **\[SECONDARY\]** "About 82% of companies that implemented ERP said that they achieved ROI in time according to The Parker Initiative data" — provenance unclear, **do not cite**.
- **\[SECONDARY\]** "91.7% of enterprises that completed their ERP project say that the overall results are successful (from Panorama Consulting Group, 2021)." — older edition; possibly self-report success bias. Cite with skepticism if at all.

## 1.5. Cloud adoption / AI

- **\[SNIPPET\]** Panorama 2024 ERP Report: "Among organizations implementing new ERP systems in 2024, 78.6% selected cloud solutions"; "79% of respondents said they chose cloud-based systems with industry-specific features—a big jump from 65% the year before."
- **\[SNIPPET\]** Panorama 2025 ERP Report: "Organizations deploying AI either significantly or moderately increased from 53% to 72% compared to last year's report."
- **\[SNIPPET\]** Panorama (likely 2024) "53% of organizations have already implemented or plan to implement AI capabilities, with another 35% planning deployment over the next two years"; "84% of organizations successfully implementing [BI] features."

## 1.6. Process / organizational change

- **\[SNIPPET\]** Panorama 2025 ERP Report: "less than a third of organizations reported an intense focus on organizational change management (OCM)." Useful as a counterpoint to the McKinsey "ERP fails because of process not software" thesis.
- **\[SNIPPET\]** Panorama 2024 ERP Report: "Less than a quarter of organizations used a big bang implementation approach, and a hybrid approach was the preferred approach."
- **\[SNIPPET\]** Panorama 2024 ERP Report: "Business intelligence emerged as the most significantly deployed digital initiative, with 55.3% of organizations reporting significant deployment."

## 1.7. Sample size / methodology

- **\[SNIPPET\]** A reference in WebSearch summary: "a total of 1,660 respondents completed the surveys upon which this data is based for a previous year's report." Year not captured. The Panorama reports typically include a methodology section with sample size, geographic breakdown, and industry breakdown — verify in the actual PDF you cite.

---

# 2. Gartner

## 2.1. Magic Quadrant for Cloud ERP — vendor positioning

Gartner publishes two distinct Cloud ERP Magic Quadrants annually:

- **Cloud ERP for Product-Centric Enterprises** (manufacturing, distribution)
- **Cloud ERP for Service-Centric Enterprises** (professional services, services-led businesses)

The full Magic Quadrant reports are paywalled. Vendor press releases reproduce the relevant slice, and trade press (CX Today, CIO, ZDNet) summarizes the broader picture.

### Cloud ERP for Product-Centric Enterprises, 2025

- **\[SECONDARY — CX Today]** Leaders identified: **Oracle, Microsoft, SAP, IFS, Infor, Epicor.** Quote: "Oracle and Microsoft have emerged as the standout Leaders in the 2025 Gartner Magic Quadrant for Cloud ERP for Product-Centric Enterprises." Source: `https://www.cxtoday.com/customer-analytics-intelligence/gartner-magic-quadrant-for-cloud-erp-for-product-centric-enterprises-2025-the-rundown/`. Cite as "Gartner Magic Quadrant for Cloud ERP for Product-Centric Enterprises, 2025, as reported in CX Today."
- **\[SECONDARY — CX Today]** Notable structural finding: **"this year's report featuring no Challengers or Visionaries – just Leaders and Niche Players."** Useful for the paper's "the market has narrowed to incumbents" thesis.
- **\[SECONDARY — vendor PR, SAP]** "SAP Cloud ERP has been recognized as a Leader in the 2025 Gartner Magic Quadrant for Cloud ERP for Product-Centric Enterprises." Source: `https://news.sap.com/2025/10/sap-a-leader-gartner-magic-quadrant-cloud-erp-product-centric-enterprises/`.
- **\[SECONDARY — vendor PR, Microsoft]** Microsoft Dynamics 365 named a Leader in three Gartner Magic Quadrant reports (Service-Centric, Product-Centric, Cloud ERP Finance). Source: `https://www.microsoft.com/en-us/dynamics-365/blog/business-leader/2025/12/01/...`.

### Cloud ERP for Service-Centric Enterprises, 2024

- **\[SECONDARY — CX Today]** Leaders: **Oracle, Workday, SAP (S/4HANA Cloud), Microsoft (Dynamics 365).** Source: `https://www.cxtoday.com/crm/gartner-magic-quadrant-for-cloud-erp-for-service-centric-enterprises-2024/`.
- **\[SECONDARY — CX Today]** Position commentary: "Oracle's NetSuite product sits in the challenger quadrant, while Microsoft (Business Central) and SAP (Business ByDesign) are niche players." Useful nuance: the same vendor can occupy different quadrants with different products.

## 2.2. Gartner published research — failure rate predictions

This is the key Gartner stat for the paper. There is a **freely available Gartner-hosted page** (no paywall, on gartner.com/en/information-technology/insights/...) that contains the prediction:

- **\[SECONDARY — Gartner-hosted insights page, summarized via WebSearch]** "By 2027, more than 70% of recently implemented ERP initiatives will fail to fully meet their original business case goals, and as many as 25% of these will fail catastrophically." Source URL: `https://www.gartner.com/en/information-technology/insights/what-it-leaders-must-do-to-avoid-disappointing-erp-initiatives`. **This URL was returned by WebSearch and the content snippet matches the predicted-prediction language Gartner uses; high confidence the page exists, but I did not open it. Verify the exact wording before quoting.**
- A PDF version is hosted at `https://emt.gartnerweb.com/ngw/globalassets/en/chief-information-officer/documents/what-it-leaders-must-to-do-to-avoid-disappointing-erp-initiatives.pdf` — also free.
- **Cite as:** Gartner, "What IT Leaders Must Do to Avoid Disappointing ERP Initiatives," gartner.com (free insights page; year of publication needs to be captured from the PDF — likely 2023 or 2024 given the "by 2027" framing).

### The "55–75% of ERP projects fail" claim

This is the most-cited Gartner statistic in ERP literature. **However:**

- **\[UNVERIFIED]** I could not locate a primary Gartner document that uses the phrase "55% to 75% of ERP projects fail." The number is repeated extensively in secondary sources (LinkedIn posts, vendor blogs, Chegg homework problems, etc.) all attributing it to Gartner, but **no source I found cited a specific Gartner report ID, year, or page**. This is exactly the kind of "everyone knows Gartner said this" stat that may have drifted from an original specific finding into a free-floating folk number. **Recommend not citing the 55–75% figure directly in the paper unless a specific Gartner document can be located. The "by 2027, 70%" figure is a safer substitute and is grounded.**

---

# 3. Forrester Wave for ERP

## 3.1. The two 2024 Forrester Waves

Forrester published **two** ERP Wave evaluations in **Q2 2024** (the first time they bifurcated the report this way):

- The Forrester Wave™: Enterprise Resource Planning Solutions For Product-Centric Industries, Q2 2024
- The Forrester Wave™: Enterprise Resource Planning Solutions For Service-Centric Industries, Q2 2024

Forrester's announcement blog: `https://www.forrester.com/blogs/two-erp-waves-now-live-the-forrester-wave-enterprise-resource-planning-solutions-for-product-centric-industries-and-for-service-centric-industries-q2-2024/` (free; the full Wave reports are paywalled).

- **\[SECONDARY — Forrester blog]** Methodology: "26-criterion evaluation of enterprise resource planning solutions" (for product-centric).
- **\[SECONDARY — Forrester blog]** Headline trend: "ERP is steadily shifting to the cloud, as many companies running hosted or on-premises ERP seek to modernize these older solutions that are difficult to keep up to date and lack intuitive user experience."

## 3.2. Vendor leader designations

I was **unable to confirm a complete list of Leaders in either 2024 Forrester ERP Wave** from search snippets alone. Vendor PR captures only confirm the following:

- **\[SECONDARY — vendor PR]** **Oracle NetSuite** named Leader in **both** the product-centric and service-centric Q2 2024 Waves. Sources: `https://onekloudx.com.au/netsuite-named-by-forrester-as-a-leader-erp/`, `https://blog.tekiio.com/en/blog/netsuite-service-leader-forrester`.
- The presence/absence of SAP, Oracle Fusion, Microsoft, Infor, Workday, IFS, Epicor in the Leader tier could not be confirmed from snippets. **For the paper, this means: do not list "the Forrester ERP Leaders are X, Y, Z" without cross-checking each vendor's own PR or paying for the Forrester report.**

---

# 4. Nucleus Research — ERP Technology Value Matrix

## 4.1. Editions

Nucleus publishes:
- **Enterprise ERP Technology Value Matrix** (annual; 2024 and 2025 editions confirmed)
- **SMB ERP Technology Value Matrix** (annual; 2024 confirmed)

Press-release announcements are free; the full matrices are typically gated.

- 2024 Enterprise: `https://nucleusresearch.com/research/single/enterprise-erp-technology-value-matrix-2024/` and BusinessWire announcement `https://www.businesswire.com/news/home/20240604808979/...`
- 2025 Enterprise: `https://nucleusresearch.com/research/single/enterprise-erp-technology-value-matrix-2025/`
- 2024 SMB: `https://nucleusresearch.com/research/single/smb-erp-technology-value-matrix-2024/`

## 4.2. Vendor positioning

- **\[SECONDARY]** Enterprise Leaders (most recent): **IFS, Infor, Microsoft, Oracle.** "Leaders deliver advanced functionality without sacrificing ease-of-use at scale."
- **\[SECONDARY]** Enterprise Experts: **Deltek, QAD, SAP.** "Experts deliver value to customers with complex use cases through deep functionality and industry-specific capabilities."
- **\[SECONDARY]** SMB Leaders: **Acumatica, Epicor, Infor, Oracle NetSuite, Rootstock.**

Note that SAP is positioned as an "Expert" rather than a "Leader" in the Nucleus Enterprise matrix — this is a real divergence from the Gartner positioning where SAP is consistently a Leader. This is a useful tension to highlight if the paper makes a point about how analyst frameworks reward different things (Gartner rewards completeness of vision; Nucleus rewards demonstrated ROI).

## 4.3. Substantive findings from announcement summaries

- **\[SECONDARY — BusinessWire announcement summary]** Theme: "Vendor AI investment is now expected, with generative AI initiatives to improve productivity in existing NLP processes driving the most value."
- **\[SECONDARY]** Theme: "Vendors are transforming ERP from a system of record to a system of action, embedding AI agents and automation directly into workflows." (Useful framing for the paper's argument about ERP scope creep.)
- **\[SECONDARY]** Market context: "Market uncertainty and geopolitical risks in 2024 have prompted large enterprises to examine their software investments with more scrutiny, particularly in their core ERP investment."

**No specific ROI percentages or value-realization rates were captured from search snippets.** Nucleus matrices typically include ROI commentary in vendor profile pages; verify by paying for or otherwise obtaining the report.

---

# 5. IDC MarketScape — SaaS ERP

## 5.1. 2024 reports identified

- **IDC MarketScape: Worldwide SaaS and Cloud-Enabled Medium-Sized Business ERP Applications 2024 Vendor Assessment** (`US50655023` family of doc IDs)
- **IDC MarketScape: Worldwide SaaS and Cloud-Enabled Small Business ERP Applications 2024 Vendor Assessment**
- **IDC MarketScape: North America Higher Education SaaS and Cloud-Enabled ERP Applications 2024 Vendor Assessment** (containerId `US51810624`)

A free Microsoft-hosted reprint of the small-business edition: `https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/final/en-us/microsoft-brand/documents/IDC%20MarketScape%20-%20Worldwide%20SaaS%20and%20Cloud-Enabled%20Small%20Business%20ERP%20Applications%202024%20Vendor%20Assessment.pdf` — vendor reprints are licensed by IDC for promotional use and are typically free; cite IDC as the publisher.

## 5.2. Leaders

- **\[SECONDARY]** Medium-Sized Business ERP, 2024: **SAP, Infor, Acumatica** named as Leaders. (Vendor PR sources: SAP, Infor, Acumatica.)
- **\[SECONDARY]** Small Business ERP, 2024: **Acumatica, Infor, Microsoft** named as Leaders.

No quantitative findings (market sizing, ROI percentages) were captured from search snippets for IDC MarketScape — these reports are vendor-positioning documents, not market-sizing studies. For market sizing, IDC publishes separate "Worldwide SaaS Enterprise Applications Forecast" reports that are paywalled.

---

# 6. Apps Run The World — ERP Market Share

## 6.1. Source

- Top 10 ERP Software Vendors: `https://www.appsruntheworld.com/top-10-erp-software-vendors-and-market-forecast/`
- "Oracle Surpasses SAP" announcement: `https://www.appsruntheworld.com/oracle-surpasses-sap-to-become-no-1-erp-apps-provider/`

Apps Run The World publishes summary statistics freely; full reports are paywalled. Their numbers are widely cited in CIO.com, Techzine, etc.

## 6.2. 2024 market data

- **\[SNIPPET]** **Total ERP applications market: $135.9 billion in 2024**, +9.4% YoY. Forecast to reach $179.8 billion by 2029 at 5.7% CAGR.
- **\[SNIPPET — note conflict]** A separate snippet says "$131 billion total ERP applications market" in 2024. The two numbers ($131B vs $135.9B) likely reflect different definitions ("ERP" narrowly vs. "ERP applications" broadly). Verify with the primary Apps Run The World report before citing.
- **\[SNIPPET]** Top 10 vendors capture **26.5%** of the worldwide market — this is the **headline finding for the "ERP market is fragmented" thesis.** Almost three-quarters of the market is **not** SAP/Oracle/Microsoft.

## 6.3. Top 10 vendor revenues, 2024

| Rank | Vendor | 2024 ERP Revenue | Market Share |
|------|--------|------------------|--------------|
| 1 | Oracle | $8.7B | 6.63% (also reported as 6.5%) |
| 2 | SAP | $8.6B | 6.57% |
| 3 | Intuit | (not captured) | — |
| 4 | Constellation Software | (not captured) | — |
| 5 | Microsoft | $5.4B | 4.0% |
| 6 | FIS Global | (not captured) | — |
| 7 | IQVIA | (not captured) | — |
| 8 | Roper Technologies | (not captured) | — |
| 9 | Sage | (not captured) | — |
| 10 | Infor | (not captured) | — |
| (also tracked) | Workday | $3.3B | 2.5% |

**\[SECONDARY]** Notable headline (CIO.com, Techzine, Apps Run The World press release): **"In 2024, Oracle surpassed SAP as the No. 1 ERP applications vendor for the first time, unseating the business software pioneer that has dominated the ERP landscape since the early 1980s."**

CIO.com URL: `https://www.cio.com/article/3968728/oracle-knocks-sap-off-the-erp-throne.html`. Techzine URL: `https://www.techzine.eu/news/applications/130690/analysis-oracle-beats-sap-in-erp-market/`.

---

# 7. McKinsey — ERP Transformation Research

## 7.1. Article: "Getting an ERP transformation back on track"

- URL: `https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/getting-an-erp-transformation-back-on-track`
- Free; on McKinsey's website.

## 7.2. Headline statistics

- **\[SECONDARY — McKinsey-attributed]** **"Nearly 70% of ERP transformation programs fall short of realizing their full potential."** This is the McKinsey 70% figure that gets re-cited everywhere.
- **\[SECONDARY]** **"Only 20% of companies manage to capture more than half the projected benefits from ERP systems."** This is a more incisive number than the headline 70% — captures the magnitude of value left on the table even among "successful" projects.
- **\[SECONDARY]** Causal framing — recurring across the McKinsey ERP corpus: failures stem from organizational/process issues, not the software. "Companies lift broken processes from old systems and drop them into new ones." Useful for the paper's thesis about why the "fix-it-with-customization" pattern recurs.

## 7.3. Other related McKinsey ERP articles

- "Agile ERP: A myth no more" — `https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/agile-in-enterprise-resource-planning-a-myth-no-more`
- "ERP modernization for AI: Transform your enterprise" — `https://www.mckinsey.com/capabilities/mckinsey-technology/our-insights/bridging-the-great-ai-agent-and-erp-divide-to-unlock-value-at-scale`
- "The ERP platform play: Cheaper, faster, better" — `https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-erp-platform-play-cheaper-faster-better`
- "ERP transformations boost life sciences value" — `https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/tech-forward/unlocking-business-value-in-life-sciences-transformations`

All free; useful for additional supporting quotes.

---

# 8. Standish Group — CHAOS Report

The CHAOS report tracks IT projects generally, not ERP specifically. It is, however, the canonical source of "most IT projects fail" headline numbers.

- **\[SECONDARY]** Recent CHAOS data: only **31% of IT projects end successfully**; 50% are challenged; 19% fail completely. (Source attribution in summaries varies between "CHAOS 2020" and "more recent CHAOS data" — the report is published periodically, not annually.)
- **\[SECONDARY]** Older CHAOS framing: "only 16.2% of IT projects are successful, with 52.7% being over-cost or lacking functionality."
- **\[SECONDARY]** Project size effect: "Small projects achieve around 90% success rates, while large projects succeed less than 10% of the time. Projects exceeding $10 million are more than ten times more likely to be canceled than those under $1 million." This is a high-value stat for the paper because **most ERP projects are large projects.**

The Standish Group publishes CHAOS via paid subscription; primary source is `https://www.standishgroup.com/`. **Use Standish data carefully** — there is academic critique of the methodology (see ACM Queue article: `https://queue.acm.org/detail.cfm?id=3687999`) which the paper might want to acknowledge.

---

# 9. Could Not Verify — Stats Found in the Wild

These statistics surfaced in WebSearch results but I could not ground them to a specific named primary report. **Do not cite these in the paper without finding the source first.**

| Stat | Where I saw it | Why I couldn't verify |
|------|----------------|----------------------|
| "70% of ERP implementations fail" (popular folk number) | Dozens of vendor blogs, LinkedIn posts | No specific report ID. Likely a paraphrase of either the McKinsey 70% or the Gartner 55–75% figures. |
| "55–75% of ERP projects fail to meet objectives" attributed to Gartner | LinkedIn, vendor blogs, Chegg | No specific Gartner document ID was cited in any source I found. May exist in a paywalled Gartner report; may be a folk number. |
| "73% of ERP projects fail in discrete manufacturing" attributed to Panorama 2025 | One Godlan blog post (`godlan.com/erp-implementation-failure-statistics/`) | The phrasing reads like a paraphrase. The Panorama 2025 PDF would need to be opened to confirm whether they segment failure rate by industry vertical at all. |
| "Average cost overrun 215%" attributed to Panorama 2025 (discrete manufacturing) | Same Godlan post | Same provenance concern. 215% is an extreme number; needs verification. |
| "82% of companies that implemented ERP achieved ROI in time" attributed to "The Parker Initiative" | Misc. ERP blog roundups | "The Parker Initiative" is not a recognized analyst firm in this space. Likely a misattribution. |
| "91.7% of enterprises that completed their ERP project say the overall results are successful" attributed to Panorama 2021 | ERP statistics roundup posts | Older edition; possibly real but check the 2021 Panorama PDF. The phrasing — "of enterprises that completed" — is doing a lot of work; survivorship bias likely. |
| "85% of organizations achieve project success when working with experienced implementation consultants" attributed to Panorama 2024 | One summary | Self-serving framing for a consulting firm; possibly real but verify and treat with skepticism. |
| "90% simplification of core processes / 85% alignment with ERP best practices" attributed to McKinsey | One summary of the "back on track" article | Phrasing reads like a paraphrase rather than a McKinsey direct quote. Open the article and verify. |
| "65% of organizations consider AI critical to their ERP systems" attributed to Panorama 2026 | One snippet summary | Possibly real but verify. |
| "AI-enabled implementations reducing delivery times by 25% and operational costs by 15%" attributed to Panorama 2026 | One snippet summary | Possibly real; the specific percentages should appear in the 2026 PDF if so. |
| "20% improvement in forecasting accuracy" / "35% improvement in decision-making speed" attributed to Panorama 2026 | One snippet summary | Same. |

---

# 10. Cross-Source Tensions Worth Flagging in the Paper

The paper will be stronger if it surfaces, rather than smooths over, the disagreements among analyst sources. Real tensions identified:

1. **On-time go-live rate:** Panorama 2024 says 58% on-time; another Panorama-attributed snippet says 49%. Either is consistent with "the majority of ERP projects do not run smoothly," but the paper should not pretend the analyst community agrees on the precise rate.

2. **Customization rate:** Panorama (folk number) says "only 11% implement without customization"; Panorama 2023 says 44.8% implement without customization. The discrepancy is almost certainly definitional (code mods vs. configuration vs. process change). The paper might want to acknowledge that **the lack of a shared definition of "customization" is itself a finding** — analysts cannot agree on what they're measuring.

3. **Failure rate:** McKinsey says ~70%, Gartner predicts ~70% by 2027, Standish (general IT) says ~50% challenged + 19% failed = 69% non-success. These three numbers happen to converge around ~70%, but they are measuring different things across different scopes. The paper should be cautious about treating "70% fail" as a single empirical fact.

4. **SAP positioning:** Gartner Magic Quadrant places SAP firmly in Leaders quadrant; Nucleus Research places SAP in "Experts" rather than "Leaders." This is a useful tension if the paper makes any argument about analyst-framework bias.

5. **Market concentration:** Apps Run The World shows top 10 vendors at 26.5% of market — the implication is **74% of ERP spend goes to 11th-place-and-below vendors**, which is a striking finding that contradicts the popular narrative that SAP/Oracle/Microsoft dominate. This supports a "long tail of ERP" thesis.

6. **Oracle vs. SAP #1 position:** 2024 was the first year Oracle surpassed SAP in ERP applications revenue (Apps Run The World). This is a recent, citable, news-grade fact.

---

# 11. Recommended Next Steps Before Finalizing the Paper

Given the verification limits of this session, recommended human-researcher follow-ups:

1. **Open the Panorama 2024, 2025, and 2026 ERP Report PDFs** at the URLs listed in §1. For each \[SNIPPET\] stat from §1.1–1.7, locate the page and capture the page number. Most useful: §1.1 (cost/schedule), §1.2 (customization), §1.3 (operational disruption), §1.4 (ROI).
2. **Open the Gartner "What IT Leaders Must Do" insights page** to capture the publication date and exact wording of the "by 2027, more than 70%" prediction.
3. **For the Forrester Wave** — either purchase the report or scrape vendor PR for each named ERP vendor (SAP, Oracle, Microsoft, Workday, Infor, IFS, Epicor, Unit4) to triangulate the Leader list.
4. **For the Nucleus Value Matrix** — request the report from Nucleus directly (they often share with academic researchers) or rely on the BusinessWire press releases as your citable source.
5. **Drop the "Gartner 55–75% fail" folk number** unless you can find the actual report. Use the gartner.com/insights "by 2027, 70%" finding instead.

---

# 12. Source URL Index

For convenience, every URL referenced above:

- Panorama 2026 ERP Report PDF: https://4439340.fs1.hubspotusercontent-na1.net/hubfs/4439340/Reports/ERP%20Report/2026-erp-report-panorama-consulting-group.pdf
- Panorama 2024 ERP Report PDF: https://4439340.fs1.hubspotusercontent-na1.net/hubfs/4439340/Reports/ERP%20Report/2024-erp-report-panorama-consulting-group.pdf
- Panorama 2023 ERP Report PDF: https://4439340.fs1.hubspotusercontent-na1.net/hubfs/4439340/Reports/ERP%20Report/2023-ERP-Report-Panorama-Consulting.pdf
- Panorama 2025 Top 10 ERP Systems PDF: https://4439340.fs1.hubspotusercontent-na1.net/hubfs/4439340/Reports/Top%2010%20ERP%20Systems/2025-top-10-erp-systems-report-panorama-consulting.pdf
- Panorama 2024 Top 10 ERP Systems PDF: https://4439340.fs1.hubspotusercontent-na1.net/hubfs/4439340/Reports/Top%2010%20ERP%20Systems/2024-top-10-erp-systems-report-panorama-consulting.pdf
- Panorama Resource Center (current edition): https://www.panorama-consulting.com/resource-center/erp-report/
- Panorama Archive: https://www.panorama-consulting.com/resource-center/erp-report-archives/
- Panorama announcement post: https://www.panorama-consulting.com/panorama-consulting-group-releases-latest-study-of-erp-implementation-outcomes-across-the-globe/
- Panorama hidden cost commentary: https://www.panorama-consulting.com/hidden-erp-project-costs/
- Panorama post-go-live commentary: https://www.panorama-consulting.com/understanding-erp-post-go-live-challenges/
- Gartner free insights — ERP: https://www.gartner.com/en/information-technology/insights/what-it-leaders-must-do-to-avoid-disappointing-erp-initiatives
- Gartner ERP topic page: https://www.gartner.com/en/information-technology/topics/enterprise-resource-planning
- Gartner ERP insights PDF: https://emt.gartnerweb.com/ngw/globalassets/en/chief-information-officer/documents/what-it-leaders-must-to-do-to-avoid-disappointing-erp-initiatives.pdf
- CX Today — Gartner Cloud ERP Product-Centric 2025: https://www.cxtoday.com/customer-analytics-intelligence/gartner-magic-quadrant-for-cloud-erp-for-product-centric-enterprises-2025-the-rundown/
- CX Today — Gartner Cloud ERP Service-Centric 2024: https://www.cxtoday.com/crm/gartner-magic-quadrant-for-cloud-erp-for-service-centric-enterprises-2024/
- SAP press — Gartner 2025 Product-Centric Leader: https://news.sap.com/2025/10/sap-a-leader-gartner-magic-quadrant-cloud-erp-product-centric-enterprises/
- SAP press — Gartner 2024 both Leader: https://news.sap.com/2024/11/sap-a-leader-2024-gartner-magic-quadrant-cloud-erp-for-service-centric-enterprises-product-centric-enterprises/
- Microsoft press — Gartner 2025 three Leaders: https://www.microsoft.com/en-us/dynamics-365/blog/business-leader/2025/12/01/microsoft-dynamics-365-named-a-leader-in-three-gartner-magic-quadrant-reports-cloud-erp-for-service-centric-enterprises-cloud-erp-for-product-centric-enterprises-and-cloud-erp-finance/
- Forrester two-Waves announcement (Q2 2024): https://www.forrester.com/blogs/two-erp-waves-now-live-the-forrester-wave-enterprise-resource-planning-solutions-for-product-centric-industries-and-for-service-centric-industries-q2-2024/
- Forrester paywalled Wave product-centric: https://www.forrester.com/report/the-forrester-wave-tm-enterprise-resource-planning-solutions-for-product/RES180830
- Forrester ERP service-centric landscape: https://www.forrester.com/report/the-enterprise-resource-planning-solutions-for-service-centric-industries-landscape-q1-2024/RES180549
- Nucleus 2024 Enterprise ERP Value Matrix: https://nucleusresearch.com/research/single/enterprise-erp-technology-value-matrix-2024/
- Nucleus 2025 Enterprise ERP Value Matrix: https://nucleusresearch.com/research/single/enterprise-erp-technology-value-matrix-2025/
- Nucleus 2024 SMB ERP Value Matrix: https://nucleusresearch.com/research/single/smb-erp-technology-value-matrix-2024/
- BusinessWire — Nucleus 2024 Enterprise: https://www.businesswire.com/news/home/20240604808979/en/Nucleus-Research-Releases-2024-Enterprise-ERP-Technology-Value-Matrix
- IDC MarketScape promo: https://www.idc.com/promo/idcmarketscape/
- IDC Higher Ed 2024: https://www.idc.com/getdoc.jsp?containerId=US51810624
- Microsoft-hosted IDC Small Business 2024 PDF: https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/final/en-us/microsoft-brand/documents/IDC%20MarketScape%20-%20Worldwide%20SaaS%20and%20Cloud-Enabled%20Small%20Business%20ERP%20Applications%202024%20Vendor%20Assessment.pdf
- Apps Run The World — Top 10 ERP: https://www.appsruntheworld.com/top-10-erp-software-vendors-and-market-forecast/
- Apps Run The World — Oracle surpasses SAP: https://www.appsruntheworld.com/oracle-surpasses-sap-to-become-no-1-erp-apps-provider/
- CIO — Oracle vs. SAP: https://www.cio.com/article/3968728/oracle-knocks-sap-off-the-erp-throne.html
- Techzine — Oracle beats SAP analysis: https://www.techzine.eu/news/applications/130690/analysis-oracle-beats-sap-in-erp-market/
- McKinsey — Getting an ERP transformation back on track: https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/getting-an-erp-transformation-back-on-track
- McKinsey — Agile ERP: https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/agile-in-enterprise-resource-planning-a-myth-no-more
- McKinsey — ERP for AI: https://www.mckinsey.com/capabilities/mckinsey-technology/our-insights/bridging-the-great-ai-agent-and-erp-divide-to-unlock-value-at-scale
- McKinsey — ERP platform play: https://www.mckinsey.com/capabilities/mckinsey-digital/our-insights/the-erp-platform-play-cheaper-faster-better
- McKinsey — Life sciences ERP: https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/tech-forward/unlocking-business-value-in-life-sciences-transformations
- Standish Group: https://www.standishgroup.com/
- ACM Queue critique of Standish: https://queue.acm.org/detail.cfm?id=3687999

---

*End of research notes.*
