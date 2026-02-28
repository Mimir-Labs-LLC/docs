# Yggdrasil ERP — Due Diligence Document Set

**Audience:** Investors, strategic partners, regulatory reviewers, senior engineers conducting technical due diligence.

**Scope:** These documents describe what Yggdrasil is, how it operates, and where it stands. They are not marketing material. They do not make promises about the future. Where the system has gaps, those gaps are named.

---

## Document Index

**DD-01 — System Identity and Boundaries**
What the system is. What it is not. Where it sits relative to the ERP ecosystem and why it was built the way it was. Covers the positioning choice — operating inside the existing ERP market as a coordination substrate rather than as a platform authority or data monopoly.

**DD-02 — Architecture and Trust Model**
The technical architecture: multi-tenant data isolation, the federation layer for cross-tenant B2B coordination, the deployment topology (on-premise tenant sites connected through a central broker via zero-trust tunnels), and the trust assumptions that hold the system together. Explains how tenants interact across organizational boundaries without surrendering custody of their data.

**DD-03 — Data Custody and Auditability**
How data ownership works in a multi-tenant system where cross-tenant workflows exist by design. Covers mutability (business records can be edited and deleted; the audit trail cannot), the audit_change_log mechanism, soft-delete semantics, and what evidence the system can produce under dispute or regulatory scrutiny.

**DD-04 — Failure Modes and Recovery**
What happens when things break. Infrastructure failure (broker down, tunnel lost, database unreachable). Data integrity failure (cross-tenant sync divergence, partial writes). Trust failure (tenant disputes over shared workflow state). How the system degrades, what it preserves, and what it cannot recover without manual intervention.

**DD-05 — Maturity and Risk Assessment**
Honest inventory of the system's current state: what is built and tested, what is scaffolded but incomplete, what is missing entirely. Security posture, compliance readiness (SOC 2 gap analysis), known architectural limitations, and the conditions under which this system could be responsibly deployed to production.

---

## Reading Order

DD-01 is the entry point. A reader who needs only the executive picture can stop there. DD-02 and DD-03 are the architectural core — they explain how the system works and how it handles data. DD-04 is for reviewers concerned with resilience and operational risk. DD-05 is for anyone making a go/no-go judgment about the system's readiness.

Documents do not repeat each other. If DD-02 explains a mechanism, DD-04 refers to it by name rather than re-explaining it.

---

## Conventions

These documents use present tense for things the system does today, and future tense or conditional language for things it does not yet do. Where a capability is partially implemented, the document says so. Where a design exists only as schema or scaffolding without functional code, the document says that too.

Version references in these documents correspond to Yggdrasil v0.4.4a (February 2026). The system is in alpha. No production deployments exist at the time of writing.
