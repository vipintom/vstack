# Close record

Closing writes the durable output: a JSON record and a Markdown record, both
under `.vstack/deliveries/`.

## The call

```text
vstack_close
  summary: "hello() with a passing check"
  review: { outcome: approved, owner: "you", notes: "quick tier, one file" }
  waiver: { reason: "no browser test for the empty state", owner: "you" }
```

All three parts are optional except the review's `outcome` and `owner` when a
review is given, and the waiver's `reason` and `owner` when one is given.

## What must be true first

| Condition | Refused if |
|---|---|
| Tasks | any remains `todo`, `doing` or `blocked` |
| Evidence | any task has none linked |
| Checks | any linked evidence has `result: failed` |
| Review | `outcome` is `changes_requested` |

A waiver changes none of these. It records a known gap; it does not close one.
See [enforcement](enforcement.md).

## What lands on disk

```text
.vstack/deliveries/<id>.json   machine-readable
.vstack/deliveries/<id>.md     the same content, readable
```

The Markdown record opens with the delivery's identity — id, title, playbook,
tier, outcome, done-when — followed by its phases, tasks, evidence, decisions,
handoffs, review and waiver.

Both files are plain. They are readable without the plugin installed.

## What is retained

| Kept | Dropped |
|---|---|
| Every task and its check | The active slot in `state.json` |
| Every evidence record | |
| Every decision and its alternatives | |
| The handoff | |
| The review outcome and waiver | |
| The full hash-chained history | |

Nothing is discarded on close. The history stays; only the active slot clears.

## Reading a closed delivery

```bash
cat .vstack/deliveries/<id>.md
```

Or open the panel's **Deliveries** view and select it. Archived records stay
browsable even when `state.json` is broken — see
[panel states](../panel/states.md).

## After close

The slot is free. A new `vstack_route action: open` starts the next delivery.

The closed record stays in `deliveries/` for as long as you keep it. That
directory is meant to be committed.

---

See also: [enforcement](enforcement.md) · [state](state.md) · [panel views](../panel/views.md)
