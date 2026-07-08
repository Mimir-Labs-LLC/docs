# Failure Chain — Sequence (Order SO-10482)

The Requested Ship Date manipulation, as a sequence of interactions across the systems in `/data`. The left branch is what the current substrate does. The final note shows where a governed write path intervenes.

```mermaid
sequenceDiagram
    autonumber
    actor User as Keystone user (j.brennan)
    participant WF as Ship-date workflow
    participant Email as Approval inbox
    participant API as Order API / integration
    participant DB as Passive DB (system of record)
    participant Fin as Finance report
    participant Agent as AI agent

    User->>DB: Create SO-10482, requested_ship_date = 2026-08-15
    Note over DB: Correct commitment recorded

    User->>WF: Request requested_ship_date 08-15 -> 08-29 (RSDC-0007)
    WF->>Email: Approval reference present? (EMAIL-3391)
    Email-->>WF: Yes, a reference exists
    Note over WF,Email: Email says only "flexibility on August deliveries"<br/>No order, no field, no dates
    WF->>DB: Apply change (reference present == consent)

    User->>API: PATCH expected_ship_date 08-15 -> 08-29 (API-5567)
    Note over API: Different field, service account,<br/>workflow_context = none
    API->>DB: Commit off-path change

    DB->>Fin: Score SO-10482 on expected_ship_date (2026-08-29)
    Fin-->>DB: on_time_delivery = TRUE (FMR-10482)
    Note over Fin: Actual ship 08-28 <= 08-29 -> "on time"<br/>True commitment was 08-15 (13 days late)

    Agent->>DB: Read FMR-10482
    Agent-->>Agent: Conclude delivery on time
    Note over Agent: Correct-looking input,<br/>confidently wrong conclusion

    rect rgb(253,236,236)
    Note over WF,DB: Governed write path (Yggdrasil ERP):<br/>Step 4 rejected reject_ambiguous_field<br/>Step 8 rejected reject_missing_provenance<br/>Invalid state never persists; on-time claim never exists
    end
```

**Read it this way:** the audit log (`audit_log.csv`) captures each of these interactions honestly. What it never captures is a verdict on whether the resulting state is valid. The red block is the single place where enforcement changes the outcome: refuse the write, and every downstream conclusion that depended on it simply cannot form.
