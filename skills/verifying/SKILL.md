---
name: verifying
description: "Use after implementation completes — reconciles every acceptance criterion in requirements.md against the delivered work, runs global checks, and closes out the change (documents stay in place)."
---

# Verifying — Acceptance Reconciliation & Closure

Reconcile the delivered work against the documents: every acceptance criterion gets evidence, every global check runs, and a passing change is closed out.

**Announce at start:** "I'm using the verifying skill to reconcile the change against its acceptance criteria."

**Core principle:** Agreement requires evidence. A criterion without `file:line` proof is not met; a blocker is never left open.

<HARD-GATE>
Do NOT close out while any blocker is open. Do NOT trust ledgers or reports over the code itself.
</HARD-GATE>

---

## Step 1: Load

1. `docs/NN_<name>/requirements.md` — the acceptance criteria (`4.x.y`) are the checklist;
2. `docs/NN_<name>/design.md` — the confirmed design;
3. `docs/NN_<name>/tasks.md` — the ledger (claims to be verified, not trusted);
4. The code.

**This is the global check.** Per-task reviews already happened during implementation — this step catches what they cannot: cross-task effects, acceptance-level gaps, document drift.

---

## Step 2: Acceptance Reconciliation

For **every** acceptance criterion (`4.x.y`):

- Find the implementation and its test — **read the code**, not the ledger;
- Cite the evidence as `file:line`;
- A criterion that cannot be evidenced → **blocker** (`"not met: <criterion>"`);
- Criteria that are genuinely inapplicable get marked as such, not skipped silently.

---

## Step 3: Global Checks

| Check | What to do |
|-------|------------|
| Boundary audit | Diff the total change against all tasks' whitelists — out-of-bound edits are reported |
| "More" audit | Every defensive addition must have flowed back into the documents — unreported additions are findings |
| Document sync | Code ↔ `requirements.md` / `design.md` point-for-point — including diagrams agreeing with the implementation |
| Residual check (refactor-class changes) | Run the keyword list against the repo (e.g. retired concept names) |

Do NOT check style/formatting — linters own those.

---

## Step 4: Report

```markdown
## Verification Report: <change-name>

### Summary
| Area | Result |
|------|--------|
| Acceptance criteria | M/N met |
| Boundary | clean / N findings |
| Doc sync | clean / N findings |
| Residuals | clean / N findings |

### Blockers (must fix before closure)
- <finding> — evidence `file:line` → <actionable recommendation>

### Warnings
### Suggestions
```

Every finding carries a specific recommendation with `file:line` — never "consider reviewing". When uncertain between levels, prefer the lower one: a false positive must not block closure.

---

## Step 5: Fix Loop

- **Blockers** go through `debugging` (which includes the document flow-back path if the defect is doc drift);
- After fixes: **incremental re-check** — only the fixed items and their affected area;
- A full re-scan is warranted only when fixes were large or touched shared ground;
- Repeat until no blockers remain.

---

## Step 6: Closure

1. All clear → present the result, and **confirm with the user** before closing;
2. **Do not move anything.** The documents stay in place (`docs/NN_<name>/`) and stay live — same-topic optimizations update them directly and append to their Change Logs;
3. Completion summary for the user: tasks done, acceptance result, warnings carried.

```markdown
## Change Complete
**Change:** <name> (docs/NN_<name>/)
**Acceptance:** M/N criteria met · Blockers: 0
**Warnings carried:** <list or "none">
```

---

## Guardrails

**Never:**

- Close out with an open blocker
- Report an acceptance criterion met without `file:line` evidence
- Trust the ledger, task reviews, or reports over the code
- Flag style/formatting — linters own those
- Fix code here — blockers go through `debugging` (TDD + document flow-back included)
- Skip the user confirmation before closing out

---

## Integration

| Skill | Integration point |
|-------|-------------------|
| `implementing` | **Required previous step** — provides the implementation and ledger |
| `debugging` | The fix loop for blockers |
| `requirements` | Flow-back path when reconciliation shows the requirements themselves were wrong |
| `using-proviso` | Bootstrap — loaded before this skill |
