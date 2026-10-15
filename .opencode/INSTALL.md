# Installing Proviso for OpenCode

## 全局安装

在 OpenCode 配置文件 `opencode.json` 中声明 git 远程源：

```json
{
  "plugins": ["proviso@git+https://github.com/xcyxiaoxiang/proviso.git"]
}
```

OpenCode 会自动克隆并注册所有 Proviso 技能。重启后即可使用。

## 项目级安装

将 Proviso 复制到项目目录中，在 `opencode.json` 添加本地路径：

```json
{
  "plugins": ["./proviso"]
}
```

## 使用

插件自动注册全部技能并注入 `using-proviso` 引导内容（**双兼容 OpenCode 1 / 2**：V2 经原生 `ctx.skill.transform` 注册技能、`context` 钩子注入引导；零外部依赖）。技能经 **skill 工具与描述触发**调用——无需斜杠命令：

- 直接描述你的任务，相关技能会被自动触发（如"我要加一个新功能" → `requirements`）；
- 也可以显式调用：用 skill 工具加载对应技能（`requirements` / `designing` / `implementing` / `verifying` / `debugging` / `test-driven-development` / `using-git-worktrees` / `using-proviso`）。

## Verification

启动会话后检查：

- 是否看到 **"You have Proviso"** 引导信息；
- 运行 `skill` 工具能否列出所有 Proviso 技能。

## 卸载

```bash
# 全局安装：从 opencode.json 移除 plugin 声明
# 并可清理缓存：rm -rf ~/.cache/opencode/packages/proviso

# 项目级安装：从 opencode.json 移除并删除本地目录
```

## Troubleshooting

- 全局安装确认网络可访问 GitHub；
- git 远程插件被缓存到 `~/.cache/opencode/packages/`；
- 项目级安装确认路径正确。

更多信息见 `AGENTS.md`。
