# Your ERP Is Not the System Your Business Runs On

*Mimir Labs, LLC. Draft — June 2026.*

*There is a quiet fiction inside most companies. It appears in board decks, transformation plans, implementation roadmaps, and executive updates. The fiction is that the ERP is the system the business runs on. In many organizations, it is not. The ERP is the system the business reports through. It is the system finance closes against. It is the system auditors ask about. It is the system leadership points to when someone asks where the data lives. The business itself runs somewhere else, in spreadsheets and exception meetings and email approvals and the operating logic that lives in the heads of the people who keep the place running. The incompleteness has two layers, and the field has invested heavily in only the first. The fields are incomplete. The rules that should operate on the fields are more incomplete. Adding the fields was the easy part. The work that remains is the work of moving the business logic out of people's heads and side documents and into the substrate, where it can be queried, audited, and enforced.*

---

## The system of record and the system of reality

The system of record is the formal system. It is what the vendor sold, what the implementation partner configured, what the finance team closes against, and what the org chart calls the source of truth.

The system of reality is what the business has learned. It runs in the spreadsheet that production trusts more than the planning module. It runs in the email thread where exceptions are approved because the workflow cannot represent the real decision. It runs in the Access database nobody wants to admit still matters. It runs in the planner's private logic, the buyer's vendor notes, the warehouse supervisor's workaround, the quality manager's exception process, and the integration mapping that quietly translates one department's definition into another department's compromise.

It runs in all the places where the system of record failed to become the system of reality.

Most companies know this. They know because reports need explanation. They know because two dashboards can be "correct" and still disagree. They know because the answer to a basic operational question often begins with "it depends." They know because a single person leaving the company can create more operational risk than a server outage. They know because every major software project eventually discovers a hidden layer of business logic that was never captured, never governed, and never formally owned.

Then everyone acts surprised, and the field produces a familiar set of explanations: the implementation partner says the business was not ready; the business says the system does not fit; the vendor says the process should be standardized; the consultants say change management was insufficient; the executives say the data was dirty. Each explanation is partially true and entirely safe. They preserve the category, the budget logic, and the comforting idea that the next project will succeed if everyone simply plans harder, documents more thoroughly, and follows the methodology.

There is a less comfortable possibility. The ERP project did not fail because the organization failed to obey the system. It failed because the system never fully contained the organization.

## Read the name

The category is called Enterprise Resource Planning. The name is operational. *Enterprise* is the company; *Resource* is what the company has, where it is, in what state, and available for what work; *Planning* is the act of deciding what to do with those resources in the time ahead. The three words name an operating function, not a financial one. Enterprise Resource Planning is not a synonym for Enterprise Financial Accounting. It is not a synonym for Enterprise Close Management. It is not a synonym for Enterprise Reporting. The acronym was drawn from manufacturing, where MRP, Material Requirements Planning, was already a working operational discipline, and the broadening from materials to resources was supposed to extend that discipline to the rest of the company. The name carries the original intent every time it is used.

The systems sold under the name have rarely been operational in that sense. They have been transactional. They capture orders, generate invoices, post journal entries, and roll the books. They have been built around the chart of accounts because the chart of accounts was the only structure strong enough to unify the early modules under one schema, and the customer at the table was the CFO because the budget for the system lived under finance. The category kept its operational name and acquired a financial center. Forty years of buyers have signed contracts for Enterprise Resource Planning and received Enterprise Financial Application Suites. The mismatch is the etymological version of the gap this essay is about. It is also why "the ERP project did not deliver what we expected" is a sentence executives keep saying without ever quite being able to articulate what was missing. What was missing was the part the name promised.

We are restating the name as a working definition rather than as a label. Enterprise Resource Planning is the discipline of holding what the operation is doing, deciding what it will do next, and enforcing the rules that govern those decisions. A system that does not carry the operation in that sense is doing something useful, but it is not doing what the name said it would.

## The completeness question nobody asks

In any other discipline, repeated mismatch between data, reports, observed reality, and undefined process would trigger a dataset-completeness review.

If a scientist's instrument were producing readings that disagreed with the phenomenon under study, the first move would be to ask whether the instrument was measuring the right thing. If a forecasting model's predictions did not match the observed system, the first move would be to ask whether the model's inputs covered the relevant variables. If an accounting reconciliation produced a persistent unexplained difference, the first move would be to ask which transactions the reconciliation was failing to see.

These are routine moves in their disciplines. They are dataset-completeness questions, and they are the questions a serious practitioner asks before they conclude that the user is the problem.

Enterprise software has, for thirty years, refused to ask the equivalent question. When the ERP's reports disagree with what the floor is doing, the field's standard response is that the operator failed to enter the data correctly, or the implementation team failed to configure the workflow correctly, or the customer failed to govern its master data, or the project failed to enforce change management, or the business failed to align its processes to the software. The blame catalog is large. The completeness audit is missing from it.

The ordinary practitioner observation that should have triggered the audit was available from the beginning. Reports disagreed with the floor. The same field had two definitions of "open." The week's revenue depended on which system the auditor pulled from. The planner kept a spreadsheet because the system "didn't show the real picture." Every veteran of an ERP implementation has heard some version of these complaints, and every veteran has, at some point, dismissed them as the kind of friction every system carries. The friction was never random. It was the signature of a dataset that did not represent the work.

The literature on ERP shadow systems is, in this light, not a description of bad behavior. It is a thirty-year catalog of the missing fields, written by the people who had to invent the side records to do their jobs.

## The fields are incomplete. The rules are more incomplete.

Most of that thirty-year catalog has been read as an argument about missing fields. The schema does not carry the state, the operator picks the closest legal value, the gap goes somewhere else. The reading is correct as far as it goes, and it does not go as far as it should. The deepest part of the incompleteness, the part nearly every dataset is still missing, is not the field that does not exist or the state that cannot post. It is the rule that decides what the field means, who is allowed to change it, under what conditions, and what happens next.

Schema gaps are bounded. A determined customer with a budget can close them, and many have. Rule gaps are unbounded, because the rules the operation actually runs on are conditional functions of facts the substrate cannot see together. A field can be present and labeled and reliably populated and the system still cannot answer the question the field was supposed to support, because the question requires not data but judgment. Logic does not live in the data layer. It lives in the layer above the data, and that layer has, for thirty years, been the layer the category did not attempt to formalize.

## Five examples, walked through

The pattern shows clearest in concrete cases. Each of these is ordinary. None requires a difficult industry or a complex business. The point of each example is not that the system is missing a field. The system is, in most cases, *not* missing the field, or could not be made to carry the field with a reasonable amount of customization. The point is that the *rule that decides what value the field should take* lives somewhere the substrate cannot read, and a field carried without its rule is not a description of the operation.

**A work order at the upper edge of tolerance.** The schema has a `hold_reason_code` enumeration with twelve entries. The customization already exists. The supervisor staring at the QC reading at the upper edge of print is not stuck on the field. They are applying a function. This customer's drawing carries an internal note tightening one feature beyond the external print. The prior three lots from this supplier ran shorter on the same dimension. The first article on this part drew a question from the customer's quality engineer last month, who is the kind of contact who escalates over a single excursion. The production schedule has enough slack to rerun this work order if the call is made now, and not enough if it is made in two hours. The supervisor's decision to set the reason code is a five-input function that has never been written down in a form the substrate can read. The next supervisor on the next shift will apply a different function, because the function lives in the person, not in the substrate. The reason code is the field. The function that selects the reason code is the missing layer.

**The credit hold that is not actually called a credit hold.** A customization can add a free-text "credit notes" field, or replace the binary `on_hold` flag with a richer enumeration, or both. The customization does not address the problem the controller is solving. The controller needs the substrate to know that when the customer's parent fails its quarterly review, every order over fifteen thousand dollars requires sign-off; that when the customer's prior order is over forty-five days, no new orders ship without escalation; that when the order's product mix is more than thirty percent from the deposit-required line, the deposit rule applies regardless of hold status; that when the rep has flagged a renegotiation, the order is held even if every other condition is clean. The substrate cannot apply any of these because the conditions are not in any rule the substrate can read. They are in the controller's working memory and a side spreadsheet the controller would prefer not to discuss. The credit-hold field is the easy customization. The function that decides when the hold fires is the missing layer.

**A quarantine call that depends on six things at once.** Adding `quarantine` as a status is a one-day customization. Most ERPs already have it. The receiver looking at an incoming pallet is running the actual rule: this supplier dropped from tier one to tier two last quarter and the corrective action plan has not been verified; the downstream consumer is the aerospace customer whose contract requires traceability from supplier-of-record only; the certificate-of-conformance attached to the lot is from a satellite plant the company has not yet audited; the historical defect rate for this part-supplier combination is above the threshold the quality manager set at the last review; the lot is from a new tool the supplier brought online thirty days ago. The receiver sets the status to `quarantine`. The five-input function that produced the decision is not recorded anywhere. The next receipt with three of the five inputs different will be released to stock by a different receiver applying a different version of the same function, and nobody reading the system later will be able to ask why these two receipts of the same part on consecutive days were dispositioned differently.

**The invoice dispute that is also a relationship question.** A `disputed` flag is trivial to add. So is a dispute-type enumeration. Neither captures what the AR clerk is actually doing when she stops collections activity. She is applying: this customer disputes line items on freight three or four times a year, almost always resolving at the regional manager's level; the dollar amount sits below the threshold above which the controller wants direct involvement, and the controller has been clear about that threshold; payments from this customer have been on time for six consecutive quarters, which earns the dispute the benefit of the doubt rather than an immediate escalation; the rep's commission for the quarter has this account in it, which the clerk was quietly told to take into account. The dispute flag is one field. The decision about which activities pause, who needs to be notified, what threshold escalates the matter, and when collections resumes is a function with six inputs and a context, and the function is in the clerk's experience rather than in the substrate. Aging reports built on the flag are accurate at the field level and unable to support the question the CFO will eventually ask.

**The substitution that depends on which customer it touches.** Substitute-parts tables and substitution-approval workflows are standard customization. The cell lead holding the BOM with the engineer's verbal approval is not stuck on the table. The cell lead is applying a contingent rule. This customer's contract carries a no-substitution clause for any part above prototype tier; this part is above that tier. The regulatory binding on this end product requires traceable lot from the approved source list, and the substitute supplier is not on it. The substitute is fine on the next three work orders the same press will run, which is why the engineer approved it as a general matter. The correct decision is to skip the substitution on this work order, hold for the original component, and apply the substitute when the cell changes over. The substitute-parts field is the simple addition. The rule for when the substitution is allowed, contingent on customer, end use, regulatory regime, and lot characteristics, is the missing layer, and it is the layer that decides whether the substitute is a legitimate engineering choice or a future quality incident in waiting.

In every example the field is straightforward to add, and in many shops the field has already been added at significant cost. The customization addresses the surface. It does not address the function that decides what the surface should say. The function lives in people, in side documents, in the patterns of past decisions, in workflow tools that route work without deciding what the work means, and in the institutional understanding that makes the operation work without anybody having to look up the policy from scratch every time. Every example produces a downstream artifact that someone has to maintain: a private rule of thumb, a paper traveler with annotations, an informal hold list, an inspection-pending whiteboard, a substitution exception ledger. None of those artifacts ever finds its way back into the canonical record. They live in the side stores. They constitute the actual operating model of the business, and the operating model is, almost entirely, the rules.

## What companies have already paid for

The companies running into this pattern were not idle. Most enterprises have spent significant money over the last two decades doing exactly what the field told them to do about the gap between the formal system and the lived business. They customized their ERPs to add fields the standard schema did not carry. They funded master data management programs to deduplicate and standardize. They stood up data warehouses, then data lakes, then lakehouses. They built data governance organizations and stewardship councils. They rebuilt their integration layers more than once because the meaning of the records being passed between systems kept drifting. They ran data quality programs whose dashboards now track defect rates the way manufacturing tracks scrap. The cumulative spend on the data layer at a mid-size manufacturer is well into eight figures, and it is recurring.

The investment was real, and it produced gains. Reports are cleaner. Customer records can be deduplicated more reliably. The warehouse supports analyses the operational systems would never have completed in a transaction-safe time. None of this is in dispute.

What is in dispute is whether the gains reached the shadow operating model the company is actually running on, or whether they reached a layer above it. Operators who lived through the projects can answer the question without consulting a survey. The business still runs on the spreadsheet, the exception meeting, the email approval, and the supervisor who knows when the rule does not apply. The substrate is cleaner. The decisions are still elsewhere.

The reason is structural. None of those programs added business logic to the system. They added data. They cleaned data. They moved data between systems. They put governance committees in front of data. They produced new ways of looking at data. None of them gave the substrate the ability to say "under these conditions, this transition is allowed; under those conditions, it requires an exception grant; under those other conditions, it is refused outright." That capability was not in the scope of the work that was funded, because the category did not, until very recently, treat it as a thing the substrate could be expected to hold.

The available tools have not closed this gap, and it is worth being explicit about why. Workflow engines and BPM tools model sequences. They are useful for the parts of the operation where the rule is "what happens next." They are not useful for the parts where the rule is "what does this combination of facts mean." Customization extends the data model with new fields, new states, new linear branches; it does not add a way to express "if A and B and C then allow X unless D in which case require Y." Procedure documents capture the prose; they are not queryable, enforceable, or audited against actual decisions, and they go out of date the first time a leadership change quietly relaxes a threshold. Standalone rule engines, the closest the field came to the right answer, lived in a separate system from the data they reasoned about and ended up as a side store of their own, with the same drift problems the rest of the substrate already had. Each tool addressed a piece of the problem. None of them treated business logic as a first-class layer of the substrate.

The data work was necessary. The substrate has to carry the facts before it can carry the rules. The data work was just not finished, and the part that remains is harder, in a specific sense, because writing the rules down is itself a form of organizational confession. It requires admitting that the rules existed all along in a form nobody wrote down, that some of what gets written down is policy nobody has reviewed in years and should be retired, and that some of it is institutional intelligence that has been carrying the operation since before the last system replacement.

## Why the familiar remedies do not reach

The distinction matters because it changes which remedies are available.

If the data is merely dirty, you clean it.
If the users are merely undisciplined, you train them.
If the process is merely inconsistent, you standardize it.
If the integration is merely fragile, you rebuild it.

If the formal system is missing part of the operating model, none of those remedies reaches the cause.

You can clean incomplete data and still be wrong. You can train users into a process that omits the reason they built the workaround. You can standardize a workflow that only works because someone outside the workflow knows when to violate it. You can rebuild integrations between systems that do not mean the same thing when they use the same words.

This is not the dirty-data argument. The dirty-data argument assumes the dataset is materially complete and merely polluted. Clean it up, deduplicate it, normalize the values, enforce the constraints, and the dataset will represent the business accurately. The work is in hygiene. The position we hold is structurally different. The dataset is not polluted. It is incomplete, in both the fields it carries and the rules that operate on those fields. You cannot deduplicate your way to a state your schema does not carry. You cannot govern the meaning of `active` on a customer record when the operational meaning depends on a side store nobody documented. You cannot write a constraint against a `disputed` field your invoice table does not carry. And once the fields exist, you cannot manufacture from hygiene the function that decides what the fields should say.

## The shadow operating model

The dangerous part is not that the shadow operating model exists. In most cases it exists because competent people were trying to keep the business alive inside systems that were too rigid, too partial, or too semantically thin to express the work as it actually happens. The shadow model is, in many shops, the most accurate description of the operation that anyone holds.

The dangerous part is that leadership often cannot tell which parts of the shadow model are waste and which parts are truth.

Some workarounds are bad habits. Some are obsolete scars from a vendor change that was never fully unwound. Some are policy violations that have outlived the policy. Some are institutional memory protecting against a failure mode the org chart has forgotten. Some are the only place where the business still knows how it actually operates.

Treat all of it as garbage and you destroy knowledge. Treat all of it as sacred and you preserve dysfunction. Ignore it, and the next ERP project will rediscover it under pressure, after the budget is committed and the timeline has become political.

That is the trap. By the time a migration begins, it is already too late to ask whether the system of record contains the whole business. At that point the organization is no longer diagnosing its operating model; it is trying to force unresolved reality through a project plan.

The familiar failure pattern follows. Requirements workshops become archaeology. Data migration becomes semantic negotiation. Testing becomes discovery. Go-live becomes a referendum on decisions nobody realized they had made. The project team begins finding duplicate definitions, informal ownership, contradictory reports, missing context, spreadsheet dependencies, and exception paths that were never modeled. None of this is surprising. It is exactly what should happen when a company tries to replace a formal system without first identifying the informal one it depends on.

## What this costs when the substrate has to carry judgment

For thirty years the cost of this incompleteness fell mostly on reporting accuracy, integration fragility, migration risk, and the ordinary operational friction of running a business through systems that do not quite describe it. The cost was real, expensive, and broadly absorbed.

The substrate is now being asked to carry more. Companies want their systems to reason. They want agents acting on operational state. They want forecasts that move from descriptive to prescriptive. They want governance that is enforceable in software rather than negotiated in committee.

A substrate that does not contain the operation cannot safely carry any of that. It cannot tell an agent which spreadsheet holds the real production logic. It cannot warn a forecasting model that a field is technically correct but operationally misleading. It cannot stop a governance policy from being written against a definition the warehouse and the controller use differently. The incompleteness does not become a worse problem when the substrate is asked to reason; it becomes a faster one. A system that is wrong in familiar ways at the speed of human attention will be wrong in the same ways at the speed of automated decision-making, and the cost of the same wrongness will scale with how much of the business is now downstream of it.

The same cost shows up in less-discussed places. Audits become interview exercises, because the audit team cannot ask the system for the rule that decided the outcome and has to ask the experts. Regulatory inquiries become archaeology, because the procedure document and the records often disagree, and the regulator has the option of treating the gap as a control failure regardless of whether the operation was sound in practice. Personnel changes carry institutional risk that the org chart does not capture, because the retirement of a long-tenured operator is a knowledge transfer event with a deadline, and the knowledge in question is the unwritten function the operator was applying. Every replacement project starts the rule discovery from zero, because the new system does not inherit the operating rules from the old system, because the operating rules were never in the old system.

## Where does the business actually run

The first question is the one most ERP projects do not begin with. Where does the business actually run?

Not where is it supposed to run. Not where does the vendor say it runs. Not where does the process map claim it runs.

Where does the business actually run when the order is late, the part is wrong, the supplier changes terms, the customer needs an exception, the audit trail is incomplete, the forecast misses reality, or the report does not match what everyone in the room knows happened?

Find that, and you find the real operating model. Only then can you decide what belongs in the system, what belongs outside it, what needs governance, what needs elimination, and what must never again be left trapped in tribal memory.

Most companies skip this step. Not because they are careless, but because the market taught them to start later in the chain: select the software, document the requirements, clean the data, map the fields, train the users, manage the change, go live. Then wonder why the hidden system keeps reappearing.

There is a better sequence.

Before replacement, discover.
Before migration, formalize.
Before automation, define.
Before any system is asked to reason, make the meaning explicit.

Before the next multimillion-dollar project asks the business to transform, identify the parts of the business that have never been properly represented in the first place.

This is not a moonshot. It is a constrained diagnostic. The constraint that matters is the axis of the slice, not its size. Pick one value stream or one product line, and follow it end to end. The diagnostic has to trace the whole operational chain, from the first signal of demand through planning, sourcing, production, fulfillment, invoicing, and post-sale obligation, because the rules that actually run the operation live in the handoffs between functions rather than inside any single function. A diagnostic scoped to purchasing or quality or production planning finds the local workarounds and misses the chain logic that produced them, because the rule that drove the workaround almost always originated upstream or downstream of the function where it surfaced. A diagnostic that follows one product line or one value stream from quote to cash to support finds the operating model in its working form, including the cross-functional rules that no single department owns.

Within that slice, and along its full length, look at the system data. Look at the reports. Look at the spreadsheets. Look at the approvals. Look at the exceptions. Look at the integrations. Look at what people actually trust when the official answer is not enough. Then ask a harder question than most ERP projects ask at the beginning: what does this business process mean at each step of the chain, where is that meaning currently stored, and what is the function that decides which value the meaning should take?

The question changes the project. It changes what counts as data. It changes what counts as a requirement. It changes what counts as risk. It changes who owns the truth. It changes whether the pilot is a software trial or an operating-model discovery.

## What this is for

Mimir Labs is built around the position that the discovery step is the work, that the work is not optional, and that the discovery has to cover both halves of the operating model: the fields the operation uses, and the rules that decide what the fields mean.

Ratatosk performs the diagnostic on the systems and side stores the enterprise already runs. It surfaces the semantic fields the operation uses regardless of which system holds them. It also surfaces the decision logic encoded in those same side stores: the conditional cells in the planner's spreadsheet, the patterns in past exception approvals, the consistent shapes of the credit team's overrides, the workflow branches the floor visibly takes that the documented procedure does not mention. The output is a working description of the operating model, fields and rules together. It is the dataset-completeness audit the field never performed.

Mimisbrunnr provides the reference vocabulary the diagnostic resolves into, so the discovered model has the same name at one customer as at the next, for fields and rules alike. The vocabulary is what makes "what does this field mean" and "what does this rule fire on" questions with checkable answers, rather than questions with a different answer at every customer and every consultant.

Yggdrasil ERP, our own ERP product, is the system built on that vocabulary. It carries the states the operation actually has, not just the ones that post. It governs transitions through a constraint engine that refuses the side channels the dominant architecture admits. It audits at the field level because the canon must be currently maintained and structurally auditable. It does not invite per-tenant schema customization, because per-tenant customization is what produced thirty years of operational distortion in the first place. The product is one. The model is one. Every customer runs against the same model because the canon, to be a canon, has to mean the same thing in every implementation.

Sitting on that substrate, Operational Policy Enforcement carries the rules as data rather than as configuration of an application, custom code, or procedure documents. A rule names its entity type and transition, references the fields the substrate already carries through documented join paths so it can express conditions like "credit hold on the parent of this customer's account," produces auditable enforcement events, and cannot be turned off by a configuration toggle because it is not configuration. Policy changes are themselves recorded events, and the version of the policy that produced any given decision is recoverable.

Jormungandr governs the same model on the external systems an enterprise cannot or will not replace, issuing policy as JSON Schema contracts against the integration surface so external transitions can be governed by the same logic the enterprise has formalized in its own substrate. A company is not forced to choose between fixing the substrate and keeping the systems its people depend on.

These are not products that happen to share a vendor. They are positions on the same epistemic claim. Ratatosk discovers what the operation actually contains, including the rules. Mimisbrunnr provides the vocabulary the discovery resolves into. Yggdrasil ERP enforces the model the vocabulary describes, and Operational Policy Enforcement is how the rule half of the model is enforced rather than documented. The work is the work of completing the dataset, fields and rules together, and then refusing to let either half become incomplete again.

## How to begin

Start small, but along the right axis. Pick one value stream or one product line and follow it the whole way through. Run the diagnostic across the chain rather than inside any one function, because the function-by-function slice is the one that hides the rule that mattered. Find the shadow operating model. Decide what is waste, what is risk, and what is truth.

Then make the next system carry the business as it actually runs. Not as the software assumed it should. The name on the contract has been Enterprise Resource Planning for forty years. Read the name. The system that earns it is the one that holds the resources, the rules, and the planning together. Anything less is a financial application suite, and the field has had four decades of those.

The implementation is not where the failure begins. It is where the incomplete model finally becomes impossible to ignore.

---

*Companion essays: `operational-canon.md`, `erp-operational-distortion.md`, `the-bookkeepers-inheritance.md`, `what-the-system-deserves.md`. Companion academic preprint: `the-missing-layer-in-enterprise-ai-readiness.md`.*
