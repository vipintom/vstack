# Artifacts

A claim is an artifact. Nothing else counts.

## The rule

> A claim without an artifact is not evidence.
> A check that did not run is reported as not run.

This is
[evidence-before-completion](https://github.com/vipintom/vstack-playbook/blob/master/principles/evidence-before-completion.md).

## What an artifact is

Anything a later reader can inspect without asking you:

- a file
- a command's output
- a commit
- a test result
- a recorded decision
- a handoff note

A feeling, a summary, or "should work" is not an artifact.

## The four fields

Every piece of evidence carries the same shape:

| Field | Meaning |
|---|---|
| **Claim** | What you are asserting |
| **Check** | The command or observation that tests it |
| **Result** | What it actually said |
| **Artifact** | Where the reader looks to confirm |

With the recorder:

```text
vstack_evidence
  claim: "migration leaves valid JSON"
  check: "node -e 'JSON.parse(...)'"
  result: passed
  artifact: "config.v2.json"
  taskId: tsk_3
```

Without it, the same four fields in your plan file or commit message.

## Results, and what each honestly means

| Result | Meaning |
|---|---|
| `passed` | The check ran and said yes |
| `failed` | The check ran and said no |
| `blocked` | The check could not run — name what blocked it |
| `not_verified` | Nobody ran it. Do not dress this up as progress |
| `judgement` | A human decided. Say who and on what basis |

`not_verified` is a legitimate result. Reporting it as `passed` is not.

## Task linking

With the recorder, evidence carries a `taskId`. A task cannot be completed
without evidence linked to that task, and evidence with no `taskId` cannot
satisfy any task. This is what stops a passing check for the wrong thing from
closing the right task.

See [evidence model](../recorder/evidence-model.md).

## Where it lives without the recorder

Your project plan, a handoff note, or the commit message. The pack requires no
`.vstack/` directory; the fallback is stated in
`skills/route`, `skills/plan` and `skills/evidence`.

---

See also: [lifecycle](lifecycle.md) · [recorder evidence model](../recorder/evidence-model.md) · [verification](../reference/verification.md)
