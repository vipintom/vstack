# Recipe: refactor

Structure changes, behaviour must not. The safety net exists before the first
edit.

**Budget:** 5 skill loads.
**Skills:** `coverage`, `refactor`, `verify`.

## The rule

If behaviour changes even slightly, this is not a refactor — it is
`build-feature` or `fix-bug`. Routing picks the wrong playbook when this
distinction is blurred.

## Route

```text
vstack_route
  action: open
  title: "split the parser module"
  tier: standard
  playbook: refactor
  outcome: "parser split into lex and parse with identical behaviour"
  doneWhen: "the full test suite passes before and after with no assertion changes"
  skills: ["coverage", "refactor", "verify"]
  skipped: ["tdd"]
```

`tdd` is skipped deliberately: no behaviour is being added, so there is nothing
new to specify. The existing suite is the specification.

## Prove the net first

Load `coverage`. Before touching anything, establish that the tests actually
cover what you are about to move.

```text
vstack_evidence
  claim: "the parser is covered by the existing suite"
  check: "npm test -- parser"
  result: passed
  artifact: "coverage report"
```

If coverage is thin, add tests for the current behaviour **first**. A refactor
on an untested surface is an unverified rewrite.

## Record the baseline

```text
vstack_task  action: add  title: "record baseline suite result"  check: "suite passes on unmodified code"
```

```text
vstack_evidence
  claim: "suite green before the change"
  check: "npm test"
  result: passed
  artifact: "test output"
  taskId: tsk_1
```

## Build — one increment at a time

Load `refactor`. Move one thing. Run the suite. Commit.

```text
vstack_task  action: add  title: "extract lex()"   check: "npm test passes, no assertion edited"
vstack_task  action: add  title: "extract parse()" check: "npm test passes, no assertion edited"
```

The check has two parts and both matter: the suite passes **and** no assertion
changed. Editing an assertion during a refactor is the tell that behaviour
moved.

```text
vstack_evidence
  claim: "lex() extracted with identical behaviour"
  check: "npm test && git diff --stat -- '*test*'"
  result: passed
  artifact: "src/lex.ts"
  taskId: tsk_2
```

`git diff` on the test files is the second half of the proof. An empty diff is
the artifact.

## Prove

```text
vstack_evidence
  claim: "suite green after the change"
  check: "npm test"
  result: passed
  artifact: "test output"
  taskId: tsk_4
```

Compare against the recorded baseline. Same assertions, same results.

## Close

```text
vstack_close
  summary: "parser split; suite green with no assertion changes"
  review: { outcome: approved, owner: "you" }
```

## What you should have

A green suite recorded **before** the first edit, one commit per increment, and
a test-file diff that is empty at the end.

---

See also: [playbooks](../pack/playbooks.md) · [artifacts](../methodology/artifacts.md) · [first delivery](../first-delivery.md)
