# Norn — Product Demo Script

**Target length:** 3-4 minutes
**Format:** Screen recording of Norn web app + voiceover (Doc narrating)
**Capture from:** norn.mimirlabs.net (web app)

---

## SCRIPT

### Opening (10 sec)

[Show Norn logo, then the web app landing/welcome screen]

Norn is contract document intelligence. Import any document — PDF, Word, or plain text — and turn it into a reusable, fillable, signable template. Let me show you the full workflow.

### Import (30 sec)

[Click Import. Select a PDF — use a real form like an equipment rental agreement or NDA]

I'm importing a standard equipment rental agreement. This is a PDF that someone created in Word years ago. It's been emailed around, printed, and hand-signed dozens of times.

[Wait for import. Show the three-pane layout: PDF preview on left, extracted text in middle, fields panel on right]

Norn extracted the text and rendered the original PDF on the interactive canvas. The extracted text is in the middle pane for reference.

### Detect Fields (45 sec)

[Click "Detect Fields" button]

One click. Norn analyzed the PDF's text content and found every fillable field — label-colon patterns, signature blocks, date fields, blank lines.

[Pan across the PDF preview showing teal field rectangles positioned on the document]

Each field is positioned at its real location on the document. "Lessor" here, "Lessee" there, signature blocks at the bottom. These aren't approximations — they're located from the actual PDF text coordinates.

[Click a field in the fields panel. Show it highlight on the PDF]

Selecting a field in the panel highlights it on the PDF. I can also drag fields to reposition them, resize with the handles, or Ctrl-drag to draw a new field anywhere on the document.

### Fill (60 sec)

[Switch to Fill mode. Click "Fill Document"]

Now I switch to fill mode. The text pane disappears and the preview expands.

[Fill dialog opens. Show the guided form]

The fill dialog shows every field grouped by page. Notice the progress counter — 0 of 14 fields filled.

[Type a company name. Show it auto-populate]

I type "Greenfield Industries" for the Lessor. Notice it filled both instances — the one on page 1 and the one on page 2. Same label, same type, one entry.

[Fill a few more fields quickly. Show date picker, signature capture]

Date field gets a date picker. For the signature, I can draw it, type it, or upload an image.

[Click Save & Apply]

Fields filled. The PDF preview now shows the values rendered at their exact positions on the document.

### Export (30 sec)

[Click "Export PDF"]

Export generates a new PDF with the filled values embedded on the original document. White blanking rectangles behind each value, font matched to the document's body text, signatures rendered at their assigned positions.

[Show the downloaded file briefly in a PDF viewer — values visible at correct positions]

This is the exported PDF. Original document, filled values, ready to send.

### Send for Signing (30 sec)

[Click "Send for Signing." Show the send dialog]

I add signatories and assign them to parties. The Lessor's fields go to one person, the Lessee's fields go to another. I can set parallel or sequential signing order.

[Click Send]

Each signatory gets an email with a secure signing link. They open it, see only their assigned fields, sign, and the system tracks the completion. Full audit trail — viewed, signed, IP address, timestamp, tamper-evident hash.

### Closing (10 sec)

Import. Detect. Fill. Sign. Export. That's Norn.

Free tier at norn.mimirlabs.net. Five contracts a month, no credit card required.

---

## PRODUCTION NOTES

- **Capture from the live web app** at norn.mimirlabs.net (or localhost:3001 for demo)
- **Use a real PDF** — not a blank or dummy document. An equipment rental agreement, NDA, or MSA with visible form fields.
- **Pre-test the document** to make sure field detection finds enough fields to be impressive (10+)
- **Key moments:** Field detection populating 10+ fields in one click, shared field value propagating, signature capture, exported PDF with values at correct positions
- **Speed:** Don't rush the fill dialog — let the viewer see the fields populating. But don't linger on typing.
- **Closing frame:** Norn logo, norn.mimirlabs.net, "Free tier — 5 contracts/month"
