<!-- Task list scaffold.
     Language: write the whole document in the user's language — headings included.
     The English headings below are semantic anchors: translate them; numbering and
     section order stay unchanged. AGENTS.md may declare the document language
     explicitly ("Document language: 中文"), which overrides inference.
     Anchor map (English → 中文):
       Global Constraints → 全局约束 · Tasks → 任务 · Ledger → 账本 · Task → 任务
     Numbering: headings `1. / 1.1 / 1.1.1`; table indexes plain `1. 2. 3.`.
     Tasks in the same wave run in parallel: they must share no dependencies and
     must not overlap in Allowed-to-touch files. Waves run strictly in sequence.
     A task is ONE CHECKABLE RESULT — not a micro-step, not a bundle of unrelated work.
     Three mandatory elements per task: service requirements, boundary whitelist, ledger record. -->

# <change-name> — Tasks

> Based on: `requirements.md` / `design.md`

---

## 1. Global Constraints

<!-- Rules that bind EVERY task: exact commands, environment, off-limits areas,
     naming/copy requirements. Only what tasks need and the documents don't already say. -->

- Test command: `<command>` — a task is done only when the full suite is green
- Off-limits: `<files / areas not to touch>`
- <constraint>

---

## 2. Tasks

### Task 1: <goal — the checkable result>

- Service requirements: req `<4.x>` (acceptance `<4.x.y>`)
- Allowed to touch: `<path/a>`, `<path/b>`
- Depends on: `<Task n / none>`
- Wave: `<1 / 2 / …>`
- Acceptance points: <verifiable points, referenced from req>
- Verification: <test name + assertion points + command — or inspection means for non-code tasks>
- Record (fill after completion):
  - Actual changes: <files / signatures>
  - Deviations & flow-back: <none / details>

### Task 2: <goal — the checkable result>

- Service requirements: req `<4.x>` (acceptance `<4.x.y>`)
- Allowed to touch: `<path/a>`
- Depends on: `<Task n / none>`
- Wave: `<1 / 2 / …>`
- Acceptance points: <verifiable points>
- Verification: <means>
- Record (fill after completion):
  - Actual changes:
  - Deviations & flow-back:

---

## 3. Ledger

| Task | Status | Completed | Output summary |
|------|--------|-----------|----------------|
| 1 | ⬜ | | |
| 2 | ⬜ | | |
