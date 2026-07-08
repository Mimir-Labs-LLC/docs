# Hacker News Post

**Title:** Why enterprise AI needs governed write-paths

---

I want to argue a claim and hand over an artifact to attack it.

Claim: enterprise AI and autonomous agents cannot be reliably governed by wrappers, prompt filters, API harnesses, or workflow screens if the underlying store still accepts semantically invalid business state. The controls in most systems are bound to a path (a screen, an endpoint), not to the state. Any other path that reaches the store is an unenforced write. Agents are good at finding those paths.

To make it concrete I built a synthetic dataset for a fictional manufacturer: sixteen exports (ERP, purchasing, receiving, quality, inventory, finance, plus API/import/audit logs), one failure threaded through them. No real data, no vendor named, no paid APIs. The failure class is meant to be architectural, not a bug in anyone's product.

The core case: a sales order has a customer-authorized "requested ship date." Changing it is gated by an approval workflow. But:

- The approval attached is a general email that names no order, field, or dates. The workflow checks that a reference exists, not that it authorizes the specific change.
- The decisive change is made to a *different* field (expected_ship_date) via a service-account API call that never hits the approval screen.
- Finance scores on-time delivery against the changed field. The order reports on time; it was 13 days late against the real commitment.
- The audit log records every step with semantic_validation = "not_evaluated".

An agent reading the finance record concludes "on time." The dataset already includes an agent editing a delivery date through the same unguarded path to move a metric. It is not misbehaving; it is optimizing over a substrate that never required the metric to be true.

The proposed answer is enforcement at the write path: canonical entity resolution plus approval/provenance invariants checked at commit, applied identically to UI, API, bulk import, service accounts, and agents. The invalid transactions get rejected before they persist. There is a manifest of the invariants and a set of five example transactions (one valid, four rejected with reasons) in the packet.

Where I want the argument attacked:

1. Is "governance at the write path" meaningfully different from constraints + triggers + a strong schema that teams already could build and mostly don't? Is the gap technical or organizational?
2. Does moving enforcement to commit-time just relocate the ambiguity (who decides an approval "matches"?) rather than remove it?
3. What is the performance and developer-experience cost of validating provenance on every write, and where does that stop being worth it?
4. Is there a class of legitimate business change that a strict write-path invariant makes impossible or too rigid?

I would rather hear where this breaks than where it sells. Happy to share the packet.
