# PROVISIONAL PATENT APPLICATION

**DRAFT FOR PATENT-COUNSEL REVIEW — NOT FILED, NOT LEGAL ADVICE.**
This document is a working technical disclosure prepared to support a U.S.
provisional application under 35 U.S.C. § 111(b) / 37 CFR § 1.53(c). It is
confidential attorney work-product material once shared with counsel. See the
"Filing checklist & caveats" at the end before anything is submitted.

---

**Title of Invention:**
SYSTEM AND METHOD FOR DETERMINISTIC ENFORCEMENT OF AUTHORITY-BOUND POLICIES AT DATABASE STATE TRANSITIONS, WITH PREMISE-DRIFT MONITORING AND SCHEMA-AGNOSTIC BINDING

**Inventor(s):** Christopher A. Gaither (Harrisburg, Pennsylvania, USA) — *confirm full legal name and complete inventorship; see caveats.*

**Applicant / Intended Assignee:** Mimir Labs LLC, Harrisburg, Pennsylvania, USA

**Entity status (for fees):** Micro-entity claimed *(verify eligibility — see caveats).*

---

## CROSS-REFERENCE TO RELATED APPLICATIONS

None. *(If any earlier provisional or foreign priority exists, list here.)*

## FIELD OF THE INVENTION

The present disclosure relates to enterprise data systems and, more particularly,
to deterministic enforcement of governance policy at the point a data record
changes state in a relational database, to monitoring whether the real-world
premises underlying such policies remain true, and to applying such enforcement
across arbitrary database schemas.

## BACKGROUND

Operational and enterprise software systems continually change the state of the
records they hold: an order moves from *draft* to *approved*, a part from
*prototype* to *released*, a claim from *submitted* to *adjudicated*. Whether a
given change is permissible is governed by operational rules — spending
authorities, segregation of duties, regulatory constraints, and the like.

In conventional systems these rules are expressed as human-readable
documentation or are scattered through imperative application code. Enforcement
mechanisms available in the art address adjacent but distinct concerns:

- **Access control** (including role-based and attribute-based access control)
  determines *whether a principal may perform an operation*, but not whether the
  resulting *state change* is legitimate under a governed, authority-cited policy.
- **Database integrity constraints and triggers** enforce structural invariants
  (types, uniqueness, referential integrity) but are authored as low-level schema
  artifacts, are not bound to a signed governing decision, and do not carry an
  accountable authority record.
- **Business rules engines and workflow systems** evaluate rules, but typically
  outside the transactional state-change path and without deterministic, audited
  binding of each decision to a signed, authority-cited policy of record.

Three problems follow. First, a rule may be documented and "owned" yet not
actually *enforced* at the moment of the state change, so violations pass
silently. Second, a rule may continue to *pass* while the real-world condition
that justified it has ceased to be true — the policy's premise has drifted from
reality — and existing systems provide no mechanism to detect this class of
failure. Third, such enforcement is typically hard-wired to one system's schema
and cannot be applied to a different database without re-implementation.

There is a need for a system that enforces authority-bound governance policy
deterministically at the database state transition itself, that monitors the
continuing truth of each policy's declared premises, and that can be bound to an
arbitrary schema without re-implementation.

## SUMMARY

Disclosed are systems, methods, and non-transitory computer-readable media that
provide deterministic, authority-bound policy enforcement at database state
transitions. In embodiments:

1. A **policy decision** (Decision) is authored with an authority citation and a
   signing lifecycle, and is **compiled** into one or more machine-evaluable
   **state-transition constraints** bound to a specified entity type and
   transition.

2. At the moment a record of that entity type is transitioned, and **before the
   transition is committed**, a deterministic **evaluation engine** evaluates the
   compiled constraint(s) — expressed as a composite predicate supporting typed
   comparisons, boolean composition, relationship (join-path) traversal to fields
   on related records, and governed-classification membership tests — against the
   record and request context, and permits or denies the transition accordingly,
   writing an **append-only evaluation record** binding the outcome to the
   governing Decision and an intent identifier.

3. A **premise-monitoring** subsystem, operating off the enforcement path,
   re-evaluates one or more **declared premises** associated with a Decision
   against live database state and records a **residual** when a premise no longer
   holds even though the enforced rule still passes — surfacing, without blocking,
   the class of failure in which a rule remains satisfied but its real-world
   justification has become false.

4. A **schema-binding** subsystem consumes a **declarative binding manifest** that
   maps the engine's abstractions (entity type, primary key, relationships, scope
   column, extension column) onto the physical tables and columns of an arbitrary
   target schema, validated at load time, so that the same enforcement engine
   grafts onto different schemas without re-implementation.

Embodiments further provide a per-Decision **fail-mode posture** (enforced vs.
advisory; fail-closed vs. fail-open, the latter requiring a recorded
justification), a governed **classification primitive** whose assignments are
write-locked to a Decision, and a portable **policy bundle** for transferring
Decisions between systems idempotently.

These features constitute a specific improvement to the operation of a
database-backed system: legitimacy of a state change is evaluated deterministically
at the transaction boundary, the continuing validity of each policy's premises is
observed against live data, and the mechanism is portable across schemas.

## BRIEF DESCRIPTION OF THE DRAWINGS

*(Figures to be prepared by the inventor/counsel; described textually below so the
detailed description can reference them. Suggested figures:)*

- **FIG. 1** — System architecture: policy authoring (110) → compilation (120) →
  constraint store (130) → transition gate (140) invoking evaluation engine (150)
  → commit/deny (160) → append-only evaluation log (170); premise-monitoring
  observer (180); schema-binding subsystem (190).
- **FIG. 2** — Decision lifecycle state diagram (draft → in-review → signed →
  active → suspended/expired/superseded) with signing (210) and compilation (220).
- **FIG. 3** — Composite-predicate structure: boolean nodes (AND/OR/NOT) over leaf
  operators; a leaf referencing a field on a related record via a join-path (310);
  a governed-classification-membership leaf (320).
- **FIG. 4** — Transition-time evaluation flow (405–460).
- **FIG. 5** — Premise-monitoring sweep (505–560).
- **FIG. 6** — Declarative binding manifest and load-time validation (605–650).
- **FIG. 7** — Fail-mode posture resolution (705–740).

## DETAILED DESCRIPTION

*Reference numerals below are illustrative and correspond to the suggested figures.
The following describes embodiments; the invention is not limited to them.*

### 1. Overview (FIG. 1)

A policy-enforcement system 100 comprises a policy authoring interface 110, a
compiler 120, a constraint store 130, a transition gate 140, a deterministic
evaluation engine 150, an append-only evaluation log 170, a premise-monitoring
observer 180, and a schema-binding subsystem 190, operating over a relational
database 195 whose records represent entities that change state.

### 2. Authority-bound policy decisions and compilation (FIG. 2)

A **Decision** is a governing policy record authored via interface 110. A Decision
carries, in embodiments: a human-readable statement; an **authority citation** (a
reference to the source of authority for the policy, e.g., a board resolution or
regulatory clause); a **signing lifecycle** in which one or more required
signatories, identified by role and/or identity, cryptographically attest to the
Decision before it becomes active; validity dates; and a **phase** designation
(e.g., pre-gate, gate, post-gate, observer) indicating when in the transition the
Decision is evaluated.

Upon activation, compiler 120 **compiles** the Decision into one or more
machine-evaluable **artifacts**, including a **state-transition constraint** bound
to (a) an entity type and (b) a transition of that entity type. The compiled
constraint is stored in constraint store 130 with a reference to the governing
Decision, such that the constraint cannot be altered except through the Decision's
lifecycle. This binding provides an accountable, authority-cited chain from an
enforced constraint back to a signed Decision — distinguishing the compiled
constraint from an ordinary, ownerless database trigger or application rule.

### 3. The predicate grammar (FIG. 3)

A state-transition constraint expresses its condition as a **composite predicate**:
a tree of boolean nodes (AND, OR, NOT) whose leaves are **typed operators**
including, in embodiments, equality/inequality, membership (in/not-in), ordered
comparison (greater-than, less-than, between), existence/null tests, pattern match,
and quantifiers (any/all/none/count) over collections of related records.

In embodiments, a leaf may reference not only a field of the transitioning record
but a field of a **related record reached by a relationship traversal**, expressed
as a **join-path** 310. A join-path descends to child records (e.g.,
`child_table.foreign_key`, chained with a separator for multi-hop descent) or
ascends to a parent record via a foreign key held by the transitioning record
(e.g., a notation designating "follow foreign-key F on the focal record to parent
table P, then read field X"). This permits a policy governing one entity to
predicate on a governed field of a related entity — for example, a policy on a
sales order predicating on a credit-standing field of the related customer
account record.

In embodiments, a leaf may test **membership of the transitioning record in a
governed classification** 320 (described in §7), e.g., "the record carries code C
in scheme S."

The evaluation of the composite predicate is **deterministic**: given the same
record, related records, and request context, it yields the same result and the
same human-readable outcome/explanation, without reliance on any probabilistic or
machine-learned inference.

### 4. Deterministic evaluation at the transition, before commit (FIG. 4)

When a record of a governed entity type is transitioned, transition gate 140
intercepts the transition **before it is committed** (405). Gate 140 retrieves the
compiled state-transition constraints applicable to the entity type and transition
from store 130 (410) and invokes evaluation engine 150 (420).

Engine 150 evaluates each applicable composite predicate against the transitioning
record, any related records reached by join-paths, and the request context (430).
For each constraint, the engine determines a pass/fail/warn outcome and derives a
deterministic explanation (440). Engine 150 writes an **append-only evaluation
record** to log 170 (450) binding: the governing Decision; the entity and record
identifiers; the transition; the outcome; the explanation; an actor descriptor
(e.g., human, automated agent, integration, system); and a correlation
(intent) identifier associating the evaluation with the originating request. The
evaluation record is immutable.

If all applicable constraints permit the transition, gate 140 allows commit (460).
If a blocking constraint fails, gate 140 denies the transition prior to commit and
returns the deterministic explanation. Because evaluation occurs at the transition
boundary rather than on a declared plan or after the fact, a change cannot bypass
the governing policy by being decomposed into steps: each state change is itself
evaluated at commit time.

In embodiments, a compiled artifact may be associated with a **scope** limiting
the records to which it applies (§7), and an **exception** mechanism may waive a
specific record from a blocking constraint pursuant to a separately authorized,
scoped exception grant recorded against the governing Decision.

### 5. Fail-mode posture (FIG. 7)

Each Decision carries a **fail-mode posture** comprising an **enforcement mode**
(enforced or advisory) and a **fail mode** (closed or open). In the enforced mode
a failing blocking constraint denies the transition; in the advisory mode the
outcome is recorded without denying. The fail mode governs behavior when the
engine cannot reach a determination: fail-closed denies; fail-open permits. In
embodiments, a fail-open posture is permitted only when accompanied by a recorded
justification, and the default posture is enforced-and-closed, such that no
transition fails open absent a deliberate, recorded exception.

### 6. Premise-drift monitoring (FIG. 5)

A Decision may declare one or more **premises** — assertions about the state of the
world that justify the policy (e.g., "supplier X is approved because its
certification is valid"). Each declared premise comprises, in embodiments: a
human-readable assumption; a **watch condition** expressed in the same composite-
predicate grammar of §3; an expected truth value; an identification of the live
record(s) to observe; a drift-response designation; and optionally an owner and a
review cadence.

A premise-monitoring observer 180, operating **off the enforcement path** (i.e.,
not as part of any transition), performs a sweep (505) over the active Decisions'
declared premises. For each premise, observer 180 evaluates the watch condition
against the current live database state using the same deterministic evaluation
engine 150 in a read-only mode (520), and compares the result to the expected
value (530). Where the premise no longer holds (540), observer 180 records a
**premise residual** (550) — in embodiments, in the same store used for other
governance residuals, distinguished by a category discriminator — associating the
residual with the Decision, the observed record(s), and the divergence, and
routing it per the drift-response designation (e.g., notify an owner, flag for
review) (560).

Critically, the observer **surfaces** the divergence and **does not block** any
action, and it **does not itself decide business validity**: it reflects a
Decision's own declared premise against the enterprise's own live record and
records the contradiction for human disposition. This detects a class of failure —
a rule that continues to pass while the premise that justified it has become false
— not addressed by enforcement alone. The observer is complementary to and
distinct from any evaluation performed at the transition.

### 7. Governed classification and scope (referenced in §§3–4)

A **classification** subsystem maintains code schemes and codes, and assignments of
codes to records. A code scheme may be designated **governed**, in which case an
assignment of a governed code to a record is **write-locked to a Decision**: the
assignment cannot be revoked or altered except through the governing Decision's
lifecycle. In embodiments an assignment retains a decision-time snapshot enabling
detection of a "loosen-then-act" sequence in which a governing classification is
removed immediately prior to a transition. A Decision may declare a **scope** in
terms of governed classifications — an "applies-to" set and an "excepted" set —
which the compiler 120 folds into an applicability guard on the compiled
constraint, and which the predicate grammar of §3 can test via a
classification-membership leaf.

### 8. Schema-agnostic binding (FIG. 6)

To apply the foregoing to an arbitrary database schema without re-implementation,
schema-binding subsystem 190 consumes a **declarative binding manifest** 605. The
manifest maps, for each governed entity type, the engine's abstractions onto the
physical schema, including in embodiments: the physical table name; the primary-key
column; the status/state column; an optional scope column; an optional extension
column; and the relationships (foreign keys) available for join-path traversal,
together with the entity types they reach.

At load time, validator 620 verifies that each declared mapping resolves against
the target schema — that each named table, key, relationship, and column exists —
and refuses to activate enforcement for any unresolved mapping (640), converting
what would otherwise be a silent runtime failure into a load-time fault (650).
Because engine 150 reads all schema facts from the manifest rather than inferring
them (e.g., rather than assuming a naming convention), the same engine, compiler,
constraint model, evaluation log, and premise observer operate over a different
target schema by supplying a different manifest. In embodiments, the engine is
provided as a schema-independent kernel and the manifest constitutes the sole
schema-dependent binding, such that grafting onto a new schema is an act of
authoring a manifest rather than modifying the kernel.

### 9. Portable policy bundle (optional embodiment)

Decisions, their compiled artifacts, signers, evidence, and declared premises may
be serialized into a portable **policy bundle** for transfer between systems. On
import, an idempotent procedure keys on a policy identifier such that re-importing
the same bundle does not create duplicate Decisions, and conflicts are reported
against the identifier. This permits governance policies authored in one system to
be migrated into another that supplies its own binding manifest.

### 10. Deployment and generality

The foregoing subsystems may be embodied in a multi-tenant enterprise system, in a
single-tenant deployment (in which tenant scoping is omitted or fixed), or as a
schema-independent enforcement kernel grafted, via a binding manifest, onto a
purpose-built or third-party database in a regulated domain. The evaluation engine,
constraint model, evaluation log, and premise observer are, in embodiments,
independent of any particular business ontology or domain vocabulary; the governed
domain is supplied by the schema, the authored Decisions, and the manifest.

## ILLUSTRATIVE CLAIMS

*(A provisional application need not include claims; the following draft claims are
provided to anchor the scope the inventor intends to pursue and to support later
non-provisional claims. Counsel should refine, and in particular harden the
independent claims against 35 U.S.C. § 101 by emphasizing the specific technical
improvement to database/system operation.)*

**1.** A method comprising: storing a policy decision associated with an authority
citation and a signing lifecycle; compiling the policy decision into a
state-transition constraint bound to an entity type and a transition of the entity
type and referencing the policy decision; intercepting, before commit, a
transition of a record of the entity type; evaluating, by a deterministic
evaluation engine, a composite predicate of the state-transition constraint against
the record, against a field of a related record reached by a relationship
traversal specified by the constraint, and against request context; writing to an
append-only log an immutable evaluation record binding an outcome of the evaluation
to the policy decision, an identifier of the record, and a correlation identifier;
and permitting or denying commit of the transition in dependence on the outcome.

**2.** The method of claim 1, wherein the composite predicate comprises a boolean
composition of typed leaf operators, at least one leaf operator testing membership
of the record in a governed classification.

**3.** The method of claim 1, wherein the relationship traversal is expressed as a
join-path that follows a foreign key held by the record to a parent record and
reads the field from the parent record.

**4.** The method of claim 1, further comprising associating with the policy
decision an enforcement mode and a fail mode, wherein a fail-open fail mode is
permitted only in association with a recorded justification, and a default posture
denies commit when the evaluation engine cannot reach a determination.

**5.** The method of claim 1, further comprising: storing, in association with the
policy decision, a declared premise comprising a watch condition and an expected
value; evaluating, by the deterministic evaluation engine in a read-only mode and
independently of any transition, the watch condition against live database state;
and, responsive to the watch condition diverging from the expected value while the
state-transition constraint continues to permit transitions, recording a residual
associated with the policy decision without denying any transition.

**6.** A method comprising: providing a schema-independent policy-enforcement
kernel; receiving a declarative binding manifest that maps, for an entity type, a
physical table, a primary-key column, and a relationship of a target database
schema; validating, at load time, that each mapping of the manifest resolves
against the target database schema and declining to activate enforcement for an
unresolved mapping; and enforcing, by the kernel using the manifest, a compiled
state-transition constraint over records of the target database schema at a
transition and before commit.

**7.** A system comprising one or more processors and memory storing instructions
that, when executed, cause the system to perform the method of any of claims 1–6.

**8.** A non-transitory computer-readable medium storing instructions that, when
executed by one or more processors, cause performance of the method of any of
claims 1–6.

*(Dependent claims to add in the non-provisional: signing by multiple required
role-bound signatories; the phase designation; the exception-grant waiver; the
decision-time classification snapshot and loosen-then-act detection; multi-hop and
quantifier predicates; the drift-response routing and review cadence; the portable
idempotent policy bundle; the append-only continuity properties of the evaluation
log.)*

## ABSTRACT

A policy-enforcement system compiles an authority-cited, signed policy decision
into a state-transition constraint bound to an entity type and transition of a
relational database, and evaluates the constraint deterministically at the moment a
record is transitioned, before commit, permitting or denying the transition and
writing an immutable evaluation record. A composite-predicate grammar supports
boolean composition, relationship (join-path) traversal to fields of related
records, and governed-classification membership. A premise-monitoring observer, off
the enforcement path, re-evaluates a policy's declared premises against live state
and records a residual when a premise no longer holds although the rule still
passes, without blocking. A declarative binding manifest, validated at load time,
maps the engine's abstractions onto an arbitrary target schema, allowing a
schema-independent kernel to graft onto different databases by supplying a manifest.

---

## FILING CHECKLIST & CAVEATS (for counsel / inventor — not part of the specification)

**This is a draft.** It is not filed, confers no rights until filed, and is not
legal advice. A registered patent practitioner should review before filing.

**To file the provisional (37 CFR 1.53(c)):**
1. **Cover sheet** — USPTO form SB/16 (Provisional Application for Patent Cover
   Sheet): title, inventor(s), applicant, correspondence, entity status.
2. **Specification** — the body above (Title through Abstract). Claims are optional
   for a provisional but included here for priority support.
3. **Drawings** — prepare FIGS. 1–7 (informal drawings are acceptable in a
   provisional; the descriptions above are written to support them).
4. **Fee** — provisional filing fee at the claimed entity rate (micro-entity is the
   lowest; verify the current USPTO fee schedule).
5. File via **Patent Center** (patentcenter.uspto.gov).

**Critical caveats to resolve before filing:**
- **Inventorship** is a legal determination: every natural person who contributed
  to the conception of a claimed invention must be named, and only such persons.
  Portions of this work were **AI-assisted**; under current USPTO guidance an AI
  cannot be a named inventor, and a natural person must have made a significant
  contribution to conception of each claim. Confirm named inventor(s) accordingly.
- **Prior disclosure / priority.** Public disclosures of these concepts (whitepapers,
  essays, website, posts) start the U.S. 12-month grace-period clock and may bar
  most foreign rights. Complete a **first-disclosure-date audit per component**
  before filing, and file before any further non-NDA disclosure.
- **Adjacent art.** U.S. 12,671,589 B1 (fail-closed permit-before-actuate gating for
  effector systems) is close *conceptually*; these draft claims are deliberately
  aimed at the database-state-transition, premise-drift, and schema-binding
  mechanics that it does **not** disclose. Counsel should confirm the framing and
  run a professional prior-art search around these three specific mechanics.
- **§101 (Alice).** Counsel should harden the independent claims to recite the
  concrete technical improvement to database/system operation (enforcement at the
  transaction boundary; load-time schema-binding validation; off-path deterministic
  premise re-evaluation), rather than an abstract governance idea implemented on a
  computer.
- **Scope decision within 12 months.** This provisional deliberately covers three
  related mechanics under one umbrella to lock a single priority date cheaply;
  decide within the 12-month window which to pursue as one or more non-provisionals.
