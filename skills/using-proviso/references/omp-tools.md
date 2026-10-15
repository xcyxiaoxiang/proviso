# omp (oh-my-pi) Tool Mapping

Proviso skills speak in actions ("dispatch a subagent", "read the code", "track the plan"). On omp these resolve to the tools below.

| Action skills request | omp equivalent |
|-----------------------|----------------|
| Invoke a skill | omp's native skill system — this package's `skills/` directory is discovered automatically; `skill://` paths resolve inside any FS-shaped tool |
| Read a file / directory / URL / PDF | `read` (one interface for files, archives, SQLite, PDFs, URLs, and `://` schemes) |
| Create or overwrite files | `write` |
| Targeted edits | `edit` (hashline content-hash anchors) |
| Structural rewrites | `ast_edit` (previews replacements before apply) |
| Run shell commands | `bash` |
| Search file contents | `grep` |
| Find files by name | `glob` |
| Track tasks / todos | `todo` (ordered mutations with phase tracking) |
| Dispatch a subagent | `task` (parallel fan-out, optional workspace isolation) + `wait` to collect background results |
| Ask the user a question | `ask` |
| Search the web | `web_search` |
| GitHub operations | `github` (repo / PR / issues / Actions) |

## Subagents

omp ships `task` as a first-class tool: it fans work out to isolated subagents (optionally in separate worktrees) and returns schema-validated results the parent reads directly. Use `wait` to block on background results, and the Agent Hub (`Alt+A`) to inspect or steer running subagents. Per-subagent model routing follows the session's configured roles (`task`, `smol`, and so on) — no extra configuration is required for Proviso workflows.

## Task lists

omp ships a `todo` tool; use it for the plan/tracking steps Proviso skills describe (it replaces older `TodoWrite` references). Durable project plans still belong in `tasks.md` files under `docs/NN_<name>/`.

## Memory (optional)

When omp's memory tools are enabled (`retain` / `recall` / `reflect` / `learn`), they complement Proviso documents — but `requirements.md` and `design.md` remain the only sources of truth for a change.
