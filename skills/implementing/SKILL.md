---
name: implementing
description: "Use after the design is confirmed — writes the task list and implements it task by task with TDD, boundary guards, and review covering both requirement compliance and quality."
---

# Implementing — Task List & Guarded Development

Turn the confirmed `design.md` + `requirements.md` into working code: write the task list, then execute it task by task — TDD discipline, boundary guards, and a two-verdict review on every task.

**Announce at start:** "I'm using the implementing skill to build the change."

**Core principle:** The documents are the only sources of truth. The code follows them; they never follow the code.

<HARD-GATE>
Do NOT start before the design passed Gate 3 (design confirmation). Do NOT change behavior the documents do not define — missing or wrong docs are updated first (see Step 5), then the code.
</HARD-GATE>

---

## Step 1: Read the Sources

1. Read `docs/NN_<name>/requirements.md` and `design.md` fully;
2. Read the code the change touches;
3. Self-check the gates: requirements approved? design confirmed? If not — stop and go back to the right skill.

---

## Step 2: Write the Task List (no user gate)

Create `docs/NN_<name>/tasks.md` using `templates/tasks.md`.

- **A task is one checkable result** — the smallest unit that earns its own test cycle and a review pass;
- Every task carries: **service requirements** (which req entries it implements), **allowed-to-touch files** (boundary whitelist), **acceptance points** (referenced from req), verification means, and a **record field** (the ledger);
- Implementation order follows dependencies; mark what can be parallel.

---

## Step 3: Execute — the Task Loop

For each task, in order:

1. **Assemble the context packet** — references, not pasted text:
   - the task definition + boundary whitelist;
   - the related req entries and design sections (paths to read);
   - **actual signatures from preceding tasks** (verified in code — never the plan's version);
   - acceptance points and verification means.
2. **Dispatch one subagent** with `implementer-brief.md`. Rules for the subagent:
   - **TDD is mandatory**: failing test first → minimal implementation → full suite green;
   - touch only whitelisted files; **no guessing** — unclear interfaces get looked up in code or reported, never invented;
3. **Review with two verdicts** — dispatch a fresh reviewer with `task-reviewer.md`:
   - **Verdict 1 · Requirement compliance**: implements what the req entries say — nothing missing, nothing extra ("more" check: defensive additions are allowed and must flow back to the docs; expansion is rejected);
   - **Verdict 2 · Quality & boundary**: code quality, and the diff against the whitelist — out-of-bound edits are reported, not tolerated;
   - The reviewer is read-only, independent, and never told what to ignore.
4. **Fix loop**: on failure, the same implementer fixes; the same reviewer re-checks only the flagged items; repeat until both verdicts pass;
5. **Update the ledger** in `tasks.md`: completion mark + record (actual changes, deviations). Include the completed tasks' summary in the next dispatch.

## Discipline During Implementation

**Simplicity first.** The least code that solves the stated problem: no features beyond the request, no abstractions for single-use code, no unrequested configuration, no error handling for impossible scenarios. Defensive additions to already-defined behavior stay allowed — report them and flow them back to the documents. The judge is one question: would a senior engineer call this overcomplicated?

**Surgical changes.** Every changed line traces directly to the task's requirements. Match the style of the code you touch. Do not improve adjacent code, comments, or formatting. Remove only the orphans your own change created; pre-existing dead code gets reported, never deleted on the spot.

**Refactor scope.** The TDD cycle's refactor step covers the code you just changed. Touching pre-existing duplication or naming is expansion: record it in the ledger's findings or tell the user — do not fix it under this task.

**Comment discipline.** Comments explain why, not what. One line is the limit — past that, delete the comment or change the code. Multi-step logic gets numbered steps (1. → 1.1 → 1.1.1), matching the document numbering. A behavior change updates its comments in the same edit; a stale comment is a defect. Unrelated comments stay untouched.

Bad — the comment restates the code:

```typescript
/**
 * Processes the user data.
 * Takes the user data as input and processes it according to the
 * business rules defined in the specification...
 */
```

Good — one line each, numbered, all why:

```typescript
function processUser(userData: UserData) {
  // 1. Merge defaults first — local fields win over remote
  // 1.1 Remote ships ISO dates, local ships epoch ms
  const merged = normalize({ ...remote, ...userData });
  // 2. Reject stale sessions (TTL 24h, config/session.yaml:4)
  return merged.filter(isFresh);
}
```

## Step 4: Group Reconciliation & Recovery

- After each task group: reconcile **actual output vs req/des** — catch drift early (new discoveries go to "findings", not into the code);
- **Interruption/compaction**: recover from the `tasks.md` ledger + the documents — both are always current by rule.

## Step 5: Contradiction Handling (Tiered Authorization)

The implementer may never modify `requirements.md` or `design.md`. On a contradiction or gap, they report; the controller (you) decides:

| Situation | Action |
|-----------|--------|
| Affects acceptance criteria / user-visible behavior | **Back to the user** — the requirements gate re-opens; re-confirm first |
| Pure clarification, no acceptance impact | Update the doc directly + record it in the ledger |
| Grey area | Back to the user |

**Document updates come first — then the code.**

---

## Step 6: Handoff

When all tasks are complete: run the full suite, mark the ledger, and announce the summary (tasks done X/Y, tests passing, files changed).

**Next step:** Invoke `verifying`. Do not invoke anything else.

---

## Guardrails

**Never:**

- Start before Gate 3, or skip writing the task list
- Let the implementer work outside the whitelist, or without the context packet
- Accept "close enough" — both review verdicts must pass
- Let a documented deficit pass silently: out-of-scope findings are recorded, not fixed
- Modify requirements/design without going through Step 5
- Leave behavior changes unrecorded in the docs — "doc drift is a bug"
- Refactor or "improve" code the task did not touch
- Add features, abstractions, or configuration the documents do not ask for
- Write comments that restate the code, or let them go stale

---

## Integration

| Skill | Integration point |
|-------|-------------------|
| `designing` | **Required previous step** — provides the confirmed design |
| `verifying` | **Required next step** — acceptance reconciliation |
| `requirements` | Flow back (with the user) when a requirement must change |
| `debugging` | For defect root-causing inside the fix loop |
| `test-driven-development` | The TDD discipline reference |
| `using-git-worktrees` | Optional workspace isolation before starting |
| `implementer-brief.md` / `task-reviewer.md` / `templates/tasks.md` | Dispatch templates and scaffold |
