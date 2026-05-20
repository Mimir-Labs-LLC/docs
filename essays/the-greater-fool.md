# The Greater Fool

**Every buyer pays more for the same broken thing. The system is not broken. It is working exactly as designed.**

*Draft — April 2026*

*Fifth in a series. Previous: [The Cost of Convenience](the-cost-of-convenience.md), [What We Take to the Moon](what-we-take-to-the-moon.md), [Glass Machines](glass-machines.md), [What the Builders Know](what-the-builders-know.md).*

---

Aaron Sorkin's *The Newsroom* opens with a college student asking why America is the greatest country in the world. Will McAvoy, an anchor who has spent his career not answering questions like this, finally answers. It isn't.

The speech worked because he was indicting his own profession. The news had stopped being news. It had become outrage and theater and access journalism with the questions pre-cleared. McAvoy spent the rest of the series on what he called a mission to civilize: tell the truth even when it cost the network advertisers, even when it made the audience uncomfortable, even when it got him fired.

He failed. The series ends with his executive producer calling him a greater fool, which she defines as the person who keeps buying when everyone else has stopped, the person who believes the asset has value after the market has decided it does not, the person whose continued participation is the only thing keeping the bubble alive. She means it as praise. Sorkin means it that way too. The industry McAvoy was indicting received the compliment and changed nothing.

Enterprise software has the same problem and no McAvoy.

## The death of facts

Every ERP vendor claims to be the single source of truth for the organization that buys it. The claim is intra-organizational, which makes it coherent on paper. Each customer only has one ERP, so one of them can plausibly be the home of record for the business it serves. What the claim does not have is an operational definition. There is no test that determines when an ERP has actually become that home of record. The phrase is aspirational. The aspiration is what gets sold. The operational reality is what the customer is left holding.

The operational reality of any manufacturer is multi-system. Engineering data lives in CAD and PLM. Shop floor data lives in MES. Customer interactions live in CRM. Quality data lives in standalone QMS. Financial reconciliations live in spreadsheets the controller maintains personally. The ERP is the destination these systems feed, badly, with whatever subset of their data the integration was designed to surface. The single source of truth is downstream of four other sources, each of which has its own legitimate claim to being the system of record for the slice it owns. The ERP holds an aggregate. The aggregate is wrong without the upstream sources, and reconciling them is the work that consumes the controller's first week of every month.

The single source of truth is the source the organization has agreed to write down. It is not the source the organization actually trusts. The gap between the two is the gap the vendor was paid to close, and did not.

Every vendor is also AI-ready. The phrase has no schema requirement, no governance requirement, no data quality threshold. A vendor is AI-ready if they say they are. The customer has no way to falsify the claim until eighteen months into the implementation, at which point the cost of admitting the claim was false exceeds the cost of pretending it wasn't.

The 56% implementation failure rate is documented and reproducible.[^1] It does not appear in any vendor deck. Analyst firms whose research budget is funded by the vendors they rate do not lead with it. Industry conferences do not feature panels titled *Why More Than Half Of Us Failed*. The fact exists. The market behaves as if it does not.

This is not a knowledge problem. The CIO who is about to sign a $2M Oracle contract has read the same studies as the CIO who got burned three years ago. The information is freely available. What is missing is social permission to act on it. The vendor's deck is the official truth. The Panorama study is alternative truth. The two coexist in the procurement meeting, and the one that survives contact with the CFO is the one that comes with a logo on the cover and a senior sales executive at the table.

A field in which the load-bearing facts are optional is a field that has stopped being an engineering discipline. It has become a rhetorical one. The person with the better narrative wins, and the buyer pays for the gap between the narrative and the schema.

## The weaponization of outrage

The dominant message of enterprise software marketing is fear. Your stack is legacy. Your competitors are eighteen months ahead. The window is closing. If you do not transform now, you will be out of business by 2027. The transformation requires this product, sold by this vendor, implemented by this partner, and the budget needs to be approved this quarter.

None of this is true in the way it is presented. Most legacy systems work fine for the operations they were built to support. Most competitors are not eighteen months ahead. Most windows are not closing. The transformation, when it happens, is not transformation. It is replacement of one expensive system with another expensive system that produces approximately the same outputs, with a multi-year implementation in between during which the organization's operational knowledge degrades, its staff turns over, and its data drifts further from ground truth.

The reasonable position is that the current system is probably fine, that replacing it will cost more than fixing it, and that the AI being sold on top of it cannot work on the existing data regardless of which substrate it runs on. The reasonable position does not sell consulting hours. It does not get featured in Gartner reports. It does not produce keynote slots. It is structurally invisible because no one in the value chain benefits from voicing it.

This is McAvoy's complaint about cable news, transposed. Outrage drives engagement. Nuance does not. The industry that monetizes panic has no incentive to lower the temperature, and the career of anyone whose job is to lower the temperature ends early. Panic is the business model. Calm is a career risk.

Nuance is relegated in a further and less obvious way. The buyer who asks the right questions gets branded as a difficult procurement. The implementation partner who tells a client they do not need the premium tier does not get the next engagement. The analyst who writes that a given product's strengths are narrower than the vendor claims does not get the next briefing. The system selects, at every layer, for the voice that amplifies the panic and against the voice that qualifies it. Over time the qualifying voices leave, and the only voices left are the ones who benefit from the noise.

## Mission to viralize

McAvoy's mission to civilize required producing the news the audience needed to hear, not the news that would generate the most clicks. He was not optimized for engagement. He was optimized for being right. The show's thesis was that being right was a civic obligation that had been abandoned in favor of a market one, and that the abandonment was the reason public discourse had collapsed.

Enterprise software thought leadership is optimized for engagement. The viral LinkedIn post is *Ten Signs Your ERP Is Dead*. The viral post is not *Here Is How To Read Your Existing Schema To Determine Whether It Is Actually Dead*. The first takes ten minutes to write and gets ten thousand impressions. The second takes a week to write and gets four hundred. The market is not paying for the second one.

The conference keynote is *The Future Of Manufacturing Is AI*. The keynote is not *Most Manufacturers Cannot Run Their Current ERP Reliably, Which Is A Prerequisite For Any AI That Touches Their Data*. The first books the speaker on the next conference. The second does not.

The industry analyst report is *The Magic Quadrant For Cloud ERP*. The report is not *A List Of ERP Implementations That Failed In The Last Twelve Months And What They Have In Common*. One generates vendor advertising revenue. The other would generate lawsuits.

The mission to civilize was always going to lose to the mission to viralize. McAvoy lost. The civic-minded anchor was replaced by the brand, and the brand does not answer questions. The thoughtful technology essayist is being replaced by the LinkedIn influencer who writes about AI agents in three-sentence paragraphs with a lot of emoji and a header image generated by Midjourney. The replacement is not a moral failure of the individuals involved. It is a selection pressure. The market selects for what it pays for, and it does not pay for being right.

The tragedy is that being right is still what the customer actually needs. The manufacturer whose ERP implementation is about to fail does not need another keynote about the AI-ready future. They need someone to read their schema and tell them the truth about it. That work exists. It is being done, in some cases, by the people named in the previous essay in this series. It is not being surfaced to the people who would benefit from it, because the surface has been colonized by content optimized for a different metric entirely.

## The greater fool

The enterprise software market is a greater fool market. Each new buyer pays more than the last for a system that has not materially improved. The buyer believes the price is justified because the previous buyer paid almost as much and did not admit failure publicly. The vendor believes the price is justified because someone is willing to pay it. The analyst believes the price is justified because the vendor pays for the analyst's research. The consultancy believes the price is justified because the implementation revenue is a multiple of the license cost. Every participant has a reason to keep the music playing.

The customer who walks away is the only one who breaks the loop. There are not enough of them. The ones who do walk away are absorbed back into the market eighteen months later when the new CIO arrives and the cycle begins again. Institutional memory does not survive the personnel transition. The next greater fool is recruited from inside the same building that just got burned, and the decision they make is informed by the same vendor decks, the same analyst reports, and the same conference keynotes that informed the decision that burned their predecessor. The substrate of the conversation has not changed. Only the name on the contract.

This is the mechanism McAvoy was describing about the news, and it is why his mission failed. You cannot tell the truth into a market that is structurally incentivized not to hear it. The buyer does not want to know. The seller does not want to say. The intermediary is paid to translate between the two in a way that keeps both parties believing the transaction made sense. The truth is the externality. It has nowhere to land.

## What this means for the work

I have spent the last ten weeks building a platform that is, in the market's terms, a worse bet than what is already being sold. It does not have a magic quadrant placement. It does not have an analyst relationship. It does not have a thought leader writing about it on LinkedIn in three-sentence paragraphs. It does not viralize.

What it has is a position the market has structurally excluded. The work is the work. The data is either organized or it is not. The integration either runs or it does not. The AI either has a substrate it can reason about or it does not. There is no way to brand this position into something the existing market wants to buy. The market is optimized for the greater fool. The product I am describing is optimized for the customer who is trying to stop being one.

That is a small population. It is also the only population worth building for. The greater fool market is self-consuming. Each cycle leaves more burned customers, more failed implementations, more data debt compounded on top of data debt that was never resolved. At some point the substrate gives out. The AI layer the whole industry is promising cannot be built on data that does not mean what it says. The bet that the next buyer will keep showing up has, historically, been a safe bet. It is becoming less safe as the consequences of the failure move from inconvenience to material risk.

The mission to civilize lost once already, in a different industry, in front of a different audience. McAvoy did not get to see it win. He got to see it named, which is a smaller victory but not a trivial one. Naming the thing is the prerequisite for anything else.

This is me naming it.

---

## Sources

[^1]: Panorama Consulting, *2023 ERP Report*, finding that 56% of ERP implementations exceed planned budget.

Aaron Sorkin, *The Newsroom*, HBO, 2012–2014. The "greatest country" speech opens episode 1.01 ("We Just Decided To"). The greater fool exchange closes the series in episode 3.06 ("What Kind Of Day Has It Been"). The "mission to civilize" runs throughout the series, most explicitly in McAvoy's dialogue with Charlie Skinner in season 1.
