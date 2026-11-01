# Workflow Recipes

vstack provides 3 workflow recipes as Markdown files. These are **not** TypeScript state machines — they're human-readable procedures that any agent (or human) can follow.

## Workflows

### 1. Bug Fix (`bug-fix.md`)

**Use for:** Standalone bug fixes, no plugin required

```
1. Reproduce
   - Write failing test
   - Confirm root cause

2. Fix
   - Minimal change
   - Idempotent

3. Verify
   - Test passes
   - No regressions
   - Evidence recorded

4. Document
   - Update memory
   - Record lesson
```

**Skills used:** `vstack-debugging`, `vstack-testing`, `vstack-verify-loop`, `vstack-lessons`

---

### 2. Feature Delivery (`feature-delivery.md`)

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

**Skills used:** All 15 skills across phases

---

### 3. Context Interruption (`context-interruption.md`)

**Use for:** Resume interrupted work without duplication

```
1. Detect Interruption
   - Check agent run status
   - Identify incomplete tasks
   - Review evidence completeness

2. Assess State
   - Read dashboard index
   - Review memory items
   - Check delivery status

3. Resume
   - Restart from last completed task
   - Re-dispatch agents as needed
   - Continue evidence chain

4. Validate
   - Verify no duplicate execution
   - Confirm evidence continuity
   - Update projections
```

**Skills used:** `vstack-discovery`, `vstack-lessons`, `vstack-verify-loop`

---

## Using Workflows

### In OpenCode (with Plugin)

```bash
# Workflows available as slash commands
/vstack workflow bug-fix
/vstack workflow feature-delivery
/vstack workflow context-interruption
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

## Customizing Workflows

Workflows are Markdown — edit directly:

```bash
# Project-specific workflow
cp playbook/workflows/feature-delivery.md ./docs/workflows/my-feature-delivery.md
# Edit for your process
```

No code changes, no rebuild, no plugin update needed.