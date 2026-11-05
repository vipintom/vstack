# Skill anatomy

Every skill in the pack has the same shape. Knowing it means you can read any
of the 54 without learning a new format each time.

## Front matter

```yaml
---
name: route
description: Use when a request arrives with no playbook open and the approach must be chosen before skills load; not for a one-file edit, a question a single read answers, or work whose route is already recorded.
---
```

Two fields only: `name` and `description`. No tier, rigour, status, harness or
pairs-with fields.

The description carries both directions — when to use it **and** when not to.
The "not for" clause is what stops a skill firing on work that belongs
elsewhere, and it usually names the skill that belongs there instead.

## Body

| Section | Purpose |
|---|---|
| Opening paragraph | What the skill does, in two sentences |
| **When to use** | Triggers, plus near misses and where each belongs instead |
| **Steps** | The procedure; **each step names the artifact it leaves** |
| **Output** | What a correct result looks like, often as a record |
| **Failure** | What to do when the procedure does not apply |

Sections are not mandatory beyond the steps. `## Tracking`,
`## Rationalizations`, `## Modes` and `## Verification` are explicitly not
required and must not be reintroduced.

## The artifact rule

The load-bearing constraint. Every step ends with an artifact:

```text
1. **State the outcome.** ... Artifact: `outcome` and `done-when` in the record.
2. **Decide triviality.** ... Artifact: `tier: quick`.
3. **Choose the playbook.** ... Artifact: playbook name and one line of why.
```

A step with no named artifact is a step you cannot verify happened.

## Length

60–90 lines is the target. 120 is the maximum.

Anything longer belongs in `skills/<name>/references/` and must load on
demand — never as part of the skill's default body. Only eight reference files
exist in the pack, which is the point: depth is the exception.

## The recorder is optional

If a skill names a `vstack_*` tool, the same step must name the file artifact
that survives without it. No skill requires a `.vstack/` path.

```text
6. **Record the route.** With the recorder installed, call `vstack_route` with
   the playbook, tier, skills and skipped. Without it, write the same fields at
   the project plan or a delivery note in the repository.
```

## A count in a document must match disk

```bash
grep -c '^## Tracking\|^## Rationalizations\|^## Modes\|^## Verification' \
  vstack-playbook/skills/*/SKILL.md
# no matches
```

---

See also: [skills](skills.md) · [writing skills](writing-skills.md) · [portable use](portable-use.md)
