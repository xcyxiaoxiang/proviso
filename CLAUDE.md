# Proviso — Spec-Driven Development Kit for Claude Code

Proviso is a **spec-driven development workflow** built on two sources of truth per change — `requirements.md` and `design.md`. Documents drive development; doc drift is a bug.

## Workflow

```
requirements ──▶ designing ──▶ implementing ──▶ verifying
(discussion +    (design doc)   (task list +     (acceptance
 req document)                   build)           + closure)

Gates: Gate 1 requirements confirmed · Gate 2 requirements reviewed · Gate 3 design confirmed

Fix loop: issue found ──▶ debugging ──▶ re-verify
```

## Getting Started

At session start, load the entry skill:

```
Skill using-proviso
```

This loads the skill discipline rules and shows all available skills. Then follow the workflow above.

### Quick Start for a New Change

1. **`Skill requirements`** — discuss and define the requirements (frontier rounds; ≤3 questions per round), pass Gate 1, write `requirements.md`, pass Gate 2
2. **`Skill designing`** — write `design.md` from the requirements, pass Gate 3
3. **`Skill implementing`** — write the task list, then build task by task (TDD, boundary whitelist, two-verdict review)
4. **`Skill verifying`** — reconcile every acceptance criterion (`file:line` evidence), fix blockers via `Skill debugging`, close out

## Skills Overview

| Skill | Trigger | Output |
|-------|---------|--------|
| `requirements` | A change needs its requirements defined | `docs/NN_<name>/requirements.md` (acceptance criteria included) |
| `designing` | Requirements approved | `docs/NN_<name>/design.md` |
| `implementing` | Design confirmed | `tasks.md` + TDD implementation with boundary guards |
| `verifying` | Implementation done | Acceptance reconciliation + close-out |
| `debugging` | Bug, failing test, unexpected behavior | Root-cause fix (minimal requirements: current / expected / must-not-change) |
| `test-driven-development` | Writing tests | Red-green-refactor cycle |
| `using-git-worktrees` | Optional isolation | Isolated worktree |
| `using-proviso` | Session start | Skill-invocation discipline |

A constant baseline applies every turn — the coding discipline in Core Discipline; the gated workflow only adds ceremony on top of it.

## Core Discipline

- `requirements.md` and `design.md` are the **only sources of truth**;
- **Doc drift is a bug** — behavior changes update the documents first, then the code;
- **Defensive additions** are allowed during development (transparent + flowing back to the docs); **expansion** is forbidden;
- Verification requires **evidence** — no `file:line`, no "met".
- **Coding discipline, every turn**: ask when uncertain · least code that solves the stated problem · every changed line traces to the request · instructions become verifiable goals · comments explain why, one line, numbered steps.

## Project Structure

```
Proviso/
├── skills/              # 8 skills (4 main chain + 3 auxiliary + 1 entry)
├── hooks/               # Session-start hooks
├── scripts/             # Helper scripts
├── docs/
│   ├── changes/         # Active changes (requirements.md + design.md + tasks.md)
│   └── NN_<name>/       # Topic directories (kept in place)
├── .opencode/           # OpenCode plugin config
├── .claude-plugin/      # Claude Code plugin manifest
├── .codex-plugin/       # Codex plugin config
├── .cursor-plugin/      # Cursor plugin config
├── AGENTS.md            # Full project reference
├── CLAUDE.md            # This file
└── LICENSE              # MIT license
```

## Conventions

- **Requirements doc**: `docs/NN_<name>/requirements.md` — acceptance criteria numbered `4.x.y`
- **Design doc**: `docs/NN_<name>/design.md` — fill by situation
- **Task list**: `docs/NN_<name>/tasks.md` — service requirements + boundary whitelist + ledger
- **Topic directories**: `docs/NN_<name>/` — never archived or moved
- **Change Log**: requirements / design documents keep a Change Log at the end
- **Numbering**: headings `1. / 1.1 / 1.1.1`; table indexes plain `1. 2. 3.`
- **TDD**: always write the failing test first
- **Comment language**: follow the codebase's existing dominant comment language; multi-step comments use the document numbering scheme (1. / 1.1 / 1.1.1)

## Tool Mapping for Claude Code

These skills use Claude Code's native tool names. No adaptation needed.
