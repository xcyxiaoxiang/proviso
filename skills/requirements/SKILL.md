---
name: requirements
description: "Use when a new change, feature, or bug needs its requirements defined — explores the problem with the user and produces the approved requirements document (req) at `docs/NN_<name>/requirements.md` before any design or code."
---

# Requirements — From Idea to Approved Requirements

Turn an idea, problem, or change request into an approved `requirements.md` — the first of the two sources of truth.

**Announce at start:** "I'm using the requirements skill to define the requirements."

**Core principle:** The written, user-confirmed document is the deliverable — discussion alone produces nothing durable.

<HARD-GATE>
Do NOT write or modify ANY file during discussion (before Gate 1). Do NOT start design work before the document passes Gate 2.
</HARD-GATE>

---

## The Flow

```
Baseline ──▶ Frontier rounds ──▶ GATE 1 ──▶ Write requirements.md ──▶ GATE 2 ──▶ designing
(scan code    (≤3 questions      (user       (template-based)          (user
 + history)    per round)        confirms)                             reviews)
```

---

## Step 1: Baseline

Fixed actions (the "read reality first" rule for existing systems):

1. Read the existing code relevant to the change;
2. Check the related topic directories (`docs/NN_<name>/`) — old requirements/designs are the best source of "why it is the way it is", and same-topic optimizations update those documents directly.

Greenfield (no existing system): skip the topic-directory step.

---

## Step 2: Discussion — Frontier Rounds

Build a **requirements decision tree**: every decision branches into the decisions that depend on it. The **frontier** is the set of decisions whose prerequisites are already settled — the questions you can ask NOW without guessing.

1. **At most 3 questions per round.** Number each question and attach your recommended answer:

```
Q1 — <question title>: <question body>
→ <your recommended answer>

Q2 — <question title>: <question body>
→ <your recommended answer>
```

   Word each question so answering "yes" accepts the recommendation.

2. **Facts are yours; decisions are the user's.** Look up everything you can (code, past documents, an explore subagent) — never ask the user what you can find yourself. Decisions get put to the user, one frontier at a time.

3. **Use diagrams** (ASCII / mermaid) when they clarify more than prose — flows, states, comparisons.

4. **Each round reshapes the tree.** Recompute the frontier; when it holds more than 3 questions, ask the most foundational first. Done when the **frontier is empty** — every branch visited, nothing silently assumed.

When decisions crystallize during discussion, offer to capture them — they land in the requirements document (Step 4), not in chat-only.

---

## Step 3: Gate 1 — Requirements Confirmed

Present a synthesis to the user (diagram + key points: goals, scope, requirement list, acceptance draft, non-goals). Revise per feedback.

Gate 1 passes only when the **user confirms the requirements** — and only then may you write files.

---

## Step 4: Write `requirements.md`

Use `templates/requirements.md` as the scaffold. Key rules:

- Requirements as **user stories** (As a… I want… so that…);
- **Acceptance criteria per requirement**, numbered `4.x.y` — these are the verifiable proof of delivery and the basis of verification;
- Support "**current behavior → target behavior**" for existing systems;
- Diagrams where helpful (mermaid / ASCII); tables use plain `1. 2. 3.` numbering;
- Content language follows the user/project; the section framework follows the template;
- Keep the **Change Log** (end of the document) current — every update appends a line (date / what / why).

---

## Step 5: Gate 2 — Review

Ask the user to review the written document. Feedback → revise → re-review. The document is approved only when the user says so.

---

## Step 6: Handoff

Announce: "Requirements approved at `docs/NN_<name>/requirements.md`. Next: the designing skill."

Invoke `designing`. Do not invoke anything else.

---

## Minimal Mode — Bug Fixes

A bug fix is a change with a minimal requirements document:

- **Current behavior** — what happens now;
- **Expected behavior** — what should happen;
- **Must not change** — the invariants (which become the regression tests).

Same gates apply; the document is just short.

---

## Guardrails

**Never:**

- Touch any file during discussion — "just trying it out" counts
- Skip the baseline scan
- Ask the user what you can look up yourself
- Write `requirements.md` before Gate 1, or start design before Gate 2
- Treat "the user confirmed the idea in chat" as "the user confirmed the document" — both gates matter
- Silently invent requirements that were never discussed — unresolved points go to "Open Questions" in the document

---

## Integration

| Skill | Integration point |
|-------|-------------------|
| `designing` | **Required next step** — produces the design document from this one |
| `using-proviso` | Bootstrap — loaded before this skill |
| `implementing` / `verifying` | Flow back **here** (with the user) when a requirement needs changing mid-development — impact on acceptance criteria requires user re-confirmation |
