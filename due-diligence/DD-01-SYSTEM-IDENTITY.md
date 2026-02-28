# DD-01 — System Identity and Boundaries

---

## 1. What Yggdrasil Is

Yggdrasil is a multi-tenant enterprise resource planning system built for small and mid-market manufacturers. It covers the standard ERP surface area — CRM, sales, purchasing, manufacturing, warehouse, finance, quality, service, HR, project management — and adds integrated product lifecycle management and real-time cross-tenant event streaming. The system is delivered as a SaaS platform with a self-hosted deployment option.

The technical stack consists of a C++17 backend server built on Qt 6, a native Qt 6 desktop client, a Next.js web application, and PostgreSQL as the data store. Cross-tenant coordination runs through a Redpanda broker (Kafka-compatible) accessed via Cloudflare Zero Trust tunnels. Each tenant site runs its own full stack locally; the central infrastructure handles event federation and tenant registry, not business logic.

The system is built by Mimir Labs LLC and is currently at version 0.4.4a — alpha maturity. There are no production deployments or paying customers at the time of writing.

## 2. What Yggdrasil Is Not

Yggdrasil is not a supply chain platform in the sense that term is commonly used. It does not position itself as the authoritative record for cross-enterprise data. It does not hold identifiable tenant data centrally or use access to one party's records as leverage over another. It does not sit "above" its tenants.

It is also not an integration middleware. It does not translate between existing ERP systems or provide connectors to SAP, Oracle, or other platforms. It occupies the same layer those systems occupy — it is an ERP, not a bridge between ERPs.

Each tenant's data lives in that tenant's PostgreSQL instance. The central broker stores events in transit, not at rest. A tenant that leaves the system takes its data with it; nothing structurally prevents this. The system does derive value from its position across tenants — specifically through anonymized aggregate data products (described in Section 7) — but this operates on statistical summaries, not on identifiable records, and a tenant's departure does not strand their data or impair their operations.

## 3. The Positioning Choice

Most B2B coordination platforms follow a pattern: they establish themselves as the neutral intermediary, accumulate data from both sides of a transaction, and derive value from that central position. This creates a well-understood problem — the intermediary's incentives diverge from its participants' incentives as the data set grows, because the intermediary's most valuable asset is access to identifiable, attributable transaction data.

Yggdrasil takes a different approach. It is an ERP that happens to support cross-tenant coordination, not a coordination platform that happens to include ERP features. The distinction is structural, not rhetorical. The coordination layer (the B2BEventHub and Redpanda federation) is a feature of the ERP, not the other way around. A tenant that never uses cross-tenant features has a fully functional standalone system. The system does plan to monetize aggregate, anonymized data (industry benchmarks, demand trend indices, pricing distributions) — but the input to that pipeline is statistical, not attributable. No individual tenant's records are exposed, identifiable, or necessary for the aggregate product to function. The incentive structure this creates is different from the intermediary pattern: the provider benefits from having many tenants, but does not benefit from controlling any one tenant's data.

This means the system must earn each tenant independently. A manufacturer adopts Yggdrasil because it needs an ERP, not because a trading partner requires it to join a network. If a trading partner also runs Yggdrasil, the cross-tenant features activate. If not, the manufacturer has a normal ERP with no degradation. Network effects exist, but they are not load-bearing for the initial value proposition.

## 4. Cross-Enterprise Coordination Without Central Authority

When two Yggdrasil tenants establish a trading relationship, the system supports automatic propagation of commercial documents across their boundary. A sales order in one tenant can generate a corresponding purchase order in the partner's tenant. Status changes propagate bidirectionally. Both organizations see the state of the shared workflow from their own vantage point, inside their own data, under their own access controls.

This coordination happens through events, not through shared tables or a common database. Each tenant retains full custody of its own records. The event broker moves structured messages between them; it does not merge their state. If a seller records a shipment, the buyer's system receives an event and updates its own purchase order accordingly — but the buyer's PO remains a record the buyer controls. The seller cannot modify it, query it, or prevent the buyer from editing it.

The system enforces shared meaning at the point of creation. When a sales order is marked for B2B sync, the document schema and field semantics are fixed at publication time. This avoids the post-hoc translation problem that plagues EDI and API-based integrations, where each party's system represents the same concept differently and a mapping layer must reconcile them. Here, both sides use the same schema because both sides run the same software. This is a constraint — it requires both parties to be Yggdrasil tenants — but within that constraint, semantic alignment is structural rather than negotiated.

## 5. What the System Constrains

Yggdrasil constrains semantics. A purchase order line item means the same thing in every tenant. A work order status enum has the same values everywhere. A part number articulation scheme, once defined, produces numbers that other tenants can interpret without a lookup table. This is deliberate. Shared meaning is the prerequisite for coordination without a central interpreter.

The system does not constrain business decisions. A tenant can edit its records, delete them, change prices, modify quantities, reject incoming orders, or ignore events from trading partners. The coordination layer is advisory at the edges — it delivers information, but the receiving tenant's business rules determine what happens with that information. The system does not enforce that a buyer must accept an order, or that a supplier must honor a quote. Those are business decisions, and the system stays out of them.

What the system does constrain, absolutely, is the internal audit trail. Business records are mutable. The log of changes to those records is not. This is the only place where the system asserts immutability, and it does so for a specific reason: the audit trail exists so that the system can produce evidence. Under regulatory scrutiny, under dispute between trading partners, under internal investigation — the audit trail is the system's answer to "what happened." If it were mutable, it could not serve that purpose.

## 6. Where Yggdrasil Sits in the Ecosystem

The manufacturing ERP market has a well-known structure: enterprise platforms at the top (SAP, Oracle), mid-market incumbents in the middle (Epicor, Sage, Infor), lightweight tools at the bottom (MRPeasy, Katana, Fishbowl), and open-source alternatives on the side (ERPNext, Odoo). Yggdrasil targets the gap between the lightweight tools and the mid-market incumbents.

This is not an empty market segment. It is, however, a poorly served one. The incumbents in this range — Epicor Kinetic, Sage X3, Aptean's Made2Manage — carry decades of technical debt, charge per-user license fees that penalize growth, and require expensive implementation partners. The lightweight tools lack depth in manufacturing, quality, and PLM. Yggdrasil's bet is that a modern system built from scratch can deliver the functional depth of the mid-market incumbents at a price point accessible to manufacturers with 10-500 employees.

The cross-tenant coordination feature creates a secondary positioning axis. Traditional EDI-based B2B integration is expensive, brittle, and batch-oriented. Newer API-based integration platforms (Cleo, Boomi, MuleSoft) solve the connectivity problem but not the semantic problem — they move data between systems without ensuring both sides interpret it the same way. Yggdrasil avoids this problem entirely by being the system on both sides. This is a limitation (both parties must run Yggdrasil) and an advantage (when both parties do run it, the integration is zero-configuration and real-time).

## 7. The Business Model

Yggdrasil uses subscription pricing with tiered bundles (Starter, Professional, Enterprise) and an a-la-carte module option. Pricing is per-tenant, not per-user — a deliberate choice to avoid the per-seat cost anxiety that prevents manufacturers from giving appropriate system access to shop floor workers, warehouse staff, and quality inspectors. The pricing strategy trades higher per-user revenue for broader adoption within each customer organization.

Professional services (implementation, data migration, custom configuration, training) are available alongside the subscription. The contractual framework, documented in the SaaS Subscription Agreement, covers tenant isolation guarantees (Article II), data ownership and portability (Article VI), SLA commitments with service credits (Schedule B), and standard commercial protections (IP, confidentiality, limitation of liability).

The system intends to monetize anonymized aggregate data as a secondary revenue stream. The SaaS contract (Article VI, Section 6.6) grants the provider a license to aggregate and anonymize client data for "product improvement, benchmarking, and analytical purposes." The planned products include industry benchmarking reports (e.g., average lead times by manufacturing sector, pricing trend indices, defect rate distributions) and anonymized demand signals. These products operate on statistical aggregates derived from the tenant population — no individual tenant's records are identifiable in the output, and no tenant's participation is required for the aggregate to be useful. This is a revenue line that scales with the tenant base, but it does not create a custody dependency: a tenant that opts out or departs does not lose access to their own data, and the aggregate products do not degrade meaningfully from any single departure. The aggregation pipeline is not yet built. The contractual and architectural groundwork exists; the implementation does not.

## 8. What This Document Does Not Cover

The architecture, trust model, and isolation mechanisms are covered in DD-02. Data custody, mutability rules, and audit trail mechanics are in DD-03. Failure modes and recovery behavior are in DD-04. The honest gap analysis and maturity assessment — including everything that is not yet built, not yet tested, and not yet ready for production — is in DD-05.

---

*Document version: 1.0 — February 2026*
*System version: Yggdrasil v0.4.4a (alpha)*
