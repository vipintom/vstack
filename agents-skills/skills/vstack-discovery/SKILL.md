---
name: vstack-discovery
description: "Requirement clarification, research, repository exploration, current-state mapping. Use at the start of a delivery to understand what needs to be done and the existing context."
---

# Skill: vstack-discovery

Use this skill when starting a new delivery or when you need to understand existing systems, requirements, or constraints before designing a solution.

## When to Use

- Beginning a new feature, bug fix, or refactor
- Taking over an existing codebase area
- Clarifying ambiguous requirements
- Researching technical constraints
- Mapping current system state

## Procedure

1. **Clarify the Objective**
   - Restate the user's request in your own words
   - Identify explicit and implicit requirements
   - Note constraints (technical, timeline, resources)
   - Flag assumptions that need validation

2. **Explore the Repository**
   - Use file search and code navigation to understand structure
   - Identify relevant modules, services, and integration points
   - Find existing patterns, conventions, and standards
   - Locate tests, documentation, and configuration

3. **Research Technical Context**
   - Review relevant APIs, schemas, and contracts
   - Check dependency versions and compatibility
   - Identify infrastructure and deployment constraints
   - Note any technical debt or known issues

4. **Map Current State**
   - Document the as-is architecture for the affected area
   - Identify data flows, state management, and side effects
   - Note test coverage and quality signals
   - Record findings using vstack tools (if available) or local notes

5. **Identify Unknowns and Risks**
   - List questions that need answers before design
   - Flag technical risks and mitigation options
   - Note dependencies on other teams or systems
   - Estimate effort ranges for discovered work

## Inputs

- User request or delivery objective
- Access to repository and documentation
- Existing workflow state (if vstack plugin available)

## Outputs

- Discovery report with:
  - Clarified requirements
  - Current state map
  - Technical constraints
  - Open questions and risks
  - Recommended next steps

## Safety and Approval

- Discovery is read-heavy; minimal approval needed
- If discovery reveals scope changes, escalate to lead for approval
- Do not modify production code during discovery

## Fallback (No vstack Plugin)

If vstack workflow tools are not available:
- Record findings in local markdown files
- Communicate results to the user/lead verbally
- Proceed to design phase with documented understanding