# No AI Will Fix Your Broken Data Layer

*Draft — April 2026. Written for straight-to-LinkedIn publication. Standalone, not part of the main essay series.*

---

The enterprise software industry has spent three years retrofitting the word "AI-native" onto products that predate LLMs by decades. Every dashboard now has a natural-language bar. Every ERP has an AI copilot. Every SaaS CRM has a conversational interface. The marketing is relentless, the funding rounds are enormous, and Panorama Consulting's 2023 survey still finds 56% of ERP implementations miss their budget. The AI layer did not change that. Neither did any of the other layers.

These products are sitting on top of a data architecture that was broken before anyone added them. No amount of layering fixes the substrate.

## The four flavors of useless layer

Most of what ships as "enterprise AI" or "modern SaaS" falls into one of four categories. Each one sells a specific version of the same promise, and each one fails for the same reason.

### 1. Toy SaaS

A small vertical app that reads data out of your existing systems and surfaces it in a prettier or more specialized interface. Rillet for finance close. ActivTrak for productivity. Two dozen narrowly scoped analytics products with two-year-old logos and a first-quarter fundraising round behind them.

The pitch: we will take your existing data and give you faster, cleaner insight.

The reality: if your existing data has three different definitions of "customer" living in three different systems, the toy SaaS gives you a faster, prettier, cleaner rendering of whichever inconsistency it happened to resolve first. It does not reconcile the conflicts. It does not know they exist. What you bought is a more efficient way to be wrong.

### 2. UI wallpapering

The incumbent vendor ships a new interface on top of a twenty-year-old schema. SAP Fiori. Salesforce Lightning. Oracle Redwood. The press release talks about "modern user experience" and "mobile-first design." The schema underneath is untouched.

The pitch: we have modernized the platform.

The reality: the things that were broken about the platform in 2003 are broken about it today. The schema still has twelve ways to denote a customer. The master data is still scattered across six systems. The reports that produced wrong numbers at quarter-end in the old UI produce the same wrong numbers in the new UI, just with rounder buttons.

### 3. AI-native

The vendor bolts an LLM onto the product and pitches conversational access to the enterprise data model. Ask your data anything. Our AI understands your business. Natural-language queries that "just work."

The pitch: AI makes your data easier to use.

The reality: AI reasoning over broken data produces confident wrong answers faster than any previous technology in the category. Before AI, a human reading an incorrect report had some chance of noticing the inconsistency. Column headers, decimal places, row-by-row scanning: the textual cues were there if you knew to look. After AI, the inconsistency has been smoothed into a fluent paragraph and the cues are gone.

The worst feature of AI-native products is exactly the feature the marketing celebrates. They are fluent. They are confident. They sound correct. They cannot be correct when the substrate is not correct, and they cannot tell the difference.

### 4. Analytic abstractions

Data lake. Data warehouse. Data mesh. Data fabric. Customer data platform. Master data management. Each one a new place to put the mess, marketed as a place that fixes it. Each generation of the category has promised that a single source of truth would emerge from copying all your broken data into a different shape.

The pitch: bring all your data into one place and you will see the truth.

The reality: moving contradictory data into a bigger storage system does not resolve the contradictions. It relocates them. The customer record in Snowflake still disagrees with the customer record in Salesforce, because neither system has agreed with the other on what "customer" means. The bigger storage system adds storage costs, pipeline complexity, and a new vendor to pay. It does not add agreement.

The most honest category here is MDM, which at least admits in the acronym that master data requires management. The products rarely deliver on that admission. They tend to become reconciliation consoles that surface the problem rather than tools that solve it. Surfacing is useful. It is not the same as solving.

## Why vendors ship layers instead of fixes

The answer is structural, not malicious.

Fixing the data layer of an enterprise product means admitting that the old data layer was broken. That admission damages the vendor's ability to sell upgrades to existing customers who paid full price for the old layer. It damages the analyst relationships that depend on treating the old layer as the industry standard. It damages the consulting relationships that depend on implementing the old layer correctly enough to meet quarterly milestones.

A new layer on top, by contrast, is clean to sell. It is marketed as "evolution" rather than "correction." It is installed on top of the existing installation without disturbing it. It adds a line item to the customer's budget rather than replacing one. It preserves every vendor relationship in the value chain and asks the customer to pay more for the privilege.

The substrate stays broken because the commercial incentives of every participant in the value chain point away from fixing it. The buyer who eventually pays for the third layer on top of the second layer on top of the broken substrate is the greater fool the market requires in order to keep working. Each participant had a reason to keep the music playing.

## The test every buyer can run

If you are evaluating a product that claims to fix something about your enterprise data environment, run one test.

Ask the product to produce a verifiable operational number. Last month's revenue by customer. Current inventory in the Dallas warehouse. Open work orders past due by more than thirty days. Pick a number you already know the correct answer to, or can verify by hand.

Watch how the product arrives at it.

Then check what happens when the source systems disagree. Your ERP says one number. Your CRM says another. Your warehouse system says a third. Which one does the product return? Does it flag the disagreement? Does it explain the reconciliation? Does it ask you which definition you intend?

If the product silently picks one and reports it, the product is not solving your data problem. The product is giving you a more fluent way to pick wrong. You now have the same contradictions you had before, buried under a confident-sounding interface that makes them harder to see.

If the product cannot even tell you that three systems disagree, it has no model of your data. It has a model of its own interface. Those are not the same thing, and enterprise software has been selling the second pretending to be the first for three decades.

## What actually needs to happen

The substrate is the problem. The substrate is what has to be fixed. Every other conversation in the industry is a way of deferring that fact.

Fixing the substrate means reconciling the three customer definitions. It means agreeing on what "revenue" is in operational terms rather than in reporting terms. It means deciding which system owns each attribute and enforcing that decision across every integration. It means the boring, unsexy, unglamorous work of data governance that no vendor can sell because the vendor is not the party with the context to do it.

Products can help. The right products read your data layer and tell you honestly where the conflicts are. They do not smooth the conflicts into a pretty chart. They surface them, explain them, and let you decide what to do about them. They produce artifacts a human can audit, not fluent responses a human has to trust.

That is a much smaller category of product than the AI-native wave. It is the one the category actually needs.

## The takeaway

You can tell the difference between a layer and a product when the demo is running. If the demo answers every question fluently, you are looking at a layer. If the demo sometimes tells you "I cannot reliably answer this until your data says what you think it says," you are looking at a product. The first is easier to sell. The second is harder to sell and easier to trust.

Every buyer in 2026 has the same decision to make. The question is not which vendor has the flashiest AI or the cleanest interface. The question is whether the tool in front of you is correcting the problem underneath or charging you a subscription to ignore it.
