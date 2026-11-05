# First delivery

One delivery, from request to close, with and without the recorder.

The scenario is small on purpose: add a `hello()` function with a check that
proves it. Substitute your own work.

## Step 1 — route

Load the `route` skill. It picks one playbook, one rigour tier and at most two
skills before anything else loads.

For this work the playbook is `build-feature` and the tier is `quick`.

Write the route into your project plan. A route that exists only in the
conversation is not a route.

With the recorder:

```text
vstack_route
  action: open
  title: "hello function"
  tier: quick
  playbook: build-feature
  outcome: "a hello() function with a check that proves it"
  doneWhen: "node check.js passes"
```

Without the recorder, put the same five facts at the top of your plan file.

## Step 2 — plan

Load the `plan` skill. Order the work into tasks. Every task needs a check —
the command or observation that proves it done.

```text
vstack_task  action: add  title: "write hello.js"       check: "test -f hello.js"
vstack_task  action: add  title: "write check.js"       check: "node check.js exits 0"
```

Without the recorder, the plan file holds the same rows.

## Step 3 — build

Do the work. Nothing to record yet.

```js
// hello.js
export function hello() {
  return "hello";
}
```

## Step 4 — prove

Run the check. Record what it actually said, not what you expected.

```bash
node check.js
# PASS: hello() === "hello"
```

With the recorder:

```text
vstack_evidence
  claim: "hello() returns hello"
  check: "node check.js"
  result: passed
  artifact: "hello.js"
  taskId: tsk_1
```

Then complete the task with the evidence that proves it:

```text
vstack_task  action: complete  taskId: tsk_1  evidenceId: ev_1
```

Completion without evidence for that task is refused. Evidence with no
`taskId` cannot satisfy it.

Without the recorder, the evidence goes into the plan file or the commit
message: claim, command, result, artifact.

## Step 5 — review

Record what a reviewer needs. With the recorder:

```text
vstack_decision
  choice: "return a literal rather than read a config"
  alternatives: "read greeting from config"
  reason: "a config lookup is untestable without fixture setup"
  consequence: "callers cannot customise the greeting"
  owner: "you"
```

## Step 6 — close

With the recorder:

```text
vstack_close
  summary: "hello() with a passing check"
  review: { outcome: approved, owner: "you" }
```

A close with open tasks, missing evidence or failed task-linked evidence is
refused. A review of `changes_requested` is refused.

Without the recorder, write the same summary at the bottom of your plan.

Either way, the delivery ends with an artifact a later reader can check.

## What you should have at the end

| Artifact | Where |
|---|---|
| Route | plan file or `.vstack/state.json` |
| Plan with checks | plan file or `.vstack/` |
| Code | `hello.js` |
| Evidence: claim, command, result, artifact | plan, commit message, or `.vstack/` |
| Handoff or summary | handoff note or `.vstack/` |

If you cannot point at the artifact for a claim, the claim is not evidence.

---

See also: [lifecycle](methodology/lifecycle.md) · [artifacts](methodology/artifacts.md) · [recorder tools](recorder/tools.md)
