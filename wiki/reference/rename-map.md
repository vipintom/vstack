# Rename map

0.1.0 used long skill names. 0.2.0 uses short ones.

The full 55-row map lives in the pack's release notes. This page explains how to
use it — it does not copy it.

## The map

→ [`vstack-playbook/RELEASE-NOTES.md`](https://github.com/vipintom/vstack-playbook/blob/master/RELEASE-NOTES.md),
section **Rename map: 0.1.0 to 0.2.0**.

## How to use it

**If you have a 0.1.0 name and want the 0.2.0 skill:**

Find the old name in the left column; the right column is the skill directory
now.

```bash
grep '`vstack-debug`' vstack-playbook/RELEASE-NOTES.md
```

**If you have a document, config or muscle memory using a 0.1.0 name:**

Same lookup. If no row matches, the name is either new in 0.2.0 or removed with
no direct successor.

## Names with no successor

Some 0.1.0 concepts were removed rather than renamed:

- Roles, rubrics as a separate layer, templates
- Workflow files — situations are now **playbooks**
- Trigger and evaluation suites
- Install profiles
- The resource manifest

## Names that must not come back

Do not revive `vstack-*`, `mode`, `how`, `why`, `architect`, `blast-radius`,
`arena`, `best-of-n` or `swarm`.

This is stated in the pack's `AGENTS.md` so a contributor does not reintroduce
one by copying an old branch.

## New in 0.2.0

`api-design`, `browser-testing`, `ci`, `evidence`, `fastapi`,
`frontend-design`, `mcp-server`, `shape`, `technical-writing`, `typescript`.

These have no 0.1.0 predecessor.

## Not migrated

0.1.0 contract and projection state is not migrated. The 0.2.0 recorder starts
at `.vstack/` schema `1`. See [state schema](state-schema.md).

---

See also: [skills](../pack/skills.md) · [faq](faq.md) · [compatibility](compatibility.md)
