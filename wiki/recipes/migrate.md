# Recipe: migrate

Stored data, a public contract or a running system changes shape — without a
flag day.

**Budget:** 6 skill loads.
**Skills:** `migration`, `verify`, `plan`.
**Tier:** Deep. Migrations force Deep — see [tiers](../methodology/tiers.md).

## Why Deep is forced

- Data is rewritten, deleted or migrated → Deep.
- The change cannot be undone by a revert → Deep.

Downgrading after the migration has run is not available. The tier is fixed by
what already happened.

## Route

```text
vstack_route
  action: open
  title: "config v1 to v2"
  tier: deep
  playbook: migrate
  outcome: "config.v2.json produced and valid"
  doneWhen: "migrated output parses and passes the v2 validator"
  skills: ["migration", "verify"]
  skipped: ["red-team"]
  phase: shape
```

## Shape — name the shapes

```text
vstack_decision
  choice: "write v2 alongside v1, cut over later"
  alternatives: "rewrite v1 in place"
  reason: "in place leaves no rollback and no comparison"
  consequence: "two files exist until the cutover"
  owner: "you"
```

State explicitly:

- the source shape
- the target shape
- what is lost, if anything
- the check that proves the target is valid

## Plan

```text
vstack_task  action: add  title: "write the migrator"        check: "node migrate.js exits 0"
vstack_task  action: add  title: "produce config.v2.json"    check: "file exists and is valid JSON"
vstack_task  action: add  title: "validate against the v2 schema" check: "node validate.js exits 0"
```

## Build and prove

```text
vstack_task  action: complete  ...  # after each
```

```text
vstack_evidence
  claim: "migrator runs cleanly"
  check: "node migrate.js"
  result: passed
  artifact: "config.v2.json"
  taskId: tsk_2
```

```text
vstack_evidence
  claim: "migrated output satisfies the v2 schema"
  check: "node validate.js"
  result: passed
  artifact: "config.v2.json"
  taskId: tsk_3
```

## Prove — compare, do not assume

Run the target validator and, if one exists, a round-trip or equivalence check.
Record what each said.

If a field is dropped by design, that is a `judgement` result with an owner —
not a silent omission.

## Review

Deep requires a reviewer who did not write the change. Record who, and what
they checked.

```text
vstack_close
  summary: "config v2 produced and validated; v1 retained"
  review: { outcome: approved, owner: "<reviewer>" }
```

## What you should have

The source and target shapes written down before code, a decision about
rollback, a validator run recorded as evidence, and a reviewer who did not
author the migration.

---

See also: [tiers](../methodology/tiers.md) · [playbooks](../pack/playbooks.md) · [enforcement](../recorder/enforcement.md)
