---
name: vstack-review
description: "Review methodology, severity classification, findings and re-review. Use to conduct or participate in code/design reviews."
---

# Skill: vstack-review

Use this skill when conducting independent reviews (Goldfish) or participating in review processes. It defines the review methodology and output format.

## When to Use

- Independent Goldfish review (fresh context)
- Peer code review
- Design review
- Security review
- Post-implementation review

## Procedure

1. **Understand Review Scope**
   - Review the change, design, or artifact
   - Understand acceptance criteria and requirements
   - Identify applicable review lenses

2. **Apply Review Lenses**
   - **Correctness & Regression**: Does it meet requirements? Any regressions?
   - **Architecture & Design**: Aligns with system architecture?
   - **Security**: Vulnerabilities, data exposure, auth issues?
   - **Performance**: Unacceptable latency, resource usage?
   - **Maintainability**: Clear, consistent, follows patterns?
   - **Test Adequacy**: Sufficient coverage? Meaningful assertions?
   - **Documentation**: Docs updated? Migration guides?

3. **Classify Findings**
   - **Critical**: Blocks release, security vulnerability, data loss
   - **High**: Significant bug, major design flaw, missing critical test
   - **Medium**: Bug, design improvement, missing test coverage
   - **Low**: Style, minor improvement, documentation
   - **Informational**: Suggestion, question, future consideration

4. **Write Findings**
   - Each finding: ID, severity, category, title, explanation, location, recommendation
   - Reference file:line where possible
   - Provide evidence or reasoning

5. **Produce Review Report**
   - Summary with counts by severity
   - Detailed findings
   - Overall verdict: pass / concerns / blocking
   - Coverage: what was reviewed, what wasn't

6. **Resolution and Re-review**
   - Findings assigned to developer for remediation
   - Fixes implemented and verified
   - Re-review changed areas only
   - Update finding status

## Inputs

- Change/diff to review
- Design documents
- Acceptance criteria
- Applicable rubrics

## Outputs

- Structured review report
- Findings list with severity
- Verdict and recommendations
- Resolution tracking

## Safety and Approval

- Reviewers are read-only; do not modify code
- Blocking findings prevent phase advancement
- Re-review required for blocking findings

## Fallback (No vstack Plugin)

- Use standard PR review tools
- Document findings in review comments
- Track resolution in issue tracker