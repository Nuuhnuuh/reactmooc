Single Page App network transactions

```mermaid
sequenceDiagram
    Browser->>Server: POST to studies.cs.helsinki.fi/exampleapp/new_note_spa "toinen tesmaus"
    Server->>Browser: { "message" : "note created" }
```
