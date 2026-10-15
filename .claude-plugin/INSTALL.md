# Installing Proviso for Claude Code

## 全局安装

通过 Claude Code marketplace 安装，所有项目自动可用：

```bash
# 1. 添加 Proviso 市场（只需一次）
/plugin marketplace add xcyxiaoxiang/proviso

# 2. 安装 proviso 插件
/plugin install proviso@proviso
```

安装后 `/reload-plugins` 即可生效。

## 项目级安装

将 Proviso 克隆到项目目录，通过 Claude Code 的技能发现机制加载：

```bash
# 1. 克隆到项目内
git clone https://github.com/xcyxiaoxiang/proviso.git

# 2. 创建技能符号链接（Claude Code 从 .claude/skills/ 发现技能）
ln -s ../proviso/skills .claude/skills/proviso
```

打开项目后 Claude Code 自动加载技能。

## Verification

启动新会话后检查：

- 首条消息前是否出现 **"You have Proviso"** 引导信息
- 运行 `/plugin` 查看已安装插件列表
- 运行 `Skill` 能否列出所有 8 个 Proviso 技能

## 卸载

```bash
# 全局安装
/plugin uninstall proviso@proviso
/plugin marketplace remove proviso

# 项目级安装：删除技能目录即可
rm -r .claude/skills/proviso
```

## Troubleshooting

- 全局安装：确认仓库可访问，运行 `/reload-plugins`
- 项目级安装：确认 `.claude/skills/proviso` 符号链接正确
- SessionStart 引导未出现：确认 `hooks/session-start` 可执行（chmod +x）

更多信息见 `AGENTS.md`。
