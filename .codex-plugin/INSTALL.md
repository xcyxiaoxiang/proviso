# Installing Proviso for Codex CLI

## 全局安装

通过 Codex marketplace 安装，所有项目自动可用：

```bash
# 1. 添加 Proviso 市场
codex plugin marketplace add xcyxiaoxiang/proviso

# 2. 打开 TUI 安装插件
codex /plugins
# → 选择 Proviso 市场 → 安装 proviso 插件
```

## 项目级安装

将 Proviso 克隆到本地，添加本地路径为 marketplace：

```bash
git clone https://github.com/xcyxiaoxiang/proviso.git
codex plugin marketplace add /path/to/proviso
# 然后 codex /plugins → 安装
```

## Verification

启动新会话后检查：

- 技能是否被自动加载（执行 `@proviso` 或查看技能列表）
- 运行 `codex /plugins` 查看已安装插件

## 工具映射

Proviso 技能基于 Claude Code 工具名编写。Codex 用户请参考 `skills/using-proviso/references/codex-tools.md`。

关键差异：
- `Task` → `spawn_agent` + `wait_agent` + `close_agent`
- `TodoWrite` → `update_plan`
- 需要在 `~/.codex/config.toml` 中启用 `[features] multi_agent = true`

## 卸载

```bash
codex plugin marketplace remove proviso
```

## Troubleshooting

- 确认 `.agents/plugins/marketplace.json` 和 `.codex-plugin/plugin.json` 存在
- 运行 `codex plugin marketplace list` 检查市场状态
- 多 agent 支持：`~/.codex/config.toml` 添加 `[features] multi_agent = true`

更多信息见 `AGENTS.md`。
