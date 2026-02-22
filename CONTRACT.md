# YGGDRASIL ERP -- SOFTWARE-AS-A-SERVICE SUBSCRIPTION AGREEMENT

<!--
  BoldSign Integration Notes
  ==========================
  This document uses BoldSign text tags for automated form field placement.
  When sending via BoldSign API, set "useTextTags": true in the request.

  Signer Roles:
    Signer 1 = Provider (Mimir Labs LLC)
    Signer 2 = Client (Subscribing Organization)

  Text Tag Format:
    {{field_type|signer_index|required|label|field_id}}

  Field Types Used:
    text  = Text input field
    sign  = Signature field
    init  = Initials field
    date  = Editable date field

  Checkbox/Radio fields use definition tags: {{@definition_id|signer_index}}
  These require TextTagDefinitions in the API request body.
  See APPENDIX D for the full TextTagDefinitions JSON payload.

  IMPORTANT: When converting this document to PDF for BoldSign processing,
  set text tag font color to white (#FFFFFF) on white background to hide
  the raw tag text from the rendered document.
-->

---

**Agreement No.:** {{text|1|*|AGR-XXXX-XXXX|agreement_number}}

**Effective Date:** {{date|1|*|MM/dd/yyyy|effective_date}}

---

**BETWEEN:**

**Mimir Labs LLC** ("Provider")
{{text|1|*|Provider Address|provider_address}}

**AND:**

**{{text|2|*|Client Legal Entity Name|client_company_name}}** ("Client")
{{text|2|*|Client Address|client_address}}

Each a "Party" and collectively the "Parties."

---

## RECITALS

**WHEREAS**, Provider has developed and operates Yggdrasil ERP, a multi-tenant enterprise resource planning platform delivered as a hosted software service; and

**WHEREAS**, Client desires to subscribe to and use the Yggdrasil ERP platform subject to the terms and conditions set forth herein;

**NOW, THEREFORE**, in consideration of the mutual covenants contained herein and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the Parties agree as follows:

---

## ARTICLE I -- DEFINITIONS

**1.1** "Authorized Users" means employees, contractors, or agents of Client who are authorized by Client to access and use the Service under this Agreement.

**1.2** "Business Module" means a discrete functional area of the Service (e.g., CRM, Sales, Manufacturing), as enumerated in Schedule A.

**1.3** "Client Data" means all data, information, and materials submitted, uploaded, or otherwise transmitted to the Service by or on behalf of Client or its Authorized Users.

**1.4** "Documentation" means the user guides, technical manuals, API references, and other materials provided or made available by Provider describing the features, functions, and operation of the Service.

**1.5** "Effective Date" means the date first written above.

**1.6** "Implementation Period" means the period commencing on the Effective Date during which Provider configures, migrates data, and otherwise prepares the Service for Client's productive use, as specified in Schedule B.

**1.7** "Intellectual Property Rights" means all patents, copyrights, trademarks, trade secrets, and any other proprietary rights recognized under applicable law.

**1.8** "Service" means the Yggdrasil ERP platform, including all software, infrastructure, APIs, updates, and Documentation made available by Provider to Client under this Agreement.

**1.9** "Service Level Agreement" or "SLA" means the uptime, support, and performance commitments set forth in Schedule B.

**1.10** "Subscription Fee" means the recurring fee payable by Client for access to the Service, as set forth in Schedule C.

**1.11** "Subscription Term" means the initial and any renewal periods of this Agreement, as set forth in Schedule C.

**1.12** "Tenant" means Client's isolated instance within the multi-tenant architecture, identified by a unique tenant_id.

---

## ARTICLE II -- GRANT OF LICENSE AND ACCESS

**2.1 License Grant.** Subject to the terms of this Agreement and payment of all applicable Fees, Provider hereby grants to Client a non-exclusive, non-transferable, non-sublicensable, revocable right to access and use the Service during the Subscription Term solely for Client's internal business operations.

**2.2 Authorized Users.** Client may permit up to {{text|1|*|Number of users|max_users}} Authorized Users to access the Service. Additional user seats may be purchased in accordance with the pricing terms in Schedule A.

**2.3 Tenant Isolation.** Provider shall maintain logical separation of Client Data from that of other tenants. Client's Tenant shall be identified by a unique tenant_id, and all database queries, API calls, and service operations shall be scoped to Client's Tenant.

**2.4 Restrictions.** Client shall not, and shall not permit any third party to: (a) sublicense, sell, lease, or otherwise transfer access to the Service; (b) reverse engineer, decompile, or disassemble any portion of the Service; (c) use the Service to build a competing product or service; (d) circumvent or disable any security features; (e) introduce any malicious code; or (f) exceed the usage limits specified herein.

---

## ARTICLE III -- IMPLEMENTATION AND ONBOARDING

**3.1 Implementation.** Provider shall perform the implementation services described in Schedule B, including environment provisioning, data migration assistance, and initial configuration of selected Business Modules.

**3.2 Client Cooperation.** Client shall provide Provider with timely access to personnel, data, systems, and information reasonably required for implementation. Delays caused by Client's failure to cooperate may extend the Implementation Period and may result in additional fees.

**3.3 Acceptance.** Upon completion of implementation, Provider shall notify Client in writing. Client shall have fourteen (14) calendar days to conduct acceptance testing. If Client does not provide written notice of material deficiencies within the acceptance period, the Service shall be deemed accepted.

**3.4 Training.** Provider shall provide {{text|1|*|Number of training hours|training_hours}} hours of remote training for Client's Authorized Users at no additional charge. Additional training sessions are available at Provider's then-current rates.

---

## ARTICLE IV -- SERVICE LEVELS AND SUPPORT

**4.1 Availability.** Provider shall use commercially reasonable efforts to maintain Service availability in accordance with the SLA tier selected in Schedule B.

**4.2 Scheduled Maintenance.** Provider may perform scheduled maintenance during designated maintenance windows (Sundays 02:00-06:00 UTC). Provider shall provide at least 72 hours' advance notice for scheduled maintenance expected to exceed 30 minutes.

**4.3 Support.** Provider shall provide technical support in accordance with the support tier selected in Schedule B.

**4.4 Incident Response.** Provider shall classify and respond to incidents as follows:

| Severity | Description | Initial Response | Resolution Target |
|----------|-------------|-----------------|-------------------|
| Critical (P1) | Service unavailable or major data integrity issue | 1 hour | 4 hours |
| High (P2) | Significant feature degradation | 4 hours | 1 business day |
| Medium (P3) | Minor feature issue with workaround available | 1 business day | 5 business days |
| Low (P4) | Cosmetic issue or enhancement request | 2 business days | Next release cycle |

**4.5 Remedies for SLA Breach.** If Provider fails to meet the applicable uptime commitment for any calendar month, Client shall be entitled to a service credit as specified in Schedule B. Service credits are Client's sole and exclusive remedy for SLA failures.

---

## ARTICLE V -- FEES AND PAYMENT

**5.1 Subscription Fees.** Client shall pay the Subscription Fees as set forth in Schedule C. All fees are quoted in United States Dollars (USD) unless otherwise specified.

**5.2 Invoicing.** Provider shall invoice Client in accordance with the billing frequency selected in Schedule C. Invoices are due and payable within thirty (30) days of the invoice date.

**5.3 Late Payment.** Overdue amounts shall accrue interest at the lesser of 1.5% per month or the maximum rate permitted by applicable law. Provider may suspend access to the Service if any invoice remains unpaid for more than forty-five (45) days past due, provided Provider has given Client at least fifteen (15) days' prior written notice.

**5.4 Taxes.** All fees are exclusive of taxes. Client shall be responsible for all applicable sales, use, value-added, and similar taxes, excluding taxes based on Provider's income.

**5.5 Fee Adjustments.** Provider may adjust Subscription Fees upon renewal by providing Client at least sixty (60) days' written notice prior to the start of the renewal term. Fee increases shall not exceed {{text|1|*|Max annual increase %|max_fee_increase_pct}}% per annum.

---

## ARTICLE VI -- DATA OWNERSHIP AND PRIVACY

**6.1 Client Data Ownership.** As between the Parties, Client retains all right, title, and interest in and to Client Data. Provider acquires no rights in Client Data except the limited rights expressly granted in this Agreement.

**6.2 License to Client Data.** Client grants Provider a non-exclusive, worldwide, royalty-free license to use, process, store, and transmit Client Data solely to the extent necessary to provide the Service and fulfill Provider's obligations under this Agreement.

**6.3 Data Protection.** Provider shall implement and maintain administrative, technical, and physical safeguards designed to protect Client Data against unauthorized access, destruction, use, modification, or disclosure, consistent with industry standards and applicable law.

**6.4 Data Location.** Client Data shall be stored and processed in: {{text|1|*|Data center region(s)|data_region}}

**6.5 Data Portability.** Upon written request, Provider shall make Client Data available for export in a standard machine-readable format (CSV, JSON, or SQL dump) within thirty (30) days. Upon termination, Provider shall make Client Data available for export for a period of ninety (90) days, after which Provider may delete Client Data in accordance with its data retention policies.

**6.6 Anonymized Data.** Provider may aggregate and anonymize Client Data such that it no longer identifies Client or any individual, and may use such anonymized data for product improvement, benchmarking, and analytical purposes.

---

## ARTICLE VII -- INTELLECTUAL PROPERTY

**7.1 Provider IP.** Provider retains all Intellectual Property Rights in and to the Service, including all software, algorithms, interfaces, Documentation, and derivative works. Nothing in this Agreement transfers ownership of any Provider IP to Client.

**7.2 Client IP.** Client retains all Intellectual Property Rights in and to Client Data and any pre-existing materials provided by Client. Nothing in this Agreement transfers ownership of any Client IP to Provider.

**7.3 Feedback.** If Client provides suggestions, enhancement requests, or other feedback regarding the Service ("Feedback"), Client hereby grants Provider a perpetual, irrevocable, worldwide, royalty-free license to use, incorporate, and commercialize such Feedback without restriction or obligation.

---

## ARTICLE VIII -- CONFIDENTIALITY

**8.1 Definition.** "Confidential Information" means all non-public information disclosed by one Party to the other in connection with this Agreement, whether oral, written, or electronic, that is designated as confidential or that a reasonable person would understand to be confidential given the nature of the information and circumstances of disclosure.

**8.2 Obligations.** The receiving Party shall: (a) use Confidential Information solely in connection with this Agreement; (b) protect Confidential Information using at least the same degree of care it uses for its own confidential information, but no less than reasonable care; and (c) not disclose Confidential Information to any third party except as necessary to perform its obligations under this Agreement.

**8.3 Exclusions.** Confidential Information does not include information that: (a) is or becomes publicly available through no breach of this Agreement; (b) was known to the receiving Party prior to disclosure; (c) is independently developed without use of Confidential Information; or (d) is rightfully received from a third party without restriction.

**8.4 Compelled Disclosure.** If the receiving Party is compelled by law to disclose Confidential Information, it shall provide the disclosing Party with prompt written notice (to the extent legally permitted) and shall cooperate with the disclosing Party's efforts to obtain protective treatment.

**8.5 Duration.** Confidentiality obligations shall survive for three (3) years after termination of this Agreement, except for trade secrets, which shall be protected for so long as they remain trade secrets under applicable law.

---

## ARTICLE IX -- WARRANTIES AND DISCLAIMERS

**9.1 Provider Warranties.** Provider warrants that: (a) it has the right and authority to enter into this Agreement and provide the Service; (b) the Service will perform materially in accordance with the Documentation; and (c) it will provide the Service in a professional and workmanlike manner consistent with generally accepted industry standards.

**9.2 Client Warranties.** Client warrants that: (a) it has the right and authority to enter into this Agreement; (b) its use of the Service will comply with all applicable laws and regulations; and (c) it has obtained all necessary consents and authorizations to submit Client Data to the Service.

**9.3 Disclaimer.** EXCEPT AS EXPRESSLY SET FORTH IN THIS AGREEMENT, THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE." PROVIDER DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ANY WARRANTIES ARISING FROM COURSE OF DEALING OR USAGE OF TRADE. PROVIDER DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE.

**9.4 Beta/Early-Access Features.** Any features designated as "alpha," "beta," or "early access" are provided without warranty of any kind and may be modified or discontinued without notice.

---

## ARTICLE X -- LIMITATION OF LIABILITY

**10.1 Cap on Liability.** TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, NEITHER PARTY'S AGGREGATE LIABILITY UNDER THIS AGREEMENT SHALL EXCEED THE TOTAL FEES PAID OR PAYABLE BY CLIENT DURING THE TWELVE (12) MONTH PERIOD IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM.

**10.2 Exclusion of Consequential Damages.** IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, REVENUE, DATA, OR BUSINESS OPPORTUNITY, REGARDLESS OF THE CAUSE OF ACTION OR THEORY OF LIABILITY, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.

**10.3 Exceptions.** The limitations in Sections 10.1 and 10.2 shall not apply to: (a) Client's breach of Section 2.4 (Restrictions); (b) either Party's breach of Article VIII (Confidentiality); (c) Provider's breach of Section 6.3 (Data Protection); or (d) either Party's indemnification obligations under Article XI.

---

## ARTICLE XI -- INDEMNIFICATION

**11.1 Provider Indemnification.** Provider shall defend, indemnify, and hold harmless Client from and against any third-party claims alleging that the Service, as provided by Provider, infringes any valid patent, copyright, or trademark. Provider's obligations under this Section are conditioned upon Client providing: (a) prompt written notice; (b) sole control of the defense and settlement; and (c) reasonable cooperation at Provider's expense.

**11.2 Client Indemnification.** Client shall defend, indemnify, and hold harmless Provider from and against any third-party claims arising from: (a) Client Data; (b) Client's use of the Service in violation of this Agreement or applicable law; or (c) Client's breach of its warranties under Section 9.2.

**11.3 Sole Remedy.** This Article XI states each Party's sole and exclusive remedy for third-party intellectual property infringement claims.

---

## ARTICLE XII -- TERM AND TERMINATION

**12.1 Term.** This Agreement commences on the Effective Date and continues for the initial Subscription Term specified in Schedule C, unless earlier terminated in accordance with this Article.

**12.2 Renewal.** Unless either Party provides written notice of non-renewal at least sixty (60) days prior to the end of the then-current term, this Agreement shall automatically renew for successive periods equal in length to the initial Subscription Term.

**12.3 Termination for Cause.** Either Party may terminate this Agreement upon written notice if the other Party: (a) materially breaches this Agreement and fails to cure such breach within thirty (30) days after receipt of written notice; or (b) becomes insolvent, files for bankruptcy, or ceases to conduct business in the ordinary course.

**12.4 Termination for Convenience.** Client may terminate this Agreement for convenience upon ninety (90) days' prior written notice, subject to payment of all fees due through the end of the then-current billing period.

**12.5 Effect of Termination.** Upon termination or expiration: (a) Client's access to the Service shall cease; (b) Provider shall make Client Data available for export as described in Section 6.5; (c) each Party shall return or destroy the other Party's Confidential Information; and (d) Sections that by their nature should survive termination shall survive, including Articles VI, VII, VIII, IX, X, XI, and this Section 12.5.

---

## ARTICLE XIII -- GENERAL PROVISIONS

**13.1 Governing Law.** This Agreement shall be governed by and construed in accordance with the laws of the State of {{text|1|*|Governing law state|governing_law_state}}, without regard to its conflicts of law principles.

**13.2 Dispute Resolution.** Any dispute arising under this Agreement shall first be escalated to senior management of each Party for resolution. If not resolved within thirty (30) days, disputes shall be submitted to binding arbitration administered by the American Arbitration Association under its Commercial Arbitration Rules, conducted in {{text|1|*|Arbitration city, state|arbitration_location}}.

**13.3 Force Majeure.** Neither Party shall be liable for delays or failures in performance resulting from causes beyond its reasonable control, including acts of God, natural disasters, pandemics, war, terrorism, labor disputes, government actions, or failures of third-party infrastructure or telecommunications.

**13.4 Assignment.** Neither Party may assign this Agreement without the prior written consent of the other Party, except that either Party may assign this Agreement in connection with a merger, acquisition, or sale of all or substantially all of its assets. Any purported assignment in violation of this Section shall be void.

**13.5 Notices.** All notices under this Agreement shall be in writing and shall be deemed given when: (a) delivered personally; (b) sent by confirmed email; or (c) one (1) business day after deposit with a nationally recognized overnight courier. Notices shall be sent to the addresses set forth above or to such other address as a Party may designate by written notice.

**13.6 Entire Agreement.** This Agreement, including all Schedules and Exhibits, constitutes the entire agreement between the Parties with respect to its subject matter and supersedes all prior negotiations, representations, and agreements, whether written or oral.

**13.7 Amendment.** This Agreement may be amended only by a written instrument signed by both Parties.

**13.8 Waiver.** No failure or delay in exercising any right under this Agreement shall constitute a waiver of that right. A waiver of any breach shall not constitute a waiver of any subsequent breach.

**13.9 Severability.** If any provision of this Agreement is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.

**13.10 Independent Contractors.** The Parties are independent contractors. Nothing in this Agreement creates a partnership, joint venture, agency, or employment relationship.

**13.11 Counterparts.** This Agreement may be executed in counterparts, each of which shall be deemed an original, and all of which together shall constitute one and the same agreement. Electronic signatures shall be deemed original signatures for all purposes.

---

## SCHEDULE A -- SELECTED MODULES AND PRICING

### Section 1 -- Pricing Model

Select one:

{{@pricing_standard|1}} **Standard Pricing** -- Per-user, per-module monthly subscription at Provider's published rates.

{{@pricing_introductory|1}} **Introductory Pricing** -- Discounted early-adopter rates locked for the initial Subscription Term.

### Section 2 -- Module Selection

**Option A: Bundle Tier** (select one):

{{@tier_starter|1}} **Starter** -- Up to 3 modules, 10 users, community support.
{{@tier_professional|1}} **Professional** -- Up to 6 modules, 50 users, priority support.
{{@tier_enterprise|1}} **Enterprise** -- All 10 modules, unlimited users, dedicated support + CSM.

**Option B: A La Carte** (select all that apply):

{{@mod_crm|1}} CRM -- Accounts, Contacts, Opportunities
{{@mod_sales|1}} Sales -- Quotes, Orders, Invoices, Commissions
{{@mod_purchasing|1}} Purchasing -- Purchase Orders, Suppliers, Receipts
{{@mod_manufacturing|1}} Manufacturing -- Work Orders, BOMs, Shop Floor, OEE
{{@mod_warehouse|1}} Warehouse -- Inventory, Locations, Transactions, Picking
{{@mod_finance|1}} Finance -- General Ledger, AR, AP, Banking
{{@mod_projects|1}} Projects -- Tasks, Time Tracking, Budgets
{{@mod_plm|1}} PLM -- Parts, BOMs, ECRs, Revisions
{{@mod_quality|1}} Quality -- 8D Reports, CAPA, NCR, Audits
{{@mod_service|1}} Service -- Tickets, RMA, Warranty, Maintenance

### Section 3 -- Per-User / Per-Module Rate

Base rate per user per module per month: ${{text|1|*|Per-user rate|per_user_rate}}

Effective bundle discount (if applicable): {{text|1| |Bundle discount %|bundle_discount_pct}}%

Additional user seats (above included allocation): ${{text|1|*|Additional seat rate|additional_seat_rate}} per user per month.

---

## SCHEDULE B -- IMPLEMENTATION AND SERVICE LEVELS

### Section 1 -- Implementation Window

Select one:

{{@impl_standard|1}} **Standard (90 days)** -- Environment provisioning, data migration, module configuration, UAT, and go-live within 90 calendar days of Effective Date.

{{@impl_extended|1}} **Extended (180 days)** -- Standard scope plus phased rollout across multiple sites or departments.

{{@impl_custom|1}} **Custom** -- Per mutually agreed project plan. Estimated duration: {{text|1| |Custom duration|impl_custom_duration}} days.

### Section 2 -- Uptime Commitment

Select one:

{{@sla_standard|1}} **Standard (99.5%)** -- Monthly uptime of 99.5%, excluding scheduled maintenance windows. Service credit: 5% of monthly fee for each full 0.1% below target.

{{@sla_early_adopter|1}} **Early Adopter (99.0%)** -- Monthly uptime of 99.0%. Service credit: 5% of monthly fee for each full 0.5% below target.

{{@sla_beta|1}} **Beta (Best Effort)** -- No uptime guarantee. Provider shall use reasonable efforts to maintain availability.

### Section 3 -- Support Tier

Select one:

{{@support_standard|1}} **Standard Support** -- Email support, business hours (Mon-Fri 9:00-17:00 ET). Response times per Section 4.4.

{{@support_priority|1}} **Priority Support** -- Email + phone support, extended hours (Mon-Fri 7:00-21:00 ET). P1/P2 response times reduced by 50%.

{{@support_dedicated|1}} **Dedicated Support** -- 24/7 email + phone support with named support engineer. P1 response within 30 minutes.

**Customer Success Manager:**

{{@csm_included|1}} Included -- Quarterly business reviews and proactive optimization.
{{@csm_na|1}} Not included.

### Section 4 -- Go-Live Criteria

Select one:

{{@golive_standard|1}} **Standard** -- All selected modules configured, data migrated, UAT signed off, and minimum 2 training sessions completed.

{{@golive_extended|1}} **Extended** -- Standard criteria plus parallel-run period of {{text|1| |Parallel run days|parallel_run_days}} business days.

{{@golive_custom|1}} **Custom** -- Per mutually agreed acceptance criteria documented in Exhibit 1.

### Section 5 -- Maintenance Windows

Select one:

{{@maint_standard|1}} **Standard** -- Sundays 02:00-06:00 UTC. Provider may perform maintenance at other times with 72 hours' notice.

{{@maint_custom|1}} **Custom** -- Maintenance windows as specified: {{text|1| |Custom maintenance window|custom_maint_window}}

---

## SCHEDULE C -- COMMERCIAL TERMS

### Section 1 -- Subscription Term

Select one:

{{@term_12|1}} **12 Months** -- Annual subscription from the Effective Date.
{{@term_24|1}} **24 Months** -- Two-year subscription with {{text|1| |Multi-year discount %|multi_year_discount_pct}}% discount.
{{@term_36|1}} **36 Months** -- Three-year subscription with {{text|1| |Three-year discount %|three_year_discount_pct}}% discount.
{{@term_custom|1}} **Custom Term** -- {{text|1| |Custom term length|custom_term_length}} months.

### Section 2 -- Implementation Fees

Select one:

{{@pay_full|1}} **Full Payment** -- 100% of implementation fee (${{text|1| |Implementation fee|impl_fee_full}}) due upon execution.

{{@pay_split|1}} **50/50 Split** -- 50% upon execution, 50% upon go-live acceptance.

{{@pay_milestone|1}} **Milestone-Based** -- Per milestone schedule:
  - Environment provisioning: {{text|1| |Milestone 1 %|milestone_1_pct}}%
  - Data migration complete: {{text|1| |Milestone 2 %|milestone_2_pct}}%
  - UAT sign-off: {{text|1| |Milestone 3 %|milestone_3_pct}}%
  - Go-live: {{text|1| |Milestone 4 %|milestone_4_pct}}%

{{@pay_custom|1}} **Custom** -- Per mutually agreed payment schedule in Exhibit 2.

### Section 3 -- Billing Frequency

Select one:

{{@bill_monthly|1}} **Monthly** -- Subscription fees invoiced on the 1st of each month.
{{@bill_quarterly|1}} **Quarterly** -- Subscription fees invoiced on the 1st of each calendar quarter with {{text|1| |Quarterly discount %|quarterly_discount_pct}}% discount.
{{@bill_annual|1}} **Annual** -- Subscription fees invoiced on the anniversary of the Effective Date with {{text|1| |Annual discount %|annual_discount_pct}}% discount.

### Section 4 -- Total Contract Value Summary

| Line Item | Amount |
|-----------|--------|
| Implementation Fee | ${{text|1|*|Total impl fee|total_impl_fee}} |
| Monthly Subscription Fee (estimated) | ${{text|1|*|Monthly sub fee|monthly_sub_fee}} |
| Annual Subscription Fee (estimated) | ${{text|1|*|Annual sub fee|annual_sub_fee}} |
| Total Contract Value (initial term) | ${{text|1|*|Total contract value|total_contract_value}} |

---

## EXECUTION

**IN WITNESS WHEREOF**, the Parties have caused this Agreement to be executed by their duly authorized representatives as of the Effective Date.

### PROVIDER: Mimir Labs LLC

| | |
|---|---|
| Signature: | {{sign|1|*||provider_signature}} |
| Printed Name: | {{text|1|*|Provider signatory name|provider_signatory_name}} |
| Title: | {{text|1|*|Provider signatory title|provider_signatory_title}} |
| Date: | {{date|1|*|MM/dd/yyyy|provider_sign_date}} |
| Initials: | {{init|1|*||provider_initials}} |

### CLIENT: {{text|2|*|Client Legal Entity Name|client_company_name_exec}}

| | |
|---|---|
| Signature: | {{sign|2|*||client_signature}} |
| Printed Name: | {{text|2|*|Client signatory name|client_signatory_name}} |
| Title: | {{text|2|*|Client signatory title|client_signatory_title}} |
| Date: | {{date|2|*|MM/dd/yyyy|client_sign_date}} |
| Initials: | {{init|2|*||client_initials}} |

---

## APPENDIX D -- BOLDSIGN API CONFIGURATION

<!--
  The following JSON defines the TextTagDefinitions required for all
  checkbox and radio button fields in this document. Include this array
  in the BoldSign API request body when sending this document for signature.

  API Endpoint: POST /v1/document/send
  Required property: "useTextTags": true
  Required property: "textTagDefinitions": [ ... ]
-->

```json
{
  "useTextTags": true,
  "textTagDefinitions": [
    {
      "definitionId": "pricing_standard",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "pricing_model",
      "isRequired": true,
      "fieldId": "pricing_standard"
    },
    {
      "definitionId": "pricing_introductory",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "pricing_model",
      "isRequired": true,
      "fieldId": "pricing_introductory"
    },
    {
      "definitionId": "tier_starter",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "bundle_tier",
      "isRequired": false,
      "fieldId": "tier_starter"
    },
    {
      "definitionId": "tier_professional",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "bundle_tier",
      "isRequired": false,
      "fieldId": "tier_professional"
    },
    {
      "definitionId": "tier_enterprise",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "bundle_tier",
      "isRequired": false,
      "fieldId": "tier_enterprise"
    },
    {
      "definitionId": "mod_crm",
      "type": "CheckBox",
      "size": { "width": 15, "height": 15 },
      "isRequired": false,
      "fieldId": "mod_crm"
    },
    {
      "definitionId": "mod_sales",
      "type": "CheckBox",
      "size": { "width": 15, "height": 15 },
      "isRequired": false,
      "fieldId": "mod_sales"
    },
    {
      "definitionId": "mod_purchasing",
      "type": "CheckBox",
      "size": { "width": 15, "height": 15 },
      "isRequired": false,
      "fieldId": "mod_purchasing"
    },
    {
      "definitionId": "mod_manufacturing",
      "type": "CheckBox",
      "size": { "width": 15, "height": 15 },
      "isRequired": false,
      "fieldId": "mod_manufacturing"
    },
    {
      "definitionId": "mod_warehouse",
      "type": "CheckBox",
      "size": { "width": 15, "height": 15 },
      "isRequired": false,
      "fieldId": "mod_warehouse"
    },
    {
      "definitionId": "mod_finance",
      "type": "CheckBox",
      "size": { "width": 15, "height": 15 },
      "isRequired": false,
      "fieldId": "mod_finance"
    },
    {
      "definitionId": "mod_projects",
      "type": "CheckBox",
      "size": { "width": 15, "height": 15 },
      "isRequired": false,
      "fieldId": "mod_projects"
    },
    {
      "definitionId": "mod_plm",
      "type": "CheckBox",
      "size": { "width": 15, "height": 15 },
      "isRequired": false,
      "fieldId": "mod_plm"
    },
    {
      "definitionId": "mod_quality",
      "type": "CheckBox",
      "size": { "width": 15, "height": 15 },
      "isRequired": false,
      "fieldId": "mod_quality"
    },
    {
      "definitionId": "mod_service",
      "type": "CheckBox",
      "size": { "width": 15, "height": 15 },
      "isRequired": false,
      "fieldId": "mod_service"
    },
    {
      "definitionId": "impl_standard",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "impl_window",
      "isRequired": true,
      "fieldId": "impl_standard"
    },
    {
      "definitionId": "impl_extended",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "impl_window",
      "isRequired": true,
      "fieldId": "impl_extended"
    },
    {
      "definitionId": "impl_custom",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "impl_window",
      "isRequired": true,
      "fieldId": "impl_custom"
    },
    {
      "definitionId": "sla_standard",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "sla_tier",
      "isRequired": true,
      "fieldId": "sla_standard"
    },
    {
      "definitionId": "sla_early_adopter",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "sla_tier",
      "isRequired": true,
      "fieldId": "sla_early_adopter"
    },
    {
      "definitionId": "sla_beta",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "sla_tier",
      "isRequired": true,
      "fieldId": "sla_beta"
    },
    {
      "definitionId": "support_standard",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "support_tier",
      "isRequired": true,
      "fieldId": "support_standard"
    },
    {
      "definitionId": "support_priority",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "support_tier",
      "isRequired": true,
      "fieldId": "support_priority"
    },
    {
      "definitionId": "support_dedicated",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "support_tier",
      "isRequired": true,
      "fieldId": "support_dedicated"
    },
    {
      "definitionId": "csm_included",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "csm_option",
      "isRequired": true,
      "fieldId": "csm_included"
    },
    {
      "definitionId": "csm_na",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "csm_option",
      "isRequired": true,
      "fieldId": "csm_na"
    },
    {
      "definitionId": "golive_standard",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "golive_criteria",
      "isRequired": true,
      "fieldId": "golive_standard"
    },
    {
      "definitionId": "golive_extended",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "golive_criteria",
      "isRequired": true,
      "fieldId": "golive_extended"
    },
    {
      "definitionId": "golive_custom",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "golive_criteria",
      "isRequired": true,
      "fieldId": "golive_custom"
    },
    {
      "definitionId": "maint_standard",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "maint_window",
      "isRequired": true,
      "fieldId": "maint_standard"
    },
    {
      "definitionId": "maint_custom",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "maint_window",
      "isRequired": true,
      "fieldId": "maint_custom"
    },
    {
      "definitionId": "term_12",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "sub_term",
      "isRequired": true,
      "fieldId": "term_12"
    },
    {
      "definitionId": "term_24",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "sub_term",
      "isRequired": true,
      "fieldId": "term_24"
    },
    {
      "definitionId": "term_36",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "sub_term",
      "isRequired": true,
      "fieldId": "term_36"
    },
    {
      "definitionId": "term_custom",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "sub_term",
      "isRequired": true,
      "fieldId": "term_custom"
    },
    {
      "definitionId": "pay_full",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "impl_payment",
      "isRequired": true,
      "fieldId": "pay_full"
    },
    {
      "definitionId": "pay_split",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "impl_payment",
      "isRequired": true,
      "fieldId": "pay_split"
    },
    {
      "definitionId": "pay_milestone",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "impl_payment",
      "isRequired": true,
      "fieldId": "pay_milestone"
    },
    {
      "definitionId": "pay_custom",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "impl_payment",
      "isRequired": true,
      "fieldId": "pay_custom"
    },
    {
      "definitionId": "bill_monthly",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "billing_freq",
      "isRequired": true,
      "fieldId": "bill_monthly"
    },
    {
      "definitionId": "bill_quarterly",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "billing_freq",
      "isRequired": true,
      "fieldId": "bill_quarterly"
    },
    {
      "definitionId": "bill_annual",
      "type": "RadioButton",
      "size": { "width": 15, "height": 15 },
      "groupName": "billing_freq",
      "isRequired": true,
      "fieldId": "bill_annual"
    }
  ]
}
```

### Field Reference

| Field ID | Type | Signer | Required | Group | Description |
|----------|------|--------|----------|-------|-------------|
| `agreement_number` | text | 1 | Yes | -- | Agreement tracking number |
| `effective_date` | date | 1 | Yes | -- | Contract effective date |
| `provider_address` | text | 1 | Yes | -- | Provider mailing address |
| `client_company_name` | text | 2 | Yes | -- | Client legal entity name |
| `client_address` | text | 2 | Yes | -- | Client mailing address |
| `max_users` | text | 1 | Yes | -- | Maximum authorized users |
| `training_hours` | text | 1 | Yes | -- | Included training hours |
| `max_fee_increase_pct` | text | 1 | Yes | -- | Maximum annual fee increase % |
| `data_region` | text | 1 | Yes | -- | Data center region(s) |
| `governing_law_state` | text | 1 | Yes | -- | Governing law jurisdiction |
| `arbitration_location` | text | 1 | Yes | -- | Arbitration venue |
| `per_user_rate` | text | 1 | Yes | -- | Per-user per-module monthly rate |
| `additional_seat_rate` | text | 1 | Yes | -- | Additional seat rate |
| `bundle_discount_pct` | text | 1 | No | -- | Bundle discount percentage |
| `pricing_standard` | radio | 1 | Yes | pricing_model | Standard pricing |
| `pricing_introductory` | radio | 1 | Yes | pricing_model | Introductory pricing |
| `tier_starter` | radio | 1 | No | bundle_tier | Starter bundle |
| `tier_professional` | radio | 1 | No | bundle_tier | Professional bundle |
| `tier_enterprise` | radio | 1 | No | bundle_tier | Enterprise bundle |
| `mod_crm` | checkbox | 1 | No | -- | CRM module |
| `mod_sales` | checkbox | 1 | No | -- | Sales module |
| `mod_purchasing` | checkbox | 1 | No | -- | Purchasing module |
| `mod_manufacturing` | checkbox | 1 | No | -- | Manufacturing module |
| `mod_warehouse` | checkbox | 1 | No | -- | Warehouse module |
| `mod_finance` | checkbox | 1 | No | -- | Finance module |
| `mod_projects` | checkbox | 1 | No | -- | Projects module |
| `mod_plm` | checkbox | 1 | No | -- | PLM module |
| `mod_quality` | checkbox | 1 | No | -- | Quality module |
| `mod_service` | checkbox | 1 | No | -- | Service module |
| `impl_standard` | radio | 1 | Yes | impl_window | 90-day implementation |
| `impl_extended` | radio | 1 | Yes | impl_window | 180-day implementation |
| `impl_custom` | radio | 1 | Yes | impl_window | Custom implementation |
| `impl_custom_duration` | text | 1 | No | -- | Custom impl duration (days) |
| `sla_standard` | radio | 1 | Yes | sla_tier | 99.5% uptime |
| `sla_early_adopter` | radio | 1 | Yes | sla_tier | 99.0% uptime |
| `sla_beta` | radio | 1 | Yes | sla_tier | Best-effort uptime |
| `support_standard` | radio | 1 | Yes | support_tier | Standard support |
| `support_priority` | radio | 1 | Yes | support_tier | Priority support |
| `support_dedicated` | radio | 1 | Yes | support_tier | Dedicated support |
| `csm_included` | radio | 1 | Yes | csm_option | CSM included |
| `csm_na` | radio | 1 | Yes | csm_option | CSM not included |
| `golive_standard` | radio | 1 | Yes | golive_criteria | Standard go-live |
| `golive_extended` | radio | 1 | Yes | golive_criteria | Extended go-live |
| `golive_custom` | radio | 1 | Yes | golive_criteria | Custom go-live |
| `parallel_run_days` | text | 1 | No | -- | Parallel run period (days) |
| `maint_standard` | radio | 1 | Yes | maint_window | Standard maintenance |
| `maint_custom` | radio | 1 | Yes | maint_window | Custom maintenance |
| `custom_maint_window` | text | 1 | No | -- | Custom maintenance schedule |
| `term_12` | radio | 1 | Yes | sub_term | 12-month term |
| `term_24` | radio | 1 | Yes | sub_term | 24-month term |
| `term_36` | radio | 1 | Yes | sub_term | 36-month term |
| `term_custom` | radio | 1 | Yes | sub_term | Custom term |
| `custom_term_length` | text | 1 | No | -- | Custom term length (months) |
| `multi_year_discount_pct` | text | 1 | No | -- | 24-month discount % |
| `three_year_discount_pct` | text | 1 | No | -- | 36-month discount % |
| `pay_full` | radio | 1 | Yes | impl_payment | Full upfront payment |
| `pay_split` | radio | 1 | Yes | impl_payment | 50/50 split payment |
| `pay_milestone` | radio | 1 | Yes | impl_payment | Milestone-based payment |
| `pay_custom` | radio | 1 | Yes | impl_payment | Custom payment schedule |
| `impl_fee_full` | text | 1 | No | -- | Total implementation fee |
| `milestone_1_pct` | text | 1 | No | -- | Milestone 1 percentage |
| `milestone_2_pct` | text | 1 | No | -- | Milestone 2 percentage |
| `milestone_3_pct` | text | 1 | No | -- | Milestone 3 percentage |
| `milestone_4_pct` | text | 1 | No | -- | Milestone 4 percentage |
| `bill_monthly` | radio | 1 | Yes | billing_freq | Monthly billing |
| `bill_quarterly` | radio | 1 | Yes | billing_freq | Quarterly billing |
| `bill_annual` | radio | 1 | Yes | billing_freq | Annual billing |
| `quarterly_discount_pct` | text | 1 | No | -- | Quarterly billing discount % |
| `annual_discount_pct` | text | 1 | No | -- | Annual billing discount % |
| `total_impl_fee` | text | 1 | Yes | -- | Total implementation fee |
| `monthly_sub_fee` | text | 1 | Yes | -- | Estimated monthly sub fee |
| `annual_sub_fee` | text | 1 | Yes | -- | Estimated annual sub fee |
| `total_contract_value` | text | 1 | Yes | -- | Total initial term value |
| `provider_signature` | sign | 1 | Yes | -- | Provider signature |
| `provider_signatory_name` | text | 1 | Yes | -- | Provider signatory name |
| `provider_signatory_title` | text | 1 | Yes | -- | Provider signatory title |
| `provider_sign_date` | date | 1 | Yes | -- | Provider signature date |
| `provider_initials` | init | 1 | Yes | -- | Provider initials |
| `client_company_name_exec` | text | 2 | Yes | -- | Client entity (execution) |
| `client_signature` | sign | 2 | Yes | -- | Client signature |
| `client_signatory_name` | text | 2 | Yes | -- | Client signatory name |
| `client_signatory_title` | text | 2 | Yes | -- | Client signatory title |
| `client_sign_date` | date | 2 | Yes | -- | Client signature date |
| `client_initials` | init | 2 | Yes | -- | Client initials |
