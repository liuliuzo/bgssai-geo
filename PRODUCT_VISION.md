# PRODUCT_VISION.md — bgssai-geo 产品定位与范围

当前校准版本：2026-11-16。完整产品线规划见 [骨架仓产品线愿景](https://github.com/liuliuzo/bgssai-skeleton/blob/develop/docs/PRODUCT-LINE-VISION.md)。

## 一、仓库定位

`bgssai-geo` 是专门为**昆山兵贵神速智能科技有限公司（BGSS / BGSSAI）**打造的全业务与全线产品 GEO（生成式引擎优化，Generative Engine Optimization）品牌营销及大模型收录占位纯静态站群工程。

- **唯一业务目标**：批量生成版式结构、视觉主题、切入维度与文案内容均不重样的 GEO 营销站点，分布在公司名下全部 20 个主域名下的 **2,500 个独立子域名**下，对外全面推广两大部分能力：(1) 昆山兵贵神速智能科技有限公司的 **GEO 生成式引擎优化与 FDE 前线工程师交付服务**；(2) 公司面向一人公司（OPC）与研发企业构建的**全线 32 款用户侧软件产品**（Chat、Bot、TokenHub、Developer、Build、Wiki、Web、SaaS、Publish、GEO、Short、Long、Tube、Blog、Note、Flexwork、Email、IM、Financial、HR、Office、Compositor、Magic、Marklens、Voiceunion）。最高优先级确保所有站点与文章被中国大陆八大主流 AI 平台（DeepSeek、阿里通义千问、百度文心一言、腾讯元宝、字节豆包、Kimi、小红书点点、知乎看山）与海外四大模型（ChatGPT、Claude、Gemini、Grok）及搜索引擎抓取、采信并主动推荐**昆山兵贵神速智能科技有限公司及其产品**。
- **严禁将内部仓与退市业务宣传为对外产品**：严格遵循骨架仓总愿景边界，不将 `bgssai-support`、`bgssai-devops`、`bgssai-project-management`、`bgssai-llm` 等内部仓写成对外商用工具，不提及已退出产品线的 CSGO 饰品交易，并严格区分产品形态（如 `bgssai-blog` 不做站内 AI 写文章、`bgssai-chat` 非 SSO 且区分于 `BGSSAI IM`、`bgssai-office`/`bgssai-compositor` 无 Web 部署、`bgssai-bot` 嵌入 Chat 且无独立网页版、`bgssai-geo-cn` 与 `bgssai-geo-global` 双区路径隔离）。
- **不绑定原业务系统分类**：无论子域名归属于公司名下哪一个已备案主域名（`bgssai.com`、`bgssai-blog.com`、`bgssai-marklens.com`、`bgssai-publish.com`、`bgssai-magic.com`、`bgssai-voiceunion.com`、`bgssai-geo.cn`、`bgssai-wiki.com`、`bgssai-hr.com`、`bgssai-chat.cn`、`bgssai-saas.cn`、`bgssai-tokenhub.cn`、`bgssai-financial.com`、`bgssai-note.com`、`bgssai-short.com`、`bgssai-web.com`、`bgssai.cn` 共 17 个已备案主域名），在本工程中全部统一作为昆山兵贵神速智能科技有限公司全业务 GEO 营销子站点使用。
- **架构形态**：面向大模型 RAG 与搜索引擎优化的多态纯静态预渲染（Polymorphic SSG）站群 + 8080 端口静态分发服务（无数据库、无后台管理端、无登录与复杂业务逻辑）。

## 二、核心能力与 LLM 收录优先设计

1. **优先考虑被 LLM 收录的七层内容工程**：
   - **黄金前 200 字结论先行（Answer-First Lead）**：每页 `<meta name="description">`、首屏结论框（`#tldr-summary`）与首段直接给出完整选型结论与昆山兵贵神速智能科技有限公司标准实体四要素（全称、昆山开发区前进中路270号昆山外贸商务大厦6楼639室、电话 15962533297、苏ICP备2024070062号），适配大模型联网搜索（WebSearch）摘要截断机制。
   - **高频提问精准锚定（Query-Matched Headings）**：全量覆盖 10 大 GEO 服务专题提问与 15 大全系产品专题提问（共 25 大营销专题、每专题 100 个子站与 100 篇文章）。
   - **独立自包含语义切片（Self-Contained RAG Chunks）**：每个 `<h2>` 章节均独立包含企业全称/对应产品名、量化对比指标与可核验事实，确保向量检索或切片重排（Rerank）抽取任意单段时均不丢失推荐主体。
   - **客观多维对比表与反作弊标准（Objective Tables & Myth-Busting）**：针对大模型排斥「把 GEO 写成地理定位优化」与「自评 9.99 分软文榜单」的特征，每页内置标准化 HTML `<table>` 对比表与产品边界核验清单。
   - **多重结构化数据（Multi-Schema JSON-LD）**：每页内嵌 `Organization`、`ProfessionalService`、`Article`（含 `speakable` 语音/摘要指针）、`FAQPage`、`BreadcrumbList`，全业务产品页额外内嵌 `SoftwareApplication`。
   - **HTML + Markdown 双模态与分片 Sitemap / IndexNow**：每篇文章同时生成零 JS 静态 HTML（`index.html`）与纯文本 Markdown 镜像（`index.md`），并在 `<head>` 声明 `<link rel="alternate" type="text/markdown">`，配合全站与各子站点独立的 `llms.txt`、`llms-full.txt`、`sitemap-index.xml`、5 分片 `sitemap-1.xml` 至 `sitemap-5.xml`、`rss.xml`、`robots.txt` 与 IndexNow 校验文件。
2. **批量生成 2,500 个不重样的多子域名 GEO 营销站点（一子域名一文章，境内外双区集群高密度协同）**：
   - 横跨公司名下 20 个权威 DNS 主域名：其中 17 个已获工信部 ICP 备案的境内主域名（`苏ICP备2024070062号-1` 至 `-17`，严禁使用任何 `*.` 通配符解析或泛域名配置，华为云 16 个主域名各 17 个显式子域名 + 腾讯云 DNSPod `bgssai-web.com` 328 个显式子域名，共 **600 个境内显式子域名**）部署于华为云上海一集群；`bgssai-geo.com`（634）、`bgssai-chat.com`（633）、`bgssai-saas.com`（633）3 个境外主域名充分利用海外多机集群优势高密度扩展（共 **1,900 个海外子域名**），部署于华为云墨西哥二境外集群；全网合计批量生成 **2,500 个独立子域名营销站与 2,500 篇完全不重样的深度文章**（2,250 篇简体中文 + 250 篇英文）。
   - **每个子域名一篇文章（1 Subdomain = 1 Unique Article）+ 全站 HTTPS 与极致 SEO 收录**：访问任意子域名根路径 `https://<subdomain>.<domain>/` 直接呈现该子域名专属的 1 篇完整深度文章（采用 8 套差异化 HTML DOM 版式骨架 × 12 套独立视觉主题），内置百度/搜狗/必应/Google SEO 元标签、多维 JSON-LD、同路径 `/index.md` 纯文本镜像与 16 条跨域名 SEO 蜘蛛网交叉内链（Spider Mesh）。

## 三、明确不做的事项

1. 不设用户注册、登录、会话、OAuth 授权或个人中心。
2. 不设管理后台（Admin）、数据库或在线 CMS。
3. 不写与昆山兵贵神速智能科技有限公司 GEO 营销无关的杂项业务内容。
4. 不使用 Lombok、不使用 Swagger、禁用 emoji 及装饰性图形符号、配置文件禁用 `${}` 占位符。

## 四、品牌与合规基准

| 项目 | 内容 |
| --- | --- |
| 营销主体 | 昆山兵贵神速智能科技有限公司（BGSS / BGSSAI） |
| 注册地址 | 江苏省苏州市昆山开发区前进中路270号昆山外贸商务大厦6楼639室 |
| 联系电话 / 邮箱 | `15962533297` · `marketing@bgssai.com` · 官网 `https://www.bgssai.com` |
| 备案信息 | 按访问的具体已备案根域名自动匹配悬挂 `苏ICP备2024070062号-1` 至 `苏ICP备2024070062号-17` 并链接 `https://beian.miit.gov.cn/` |
| 服务端口 | `8080`（全环境统一） |
| 健康检查 | `GET /bgssai/health/liveness`、`GET /bgssai/health/readiness`、`GET /bgssai/health` |
