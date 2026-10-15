---
name: designing
description: "Use after requirements are approved, when the change needs a design document (`design.md`) precise enough for developers and AI to execute from."
---

# Designing — From Requirements to Executable Design

Turn the approved `requirements.md` into `design.md` — the second source of truth: **how** the change will be built, precise enough that a developer or AI can execute it.

**Announce at start:** "I'm using the designing skill to write the design."

**Core principle:** Every "what" is already settled in the requirements document. This skill answers "how" — it does not re-litigate requirements.

<HARD-GATE>
Do NOT write implementation code. Do NOT start implementation work before the design passes Gate 3 (design confirmation).
</HARD-GATE>

---

## Step 1: Read the Requirements

1. Read `docs/NN_<name>/requirements.md` fully — it is the binding constraint;
2. Read the existing code the change touches, so the design fits reality;
3. If something essential is still unclear, run a **small frontier round** (≤3 questions, each with a recommended answer — same rule as the requirements skill) before designing. Do not guess.

---

## Step 2: Design

Cover, as applicable to the project:

| Section | Rule |
|---------|------|
| Overall architecture — components, responsibilities, relationships | Required |
| Business logic — flows, states, rules | Required |
| Data design (tables, models) | Only when the project has persistence — then fill it for real |
| UI design (screens, components, interactions) | Only when the project has UI — then fill it for real |
| Interfaces & artifacts (APIs, contracts, produced deliverables) | Only when the project has them — then fill it for real |
| Key technical decisions (choice / rationale / alternatives) | Required |
| Layering & file organization | Required |
| Implementation order & acceptance mapping | Required |
| Risks & mitigations | Required |

Rules:

- **Fill by situation**: an inapplicable section is omitted entirely; an applicable one MUST carry real content — never prose placeholders;
- Diagrams (mermaid / ASCII) wherever they clarify more than prose — architecture, flows, states, relations;
- **The bar**: a developer reads it and builds; an AI reads it and executes accurately. If an implementer would have to guess, add the missing precision.

---

## Step 3: Write `design.md`

Use `templates/design.md` as the scaffold. Save to `docs/NN_<name>/design.md`. Keep its **Change Log** current on every update.

---

## Step 4: Self-Review

1. **Requirements coverage** — every functional requirement (req `4.x`) has a landing place in the design;
2. **Placeholder scan** — no TBD, TODO, or vague filler;
3. **Diagram–text consistency** — every diagram matches its surrounding text;
4. **Executability** — every mechanism is written so an implementer can act without guessing.

Fix issues inline — no re-review needed.

---

## Step 5: Gate 3 — Design Confirmation

Ask the user to review `design.md`. Feedback → revise → re-review. The design is approved only when the user says so.

---

## Step 6: Handoff

Announce: "Design approved at `docs/NN_<name>/design.md`. Next: the implementing skill."

Invoke `implementing`. Do not invoke anything else.

---

## Guardrails

**Never:**

- Re-open settled requirements by yourself — if the requirements document is wrong or missing something, go back through the `requirements` skill with the user
- Write code during design — "just trying it out" counts
- Skip Gate 3, or start implementation before it passes
- Fill an applicable section with filler; or keep an inapplicable section just because the template lists it
- Leave a mechanism implicit — "developers understand it + AI executes it accurately" is the bar, and both readers matter

---

## Integration

| Skill | Integration point |
|-------|-------------------|
| `requirements` | **Required previous step** — provides the approved `requirements.md` |
| `implementing` | **Required next step** — builds from this design |
| `using-proviso` | Bootstrap — loaded before this skill |
