# vstack 0.2.0 PRD coverage audit

**Date:** 2026-11-05
**Spec:** `docs/vstack-0.2.0-prd.md`
**Scope:** `vstack-playbook`, `vstack-opencode`, `vstack-openchamber`

## Verdict

The pack, recorder and panel implement the 0.2.0 PRD. Two items remain outside
this workspace: a live OpenChamber install and registry publication. Every other
gap found in the first audit is fixed and covered by a check.

Verification is the output of the commands below, all run in Docker:

```bash
./docker/test.sh all             # recorder 38, panel 24, pack 54/13/12
./docker/opencode-smoke.sh       # six tools in a real session, 7 events
./docker/skills-smoke.sh         # route skill plus recorder, closed delivery
./docker/skills-only-smoke.sh    # four playbooks, no plugin, no .vstack
./docker/playbooks-smoke.sh      # four playbooks through the recorder
```

## Fixed gaps

| # | Gap | Fix | Evidence |
|---|---|---|---|
| 1 | Close accepted open tasks through a waiver and ignored failed checks | Waiver is recorded but never bypasses the gates; close refuses open tasks and any failed evidence linked to a task | `vstack-opencode/src/service.ts`; `vstack-opencode/test/tools.test.ts` |
| 2 | Panel reported fresh state as stale | Health compares the last history revision with `state.revision`; recorder writes revision into every event | `vstack-openchamber/panel/src/model.ts`; `vstack-openchamber/test/model.test.ts` |
| 3 | Park was advertised but absent | `vstack_route` action `park` archives the delivery and frees the slot; `resume` restores it | `vstack-opencode/src/service.ts`; `vstack-opencode/test/tools.test.ts` |
| 4 | Evidence was not grouped by task and not-run was invisible | Evidence view groups by task and shows not run; unlinked evidence is separate | `vstack-openchamber/panel/src/app.ts`; `vstack-openchamber/test/app.test.ts` |
| 5 | Decisions view omitted waivers | Decision view shows the review outcome and waiver | `vstack-openchamber/panel/src/app.ts`; `vstack-openchamber/test/app.test.ts` |
| 6 | Now view omitted the next action | Now shows `handoff.nextAction` | `vstack-openchamber/panel/src/app.ts`; `vstack-openchamber/test/app.test.ts` |
| 7 | Walkthrough proof missing on both sides | Four release playbooks run in real sessions with no plugin and no `.vstack`, and through the recorder with evidence and archived records | `docker/skills-only-smoke.sh`, `docker/playbooks-smoke.sh` |
| 8 | Release notes, rename map, migration notes missing | `RELEASE-NOTES.md` in each repository | three release notes |
| 9 | Pack declared no version | Version 0.2.0 in the pack README, AGENTS and release notes | `vstack-playbook/README.md` |
| 10 | Recorder and panel had no LICENSE or NOTICE | MIT licence and NOTICE in both repositories, shipped in package files | `LICENSE`, `NOTICE` and `package.json` in both TypeScript repositories |
| 11 | Compatibility said "latest release" | Exact floors: OpenCode V2 with `@opencode/plugin` >= 2.2.0; OpenChamber >= 1.24.0; schema 1 | READMEs and `package.json` in both TypeScript repositories |
| 12 | README claimed failed-check enforcement and git ignore behaviour that did not exist | Enforcement implemented; `.vstack/.gitignore` written on first use | `vstack-opencode/src/state/store.ts`; `vstack-opencode/test/state-store.test.ts` |
| 13 | History edits were not detected | Append-only SHA-256 hash chain; an edited or reordered line is refused | `vstack-opencode/src/state/store.ts`; `vstack-opencode/test/state-store.test.ts` |
| 14 | Close record had no review outcome | Review outcome, notes and owner recorded in JSON and Markdown; changes-requested refuses close | `vstack-opencode/src/service.ts`; `vstack-opencode/test/tools.test.ts` |
| 15 | Plan rows and health states lacked copyable commands | Plan rows carry start/complete commands; stale, invalid and incompatible states carry a command | `vstack-openchamber/panel/src/app.ts`; `vstack-openchamber/test/app.test.ts` |
| 16 | Panel reloaded every archive every refresh | Archives cached until state or history changes; state and history read once per refresh | `vstack-openchamber/panel/src/api.ts` |
| 17 | Deliveries view was blocked by broken `state.json` | Archived deliveries remain browseable; health still reports invalid | `vstack-openchamber/panel/src/app.ts`; `vstack-openchamber/test/app.test.ts` |
| 18 | Read errors were swallowed | Only missing files become null; other read errors surface as a failed read | `vstack-openchamber/panel/src/api.ts` |
| 19 | Skills required a `.vstack/` fallback | Fallback is the project plan or a handoff note; no skill mentions `.vstack` | `vstack-playbook/skills/route`, `plan`, `evidence` |
| 20 | Uninstall, Windows and offline paths undocumented | Added to all three README files | README files |
| 21 | Issues-only policy stated once | Added to all three README files | README files |
| 22 | CI ran checks on a host runner | Workflows run inside `node:24-bookworm` containers | `ci.yml` and `release.yml` in both TypeScript repositories |
| 23 | Panel performance target untested | Test renders 50 archived deliveries under 300 ms | `vstack-openchamber/test/app.test.ts` |
| 24 | Readiness was a hand-set plan string | Plan status points at the audit and the reproducible commands | `plans/...implementation-plan.md` |

## Remaining external work

| Item | Why it is not done here | Next action |
|---|---|---|
| Live OpenChamber install | Requires Settings -> Extensions in the desktop app | Install from the repository, open all seven views, then record the result |
| npm publication | No registry credentials in this environment | Run the recorder release workflow with `NPM_TOKEN`, then `opencode plugin add @vipintom/vstack-opencode` |

All three repositories are pushed at `v0.2.0` with the tag on the release
commit. The panel installs from the Git repository; the recorder installs from
a clone with `pnpm build`, or from npm once published.

## Notes

- The recorder is the only writer of `.vstack/`. The panel has no write or
  network path.
- Missing stays missing: a task without evidence renders as not run; a newer
  schema renders as incompatible with no partial view.
- Every published number is reproduced by `./docker/test.sh all` or by the count
  commands in the pack release notes.
