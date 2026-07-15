# The Wrong Gate

*A system can be online, secure, integrated, and permissioned correctly and still fail to preserve what the business means. Most named ERP failures are symptoms seen at the business layer after the substrate already let the failure pass through. They look like people problems because the people who could see the technical root are watching a different gate.*

*Draft — May 2026. First in a series. Companion to [What the Builders Know](what-the-builders-know.md), [The Bookkeeper's Inheritance](the-bookkeepers-inheritance.md), and [Precision Belongs in the Substrate](precision-belongs-in-the-substrate.md).*

---

When an ERP fails, the post-mortem reaches for a familiar vocabulary. Poor governance. Dirty data. Weak change management. Users who would not adopt it. Scope creep. Conflicting reports. The list is stable across decades and across vendors, and the items share a quiet property: they are the places the failure first becomes visible to an executive, not the places the failure began.

The sharper claim is not that ERP failure is technical rather than organizational. It is that most named causes are symptoms observed at the business layer after a technical substrate allowed the failure to pass through. A system can be up, secure, integrated, and correctly permissioned while quietly failing to preserve what the business actually means. By the time anyone in leadership notices, people have already been compensating for the gap for months, and the compensation is what gets seen. So the failure arrives wearing the costume of a people problem.

Not every ERP problem starts as a people problem. Some do. But many start as representational failures that the organization only discovers after its people have been forced to work around them, and the reason the technical root never gets named is structural: the people who operate the system are watching the wrong gate.

## Who is actually in the IT department

Picture the team that keeps an enterprise system running. In most organizations it is not staffed with software architects, data engineers, or people who think in schemas and state machines. It is staffed with network administrators and information-security professionals, and they are good at their jobs. Their jobs are service and security.

The network administrator watches uptime, latency, throughput, disk, packet loss, failover. The security professional watches permissions, patch levels, access logs, intrusion attempts, privilege grants. Between them they can tell leadership, to the decimal, whether the system is *available* and whether it is *secure*. Those are real questions and they answer them well.

Neither of them is paid to ask whether the system's representation of the business is coherent. "Customer" could be defined three incompatible ways across three modules and not a single instrument on their panel would twitch. The query returned. The table is up. The caller had permission. Green, green, green.

## The gate is built for a different threat

Think of the controls an IT department runs as a gate. The gate checks two things: is the traffic authorized, and is the system healthy. A request arrives with valid credentials and a role that permits the action, and the gate opens. The action completes without an outage, and the gate logs success. This is exactly the right gate for the threats it was built to stop: intruders, outages, breaches. It validates access. It does not validate meaning.

It is the wrong gate for the threats that actually kill an ERP, which are semantic and authoritative. A column whose name and function conflict with another that means almost the same thing. A state change whose authority sits with the wrong operational role. A privileged write path used precisely as permitted and entirely inappropriately. A "valid" record missing the provenance a decision will later need. None of these is an availability problem and none is a breach, so every one of them sails through, because the gate was never designed to ask the questions that would catch them.

The security gate asks whether a role is assigned and being used. It can answer yes. It cannot ask the only question that matters next: *should* this role hold the authority to make this change, and is the privileged path being used for the purpose it was granted? "A role is assigned and it is being utilized" is a true sentence that can describe a catastrophe in progress. The gate sees access and uptime. It is blind to legitimacy and meaning.

## Marching the causes back to their roots

Take the standard list and walk each item back. The pattern is identical every time. There is a technical root. The root trips no instrument the operators watch, so it never surfaces internally. The fix that does get applied targets the symptom, suppresses it for about a quarter, and then fails as the untouched root resumes its work.

**"Dirty data."** Root: an incomplete schema, weak validation at ingress, missing provenance, and under-modeled states, so the same business noun is captured differently in different places and nothing refuses an ambiguous write. It does not surface, because IT sees valid fields and clean access, not missing operational truth. The remediation is a cleansing project, and it dies because it fixes the values that exist on the day of the cleanse without fixing the structure that keeps producing them. You cleaned the output of a process you left running.

**"Poor governance."** Root: governance exists as policy and documentation, not as runtime authority the schema enforces. It does not surface, because owners are assigned and definitions are written down; what is missing is enforceability, and no instrument measures the gap between a documented rule and an enforced one. The remediation is a stewardship committee and a new policy, and it dies because none of it touches the substrate. Discipline holds while attention holds, and attention always lapses.

**"Change resistance."** Root: users are resisting representational loss, not change. The system cannot hold part of what they know, so they keep that part outside it and enter the closest legal value. It does not surface, because the workarounds look like behavior problems and adoption metrics (logins, tickets, training completion) stay green. The remediation is more training, and it dies because it raises compliance until real operational pressure returns, at which point people go back to protecting the truth the system cannot store.

**"Bad process."** Root: the real process depends on exceptions the ERP cannot model, and the implementation captured the happy path. It does not surface, because the mapped workflow demos cleanly and the exceptions are precisely the cases nobody modeled. The remediation is a workflow redesign, and it dies the moment the exceptions return, because the new design is another happy path drawn around the same blind spot.

**"Weak requirements."** Root: requirements were collected as features rather than as operational invariants, so the system was specified by what it should do on screen, not by what must always remain true about the business. It does not surface, because requirements documents test for features, not for semantic sufficiency. The remediation is more rigorous UAT, and it dies because UAT passes the scripted scenarios and reality, within a quarter, exceeds the script.

**"Conflicting reports."** Root: conflicting entity definitions, grains, joins, and ownership logic, so two correct queries return two different numbers and both are right. It does not surface, because BI shows conflicting outputs, not the conflicting ontology underneath them, and disagreement is not an error any tool raises. The remediation is a "single source of truth" dashboard that silently picks one definition, and it dies the moment a source changes, because it reconciled the symptom without resolving or enforcing which definition was correct.

**"Integration failure."** Root: systems exchange fields without a shared operational meaning, so each integration is a pairwise translation that is correct on the day it is written and diverges when either side changes. It does not surface, because the endpoint returns success and packets move on schedule; whether meaning survived the hop is unmeasured. The remediation is to rebuild the integration or add middleware, and it dies because the replacement is the same pairwise translation with the same flaw, re-diverging on the same schedule.

**"Security and permission problems."** Root: RBAC controls access, not valid authority over a state transition, so the wrong role can legally change a state and a privileged path can be used outside its intent without ever exceeding its grant. It does not surface, because IT can see role usage but not role legitimacy. The remediation is a permission audit, and it dies because it corrects who is assigned what, never whether that assignment carries the right operational authority.

**"Customization sprawl."** Root: custom fields and logic bypass the canon, each one a new surface that was never defined canonically, secured against misuse, or mapped to the correct authority. It does not surface, because each customization looks like sensible local optimization and ships as a closed ticket. The remediation is to freeze or re-implement, and it dies because customization solved a real local gap while multiplying global ambiguity, and the misfit that drove it is unchanged.

**"Data migration failure."** Root: the source and target systems do not share an ontology, so the migration moves values that are type-valid and mapping-valid and meaning-broken. It does not surface, because migration tools validate types and mappings, which is what they are built to check. The remediation is to re-run the cutover with cleaner mappings, and it dies because the cutover works until the business meaning of the migrated data is actually tested in operation.

**"Executive misalignment."** Root: business objectives were never translated into enforceable definitions and constraints, so leadership's intent lives in slides while the system enforces something else. It does not surface, because leadership sees competing reports, not the substrate failure producing them. The remediation is an alignment workshop, and it dies because alignment in a room does not survive contact with ambiguous records, which is where decisions actually get made.

**"We failed the audit."** Root: the audit trail is partial because privileged and bulk paths bypass it, state changes are not gated so the system cannot prove which transition was legal, and authority is not carried by the system so it cannot show who was allowed to act. This one usually surfaces first, but notice who raises it: not IT, but an external auditor asking the system to prove something it was never built to prove. The internal stack was green the entire time. The remediation is compensating manual controls and a human attestation, and it holds exactly as long as that person stays and remembers.

## Every fix works for a quarter

Notice the shape that repeats. Each remediation suppresses the visible symptom and leaves the technical root in place, so the root resumes producing symptoms at its natural rate. The interval between the fix and the relapse is not random. It is the half-life of the root: the time it takes the unaddressed cause to throw off the next symptom large enough to trip an instrument someone is watching.

This is why the testimonials are always real and always temporary. The cleansing project did clean the data. The committee did tighten things, for a while. The training did raise adoption scores, that quarter. Nobody lied. They treated a symptom, and a treated symptom recurs. "It worked and then it fell apart in about ninety days" is not a story about a bad vendor or a lazy team. It is the diagnostic signature of a fix aimed one layer too high.

## The flag that fires is never the cause

By the time anything reaches an executive, it has passed through the only gate the organization instruments, and that gate is blind to the actual failure. So what leadership sees is never the root. It is the first downstream symptom that tripped a service or security threshold, or the first outside party, an auditor, a regulator, a furious customer, who asked a question the internal stack never asks.

That is where the blame lands, because that is the first place anyone pointed. The reporting team gets blamed for the numbers. The change-management consultant gets blamed for adoption. The data team gets blamed for the dirt. Everyone is blamed for a symptom, and the cause, which is structural and several layers below anyone's instrument panel, is never named, because no one in the building is positioned to name it. The vendor's monitoring is no help: it is built around the same uptime and access guarantees, and the vendor's support organization is staffed and instrumented just like the customer's IT department. The blindness is industry-wide and structural, not personal. An entire profession is watching a gate that cannot see the thing that is failing, and reporting, accurately, that everything is fine.

## What it would take to see it

You cannot fix a class of failure your instruments cannot detect. The answer is not better people in the IT department; they are doing a necessary job well. The answer is to instrument the substrate for the things that actually fail, and to put a gate in front of them.

That means a second gate, behind the security gate, that asks the questions the security gate cannot. Does this term mean one thing, enforced, everywhere it appears? Is this state change legal, not merely permitted? Does the authority to make it sit with the role that should hold it, and is the privileged path being used for its granted purpose? Does this record carry the provenance a later decision will need? Is every change recorded in a form that can be replayed and proven? None of these is a service question and none is a security question. They are semantic and authority questions, and until something watches them, the security gate keeps flashing green over a floor that is quietly giving way.

This is the work Mimir Labs is built around. Ratatosk is the diagnostic that surfaces these technical roots before they get mislabeled as governance, adoption, change, or reporting problems: it reads the existing substrate and shows you the conflicting definitions, the ambiguous ownership, and the under-modeled states for what they are. Operational Policy Enforcement is the gate that checks legitimacy rather than mere access, refusing the illegitimate transition before it commits. Jormungandr extends that enforcement to the systems you cannot replace. The architecture is downstream of the point. The point is that the failure was technical before it was organizational, and the reason you never heard that is that the only people who could see it were watching a different gate.

This essay sets the frame. The pieces that follow take each cause in turn and run it through the same sequence: what they call it, what they are actually seeing, the technical root, why the people in the building do not surface it, why the standard fix lasts about ninety days, and what would have to be enforced instead.

Every light was green. That was the problem.

---

## Sources

The recurring failure-rate figures referenced across this series (a majority of ERP implementations exceeding budget or missing intended scope) are documented in Panorama Consulting's annual *ERP Report* and the Standish Group's *CHAOS* data. The point of this essay is not the rate. It is the reason the rate is misattributed every time it is measured.
