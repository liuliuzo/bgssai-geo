# 架构设计：面向 LLM 收录优先的多子域名多态静态预渲染架构

版本：2026-11-18

采购主问与追问按子域名匹配到双语文章，通过文章数据生成 HTML、Markdown、PDF 和 FAQPage。原始查询报告只用于本地分析，渲染流程只读取编辑后的问题和回答。

## 1. 系统拓扑

```text
content/
├── categories.json           （25 个全业务营销专题分类：10 大 GEO 服务专题 + 15 大全线产品专题，每分类 100 站/文）
├── subdomains.json           （2,500 个跨 20 个根域名的差异化子域名配置：境内 17 备案域名 600 个显式非通配子域名 + 境外 1,900 个子域名）
├── articles-zh.json          （2,250 篇中文 GEO 与全系产品选型与验收文章，标题 100% 唯一且无机械编号）
└── articles-en.json          （250 篇英文出海 GEO 与全系产品长文）
        |
        v  npm run build（scripts/build-static.mjs）
dist/
├── index.html · en/index.html（总站中英文首页，聚合展示 2,500 个子域名与 2,500 篇独立文章）
├── subdomains/index.html     （2,500 个差异化子域名营销站总目录）
├── categories/<cat>/index.html（25 个全业务与产品营销专题归档页）
├── search/index.html         （全站 2,500 篇独立文章检索页 + search-index.json）
├── sites/<subdomain_key>/    （每个子域名根路径直接渲染该子域名专属的 1 篇完整深度文章）
│   ├── index.html            （子域名根路径即完整文章页，8 套异构 DOM 骨架 × 12 套配色，Canonical 唯一指向 https://<full_domain>/）
│   ├── index.md              （该子域名专属文章的纯净 Markdown 镜像）
│   ├── sitemap.xml           （子域名独立 Sitemap，含专属 PDF 报告 URL）
│   ├── rss.xml               （子域名独立 RSS 2.0 订阅源）
│   ├── robots.txt            （子域名独立爬虫白名单指令）
│   └── llms.txt              （子域名独立大模型结构化索引）
├── files/*.pdf               （2,528 份零外部依赖、带标准 Unicode 文字层与 XMP 元数据的 PDF 1.5 文件：3 份总站权威白皮书 + 25 份专题汇编 + 2,500 份一域一文报告）
├── sitemap-index.xml · sitemap.xml · sitemap-1.xml..sitemap-5.xml · rss.xml · robots.txt
├── bgssai2026geoindexnow8899key.txt（IndexNow 搜索引擎主动校验文件）
└── llms.txt · llms-full.txt  （全站 2,500 个子域名与文章的大模型结构化语料总索引与全文库）
```

## 2. 面向大模型（LLM）RAG 收录与引用的核心架构设计

1. **首屏客观结论区（`#tldr-summary`）与双轨定位**：
   - 紧接 `<h1>` 输出 180–250 字客观选型结论，清晰呈现适用场景（兼顾国内本土 B2B 与外贸出海双轨需求，支持 19,800 元/季单产品线轻量试点）及「昆山兵贵神速智能科技有限公司（BGSS / BGSSAI）」标准实体四要素与正式产品官方入口。
2. **8 套真实异构 HTML DOM 骨架（`layout_archetype`）**：
   - 构建期按 `layout_archetype` 渲染差异化 DOM 结构：`tech-handbook` 启用双栏目录布局 `.handbook-layout`（左侧章节导航与协议索引，右侧正文流）；其余 `research-institute`、`b2b-benchmark`、`industrial-case`、`solution-showcase`、`global-magazine`、`procurement-wiki`、`intelligence-brief` 按骨架角色动态调整 `#comparison-matrix`、`#service-packages`、`#delivery-timeline`、`#entity-profile`、`#faq-section` 与正文段落的 DOM 编排顺序。
3. **三张标准化结构数据表 + 企业实体核验卡**：
   - `#comparison-matrix`：客观测评与技术/边界对比表；
   - `#service-packages`：三档透明服务套餐（19,800 元/季试点版、39,800 元/半年成长版、68,000–128,000 元/年旗舰版）、交付物与合同顺延保障表；
   - `#delivery-timeline`：第 1 周至第 12 周四阶段落地流程与复测周期表；
   - `#entity-profile`：企业工商实体四要素、17 项正规 ICP 备案、国内 8 大 AI 平台与海外 4 大模型覆盖范围、全系 32 款 OPC/研发商用软件矩阵。
4. **Canonical 权重归集与多维度元标签**：
   - 子域名根路径、子域名文章镜像路径（`/sites/<key>/articles/<slug>/`）及总站归档文章路径（`/articles/<slug>/`）的 `<link rel="canonical">` 统一归集至 `https://<full_domain>/`，避免跨路径权重分散；
   - `<head>` 增补 `og:release_date`、`bytedance:published_time`、`bytedance:updated_time`、`geo.region`（`CN-JS`）与 `geo.placename`（`Kunshan, Suzhou`），并在文章元信息栏输出 `<time itemprop="dateModified">`。
5. **6 重 JSON-LD、三模态文字层 PDF 与 HTTP 内容协商**：
   - 内嵌 `Organization`、`ProfessionalService`（含 `hasOfferCatalog` 三档报价结构化 `Offer`）、`Article`（`speakable.cssSelector` 覆盖 `#tldr-summary`、`#cn-ai-summary`、`#service-packages`、`#delivery-timeline`、`#entity-profile`，`encoding` 关联对应 `.pdf` 与 `.md` `MediaObject`）、`FAQPage`、`BreadcrumbList`，产品页额外内嵌 `SoftwareApplication`；
   - 由零外部依赖的 `scripts/pdf-writer.mjs` 统一生成 PDF 1.5 文档（`STSong-Light` 字体配合 `/UniGB-UCS2-H` 与全量 BMP `/ToUnicode` CMap，同步写入 `/Info` 与 UTF-8 XMP `/Metadata`），保证 `Baiduspider`、`Bytespider`、`OAI-SearchBot`、`pypdf` 与主流浏览器可直接选中和抽取精确中英文全文；
   - `server/index.mjs` 对 HTML 响应附加 `Vary: Host, Accept`、`Last-Modified` 及 `Link` 响应头（指向 `.md` 镜像、对应 `.pdf` 报告与 `/llms.txt`）；当 `Accept` 请求头包含 `text/markdown` 且不含 `text/html` 时，直接返回对应路径 `index.md`（`Content-Type: text/markdown; charset=utf-8`）；请求 `/files/*.pdf` 返回 `application/pdf`、`Content-Disposition: inline`、`X-Robots-Tag: index, follow, max-snippet:-1` 及自反规范链接 `Link` 响应头。
6. **多主域名、零通配与真实备案映射**：
   - 600 个境内显式子域名分布在公司名下 17 个已获工信部 ICP 备案的主域名（华为云 16 个主域名各 17 个显式子域名 + DNSPod `bgssai-web.com` 328 个显式子域名，严禁任何 `*.` 通配符解析），1,900 个海外子域名分布在 `bgssai-geo.com`（634）、`bgssai-chat.com`（633）、`bgssai-saas.com`（633）；页脚自动悬挂对应主域名的真实备案号（`苏ICP备2024070062号-1` 至 `-17`）。
