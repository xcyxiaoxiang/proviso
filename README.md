<p align="center">
  <img src="./assets/001.png" width="300" alt="Proviso">
</p>

# Proviso — AI-Native Spec-Driven Development Kit

Proviso 是一个**规格驱动开发工作流**：以**需求文档（req）+ 详设文档（des）为唯一事实源**，把变更从讨论带到完成——文档驱动开发，**"文档漂移是 bug"**。

## 工作流

```
requirements ──▶ designing ──▶ implementing ──▶ verifying
(需求讨论 +      (详设文档)      (任务清单 +      (验收对账 +
 req 文档)                       逐任务开发)      完成收尾)

三门：Gate 1 需求确定 · Gate 2 文档审阅 · Gate 3 设计确认

调试回路：发现问题 ──▶ debugging ──▶ 回归验证
```

![工作流](./assets/002.jpg)

## 核心技能（4）

| 技能 | 触发时机 | 核心产出 |
|------|----------|---------|
| `requirements` | 新变更 / 功能 / bug 需要定义需求 | `docs/NN_<name>/requirements.md`（含验收标准，需求即规格） |
| `designing` | 需求获批 | `docs/NN_<name>/design.md`（开发人员能懂、AI 可执行的详设） |
| `implementing` | 设计确认 | 任务清单 + TDD 实现（防偏移全程：需求追溯 / 边界白名单 / 活动账本） |
| `verifying` | 实现完成 | 验收对账报告（逐条 `file:line` 证据）+ 完成收尾 |

## 辅助技能（3 + 入口）

| 技能 | 用途 |
|------|------|
| `debugging` | 根因调查与修复——先根因后修复；bug 修复同样落文档（极简 req：当前 / 期望 / 不变量） |
| `test-driven-development` | TDD 红-绿-重构循环。测试先行，没有失败测试就没有实现代码 |
| `using-git-worktrees` | 可选的工作区隔离，保护主分支不被变更污染 |
| `using-proviso` | 入口技能：技能调用纪律（"哪怕只有 1% 的可能性，也必须检查技能是否适用"） |

## 特色

### 双事实源：req + des

每个变更只有两份权威文档：**需求文档**（要什么、验收标准）与**详设文档**（怎么做、可施工细节）。开发以它们为准——行为变更先改文档、再改代码；完工后文档与代码逐点一致。

### "文档漂移是 bug"

和测试失败同级：任何行为变更都先回流文档；文档始终是"完工时的真实"，不是过时草稿。

### 防偏移机制（7 条）

开发阶段主 agent 与子代理两头都防：

| # | 机制 | 治什么 |
|---|------|--------|
| 1 | 需求可追溯 + 任务级对账（做了该做的 + 没做多的） | 需求偏移、溢出 |
| 2 | 边界白名单 + 越界即报（范围外发现只记录、不顺手改） | 边界偏移 |
| 3 | 事实先于实现 + 上下文包（前序实际签名、禁止脑补） | 上下文偏移 |
| 4 | 无授权不修改（执行者无权改文档；分级授权回流） | 需求偷改 |
| 5 | 活账本 + 快照传递（中断后从账本 + 文档恢复） | 阶段失忆 |
| 6 | 门禁自检（不在门内不推进；讨论阶段不动文件） | 流程越界 |
| 7 | "多做"的度：防御性补充允许（透明 + 回流）；扩张性禁止 | 自由发挥 |

### 三门流程

每个关键节点由你把守：**Gate 1** 需求确定（讨论盖章）→ **Gate 2** 需求文档审阅 → **Gate 3** 设计确认。不过门，下一步不启动。

### 验收对账

验证环节对需求文档的**每一条验收标准**逐条核对，证据引用 `file:line`——没有证据不算通过。

### 存量改造友好

不是从零开始的项目：需求讨论先"读现有代码 + 翻历史主题目录"；req 支持"当前行为 → 目标行为"结构；bug 修复是其极简形态。

## 安装

### OpenCode（插件方式）

在 `opencode.json` 中添加：

```json
{
  "plugins": ["./proviso"]
}
```

或从 git 远程源：

```json
{
  "plugins": ["proviso@git+https://github.com/xcyxiaoxiang/proviso.git"]
}
```

插件自动注册全部技能并注入 `using-proviso` 引导——无需手动复制到全局 skill 目录。技能经 skill 工具与描述触发调用。

### 其他平台（全局安装）

**Claude Code:**
```bash
/plugin marketplace add xcyxiaoxiang/proviso
/plugin install proviso@proviso
```

**Codex CLI:**
```bash
codex plugin marketplace add xcyxiaoxiang/proviso
codex /plugins   # → 选择 Proviso 市场 → 安装
```

**Cursor:**
```bash
git clone https://github.com/xcyxiaoxiang/proviso.git ~/projects/Proviso
ln -s ~/projects/Proviso/skills ~/.cursor/skills/proviso
```

**Pi:**
```bash
pi install git:github.com/xcyxiaoxiang/proviso
```

**omp (oh-my-pi):**
```bash
omp plugin install github:xcyxiaoxiang/proviso
```

各平台项目级安装方式见对应目录：`.claude-plugin/`、`.codex-plugin/`、`.cursor-plugin/`、`.pi/`、`.omp/`。

## 项目结构

```
Proviso/
├── skills/              # 8 个技能（4 主链 + 3 辅助 + 1 入口）
├── hooks/               # 跨平台 session-start hook
├── scripts/             # 辅助脚本
├── .opencode/           # OpenCode 插件（V1/V2 双兼容）
├── .claude-plugin/      # Claude Code 插件配置
├── .codex-plugin/       # Codex 插件配置
├── .cursor-plugin/      # Cursor 插件配置
├── .pi/                 # Pi 扩展
├── .omp/                # omp (oh-my-pi) 扩展
├── AGENTS.md            # 完整项目参考文档
├── CLAUDE.md            # Claude Code 快速指南
└── package.json         # 插件入口
```

## 约定

- **主题目录**：`docs/NN_<name>/`（每主题一个；不归档、不移动，同主题优化直接更新文档）
- **需求文档**：`docs/NN_<name>/requirements.md`（事实源一，含验收标准）
- **详设文档**：`docs/NN_<name>/design.md`（事实源二，按情况填：有数据库才有表设计节、有界面才有 UI 节）
- **任务清单**：`docs/NN_<name>/tasks.md`（含追溯标注与执行账本）
- **变更记录**：req / des 文末维护（日期 / 变更内容 / 原因）
- **编号**：文档标题用 `1. / 1.1 / 1.1.1`；表格序号用普通 `1. 2. 3.`
- **配图**：流程、状态、关系类内容优先用图（mermaid / ASCII）
- **TDD**：始终先写失败测试，再实现，再验证

## 起源

Proviso 融合了：
- **OpenSpec**（artifact 工作流、验收场景）
- **Superpowers**（子代理驱动开发、TDD、根因调试）
- **Kiro**（requirements → design 的三段式与 spec 驱动实践）的思想

Proviso 是独立的工作流套件，不依赖也不扩展任一项目。

## 致谢

Proviso 的设计深受以下开源项目的启发：

- **OpenSpec** — [github.com/Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec)，MIT License，Copyright (c) 2025 Fission AI
- **Superpowers** — [github.com/obra/superpowers](https://github.com/obra/superpowers)，MIT License，Copyright (c) 2025 Jesse Vincent

## 版本记录

### v2.0.0 — 双事实源重构 (2026-10-15)

从 7 步链重构为"req + des 双事实源"五段流程。

**结构变更：**
- 技能体系重组为 8 个：主链 `requirements / designing / implementing / verifying` + 辅助 `debugging / test-driven-development / using-git-worktrees` + 入口 `using-proviso`
- 删除：`quick-change`（统一走大流程）、`finalize-change`（收尾并入 verifying）、`writing-skills`；`exploring` 并入 requirements
- 取消 delta specs 与主规格库：需求文档即规格
- 取消 `/sp-*` 斜杠命令：技能经 skill 工具与描述触发
- `sync-specs` / `archive-change` 退场；`root-cause-debugging` 更名 `debugging`

**纪律与机制：**
- 新增"文档漂移是 bug"纪律与分级授权
- 新增防偏移 7 条机制（追溯对账 / 边界白名单 / 上下文包 / 无授权不修改 / 活账本 / 门禁自检 / "多做"的度）
- 三门流程：需求确定 → 文档审阅 → 设计确认

**同日收尾调整：** 由于"归档冻结"与活文档理念冲突，取消归档环节（文档原地维护）；主题目录改用 `docs/NN_<name>/`；req / des 增加"变更记录"章节。

### v1.0.0 — 核心工作流重构 (2026-07-13)

从 v0.2.2 到 v1.0.0 是一次全面的核心工作流重构。proposal/plan 工件合并为 tasks.md 头部；子代理上下文注入重构（9 必填字段 + Controller Checklist）；verify-change 集成 design doc。

### v0.2.2 — Quick-Change 技能 (2026-06-23)

新增 `quick-change` 4 步浓缩流程（v2.0.0 中已移除）；模板文件加序号（`1.delta-spec.md` + `2.tasks.md`）。

### v0.2.1 — 命令与插件 (2026-06-21)

新增 OpenCode plugin 机制与斜杠命令（v2.0.0 中命令已移除）；Logo 集成。

## License

MIT
