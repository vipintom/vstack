---
name: vstack-architecture
description: "Architecture analysis, design options, trade-offs, ADRs and technical specifications. Use during design phase to produce implementation-ready technical designs."
---

# Skill: vstack-architecture

Use this skill when you need to create a technical design, evaluate alternatives, document architecture decisions, or produce specifications for implementation.

## When to Use

- After discovery phase, before implementation
- Designing new features or significant changes
- Evaluating architectural alternatives
- Documenting API contracts and data models
- Creating Architecture Decision Records (ADRs)

## Procedure

1. **Define Design Scope**
   - Review discovery findings and requirements
   - Identify system boundaries and integration points
   - Define non-functional requirements (performance, security, scalability)

2. **Develop Design Alternatives**
   - Generate 2-3 viable approaches
   - For each: describe structure, data flow, key components
   - Identify trade-offs: complexity, performance, maintainability, risk
   - Estimate implementation effort for each

3. **Select and Document Chosen Design**
   - Record the decision with rationale
   - Create ADR if the decision is significant and reversible
   - Document API contracts, data models, interfaces
   - Specify error handling, retry, and failure strategies

4. **Identify Implementation Considerations**
   - Break down into implementation tasks
   - Note dependencies and sequencing
   - Define acceptance criteria for each task
   - Flag areas needing special attention (migrations, backwards compatibility)

5. **Review and Validate**
   - Walk through design with stakeholders (if applicable)
   - Verify against constraints and requirements
   - Record design document using vstack tools (if available)

## Inputs

- Discovery report
- Requirements and constraints
- Existing architecture context

## Outputs

- Design document with:
  - Context and problem statement
  - Alternative approaches with trade-offs
  - Chosen design with rationale
  - API contracts, data models, interfaces
  - ADRs for significant decisions
  - Implementation task breakdown
  - Acceptance criteria

## Safety and Approval

- Design documents should be reviewed before implementation
- Architecture changes may require explicit approval (project policy)
- Record design decisions for audit trail

## Fallback (No vstack Plugin)

- Write design documents to `docs/designs/` or project docs
- Record ADRs in project ADR log
- Communicate design to implementation team