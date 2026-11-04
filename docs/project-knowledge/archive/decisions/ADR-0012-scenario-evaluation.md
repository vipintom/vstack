# ADR-0012: Scenario Evaluation Execution — Deterministic vs Qualitative

**Date:** 2026-11-01
**Status:** Decided
**Deciders:** Implementation team

## Context

The v2 PRD requires 12 minimum behavioural evaluation scenarios. Must separate reproducible deterministic checks from qualitative assessment and record model/harness versions.

## Decision

**Two-tier evaluation approach:**

### Tier 1: Deterministic Assertions (Automated)
- File modifications: exact paths created/modified/deleted
- Tool invocations: specific tools called with expected args
- Status transitions: delivery/task/agent states
- Evidence records: provenance, outcome, required fields present
- Projections: schema valid, required fields populated
- No mutation by OpenChamber (negative test)
- Read-only enforcement (negative test)
- Exit codes and output bounds

### Tier 2: Qualitative Assessment (Human/LLM Reviewed)
- Workflow proportionality (Quick vs Standard vs Advanced)
- Discovery depth adequacy
- Plan challenge effectiveness
- Review finding quality
- Lesson promotion appropriateness
- UX/proportionality judgements

**Execution:**
- Fixture repository per scenario (deterministic)
- Runner executes scenario with specific model/harness
- Records: model, harness, version, date, prompt, fixture version
- Tier 1: PASS/FAIL with evidence
- Tier 2: Rubric scores + evaluator notes
- Results stored in `evals/results/<scenario>-<model>-<harness>-<date>.json`

**Rationale:** 
- Deterministic checks provide regression safety
- Qualitative assessment captures nuances automation misses
- Explicit version recording enables cross-model comparison
- No single "quality score" — report by dimension

## Consequences

- `evals/` directory structure with fixtures and rubrics
- Test runner separates Tier 1 (CI gate) from Tier 2 (review)
- CI fails on Tier 1 regressions
- Tier 2 reviewed before release
- No aggregation across models without explicit comparison

## Related

- Phase 3 Behavioural evaluation suite
- `docs/vstack-v2-implementation-plan.md` Section 8.2-8.3
- 12 minimum scenarios from PRD Section 10.3