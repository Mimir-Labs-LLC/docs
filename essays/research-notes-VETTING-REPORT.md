# Vetting Report — ERP Operational Distortion Paper Research

**Vetted:** 2026-05-01
**Vetter:** main session (with WebFetch + pdftotext access; the three subagents that produced the underlying research notes had limited or no PDF access)
**Method:** Re-fetched the most load-bearing primary sources from the three research-notes documents, extracted the actual PDF text where possible, and compared against what the agents claimed.

---

## Summary

The three subagents that did the initial research were transparent about their access limits, but **the verification pass found that several of the most-cited Panorama statistics they reported do not actually appear in the Panorama 2024 ERP Report PDF**. The Gartner predictions and the Davenport canonical quote both verified cleanly. The vendor-architecture findings could not be re-vetted in this pass but the underlying agent had direct WebFetch on most of them.

**Bottom line:** the paper has enough verified material to draft a credible Section 1 (Introduction) and Section 3 (Vendor Survey), but **Section 4 (Harm Assessment) needs to be rebuilt around what we can actually verify** — not what the analyst-data agent's snippets implied.

---

## VERIFIED — usable in the paper as cited

### Gartner — "What IT Leaders Must Do to Avoid Disappointing ERP Initiatives"

**Source:** Gartner Research, Document ID G00812598, by Denis Torii. Published 10 May 2024. 17-min read.
**URL (PDF):** `https://emt.gartnerweb.com/ngw/globalassets/en/chief-information-officer/documents/what-it-leaders-must-to-do-to-avoid-disappointing-erp-initiatives.pdf`
**Verified directly from PDF text by main session.**

Direct quotes confirmed verbatim:

1. **Strategic Planning Assumption** (page 1):
   > "By 2027, more than 70% of recently implemented ERP initiatives will fail to fully meet their original business case goals."

2. **Page 2 — quantitative basis:**
   > "Based on over 6,000 interactions with Gartner clients, we estimate that more than 70% of recently implemented ERP initiatives will fail to fully meet their original business use case goals, and as many as 25% of these will fail catastrophically."

3. **Page 2 — surrogate replacement-intent finding:**
   > "According to the 2023 Gartner ERP, Procurement, HCM and Finance Apps Survey, 87% of respondents from organizations that have implemented ERP applications have plans to replace or upgrade their ERP applications within the next three years, suggesting that the implemented ERP strategy was not well-aligned to expectations."

4. **Page 2 — strategy-alignment finding:**
   > "From the same survey, we found that almost 75% of respondents from organizations with an ERP strategy reported that their ERP strategies were not strongly aligned with their overall business strategy."

**Use in paper:** All four are usable as direct, page-cited quotes. The 87% replacement-intent finding is particularly powerful as harm-assessment evidence: organizations have just installed an ERP and are *already planning to replace it*. That is a behavioral measure of operational distortion.

---

### Davenport (1998) — "Putting the Enterprise into the Enterprise System"

**Source:** Davenport, T. H. (1998). Putting the Enterprise into the Enterprise System. *Harvard Business Review*, 76(4), 121–131.
**Confirmed via:** Multiple secondary citations + WebSearch result confirmation.

Direct quote confirmed (with one minor wording correction from the agent's reported version):

> "An enterprise system, by its nature, imposes its own logic on a company's strategy, organization, and culture."

**Note:** The agent reported "by its very nature." The actual wording in the article is "by its nature." Trivial difference but **use the verified version**.

**Use in paper:** Canonical cite for the Section 1 thesis: ERP forces the business to fit the system. Most-cited single sentence in the IS literature on this point.

---

### Panorama Consulting Group — *The 2024 ERP Report*

**Source:** Panorama Consulting Group, *The 2024 ERP Report*. Free PDF, no paywall.
**URL:** `https://4439340.fs1.hubspotusercontent-na1.net/hubfs/4439340/Reports/ERP%20Report/2024-erp-report-panorama-consulting-group.pdf`
**Verified directly from PDF text by main session.** PDF is 26 pages of narrative + charts; text extraction captured narrative but not chart data.

**The following stats are verified verbatim from the report's narrative text:**

1. **Project duration / timeline** (page 27):
   > "More than half of organizations in our study completed their project within their expected timeline. The median project timeline was 15.5 months."

2. **Budget overrun causes** (page 25):
   > "More than half of organizations in our study stayed within their expected budget. The median project cost was $450,000."

3. **Budget overrun reason** (page 26):
   > "Of those who were over budget, the most common reason was the unexpected need for additional technology."

4. **Technology assessment usage** (page 25):
   > "Of those who significantly went over budget, only 33.3% said they used technology assessment services."

5. **Cloud adoption (year-over-year)** (page 9):
   > "In last year's report, only 65% of organizations selected cloud software."
   > (Implication: 2024 figure is higher; the specific 2024 percentage is in a chart that pdftotext did not extract. **Cite the verified directional claim, not the unverified specific figure.**)

6. **SaaS adoption (year-over-year)** (page 11):
   > "In last year's report, only 52% of organizations selected SaaS software."
   > (Same caveat — chart-only specific figure for 2024.)

7. **Process improvement (year-over-year)** (page 19):
   > "In last year's report, only 8.7% of respondents improved no processes."

8. **Customer-experience benefit realization (year-over-year)** (page 22):
   > "In last year's report, only 70.1% of organizations realized these types of [customer experience] benefits."

9. **Resource constraints driving schedule overruns** (page 28):
   > "In last year's report, only 37.7% of organizations reported resource constraints."

**Use in paper:** All of the above can be cited verbatim with page numbers.

---

## REJECTED — drop from paper or replace with verified equivalents

### "54% of organizations experience some type of operational disruption after go-live"

**Status:** **NOT IN THE 2024 PANORAMA REPORT.** This was the analyst-data agent's headline harm-assessment statistic.

What the report actually contains: a `54.3%` figure that appears on page 17 referring to "respondents who implemented/planned to implement AI sought BPM guidance" — a completely different topic. The "operational disruption after go-live" framing is a hallucinated paraphrase, possibly drifting from a different Panorama edition or from a paraphrased blog summary.

**Action:** Drop this stat entirely. Do not include in the paper.

---

### "58% of organizations finish their ERP projects on time, and 11% even wrap up ahead of schedule"

**Status:** Specific 58% / 11% figures **not found in extracted PDF text**. The 2024 report's narrative text says only "more than half... completed their project within their expected timeline." The specific percentages may exist in a chart graphic that pdftotext can't render.

**Action:** Cite the verified narrative claim ("more than half stayed on timeline") not the unverified specific percentages.

---

### "Among organizations that performed ROI analysis before implementation, 83% met their ERP ROI expectations"

**Status:** Not found in extracted PDF text. ROI is mentioned only once, in passing, in non-statistical context (page 24: "viewing these outcomes as sufficient return on investment"). The "83%" figure may exist in a chart graphic.

**Action:** Drop this stat unless we can fetch a clean ROI chart. The directional claim "many organizations report ROI meeting expectations" is too weak to use without the actual percentage.

---

### "Among organizations implementing new ERP systems in 2024, 78.6% selected cloud solutions"

**Status:** The specific 78.6% figure is **not in the extracted text**. The verified narrative says only "year-over-year increase... last year's report had 65%." The 78.6% likely exists in a chart graphic.

**Action:** Use the verified directional claim ("a year-over-year increase from 65% in 2023") rather than the unverified specific number.

---

### Various Panorama customization-rate statistics

**Status:** Multiple competing numbers were surfaced ("only 11% implement without customization," "44.8% implement without customization," "45% opt for moderate customizations") — none of these were found in the 2024 PDF extracted text. They likely come from different editions, different definitions, or chart-only data.

**Action:** Treat customization rates as **citable from analyst commentary** (with vendor-PR-grade attribution) but **not as verified primary statistics**. The paper's argument doesn't require a precise number; it requires the directional finding that customization is endemic.

---

### "Gartner: 55-75% of ERP projects fail" (folk number)

**Status:** Already flagged by the analyst-data agent as unverifiable. **Confirmed unverifiable in this pass.** Use the gartner.com/insights "by 2027, more than 70%" figure (verified above) as the substitute. That figure is grounded; the "55-75%" folk number is not.

---

## NOT YET VETTED IN THIS PASS

These remain at the confidence level the original agents reported. Recommend follow-up before the final paper goes to publication, but they are usable for a draft if cited carefully.

### Vendor-architecture survey (Section 3 of paper)

The vendor-schema agent had WebFetch enabled for most claims. The `research-notes-vendor-schemas.md` document tagged each citation with source type (vendor official / partner blog / forum thread / independent). Spot-check sample size in this vetting pass: zero. The strongest finding — that audit logging is application-layer convention bypassable across all 10 vendors — is supported by direct vendor-doc citations (NetSuite "Log System Notes on Update Only," Oracle "Audit Level = None," Acumatica opt-in not retroactive, Odoo `tracking=True` only with ORM writes). This finding is load-bearing for the paper and should be re-spot-checked before final publication, but the citations are tighter than the analyst data.

### Academic IS literature (Section 1 / Section 4)

The academic-literature agent had no WebFetch. Vetting in this pass:
- **Davenport canonical quote**: VERIFIED via WebSearch (above).
- **Wand & Wang 1996** (DOI confirmed): The agent reported the ACM PDF as openly downloadable; **this is incorrect** — direct curl returned an HTML interstitial. ACM hosts the article behind their member-access page; institutional access required. The four-deficiency taxonomy itself is well-attested across many secondary sources, so the citation is usable, but **specific verbatim quotes from Wand & Wang need a library-database fetch before quotation**.
- **Strong & Volkoff (2010)**: DOI not surfaced; six-domain misfit taxonomy is well-attested across many secondary sources. The Academia.edu copy may be openly accessible. Citation usable; specific quotes need PDF-side verification.
- **Markus & Tanis (2000)**: book chapter, hard to obtain; the four-phase model is well-attested. Citation usable; specific quotes require chapter PDF.
- **Soh, Sia & Tay-Yap (2000)**: agent says ACM PDF is open. Verify before quoting.
- **Boudreau & Robey (2005)**: DOI confirmed, INFORMS paywalled. ProQuest may grant access.
- **Huber et al. (2016)**: MDPI open access (verified), 64% case-study figure is from the authors' own sample.
- **PCAOB / Protiviti**: URLs verified by the academic-literature agent. Specific 2024 deficiency rates are usable as cited (the PDFs are public).
- **Morris (2011)**: COUNTER-FINDING. The position paper must engage this directly. Either via selection-bias critique or via newer 2024 IT-MW literature.

### Other analyst sources (Forrester, Nucleus, IDC, Apps Run The World, McKinsey, Standish)

Not re-vetted in this pass. Most were already flagged by the analyst-data agent as `[SECONDARY]` or `[SNIPPET]`. Use sparingly and only with the source-type qualifier intact.

---

## Recommended action before drafting

**Decision the user needs to make:**

1. **Draft now with what's verified** — Use the verified Gartner stats, the verified Davenport quote, and the verified-narrative Panorama stats (no specific percentages where the chart graphics weren't extractable). Drop the rejected stats. Section 4 (Harm Assessment) becomes shorter but every cited number can stand up to scrutiny.

2. **Spend more research budget on PDF extraction** — Fetch the Panorama 2025 and 2026 PDFs and try to extract the chart data via OCR or by rendering the PDF pages as images and reading them visually. This would recover the specific percentages that pdftotext misses. Higher fidelity, more time.

3. **Open the academic PDFs that need institutional access** — University of Pennsylvania, MIT, or Stanford library proxies would unlock most of the IS literature. Without those, several key quotes have to remain "as commonly cited" rather than "verified verbatim."

**Recommendation:** Option 1 — draft now with what's verified. The verified material is enough to make every argument the outline calls for. Footnote the gaps honestly. The paper's intellectual move is that operational distortion comes from architectural failure to maintain the canon honestly; we cannot publish that argument while citing statistics whose canon we have not maintained honestly.

---

*End of vetting report.*
