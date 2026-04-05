# MIMIR LABS — DATA PROCESSING AGREEMENT

---

**Agreement No.:** DPA-\_\_\_\_-\_\_\_\_

**Effective Date:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

**BETWEEN:**

**Mimir Labs LLC** ("Processor")
Harrisburg, Pennsylvania

**AND:**

**\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_** ("Controller")
\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Each a "Party" and collectively the "Parties."

---

## RECITALS

**WHEREAS**, Controller has engaged Processor to provide one or more data platform services (as identified in Schedule 1), which may involve Processor accessing, receiving, or processing data on Controller's behalf; and

**WHEREAS**, the Parties wish to establish the terms governing such data processing activities to ensure compliance with applicable data protection laws, including but not limited to the General Data Protection Regulation (EU) 2016/679 ("GDPR"), the California Consumer Privacy Act ("CCPA"), and other applicable privacy frameworks;

**NOW, THEREFORE**, the Parties agree as follows:

---

## ARTICLE 1 — DEFINITIONS

**1.1** "Applicable Data Protection Law" means all laws and regulations applicable to the processing of Personal Data under this Agreement, including GDPR, CCPA, and any successor legislation.

**1.2** "Client Data" means all data, metadata, schema descriptions, configuration files, and other information provided by Controller to Processor in connection with the Services.

**1.3** "Data Subjects" means identified or identifiable natural persons to whom Personal Data relates.

**1.4** "Personal Data" means any information relating to a Data Subject that is processed by Processor on behalf of Controller under this Agreement.

**1.5** "Processing" means any operation performed on Personal Data, including collection, recording, organization, structuring, storage, adaptation, retrieval, consultation, use, disclosure, combination, restriction, erasure, or destruction.

**1.6** "Security Incident" means any confirmed unauthorized access to, or acquisition, use, or disclosure of, Personal Data processed under this Agreement.

**1.7** "Services" means the Mimir Labs data platform services identified in Schedule 1, which may include any combination of Ratatosk, Ragnarok, Bifrost, Jormungandr, and Yggdrasil ERP engagements.

**1.8** "Sub-Processor" means any third party engaged by Processor to process Personal Data on Controller's behalf.

---

## ARTICLE 2 — SCOPE AND PURPOSE OF PROCESSING

**2.1 Purpose.** Processor shall process Client Data solely for the purpose of performing the Services described in Schedule 1 and in accordance with Controller's documented instructions.

**2.2 Categories of Data.** The categories of Personal Data processed depend on the Services engaged. Schedule 1 specifies the applicable data categories for each Service.

**2.3 Data Subjects.** Data Subjects may include Controller's employees, customers, suppliers, and other business contacts whose information resides in the systems analyzed, migrated, synchronized, or governed under this Agreement.

**2.4 Duration.** Processing shall commence on the Effective Date and continue for the duration of the applicable Service engagement, unless earlier terminated in accordance with this Agreement.

---

## ARTICLE 3 — SERVICE-SPECIFIC DATA HANDLING

### 3.1 Ratatosk — Data Governance Analysis

**(a) Zero-Knowledge Architecture.** When performing Ratatosk governance workshops, Processor operates under a zero-knowledge model. Processor accesses database schemas (table names, column names, data types, foreign key relationships) and computes aggregate statistics only (row counts, null percentages, distinct value counts, string length averages). Processor does not read, store, transmit, or retain actual row-level data values.

**(b) ODBC Access.** If Controller provides ODBC database access, such access shall be read-only and limited to aggregate SQL functions (COUNT, AVG, MAX of lengths). No SELECT of actual data values is performed.

**(c) Shadow Systems.** If Controller provides spreadsheet files (Excel, CSV) for shadow system analysis, Processor extracts only structural metadata (sheet names, column headers, data types, relationships). Actual cell values are used only for data type inference during conversion and are not retained after conversion.

**(d) Deliverables.** All governance artifacts produced (manifests, reports, visualizations) contain structural metadata and aggregate statistics. No Personal Data or business data values appear in deliverables.

**(e) Retention.** Processor shall retain Ratatosk manifests and governance artifacts for thirty (30) days following delivery to Controller, after which they shall be securely deleted unless Controller provides written authorization for extended retention.

### 3.2 Ragnarok — Data Migration

**(a) Data Access.** Migration services require Processor to read data from Controller's source systems and write data to Controller's target systems. This includes actual row-level data containing Personal Data.

**(b) Transit Security.** All data in transit between source and target systems shall be encrypted using TLS 1.2 or higher.

**(c) No Persistent Storage.** Processor does not persistently store migrated data outside of Controller's source and target systems. Data flows through the migration pipeline and is not copied to Processor's infrastructure.

**(d) Air-Gapped Operation.** Ragnarok operates as a desktop application on Controller's premises or on Processor's secured workstation during the engagement. No data is transmitted to external servers.

**(e) Retention.** Migration plans and mapping configurations (which contain structural metadata but not row-level data) are retained for thirty (30) days post-engagement. Processor does not retain copies of migrated data.

### 3.3 Bifrost — Live Data Bridge

**(a) Continuous Processing.** Bifrost processes data continuously during its operational period, synchronizing changes between Controller's connected systems in near real-time.

**(b) Event Data.** Synchronized events may contain field-level data changes, including Personal Data. Events are processed in memory and written to Controller's systems. Processor does not store event data on its own infrastructure.

**(c) Credential Security.** Connection credentials for Controller's systems are encrypted at rest using AES-256 and stored only within Controller's deployment of the Bifrost application. Processor does not have access to stored credentials after initial configuration.

**(d) Dead Letter Queue.** Failed synchronization events are retained in a local dead letter queue on Controller's infrastructure for retry or manual review. Processor does not have remote access to the dead letter queue.

**(e) Retention.** Synchronization event logs (which may contain field-level change summaries) are retained on Controller's infrastructure according to Controller's retention policies. Processor retains no copies.

### 3.4 Jormungandr — Canon Governance

**(a) Schema-Only Processing.** Jormungandr processes schema structures, canonical definitions, and governance metadata. It does not access or process operational data or Personal Data.

**(b) Drift Detection.** Schema drift detection compares structural metadata (table definitions, column types, naming conventions) against canonical registries. No row-level data is accessed.

**(c) Retention.** Canon registries and governance validation records are retained on Controller's infrastructure. Processor retains copies of canonical definitions only for the duration of the active governance engagement.

### 3.5 Yggdrasil ERP

**(a) Multi-Tenant Hosting.** If Controller subscribes to Yggdrasil ERP, Processor hosts Client Data in an isolated PostgreSQL database (one database per tenant) with row-level security enforcement.

**(b) Tenant Isolation.** All queries, API calls, and service operations are scoped to Controller's tenant. No data is shared between tenants.

**(c) Data Categories.** Yggdrasil ERP may process employee data, customer data, supplier data, financial records, manufacturing data, and other business information as determined by Controller's use of the platform.

**(d) Backup and Recovery.** Client Data is backed up daily. Backups are encrypted at rest and retained for thirty (30) days. Backup media is securely destroyed upon expiration.

**(e) Retention.** Upon termination, Processor shall export Client Data in a machine-readable format within thirty (30) days of Controller's request and securely delete all copies within sixty (60) days of termination.

---

## ARTICLE 4 — CONTROLLER OBLIGATIONS

**4.1** Controller is responsible for ensuring that its collection and provision of Client Data to Processor is lawful, including obtaining any required consents from Data Subjects.

**4.2** Controller shall provide documented instructions regarding the processing of Personal Data. Processor shall process Personal Data only in accordance with such instructions unless required by law to do otherwise.

**4.3** Controller shall promptly notify Processor of any changes to Applicable Data Protection Law that may affect the processing activities under this Agreement.

---

## ARTICLE 5 — PROCESSOR OBLIGATIONS

**5.1 Compliance.** Processor shall process Personal Data in compliance with Applicable Data Protection Law and the terms of this Agreement.

**5.2 Confidentiality.** Processor shall ensure that all personnel authorized to process Personal Data have committed to confidentiality obligations.

**5.3 Security Measures.** Processor shall implement and maintain appropriate technical and organizational measures to protect Personal Data, including:

- Encryption of data in transit (TLS 1.2+)
- Encryption of data at rest (AES-256 for hosted services)
- Access controls with role-based permissions and multi-factor authentication
- Audit logging of all data access operations
- Regular security assessments and vulnerability testing
- Incident response procedures

**5.4 Sub-Processors.** Processor shall not engage Sub-Processors without Controller's prior written consent. Processor shall maintain a current list of Sub-Processors and notify Controller of any proposed changes at least thirty (30) days in advance. Processor shall impose data protection obligations on Sub-Processors no less protective than those in this Agreement.

**5.5 Data Subject Requests.** Processor shall promptly notify Controller of any requests received directly from Data Subjects regarding their Personal Data and shall assist Controller in responding to such requests to the extent technically feasible.

**5.6 Data Protection Impact Assessments.** Processor shall provide reasonable assistance to Controller in conducting data protection impact assessments where required by Applicable Data Protection Law.

---

## ARTICLE 6 — SECURITY INCIDENTS

**6.1 Notification.** Processor shall notify Controller of any Security Incident without undue delay and in no event later than seventy-two (72) hours after becoming aware of the incident.

**6.2 Content of Notification.** The notification shall include: (a) a description of the nature of the incident; (b) the categories and approximate number of Data Subjects affected; (c) the likely consequences; and (d) the measures taken or proposed to address the incident.

**6.3 Cooperation.** Processor shall cooperate with Controller in investigating, remediating, and reporting the Security Incident as required by Applicable Data Protection Law.

**6.4 Documentation.** Processor shall maintain records of all Security Incidents, including facts, effects, and remedial actions taken.

---

## ARTICLE 7 — DATA TRANSFERS

**7.1 Location.** Processor processes Client Data within the United States. If processing outside the United States becomes necessary, Processor shall notify Controller and ensure appropriate safeguards are in place.

**7.2 International Transfers.** For transfers of Personal Data originating from the European Economic Area, United Kingdom, or Switzerland, the Parties agree to execute the Standard Contractual Clauses (Module Two: Controller to Processor) as published by the European Commission, which are incorporated by reference.

---

## ARTICLE 8 — AUDIT RIGHTS

**8.1** Controller may audit Processor's compliance with this Agreement upon thirty (30) days' written notice, no more than once per calendar year, during regular business hours, and subject to reasonable confidentiality obligations.

**8.2** Processor shall make available all information necessary to demonstrate compliance and shall contribute to audits conducted by Controller or an independent auditor appointed by Controller.

**8.3** If Processor has obtained a SOC 2 Type I or Type II report, Processor may provide such report in satisfaction of Controller's audit rights, provided it covers the processing activities relevant to this Agreement.

---

## ARTICLE 9 — RETURN AND DELETION

**9.1** Upon termination of the applicable Service engagement, Processor shall, at Controller's election: (a) return all Client Data in a standard machine-readable format; or (b) securely delete all Client Data and certify such deletion in writing.

**9.2** Processor shall complete the return or deletion within sixty (60) days of termination unless a longer period is required by law.

**9.3** Processor may retain anonymized, aggregated data that does not identify any Data Subject for internal analytics and product improvement purposes.

---

## ARTICLE 10 — LIABILITY

**10.1** Each Party's liability under this Agreement shall be subject to the limitation of liability provisions in the underlying Service agreement (MSA, SOW, or Subscription Agreement).

**10.2** Nothing in this Agreement limits either Party's liability for breaches of Applicable Data Protection Law to the extent such limitation is prohibited by law.

---

## ARTICLE 11 — TERM AND TERMINATION

**11.1** This Agreement shall remain in effect for the duration of the applicable Service engagement(s) and for sixty (60) days thereafter to allow for data return and deletion.

**11.2** Either Party may terminate this Agreement immediately upon written notice if the other Party commits a material breach that remains uncured for thirty (30) days after written notice.

**11.3** Obligations regarding confidentiality, data deletion, and audit rights shall survive termination.

---

## ARTICLE 12 — GENERAL PROVISIONS

**12.1 Governing Law.** This Agreement shall be governed by the laws of the Commonwealth of Pennsylvania.

**12.2 Amendments.** This Agreement may be amended only in writing signed by both Parties.

**12.3 Entire Agreement.** This Agreement, together with its Schedules and the applicable Service agreement, constitutes the entire agreement between the Parties regarding data processing.

**12.4 Severability.** If any provision is held unenforceable, the remaining provisions shall continue in full force.

---

## SIGNATURES

**Mimir Labs LLC ("Processor")**

Signature: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Name: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Title: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Date: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_


**\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ ("Controller")**

Signature: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Name: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Title: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

Date: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

## SCHEDULE 1 — SERVICES AND DATA CATEGORIES

*Check all that apply:*

| Service | Engaged | Data Categories | Processing Activities |
|---------|---------|-----------------|----------------------|
| Ratatosk | [ ] | Schema metadata, aggregate statistics | Read-only schema introspection, governance analysis |
| Ragnarok | [ ] | Schema metadata, row-level business data (during migration) | Data extraction, transformation, loading |
| Bifrost | [ ] | Field-level change events, synchronization metadata | Real-time event processing and propagation |
| Jormungandr | [ ] | Schema metadata, canonical definitions | Schema validation, drift detection |
| Yggdrasil ERP | [ ] | Business data as determined by modules activated | Multi-tenant SaaS hosting and processing |

**Personal Data categories that may be processed:**

| Category | Applicable |
|----------|-----------|
| Employee names and contact information | [ ] |
| Customer names and contact information | [ ] |
| Supplier names and contact information | [ ] |
| Financial records (invoices, payments) | [ ] |
| Manufacturing and production data | [ ] |
| Quality and compliance records | [ ] |
| Other: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ | [ ] |

---

*Copyright 2024-2026 Mimir Labs LLC. All rights reserved.*
