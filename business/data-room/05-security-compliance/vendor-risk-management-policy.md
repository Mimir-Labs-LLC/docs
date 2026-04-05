# Vendor Risk Management Policy

**Mimir Labs — Yggdrasil ERP**

| Field | Value |
|-------|-------|
| Version | 1.0 |
| Effective date | 2026-03-01 |
| Owner | Security Lead, Mimir Labs |
| Review cycle | Annual |
| Classification | Internal |

---

## 1. Purpose

This policy governs how Mimir Labs evaluates, onboards, monitors, and offboards third-party vendors whose services are integrated with or support the Yggdrasil ERP platform. It ensures that vendor risk does not undermine the security and availability commitments Mimir Labs makes to its tenants.

## 2. Scope

Applies to any third-party vendor that:

- Processes, stores, or transmits Yggdrasil ERP tenant data.
- Provides infrastructure or services on which Yggdrasil ERP depends for availability.
- Has access to Mimir Labs systems, source code, or credentials.

## 3. Current Vendor Inventory

| Vendor | Service | Data exposure | Criticality |
|--------|---------|--------------|-------------|
| **Cloudflare** | Zero Trust tunnels, DNS, DDoS protection, TLS termination | Transits encrypted B2B event traffic and web requests | Critical — all external traffic routes through Cloudflare |
| **Hetzner** | VPS hosting (CPX31) for central broker infrastructure | Hosts Redpanda broker and mesh PostgreSQL; physical access to encrypted disk | Critical — central broker availability |
| **Square** | Payment processing integration | Tenant payment data (tokenized by Square; Yggdrasil ERP stores only transaction references) | High — financial transactions |
| **BoldSign** | Electronic signature service | Document metadata and signer information for tenant contracts | Medium — document workflow |
| **Mapbox** | Mapping and geocoding for warehouse/logistics features | Tenant address data sent for geocoding; no PII beyond addresses | Medium — feature functionality |
| **GitHub** | Source code hosting, CI/CD (Actions) | Full source code; CI secrets via GitHub Environments | Critical — development and deployment |
| **Let's Encrypt** (via Cloudflare) | TLS certificate issuance | Domain names only | Low — automated certificate lifecycle |

## 4. Vendor Risk Assessment Process

### 4.1 Pre-Onboarding Assessment

Before integrating a new vendor:

| Step | Action | Owner |
|------|--------|-------|
| 1 | **Business justification** — Document why this vendor is needed and whether alternatives exist. | Requesting engineer |
| 2 | **Security questionnaire** — Request the vendor's SOC 2 report, ISO 27001 certification, or equivalent. If unavailable, issue a security questionnaire covering: data handling, encryption, access control, incident response, and subprocessor use. | Security Lead |
| 3 | **Data flow mapping** — Document what data Yggdrasil ERP sends to the vendor, what the vendor returns, and where data is stored. | Requesting engineer |
| 4 | **Risk rating** — Assign a risk tier (Critical, High, Medium, Low) based on data exposure and service criticality. | Security Lead |
| 5 | **Contractual review** — Ensure terms include: data processing agreement (DPA), breach notification obligations, data return/deletion on termination, and right to audit. | Security Lead + Legal |
| 6 | **Approval** — Critical and High vendors require CTO approval. Medium and Low require Security Lead approval. | CTO or Security Lead |

### 4.2 Risk Tier Definitions

| Tier | Criteria | Review frequency |
|------|----------|-----------------|
| **Critical** | Vendor outage causes full Yggdrasil ERP outage or vendor processes Restricted data | Every 6 months |
| **High** | Vendor outage degrades a major feature or vendor processes Confidential data | Annually |
| **Medium** | Vendor outage affects a non-core feature or vendor processes Internal data only | Annually |
| **Low** | Vendor has no access to tenant data and outage has no user-facing impact | Every 2 years |

## 5. Ongoing Monitoring

### 5.1 Periodic Reviews

At each review cycle (per the tier schedule above), the Security Lead:

1. Requests an updated SOC 2 report or equivalent attestation.
2. Reviews the vendor's public security disclosures and breach history.
3. Verifies that contractual terms (DPA, SLA, breach notification) are still in effect.
4. Confirms that API keys and credentials for the vendor are stored in the secrets vault and have been rotated per the [Encryption Policy](encryption-policy.md).
5. Documents findings in the vendor risk register.

### 5.2 Continuous Monitoring

| Signal | Source | Action |
|--------|--------|--------|
| Vendor status page alerts | Cloudflare, Hetzner, GitHub, Square status pages | Engineering reviews impact on Yggdrasil ERP availability |
| Vendor breach disclosure | Vendor notification or public reporting | Security Lead assesses exposure and invokes [Incident Response Plan](incident-response-plan.md) if warranted |
| Vendor API deprecation | Vendor changelog or email | Engineering schedules migration within the deprecation timeline |
| Vendor acquisition or leadership change | Public reporting | Security Lead reassesses risk rating |

## 6. Vendor-Specific Controls

### 6.1 Cloudflare

- Tunnel tokens are stored in secrets vault; rotated annually.
- Access to the Cloudflare Zero Trust dashboard is restricted to the Security Lead and CTO (SSO + MFA).
- If Cloudflare is unavailable, tenants degrade to standalone mode (`FederationMode=none`); B2B events queue locally.

### 6.2 Hetzner

- VPS access is SSH-key-only; the `yggdrasil` system user has no password.
- The VPS firewall (`ufw`) blocks all inbound ports except SSH; application traffic routes through the Cloudflare tunnel.
- Disk encryption is enabled on the VPS.

### 6.3 Square

- Yggdrasil ERP does not store raw payment card data. Square handles PCI-DSS compliance for card processing.
- Only Square transaction reference IDs and amounts are stored in the Yggdrasil ERP database.
- Square API credentials are stored in the secrets vault and rotated annually.
- The `NEXT_PUBLIC_SQUARE_APP_ID` (public, non-secret) is the only Square value in client-side code.

### 6.4 BoldSign

- Documents sent to BoldSign for signature contain tenant business data (names, contract terms).
- BoldSign API tokens are stored in the secrets vault.
- Mimir Labs reviews BoldSign's data retention policy to ensure signed documents are purged per our [Data Retention Policy](data-retention-disposal-policy.md).

### 6.5 Mapbox

- Address data sent for geocoding does not include names or other PII beyond street addresses.
- Mapbox access tokens are scoped to geocoding and map rendering (no admin capabilities).
- Public map tokens are URL-restricted to authorized domains.

### 6.6 GitHub

- Repository is private with branch protection on `main`.
- All contributors use SSO + MFA.
- CI secrets are stored in GitHub Environments with production environment requiring manual approval for deployments.
- Dependabot or equivalent scanning is enabled for vulnerability alerts.

## 7. Vendor Offboarding

When Mimir Labs discontinues use of a vendor:

| Step | Action | Owner |
|------|--------|-------|
| 1 | Revoke all API keys, tokens, and credentials associated with the vendor | Engineering |
| 2 | Remove vendor integrations from codebase and configuration | Engineering |
| 3 | Request data deletion confirmation from the vendor (per DPA terms) | Security Lead |
| 4 | Update the vendor inventory and risk register | Security Lead |
| 5 | Communicate the change to affected tenants if the feature is user-facing | Communications |

## 8. Subprocessors

If a vendor uses subprocessors that handle Yggdrasil ERP tenant data, Mimir Labs requires:

- Advance notice of new subprocessors (per DPA terms).
- The vendor to impose equivalent security obligations on its subprocessors.
- The right to object to a new subprocessor within 30 days of notification.

## 9. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-01 | Security Lead | Initial release |
