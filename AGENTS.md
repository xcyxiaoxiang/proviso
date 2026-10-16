# Proviso — AI-Native Spec-Driven Development Kit

Proviso is a **spec-driven development workflow** built on two sources of truth per change — `requirements.md` and `design.md`. Documents drive development: behavior changes update the documents first, and **doc drift is a bug**.

## Workflow

```
requirements ──▶ designing ──▶ implementing ──▶ verifying
(discussion +    (design doc)   (task list +     (acceptance
 req document)                   build)           + closure)

Gates: Gate 1 requirements confirmed · Gate 2 requirements reviewed · Gate 3 design confirmed

Fix loop: issue found ──▶ debugging ──▶ re-verify
```

## Skills

| Skill | When | Input | Output |
|-------|------|-------|--------|
| `requirements` | A new change / feature / bug needs its requirements defined | Problem statement / existing system | `docs/NN_<name>/requirements.md` (acceptance criteria included) |
| `designing` | Requirements approved | `requirements.md` | `docs/NN_<name>/design.md` |
| `implementing` | Design confirmed | `requirements.md` + `design.md` | Task list (`tasks.md`) + TDD implementation with boundary guards |
| `verifying` | Implementation done | Change directory | Acceptance reconciliation report + close-out |
| `debugging` | Bug, failing test, unexpected behavior | Symptom | Root-cause fix + document flow-back |
| `test-driven-development` | Writing any test or implementation | — | Red-green-refactor cycle discipline |
| `using-git-worktrees` | Optional workspace isolation | — | Isolated worktree |

Entry point: `using-proviso` — the skill-invocation discipline.

A constant baseline applies every turn — the coding discipline in Conventions; the gated workflow only adds ceremony on top of it.

## Directory Structure

```
Proviso/
├── skills/              # 8 skills — 4 main chain + 3 auxiliary + 1 entry
│   ├── requirements/    ├── designing/          ├── implementing/
│   ├── verifying/       ├── debugging/          ├── test-driven-development/
│   ├── using-git-worktrees/                     └── using-proviso/
├── hooks/               # Cross-platform session-start hooks
├── scripts/             # Helper scripts
├── docs/
│   └── NN_<name>/       # Topic directories (requirements.md + design.md + tasks.md; kept in place)
├── .opencode/           # OpenCode plugin (V1/V2 dual-compatible)
├── .claude-plugin/      # Claude Code plugin config
├── .codex-plugin/       # Codex plugin config
├── .cursor-plugin/      # Cursor plugin config
├── .pi/                 # Pi extension
├── .omp/                # omp (oh-my-pi) extension
├── AGENTS.md            # Full project reference
├── CLAUDE.md            # Claude Code quick guide
└── LICENSE              # MIT license
```

## Conventions

- **Requirements document**: `docs/NN_<name>/requirements.md` — the first source of truth, with per-requirement acceptance criteria (`4.x.y`)
- **Design document**: `docs/NN_<name>/design.md` — the second source of truth; fill by situation (no persistence → no data-design section; no UI → no UI section)
- **Task list**: `docs/NN_<name>/tasks.md` — service requirements + boundary whitelist + acceptance points + ledger
- **Topic directories**: `docs/NN_<name>/` — one per topic; never archived or moved — same-topic optimizations update the documents in place
- **Change Log**: requirements / design documents keep a Change Log section at the end
- **Numbering**: headings `1. / 1.1 / 1.1.1`; table indexes plain `1. 2. 3.`
- **Diagrams**: prefer mermaid / ASCII wherever they clarify more than prose
- **User stories in requirements**: every requirement opens with "As a … I want … so that …"
- **TDD**: always write the failing test first, then implement, then verify
- **Doc drift is a bug**: behavior changes update `requirements.md` / `design.md` first — then the code
- **Coding discipline, every turn**: think before coding (ask when uncertain; present both readings) · simplicity first (least code; would a senior call it overcomplicated?) · surgical changes (every changed line traces to the request) · goal-driven execution (rewrite the instruction as a verifiable goal) · comment discipline (why not what, one line, numbered steps)
- **Comment language**: follow the codebase's existing dominant comment language; multi-step comments use the document numbering scheme (1. / 1.1 / 1.1.1)

## Installation

### OpenCode (plugin)

Add to your `opencode.json`:

```json
{
  "plugins": ["proviso@git+https://github.com/xcyxiaoxiang/proviso.git"]
}
```

The plugin registers all skills and injects the `using-proviso` bootstrap — no slash commands, no manual copying into a global skill directory. Skills are invoked via the skill tool and description-triggered discovery.

For project-local development, point at the repo path instead:

```json
{
  "plugins": ["./proviso"]
}
```

### Other platforms

- **Claude Code**: see `.claude-plugin/`
- **Codex**: see `.codex-plugin/`
- **Cursor**: see `.cursor-plugin/`
- **Pi**: see `.pi/`
- **omp (oh-my-pi)**: see `.omp/`

---

## Origins

Proviso adapts techniques from:
- **OpenSpec** (artifact workflow, acceptance scenarios, archiving)
- **Superpowers** (subagent-driven development, TDD, root-cause debugging)
- **Kiro** (requirements → design three-stage flow, spec-driven practice)

Proviso is an independent workflow kit. It does not depend on or extend either project.

## Acknowledgements

- **OpenSpec** — [github.com/Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec), MIT License, Copyright (c) 2025 Fission AI
- **Superpowers** — [github.com/obra/superpowers](https://github.com/obra/superpowers), MIT License, Copyright (c) 2025 Jesse Vincent
