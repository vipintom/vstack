# Evidence model

Evidence is a claim with four parts, linked to the task it proves.

## The four parts

| Part | Example |
|---|---|
| `claim` | "migration leaves valid JSON" |
| `check` | `node -e 'JSON.parse(require("fs").readFileSync("config.v2.json"))'` |
| `result` | `passed` |
| `artifact` | `config.v2.json` |

Drop any one and it stops being evidence.

## Results

| Result | Meaning | Completes a task? |
|---|---|---|
| `passed` | The check ran and said yes | yes |
| `failed` | The check ran and said no | no |
| `blocked` | The check could not run; name what blocked it | no |
| `not_verified` | Nobody ran it | no |
| `judgement` | A human decided; say who and on what basis | yes |

`not_verified` is honest and always recordable. Reporting it as `passed` is
the failure mode the whole method exists to prevent.

## Task linking

```text
vstack_evidence
  claim: "hello() returns hello"
  check: "node check.js"
  result: passed
  artifact: "hello.js"
  taskId: tsk_1
```

The `taskId` is what makes completion enforceable:

- A task completes only against evidence carrying that task's id.
- Evidence with no `taskId` cannot complete any task.
- Evidence linked to task A cannot complete task B.

Without this, a green check on the wrong file closes the right row.

## Unlinked evidence

Evidence recorded with no `taskId` is still valid — it just completes nothing.
It exists as a standalone claim: a measurement, an observation, a decision's
basis.

The panel shows it separately from task-grouped evidence, so it is never
mistaken for proof of a task.

## With no recorder

The same four fields, written into the project plan, a handoff note, or the
commit message:

```text
Claim:   hello() returns hello
Check:   node check.js
Result:  PASS: hello() === "hello"
Artifact: hello.js
```

The pack requires no `.vstack/` directory. See
[portable use](../pack/portable-use.md).

## What the recorder does not do

It does not run `check`. It records the command and the result you report. The
honesty is yours; the recorder's job is to make the four parts difficult to
leave out.

---

See also: [artifacts](../methodology/artifacts.md) · [enforcement](enforcement.md) · [close record](close-record.md)
