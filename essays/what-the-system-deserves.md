# What the System Deserves

*Every enterprise software arrangement is a three-way settlement: the vendor who sells the system, the integrator who installs it, and the customer who has to live inside it. Each party behaves rationally. The sum of their rational behavior is a system that lies about the business it was bought to represent. What follows is an accounting — of what each party has earned, and of what each party is owed.*

---

I want to be precise about the word *deserves*, because I mean both of its senses at once.

There is what you deserve as a verdict — the consequence you have earned. And there is what you deserve as a right — the standard of care you are owed. The enterprise software industry has spent forty years confusing the two: handing verdicts to the party that was owed care, and handing care to the parties that had earned a verdict. This essay is an attempt to sort them back out.

## What the incumbent vendors deserve

Let me grant the vendors what is fair before I take the rest.

They solved a real problem. In an era when the business questions that mattered were asked once a quarter and answered at month-end close, an architecture built for defensible, periodic record-keeping was not a mistake. It was correct for its purpose. The general ledger as the center of gravity, the period as the unit of time, the reconciliation as the ritual of truth — that was a reasonable design for a world that ran on paper and closed its books by candlelight. The vendors who built it deserve credit for that. I won't pretend otherwise.

Here is the charge.

The world stopped running on periodic close, and they did not change the architecture. They changed the marketing. A system designed to produce a defensible record *after the fact* was rebranded as a system that runs the business *as it happens* — and the gap between those two things, the gap I have elsewhere called operational distortion, was quietly reassigned to the customer as a "change management" problem. It is not a change management problem. It is an architectural one, and the people who designed the architecture know the difference.

They have had decades. They have had more capital than any software category in history. And with that time and that money they chose, overwhelmingly, to invest in switching costs rather than in truth. Proprietary schemas that make leaving expensive. Customization frameworks sold as flexibility that function as prisons — every custom field a hostage you pay ransom on through every upgrade, every integration, every audit. The euphemism "edge case" doing the heavy moral work of describing the architecture's refusal to model situations that are not edges at all, but the ordinary texture of how work actually happens.

The incumbent vendors do not deserve to be destroyed. That is not the verdict. The verdict is that they deserve to lose the thing they have never actually had to defend: the architectural monopoly. They deserve to compete on whether the system tells the truth, rather than on how much it costs to escape. Most of them have never had that competition in their lives. They have earned it.

## What the integrators and consultants deserve

This one requires more care, because the charge is against a *model*, not against the people inside it — and the people inside it are frequently excellent.

Let me grant that, too. The translation work is genuinely hard. Standing between a vendor's abstractions and a shop floor's reality, and making the two meet, takes real skill and real judgment. I have worked alongside implementers who understood a client's operation better than the client's own leadership did. The craft is real. I am not impugning the craft.

I am impugning the incentive.

The system integrator is paid by the hour, which means a clean, fast, faithful implementation is a bad quarter and a slow, complex, customization-laden one is a multi-year annuity. This is not a hidden conspiracy; it is just arithmetic, and arithmetic is more reliable than conspiracy. The model is paid to build the workarounds, and then paid again to maintain them. It is paid to translate the vendor's original lie into something the customer can survive, and paid a third time when the translation drifts. The shadow systems, the reconciliation spreadsheets, the approval matrices that live in a wiki and a prayer — these are not failures of the implementation. They are its metabolic product. They are what the model is *for*.

I hold a principle about this that I will not soften: a vendor that cannot deploy its own product without a third party does not actually understand what its product does. The dependence on an implementation army is not a sign of enterprise seriousness. It is a confession. It says the system is too far from the truth of the business to be installed by anyone who hasn't been trained to bridge the distance — and that distance, again, is the architecture, not the client.

The model deserves disruption. The annuity that depends on dysfunction deserves to end. And the good consultants — the ones whose talent is currently spent papering over an architecture's refusal to tell the truth — deserve better work than that. They deserve to be set loose on problems worth their judgment.

## What the customer deserves

I have saved the customer for last, and called them most important, and I mean it. But I will not flatter them, because the truth is the only thing I have to offer that the rest of the industry won't, and I am not going to start an essay about honesty by lying to the one party I most want to serve.

So, the hard part first.

The customer is complicit. They signed the statements of work. They approved the customizations they were warned about and chose anyway. They staffed the steering committees that optimized for nobody's career taking the blame instead of for the project being true. They learned to say "that's just how ERP works" and they taught it to the new hires, and in doing so they laundered an architectural failure into received wisdom. When a veteran no longer notices the workaround, the workaround has won, and someone let it win. Often that someone had a title and a budget and a choice.

I say this because the customer cannot be only a victim in a story they also authored. To treat them as purely sinned-against is its own kind of condescension — it assumes they had no agency, and they had plenty.

And now the part the industry will never say to them, because no one in the current arrangement is paid to.

The customer deserves software that tells the truth about their own operation. Not a defensible record assembled after the fact — a faithful representation of what is happening, as it happens, that does not require a spreadsheet and a binder to make it usable. They deserve to ask "who approved this, on whose authority, and what changed afterward" and to get the answer from the system in seconds, not reconstructed from email and Slack and tribal memory over three weeks. They deserve policy that the system actually enforces, authored by the people who own the policy, rather than living in a PDF the runtime has never read. They deserve audit as a substrate they stand on, not a feature they were upsold.

They deserve to govern their own canon without renting an army to do it. They deserve a vendor who is answerable to them — directly, without a partner channel to hide behind — for the model of truth being delivered. They deserve to not be gaslit about their own business by the very systems they bought to understand it.

Most of all, they deserve to stop being told that the distance between what they were promised and what they got is a measure of their own immaturity. It is not. It never was. It is the measure of a settlement that was never built in their interest, and they have paid for it twice — once in license, once in the consultants hired to survive the license — and they were told, the whole time, to be grateful.

## What is actually owed

There is one more party, and it is the one the title has been pointing at the whole time.

"The system" is not only the software. It is the business itself — the living, operating reality the software was supposed to represent. And that reality, the operational canon, deserves the simplest and most demanding thing on this list: to be represented faithfully. To have one authoritative account of how it is actually running, against which every department and every decision can be checked. Everything else in this essay — every verdict, every grievance, every grant of fairness — is downstream of whether that one obligation is met.

I am not, in the end, very interested in punishing the vendors or dismantling the consultants. The verdicts will arrive on their own once the care is finally delivered somewhere, because customers do not stay in a settlement built against them one day longer than a real alternative exists. I am interested in building the alternative. I am interested in delivering the thing the customer was always owed and never sold.

The system deserves the truth. So does everyone who has had to live inside it.

---

*May 2026. Companion essay: "The Operational Canon" (the architectural commitments that follow from the position taken here).*
