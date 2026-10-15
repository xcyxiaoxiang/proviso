# Implementer Brief — Dispatch Template

Dispatch one fresh subagent per task with this brief. The subagent **reads its own context from files** — the controller does not paste document content into the prompt. Fill every `<placeholder>`.

---

## Brief

**Task:** `<task number + title from tasks.md>`

**Read before starting (in this order):**

1. `docs/NN_<name>/tasks.md` — your task section + Global Constraints
2. `docs/NN_<name>/requirements.md` — the requirement entries your task serves
3. `docs/NN_<name>/design.md` — the design sections your task follows
4. The files you will touch (your task's "Allowed to touch" list)
5. `<representative code to mimic, if any>`

**Preceding tasks — actual signatures:** `<one line per completed task with signatures verified in code, e.g. "Task 1: login() at src/auth/login.ts — returns Session | null". Or "None — first task.">`

**Boundary whitelist:** modify only `<files>` — nothing else. Out-of-scope findings: record them in your report; do not fix them.

**TDD (mandatory):**

1. Failing test first, asserting your task's acceptance points → run it, see it fail
2. Minimal implementation → run it, see it pass
3. Full suite green — report every failing test by name, including pre-existing failures

**No guessing:** if an interface, structure, or behavior is unclear — read the code; if still unclear, report NEEDS_CONTEXT. Never invent.

**Work from:** `<directory>`

**If you're in over your head** — the design does not fit reality, architectural questions arise, you believe a requirement or design must change — **STOP** and report BLOCKED or NEEDS_CONTEXT with what you tried. You may never edit the documents; the controller handles that path.

**Self-review before reporting:** everything in the task implemented; tests verify real behavior (not mocks-only); no overbuilding; boundary respected.

**Report back:**

- **Status:** DONE | DONE_WITH_CONCERNS | BLOCKED | NEEDS_CONTEXT
- Files changed · tests run with key output · deviations noticed · concerns

---

## Controller Checklist (before dispatch)

- [ ] Task section named and current
- [ ] Read-list paths all exist
- [ ] Preceding-tasks line updated with **actual** signatures from the code (not the plan's)
- [ ] Boundary whitelist matches the task's field
- [ ] Context packet assembled as references only — no pasted document content
- [ ] Nothing in the brief pre-judges the review (no severity hints, no "ignore" instructions)
