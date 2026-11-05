# Portable use

The pack works with no plugin, no `.vstack/` directory and no network.

This is not a fallback path. It is the primary path — the recorder and panel are
optional add-ons.

## What you need

- The clone
- Somewhere to point your harness at `skills/`

That is all.

## Without a harness

Read the files.

```bash
git clone https://github.com/vipintom/vstack-playbook.git
cat vstack-playbook/playbooks/fix-bug.md
cat vstack-playbook/skills/route/SKILL.md
cat vstack-playbook/principles/index.md
```

Nothing in the pack requires execution. There is no build step, no manifest to
validate, no install script.

## With OpenCode

```bash
cp -r vstack-playbook/skills/* ~/.config/opencode/skills/
```

Ask for `route`. It will choose a playbook, a tier and at most two skills.

## Without the recorder

Every step that offers a `vstack_*` call also names a file. Use the file.

| Recorder would write | You write instead |
|---|---|
| `vstack_route` | Top of your project plan, or a delivery note in the repo |
| `vstack_task` | Task rows with checks, in the plan |
| `vstack_evidence` | Claim, command, result, artifact — plan or commit message |
| `vstack_decision` | The decision and its alternatives, in the plan |
| `vstack_handoff` | A handoff note |
| `vstack_close` | A summary line proving the done-predicate |

The fallback is named in `skills/route`, `skills/plan` and `skills/evidence`:
**the project plan or a handoff note**. No skill requires `.vstack/`.

## Offline

The pack is Markdown. A clone works with no network after it is cloned.

## Windows

Point your harness at the clone with forward slashes:

```text
C:/work/vstack-playbook/skills
```

No script and no native dependency is involved.

## Proof

```bash
./docker/skills-only-smoke.sh
```

Runs all four release playbooks — `build-feature`, `fix-bug`, `deliver`,
`migrate` — in real sessions with **no plugin installed**. Each must write plan,
evidence and handoff files, and must create no `.vstack/` directory.

The harness lives in the workspace that holds the three component repositories
and is not published with any of them.

## What you give up

Only persistence you did not have anyway. The plan file you would have written
is the record; a later session reads it instead of querying state. The
difference is that the recorder enforces the gates — see
[enforcement](../recorder/enforcement.md) — where a file relies on you.

---

See also: [choosing a path](../choosing-a-path.md) · [installation](../installation.md) · [artifacts](../methodology/artifacts.md)
