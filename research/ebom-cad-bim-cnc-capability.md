# EBOM ↔ CAD / BIM / CNC File Capability Report

*Yggdrasil ERP, May 2026 — what the system does today, what it doesn't, and the per-format gap list.*

---

## Architecture

EBOMs in Yggdrasil live in three tables:
- **`plm_ebom_headers`** — the BOM as a whole (`ebom_number`, `bom_name`, `revision`, `part_id` of the parent assembly, status, effective/obsolete dates)
- **`plm_ebom_lines`** — each component line (`component_part_id`, `quantity`, `uom`, `reference_designator`, `find_number`, optionality, effectivity)
- **`plm_parts`** — the underlying part master that both the BOM header and its lines reference

Attachments use the polymorphic `attachments` table (`entity_type` + `entity_id`), so any of the three tables can carry attachments. In practice the natural homes for engineering files are:
- **The part** (`plm_parts`) — master CAD file, drawing PDF, datasheet — regardless of which BOMs reference the part
- **The EBOM header** (`plm_ebom_headers`) — assembly model, top-level drawing, ECN package
- **The EBOM line** (`plm_ebom_lines`) — line-specific override drawings, supplier-specific variants

After the just-shipped extensions:
- `attachments.content_type` is set from a MIME map; unknown extensions still upload as `application/octet-stream`
- Versioning via `file_group_id` + `version` + `is_current_version` lets a CAD file's revision history live as a chain of attachments
- `attachment_text_extracts` stores plain-text extractions for text-bearing formats only — not currently relevant to CAD/BIM/CNC binary formats

---

## Per-format capability — CAD

| Format | Ext | Store | Associate | Read (serve back) | Read (parse structure) | Write (generate from record) |
|---|---|---|---|---|---|---|
| STEP (ISO 10303-21) | `.step` `.stp` | ✅ MIME-mapped to `application/step` | ✅ to part / EBOM / line | ✅ | ❌ no parser — assembly tree, part references, names not extracted into Yggdrasil | ❌ no generator |
| IGES | `.iges` `.igs` | ✅ as `application/octet-stream` | ✅ | ✅ | ❌ | ❌ |
| STL (mesh) | `.stl` | ✅ MIME-mapped to `model/stl` | ✅ | ✅ | ❌ | ❌ |
| DXF (2D drawing) | `.dxf` | ✅ MIME-mapped to `application/dxf` | ✅ | ✅ | ❌ | ❌ |
| DWG (AutoCAD native) | `.dwg` | ✅ MIME-mapped to `application/acad` | ✅ | ✅ | ❌ | ❌ |
| SolidWorks part / assembly | `.sldprt` `.sldasm` `.slddrw` | ✅ as `application/octet-stream` | ✅ | ✅ | ❌ | ❌ |
| Inventor part / assembly | `.ipt` `.iam` `.idw` | ✅ as `application/octet-stream` | ✅ | ✅ | ❌ | ❌ |
| CATIA part / product | `.CATPart` `.CATProduct` `.CATDrawing` | ✅ as `application/octet-stream` | ✅ | ✅ | ❌ | ❌ |
| NX / Creo part | `.prt` `.asm` | ✅ as `application/octet-stream` | ✅ | ✅ | ❌ | ❌ |
| Fusion 360 archive | `.f3d` | ✅ as `application/octet-stream` | ✅ | ✅ | ❌ | ❌ |
| 3MF (3D print) | `.3mf` | ✅ as `application/octet-stream` | ✅ | ✅ | ❌ | ❌ |

## Per-format capability — BIM

| Format | Ext | Store | Associate | Read (serve back) | Read (parse structure) | Write (generate from record) |
|---|---|---|---|---|---|---|
| IFC (open BIM) | `.ifc` | ✅ as `application/octet-stream` | ✅ | ✅ | ❌ no parser — building elements, spaces, materials, schedules not extracted | ❌ |
| IFC-XML | `.ifcxml` | ✅ as `application/octet-stream` | ✅ | ✅ | ❌ | ❌ |
| Revit | `.rvt` `.rfa` | ✅ as `application/octet-stream` | ✅ | ✅ | ❌ | ❌ |
| Navisworks | `.nwd` `.nwc` `.nwf` | ✅ as `application/octet-stream` | ✅ | ✅ | ❌ | ❌ |
| BCF (issue exchange) | `.bcf` `.bcfzip` | ✅ as `application/octet-stream` | ✅ | ✅ | ❌ | ❌ |
| COBie spreadsheet | `.xlsx` | ✅ MIME-mapped + **text extractable** via libreoffice | ✅ | ✅ | ⚠ flat text only — sheet/cell structure lost | ❌ |

## Per-format capability — CNC / shop floor

| Format | Ext | Store | Associate | Read (serve back) | Read (parse structure) | Write (generate from record) |
|---|---|---|---|---|---|---|
| G-code (generic) | `.nc` `.gcode` `.tap` `.iso` `.cnc` | ✅ as `application/octet-stream` | ✅ to routing operation, work order, part | ✅ | ❌ no parser — but G-code is plain text; could trivially extract tool list, M-codes, estimated cycle time | ❌ |
| APT cutter-location | `.cl` `.apt` | ✅ | ✅ | ✅ | ❌ | ❌ |
| Mastercam project | `.mcam` `.mcx` | ✅ | ✅ | ✅ | ❌ | ❌ |
| Esprit project | `.esp` | ✅ | ✅ | ✅ | ❌ | ❌ |
| Vericut simulation | `.vcproject` | ✅ | ✅ | ✅ | ❌ | ❌ |
| Post-processor | `.pst` `.ppf` | ✅ | ✅ | ✅ | ❌ | ❌ |
| Probing report | `.csv` `.txt` | ✅ MIME-mapped + **text extractable** | ✅ | ✅ | ⚠ flat text only | ❌ |
| DNC drip-feed transcript | `.txt` | ✅ + **text extractable** | ✅ | ✅ | ⚠ flat text only | ❌ |

---

## What works today

For **every** format above:
- The file uploads, stores on disk under `<tenant>/<entity_type>/`, computes a SHA-256 checksum, gets a UUID
- It associates with any record via `entity_type` + `entity_id`
- It serves back via `GET /api/attachments/<id>/download` with the right Content-Type for downstream tools (CAD viewers, machine controllers, BIM coordinators) to handle correctly
- It supports versioning via `file_group_id` chains — a CAD file's rev history is a queryable attachment chain
- Tenant-scoped via row-level security
- Audited via `audit_change_log`
- The EBOM line/header/part itself is the natural anchor — engineering can walk from a part to all its current and historical CAD attachments, or from a BOM to its assembly model and its line-level overrides

In short: as a **document management substrate** for engineering files, the attachment system is fully functional today across every CAD/BIM/CNC format that's just bytes-on-disk.

---

## What does not work today

**Structured parsing.** Yggdrasil cannot, for any of these formats, extract:
- The assembly tree of a STEP / SolidWorks / Inventor / CATIA / NX assembly
- The part references inside an assembly (and therefore cannot reconcile assembly contents against `plm_ebom_lines`)
- IFC building elements, spaces, schedules
- Revit family parameters or schedules
- G-code tool lists, M-code summaries, estimated cycle times, feeds & speeds
- DXF/DWG layer-and-block structure

**Generation.** Yggdrasil cannot generate any CAD/BIM/CNC file from record data. The seven existing document-generation endpoints (sales quotes, sales orders, sales invoices, purchase orders, packing slips, pick lists, work orders) emit PDF / DOCX / XLSX only — there is no pipeline that takes (e.g.) a `plm_ebom_headers` row + its `plm_ebom_lines` rows and emits a STEP assembly, a DXF stack-up drawing, or a G-code file.

**Format-aware viewing inside the app.** The existing AttachmentPanel UI in both web and desktop offers download-and-open-locally, not in-browser CAD/BIM/CNC viewing. There is no STEP viewer, no IFC viewer, no G-code visualizer in the platform today.

**MIME map gaps.** The following extensions are NOT in `AttachmentRoutes.cpp:221-238`'s mime map and currently fall through to `application/octet-stream`. This is functionally OK (files still upload and serve) but loses HTTP-layer hints for downstream tools and means the AttachmentPanel UI cannot render type-aware icons:
- `.iges` `.igs` — IGES (`application/iges` is conventional)
- `.sldprt` `.sldasm` `.slddrw` — SolidWorks
- `.ipt` `.iam` `.idw` — Inventor
- `.CATPart` `.CATProduct` `.CATDrawing` — CATIA
- `.prt` `.asm` — NX / Creo (collision risk: `.prt` is also used by other tools)
- `.f3d` — Fusion 360
- `.3mf` — 3D MF
- `.ifc` `.ifcxml` — IFC
- `.rvt` `.rfa` — Revit
- `.nwd` `.nwc` `.nwf` — Navisworks
- `.bcf` `.bcfzip` — BCF
- `.nc` `.gcode` `.tap` `.iso` `.cnc` — G-code
- `.cl` `.apt` — APT
- `.mcam` `.mcx` — Mastercam
- `.esp` — Esprit
- `.vcproject` — Vericut

---

## Pragmatic next steps, ranked by ROI

**Trivial — do today:**
1. **Extend the mime map** with the entries above. ~20 lines of code in `AttachmentRoutes.cpp`. Zero infrastructure cost. Makes the AttachmentPanel show the right icons and gives downstream tools the right Content-Type hints.

**Cheap — low-effort wins:**
2. **G-code parser** — G-code is plain text. A simple regex pass can extract: tool list (T1, T2, ... numbers), M-code summary, estimated cycle time (sum of feedrate-distance), spindle-speed range, coolant on/off events, work-offset usage (G54-G59). Would make a useful "G-code Summary" section on every CNC attachment in the work-order detail page. Maybe 200 lines of C++ + a new endpoint.

3. **Probing/QC report ingest** — many shop-floor probing tools emit CSV. Extending `ContentExtractor` to handle `.csv` (just read as text) is a one-line addition; surfacing the rows as a QC inspection record is a separate feature but the underlying extraction already works (CSV + xlsx both go through the libreoffice path, which already produces text).

**Medium — useful but bigger lifts:**
4. **STEP top-level parse** — STEP files are ISO 10303-21 text format. Parsing the full schema requires OpenCASCADE or similar (~big native dependency). But just extracting the FILE_NAME, FILE_DESCRIPTION, and the top-level PRODUCT entries to identify what assembly/parts the file represents is doable with a few hundred lines of plain text parsing. Value: cross-check that an attached STEP assembly actually contains the part referenced on the EBOM line.

5. **IFC top-level parse** — same shape as STEP. IFC files are also text-based (ISO 10303-21 derivative). Could extract IfcProject / IfcSite / IfcBuilding / IfcSpace counts and IDs without a full IFC parser. Value: link an IFC attachment to a project record's space inventory.

6. **DXF entity-summary parse** — DXF is documented text (or binary; both encode the same content). Could extract layer list and entity counts per layer for quick previews.

**Heavy — separate product territory:**
7. **In-browser CAD viewer** — Yggdrasil could embed an open-source viewer (Three.js + occt-import-js for STEP, IFC.js for IFC, ngc-viewer for G-code). This is a real product surface, not a few-hour task. Roadmap-class.

8. **Structured BOM-vs-CAD reconciliation** — automatic verification that the parts in an attached STEP assembly match the lines on the corresponding `plm_ebom_headers`. Requires (4) above plus reconciliation logic. High value, multi-week build.

9. **CAD-to-EBOM import** — read a STEP assembly and create the corresponding `plm_ebom_lines` rows automatically. Inverse of (8). The dream.

10. **Native CAD format parsing** (SolidWorks, Inventor, CATIA, NX) — requires vendor SDKs (license cost, platform constraints) or third-party libraries (datakit-engineering, CAD Exchanger, etc., all paid). Significant cost, significant capability.

---

## Plain-language summary

For an engineering team that wants Yggdrasil to be **the place CAD/BIM/CNC files live and travel with parts and BOMs through their lifecycle**, the system is fully functional today. Files store, version, associate, serve back, audit, and respect tenant boundaries — across every file type listed above.

For an engineering team that wants Yggdrasil to **understand what's inside those files** — to verify that a STEP assembly contains the parts the BOM says it should, to summarize G-code tool requirements before release, to render an IFC building model in-browser — the answer is currently no. None of the structured-parsing capabilities exist.

The fastest path to closing the most-mentioned gaps:
- **Extend mime map** (today)
- **G-code summary parser** (a few hours)
- **STEP / IFC top-level metadata extraction** (a few days each)

The longer path — full CAD assembly reconciliation, in-browser viewers, native-format parsers — is a real product investment, not a quick win. It is the kind of capability that distinguishes a PLM-aware ERP from a general-purpose ERP, and it would be a credible roadmap arc for v1.x of Yggdrasil if a customer pulls in that direction.
