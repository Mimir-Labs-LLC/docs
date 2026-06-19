# Yggdrasil ERP — Short-Form Demo Playbook (click-by-click)

**Purpose.** A tight, recordable demo for short-form contexts: accelerator and
incubator applications, pitch competitions, demo-day reels, and a muted loop on
the website. One spine, one take, captioned so it carries with the sound off.

**The spine.** Dashboard → one governed record → the substrate refuses an
illegal move → the same refusal binds an AI agent. That is the whole story: the
operating rules live in the database, not in a workflow or a prompt. Everything
else in the full playbook is cut.

**Capture surface.** The web app at `app.mimirlabs.net/yggdrasil`, logged into a
warm **apex** demo slot ("Apex Precision Manufacturing"). This matches the
website/self-serve context and records cleanly. A desktop-client variant is
possible but the click targets below are the web app. Capture screen-only at
**1080p, 16:9**, cursor highlight on.

**Voice.** Lead with the substrate / system-of-record-is-the-system-of-reality
idea. Do NOT say "Deterministic B2B Marketplace" or "Universal BI." Keep the
spoken lines plain; the captions do the work when muted.

---

> **Reality note (read before recording).** This cut shows what's *actually
> live* as of v0.8.1a: **governed status fields** (every status is a
> schema-constrained dropdown, not free text) plus the **narrative qualifier**
> (sub-status preset + note), and the **ROPE policy library**. It deliberately
> does NOT stage a live "click Receive → policy-block modal" on a receipt — that
> receipt-side enforcement panel is not a shipped surface yet, so don't try to
> film it. The governed dropdown + qualifier is the real, demonstrable "rules
> live in the system" moment.

## Pre-flight (do this before you hit record)

| # | Step | Verify |
|---|------|--------|
| P.1 | New incognito window. Close Slack, mail, calendar, every other tab. | Clean frame. The product carries the shot, not your desktop. |
| P.2 | Log into a **warm apex slot**. Email `demo-operator+<demo_operator_id>@mimirlabs.net`, password `DemoVPS2026`. (Pull a warm apex slot's email per the demo-tenant cred steps; do NOT film the credential paste.) A per-slot operator is single-tenant, so it lands straight on the Dashboard. **If you log in with a devadmin** (`demo-operator@mimirlabs.net` or `cgaither@mimirlabs.net`), login now shows a **tenant picker** — choose "Apex Precision Manufacturing." | Dashboard; top-left badge reads "Apex Precision Manufacturing." |
| P.3 | **Dry-run the feature once.** Operations → Purchasing → Receipts → open a receipt → Edit. Confirm **Status** is a **dropdown** of allowed states (no free typing), and that setting a hold-type status reveals the **qualifier** preset list + a note field. Reload so the take starts fresh. | Status is a select; qualifier + note appear when a hold status is chosen. |
| P.4 | Turn on your caption/overlay track (see copy below). Website and social play **muted** by default. | Every beat has a readable on-screen line. |
| P.5 | If your cut includes the policy library and the sidebar "ROPE Policies" link 404s (legacy `/ope` slug), navigate by typing `/rope` in the address bar before rolling. | No 404 on camera. |

---

## The recording — beat by beat (90-second master)

Times are the target window. Voiceover lines are written to fit; trim to taste.
Captions are paste-ready lower-thirds for the muted track.

### Beat 1 — Hook on the Dashboard · 0:00–0:08
- **Click target:** none. Open on the Dashboard. Hold three seconds, then slow-zoom toward the substrate widget (table count / policy count / last audit event).
- **On screen:** Dashboard with the substrate widget visible.
- **VO:** *"Every company has a system of record. And a system of reality, the spreadsheet where the business actually runs. This is one system where those are the same thing."*
- **Caption:** **One system of record. No shadow spreadsheets.**

### Beat 2 — Status is enforced, not typed · 0:08–0:24
- **Click target:** Operations → Purchasing → Receipts → open a receipt → **Edit**. Click the **Status** field.
- **On screen:** Status opens as a dropdown of allowed states (Draft, Received, Inspected, Posted, Rejected). There is no free-text option.
- **VO:** *"Watch the status field. I can't type whatever I want. The system only allows the states it actually defines, straight from the schema. The status isn't a label someone typed. It's a value the system governs."*
- **Caption:** **Status is enforced, not typed.**

### Beat 3 — Tell the whole story · 0:24–0:44  ← the differentiator, give it room
- **Click target:** Set Status to a hold/exception state. The **Qualifier** appears — pick a preset ("quality hold"), then type a short note ("awaiting CMM report, balance on next PO").
- **On screen:** governed base status + the qualifier preset dropdown + the free-text note.
- **VO:** *"But real operations have nuance. So the system keeps the governed status clean, and captures the story right beside it — a quality hold, a partial delivery — as data, not a note in a spreadsheet nobody else can see. The record of the business and the reality of the business are the same record."*
- **Caption:** **The governed status, plus the human story — as data.**

### Beat 4 — Where the rules live · 0:44–1:04  ← the hero beat
- **Click target:** System → **ROPE Policies** (type `/rope` if the link drifts). Open a policy → **Artifacts** tab → the `state_constraint` artifact.
- **On screen:** a signed policy with cited authority; the artifact rendered as readable English over the structured predicate.
- **VO:** *"And the rules that constrain those states aren't buried in code. Each one is a signed policy with cited authority, and this is the actual predicate the engine evaluates inside the transaction. The rule and the data live in the same system."*
- **Caption:** **Every rule is a signed policy — evaluated inside the transaction.**

### Beat 5 — The AI kicker · 1:04–1:20  ← the investable line
- **Click target:** slow push back to the Dashboard substrate widget.
- **On screen:** Dashboard / substrate widget.
- **VO:** *"Here's why it matters for AI. An agent acts on this same governed system. It can read scoped data and propose actions — but it can't set a status the system doesn't allow, and it can't rewrite a policy. It proposes; the system disposes. The safety guarantee is in the database, not in the prompt."*
- **Caption:** **An AI agent can't bypass it either. Safety lives in the database, not the prompt.**

### Beat 6 — Close card · 1:20–1:30
- **On screen:** End card. Logo + one line + URL.
- **VO (optional):** *"Yggdrasil ERP. The operating rules live in the system."*
- **Card copy:** **Yggdrasil ERP — the rules live in the system, not the prompt.** · mimirlabs.net

---

## Cuts off the same recording

Record the full 90-second master, then trim. Every venue is covered by one shoot.

| Cut | Length | Keep | Use for |
|-----|--------|------|---------|
| **Website hero / 1-min** | ~60s | Beats 1, 2, 3, 5, 6 (drop the policy-library beat 4; the governed status + qualifier + AI kicker carry it) | YC-style 60s slot, website autoplay loop, LinkedIn |
| **Standard** | ~90s | All 6 beats | Most accelerator/incubator app videos, competition first-round |
| **Extended** | ~2:30 | All 6 beats + the audit add-on below | Pitch competitions and demo days that allow 2–3 min |

### Extended add-on — the audit trail (insert after Beat 4, ~30s)
- **Click target:** open the record's **Audit history** section, then the policy's **version history** on its `/rope` detail page.
- **On screen:** field-level change log with actor + timestamp; the policy's signed version history.
- **VO:** *"And every one of these is audited at the field level — who changed which status, when, under which policy version. Six months later the record answers the auditor's question, not a Confluence page."*
- **Caption:** **Field-level audit. Signed policy versions. The record answers.**

---

## Formats & reuse

- **Submissions / competitions:** 1080p, 16:9, with voiceover. Caption track on (judges often skim muted).
- **Website loop:** the 60s cut, muted, captions burned in, looping. The captions are written to carry the whole story with no sound.
- **Vertical (9:16) / square (1:1) for social:** crop to the action column — the status dropdown / qualifier in Beats 2–3 and the caption band stay centered. Re-export from the same master; don't reshoot.
- **Thumbnail / poster frame:** the Beat 3 frame — governed status with the qualifier preset + note open — under the **"The governed status, plus the human story"** caption. (Alternative: the Beat 4 policy artifact.)

---

## Guardrails

- **No invented traction.** If a card or description references customers: alpha, 2026 Validation Cohort in discovery, Penn State LaunchBox / MANTEC, no signed production customers yet. Do not imply more.
- **Don't film credentials.** Log in before you roll, or cut the paste.
- **One clean take of Beat 3.** The qualifier is the differentiator. If it doesn't appear, the field you opened isn't qualifier-wired — use receiving Status (it is), or another record whose primary status carries the qualifier.
- **Don't stage a live receipt "block."** That receipt-side enforcement panel isn't a shipped surface; the governed dropdown + qualifier + policy library is the real story. (See the reality note up top.)
- **Keep the spoken lines plain.** The substrate idea lands harder stated simply than dressed up.

---

*Created 2026-06-19; reworked 2026-06-19 to reflect v0.8.1a (governed status dropdowns + narrative qualifier are live; the live receipt-side ROPE-block panel is not). Maintainer: Christopher Gaither, cgaither@mimirlabs.net. Source of click accuracy: `sales/Full Demo Script/yggdrasil-platform-demo.md`. Update if the sidebar structure, apex archetype, the governed-status/qualifier flow, or the ROPE policy library changes.*
