---
title: "Norn — Contract Intelligence for the Rest of Us"
author: "Christopher Gaither"
date: "March 2026"
version: "1.0"
docnumber: "ML-WP-013"
classification: "Public"
logo: "mimir_labs_logo.png"
---

## The Problem Nobody Talks About

Every business runs on contracts. Service agreements, purchase orders, NDAs, statements of work, compliance documents — the legal infrastructure that makes commerce possible.

And yet, the tools for managing these documents haven't evolved in twenty years.

You either start from scratch in a word processor, or you pay for a platform that forces you into its template language, its workflow, its pricing model. There is no middle ground between "paste into Word and hope for the best" and "$50,000/year for a contract lifecycle management suite."

The result is predictable. Companies maintain dozens of slightly-different versions of the same agreement. Nobody knows which version is current. Fields that should be standardized are typed differently every time. Signed copies live in email inboxes, shared drives, and filing cabinets — with no structural relationship to the data systems they govern.

This is the document governance gap. And it's expensive.

---

## What Norn Does

Norn starts with the document you already have.

Upload a PDF — a contract from your attorney, a scanned agreement from a customer, a compliance template from your industry association. Norn reads the document, identifies the fields that need to be filled in, and converts it into a reusable template.

No proprietary format. No template builder. No "start from our library." Your document, your structure, your formatting — with intelligent field detection layered on top.

### Ingest

Drop in a PDF. Norn's OCR engine reads every page and identifies candidate fields: blank lines, date fields, signature blocks, checkboxes, label-value pairs. Each detection is a suggestion — you accept, reject, or adjust.

### Promote

See something the detector missed? Select any region of the document and promote it to a field. Norn searches the rest of the document for similar patterns and suggests additional fields automatically. Promote one date field, get all the other date fields suggested for free.

### Fill

Load a template, fill in the fields, export a completed PDF. The fill dialog presents every field in a clean form — text inputs, date pickers, checkboxes, dropdowns. Required fields are validated before export.

### Archive

Every document — signed, unsigned, or template — is archived with cryptographic integrity verification, access logging, and retention enforcement. Signed contracts are immutable. Seven-year retention is the default. Every access is auditable.

---

## Why Norn Is Different

### You Start With Your Document

Every other contract tool starts with their templates. Norn starts with yours. A scanned document from 1998 works just as well as a PDF generated yesterday. If it's a PDF, Norn can read it.

### Field Promotion, Not Field Creation

Existing tools make you draw form fields on a blank canvas or learn a template markup language. Norn lets you point at the document and say "this is a field." The system handles the rest — finding similar patterns, suggesting types, extracting labels from the surrounding text.

### Bespoke Formatting Is a Feature, Not a Bug

We don't standardize your document layout. We don't force your contracts into a generic template. Your attorney chose that formatting for a reason. Norn preserves it. The fields are the articulation points; everything else stays exactly as it is.

### Free Tier That Actually Works

5 contracts per month, 3 templates, local OCR, PDF export. No credit card. No trial expiration. No "contact sales." If your contract volume is low, the free tier is permanent.

---

## Who Norn Is For

**Small businesses** that generate contracts manually and need a faster path from template to signature without buying an enterprise CLM suite.

**Law firms** that produce bespoke agreements for clients and need to maintain structural consistency across engagements without sacrificing document individuality.

**Procurement teams** that receive contracts from vendors in every conceivable format and need to extract, standardize, and archive them with governance controls.

**Consultants and freelancers** who reuse the same SOW or MSA structure with different clients and want a fill-and-send workflow that takes minutes, not hours.

**Manufacturers** preparing for ERP migration who need their commercial agreements structured and machine-readable for data ingestion — Norn exports directly to the Mimir Labs platform via Ratatosk manifests.

---

## The Mimir Labs Connection

Norn is a standalone product. It works without Yggdrasil, without Ratatosk, without any other Mimir Labs tool.

But for organizations already on the Mimir Labs platform, Norn closes the loop.

**Ratatosk** discovers what your data means. **Ragnarok** migrates it into aligned structures. **Bifrost** keeps systems synchronized. **Jormungandr** enforces governance. **Norn** governs the documents that define the business relationships your data serves.

When a contract is signed in Norn, the contact data, commercial terms, and agreement metadata can be exported as a Ratatosk manifest — structured, classified, and ready for governance review or direct ingestion into Yggdrasil ERP. The contract doesn't just live in an archive. It flows into the operational system.

This is the difference between "we have a signed MSA somewhere in email" and "the customer record was provisioned automatically when the agreement was executed."

---

## Pricing

| Tier | Price | Contracts/Month | Key Features |
|------|-------|----------------|--------------|
| **Free** | $0 | 5 | Local OCR, 3 templates, PDF export |
| **Pro** | $79/mo | 50 | Google Doc AI (user key), unlimited templates, 3 team seats |
| **Business** | $299/mo | 250 | API access, custom branding, priority support |
| **Enterprise** | $999/mo or custom | Unlimited | SSO, SLAs, white-glove onboarding, Ratatosk integration |

No per-document fees. No per-signature charges. No surprise invoices when your volume increases within your tier.

---

## Privacy and Compliance

**Your documents never leave your machine** on the Free tier. Tesseract OCR runs entirely locally. No data is transmitted to Mimir Labs or any third party.

**Pro and above** use Google Document AI for premium OCR. Page images are sent to Google's API using your API key, subject to Google's data processing terms. Mimir Labs does not see, store, or process your documents.

**Signed documents are immutable.** Once archived, a signed contract cannot be modified. The file hash is verified on every retrieval.

**Every access is logged.** View, download, export, and delete requests are recorded with timestamps. The access log is append-only and available for compliance audit.

**Retention is enforced.** Signed contracts cannot be deleted until the retention period expires (default: 7 years). Deletion requests against active retention periods are denied and logged.

---

## What's Coming

Norn is in pre-alpha development. The v0.1 release focuses on the core workflow: ingest, detect, promote, fill, export, archive.

Planned for subsequent releases:

- DOCX input format support
- Direct BoldSign / DocuSign integration for e-signature workflows
- Template marketplace (share and discover templates)
- Multi-user collaboration with role-based access
- VPS-backed archive for team environments
- Direct Yggdrasil ERP API ingestion (Enterprise tier)
- Mobile companion app for on-the-go contract review and signature

---

## Get Started

Norn is a desktop application for Windows, macOS, and Linux. Download at [mimirlabs.net/norn](https://mimirlabs.net/norn).

The Free tier is permanent. No credit card required. No trial expiration.

Your documents. Your formatting. Your terms. Articulated.

---

*Copyright 2024-2026 Mimir Labs LLC. All rights reserved.*
