# Why ERP Is Inadequate

A comprehensive list of structural failures of the ERP industry as it
currently exists. Not bug reports against specific vendors — these are
patterns the entire category does, that don't work, and in many cases
never really did.

Source material for essays, talking points, partner conversations, and
internal strategy. Each item is short by design — pick what's relevant
to a given audience and expand it.

---

## The meta-failure

**ERP is sold as software for running a business, but it's actually
software for *recording* a business.** The core data model was designed
when month-end close was the most important event in the calendar. The
business operates continuously; the software thinks in batches.
Everything downstream of that mismatch is a symptom.

---

## 1. Data architecture

1. **The schema reflects a 1990s departmental org chart, not how a
   modern business operates.** "CRM," "Sales," "Finance" — these are
   buckets the software invented because the vendor's salesforce was
   organized that way. Customer data spans all three. So does invoicing.
   The bucket boundaries fragment the data and force every workflow to
   span them.

2. **"Single source of truth" is a marketing claim that contradicts
   itself in any real deployment.** A business runs 8–40 systems. The
   ERP claims to be the SoT for everything; in practice it's the SoT
   for the records that happened to land there first, and the CFO's
   spreadsheet is the SoT for the ones that matter. SoT is *intra-org*,
   not universal — but the industry sells it as universal.

3. **Customizable fields are second-class citizens with no planner
   support.** UDFs live in side tables. JSONB extensions sit opaque to
   the query planner. The customer's most important business
   discriminator gets stored in a structure that can't be indexed,
   joined efficiently, or reasoned about. Then BI queries against it
   are slow, and the vendor blames "data quality."

4. **Audit trails are bolted on, not designed in.** The audit log is
   a separate table the application writes to when it remembers. Half
   the modifications come through bulk operations that skip it.
   Compliance reviews discover this only during the audit.

5. **History and versioning are charged as enterprise features, not
   designed as foundational.** Asking "what did this record look like
   six months ago" routinely cannot be answered. The system has been
   continuously deleting your past since you bought it.

6. **Tenant isolation is by convention, not by structure.** Multi-tenant
   SaaS ERPs run as one shared schema with `tenant_id` columns. A single
   missed `WHERE` clause leaks data across customers. The vendor's
   security audit doesn't catch it because the audit reviewed the
   architecture diagram, not the queries.

7. **The schema is frozen by the vendor's release cycle, but the
   business changes every week.** Every customer wants a column the
   shipping schema doesn't have. The vendor's answer is the JSONB
   extensions described above, which routes the most important data
   into the worst-performing storage.

8. **Master data assumes one of everything.** One legal entity, one
   chart of accounts, one inventory site, one fiscal calendar. Real
   businesses have multiples. The system handles them with
   "intercompany transactions" — which is to say, it doesn't.

---

## 2. Conceptual model

1. **Modules are a vendor-internal organizational structure that leaked
   into the product.** No customer ever said "I want a CRM module and a
   Sales module." They said "I want to know which deals turned into
   orders." The module split exists to let the vendor charge for each
   one.

2. **Workflow == approval chain.** Real work is asynchronous and
   parallel. ERP workflow engines model the world as a state machine
   with one cursor. Asking three people in parallel and acting on the
   first two responses is "outside the model."

3. **Reporting is a separate phase, tool, or project — not continuous.**
   Operational data lives in the ERP. Analytical data lives in BI. The
   gap between them is closed by an ETL job that runs nightly. The CEO
   asks "how are we doing?" and the answer is yesterday's data with a
   PowerPoint timestamp.

4. **The ERP forces a process model on the business; the business is
   never asked back.** "Best practices" is a euphemism for "what the
   software was designed to do." Implementations succeed when the
   business contorts to fit. They're called "successful go-lives."

5. **The system thinks in periods.** Month-end close. Quarter-end
   reporting. Year-end roll. The business operates continuously. The
   ERP's batch periods are scaffolding for a manual closing process
   that automation should have eliminated 20 years ago and didn't.

---

## 3. Implementation and deployment

1. **Six- to twenty-four-month implementation timelines are treated
   as normal.** Software you bought to *run* your business takes you
   2 years to *start* using. Nobody questions this anymore because
   everyone has accepted it.

2. **The implementation partner is paid more than the software.**
   Vendor's annual SaaS bill: $500K. Implementation partner's bill:
   $2–5M. The economics of the industry depend on implementations
   being hard. Easier products would collapse the consulting margin
   and the vendor's channel would revolt.

3. **"Configuration" and "customization" are used interchangeably to
   obscure what survives upgrades.** Configuration carries forward.
   Customization breaks on upgrades. The line between them is drawn by
   the vendor's marketing team. The customer finds out which is which
   when the upgrade fails.

4. **Go-live is the success metric. Operational fitness is somebody
   else's problem.** The vendor measures the partner on closed
   implementations. The partner measures the project on the cutover
   date. Nobody is measured on whether the business runs better six
   months later.

5. **Data migration is a one-time event treated as a deliverable.**
   The migration team leaves the day after go-live. The data quality
   issues they couldn't resolve become "training opportunities."

6. **The implementation has no operational contract.** No SLA on time
   to first useful query. No commitment to baseline data quality at
   cutover. No defined acceptance criteria beyond "users can log in."

---

## 4. Integration

1. **"We have an API" is not the same as "you can integrate it."** APIs
   that mirror the UI screens — `/api/v1/account-screen` — are not
   integration surfaces. They expose the vendor's UI model, not the
   domain. Pagination, partial responses, and inconsistent field naming
   make programmatic use a multi-week project.

2. **Webhooks fire reliably but don't carry enough context.** The
   webhook says "order updated." It doesn't say what changed. The
   subscriber refetches the whole order, then refetches all related
   records, then runs a diff. This is called "event-driven."

3. **Bulk export is a per-record paginated API call when you need a
   stream.** Pulling a million orders takes 18 hours of API calls.
   The vendor has no `COPY TO STDOUT` equivalent because that would
   undermine the per-record-priced "data API" SKU.

4. **Master data conflicts between systems have no owner.** CRM thinks
   the customer's address is X. ERP thinks it's Y. Each side claims to
   be authoritative. The reconciliation tool is a third vendor's
   product. The third vendor's tool also has a notion of authoritative
   data, and that's the actual SoT now.

5. **"Best of breed" vs "single platform" has no winning answer
   because both are broken.** Best of breed: integrations are your
   problem and they're brittle. Single platform: you're stuck with the
   weakest module. The industry sells one as a virtue of the other and
   vice versa.

6. **iPaaS is a tax on having multiple systems.** Mulesoft, Boomi,
   Workato, Zapier — these companies exist because the underlying
   systems can't talk to each other. The customer pays for that
   shortcoming as a recurring cost forever.

---

## 5. Vendor and commercial

1. **Per-user licensing punishes inclusion.** The plant manager wants
   the shop floor supervisors in the system. Adding 30 supervisors
   adds $54K/year. So they don't get added. So the data they should
   have entered is captured on whiteboards and rekeyed by clerks.

2. **Modules are gates, not features.** The software *can* do
   manufacturing — but you didn't buy the manufacturing module, so
   it's hidden. The customer paid for code they're not allowed to run.

3. **Multi-year contracts with annual price increases.** Renewals are
   uphill negotiations. The "discount" you got in year one is gone in
   year four.

4. **The "named user" fiction.** A "named user" is a license seat
   permanently bound to one person. Vendors invented this to prevent
   account-sharing. The actual effect is: when an employee leaves,
   you pay for their seat until renewal. When you onboard a contractor,
   you pay for a full annual seat for three months of work.

5. **Roadmap features ship for marketing reasons, not customer need.**
   The vendor announces "AI-powered cash flow forecasting." Customers
   asked for "the bank reconciliation that already exists, but
   working." The roadmap optimizes for analyst-relations talking
   points, not the support queue.

6. **Legacy customers are stranded on old versions.** Their
   customizations don't survive the upgrade. The vendor's response is
   "you should have used configuration, not customization." But they
   can't, because their business needs exceeded what configuration
   could express. So they sit on v9 of a product that's now on v14.

---

## 6. The "extensibility" lie

1. **Custom fields aren't real columns.** They live in a side table or
   a JSONB blob. They don't show up in standard reports. They're not
   indexable in any useful way. They don't appear in the integration
   API by default. "Extensibility" means "we let you create them, not
   that the system treats them as first-class."

2. **Extension SDKs break on every upgrade.** The vendor publishes a
   "stable plugin API." It's stable until the next major version, when
   the underlying classes get refactored. Every plugin author rewrites
   on every release.

3. **Plugin marketplaces fragment the product surface.** Each plugin
   has its own UI conventions, its own auth pattern, its own data
   model. The customer ends up with twelve different interfaces glued
   together inside one URL.

4. **The "we'll build a custom integration" promise becomes a
   permanent dependency.** The implementation partner builds the
   integration as a billable engagement. Six months later it breaks.
   The partner is happy to fix it for another billable engagement.

---

## 7. UX and operational

1. **Forms designed by people who never had to use them.** Twelve
   fields per row, no keyboard shortcuts, modal dialogs that kill the
   user's context. Every field validates on blur, then the form
   refreshes and you lose your place. Data entry is a job-killer.

2. **Search is worse than Google was in 2005.** Type a customer name,
   wait three seconds, get a list ranked by record creation date. No
   fuzzy match, no synonym handling, no "did you mean."

3. **Bulk operations take twelve clicks per row.** "Update 200 orders
   to mark them ready to ship" is a 2,400-click manual exercise unless
   you happen to know the export-to-Excel-edit-and-reimport trick. And
   then half the imports fail because of validation rules the UI
   doesn't show.

4. **Print views are a separate template engine.** The PDF the customer
   sees doesn't match the screen the operator sees. Two source-of-truth
   layouts for the same data.

5. **Notifications batch into a useless daily digest.** A customer
   ordered something urgent at 9 AM. The salesperson gets the email at
   8 PM in a digest of 47 things. The order gets shipped two days late.

6. **Help systems assume admin awareness the user doesn't have.** "Go
   to Settings → Tenant Configuration → Workflow Definitions → ..."
   The user doesn't have access to Settings. The help docs were written
   for the implementer.

7. **Mobile is an afterthought.** The mobile app shows 60% of the
   desktop functionality with worse UI conventions. Field workers carry
   a phone and a laptop because the phone alone can't complete the
   workflow.

---

## 8. AI and "modern" features (the wallpapering)

1. **LLM chat overlays on top of a broken data model don't fix the
   data model.** Asking the chat "what's our gross margin" is faster
   than building the report, but the chat reads the same flat data the
   report would have read. If the data is bad, the chat lies
   confidently.

2. **"Predictive analytics" is often a regression line with branding.**
   The vendor sells it as ML. The customer pays an enterprise upcharge.
   Excel could have produced the same chart for free.

3. **Auto-generated dashboards that nobody reads.** The vendor ships
   "100+ pre-built dashboards." None of them match the questions the
   business actually asks. The CFO maintains a spreadsheet anyway.

4. **"Agentic" features that need approval for everything.** The agent
   drafts a PO. A human approves it. The agent didn't add value — it
   added a step. The pre-agent workflow was "human creates PO, system
   files it." The agentic version is "agent creates PO, human reviews
   and approves, system files it."

5. **Voice interfaces that just rerendered the broken UI as audio.**
   "Show me Q3 revenue by region" produces the same delayed,
   wrong-default-grouping report it always did, but now it interrupts
   you to ask which region first.

6. **RAG/embeddings against the same flat tables the SQL queries
   already struggle with.** The retrieval stage doesn't understand the
   foreign-key web. It returns disconnected fragments. The LLM
   hallucinates relationships to bridge them.

7. **"AI-native" as a category claim is wallpapering at scale.** The
   underlying ERP is the same broken thing. The chat overlay is sold as
   a transformation. Customers buy it because it's the first thing in
   ten years that demos well.

---

## 9. Multi-tenancy

1. **"Multi-tenant SaaS" is one shared schema with `tenant_id` columns
   and bugs that leak data.** True isolation (one schema per tenant,
   one database per tenant, one cluster per tenant) is more expensive
   than vendors are willing to operate at the published price. So they
   don't. So tenant-cross bugs are a recurring class.

2. **Per-tenant customizations fork the codebase.** Customer A asks
   for a small tweak. The vendor branches. Customer B asks for the
   opposite. Now the vendor has two branches. Five years later the
   "trunk" is the union of customer-specific exceptions, none of which
   are documented.

3. **Update windows affect all customers because there's no per-tenant
   deploy path.** Saturday 2 AM Pacific is a Sunday morning workday in
   Sydney. The Australian customer learns about scheduled maintenance
   from outage notifications.

4. **Backups are vendor-controlled.** "We back up nightly." You can't
   restore on demand. You can't get the backup file. If the vendor
   goes under, your data goes with them.

5. **Tenant data export is an off-boarding penalty.** The export is
   a CSV dump of denormalized rows. Restoring it elsewhere requires
   rebuilding the foreign-key web by hand. Customers stay because
   leaving is harder than tolerating.

---

## 10. Security and governance

1. **RBAC permission matrices have thousands of fine-grained settings
   nobody understands.** "Edit invoice line item discount but not
   header discount" is a checkbox somewhere, in a screen with 800
   other checkboxes. The customer's IT team eventually grants admin
   to the 30 people who keep getting permission errors.

2. **Service accounts treated like users with full privileges.** The
   integration runs as `svc_integration` with God-mode access because
   scoped service accounts would have been a UX project the vendor
   never funded.

3. **Encryption at rest is just disk encryption.** No field-level
   isolation. A SQL injection at the application layer reads the
   plaintext customer database the same way the application does.
   "Encrypted at rest" is a compliance checkbox, not a security
   property.

4. **SSO integrations break the user model.** You can use SCIM for
   provisioning OR custom roles, not both. SAML works but only if the
   IdP doesn't change attribute names. SCIM works but doesn't sync
   group membership. The customer ends up with three half-working
   integrations and a manual reconciliation.

5. **Data residency promises aren't enforced at the storage layer.**
   "EU customer data stays in EU" is an admin-control promise. The
   vendor's CDN replicates assets globally. The vendor's analytics
   stack pulls events to a US warehouse. The promise was scoped to a
   carve-out the customer didn't notice.

6. **Audit logs are vendor-readable, not customer-controlled.** The
   customer can request an audit log. The vendor's support team also
   has read access. The customer cannot prove the log hasn't been
   tampered with.

---

## 11. Operations and support

1. **SOC 2 / ISO certifications don't translate to operational
   reliability.** They certify that the vendor wrote down a policy
   and follows it. They don't certify that the policy is correct. A
   SOC 2 Type II vendor can have weekly outages and still be
   compliant.

2. **SLAs exclude scheduled maintenance windows.** "99.9% uptime,
   excluding scheduled maintenance." Scheduled maintenance is 8
   hours every other week. Math: actual uptime guarantee is around
   97%.

3. **Support tiers gate basic competent help behind a price tier.**
   The standard tier reaches a CSM who reads from a script. Premier
   tier reaches an engineer. Both tiers are charged regardless of
   whether the issue was the customer's fault or the vendor's.

4. **"Premier support" is a Slack channel with one overworked CSM.**
   The CSM has 30 enterprise accounts. The customer is told they have
   a "dedicated" resource.

5. **Change management workflows require ticketing for trivial config
   edits.** Adding a new tax code requires a support ticket, three
   approvals, and a 48-hour SLA. The competitor's product makes it a
   two-minute admin action.

---

## 12. Reporting and analytics

1. **Reporting tools re-implement SQL, badly.** The "report builder"
   has its own query language, its own join semantics, its own
   aggregation rules. Power users learn it because the alternative
   is escalating to the vendor's services team.

2. **BI is a separate product with a separate license.** The data
   you need to analyze lives in the ERP. The tool to analyze it is
   sold by the same vendor as a separate SKU at a separate annual
   bill. Or it's a third-party tool that you also pay for, with its
   own implementation project.

3. **Real-time dashboards pull through three caching layers.** The
   transaction landed at 9:00. The dashboard shows it at 9:47. The
   dashboard says "real time" in the header.

4. **Exports to Excel because the reports view is unusable.** Every
   business runs on spreadsheets pulled from the ERP, manually
   reconciled, manually formatted, emailed around. The ERP's reporting
   module is a checkbox that nobody actually uses.

5. **The CFO's spreadsheet is the actual source of truth.** Every
   ERP customer has one. Sometimes several. The CFO updates it from
   the ERP, then reports out from the spreadsheet. The ERP is the
   data source; the spreadsheet is the truth.

---

## 13. Migration and lock-in

1. **"Bring your own data" promises ignore the foreign-key web.** The
   vendor will accept a CSV import of customers, products, and orders.
   They will not accept a relational dump that preserves the joins.
   The customer's historical data lands as flat tables that can't be
   correlated.

2. **Schema mappings are done by consultants who leave after go-live.**
   The mapping logic lives in the consultant's head. Six months later
   nobody understands why a particular field gets transformed the way
   it does.

3. **Historical data survives migration as a flat archive.** The old
   system stays in read-only mode "for reference." Three years later
   it's still running because nobody knows how to decommission it
   safely.

4. **Code that lives only in the vendor's documentation isn't
   testable.** The customer's workflow rules are described in a
   vendor-managed configuration tool. There's no source of truth in
   the customer's repo. There's no diff. There's no version control.

5. **Off-boarding is structurally hostile.** You can leave. You will
   pay an export fee. The export will be denormalized. You will spend
   18 months reconstituting your own data in the next system. The
   vendor knows this and prices accordingly.

---

## 14. Industry and cultural

1. **An "ERP project" is treated as a 7-figure CapEx event, not as
   living software.** Capital projects get approved once, executed
   once, and depreciated. Software needs continuous investment. The
   procurement model treats them as the first.

2. **Gartner Magic Quadrant is the de facto buying criterion.** A
   2-by-2 matrix produced by analysts paid by the vendors becomes the
   shortlist. Selection is "we picked an upper-right." Whether the
   product fits the business is a tertiary concern.

3. **RFP processes select for vendor sales capability, not product
   fit.** The 200-question RFP is answered by a sales engineer who
   knows which boxes to check. The actual product behavior in those
   areas is whatever the implementation team can be made to deliver.

4. **The "we won't pick the cheap one because it might fail" mindset
   is defensive purchasing.** The CIO chooses the expensive incumbent
   because they won't be fired for picking SAP. They might be fired
   for picking a startup.

5. **Vendor consolidation is sold as integration.** "Now you can have
   your CRM, ERP, and HR from one vendor." In practice each module is
   a separate acquisition, with separate data models, separate UIs,
   and separate support teams. The "single vendor" is a procurement
   convenience, not a product.

6. **The expectation that ERP fits the business via configuration is
   a category mistake.** The product was designed for an idealized
   business that never existed. The customer's business is real and
   specific. The gap is closed by the customer adapting, not the
   software.

---

## 15. The accumulating debt

1. **Every implementation creates technical debt the customer doesn't
   know they own.** Custom fields that nobody documented. Workflow
   rules that someone wrote and forgot. Integration mappings that
   silently transform data. The customer's "ERP" is actually a
   five-layer cake of decisions made by people who left the company
   years ago.

2. **The vendor's product roadmap is decoupled from the customer's
   debt.** The vendor ships new modules. The customer's debt
   compounds. The debt eventually requires a "transformation
   project" — which the vendor sells as a new implementation.

3. **The transformation project is the previous implementation,
   plus 5 years of patched compromises, plus the new vendor's
   compromises.** Customers transform every 7–10 years. Each
   transformation is more expensive than the last. The total
   lifetime cost is denied at every individual procurement decision.

---

## What good would look like

A short version, kept here so the critique doesn't read as
nihilism:

- **Schema designed for change.** New fields are real columns, with
  planner support, indexable, queryable, exportable. Customer-specific
  customizations don't break upgrades because the schema model
  anticipated them.

- **Data sovereignty by default.** The customer can export the entire
  relational graph at any time, with referential integrity intact, in
  a format that imports somewhere else. Off-boarding is a non-event.

- **One model, no module gates.** All modules are real and unlocked.
  Pricing is by usage, not by feature lock-out.

- **Integration is a first-class data model concern.** The schema is
  the API. Webhooks carry diffs. Bulk operations have streaming
  endpoints. iPaaS isn't required because the system natively speaks
  to other systems.

- **Operational, not implemented.** Time to first useful query is
  measured in days, not quarters. The implementation partner exists
  to teach the business, not to build the software.

- **Continuous, not periodic.** No month-end close — the books close
  themselves. Reporting is live, not nightly. The dashboard the CEO
  reads is the same data the operator typed in three minutes ago.

- **AI as integration glue, not as wallpaper.** The LLM doesn't read
  the broken data layer; it operates on a clean one. Agents don't
  approve POs — they discover that two systems disagree about a
  master record and fix it.

- **Honest pricing.** Per-tenant, per-usage, no named-user fictions,
  no module gates, no annual price escalations that aren't tied to
  consumption.

That's most of what Yggdrasil is trying to be. The list above is the
thing we're trying to escape.

---

*Living document. Add as new failure modes surface; remove if any of
them ever stop being true. Last updated: 2026-04-22.*
