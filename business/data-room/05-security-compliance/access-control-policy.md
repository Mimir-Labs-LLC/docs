# Access Control Policy

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

This policy governs how access to Yggdrasil ERP systems, data, and infrastructure is granted, modified, reviewed, and revoked. It ensures that users operate under the principle of least privilege and that access decisions are auditable.

## 2. Scope

Covers all access to:

- Yggdrasil ERP application accounts (users across all tenants)
- Infrastructure systems (VPS, PostgreSQL, Redpanda, Cloudflare dashboard)
- Source code repositories (GitHub)
- Third-party services integrated with Yggdrasil ERP (Square, BoldSign, Mapbox)
- CI/CD pipelines and deployment credentials

## 3. Role-Based Access Control (RBAC)

Yggdrasil ERP uses a database-driven RBAC model:

- **Roles** are scoped to a tenant (`tenant_roles` table) and carry a set of permissions via the `role_permissions` junction table.
- **Permissions** follow the pattern `module.action` (e.g., `crm.read`, `finance.write`, `hr.payroll.run`). The system defines 33 base permissions.
- **User assignments** are recorded in `user_roles` with `assigned_by` and `assigned_at` audit fields.

### 3.1 Default Roles

The following roles are seeded per tenant. Custom roles may be created by Tenant Administrators.

| Role | Intended use |
|------|-------------|
| admin | Full access within the tenant |
| manager | Cross-module read + write for their department |
| sales_rep | CRM + Sales modules |
| warehouse_worker | Warehouse + Inventory modules |
| accountant | Finance modules |
| engineer | PLM + Manufacturing modules |
| quality_inspector | Quality module |
| service_agent | Service + Tickets module |
| viewer | Read-only across all modules |

### 3.2 Superadmin Access

Mimir Labs DevAdmin access (used for infrastructure operations and customer deployment) is limited to Mimir Labs engineering personnel and is never granted to tenant users. DevAdmin credentials are stored in the secrets vault, not in application configuration.

## 4. User Provisioning

### 4.1 New User Accounts

1. A Tenant Administrator or Mimir Labs Support creates the user in the `users` table with an email, initial password hash, and `is_active = true`.
2. The administrator assigns one or more roles via `user_roles`.
3. The user receives onboarding instructions and is required to change their password on first login.
4. The provisioning event is recorded in the audit log.

### 4.2 Role Changes

1. Role additions or removals are performed by a Tenant Administrator.
2. Every change records `assigned_by` and `assigned_at` in `user_roles`.
3. Users who change departments or job functions must have their roles reviewed and adjusted within 5 business days.

### 4.3 Multi-Tenant Membership

A single email address may be associated with accounts in multiple tenants. At login, the user selects the target tenant. The JWT issued contains the selected `tenantId`, restricting the session to that tenant's data.

## 5. User Deprovisioning

### 5.1 Employee Termination

Upon termination of a Mimir Labs employee:

1. All Yggdrasil ERP application accounts are deactivated (`is_active = false`) within 24 hours.
2. GitHub repository access is revoked the same business day.
3. VPS and infrastructure SSH keys are removed.
4. Third-party service credentials the employee had access to are rotated.
5. The Security Lead confirms completion.

### 5.2 Tenant User Offboarding

When a customer deactivates a user:

1. The Tenant Administrator sets `is_active = false` on the user record.
2. Active sessions for the user are invalidated.
3. The user's data (created records, audit entries) is retained per the [Data Retention & Disposal Policy](data-retention-disposal-policy.md).

## 6. Access Reviews

### 6.1 Quarterly Reviews

The Security Lead conducts a quarterly access review covering:

- All Mimir Labs employees' access to infrastructure, GitHub, and third-party dashboards.
- Users with `admin` role across all tenants.
- Service accounts and API keys.

Findings are documented and any excessive access is remediated within 10 business days.

### 6.2 Annual Reviews

Annually, Tenant Administrators are asked to certify that all users in their tenant have appropriate roles. Mimir Labs provides a role-assignment report to support this review.

## 7. Authentication Requirements

| Control | Requirement |
|---------|------------|
| Passwords | Minimum 12 characters; uppercase, lowercase, digit, and special character required |
| Password expiry | 90 days (configurable per tenant) |
| Failed login lockout | 5 failed attempts in 15 minutes triggers a 30-minute lockout |
| Session timeout | 60 minutes of inactivity (configurable via `SessionTimeout` in `server.conf`) |
| JWT expiry | 1 hour; refresh tokens valid for 30 days |
| MFA | Required for admin and finance roles; TOTP-based |

## 8. Infrastructure Access

| System | Access method | Who |
|--------|--------------|-----|
| Production VPS | SSH key only (no password auth) | Security Lead + designated SREs |
| PostgreSQL | Local socket or Docker exec only; no remote TCP | VPS operators via SSH |
| Redpanda Console | Cloudflare Zero Trust tunnel with SSO | Security Lead + designated SREs |
| GitHub repository | SSO + MFA required | Engineering team |
| Cloudflare dashboard | SSO + MFA required | Security Lead + CTO |

## 9. Service Accounts and API Keys

- Service accounts (e.g., CI/CD bot, backup script) are documented in the asset inventory.
- API keys for third-party services are stored in the secrets vault with documented owners.
- Service account credentials are rotated at least annually.
- Unused service accounts are disabled during quarterly access reviews.

## 10. Logging

All access control events are logged to the audit trail:

- User creation and deactivation
- Role assignments and removals
- Login successes and failures
- Password changes and resets
- Session creation and expiry

## 11. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-01 | Security Lead | Initial release |
