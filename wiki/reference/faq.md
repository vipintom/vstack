# FAQ

Real questions, with answers grounded in the repositories.

## Do I need the recorder to use the pack?

No. Every skill completes without it. Where a skill offers a `vstack_*` call,
the same step names a file artifact that survives without it. See
[portable use](../pack/portable-use.md).

## Do I need OpenChamber?

No. The panel reads what the recorder writes. Without either, your plan file and
commit messages are the record.

## Does the pack work outside OpenCode?

The pack is Markdown. Claude Code and Codex mappings are **experimental in
0.2.x** — the Markdown works; the exact discovery path does not. Only OpenCode
is tested end to end. See [compatibility](compatibility.md).

## Why at most two skills?

The cap forces a judgement about which two matter. Three are allowed at Deep,
because Deep work genuinely spans contract, data and adversarial review. See
[routing](../methodology/routing.md).

## What happens when no playbook fits?

Route to `figure-it-out` and say what made the situation unrecognisable. Do not
force a wrong playbook to avoid admitting the gap.

## Can a waiver let me close with open tasks?

No. A waiver is recorded with a reason and an owner, and never bypasses a gate.
Open tasks, failed checks and `changes_requested` all refuse the close. See
[enforcement](../recorder/enforcement.md).

## Can I edit `.vstack/history.jsonl`?

No. It is append-only and hash-chained; an edited, reordered or deleted line is
refused on read. There is no repair path — delete and rebuild if a history
predates the chain.

## Can two deliveries be active at once?

No. `park` archives the current one and frees the slot; `resume` restores it.
See [park and resume](../recorder/park-resume.md).

## Why does the panel show **not run** instead of blank?

A blank reads as "nothing to show". **Not run** states that the check did not
execute. The distinction is the whole point. See
[panel states](../panel/states.md).

## Why does the panel render nothing when the schema is newer?

A partially understood record would present guesses as facts. `incompatible`
with no partial rendering is the honest behaviour.

## Does the recorder run my checks?

No. It records the command and the result you report. The honesty is yours; the
recorder's job is to make the four fields hard to leave out.

## Does the panel write anything?

No. No write path, no network path, no shell. Actionable rows offer a
**copyable** command. See [read-only](../panel/read-only.md).

## Is `opencode plugin add @vipintom/vstack-opencode` available?

Only after the package is published to npm. Until then, install from a clone —
see [installation](../installation.md).

## Why does the recorder have no dependencies?

OpenCode loads a local plugin directory by reading its files, not by installing
its dependencies. An unresolved import fails the plugin before `setup` runs, and
the symptom looks like "the hook never fired".

```bash
node -e "console.log(JSON.stringify(require('./vstack-opencode/package.json').dependencies))"
# {}
```

## Where is the test harness?

In the workspace that holds the three component repositories. It is not
published with any of them, which is why the component READMEs say so.

## How do I verify a claim in this wiki?

Every number has a command in [verification](verification.md).

---

See also: [verification](verification.md) · [compatibility](compatibility.md) · [index](../index.md)
