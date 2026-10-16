---
name: using-proviso
description: "Use when starting any conversation — establishes how to find and use Proviso skills. Requires skill invocation before ANY response including clarifying questions."
---

# Using Proviso — Skill Discovery & Discipline

How to use all Proviso skills. The core discipline: **check for skills before responding or acting.**

<SUBAGENT-STOP>
If you were dispatched as a subagent to execute a specific task, skip this skill.
</SUBAGENT-STOP>

<EXTREMELY-IMPORTANT>
If there is even a 1% chance a skill applies to what you are doing, you ABSOLUTELY MUST invoke it.

If a skill applies to your task, you do not have a choice. You must use it. You cannot rationalize your way out of this.
</EXTREMELY-IMPORTANT>

## Instruction Priority

1. **User's explicit instructions** (AGENTS.md, direct requests) — highest
2. **Proviso skills** — override default behavior where they conflict
3. **Default system prompt** — lowest

If AGENTS.md says "don't use TDD" and a skill says "always use TDD", follow AGENTS.md. The user is in control.

## The Workflow

```
requirements ──▶ designing ──▶ implementing ──▶ verifying
(discussion +    (design doc)   (task list +     (acceptance
 req document)                   build)           + closure)
```

**Three user gates on the way:** Gate 1 — requirements confirmed; Gate 2 — requirements document reviewed; Gate 3 — design confirmed. A gate not passed means the next step does not start.

## The One Rule Above All

`requirements.md` and `design.md` are the only sources of truth for a change. **Doc drift is a bug**: behavior changes update the documents first — never the other way around.

## Coding Discipline

These rules hold every turn — not only inside the gated workflow.

1. **Think before coding.** Uncertain? Stop and ask; a question is progress, not failure. When a request has two plausible readings, present both instead of picking one silently.
2. **Simplicity first.** Write the least code that solves the stated problem. If a senior engineer would call it overcomplicated, it is.
3. **Surgical changes.** Every changed line traces back to the user's request. Clean up only the orphans your own change created; leave unrelated code, comments, and formatting alone.
4. **Goal-driven execution.** Turn the instruction into a verifiable goal before touching code — "fix the bug" becomes "write the failing test, then make it pass".
5. **Comment discipline.** Comments explain why, never what. One line is the limit — past that, delete it or change the code. Multi-step logic gets numbered steps (1. → 1.1 → 1.1.1).

Trivial tasks need judgment, not ceremony.

## When Multiple Skills Apply

| Situation | Skill |
|-----------|-------|
| A new change / feature / bug needs its requirements defined | `requirements` |
| Requirements approved — need the design | `designing` |
| Design confirmed — need the build | `implementing` |
| Implementation done — reconcile against acceptance | `verifying` |
| Bug, failing test, unexpected behavior | `debugging` |
| Writing tests / TDD questions | `test-driven-development` |
| Isolating work in a worktree | `using-git-worktrees` |

**Entry point:** `using-proviso` (this skill) — the skill-discovery discipline itself.

## Skill Discipline

Invoke relevant or requested skills **before any response or action** — even a 1% chance means check. If a skill turns out not to apply, you don't have to use it.

Announce when you invoke one: "Using [skill-name] to [purpose]." If it has a checklist, track the items as you go.

## Red Flags — You're Rationalizing

| Thought | Reality |
|---------|---------|
| "This is just a simple question" | Questions are tasks. Check for skills. |
| "I need more context first" | Skill check comes BEFORE clarifying questions. |
| "Let me explore the codebase first" | Skills tell you HOW to explore. Check first. |
| "I can check git/files quickly" | Files lack conversation context. Check for skills. |
| "This doesn't need a formal skill" | If a skill exists, use it. |
| "The skill is overkill" | Simple things become complex. Use it. |
| "I remember this skill" | Skills evolve. Read the current version. |
| "I'll just do this one thing first" | Check BEFORE doing anything. |

## Skill Types

- **Rigid** (TDD, debugging, verification): follow exactly — don't adapt away discipline
- **Flexible** (patterns, conventions): adapt the principles to context

Where it matters, the skill itself says which it is.

## Platform Notes

Skills use generic tool names; substitute your platform's equivalents:

| Platform | Reference |
|----------|-----------|
| OpenCode | `references/opencode-tools.md` |
| Claude Code | native tool names — no mapping needed |
| Codex CLI | `references/codex-tools.md` |
| Copilot CLI | `references/copilot-tools.md` |
| Pi | `references/pi-tools.md` |
| omp (oh-my-pi) | `references/omp-tools.md` |
| Other | substitute equivalent tools; see your platform's skill docs |

## Sources

Skills live in `skills/`. For installation, see AGENTS.md → Installation.
