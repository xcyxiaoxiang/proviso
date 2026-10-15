# Installing Proviso for omp (oh-my-pi)

## 插件安装

从 GitHub 安装为插件（也支持 npm 规格与 marketplace）：

```bash
omp plugin install github:xcyxiaoxiang/proviso
```

本地开发时可以直接把本仓库作为包加载（包根加载会一并发现 `skills/` 兄弟目录）：

```bash
omp --extension /path/to/proviso
```

或在配置的 `extensions:` 里指向本仓库路径。

## 生效内容

- **技能**：`skills/` 目录经 omp 的包能力发现自动注册（`skill://` 路径在任意 FS 工具中可用）；
- **引导**：`using-proviso` 在会话启动与压缩后注入（`context` 事件）。

## Verification

启动新会话后检查：

- 是否出现 **"You have Proviso"** 引导信息；
- 技能是否可被发现/调用（技能系统）。

## 说明

- omp 是 Pi 的 fork；本适配使用 `@oh-my-pi/pi-coding-agent` 的 `ExtensionAPI`；
- omp 的子代理（`task` / `wait`）与任务清单（`todo`）已有原生工具——映射见 `skills/using-proviso/references/omp-tools.md`；
- 包声明位于 `package.json` 的 `omp` 字段（extensions）。

更多信息见 `AGENTS.md`。
