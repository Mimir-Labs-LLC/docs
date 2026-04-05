# Customer Onboarding & Implementation Support Process

**Document Owner:** Mimir Labs Professional Services
**Last Updated:** 2026-03-14

---

## 1. Overview

Customer onboarding follows a four-phase lifecycle: **Pre-Sales → Implementation → Go-Live → Post-Go-Live**. Each phase has defined deliverables, milestones, and responsible roles. The goal is a successful production go-live within 8-16 weeks (depending on customer complexity) with high adoption and minimal support escalations.

---

## 2. Phase 1: Pre-Sales Technical Discovery (1-2 weeks)

### Activities

| Activity | Owner | Deliverable |
|----------|-------|-------------|
| Technical discovery call | Solutions Engineer | Discovery questionnaire completed |
| Current system assessment | Solutions Engineer | Source system inventory (ERP, databases, integrations) |
| Environment sizing | DevOps/SRE | Infrastructure recommendation (tenant resources, storage) |
| Integration assessment | Solutions Engineer | Integration requirements document (APIs, EDI, webhooks) |
| Module mapping | Solutions Engineer | Which of the 10 modules the customer needs, configuration scope |
| Data migration assessment | Data Migration Specialist | Source data audit (volume, quality, mapping complexity) using Ragnarok Stage 0.5 taxonomy |
| SOW / proposal | Account Manager | Statement of work with timeline, cost, milestones |

### Discovery Questionnaire

- Current ERP/system(s) in use (and version)
- Number of users (by role: admin, manager, floor, read-only)
- Number of legal entities / locations / warehouses
- Modules needed (check all 10)
- Integration requirements (accounting, e-commerce, shipping, EDI)
- Data migration scope (how many years of history, which entities)
- Compliance requirements (SOC 2, ISO, industry-specific)
- Go-live target date
- Training preferences (on-site, remote, self-service)

---

## 3. Phase 2: Implementation (4-12 weeks)

### 3.1 Project Kickoff (Week 1)

| Activity | Owner | Deliverable |
|----------|-------|-------------|
| Kickoff meeting | Project Manager | Project charter, stakeholder list, communication plan |
| Environment provisioning | DevOps/SRE | Tenant created, users provisioned, modules activated |
| Access setup | Implementation Consultant | Admin accounts, role configuration, SSO setup (if applicable) |
| Project plan | Project Manager | Gantt chart with milestones, weekly meeting cadence |

### 3.2 Configuration Workshops (Weeks 2-4)

Module-by-module configuration sessions with customer stakeholders:

| Module | Workshop Topics | Duration |
|--------|----------------|----------|
| **CRM** | Account/contact structure, opportunity pipeline stages, custom fields | 2-4 hours |
| **Sales** | Quote templates, order workflow, invoice numbering, commission rules | 2-4 hours |
| **Purchasing** | Supplier setup, PO approval workflow, three-way matching rules | 2-4 hours |
| **Manufacturing** | Work center setup, BOM structure, routing templates, OEE configuration | 4-8 hours |
| **Warehouse** | Location hierarchy, inventory policies, pick strategies, cycle count rules | 2-4 hours |
| **Finance** | Chart of accounts, fiscal periods, tax codes, bank accounts, payment terms | 4-8 hours |
| **Projects** | Project templates, billing rates, time entry policies | 2-4 hours |
| **PLM** | Part numbering scheme, revision control, ECR/ECO workflow, BOM types | 2-4 hours |
| **Quality** | Inspection plans, NCR categories, CAPA workflow, audit schedule | 2-4 hours |
| **Service** | Ticket categories, SLA definitions, RMA workflow, warranty terms | 2-4 hours |

### 3.3 Data Migration (Weeks 3-8)

| Step | Tool | Owner | Duration |
|------|------|-------|----------|
| Source data extraction | Ragnarok (Stage 0.5-1) | Data Migration Specialist | 1 week |
| Schema mapping review | Ragnarok (Stage 2) | Data Migration Specialist + Customer | 1 week |
| Gap analysis | Ragnarok (Stage 3) | Data Migration Specialist | 3-5 days |
| Trial migration #1 | Ragnarok (Stage 4) | Data Migration Specialist | 2-3 days |
| Customer validation | Portal / Desktop | Customer team | 1 week |
| Trial migration #2 (fixes) | Ragnarok | Data Migration Specialist | 2-3 days |
| Final migration (go-live) | Ragnarok | Data Migration Specialist | 1 day |

**Data migration scope by priority:**
1. **Must have:** Master data (customers, suppliers, parts, BOMs, chart of accounts, employees)
2. **Should have:** Open transactions (open POs, open SOs, open WOs, outstanding invoices)
3. **Nice to have:** Historical transactions (1-3 years of closed orders, invoices, journal entries)
4. **Archive only:** Data older than 3 years (load into read-only archive if needed)

### 3.4 Integration Setup (Weeks 4-8)

| Integration Type | Approach | Owner |
|------------------|----------|-------|
| REST API integrations | Configure API keys, webhook endpoints, test connectivity | Solutions Engineer |
| EDI (if applicable) | Map EDI documents to Yggdrasil entities via Bifrost | Solutions Engineer |
| Real-time sync | Configure Ratatosk connectors for bidirectional sync | Solutions Engineer |
| Accounting system | GL journal export, payment sync | Implementation Consultant |
| E-commerce | Order import, inventory push | Solutions Engineer |

### 3.5 User Acceptance Testing (Weeks 8-10)

| Activity | Owner | Deliverable |
|----------|-------|-------------|
| Test script creation | Implementation Consultant | Module-by-module test scenarios (per workshop config) |
| UAT execution | Customer team (guided by consultant) | Test results log (pass/fail/issue) |
| Issue resolution | Implementation Consultant + Engineering | All blocking issues resolved |
| UAT sign-off | Customer project sponsor | Formal acceptance document |

---

## 4. Phase 3: Go-Live & Hypercare (2-4 weeks)

### 4.1 Go-Live Checklist

- [ ] Final data migration completed and validated
- [ ] All integrations tested in production
- [ ] User accounts provisioned and tested (all roles)
- [ ] Backup verified (full backup before go-live)
- [ ] Rollback plan documented and tested
- [ ] Customer admin trained on basic troubleshooting
- [ ] Support team briefed on new customer (module set, key contacts, known quirks)
- [ ] Status page monitoring configured for customer's tenant
- [ ] Go-live communication sent to customer's end users

### 4.2 Hypercare Period

| Attribute | Detail |
|-----------|--------|
| Duration | 2 weeks (Standard), 4 weeks (Enterprise) |
| Dedicated contact | Named Implementation Consultant available during business hours |
| Response time | P1: 15 min, P2: 30 min, P3: 2 hours (accelerated SLA) |
| Daily check-ins | 15-minute standup with customer project lead (first 2 weeks) |
| Escalation | Direct line to L3 engineering — bypass normal L1/L2 queue |
| Scope | Configuration adjustments, workflow tuning, user questions, bug resolution |

### 4.3 Hypercare Exit Criteria

- [ ] No P1 or P2 issues open for 5 consecutive business days
- [ ] Customer admin can perform basic configuration tasks independently
- [ ] All UAT issues resolved
- [ ] Customer satisfaction survey score >= 4.0/5.0
- [ ] Formal handoff meeting completed (customer, implementation, support)

---

## 5. Phase 4: Post-Go-Live (Ongoing)

### 5.1 Transition to Standard Support

| Activity | Owner | Timing |
|----------|-------|--------|
| Handoff meeting | Implementation → Support Manager | End of hypercare |
| Customer profile in KB | Implementation Consultant | End of hypercare |
| SLA normalization | Support Manager | After hypercare exit criteria met |
| Implementation project closure | Project Manager | 30 days post-go-live |

### 5.2 Periodic Business Reviews

| Review | Frequency | Attendees | Agenda |
|--------|-----------|-----------|--------|
| **Quarterly Business Review (QBR)** | Every 90 days (first year); every 180 days after | Account Manager, Customer Sponsor, Support Manager | Ticket trends, usage metrics, feature roadmap preview, satisfaction |
| **Annual Review** | Yearly | Account Manager, VP, Customer Executive | Contract renewal, expansion opportunities, strategic alignment |

### 5.3 Feature Request Intake

1. Customer submits feature request via portal or QBR discussion
2. Account Manager logs in Jira (YGGDATA, type: Story, label: `customer-request`)
3. Product Manager reviews monthly, prioritizes against roadmap
4. Customer notified of decision (accepted with target release, deferred, or declined with rationale)

---

## 6. Training Program

### 6.1 Training Tracks

| Track | Audience | Content | Duration | Delivery |
|-------|----------|---------|----------|----------|
| **Admin Training** | IT admins, system owners | User management, roles, configuration, workflows, integrations, backup | 2 days | Remote or on-site |
| **End-User by Module** | Module power users | Module-specific workflows, data entry, reporting, tips | 2-4 hours per module | Remote |
| **Train-the-Trainer** | Customer trainers | Full admin + all modules + training delivery skills + materials | 3-5 days | On-site preferred |
| **Executive Overview** | C-suite, directors | Dashboard, KPIs, reporting, ROI metrics | 1 hour | Remote |

### 6.2 Training Materials

| Material | Format | Owner |
|----------|--------|-------|
| Module user guides | PDF / portal KB article | Technical Writer |
| Quick-start video series | 5-10 min videos per module | Technical Writer + Implementation |
| Configuration playbook | Step-by-step PDF | Implementation Consultant |
| Training slide decks | PowerPoint/Google Slides | Implementation Consultant |
| Sandbox environment | Live Yggdrasil instance with sample data | DevOps/SRE |

### 6.3 Training Sandbox

- Dedicated tenant with pre-loaded sample data (Demo Corp)
- Reset nightly to clean state
- Available to customer for 90 days post-go-live (extendable on request)
- URL: `https://sandbox.yggdrasil.com` (tenant-isolated)

---

## 7. Personnel

| Role | Responsibilities | Allocation |
|------|-----------------|------------|
| **Project Manager** | Timeline, milestones, stakeholder communication, risk management | 1 per implementation |
| **Implementation Consultant** | Configuration workshops, UAT support, hypercare, training | 1-2 per implementation (by module complexity) |
| **Data Migration Specialist** | Ragnarok operation, source data analysis, validation | 0.5-1 per implementation |
| **Solutions Engineer** | Integration setup, API configuration, technical architecture | 0.5 per implementation |
| **DevOps/SRE** | Environment provisioning, infrastructure, monitoring | As needed |

---

## 8. Timeline Summary

| Phase | SMB (< 50 users) | Mid-Market (50-200 users) | Enterprise (200+ users) |
|-------|-------------------|---------------------------|-------------------------|
| Pre-Sales | 1 week | 1-2 weeks | 2-4 weeks |
| Implementation | 4-6 weeks | 8-12 weeks | 12-16 weeks |
| Go-Live + Hypercare | 2 weeks | 3 weeks | 4 weeks |
| **Total** | **7-9 weeks** | **12-17 weeks** | **18-24 weeks** |

---

## 9. Related Documents

- [Support Tier Model](support-tier-model.md) — Post-hypercare support structure
- [SLA Framework](sla-framework.md) — Standard vs hypercare SLAs
- [Knowledge Base](knowledge-base.md) — Training materials and customer documentation
- [Environment Management](environment-management.md) — Tenant provisioning and isolation
