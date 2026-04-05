# Privacy Policy

**Mimir Labs — Yggdrasil ERP**

| Field | Value |
|-------|-------|
| Version | 1.0 |
| Effective date | 2026-03-01 |
| Owner | CTO, Mimir Labs |
| Review cycle | Annual |
| Classification | Public (when published) |

---

## 1. Introduction

Mimir Labs ("we", "us") develops and operates the Yggdrasil ERP platform. This Privacy Policy explains how we collect, use, store, and protect personal information processed through Yggdrasil ERP on behalf of our customers ("tenants") and their end users.

Yggdrasil ERP is a multi-tenant ERP system. In most cases, Mimir Labs acts as a **data processor** on behalf of the tenant (the **data controller**), who determines the purposes and means of processing their users' personal data. This policy covers Mimir Labs' obligations as processor and, where applicable, as controller of its own operational data.

## 2. Personal Data We Process

### 2.1 Tenant User Data (Processor Role)

Tenants enter the following personal data into Yggdrasil ERP as part of their business operations:

| Category | Examples | Yggdrasil ERP tables |
|----------|---------|-----------------|
| **Identity data** | Names, job titles, employee IDs | `contacts`, `employees`, `users` |
| **Contact data** | Email addresses, phone numbers, mailing addresses | `contacts`, `accounts`, `employees` |
| **Financial data** | Invoice amounts, payment terms, bank references | `ar_invoices`, `ap_invoices`, `bank_transactions` |
| **Employment data** | Department, org unit, role assignments | `employees`, `org_units`, `user_roles` |
| **Service data** | Support ticket descriptions, RMA details | `tickets`, `rma_requests` |
| **Authentication data** | Email, hashed password, session tokens | `users` |

Mimir Labs processes this data solely to provide the Yggdrasil ERP service to the tenant. We do not use tenant data for marketing, profiling, or any purpose outside the scope of our agreement with the tenant.

### 2.2 Operational Data (Controller Role)

Mimir Labs collects limited data for its own operations:

| Category | Examples | Purpose |
|----------|---------|---------|
| Tenant admin contact info | Name, email of the tenant administrator | Account management, support, security notifications |
| License usage data | Active seat counts, call-home telemetry (per EULA section 3) | License compliance verification |
| Application logs | IP addresses, request metadata, error traces | Troubleshooting, security monitoring |
| Audit log entries | User IDs, actions, timestamps | Security and compliance |

## 3. Legal Basis for Processing

### 3.1 Under GDPR (EU/EEA Data Subjects)

| Processing activity | Legal basis |
|--------------------|-------------|
| Providing the Yggdrasil ERP service to tenants | Performance of contract (Article 6(1)(b)) + Data Processing Agreement |
| License compliance telemetry | Legitimate interest (Article 6(1)(f)) — ensuring license terms are met |
| Security logging and incident response | Legitimate interest (Article 6(1)(f)) — protecting systems and data |
| Responding to data subject requests | Legal obligation (Article 6(1)(c)) |

### 3.2 Under CCPA (California Residents)

Mimir Labs does not sell personal information. We do not use personal information for cross-context behavioral advertising. We process personal information as a "service provider" under CCPA on behalf of our tenant customers.

## 4. Data Sharing

We share personal data only in the following circumstances:

| Recipient | What is shared | Why |
|-----------|---------------|-----|
| The tenant (data controller) | Their own users' data, audit logs, reports | The tenant owns their data and can export it at any time |
| Cloudflare | Encrypted traffic transiting tunnels (Cloudflare does not decrypt) | Infrastructure operation |
| Square | Tokenized payment references (no raw card data) | Payment processing on behalf of the tenant |
| BoldSign | Signer names, email addresses, document content | Electronic signature workflow on behalf of the tenant |
| Mapbox | Street addresses for geocoding | Warehouse/logistics features on behalf of the tenant |
| Law enforcement | As required by valid legal process | Legal obligation |

We do not share tenant data with other tenants. Multi-tenant isolation (via `tenant_id` on every database row) prevents cross-tenant data access.

## 5. International Data Transfers

Yggdrasil ERP tenants typically run on-premises or on infrastructure they control. For the central VPS (hosted by Hetzner in the EU), data resides in the EU.

Where personal data is transferred outside the EEA (e.g., a tenant deploys Yggdrasil ERP in the US, or a subprocessor like Square processes data in the US), Mimir Labs relies on:

- Standard Contractual Clauses (SCCs) in our Data Processing Agreements.
- Vendor certifications (e.g., Square's PCI-DSS compliance, Cloudflare's privacy certifications).

## 6. Data Retention

Personal data is retained per the [Data Retention & Disposal Policy](data-retention-disposal-policy.md). In summary:

- Tenant business data is retained for the life of the subscription plus a grace period, then permanently deleted.
- Financial and quality records may be retained longer to meet legal obligations (up to 10 years).
- Application logs are retained for 12 months.
- Audit logs are retained for 7 years.

## 7. Data Subject Rights

### 7.1 GDPR Rights

Data subjects whose personal data is processed by Yggdrasil ERP have the following rights. Because Mimir Labs acts as processor, requests are typically routed through the tenant (data controller):

| Right | How to exercise |
|-------|----------------|
| **Access** (Art. 15) | Request from your employer/organization (the tenant). Mimir Labs assists the tenant in fulfilling the request. |
| **Rectification** (Art. 16) | Contact your tenant admin to correct inaccurate data in Yggdrasil ERP. |
| **Erasure** (Art. 17) | Request from the tenant. Mimir Labs will anonymize or delete personal data per section 7.3. |
| **Restriction** (Art. 18) | Request from the tenant. Mimir Labs can restrict processing (deactivate user, limit access). |
| **Portability** (Art. 20) | The tenant can export data via Yggdrasil ERP's data export functionality (SQL dump or structured CSV). |
| **Object** (Art. 21) | For Mimir Labs' own processing (e.g., license telemetry), contact privacy@mimirlabs.net. |

### 7.2 CCPA Rights

California residents may:

- **Know** what personal information is collected and how it is used.
- **Delete** personal information (subject to exceptions for legal obligations).
- **Opt-out of sale** — Mimir Labs does not sell personal information.
- **Non-discrimination** — Exercising rights will not result in different service levels.

Requests: Contact the tenant (as the business that collected your data) or email privacy@mimirlabs.net.

### 7.3 Erasure Procedure

When a valid erasure request is received:

1. The tenant admin (or Mimir Labs, if directed by the tenant) identifies the data subject's records.
2. Personal identifiers (name, email, phone) in `contacts`, `users`, `employees`, and related tables are replaced with anonymized tokens (e.g., `[REDACTED-a1b2c3]`).
3. Records required for legal compliance (invoices, financial journals) are retained in anonymized form.
4. The erasure action is recorded in the audit log.
5. Confirmation is provided to the requester within 30 days.

## 8. Security

Personal data is protected by the technical and organizational measures described in the [Information Security Policy](information-security-policy.md), including:

- Encryption in transit (TLS 1.2+) and at rest (AES-256 for sensitive fields and backups).
- Role-based access control with least-privilege assignments.
- Multi-tenant isolation at the database layer.
- Audit logging of all data access and modifications.
- Regular security assessments and penetration testing.

## 9. Cookies and Tracking

The Yggdrasil ERP web application uses:

| Cookie / Storage | Purpose | Type |
|-----------------|---------|------|
| JWT token | Authentication session | Functional (essential) |
| Tenant ID | Multi-tenant session context | Functional (essential) |
| UI preferences | Theme, layout settings | Functional (essential) |

Yggdrasil ERP does not use advertising cookies, analytics trackers, or third-party tracking pixels.

## 10. Children's Data

Yggdrasil ERP is a B2B enterprise application. It is not directed at children under 16. Mimir Labs does not knowingly collect personal data from children.

## 11. Changes to This Policy

We may update this policy to reflect changes in our practices or legal requirements. Material changes will be communicated to tenant administrators at least 30 days before they take effect.

## 12. Contact

For privacy questions or to exercise data subject rights related to Mimir Labs' own processing:

- Email: privacy@mimirlabs.net
- Mail: Mimir Labs, Attn: Privacy, [address on file]

For data processed on behalf of a tenant, contact the tenant organization directly.

## 13. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-01 | CTO | Initial release |
