# Research Notes: Vendor Architecture Survey

**Purpose:** Source material for Section 3 of the ERP architectural failure modes paper. Each vendor characterized independently with citations. Verified-fetched URLs marked as such; search-result snippets marked separately. Forum / community / Reddit posts noted as evidence of *complaint pattern*, not vendor architectural fact.

**Methodology note:** Web search was used to surface canonical vendor docs and discussion threads. Where the search returned only summaries, those summaries are treated as pointer evidence — the URL is the citation, the snippet is paraphrase. Direct WebFetch was used selectively to confirm load-bearing claims; one fetch (SAP help portal) was permission-blocked, noted inline.

**Date of research:** 2026-05-01.

---

## 1. SAP S/4HANA

SAP S/4HANA is the successor to SAP ECC (which itself succeeded R/3). The S/4 product family is split into S/4HANA Cloud Public Edition, S/4HANA Cloud Private Edition, and S/4HANA on-premise. Customization surface differs sharply across these editions; this section calls out edition where relevant.

### A. Schema rigidity evidence

**Fact:** S/4HANA exposes its data model primarily through Core Data Services (CDS) views, which form a "Virtual Data Model" (VDM) layered over the underlying tables. Customers and partners are explicitly directed to CDS views for integration, with the underlying tables intentionally not the public surface in Cloud Public Edition.
- Source: SAP Help — *Virtual Data Model and CDS Views in SAP S/4HANA* (`help.sap.com/docs/SAP_S4HANA_ON-PREMISE/.../8573b810511948c8a99c0672abc159aa.html`). Vendor official documentation.
- Source: SAP Business Accelerator Hub (`api.sap.com`) — released CDS views browseable per release.

**Fact (mandatory-fields pain point):** S/4HANA Cloud Public Edition does *not* expose configuration to make arbitrary fields mandatory in some master data apps — quoting an SAP Knowledge Base article: "SAP S/4HANA Cloud Public Edition does not provide any SSCUI/Configuration Activity to make fields mandatory, optional, or hidden in the App Manage Product Master Data" (KBA 2793752, `userapps.support.sap.com/sap/support/knowledge/en/2793752`).
- Source type: SAP official Knowledge Base article.
- Implication: The inverse complaint — customers being unable to add a required validation that the schema permits — is also true. The schema model is rigid in *both directions*.

**Complaint pattern (forum):** Multiple SAP Community threads document the inverse problem: customers attempting to enforce mandatory fields where the standard configuration does not provide a hook, requiring BAdI implementation. Example threads:
- `community.sap.com/t5/.../how-to-make-fields-mandatory-for-business-partners-in-s-4hana-cloud-public/qaq-p/12748700`
- `community.sap.com/t5/.../mandatory-fields-in-business-partner-master-data/qaq-p/12383161`
- `community.sap.com/t5/.../bp-role-fields-showing-as-mandatory-despite-config-not-being-set-as-such/qaq-p/11703098` ("BP Role Fields showing as mandatory despite config not being set as such")
- Source type: Vendor-hosted community forum. Treat as evidence of complaint pattern.

### B. Customization escape hatch

**Fact:** S/4HANA's official extensibility model is layered into three tiers:
1. **Key User Extensibility** — in-app, browser-based, available across all editions (Cloud Public, Cloud Private, on-premise).
2. **Managed Extensibility** — available in on-premise and Cloud Private only.
3. **Classic Extensibility** — on-premise only; the legacy "user exit / customer exit / BAdI" surface inherited from ECC.
- Source: NTT DATA "S/4HANA extensibility – In-app Extensions Part 1" (`nttdata-solutions.com/us/blog/s4-hana-extensibility-in-app-extensions-part-1/`). Partner blog summarizing SAP architecture.
- Source: itelligence "S/4HANA extensibility – the next generation of user exits" (`itelligencegroup.com/us/local-blog/s4-hana-extensibility-the-next-generation-of-user-exits/`). Partner blog.

**Fact (BAdIs):** New BAdIs are the SAP-recommended replacement for legacy user exits. They support multiple implementations per extension point, filters, and switch-framework toggling. Discoverable via transactions SE18 / SE19 (on-premise).
- Source: Origocite "User Exit, Customer Exit, BAdI, and BAPI" (`origocite.com/sap-user-exit-vs-customer-exit-vs-badi-bapi/`). Partner / consulting blog.

**Fact (Cloud Public Edition restriction):** Classic ABAP extensibility is unavailable in S/4HANA Cloud Public Edition — only Key User Extensibility and SAP-released "Cloud BAdIs" are permitted. This is the structural reason customers in Cloud Public Edition encounter the "no SSCUI to make this field mandatory" wall.
- Source: SAP Learning — "Using the Key-User In-App Extensibility Tools in SAP S/4HANA Cloud Private Edition" (`learning.sap.com/courses/implementing-sap-s-4hana-cloud-private-edition/...`). Vendor official.

### C. Audit / change log architecture

**Fact:** Change documents in SAP write field-level deltas to two tables: **CDHDR** (header — object class, document number, user, timestamp) and **CDPOS** (positions — table name, field name, old value, new value, change flag).
- Source: SAP Community "Utilizing standard CDS Views for Change Document Tables – CDHDR & CDPOS" (`community.sap.com/t5/.../utilizing-standard-cds-views-for-change-document-tables-cdhdr-cdpos/ba-p/13573692`). Vendor-hosted community.
- Source: Surety Systems "Utilizing an SAP CDPOS Table" (`suretysystems.com/insights/utilizing-an-sap-cdpos-table-to-improve-document-management/`). Partner blog.

**Architectural caveat:** "Change Document entry is only possible if the field of the database table is assigned a data element because you can only enable Change Document at data element level" — i.e., field-level audit is **opt-in at design time**, not automatic for every field. Custom fields that don't have change-document enablement on their data element will not be tracked.
- Source: Techlorean "Utilizing CDHDR and CDPOS SAP Tables for Change Logs" (`techlorean.com/2021/02/28/utilizing-cdhdr-and-cdpos-sap-tables-for-change-logs/`). Independent technical blog.

**Known gap (forum):** SAP KBA 2925251 — "BP - Change History does not show changes for LFA1 or KNA1 table, only for BUT* tables" (`userapps.support.sap.com/sap/support/knowledge/en/2925251`). Demonstrates that the legacy Customer/Vendor master tables don't surface in Business Partner change history because those changes are written via CVI (Customer/Vendor Integration) and the change docs sit on the BUT* tables.
- Source type: SAP official KBA. Architectural fact, not forum complaint.

### D. Module / database silo evidence

**Fact:** The Business Partner (BP) framework in S/4HANA unified the previously separate Customer (KNA1) and Vendor (LFA1) master records. From release 1709 onward, BP is the leading object; CVI (Customer/Vendor Integration) maintains backward-compatible writes into KNA1/LFA1.
- Source: SAP Knowledge Base 2662616 "S/4 HANA Data Migration error in LFA1/KNA1 table" (`userapps.support.sap.com/sap/support/knowledge/en/2662616`). Vendor official.
- Source: skillstek.com — *SAP Business Partner Conversion From SAP ERP to S/4 HANA* (partner blog).
- Source: SAPinsider — *Tips for Business Partner Adoption for SAP S/4HANA* (`sapinsider.org/articles/tips-for-business-partner-adoption-for-sap-s-4hana/`).

**Significance for the paper:** This is a vendor-acknowledged historical silo (Customer vs. Vendor as separate master objects) being collapsed into one — but the migration cost is borne by every existing ECC customer. "Code that references KNA1 or LFA1 for customer/vendor master data will not update properly in S/4 unless redirected through BP APIs or tables" (skillstek.com). The historical silo is real; the unification is genuine but incomplete (CVI is a compatibility layer, not a deletion of the legacy schema).

### E. State machine / workflow architecture

**Fact:** S/4HANA distinguishes **system status** (predefined by SAP per object type, cannot be changed) from **user status** (defined per status profile, configurable per order type).
- Source: SAP Learning — *Configuring Status Profiles for Production Orders* (`learning.sap.com/courses/configuring-sap-s-4hana-cloud-public-edition-manufacturing-execution/configuring-status-profiles-for-production-orders`). Vendor official.

**Fact:** Business transaction control governs which transactions are blocked or allowed at a given status — i.e., status transitions are governed at the configuration layer, not by free-form field updates. Per the SAP learning material: "If the order is released, the CRTD Created status is deleted and the REL Released status is set."
- Source: SAP Learning, same URL as above.

**Architectural assessment:** SAP has a *per-object-type* status engine, not a single global state engine. Production orders, sales orders, maintenance orders, etc. each have their own status profiles. The **SAP Business Workflow** engine is separate again, used for approval/routing rather than record-status transitions.
- Source: SAP Learning — *Explaining Workflow at SAP and in SAP S/4HANA* (`learning.sap.com/courses/sap-workflow-overview-basics-strategy-and-extensibility/explaining-workflow-at-sap-and-in-sap-s-4hana`).

### F. Integration architecture

**Fact:** S/4HANA supports event-driven integration via **SAP Integration Suite, Advanced Event Mesh (AEM)**, available natively from S/4HANA 2023 (release 2308) onward. Earlier integration was primarily synchronous (SOAP / OData / IDoc) or batch.
- Source: SAP Community — *SAP S/4HANA integration with SAP Integration Suite, Advanced Event Mesh* (`community.sap.com/t5/enterprise-resource-planning-blog-posts-by-sap/sap-s-4hana-integration-with-sap-integration-suite-advanced-event-mesh/ba-p/13577271`). SAP-authored blog post.
- Source: SAP Architecture Center — *Designing Event-Driven Applications* (`architecture.learning.sap.com/docs/ref-arch/fbdc46aaae`). Vendor official.

**Architectural assessment:** Event-driven integration is **opt-in and additive**, not the default. The dominant integration patterns historically were RFC, BAPI, IDoc, and (post-NetWeaver) SOAP web services. Event mesh is a recent overlay; the underlying business documents are still updated synchronously by ABAP transactions.

---

## 2. Oracle Fusion Cloud ERP

### A. Schema rigidity evidence

**Fact:** Oracle publishes table-and-view reference documentation per pillar (Financials, SCM, HCM, Sales/Service, Common). These are public:
- *Tables and Views for Sales, Fusion Service, and Field Service*: `docs.oracle.com/en/cloud/saas/sales/oedms/index.html`
- *Tables and Views for SCM*: `docs.oracle.com/en/cloud/saas/supply-chain-and-manufacturing/25b/oedsc/index.html`
- *Reference for Fusion ERP Analytics*: `docs.oracle.com/en/cloud/saas/analytics/25r2/faiae/tables.html`
- Source type: Vendor official documentation.

**Architectural note:** Oracle organizes tables into pillars and modules. The schema is not unified across pillars — HCM, Financials, SCM, and CX have separate documentation sets, which is itself evidence of internal silos at the data-model level. (See Section D.)

### B. Customization escape hatch

**Fact:** Oracle's official extensibility tool is **Application Composer**, a browser-based metadata editor. Per Oracle's own documentation: "Application Composer is an innovative, browser-based tool designed to enable business analysts and administrators extend and configure their applications. It enables business analysts and administrators, not just application developers, to extend their applications and make data model changes."
- Source: Oracle docs — *Configuring and Extending Applications* (`docs.oracle.com/en/cloud/saas/applications-common/26b/oaext/index.html`). Vendor official.
- Source: Oracle docs — *How do I add a custom field created in Application Composer?* (`docs.oracle.com/en/cloud/saas/fusion-service/faicm/add-a-custom-field-created-in-application-composer.html`). Vendor official.

**Important caveat:** "Application Composer is widely used in Sales and Fusion Service Cloud, and for selected objects of ERP" — meaning the tool's coverage of Financials and SCM modules is partial. Oracle's deeper PaaS extensions (Visual Builder Studio, OIC) are positioned as the answer for ERP-side extensibility.

### C. Audit / change log architecture

**Fact:** Audit is configured per business object via the **Manage Audit Policies** task in Setup and Maintenance. Auditing is configurable at three levels: object → attribute → audit-level (None / Auditing / Auditing with Old/New).
- Source: Oracle docs — *Set Up Auditing for Oracle Fusion Applications* (`docs.oracle.com/en/cloud/saas/applications-common/24d/facia/set-up-auditing-for-oracle-fusion-applications.html`). Vendor official.
- Source: Oracle docs — *Audit Trail* (Procurement) (`docs.oracle.com/en/cloud/saas/supply-chain-and-manufacturing/24c/faipr/audit-trail.html`). Vendor official.

**Critical finding (configurable bypass):** Quoting Oracle's own docs: *"If you don't want an object to be audited, you can stop the audit process by setting the Audit Level option to None. ... When you remove an attribute from the list, you stop auditing it even when the parent object is selected for audit."*
- Source: same Oracle docs as above.
- **Implication for the paper:** Audit is application-layer convention, not architectural enforcement. Administrators can disable audit on any object or attribute. This is opt-out at the configuration layer, not append-only at the database layer.

### D. Module / database silo evidence

**Fact:** Oracle Fusion is internally pillared. Per a partner summary corroborated by the structure of Oracle's own table reference docs: "Oracle Fusion utilizes schema modularization to organize database objects into separate pillars including Human Capital Management (HCM), Supply Chain Management (SCM), Financials, and Common/CX, with each pillar focusing on a specific business domain and tables further grouped into modules."
- Source: Datafusing — *Oracle Fusion Data Model & Table Structure Overview* (`datafusing.com/oracle-fusion-data-model-table-structure-overview/`). Partner blog. The structure is also evident from the existence of separate tables-and-views books per pillar in Oracle's docs.

**Implication:** Oracle Fusion has cross-pillar integration via the BICC / OTBI / FBDI layers but the operational schemas are not unified at the table level the way (e.g.) Odoo's res.partner is unified across modules.

### E. State machine / workflow architecture

Oracle Fusion uses **BPM Worklist / Approval Management** (AMX) for workflow / approval routing, layered over object-specific status fields. There is no single global state engine across the suite — each module governs its own state transitions. (Insufficient depth in current research; flag for follow-up if needed.)

### F. Integration architecture

**Fact:** Oracle's primary bulk integration paths are **FBDI** (File-Based Data Import) and **HDL/HCM Data Loader**, both batch. Real-time integration uses **REST APIs** and **Oracle Integration Cloud (OIC)**. Event-driven integration is via **Business Events** surfaced through OIC adapters.
- Source: Oracle Data Integrator docs — *Oracle Enterprise Resource Planning Cloud* (`docs.oracle.com/en/middleware/fusion-middleware/data-integrator/12.2.1.3/odikm/oracle-enterprise-resource-planning-cloud.html`). Vendor official.

**Architectural note:** Like SAP, the dominant integration pattern is request/response or batch; event-driven is an additive layer.

---

## 3. Microsoft Dynamics 365 — Finance & Operations + Business Central

These are two distinct products with different extensibility models; the paper should keep them separate.

### 3a. Dynamics 365 Finance & Operations (D365 F&O / D365FO)

#### A. Schema rigidity evidence

**Fact:** D365 F&O exposes data through **data entities** — abstractions over underlying tables. Per Microsoft Learn: "A data entity is an abstraction from the physical implementation of database tables that provides conceptual abstraction and encapsulation of underlying table schemas to represent key data concepts and functionalities."
- Source: Microsoft Learn — *Data entities overview* (`learn.microsoft.com/en-us/dynamics365/fin-ops-core/dev-itpro/data-entities/data-entities`). Vendor official.

**Fact:** Microsoft publishes a downloadable **Technical Reference Reports** archive listing all standard data entities per release.
- Source: Microsoft Learn — *Find information about standard data entities* (`learn.microsoft.com/en-us/dynamics365/fin-ops-core/dev-itpro/data-entities/data-entities-report`). Vendor official.

#### B. Customization escape hatch

**Fact:** As of D365 F&O version 8.0, Microsoft **hard-sealed all application models**. Overlayering produces compilation errors. The only supported customization model is via **extensions**.
- Source: Microsoft Learn — *Extensibility changes in the finance and operations version 8.0* (`learn.microsoft.com/en-us/dynamics365/fin-ops-core/dev-itpro/extensibility/changes-80`). Vendor official.

**Fact:** The **Chain of Command** (CoC) feature is the recommended pattern: extension classes wrap base methods, allowing access to protected and public members.
- Source: Microsoft Learn — *Extensibility changes in Finance and Operations, Enterprise edition 7.3* (`learn.microsoft.com/en-us/dynamics365/fin-ops-core/dev-itpro/extensibility/extensibility-changes-73`). Vendor official.

#### C. Audit / change log architecture

D365 F&O has **Database Log** functionality (table-level insert/update/delete logging configurable per table) inherited from AX, plus **Change Tracking** for data entity export to BYOD. This is configurable, not always-on. (Research current pass did not pull primary citation; flag for confirmation if load-bearing.)

#### D. Module / database silo evidence

**Fact:** D365 F&O ships as a unified application. Customer entity in F&O is the `CustTable` object; sales, AR, inventory, etc. join against it. **However**, when Dynamics 365 Customer Engagement (CE — Sales/Service/Marketing) is in play, those use **Dataverse** with a separate Account/Contact entity — and the F&O ↔ Dataverse synchronization is bidirectional and asynchronous.
- See section 3b for Business Central, and section on Dataverse integration below.

#### E. State machine / workflow architecture

D365 F&O uses **Workflow framework** for approval routing (purchase requisition approval, expense approval, etc.). Record-status transitions on operational documents are governed by per-object status fields and methods, not a single global state engine.

#### F. Integration architecture

**Fact:** Microsoft's BYOD (Bring Your Own Database) export is **batch**. Per Hitachi Solutions: "One of the key challenges with BYOD is high latency from batch-based exports that result in stale data."
- Source: Hitachi Solutions — *Bring Your Own Database (BYOD) for Dynamics 365 Finance & Operations: Part 1 / Part 2* (`global.hitachi-solutions.com/blog/bring-your-own-database-for-dynamics-365-finance-operations-part-1/`). Partner blog (Hitachi is a Microsoft partner; treat as expert opinion, not official Microsoft architectural admission).
- Source: Microsoft Learn — *Bring your own database (BYOD)* (`learn.microsoft.com/en-us/dynamics365/fin-ops-core/dev-itpro/analytics/export-entities-to-your-own-database`). Vendor official; describes the export-entity batch model, including incremental push via the change-tracking feature.

**Newer event-driven path:** Synapse Link for Dynamics 365 F&O streams entity-level changes to Azure Data Lake Storage Gen2 via a change-feed mechanism — this is the modern alternative to BYOD.
- Source: Same Hitachi Solutions blog series.

### 3b. Dynamics 365 Business Central

#### A. Schema rigidity evidence

**Fact:** Business Central tables are extensible only when their `Extensible` property is `true`. Quoting Microsoft Learn directly (verified by WebFetch): *"Only tables with the Extensible Property set to true can be extended."* and *"System and virtual tables cannot be extended."*
- Source: Microsoft Learn — *Table extension object - Business Central* (`learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/developer/devenv-table-ext-object`). Vendor official. Verified by WebFetch 2026-05-01. Article last updated 2025-05-07.

#### B. Customization escape hatch

**Fact:** AL extensions add fields via **table extensions** declared with `tableextension` syntax. Per the same Microsoft Learn article (verified): example shows `tableextension 50115 RetailWinterSportsStore extends Customer { fields { field(50116; ShoeSize; Integer) ... } }`. Field IDs are vendor-allocated by ID range.

**Fact (per-tenant extension conflict surface):** Per Microsoft Learn on PTE (per-tenant extension) merge conflicts: extensions installed in an environment "can't have the same top-level object declared multiple times or controls, fields, or data items with the same name defined multiple times" — meaning two PTEs cannot both add a field with the same name to the same table.
- Source: Microsoft Learn — *Upgrading Per-Tenant Extensions that conflicts with other extensions* (`learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/upgrade/upgrade-pte-merge-conflict`). Vendor official.

**Complaint pattern:** Demiliani.com — *"Dynamics 365 Business Central: per-tenant extensions and conflicts with standard Microsoft's fields"* (`demiliani.com/2021/03/01/...`). Independent MVP blog documenting the upgrade-time conflict surface when a PTE adds a field that Microsoft later adds to the base table. Treat as expert practitioner evidence of a known architectural friction.

#### C. Audit / change log architecture

Business Central has the legacy NAV-era **Change Log** module, configurable per table, which writes to `Change Log Entry`. Application-layer convention; configurable per field. (Not deeply researched in current pass.)

#### D. Module / database silo evidence

**Fact:** Business Central uses Dataverse-style shared entities when integrated with the broader Dynamics 365 family. Per partner summary corroborated by Microsoft Learn CDM docs: "Because all modules share the same Account and Contact entities, a customer record updated by the sales team is immediately visible to service, finance, and marketing — no integration or sync required."
- Source: Microsoft Learn — *About - Common Data Model* (`learn.microsoft.com/en-us/common-data-model/use`). Vendor official.

**Caveat:** The above applies to entities surfaced through Dataverse / CDM. Business Central's own SQL schema is separate; the unified-entity story is via Dataverse, not via shared SQL tables.

#### E. State machine / workflow architecture

Business Central has the **Workflow** module (inherited from NAV) for approval routing. Document-status transitions are coded into AL business logic on each document type, not driven by a central engine.

#### F. Integration architecture

OData / REST web services + webhooks. Business Events (via Microsoft Power Platform connector) provide some event-driven hooks. Not natively event-streaming.

---

## 4. Oracle NetSuite

### A. Schema rigidity evidence

**Fact:** NetSuite publishes the **SuiteScript Records Browser** as the canonical schema reference for SuiteScript developers: "The SuiteScript Records Browser shows which records are generally available for you to use in SuiteScript and includes a reference page for every supported record. In the Records Browser, you'll find all the fields, sublists, and search filter fields for each record."
- Source: Oracle NetSuite docs — *Working with the SuiteScript Records Browser* (`docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_N3169369.html`). Vendor official.
- Source: Oracle NetSuite docs — *Schema Explorer Tools* (`docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/article_1218120414.html`). Vendor official.

**Fact (read-only field rigidity):** Per NetSuite docs: "Not all fields in the SuiteScript Records Browser can be set using SuiteScript, as some fields are read only. ... Generally, if you can set a field in the UI, you can set it using SuiteScript, and if you cannot set a field in the UI, you cannot set it using SuiteScript."
- Source: Oracle NetSuite docs — *Using SuiteScript to Set Values for Custom Segment Fields* (`docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4570062208.html`).
- **Implication:** Some fields in the schema are computed / vendor-managed and cannot be overridden — the vendor's editorial decisions about what's writable propagate into the integration surface.

### B. Customization escape hatch

**Fact:** NetSuite's SuiteCloud framework supports custom fields, custom records, custom segments, and SuiteScript (server-side JavaScript). Custom segments unify cross-record classification. Custom fields are added via standard UI; custom records create entire new tables.
- Source: Oracle NetSuite docs (Records Browser portal links above).
- Source: NoBlue2 — *NetSuite Tips: Creating Custom Fields for Your Records* (`noblue2.com/blog/netsuite-tips-creating-custom-fields-for-your-records/`). Partner blog.

### C. Audit / change log architecture

**Fact:** NetSuite logs changes in **System Notes**, viewable per record and via the Audit Trail UI. System notes track the field changed, value before, value after, the user, the timestamp, and a Context field describing how the change was made (UI / web services / SuiteScript / etc.).
- Source: Oracle NetSuite docs — *Viewing an Audit Trail for a Record Type* (`docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N675070.html`). Vendor official.
- Source: Oracle NetSuite docs — *Using the Transaction Audit Trail* (`docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N556825.html`). Vendor official.
- Source: Oracle NetSuite docs — *Auditing Primary Data and Configuration Changes in NetSuite* (`docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_4577281258.html`). Vendor official.

**Critical finding (configurable bypass via preference):** Per NetSuite docs: *"The 'Log System Notes on Update Only' preference prevents NetSuite from logging system notes when records are created, and when this preference is set, system notes are logged only when records are updated."* — administrator preference can suppress the create-side audit.
- Source: same Oracle NetSuite docs.

**Critical finding (custom field exclusion):** Per NetSuite docs: *"If you turn off system-generated notes for custom fields, specific changes related to custom fields within the imported record are not recorded in NetSuite, although all changes for standard fields are logged as usual."*
- Source: Oracle NetSuite docs — *Setting CSV Import Preferences* (`docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N355760.html`). Vendor official.
- **Implication for the paper:** Audit logging on custom fields is configurable / suppressable. Application-layer convention, not enforced.

**Line-level limitation:** Per NetSuite docs: *"The line-level audit trail only tracks updates to existing line items, not their creation or deletion."*
- Source: Oracle NetSuite docs — *Line-Level Audit Trail for Transactions* (`docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_N557476.html`).

### D. Module / database silo evidence

NetSuite is a unified single-instance multi-tenant application — Customer record (`customer` record type) is shared across CRM, Sales, AR, Service. There is no per-module silo at the schema layer.

### E. State machine / workflow architecture

**Fact:** **SuiteFlow** is NetSuite's graphical workflow engine. States and transitions are explicit; record movement between states is driven by triggers (view, create, update events) and conditions.
- Source: Oracle NetSuite docs — *SuiteFlow Overview* (`docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_4068260113.html`). Vendor official.

**Architectural note:** SuiteFlow operates at the application layer over the underlying record schema. Records can still be mutated by direct SuiteScript (`record.submitFields()`) bypassing workflow if the script has the necessary role permissions.

### F. Integration architecture

**Fact:** SuiteAnalytics Connect (the ODBC/JDBC interface for analytical access) is documented as **not suitable for real-time use**. Per partner summary of NetSuite documentation: "SuiteAnalytics Connect should be used with static data or data that doesn't change often, as using real-time data access applications with the Connect Service can slow the retrieval of results and cause connection interruptions."
- Source: Multiple corroborating partner sources (Anchor Group, Suitecentric) summarizing NetSuite's positioning of Connect. NetSuite official docs at `docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/chapter_3963845427.html`.

**NetSuite Analytics Warehouse (NSAW):** Default 24-hour refresh; "Frequent Data Refresh v2" is an enhancement for Premium/Enterprise customers. Not real-time by default.
- Source: Houseblend — *NetSuite Analytics Warehouse: A Technical Guide & Benchmark* (`houseblend.io/articles/netsuite-analytics-warehouse-technical-guide`). Independent technical writeup.
- Source: Estuary — *NetSuite Analytics Warehouse: The Ultimate Guide* (`estuary.dev/blog/netsuite-analytics-warehouse/`). Vendor blog (Estuary is a competitor offering CDC into NSAW); treat directional claims with appropriate skepticism but the latency claim is corroborated by multiple sources.

---

## 5. Workday Financials

**Critical finding upfront: Workday does not publish a public database schema. This is itself an architectural finding worth citing in the paper.**

### A. Schema rigidity evidence

**Fact (negative):** Workday is architected as a SaaS-only product without direct database access for customers, partners, or even most internal developers. Per a former Workday engineer's published architecture writeup: "the OMS treats the SQL database as a key-value store rather than a relational database, using just a few tables. All parts of the object model are defined as metadata."
- Source: *Exploring Workday's Architecture* on Workday Engineering Medium (`medium.com/workday-engineering/exploring-workdays-architecture-73c5dbbffc35`). Vendor-authored.
- Source: *The Workday architecture — a new kind of OLTP software stack* (`dbms2.com/2010/08/22/workday-technology-stack/`). Independent industry analyst blog (Curt Monash); old (2010) but still characterizes the OMS approach.
- Source: Workday corporate blog — *Why Workday Is Different by Design, and Why It Matters* (`blog.workday.com/en-us/why-workday-is-different-by-design-and-why-it-matters.html`). Vendor official; positions the metadata-driven architecture as a design choice.

**Architectural assessment for the paper:** Workday inverts the schema-publication question. There is no relational schema *to* publish — the database is a metadata-store implementation, and the only public surface is the API (SOAP and a growing REST set) plus reporting via Workday Report Writer.
- Source: Workday Community — *REST Directory* (`community.workday.com/sites/default/files/file-hosting/restapi/index.html`). Vendor official; access requires Workday Community login.
- Source: Workday Community — *SOAP API Reference / Workday Web Services Directory* (`community-content.workday.com/en-us/public/products/platform-and-product-extensions/soap-api-reference.html`).

### B. Customization escape hatch

**Fact:** Workday's customization model is **calculated fields** + **custom report fields** + **business processes**. Customers do not write code against Workday's database; they configure metadata.
- Source: WorkdayNavigator — *Workday Calculated Fields: Complete Tenant Implementation Guide* (`workdaynavigator.com/blog/workday-calculated-fields-complete-tenant-implementation-guide/`). Practitioner blog.
- Source: UBC CIO — *Workday Calculated Fields Report Standard* (`cio.ubc.ca/data-governance/policies-standards-guidelines/report-standards/workday-calculated-fields-report`). Customer (UBC) governance documentation; useful as third-party corroboration of constraints.

**Critical limitation:** Calculated fields are bound to a specific business object (the "Calculated Field Business Object" / CFBO) at creation, and the binding cannot be changed. Per UBC's standard: "Business object selection cannot be changed after creation, and if you select the wrong object, you must delete and recreate the calculated field."

### C. Audit / change log architecture

Workday provides audit trail through standard reports and the BIRT-based reporting engine. Field-level audit is not as freely configurable as in Oracle Fusion or NetSuite — it's tied to Workday's internal change-history mechanisms accessible via reporting. (Insufficient primary citation in current research; flag for follow-up.)

### D. Module / database silo evidence

**Fact:** Workday is internally one object graph (the OMS); HCM, Financials, Spend Management, and Adaptive Planning all read/write the same in-memory object model. This is the architectural strength Workday markets — and it's structurally true because there is *no* relational silo. There is one in-memory object store.
- Source: Workday Engineering Medium article (above). Vendor-authored.

### E. State machine / workflow architecture

**Fact:** Workday's "Business Process Framework" is a unified workflow engine across all modules — every action that creates, updates, or deletes a business object is governed by a configurable Business Process. This is one of Workday's distinguishing architectural features.
- Source: Workday Community / `community.workday.com/api` and various practitioner blogs corroborate. (Note: Workday's authoritative documentation requires Community login; public-facing references are limited.)

### F. Integration architecture

**Fact:** Workday's primary integration tools are **Workday Studio** (proprietary IDE for building integrations), **Enterprise Interface Builder (EIB)** (batch import/export), and **Cloud Connect**. SOAP web services and a growing REST API. Real-time event-driven integration is limited compared to peer vendors.
- Source: Knit — *Workday API Integration Guide (In-Depth)* (`getknit.dev/blog/workday-api-integration-in-depth`). Integration vendor blog.
- Source: Apideck — *How to create a Workday REST API Integration?* (`apideck.com/blog/create-a-workday-rest-api-integration`). Integration vendor blog.

---

## 6. Infor CloudSuite

### A. Schema rigidity evidence

**Fact:** Infor's CloudSuite product family (Industrial / SyteLine, M3, LN, etc.) has **no single unified public schema document** — the product family was assembled through acquisition. CloudSuite Industrial / SyteLine, for instance, exposes data via Mongoose **Intelligent Data Objects (IDOs)** rather than direct table access.
- Source: Surety Systems — *Your Complete Guide to Infor Mongoose* (`suretysystems.com/insights/your-complete-guide-to-infor-mongoose/`). Partner blog.
- Source: Infor Developer Portal — *Application Development with Mongoose* (`app.theneo.io/infor/tutorials/application-development-with-mongoose`). Vendor official.

### B. Customization escape hatch

**Fact:** **Mongoose** is Infor's PaaS framework for extending CloudSuite Industrial. Per Infor: "Mongoose is Infor's extensibility solution, which can provide extensibility for any cloud suite product. ... Infor Mongoose is a Platform-as-a-Service (PaaS) that allows business users to build apps quickly with minimal coding and deploy them on-premises or in the cloud."
- Source: Visual South — *Application Extensibility In Infor CloudSuite Industrial* (`visualsouth.com/blog/mongoose-extensibility`). Partner blog.
- Source: Fortude — *Building low-code feature-rich applications for CloudSuite with Infor Mongoose* (`fortude.co/blog/building-low-code-feature-rich-applications-for-cloudsuite-with-infor-mongoose/`). Partner blog.

**Fact:** IDO Extension Classes allow C# .NET extension of Mongoose-managed business objects.
- Source: Same partner sources.

### C. Audit / change log architecture

Infor's audit mechanism varies by CloudSuite product (CSI, M3, LN are different codebases). Insufficient depth in current research pass.

### D. Module / database silo evidence

**Fact:** Infor CloudSuite is a portfolio of products (CSI/SyteLine, M3, LN, EAM, etc.) not a single database. Cross-product integration is via **Infor ION** (Intelligent Open Network) — a separate integration platform that mediates between products. This is *the opposite* of a unified-schema architecture; ION exists precisely because the underlying products don't share a schema.
- Source: Visual South — *Syteline Integration: How to Make Infor CSI ERP Work with Existing Systems* (`visualsouth.com/blog/infor-cloudsuite-industrial-integrate-existing-systems`). Partner blog.
- Source: Netray — *How to Set Up SyteLine Mongoose Integration* (`netray.co/resources/how-to-set-up-syteline-mongoose-integration`).

### E. State machine / workflow architecture

Workflow is per-product (CSI's Application Event System, M3's BPM, etc.). No unified state engine.

### F. Integration architecture

**Fact:** **ION** is Infor's enterprise service bus / event hub. Documents (BODs — Business Object Documents) are exchanged asynchronously between Infor products and external systems.
- Source: Infor Developer Portal — *How to Call an ION API from Mongoose* (`developer.infor.com/tutorials/application-development/how-to-call-ion-api-from-mongoose`). Vendor official.

---

## 7. Epicor Kinetic

### A. Schema rigidity evidence

Epicor Kinetic exposes its data via the **Kinetic REST API** and Business Activity Queries (BAQs). The schema reference is partly behind login on EpicWeb and partly via the in-app BAQ designer. No fully public schema browser at the level of NetSuite's Records Browser.

### B. Customization escape hatch

**Fact:** Epicor's customization model is **BPM Directives** (Business Process Management):
- **Method Directives** — pre/post hooks on API methods.
- **Data Directives** — triggered on database insert/update events.

Per multiple practitioner sources: "There are two main types of directives - Method Directives used to manage or enhance methods (specific actions, such as placing an order), and Data Directives triggered by database events."
- Source: BISCIT docs — *Customizations Options* (`docs.biscit.com/epicor-kinetic-warehouse/customizations-options`). Partner / implementation docs.
- Source: Epicor User Help Forum — *BPM documentation for custom code?* (`epiusers.help/t/bpm-documentation-for-custom-code/88339`). User community thread.

**Fact:** Custom code can be written in C# inside BPM directives. Application Studio (released ~10.2.600) provides a no-code form designer for the Kinetic UI.
- Source: GingerHelp — *Intro to Epicor Kinetic Customizations for Developers* (`gingerhelp.com/knowledgebase-epicor-erp/an-overview-of-kinetic-for-developers`). Practitioner blog.

### C. Audit / change log architecture

**Critical finding:** Epicor does **not** ship comprehensive built-in audit logging. Per Epicforce Tech: *"Epicor ERP doesn't provide built-in audit logging for all tables or transactions, but with BPMs, you can configure your own logging for any critical updates."*
- Source: Epicforce Tech — *Track Changes in Epicor BPMs Easily* (`epicforcetech.com/audit-trails-with-epicor-bpms-how-to-track-changes-without-custom-code/`). Partner blog. Treat as practitioner expert opinion; the underlying claim that Epicor's audit is BPM-built rather than schema-enforced is corroborated by:
- Epicor User Help Forum — *Does Epicor have an audit trail feature?* (`epiusers.help/t/does-epicor-have-an-audit-trail-feature/38829`). Multi-year user discussion confirming customers roll their own audit via BPMs.

**Implication for the paper:** Epicor delegates audit-trail completeness to the customer / implementer. There is no architectural enforcement.

### D. Module / database silo evidence

Epicor Kinetic ships as a single SQL Server database. No internal silos at the operational table level.

### E. State machine / workflow architecture

Status transitions are coded into business object methods; BPM directives can intercept. No central state engine.

### F. Integration architecture

REST APIs, Service Connect (legacy ESB), Epicor Data Discovery for analytics. Not natively event-streaming; integrations are typically API-based or batch.

---

## 8. Acumatica

### A. Schema rigidity evidence

Acumatica's data model is exposed primarily via the **Contract-Based REST/SOAP API** and the underlying SQL Server schema (visible to on-premise customers; cloud customers access via API). Custom fields, attributes, and user-defined fields all show up in the API under different surfaces.
- Source: Acumatica Community — *How to pass custom fields to Acumatica endpoint?* (`community.acumatica.com/develop-customizations-288/how-to-pass-custom-fields-to-acumatica-endpoint-19462`). Vendor-hosted community.
- Source: Acumatica Community — *Adding User-Defined Fields/Attributes to a Web Service Endpoint* (`community.acumatica.com/everything-else-119/adding-user-defined-fields-attributes-to-a-web-service-endpoint-22279`).

### B. Customization escape hatch

**Fact:** Acumatica distinguishes **three** mechanisms for adding custom data:
1. **Attributes** — flexible classification, **limited to leads, opportunities, customers, and inventory items**.
2. **User-Defined Fields (UDFs)** — for entities where attributes aren't supported; appear in a "User Defined Fields" tab.
3. **Custom Fields** — required for grid / line-item-level customization (attributes and UDFs cannot be placed at line level).
- Source: Acumatica Community — *Attributes, User Defined Fields and Custom fields* (`community.acumatica.com/develop-customizations-288/attributes-user-defined-fields-and-custom-fields-8076`). Vendor-hosted community thread.
- Source: Acumatica Customization Guide PDF (`acumatica.com/media/2020/02/AcumaticaERP_CustomizationGuide.pdf`). Vendor official.

**Implication for the paper:** Acumatica's customization surface is segmented in non-obvious ways — line-level extensibility requires a different mechanism than header-level, which is a known source of customer confusion.

### C. Audit / change log architecture

**Fact:** Acumatica has **Field-Level Audit** which must be **enabled** at the Enable/Disable Features screen (CS100000) and configured per screen and per field at the Audit screen (SM205510).
- Source: Net at Work — *Acumatica Cloud ERP Tips: Setting up Audit History within Acumatica* (`netatwork.com/setting-up-audit-history-within-acumatica-erp/`). Partner blog.
- Source: AugForums — *Acumatica Field-Level Audit* (`augforums.com/acumatica-field-level-audit/`). User community.

**Critical finding (configurable, opt-in, no historical backfill):** Per practitioner documentation: "dates will be tracked only from the date the new audits are configured forward, not for historical documents that posted before audits were configured."
- Source: Net at Work above.

**Implication for the paper:** Acumatica audit is opt-in, configurable per field, and **not retroactive**. Same pattern as Oracle Fusion and NetSuite — application-layer convention, not architectural enforcement.

### D. Module / database silo evidence

Acumatica ships as a single SQL Server database with shared customer / vendor records. No internal silos.

### E. State machine / workflow architecture

Per-entity status fields with workflow customization via the Acumatica Customization Project mechanism. Not a single global engine.

### F. Integration architecture

**Fact:** Acumatica has **Push Notifications** (since 2017R2) for outbound webhooks driven by Generic Inquiries and Business Events. SignalR is used for real-time UI push.
- Source: Acumatica Help — *Push Notifications: General Information* (`help.acumatica.com/.../wikiname=HelpRoot_Dev_Integration&PageID=562ccb34-3b08-45c4-9cf9-d51a8a54ae01`). Vendor official.
- Source: Acumatica blog — *Technical Tuesday: How to Use Business Events in Acumatica to Automate Processes* (`acumatica.com/blog/technical-tuesday-use-business-events-acumatica-automate-processes/`). Vendor official.

---

## 9. IFS Cloud

### A. Schema rigidity evidence

**Fact:** IFS Cloud is built on a **Layered Application Architecture (LAA)**. Customers extend via custom fields / custom attributes which are bound to **Logical Units (LUs)** — the IFS abstraction over database tables.
- Source: IFS docs — *Layered Application Architecture* (`docs.ifs.com/techdocs/21r2/010_overview/100_architecture/010_laa_overview/`). Vendor official.
- Source: IFS docs — *Custom Attributes* (`docs.ifs.com/techdocs/24r2/040_tailoring/225_configuration/400_entity_configurations/100_create_custom_attribute/`). Vendor official.

### B. Customization escape hatch

**Fact:** Custom fields are the client-side representation of a server-side **Custom Attribute**. Per IFS docs: "Custom fields is a concept that lets you extend an existing logical unit in IFS Application with additional custom information ... The administrator configures custom attributes that extend a logical unit, and when the extension is published custom fields bound to the attributes can be enabled and positioned onto application pages."
- Source: IFS docs — *Custom fields* (`docs.ifs.com/techdocs/22r1/060_development/025_operational_reporting/050_layout_design/020_layout_design/140_custom_fields/`). Vendor official.

**Performance caveat from IFS:** "Adding custom attributes will not affect performance of the core business logic, but there will be a performance overhead when the custom attributes are added to or shown in pages and reports."
- Source: same IFS docs.

### C. Audit / change log architecture

**Fact:** IFS provides **History Log** functionality, configured per Logical Unit at Solution Manager → Monitoring → History. Stores entries in `HISTORY_LOG_TAB` and `HISTORY_LOG_ATTRIBUTE_TAB` in the IFSAPP_DATA tablespace.
- Source: IFS docs — *History Log* (`docs.ifs.com/techdocs/24r2/030_administration/120_monitoring/010_history/010_history_log/`). Vendor official.
- Source: IFS Community — *Access History Log from Custom Event* (`community.ifs.com/framework-experience-infrastructure-cloud-integration-dev-tools-50/access-history-log-from-custom-event-12818`). Vendor-hosted community.

**Configurable, opt-in:** "IFS History log allows auditing on insert, update and delete of data in IFS tables, and can be configured to create a log entry only if specific columns are updated." — i.e., opt-in per column.

**Known limitation:** Per IFS Community thread (`community.ifs.com/.../how-to-enable-history-log-for-a-custom-attribute-of-an-entity-in-ifs-cloud-22r1-29651`), customers report that custom-attribute history logging in IFS Cloud differs from earlier IFS Applications 10 behavior. Treat as evidence of complaint pattern.

### D. Module / database silo evidence

IFS Cloud is a unified application database (single Oracle schema). No internal module silos at the table level.

### E. State machine / workflow architecture

IFS uses **state-driven Logical Units** — most LU instances have a state field with vendor-defined transitions. Custom event actions can trigger on state change. No single global state engine; state is per-LU.

### F. Integration architecture

**Fact:** Two integration paths:
1. **IFS Connect** — SOA / message bus; SOAP / XML / XSLT mapping. Synchronous and async.
2. **IFS Streams** — captures events and publishes to **RabbitMQ** queues for streaming consumers.
- Source: IFS docs — *Events* (`docs.ifs.com/techdocs/Foundation1/040_administration/240_integration/320_events/`). Vendor official.
- Source: ZigiWave — *IFS Cloud Integration: Benefits, Challenges, Use Cases* (`zigiwave.com/resources/ifscloud-benefits-challenges-usecases-`). Integration vendor blog.

---

## 10. Odoo (Community + Enterprise)

### A. Schema rigidity evidence

**Fact:** Odoo is open-source. The full schema is readable in Python source: every model is defined in a Python class inheriting from `models.Model`, with field declarations as class attributes. The canonical reference is the Odoo source on GitHub plus the official ORM documentation.
- Source: Odoo docs — *ORM API* (`odoo.com/documentation/19.0/developer/reference/backend/orm.html`). Vendor official.
- Source: Odoo source code on GitHub (`github.com/odoo/odoo`).
- Source: Odoo docs — *res.partner.py source on GitHub* (`github.com/odoo/odoo/blob/14.0/odoo/addons/base/models/res_partner.py`). Vendor official source.

### B. Customization escape hatch

**Fact:** Odoo provides **three inheritance mechanisms**:
1. **Classical inheritance** (`_inherit` with new `_name`) — creates a new model from an existing one.
2. **Extension** (`_inherit` without `_name`) — extends models in-place; the new module's class augments the existing one.
3. **Delegation** (`_inherits`) — delegates fields to records the model contains.
- Source: Odoo docs — *ORM API* (link above). Vendor official.

**Implication for the paper:** Odoo's schema is *intentionally extensible at the ORM layer*. Adding a field to `res.partner` from a custom module is a one-line declaration that becomes part of the model's class hierarchy at runtime.

### C. Audit / change log architecture

**Fact:** Field-level tracking is opt-in via the `tracking=True` attribute on a field, *only* for models inheriting from `mail.thread`. When tracked, Odoo writes a chatter message recording old and new value, user, and timestamp.
- Source: Odoo Forum — *How to track field changes and log it in the chatter* (`odoo.com/forum/help-1/how-to-track-field-changes-and-log-it-in-the-chatter-92360`). Vendor-hosted community.
- Source: Dasolo — *Odoo Tracking Field: Monitor Record Changes and Build Audit Trails* (`dasolo.ai/blog/odoo-data-api-5/odoo-tracking-field-explained-127`). Practitioner blog.

**Critical bypass:** Per practitioner documentation: *"Tracking is triggered through the Odoo ORM when records are modified using the standard write() method, but direct SQL updates, bulk imports that bypass the ORM, or certain low-level API calls will not trigger tracking."*
- Source: Same Dasolo blog.

**Implication for the paper:** Odoo audit is at the application / ORM layer. Direct SQL or `cr.execute()` calls bypass tracking. This is architecturally honest — Odoo doesn't claim database-enforced audit — but it means audit completeness depends on developer discipline.

**Comprehensive audit:** OCA (Odoo Community Association) maintains a separate **Audit Log** module that hooks at a lower level to log create/read/write/delete operations.
- Source: Odoo Apps Store — *Audit Log module* (`apps.odoo.com/apps/modules/12.0/auditlog`). OCA-published; not core Odoo.

### D. Module / database silo evidence

**Fact:** Odoo unifies customers, vendors, and contacts under a single `res.partner` model. From v13 onward, the distinction is via **`customer_rank`** and **`supplier_rank`** integer fields rather than booleans, allowing a single partner to be both. Per the documentation: "Instead of using separate models for customers, suppliers, and employees, Odoo unifies them under one model (res.partner)."
- Source: Technaureus — *Odoo res.partner Concept on Odoo 18* (`technaureus.com/blog-detail/odoo-partner-respartner-concept-2`). Practitioner blog.
- Source: Dasolo — *The res.partner Model: Odoo's Contact Architecture Explained* (`dasolo.ai/blog/odoo-data-api-5/odoo-res-partner-model-guide-154`).

**Implication for the paper:** This is the cleanest example among surveyed vendors of a single unified party model — a deliberate architectural choice rather than a backwards-compatible migration target like SAP's Business Partner.

### E. State machine / workflow architecture

**Fact:** Odoo uses **`state` Selection fields** on individual models (e.g., `sale.order.state` ∈ `{draft, sent, sale, done, cancel}`). Transitions are implemented in business methods (e.g., `action_confirm()`). The legacy "workflow engine" was removed in v9; transitions are now plain Python method calls.
- Source: Odoo Forum — *Odoo 10 : how to change the state of workflow under condition* (`odoo.com/forum/help-1/odoo-10-how-to-change-the-state-of-workflow-under-condition-132061`). Vendor-hosted community.
- Source: Odoo Forum — *[workflow] Adding a custom state and transition to Sales Order (Quotation)* (`odoo.com/forum/help-1/workflow-adding-a-custom-state-and-transition-to-sales-order-quotation-73410`).

**Implication:** No central state engine. State governance is a convention pattern in Python methods.

### F. Integration architecture

XML-RPC and JSON-RPC are the canonical APIs. REST is community-provided (OCA). Webhooks via OCA modules. Not natively event-streaming.

---

## Synthesis — Recurring Patterns Across Vendors

This section identifies architectural patterns that recur across multiple vendors. Each pattern is supported by the per-vendor citations above.

### Pattern 1: Audit logging is application-layer convention, not database enforcement

Across **NetSuite, Oracle Fusion, Acumatica, IFS Cloud, Epicor Kinetic, and Odoo**, audit logging is configurable, opt-in, and bypassable:

- NetSuite: "Log System Notes on Update Only" preference suppresses create-side audit; CSV import preferences can suppress system notes for custom fields.
- Oracle Fusion: Audit Level can be set to None per object; attributes can be removed from the audit list.
- Acumatica: Field-Level Audit must be enabled per feature, per screen, per field. Not retroactive.
- IFS Cloud: History log is opt-in per LU and per column.
- Epicor: No comprehensive built-in audit; customers build via BPM Data Directives.
- Odoo: Tracking is per-field opt-in via `tracking=True`; direct SQL updates bypass tracking entirely.

**SAP S/4HANA** is somewhat different — change documents (CDHDR/CDPOS) are designed in at the data-element level — but field-level audit is still opt-in at design time, not automatic. **Workday's** audit mechanism is the most opaque (no public schema, only reportable through Workday's reporting layer).

**Implication for the paper:** The "audit trail" feature line on every ERP marketing brochure means very different things in practice. None of the surveyed vendors enforce append-only auditing at the database layer; all delegate to application-layer conventions that an administrator or a privileged batch process can suppress.

### Pattern 2: Customization is segmented into "blessed" surfaces (custom fields / extensions) with implicit limits

- **Acumatica** distinguishes Attributes (limited to 4 entity types) vs. UDFs vs. Custom Fields (line-level only).
- **Oracle Fusion**: Application Composer covers "selected objects of ERP," not all of them.
- **SAP S/4HANA Cloud Public Edition**: Key User Extensibility only, no classic ABAP exits.
- **Business Central**: only tables with `Extensible = true` can be extended; system tables cannot.
- **Workday**: calculated fields bound to a CFBO at creation; cannot be re-bound.
- **NetSuite**: SuiteScript can only set fields the UI can set (vendor-managed read-only fields).

**Implication for the paper:** Every major ERP says "you can extend the schema." Every major ERP also has a list of things you cannot extend. Customers consistently underestimate the segmentation until they hit it mid-implementation.

### Pattern 3: Required-field rigidity drives "dummy value" workarounds

Direct vendor evidence is strongest for **SAP S/4HANA** (multiple SAP Knowledge Base articles and Community threads documenting the inability to either enforce mandatory fields where the standard config doesn't permit, or to relax mandatory fields where it does — both wall cases). The complaint pattern recurs across vendors but the search did not surface canonical-quality forum citations for every vendor; **this is a documented complaint pattern at SAP and a likely-but-not-cited pattern at Workday and Oracle Fusion** (where mandatory-field control is bound to seeded business object metadata that customers cannot freely modify).

### Pattern 4: One business object, many physical representations

- **SAP S/4HANA** unified Customer (KNA1) and Vendor (LFA1) into Business Partner — but CVI maintains the legacy tables for backward compatibility. Two representations, one logical object.
- **Microsoft Dynamics**: F&O has `CustTable`; Dataverse has Account / Contact; CE uses Dataverse. Same logical Customer, three physical representations, synchronized asynchronously.
- **Infor CloudSuite**: each product (CSI, M3, LN) has its own Customer concept; ION mediates BODs between them.

By contrast:
- **Odoo**: `res.partner` is the one canonical place. Customer / Vendor distinction is `customer_rank` / `supplier_rank` flags on the same record.
- **NetSuite**: single `customer` record type used across the suite.
- **Acumatica, Epicor, IFS Cloud, Workday**: structurally unified at the operational layer.

**Implication for the paper:** SAP and Dynamics-with-CE pay for their breadth with multi-representation overhead. The unified vendors traded acquisition flexibility for schema consistency.

### Pattern 5: Event-driven integration is additive, not foundational

For **SAP S/4HANA, Oracle Fusion, NetSuite, Dynamics 365 F&O, Acumatica, IFS Cloud**, the underlying transaction layer is request/response or batch. Event mesh / Synapse Link / NSAW / Streams / Push Notifications are layered overlays that capture changes and publish them downstream — usually with documented latency or refresh-cadence caveats.

- NetSuite NSAW: 24-hour default refresh.
- D365 F&O BYOD: documented as high-latency batch.
- SAP S/4HANA Advanced Event Mesh: native S/4HANA support added in 2023 (release 2308) — a recent addition, not a foundational pattern.

The two exceptions are **Workday** (which is event-driven internally to its OMS but has a limited external event-streaming surface) and **Odoo** (which has no native event-streaming layer; the community fills this with webhooks and Kafka modules).

**Implication for the paper:** "Real-time" in ERP marketing usually means "near-real-time at additional cost on a separate product line." The operational store is the source of truth; the analytical store is a stale projection. This is universal across the surveyed vendors.

### Pattern 6: Workflow / state engines are per-object, not global

Only **Workday** has a single, suite-wide Business Process Framework governing every state transition across modules. Every other vendor surveyed implements state transitions per business object type:
- SAP: Status Profile per order type; SAP Business Workflow as a separate approval engine.
- NetSuite: SuiteFlow per record type.
- Dynamics: Workflow framework per module (F&O Workflow vs. CE flows vs. BC workflow).
- Acumatica: Customization Project per entity.
- Odoo: `state` field per model with method-driven transitions.

**Implication for the paper:** When someone says "you need a state machine in your ERP," what they mean depends entirely on which vendor they came from. There is no industry-standard pattern.

---

## Caveats / Research Quality Notes

1. **Forum / community citations are evidence of complaint pattern, not vendor architectural fact.** Where a Community SAP thread says customers struggle with a configuration limitation, that proves customers are talking about it — not that the limitation is exactly as described. Many threads contain incorrect customer assumptions resolved in the comment chain.

2. **Vendor-authored blogs vs. partner blogs vs. independent practitioner blogs** all carry different epistemic weight. Vendor-authored content is authoritative for the vendor's *intended* architecture; partner blogs are authoritative for *implementation reality* (because partners do the implementations); independent blogs are spot-checks. Citations are tagged by source type throughout.

3. **Workday is structurally underdocumented in public.** Workday's SOAP/REST directories require Community login. The architectural claims in section 5 lean heavily on the Workday Engineering Medium post and a 2010 industry analyst piece, which together are dated but corroborative on the metadata-store architecture. If the paper's Workday claims are load-bearing, recommend obtaining a Workday Community login for primary citations.

4. **WebFetch was permission-blocked once** during research (for `help.sap.com`). The SAP claims rely on web-search snippets of vendor documentation rather than direct fetch of those pages. Spot-checks via search query corroborated the snippets but the author should treat SAP citations as one verification step shallower than Microsoft / Oracle / NetSuite citations (where direct documentation URLs are confirmed via search returns).

5. **Edition / version sensitivity is critical for SAP and Dynamics.** SAP ECC, S/4HANA on-premise, S/4HANA Cloud Private, and S/4HANA Cloud Public have substantially different extensibility surfaces. Dynamics AX, Dynamics 365 F&O, and Dynamics 365 Business Central are distinct products. The paper should always name the edition/version when citing a specific limitation.

6. **Several sub-categories were not deeply researched in this pass:** D365 F&O Database Log specifics; Workday audit trail mechanism; per-vendor RBAC / row-level security as a customization escape hatch. Flag for follow-up if any of these become load-bearing in the paper.
