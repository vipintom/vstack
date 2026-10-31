---
name: vstack-debugging
description: "Reproduction, root-cause analysis, evidence collection and remediation. Use when investigating bugs, test failures, or unexpected behavior."
---

# Skill: vstack-debugging

Use this skill when you need to diagnose a problem, reproduce a bug, or analyze a failure. It provides a systematic approach to debugging.

## When to Use

- Investigating test failures
- Reproducing reported bugs
- Analyzing production incidents
- Understanding unexpected behavior
- Root-cause analysis

## Procedure

1. **Define the Problem**
   - Clearly state the observed behavior vs expected
   - Gather error messages, logs, stack traces
   - Identify affected components and users
   - Note when the problem started

2. **Reproduce the Issue**
   - Create minimal reproduction steps
   - Isolate variables (environment, data, configuration)
   - Document exact steps to reproduce
   - Verify reproduction in controlled environment

3. **Collect Evidence**
   - Capture relevant logs, metrics, traces
   - Record system state at failure time
   - Note recent changes (commits, deployments, config)
   - Use debugging tools (debuggers, profilers, log aggregation)

4. **Analyze Root Cause**
   - Trace from symptom to cause
   - Check: code logic, data flow, external dependencies
   - Consider: race conditions, resource exhaustion, config drift
   - Formulate and test hypotheses

5. **Develop Fix**
   - Create minimal, targeted fix
   - Ensure fix addresses root cause, not just symptom
   - Add regression test
   - Verify fix resolves issue without regressions

6. **Document and Communicate**
   - Record root cause and fix
   - Update relevant documentation
   - Communicate to stakeholders
   - Record in workflow evidence (if vstack available)

## Inputs

- Problem description or failure report
- Access to logs, code, and environment
- Recent change history

## Outputs

- Reproduction steps
- Root cause analysis
- Fix implementation
- Regression test
- Evidence records

## Safety and Approval

- Do not make speculative changes in production
- Production debugging may require approval
- Fixes follow standard implementation and review process

## Fallback (No vstack Plugin)

- Use standard incident response process
- Document in incident tracking system
- Follow team debugging practices