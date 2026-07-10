# We Keep Perfecting the Sledge

*Enterprise software has spent thirty years making it less painful to force a business into an application that was never shaped to hold it. Your business rules are not code you customize. They are data. That distinction is the whole argument.*

*Draft — July 2026.*

---

Everyone assumes ERP has to be painful.

The assumption runs deeper than any particular product. It is that a company's ability to express its own operational reality is capped by two levers: how much it will spend customizing the application layer, and how much it will bend its processes to fit what the system can already say. Reality on one side, software on the other, a gap between them, and the gap is yours to pay for. That is just how enterprise software works. Everyone knows it.

Everyone has known a lot of things.

For most of human history, moving something heavy meant carrying it. Then someone dragged it on a sledge, and carrying by hand stopped being a fact and became a choice. The wagon put the load on wheels. The automobile did something stranger than either: it stopped asking the traveler to supply the power. The boat left the ground; the airplane left it in a way the boat never could. Muscle to orbit, and at no rung did the next leap arrive by making the previous method more efficient.

That is the part worth sitting with. A wagon is not a better sledge. A car is not a faster wagon. Each advance rejected an assumption the last one had quietly accepted. The sledge and the wagon both take for granted that you move the load. The automobile rejects that you supply the power. The airplane rejects that you touch the ground. None of these came from optimizing the accepted method. They came from noticing which part of the method was never actually load-bearing.

And every time, a whole world had already been built around the old way. Jobs were defined by it. Guilds and schools formed around its skills. The labor of keeping it running was institutionalized, its practice industrialized, its experts credentialed. The people who had mastered the sledge were, by every reasonable measure, the experts in moving heavy things. They were also, without knowing it, the last generation for whom that mastery was the point.

Enterprise software has its sledge, and we have spent thirty years perfecting it.

Look at where the industry's effort has gone. Faster implementations. Low-code platforms. "Configuration, not customization." Pre-built industry templates. Armies of consultants who can stand up a deployment in months instead of years. All of it is real progress, and all of it is aimed at the same thing: making it less painful to force a business's reality into an application that was never shaped to hold it. We have gotten remarkably good at carrying the load by hand. Better straps, better technique, better posture. We have not questioned the carrying.

Here is the carrying, stated plainly. Every company that buys an ERP is handed a binary. Either bend the software to your reality, which means customization, and customization means cost, upgrade debt, and a system that grows more brittle with every exception you encode. Or bend your reality to the software, which means changing the processes that actually made you good at what you do, flattening the operational nuance into whatever the vendor happened to anticipate. Most companies do some of both, badly, forever. And the whole time, the premise underneath goes unquestioned: that operational reality is something you express by modifying the application.

Consider a rule a real manufacturer might live by. Purchase orders above fifty thousand dollars, to a supplier the company has never worked with, in a jurisdiction under export scrutiny, require a compliance sign-off before they can be released. That is not exotic. It is exactly the kind of thing a competent operator carries in their head. Ask an ERP to enforce it and you are back at the binary. You pay to customize the approval engine, and you pay again on every upgrade to keep the customization alive. Or you give up, drop the rule into a spreadsheet and a hallway norm, and hope the person who knows it never leaves. The reality was expressible all along. The system just had nowhere to put it except the application layer or a human's memory.

So here is the question the category has never really asked. Why does operational reality have to live in the application at all?

It doesn't. That is the assumption that was never load-bearing. We have been treating the rules of a business as code: application logic, written and customized and rewritten the way you'd modify a program. But the rules of what a company allows to happen, and who is allowed to make it happen, are not code. They are data. They belong in the data layer, declared as governed policy the engine enforces directly, authored and versioned and signed, applied at the moment of action, without touching the application you would otherwise customize and without contorting the processes you would otherwise abandon. Reality stops being a gap you pay to close. It becomes something the system holds natively, because you told it the truth once, in a form built to receive it.

This is not a better sledge. It does not make customization faster or implementations cheaper. It removes the reason most of that work existed.

That is what we are building at Mimir Labs. Yggdrasil ERP treats operational canon as data, not code: the rules that govern how records move through the business are declared, versioned, and signed in the data layer, and enforced by the engine at the moment of action, not reconstructed afterward in a report or bolted on through a consulting engagement. The expressiveness of the system stops being a function of how much you are willing to customize or conform. It becomes a function of how honestly you can describe how your business actually works. Which, it turns out, most operators can do in an afternoon, once something is finally listening.

Everyone assumes ERP has to be painful. So did everyone who ever carried a load by hand.
