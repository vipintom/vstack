# Research Record: vstack-why

**Date:** 2026-11-02
**Author:** Phase 3 kickoff
**Reviewer:** 

---

### vstack Purpose and Unique Boundary

- **What it owns:** Design rationale investigation — git history, PR discussions, ADRs, long-form docs, team chat, infrastructure signals, error tracking, product analytics. Answers "why does X work this way?"
- **What it explicitly does NOT own:** Runtime behavior (how), change impact (blast-radius), implementation (tdd), debugging (debug)
- **How it differs from adjacent skills:**
  - `vstack-how` = runtime behavior tracing (complementary)
  - `vstack-blast-radius` = change impact (different question)
  - `vstack-debug` = failure reproduction (different phase)

---

### Cursor pstack Analogue Inspected

- **Skill/Playbook:** why
- **Repository URL:** https://github.com/cursor/plugins/tree/main/pstack/skills/why
- **Commit/Revision:** main branch, commit ba549f92c3a8dc1506b21674e8794eb980019bf3
- **Date Inspected:** 2026-11-02
- **Key Files Read:** SKILL.md

---

### Independent Pack Analogue Inspected

- **Pack:** TStack
- **Skill/Playbook:** Engineering doctrine / ADR analysis
- **Repository URL:** https://tstack.dev/
- **Date Inspected:** 2026-11-02
- **Key Files Read:** Documentation at tstack.dev/docs

---

### Patterns Worth Adopting

**From poteto-mode why:**
- **7 evidence categories:** Source control, Issue tracker, Long-form docs, Real-time chat, Infrastructure observability, Error tracking, Product analytics
- **MCP discovery:** Map available MCPs to evidence categories dynamically
- **Parallel investigators:** One per evidence category, each owning one tool/MCP
- **Synthesizer pattern:** Single synthesizer with epistemics framework
- **Code anchor:** Git blame, log, PR numbers before spawning
- **Skip with justification:** Only skip category if no MCP OR provably irrelevant
- **Confidence framework:** epistemics.md for confidence separation
- **Output format:** Question, Code, What We Found, Inferences, Competing Hypotheses, Unknowns, Sources, Confidence
- **Preserve/Change/Avoid/Risk** for downstream planning

---

### Patterns to Adapt for vstack

| poteto-pattern | vstack Adaptation |
|---|---|
| MCP servers for evidence | Abstract: "evidence source" — harness provides available tools |
| 7 fixed categories | Keep categories, make MCP mapping configurable |
| readonly: false for investigators | Keep — investigators need tools, not writes |
| gh pr view for PR bodies | Abstract: "PR/ticket access" — harness provides |
| grok-4.7-xhigh-fast for investigators | Capability tier: "fast investigator" |
| claude-opus-5-5-xhigh for synthesizer | Capability tier: "judgment synthesizer" |

---

### Host/Vendor-Specific Mechanics to Reject

- Cursor-specific MCP servers (Linear, Notion, Slack, Datadog, Sentry, Snowflake)
- pstack-models.mdc model configuration
- gh CLI dependency
- Specific model slugs

---

### Overlap Implications for Neighbouring vstack Skills

| Skill | Overlap | Resolution |
|---|---|---|
| vstack-how | Both investigate codebase | how=runtime behavior, why=design rationale |
| vstack-blast-radius | Both trace dependencies | why=historical rationale, blast-radius=current impact |
| vstack-debug | Both read code | debug=failure reproduction, why=design history |
| vstack-explain | Both synthesize | explain=communication, why=evidence synthesis |

---

### vstack Design Decision

**Trigger conditions:**
- "Why does X work this way?" / "Why was Y designed this way?"
- "What's the rationale for Z?"
- "Design decision behind..."
- "Postmortem for..."
- Read-only investigation of design intent

**Non-triggers:**
- "How does X work?" → vstack-how
- "What breaks if I change X?" → vstack-blast-radius
- "Fix the bug" → bug-fixing playbook

**Procedure:**
1. Understand target + question
2. Build code anchor (git blame, log, PR numbers)
3. Discover MCPs → map to 7 evidence categories
4. Spawn parallel investigators (one per category)
5. Synthesize with epistemics framework
6. Present with confidence separation
7. If precursor to change → Preserve/Change/Avoid/Risk constraints

**Output format:** Question, Code in Question, What We Found, Inferences, Competing Hypotheses, What We Don't Know, Sources Consulted, Confidence Summary

**Evaluation cases:**
- All 7 categories investigated
- Source control always spawned
- Null results documented
- Skip justifications explicit
- Confidence language preserved
- Preserve/Change/Avoid/Risk when applicable

---

### Sign-off

- **Author:** Phase 3 kickoff
- **Reviewer:** 
- **Date:** 2026-11-02