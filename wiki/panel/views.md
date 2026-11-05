# Panel views

Seven. The list is fixed — there is no eighth.

```bash
grep -c 'id: "' vstack-openchamber/panel/src/types.ts
# 7
```

| Id | Label | Shows |
|---|---|---|
| `now` | Now | Active delivery, phase, next task, next action, blockers, last activity |
| `plan` | Plan | Tasks grouped by status, each with its check, evidence state, copyable command |
| `evidence` | Evidence | Claims grouped by task; unlinked evidence separate; **not run** when absent |
| `timeline` | Timeline | Every recorded event in order |
| `decisions` | Decisions | Choices, alternatives, reasons, consequences, review outcome, waiver |
| `deliveries` | Deliveries | Active, parked and closed records; select one to read it |
| `health` | Health | Missing files, stale state, incompatible version, broken history |

## Now

Answers "what should happen next". Shows the active delivery's phase and the
`nextAction` from the most recent handoff — not a derived suggestion.

With no delivery open, it says so rather than showing an empty grid.

## Plan

Tasks grouped into Doing, Todo, Blocked, Done. Each row carries:

- the task's **check**
- its evidence state — present, or **not run**
- a copyable recorder command, so you can start or complete it without
  remembering the arguments

## Evidence

Grouped by task so a reader can see, per task, what proves it.

- A task with no evidence shows **not run** — never done, never blank.
- Evidence with no `taskId` is listed separately, so it is not mistaken for
  task proof.

See [evidence model](../recorder/evidence-model.md).

## Timeline

Every event from `history.jsonl` in order: route, task, evidence, decision,
handoff, close. This is the audit trail, rendered.

## Decisions

Each decision's choice, alternatives, reason, consequence and owner — plus the
close record's review outcome and any waiver.

A waiver appears here because hiding it would misrepresent the delivery.

## Deliveries

Lists the current delivery and every archived record under
`.vstack/deliveries/`. Select one to read its tasks, evidence, decisions and
handoff.

Archived deliveries stay readable after a new one opens, and stay browsable
when `state.json` is broken — the archives are independent files.

## Health

The one view that reports on the record itself rather than the delivery. See
[states](states.md).

## Navigation

Arrow keys move between tabs. The view list is data-driven, so the key order
matches the visible order.

---

See also: [states](states.md) · [overview](overview.md) · [read-only](read-only.md)
