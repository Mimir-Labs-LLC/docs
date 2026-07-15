# FIGURE SKETCHES — Provisional: Deterministic Policy Enforcement at Database State Transitions

**DRAFT — conceptual block diagrams for patent-counsel / draftsperson review.**
Reference numerals match the Detailed Description of the provisional specification.
A patent draftsperson should formalize these into compliant line drawings
(37 CFR § 1.84); informal drawings are acceptable for a provisional filing.

---

## FIG. 1 — System architecture (100)

```
                    +-------------------------------------+
                    |  POLICY AUTHORING INTERFACE  110    |
                    |  Decision: authority citation,      |
                    |  required signers, phase, premises  |
                    +------------------+------------------+
                                       | activate
                                       v
                    +-------------------------------------+
                    |          COMPILER  120              |
                    |  Decision --> state-transition      |
                    |  constraint(s) + artifacts          |
                    +------------------+------------------+
                                       v
                    +-------------------------------------+
                    |       CONSTRAINT STORE  130         |
                    |  constraints keyed to entity type + |
                    |  transition; reference the Decision |
                    +------------------+------------------+
                                       | retrieve
   record transition                  v                      invoke
   (pre-commit)     +-----------------------------+  ------------------>  +--------------------------+
   --------------> |     TRANSITION GATE  140     |                      |  EVALUATION ENGINE  150   |
                    |  intercepts BEFORE commit   | <------------------  |  deterministic evaluate  |
                    +------+---------------+------+       outcome         +------------+-------------+
              permit |               deny |                                           | reads records
                     v                    v                                           v
             +---------------+   +------------------+                    +--------------------------+
             |  COMMIT  160  |   |  DENY 160 +      |                    |  RELATIONAL DATABASE 195 |
             +-------+-------+   |  explanation     |                    |  records + related recs  |
                     | write     +------------------+                    +------------+-------------+
                     v                                                                | off-path read
        +-----------------------------+                          +--------------------v-----------------+
        | APPEND-ONLY EVAL LOG  170   |                          |  PREMISE-MONITORING OBSERVER  180    |
        | immutable: Decision, record,|                          |  re-evaluates declared premises      |
        | outcome, actor, correlation |                          |  vs. live state --> residuals (FIG.5)|
        | (intent) identifier         |                          +--------------------------------------+
        +-----------------------------+

        +--------------------------------+
        |  SCHEMA-BINDING SUBSYSTEM  190 |  supplies binding manifest to 120 / 140 / 150  (see FIG. 6)
        +--------------------------------+
```
*FIG. 1 depicts a policy-enforcement system 100 in which authored Decisions are
compiled (120) into constraints (130) enforced at a transition gate (140) by a
deterministic engine (150), logged immutably (170), with an off-path premise
observer (180) and a schema-binding subsystem (190) over a relational database (195).*

---

## FIG. 2 — Decision lifecycle (state diagram)

```
                                    sign 210            activate + compile 220
   +--------+     +-------------+   ----------->  +--------+   -------------->  +--------+
   | DRAFT  | --> | IN-REVIEW   |                 | SIGNED |                    | ACTIVE |
   +--------+     +-------------+                 +--------+                    +---+----+
                                                                                   |
                                       +-------------------+-------------------+----+
                                       v                   v                   v
                                 +-----------+       +-----------+       +-------------+
                                 | SUSPENDED |       |  EXPIRED  |       | SUPERSEDED  |
                                 +-----+-----+       +-----------+       +-------------+
                                       | reactivate
                                       +----------------------> (ACTIVE)
```
*FIG. 2 depicts the lifecycle of a Decision; compiled constraints (FIG. 1, 130)
exist only while the Decision is ACTIVE and change only through this lifecycle.*

---

## FIG. 3 — Composite-predicate structure

```
                              +-----------+
                              |   AND     |   (root boolean node)
                              +-----+-----+
              +---------------------+----------+--------------------+
              v                     v          v                    v
       +-------------+        +-----------+  +------------------+  +----------------------+
       | LEAF        |        |    OR     |  | JOIN-PATH LEAF   |  | CLASSIFICATION-      |
       | field op    |        +-----+-----+  | 310             |  | MEMBERSHIP LEAF 320  |
       | value       |         +----+----+   | follow FK on    |  | record carries       |
       +-------------+         v         v   | focal record to |  | code C in scheme S   |
                          +------+   +------+| parent P; read  |  +----------------------+
                          | LEAF |   | NOT  || field X on P    |
                          +------+   +--+---+|                 |
                                        v    +------------------+
                                    +------+
                                    | LEAF |
                                    +------+
```
*FIG. 3 depicts a composite predicate: boolean nodes (AND/OR/NOT) over typed leaf
operators, including a leaf 310 that reads a field of a related record via a
join-path traversal, and a leaf 320 testing governed-classification membership.*

---

## FIG. 4 — Transition-time evaluation flow

```
   +--------------------------------------------+
   | 405  Intercept transition (pre-commit)     |
   +---------------------+----------------------+
                         v
   +--------------------------------------------+
   | 410  Retrieve applicable constraints for   |
   |      entity type + transition              |
   +---------------------+----------------------+
                         v
   +--------------------------------------------+
   | 420  Invoke deterministic evaluation engine|
   +---------------------+----------------------+
                         v
   +--------------------------------------------+
   | 430  Evaluate composite predicate vs.      |
   |      record, related records (join-path),  |
   |      request context                       |
   +---------------------+----------------------+
                         v
   +--------------------------------------------+
   | 440  Derive outcome + deterministic        |
   |      explanation                           |
   +---------------------+----------------------+
                         v
   +--------------------------------------------+
   | 450  Write immutable evaluation record to  |
   |      append-only log                       |
   +---------------------+----------------------+
                         v
                  < all constraints permit? >
                    |                    |
                yes |                    | no
                    v                    v
          +------------------+   +---------------------------+
          | 460  COMMIT      |   | 460  DENY + explanation   |
          +------------------+   +---------------------------+
```
*FIG. 4 depicts evaluation occurring at the transition boundary, before commit, so
a state change cannot bypass the governing policy by decomposition into steps.*

---

## FIG. 5 — Premise-monitoring sweep (off enforcement path)

```
   +--------------------------------------------+
   | 505  Sweep active Decisions' declared      | <---------------+
   |      premises (off enforcement path)       |                 |
   +---------------------+----------------------+                 | next premise
                         v                                        |
   +--------------------------------------------+                 |
   | 520  Evaluate watch condition (READ-ONLY)  |                 |
   |      vs. live database state               |                 |
   +---------------------+----------------------+                 |
                         v                                        |
   +--------------------------------------------+                 |
   | 530  Compare result to expected value      |                 |
   +---------------------+----------------------+                 |
                         v                                        |
                  < 540  diverges? > ------- no ------------------+
                         | yes                                    |
                         v                                        |
   +--------------------------------------------+                 |
   | 550  Record premise residual               |                 |
   |      (rule still PASSES; premise no longer |                 |
   |      holds) -- does NOT block any action   |                 |
   +---------------------+----------------------+                 |
                         v                                        |
   +--------------------------------------------+                 |
   | 560  Route per drift-response              | ----------------+
   |      (notify owner / flag for review)      |
   +--------------------------------------------+
```
*FIG. 5 depicts detection of the failure class in which an enforced rule continues
to pass while its declared premise has ceased to hold; the observer surfaces, and
never blocks.*

---

## FIG. 6 — Declarative binding manifest + load-time validation

```
   +----------------------------------------------+
   | 605  DECLARATIVE BINDING MANIFEST            |
   |  per governed entity type:                   |
   |    - physical table                          |
   |    - primary-key column                      |
   |    - status / state column                   |
   |    - scope column (optional)                 |
   |    - extension column (optional)             |
   |    - relationships (FKs) + reached types     |
   +----------------------+-----------------------+
                          v
   +----------------------------------------------+
   | 620  VALIDATOR: resolve each mapping against |
   |      the target database schema              |
   +----------------------+-----------------------+
                          v
                  < 640  all resolve? >
                   |                  |
               yes |                  | no
                   v                  v
   +-----------------------------+   +------------------------------+
   | Activate enforcement:       |   | 650  Decline / LOAD-TIME     |
   | SCHEMA-INDEPENDENT KERNEL   |   | FAULT (converts a silent     |
   | (compiler 120, engine 150,  |   | runtime failure into an      |
   | log 170, observer 180) runs |   | explicit boot-time error)    |
   | over target schema via      |   +------------------------------+
   | the manifest                |
   +-----------------------------+
```
*FIG. 6 depicts the schema-independent kernel binding to an arbitrary target schema
solely through a declarative manifest, validated at load time; grafting onto a new
schema is authoring a manifest, not modifying the kernel.*

---

## FIG. 7 — Fail-mode posture resolution

```
   +--------------------------------------------+
   | 705  Evaluate constraint at transition     |
   +---------------------+----------------------+
                         v
                 < determination reached? >
                   |                     |
               yes |                     | no (indeterminate)
                   v                     v
          < predicate passes? >     < 720  fail mode? >
            |             |           |              |
        yes |          no |     closed|              | open
            v             v           v              v
       +--------+   < enforcement >  +------+   < justification >
       | PERMIT |      mode?         | DENY |      recorded?
       +--------+     |       |      +------+      |          |
              enforced|   advisory              yes|          | no
                      v       v                    v          v
                  +------+ +-------------+      +--------+  +------+
                  | DENY | | RECORD only |      | PERMIT |  | DENY |
                  +------+ +-------------+      +--------+  +------+

   730/740  DEFAULT POSTURE = ENFORCED + CLOSED
            (nothing fails open absent a recorded justification)
```
*FIG. 7 depicts per-Decision fail-mode posture: an enforcement mode (enforced vs.
advisory) and a fail mode (closed vs. open, the latter requiring a recorded
justification), defaulting to enforced-and-closed.*

---

### Notes for the draftsperson
- Reference numerals are consistent with the provisional's Detailed Description
  (§§1–8) and Brief Description of the Drawings.
- Decision diamonds `< ... >` denote branch points; boxes denote steps/components.
- FIGS. 4–7 are process flows; FIGS. 1–3 are structural. Formal figures should
  render these as standard black-and-white line drawings with the same numerals.
