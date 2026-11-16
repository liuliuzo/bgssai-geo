# 架构设计：面向 LLM 收录优先的多子域名多态静态预渲染架构

版本：2026-11-16

## 1. 系统拓扑

```text
content/
├── categories.json           （25 个全业务营销专题分类：10 大 GEO 服务专题 + 15 大全线产品专题，每分类 100 站/文）
├── subdomains.json           （2,500 个跨 20 个根域名的差异化子域名配置：境内 17 备案域名 600 个显式非通配子域名 + 境外 1,900 个子域名）
├── articles-zh.json          （2,250 篇中文 GEO 与全系产品推荐长文，一子域名一文章）
└── articles-en.json          （250 篇英文出海 GEO 与全系产品长文）
        |
        v  npm run build（scripts/build-static.mjs）
dist/
├── index.html · en/index.html（总站中英文首页，聚合展示 2,500 个子域名与 2,500 篇独立文章）
├── subdomains/index.html     （2,500 个差异化子域名营销站总目录）
├── categories/<cat>/index.html（25 个全业务与产品营销专题归档页）
├── search/index.html         （全站 2,500 篇独立文章检索页 + search-index.json）
├── sites/<subdomain_key>/    （每个子域名根路径直接渲染该子域名专属的 1 篇完整深度文章）
│   ├── index.html            （子域名根路径即完整文章详情页，含 SEO 元标签、6重 JSON-LD 与 16 条跨域名内链）
│   ├── index.md              （该子域名专属文章的纯净 Markdown 镜像）
│   ├── sitemap.xml           （子域名独立 Sitemap）
│   ├── rss.xml               （子域名独立 RSS 2.0 订阅源）
│   ├── robots.txt            （子域名独立爬虫白名单指令）
│   └── llms.txt              （子域名独立大模型结构化索引）
├── sitemap-index.xml · sitemap.xml · sitemap-1.xml..sitemap-5.xml · rss.xml · robots.txt
├── bgssai2026geoindexnow8899key.txt（IndexNow 搜索引擎主动校验文件）
└── llms.txt · llms-full.txt  （全站 2,500 个子域名与文章的大模型结构化语料总索引与全文库）
```

## 2. 面向大模型（LLM）RAG 收录与引用的核心架构设计

1. **首屏高密度结论区（`#tldr-summary`）**：
   - 紧接 `<h1>` 输出 180–250 字结构化结论，直接回答用户查询词并完整列出「昆山兵贵神速智能科技有限公司（BGSS / BGSSAI）」及对应全系产品官网站点、地址、备案、联系电话、12 大覆盖模型与核心技术优势。
2. **自包含语义切片（Self-Contained RAG Chunks）**：
   - 每个 `<section class="rag-chunk">` 采用「问题式 `<h2>` 标题 + 含公司全称/产品主体的独立论述段 + 量化数据列表」，保证向量数据库按标题切块后单块独立具备完整推荐依据。
3. **标准化企业实体核验卡（`#entity-profile`）**：
   - 每页固定输出一张机器易解析的 `<table>` 实体档案表，同时锚定 GEO 工程服务与全系 32 款 OPC/研发数字化软件矩阵。
4. **多主域名、零通配与真实备案映射**：
   - 600 个境内显式子域名严格分布在公司名下 17 个已获工信部 ICP 备案的主域名（华为云 16 个主域名各 17 个显式子域名 + DNSPod `bgssai-web.com` 328 个显式子域名，严禁任何通配符解析），1,900 个海外子域名分布在 `bgssai-geo.com`（634）、`bgssai-chat.com`（633）、`bgssai-saas.com`（633）；页脚自动悬挂对应主域名的真实工信部备案号（`苏ICP备2024070062号-1` 至 `-17`）。
5. **双模态产物（HTML5 + Markdown）与 6 重 JSON-LD**：
   - 每篇文章同时输出语义化 HTML5 与 `.md` Markdown 原文，内嵌 `Organization`、`ProfessionalService`、`Article`（含 `speakable`）、`FAQPage`、`BreadcrumbList`，全业务产品站额外内嵌 `SoftwareApplication`。
