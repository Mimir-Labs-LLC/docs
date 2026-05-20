# NVIDIA Developer Program — Mimir Labs Integration Plan

*Author: Christopher Gaither — May 2026*
*Status: Draft research document. Implementation-planning baseline; not a commitment.*

*Independent assessment + refinement against a supplied NVIDIA candidate list. Treats NVIDIA as acceleration / deployment infrastructure; authority remains with Jormungandr, OPE, and the Yggdrasil ERP state-transition engine.*

---

## Pass 1 — Independent assessment (before reviewing candidate list)

Walking the platform components and asking *what would I reach for*:

| Component | Need that GPU compute could plausibly address | Picks before looking at the list |
|---|---|---|
| **Ratatosk** | Schema profiling against very large source tables, semantic-similarity augmentation of synonym dictionary, OCR if PDFs/data-dictionaries arrive as scans | GPU-accelerated dataframes, vector similarity index, OCR pipeline |
| **Ragnarok** | Large-batch transform/validate (100M-row migrations), anomaly detection on row distributions during cutover | GPU dataframes; anomaly detection only as **alerting**, never as a transform decision |
| **Bifrost** | High-volume CDC event triage; not core but useful at >10K events/sec | Streaming dataframe path (rarely needed at our scale today) |
| **Jormungandr** | **Nothing in the authority path.** Telemetry analytics on evaluation_log + drift_events for an operator dashboard | Read-only analytics only — Jormungandr is deterministic by contract |
| **OPE** | LLM-assisted drafting of Decisions from board minutes / regulatory text; **never** authority creation | Local model serving with hard guardrails — output must be a draft a signer accepts, not an autonomous Decision |
| **Yggdrasil ERP** | MRP planning, capacity/sequencing optimization, transport/route optimization for distribution | Combinatorial optimizer with constraint support |
| **Norn** | OCR + structured extraction from contracts/LOIs/forms; classify and pull clauses/parties/dates | Document-AI ingestion pipeline + extraction models |

**Independent shortlist (before reviewing list):**
1. A constraint optimization solver for MRP/scheduling — biggest defensible business outcome
2. A document-ingestion pipeline + OCR — direct fit for Norn, optional for Ratatosk
3. GPU dataframes — accelerate Ratatosk profiling and Ragnarok bulk ops when CPU is the bottleneck
4. Local model serving — if we run any AI inference, it stays local and self-hostable
5. Vector similarity — to augment (not replace) Ratatosk's deterministic synonym matching

**Independent rejections (before reviewing list):**
- Anything that requires NVIDIA's commercial enterprise tier as a hard dependency
- Anything that pushes the customer's data through hosted-only inference APIs (compliance kills it for AS9100/CMMC/ITAR customers)
- Vision/3D/speech tooling (no use case in the platform)
- Cybersecurity-pipeline tools (drift detection in Jormungandr is rule-based and small; we don't need a streaming-AI security framework)

---

## Pass 2 — Refinement against supplied candidate list

| Candidate | Independent assessment lands here? | Verdict | Notes |
|---|---|---|---|
| RAPIDS — cuDF | yes (GPU dataframes) | **Near-term** | Drop-in for Ratatosk profiling + Ragnarok bulk transforms. Apache 2.0, self-hostable. |
| RAPIDS — cuML | no (ML in authority path is rejected) | **Optional** | Useful only for *advisory* analytics on telemetry; never enforcement. |
| RAPIDS — cuGraph | partially (relationship analysis) | **Optional** | Mimisbrunnr canon has ~800 relationships; CPU is fine. cuGraph becomes interesting at customer canons of ~10K+ relationships. |
| RAPIDS — cuVS | yes (vector similarity) | **Near-term** | Augments Ratatosk's Levenshtein + synonym pipeline with semantic similarity — *suggestion only*, HITL approves. |
| NeMo Retriever | wasn't on the independent list | **Reject for v1** | RAG-style retrieval; cloud-leaning by default. Norn document Q&A is too narrow to justify the dependency. Revisit if a customer asks for natural-language search across their canon. |
| **NV-Ingest** | yes (doc ingestion) | **Immediate** | Self-hostable multi-format ingestion (PDF, DOCX, PPTX, images) with table/layout awareness. Strongest fit for Norn; optional for Ratatosk if customers bring paper data dictionaries. |
| **OCR NIMs** | yes (OCR) | **Immediate** | Pair with NV-Ingest. Self-hostable container; doesn't require AI Enterprise license for evaluation. |
| NeMo Guardrails | yes (if we run any LLM) | **Optional** | Only matters once we deploy an LLM-assisted feature (OPE decision drafting). Pre-commit to using it before the first LLM ships. |
| NIM microservices (general) | yes (deployment pattern) | **Optional** | Architectural pattern for self-hosted model serving. Adopt as we add models, not before. |
| **NVIDIA AI Enterprise** | rejected pre-list | **Reject** | $4,500/GPU/year commercial license. Many "free" NVIDIA tools have AIE as a **production** dependency — verify each before commitment. |
| NGC containers/models | yes (deployment) | **Optional** | Container registry; convenient but adds an NVIDIA-specific deployment surface. Use case-by-case. |
| **Triton Inference Server** | yes (model serving) | **Near-term** | Apache 2.0. The standard for hosting any locally-deployed model. Foundational once we ship our first model. |
| Dynamo-Triton | yes (newer Triton) | **Near-term** | Marginal vs Triton for our scale. Adopt the simpler Triton path first; revisit Dynamo when throughput matters. |
| **cuOpt** | yes (optimizer) | **Immediate** | Apache 2.0 since 2025. Combinatorial optimization solver. Yggdrasil MRP + scheduling + distribution routing. Strongest single business outcome on the entire list. |
| Riva | wasn't on the independent list | **Reject** | Speech AI; no use case in Mimir Labs scope. |
| Morpheus | wasn't on the independent list | **Reject** | Cybersecurity streaming-AI; massive overkill for our drift detection. |
| Omniverse | wasn't on the independent list | **Reject** | 3D/simulation; wrong domain. |
| OpenUSD | wasn't on the independent list | **Reject** | 3D scene description; wrong domain. |
| Metropolis | wasn't on the independent list | **Reject** | Vision/IoT analytics; wrong domain. |

**Comparison summary:**
- **Independent assessment selected:** optimizer, doc-ingestion + OCR, GPU dataframes, model serving, vector similarity.
- **Candidate list added:** explicit names for each — cuOpt, NV-Ingest, OCR NIMs, cuDF, Triton, cuVS — and surfaced **NeMo Guardrails** as a real gap the independent pass under-specified.
- **Changed after refinement:** added Guardrails as conditional (only if an LLM ships); confirmed NeMo Retriever isn't worth the surface area today; downgraded cuGraph to optional.
- **Should be ignored despite seeming attractive:** Riva, Morpheus, Omniverse, OpenUSD, Metropolis, NeMo Retriever, NVIDIA AI Enterprise as a hard dependency.

---

## 1. Executive Summary

Five NVIDIA assets are worth pursuing; the rest are either out-of-domain or premature.

| Tool | Why it matters | Mimir Labs surface |
|---|---|---|
| **cuOpt** | Apache 2.0 combinatorial optimizer that maps directly onto an MRP/scheduling/routing solver. Single biggest defensible product story on the list. | Yggdrasil ERP — Manufacturing + Logistics modules |
| **NV-Ingest + OCR NIMs** | Self-hostable multi-format document pipeline with layout-aware extraction. Closes a real Norn gap (contracts, LOIs, customer forms) and gives Ratatosk an optional PDF-dictionary path. | Norn (primary); Ratatosk (secondary) |
| **Triton Inference Server** | The standard serving layer once we host any local model. Adopting Triton early means every future model (extraction, classification, LLM-drafting) reuses one container, one set of operator concerns, one audit surface. | Platform infrastructure |
| **RAPIDS — cuDF** | GPU pandas. Accelerates Ratatosk profiling and Ragnarok bulk transforms when datasets exceed CPU pain threshold (typically >5M rows). | Ratatosk + Ragnarok |
| **RAPIDS — cuVS** | Vector similarity index that augments — never replaces — Ratatosk's deterministic synonym + Levenshtein matching. Outputs always pass through HITL approval. | Ratatosk |

**Two structural rules** that govern all five:

1. **No NVIDIA component sits in an authority path.** Jormungandr's enforcement, OPE's signed Decisions, and Yggdrasil's state-transition engine remain deterministic and audit-reproducible. NVIDIA tools accelerate, extract, suggest, or optimize. They do not decide.

2. **No commercial-tier dependency.** Every selected tool is Apache 2.0 or available under the free Developer Program. NVIDIA AI Enterprise is **not** on any critical path. If a tool's production deployment quietly requires AIE, that tool gets dropped or replaced before commitment.

**Top 3 to implement first:** cuOpt (in Yggdrasil), NV-Ingest + OCR NIM (in Norn), Triton (as platform infra). Details in §9.

---

## 2. Priority Matrix

| Bucket | Tools | Rationale |
|---|---|---|
| **Immediate** (0–30 days) | cuOpt, NV-Ingest, OCR NIM | Each gives a concrete user-visible capability; each is self-hostable; no AIE dependency. |
| **Near-term** (30–60 days) | Triton Inference Server, RAPIDS cuDF, cuVS | Adopt once we have a model to host and once datasets cross the CPU pain threshold. |
| **Later** (60+ days, conditional) | NeMo Guardrails, NIM microservices, cuGraph, Dynamo-Triton | Only if and when we deploy an LLM-assisted feature (Guardrails), a multi-model surface (NIM), or canon graphs exceed ~10K relationships (cuGraph). |
| **Reject** | NeMo Retriever, NVIDIA AI Enterprise (as dependency), cuML (in authority path), Riva, Morpheus, Omniverse, OpenUSD, Metropolis | Wrong domain, cost-prohibitive, or violates the deterministic core. |

---

## 3. Platform Mapping

| Tool | Mimir Labs component | Business value | Authority impact |
|---|---|---|---|
| **cuOpt** | Yggdrasil ERP — MRP, Manufacturing scheduling, Logistics routing | Differentiates ERP from incumbents (Epicor/Sage/Infor) — they ship rigid MRP; Yggdrasil ships constraint-aware optimization. Concrete sales hook. | None. Optimizer produces a *plan suggestion*; the OPE-governed state-constraint engine accepts/rejects per policy; operator confirms. |
| **NV-Ingest** | Norn (primary), Ratatosk (secondary) | Norn: extract contracts, LOIs, forms with layout fidelity. Ratatosk: accept paper data-dictionaries customers email as PDFs. | None. Output is parsed structured content; HITL review and Ratatosk's existing annotation workflow gate everything before canon. |
| **OCR NIM** | Norn, Ratatosk | Same as NV-Ingest; OCR is the upstream stage. | None. |
| **Triton** | Platform infrastructure (any served model) | One serving layer for every model ever deployed. Eliminates "we have three different model runtimes" problem before it starts. | Infrastructure-only; doesn't make decisions. |
| **cuDF** | Ratatosk (profiling), Ragnarok (bulk transforms) | Profile a 50M-row customer source in minutes instead of hours; transform a 100M-row migration in a single pass. | None. Same deterministic operations, faster substrate. |
| **cuVS** | Ratatosk (semantic similarity) | Surface "this column probably means X" candidates the dictionary alone misses. Tightens the workshop facilitator's job. | None. Vector match produces a **suggestion**; the workshop operator approves into the manifest. |

---

## 4. Architecture Notes — Where each tool sits

```
┌──────────────────────────── Mimir Labs core (deterministic) ────────────────────────────┐
│                                                                                          │
│   Ratatosk          Ragnarok          Bifrost           Jormungandr / OPE   Yggdrasil   │
│   manifests         migrations        live sync         policy enforcement  state machine│
│                                                                                          │
└────────────┬────────────┬────────────┬────────────────────────┬────────────┬────────────┘
             │            │            │                        │            │
             ▼            ▼            ▼                        ▼            ▼
       ┌──────────────────────┐                          ┌─────────────────────────┐
       │  AI-assist boundary  │                          │  Optimizer boundary     │
       │  (suggestion only)   │                          │  (suggestion only)      │
       └──────────────────────┘                          └─────────────────────────┘
             │            │            │                                       │
             ▼            ▼            ▼                                       ▼
       NV-Ingest      cuDF      [Bifrost: CPU OK]                          cuOpt
       + OCR NIM      cuVS                                                  (served via
       (Triton)       (RAPIDS                                                Triton or
                       containers)                                           Python API)
```

- **NV-Ingest + OCR NIM** runs as containers, served via Triton or directly. Output is structured content → reviewed in Norn / Ratatosk → written to canon by **deterministic** code only after HITL approval.
- **cuDF** is library-level — used inside Ratatosk's profiler and Ragnarok's bulk transformer. Same deterministic logic, GPU-accelerated.
- **cuVS** runs as a similarity index — Ratatosk queries it for synonym/concept suggestions; suggestions become candidates the operator approves.
- **Triton** is infrastructure — every model hosted is registered here. Single audit surface.
- **cuOpt** runs as a service (or library); Yggdrasil's planner module calls it for a candidate plan. The OPE-governed state-constraint engine then accepts/rejects each work-order transition the plan implies.

**Never:**
- NVIDIA component writes to canonical tables directly.
- NVIDIA component issues an OPE Decision activation.
- NVIDIA component sets a Yggdrasil state transition.
- NVIDIA component emits a Jormungandr target_call without the compiled artifact spec.

---

## 5. POC Plan — smallest useful spike for each immediate/near-term tool

### POC-1: cuOpt against a real MRP scenario (immediate)
- **Spike:** Take an existing Yggdrasil work-order graph (BOMs, capacity calendars, MRP demand) for a sample tenant. Feed cuOpt with item demand + capacity + lead times. Compare its proposed work-order release schedule against the current MRP module's output on three metrics: total tardiness, capacity utilization, computation time.
- **Success:** cuOpt produces a feasible plan ≤2× MRP's runtime on a 200-item / 5-work-center scenario, with equal or better tardiness.
- **Infra:** One GPU workstation (existing dev box or a one-off rental). No production GPU server yet.
- **Effort:** 2-3 weeks.

### POC-2: NV-Ingest + OCR NIM on real Norn LOIs (immediate)
- **Spike:** Take 10 signed LOIs from the Norn pilot, run them through NV-Ingest + OCR NIM, extract party names, dates, monetary terms, contract clauses. Compare extracted-vs-actual on a 10-field rubric.
- **Success:** ≥90% field-accuracy on structured fields (parties, dates, dollar amounts); clause extraction good enough for a reviewer to confirm in <30 seconds per document.
- **Infra:** One GPU workstation; OCR NIM container.
- **Effort:** 1-2 weeks.

### POC-3: Triton with a single hosted model (near-term)
- **Spike:** Stand up Triton serving one model (the OCR NIM from POC-2, or a small sentence-embedding model for cuVS). Wire it to NV-Ingest. Validate the operator surface: model registry, request/response logging, version pin.
- **Success:** A model swap (e.g. OCR model version v1 → v2) takes <15 minutes and produces an audit trail.
- **Infra:** Same GPU workstation; Triton container.
- **Effort:** 1 week, after POC-2.

### POC-4: cuDF in Ratatosk profiler (near-term)
- **Spike:** Profile a 20-million-row source table (synthetic or pilot data) using the current Ratatosk profiler vs a cuDF-backed version. Measure wall time, memory, identical-output diff.
- **Success:** ≥10× speedup; byte-identical profiling output.
- **Infra:** Same GPU workstation.
- **Effort:** 1 week.

### POC-5: cuVS for Ratatosk synonym augmentation (near-term)
- **Spike:** Build a small embedding index (768-dim, ~10K canonical column names) using cuVS. Query for new source columns; surface top-5 similarity matches alongside the current Levenshtein/synonym candidates. Measure operator-acceptance lift in a one-day workshop simulation.
- **Success:** Operator confirms a non-trivial number of matches the dictionary missed; zero matches inserted into canon without HITL approval.
- **Infra:** Same GPU workstation; cuVS via RAPIDS container.
- **Effort:** 2 weeks.

---

## 6. Epic / Story Breakdown — implementation-planning ready

### Epic: NVIDIA-1 — cuOpt-backed MRP optimizer
- NVIDIA-1.1: cuOpt POC scenario harness (load real BOM/capacity/demand from Yggdrasil DB → cuOpt format)
- NVIDIA-1.2: cuOpt service wrapper (Python service, gRPC or HTTP, dockerized)
- NVIDIA-1.3: Yggdrasil MRP service: call cuOpt for plan candidates, render in MRP UI
- NVIDIA-1.4: Plan-acceptance flow: operator confirms candidate; State Constraint Engine processes each implied work-order transition
- NVIDIA-1.5: Audit trail: every cuOpt-generated plan logged with input snapshot + model version + operator approval
- NVIDIA-1.6: Fallback to existing MRP when cuOpt service unavailable

### Epic: NVIDIA-2 — Norn document extraction pipeline
- NVIDIA-2.1: NV-Ingest container deployment in Mimir Labs VPS (or workstation initially)
- NVIDIA-2.2: OCR NIM integration as the OCR stage of NV-Ingest
- NVIDIA-2.3: Norn ingestion route: accept PDF/DOCX/image → NV-Ingest → structured payload
- NVIDIA-2.4: Field-extraction templates for LOIs / contracts / standard forms
- NVIDIA-2.5: Reviewer UI: parsed-field-vs-source-document side-by-side with accept/reject per field
- NVIDIA-2.6: Norn audit: every extracted field carries source-region + model + reviewer approval

### Epic: NVIDIA-3 — Triton platform infrastructure
- NVIDIA-3.1: Triton container deployment with one initial model
- NVIDIA-3.2: Model registry conventions (versioning, model_repository layout)
- NVIDIA-3.3: Request/response audit logging (input hash + output hash + latency + model version)
- NVIDIA-3.4: Operator surface for model lifecycle (deploy/promote/retire)
- NVIDIA-3.5: Triton fronting both OCR NIM and (later) embedding model for cuVS

### Epic: NVIDIA-4 — RAPIDS cuDF in profilers + bulk transforms
- NVIDIA-4.1: cuDF dependency added to Ratatosk profiler with feature flag
- NVIDIA-4.2: Profiler-output equivalence test (pandas vs cuDF, byte-identical aggregations)
- NVIDIA-4.3: Ragnarok bulk-transform path with cuDF backend (large-batch SQL→canonical migrations)
- NVIDIA-4.4: Operator setting: "use GPU acceleration when available" toggle per tenant
- NVIDIA-4.5: Graceful CPU fallback when no GPU present

### Epic: NVIDIA-5 — cuVS semantic-similarity assist in Ratatosk
- NVIDIA-5.1: Sentence-embedding model hosted in Triton
- NVIDIA-5.2: cuVS index built from Mimisbrunnr canonical column names + customer-extended canon
- NVIDIA-5.3: Ratatosk workshop UI: cuVS suggestions surfaced alongside dictionary candidates
- NVIDIA-5.4: Strict HITL gate — no cuVS suggestion writes to canon without operator confirm
- NVIDIA-5.5: Telemetry: track suggestion acceptance rate to tune model

---

## 7. Risk Register

| Risk | Severity | Mitigation |
|---|---|---|
| **Production-deployment dependency on NVIDIA AI Enterprise** | High | Verify each tool's commercial-deployment terms before commitment. Reject any tool whose production path mandates AIE. cuOpt is Apache 2.0 (safe); NIMs and NV-Ingest need close reading. |
| **GPU hardware cost / availability** | High | Mimir Labs VPS doesn't currently have a GPU. Either upgrade VPS, dedicate a workstation, or use cloud-burst (Lambda Labs / Vast / Coreweave hourly). Most realistic v1: workstation. |
| **Cloud-only NIMs** | High | Some NIMs ship as hosted-API by default. Self-hosted container path may require additional license or work. Confirm before each NIM commitment. |
| **Customer data leaving controlled environment** | High | AS9100/CMMC/ITAR customers can't ship data to NVIDIA's hosted endpoints. All NVIDIA components must be deployable inside the customer's compliance boundary. Locks to self-hosted. |
| **Model-output drift becomes operational truth** | Critical | Architectural rule: NVIDIA components never write to canonical tables, never close Jormungandr policy gates, never execute Yggdrasil state transitions without HITL approval. Enforce this in code review for every NVIDIA-touching commit. |
| **"AI in the loop" optics for governance customers** | Medium | Marketing positioning must be precise: *AI-assisted discovery* (Ratatosk suggestions) vs *governed operational truth* (Jormungandr/OPE/Yggdrasil decisions). The substrate essay already draws this line — extend that vocabulary to NVIDIA features. |
| **Complexity creep** | Medium | Five tools is enough. Re-evaluate before adding a sixth. Resist "let's add NeMo Retriever" instinct until a real customer asks for it. |
| **Distraction from core product** | Medium | NVIDIA work is sequenced after the current OPE/Jormungandr testing pass settles. Each POC has a 1-3 week box; if it exceeds, scope down or defer. |
| **Vendor lock to NVIDIA's stack** | Medium | cuDF interop is via standard pandas/Arrow; cuOpt is a portable solver call; OCR/NV-Ingest are containers. Each component has a CPU/open-source fallback. Avoid CUDA-specific data structures in Mimir Labs code. |
| **Model version reproducibility for audit** | Medium | Every audit-relevant model output (Norn extracted fields, Ratatosk cuVS suggestions, cuOpt plans) must record model_version + input_hash. Triton makes this routine; without Triton, custom audit. |

---

## 8. Recommended Sequencing — 30 / 60 / 90 days

### Days 0–30
- **POC-1 (cuOpt)**: complete the MRP scenario harness and head-to-head against current MRP module
- **POC-2 (NV-Ingest + OCR NIM)**: complete the 10-LOI extraction benchmark in Norn
- **Decision gate at day 30**: do POC results justify Phase 1 implementation? If both yes → commit to Epics NVIDIA-1 and NVIDIA-2.

### Days 31–60
- **Epic NVIDIA-2 (Norn document pipeline)**: ship the reviewer UI + NV-Ingest in the Norn pilot environment. This is the closest-to-customer demo.
- **POC-3 (Triton)**: stand up Triton with the OCR model from Epic NVIDIA-2; treat as infrastructure migration of an already-running model.
- **POC-4 (cuDF profiler)**: equivalence-test in Ratatosk on a real customer source-table sample.

### Days 61–90
- **Epic NVIDIA-1 (cuOpt MRP)**: deepest engineering — design the cuOpt → Yggdrasil planner integration, ship behind a tenant feature flag.
- **POC-5 (cuVS)**: build the semantic-similarity index for Ratatosk; run in a workshop alongside the dictionary path.
- **Decision gate at day 90**: which of cuOpt MRP, cuDF, cuVS are worth promoting to default-on for v1 customers? Defer Guardrails / NIM / cuGraph to follow-up planning.

### Critical sequencing rules
- **No Epic ships without POC pass.** POC results gate engineering commitment.
- **Triton lands once two or more models are hosted.** A single model doesn't justify Triton's operational complexity.
- **GPU hardware decision lands by day 45.** Either commit to a workstation, VPS upgrade, or cloud-burst pattern; do not let GPU access become an ongoing planning question.

---

## 9. Final Recommendation — Top 3 NVIDIA integrations

### 1. cuOpt → Yggdrasil ERP MRP / Scheduling / Logistics
**Why this is #1:** Strongest single business outcome on the entire list. Real differentiation against Epicor / Sage / Infor whose MRP modules are rigid waterfall calculations. cuOpt gives Yggdrasil a constraint-aware optimizer that mid-market manufacturers haven't seen at this price point. Apache 2.0 — no commercial-tier dependency.

**First milestone:** POC-1 produces a feasible work-order release plan for a 200-item / 5-work-center scenario that beats the current MRP module on tardiness, within 2× the runtime. From there, Epic NVIDIA-1 ships behind a feature flag.

### 2. NV-Ingest + OCR NIM → Norn document extraction
**Why this is #2:** Norn's first paying customers will arrive with PDF contracts and signed LOIs. The current Norn product can collect them but can't extract structured content. NV-Ingest + OCR NIM closes that gap cleanly — self-hostable, container-based, no AIE dependency. Plus it gives Ratatosk an optional "drop a PDF data dictionary" path that some customers will appreciate.

**First milestone:** POC-2 hits ≥90% field accuracy on structured fields (parties, dates, dollar amounts) on a 10-document benchmark.

### 3. Triton Inference Server → Platform infrastructure
**Why this is #3:** Adopting Triton early means every NVIDIA-served model in the platform reuses one serving stack, one audit surface, one operator playbook. Without it, the platform ends up running the OCR NIM in one place, an embedding model in another, and a cuOpt sidecar in a third — three serving conventions instead of one. Triton is Apache 2.0; the operational learning curve is real but one-time.

**First milestone:** Triton hosting the OCR model from Epic NVIDIA-2 with model version, request/response audit logging, and a 15-minute model swap rehearsal.

---

## Architectural commitment, restated

NVIDIA tooling **accelerates** ingestion, **extracts** content, **suggests** mappings, **optimizes** plans, and **profiles** at scale. It does not become the source of operational truth. The Mimir Labs canonical model is what the canon says; Jormungandr's enforcement boundary is what stays compiled into contracts; OPE's signed Decisions are the only authority that binds rules to runtime; Yggdrasil's state-constraint engine is the only thing that decides whether a state transition is legal. NVIDIA acceleration sits below all of those — never above, never inside, never instead.

If a future NVIDIA tool seems attractive, the first test is the one applied here: *does it write to the canon, close a policy gate, or change a state transition without HITL?* If yes, it's rejected on architecture grounds regardless of how compelling it looks. If no, it's evaluated on cost, hardware, licensing, and integration complexity using the framework above.

---

*Document version: v1.0 — 2026-05-13. Owner: Christopher Gaither.*
