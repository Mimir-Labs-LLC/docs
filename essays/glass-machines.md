# Glass Machines

*Every expensive machine in the world works when it arrives. Except one.*

*Third in a series. Previous: [The Cost of Convenience](the-cost-of-convenience.md), [What We Take to the Moon](what-we-take-to-the-moon.md). Next: [What the Builders Know](what-the-builders-know.md) (forthcoming).*

---

There is a pattern in capital-intensive industries that rarely gets named directly. In several sectors, the lifetime maintenance cost of a high-value asset exceeds the purchase price of the asset itself, sometimes by an order of magnitude. Complex machines operating in demanding environments require ongoing care. Nobody disputes that. The relevant question is what you get for the purchase price before maintenance begins.

In every industry but one, the answer is: a working machine.

---

## The Maintenance Premium

A Lockheed Martin F-35 costs approximately $80 million per unit. The estimated lifetime sustainment cost (parts, labor, software updates, depot maintenance) runs to roughly $700 million per aircraft over a projected thirty-year service life.[^1] Nearly nine times the purchase price. The Department of Defense knows this. The Government Accountability Office writes reports about it regularly. Lockheed designed the logistics information system so that only Lockheed can service the aircraft: proprietary diagnostics, classified repair procedures, sole-source parts.

But the F-35 flies on delivery day.

A Rolls-Royce Trent XWB jet engine costs $15–30 million. Lifetime maintenance runs $50–100 million, delivered through "Power by the Hour" contracts that Rolls-Royce pioneered to make the engine sale a break-even entry point for the service annuity.[^2] The engine is the razor. Flight hours are the blade. GE Aviation and Pratt & Whitney adopted the same model. Every vendor designs the engine to require vendor-specific tooling, vendor-trained technicians, and vendor-supplied parts.

But the engine generates thrust on delivery day.

A GE Healthcare MRI machine costs $1–3 million. Annual service contracts run $100,000–200,000 over a ten-to-fifteen-year operational life.[^3] The OEMs make more margin on service than on hardware. Third-party maintenance providers like Block Imaging exist for the same reason Rimini Street exists in enterprise software: OEM service pricing is indefensible.

But the MRI produces diagnostic images on delivery day.

An HP inkjet printer costs $200. Ink cartridges over its lifetime cost $3,000–5,000.[^4] DRM chips on the cartridges prevent third-party refills. It is the consumer-scale version of proprietary database schemas preventing third-party ERP support.

But the printer prints on delivery day.

A GE gas turbine costs $50–100 million. Long-term service agreements run $200–500 million over the asset's operational life.[^5]

But the turbine generates power on delivery day.

In every case, the maintenance premium funds wear mitigation, consumable replenishment, regulatory compliance, and performance optimization of a machine that *already works*. The customer pays to sustain function, not to achieve it. The product ships complete. Maintenance keeps it that way.

---

## The Exception

An enterprise resource planning system (SAP, Oracle, Microsoft Dynamics, Epicor, Infor) costs $1–5 million in license fees. Implementation adds $5–50 million depending on scope and complexity.[^6] Annual maintenance and support contracts typically run 18–22% of the license fee. Over a ten-to-fifteen-year lifecycle, total cost of ownership reaches $10–50 million. Often ten times the original license.

And the system does not work on delivery day.

Every major ERP research organization that has studied the question agrees. Panorama Consulting's 2023 ERP Report found that 56% of ERP implementations experienced cost overruns, with an average overrun of 26%.[^7] The Standish Group's data consistently shows that large IT projects (of which ERP implementations are the canonical example) deliver full intended functionality less than 30% of the time.[^8] Gartner has estimated that through 2027, 55% of ERP strategies will fail to deliver the benefits in the original business case.[^9]

These are not failures of maintenance. They are failures of delivery. The machine does not work when it arrives.

No jet engine manufacturer would survive a 56% failure rate on delivery. No MRI vendor would remain in business if a quarter of their installed units produced images that were directionally correct but clinically unreliable. No turbine manufacturer would retain contracts if more than half their installations required years of post-delivery work before generating power at rated capacity.

ERP vendors do not merely survive this record. They thrive on it. Unlike every other industry on this list, the ERP maintenance premium does not pay for upkeep of a working machine. It pays for completion of an unfinished one.

---

## The Glass Menagerie

What the vendor delivers is not a machine. It is a menagerie: a beautiful, intricate, comprehensive-looking collection of modules, dashboards, workflows, and configuration tables that gleams on the shelf and shatters on contact with the factory floor.

It looks complete. The demo environment works perfectly because it was built to demonstrate, not to operate. The sales deck shows every module: finance, manufacturing, supply chain, quality, HR, CRM, service, purchasing, warehouse. The impression is totality. The promise is a single system that does everything, knows everything, and connects everything.

Then go-live happens.

The chart of accounts doesn't map to how the business actually recognizes revenue. The item master doesn't accommodate the BOM structures the shop floor has used for fifteen years. The warehouse locations don't reflect the physical layout because the implementation team modeled the conceptual layout from the system design workshop. The quality module requires inspection data in a format the quality team has never used. The manufacturing module's scheduling logic assumes a job-shop model but the plant runs a hybrid flow-shop. The CRM module stores customer records, but the definition of "customer" conflicts with the definition used by the finance module in the same system.

Each piece is glass. Beautiful, precise, and unable to bear the weight of actual operations.

The implementation partner responds predictably: this is a change management problem. The users need training. The business processes need to conform to "best practices," which really means the business needs to conform to the software, not the other way around. The vendor points to the contract, which specifies delivered functionality, not delivered outcomes. The consultant begins the next phase: remediation, re-implementation, optimization. New SOWs. New timelines. New invoices.

The maintenance premium begins. It is not maintaining anything. It is attempting to finish what was sold as complete.

---

## Two Claims That Have Never Been True

Every major ERP vendor makes two claims that appear on virtually every sales deck, every analyst briefing, and every RFP response. Neither has ever been operationally true.

**"Single source of truth."** No ERP installation in history has been the single source of truth for its enterprise. Not one. Every implementation generates shadow systems (spreadsheets, Access databases, shared drives, personal notebooks) because the ERP cannot accommodate the definitional precision the business requires. When the warehouse manager keeps a spreadsheet of actual bin locations because the ERP's location hierarchy doesn't match the physical floor, that spreadsheet is the source of truth. The ERP is the source of record. Those are not the same thing, and every practitioner knows it, and no vendor acknowledges it.

The gap is not a failure of configuration. It is a failure of architecture. The system was designed to encode *transactions*, not operational truth, and the vendor's data model assumes that transactional completeness equals operational truth. It does not. A purchase order is a transaction. Whether the goods actually arrived in the condition specified, were stored in the location indicated, and matched the specification the engineer intended: that is operational truth, and it lives in the gap between what the ERP records and what actually happened.

**"AI ready."** This claim has proliferated since 2023 as every enterprise vendor races to attach the term to their platform.[^10] An AI-ready system requires, at minimum, a semantically consistent data layer: a canonical model where terms mean one thing, relationships are explicit, and the provenance of every data point is traceable. No legacy ERP provides this. The data layer of a typical installation is a patchwork of renamed fields, overloaded columns, customer-specific customizations, and implicit business rules encoded in report logic rather than schema constraints. Training a model on this substrate does not produce intelligence. It produces a confident machine that has learned to replicate the ambiguity of the system it was trained on.

The vendors know this. That is why every "AI-powered ERP" demonstration uses curated demo data, not production data. The demo works because every piece is still on the shelf. Production data is the hand that picks up the glass unicorn and watches it shatter.

---

## What You Are Actually Paying For

In defense procurement, the maintenance premium sustains a machine that meets its delivery specification. In commercial aviation, engines that produce rated thrust. In medical imaging, diagnostic equipment that produces clinically valid images. In power generation, turbines that output rated capacity. In every case, the maintenance contract begins where the delivery specification ends.

In enterprise software, the maintenance contract begins where the delivery specification *failed*. The customer pays not to sustain function but to chase function that was promised, paid for, and never delivered.

The cost structure is an order of magnitude higher than the initial purchase not because ERP systems are complex machines that require sophisticated upkeep (though they are, and they do), but because the purchase price bought a collection of glass figurines, not a machine, and the maintenance contract is the price of pretending otherwise.

Every other industry on this list has faced, or is facing, a reckoning. The Department of Defense is developing organic sustainment capabilities to reduce dependency on sole-source maintenance contractors.[^11] EU right-to-repair directives are forcing medical device manufacturers to open their service documentation.[^12] HP faced a class-action lawsuit over DRM-enforced ink cartridge restrictions.[^13] Third-party jet engine MRO providers have carved out significant market share from OEM service monopolies.

Enterprise software has not had its reckoning. Vendors continue to deliver glass and charge machine prices. Consultants continue to sell maintenance contracts for products that were never finished. Analysts continue to publish maturity models that evaluate how well the customer adapted to the product, rather than how well the product delivered on its claims.

Every other machine on this list works when it arrives. Their maintenance costs, steep as they are, are understood and accepted: the price of keeping something running.

The glass menagerie does not work when it arrives. Its maintenance cost is not the price of keeping something running. It is the price of the illusion that it ever did.

A reasonable question follows: if the failure rate is this well-documented and the cost structure is this transparent, why has the industry not self-corrected? The answer has less to do with the machines than with the people who built them, and why they do not speak in public about what they know. That is the subject of the next essay in this series: *What the Builders Know*.

---

## Sources

[^1]: U.S. Government Accountability Office, "F-35 Joint Strike Fighter: DOD Needs to Update Modernization Schedule and Improve Data on Software Resources," GAO-22-105995, April 2022. Lifetime sustainment cost estimates for the F-35 program have been reported by GAO in multiple assessments; the $1.7 trillion fleet-wide figure (roughly $700M per aircraft for 2,456 planned units) is cited in the 2021 Selected Acquisition Report.

[^2]: Rolls-Royce Holdings plc, "TotalCare" service model documentation. The "Power by the Hour" concept was first introduced by Bristol Siddeley (later acquired by Rolls-Royce) in 1962 for the Viper engine. Modern TotalCare contracts cover >70% of Rolls-Royce's wide-body engine fleet.

[^3]: Block Imaging, "How Much Does MRI Machine Maintenance Cost?" (industry resource). GE Healthcare, Siemens Healthineers, and Philips annual reports consistently show service revenue margins exceeding equipment sales margins.

[^4]: Consumer Reports, "The Cost of Printer Ink" (updated periodically). HP's Printing segment financial disclosures show supplies revenue exceeding hardware revenue by a factor of approximately 3:1.

[^5]: GE Vernova (formerly GE Power), long-term service agreement disclosures in SEC filings. Service agreement revenue for the gas power segment consistently represents 60–70% of total segment revenue.

[^6]: Panorama Consulting Group, "2023 ERP Report: Costs, Timelines, and Transformations." Average ERP implementation cost ranges from $150,000 (small) to $50M+ (large enterprise), with a median total cost of ownership around 4x the initial license fee.

[^7]: Panorama Consulting Group, "2023 ERP Report," ibid.

[^8]: The Standish Group, "CHAOS Report 2020." Large IT project success rates (on time, on budget, with full intended scope) have remained below 35% across two decades of reporting.

[^9]: Gartner, Inc., "Predicts 2024: ERP Strategies Will Be Forced to Evolve or Fail." Projection that 55% of ERP strategies will fail to achieve intended business outcomes through 2027.

[^10]: Constellation Research, "AI-Powered ERP: Hype vs. Reality," R. Wang, 2024. Analysis of vendor AI claims versus operational readiness of production data layers.

[^11]: U.S. Department of Defense, "Organic Industrial Base Strategy," 2023. Policy directive to expand government-owned maintenance and repair capabilities to reduce contractor dependency.

[^12]: European Parliament, "Right to Repair Directive" (Directive 2024/XXX), adopted March 2024. Extends repair obligations to electronic devices including certain categories of professional equipment.

[^13]: In re HP Printer Firmware Update Litigation, consolidated class action, N.D. Cal. HP settled claims that firmware updates disabled third-party ink cartridges without adequate consumer disclosure.
