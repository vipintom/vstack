# PRD: Whale Goldfish Model (WGM) v2

| Field | Value |
|---|---|
| Status | Draft for approval |
| Date | 2026-10-30 |
| Supersedes | v1 draft (removed from repository) |
| Product | Whale Goldfish Model, package family `@vstack/wgm` + `@vstack/opencode-wgm` |
| Target host | OpenCode v2.2.0 or later (first-class); Claude Code and a generic Markdown harness (secondary) |
| Target repo | vstack monorepo (`~/code/personal/vstack`) |
| Upstream | [google/elephant-goldfish-model](https://github.com/google/elephant-goldfish-model) at `403d8881d62022490637d740657b33f01e321ea8` |
| License | Apache-2.0 derivative, attribution in `NOTICE` / `UPSTREAM.md` |

---

## 0. What changed from v1 and why

v1 was written against an imagined host API. This revision was checked against the OpenCode v2.2.0 plugin type definitions shipped in `opencode/workflow/node_modules/@opencode/plugin`, the v2 documentation, and the vstack workflow source. Five v1 assumptions were wrong; all five are corrected here.

| v1 claim | Verified reality | Effect on this spec |
|---|---|---|
| A plugin cannot register agents, so agents must be installed as files | `ctx.agent.transform` exists. `editor.update(id, fn)` **creates** the agent when the id is absent (`packages/core/src/agent.ts`); `AgentEditor` has no `add` for that reason | Agents are both plugin-registered and separately installable (§5, §9) |
| The synthesizer spawns reviewer subagents | `subagent_depth` defaults to 1; a subagent cannot launch a subagent (`tool/task.ts` depth check) | Reviewers are dispatched by the **primary session** (§7.3) |
| Skills are loaded from files with frontmatter validation | `Skill.Info = {id, name, description?, autoinvoke?, path, content}`; the plugin supplies `content` directly | No frontmatter parser; asset paths resolve from `import.meta.url` (§8) |
| Permissions are per-tool booleans (`edit`, `write`, `patch`, `bash`) | V2 permissions are an ordered `{action, resource, effect}` array, last match wins; `bash`→`shell`, `task`→`subagent`, `write`/`patch`→`edit` | Concrete rulesets per agent (§6.2) |
| Source inventory lives at `skills/`, `agents/`, `resources/` | At the pinned commit the tree is `distributions/<harness>/skills/...`, `distributions/<harness>/resources/...` | Inventory corrected (§13) |

Three structural decisions were taken during review:

1. **Artifacts live in `.wgm/`, not `.agent-workflow/wgm/`.** The workflow plugin hardcodes `.agent-workflow` and ignores its documented `workflowDirectory` option. A harness-neutral product must not depend on another plugin's private directory. When a workflow is active, WGM *records into* it through tools; it does not write into its directory.
2. **The core is harness-neutral.** Prompts contain capability verbs, not host tool names. Each adapter renders them.
3. **Reviewers are read-only by ruleset, not by prompt.** Every reviewer profile is deny-by-default with an explicit allow list.

Decisions fixed by product (do not reopen without approval):

| Decision | Value |
|---|---|
| Agent pack | Installable separately from the plugin |
| Workflow use | Uses vstack workflow when available; runs standalone otherwise |
| Harness scope | Harness-agnostic core; OpenCode first-class, Claude Code and generic Markdown adapters |
| Reviewer dispatch | From the primary session, never from a subagent |
| Workflow blocker | New agent-facing blocker tools in `@vstack/opencode-workflow` |
| Provenance | Central only: `NOTICE`, `UPSTREAM.md`, `LICENSE`; no per-file headers |
| Release contents | All seven skills and all nine agents |
| Reviewer model | Inherit the session model; never pinned |

---

## 1. Summary

WGM is a design and review workflow. Two roles:

- **Whale** — holds project context, talks to the user, drafts the design document. This is the user's own primary session running a WGM skill.
- **Goldfish** — fresh-context reviewers. Each runs in a child session with no conversation history and a read-only ruleset.

WGM turns an idea into an approved design document, with recorded findings, before implementation starts. It does not write product code.

WGM is a native experience in each supported harness: skills, slash commands and (where the harness supports them) reviewer agents. It is workflow-aware but not workflow-controlling: with an active vstack workflow it records findings, blockers and decisions; it never starts, advances, verifies or finishes a workflow, and the single plan-seeding action requires explicit user confirmation.

---

## 2. Goals and non-goals

### 2.1 Goals

| ID | Goal | Success signal |
|---|---|---|
| G1 | All seven EGM skills available under WGM names | Each skill discoverable by exact ID and by its `/wgm-*` command |
| G2 | All nine personas available as reviewer agents | Each appears in the agent catalog with the intended ruleset |
| G3 | Reviewers are isolated and read-only | Fresh child session, no conversation history, no edit or shell permission |
| G4 | One install path per harness, no path surgery | `wgm install --target <harness>` plus one plugin/config entry |
| G5 | Harness-agnostic content | Core prompt text contains no host tool names; adapters supply them |
| G6 | Workflow-aware without workflow control | Findings, blockers and decisions recorded; no state transition except blockers and confirmed plan seeding |
| G7 | Review defects are actionable | Consolidated report maps every finding to a reviewer, severity, location, and disposition |
| G8 | Licence-clean derivative | `LICENSE`, `NOTICE`, `UPSTREAM.md` present; modified areas enumerated |
| G9 | Predictable lifecycle | Idempotent install, `wgm doctor`, surgical uninstall |
| G10 | Testable specification | Every requirement has an automated check or a documented manual check |

### 2.2 Non-goals

Not a code generator. Not a replacement for the vstack state machine. Not a hard gate on implementation. Not an autonomous agent that starts or advances workflows. Not a GUI or OpenChamber panel. Not a general multi-agent framework. Not a live sync of upstream EGM. Not a guarantee that reviews find every defect. Not a fork offered upstream.

---

## 3. Users and scenarios

**S1 — Solo developer with an active workflow.** Runs a design review before implementing a step. Review blockers appear in the workflow and in OpenChamber. After resolution, the approved design seeds the implementation plan on confirmation.

**S2 — Solo developer without a workflow.** Wants a design document. Runs brainstorm, draft, review, resolve. Artifacts stay in `.wgm/`; the approved design lands in `docs/designs/`. No workflow state exists or is created.

**S3 — Team sharing a design.** Approved design is committed. Review reports stay local unless the team commits `.wgm/reports/`.

**S4 — Existing codebase documentation.** `wgm-bootstrap` creates or refreshes directory READMEs. Independent of the design loop.

**S5 — Documentation drift.** `wgm-drift-report` compares committed designs against current source.

**S6 — Non-OpenCode harness.** A Claude Code user installs the same content through the Claude adapter and gets the same review protocol, minus plugin registration.

---

## 4. Package architecture

```
@vstack/wgm                    (core, harness-neutral)
├── content/skills/*.md        7 skills, capability verbs only
├── content/agents/*.md        9 personas, neutral prompt bodies
├── content/resources/         document standards, templates, schemas
├── adapters/opencode/         emits Skill.Info, CommandDefinition, Agent.Info
├── adapters/claude-code/      emits .claude/{agents,commands,skills}/ markdown
├── adapters/generic/          emits plain markdown + capability preamble
├── install/                   installer, doctor, uninstall
└── bin/wgm.js                 CLI

@vstack/opencode-wgm           (OpenCode plugin)
├── registers skills, commands, agents through ctx.{skill,command,agent}.transform
├── workflow bridge (record-only + blocker + confirmed plan seed)
└── doctor integration (plugin presence, asset resolution)

@vstack/opencode-workflow      (existing, extended)
└── + workflow_set_blocker, workflow_clear_blocker, BlockerType "design_review"
```

Rationale: the core must not import `@opencode/plugin`. The plugin is a thin adapter over the same content the installer emits. `@vstack/opencode-wgm` may be installed without the agent pack (plugin-registered agents), and the agent pack may be installed without the plugin (harness-neutral use, other harnesses).

---

## 5. Content model

### 5.1 Skills (7)

| Skill ID | Purpose | Inputs | Outputs |
|---|---|---|---|
| `wgm-brainstorm` | Explore and stress-test an idea with reviewers | User statement, repo context | `.wgm/concepts_brief.md` |
| `wgm-draft` | Turn a brief or notes into a design document | Brief, constraints, repo context | `.wgm/design_draft.md` |
| `wgm-review` | Run the five-stage review protocol | Target document, options | `.wgm/reports/<stage>-<agent>.md`, `.wgm/reports/consolidated_review_report.md` |
| `wgm-review-loop` | Run a named reviewer group against one artifact | Target document, reviewer group | Reviewer findings (files + summary) |
| `wgm-resolve` | Classify findings, apply approved changes | Consolidated report, design | Updated design, dispositions |
| `wgm-bootstrap` | Create or refresh directory READMEs | Scope, repo tree | Directory `README.md` files |
| `wgm-drift-report` | Compare committed design against current source | Design document, source | `.wgm/reports/drift_report.md` |

Skill content rules:

- Written in capability verbs (`read_file`, `search_files`, `write_file`, `run_shell`, `ask_user`, `dispatch_reviewer`). No host tool name appears in core content.
- Frontmatter: `name`, `description` (when to use), `wgm/version`, `wgm/capabilities` (list). No harness-specific keys.
- Exact skill ID matches the directory name; lowercase kebab-case, 1–64 chars (`^[a-z0-9]+(-[a-z0-9]+)*$`).
- Each skill ends with exactly one next step.
- No skill starts, advances, verifies or finishes a workflow.

### 5.2 Reviewer agents (9)

| Agent ID | Persona source | Responsibility | Write access |
|---|---|---|---|
| `wgm-design` | `design_critic.md` | Architecture, scalability, infrastructure economics, unmitigated risk | no |
| `wgm-codebase-details` | `codebase_details.md` | Fit with the actual codebase, existing patterns, real constraints | no |
| `wgm-zoom-out` | `zoom_out.md` | Alignment, scope, strategy, missing context | no |
| `wgm-comprehension` | `comprehension.md` | Whether a fresh reader understands the document | no |
| `wgm-implementation-readiness` | `implementation_readiness.md` | Whether the plan is complete, ordered and executable | no |
| `wgm-structural` | `structural.md` | Structure, flow, completeness | no |
| `wgm-style` | `style.md` | Clarity, precision, writing quality | no |
| `wgm-synthesizer` | `synthesizer.md` | Deduplicate supplied findings, assign severity, compile the consolidated report | no |
| `wgm-bootstrap-orchestrator` | `bootstrap_orchestrator.md` | Plan and coordinate directory documentation workers | yes (emit only) |

### 5.3 Five-stage review map

| Stage | Reviewers | Question |
|---|---|---|
| 1. Alignment | `wgm-zoom-out` | Is this the right problem, in the right scope, for the right reason? |
| 2. Comprehension | `wgm-comprehension`, `wgm-structural` | Can a fresh reader follow it, and is anything missing? |
| 3. Technical design | `wgm-design` | Architecture, risk, cost, failure modes |
| 4. Codebase fit | `wgm-codebase-details` | Does this match the code that exists? |
| 5. Readiness and clarity | `wgm-implementation-readiness`, `wgm-style` | Can it be implemented and verified from this document? |

The `wgm-review` skill runs stages in order and stops at the first stage whose findings are blocking, unless `continue-on-blocker` is passed. `wgm-review-loop` runs any subset in one pass.

### 5.4 Review output contract

Each reviewer writes one file:

```markdown
---
reviewer: wgm-<id>
target: <path>
stage: <n>
reviewed_at: <ISO 8601>
verdict: pass | concerns | blocking
---

## Findings
### F<n> — <one-line title>
- Severity: blocker | major | minor | nit
- Location: <section heading or line range>
- Problem: <what is wrong>
- Why it matters: <consequence>
- Suggested change: <concrete edit>
- Evidence: <file:line, standard, or upstream document>

## Coverage
- Read in full: <sections>
- Not reviewed: <sections and reason>
```

The consolidated report adds a dedupe table (`finding → reviewers → merged severity → disposition`) and a summary block with counts per severity per stage.

---

## 6. Agents and permissions

### 6.1 Shared agent metadata

Every packaged agent declares:

```yaml
description: <when to use this reviewer>   # drives primary-agent selection
mode: subagent
steps: 30                                   # cap for cost control
```

`model` is never set: reviewers inherit the session model by product decision. Each adapter may add harness-required keys, but the core declaration must not contain any.

### 6.2 OpenCode rulesets

Deny-by-default, allow-list after. Last matching rule wins.

Reviewer (all seven, plus synthesizer):

```json
[
  { "action": "*",     "resource": "*",        "effect": "deny"  },
  { "action": "read",  "resource": "*",        "effect": "allow" },
  { "action": "glob",  "resource": "*",        "effect": "allow" },
  { "action": "grep",  "resource": "*",        "effect": "allow" },
  { "action": "skill", "resource": "wgm-*",    "effect": "allow" },
  { "action": "subagent", "resource": "*",     "effect": "deny"  }
]
```

Bootstrap orchestrator:

```json
[
  { "action": "*",     "resource": "*",        "effect": "deny"  },
  { "action": "read",  "resource": "*",        "effect": "allow" },
  { "action": "glob",  "resource": "*",        "effect": "allow" },
  { "action": "grep",  "resource": "*",        "effect": "allow" },
  { "action": "edit",  "resource": "*/README.md", "effect": "allow" },
  { "action": "shell", "resource": "*",        "effect": "deny"  },
  { "action": "subagent", "resource": "*",     "effect": "deny"  }
]
```

Notes:

- `deny` on `*` must come first; an allow rule later wins only because it matches later.
- Reviews are read-only including shell: reviewers must not run tests. Running checks is the Whale's job after resolution.
- The primary agent's own `subagent` permission governs whether it can launch `wgm-*` at all. `wgm doctor` checks this and reports a fix.

### 6.3 Isolation guarantee

Reviewer isolation depends on three properties:

1. The primary session dispatches each reviewer through a child session (`subagent` tool), which starts with fresh context.
2. Reviewer agents have no edit, no shell, no subagent permission.
3. The workflow plugin's context hook injects only for `kind === "primary"` (`hooks/context.ts`), so a reviewer never receives workflow guidance.

Property 3 is a cross-plugin invariant, not a WGM guarantee. It is covered by an integration test in the workflow package and named as a dependency in §11.

---

## 7. Skills and dispatch behavior

### 7.1 Invocation

| Harness | Skills | Slash commands | Reviewer dispatch |
|---|---|---|---|
| OpenCode 2.2.0+ | `skill` tool, `autoinvoke: false` | `/wgm-*` via `ctx.command.transform` | `subagent` tool, foreground |
| Claude Code | `.claude/skills/<id>/SKILL.md` | `.claude/commands/<id>.md` | `Task` tool |
| Generic Markdown | pasted/loaded by the harness | documented as `/wgm-*` where supported | sequential in-session prompts, labelled degraded |

Degraded mode (no subagent dispatch): the skill re-states the task and instructs the model to answer only from the provided document, with an explicit "no prior context" preamble, one reviewer per turn. Write restrictions cannot be enforced in this mode. It is documented as weaker and never presented as equivalent.

### 7.2 Command surface

Seven commands, one per skill, matching the skill IDs. Requirements:

- Arguments pass through as part of the prompt text.
- The command list shows the skill description.
- A command whose content cannot be loaded fails with: what failed, which asset, what to do next.
- No command starts a workflow.

### 7.3 Reviewer dispatch (normative)

The `wgm-review` and `wgm-review-loop` skills instruct the **primary session** to:

1. Resolve the target document path and read it.
2. Build a shared review brief: document, relevant repo paths, the stage question, output contract.
3. Dispatch one reviewer per stage member, foreground, with the agent ID, a short description, and the complete brief.
4. Collect each reviewer's file from `.wgm/reports/`.
5. Dispatch `wgm-synthesizer` with the list of finding paths only — no conversation history.
6. Write the consolidated report and report the path plus counts in chat.

The synthesizer never dispatches reviewers. It compiles supplied findings and flags coverage gaps.

### 7.4 Cost control

- Each reviewer declares `steps: 30`.
- Before dispatching a run with more than three reviewers, WGM states the reviewer count and asks for confirmation.
- `.wgm/config.json` may set `maxReviewers` (default 7) and `reviewerGroups`.

---

## 8. Runtime loading and asset resolution

OpenCode path (plugin):

- Skill content is read from the installed package at setup and registered as `Skill.Info` with `path` pointing at the real file and `content` holding the rendered text.
- Placeholders of the form `{{wgm:asset_root}}` are replaced at registration with an absolute path derived from `import.meta.url`, never from the working directory.
- Missing asset → registration fails loudly; no partially registered skill.
- Paths are validated to stay inside the package root; `..` escapes are rejected.
- `autoinvoke: false` for every WGM skill.

Non-OpenCode path (installer): the adapter renders the same content into the harness's directory, substituting resolved absolute paths or harness-relative paths as the adapter requires.

Test requirement: every placeholder in every skill resolves to an existing file in the packed artifact, verified against `npm pack` output.

---

## 9. Installer and doctor

CLI:

```text
wgm install   [--target opencode|claude-code|generic] [--scope project|global] [--force] [--dry-run]
wgm doctor    [--target ...] [--json]
wgm uninstall [--target ...] [--scope ...] [--dry-run]
wgm init      # optional: print the config snippet; never edits config without --write
```

Requirements:

- `--scope project` writes to the harness project directory (`opencode`: `.opencode/agents/`; `claude-code`: `.claude/agents/`). `--scope global` writes under `$XDG_CONFIG_HOME` / `~/.config/<harness>/`.
- Default scope is project.
- Idempotent: unchanged files are not rewritten; changed files are rewritten and reported.
- A locally modified file is never overwritten without `--force`; the diff is summarized first.
- Every installed file records its source package version in a manifest at `<target>/.wgm-manifest.json`, not in the file body (provenance decision, §12).
- `uninstall` removes only files listed in the manifest whose content still matches the recorded hash; anything edited by the user is kept and reported.
- `doctor` reports: manifest present, files missing/extra/modified/stale, asset resolution failures, plugin presence, primary-agent `subagent` permission, workflow tools available (optional), and version skew between core and plugin.
- No network access. No writes outside the target directory. No silent config edits.

Plugin path needs no installer: registering agents through `ctx.agent.transform` means a plugin-only install already has all nine agents. The manifest exists for the file-based path.

---

## 10. Artifacts

| Artifact | Location | Committed |
|---|---|---|
| Concepts brief | `.wgm/concepts_brief.md` | no |
| Design draft | `.wgm/design_draft.md` | no |
| Stage reports | `.wgm/reports/<stage>-<agent>.md` | team choice |
| Consolidated review report | `.wgm/reports/consolidated_review_report.md` | team choice |
| Drift report | `.wgm/reports/drift_report.md` | team choice |
| Approved design | `docs/designs/<feature>.md` | yes |
| Bootstrap READMEs | repository directories | yes |
| WGM config | `.wgm/config.json` | yes (no secrets) |
| Install manifest | `<target>/.wgm-manifest.json` | no |

Requirements:

- `.wgm/` is added to `.gitignore` by `wgm install` only with `--gitignore` or explicit confirmation.
- No writes outside the project root without an explicit user instruction.
- Artifact directory configurable through `.wgm/config.json` (`directory`), default `.wgm`.
- WGM never writes inside `.agent-workflow/`; workflow state is reachable only through workflow tools.

---

## 11. vstack integration

### 11.1 Detection

WGM treats a workflow as active when `workflow_status` is available and returns a state whose status is not `idle`, `completed` or `failed`. It never reads `.agent-workflow/` directly.

### 11.2 Record-only surface (allowed)

| Tool | Use |
|---|---|
| `workflow_record_finding` + `project_knowledge` | Durable design decisions, constraints, accepted risks |
| `workflow_record_finding` + `task_record` | Findings tied to the active task, when one exists |
| `workflow_record_history` + `decision` | Design approval, review completion, blocker resolution |
| `workflow_set_blocker` | Review blocker (new, §12) |
| `workflow_clear_blocker` | Blocker resolved (new, §12) |
| `workflow_set_plan` | Only after approval and explicit confirmation (§11.4) |

### 11.3 Forbidden

`workflow_start`, `workflow_advance`, `workflow_verify_step`, `workflow_finish`, `workflow_update_todo`, `workflow_create_todos`, `workflow_next_todo`. WGM never marks a todo complete.

Enforcement is layered:

1. Prompt text in the skills names the allowed tools and the forbidden ones.
2. `wgm doctor` warns when the primary agent has `workflow_start`/`workflow_advance`/`workflow_finish` allowed *and* a WGM skill is in use.
3. Tests assert the forbidden names appear only in the prohibition list of the skill content.

There is no runtime sandbox: the Whale runs in the user's primary agent whose permissions WGM does not own. This is documented as a limitation, not sold as a guarantee.

### 11.4 Plan seeding

`wgm-draft` and `wgm-resolve` may offer to seed `workflow_set_plan` when all of these hold: a design is approved, a workflow is active, and the user confirms in that turn. Mapping: each design milestone becomes one `STEP-n` with `title`, `description`, `acceptanceCriteria`, `dependsOn`. Ambiguity is a question, never a guess. An existing plan is never overwritten without a second confirmation.

### 11.5 Degraded operation

If workflow tools are missing or a call fails: continue the design work, write the artifacts, tell the user exactly which findings were not recorded, and do not retry.

---

## 12. Required change to `@vstack/opencode-workflow`

WGM needs an agent-facing blocker tool. Today `state.blocker` is set only inside `workflow_next_todo` when no todo is ready; no agent can record or resolve a design blocker, and `clearBlocker` in `machine.ts` nulls the field **without changing status**, leaving `status: "blocked"` with no way out except `workflow_resume`.

### 12.1 Type change

```ts
export type BlockerType =
  | "no_ready_todo" | "verification_failed" | "dependency_blocked"
  | "external" | "agent_unavailable"
  | "design_review";                    // new

export interface Blocker {
  type: BlockerType;
  message: string;
  details: Record<string, unknown>;
  at: string;
  fromStatus: WorkflowStatus;            // new: where to resume
  source: "system" | "agent";            // new
}
```

### 12.2 New tools

`workflow_set_blocker`

```jsonc
{
  "type": "object",
  "properties": {
    "type": { "type": "string", "enum": ["external", "agent_unavailable", "design_review", "dependency_blocked", "verification_failed"] },
    "message": { "type": "string", "minLength": 1 },
    "details": { "type": "object" }
  },
  "required": ["type", "message"],
  "additionalProperties": false
}
```

Behavior: reject when status is `completed` or `failed` (no valid transition) with a message naming both. Otherwise set `blocker` with `fromStatus`, `source: "agent"`, transition to `blocked` with transition `blocked`, append a history entry of type `blocker`, write with lock, return the new state. If already blocked, replace the blocker without a second transition.

`workflow_clear_blocker`

```jsonc
{
  "type": "object",
  "properties": {
    "resolution": { "type": "string", "minLength": 1 },
    "resumeTo": { "type": "string", "enum": ["planning", "ready", "executing", "verifying"] }
  },
  "required": ["resolution"],
  "additionalProperties": false
}
```

Behavior: reject when no blocker. Target is `resumeTo` or `blocker.fromStatus`; both must appear in `VALID_TRANSITIONS.blocked`. Clear the blocker, transition with `resumed`, append a history entry of type `decision` containing the resolution text, return the new state.

### 12.3 Other required fixes

- `clearBlocker` in `machine.ts` is replaced by `resolveBlocker(state, reason, resumeTo)`, which performs the transition and revision bump.
- `workflow_status` output includes `blocker.fromStatus` and `blocker.source`.
- OpenChamber panel needs no change: it already renders `state.blocker.message` and the `blocked` status. It gains the blocker type in the same field.
- Regression tests for: set from each valid status; reject from `completed`/`failed`; clear resumes to `fromStatus`; clear records history; double clear rejected.

Scope note: this is a change to the workflow package, reviewed and released on its own schedule. WGM must degrade cleanly if the version it finds lacks these tools (§11.5).

---

## 13. Source inventory (corrected)

All paths relative to the upstream repository at `403d888`. The pinned tree ships one directory per harness: `distributions/<harness>/`. **The Claude distribution is the source of truth**; other distributions are compared for drift, not merged.

| WGM item | Upstream path |
|---|---|
| Skills (7) | `distributions/claude/skills/egm-{brainstorm,draft,resolve,bootstrap,review,review-loop,drift-report}/SKILL.md` |
| Agent personas (9) | `distributions/claude/agents/{bootstrap_orchestrator,codebase_details,comprehension,design_critic,implementation_readiness,structural,style,synthesizer,zoom_out}.md` |
| Document standards | `distributions/claude/resources/document_standards/{feature-spec,heilmeier,implementation-readiness,re-implementation,zoom-out}-standard.md` |
| Shared guidance | `distributions/claude/resources/execution_instructions.md`, `distributions/claude/resources/README.md` |
| Skill support files | per skill: `TEST.md`, `test_scenarios.yaml`, `assets/icon.svg`, `agents/openai.yaml` |

Keep: `SKILL.md` bodies, personas, document standards, `execution_instructions.md`, skill test scenarios as fixtures (converted).
Drop: `agents/openai.yaml` (Codex-only), `assets/icon.svg` unless the harness needs an icon, `distributions/*/` other than claude (reference only), `scripts/*`, Python tests, `.claude-plugin/`, `.codex-plugin/`, `.agents/plugins/`, `plugin.json`, `site/`.

---

## 14. Naming

Public IDs use `wgm-`. Upstream identifiers may appear **only** in `NOTICE`, `UPSTREAM.md`, and the vendored `content/` provenance map; never in a skill body, command name, agent description, or user-facing document.

| Upstream | WGM |
|---|---|
| Elephant-Goldfish Model / EGM | Whale Goldfish Model / WGM |
| `egm-*` skills and agents | `wgm-*` |
| `design_critic` | `wgm-design` |
| `${CLAUDE_PLUGIN_ROOT}`, `agents/*.md`, `resources/*` | `{{wgm:asset_root}}/...` resolved per adapter |

---

## 15. Licensing and attribution

Apache-2.0 obligations for a derivative work:

- `LICENSE` carries the full Apache-2.0 text.
- `NOTICE` names the upstream project, copyright holder, and pinned commit, and states that this repository contains modified material.
- `UPSTREAM.md` records the repository URL, pinned SHA, upstream licence, the list of modified areas, and the sync procedure.
- `README.md` credits the upstream project once.
- No Google names or marks in product surfaces; no implication of endorsement, review, or support.
- **Provenance is central, not per file** (product decision). Modified areas are enumerated in `UPSTREAM.md`, and a machine-readable `content/PROVENANCE.json` maps each shipped file to its upstream path and the nature of the modification. No header lines are added to skill or agent files.

Recorded risk: Apache-2.0 §4(b) asks modified files to carry prominent notices of change. Central enumeration plus `NOTICE` is the chosen mitigation. If legal review disagrees, the fallback is a one-line comment in each adapted file — this would reopen the naming-scan rules in §16.

---

## 16. Naming and content tests

The scan must be precise about what it reads.

| Scan | Targets | Forbidden |
|---|---|---|
| `public-identifiers` | package name, skill IDs, command names, agent IDs, command descriptions, agent descriptions | `egm`, `elephant`, `goldfish-model`, `claude`, `codex`, `antigravity`, `omp` |
| `core-prompts` | `content/**/*.md` | host tool names (`read`, `write`, `edit`, `bash`, `shell`, `task`, `subagent`, `spawn_agent`, `invoke_subagent`, `ask_question`, `CLAUDE_PLUGIN_ROOT`) |
| `docs` | `README.md`, `INSTALL.md`, `USAGE.md`, `OPENCODE-COMPATIBILITY.md`, `TROUBLESHOOTING.md` | upstream product names, except the single credit paragraph |
| `attribution` | `NOTICE`, `UPSTREAM.md`, `PROVENANCE.json` | — (exempt, and must name upstream) |

Reviewer findings quoted from upstream examples keep their original wording only when they appear in a fenced example block explicitly marked as upstream source in `UPSTREAM.md`; the scan ignores files under `content/vendor-notes/` if the implementer chooses to keep any.

---

## 17. Acceptance criteria

| ID | Given | When | Then |
|---|---|---|---|
| AC-1 | Plugin installed, no agent pack | OpenCode starts | All 7 `/wgm-*` commands and all 9 `wgm-*` agents are listed; `wgm doctor` reports healthy |
| AC-2 | Agent pack installed for `claude-code` | The harness lists agents | 9 agent files with `description`, `mode`-equivalent, read-only tool list; manifest matches |
| AC-3 | Healthy install | `/wgm-review <path>` runs | The skill loads, the target is read, and the five stages start |
| AC-4 | A review stage runs | A reviewer is dispatched | The child session has no prior conversation and its ruleset denies `edit`, `shell` and `subagent` |
| AC-5 | A full review completes | Synthesis runs | `consolidated_review_report.md` exists, cites at least the findings it received, and lists coverage |
| AC-6 | Active workflow | A review finds a blocker | `workflow_set_blocker` is called with type `design_review`; `workflow_status` shows `blocked` with that message; no other state change occurs |
| AC-7 | Blocker resolved | The user confirms resolution | `workflow_clear_blocker` is called, status returns to the recorded `fromStatus`, history holds the resolution |
| AC-8 | Any WGM run | The run ends | None of `workflow_start`, `workflow_advance`, `workflow_verify_step`, `workflow_finish`, `workflow_update_todo` was called |
| AC-9 | Approved design, active workflow, user confirms | Seeding runs | `workflow_set_plan` receives ordered steps with acceptance criteria and dependencies |
| AC-10 | No workflow | Any skill runs | Artifacts are written, no workflow tool is called, no `.agent-workflow/` directory is created |
| AC-11 | Packed artifact (`npm pack`) | Every placeholder is resolved | No placeholder points to a missing file; no path escapes the package |
| AC-12 | Any shipped file | The scans run | All four scans in §16 pass |
| AC-13 | Installed agent pack | `wgm install` runs again | No file changes; changed files are reported; a locally modified file is kept without `--force` |
| AC-14 | Installed agent pack with one edited file | `wgm uninstall` runs | The edited file is kept and reported; all untouched WGM files are removed; nothing else is deleted |
| AC-15 | Repo | Quality gates run | `pnpm build`, `pnpm typecheck`, `pnpm lint`, `pnpm test` pass |
| AC-16 | Documentation | A newcomer follows `INSTALL.md` and `USAGE.md` | Install, one brainstorm, one review, resolve and uninstall all complete without reading source |

---

## 18. Tests

Automated:

- Content: skill count, IDs, descriptions, capability verbs only, placeholder resolution, scan suite (§16).
- Adapters: golden-file tests per harness for one skill, one command, one agent; permission ruleset serialization; idempotence of rendering.
- Registration: call the OpenCode registration function against a fake editor (`list/get/add/update/remove`) and assert the exact `Skill.Info` and `Agent.Info` payloads, including `autoinvoke: false` and the ruleset.
- Installer: idempotent, force, modified-file protection, uninstall surgical removal, manifest integrity, dry-run touches nothing.
- Doctor: missing/stale/modified/extra matrix, asset failure, plugin absent, subagent permission denied.
- Workflow bridge: fake tool surface asserts allowed calls, forbidden calls, degraded path when a tool throws or is missing; blocker set/clear argument shapes.
- Workflow package (its own suite): the §12.3 regression list.

Manual, recorded in the pilot log: one real design end to end; one review on a non-OpenCode harness; one blocked-and-resolved workflow observed in the OpenChamber panel.

---

## 19. Build and packaging

- ESM only, TypeScript strict, Node `>=20`, no default exports outside entry points.
- `@vstack/wgm`: `bin`, `content`, `adapters`, `dist`; build copies Markdown/JSON assets into `dist` (TypeScript does not).
- `@vstack/opencode-wgm`: `dist` plus a dependency on `@vstack/wgm`.
- `@opencode/plugin` and `effect` are **peer** dependencies of the plugin package, pinned to the supported host line (`@opencode/plugin: 2.2.x`, `effect: ^4.0.0`). Never bundle `effect`; two copies break `Schema` and fibers.
- No runtime network access, no telemetry, no credentials.
- `files` includes `dist`, `content`, `bin`, `LICENSE`, `NOTICE`, `UPSTREAM.md`, `PROVENANCE.json`, docs.
- Publish decision (npm vs workspace-local) remains open; the build must succeed either way.

---

## 20. Milestones

Order is required.

| # | Milestone | Exit condition |
|---|---|---|
| M0 | Spike | A scratch plugin registers one skill, one command, one agent with the deny-by-default ruleset; the primary dispatches that agent; the child has fresh context, cannot edit, cannot shell. Record the exact API calls that work in `OPENCODE-COMPATIBILITY.md` |
| M1 | Workflow blocker tool | §12 implemented in `@vstack/opencode-workflow` with passing regression tests; WGM still works against old versions |
| M2 | Core content | Seven skills and nine personas vendored, renamed, capability verbs, provenance map, licence files |
| M3 | Adapters | OpenCode (skills, commands, agents, permissions) and Claude Code (markdown) adapters with golden tests |
| M4 | Installer | install/doctor/uninstall with manifest, idempotence, force, dry-run |
| M5 | Plugin and bridge | Registration at setup, workflow bridge, degraded mode, blocker integration |
| M6 | Tests and docs | Full suite, all documents, four scans, quality gates |
| M7 | Pilot | One real design from brainstorm to approved spec to seeded plan, with the review blockers exercised end to end |
| M8 | Hardening | Fix whatever the pilot found; only then tag a release |

---

## 21. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Upstream EGM drift | Broken prompts, stale vocabulary | Pinned commit, `UPSTREAM.md` sync procedure, `PROVENANCE.json` |
| Plugin API changes agents/skills shape | Registration breaks | M0 pins the calls; `doctor` reports skew; installer path is an independent fallback |
| User's primary agent denies `subagent` | Reviews cannot dispatch | `doctor` detects and prints the exact ruleset change |
| Review cost | Expensive runs | `steps: 30`, reviewer confirmation above three, configurable groups |
| Inherited (weak) model | Shallow reviews | Documented; the report's coverage section exposes shallow passes |
| Central provenance judged non-compliant | Legal exposure | `NOTICE` + `UPSTREAM.md` + `PROVENANCE.json`; fallback per-file notice documented in §15 |
| Harness adapters drift apart | Inconsistent behavior | Content is the single source; adapters only render; golden tests per harness |
| Downloaded content overrides reviewer prompt | Reviewers ignore the role | Agent body is the system prompt; global instructions cannot replace it, only add; documented conflict note |
| Workflow package lags the blocker tool | No blockers on old installs | Version check, degraded path, finding-only fallback |
| Naming collision with existing skills | Confusing catalog | `wgm-` prefix on every public ID; doctor lists duplicate IDs |

---

## 22. Open questions

1. Publish to npm, or workspace-local only?
2. Default reviewer set for `wgm-review`: all seven, or the four cheapest that still cover the five stages?
3. Should the generic adapter be documented as supported for Codex, given no subagent dispatch there?
4. Does `wgm init --write` ever get permission to edit `opencode.jsonc`, or stay print-only?

---

## 23. Definition of done

- Seven skills, nine agents, nine commands (where the harness supports commands) reachable in a clean install on each supported harness.
- Reviewers demonstrably isolated and read-only on OpenCode.
- A review blocker can be recorded and resolved through the workflow tools and appears in OpenChamber.
- A real design goes brainstorm → draft → review → resolve → approved spec → confirmed plan seeding.
- Installer, doctor and uninstall are idempotent, surgical and offline.
- All four content scans pass; licence and attribution files complete.
- `pnpm build`, `pnpm typecheck`, `pnpm lint`, `pnpm test` pass for both packages.
- A developer who never saw this conversation can install, use, troubleshoot and upgrade from the documentation alone.

---

## Appendix A — vstack surface this depends on

Verified in this review (source, not audit report):

| Area | Fact |
|---|---|
| Tools registered | `workflow_status`, `_start`, `_record_finding`, `_set_plan`, `_create_todos`, `_next_todo`, `_update_todo`, `_verify_step`, `_advance`, `_record_history`, `_resume`, `_finish` |
| Namespace | Registered under namespace `workflow` with code-mode enabled; call sites may see `workflow.<tool>` |
| State machine | `idle → planning → ready → executing → verifying → completed`, with `blocked` reachable from every active status and `failed` from most |
| Persistence | `.agent-workflow/state.json`, `tasks/TASK-*.json`, `state.lock`, revision-based optimistic concurrency, atomic rename |
| Project root | `ctx.location.project.canonical ?? ctx.location.directory`, resolved per call |
| Context hook | Primary requests only (`kind === "primary"`), injects status, goal, active step/task, blocker, rules, file map |
| Enums | `record_finding.category ∈ {project_knowledge, task_record, history}`; `record_history.type ∈ {task_started, step_started, discovery, decision, files_changed, checks_run, completion, blocker, handoff}` |
| Blocker | Only set inside `workflow_next_todo` when no todo is ready; no agent-facing tool |
| OpenChamber panel | Reads `state.json`, `implementation-plan.md`, active task, agent history, `project.md`; polls every 5s; shows blocker message and next-action hint |

Defects found while reviewing, all relevant to WGM's assumptions:

| # | Defect | Evidence | Impact on WGM |
|---|---|---|---|
| D1 | `clearBlocker` nulls the blocker without changing status | `state/machine.ts:222` | §12 must replace it; otherwise a cleared blocker leaves a stuck state |
| D2 | No agent-facing blocker tool | `tools/index.ts:644-651` only path | §12 |
| D3 | `workflow_verify_step` hardcodes `result: "pass"` and runs nothing | `tools/index.ts:779-791` | WGM's "record only" stance is correct; do not trust `verification` fields in reports |
| D4 | `redactSecrets` redacts any 20+ alphanumeric run | `tools/index.ts:265-273` | Finding text may lose SHAs, UUIDs and paths when recorded; WGM should keep findings short and reference file paths in `details` |
| D5 | Workflow dir hardcoded `.agent-workflow` while README documents `workflowDirectory` | `state/fs.ts:11`, README | WGM uses `.wgm/` and never assumes the path |
| D6 | `workflow_set_plan` fills `dependsOn` with generated IDs that cannot match real tasks | `tools/index.ts` plan path, audit 1.4 | Plan seeding maps steps only; WGM does not invent dependencies it cannot express |
| D7 | `workflow_start` sets `status = "planning"` directly, bypassing a transition | `tools/index.ts:343` | None; noted for the workflow package's own fix list |

## Appendix B — verified OpenCode v2.2.0 facts

| Fact | Source |
|---|---|
| `ctx.skill.transform` → `SkillEditor.add(Info)`; `Info = {id, name, description?, autoinvoke?, path, content}` | `@opencode/plugin/dist/promise/skill.d.ts`, `packages/schema/src/skill.ts` |
| `ctx.command.transform` → `CommandEditor.add({name, description?, execute})` | `promise/command.d.ts` |
| `ctx.agent.transform` → `AgentEditor` with `list/get/default/update/remove`, no `add`; `update` on an unknown id creates the agent via `Info.default(id)` | `promise/agent.d.ts`, `packages/core/src/agent.ts` |
| Permissions are `{action, resource, effect}[]`, last match wins; actions include `shell`, `edit`, `subagent`, `read`, `glob`, `grep`, `skill` | v2 docs, `packages/schema/src/permission.ts`, migrate-v1 |
| `subagent_depth` defaults to 1; nested dispatch fails above it | `packages/opencode/src/tool/task.ts`, config docs |
| Markdown agents load from `{agent,agents}/**/*.md` and `{mode,modes}/*.md` under every config root; frontmatter `mode: subagent|primary|all`, `model`, `steps`, `permissions`, `hidden` | `packages/core/src/config/plugin/agent.ts`, `packages/schema/src/config/agent.ts` |
| Skill IDs are path-derived, case-sensitive; portable pattern `^[a-z0-9]+(-[a-z0-9]+)*$` | v2 skills docs |
| Plugin packaging: `@opencode/plugin` and `effect` are peers; never bundle `effect` | `@opencode/plugin/README.md` |
| CLI: `opencode agent list` lists loaded agents | v2 docs |

## Appendix C — file map

| Path | Contents |
|---|---|
| `content/skills/<id>/SKILL.md` | Skill body, frontmatter |
| `content/agents/<id>.md` | Persona body plus neutral metadata |
| `content/resources/document_standards/*.md` | Standards |
| `content/resources/templates/*.md` | Design and report templates |
| `content/PROVENANCE.json` | file → upstream path → change kind |
| `adapters/opencode/` | `register-skills.ts`, `register-commands.ts`, `register-agents.ts`, `permissions.ts` |
| `adapters/claude-code/` | `emit.ts` |
| `adapters/generic/` | `emit.ts` |
| `install/` | `manifest.ts`, `install.ts`, `doctor.ts`, `uninstall.ts` |
| `bridge/` | `workflow.ts` (tool calls, degradation) |
| `bin/wgm.js` | CLI entry |
| docs | `README.md`, `INSTALL.md`, `USAGE.md`, `OPENCODE-COMPATIBILITY.md`, `HARNESS-MATRIX.md`, `UPSTREAM.md`, `TROUBLESHOOTING.md`, `CONTRIBUTING.md`, `LICENSE`, `NOTICE` |
