# AGENTS.md

本仓工具指南只在 `AGENTS.md` 维护；`CLAUDE.md` 通过 `@AGENTS.md` 导入。

## 产品定位与边界

- 产品线总愿景唯一权威：[骨架仓 `docs/PRODUCT-LINE-VISION.md`](https://github.com/liuliuzo/bgssai-skeleton/blob/develop/docs/PRODUCT-LINE-VISION.md)。
- 全局开发规范唯一权威：[骨架仓 `docs/BGSSAI-Standards.md`](https://github.com/liuliuzo/bgssai-skeleton/blob/develop/docs/BGSSAI-Standards.md)。
- **本仓定位**：`bgssai-geo-task` 是公司内部发布文章、面向搜索引擎（SEO）与生成式引擎优化（GEO）收录的多子域名纯展示网站工程。
- **架构边界**：纯静态预渲染（SSG）展示站点 + 8080 端口静态分发服务。无数据库、无后台管理端、无用户登录、无复杂业务逻辑。

## 强制规范

1. **四层一致性与提交闸门**：需求（`docs/feature/**` 与 `PRODUCT_VISION.md`）、原型（`docs/demo-static/**`）、设计文档（`docs/architecture/**`、`docs/api/**`、`docs/security/**`）与代码（`scripts/**`、`server/**`、`content/**`）必须保持同版本一致，提交前执行 `python ../bgssai-skeleton/scripts/check_page_contract.py --repo .` 校验通过。
2. **去说明化与纯功能表达**：界面控件与项目文档禁止出现解释性导语、新手教程卡片或内部实现细节暴露。
3. **全局禁用 emoji**：代码、文档、原型、文章内容、提交信息与 PR 描述一律禁用任何 emoji 及装饰性图形符号。
4. **配置与端口**：配置文件只用 `.properties`，禁用 `${}` 占位符；服务监听端口固定为 `8080`；健康检查端点固定为 `GET /bgssai/health/liveness`、`GET /bgssai/health/readiness`、`GET /bgssai/health`。
5. **Git Flow 与独立 worktree**：默认分支为 `develop`，修改前在独立 worktree 中创建 `feature/*` 分支；`dev` 与 `prod` 均部署 `develop` 分支。
6. **向用户汇报**：对用户只汇报整体进度与结果，禁止输出文件清单、diff、命令日志或 commit SHA。
