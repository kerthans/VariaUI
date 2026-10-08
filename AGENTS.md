# AGENTS.md

开始任何工作之前，按顺序完整阅读：

1. [`PROJECT_BRIEF.md`](./PROJECT_BRIEF.md)：产品定义、边界与 AI 协作约束，是权威来源。
2. [`ARCHITECTURE.md`](./ARCHITECTURE.md)：技术选型、仓库结构、样式隔离方案、入库门槛与里程碑。

- 本项目是风格优先（Style-first）、人工策展的 Web 组件库，不是又一个通用 UI 组件库或效果展示库。
- 与上述文档冲突的需求或实现，先向维护者确认，不要自行变更产品方向或架构。
- 修改战略或产品定义时，先改 `PROJECT_BRIEF.md`，再同步到 `ARCHITECTURE.md` 和 `README.md`。
- 展示站与分发使用同一份组件源码；可分发组件不依赖 `next/*` 等框架特性。
- 风格变量必须限定在该风格的作用域内，不写入全局样式，不使用全局 Theme Provider。主题基础样式写在 `:where(.root)` 中保持零优先级。
- `src/registry/**` 内只能用相对路径导入，不能导入 `next/*` 或 `@/*`（ESLint 会拦截）。
- 严格按里程碑推进，不提前创建空目录、空页面或后续阶段的功能。
- 项目名称为 VariaUI，不要擅自改名或使用其他名称。
- 不要编造安装命令、组件数量、许可证、用户数据或尚未实现的功能。

## 常用命令

包管理器为 pnpm。

- `pnpm dev`：启动展示站
- `pnpm lint`：ESLint
- `pnpm typecheck`：生成路由类型并运行 `tsc --noEmit`
- `pnpm build`：生产构建

提交前至少保证 `pnpm lint`、`pnpm typecheck`、`pnpm build` 通过。

本地验证生产构建时注意：Next 会把进程名改为 `next-server`，`pkill -f "next start"` 杀不掉旧服务，请按端口结束进程（如 `lsof -ti tcp:3000 | xargs kill`），否则看到的是旧构建。

shadcn CLI 请用 `npx shadcn@latest`；`pnpm dlx shadcn` 会因依赖解析失败而报错。若本机配置了 HTTP 代理导致 CLI 请求被断开，可临时去掉代理变量执行。

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
