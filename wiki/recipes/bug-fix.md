# Recipe: fix a bug

The `fix-bug` playbook, end to end, with the record at each step.

**Budget:** 4 skill loads.
**Skills:** `debug`, `tdd`, plus `verify` at the gate.

## When this applies

A defect reproduces and the expected behaviour is known.

Not this: unexplained behaviour — that is `understand` first. A feature gap —
that is `build-feature`.

## Route

```text
vstack_route
  action: open
  title: "login check flakes on retry"
  tier: standard
  playbook: fix-bug
  outcome: "the login check passes consistently"
  doneWhen: "the case fails 0/50 runs"
  skills: ["debug", "tdd"]
  skipped: ["red-team"]
  phase: shape
```

Without the recorder, the same fields at the top of your plan.

## Shape — reproduce before you theorise

Load `debug`. Its job is to narrow the cause with evidence, not to propose
fixes.

```text
vstack_evidence
  claim: "the case fails intermittently"
  check: "run 50 times"
  result: passed
  artifact: "run.log"
```

Record what you saw. If you cannot reproduce it, say so with `blocked` and name
what blocked you — do not proceed on a guess.

## Plan

```text
vstack_task  action: add  title: "write the failing test"   check: "node test.js exits 1 before the fix"
vstack_task  action: add  title: "fix the cause"            check: "node test.js exits 0"
vstack_task  action: add  title: "run 50 iterations"        check: "0 failures in 50 runs"
```

## Build — test first

Load `tdd`. The test states the expected behaviour before the fix exists.

```text
vstack_task  action: start  taskId: tsk_1
```

Write the failing test. Confirm it fails, and record that it did:

```text
vstack_evidence
  claim: "the test fails before the fix"
  check: "node test.js"
  result: passed
  artifact: "test.js"
  taskId: tsk_1
```

Then complete the task:

```text
vstack_task  action: complete  taskId: tsk_1  evidenceId: ev_1
```

Now fix the cause. Same pattern: start, evidence, complete.

## Prove

Run the iteration count. This is the `doneWhen`.

```text
vstack_evidence
  claim: "the case fails 0/50 runs"
  check: "node test.js --iterations 50"
  result: passed
  artifact: "run.log"
  taskId: tsk_3
```

If it flakes even once, the result is `failed`. Record it as failed and keep
the task open. Do not average it away.

## Review

```text
vstack_decision
  choice: "await the promise rather than poll"
  alternatives: "increase the timeout"
  reason: "the timeout hides the ordering bug instead of fixing it"
  consequence: "callers must handle the rejected promise"
  owner: "you"
```

## Close

```text
vstack_close
  summary: "login check no longer flakes; 0/50 clean"
  review: { outcome: approved, owner: "you" }
```

Refused if any task is open, any linked check failed, or the review is
`changes_requested`. See [enforcement](../recorder/enforcement.md).

## What you should have

A failing test committed before the fix, a passing run at 50 iterations, a
decision recording why the obvious fix was rejected, and a close record.

---

See also: [first delivery](../first-delivery.md) · [playbooks](../pack/playbooks.md) · [evidence model](../recorder/evidence-model.md)
