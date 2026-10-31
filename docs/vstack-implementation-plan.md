# vstack — Comprehensive Implementation Plan

**Document type:** Engineering implementation plan  
**Version:** 1.0  
**Date:** 31 October 2026  
**Status:** Proposed execution baseline  
**Related product document:** `vstack-prd.md`  
**Repository:** `/home/ubuntu/code/personal/vstack`

---

## 1. Purpose and relationship to the PRD

This document translates the vstack Product Requirements Document (PRD) into an actionable engineering implementation definition. It describes the target technical boundaries, recommended reuse of the existing implementation, package responsibilities, data concepts, interfaces, delivery increments, tests, acceptance criteria and ongoing engineering documentation requirements.

The PRD remains the authority for **what vstack is intended to do and why**. This document defines **how the engineering work should be organised and validated**. Where the PRD describes a product capability at a high level, this plan supplies the implementation decisions and constraints needed to build it.

This is a prototype plan. It deliberately favours reuse, small interfaces, familiar file-based persistence and a narrow OpenCode integration over architectural completeness. It is not a proposal to turn vstack into a general-purpose workflow platform.

### 1.1 Product shape

The implementation consists of three packages:

1. **vstack Playbook** — portable content: principles, role instructions, skills, workflows, procedures, loops, rubrics, templates and references.
2. **OpenCode plugin** — optional runtime: project memory, delivery/task state, agent session coordination, activity history, verification evidence and limited enforcement.
3. **OpenChamber plugin** — read-only visualization: presents published vstack state, reports and history summaries.

The playbook must work without either plugin. The OpenCode plugin must enhance the playbook rather than duplicate its engineering reasoning. OpenChamber must visualize information produced by the OpenCode plugin rather than becoming a second workflow engine or source of truth.

### 1.2 Key implementation constraints

- This is a prototype: implement only capabilities that materially improve portability, memory, coordination, evidence, history, enforcement or visibility.
- Preserve working code wherever it fits the new boundaries.
- Do not perform broad file moves solely for naming or architectural neatness.
- Do not move portable-looking TypeScript algorithms into the Playbook package. The Playbook is content-first and should not become a second runtime library.
- Do not implement a generic workflow interpreter, distributed scheduler, custom agent runtime, deployment platform or elaborate policy engine.
- Keep the default agent team to Lead, Builder and Reviewer.
- Use the existing project-local `.vstack/` persistence approach unless a concrete issue requires a change.
- OpenChamber remains read-only for this scope.
- Treat every claim of existing functionality as provisional until verified by source inspection and tests.

---

## 2. Mandatory developer working practice: project knowledge base

**The developer must create and continuously maintain a project knowledge base and an accurate record of implementation work while working. This is a required part of the implementation, not optional documentation to be written at the end.**

The repository must retain enough current, trustworthy information for another developer or agent to understand the product, the decisions made, the current implementation state, the tests that have actually run and the next useful action without reconstructing the entire chat history.

### 2.1 Distinguish two kinds of knowledge

There are two related but different knowledge stores:

1. **Developer project knowledge base:** tracked engineering documentation in the repository. It explains the implementation, decisions, architecture, progress, tests, known issues and how to work on the codebase.
2. **Runtime project memory:** user/project knowledge managed by the OpenCode plugin under `.vstack/`. It is available to agents during normal engineering deliveries.

Do not conflate them. The developer knowledge base documents how vstack itself is built. Runtime memory is a product capability that vstack provides to projects using it.

### 2.2 Required knowledge-base location and contents

Create `docs/project-knowledge/` (or retain an existing, clearly equivalent location if one already exists). At minimum, maintain:

```text
docs/project-knowledge/
├── README.md                  # Index, purpose and update rules
├── CURRENT-STATE.md           # What exists, what works, what is next
├── ARCHITECTURE.md            # Current package boundaries and data flow
├── COMPONENT-INVENTORY.md     # Existing modules and reuse/refactor/remove decisions
├── IMPLEMENTATION-STATUS.md   # Milestones, completed work and outstanding work
├── TESTING.md                 # Test commands, prerequisites and verified results
├── KNOWN-ISSUES.md            # Confirmed defects, limitations and workarounds
├── WORK-LOG.md                # Concise chronological implementation log
└── decisions/
    ├── README.md              # Decision index
    └── ADR-0001-....md        # Important architecture decisions
```

The developer may add focused pages where they materially improve discoverability, but should not create documentation for every small code change.

### 2.3 Update protocol — required throughout development

At the start of each work session:

1. Read `README.md`, `CURRENT-STATE.md`, `IMPLEMENTATION-STATUS.md` and relevant architecture/decision pages.
2. Inspect the current repository state rather than assuming the previous session's report is still accurate.
3. Identify the next bounded task and its acceptance criteria.
4. Record any newly discovered discrepancy between the knowledge base and the actual code.

During work:

1. Update the relevant architecture or decision record when a material design decision is made.
2. Record meaningful discoveries, deviations, blockers and compatibility findings as they occur.
3. Do not leave undocumented temporary assumptions that affect future work.
4. Keep implementation status aligned with actual code and tests.

At the end of each coherent task or work session:

1. Update `CURRENT-STATE.md` with what now works and what remains.
2. Update `IMPLEMENTATION-STATUS.md` and `WORK-LOG.md`.
3. Record exact test commands and their actual results in `TESTING.md` or the work log.
4. Update `KNOWN-ISSUES.md` when defects or limitations are discovered or resolved.
5. Update architecture/ADR documents if behaviour or responsibility boundaries changed.
6. State the next recommended task and any blocking question.

**Do not wait until a milestone or the end of the project to write the knowledge base.** Documentation is part of the definition of done for each substantial implementation task.

### 2.4 Required content quality

- Clearly distinguish implemented, partially implemented, planned, unverified and broken functionality.
- Never report a test as passing unless it was actually executed and passed.
- Include exact commands, relevant package versions and environment assumptions when recording test results.
- Record why a decision was made, not only what was selected.
- Prefer concise, current facts over copied conversation transcripts.
- Mark superseded decisions as superseded; do not silently erase important history.
- Keep `CURRENT-STATE.md` brief enough to be useful as a session-start document.
- Do not place secrets, credentials, tokens or sensitive user data in the knowledge base.

### 2.5 Knowledge-base acceptance criteria

The knowledge base is considered operational when a new developer can answer these questions from repository documentation alone:

- What are the three vstack packages and what does each own?
- Which existing code has been reused, refactored, deferred or removed?
- How is the playbook installed and tested independently?
- How does the OpenCode plugin persist memory, runtime state and history?
- What can the plugin enforce, and what can it not enforce?
- What information does OpenChamber read?
- How do I build and test each package?
- What is currently complete, incomplete, broken or blocked?
- What should be worked on next?

---

## 3. Target architecture and responsibility boundaries

### 3.1 Responsibility model

| Concern | Playbook | OpenCode plugin | OpenChamber |
|---|---|---|---|
| Engineering principles | Defines | Makes available | Displays selectively |
| Agent role instructions | Defines portable roles | Integrates with OpenCode | Displays activity/role |
| Skill procedures | Defines | Loads/registers skills | No execution responsibility |
| Workflow recipes | Defines recommended paths | Tracks basic delivery progress | Displays progress |
| Agent reasoning | Guides | Does not reimplement | None |
| Task and delivery state | Explains methodology | Owns runtime records | Reads projections |
| Agent session dispatch | Describes delegation | Uses OpenCode session APIs | Displays records |
| Memory methodology | Defines useful knowledge practices | Persists and retrieves project memory | Browses published memory views |
| Activity history | Defines useful events/outputs | Records actual runtime events | Displays published history |
| Verification methodology | Defines procedures | Executes/records supported checks | Displays evidence |
| Gate requirements | Describes expected standards | Enforces a small selected set | Displays gate status |
| Review methodology | Defines rubric and process | Starts sessions and stores findings | Displays findings |
| Visualization | None | Publishes read model | Owns presentation |

### 3.2 Boundary rules

1. A skill describes how an agent should perform a procedure. A plugin tool provides a deterministic capability or records an outcome.
2. A workflow recipe composes skills and roles in Markdown or another portable content format. It is not a TypeScript state machine.
3. The plugin owns authoritative runtime records it creates or changes. Agents should use plugin tools for those structured mutations when the plugin is available.
4. OpenChamber must never mutate authoritative delivery, task, memory, history, approval or evidence records.
5. The event log is a durable activity record, not a requirement to implement a full event-sourced system or replay all state from events.
6. The playbook remains useful when plugin tools are unavailable. Skills should explain a sensible fallback using ordinary files and native harness features.
7. Harness-specific wrappers may adapt invocation and metadata, but must not fork the canonical engineering methodology.

### 3.3 What “simple runtime” means

The OpenCode plugin should provide a small set of practical capabilities, not an abstract workflow platform. Prefer direct services and clear functions over registries, plugin frameworks, generic state machines and multiple layers that merely forward calls.

A module is justified when it owns a real responsibility, contains meaningful reusable behaviour, or makes a tested boundary safer. Do not introduce a class or service layer solely to wrap a map, pass dependencies through several layers or mirror the directory tree in abstractions.

---

## 4. Repository and package strategy

### 4.1 Reuse the existing monorepo without a wholesale relocation

The audit identifies these existing package locations:

- `opencode/vstack/` — existing OpenCode plugin.
- `openchamber/vstack-panel/` — existing OpenChamber extension/panel.
- `docs/` — existing product and implementation documentation.

Keep these locations initially. Add the new Playbook package alongside them. Do not move the OpenCode and OpenChamber packages into a new `packages/` tree merely for symmetry. A later move is justified only if package tooling or distribution requires it and it can be done without disrupting working builds.

Recommended logical layout:

```text
vstack/
├── package.json
├── pnpm-workspace.yaml                 # If workspace tooling is already used
├── opencode/
│   └── vstack/                         # Existing package, refactored in place
│       ├── package.json
│       ├── src/
│       └── test/
├── openchamber/
│   └── vstack-panel/                   # Existing package, adapted in place
│       ├── package.json
│       └── panel/
├── playbook/                           # New portable package/content root
│   ├── package.json                    # Distribution metadata only; no runtime engine
│   ├── README.md
│   ├── principles/
│   ├── agents/
│   │   ├── roles/
│   │   └── adapters/
│   │       ├── opencode/
│   │       ├── codex/
│   │       └── claude-code/
│   ├── skills/
│   ├── workflows/
│   ├── resources/
│   │   ├── rubrics/
│   │   ├── templates/
│   │   └── references/
│   └── test/                           # Content validation and install smoke tests
├── docs/
│   ├── prd/
│   ├── implementation/
│   └── project-knowledge/
└── scripts/                             # Only small repo validation/package scripts
```

This is a logical target, not an instruction to move all existing files immediately. Keep the current plugin source paths until there is a concrete reason to relocate them.

### 4.2 Package boundaries

**Playbook package**
- Contains portable text content and packaging metadata.
- May contain small validation scripts used only for authoring/testing content, but must not ship a workflow runtime or plugin business logic.
- Must not depend on OpenCode, OpenChamber, a particular model provider or a proprietary tool namespace.

**OpenCode package**
- Contains all OpenCode API integration and authoritative runtime behaviour.
- May import playbook content or package metadata, but must not own the canonical content of skills and procedures.
- Owns persistence, task state, session dispatch, evidence, history, permissions and dashboard projection generation.

**OpenChamber package**
- Contains presentation components, view state and projection readers only.
- Must not import OpenCode plugin services or become a second runtime.
- Must treat all file content as potentially stale or incomplete and present that condition clearly.

### 4.3 Skills CLI distribution is an early validation gate

The exact repository layout required by `npx skills add` must be tested before the Playbook directory structure is finalised. Do not assume the Skills CLI will discover a nested `playbook/skills/` directory when the normal command expects repository-level skills.

Test the intended installation commands against a clean temporary profile for at least OpenCode and Claude Code, and verify that all selected skills are actually installed. Also test one selective install, not only wildcard installation.

If the CLI requires a root-level `skills/` directory, prefer moving/placing the canonical skills at the location the CLI recognises or use a documented supported subdirectory syntax. Do not maintain duplicate skill trees or symlink-based packaging unless the CLI and all target platforms are proven to handle them.

Publishing an npm package is useful for versioning and metadata, but it does not replace verifying the Git/Skills CLI installation experience.

---

## 5. Playbook implementation

### 5.1 Content model

The Playbook should be implemented as portable, reviewable content. Use Markdown with valid Agent Skills frontmatter for skills. Keep role definitions and workflow recipes in Markdown. Use YAML or JSON only for small, stable metadata where it materially improves validation.

Avoid a custom content schema that is more complicated than the format consumed by the harnesses.

### 5.2 Canonical role definitions

Create exactly three initial canonical roles:

1. `lead` — delivery ownership, requirement clarification, skill/workflow selection, planning coordination, task delegation, integration and communication.
2. `builder` — repository investigation, design contribution, implementation, debugging, testing, integration and implementation reporting.
3. `reviewer` — fresh-context assessment, requirement traceability, correctness, risk identification, evidence review and actionable findings.

Role content must define:
- Mission and responsibilities.
- What the role owns and does not own.
- Expected inputs and outputs.
- Relevant skill-selection behaviour.
- Collaboration and handoff expectations.
- Evidence and reporting expectations.
- Escalation conditions.

Do not create permanent agents for every specialty. Security, performance, accessibility, UI, documentation, test strategy and similar areas should normally be delivered through skills and review lenses.

### 5.3 Avoid role/skill duplication

Use one canonical source for each substantive instruction. Agent role definitions describe responsibilities and decision boundaries; skills describe procedures. A role may point to skills by name, but should not copy the entire skill procedure into its own instructions.

Harness-specific agent definitions should be thin adapters containing only harness-required metadata, tool permissions and references to canonical role guidance. If a harness requires a materialised copy, treat it as a generated adapter with provenance and a clear update path, not a second manually maintained canonical document.

For OpenCode, provision native agent Markdown files under the location recognised by OpenCode. The prior API investigation found that `ctx.agent.transform` does not expose the assumed `editor.add()` operation. Do not rely on an unsupported agent registration API. The installer must be idempotent and must not silently overwrite user-customised agent files.

### 5.4 Skill definition standard

Every skill should be independently useful and have a predictable structure. Use Agent Skills-compatible frontmatter and include, where appropriate:

- Name and concise description.
- When to use it and when not to use it.
- Required context and inputs.
- Step-by-step procedure.
- Expected artefacts or outputs.
- Verification/checklist.
- Stop conditions, retry bounds and escalation guidance.
- Optional OpenCode plugin integration notes.
- Fallback behaviour when the harness lacks a relevant capability.
- References to related skills without copying their contents.

Keep individual skills focused. A skill should not attempt to describe the entire software delivery methodology.

### 5.5 Initial skill catalogue

Build the initial catalogue in two levels so the first usable Playbook is not delayed by optional capabilities.

#### Core skills — required for the first usable release

| Skill | Responsibility | Key expected result |
|---|---|---|
| `vstack-mode` | Establish how to use the playbook and work in evidence-led, incremental steps | Consistent operating behaviour |
| `vstack-principles` | Core engineering and agent operating rules | Shared decision principles |
| `vstack-help` | Select the smallest relevant set of skills | Low-friction skill discovery |
| `vstack-sharpen` | Clarify and improve an underspecified request | Clear problem statement and acceptance intent |
| `vstack-discovery` | Investigate repository, architecture, behaviour and constraints | Grounded understanding before changes |
| `vstack-blueprint` | Compare solution structures and interfaces before substantial implementation | Reviewed design direction |
| `vstack-plan-loop` | Create, challenge and refine an actionable plan | Validated implementation plan |
| `vstack-blast-radius` | Identify affected callers, contracts, dependencies and failure paths | Impact and risk assessment |
| `vstack-tdd` | Apply test-first development where suitable | Reproducing test and focused change |
| `vstack-debugging` | Diagnose failures from evidence and root cause | Explainable fix rather than symptom patch |
| `vstack-verify-loop` | Execute checks, inspect failures and iterate within bounds | Verifiable result |
| `vstack-unstick` | Change approach after repeated failed attempts | Explicit recovery or escalation |
| `vstack-review-loop` | Obtain fresh-context review and resolve findings | Independent review outcome |
| `vstack-context-reset` | Preserve progress and resume after context interruption | Reliable handoff summary |
| `vstack-lessons` | Convert recurring mistakes into durable improvements | Actionable lessons |

#### Additional skills — add after the core catalogue is validated

| Skill | Responsibility | Notes |
|---|---|---|
| `vstack-swarm` | Partition work into independent agent tasks | Require explicit boundaries and integration ownership |
| `vstack-best-of-n` | Run independent alternative attempts and evaluate them | Use selectively; define comparison rubric and bounded attempts |
| `vstack-jury` | Coordinate multiple independent reviewers conceptually | Plugin may help dispatch/record, but skill defines review method |
| `vstack-catchup` | Bring a fresh agent up to speed | Complements context reset |
| `vstack-ledger` | Maintain an append-oriented decision record | Avoid duplicate decision sources if project ADRs already exist |
| `vstack-design` | Define visual/product design direction | Optional discipline skill |
| `vstack-design-audit` | Evaluate rendered UI and accessibility | Requires screenshot/render capabilities in the harness |
| `vstack-pr` | Prepare and create a pull request | Harness and GitHub CLI adaptation may be needed |
| `vstack-watch-pr` | Monitor checks, reviews and mergeability | Optional external integration |
| `vstack-pr-comments` | Triage and address review comments | Preserve reviewer intent and traceability |
| `vstack-ready` | Assess readiness without authorising merge | Human decision boundary remains explicit |
| `vstack-unslop` | Identify unnecessary, low-quality or generated-code clutter | Use as a focused quality lens |

The catalogue should be informed by the DeepSeek Stack procedures already reviewed, but vstack should not blindly reproduce all of its 29 skills. Adopt the useful procedures, rewrite them in vstack terminology and make their interfaces consistent. Avoid adding a skill simply because a comparable one exists elsewhere.

### 5.6 Workflow recipes

Create a Markdown recipe for each initial workflow:

- Feature delivery.
- Bug fixing.
- Refactoring.
- Research and investigation.
- Infrastructure/operations change.
- Documentation.
- Technical debt/code-quality work.

Each recipe should state:
- Trigger and suitability.
- Typical Lead/Builder/Reviewer responsibilities.
- Recommended skill sequence.
- Which steps are conditional.
- How risk changes the depth of planning, testing and review.
- How parallel work may be used safely.
- Expected outputs and evidence.
- Completion and escalation criteria.
- How to proceed without the OpenCode plugin.
- Which plugin capabilities can help when available.

Do not implement recipes as executable TypeScript graphs. The Lead selects and applies them; the plugin tracks a lightweight delivery status and supporting records.

### 5.7 Portable installation and harness validation

The first Playbook release must be validated in at least:
- OpenCode.
- Claude Code.
- Codex, subject to the supported Skills CLI and agent-definition conventions available in the installed version.

For each harness:
- Install all skills into a clean test profile.
- Install a selected subset.
- Verify names, descriptions and content are discoverable.
- Verify the role instructions can be applied or adapted.
- Search canonical content for accidental OpenCode API/tool dependencies.
- Execute a small sample workflow without the vstack OpenCode plugin.
- Record capability limitations and fallback behaviour.

Do not claim full parity between harnesses. The acceptance requirement is that the same core methodology is usable, with documented adaptations where native features differ.

---

## 6. OpenCode plugin implementation

### 6.1 Scope and non-goals

The plugin provides six practical capability areas:

1. Playbook integration.
2. Project memory.
3. Delivery and task records.
4. Agent session dispatch and tracking.
5. Activity history and evidence.
6. Limited enforcement.

It does not implement the engineering procedures themselves. It does not require every step in a workflow to be represented by a plugin call. It does not need an elaborate lifecycle engine, priority scheduler, distributed queue, deployment framework or generic policy interpreter.

### 6.2 Target module responsibilities

Retain the current package location `opencode/vstack/` and refactor its internals only as required. A simplified target source layout could be:

```text
opencode/vstack/src/
├── index.ts                    # Thin plugin bootstrap and registration
├── playbook/
│   ├── skill-loader.ts         # Load/register portable skills
│   └── agent-installer.ts      # Idempotent native agent provisioning
├── persistence/
│   ├── repository-root.ts
│   ├── file-store.ts
│   ├── locks.ts
│   ├── atomic-write.ts
│   ├── event-log.ts
│   └── schema-version.ts
├── memory/
│   ├── memory-store.ts
│   └── memory-index.ts         # Only if search/index needs it
├── deliveries/
│   ├── delivery-store.ts
│   └── task-store.ts
├── agents/
│   ├── dispatch.ts
│   └── session-records.ts
├── quality/
│   ├── check-discovery.ts
│   ├── execution.ts
│   ├── evidence-store.ts
│   └── completion-checks.ts
├── history/
│   └── history-service.ts
├── dashboard/
│   └── index-generator.ts
├── permissions/
│   └── protected-actions.ts
├── tools/
│   └── index.ts               # Small model-facing surface
├── hooks/                     # Only hooks actually needed by the runtime
└── schemas/                   # Runtime entity and projection schemas
```

This is a responsibility guide, not a mandatory file-for-file migration. If an existing module already provides the required behaviour cleanly, retain its location. Do not create empty directories or one-file wrapper modules merely to match the diagram.

### 6.3 Plugin bootstrap

Refactor `src/index.ts` so it performs only the work required to initialise the plugin:

1. Resolve the active project root using the supported OpenCode context.
2. Establish the `.vstack/` locations and validate the manifest/schema version.
3. Initialise the small persistence and runtime services.
4. Recover or mark interrupted sessions as appropriate.
5. Register portable skills with the supported OpenCode skill mechanism.
6. Provision/update native agent definitions safely.
7. Register the small set of tools, commands and hooks.
8. Generate or refresh the OpenChamber read model after relevant mutations.

Do not initialise a large graph of services or register systems that are not used in the prototype.

### 6.4 Model-facing tool surface

Start with approximately seven cohesive tools. Prefer a small number of action-based tools with clear schemas over exposing every internal method as a separate tool.

| Tool | Supported actions/capabilities | Must not do |
|---|---|---|
| `vstack_status` | Project status, delivery summary, active tasks, blockers and next-ready tasks | Reconstruct all history on every call |
| `vstack_memory` | Search/read memory; propose or apply a bounded memory update | Save raw conversations indiscriminately |
| `vstack_history` | Query recent activity or history for a delivery/task | Pretend history proves success without evidence |
| `vstack_delivery` | Create, get, list and update delivery metadata/status | Execute the workflow procedure itself |
| `vstack_task` | Create, get, list, update, add dependency and identify ready tasks | Implement a sophisticated priority scheduler |
| `vstack_agent` | Dispatch an agent, associate session with work, inspect status and record handoff | Become a custom agent runtime |
| `vstack_check` | Discover supported checks, execute an explicitly selected check, record evidence and inspect completion requirements | Claim unexecuted checks passed |

The precise schema for each tool should be finalised against OpenCode's actual tool API. Each action must have strict input validation, bounded output and useful error messages. Keep internal helpers private; do not expose internal CRUD operations that agents do not need.

If one tool becomes unwieldy, split it based on observed usability rather than creating separate tools pre-emptively. The tool count is a scope guideline, not a quota.

### 6.5 Commands

Keep commands minimal. Initial candidate commands:

- `/vstack` — help, current status and available capabilities.
- `/vstack-start` — start or register a delivery from the current request.
- `/vstack-status` — summarise current delivery and active work.
- `/vstack-resume` — retrieve the current delivery context and continue safely.
- `/vstack-report` — produce a concise delivery summary.

Do not duplicate every tool as a slash command. Add a command only when it materially improves interactive usability.

### 6.6 Playbook integration

- Load canonical skills from the Playbook package.
- Use the supported `ctx.skill.transform` registration mechanism already verified in the installed OpenCode API.
- Provision agent files in the OpenCode-recognised agent directory rather than relying on an unsupported agent editor `add` method.
- Make the installer idempotent.
- Store generated file provenance/version information.
- Never silently overwrite a user-customised native agent file. Detect divergence and report whether the file is unchanged, safely updateable or locally modified.
- Keep user-defined agents untouched.
- Ensure installed skills and native role definitions do not duplicate the canonical content as separately maintained copies.

### 6.7 Delivery and task management

Reuse the existing task graph and dependency logic. Keep the persisted model simple.

Minimum delivery capabilities:
- Create a delivery with ID, title, objective, scope/acceptance summary, status and timestamps.
- Retrieve and list deliveries.
- Update status and summary.
- Associate tasks, agent runs, evidence, reviews and relevant events.
- Record blocked reason and completion summary.

Minimum task capabilities:
- Create task with title, description, acceptance criteria, status and dependencies.
- List/get/update task.
- Add/remove or update dependencies as appropriate.
- Detect cycles.
- Determine which tasks are ready based on dependency state.
- Associate a task with a role/agent/session/workspace reference when applicable.
- Record outcome and evidence links.

Use a deliberately small status vocabulary. Initial suggestion:
- Delivery: `active`, `blocked`, `completed`, `cancelled`.
- Task: `pending`, `ready`, `in_progress`, `blocked`, `completed`, `cancelled`.
- Agent run: `queued`, `running`, `completed`, `failed`, `interrupted`, `unknown`.

Do not introduce complex state machines. Validate only meaningful transitions and preserve a reason when a delivery/task is blocked or cancelled.

### 6.8 Agent dispatch and tracking

Reuse the existing OpenCode session dispatch implementation after verifying it against the installed API version.

Minimum behaviour:
- Dispatch one role/agent with a task description and relevant context.
- Associate the resulting OpenCode session ID with the delivery/task.
- Record the role, creation time, requested objective and current status.
- Query session state using supported APIs.
- Record completion, failure, interruption or handoff.
- Permit the Lead to inspect active agent runs.

Do not implement:
- A custom agent runtime or independent worker process system.
- A priority scheduler.
- Complex automatic retry orchestration.
- A distributed queue.
- Worktree orchestration until a concrete workflow demonstrates the need.

For parallel tasks, the Lead and playbook determine the partition and delegation. The plugin provides session dispatch and records. If worktrees are used, they must be explicitly scoped and their repository-root behaviour verified before enabling them by default.

### 6.9 Project memory

Memory is curated project knowledge, not a dump of every conversation, session or history event.

Initial memory categories:
- Project overview and purpose.
- Architecture and significant boundaries.
- Engineering conventions.
- Decisions and rationale.
- Known constraints and recurring pitfalls.
- Lessons learned.
- Relevant ongoing context/handoffs.

Minimum operations:
- Search/list relevant memory documents.
- Read a specific document or section.
- Create or update a memory item/document.
- Record source/context and updated timestamp.
- Allow an agent to propose a memory update and make the resulting change visible.

Memory update rules:
- Prefer concise curated entries over transcript summaries.
- Do not automatically promote every event or agent statement into memory.
- Avoid duplicate or contradictory facts; update or supersede existing knowledge explicitly.
- Keep decision history traceable. A new decision should not erase the previous one without marking it superseded.
- Do not store secrets, credentials, tokens or sensitive user data.
- Keep runtime memory project-scoped.

The Playbook should explain how agents decide what merits memory. The plugin stores and retrieves it.

### 6.10 Activity history

Reuse the existing append-only JSONL event log. Do not build a new event-sourcing framework.

Record meaningful events such as:
- Delivery created/updated/blocked/completed.
- Task created/updated/assigned/blocked/completed.
- Agent dispatched/session started/completed/failed/interrupted/handoff.
- Check started/completed/failed.
- Evidence recorded.
- Review started/finding added/finding resolved/review completed.
- Approval requested/granted/denied where supported.
- Memory created/updated/superseded.

Each event should have a stable ID, timestamp, event type, actor/source, relevant entity IDs, concise summary, outcome and bounded metadata. Add a correlation ID where useful to connect a user request, delivery, task and agent session.

History should be append-oriented and treated as an audit record. The current entity files remain the source of current state; do not require rebuilding all current state by replaying history. Protect history writes from concurrent corruption using the existing lock/write mechanisms. Handle malformed or partial final lines safely and report the issue rather than silently discarding earlier valid history.

Do not log secrets, full prompts by default, unbounded process output or unnecessary personal data.

### 6.11 Evidence and check execution

Reuse the existing evidence ledger and execution adapter if the code and tests confirm they are reliable enough for the prototype.

Minimum check capabilities:
- Discover likely project checks from supported project metadata where practical.
- Allow an agent to select a specific check/command.
- Execute within the permitted project scope.
- Bound execution time and captured output.
- Record exact command/check identity, start/end time, exit status, summary and relevant output reference.
- Distinguish `passed`, `failed`, `skipped`, `unavailable` and `not_run`.
- Associate evidence with delivery/task and, where relevant, agent session.

Safety requirements:
- Do not build commands by concatenating untrusted input into a shell string.
- Validate working directory and command parameters.
- Use an explicit allow/approval model for commands that can be destructive or have external side effects.
- Apply timeouts and output limits.
- Do not treat an agent's textual claim as an executed result.
- Avoid building separate test, build, security and acceptance engines for the prototype. A generic verified execution and evidence record is sufficient.

### 6.12 Basic enforcement

The plugin should enforce only a few rules with clear value:

1. A delivery cannot be marked completed while required tasks remain incomplete, unless an explicit documented exception is recorded.
2. A task cannot be marked verified/completed where its configured required check evidence is missing or failed.
3. A protected action/transition requires an explicit approval record when configured.
4. Blocked status requires a reason.
5. A reviewer finding that is designated blocking must be resolved or explicitly waived before the relevant completion boundary.

Do not enforce every skill step. Do not make a general-purpose policy language. Do not create multiple autonomy modes for the prototype.

Permission enforcement must use the actual OpenCode permission APIs and must be tested. Tool-level guards do not prevent bypass through shell or other tools. For each protected action, document the exact boundary covered, the bypass paths tested and the limitations. Never describe recorded approval as equivalent to an operating-system or universal harness permission boundary.

### 6.13 Recovery and resumption

Implement a simple and honest recovery path:
- On startup, inspect records left in `running` or `in_progress` state.
- Query the supported OpenCode session API to determine whether a recorded session still exists/is active.
- Mark unresolved records as `interrupted` or `unknown` when their state cannot be established.
- Preserve the last known task, delivery, handoff and evidence context.
- Allow the Lead/user to resume explicitly.

Do not automatically repeat an uncertain action. Do not implement complex auto-healing or speculative retry logic. A truthful interrupted status is better than silently claiming work is still running or restarting potentially destructive work.

### 6.14 Explicitly deferred plugin functionality

Do not carry these into the prototype unless a tested end-to-end use case proves they are required:

- Generic lifecycle/workflow interpreter.
- Seven elaborate lifecycle profiles as executable state machines.
- Sophisticated scheduler or priority queue.
- Separate orchestration coordinator layer that only forwards calls.
- Complex phase re-entry system.
- Multiple specialised build/test/security/acceptance engines.
- Complex review jury scheduler or voting framework.
- Deployment, rollback and post-release execution engine.
- Elaborate autonomy-mode and policy framework.
- Advanced automatic reconciliation or crash auto-repair.
- Distributed/multi-host coordination.
- Automatic worktree creation/cleanup.
- Event compaction/replay framework.
- Generic plugin service registry.

Keep useful old code available until the simplified path is tested. “Remove from prototype scope” does not mean immediately delete all historical source. Mark it clearly as deferred or obsolete and remove it only after references and tests are reconciled.

---

## 7. Data and persistence design

### 7.1 General rules

- Continue using project-local `.vstack/` files.
- Reuse the existing atomic file store, locking and schema validation.
- Keep runtime state understandable and inspectable by a human.
- Keep current state, project memory, history and dashboard projections logically distinct.
- Do not introduce a database or external state service for the prototype.
- Do not implement full event sourcing.
- Use stable IDs and schema versions for persisted records.
- Apply atomic writes for authoritative entity updates and multi-record changes where required.
- Generate dashboard projections from authoritative records; do not let the UI update them.

### 7.2 Recommended logical layout

Preserve existing paths where feasible. The following is the intended logical organisation; the developer should map actual existing files before changing paths:

```text
.vstack/
├── manifest.json
├── deliveries/
│   └── <delivery-id>/
│       ├── delivery.json
│       ├── tasks/
│       │   └── <task-id>.json
│       ├── evidence/
│       │   └── <evidence-id>.json
│       ├── reviews/
│       │   └── <review-id>.json
│       └── reports/
│           └── summary.json
├── memory/
│   ├── index.json
│   ├── project.md
│   ├── architecture.md
│   ├── conventions.md
│   ├── lessons.md
│   └── decisions/
├── state/
│   ├── runtime.json             # Only if a separate runtime snapshot is needed
│   └── index.json               # OpenChamber dashboard projection
├── history/
│   └── events.jsonl
└── reports/
    ├── overview.json
    └── activity/                # Published/paginated activity summaries if needed
```

Do not create empty categories merely to match this layout. If the existing implementation already stores events at `.vstack/state/events.jsonl`, preserve that location initially or migrate it safely. Avoid moving data solely for visual symmetry.

### 7.3 Core record concepts

Keep record models small. Exact TypeScript types and JSON schemas should be based on the existing `schemas/types.ts`, preserving useful branded IDs while removing unused complexity.

**Project manifest**
- Project ID.
- Schema/content version.
- Creation/update timestamps.
- Root identity or canonical repository reference where safe.
- Feature/config flags only when needed.

**Delivery**
- Delivery ID.
- Title and objective.
- Scope/acceptance summary.
- Status.
- Created/updated/completed timestamps.
- Blocked reason if applicable.
- Related task IDs and summary counts.

**Task**
- Task ID and delivery ID.
- Title/description.
- Acceptance criteria.
- Status.
- Dependency IDs.
- Assigned role/agent and session reference where applicable.
- Workspace/worktree reference only when actually used.
- Outcome and evidence references.
- Timestamps and revision.

**Agent run**
- Run ID.
- Delivery/task IDs.
- Role/agent identifier.
- OpenCode session ID.
- Objective/context reference.
- Status and timestamps.
- Outcome/handoff summary.

**Evidence**
- Evidence ID.
- Delivery/task IDs.
- Check type/name and command identity.
- Execution timestamps.
- Result status and exit code.
- Bounded output summary/reference.
- Source session/actor.

**Review/finding**
- Review ID, delivery/task reference, reviewer role/session.
- Review status and summary.
- Finding ID, severity/category, description, evidence/reference, status and resolution.

**History event**
- Event ID and timestamp.
- Event type and actor/source.
- Relevant entity IDs.
- Concise summary/outcome.
- Bounded, non-sensitive metadata.

**Memory document/item**
- Stable identifier/category.
- Title and content.
- Source/reference or rationale.
- Created/updated timestamps.
- Optional status such as current/superseded.

### 7.4 Concurrency and integrity

Reuse the current revision-based optimistic concurrency and file locking. Test concurrent updates from separate OpenCode sessions/processes before claiming correctness.

At minimum:
- Entity writes should detect stale revisions.
- Multi-entity changes should use the existing atomic batch mechanism where appropriate.
- History append operations should be protected against interleaved writes.
- Stale-lock recovery must be tested.
- Dashboard projection writes should be atomic.
- A failed projection refresh must not corrupt authoritative delivery/task records.
- File corruption should be reported and handled without silently overwriting the only valid copy.

The prototype may document a single-machine/local-filesystem assumption. Do not claim safe multi-host distributed coordination.

### 7.5 Schema changes and migration

The audit found schema version tracking but no complete migration runner. Implement only the migration support required for changes that the prototype actually makes.

Requirements:
- Identify the current persisted schema before changing it.
- Add a migration for each incompatible persisted-data change.
- Make migrations repeatable or detect already-migrated records.
- Never delete old source data as part of a migration.
- Create a migration report/event.
- Validate migrated records after writing.
- Test migration using copies of real existing `.vstack/` data, including interrupted/partial migration cases.
- Preserve an untouched fixture of the prior format for regression testing.

Do not invent a large migration framework for hypothetical future versions. A small ordered migration registry or explicit version switch is sufficient.

---

## 8. OpenChamber implementation

### 8.1 Scope

Reuse the existing UI and navigation where they remain useful. The principal refactor is the data boundary, not a wholesale visual rewrite.

OpenChamber is read-only in this prototype. It must not mutate records, approve actions, dispatch agents, execute checks or implement workflow logic.

### 8.2 Published read model

The OpenCode plugin should publish a compact, atomic dashboard read model after meaningful changes. OpenChamber should consume only published projections/reports and must not inspect delivery internals directly.

Initial projection content:
- Project identifier and schema/read-model version.
- Revision and generation timestamp.
- Active/recent delivery summaries.
- Delivery status, progress counts and blockers.
- Task summaries and dependency references needed for visualisation.
- Agent-run summaries and outcomes.
- Recent activity summaries.
- Memory document index/summary, not necessarily full memory content in the overview.
- Quality status, evidence summary and unresolved review findings.
- Paths/references to published detail reports.

Possible files:
- `.vstack/state/index.json` — compact dashboard overview and current summaries.
- `.vstack/reports/deliveries/<id>.json` — published delivery detail.
- `.vstack/reports/activity/<cursor-or-date>.json` — bounded activity pages.
- `.vstack/reports/memory-index.json` — searchable/browsable memory catalogue.

The plugin is responsible for keeping these projections current. The projection is disposable/rebuildable from authoritative records; it is not the source of truth.

### 8.3 UI work

Reuse:
- Existing dashboard components that consume straightforward data.
- Existing navigation and HTML entry points where they work.
- Existing visual components and styles that do not embed workflow assumptions.

Refactor:
- `panel/main.ts` into a small bootstrap plus focused view modules if the current monolith makes the change unsafe.
- `services/api.ts` into projection readers and data validation.
- Duplicate dashboard rendering logic into one source.

Remove:
- Direct reads of delivery/task/evidence internals from the UI.
- Any mutation or workflow behaviour.
- Duplicated rendering/data transformation logic that is no longer required.

### 8.4 Refresh and stale-state behaviour

Use the OpenChamber-supported file APIs to read projections. Poll at a modest interval (initial target: 2–5 seconds, configurable if supported) or use a supported revision/change notification mechanism. Do not poll every detail file continuously.

The UI must:
- Display the projection revision and last-updated time.
- Show a stale/unavailable state when refresh fails or data is old.
- Avoid replacing good data with a partially read or invalid projection.
- Validate projection version and shape before rendering.
- Fetch detail reports only when the corresponding view is opened.

Although the SDK may grant a broad `files` capability, the extension implementation must call only read operations. Verify the actual extension metadata and API against the installed OpenChamber SDK; do not assume an unverified manifest format or separate read-only permission exists.

---

## 9. Existing implementation reuse decisions

The audit report is the initial inventory, not final proof. Reconfirm each module before changing it. Use these decisions as the default.

### 9.1 Keep with minimal changes

| Existing component | Decision | Notes |
|---|---|---|
| `persistence/file-store.ts` | Keep | Reuse atomic read/write and validation |
| `persistence/locks.ts` | Keep | Verify cross-process and stale-lock tests |
| `persistence/atomic-write.ts` | Keep | Reuse for authoritative multi-record writes |
| `persistence/event-log.ts` | Keep | Use as activity history foundation |
| `persistence/repository-root.ts` | Keep | Verify main repo/worktree resolution |
| `schemas/types.ts` | Keep and trim | Do not move into the content-only Playbook |
| JSON schemas | Keep and trim | Retain schemas used by persisted entities and projections |
| Task graph/dependency logic | Keep | Runtime capability; do not move into Playbook |
| Agent installer | Keep | Preserve custom files; use supported filesystem provisioning |
| Agent session dispatch | Keep | Verify against current OpenCode API |
| Evidence ledger | Keep | Simplify if it duplicates current state storage |
| Execution adapter | Keep conditionally | Verify process safety, timeouts, output limits and tests |
| Dashboard index generator | Keep and adapt | Publish read model only |

### 9.2 Refactor or simplify

| Existing component | Decision | Target |
|---|---|---|
| `index.ts` | Refactor | Thin bootstrap |
| `skills/skill-loader.ts` | Refactor | Load canonical Playbook content and register via supported API |
| `lifecycle/profiles.ts` | Transform content | Markdown workflow recipes; retain only small runtime status definitions where needed |
| `phase-transitions.ts` | Simplify | Basic delivery/task transition validation only |
| `lifecycle-engine.ts` | Remove most abstraction | Direct delivery operations and small state validation |
| `task-service.ts` | Simplify | Direct CRUD/dependency/ready operations |
| `assignment.ts` | Simplify | Basic assignment metadata; Lead makes decisions |
| `session-tracker.ts` | Simplify | Persist agent-run records; avoid duplicate in-memory tracker |
| `gates.ts` | Simplify | A few evidence/completion checks; no generic registry framework |
| `check-discovery.ts` | Simplify | Supported common project checks only |
| `evidence-ledger.ts` | Adapt | Use existing persistence contract without creating a second source of truth |
| `review-orchestrator.ts` | Reduce | Session dispatch plus simple review/finding records |
| `findings.ts` / `resolution.ts` | Simplify | Basic review finding lifecycle |
| `recovery-manager.ts` | Reduce | Detect interrupted/unknown sessions and enable explicit resume |
| `reconciliation.ts` | Reduce or merge | Basic consistency checks only |
| `permissions.ts` / `approvals.ts` | Simplify | Small explicit protected-action rules |
| `runtime/state.ts` | Adapt | Initialize manifest, services and read-model projection |
| OpenChamber `main.ts` | Refactor | Projection-driven view bootstrap |
| OpenChamber `api.ts` | Replace | Projection readers and validation |

### 9.3 Defer or remove from prototype scope

- `orchestration/coordinator.ts` as a separate coordination framework.
- `orchestration/scheduler.ts` and priority scheduling.
- Complex cancellation/retry orchestration; keep basic session interruption handling if already useful.
- Generic lifecycle profiles interpreted by an engine.
- Elaborate phase re-entry logic.
- Separate build, test, security and acceptance engines where a single check runner and evidence store suffice.
- Complex jury scheduling/voting; the playbook defines the jury procedure and plugin dispatches/records sessions.
- Release preparation, deployment, rollback and post-release execution services.
- Advanced autonomy modes and general policy registry.
- Automatic worktree creation/cleanup until an end-to-end use case requires it.
- Event replay, compaction and distributed event infrastructure.
- Multi-project service orchestration beyond a project-local `.vstack/`.

Do not delete these modules at the beginning. First remove references from the active execution path, update tests, document deferral and then remove obsolete code only when safe.

### 9.4 Important correction to the prior audit proposal

Do **not** move pure TypeScript task graphs, gate evaluators, check executors, session reconciliation or transition enforcement into the Playbook merely because they have no OpenCode imports. The Playbook is a portable engineering content package, not a portable TypeScript workflow engine.

The Playbook may define the procedure and expected contract in Markdown. Runtime algorithms that manipulate authoritative state, execute processes or coordinate sessions remain in the OpenCode plugin.

---

## 10. Implementation phases and work packages

The phases below are ordered to reduce risk and validate the new boundaries early. They are implementation increments, not product lifecycle phases. The developer should keep each increment small, independently testable and reflected in the project knowledge base.

### Phase 0 — Baseline, inventory and project knowledge base

**Objective:** Establish a trustworthy view of the current repository before changing it.

Tasks:
1. Create the mandatory `docs/project-knowledge/` structure.
2. Read the existing implementation plan, PRD, code and tests.
3. Verify actual build/test commands for each existing package.
4. Run existing tests and record exact baseline results.
5. Inventory source modules, dependencies, entry points and current persistence formats.
6. Verify which existing capabilities work end-to-end and which are stubs.
7. Identify duplicate files/modules and resolve the audit's reported duplicate `check-discovery.ts` path discrepancy.
8. Verify current OpenCode and OpenChamber versions/API assumptions used by the repository.
9. Preserve a known-good baseline through Git history/tag/branch as appropriate; do not delete or rewrite historical source.
10. Create a reuse decision record for each major subsystem.

Deliverables:
- Current-state and component inventory.
- Baseline build/test report.
- Confirmed API/version compatibility notes.
- Initial architecture and reuse decisions.
- Updated implementation backlog.

Acceptance criteria:
- A clean checkout can run the documented baseline commands.
- Every major module is classified as keep, refactor, defer or remove.
- Stubbed/unverified functions are explicitly identified.
- Knowledge base is usable and accurate.
- No implementation files have been changed merely to satisfy the audit.

Exit condition: The developer can explain the current working system and its limitations based on source and test evidence, not only the previous audit report.

### Phase 1 — Playbook foundation and portable MVP

**Objective:** Create a useful, independently installable Playbook before building more runtime machinery.

Tasks:
1. Establish the Playbook package and its distribution metadata.
2. Validate Skills CLI discovery/layout before fixing the canonical skills path.
3. Write the foundation principles and operating guide.
4. Write the three canonical role definitions: Lead, Builder and Reviewer.
5. Write the core skill set listed in Section 5.5.
6. Write initial workflow recipes for feature delivery, bug fixing and refactoring; add the remaining PRD workflows as appropriate.
7. Define common handoff, plan, review and verification output conventions.
8. Ensure skill frontmatter and directory naming meet the selected Agent Skills convention.
9. Add content validation for required frontmatter, unique names, broken internal references and duplicate skill names.
10. Test clean install and selective install into OpenCode and Claude Code; test Codex support where the current tooling permits.
11. Run a small bug-fix workflow and a feature-planning exercise without the vstack plugin.
12. Record capability differences and fallback practices.

Deliverables:
- Playbook package with portable roles, core skills, workflow recipes and resources.
- Installation instructions.
- Content validation tests.
- Cross-harness compatibility report.

Acceptance criteria:
- Playbook installs independently of the runtime plugins.
- At least one selective skill install succeeds.
- Core skills are discoverable in at least two harnesses.
- Role definitions are useful without the OpenCode plugin.
- No core skill requires vstack-specific runtime tools.
- A simple bug fix can be guided without unnecessary lifecycle ceremony.
- A substantial feature can be planned using the same Playbook.

Exit condition: vstack already provides meaningful value as a portable playbook, even if the plugin work stops here.

### Phase 2 — OpenCode integration: load Playbook and native roles

**Objective:** Make the existing OpenCode plugin consume the canonical Playbook without duplicating it.

Tasks:
1. Adapt the existing skill loader to load from the new canonical Playbook location/package.
2. Register skills through the verified OpenCode skill transform API.
3. Implement role adapter metadata for OpenCode.
4. Provision native agent files in the OpenCode-supported filesystem location.
5. Make agent provisioning idempotent.
6. Record source version/hash and detect user modifications before updating generated files.
7. Preserve user-defined agents and customisations.
8. Remove duplicate role instructions from any old skill or agent copies.
9. Test plugin startup with a clean project and an existing project containing customised agent files.
10. Validate that the same canonical skills are available through standalone installation and plugin loading.

Deliverables:
- OpenCode Playbook loader.
- Safe agent installer.
- Documented role adapter convention.
- Tests for skill and agent integration.

Acceptance criteria:
- Plugin loads without errors and registers expected skills.
- Native Lead, Builder and Reviewer definitions are available.
- Repeated startup does not create duplicate files or corrupt custom files.
- Modified user agent files are detected and not silently overwritten.
- No agent editor API unsupported by the installed OpenCode version is used.

Exit condition: OpenCode users can use the same Playbook content through native integration; the plugin has not yet grown a new workflow engine.

### Phase 3 — Runtime foundation: persistence, memory, delivery and tasks

**Objective:** Reuse current persistence and provide the smallest useful shared project state.

Tasks:
1. Retain existing file-store, locking, atomic-write, repository-root and event-log modules.
2. Trim schema/types to the entities required by the prototype while preserving stable existing IDs where possible.
3. Confirm `.vstack/` root resolution for normal projects and existing worktrees.
4. Define the minimum project manifest and schema version behaviour.
5. Implement a simple migration for any required persisted-data format changes.
6. Implement memory documents and a minimal index/search method.
7. Define memory categories and update rules.
8. Reuse delivery store/CRUD behaviour where possible.
9. Simplify task service around create/get/list/update/dependency/ready operations.
10. Keep dependency cycle detection and topological readiness logic.
11. Record delivery/task changes in history.
12. Add status and context retrieval.
13. Test restart continuity, concurrent writes and migration against copied prior-format data.

Deliverables:
- Working project store.
- Curated project memory.
- Delivery/task CRUD and dependency handling.
- Activity records for state changes.
- Migration and persistence test fixtures.

Acceptance criteria:
- A delivery and tasks persist across OpenCode restarts.
- Task dependencies are validated and ready tasks are correctly identified.
- Concurrent updates do not silently overwrite newer state.
- Memory can be searched/read/updated across separate sessions.
- Memory is distinct from history and current delivery/task state.
- Previous data is preserved during migration.

Exit condition: A Lead can create a delivery, record tasks, retrieve project knowledge and resume the delivery after a restart.

### Phase 4 — Agent coordination, evidence and limited enforcement

**Objective:** Add only the runtime mechanics that provide clear value beyond portable skills.

Tasks:
1. Reuse and verify OpenCode session dispatch.
2. Associate each dispatched session with a delivery/task/role.
3. Persist basic agent-run state and outcomes.
4. Replace an in-memory session tracker with persisted agent-run records where appropriate.
5. Implement explicit handoff/completion/interruption recording.
6. Implement basic startup detection of stale/interrupted agent runs.
7. Reuse the execution adapter after validating process safety and output bounds.
8. Keep check discovery to common package/build/test metadata initially.
9. Record actual check executions in the evidence ledger.
10. Distinguish pass, fail, skipped, unavailable and not-run states.
11. Implement basic completion checks for required evidence and unresolved blocking findings.
12. Implement explicit approval requirements only for a small set of protected actions/transitions.
13. Verify the enforcement boundary and test known bypass paths.
14. Implement concise tools for status, memory, history, delivery, task, agent and check operations.
15. Generate/update the dashboard projection after relevant mutations.
16. Test one sequential and one small parallel delivery using the native session APIs.

Deliverables:
- Agent dispatch and tracking.
- Evidence and check recording.
- Small, explicit enforcement rules.
- Minimal model-facing tool surface.
- Updated dashboard read model.

Acceptance criteria:
- Lead can dispatch Builder and Reviewer sessions and relate them to tasks.
- Session outcomes are persisted and visible after restart.
- Interrupted sessions are marked honestly and can be resumed deliberately.
- A check run by the plugin records the actual observed result.
- Required evidence is checked before a protected completion transition.
- Approval state is recorded and the supported OpenCode permission boundary is tested.
- Plugin tools remain small and understandable.
- No generic workflow engine or scheduler has been introduced.

Exit condition: A feature delivery can be coordinated, verified and reviewed through the runtime, with real activity and evidence records.

### Phase 5 — OpenChamber read-only visualization

**Objective:** Reuse the existing UI while switching it to the plugin's published projections.

Tasks:
1. Audit existing UI components and retain those independent of the old file layout.
2. Define and version the dashboard projection contract.
3. Extend the OpenCode index generator to publish summary/read-model data.
4. Publish detail reports and bounded activity pages needed by the UI.
5. Refactor the OpenChamber data layer to read only projections/reports.
6. Remove direct reads of delivery/task/evidence internals.
7. Remove duplicate dashboard rendering paths.
8. Split the existing large panel entry point into focused view modules only where needed for safe maintenance.
9. Implement freshness, loading, stale and unavailable states.
10. Validate SDK methods and extension metadata against the installed OpenChamber version.
11. Confirm the implementation calls only read operations despite the broad files capability.
12. Test large delivery lists and history pagination sufficiently for prototype use.

Deliverables:
- Projection-driven OpenChamber plugin.
- Overview, delivery, task, agent, memory, history and quality views.
- Documented read-model contract.

Acceptance criteria:
- UI displays current deliveries and task relationships from the published index/reports.
- User can inspect agent activity, memory summaries, history and evidence.
- UI refreshes after plugin mutations without manual reconstruction.
- Stale and invalid data is clearly indicated.
- UI does not directly read authoritative delivery internals.
- UI does not mutate, dispatch, execute or approve anything.

Exit condition: A user can understand current and historical work through OpenChamber without inspecting raw `.vstack/` files.

### Phase 6 — End-to-end validation, hardening and prototype release

**Objective:** Prove the three packages work together and document limitations honestly.

Tasks:
1. Run the full package test/build matrix.
2. Validate clean installation of the Playbook without plugins.
3. Validate OpenCode plugin installation and startup.
4. Validate OpenChamber extension installation and projection reading.
5. Execute a small bug fix end-to-end.
6. Execute a feature delivery with at least two tasks and independent review.
7. Execute a parallel task scenario if the current OpenCode session capabilities support it reliably.
8. Verify actual check evidence and finding resolution.
9. Verify memory persists and is useful in a new session.
10. Verify history captures significant events in correct order.
11. Verify an interrupted session can be identified and resumed without automatic duplicate execution.
12. Verify permission limitations and document bypasses.
13. Test migration from existing `.vstack/` records using fixtures.
14. Test OpenChamber stale/read failure handling.
15. Update all project knowledge documents and user-facing package documentation.
16. Produce a final prototype limitation and known-issues report.

Deliverables:
- End-to-end test report.
- Installation and usage documentation.
- Current-state and known-issues documentation.
- Prototype release notes.

Acceptance criteria:
- PRD core acceptance criteria are demonstrated.
- No test is described as passing without an executed result.
- The Playbook works without either plugin.
- Runtime state, memory and history remain distinguishable.
- OpenChamber is read-only and uses projections.
- The plugin remains small and focused.
- Known limitations and unsupported harness capabilities are documented.

Exit condition: The prototype can be used for real engineering work with transparent limitations and a maintainable knowledge base.

---

## 11. Testing and validation strategy

Testing must validate the actual product boundaries, not merely individual helper functions.

### 11.1 Playbook content tests

Automated validation should check:
- Every skill has valid frontmatter and required fields.
- Skill names are unique and use consistent naming.
- Internal links/references resolve.
- Workflow recipes reference existing skills and roles.
- Role instructions do not duplicate complete skill procedures.
- Canonical core content contains no hard dependency on OpenCode tool names or APIs.
- Required skills are discoverable through the intended distribution mechanism.

Manual harness validation should check:
- Clean install.
- Selective install.
- Skill discovery and invocation.
- Role use/adaptation.
- Small bug-fix workflow without plugin.
- Feature planning without plugin.
- Documented fallback when the harness lacks subagents or parallel execution.

### 11.2 OpenCode plugin unit tests

Prioritise tests for:
- Project-root resolution.
- File-store read/write and schema validation.
- Atomic writes and lock behaviour.
- Stale lock recovery.
- Revision conflict detection.
- History append and malformed-tail handling.
- Memory create/read/search/update.
- Delivery and task status updates.
- Dependency cycle detection and ready-task calculation.
- Agent-run state mapping.
- Check execution timeout/output limits/result mapping.
- Evidence association and completion checks.
- Approval requirements and permission decisions.
- Dashboard projection generation.
- Agent installer idempotency and user-customisation protection.

### 11.3 Integration tests

At minimum:
- Delivery create → task create → dependency update → status update → history event.
- Memory update → new plugin session → memory retrieval.
- Agent dispatch → session association → completion event.
- Agent interruption → recovery detection → explicit resume.
- Check execution → evidence record → completion check.
- Review finding creation → resolution → completion status.
- State mutation → dashboard index refresh.
- Concurrent updates → revision conflict/locking behaviour.
- Old-format fixture → migration → post-migration schema validation.

### 11.4 OpenChamber tests

Test:
- Valid projection load.
- Missing projection.
- Unsupported projection version.
- Stale projection timestamp.
- Partial/corrupt report.
- Refresh after revision change.
- Detail-page lazy load.
- History paging/limits.
- No write, command, session or mutation calls from the extension.

### 11.5 End-to-end scenarios

**Scenario A — Standalone bug fix**
- Install only the Playbook in a supported non-runtime harness.
- Use request sharpening/discovery, TDD, verification and review skills as appropriate.
- Confirm that the task can be completed without vstack plugin tools.

**Scenario B — OpenCode feature delivery**
- Start a delivery.
- Create a plan and multiple tasks.
- Dispatch a Builder.
- Record implementation and check evidence.
- Dispatch a fresh-context Reviewer.
- Resolve a blocking finding.
- Complete the delivery subject to required checks.
- Inspect the complete current state and history in OpenChamber.

**Scenario C — Context interruption**
- Begin a delivery and record progress.
- Interrupt/restart the session or plugin.
- Confirm that current task/session state is not falsely reported as active.
- Retrieve project memory and handoff context.
- Resume deliberately without duplicating completed work.

**Scenario D — Non-OpenCode portability**
- Use the same core Playbook in another harness.
- Verify that role and skill methodology remains understandable.
- Document runtime coordination/enforcement features that are unavailable in that harness.

### 11.6 Test reporting rules

Every test report must state:
- Date and environment/version where relevant.
- Exact command or manual procedure.
- Pass/fail/blocked/skipped result.
- Relevant output or concise failure summary.
- Whether the test was unit, integration, compatibility or end-to-end.

A compile/build success must not be reported as evidence that the product workflow works end-to-end.

---

## 12. Security, safety and operational constraints

### 12.1 Project isolation

- Resolve `.vstack/` relative to the correct project root.
- Do not accidentally read or write another repository's memory or history.
- Verify behaviour when a project is opened from a worktree.
- Keep project IDs and root identity checks consistent.

### 12.2 File and process safety

- Validate paths and keep mutations inside the intended project data root unless a specific OpenCode agent-install operation targets the documented config directory.
- Avoid path traversal through user- or agent-provided IDs.
- Bound all process timeouts and output capture.
- Avoid unsafe shell interpolation.
- Require explicit authorization for destructive or external-side-effect operations where the supported permission model allows it.
- Do not silently retry uncertain destructive actions.

### 12.3 Memory and history hygiene

- Do not persist secrets, credentials, tokens or raw private conversation content by default.
- Avoid storing unbounded command output.
- Keep only useful project-level knowledge in memory.
- Record provenance for important memory claims where practical.
- Preserve history but allow bounded display/pagination.

### 12.4 Approval truthfulness

Clearly distinguish:
- Approval requested.
- Approval recorded.
- OpenCode permission granted.
- Operation actually executed.

These are not interchangeable. The UI and agent tools must not show an operation as authorized or completed based only on an event record.

### 12.5 OpenChamber trust boundary

- Read published projection files only.
- Do not call file write operations.
- Do not dispatch sessions or execute commands.
- Validate every projection before rendering.
- Treat all strings in project records as untrusted display content; escape appropriately.

---

## 13. Scope control and feature prioritisation

Use three priorities.

### P0 — Required for the prototype

- Portable Playbook with three roles, core skills and key workflows.
- Cross-harness usability validation.
- OpenCode skill and role integration.
- Persistent project memory.
- Delivery/task state and dependency handling.
- Basic agent session dispatch/tracking.
- Activity history.
- Real check evidence for supported checks.
- Small set of completion/approval rules.
- OpenChamber read-only dashboard and detail views.
- Developer project knowledge base maintained throughout.
- End-to-end feature-delivery validation.

### P1 — Useful after P0 is stable

- Swarm and best-of-N skills.
- Multi-reviewer jury procedure.
- PR/CI monitoring skills.
- Memory search improvements.
- Richer history filters and reports.
- More workflow recipes and review lenses.
- Optional worktree integration after concrete testing.
- Better migration tooling if actual schema evolution requires it.

### P2 — Explicitly out of prototype scope

- Generic workflow engine.
- Distributed scheduling and queues.
- Multi-host state coordination.
- Built-in deployment/rollback platform.
- Elaborate autonomous policy framework.
- Full event sourcing/replay/compaction architecture.
- Advanced worktree lifecycle manager.
- Large permanent specialist-agent team.
- OpenChamber mutation, agent control or approval interface.
- Full parity of enforcement across every harness.

A feature should move from P1/P2 only when a concrete user scenario demonstrates the need and the added complexity is justified.

---

## 14. Risks and mitigations

| Risk | Severity | Mitigation / validation |
|---|---|---|
| Playbook skill distribution does not support the chosen nested package layout | High | Validate Skills CLI installation before finalising directory structure; avoid duplicate skill trees |
| Canonical role instructions drift from harness-specific agents | High | One canonical source, thin adapters, provenance/hash and safe update detection |
| Old workflow abstractions are retained unnecessarily | High | Use this scope baseline; require a concrete end-to-end justification for each retained subsystem |
| Plugin begins duplicating skill reasoning | High | Enforce responsibility table; keep plugin code focused on state, execution, evidence and rules |
| Existing persistence assumptions fail under concurrent agent sessions | High | Test cross-process locks, revision conflicts, atomic writes and event append behaviour |
| Current and worktree roots diverge unexpectedly | High | Explicit worktree/root tests before enabling worktree-based parallelism |
| Session API differs from installed OpenCode version | High | Pin/record supported version and verify actual session APIs in integration tests |
| Agent provisioning overwrites user customisation | High | Idempotent installer, provenance and divergence detection; never silently overwrite |
| Permission checks can be bypassed through another tool | High | Test direct shell and alternate execution paths; document enforcement limits honestly |
| Memory becomes a noisy transcript dump | Medium | Curated categories, explicit update procedure, provenance and periodic review |
| History grows without bounds | Medium | Bound UI queries and output; defer compaction until real usage demonstrates need |
| OpenChamber displays stale or partial information as current | High | Atomic projections, revision/timestamp, schema validation and stale indicators |
| Schema refactor damages existing `.vstack/` data | High | Fixtures, explicit migration, preserve old data and validate migrated records |
| Too many skills delay the usable release | Medium | Ship core skill catalogue first; defer optional skills to P1 |
| Too much plugin tool surface confuses agents | Medium | Start with approximately seven cohesive tools; split only when usability evidence requires it |
| Build/test success is mistaken for workflow completion | Medium | Require integration and end-to-end scenarios with recorded evidence |
| Developer knowledge base becomes stale | High | Make updates part of each task's definition of done; review during milestone acceptance |

---

## 15. Definition of done

A code change or implementation task is not complete until all applicable items are satisfied:

1. The change meets its stated acceptance criteria.
2. Relevant tests were executed and results recorded accurately.
3. New or changed persisted data is schema-validated and migration impact considered.
4. Errors and failure modes are handled without hiding uncertainty.
5. The change respects the Playbook/OpenCode/OpenChamber responsibility boundaries.
6. No unnecessary generic abstraction, extra tool or new dependency was introduced.
7. Relevant project knowledge-base documents are updated.
8. `CURRENT-STATE.md`, `IMPLEMENTATION-STATUS.md` and `WORK-LOG.md` reflect the actual result for substantial tasks.
9. Known issues and remaining work are documented.
10. The next recommended task is identified.

For Playbook changes, also validate content format, portability and links.  
For OpenCode changes, also validate state persistence, tool behaviour and relevant OpenCode API compatibility.  
For OpenChamber changes, also validate projection-only reads and read-only behaviour.

---

## 16. Expected developer reports

The developer should provide concise, evidence-based updates at meaningful milestones. Each report should include:

- What changed.
- Why it changed.
- Important files/modules affected.
- Reuse/refactor/remove decisions made.
- Tests executed and actual results.
- New limitations or risks.
- Knowledge-base pages updated.
- Remaining work and next recommended task.

At the end of each phase, provide a phase report with:
- Acceptance criteria and whether each passed.
- Test evidence.
- Deferred items and rationale.
- Updated architecture or data contracts.
- Open questions requiring product-owner input.

Do not ask the product owner to make decisions already established by the PRD or this plan. When an implementation detail is genuinely ambiguous, make the smallest reversible choice, document it, and ask only when the decision materially affects product behaviour, data compatibility, user safety or future package boundaries.

---

## 17. Initial decisions and open questions

The following are the current defaults. Confirm them during Phase 0/1 and record any evidence-based change as an ADR.

| Topic | Default decision | When to revisit |
|---|---|---|
| Repository structure | Keep existing OpenCode/OpenChamber paths; add Playbook package | Only if packaging tooling requires a different layout |
| Skills install layout | Validate Skills CLI first; do not assume nested discovery | Before first Playbook release |
| Agent count | Three: Lead, Builder, Reviewer | Only if a distinct permission/context boundary requires another permanent role |
| Workflow representation | Portable Markdown recipes | Do not introduce executable workflow graphs for prototype |
| Plugin size | Small direct runtime with approximately seven cohesive tools | If real agent usage shows the interface is insufficient |
| Persistence | Existing project-local file store | Revisit only for demonstrated correctness/performance constraints |
| History | Existing append-only event log | Revisit compaction only when growth becomes a real issue |
| Memory | Curated project knowledge, separate from runtime state and history | Refine categories after actual project usage |
| Task scheduling | Lead-driven; plugin calculates readiness only | Revisit if repeated coordination problems justify automation |
| Parallel execution | OpenCode native sessions; no custom scheduler | Revisit worktrees after verified use case |
| Enforcement | A few explicit completion/protected-action rules | Expand only when bypass boundary is demonstrably enforceable |
| OpenChamber | Read-only projection consumer | Any mutation requires a separate product decision |
| Release/deployment engine | Out of prototype scope; use playbook and native tools | Only after core feature-delivery workflow is stable |

---

## 18. Final implementation direction

The previous vstack implementation should be treated as a valuable source of reusable runtime infrastructure, not as an architecture that must be preserved in full.

Preserve the strongest existing components:
- File persistence, locking and atomic writes.
- Schema validation and stable identifiers where useful.
- Task graph and dependency logic.
- Agent installation and native session dispatch.
- Evidence storage and verified process execution, subject to tests.
- Append-only activity history.
- Useful OpenChamber UI components.

Simplify or remove the old abstractions that are not necessary for the prototype:
- Generic lifecycle engine and executable phase profiles.
- Separate coordinator and scheduler layers.
- Complex phase re-entry and retry machinery.
- Overly granular model-facing tools.
- Specialised quality engines where one generic check/evidence path is enough.
- Complex review jury orchestration.
- Release/deployment/rollback services.
- Elaborate policy and autonomy frameworks.

Build the new value primarily in the Playbook: well-written portable roles, skills, workflow recipes and bounded engineering loops. Then use the existing OpenCode foundation to add persistent memory, delivery/task records, agent coordination, history, evidence and a small number of meaningful enforcement rules. Finally, adapt OpenChamber to visualise published state without taking ownership of it.

**The governing constraint throughout implementation is simple: build the smallest system that makes the portable playbook materially more reliable and observable. Do not build a larger runtime merely because the old implementation contains abstractions for it.**

---

**End of implementation plan**
