# PRODUCT_VISION.md — bgssai-geo 产品定位与范围

当前校准版本：2026-11-16。完整产品线规划见 [骨架仓产品线愿景](https://github.com/liuliuzo/bgssai-skeleton/blob/develop/docs/PRODUCT-LINE-VISION.md)。

## 一、仓库定位

`bgssai-geo` 是公司内部发布文章、面向搜索引擎（SEO）与生成式人工智能引擎（GEO）收录优化的多子域名纯展示内容矩阵工程。

- **核心职责**：汇集数百个垂直主题子域名，展示公司内部发布的行业文案与产品知识文章，确保全部子域名与文章可被传统搜索引擎及大模型检索爬虫直接抓取、解析与引用。
- **架构形态**：纯静态预渲染（SSG）展示站点 + 轻量静态分发服务（8080 端口，支持按 HTTP `Host` 子域名直接映射对应子站点静态目录，并暴露统一健康检查端点）。
- **与 `bgssai-geo-cn` / `bgssai-geo-global` 的边界**：
  - `bgssai-geo-cn` 与 `bgssai-geo-global` 是面向外部用户的「大模型引用检测 + 投稿下单」业务应用系统（含用户端与管理端、数据库与支付闭环）。
  - `bgssai-geo` 是公司自有的「多子域名文章发布与收录展示站群」，无用户登录、无后台管理端、无数据库、无计费与复杂业务逻辑。

## 二、核心功能范围

1. **数百子域名矩阵管理与独立成站**：
   - 仓库内置不少于 200 个子域名站点配置（覆盖中文 `zh-CN` 与英文 `en` 各 100 个垂直子域名，涵盖一人公司工具、出海营销、独立站建站、社媒运营、短剧长剧制作、视频平台、企业邮箱、智能财务、招聘人事、消费者维权、AI 编程、研发文档、模型网关、客户关系管理等行业主题），支持通过 JSON 数据文件持续扩展至任意数量子域名。
   - 每个子域名作为独立垂直主题站运行，拥有独立的站点标题、关键词、语言标识（`zh-CN` / `en`）、专属文章列表、文章详情页、独立 `sitemap.xml`、`rss.xml`、`robots.txt` 与 `llms.txt`。
   - 主域名（`www` 或根域名）作为总导航中心，汇总展示全部子域名分栏目录、行业分类索引与全站最新文章。
2. **内部文章静态化发布与双语呈现**：
   - 文章数据存放于仓库 `content/articles/` 目录，支持中英文双语内容、结构化摘要、关键事实表、对比表格、常见问答（FAQ）、分类标签、归属子域名及互链关系。
   - 构建期将全部文章预渲染为无 JavaScript 依赖的纯静态语义化 HTML5 页面，首屏直接输出完整正文。
3. **搜索引擎与 AI 引擎收录优化（SEO / GEO）**：
   - **HTML 语义化结构**：使用 `<header>`、`<nav>`、`<main>`、`<article>`、`<section>`、`<aside>`、`<footer>`、`<h1>`–`<h3>`、`<table>`、`<dl>`、`<time>` 标签。
   - **结构化数据（JSON-LD）**：主站与子站首页内嵌 `WebSite`、`Organization`、`CollectionPage`、`ItemList`；文章详情页内嵌 `Article`、`FAQPage`、`BreadcrumbList`。
   - **元信息与多语言互链**：每页输出 `<title>`、`<meta name="description">`、`<meta name="keywords">`、`<meta name="robots">`、`<link rel="canonical">`、OpenGraph、Twitter Card 及中英对照 `<link rel="alternate" hreflang="...">`。
   - **爬虫索引协议**：自动生成主站 `sitemap-index.xml`、主站 `sitemap.xml`、各子域名独立 `sitemap.xml`、全站与子站 `rss.xml`、`robots.txt`（显式放行 Googlebot、Baiduspider、Bingbot、GPTBot、OAI-SearchBot、ClaudeBot、PerplexityBot、Google-Extended、Bytespider 等）以及 `llms.txt` / `llms-full.txt`。

## 三、明确不做的事项

1. 不设用户注册、登录、会话、OAuth 授权或个人中心。
2. 不设管理后台（Admin）、数据库（MySQL / PostgreSQL / Redis）或在线富文本 CMS。
3. 不承载在线支付、订单、计费、评论或 UGC 交互。
4. 不使用 Lombok、不使用 Swagger、禁用 emoji 及装饰性图形符号、配置文件禁用 `${}` 占位符。

## 四、品牌与合规基准

| 项目 | 内容 |
| --- | --- |
| 品牌标识 | BGSS / BGSSAI |
| 版权主体 | 昆山兵贵神速智能科技有限公司 |
| 默认主域名 | `www.bgssai-geo.com`（兼容 `*.bgssai-geo.com`、`*.bgss-geo.com`、`*.bgssai-geo.cn`） |
| 备案信息 | 已备案境内域名悬挂 `苏ICP备2024070062号-7` 并链接 `https://beian.miit.gov.cn/`；境外域名按境外页脚规范展示 |
| 服务端口 | `8080`（全环境统一） |
| 健康检查 | `GET /bgssai/health/liveness`、`GET /bgssai/health/readiness`、`GET /bgssai/health` |
