# Workflow Recipes

vstack provides 18 workflow recipes as Markdown files. These are **not** TypeScript state machines — they're human-readable procedures that any agent (or human) can follow.

## Workflow Modes

Workflows are selected by the Lead based on routing dimensions:

| Mode | Use For |
|---|---|
| **Quick** | Narrow, low-risk, well-understood work (small bug fix, doc update) |
| **Standard** | Typical feature work, multi-file changes, moderate uncertainty |
| **Advanced** | High-risk, architectural, security-sensitive, complex integration |
| **Extended** | Continuity overlay — spans sessions, requires checkpoints |

## Core Must Workflows

### 1. Investigation (`investigation.md`)

**Use for:** Deep codebase investigation, unknown domain exploration

```
1. Define Question
   - What needs to be understood
   - Success criteria for understanding

2. Explore
   - Use vstack-how, vstack-why, vstack-blast-radius
   - Map relevant code paths
   - Document findings in memory

3. Synthesize
   - Create vstack-explain summary
   - Record decision rationale
   - Update project memory
```

**Skills:** `vstack-how`, `vstack-why`, `vstack-blast-radius`, `vstack-explain`, `vstack-recall`

---

### 2. Architecture Change (`architecture-change.md`)

**Use for:** Architectural decisions, system design changes

```
1. Assess Scope
   - vstack-blast-radius for impact
   - Identify affected components

2. Alternatives
   - vstack-arena for comparison
   - Document tradeoffs

3. Decision
   - vstack-ledger for decision record
   - vstack-blueprint for specification

4. Execute
   - Incremental with vstack-incremental-build
   - Verify at each step
```

**Skills:** `vstack-architect`, `vstack-blueprint`, `vstack-arena`, `vstack-blast-radius`, `vstack-ledger`, `vstack-incremental-build`

---

### 3. Infrastructure Change (`infrastructure-change.md`)

**Use for:** CI/CD, deployment, environment changes

```
1. Current State
   - Document existing infrastructure
   - Identify constraints

2. Design
   - vstack-blueprint for spec
   - vstack-blast-radius for impact

3. Implement
   - vstack-incremental-build
   - Test in staging

4. Validate
   - Smoke tests
   - Rollback plan
```

**Skills:** `vstack-architect`, `vstack-blueprint`, `vstack-blast-radius`, `vstack-incremental-build`

---

### 4. Documentation (`documentation.md`)

**Use for:** Living documentation updates

```
1. Audit
   - Find stale/missing docs
   - vstack-recall for context

2. Write
   - vstack-unslop for clean prose
   - Follow templates

3. Verify
   - Links work
   - Examples run
```

**Skills:** `vstack-how`, `vstack-unslop`, `vstack-recall`

---

### 5. Skill Maintenance (`skill-maintenance.md`)

**Use for:** Updating/validating playbook skills

```
1. Validate
   - node scripts/validate-content.js
   - Check frontmatter, references

2. Update
   - Refresh examples
   - Fix broken links

3. Evaluate
   - vstack-skill-evaluation
   - Run evaluation suite
```

**Skills:** `vstack-skill-authoring`, `vstack-skill-evaluation`, `vstack-verify-loop`

---

## Should/Could Workflows

### 6. Feature Delivery (`feature-delivery.md`)

**Use for:** Full features with multiple tasks, agents, and review

```
Phase 1: Plan (Lead)
├── Define delivery objective
├── Create acceptance criteria
├── Break into tasks with dependencies
└── Assign priorities

Phase 2: Execute (Builder)
├── Dispatch builder for each ready task
├── Run checks, record evidence
├── Complete tasks in dependency order
└── Parallel tasks where possible

Phase 3: Review (Reviewer)
├── Dispatch reviewer
├── Validate against acceptance criteria
├── Record findings with severity
└── Approve or request rework

Phase 4: Complete (Lead)
├── Verify all tasks complete
├── Run enforcement checks
├── Update memory
└── Close delivery
```

**Skills:** All 55 skills across phases

---

### 7. Bug Fixing (`bug-fixing.md`)

**Use for:** Standalone bug fixes with evidence

```
1. Reproduce
   - Write failing test
   - Confirm root cause with vstack-debug

2. Fix
   - Minimal change (vstack-unslop)
   - Idempotent

3. Verify
   - Test passes
   - No regressions (vstack-verify-loop)
   - Evidence recorded

4. Document
   - Update memory (vstack-lessons)
   - Record lesson
```

**Skills:** `vstack-debug`, `vstack-tdd`, `vstack-verify-loop`, `vstack-lessons`, `vstack-unslop`

---

### 8. Refactoring (`refactoring.md`)

**Use for:** Safe refactoring with verification

```
1. Characterize
   - vstack-how for current behavior
   - Identify invariants

2. Plan
   - vstack-blast-radius for impact
   - Small steps with tests

3. Execute
   - vstack-refactor patterns
   - vstack-verify-loop at each step

4. Validate
   - Full test suite
   - No behavior change
```

**Skills:** `vstack-refactor`, `vstack-verify-loop`, `vstack-blast-radius`, `vstack-how`

---

### 9. Performance Investigation (`performance-investigation.md`)

**Use for:** Performance analysis and optimization

```
1. Baseline
   - vstack-runtime-forensics for metrics
   - Identify bottlenecks

2. Hypothesize
   - vstack-blast-radius for changes
   - vstack-prototype for experiments

3. Optimize
   - Incremental changes
   - Measure each step

4. Verify
   - Regression tests
   - Production validation
```

**Skills:** `vstack-runtime-forensics`, `vstack-trace-forensics`, `vstack-blast-radius`, `vstack-prototype`, `vstack-performance`

---

### 10. Prototype (`prototype.md`)

**Use for:** Rapid prototyping with validation

```
1. Define Goal
   - Clear success criteria
   - Time box

2. Build
   - Minimal viable
   - vstack-prototype patterns

3. Evaluate
   - vstack-arena for comparison
   - vstack-best-of-n if multiple

4. Decide
   - vstack-ledger for decision
   - Discard or promote
```

**Skills:** `vstack-prototype`, `vstack-arena`, `vstack-best-of-n`, `vstack-ledger`

---

### 11. Multi-Phase Delivery (`multi-phase-delivery.md`)

**Use for:** Large features spanning multiple deliveries

```
1. Decompose
   - Phase boundaries
   - Dependencies between phases

2. Sequence
   - Independent phases parallel
   - Sequential where dependent

3. Execute
   - Each phase as feature-delivery
   - Checkpoint between phases

4. Integrate
   - vstack-handoff between phases
   - Final validation
```

**Skills:** `vstack-handoff`, `vstack-safe-pause`, `vstack-session-pickup`, `vstack-verify-loop`

---

### 12. Autonomous Execution (`autonomous-execution.md`)

**Use for:** High-autonomy delivery with gates

```
1. Configure
   - Set autonomy level
   - Define approval gates

2. Execute
   - Lead orchestrates
   - Builders run in parallel

3. Gate
   - Enforcement checks
   - Human approval where required

4. Complete
   - Evidence chain
   - Memory update
```

**Skills:** `vstack-swarm`, `vstack-verify-loop`, enforcement gates

---

### 13. PR Preparation (`pr-preparation.md`)

**Use for:** PR readiness with evidence

```
1. Local Verification
   - All checks pass
   - Evidence complete

2. Review
   - Self-review with rubrics
   - Address findings

3. Package
   - Description with evidence
   - Test instructions
```

**Skills:** `vstack-pr`, `vstack-verify-loop`, `vstack-review-rubrics`

---

### 14. PR Monitoring (`pr-monitoring.md`)

**Use for:** Tracking PR through CI/review

```
1. Watch
   - CI status
   - Review feedback

2. Respond
   - Address comments
   - Re-verify

3. Merge
   - Final checks
   - Cleanup
```

**Skills:** `vstack-watch-pr`, `vstack-verify-loop`

---

### 15. Worktree Cleanup (`worktree-cleanup.md`)

**Use for:** Managing worktrees

```
1. List
   - Active worktrees
   - Stale detection

2. Clean
   - Merge/abandon
   - Remove stale
```

**Skills:** `vstack-worktree`, `vstack-session-pickup`

---

### 16. Runtime Forensics (`runtime-forensics.md`)

**Use for:** Production runtime investigation

```
1. Observe
   - Metrics, logs, traces
   - vstack-runtime-forensics

2. Hypothesize
   - vstack-blast-radius
   - Form theories

3. Probe
   - Diagnostic commands
   - vstack-debug

4. Resolve
   - Fix root cause
   - Verify
```

**Skills:** `vstack-runtime-forensics`, `vstack-trace-forensics`, `vstack-debug`, `vstack-blast-radius`

---

### 17. Trace Forensics (`trace-forensics.md`)

**Use for:** Distributed trace analysis

```
1. Collect
   - Distributed traces
   - Span analysis

2. Analyze
   - Latency, errors
   - Dependency graph

3. Act
   - Targeted fixes
   - Verify
```

**Skills:** `vstack-trace-forensics`, `vstack-runtime-forensics`

---

### 18. Visual Parity (`visual-parity.md`)

**Use for:** Visual regression testing

```
1. Baseline
   - Capture screenshots
   - Store in memory

2. Compare
   - Automated diff
   - Threshold config

3. Decide
   - Accept/reject
   - Update baseline
```

**Skills:** `vstack-visual-parity`, `vstack-verify-loop`

---

## Using Workflows

### In OpenCode (with Plugin)

```bash
# Workflows available as slash commands
/vstack workflow investigation
/vstack workflow feature-delivery
/vstack workflow bug-fixing
# ... all 18 workflows
```

### Playbook Only (No Plugin)

Read the Markdown and follow manually:

```bash
cat playbook/workflows/feature-delivery.md
```

### As Agent Instructions

```bash
# Give agent the workflow as context
@skill vstack-blueprint "Follow feature-delivery.md workflow for auth system"
```

### Cross-Harness

```bash
# Use install script to provision
node playbook/scripts/install-playbook.js all /path/to/project
```

## Customizing Workflows

Workflows are Markdown — edit directly:

```bash
# Project-specific workflow
cp playbook/workflows/feature-delivery.md ./docs/workflows/my-feature-delivery.md
# Edit for your process
```

No code changes, no rebuild, no plugin update needed.

## Validation

```bash
# Validate playbook references
node playbook/scripts/validate-content.js
# Checks workflow-to-skill references, triggers, non-triggers, procedures
# Output: 0 errors, 0 warnings
```

## Capability Matrix

See [docs/capability-matrix.md](https://github.com/vstack/playbook/blob/main/docs/capability-matrix.md) for harness compatibility of all 18 workflows.