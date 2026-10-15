# OpenCode Tool Mapping

Proviso skills speak in actions ("dispatch a subagent", "read the code", "track the plan"). On OpenCode these resolve to the tools below.

## OpenCode 2 (current)

| Action skills request | OpenCode 2 equivalent |
|-----------------------|----------------------|
| Track tasks / todos | **No todo tool** — track the plan in a markdown file (e.g. the change's `tasks.md`) |
| Dispatch a subagent | `subagent` with an `agent` name configured by the project (pass `description` + `prompt`; optional `background`; `sessionID` continues a previous subagent) |
| Invoke a skill | OpenCode's native `skill` tool |
| Read files | `read` |
| Create / overwrite files | `write` |
| Targeted edits | `edit` |
| Delete files | `shell` |
| Run shell commands | `shell` (`command`, `workdir`, `timeout`, `background`) |
| Search file content | `grep` |
| Find files by name | `glob` |
| Fetch a URL | `webfetch` |
| Search the web | `websearch` |
| Ask the user a question | `question` |

### Subagents on OpenCode 2

The available `agent` names come from the project's configuration (for example `explore`, `general`, `debugger`) — Proviso does not assume any particular set. When a skill says "dispatch a subagent":

1. Pick the agent whose configured purpose fits the task;
2. Pass `description` and `prompt`; use `background: true` for independent parallel work;
3. For follow-up work in an existing subagent session, pass its `sessionID` instead of starting fresh.

## OpenCode 1 (legacy)

| Action skills request | OpenCode 1 equivalent |
|-----------------------|----------------------|
| Track tasks / todos | `todowrite` |
| Dispatch a subagent | `task` with `subagent_type` |
| Edit files | `apply_patch` |
| Run shell commands | `bash` |

Everything else (`read` / `write` / `grep` / `glob` / `webfetch` / `skill`) keeps the same names as OpenCode 2.
