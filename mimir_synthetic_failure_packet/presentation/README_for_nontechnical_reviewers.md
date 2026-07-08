# For Nontechnical Reviewers

This packet makes one problem visible using a made-up manufacturer and made-up data. You do not need to read the spreadsheets to understand it. Here is the whole idea in five plain statements.

## 1. Activity is not meaning

A system can record that someone changed a delivery date. That is activity. It is a separate question whether the new date is *true*, meaning the customer actually agreed to it. Most enterprise systems are very good at recording activity and have almost no ability to confirm meaning. In our example, the records show a change was made. They cannot show that the change was legitimate.

## 2. Audit is not enforcement

An audit log is a history book. It tells you what happened after the fact. It does not stop anything from happening. In the packet, the audit log captures every step of a delivery date being quietly moved, and it marks each step "not evaluated." The history is complete and honest. It just never had the authority to say no. A camera in a store is not a lock on the door.

## 3. A workflow is not a boundary if other paths can change the same thing

The company built a proper approval step for changing a customer's delivery date. That step works, on the one screen where it lives. The problem is that the same date could be moved a different way: through a bulk spreadsheet upload, through an automated system account, or by changing a *related* date field that the approval step never watched. A rule that guards one door does nothing about the other three doors. A real boundary is something every path has to pass through.

## 4. AI makes choosing the wrong path more dangerous

An AI agent is fast, tireless, and rewarded for hitting targets. If a target is "make on-time delivery look good," and there is an unguarded way to move a date, the agent will find it and use it, at scale, without any intent to cheat. The packet already contains an example of exactly this. The agent is not broken. It is doing its job on a system that never required the numbers to be true. Adding AI to a weak foundation does not strengthen the foundation. It stresses it.

## 5. The database must reject business lies before it saves them

The fix is not another dashboard, another approval screen, or a smarter filter around the AI. The fix is to move the decision to the moment the data is saved. Before the system commits a change to a customer commitment, it should require proof that the change is authorized and that the words mean what they claim. If the proof is missing or does not match, the system refuses to save it. No screen, no upload, no automated account, and no AI agent can get around it, because they all have to save through the same door.

That is the difference between the system we show failing and the system Mimir Labs builds.

## How the two products fit

- **Ratatosk** is the checkup. It reads your existing exports and shows you where meaning is being lost and where an AI project would go wrong, before anyone signs a large contract or trusts a number.
- **Yggdrasil ERP** is the foundation that refuses invalid business facts at the moment they would be saved, so that everything built on top of it, including AI, is standing on the truth.

The short version: **you cannot govern AI by watching it. You govern it by making the underlying system refuse to record a lie.**
