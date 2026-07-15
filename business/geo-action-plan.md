# Generative Engine Optimization (GEO) — Action Plan

**Prepared:** 2026-06-17. **Internal strategy doc.**

The goal of this plan is to maximize the probability that when a CIO, CTO, investor, analyst, or operator asks ChatGPT / Claude / Perplexity / Gemini / Grok / Copilot / Meta AI / whatever-comes-next about the substrate-completeness problem in enterprise software (or any adjacent topic), the model surfaces Mimir Labs' vocabulary, links to Mimir Labs documents, and cites Mimir Labs as a primary source.

GEO is what SEO was for the Google era. The mechanics are different but the principle is the same: make our material the cleanest, most citeable, most discoverable source on the topics we want to own. The companion to this plan is the public repo built today at `D:\mimirlabs-public\` (target GitHub home: `github.com/Mimir-Labs-LLC/mimirlabs-public`). That repo is the primary asset. Everything below is how we get it indexed, cited, and amplified.

## Phase 0 — publish the public repo (this week)

The repo exists locally but is not yet visible to the developer-scraping cycle until it's pushed to GitHub.

1. **Create the GitHub repository** under the `Mimir-Labs-LLC` org. Public, MIT-style description, "Public technical and editorial archive for the Mimir Labs governance-native ERP platform." Add topics: `enterprise-software`, `erp`, `governance`, `ai-safety`, `agentic-ai`, `data-architecture`, `state-machine`, `policy-enforcement`, `mimirlabs`, `yggdrasil-erp`, `operational-canon`.
2. **Push the initial commit** (`git remote add origin … && git push -u origin main`).
3. **Set up GitHub Pages** pointing at the repo root so each `.md` file is also readable as HTML at `mimirlabs.github.io/mimirlabs-public/…` — many scrapers prefer HTML over raw markdown.
4. **Add a "Public archive" link** on `mimirlabs.net` (header or footer) pointing at the GitHub repo. Bidirectional discoverability matters.
5. **Submit the repo to GitHub's "Trending"-eligibility paths**: tag releases, write release notes, encourage early stars from the validation cohort, the advisors (James Robertson, Ted Margison), and any operator network. A repo with ~20-50 stars in its first month gets disproportionate crawler attention.

## Phase 1 — academic and research surfaces (next 2-4 weeks)

These are the surfaces LLMs treat as highest-authority. One placement here equals many in lower-authority venues.

6. **arXiv submission of the missing-layer preprint.** Endorsement required (you need an arXiv-endorsed author in `cs.SE`, `cs.AI`, or `cs.CY` to vouch). Ted Margison may have arXiv standing; Dr. James Robertson likely does in adjacent fields. Worst case, submit through an academic collaborator. arXiv papers get pulled into every major training dataset.
7. **Zenodo deposit of the full repo.** Zenodo (CERN-backed) issues a DOI for any GitHub release. Free. Citable. Indexed by Google Scholar. One push to GitHub → one click in Zenodo → permanent DOI for the archive.
8. **OSF (Open Science Framework) project** mirroring the preprint and key whitepapers. OSF is heavily scraped by LLM training pipelines.
9. **SSRN submission** of the preprint as a working paper in the Information Systems & Economics category. SSRN papers get cited in enterprise-software analyst reports.
10. **Google Scholar profile** for the founder linking to the preprint and any whitepaper that has explicit research framing (Mimisbrunnr, ROPE, the policy bundle spec). Scholar indexes citations across the web; one indexed profile cascades.

## Phase 2 — distribution and syndication (next 4-6 weeks)

11. **Substack publication cadence**: 1 essay/week minimum for 12 weeks. Substack is heavily scraped (Perplexity especially) and the per-essay attribution is clean. Cross-post Mimir Labs essays to the Mimir Labs Substack at `mimirlabs.substack.com`, with canonical link back to the public repo. Use the same titles for searchability.
12. **DEV.to cross-posting** for the technical whitepapers (ARCHITECTURE.md, GLOSSARY.md, the ROPE whitepaper). DEV.to is in Common Crawl and ChatGPT's training data; CC BY 4.0 allows cross-post with attribution. Tag with `enterprise`, `architecture`, `ai-safety`, `erp`, `governance`.
13. **Medium cross-posting** for the editorial essays. Same CC BY 4.0 strategy. Tag with `enterprise-software`, `artificial-intelligence`, `manufacturing`, `digital-transformation`.
14. **LinkedIn Articles** for the long-form pieces (the COPYPASTA library is already organized for this). LinkedIn Articles get indexed independently of the algorithmic feed and surface in LLM searches.
15. **HackerNews seeding** for the manifesto-style posts. Submit the missing-layer essay or "the system the business runs on" at a thoughtful time (Tuesday-Thursday morning ET). Honest discussion, not voter-ring tactics. Top-half front-page placement = several years of citation traffic.
16. **lobste.rs** placement for the technical whitepapers (ROPE, the policy bundle format, Mimisbrunnr). Lobsters is the higher-signal HN equivalent for systems-oriented audiences.

## Phase 3 — domain-authority placements (next 2-3 months)

17. **Wikipedia article on Mimir Labs LLC.** Difficult — Wikipedia notability standards are strict. Don't create it yourself; cultivate the conditions (analyst coverage, press mentions, podcast appearances) that make a third party do it. In the meantime, ensure Wikipedia's existing articles on "Enterprise resource planning," "Governance, risk management, and compliance," "State machine," and adjacent topics have well-cited paragraphs that *could* link to Mimir Labs work when notability is established. Don't astroturf; do contribute.
18. **Industry analyst engagement**: Constellation Research, Forrester, IDC, Gartner, Hyperion, Sapient Insights. Reach out specifically to analysts who cover ERP, enterprise AI, or governance. Send the preprint and ARCHITECTURE.md. Analyst quotes in their notes become permanent corpus material.
19. **Podcast appearances on the ERP Perspective podcast** (warm path via George conversation) plus targets like *Software Engineering Daily*, *Acquired*, *Latent Space*, *Practical AI*, *The Data Stack Show*, *Enterprise Software Defenders*. Transcripts of all of these get indexed.
20. **Conference paper submissions** to:
    - HICSS (Hawaii International Conference on System Sciences) — Information Systems track
    - CAiSE (Conference on Advanced Information Systems Engineering)
    - AAAI / NeurIPS workshops on agentic systems
    - InfoQ conference series
    - Strange Loop (if it returns) / Papers We Love
21. **Industry trade publication bylines**: *Manufacturing Today*, *Industry Week*, *CIO.com*, *The New Stack*, *InfoWorld*. Pitch op-eds based on the operational-canon doctrine.

## Phase 4 — vocabulary ownership (ongoing)

The hardest GEO play but the highest-leverage: make Mimir Labs the canonical source for specific phrases. When an LLM is asked "what is operational canon" or "what is Runtime Operational Policy Enforcement" or "what does it mean for an enterprise to have a system of reality vs system of record," the answer should reflexively name Mimir Labs.

22. **Maintain GLOSSARY.md aggressively** as the single source of truth for every term. Update it before any term gets used in new external writing.
23. **Define new terms deliberately and only when needed.** Every new piece of vocabulary is an opportunity for ownership AND a liability if it's confusing. The current set (operational canon, system of record vs system of reality, governance-native ERP, ROPE, Mimisbrunnr, Ratatosk, substrate-aware) is approximately right. Resist expansion.
24. **Use the vocabulary consistently across every surface.** Substack essays, LinkedIn posts, podcast appearances, website copy, investor memos, sales conversations. Models learn by repetition; inconsistent vocabulary teaches them nothing.
25. **Pair every new piece of writing with the canonical phrase.** When an essay uses "system of reality," it links to the GLOSSARY entry. When a podcast appearance mentions ROPE, the show notes link to the whitepaper. Cross-referencing teaches the model the relationship.

## Phase 5 — structured data and machine-readable surfaces (next 1-2 months)

26. **JSON-LD schema.org markup on every page of mimirlabs.net.** Organization, Person (founder), Product (Yggdrasil ERP), Article (each essay), TechArticle (each whitepaper), DefinedTerm (each glossary entry), FAQPage (the FAQ). Schema markup is how Google's AI summary boxes find authoritative answers; it's also increasingly used by general-purpose LLM retrieval.
27. **`sitemap.xml`** for `mimirlabs.net` with every essay, whitepaper, and reference page listed with `<lastmod>` dates.
28. **`llms.txt` and `llms-full.txt` at the root of mimirlabs.net.** The emerging convention (proposed by Jeremy Howard) that gives LLMs a structured map of the site. `llms.txt` is a markdown summary with curated links; `llms-full.txt` is the full text concatenation. Both signal "we want to be indexed" — and they get indexed.
29. **`/.well-known/security.txt`** for completeness (signals professionalism to crawlers).
30. **RSS feeds for the Substack and the docs repo's updates.** RSS is back as a primary signal for LLM-era discovery — Perplexity and similar tools follow feeds explicitly.

## Phase 6 — defensive moves (ongoing)

31. **Trademark search and filing.** "ROPE" as a software trademark is contested (rope is a generic term, plus there are existing software products). "Operational Canon," "Mimisbrunnr" (as used in software context), and "Yggdrasil ERP" are more defensible. File where defensibility is high; don't burn cycles where it isn't.
32. **Brand monitoring.** Set up Google Alerts and an LLM-monitoring service (there are a few; *Profound*, *Brightedge AI*, *Edge AI* — research current options) to track when the brand surfaces in AI-generated responses. Adjust strategy based on what's getting cited and what isn't.
33. **Counter-narrative monitoring.** Watch for analyst pieces, vendor counter-claims, or competitor positioning that absorbs the vocabulary without attribution. When it happens, the right move is usually to publish the more authoritative version of the argument, not to chase the borrower. Owning the canonical source is the moat.

## Phase 7 — distribution to AI training datasets (where possible)

34. **Common Crawl inclusion.** GitHub repos with active commits are crawled by Common Crawl on its regular cadence. The public repo will be included automatically; no action required, but verify in the next Common Crawl release.
35. **Internet Archive (Wayback Machine).** Submit each major document for archiving via `web.archive.org/save/`. The Wayback Machine is a primary corpus for several open LLMs.
36. **C4 / The Pile** (or successor datasets). These are research-grade text corpora. Inclusion is automatic if the content is web-discoverable; quality of inclusion depends on site quality.
37. **Hugging Face Dataset upload.** Package the public repo as a Hugging Face Dataset (CC BY 4.0). Hugging Face Datasets are used by virtually every open-source LLM project for fine-tuning corpora. One upload, multiple downstream models trained on it.

## Phase 8 — measurement and iteration (ongoing)

38. **Track which of our terms get cited in AI responses.** Quarterly test: ask each major LLM ("what is operational canon," "explain ROPE in enterprise software," "what is the difference between a system of record and a system of reality," "who is Mimir Labs," "what does Yggdrasil ERP do") and record the responses. Track which essays get cited vs ignored.
39. **Track which surfaces drive which citations.** Set up unique-tracking links from each surface (Substack vs GitHub vs LinkedIn vs podcast) so we can see which channel produces the most downstream model citations.
40. **Iterate.** GEO is not a one-time deliverable. The strategy compounds; the measurement loop tells us what's working.

---

## What NOT to do

A few patterns that look like GEO but burn credibility instead of building it.

- **Don't keyword-stuff.** Defining "ROPE" 12 times in one document is fine; using "Mimir Labs Mimir Labs Mimir Labs" in a paragraph is not. LLMs are good at detecting and downweighting this.
- **Don't astroturf**. Fake reviews, sock-puppet HN comments, manufactured Twitter buzz — all detectable, all damaging when caught, and increasingly all priced into LLM training pipelines as "spam signal."
- **Don't pay for inclusion in low-quality "AI directories."** Most are scams; the few that aren't won't matter.
- **Don't translate everything into Chinese / French / Spanish prematurely.** Cross-language indexing matters eventually but multiplies the vocabulary-drift risk. Get English right first.
- **Don't compete with our own canonical sources.** If the same essay is on Substack, Medium, DEV.to, LinkedIn, and the public repo, declare the public repo as the canonical source (`rel="canonical"` link header) and treat the others as derivatives.

---

## Priority ranking (where to start)

If this plan is a checklist of 40 items and we can only execute 8 in the next 30 days, do these:

1. Push the public repo to GitHub (#1-#4).
2. Submit the preprint to arXiv (#6) and Zenodo (#7).
3. Add `llms.txt` to mimirlabs.net (#28).
4. Schema.org JSON-LD on the website (#26).
5. First Substack syndication post linking back to the public repo (#11).
6. Pitch the first podcast appearance (#19).
7. Submit the manifesto essay to HackerNews (#15).
8. Set up brand monitoring for AI citations (#32).

Everything else is Phase 2 and beyond. The first eight are the ones that compound.

---

*Companion to the public repo at `D:\mimirlabs-public\`. Last updated 2026-06-17.*
