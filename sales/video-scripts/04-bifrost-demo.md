# Bifrost — Product Demo Script

**Target length:** 3-4 minutes
**Format:** Screen recording of Bifrost desktop dashboard + voiceover (Doc narrating)
**Capture from:** Qt desktop client (BifrostDashboard)

---

## SCRIPT

### Opening (15 sec)

[Show Bifrost logo, then open the desktop application]

Bifrost is a live data integration engine. It synchronizes data between enterprise systems in real-time — not with nightly batch jobs, but with event-driven change capture that preserves meaning across system boundaries.

### The Dashboard (30 sec)

[Show the main dashboard with listener panels, sync status]

This is the Bifrost dashboard. On the left, you can see our active listeners — CDC connections to each source and target system. Green means connected and streaming. The event count shows how many changes have propagated in the current session.

Each listener is configured with a routing table that defines which events go where, and a semantic mediation layer that translates values between system vocabularies.

### Live Sync in Action (60 sec)

[Show the event log panel — events flowing in real-time]

Here's the event log. Each row is a change that was detected in a source system and propagated to the target. You can see the event type — insert, update, delete — the source table, the target table, and the payload.

[Click into an event detail]

This event shows a customer address change in the CRM system being propagated to the ERP. Notice the mediation: the CRM uses "State" as a two-letter code, the ERP uses the full state name. Bifrost translated "PA" to "Pennsylvania" automatically, using the semantic mediation rules.

[Show another event — a status translation]

Here's a more interesting case. An order status changed from "3" in the legacy system. Bifrost's status mapper translated that to "Confirmed" in the target system's vocabulary. No manual mapping table to maintain — the mediation rules are defined once and applied to every event.

### Conflict Resolution (45 sec)

[Show the conflict panel]

Conflicts happen when two systems modify the same record between sync events. Bifrost detects these deterministically.

[Show a conflict detail]

This conflict shows a customer record that was updated in both the CRM and the ERP within the same window. The CRM changed the phone number. The ERP changed the address. Bifrost presents both versions and applies the resolution rule: in this case, timestamp-based — the most recent change wins.

For conflicts that can't be auto-resolved, they land in the dead letter queue with full context. An operator reviews, decides, and the resolution is logged.

### Circuit Breakers and Observability (30 sec)

[Show circuit breaker panel and health indicators]

If a target system becomes unavailable, Bifrost doesn't keep hammering it. The circuit breaker trips, events queue, and when the system recovers, Bifrost replays the queued events in order.

You can see the health of every connection, the throughput metrics, and any alerts — all in one dashboard.

### Integration Playbooks (20 sec)

[Show the playbook list or mention supported systems]

Bifrost ships with integration playbooks for 13 enterprise platforms: SAP, Epicor, NetSuite, Dynamics, Infor, Sage, Salesforce, Acumatica, Shopify, BigCommerce, and more. Each playbook includes pre-configured routing rules, status mappings, and semantic mediation for that platform's data model.

### Closing (15 sec)

Real-time. Semantic. Governed. Bifrost maintains the alignment that Ragnarok established — continuously, not periodically.

Visit mimirlabs.net/bifrost to learn more.

---

## PRODUCTION NOTES

- **Capture from the running Bifrost desktop app.** This IS client-facing software — show the real UI.
- **Pre-configure demo connections** so listeners show active, events are flowing, and conflicts exist to demonstrate.
- **Key moments:** Live event appearing in the log, status translation in event detail, conflict resolution with both versions visible, circuit breaker status.
- **If Bifrost isn't connected to live systems for the recording,** use recorded/replayed demo data that looks realistic.
- **Closing frame:** Bifrost logo, mimirlabs.net/bifrost
