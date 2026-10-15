# Installing Proviso for Pi

## 全局安装

通过 Pi package 机制从本仓库安装：

```bash
pi install git:github.com/xcyxiaoxiang/proviso
```

本地开发时可以直接加载本 checkout：

```bash
pi -e /path/to/proviso
```

Pi 会加载 Proviso 技能（`skills/`，经 `resources_discover` 注册）并注入 `using-proviso` 引导（会话启动时、以及压缩后重新注入）。

## Verification

启动新会话后检查：

- 是否出现 **"You have Proviso"** 引导信息；
- 技能列表是否包含 `requirements` / `designing` / `implementing` / `verifying` 等 8 个技能。

## 说明

- Pi 原生支持 skills，无需 `Skill` 兼容层；
- 子代理与任务清单工具为可选配套（例如 `pi-subagents`）——见 `skills/using-proviso/references/pi-tools.md`；
- 包声明位于 `package.json` 的 `pi` 字段（extensions + skills）。

更多信息见 `AGENTS.md`。
