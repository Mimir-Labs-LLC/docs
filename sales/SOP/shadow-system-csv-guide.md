# Preparing a Shadow System Spreadsheet for Ratatosk Ingestion

## What Is a Shadow System?

A shadow system is any data source maintained outside your official systems of record. Common examples include:

- Excel spreadsheets used for production tracking, scheduling, or reporting
- Access databases maintained by individual departments
- Shared Google Sheets used for inventory counts or customer lists
- CSV exports from legacy tools that feed into manual processes

Ratatosk treats shadow systems as first-class data sources. Surfacing them during a governance workshop is one of the most valuable things you can do &mdash; these are the systems where definition conflicts, data drift, and ownership ambiguity live.

---

## Required Format

Ratatosk ingests schema descriptions as **CSV**, **TSV**, or **JSON** files. It does **not** read `.xlsx` files directly. You must export your spreadsheet to one of these formats before ingestion.

CSV is the simplest option for shadow systems. JSON is recommended when you need to express **foreign key relationships** or **primary keys** between tables, or when combining **multiple sources** into a single file.

### Step 1: Structure Your Data as a Schema Description

Ratatosk does not ingest raw business data. It ingests **schema descriptions** &mdash; a catalog of what tables and columns exist in your shadow system, what data types they use, and how they are structured.

Each row in your CSV represents **one column** in one table. Think of it as a data dictionary for your spreadsheet.

### Required Columns

Your CSV **must** include these three columns in the header row:

| Column | Aliases Accepted | Description |
|--------|-----------------|-------------|
| `table_name` | `tablename`, `table` | The name of the table (or spreadsheet tab/sheet name) |
| `column_name` | `columnname`, `column`, `field` | The name of the column (or spreadsheet column header) |
| `data_type` | `datatype`, `type`, `column_type` | The data type of the column |

### Optional Columns

These provide additional governance context but are not required:

| Column | Aliases Accepted | Default if Absent |
|--------|-----------------|-------------------|
| `is_nullable` | `nullable`, `isnullable` | `YES` (assumed nullable) |
| `column_default` | `default`, `default_value` | Empty |
| `ordinal_position` | `ordinal`, `position` | Auto-assigned in order |
| `is_primary_key` | `primary_key`, `isprimarykey`, `pk` | Not part of PK |

**Header matching is case-insensitive** and whitespace is trimmed. `Table_Name`, `TABLE_NAME`, and `table_name` all work.

The `is_primary_key` column accepts `YES`, `TRUE`, `1`, or `Y` to indicate that a column is part of the table's primary key. This enables Ratatosk to detect **composite primary keys** and **junction tables** (tables whose entire primary key is composed of foreign key columns), which are critical for the data ecosystem map visualization.

---

## Handling Formulas, Pivot Tables, VBA, and Other Excel Features

Shadow systems are rarely clean tabular data. Most have accumulated formulas, pivot tables, macros, conditional formatting, and other Excel-specific features over years of use. These features are **invisible to Ratatosk** because CSV export strips them all away &mdash; but they matter for governance because they represent hidden business logic that lives outside your systems of record.

### Formulas

Formulas are the most common form of embedded business logic in shadow systems. When you export to CSV, Excel writes the **computed result**, not the formula. The formula itself is lost.

**What to do:**

Before exporting, audit your spreadsheet for formula columns. Any column that contains a formula represents a **derived field** &mdash; business logic that someone decided belongs in a spreadsheet instead of in a system. Document these in your schema description.

For example, if column E is `=C2*D2` (Qty * Unit Price = Line Total), your CSV should describe the column as the **output** data type, but you should note the derivation for the workshop:

```csv
table_name,column_name,data_type,is_nullable
Price Sheet,Qty,integer,NO
Price Sheet,Unit Price,numeric(10,2),NO
Price Sheet,Line Total,numeric(10,2),NO
```

During the workshop, the facilitator will ask: "Where does Line Total come from?" The answer &mdash; "it's a formula in Excel" &mdash; is a governance finding. That logic should live in a system, not a spreadsheet.

**Tip:** Use Excel's **Formulas > Show Formulas** (Ctrl+`) to reveal all formula cells at once. Scan for columns that are entirely formulas &mdash; those are your derived fields.

### Pivot Tables

Pivot tables are summary views of source data. They are **not** a separate data source &mdash; they are a reporting layer on top of existing data.

**What to do:**

- **Do not describe the pivot table as a table in your CSV.** The pivot table's source range is your actual data structure.
- If the pivot table lives on its own tab, ignore that tab. Describe the **source data tab** instead.
- If the pivot table is the *only* thing people look at (the source data tab is hidden or forgotten), that's a governance finding worth discussing in the workshop. Document the source data tab as the table.

**Exception:** If someone has copy-pasted pivot table output into a separate sheet and uses *that* as a reference (i.e., the pivot table output has become its own shadow system), describe the pasted output as a table. It's now a snapshot, not a live summary.

### VBA Macros and Scripts

VBA macros represent automated business logic &mdash; data transformations, validations, report generation, email triggers, or data movement between sheets or external systems.

**What to do:**

- VBA does not affect the schema description. Describe the **data structures** (sheets and columns) that the macro reads from and writes to.
- If a macro creates new sheets or modifies column structure dynamically, describe the **typical output** structure.
- **Document the macro's existence** for the workshop. A macro that reformats data before emailing it to accounting is a data flow that should be visible during governance analysis. Note it in your source label (e.g., "Weekly Cost Report - has VBA macro that emails Finance").

**VBA is the single biggest source of hidden business logic in manufacturing shadow systems.** A macro that has been running for 8 years, written by someone who left the company, pulling data from three different tabs and emailing a PDF to the plant manager every Monday &mdash; that is exactly the kind of thing Ratatosk is designed to surface.

### Conditional Formatting and Data Validation

These do not affect schema structure, but they encode business rules:

- **Conditional formatting** (red if overdue, green if within tolerance) = hidden threshold logic
- **Data validation** (dropdown lists, value ranges) = a controlled vocabulary that lives in a spreadsheet

**What to do:**

- Describe the column normally in your CSV.
- If a column has a dropdown list (data validation), consider noting the allowed values for the workshop. These informal controlled vocabularies are governance-relevant &mdash; they often conflict with the official values in the ERP.

### Named Ranges and Cross-Sheet References

Some spreadsheets use named ranges or pull data from other sheets (e.g., `=VLOOKUP(A2, 'Master List'!A:C, 3, FALSE)`).

**What to do:**

- Each sheet that holds actual data should be described as a separate table.
- Cross-sheet lookups indicate a **data dependency** &mdash; one shadow system referencing another. Note these for the workshop.
- If a sheet consists entirely of lookups to other sheets (a "view" sheet), you can skip it. Describe the source sheets.

### Charts and Graphs

Ignore them. Charts are visual representations of data, not data structures. They do not appear in CSV export and are not relevant to schema description.

### Summary

| Excel Feature | Include in CSV? | Governance Relevance |
|---------------|----------------|---------------------|
| **Formulas** | Describe the output column with its result data type | High &mdash; embedded business logic |
| **Pivot tables** | No &mdash; describe the source data instead | Medium &mdash; may indicate the "real" view people use |
| **VBA macros** | No &mdash; describe the data structures the macro touches | High &mdash; hidden automation and data flows |
| **Conditional formatting** | No | Medium &mdash; hidden threshold/business rules |
| **Data validation (dropdowns)** | No &mdash; but note allowed values for the workshop | High &mdash; informal controlled vocabularies |
| **Named ranges** | No | Low &mdash; internal Excel bookkeeping |
| **Cross-sheet references** | Describe each source sheet as a table | Medium &mdash; indicates data dependencies |
| **Charts** | No | None |

---

## Step 2: Map Your Spreadsheet to the CSV Format

Suppose you have an Excel workbook called **"Production Tracker"** with two tabs:

**Tab: "Daily Output"**

| Date | Line | Part Number | Qty Produced | Scrap Qty | Operator | Shift |
|------|------|-------------|--------------|-----------|----------|-------|

**Tab: "Downtime Log"**

| Date | Line | Start Time | End Time | Reason Code | Notes |
|------|------|------------|----------|-------------|-------|

Your CSV would look like this:

```csv
table_name,column_name,data_type,is_nullable
Daily Output,Date,date,NO
Daily Output,Line,varchar(50),NO
Daily Output,Part Number,varchar(50),NO
Daily Output,Qty Produced,integer,NO
Daily Output,Scrap Qty,integer,YES
Daily Output,Operator,varchar(100),YES
Daily Output,Shift,varchar(10),YES
Downtime Log,Date,date,NO
Downtime Log,Line,varchar(50),NO
Downtime Log,Start Time,time,NO
Downtime Log,End Time,time,YES
Downtime Log,Reason Code,varchar(20),NO
Downtime Log,Notes,text,YES
```

### Naming Conventions

- **Table names** = your sheet/tab names (use the exact name your team uses)
- **Column names** = your column headers (preserve the names people actually use &mdash; Ratatosk will surface naming conflicts during the workshop)
- **Data types** = use standard SQL types (see reference below)

---

## Step 3: Choose Appropriate Data Types

Use standard SQL data types. Ratatosk parses precision from parentheses automatically.

| Your Data Looks Like | Use This Type |
|---------------------|---------------|
| Text, names, codes | `varchar(N)` where N is max length, or `text` |
| Whole numbers | `integer` or `int` |
| Money, decimals | `numeric(10,2)` or `decimal(10,2)` |
| Yes/No, True/False | `boolean` |
| Dates (no time) | `date` |
| Times (no date) | `time` |
| Date + time | `timestamp` |
| Long text, notes | `text` |
| Auto-increment IDs | `integer` |

If you are unsure, use `text`. Ratatosk cares about structure and naming more than type precision for governance analysis.

---

## Alternative: JSON Schema Format

If your shadow system has **foreign key relationships** between tables (e.g., a lookup table referenced by an ID column), or if you want to bundle **multiple sources** into a single file, JSON is a better format than CSV. CSV cannot express foreign keys or multi-source structure.

### Single-Source JSON

```json
{
  "tables": [
    {
      "name": "Daily Output",
      "primaryKeyColumns": ["output_id"],
      "columns": [
        { "name": "output_id", "type": "integer", "nullable": false, "isPrimaryKey": true },
        { "name": "line_id", "type": "integer", "nullable": false },
        { "name": "part_number", "type": "varchar", "maxLength": 50 },
        { "name": "qty_produced", "type": "integer", "nullable": false }
      ],
      "foreignKeys": [
        {
          "sourceColumn": "line_id",
          "targetTable": "Production Lines",
          "targetColumn": "line_id"
        }
      ]
    },
    {
      "name": "Production Lines",
      "primaryKeyColumns": ["line_id"],
      "columns": [
        { "name": "line_id", "type": "integer", "nullable": false, "isPrimaryKey": true },
        { "name": "line_name", "type": "varchar", "maxLength": 100 }
      ]
    }
  ]
}
```

### Multi-Source JSON Manifest

When you have already run a Ratatosk workshop and exported a `.ratatosk.json` manifest, that manifest can be loaded back to resume work. The manifest preserves **all sources, annotations, taxonomy groups, and business labels** from the original session.

When a manifest is loaded, Ratatosk **unpacks** the sources it contains — each source listed in the manifest's `sources` array becomes a separate source in the annotation session. The manifest file itself is **not** treated as a source.

```json
{
  "tool": "Ratatosk",
  "version": "2.0.0",
  "sources": [
    { "name": "Production Tracker", "origin": "csv", "sourceClass": "shadow_system" },
    { "name": "ERP Schema", "origin": "odbc", "sourceClass": "system_of_record" }
  ],
  "tables": [
    {
      "name": "Daily Output",
      "sourceOrigin": "Production Tracker",
      "businessLabel": "Daily Production Output",
      "taxonomyGroup": "Manufacturing",
      "columns": [
        { "name": "part_number", "businessLabel": "Part Number" }
      ]
    }
  ]
}
```

### Accepted JSON Field Names

Ratatosk accepts multiple naming conventions for all JSON fields:

| Field | Accepted Names |
|-------|---------------|
| Table name | `name`, `table_name`, `tableName` |
| Column name | `name`, `column_name`, `columnName` |
| Data type | `type`, `data_type`, `dataType` |
| Nullable | `nullable`, `is_nullable`, `isNullable` |
| Primary key (column) | `isPrimaryKey`, `is_primary_key`, `primaryKey`, `pk` |
| Primary key (table) | `primaryKeyColumns`, `primary_key_columns`, `primaryKey`, `primary_key` |
| Foreign keys | `foreignKeys`, `foreign_keys` |
| FK source column | `sourceColumn`, `source_column`, `column` |
| FK target table | `targetTable`, `target_table`, `references` |
| FK target column | `targetColumn`, `target_column` |

---

## Step 4: Export from Excel

1. Open your workbook in Excel
2. **Do not export the raw data.** Create a new sheet (or a separate workbook) containing the schema description in the format above.
3. File > Save As > **CSV (Comma delimited) (*.csv)**
4. If your data contains commas in field names, use **TSV** instead (Tab delimited) or ensure fields are quoted

### Important Notes

- **One CSV per shadow system.** If you have 5 shadow spreadsheets, create 5 CSVs.
- **UTF-8 encoding.** Save as UTF-8 if your column names contain special characters. Ratatosk strips BOM markers automatically.
- **No empty rows.** Remove any blank rows between data. Empty rows are skipped silently but can cause confusion.
- **No merged cells.** Flatten any merged cells before describing the schema.

---

## Step 5: Load into Ratatosk

### Loading a CSV or JSON schema file

1. Launch Ratatosk
2. Select **"CSV File (.csv)"** or **"JSON File (.json)"** as the source type
3. Click **Browse** and select your file
4. Enter a **Source Label** that identifies this shadow system (e.g., "Production Tracker - Plant 2", "Jill's Inventory Sheet", "Weekly Shipping Log")
5. Set the **Source Classification** dropdown to **"Shadow System"**
6. Click **Load Schema**

Ratatosk will display the number of tables and columns loaded. If there are errors (missing headers, malformed rows), they will be shown in the status area.

### Loading a Ratatosk manifest (.ratatosk.json)

1. Launch Ratatosk
2. Select **"JSON File (.json)"** as the source type
3. Click **Browse** and select the `.ratatosk.json` manifest file

Ratatosk will detect that the file is a manifest and automatically unpack it. Each source defined in the manifest becomes a separate source in the session, with all annotations, taxonomy groups, and business labels restored. You do **not** need to enter a source label or classification &mdash; these come from the manifest.

### Source Classification

The Source Classification dropdown tells Ratatosk what kind of data source this is. This is how Ratatosk distinguishes a CSV describing a shadow spreadsheet from a CSV describing an extracted database schema. The classification appears in governance reports, allowing stakeholders to see at a glance which findings come from official systems versus informal ones.

| Classification | When to Use |
|---------------|-------------|
| **System of Record** | The CSV describes a schema exported from an official system (ERP, CRM, database) |
| **Shadow System** | The CSV describes a spreadsheet, Access database, or other unofficial data source |
| **Legacy System** | The CSV describes a system that is being retired or replaced |
| **Reference Data** | The CSV describes lookup tables, code lists, or reference data maintained outside the primary system |
| **(Unspecified)** | You are unsure or the classification does not matter for this engagement |

**For shadow system ingestion, always select "Shadow System."** This ensures governance artifacts correctly categorize the source and that downstream consumers (Ragnarok, Jormungandr) can distinguish shadow data from system-of-record data.

---

## Common Mistakes

| Mistake | What Happens | Fix |
|---------|-------------|-----|
| Missing `table_name` header | Load fails with header error | Add the required header columns |
| Exporting raw data instead of schema | Ratatosk treats each row as a column definition &mdash; nonsensical results | Create a schema description, not a data dump |
| Spaces in data types (`varchar (50)`) | Parsed correctly &mdash; no issue | N/A |
| Using `.xlsx` directly | File dialog won't show it (filtered to `.csv` / `.tsv`) | Export to CSV first |
| Mixed delimiters in one file | Auto-detection picks the most frequent delimiter in the header row | Use one consistent delimiter throughout |
| Empty table or column name in a row | Row is silently skipped | Ensure every row has both table and column names |

---

## Complete Example

A manufacturing company has three shadow systems:

1. **Quality Inspection Checklist** (Excel, 1 tab, 8 columns)
2. **Vendor Scorecard** (Excel, 2 tabs, 14 columns total)
3. **Shipping Weight Log** (Google Sheet, 1 tab, 5 columns)

Each produces one CSV. Here is the Quality Inspection Checklist CSV:

```csv
table_name,column_name,data_type,is_nullable,column_default
Inspection Checklist,Inspection ID,integer,NO,
Inspection Checklist,Work Order,varchar(20),NO,
Inspection Checklist,Inspector,varchar(100),NO,
Inspection Checklist,Date,date,NO,
Inspection Checklist,Part Number,varchar(50),NO,
Inspection Checklist,Pass/Fail,varchar(4),NO,
Inspection Checklist,Defect Code,varchar(20),YES,
Inspection Checklist,Notes,text,YES,
```

After loading all three CSVs into Ratatosk (one at a time, each as a separate source), the workshop facilitator can:

- Assign business labels to every column across all three shadow systems
- Detect where "Part Number" in the inspection checklist means the same thing as "Item No" in the vendor scorecard
- Surface that the shipping log tracks weight in pounds while the ERP expects kilograms
- Identify that "Defect Code" has no controlled vocabulary and differs between inspectors

This is the governance value of including shadow systems in a Ratatosk engagement.
