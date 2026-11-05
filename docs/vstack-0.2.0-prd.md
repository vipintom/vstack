# vstack 0.2.0 — Product Requirements Document

| Field | Value |
|---|---|
| Product | vstack — agentic development methodology, portable skill pack and optional workspace |
| Version | 0.2.0 |
| Status | Draft for review |
| Owner | Vipin Tom (solo maintainer) |
| Date | 2026-11-05 |
| Supersedes | vstack 0.1.0 — `vstack-playbook`, `vstack-opencode`, `vstack-openchamber`, the umbrella `vstack` (now the documentation-only home); and the earlier 0.2.0 drafts |
| Related | Audit of 2026-11-05; redesign discussion of 2026-11-05 |

---

## 1. Summary

vstack 0.2.0 is one methodology delivered in three layers:

1. **A portable skill pack** — 54 skills, 13 playbooks and 12 principles in plain Markdown. It works in OpenCode and any other harness that reads Markdown skills, with no plugin, runtime or state format.
2. **An OpenCode recorder** — six tools that open a delivery, track tasks, record evidence, decisions and handoffs, and close the work with a durable record. It is the only writer of vstack state.
3. **A read-only OpenChamber panel** — seven views over that state: what is active, what is planned, what was proven, what happened, what was decided, every delivery recorded, and what is healthy.

The pack teaches the method. The plugin instruments it. The panel makes it visible.

**Positioning.** Popular packs teach an agent how to work. vstack teaches one route through a delivery, proves each step with an artifact, and — for the owner — shows the method working in real time. The proof layer is optional for every other harness.

---

## 2. Problem and rationale

A 2026-11-05 audit of the four 0.1.0 repositories produced roughly ninety findings, including nine blockers: the OpenCode integration failed on nearly every path, contract validation validated nothing, the website published 529 broken internal links and fabricated capability data, and the shipped archive was corrupt.

Beneath the individual defects sit four systemic causes:

| Cause | Evidence in 0.1.0 |
|---|---|
| Assertion without verification | "Release ready" was a hand-set flag; "103/103 tests" omitted two skips and never ran the production path; "0 errors, 0 warnings" came from a validator that could not fail |
| Untested write paths | Tests exercised helpers rather than the real wiring; built output predated its sources; schema validation was never applied |
| Duplicated sources of truth | Capability matrix twice, capability data three times, contract types twice, skill counts in six places |
| Fail-open defaults | Errors swallowed into `null` and empty lists; strict rules downgraded to warnings; enforcement skipped when a lookup failed |

The first 0.2.0 reaction overcorrected: it proposed a standalone Markdown pack with no plugin and no panel. That removed the workflow the owner actually uses every day. The second reaction overcorrected again, building a delivery ledger, CLI, panel, adapter, schemas, manifest and evaluation suite as one platform. That made the pack heavy.

The correct boundary:

- **Portable core.** The method must work without any vstack software.
- **Optional cockpit.** The OpenCode plugin records the work; the OpenChamber panel shows it.
- **No duplicate runtime.** The plugin is the runtime. There is no separate ledger, CLI or service.

The audit also established that the existing skills are original writing — maximum five-gram similarity of 0.031 against installed packs — so the library is an asset.

**Root cause, stated once:** documentation was treated as proof, and scope was not split between what every harness needs and what only the owner uses. 0.2.0 separates the portable method from the instrumented workspace.

---

## 3. Vision and positioning

**Vision.** An engineer hands a colleague the pack and says: this is how I do agentic development — install it and you will work the same way. In the owner's OpenCode, the same method is recorded and visible without extra effort.

vstack therefore:

- owns the route from request to reviewed, proven work;
- ships as readable Markdown that a person can audit and edit;
- works without a plugin, and is better with one;
- records only what the agent actually did;
- never hides a skipped check, a missing artifact or a stale view;
- credits what it borrows and claims no capability another tool provides.

**What "standalone" means.** The pack alone is a complete methodology. The plugin and panel are enhancements for one harness, not prerequisites. A skill that fails without the plugin is a defect.

---

## 4. Users and modes

| User | Context | Job to be done |
|---|---|---|
| **Owner (primary)** | Works daily in OpenChamber with OpenCode; several deliveries a week across repositories | Start quickly, follow one route, keep state without writing it by hand, prove what was done, see progress |
| **Peer (secondary)** | Asks "how do you work with agents?"; uses OpenCode, or reads the pack for another harness | Install once, understand the method in under thirty minutes, complete a real delivery |
| **Future contributor** | Wants to add or fix a skill | Know the quality bar, check the change, get a review without guessing |

### Modes of use

| Mode | Composition | Guarantees |
|---|---|---|
| **Pack** | Skills, playbooks, principles | Complete method; artifacts are commits, command output, notes and handoff files |
| **Pack + Recorder** | Above, plus the OpenCode plugin | Six tools; state in `.vstack/`; tasks cannot pass without evidence; close is validated |
| **Pack + Recorder + Panel** | Above, plus the OpenChamber panel | Live progress, evidence history, decisions and health, read-only |

All three are first-class. The owner uses the third; a peer may use the first.

---

## 5. Goals, non-goals, anti-goals

### Goals

- G1. A stranger can install the pack and complete a delivery with no vstack software.
- G2. Rigour is chosen and proportionate: trivial work runs two phases, deep work runs six.
- G3. Every claim is backed by an artifact a reader can inspect.
- G4. In OpenCode, the method records itself: no hand-maintained status file.
- G5. The panel shows only recorded facts, never a derived fiction.
- G6. Continuity costs one panel glance or one handoff read, not a re-read of history.
- G7. A peer gets the same method and quality as the author, with or without the plugin.
- G8. One person can maintain the pack, plugin and panel without a platform team.

### Non-goals

- N1. Not an agent orchestrator, model router or subagent framework — the harness owns those.
- N2. Not a project manager: no sprints, estimates, backlog or capacity planning.
- N3. Not a test framework: checks run the project's own commands.
- N4. Not a hosted service, account system or telemetry product.
- N5. Not a general ledger, issue tracker or documentation generator.
- N6. Not a marketplace listing or a funded product; a personal framework, shared on request.
- N7. Not a plugin for harnesses other than OpenCode in 0.2.0.

### Anti-goals — failure even if everything appears to work

- A1. A user installs the pack and no skill ever fires.
- A2. A completion claim has no command, output or artifact behind it.
- A3. A task renders as done with no evidence.
- A4. The panel displays a value the plugin never recorded.
- A5. A published number cannot be reproduced by a command.
- A6. A skill fails when the plugin is unavailable.
- A7. The plugin runs project commands, or the panel writes state.
- A8. Ceremony proportional to nothing: a typo demanding six phases.

---

## 6. Product principles

Binding on every requirement below.

1. **Portable core first.** The pack must work with no vstack software.
2. **Rigour is chosen and stated**, never assumed.
3. **A claim is an artifact.** No artifact, no claim.
4. **Unknown stays unknown.** Missing renders as missing, never as zero or success.
5. **One writer.** The plugin writes state; the panel reads it.
6. **The plugin records; it does not execute.** Checks are run by the skill or the user.
7. **The panel never writes.**
8. **One job per skill.** A new skill needs a job no existing skill performs.
9. **Harness-neutral language.** Skills describe actions, not vendor tools; optional tool calls are named as optional.
10. **Borrow with attribution.**
11. **Delete before adding.**

---

## 7. Methodology

### 7.1 Structure

One entry step and six phases:

**Entry — Route** → **Shape** → **Plan** → **Build** → **Prove** → **Review** → **Close**

Recording and continuity are continuous obligations, not extra phases.

| Step | Produces | Ends when |
|---|---|---|
| Route | One playbook, one rigour tier, at most two skills loaded, an open delivery | Tier stated; every skipped phase named |
| Shape | Problem, outcome, done-when, non-goals, risk class | Scope block complete; deep work has an agreed design before code |
| Plan | Tasks with acceptance criteria and the check that verifies each | Every task has a check or a named manual observation |
| Build | Changes, tests, notes on surprises | Tasks closed; working-tree state recorded |
| Prove | Evidence: claim, command, result, artifact | Required checks green or explicitly skipped |
| Review | Findings with severity and evidence; waivers with reasons | No open blocking finding; builder did not verify their own work |
| Close | A durable record and a handoff | Record written; work merged, shipped or parked with a reason |

### 7.2 Rigour tiers

| Tier | Applies to | Steps that run |
|---|---|---|
| Quick | Typo, config, one-file obvious fix | Shape (one paragraph) + Prove. Skipped steps named |
| Standard | Features, bugs, refactors — the default | All six phases |
| Deep | Architecture, migration, security, irreversible or cross-repo change | All six, plus adversarial review, a decision record and a rehearsed rollback |

### 7.3 Non-negotiable rules

- **R1 — A claim is an artifact.** A command, its output, a test result, a commit, or a named manual observation.
- **R2 — Unknown stays unknown.** A check that did not run is reported as not run.
- **R3 — Separation of duties.** Verification and review happen in a context other than the one that produced the change.
- **R4 — Rigour is chosen and written down.** The tier and the skipped phases are visible in the delivery record.
- **R5 — No task passes without evidence.** Enforced by the plugin in OpenCode; a discipline everywhere else.
- **R6 — No delivery closes with open tasks or unexplained failures.** Enforced by the plugin; reviewed everywhere else.

### 7.4 Definition of done

A delivery is done only when all of the following are true:

- Acceptance criteria are met, and the checks that prove them are named.
- Required checks passed, each with its evidence.
- Review ran in a fresh context; findings are resolved or waived with reasons.
- Affected documentation is updated.
- A durable, human-readable record exists in the repository.
- If work remains, the handoff names the next action and the blockers.

---

## 8. Library requirements

### 8.1 Composition

| Component | Requirement |
|---|---|
| Skills | 54, in eight tiers |
| Playbooks | 13 situation-based entry points |
| Principles | 12 rules, each with trigger, rule, test and failure mode |

No roles, rubrics, templates, schemas, manifests, evaluation suites or install profiles.

### 8.2 Skill inventory

| Tier | Skills |
|---|---|
| Entry (3) | `route`, `help`, `principles` |
| Frame (7) | `shape`, `sharpen`, `plan`, `figure-it-out`, `code-tour`, `rationale`, `prototype` |
| Design and investigate (9) | `design`, `blueprint`, `impact`, `red-team`, `rubrics`, `audit`, `performance`, `forensics`, `migration` |
| Build and prove (10) | `tdd`, `debug`, `refactor`, `unstick`, `evidence`, `verify`, `coverage`, `verify-setup`, `verify-maintain`, `visual-parity` |
| Review and deliver (5) | `review`, `ready`, `ship`, `watch-pr`, `report` |
| Continuity (6) | `handoff`, `resume`, `recovery`, `decisions`, `lessons`, `worktree` |
| Meta (3) | `skill-authoring`, `skill-eval`, `unslop` |
| Stack (11) | `typescript`, `api-design`, `frontend-design`, `browser-testing`, `fastapi`, `docker`, `makefile`, `gitignore`, `ci`, `mcp-server`, `technical-writing` |

### 8.3 Skill requirements

- One job per skill, stated in its name in one or two words.
- The description states **when to use it and when not to**.
- Front matter carries only a name and a description.
- Short enough to read in one sitting. Depth loads on demand from a reference file.
- Every step names the artifact it leaves.
- Steps describe one path. A mode that changes the procedure is written into the step, not into a decorative table.
- No mandatory sections. A section exists because the skill needs it.
- Failure is explicit: unknown is an allowed answer, and a check that cannot run is named.
- Every skill ends with a way to know it worked.
- Every skill is tracked in git and reachable from the pack.

### 8.4 Portable recording contract

The method skills — `route`, `plan`, `evidence`, `review`, `handoff`, `close`-facing work — may mention the recorder:

- “Record with `vstack_route` when available; otherwise write the route in the plan.”
- “Record evidence with `vstack_evidence` when available; otherwise keep the command and output in the commit or handoff.”

Rules:

- a plugin mention is always optional;
- no skill requires a plugin tool to complete;
- every skill names the artifact it leaves when only files are available;
- a plugin-removed walkthrough is part of release verification.

### 8.5 Naming requirements

- Short, explanatory, lowercase, one or two words.
- No product prefix: the pack provides the namespace.
- No two names share a word unless they are a family.
- A rename is a major version and is documented in the release notes.

### 8.6 Playbooks

Thirteen: `understand`, `spike`, `build-feature`, `fix-bug`, `refactor`, `change-architecture`, `change-infrastructure`, `improve-performance`, `migrate`, `prove-ui`, `deliver`, `write-docs`, `maintain-playbook`.

Each playbook:

- names when it applies and when it does not;
- lists ordered steps as skill plus artifact;
- declares exit criteria a reader can check;
- defines a fallback when the harness offers no subagents;
- states its budget;
- never restates a skill's procedure.

### 8.7 Principles

Twelve: `understand-before-changing`, `evidence-before-completion`, `smallest-complete-change`, `model-domain-explicitly`, `respect-boundaries`, `independent-challenge`, `verifiable-increments`, `route-before-loading`, `harness-independence-first`, `degrade-gracefully`, `flexible-workflows-not-mandatory-ceremony`, `procedures-over-vague-instructions`.

A skill that cites a principle says what choice it changed.

### 8.8 Library integrity

- No dangling references anywhere.
- Every declared count equals what is present, checked by a command.
- Every skill file is tracked in git.
- No deprecated skill remains reachable.
- No two skills answer the same request.

---

## 9. The OpenCode recorder

### 9.1 Responsibility

The plugin keeps the record the agent would otherwise maintain by hand. It is the only writer of vstack state. It does not execute project commands, call models or change files outside `.vstack/`.

### 9.2 Tool surface — exactly six

| Tool | Purpose | Refuses |
|---|---|---|
| `vstack_route` | Open, switch or read the active delivery; record playbook, tier and skipped phases; with no arguments, return current state | A second active delivery with no close or park |
| `vstack_task` | Add a task with its check; start or complete it; complete requires an evidence reference | Completion without evidence; unknown delivery |
| `vstack_evidence` | Record claim, command, result, artifact path and timestamp | Empty claim or check; duplicate evidence id |
| `vstack_decision` | Record the choice, alternatives, reason, consequence and owner | A decision with no alternative or no reason |
| `vstack_handoff` | Record current state, next action, blockers and working-tree status | A handoff with no next action |
| `vstack_close` | Validate the delivery, write the durable record, mark it complete or parked | Open tasks; failed required checks; a waiver without reason and owner |

Reading status is `vstack_route` with no mutation. There is no seventh tool.

### 9.3 State

- State lives in `.vstack/` inside the project.
- State is one current delivery plus an append-only history. A closed delivery is archived to `.vstack/deliveries/<id>.json` and `.vstack/deliveries/<id>.md`; the Markdown record stays readable without vstack.
- History is append-only. Editing or deleting a past entry is refused.
- State carries a schema version so the panel can refuse a newer format instead of guessing.
- The state is plain files, readable without the plugin, the panel or vstack.

### 9.4 Enforcement

The plugin enforces what the methodology claims:

- a task cannot pass without evidence;
- a delivery cannot close with open tasks or failed required checks;
- a waiver needs a reason and a named owner;
- history is append-only;
- a phase moves forward, or backward with a recorded reason;
- one active delivery at a time.

Everything else is judgement, and stays in the skills.

---

## 10. The OpenChamber panel

### 10.1 Views — seven

| View | Content |
|---|---|
| **Now** | Active delivery, phase, next action, blockers, last activity |
| **Plan** | Tasks by status, each with its check and whether evidence exists |
| **Evidence** | Claims and check results, grouped by task; not-run is visible |
| **Timeline** | Every recorded event in order: route, task, evidence, decision, handoff, close |
| **Decisions** | Choices, alternatives, reasons, waivers |
| **Deliveries** | Every delivery recorded in this project, active and closed; select one to read its tasks, evidence, decisions and handoff |
| **Health** | Missing files, stale state, incompatible version, broken history |

Evidence answers “what was proven”; Timeline answers “what happened, in what order”. They are separate views.

### 10.2 Behaviour

- **Read-only.** No write path exists. Every actionable row offers a copyable command.
- **Truthful.** A value the plugin did not record renders as unknown; a task without evidence shows “not run”.
- **Stale-aware.** State older than the last ledger write is labelled stale.
- **Incompatible-aware.** A newer schema version produces a clear message, never partial rendering.
- **Fast.** One read per refresh; the selected delivery loads on demand.
- **Host-native.** OpenChamber theme, keyboard reachable, no colour-only status.
- **Honest about failure.** A read error is shown as an error, never as an empty project.

### 10.3 States

Five reproducible states: `missing`, `stale`, `incompatible`, `invalid`, `healthy`. Each has its own copy and a next command.

---

## 11. Data, close and continuity

### 11.1 Logical records

- **Delivery:** id, title, tier, phase, status, outcome, done-when, timestamps.
- **Task:** id, title, status, check, evidence reference, artifact.
- **Evidence:** claim, command, result, artifact path, timestamp.
- **Decision:** choice, alternatives, reason, consequence, owner.
- **Handoff:** state, next action, blockers, tree status.
- **Close record:** scope, tasks, evidence, review outcome, waivers, decision, next action.

### 11.2 Durable close

`vstack_close` writes `.vstack/deliveries/<id>.md` and the matching JSON record. The Markdown record is committed with the repository. It must be readable without vstack and contain enough to reconstruct what was done and what remains. Transient `state.json` and `history.jsonl` stay untracked.

### 11.3 Continuity

Resuming reconstructs the active delivery, next action and blockers from the state or the handoff. A new session does not need the previous chat.

### 11.4 Requirements

- D1. The plugin is the only writer of `.vstack/`.
- D2. History cannot be edited after the fact.
- D3. Completion is refused without required evidence.
- D4. A waiver is recorded with reason and owner.
- D5. The close record is readable outside vstack.
- D6. The pack works with no `.vstack/` present.
- D7. The panel refuses a state version it does not understand.

---

## 12. Functional requirements

| ID | Requirement | Acceptance |
|---|---|---|
| FR-1 | Pack works with no vstack software | Fresh harness, one install, `route` fires, a delivery completes with files and commands only |
| FR-2 | Recorder exposes exactly six tools | The tool list matches 9.2; no seventh appears |
| FR-3 | State lives in `.vstack/` | One project-local directory; readable as plain files |
| FR-4 | Task completion requires evidence | A completion call without evidence fails with a clear message |
| FR-5 | Close is validated | Open tasks or failed required checks refuse close; waiver needs reason and owner |
| FR-6 | History is append-only | Editing or deleting a past entry is refused |
| FR-7 | Panel is read-only | No mutation capability exists in the interface |
| FR-8 | Panel renders seven views | Each view renders recorded state; no fabricated value |
| FR-9 | Panel renders five honest states | Each state reproducible; missing and invalid are distinct |
| FR-10 | Every actionable row has a command | A copyable `vstack`-free command or tool call is present |
| FR-11 | Plugin absence is harmless | Plugin-removed walkthrough completes every playbook |
| FR-12 | Routing fires without being named | A new OpenCode session reaches `route` |
| FR-13 | Counts are reproducible | A documented command returns 54 skills, 13 playbooks, 12 principles |
| FR-14 | References resolve | No dangling link or old skill name |
| FR-15 | Three components version independently | Pack, plugin and panel declare compatibility; a mismatch is visible |
| FR-16 | Golden walkthroughs pass | Four playbooks complete with artifacts, with and without the plugin |

---

## 13. Non-functional requirements

- **Performance:** panel first render under 300 ms for 50 deliveries; state read under 100 ms.
- **Security:** the plugin executes no project command; it writes only inside `.vstack/`; identifiers are validated before use in a path; panel has no write or network path.
- **Portability:** pack has no native dependencies; Windows path handling documented; offline install from a clone.
- **Reliability:** no swallowed errors; typed failures at every boundary; state recoverable from plain files.
- **Accessibility:** semantic headings and tables, logical focus order, status never conveyed by colour alone.
- **Token economy:** descriptions concise; routing loads at most two skills before acting; stack tier opt-in.
- **Maintainability:** one person can change a skill in Markdown, add a tool without changing the method, and add a panel view without changing the state contract.

---

## 14. Integrity and truth requirements

- T1. Any number the product publishes about itself is produced from a source by a command.
- T2. A check fails when content, counts, references or state disagree.
- T3. Every public claim is generated or covered by a check.
- T4. Release identity is verified, never a hand-set flag.
- T5. Summary readiness fields are removed; readiness is the output of checks.
- T6. Documentation describing behaviour that no longer exists is deleted.

---

## 15. Distribution and compatibility

- D1. Three component repositories: `vstack-playbook`, `vstack-opencode`, `vstack-openchamber`. No umbrella runtime, no separate runtime, no shared contracts, no compatibility matrix, no release metadata outside those three. One documentation-only home is permitted: `vstack` holds `wiki/` and the PRD, and nothing else. Amended 2026-11-06.
- D2. Pack installs by clone or Markdown-skills CLI; plugin installs into OpenCode; panel installs into OpenChamber.
- D3. No install profiles: every skill ships, and routing decides what loads.
- D4. Installation never writes outside its target; uninstall removes only what it added.
- D5. Each component declares its version and the state schema version it reads or writes.
- D6. A mismatch produces a message, not partial behaviour.
- D7. Licence and attribution: MIT, NOTICE naming ported material.
- D8. Public read-only repository: issues welcome, pull requests not accepted in 0.2.0.

---

## 16. Success metrics

| Metric | Target |
|---|---|
| Install success on a clean machine, latest OpenCode | 100% |
| Time from install to first completed delivery (new user) | ≤ 30 minutes |
| Skills loaded before acting on a standard task | ≤ 2 |
| Steps run for a quick task | 2 |
| Tasks closed with evidence | 100% |
| Panel fields with no recorded source | 0 |
| Published numbers not reproducible by a command | 0 |
| Resume after a week | 1 panel view + 1 handoff read |
| Playbooks completing with the plugin removed | 100% |

---

## 17. Release criteria

0.2.0 may be released only when all are true:

1. A clean install on the latest OpenCode fires a skill without it being named.
2. The pack contains 54 tracked skills, 13 playbooks and 12 principles, and no runtime reference.
3. The plugin exposes exactly six tools and enforces evidence, close and append-only rules.
4. The panel renders seven views and five states from real state; no view can display an unrecorded value.
5. Four playbooks — build-feature, fix-bug, deliver, migrate — complete with artifacts, with the plugin and with the plugin removed.
6. Every published count and state field is reproduced by a command or a recorded value.
7. Three components declare compatible versions; a mismatch is visible.
8. Licence, NOTICE, install and migration notes are present.
9. All 0.1.0 and earlier-0.2.0 readiness claims are withdrawn.

---

## 18. Migration from 0.1.0

- **Positioning.** 0.1.0 was a four-repository platform with broken wiring. 0.2.0 is a portable method plus a thin recorder and a read-only panel.
- **Repositories.** `vstack-opencode` and `vstack-openchamber` are updated in place to 0.2.0. The umbrella `vstack` is purged and repurposed as the documentation-only home: its website, contracts, compatibility matrix, project knowledge, research records and 0.1.0 wiki pages are deleted, and GitHub Pages is disabled. `vstack-runtime` is deleted; its useful parts move into the existing plugin.
- **Naming.** 0.1.0 skill names are replaced by short names; the release notes carry the mapping.
- **Artifacts.** Workflows become playbooks; principles reduce to twelve; prose evaluation scenarios are removed.
- **State.** The 0.1.0 contracts and projections are not migrated; the new state starts at `.vstack/` version 1.
- **Claims.** Every 0.1.0 readiness or validation claim is withdrawn, not carried forward.

---

## 19. Risks and mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Plugin becomes required in practice | Medium | High | Portable contract, plugin-removed walkthrough, no plugin-only skill |
| Tool surface creeps past six | High | Medium | Fixed list; a new tool requires removing one or changing the method |
| Panel drifts from state | Low | High | Single writer; panel read-only; no derived fields |
| State format changes break the panel | Medium | High | Schema version; refuse newer format; migration note |
| Maintenance across three repos | High | High | One method, thin plugin, one panel; quarterly review |
| OpenCode or OpenChamber APIs change | Medium | Medium | Thin adapters; pinned version floors; pack works without |
| Sharing creates support burden | High | Medium | Public read-only repository: issues welcome, pull requests not accepted |

---

## 20. Open questions

None.

1. **Minimum versions — resolved 2026-11-05.** OpenCode V2 with
   `@opencode/plugin` >= 2.2.0; OpenChamber >= 1.24.0; state schema 1. The
   recorder and panel declare these floors in `package.json` and their release
   notes.

## 21. Out of scope for 0.2.0

- Hosted dashboards, accounts, telemetry.
- Multi-user collaboration on a delivery.
- Model routing, cost tracking, budget enforcement.
- Automatic pull-request policy beyond one ship decision.
- Marketplace listing.
- Formal verification — model checking, proofs.
- Plugins for harnesses other than OpenCode.
- A standalone CLI, service or database.
