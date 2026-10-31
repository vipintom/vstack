---
name: vstack-planning
description: "Work breakdown, task decomposition, dependency design, acceptance criteria. Use to create an executable plan from a design document."
---

# Skill: vstack-planning

Use this skill when you have a design document and need to break it down into actionable tasks with clear dependencies, ownership, and acceptance criteria.

## When to Use

- After design phase, before implementation
- Breaking down features, refactors, or migrations
- Creating task graphs for parallel execution
- Defining clear handoffs between roles

## Procedure

1. **Review Design Document**
   - Understand the full scope and acceptance criteria
   - Identify all components, interfaces, and integration points
   - Note non-functional requirements

2. **Decompose into Tasks**
   - Each task should be completable by one agent in one session (ideally)
   - Tasks should have clear boundaries (files, modules, services)
   - Separate: implementation, testing, documentation, migration
   - Avoid tasks that span multiple architectural layers

3. **Define Dependencies**
   - Map task dependencies (must complete before)
   - Identify critical path
   - Flag tasks that can run in parallel
   - Ensure no circular dependencies

4. **Assign Ownership and Skills**
   - Map each task to a role: developer, test-engineer, architect, operator
   - Note required skills for each task
   - Define work scope (files, directories, services)

5. **Write Acceptance Criteria**
   - Each task needs verifiable acceptance criteria
   - Criteria should be testable (automated or manual)
   - Include: functional, non-functional, and quality criteria

6. **Create Plan Record**
   - Use vstack tools to create tasks and dependencies (if available)
   - Or produce structured plan document

## Inputs

- Design document
- Discovery findings
- Team capacity and role availability

## Outputs

- Task list with:
  - Task ID, title, description
  - Role assignment
  - Dependencies (task IDs)
  - Work scope
  - Acceptance criteria
  - Priority and effort estimate
- Dependency graph
- Critical path identification

## Safety and Approval

- Plans should be reviewed before execution begins
- Scope changes after planning require re-planning and approval

## Fallback (No vstack Plugin)

- Write plan to `docs/plans/` or project planning tool
- Use GitHub Issues, Linear, or similar for task tracking
- Communicate plan to team