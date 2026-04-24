---
title: "Mimisbrunnr — A Canonical Data Model That Doesn't Move"
author: "Christopher Gaither"
date: "April 2026"
version: "1.1"
docnumber: "ML-WP-006"
classification: "Public"
logo: "mimir_labs_logo.png"
---

## Why This Matters

Every enterprise eventually pays the same tax. A "customer" in the CRM is not the same record as a "customer" in the ERP, which is not the same record as a "customer" in finance's reporting tool. A "part" in engineering means something subtly different than the "part" purchasing buys, which is not quite the same thing manufacturing builds.

The systems describing the business have never agreed on what the words mean. Every integration, every report, every migration spends most of its time translating between dialects. When something goes wrong — a duplicate order, a misposted invoice, a recall traced to the wrong assembly — the diagnosis is almost always a vocabulary problem dressed up as a data quality problem.

Mimisbrunnr is what we built to fix this. It is a shared semantic reference model: a fixed vocabulary that every Mimir Labs tool, and every system Mimir Labs touches, agrees on.

This paper explains what Mimisbrunnr is, why we refuse to let customers change it, and what that buys an organization that adopts it.

---

## What Mimisbrunnr Is

Mimisbrunnr is a database schema. More than three hundred tables, organized into seventeen business domains that cover the operational scope of a modern enterprise: customer relationships, sales, purchasing, manufacturing, warehouse, finance, projects, product lifecycle, quality, service, HR, logistics, integration, scheduling, fleet, asset and MRP, and the workflow substrate underneath them all.

Every table has a defined meaning. Every column has a defined meaning. Every relationship between tables has a defined meaning. Those meanings do not change per customer, per industry, or per deployment.

That is the entire feature.

Inside Yggdrasil ERP, Mimisbrunnr is the production database. Every transaction lives there. Outside Yggdrasil, Mimisbrunnr is the vocabulary that the rest of the Mimir Labs platform — Ratatosk for discovery, Ragnarok for migration, Bifrost for synchronization, Jormungandr for governance — uses to describe enterprise data, regardless of what systems are actually involved.

---

## The Cardinal Rule

The schema is authoritative. We do not change it for customers.

Most enterprise software treats this as a limitation to be sold around. SAP has customizing tables. Oracle has flexfields. Salesforce has custom objects. Microsoft Dynamics has option sets. The ability to add fields, tables, and relationships is marketed as flexibility and sold as value.

We do not permit it. Mimisbrunnr does not have customer-specific extensions. It does not accept new tables submitted by customers. It does not grow a new column when a customer asks. The vocabulary is fixed, and adapts only when Mimir Labs releases a new version.

This sounds like a limitation. It is the opposite. Every existing platform that lets customers extend its schema has paid for that flexibility with a permanent integration tax — every other system on the network has to learn each customer's bespoke dialect. Mimisbrunnr trades the appearance of flexibility for the reality of interoperability. Two organizations on Mimisbrunnr can talk to each other without writing a translation layer. An organization on Mimisbrunnr can connect to a partner system through Bifrost without having to retrain its integration logic for every customer.

When a customer needs flexibility, they get it through configuration, classification tags, custom field values inside known fields, and JSONB payloads in well-defined extension points — not through schema mutation. The shape of the model stays still. What goes in it varies as much as the business needs.

---

## What Customers Get From a Fixed Vocabulary

**Migrations stop being open-ended projects.** When the target schema is fixed and well-defined, migration becomes a mapping exercise rather than a discovery exercise. Ratatosk and Ragnarok can reason about it programmatically because there's a known thing to map *to*.

**Integrations stop drifting.** External systems connected through Bifrost speak Mimisbrunnr at the boundary. Each integration is built once against a stable target, not rebuilt every time a customer's local schema evolves.

**Reports agree across systems.** When the same business concept has the same name everywhere, the same number can be derived from anywhere. "Customer revenue this quarter" returns the same answer from the operational database, the analytics layer, and the integration partner.

**AI has somewhere stable to stand.** A language model writing a query against Mimisbrunnr is writing against a vocabulary that doesn't change under it. The same prompt produces the same query in every customer environment. Agent automation built on Mimisbrunnr is portable in a way that agent automation built on per-customer schema simply isn't.

**Audit and compliance get easier.** Regulators ask questions in business vocabulary. A schema whose tables are named for business concepts can answer those questions directly, without a custom query for each customer's local naming.

---

## How the Rest of the Platform Uses It

Mimisbrunnr is what makes the rest of the Mimir Labs tool suite possible.

**Ratatosk** uses it as the target dictionary when discovering and classifying enterprise data. A column named `cust_no` in someone's legacy system gets recognized as a customer identifier because Ratatosk knows what "customer" means in Mimisbrunnr. Operators confirm or override the suggestion; the result is a manifest that describes the source system in canonical terms.

**Ragnarok** uses it as the target schema for migrations. Foreign-key relationships in Mimisbrunnr define the safe insertion order. Type definitions in Mimisbrunnr define what transformations are needed to land source data cleanly. The migration plan is a function of the source and the canonical target, not a hand-written script.

**Bifrost** uses it as the lingua franca for cross-system synchronization. Every connector translates its source system into Mimisbrunnr terms at the edge. Once data is in Mimisbrunnr vocabulary, it can be routed to any other connected system without per-pair translation logic.

**Jormungandr** uses it as the compliance baseline. A customer's environment can be continuously validated against the canonical model — not just at migration time, but as an ongoing governance subscription that flags drift the moment it appears.

Each of these tools works against any enterprise system. Mimisbrunnr is the shared vocabulary that makes them coherent across the suite.

---

## Built for Enterprise Reality

Mimisbrunnr is not an academic data model. It evolved from real operational use inside Yggdrasil ERP and continues to evolve through real engagement experience. New capabilities — agent-driven execution, advanced production scheduling, sanctioned shop-floor exception MBOMs, dimension-tagged GL postings, demo provisioning — have entered the model under a strict additive-only discipline. Existing structures are not modified or removed; new ones are appended.

The result is a vocabulary that is large enough to express what an enterprise actually does, stable enough to act as a reference for every tool in the platform, and structured enough that automation — both deterministic tooling and AI agents — can reason about it without brittleness.

---

## What This Means For You

If you are evaluating an ERP, Mimisbrunnr is the reason Yggdrasil's integration story is qualitatively different from its competitors'. Adopting Yggdrasil means adopting a vocabulary that the rest of your stack — partners, suppliers, analytics, AI tooling — can also speak.

If you are evaluating data tooling — discovery, migration, synchronization, governance — Mimisbrunnr is the reason Mimir Labs' tools work on systems we did not build. You can use Ratatosk on your existing SAP, NetSuite, or Dynamics environment. You can migrate to a schema that isn't ours. The tools deliver value regardless of whether you ever adopt Yggdrasil itself.

If you are evaluating an AI strategy for your enterprise data, Mimisbrunnr is the foundation that makes agent automation reliable. A model that knows Mimisbrunnr knows what it is reading, in every environment Mimir Labs touches.

A canonical data model that never moves is unusual. It is also the only thing that makes enterprise data interoperability tractable. We built one. We will not let anyone change it. And that is exactly why it works.

---

*Copyright 2026 Mimir Labs. All rights reserved.*
