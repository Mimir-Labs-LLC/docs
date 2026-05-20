# Copypasta

A top-append log of LinkedIn comments, replies, and other shareable text Mimir Labs has deployed externally. Newest entries at the top; older entries get bumped down. This is the searchable record of what we've said publicly — easier to grep than LinkedIn's own comment history.

**Append convention:**
1. Add new entries directly under this header, above the existing top entry.
2. Use the entry template below — date, venue, context, source (if any), key setup facts, then the copy itself.
3. Don't edit older entries except to fix factual errors or typos. The log is a record of what was said when.
4. If a comment was deployed in two parts (LinkedIn's ~1,250-char limit), keep both parts in the same entry with clear "Comment 1 of 2" / "Comment 2 of 2" labels and a posting-order note.

**Entry template:**

```
## [YYYY-MM-DD] [Venue] — [Recipient/audience], [topic]

**Context:** [What prompted this — who posted, what they said, any tag.]
**Source:** [URL of the post/article being responded to, if applicable.]
**Key setup facts:** [Anything worth remembering when delivering or revising — stats, quotes from the source, related positioning we leaned on.]
**Posting note:** [If multi-part, how to sequence. Otherwise skip.]

### [Comment text or section header]

[Copy text, ready to paste.]
```

---

## 2026-05-13 — LinkedIn, Bob Turek IBM 2026 CEO Study post

**Context:** Bob Turek shared Jen Colletta's HR Executive piece on IBM's 2026 CEO Study, tagging Chris Gaither and Dr. James A. Robertson by name. Bob's read: IBM identifies real symptoms (rewiring C-suite, authority distribution, clarity, cross-functional teamwork) but completely misses data architecture and governance.

**Source:** https://hrexecutive.com/ibm-ceos-have-a-new-top-priority-and-hr-is-key/

**Key setup facts:**
- Productivity moved from 4th priority (2024) → 2nd (2025) → 1st (2026)
- 60% of CEOs predict CHRO influence will grow significantly
- 75% of CEOs now have Chief AI Officers (up from 25%)
- Article does NOT mention CTO, CIO, CDO, data architecture, governance, or ERP at all
- "AI-agent flywheel" with humans owning "decision logic, guardrails, exception handling for material/ethical/strategic consequences"
- CEOs redesigning cross-functional teams are "more than twice as likely to achieve business objectives"
- Related internal position: `docs/sales/Why the CEO Should Not Own the ERP.md`

**Posting note:** Comment 1 first as a top-level comment on Bob's post; Comment 2 second, either as a self-reply to Comment 1 (keeps the thread tight) or as a follow-on top-level comment (more visibility, slightly more fragmented). Self-reply is the cleaner read.

### Comment 1 of 2 — Structural omission + the authority-substrate impossibility

Bob, thanks for the tag — and you're right that the gap is glaring once you read what the piece actually does *and* doesn't say.

What stands out structurally:

The article tells CEOs to rewire decision-making and authority distribution. It elevates two roles — the CHRO and the Chief AI Officer. It does not mention the CTO, the CIO, the CDO, or any data-architecture role. It does not mention enterprise systems, governance, or data infrastructure at all. The substrate that records and enforces decisions and authority — the thing the rewiring has to happen *through* — is structurally invisible.

That isn't an oversight. It's the recommendation collapsing under its own logic.

You cannot redistribute authority your system doesn't know exists. In most enterprises, authority is an implicit code path — someone approves something, the system records the approval, but not the rule that determined who was allowed to approve. Decisions live in heads, spreadsheets, or code a consultant wrote in 2014. When IBM tells a CEO to "rewire authority distribution," they are asking for a property the substrate underneath them does not have.

### Comment 2 of 2 — Custodianship position, AI-flywheel reframe, the loop, Robertson handoff

There's a deeper structural problem. The CEO is custodian of business objectives — but not, and should not be, of the systems that serve them. Decisions about schema, workflow, authority, integration carry structural consequences too high-risk for a non-technical executive. Mimir Labs' published position: any dynamic in which the custodian of a data system isn't a domain expert is itself a failure mode. The IBM piece implicitly recommends it.

IBM names the right concern itself, buried under "AI-agent flywheel" framing: humans must own "decision logic, guardrails, exception handling." That's the substrate question, not an AI one. AI on a broken substrate produces noise faster. The prerequisite — a data layer that captures the operational loop as governable data — is what IBM is telling CEOs to fix without naming it.

Every business runs the same loop: event, condition, decision, authorized action, state change, result, transactional record, new event. That's the physics. IBM has examined enterprise architecture more thoroughly than anyone alive. The omission isn't a blind spot — it's a prescription shaped by where IBM sells.

@James — curious how you read the article's choice to elevate CHRO and CAIO while erasing CTO/CIO/CDO entirely from the conversation.
