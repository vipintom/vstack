# ADR-0017: Behavioural Evaluation Over Structural Validation

**Date:** 2026-11-02
**Status:** Accepted

## Context

The PRD distinguishes between structural validation (frontmatter, links, manifest) and behavioural quality (whether the method actually works). Structural validation is necessary but not sufficient.

## Decision

**Behavioural evaluation is the primary acceptance criterion; structural validation is a necessary but insufficient gate.**

### Evaluation Dimensions (PRD Section 16.2)

Each stable skill/playbook evaluated against applicable dimensions:
1. **Trigger precision:** Correctly activates on positive cases, stays out on negative cases
2. **Procedure fidelity:** Follows required sequence, does not silently skip material steps
3. **Decision quality:** Makes appropriate choices at branching points, uses relevant principles
4. **Technical outcome:** Produces valid artifact or useful result for the task
5. **Evidence quality:** Grounds claims in actual outputs, correctly reports uncertainty
6. **Failure handling:** Handles missing tools, failed steps, retries, escalation, recovery
7. **Efficiency:** Avoids unnecessary agents, checks, ceremony, repeated discovery, oversized context
8. **Portability:** Works in supported harnesses or uses explicit fallbacks

### Required Evaluation Cases (PRD Section 16.3 - 12 Minimum Scenarios)

1. Small local change routes to lightweight procedure, not large plan
2. Read-only investigation not turned into implementation
3. Defect reproduces before being fixed
4. Feature playbook creates usable task checklist from full ordered steps
5. Non-applicable playbook step remains visible with skip reason
6. Cross-boundary code triggers architecture grounding and contract design
7. Arena uses common criteria, isolated candidates, verifies synthesis
8. Swarm distinguishes partition from race, aggregates missing/failed workers honestly
9. Overlapping writable scopes isolated or serialized
10. Interrogate returns findings/verdict without auto-applying them
11. Repeated similar failures trigger unstick
12. Failed/inconclusive verification not reported as passed
13. Checkpoint revalidated before session pickup
14. Long-running run has decision trail with evidence pointers
15. Skill change improves positive case without harming negative case
16. Host without subagents uses sequential fallback
17. Host without persistent mode/checklist APIs still follows portable procedure

### Evaluation Results

Must include:
- Scenario and skill/playbook version
- Harness and model/version
- Prompt/input fixture
- Expected behaviour and rubric
- Observed output/artifact
- Pass/fail/inconclusive per criterion
- Qualitative notes and regressions
- Known limitations

**Critical safety/evidence failures block release regardless of aggregate score.**

## Rationale

1. PRD Section 16.1: "Evaluation is a product capability. Structural validity is necessary but not sufficient."
2. PRD Section 22.2: "Re-authoring improves the actual instructions and method; cosmetic edits... do not count."
3. Implementation Plan Section 2.7: "A Markdown file existing... is not evidence that the method works. Behavioural acceptance must exercise realistic inputs, positive and negative triggers, failure conditions and the actual output."

## Consequences

- Structural validator (`validate-content.js`) expanded for integrity checks only
- Separate behavioural evaluation suite required (Phase 5)
- Evaluation results reported per criterion, not collapsed to single score
- Regression policy: changes to triggers/steps/outputs/evidence require relevant regression scenarios
- Blinded evaluation where useful (Section 16.4)

## References

- PRD Section 16: Evaluation system for skills and playbooks
- PRD Section 22.2: Release acceptance criteria
- Implementation Plan Section 2.7: Evidence-led delivery
- Implementation Plan Section 9: Content-specific acceptance contracts