# vstack — Product Requirements Document

**Document status:** Product definition  
**Version:** 1.0  
**Date:** 31 October 2026

---

## 1. Executive Summary

vstack is an engineering playbook designed to help AI agents and human engineers deliver software more consistently, safely and effectively.

Its core is a **harness-independent playbook**: a portable collection of engineering principles, agent roles, skills, workflows, procedures, feedback loops, review criteria and supporting resources. It should be useful with compatible agent harnesses such as OpenCode, Codex and Claude Code, without requiring a vstack-specific runtime.

When used with OpenCode, an optional vstack plugin adds capabilities that a collection of instructions cannot reliably provide on its own: persistent project memory, delivery and task tracking, agent coordination, activity history, evidence recording and enforcement of selected workflow requirements.

An OpenChamber plugin provides a visual, read-only view of this information. It helps users understand what is happening, what has happened, what is blocked and why.

vstack consists of three complementary products:

1. **vstack Playbook:** Defines how engineering work should be done. It is independently useful and harness-independent.
2. **OpenCode Plugin:** Provides optional runtime capabilities for memory, history, coordination, evidence and enforcement.
3. **OpenChamber Plugin:** Visualizes the work and information managed by the OpenCode plugin.

The defining product principle is separation of responsibility: **the playbook guides the work, the OpenCode plugin manages and enforces selected aspects of execution, and OpenChamber makes the work visible.**

## 2. Problem Statement

AI coding agents are capable of producing code, but reliable software delivery requires more than code generation. Engineering work involves understanding an existing system, clarifying requirements, making design decisions, planning changes, implementing safely, testing, reviewing independently, handling failures, preserving context and delivering changes responsibly.

Without a consistent engineering method, agent-driven work can suffer from:

- Inconsistent planning and execution quality.
- Insufficient repository and dependency investigation before changes.
- Plans that are not challenged before implementation.
- Weak or incomplete verification.
- Repeated debugging attempts without changing approach.
- Reviews that are not sufficiently independent from implementation.
- Poorly scoped parallel work and conflicting changes.
- Loss of decisions and context between sessions.
- Unclear task ownership, delivery status and blockers.
- Claims of successful testing or completion without supporting evidence.
- Limited visibility into agent activity and the reasons behind decisions.

Existing agent harnesses provide useful execution capabilities, but their native features and levels of support vary. A methodology tied to one harness limits adoption and creates duplicated knowledge when users work across different tools.

A portable collection of skills alone can improve agent behaviour, but it cannot reliably maintain shared project state, coordinate sessions, preserve a durable activity record or enforce important requirements.

vstack addresses both needs: a portable engineering methodology that works independently, with an optional runtime that adds persistence, coordination, observability and selected enforcement.

## 3. Product Vision

Make disciplined engineering practices usable by AI agents across different harnesses, while providing an optional coordinated experience for users who work with OpenCode and OpenChamber.

vstack should feel like a reusable engineering system rather than a collection of unrelated prompts. Its procedures should be concrete enough to guide real work, flexible enough to fit different tasks and projects, and understandable without requiring users to adopt a particular agent platform.

The OpenCode plugin should enhance the playbook without becoming a second playbook or a large, general-purpose workflow platform. It should provide only the runtime capabilities that materially improve reliability and coordination.

OpenChamber should make the resulting activity and project knowledge easy to understand without becoming another place where workflow logic or authoritative state is managed.

## 4. Product Principles

### 4.1 Harness independence first

The playbook must be useful without the OpenCode or OpenChamber plugins. Its core principles, skills and workflow guidance must not depend on proprietary tool names, APIs or runtime behaviour.

Harness-specific adaptations may be provided where necessary, but they must preserve the same underlying role responsibilities and engineering procedures.

### 4.2 Procedures over vague instructions

Skills should describe actionable procedures, not merely encourage agents to be careful or thorough. Important procedures should make clear when they apply, what they require, what steps to follow, what outcome is expected and when to stop or escalate.

### 4.3 Flexible workflows, not mandatory ceremony

Workflows should guide agents through common engineering outcomes without forcing every task through the same sequence. A small bug fix should not require the same process as a large architectural change. The applicable level of investigation, planning, parallelism, review and verification should reflect task size and risk.

### 4.4 Loops are first-class practices

Planning, implementation, verification, debugging and review are often iterative. vstack should define reusable feedback loops with bounded retries, clear outcomes and escalation when progress stalls.

### 4.5 Small, purposeful agent team

The default team should remain small. Specialisation should come primarily from skills and task context rather than an ever-growing collection of permanent agents.

### 4.6 Evidence before completion

A claim that work is complete, tested or reviewed should be supported by appropriate evidence. An agent's assertion alone is not equivalent to an executed check or an independent review.

### 4.7 Independent challenge

Important work should be open to review by an agent operating with sufficiently independent context. Review should identify risks and defects, not merely confirm the implementer's conclusions.

### 4.8 Runtime simplicity

The OpenCode plugin is a prototype runtime, not a general-purpose orchestration platform. It should focus on useful persistence, coordination, history and enforcement. It must not duplicate the playbook's reasoning or implement elaborate machinery without a demonstrated need.

### 4.9 Clear source of responsibility

The playbook defines methods and expectations. The OpenCode plugin owns the runtime information and enforcement it provides. OpenChamber presents that information without independently managing it.

## 5. Goals and Non-Goals

### 5.1 Product Goals

1. Provide a coherent, reusable engineering playbook for AI-assisted software development.
2. Make the playbook usable across compatible agent harnesses without requiring vstack runtime components.
3. Provide a small, consistent set of portable agent roles.
4. Provide reusable skills and workflows for the common stages and challenges of software delivery.
5. Improve the quality of planning, implementation, debugging, verification and independent review through concrete procedures and feedback loops.
6. Support sequential and multi-agent work, including partitioned parallel work and independent alternative attempts where appropriate.
7. Preserve useful project knowledge across tasks and sessions when the OpenCode plugin is used.
8. Provide persistent delivery, task, agent and evidence records through the OpenCode plugin.
9. Enforce selected workflow requirements and approval boundaries in the OpenCode environment.
10. Provide a clear visual overview of current and historical work through OpenChamber.

### 5.2 Non-Goals

vstack is not intended to:

- Replace OpenCode, Codex, Claude Code or other agent harnesses.
- Provide its own foundation models, inference service or general-purpose agent runtime.
- Require users to adopt OpenCode in order to use the playbook.
- Become a general-purpose workflow automation platform.
- Reimplement the reasoning and procedures already described by playbook skills inside plugin code.
- Introduce a large permanent team of narrowly specialised agents.
- Guarantee that every action performed by an agent in every harness is enforceable.
- Replace Git, source-control hosting, CI systems, issue trackers or deployment platforms.
- Become a deployment platform or a complete release-management product in the prototype.
- Make OpenChamber an alternative workflow editor, agent controller or approval interface.
- Require every delivery to follow an identical sequence of phases.

## 6. Target Users and Use Cases

### 6.1 Individual software engineers using AI agents

These users want a consistent way to work with coding agents across projects and harnesses. They need repeatable practices for understanding codebases, planning changes, implementing, testing and reviewing work.

### 6.2 Technical leads and software architects

These users need agents to follow project conventions, respect architectural decisions, investigate blast radius, produce reviewable plans and retain important project context.

### 6.3 Engineers coordinating multiple agents

These users need to split work into independent tasks, coordinate agent contributions, avoid conflicting changes, track progress and consolidate results.

### 6.4 Users managing longer-running work

These users need continuity across sessions, a record of decisions and activity, visibility into blockers and a reliable way to resume work.

### 6.5 Users who need stronger delivery controls

These users want important checks, reviews and approvals to be recorded and selected requirements enforced when using the OpenCode plugin.

## 7. Product Components

### 7.1 vstack Playbook

The playbook is the primary product and contains the engineering knowledge and operating methodology.

It consists of the following conceptual areas:

- **Foundation:** Operating principles, engineering standards, guidance for selecting skills and expectations for using the playbook.
- **Agent roles:** Portable definitions of the responsibilities and working practices of the default agent team.
- **Skills:** Reusable procedures for engineering activities and recurring problems.
- **Workflows:** Recipes that combine roles, skills and procedures to achieve common engineering outcomes.
- **Loops and collaboration protocols:** Repeatable feedback processes, handoffs, independent reviews and recovery practices.
- **Resources:** Review rubrics, checklists, templates and reference material.

The playbook must be installable and usable independently of the two plugins in harnesses that support its required portable agent and skill conventions.

#### 7.1.1 Default agent roles

The initial playbook defines three default roles.

**Lead (Whale)**

The Lead is responsible for understanding the user's objective, coordinating the delivery and maintaining continuity. The Lead selects applicable workflows and skills, clarifies requirements, develops or coordinates plans, delegates work, tracks outcomes and communicates completion or blockers.

The Lead should preserve the overall objective and ensure that individual agent contributions fit together. The Lead is not expected to perform every implementation task personally.

**Builder**

The Builder performs engineering work. Depending on the task, this includes repository investigation, design, implementation, debugging, test development, integration and documentation. The Builder uses the relevant playbook skills and is responsible for providing evidence of completed work.

Multiple Builders may contribute when work can be separated safely.

**Reviewer (Goldfish)**

The Reviewer evaluates work independently of the implementation context. It examines requirements, design, code, tests and evidence; identifies defects, risks, omissions and unsupported claims; and communicates actionable findings.

For higher-risk work, the Lead may request multiple independent reviews. A reviewer should not be treated as independent merely because it has a different role label; it needs sufficient separation from the implementation reasoning and context.

These are the default roles, not a restriction on harness-native agents or future specialisations. Domain expertise such as security, performance, accessibility, documentation or user-interface design should normally be supplied through skills and review lenses rather than requiring a permanent agent for each discipline.

#### 7.1.2 Skill families

The playbook should cover the following skill areas. The list describes product scope, not a requirement that every skill be invoked for every task.

| Skill family | Purpose and representative capabilities |
|---|---|
| Foundation and operation | Establish working principles, select relevant skills, communicate progress and follow the playbook consistently. |
| Understanding and discovery | Sharpen requests, explain existing systems, explore repositories, identify unknowns and help a new agent catch up. |
| Architecture and design | Compare approaches, define boundaries, assess dependencies and analyse the impact of proposed changes. |
| Planning | Create actionable plans, define acceptance criteria, identify dependencies and challenge plans before implementation. |
| Implementation | Apply incremental engineering practices, use test-driven development where appropriate and keep changes focused. |
| Debugging and recovery | Diagnose failures, identify root causes, change approach when stuck and avoid unproductive repeated attempts. |
| Parallel work | Partition work safely, coordinate independent contributors and compare alternative solutions when useful. |
| Testing and verification | Select appropriate checks, evaluate results, verify acceptance criteria and distinguish actual evidence from assertions. |
| Review | Conduct independent code and design reviews, classify findings, resolve disagreements and perform deeper reviews when warranted. |
| Delivery and release | Prepare changes for integration, work with pull requests and CI, assess readiness and follow release procedures. |
| Continuity and learning | Preserve context, hand off work, record decisions, capture lessons and turn recurring mistakes into durable improvements. |

Skills should be modular and composable. A user or agent should be able to use one skill without adopting an entire workflow or installing the OpenCode plugin.

Each skill should communicate its applicability, expected inputs, procedure, expected output, relevant checks, stopping conditions and escalation guidance at a level appropriate to the task.

#### 7.1.3 Workflows

Workflows describe how relevant skills, roles and loops come together for a common outcome. They should provide a recommended path while allowing the agent to adapt the depth and sequence to the task.

The initial workflow catalogue should cover:

- Feature delivery.
- Bug fixing.
- Refactoring.
- Research and technical investigation.
- Infrastructure and operational changes.
- Documentation work.
- Technical debt and code-quality improvements.

Workflows should account for task size, uncertainty, risk, dependencies and the need for independent review. They should make it clear when a step can be skipped, when it should be expanded and what justification or evidence is expected.

A workflow is guidance for achieving an outcome, not a rigid state machine.

#### 7.1.4 Core procedures and loops

The playbook should provide reusable procedures for the following recurring activities:

- **Request-sharpening procedure:** Turn an initial request into a sufficiently clear problem statement and expected outcome.
- **Discovery procedure:** Understand the relevant codebase, constraints, dependencies and existing behaviour before proposing changes.
- **Planning loop:** Produce a plan, define checks and acceptance criteria, challenge the plan independently where appropriate, and refine it before execution.
- **Implementation and verification loop:** Make an incremental change, run relevant checks, inspect actual results and correct failures.
- **Debugging and unstick loop:** Diagnose failures systematically, avoid repeating an unsuccessful approach and escalate when progress stalls.
- **Blast-radius analysis:** Examine affected components, callers, dependencies, data contracts, external behaviour and failure paths before risky changes.
- **Parallel-work procedure:** Define independent work boundaries, expected outputs and integration responsibilities for multiple contributors.
- **Best-of-N procedure:** Allow independent alternative attempts for suitable problems, compare them against explicit criteria and retain the strongest result or useful improvements.
- **Independent review loop:** Obtain fresh-context scrutiny, record findings, resolve them and re-review when necessary.
- **Jury review procedure:** Use multiple independent reviewers for work whose risk or uncertainty justifies additional scrutiny.
- **Context handoff and reset:** Preserve the goal, current state, completed work, decisions, open questions and next actions so work can resume reliably.
- **Pull-request and CI procedures:** Prepare changes for integration, monitor external checks and reviews, and establish readiness for human decisions where required.
- **Lessons procedure:** Identify recurring problems and convert useful lessons into improved practices, checks or project guidance.

Loops should have practical stopping conditions and bounded retries. They should not encourage endless review, verification or implementation cycles. When the work cannot progress safely, the agent should explain the blocker and seek an appropriate decision.

#### 7.1.5 Portability requirements

The playbook must:

- Keep its canonical engineering instructions independent of a particular harness.
- Avoid requiring proprietary runtime tools for core procedures.
- Make role and skill content available to compatible harnesses.
- Allow harness-specific adaptations without forking the underlying methodology.
- Degrade gracefully when a harness lacks subagents, parallel execution, worktrees or other advanced capabilities.
- Support sequential execution or fresh-context handoffs where parallel or specialised execution is unavailable.
- Remain useful when the OpenCode plugin and OpenChamber plugin are absent.

### 7.2 OpenCode Plugin

The OpenCode plugin is an optional runtime companion to the playbook. It adds persistence, coordination, visibility data and selected enforcement capabilities that cannot be reliably provided by instructions alone.

The plugin is intentionally limited in scope. It should be a practical prototype runtime, not a comprehensive workflow engine. It must not duplicate the playbook's engineering reasoning or require every skill to have a corresponding plugin subsystem.

Its responsibilities are described below.

#### 7.2.1 Project memory

The plugin provides persistent, project-scoped knowledge that can be retrieved by agents across tasks and sessions.

Memory may include:

- Project purpose and important context.
- Architecture and significant design decisions.
- Project conventions and engineering standards.
- Known limitations, constraints and recurring pitfalls.
- Relevant lessons from previous work.
- Useful summaries and handoff context for ongoing work.

Memory must be distinguishable from transient task state and from the historical record of events. Agents should be able to retrieve relevant knowledge without needing to reconstruct it from every past activity.

Memory should be understandable, reviewable and maintainable. It should not silently turn every conversation or event into permanent project knowledge. Information should be relevant, appropriately summarised and attributable to its source or context where useful.

#### 7.2.2 Delivery and task management

The plugin provides a shared record of ongoing engineering deliveries and their constituent tasks.

Users and agents should be able to:

- Create and inspect a delivery.
- Understand its objective, scope and current status.
- Create, inspect and update tasks.
- Represent task dependencies.
- Identify tasks that are ready to proceed.
- Associate tasks with responsible agents or sessions.
- Track blocked, active and completed work.
- Resume an unfinished delivery with its relevant context intact.

Task management should support useful coordination without requiring an elaborate scheduling system. The Lead remains responsible for deciding how work should be organised, subject to the plugin's supported coordination and enforcement capabilities.

#### 7.2.3 Agent coordination

The plugin provides OpenCode-specific capabilities for coordinating agent sessions.

It should support:

- Dispatching an agent to work on an assigned task.
- Associating an agent session with its delivery and task.
- Tracking basic session activity and outcome.
- Retrieving relevant session and task context.
- Recording handoffs, completion and interruption.
- Coordinating multiple agents where supported by OpenCode.

The plugin should use native harness capabilities where appropriate. It is not intended to introduce an independent agent runtime, a distributed execution platform or a sophisticated custom scheduler.

#### 7.2.4 Activity history

The plugin maintains a durable, chronological history of meaningful vstack activity.

History should capture relevant events such as:

- Delivery creation and status changes.
- Task creation, assignment, updates and completion.
- Agent dispatch, session outcomes and handoffs.
- Workflow progression and blocked states.
- Verification and check executions.
- Review sessions, findings and resolutions.
- Approval decisions.
- Release or deployment activity when such activity is recorded.
- Significant changes to project memory.

History must distinguish recorded events from current state and curated project memory. It should provide enough context for users and agents to understand what happened, when it happened and the outcome. Historical activity must not be presented as proof of success unless the relevant evidence supports that conclusion.

#### 7.2.5 Evidence and quality records

The plugin supports the recording and retrieval of evidence associated with tasks and deliveries.

Relevant evidence includes:

- Commands or checks that were executed.
- Execution outcomes and exit status.
- Test, build or validation summaries.
- Acceptance-check results.
- Review findings and their resolution status.
- Other verification records relevant to the delivery.

The plugin should distinguish executed checks from checks that an agent merely reports as completed. Where the plugin runs or manages a check, its record should accurately reflect the observed result.

The playbook defines how agents investigate failures and improve the work. The plugin records evidence and supports the enforcement of required conditions.

#### 7.2.6 Workflow status and basic enforcement

The plugin provides a lightweight representation of delivery progress and supports selected rules that require deterministic handling.

It should be able to:

- Record the current delivery status and significant workflow progress.
- Prevent supported state transitions when required conditions are not met.
- Check for required evidence before marking applicable work as verified or complete.
- Record blocked states and reasons.
- Require an explicit approval record for designated sensitive transitions.
- Preserve the reason for a transition or exception where appropriate.

The plugin does not need to interpret every playbook skill or implement a general-purpose workflow language. The playbook remains responsible for describing the engineering process. The plugin enforces only the small set of runtime requirements that benefit materially from enforcement.

Enforcement applies only within the capabilities and boundaries supported by the OpenCode environment. The product must not imply universal protection against actions performed outside those boundaries.

#### 7.2.7 Runtime simplicity

The plugin must remain proportionate to the prototype's needs.

It should not grow into:

- A second implementation of the playbook.
- A general-purpose workflow definition and execution platform.
- A sophisticated distributed scheduler or queue.
- A custom model or agent runtime.
- A complete release and deployment platform.
- An elaborate policy engine or complex autonomy framework.
- A requirement that every engineering action be represented as a plugin tool.

Its value comes from providing persistent memory, shared state, agent coordination, history, evidence and selected enforcement with minimal friction.

### 7.3 OpenChamber Plugin

The OpenChamber plugin is the visual interface to vstack activity and project information managed by the OpenCode plugin.

Its primary purpose is to make the state and history of engineering work understandable without requiring users to inspect raw records or ask agents for repeated status summaries.

It is a **read-only visualization layer** for the prototype.

#### 7.3.1 Required views

OpenChamber should provide the following views:

| View | User need |
|---|---|
| Overview | Understand active deliveries, progress, blockers and overall status. |
| Delivery detail | Understand a delivery's objective, current status, tasks, progress and outcome. |
| Task view | See tasks, dependencies, ownership, status and relationships. |
| Agent activity | Understand which agents are working, what they were assigned and their recent outcomes. |
| Workflow activity | See significant progress, blocked states, transitions and current position in a delivery. |
| Memory | Browse relevant project knowledge, decisions, conventions and lessons. |
| History | Inspect the chronological record of deliveries, tasks, agents, checks, reviews and approvals. |
| Quality and evidence | Understand which checks ran, their outcomes, review findings and unresolved issues. |
| Reports | Review concise delivery summaries and outcomes. |

The views should present both current state and relevant historical context. Users should be able to distinguish current facts, previous events, pending work, failed checks and unresolved findings.

#### 7.3.2 Read-only boundary

OpenChamber must not independently:

- Change delivery or task state.
- Dispatch, interrupt or control agents.
- Execute commands or checks.
- Approve workflow transitions.
- Modify project memory or history.
- Initiate releases or deployments.
- Implement workflow or policy logic that belongs to the OpenCode plugin or playbook.

Its responsibility is to present information clearly and accurately. Any future interactive capabilities would require a separate product decision and are outside the current scope.

#### 7.3.3 Freshness and consistency

OpenChamber should reflect changes made by the OpenCode plugin without requiring manual reconstruction of the project state. It should communicate when information is stale, unavailable or incomplete rather than presenting uncertain information as current.

## 8. Core User Journeys

### 8.1 Using vstack without the plugins

1. A user gives an agent an engineering request.
2. The agent applies the vstack foundation principles and selects an appropriate workflow.
3. The Lead role clarifies the objective and coordinates the work.
4. The relevant skills guide discovery, planning, implementation, verification and review.
5. The agent uses native harness capabilities for execution and collaboration.
6. The agent communicates the result, checks performed, remaining risks and any outstanding work.

The user receives the benefits of the playbook without depending on vstack-specific runtime services. Persistent tracking and enforcement are limited to what the selected harness and ordinary project artefacts can provide.

### 8.2 Using vstack with the OpenCode plugin

1. A user gives the Lead an engineering request.
2. The Lead selects the appropriate playbook workflow and clarifies the desired outcome.
3. The plugin creates or updates the delivery record and makes relevant project memory available.
4. The Lead develops a plan and records the tasks needed to deliver the work.
5. The plugin supports task tracking and agent dispatch.
6. Agents use the playbook's skills to perform the work.
7. The plugin records task activity, agent sessions, checks, evidence and review outcomes.
8. The Lead coordinates fixes and additional review as required.
9. The plugin evaluates applicable completion requirements and records the outcome.
10. Relevant knowledge is retained as project memory, and the activity remains available in history.
11. OpenChamber presents the delivery and its history to the user.

### 8.3 Handling a small bug fix

A small, well-understood bug fix should use a lightweight process. The agent investigates the relevant behaviour, creates or identifies a focused regression check, makes the smallest suitable correction, executes relevant verification and reports the result. It should not be forced through an extensive architecture or multi-agent process without a reason.

### 8.4 Handling a substantial feature

A substantial feature may require request sharpening, repository discovery, architecture and blast-radius analysis, an independently challenged plan, multiple tasks, parallel implementation, integration, verification and independent review. The Lead should adapt the workflow to the feature's complexity and risk.

### 8.5 Handling repeated failure

When an implementation or verification attempt repeatedly fails, the agent should not continue repeating the same approach indefinitely. The playbook should guide diagnosis, reassessment of assumptions, a materially different approach or escalation. The plugin should retain relevant attempts and outcomes when available.

### 8.6 Resuming interrupted work

When work is interrupted, the Lead should be able to understand the delivery objective, current task state, completed work, decisions, unresolved questions, agent outcomes and next actions. The OpenCode plugin should make the relevant memory, runtime state and history available. The playbook should guide the agent in validating the current state before continuing.

### 8.7 Independent review

The Reviewer should receive the objective, acceptance criteria, relevant changes and necessary evidence, while retaining sufficient independence from the implementer's reasoning. Findings should be actionable and traceable. The Lead should coordinate resolution and decide whether further review is necessary.

## 9. Functional Requirements

The following requirements define observable product behaviour. They do not prescribe a technical implementation.

### 9.1 Playbook requirements

| ID | Requirement | Priority |
|---|---|---|
| PB-01 | The playbook must be usable without the OpenCode or OpenChamber plugins. | Must |
| PB-02 | Core principles, role instructions, skills and workflow guidance must be harness-independent. | Must |
| PB-03 | The playbook must define the Lead, Builder and Reviewer roles with clear responsibilities. | Must |
| PB-04 | Skills must provide concrete, reusable procedures for their stated purposes. | Must |
| PB-05 | Skills must be independently usable and composable across workflows. | Must |
| PB-06 | The playbook must provide workflow guidance for common software engineering outcomes. | Must |
| PB-07 | Workflows must adapt to task size, uncertainty, risk and available harness capabilities. | Must |
| PB-08 | The playbook must define bounded planning, verification, debugging and review loops. | Must |
| PB-09 | The playbook must support both sequential and parallel approaches where appropriate. | Should |
| PB-10 | Parallel-work guidance must distinguish independent task partitioning from competing alternative attempts. | Should |
| PB-11 | The playbook must define context handoff and resumption expectations. | Must |
| PB-12 | The playbook must promote evidence-based completion and independent review. | Must |
| PB-13 | Harness limitations must have documented fallback behaviours where practical. | Should |
| PB-14 | Role instructions and skill procedures must not depend on one vendor's proprietary runtime features. | Must |

### 9.2 OpenCode plugin requirements

| ID | Requirement | Priority |
|---|---|---|
| OC-01 | The plugin must make the vstack playbook available within OpenCode. | Must |
| OC-02 | The plugin must provide persistent, project-scoped memory. | Must |
| OC-03 | Agents must be able to retrieve relevant project memory across tasks and sessions. | Must |
| OC-04 | The plugin must distinguish project memory, current runtime state and activity history. | Must |
| OC-05 | The plugin must support delivery creation, inspection and status tracking. | Must |
| OC-06 | The plugin must support task creation, updates, dependencies and completion tracking. | Must |
| OC-07 | The plugin must identify tasks whose dependencies permit them to proceed. | Should |
| OC-08 | The plugin must support dispatching and tracking OpenCode agent sessions associated with tasks. | Must |
| OC-09 | The plugin must record meaningful delivery, task, agent and workflow activity in history. | Must |
| OC-10 | The plugin must support recording and retrieval of verification evidence and review findings. | Must |
| OC-11 | The plugin must distinguish observed check results from an agent's unverified assertion. | Must |
| OC-12 | The plugin must support basic checks of required conditions before applicable work is marked verified or complete. | Must |
| OC-13 | The plugin must record blocked states, approval decisions and reasons where applicable. | Must |
| OC-14 | The plugin must support resumption of unfinished work using available memory, runtime state and history. | Must |
| OC-15 | The plugin's functionality must remain focused on persistence, coordination, evidence and selected enforcement. | Must |
| OC-16 | The plugin must not require every playbook skill or procedure to have a corresponding runtime feature. | Must |
| OC-17 | The plugin must communicate the limits of its enforcement capabilities and must not imply universal enforcement. | Must |
| OC-18 | The plugin should record relevant outcomes from supported release or deployment activity without becoming a deployment platform. | Could |

### 9.3 OpenChamber requirements

| ID | Requirement | Priority |
|---|---|---|
| UI-01 | OpenChamber must provide a visual overview of active and recent deliveries. | Must |
| UI-02 | Users must be able to inspect delivery objectives, status, progress and blockers. | Must |
| UI-03 | Users must be able to inspect task relationships, dependencies, ownership and status. | Must |
| UI-04 | Users must be able to inspect agent activity and session outcomes. | Must |
| UI-05 | Users must be able to inspect relevant project memory. | Must |
| UI-06 | Users must be able to browse chronological activity history. | Must |
| UI-07 | Users must be able to inspect quality results, evidence, review findings and approval records. | Must |
| UI-08 | OpenChamber must be read-only for the current product scope. | Must |
| UI-09 | OpenChamber must not independently execute workflow logic or mutate authoritative vstack information. | Must |
| UI-10 | OpenChamber must make stale, unavailable or incomplete information apparent. | Must |
| UI-11 | Users should be able to move from an overview to the relevant delivery, task, agent, event or evidence detail. | Should |

## 10. Quality Attributes and Product Constraints

### 10.1 Usability

- The playbook should be understandable to engineers familiar with AI coding agents.
- Users should not need to understand internal vstack concepts to apply a relevant skill.
- The default workflow should avoid unnecessary ceremony for small tasks.
- The OpenCode plugin should expose a small, coherent set of capabilities rather than overwhelming agents with numerous low-level operations.
- OpenChamber should make current status and important problems easy to find.

### 10.2 Portability

- Core playbook content must remain independent of a specific harness.
- Harness-specific behaviour must be treated as an adaptation, not a separate methodology.
- The absence of a capability such as subagents or parallel execution must not make the playbook unusable.

### 10.3 Reliability and continuity

- The OpenCode plugin should preserve useful project information across sessions and interruptions.
- Users and agents should be able to distinguish current state from historical activity.
- Important activity should not disappear silently from the user-visible history.
- Interrupted work should be resumable with enough context to avoid blindly repeating completed work.

### 10.4 Evidence and trust

- Completion status should be consistent with applicable evidence and review requirements.
- Failed, skipped, unavailable and successful checks must be distinguishable.
- Review findings must remain traceable to the work they concern.
- The product should make uncertainty and limitations visible rather than overstating confidence.

### 10.5 Maintainability and scope control

- The playbook should be modular and avoid duplicated instructions.
- Roles, skills, workflows and runtime responsibilities must remain conceptually distinct.
- The OpenCode plugin should remain intentionally small and avoid unnecessary abstractions or general-purpose orchestration features.
- OpenChamber should remain a presentation layer rather than becoming a second source of workflow logic.

### 10.6 Security and control

- Sensitive or high-impact operations should require appropriate human authorization where supported.
- The product should clearly distinguish a recorded approval from an actual enforced permission boundary.
- Project memory and history should be scoped to the relevant project and should not expose unrelated project information.
- OpenChamber should not offer mutation or execution capabilities in the current scope.

## 11. Completion and Acceptance Criteria

The product is considered to meet its core definition when the following outcomes can be demonstrated.

### 11.1 Playbook acceptance

- An engineer can use vstack's principles, roles, skills and workflows without installing either plugin.
- The same core playbook guidance can be used in more than one compatible harness.
- The three default roles have distinct responsibilities and do not depend on a specific harness for their underlying instructions.
- A small bug fix can follow an appropriately lightweight procedure.
- A substantial feature can use discovery, planning, task decomposition, implementation, verification and independent review guidance.
- Planning, verification, debugging and review procedures have clear stopping or escalation conditions.
- The playbook can guide sequential work when advanced agent capabilities are unavailable.

### 11.2 OpenCode plugin acceptance

- OpenCode can make the playbook available to its agents.
- Project memory remains available across separate work sessions.
- A delivery can be created, inspected, tracked and resumed.
- Tasks and their dependencies can be represented and tracked.
- Agent sessions can be associated with the work they perform.
- Meaningful activity is recorded in history.
- Verification outcomes and review findings can be associated with the relevant delivery or task.
- Applicable completion requirements can be checked before supported transitions are accepted.
- The system distinguishes memory, current state and history.
- The plugin remains useful without requiring a large or elaborate workflow engine.

### 11.3 OpenChamber acceptance

- Users can see active and recent deliveries.
- Users can inspect task relationships, agent activity and workflow progress.
- Users can browse project memory and historical activity.
- Users can inspect verification evidence and review findings.
- The interface accurately reflects the information provided by the OpenCode plugin.
- The interface does not mutate vstack state, dispatch agents or execute actions.

### 11.4 End-to-end product acceptance

A representative feature delivery can be followed from request to completion using the playbook and OpenCode plugin. The process includes an appropriate plan, tracked tasks, agent activity, actual verification evidence, independent review, resolution of relevant findings and a recorded outcome. OpenChamber presents the current delivery state and its meaningful history.

The same playbook remains usable in a compatible non-OpenCode harness, even though the additional runtime coordination and enforcement capabilities are not available there.

## 12. Success Measures

Success should be assessed by whether vstack improves engineering outcomes without introducing disproportionate process overhead.

Relevant measures include:

- **Playbook portability:** The same core skills and role guidance can be used across multiple compatible harnesses without maintaining separate methodologies.
- **Procedure usefulness:** Agents can apply the skills to real engineering tasks and produce the expected outputs.
- **Verification discipline:** Completed work is accompanied by appropriate, distinguishable verification evidence.
- **Review effectiveness:** Independent reviews identify actionable issues that are resolved before completion when required.
- **Continuity:** Agents can resume work with materially less repeated discovery and context reconstruction.
- **Coordination clarity:** Users can understand task ownership, agent activity, blockers and delivery status.
- **History completeness:** Important activity and decisions can be understood after the fact.
- **Visibility:** Users can answer what is happening, what happened and what remains unresolved through OpenChamber.
- **Low overhead:** Small tasks are not burdened with unnecessary agents, phases, tools or approval steps.
- **Runtime simplicity:** The OpenCode plugin delivers meaningful additional value without becoming the dominant source of complexity.

## 13. Assumptions and Constraints

- The playbook is the primary product and must remain useful independently.
- The initial enhanced runtime is provided by the OpenCode plugin.
- The initial visual interface is provided by the OpenChamber plugin.
- The default agent team consists of Lead, Builder and Reviewer roles.
- Agent specialisation is primarily expressed through skills and task context.
- The OpenCode plugin is a prototype and should prioritise only capabilities that materially improve memory, history, coordination, evidence or enforcement.
- OpenChamber is read-only in the current product scope.
- External harnesses may provide different capabilities; vstack should adapt its procedures rather than assume feature parity.
- The product does not claim that plugin-level enforcement is universally effective outside the supported OpenCode environment and its permission boundaries.

## 14. Terminology

| Term | Definition |
|---|---|
| **Playbook** | The portable body of engineering principles, roles, skills, workflows and resources that guides how work is performed. |
| **Harness** | The agent environment in which a model operates, accesses tools and performs work. |
| **Agent role** | A defined set of responsibilities, such as Lead, Builder or Reviewer. |
| **Skill** | A reusable procedure or area of expertise that an agent can apply to a task. |
| **Workflow** | A recommended combination of roles, skills and activities for achieving an engineering outcome. |
| **Loop** | A bounded, repeatable feedback process such as planning, verification or independent review. |
| **Delivery** | A coherent piece of engineering work with an objective and an outcome. |
| **Task** | A manageable unit of work within a delivery, potentially with dependencies and an assigned agent. |
| **Memory** | Curated, reusable project knowledge intended to inform future work. |
| **Runtime state** | The current status of deliveries, tasks, agents and other active work. |
| **History** | The chronological record of meaningful activity and outcomes. |
| **Evidence** | Information supporting a claim that a check, review or other verification activity actually occurred and what it found. |
| **Lead / Whale** | The coordinating agent responsible for delivery continuity and delegation. |
| **Reviewer / Goldfish** | An independent reviewer that examines work with sufficiently fresh context. |

---

**End of document**
