# Glossary

Terms as this method uses them. Where a term has a canonical definition in the
pack, this page links rather than restates.

| Term | Meaning |
|---|---|
| **Delivery** | One unit of work with an outcome and a done-when. One is active at a time. |
| **Playbook** | A situation entry point. Thirteen exist. Routing picks one. |
| **Skill** | A named procedure with an artifact per step. Fifty-four exist. |
| **Principle** | A rule with a trigger, a test and the failure it prevents. Twelve exist. |
| **Tier** | How much rigour the work earns: `quick`, `standard`, `deep`. |
| **Phase** | A stage of a delivery: `route`, `shape`, `plan`, `build`, `prove`, `review`, `close`. |
| **Route** | The recorded choice of playbook, tier and skills, made before loading. |
| **Artifact** | Anything a later reader can inspect: a file, command output, commit, decision, handoff. |
| **Evidence** | A claim with a check, a result and an artifact. |
| **Check** | The command or observation that tests a claim. |
| **Not run** | The check did not execute. Never rendered as done or as passed. |
| **Gate** | A condition the recorder refuses to let you pass without proof. |
| **Waiver** | A recorded gap with a reason and an owner. It never bypasses a gate. |
| **Handoff** | State, next action, blockers and tree status for the next session. |
| **Close record** | The durable JSON and Markdown output of a closed delivery. |
| **Recorder** | The optional OpenCode plugin. The only writer of `.vstack/`. |
| **Panel** | The optional OpenChamber extension. Reads `.vstack/`, writes nothing. |
| **Pack** | The Markdown method: 54 skills, 13 playbooks, 12 principles. |
| **State schema** | The versioned shape of `state.json`. Currently `1`. |
| **Revision** | A counter incremented per event; the panel's stale check compares it. |
| **Hash chain** | Each history line carries the previous line's hash, so edits are refused. |

## Three pairs that are easy to confuse

| Pair | Difference |
|---|---|
| Claim vs evidence | A claim without an artifact is just a claim |
| Failed vs not run | `failed` means the check said no; not run means nobody asked |
| Waiver vs bypass | A waiver records a gap; a bypass closes one — the recorder has no bypass |

## Terminology this method avoids

"Done" without a check. "Verified" for a check that did not execute.
"Passing" for `not_verified`. "Should work" as a result.

---

See also: [artifacts](../methodology/artifacts.md) · [evidence model](../recorder/evidence-model.md) · [verification](verification.md)
