/**
 * Render a contract document from template + form fields.
 * Returns complete HTML ready for PDF generation or preview.
 */

const TEMPLATES = {
  dpa: { title: "Data Processing Agreement", render: renderDPA },
  msa: { title: "Master Services Agreement", render: renderMSA },
  sow: { title: "Statement of Work", render: renderSOW },
};

export function renderDocument(documentType, fields) {
  const template = TEMPLATES[documentType];
  if (!template) throw new Error(`Unknown document type: ${documentType}`);
  return wrapHtml(template.title, template.render(fields), fields);
}

// ── Helpers ──────────────────────────────────────────────────

function esc(val) {
  if (!val) return "";
  return String(val).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function field(val, placeholder) {
  const v = val?.trim();
  if (v) return `<strong>${esc(v)}</strong>`;
  return `<span class="blank">${esc(placeholder || "_______________")}</span>`;
}

function check(val) {
  return val ? "&#9745;" : "&#9744;";
}

function today() {
  return new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function wrapHtml(title, body, fields) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${esc(title)} — Mimir Labs</title>
<style>
  @page { size: letter; margin: 0.75in; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
    font-size: 10.5pt;
    line-height: 1.55;
    color: #1a1a1a;
    max-width: 7in;
    margin: 0 auto;
  }
  h1 { font-size: 16pt; text-align: center; margin-bottom: 4pt; color: #1B3A4B; }
  h2 { font-size: 12pt; margin-top: 18pt; margin-bottom: 8pt; color: #1B3A4B; border-bottom: 1px solid #ddd; padding-bottom: 3pt; }
  h3 { font-size: 10.5pt; margin-top: 12pt; margin-bottom: 4pt; color: #333; }
  p { margin-bottom: 6pt; }
  .meta { text-align: center; color: #666; font-size: 9.5pt; margin-bottom: 16pt; }
  .meta strong { color: #333; }
  .parties { margin: 16pt 0; }
  .parties .party { margin-bottom: 12pt; }
  .party-name { font-weight: bold; font-size: 11pt; }
  table { width: 100%; border-collapse: collapse; margin: 8pt 0; font-size: 10pt; }
  th, td { border: 1px solid #ccc; padding: 5pt 8pt; text-align: left; vertical-align: top; }
  th { background: #f5f7f9; font-weight: 600; font-size: 9.5pt; }
  .blank { color: #999; border-bottom: 1px dotted #999; }
  .sig-block { margin-top: 24pt; page-break-inside: avoid; }
  .sig-line { border-bottom: 1px solid #333; width: 250pt; display: inline-block; margin-top: 24pt; }
  .sig-label { font-size: 9pt; color: #666; }
  .article { margin-bottom: 4pt; }
  .article-num { font-weight: bold; }
  .indent { margin-left: 16pt; }
  .legal { font-size: 9.5pt; }
  .footer { margin-top: 24pt; text-align: center; font-size: 8pt; color: #999; border-top: 1px solid #ddd; padding-top: 8pt; }
  .caps { text-transform: uppercase; font-weight: bold; }
  ul { margin-left: 18pt; margin-bottom: 6pt; }
  li { margin-bottom: 3pt; }
  .check { font-size: 12pt; }
</style>
</head>
<body>
${body}
<div class="footer">
  &copy; 2024-${new Date().getFullYear()} Mimir Labs LLC. All rights reserved. | Harrisburg, PA
</div>
</body>
</html>`;
}

// ── DPA ──────────────────────────────────────────────────────

function renderDPA(f) {
  return `
<h1>DATA PROCESSING AGREEMENT</h1>
<div class="meta">
  <strong>Agreement No.:</strong> DPA-${field(f.agreementNumber, "____-____")} &nbsp;&nbsp;
  <strong>Effective Date:</strong> ${field(f.effectiveDate, today())}
</div>

<div class="parties">
  <div class="party">
    <div class="party-name">Mimir Labs LLC</div>
    <div>("Processor") &mdash; Harrisburg, Pennsylvania</div>
  </div>
  <div class="party">
    <div class="party-name">${field(f.clientName, "Client Legal Entity Name")}</div>
    <div>("Controller") &mdash; ${field(f.clientAddress, "Client Address")}</div>
  </div>
</div>

<h2>ARTICLE 1 &mdash; SCOPE AND PURPOSE</h2>
<p>Processor shall process Client Data solely for the purpose of performing the Services identified below, in accordance with Controller's documented instructions and applicable data protection law (GDPR, CCPA, and successor legislation).</p>

<h2>ARTICLE 2 &mdash; SERVICES ENGAGED</h2>
<table>
  <tr><th>Service</th><th>Engaged</th><th>Data Categories</th></tr>
  <tr><td>Ratatosk &mdash; Governance Workshop</td><td class="check">${check(f.svcRatatosk)}</td><td>Schema metadata, aggregate statistics (zero-knowledge)</td></tr>
  <tr><td>Ragnarok &mdash; Data Migration</td><td class="check">${check(f.svcRagnarok)}</td><td>Schema metadata, row-level business data (during migration)</td></tr>
  <tr><td>Bifrost &mdash; Live Data Bridge</td><td class="check">${check(f.svcBifrost)}</td><td>Field-level change events, synchronization metadata</td></tr>
  <tr><td>Jormungandr &mdash; Canon Governance</td><td class="check">${check(f.svcJormungandr)}</td><td>Schema metadata, canonical definitions</td></tr>
  <tr><td>Yggdrasil ERP</td><td class="check">${check(f.svcYggdrasil)}</td><td>Business data per activated modules</td></tr>
</table>

<h2>ARTICLE 3 &mdash; SERVICE-SPECIFIC DATA HANDLING</h2>

<h3>3.1 Ratatosk</h3>
<p>Zero-knowledge architecture. Read-only ODBC access using aggregate SQL functions only (COUNT, AVG, MAX of lengths). No row-level data values are read, stored, or transmitted. Deliverables contain structural metadata and aggregate statistics only.</p>

<h3>3.2 Ragnarok</h3>
<p>Air-gapped desktop operation. Data flows through the migration pipeline between Controller's source and target systems. All data in transit encrypted via TLS 1.2+. Processor does not persistently store migrated data.</p>

<h3>3.3 Bifrost</h3>
<p>Events processed in memory and written to Controller's systems. Connection credentials encrypted at rest (AES-256) on Controller's infrastructure. Processor has no remote access to stored credentials or dead letter queue after initial configuration.</p>

<h3>3.4 Jormungandr</h3>
<p>Schema-only processing. Compares structural metadata against canonical registries. No operational data or personal data accessed.</p>

<h3>3.5 Yggdrasil ERP</h3>
<p>Multi-tenant hosting with isolated PostgreSQL database per tenant. Row-level security enforcement. Daily encrypted backups retained 30 days. Data export in machine-readable format within 30 days of termination request; secure deletion within 60 days.</p>

<h2>ARTICLE 4 &mdash; SECURITY MEASURES</h2>
<ul>
  <li>Encryption in transit (TLS 1.2+) and at rest (AES-256 for hosted services)</li>
  <li>Role-based access controls with multi-factor authentication</li>
  <li>Audit logging of all data access operations</li>
  <li>Security Incident notification within 72 hours</li>
  <li>Annual security assessments and vulnerability testing</li>
</ul>

<h2>ARTICLE 5 &mdash; DATA RETENTION</h2>
<p>Manifests and governance artifacts: 30 days post-delivery. Migration plans: 30 days post-engagement. Yggdrasil ERP: data export within 30 days of request, deletion within 60 days of termination. Processor may retain anonymized, aggregated data for product improvement.</p>

<h2>ARTICLE 6 &mdash; SUB-PROCESSORS</h2>
<p>Processor shall not engage sub-processors without Controller's prior written consent. 30 days advance notice of proposed changes. Sub-processor obligations no less protective than this Agreement.</p>

<h2>ARTICLE 7 &mdash; AUDIT RIGHTS</h2>
<p>Controller may audit Processor's compliance upon 30 days' written notice, no more than once per calendar year. SOC 2 reports may satisfy audit rights.</p>

<h2>ARTICLE 8 &mdash; GOVERNING LAW</h2>
<p>Commonwealth of Pennsylvania. For EEA/UK/Swiss data transfers, Standard Contractual Clauses (Module Two) apply.</p>

<h2>PERSONAL DATA CATEGORIES</h2>
<table>
  <tr><th>Category</th><th>Applicable</th></tr>
  <tr><td>Employee names and contact information</td><td class="check">${check(f.dataEmployees)}</td></tr>
  <tr><td>Customer names and contact information</td><td class="check">${check(f.dataCustomers)}</td></tr>
  <tr><td>Supplier names and contact information</td><td class="check">${check(f.dataSuppliers)}</td></tr>
  <tr><td>Financial records (invoices, payments)</td><td class="check">${check(f.dataFinancial)}</td></tr>
  <tr><td>Manufacturing and production data</td><td class="check">${check(f.dataManufacturing)}</td></tr>
  <tr><td>Quality and compliance records</td><td class="check">${check(f.dataQuality)}</td></tr>
  ${f.dataOther ? `<tr><td>${esc(f.dataOther)}</td><td class="check">${check(true)}</td></tr>` : ""}
</table>

${renderSignatures(f)}`;
}

// ── MSA ──────────────────────────────────────────────────────

function renderMSA(f) {
  return `
<h1>MASTER SERVICES AGREEMENT</h1>
<div class="meta">
  <strong>Agreement No.:</strong> MSA-${field(f.agreementNumber, "____-____")} &nbsp;&nbsp;
  <strong>Effective Date:</strong> ${field(f.effectiveDate, today())}
</div>

<div class="parties">
  <div class="party">
    <div class="party-name">Mimir Labs LLC</div>
    <div>("Provider") &mdash; Harrisburg, Pennsylvania</div>
  </div>
  <div class="party">
    <div class="party-name">${field(f.clientName, "Client Legal Entity Name")}</div>
    <div>("Client") &mdash; ${field(f.clientAddress, "Client Address")}</div>
  </div>
</div>

<h2>ARTICLE 1 &mdash; SCOPE</h2>
<p>This Agreement establishes the general terms governing all services provided by Provider to Client. Specific engagements are defined in individual Statements of Work. In the event of conflict, the SOW controls for scope/fees; this Agreement controls for liability, indemnification, confidentiality, and governing law.</p>

<h2>ARTICLE 2 &mdash; AVAILABLE SERVICES</h2>
<p><strong>(a) Ratatosk</strong> &mdash; Data governance workshop. Facilitated discovery producing semantic manifests, conflict analyses, and executive-ready governance artifacts.</p>
<p><strong>(b) Ragnarok</strong> &mdash; Data migration. Structured migration from legacy systems including schema mapping, transformation, validation.</p>
<p><strong>(c) Bifrost</strong> &mdash; Live data bridge. Persistent, event-driven synchronization between enterprise systems.</p>
<p><strong>(d) Jormungandr</strong> &mdash; Canon governance. Continuous schema governance enforcement with drift detection and compliance reporting.</p>
<p><strong>(e) Yggdrasil ERP</strong> &mdash; Multi-tenant ERP platform (governed by separate SaaS Subscription Agreement).</p>
<p><strong>(f) Custom Services</strong> &mdash; Consulting, training, custom integration, data quality remediation.</p>

<h2>ARTICLE 3 &mdash; FEES AND PAYMENT</h2>
<p>Fees as specified in each SOW. Invoices due Net 30. Late payments accrue interest at 1.5%/month. All fees exclusive of applicable taxes. Travel expenses pre-approved or per SOW.</p>

<h2>ARTICLE 4 &mdash; INTELLECTUAL PROPERTY</h2>
<p><strong>Provider IP:</strong> Provider retains all rights in its platforms, tools, methodologies, Mimisbrunnr semantic model, and system dictionaries.</p>
<p><strong>Client IP:</strong> Client retains all rights in its data, business processes, and proprietary information.</p>
<p><strong>Deliverables:</strong> Client-specific deliverables (governance artifacts, migration plans, routing configurations, canonical registries) are owned by Client upon full payment. Provider retains a royalty-free license to anonymized, de-identified insights for product improvement.</p>

<h2>ARTICLE 5 &mdash; CONFIDENTIALITY</h2>
<p>Each Party shall hold Confidential Information in strict confidence for five (5) years after termination. Trade secrets protected indefinitely. Standard exclusions apply (public knowledge, prior knowledge, independent development, third-party disclosure).</p>

<h2>ARTICLE 6 &mdash; WARRANTIES</h2>
<p>Provider warrants professional, workmanlike performance and conformance to SOW specifications. <span class="caps">All other warranties disclaimed, including merchantability and fitness for a particular purpose.</span></p>

<h2>ARTICLE 7 &mdash; LIMITATION OF LIABILITY</h2>
<p class="caps">Aggregate liability capped at total fees paid under the applicable SOW in the preceding 12 months. No liability for indirect, incidental, consequential, or punitive damages.</p>
<p>Exceptions: willful misconduct, fraud, confidentiality breaches, IP infringement, data protection law obligations.</p>

<h2>ARTICLE 8 &mdash; INDEMNIFICATION</h2>
<p><strong>By Provider:</strong> Defense against third-party IP infringement claims arising from Services or Deliverables.</p>
<p><strong>By Client:</strong> Defense against claims arising from Client Data, misuse of Services, or breach of data protection law.</p>

<h2>ARTICLE 9 &mdash; TERM AND TERMINATION</h2>
<p>Effective until terminated. Termination for convenience: 90 days' written notice. Termination for cause: 30-day cure period. Active SOWs continue until completion. Articles 4-8 survive termination.</p>

<h2>ARTICLE 10 &mdash; GENERAL PROVISIONS</h2>
<p>Governed by Commonwealth of Pennsylvania law. Disputes resolved by AAA arbitration in Harrisburg, PA. Independent contractor relationship. Assignment requires consent (except Affiliates, M&A).</p>

${renderSignatures(f)}`;
}

// ── SOW ──────────────────────────────────────────────────────

function renderSOW(f) {
  return `
<h1>STATEMENT OF WORK</h1>
<div class="meta">
  <strong>SOW No.:</strong> SOW-${field(f.sowNumber, "____-____")} &nbsp;&nbsp;
  <strong>MSA Ref:</strong> MSA-${field(f.msaNumber, "____-____")} &nbsp;&nbsp;
  <strong>Effective Date:</strong> ${field(f.effectiveDate, today())}
</div>

<div class="parties">
  <div class="party">
    <div class="party-name">Mimir Labs LLC</div>
    <div>("Provider")</div>
  </div>
  <div class="party">
    <div class="party-name">${field(f.clientName, "Client Legal Entity Name")}</div>
    <div>("Client")</div>
  </div>
</div>

<h2>1. ENGAGEMENT TYPE</h2>
<table>
  <tr><th></th><th>Service</th><th>Description</th></tr>
  <tr><td class="check">${check(f.engRatatosk)}</td><td>Ratatosk &mdash; Governance Workshop</td><td>Facilitated governance discovery and artifact generation</td></tr>
  <tr><td class="check">${check(f.engRagnarok)}</td><td>Ragnarok &mdash; Data Migration</td><td>Structured migration from legacy systems</td></tr>
  <tr><td class="check">${check(f.engBifrost)}</td><td>Bifrost &mdash; Integration Deployment</td><td>Live data bridge configuration</td></tr>
  <tr><td class="check">${check(f.engJormungandr)}</td><td>Jormungandr &mdash; Canon Governance</td><td>Continuous schema governance enforcement</td></tr>
  <tr><td class="check">${check(f.engYggdrasil)}</td><td>Yggdrasil ERP &mdash; Implementation</td><td>ERP deployment and onboarding</td></tr>
  <tr><td class="check">${check(f.engCustom)}</td><td>Custom Professional Services</td><td>${esc(f.engCustomDesc) || "As described below"}</td></tr>
</table>

<h2>2. CLIENT INFORMATION</h2>
<table>
  <tr><td><strong>Client Legal Name</strong></td><td>${field(f.clientName)}</td></tr>
  <tr><td><strong>Primary Contact</strong></td><td>${field(f.contactName)}</td></tr>
  <tr><td><strong>Contact Email</strong></td><td>${field(f.contactEmail)}</td></tr>
  <tr><td><strong>Contact Phone</strong></td><td>${field(f.contactPhone)}</td></tr>
  <tr><td><strong>Industry</strong></td><td>${field(f.industry)}</td></tr>
  <tr><td><strong>Employees</strong></td><td>${field(f.employees)}</td></tr>
  <tr><td><strong>Sites</strong></td><td>${field(f.sites)}</td></tr>
</table>

<h2>3. SCOPE OF SERVICES</h2>
<h3>3.1 Objectives</h3>
<p>${esc(f.objectives) || "<em>Describe engagement objectives</em>"}</p>

<h3>3.2 Source Systems</h3>
<table>
  <tr><th>System</th><th>Vendor/Platform</th><th>Database Type</th><th>Access Method</th><th>Classification</th></tr>
  ${(f.sourceSystems || [{ name: "", vendor: "", dbType: "", access: "", classification: "" }]).map(s =>
    `<tr><td>${esc(s.name)}</td><td>${esc(s.vendor)}</td><td>${esc(s.dbType)}</td><td>${esc(s.access)}</td><td>${esc(s.classification)}</td></tr>`
  ).join("\n  ")}
</table>

<h3>3.3 Out of Scope</h3>
<p>${esc(f.outOfScope) || "<em>Describe exclusions</em>"}</p>

<h2>4. DELIVERABLES</h2>
${f.engRatatosk ? `
<h3>Ratatosk Workshop Deliverables</h3>
<table>
  <tr><th>#</th><th>Deliverable</th><th>Format</th></tr>
  <tr><td>1</td><td>Taxonomy Manifest</td><td>JSON</td></tr>
  <tr><td>2</td><td>Executive Summary</td><td>PDF</td></tr>
  <tr><td>3</td><td>Action Plan</td><td>PDF + JSON</td></tr>
  <tr><td>4</td><td>Governance Summary</td><td>PDF</td></tr>
  <tr><td>5</td><td>Conflict & Coverage Report</td><td>PDF</td></tr>
  <tr><td>6</td><td>Data Quality Report</td><td>PDF</td></tr>
  <tr><td>7</td><td>Stewardship Matrix</td><td>PDF</td></tr>
  <tr><td>8</td><td>Visual Artifacts</td><td>SVG</td></tr>
</table>
` : ""}
${f.engRagnarok ? `
<h3>Ragnarok Migration Deliverables</h3>
<table>
  <tr><th>#</th><th>Deliverable</th><th>Format</th></tr>
  <tr><td>1</td><td>Migration Plan</td><td>JSON</td></tr>
  <tr><td>2</td><td>Mapping Report</td><td>PDF</td></tr>
  <tr><td>3</td><td>Gap Analysis</td><td>PDF</td></tr>
  <tr><td>4</td><td>Post-Migration Validation</td><td>PDF</td></tr>
  <tr><td>5</td><td>Rollback Procedures</td><td>PDF</td></tr>
</table>
` : ""}
${f.customDeliverables ? `<h3>Custom Deliverables</h3><p>${esc(f.customDeliverables)}</p>` : ""}

<h2>5. TIMELINE</h2>
<table>
  <tr><th>Phase</th><th>Description</th><th>Start</th><th>End</th></tr>
  <tr><td>Scoping</td><td>Requirements, access setup</td><td>${field(f.scopingStart)}</td><td>${field(f.scopingEnd)}</td></tr>
  <tr><td>Execution</td><td>Primary service delivery</td><td>${field(f.executionStart)}</td><td>${field(f.executionEnd)}</td></tr>
  <tr><td>Delivery</td><td>Artifact generation and handoff</td><td>${field(f.deliveryStart)}</td><td>${field(f.deliveryEnd)}</td></tr>
  <tr><td>Review</td><td>Client review and follow-up</td><td>${field(f.reviewStart)}</td><td>${field(f.reviewEnd)}</td></tr>
</table>

<h2>6. FEES AND PAYMENT</h2>
<table>
  <tr><th>Milestone</th><th>Amount</th><th>Due</th></tr>
  <tr><td>Deposit (with signed LOI)</td><td>${field(f.feeDeposit)}</td><td>Upon execution</td></tr>
  <tr><td>Pre-engagement</td><td>${field(f.feePreEngagement)}</td><td>Before Day 1</td></tr>
  <tr><td>Balance</td><td>${field(f.feeBalance)}</td><td>Before artifact delivery</td></tr>
  <tr><td><strong>Total</strong></td><td><strong>${field(f.feeTotal)}</strong></td><td></td></tr>
</table>

${f.migrationCredit ? `<p><strong>Migration Credit:</strong> If Client proceeds with a Ragnarok migration engagement within 12 months, up to 50% of Ratatosk workshop fees may be credited toward migration services.</p>` : ""}

<h2>7. ACCEPTANCE</h2>
<p>Deliverables deemed accepted if Client does not provide written notice of material deficiencies within ${field(f.acceptanceDays, "14")} calendar days of delivery.</p>

<h2>8. SUPPLEMENTARY AGREEMENTS</h2>
<table>
  <tr><th>Agreement</th><th>Required</th><th>Executed</th></tr>
  <tr><td>Master Services Agreement (MSA)</td><td>Yes</td><td class="check">${check(f.hasSignedMSA)}</td></tr>
  <tr><td>Data Processing Agreement (DPA)</td><td>Yes</td><td class="check">${check(f.hasSignedDPA)}</td></tr>
  <tr><td>Mutual Non-Disclosure Agreement</td><td>Recommended</td><td class="check">${check(f.hasSignedMNDA)}</td></tr>
</table>

${renderSignatures(f)}`;
}

// ── Signatures ───────────────────────────────────────────────

function renderSignatures(f) {
  return `
<div class="sig-block">
  <h2>SIGNATURES</h2>
  <table style="border: none;">
    <tr style="border: none;">
      <td style="border: none; width: 50%; vertical-align: top;">
        <p><strong>Mimir Labs LLC</strong></p>
        <div class="sig-line"></div><br>
        <span class="sig-label">Signature</span><br><br>
        <span class="sig-label">Name: Christopher Gaither</span><br>
        <span class="sig-label">Title: Founder & CEO</span><br>
        <span class="sig-label">Date: _______________</span>
      </td>
      <td style="border: none; width: 50%; vertical-align: top;">
        <p><strong>${esc(f.clientName) || "Client"}</strong></p>
        <div class="sig-line"></div><br>
        <span class="sig-label">Signature</span><br><br>
        <span class="sig-label">Name: ${esc(f.signerName) || "_______________"}</span><br>
        <span class="sig-label">Title: ${esc(f.signerTitle) || "_______________"}</span><br>
        <span class="sig-label">Date: _______________</span>
      </td>
    </tr>
  </table>
</div>`;
}
