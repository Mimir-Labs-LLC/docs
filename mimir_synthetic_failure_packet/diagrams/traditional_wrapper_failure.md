# Traditional Wrapper Failure

Controls live in the application layer (UI, API harness, workflow screens, prompt filters). The database underneath is passive: it accepts whatever well-formed state it is handed. Every path that reaches the database without passing through the guarded screen is an unenforced write.

```mermaid
flowchart TD
    A["User / AI Agent / Integration"]

    subgraph APP["Application layer (governance lives here)"]
        UI["UI screens"]
        WF["Workflow / approval logic"]
        PF["Prompt filters / agent wrapper"]
        API["API harness"]
    end

    DB[("Passive database\n(accepts valid-looking state)")]

    subgraph OUT["Consumers treat stored state as truth"]
        REP["Reports / BI"]
        AI["AI / analytics"]
        AUD["Audit log\n(records activity, not validity)"]
    end

    A --> UI --> WF --> API --> DB
    A --> PF --> API

    %% Bypass paths that never touch the guarded workflow
    A -. "bulk import (validation: none)" .-> DB
    A -. "service account / direct integration" .-> DB
    A -. "different field: expected_ship_date" .-> DB
    A -. "ambiguous email accepted as approval" .-> WF

    DB --> REP
    DB --> AI
    DB --> AUD

    classDef bypass stroke:#b00,stroke-width:2px,color:#b00;
    classDef passive fill:#f7f7f7,stroke:#999;
    class DB passive;
```

**Read it this way:** the approval logic in `WF` is real, but it only sits on one path. The dotted lines are the paths in the synthetic dataset that reach the database without enforcement — a bulk import with `validation_mode = none` (`BLK-0203`), a service-account API PATCH (`API-5567`), a change to a *different* date field, and an ambiguous email accepted as approval (`EMAIL-3391`). The audit log faithfully records all of it and judges none of it.

The wrapper is not useless; it is simply not a boundary. A boundary is something all paths must cross.
