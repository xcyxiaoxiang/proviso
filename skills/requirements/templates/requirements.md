<!-- Requirements document scaffold.
     Language: write the whole document in the user's language — headings included.
     The English headings below are semantic anchors: translate them; numbering and
     section order stay unchanged. AGENTS.md may declare the document language
     explicitly ("Document language: 中文"), which overrides inference.
     Anchor map (English → 中文):
       Background & Problem → 背景与问题 · Current State → 现状 · Problems / Motivation → 核心问题
       Target State → 目标状态 · Goals → 目标 · Overall Goal → 总体目标 · Breakdown → 分解
       Success Criteria → 成功标准 · Scope & Non-Goals → 范围与非目标 · Scope → 范围
       Non-Goals → 非目标 · Functional Requirements → 功能需求 · Overall Acceptance → 总体验收
       Open Questions → 开放问题 · Change Log → 变更记录
     Numbering: headings `1. / 1.1 / 1.1.1`; table indexes plain `1. 2. 3.`.
     Diagrams (mermaid / ASCII) welcome wherever they clarify more than prose. -->

# <change-name> — Requirements

> Change: `<name>` · Date: YYYY-MM-DD · Status: Draft / Approved
> Source-of-truth notice: This file is one of the two sources of truth (with `design.md`). Any behavior change updates this document before the code.

---

## 1. Background & Problem

### 1.1 Current State

<!-- Existing systems: how it works today, relevant modules, constraints.
     Greenfield: what exists around the problem, if anything. -->

### 1.2 Problems / Motivation

1. <problem>

### 1.3 Target State

<!-- One paragraph: where we want to be. -->

---

## 2. Goals

### 2.1 Overall Goal

<one sentence>

### 2.2 Breakdown

1. <goal>

### 2.3 Success Criteria

| # | Criterion | How it is judged |
|---|-----------|------------------|
| 1 | <criterion> | <judged how> |

---

## 3. Scope & Non-Goals

### 3.1 Scope

1. <in scope>

### 3.2 Non-Goals

1. <explicitly out — with destination if deferred>

---

## 4. Functional Requirements

<!-- One sub-section per requirement.
     Rule: user story first, details second, acceptance criteria last.
     Acceptance numbering: `4.<section>.<n>` — these are the verification targets. -->

### 4.1 <Requirement name>

> As a <role>, I want <capability>, so that <benefit>.

1. <detail>
2. <detail>

**Acceptance Criteria**

- 4.1.1 <verifiable statement>
- 4.1.2 <verifiable statement>

### 4.2 <Requirement name>

> As a <role>, I want <capability>, so that <benefit>.

1. <detail>

**Acceptance Criteria**

- 4.2.1 <verifiable statement>

---

## 5. Overall Acceptance

| # | Means | Pass criteria |
|---|-------|---------------|
| 1 | <end-to-end means> | <pass criteria> |

---

## 6. Open Questions

| # | Question | Decide when |
|---|----------|-------------|
| 1 | <question> | <stage> |

---

## 7. Change Log

| # | Date | Change | Reason |
|---|------|--------|--------|
| 1 | YYYY-MM-DD | Initial version | — |
