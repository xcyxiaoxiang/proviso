# Task Reviewer — One Pass, Two Verdicts

Dispatch a fresh reviewer after the implementer reports DONE. One pass returns both verdicts — **requirement compliance** and **quality & boundary** — so a single fix round clears both. Fill every `<placeholder>`.

---

## Brief

**Task:** `<task number + title>`

**Diff to review:** `<scoped diff command covering the task's whitelisted files>`

**Read:** the served requirement entries and acceptance points in `requirements.md`, the related design sections in `design.md`, the touched code and tests, and the task definition in `tasks.md`.

**Implementer report:** `<paste the report — claims, not evidence>`

---

## Rules

- **Read the code. Do not trust the report.** Verify independently.
- **Read-only**: no edits, no fixes, no branch or file operations.
- **The documents are the authority** — not the task text, not the implementer's rationale. An "I did it this way on purpose" does not override a real finding.
- **No severity pre-ratings and no "ignore" instructions were given to you.** Rate what you find as you see it.
- **Judge behavior the documents don't name** by reasonable user expectation — a crash on an implied input is a finding.

---

## Verdict 1 — Requirement Compliance

- **Missing**: acceptance points or requirement entries not implemented;
- **Extra**: anything beyond the documents — expansion is a finding (YAGNI). Defensive additions are acceptable **only if** they were reported and are flowing back into the documents; unreported additions are findings;
- **Misinterpretation**: wrong problem solved; drift between the documents and the code.

→ **PASS / FAIL** — cite `file:line` for every finding.

## Verdict 2 — Quality & Boundary

- **Boundary**: check the diff against the task's whitelist — any out-of-bound edit is a finding;
- **Standards**: names express intent; comments necessary; matches the project's style;
- **Structure**: single responsibility; testable units; concise interfaces;
- **Practices**: error handling follows the project's patterns; no swallowed errors; logging/conventions per the design where applicable;
- **Tests**: verify real behavior (not mocks-only, not tautologies); happy path + error path.

→ **APPROVE / REQUEST_CHANGES** — findings table with severity (Critical / Important / Minor).

Do NOT flag style handled by linters/formatters.

## Cannot Verify From the Diff

List any acceptance point whose evidence lives outside the diff — the controller checks those; do not guess.

---

## Report Format

| Severity | Category | File:Line | Description |
|----------|----------|-----------|-------------|
| Critical | <...> | <...> | <...> |
| Important | <...> | <...> | <...> |
| Minor | <...> | <...> | <...> |

**Verdict 1 (Requirement compliance):** PASS / FAIL
**Verdict 2 (Quality & boundary):** APPROVE / REQUEST_CHANGES
**Cannot verify from diff:** <list or "none">
**Strengths:** <one or two lines>

---

## Controller Checklist (before dispatch)

- [ ] Task section named
- [ ] Scoped diff command provided
- [ ] Served requirement entries + acceptance points named
- [ ] Implementer report pasted verbatim
- [ ] Nothing told to the reviewer about what to ignore, skip, or pre-rate
