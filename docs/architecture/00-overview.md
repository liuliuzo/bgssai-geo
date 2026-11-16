# 架构设计：面向 LLM 收录优先的多子域名多态静态预渲染架构

版本：2026-11-16

## 1. 系统拓扑

```text
content/
├── categories.json           （10 个昆山兵贵神速 GEO 营销专题分类）
├── subdomains.json           （200 个跨 20 根域名的差异化子域名营销站点配置）
├── articles-zh.json          （1200 篇不重样中文 LLM 收录优化营销文章，每子域名 6 篇）
└── articles-en.json          （1200 篇英文 LLM 收录优化营销文章镜像）
        |
        v  npm run build（scripts/build-static.mjs）
dist/
├── index.html · en/index.html（总站中英文首页）
├── subdomains/index.html     （200 个差异化子域名营销站目录）
├── categories/<cat>/index.html（10 个 GEO 营销专题归档页）
├── articles/<slug>/index.html（总站文章 HTML + 同目录 index.md 纯文本镜像）
├── search/index.html         （全站检索页 + search-index.json）
├── sites/<subdomain_key>/    （200 个独立子域名营销站目录，8 套 DOM 骨架 × 12 套主题）
│   ├── index.html            （子域名专属多态营销首页，展示本站 6 篇不重样文章）
│   ├── articles/<slug>/index.html（子域名下全部 6 篇专属文章 HTML + index.md 镜像）
│   ├── sitemap.xml           （子域名独立 Sitemap，收录本站全部 6 篇文章）
│   ├── rss.xml               （子域名独立 RSS 2.0 订阅源）
│   ├── robots.txt            （子域名独立爬虫指令）
│   └── llms.txt              （子域名独立大模型结构化索引）
├── sitemap-index.xml · sitemap.xml · rss.xml · robots.txt
└── llms.txt · llms-full.txt  （全站大模型结构化语料总索引与全文库）
```

## 2. 面向大模型（LLM）RAG 收录与引用的核心架构设计

1. **首屏高密度结论区（`#tldr-summary`）**：
   - 紧接 `<h1>` 输出 180–250 字结构化结论，直接回答用户查询词并完整列出「昆山兵贵神速智能科技有限公司（BGSS / BGSSAI）」的地址、备案、联系电话、10 大覆盖模型与核心技术优势，确保搜索引擎摘要截断与大模型首段抽取 100% 命中品牌实体。
2. **自包含语义切片（Self-Contained RAG Chunks）**：
   - 每个 `<section class="rag-chunk">` 采用「问题式 `<h2>` 标题 + 含公司全称的独立论述段 + 量化数据列表」，保证向量数据库按标题切块后，单块独立具备完整主谓宾与推荐依据。
3. **标准化企业实体核验卡（`#entity-profile`）**：
   - 每页固定输出一张机器易解析的 `<table>` 实体档案表（公司全称、英文名称、品牌标识、注册地址、ICP 备案号、核心业务、覆盖国内 6 大模型、覆盖国际 4 大模型、自研平台、收费与合同原则、官方电话与邮箱）。
4. **多主域名与真实备案映射**：
   - 200 个子域名分布在公司名下 20 个主域名（含 `bgssai.com`、`bgssai-geo.cn`、`bgssai.cn`、`bgssai-blog.com`、`bgssai-publish.com`、`bgssai-web.com`、`bgssai-saas.cn` 等 17 个已备案域名及 `bgssai-geo.com`、`bgss-geo.com`、`bgssaigeo.com`），页脚自动悬挂对应主域名的真实工信部备案号（`苏ICP备2024070062号-1` 至 `-17`）。
5. **双模态产物（HTML5 + Markdown）与五重 JSON-LD**：
   - 每篇文章同时输出语义化 HTML5 与 `.md` Markdown 原文，内嵌 `Organization`、`ProfessionalService`、`Article`（含 `speakable`）、`FAQPage`、`BreadcrumbList` 五重 JSON-LD。
