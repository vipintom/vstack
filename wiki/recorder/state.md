# Recorder state

Everything the recorder writes lives in `.vstack/` inside the project. Nowhere
else.

## Layout

```text
.vstack/
├── state.json          current delivery, revision, schema version
├── history.jsonl       append-only, SHA-256 hash-chained events
├── lock                writer lock
├── .gitignore          keeps transient files out of git
└── deliveries/
    ├── <id>.json       machine-readable record
    └── <id>.md         the same record as Markdown
```

| File | Tracked in git? | Why |
|---|---|---|
| `state.json` | no | Current session state |
| `history.jsonl` | no | Append-only event log |
| `lock` | no | Transient |
| `.gitignore` | **yes** | Written on first use; keeps the three above out |
| `deliveries/*.json` | **yes** | The durable output |
| `deliveries/*.md` | **yes** | The readable output |

`.vstack/.gitignore` is written on first use and contains the rules for the
transient three. `deliveries/` stays committable so a finished delivery travels
with the project.

## The hash chain

Every history line carries the hash of the previous line. An edited, reordered
or deleted line breaks the chain and is refused on read.

```bash
wc -l .vstack/history.jsonl
```

There is no supported way to edit history. If a pre-0.2.0 history was written
without a chain, delete it and rebuild — the recorder refuses an unchained
history rather than accepting it silently.

## Revision

Each event carries a `revision`. `state.json` holds the current revision.

The panel's stale check compares them: **equal is healthy**. They differ only
if the recorder stopped between appending an event and updating state.

## Schema version

`state.json` carries `schemaVersion`. The current version is `1`.

A panel reading a newer schema reports `incompatible` and renders nothing
partial. It never guesses.

See [state schema](../reference/state-schema.md).

## Archives

A closed or parked delivery moves into `deliveries/` as `<id>.json` and
`<id>.md`. The active `state.json` then holds no delivery, so a new one can be
opened.

Archives are readable without the plugin — they are plain files. The panel
lists them, and keeps listing them if `state.json` is broken.

## One active delivery

One delivery at a time. `park` archives the current one and frees the slot;
`resume` restores it. See [park and resume](park-resume.md).

## The recorder does not execute anything

It reads and writes these files. It never runs a project command, so the
`check` field in a task is documentation of what you ran — the recorder does
not run it for you.

---

See also: [state schema](../reference/state-schema.md) · [close record](close-record.md) · [panel states](../panel/states.md)
