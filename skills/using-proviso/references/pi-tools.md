# Pi Tool Mapping

Proviso skills speak in actions ("dispatch a subagent", "read the code", "track the plan"). On Pi these resolve to the tools below.

| Action skills request | Pi equivalent |
|-----------------------|---------------|
| Invoke a skill | Pi's native skill system — load the relevant `SKILL.md` with `read`, or invoke `/skill:name` explicitly |
| Read a file | `read` |
| Create or edit files | `write` / `edit` |
| Run shell commands | `bash` |
| Search file contents | `grep` |
| Find files by name | `find` |
| List directories | `ls` |

## Subagents

Pi core does not ship a standard subagent tool. The `pi-subagents` package is a strong optional companion and provides a `subagent` tool with single-agent, chain, parallel, async, forked-context, and resume/status workflows. If no subagent tool is available, do not fabricate `Task` calls; execute sequentially in the current session or explain that the optional subagent capability is not installed.

## Task lists

Pi core does not ship a standard task-list tool. If a todo/task extension is installed, use its documented tool. Otherwise use Proviso plan files (`tasks.md`), checklists in Markdown, or a repo-local `TODO.md` for task tracking. Older docs may refer to `TodoWrite`; treat that as the task-tracking action above.
