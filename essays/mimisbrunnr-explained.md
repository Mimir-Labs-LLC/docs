# Mimisbrunnr, Explained

*Or: why we built a database schema and then refused to let anyone change it.*

*Sixth and final in a series. Previous: [The Cost of Convenience](the-cost-of-convenience.md), [What We Take to the Moon](what-we-take-to-the-moon.md), [Glass Machines](glass-machines.md), [What the Builders Know](what-the-builders-know.md), [The Greater Fool](the-greater-fool.md).*

---

The previous essays in this series described a problem in five layers.

*The Cost of Convenience* described how the debt was accumulated. Every enterprise system was built by people optimizing for today's shipping deadline. Those choices made sense at the time. They have compounded over thirty years into an operational liability that no one in the current commercial value chain claims credit for.

*What We Take to the Moon* described what the debt now costs. AI operating on data that does not mean what it says produces confident wrong answers at scales that do not forgive error. Automation amplifies bad inputs faster than any reviewer can catch them.

*Glass Machines* described the cost structure that results when a product does not work on delivery. Every comparable industry, from aviation to printers to defense, has faced a reckoning about this. Enterprise software has so far avoided the same reckoning by selling the reckoning itself, over and over, to buyers who did not know they were buying it.

*The Greater Fool* described the market structure that kept the broken product moving anyway. Every participant in the value chain, from vendor to analyst to consultancy to incoming CIO, had a reason to pass the bag to the next buyer at a higher price. The reasonable voices were structurally excluded, not because the market is malicious, but because the market is optimized for a metric that does not pay for being right.

*What the Builders Know* described the mechanism by which all of this has persisted without self-correction. The engineers who designed the systems under discussion are almost entirely absent from the public conversation that describes them. Silence at the layer where the problem could have been named plainly is the load-bearing dysfunction, and the one that made the other four sustainable.

Each essay named a different part of the same failure. This essay describes what we did about it.

---

Most enterprise software problems, when you unwind them, turn out to be the same problem in different clothing.

A customer record in the CRM is not the same customer record in the ERP, which is not the same customer in the support system. A part number in engineering means something subtly different in manufacturing, which means something else in purchasing. Your finance team asks for revenue by territory and three systems return three different numbers, all of them correct by their own definitions and none of them usable for the question that was asked.

This is not a data quality problem. It is a vocabulary problem. The systems that run your company have never agreed on what the words mean, and every attempt to bolt an agreement on top after the fact has produced translation layers that work most of the time and fail in ways that are hard to predict. The modern enterprise runs on approximations of its own state because the systems describing that state do not share a language.

Mimisbrunnr is what we built to fix this. It is not a product, not exactly. It is the vocabulary underneath our products, and the reason the products can do things that products built on top of ordinary enterprise schemas cannot.

## The Name

Mimisbrunnr, in Norse mythology, is the well of wisdom at the base of the world tree. It is guarded by Mímir, one of the Æsir, who drinks from it daily and whose wisdom is the reason the other gods consult him. Odin traded an eye for a single drink from it. The well is not to be confused with Urðarbrunnr, the well at another of Yggdrasil's roots, which is tended by the three Norns and deals in fate rather than accumulated knowledge. Mímisbrunnr is specifically a place where meaning and memory are stored, and where anyone drawing from it gets the same water. That is what a canonical data model is supposed to do, and what the ones currently on the market do not.

## What It Actually Is

Mimisbrunnr is a shared semantic reference model for business information systems. In practical terms, it is a database schema: 166 tables, organized into 17 business domains (CRM, sales, purchasing, manufacturing, warehouse, finance, projects, PLM, quality, service, HR, logistics, integration, infrastructure, scheduling, fleet, and MRP). Every table has a defined meaning. Every column has a defined meaning. Every relationship between tables has a defined meaning. The meanings do not change per customer, per deployment, or per industry.

That last sentence is the most important one. Every existing enterprise software platform lets its customers modify the data model. SAP has customizing tables. Oracle has flexfields. Salesforce has custom objects. Microsoft Dynamics has option sets. The ability to add fields, tables, and relationships is marketed as flexibility and sold as value.

We do not permit it. Mimisbrunnr does not have customer-specific extensions. It does not accept new tables submitted by customers. It does not grow a new column when a customer asks. The vocabulary is fixed.

This sounds like a limitation. It is the opposite.

## How It Works

Here is the simplest illustrative case. Imagine two companies need to exchange customer data. Company A runs SAP. Company B runs NetSuite. Today, the integration between them requires a translation layer that maps SAP's customer table to NetSuite's customer table, field by field, making judgment calls about every ambiguity, and breaking every time either vendor changes its schema.

Now imagine both companies have mapped their internal data to Mimisbrunnr. Company A's integration only needs to know "our SAP data maps to Mimisbrunnr this way." Company B's integration only needs to know "our NetSuite data maps to Mimisbrunnr this way." The translation between A and B no longer exists. Both companies speak Mimisbrunnr to the intermediate layer, and the intermediate layer speaks Mimisbrunnr back. If a third company joins, running a third system, it maps to Mimisbrunnr once and can now exchange data with both A and B without any further work.

Every successful interoperability standard in history has this structure. TCP/IP is the shared vocabulary the internet runs on, and it works because every participating network uses the same addressing, packet format, and handshake semantics. The Dewey Decimal System lets any library in the world catalog a book that any other library in the world can locate, because the vocabulary is shared. SWIFT lets a payment instruction written in Tokyo be machine-readable in Zurich, because every participating bank implements the same message format. In each case, the participants give up the ability to use their own private conventions in exchange for the ability to communicate with everyone else. The tradeoff is almost always worth it.

The enterprise software industry has tried to build its equivalent of TCP/IP several times (OAGIS in 1995, ebXML in 1999, RosettaNet around the same period, ISA-95 for manufacturing operations, the Microsoft-SAP-Adobe Open Data Initiative in 2018) and has never succeeded. Every attempt allowed participants to extend the vocabulary with their own custom additions, and extensibility is the thing that destroys a standard. A vocabulary that everyone speaks plus some words that only some people speak is no longer a vocabulary. It is a dialect network, and a dialect network produces the same fragmentation the standard was supposed to prevent.

Mimisbrunnr does not allow extensions. The constraint is the mechanism.

## Why the Constraint Works

Biology figured this out about three and a half billion years ago, and the lesson is worth taking seriously because the alternative is to believe that businesses are more varied than organisms, which they demonstrably are not.

Every living thing on earth, from bacteria in deep-sea vents to blue whales to the fungi networking a forest floor, runs on the same biochemical alphabet: four nucleotide bases, sixty-four codons, twenty amino acids. The vocabulary is fixed. It has not changed in three and a half billion years. And out of that fixed vocabulary, biology has produced every organism that has ever existed, in every environmental niche, under every selection pressure. There is nothing in human experience, no technology, no market, no civilization, that approaches the range of specialization biology has achieved on that tiny alphabet.

The reason the constraint works is that diversity is a property of configuration, not of structure. A human differs from a fruit fly not because humans have a twenty-first amino acid. It is because the same twenty amino acids are arranged in different sequences, in different quantities, under different regulation. The vocabulary is identical. The literature is infinite.

Enterprise data is the same problem with the same solution. A manufacturing company in Harrisburg and a food processor in Dallas do not have different data. They have different configurations of the same data. Both have customers, parts, orders, inventory, and invoices. The differences are in the workflows, the statuses, the business rules, the approval chains, and the reporting. Those differences live in configuration, not in the schema.

Mimisbrunnr bets that this is true for every business, and that the bet is defensible because it is the same bet biology has been winning for three and a half billion years.

## How the Mapping Actually Happens

The translation from a source system to Mimisbrunnr is not done by hand, and it is not done by AI. We built a governance tool called Ratatosk specifically to handle the classification. Ratatosk reads a source system's schema, compares its tables and columns against the Mimisbrunnr vocabulary using deterministic rules and a dictionary of synonyms accumulated across hundreds of ERP platforms, and produces an auditable mapping with a confidence score on every assignment.

The deterministic part is load-bearing. A mapping built on machine learning varies across runs, drifts as models update, and cannot be audited by a migration team or a regulator after the fact. Probabilistic mapping is not a vocabulary. It is a suggestion dressed up as one. Ratatosk produces the same answer every time it is given the same input, which is the property the downstream representation requires in order to be trusted.

The human in the loop is load-bearing too. Ratatosk proposes mappings, flags ambiguities, and explains its reasoning for each assignment. It does not commit anything to the operational manifest until a human has reviewed, edited where necessary, and approved. The tool does the work; the human does the accepting. This is how you get the efficiency of automation without the unaccountability of automation, which is what data governance requires and what most existing tools in the category fail to provide.

This is also the governance posture *What the Builders Know* argued the field had quietly abandoned. The engineer who can override the algorithm is the person whose work earns the right to be called data governance. A tool that commits without a reviewer is not governance. It is automation wearing the word.

## What Makes It Different

Three properties distinguish Mimisbrunnr from the canonical-model attempts that have failed.

**It is immutable.** The vocabulary is fixed at publication. Customers do not extend it. Deployments do not fork it. Vendors do not negotiate additions with individual buyers. The immutability is what makes the vocabulary reliable, because every participant in the ecosystem knows that the schema they are mapping to today is the same schema every other participant is mapping to, and the same schema they themselves will be mapping to in five years.

**It is operationally grounded.** The 166 tables were not designed in committee. They were derived from decades of observation of how manufacturing and adjacent industries actually run. Every table represents a category of entity that real businesses actually track. Every relationship represents a connection that real businesses actually make. The schema is not an academic idealization of business operations. It is an empirical distillation of them.

**It is provider-neutral in function.** Mimisbrunnr is not a product you buy. It is the vocabulary underneath the products we build and the products we think other people should build. We do not license it separately. We do not charge per table. The vocabulary exists so that the tools (ours and anyone else's) can interoperate. Our commercial interest is in being a compelling implementation of the vocabulary, not in owning the vocabulary.

## On Stewardship

The obvious question, once a reader accepts that a shared vocabulary would be valuable, is why Mimir Labs should be the ones maintaining it. Every vendor that has ever shipped a proprietary schema has claimed it was designed for the good of the customer. Every one of them has eventually bent the schema to commercial convenience. The reader is right to ask what keeps us from doing the same.

"We built it" is not a sufficient answer. It is the same answer SAP, Oracle, and Microsoft give, and it is the answer that has produced the current state of affairs. Stewardship legitimacy has to come from something more structural than creation.

Four claims, each of them testable over time rather than promised in marketing:

**Our commercial incentives are aligned against corrupting the vocabulary.** Mimir Labs makes money on tools, implementations, and services, not on the vocabulary itself. The schema is not licensed as a separate product and not monetized as a revenue line. If we made the vocabulary harder to work with to extract more revenue, we would harm our own products before we would harm anyone else's, because our products depend on the vocabulary being usable. The extraction economics that bent every prior schema do not apply here because the thing being extracted from is not the thing generating our revenue.

**The schema has operational origins, not committee origins.** The people who built Mimisbrunnr were practitioners before they were software builders. The 166 tables represent empirical observation of how manufacturing and adjacent industries actually operate, distilled over years of direct exposure to the work. Committee-designed canonical models fail in specific ways that operational-origin models do not, because committees optimize for inclusion of every participant's preferences rather than for faithful representation of real operations. Mimisbrunnr was never put through that process, and its survivability is higher as a consequence.

**We have skin in the game.** Every Mimir Labs product (Ratatosk for governance, Ragnarok for migration, Bifrost for integration, Yggdrasil for operational work) depends on the schema being stable. We cannot break it without breaking ourselves first. This is a structural guarantee that arbitrary commercial pressure cannot easily override. If we decided tomorrow to extract rent by making the schema harder to use, our own implementation layer would be the first casualty.

**We would cede stewardship if a better home existed.** If the ecosystem produced a genuinely neutral body willing and able to maintain the vocabulary with the properties that make it useful (immutability, operational grounding, provider neutrality), we would hand it over. We have not done so today because no such body currently exists that we trust to preserve those properties. The canonical-model standards bodies of the past have all failed at this task, usually by admitting extensions. Until an alternative with a credible track record appears, we are the least-bad current option, and we say that without self-congratulation.

One honest qualification before closing this section. As of this writing, Mimisbrunnr is accessible primarily through Ratatosk rather than as a standalone published specification. We do not yet publish the schema as a document that anyone can implement against independent of our tools. This is a real gate, and a reader skeptical of stewardship claims is right to notice it.

The reason is maturity, not commercial intent. Mimisbrunnr is still actively evolving. Domains are being added, definitions are being refined as edge cases surface, and breaking changes during this period are likely. Publishing the schema as a standalone specification right now would either lock us into decisions that experience has not yet tested, or force every external implementer to absorb churn that we should be absorbing ourselves while the vocabulary earns the right to be depended on. The gate exists because the product is unproven, not because we intend to keep it gated.

The commitment is that as the schema stabilizes and the implementation base grows, we will publish the specification in a form anyone can use, independent of our tools, with versioning, change notes, and the kind of public governance that shared infrastructure requires. We are not asking readers to take that commitment on faith. We are asking them to evaluate it against what we actually do over the next few years.

None of the four claims above requires the reader to trust us now. Each one is verifiable across years of behavior: whether we monetize the vocabulary, whether we break compatibility for commercial reasons, whether we resist third-party implementations, whether we eventually publish the specification, whether we transition stewardship when circumstances warrant. The record accumulates whether anyone is watching or not, and the answer to "why Mimir Labs" is ultimately a record rather than an argument.

## What It Is Not

Mimisbrunnr is not a new ERP schema competing with SAP's or Oracle's. It is a shared reference that any ERP can map to, including SAP and Oracle installations that will never move off those platforms.

It is not a standard imposed by a standards body. We built it, we maintain it, and we are committed to keeping it stable, but we are not asking for ISO certification or industry consortium blessing. Those processes have failed at this task many times, and we do not have the patience or the naïveté to try again.

It is not a replacement for your data model. It is a layer above it. Your systems keep their own schemas. The mapping to Mimisbrunnr lives at the integration layer, and the Mimisbrunnr representation is what travels between systems and gets used for cross-system analytics, AI, and interoperability.

It is not AI. There is nothing probabilistic about it. The mappings are deterministic. If you run the same data through the same mapping rules, you get the same result every time. This is a feature, not a limitation. AI systems operating over data mapped to Mimisbrunnr know what they are looking at, because the shapes in the data match the shapes the receptors expect.

## What This Means For You

If you are a manufacturer running on an ERP you are unhappy with, Mimisbrunnr is the pathway out. Our migration tool uses Mimisbrunnr as the neutral intermediate representation, which means your data becomes portable in a way it currently is not. You are not replacing one proprietary trap with another. You are translating your existing system into a vocabulary that other systems also speak, after which you can move at whatever pace makes sense.

If you are a manufacturer running an ERP you are stuck with for structural reasons (compliance, legacy integrations, organizational inertia), Mimisbrunnr gives you an option for cross-system analytics and AI readiness without forcing a migration. Your current system can remain your current system. The data it produces can flow into a Mimisbrunnr-mapped representation that your other systems, your analytics tools, and your AI platforms can trust.

If you are building software and you want it to interoperate with other software, Mimisbrunnr is available as a vocabulary you can map to. We did not build it only for our own products. We built it because the entire category needs a shared language, and we are willing to be the ones who maintain the dictionary.

## The Honest Caveat

Mimisbrunnr is not finished. No vocabulary ever is. We add domains as the scope of the platform grows. We refine definitions as edge cases surface. We do not extend to satisfy individual customer requests, but we do evolve carefully, with published notes, backward-compatible changes, and the kind of stewardship that shared infrastructure requires.

We are also not the only people thinking about this problem. There are serious efforts elsewhere (dbt Labs on the semantic layer, Atlan and Collibra on the catalog, various open-source projects on interoperability) and we consider them allies more than competitors. The enterprise software industry has been running on approximations for thirty years. The question of who fixes it is less important than whether anyone does.

We think the fix is possible. We think it requires a shared vocabulary that does not permit extensions, owned by someone whose commercial interest is in being a good implementer rather than in controlling the vocabulary. We think the biological analogy is an instruction manual.

Mimisbrunnr is what you get when you take that instruction manual seriously.

## Closing the Arc

We wrote five essays before this one because the problem has five parts, and naming one part without the others produces the wrong conclusions. A reader who sees only the debt tries to refactor their way out of what is actually a commercial problem. A reader who sees only the market dynamic turns cynical and builds nothing. A reader who sees only the silence writes essays of their own and waits for the field to wake up. The field has been waiting to wake up for thirty years.

Mimisbrunnr is the structural answer to one part of the problem. It is the shared vocabulary the category has needed for that entire thirty years and has not produced. A shared vocabulary does not fix the commercial incentives that bent every prior schema. It does not restore the voices the field selected out. It does not replace the enterprises that have already written off their ability to operate on their own data.

It does one thing. It removes the approximation tax that every cross-system operation currently pays because the systems do not agree on what the words mean. That tax is what funds most of the failure modes the preceding essays described. Removing it is not sufficient to fix the category. It is, as far as we can tell, necessary.

What the vocabulary gives you, if it works, is the ability to build the next thing on data that means what it says. Whether that next thing is another ERP, an AI agent operating over business operations, an integration platform, or a migration service, it gets to operate on ground truth rather than on translations of translations. The rest of the category's problems do not get solved by this. They do, for the first time, become solvable.

That is the whole ambition. The essays name the problem. This essay names the contribution. The record accumulates whether anyone is watching or not.
