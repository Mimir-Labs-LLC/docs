Mimir Labs — Investor Memos
=============================

Plain-text, paste-ready memos and email templates for outbound to specific
investors. Each .txt file is self-contained and ready to drop into an email
client. Personalize the top with the recipient's name; the body stands on
its own.

Files
-----

Memos:
  01-amplify-partners.txt        Data infrastructure / dev primitives
  02-8vc.txt                     Industrial / defense-adjacent enterprises
  03-in-q-tel.txt                Mission systems / contested logistics
  04-redpoint.txt                Enterprise AI infrastructure
  05-founders-fund.txt           Contrarian architectural claim
  06-benchmark.txt               Architecture-forward, concentrated
  07-goldman-sachs-psi.txt       Financial strategic / transaction-state

Outbound emails:
  email-general-infra.txt        Generic technical infrastructure investor
  email-defense-iqt.txt          Defense / IQT / strategic infrastructure

Aggregator (markdown):
  ../investor_target_memos.md    Full source with overview, voice rules,
                                 proof discipline notes, and ask templates.
                                 Use the .md as the canonical reference;
                                 send the .txt files.

Voice rules
-----------

  - Founder-led, technical, contrarian without theatrics
  - No "unlock value", no "AI-powered platform", no "revolutionize"
  - No services-business framing; Mimir Labs is infrastructure
  - Ratatosk is the wedge offer; Yggdrasil ERP is the strategic destination
  - Norse names only when explaining architecture, not as positioning
  - Preserve: dirty data is not the same as incomplete operational meaning
  - Preserve: semantic description is not the same as enforceable substrate
  - Preserve: governing the agent is not the same as governing the world the
    agent acts on

Proof discipline
----------------

All claims in the memos are sourced from the current repo state as of
v0.8.0a (June 2026). The aggregator file (investor_target_memos.md)
includes a Provenance and proof discipline section enumerating what was
claimed and what was deliberately not claimed. Update it as new traction
lands.

Workflow
--------

  1. Pick the memo for the firm.
  2. Open the .txt file, copy the body into your email client.
  3. Personalize the salutation. Optionally add one sentence at the top
     naming the connection (warm intro, prior conversation, mutual contact).
  4. Attach the academic preprint or relevant whitepapers from
     docs/research/ or docs/whitepapers/ if the recipient asks for
     reading.
  5. Log the send in business/mimir_labs_outreach_command_center.xlsx
     so the follow-up cadence stays clean.
