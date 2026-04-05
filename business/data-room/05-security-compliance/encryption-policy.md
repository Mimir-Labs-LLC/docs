# Encryption Policy

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

This policy defines encryption requirements for data in transit, data at rest, and cryptographic key management across the Yggdrasil ERP platform. It ensures that Confidential and Restricted data (as defined in the [Data Classification Policy](data-classification-policy.md)) is protected against unauthorized disclosure.

## 2. Scope

Applies to all Yggdrasil ERP components and environments:

- C++ backend server (HTTP and WebSocket listeners)
- Qt desktop client
- Next.js web application
- PostgreSQL databases
- Redpanda event broker and Kafka protocol traffic
- Cloudflare tunnel endpoints
- Go sidecar services
- Backup archives
- Developer workstations that process production data

## 3. Encryption in Transit

### 3.1 External Traffic

All traffic entering or leaving a Yggdrasil ERP deployment must be encrypted with TLS 1.2 or higher.

| Path | Encryption | Implementation |
|------|-----------|----------------|
| Browser / Desktop Client to Server | TLS 1.2+ | Cloudflare tunnel terminates TLS; server `EnableSSL=true` for direct connections |
| WebSocket connections | WSS (TLS) | Same tunnel or server-side SSL |
| Sidecar to Redpanda broker | TLS via Cloudflare tunnel | `cloudflared` tunnel encrypts the Kafka protocol link |
| Inter-tenant B2B events | TLS via Cloudflare tunnel | End-to-end through the central VPS tunnel |
| GitHub operations | TLS (HTTPS / SSH) | GitHub enforces TLS |

### 3.2 Internal Traffic

Traffic between containers on the same Docker bridge network (e.g., server to PostgreSQL, server to Redis) is not required to use TLS, provided:

- The host firewall blocks all external access to those ports.
- The containers run on a network with no published ports beyond what the Compose stack explicitly exposes.

### 3.3 Prohibited Protocols

- TLS 1.0 and 1.1 are prohibited.
- SSL 3.0 is prohibited.
- Unencrypted HTTP on production-facing endpoints is prohibited.

## 4. Encryption at Rest

### 4.1 Database

| Data type | Encryption method |
|-----------|------------------|
| Password hashes | Argon2id with per-user salt (application layer) |
| PII fields (when identified) | AES-256-GCM via `pgcrypto` or application-layer encryption |
| Full database volume | Filesystem-level encryption (LUKS or provider-managed) on production hosts |

### 4.2 Backups

- Backup archives produced by `backup-db.sh` must be encrypted with AES-256 before being written to disk.
- The encryption key is stored in the secrets vault, separate from the backup storage location.
- A SHA-256 checksum is generated alongside each backup for integrity verification.

### 4.3 Secrets

All Restricted-class secrets (JWT signing key, database credentials, tunnel tokens, third-party API keys) must be stored in an approved secrets vault. Plaintext secrets in configuration files are acceptable only in development environments and must carry a `change_me_in_production` marker.

### 4.4 Developer Workstations

Developer machines that access production data or secrets must use full-disk encryption (FileVault, BitLocker, or LUKS).

## 5. Cryptographic Standards

| Use case | Algorithm | Minimum strength |
|----------|-----------|-----------------|
| TLS certificates | RSA 2048-bit or ECDSA P-256 | TLS 1.2+ |
| JWT signing | HMAC-SHA256 (HS256) | 256-bit key |
| Password hashing | Argon2id | Memory cost >= 64 MB, iterations >= 3, parallelism >= 1 |
| Symmetric encryption (data at rest) | AES-256-GCM | 256-bit key |
| Backup encryption | AES-256 (via `gpg --symmetric` or equivalent) | 256-bit |
| Checksums / integrity | SHA-256 | 256-bit |

### 5.1 Prohibited Algorithms

- MD5 and SHA-1 for any security purpose.
- DES, 3DES, RC4.
- RSA keys shorter than 2048 bits.
- Raw SHA-256 for password hashing (must use Argon2id or bcrypt).

## 6. Key Management

### 6.1 Key Storage

- Production keys and secrets are stored in the designated secrets vault.
- Keys must never be committed to source control, pasted into chat, or transmitted via email.
- Each environment (development, staging, production) uses distinct keys.

### 6.2 Key Rotation

| Key type | Rotation frequency | Procedure |
|----------|-------------------|-----------|
| JWT signing key | Quarterly | Issue new key; old key remains valid for a 24-hour grace window to allow token expiry. |
| Database credentials | Annually or on personnel change | Update secrets vault; rolling restart of server instances. |
| TLS certificates | Before expiry (typically 90 days for Let's Encrypt) | Automated renewal via Cloudflare or certbot. |
| Cloudflare tunnel tokens | Annually or on compromise | Regenerate in Zero Trust dashboard; update `.env`. |
| Third-party API keys | Annually | Rotate in vendor dashboard; update secrets vault. |
| Backup encryption key | Annually | Re-encrypt active backup set with new key; retain old key until those backups expire. |

### 6.3 Key Compromise

If a key is suspected or confirmed compromised:

1. Rotate the key immediately.
2. Assess the blast radius (what data or sessions could have been exposed).
3. Follow the [Incident Response Plan](incident-response-plan.md).
4. Notify affected tenants if Confidential data may have been exposed.

## 7. Certificate Management

- Production TLS certificates are managed through Cloudflare (automatic issuance and renewal).
- For direct SSL connections (`EnableSSL=true`), certificates are stored at paths defined in `server.conf` (`CertificatePath`, `KeyPath`).
- Self-signed certificates are permitted in development only.
- Certificate expiry is monitored; alerts fire 14 days before expiration.

## 8. Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-03-01 | Security Lead | Initial release |
