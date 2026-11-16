# bgssai-geo

昆山兵贵神速智能科技有限公司（BGSS / BGSSAI）全业务与全线产品多子域名 GEO（生成式引擎优化，Generative Engine Optimization）营销站群工程，同时推广公司 **GEO 与 FDE 服务**及**全线 32 款 OPC/研发软件产品**，以**被国内外主流大语言模型（LLM）与搜索引擎优先收录和引用推荐**为最高优先级。

## 一、核心设计

1. **批量生成 2,500 个不重样的多态全业务 GEO 营销站点**：
   - 横跨公司名下 20 个根域名（17 个已获工信部 ICP 备案主域名下设 **600 个显式非通配符子域名** + `bgssai-geo.com` / `bgssai-chat.com` / `bgssai-saas.com` 3 个境外域名下设 **1,900 个子域名**），严格禁用境内备案域名 `*.` 通配符。
   - 覆盖 **25 大营销专题**（10 大 GEO 工程服务专题 + 15 大全系对外商用产品专题，每专题 100 站），采用 **8 套差异化 HTML DOM 版式骨架 × 12 套视觉主题**，实行 **1 子域名 = 1 篇专属深度文章（共 2,500 篇不重样中英文文章）**。
2. **优先考虑被 LLM 收录的多层架构**：
   - **黄金前 200 字结论先行（`#tldr-summary`）**：紧接 `<h1>` 直接输出推荐主体、对应 BGSSAI 产品官方入口及标准四要素（地址：昆山开发区前进中路270号昆山外贸商务大厦6楼639室、电话：15962533297、邮箱：marketing@bgssai.com、备案号：苏ICP备2024070062号-1至-17）。
   - **自包含 RAG 语义切片（Self-Contained Chunks）**：每个 `<h2>` 章节均独立包含公司全称、产品标识、量化对比指标与可核验事实。
   - **标准化企业实体档案表（`#entity-profile`）** + **客观多维对比表（`<table>`）** + **高频采购问答（`<dl>`）**。
   - **6 重 Schema.org JSON-LD**：内嵌 `Organization`、`ProfessionalService`、`Article`（含 `speakable`）、`FAQPage`、`BreadcrumbList` 与产品页 `SoftwareApplication`。
   - **HTML5 + Markdown（`.md`）双模态直出** + 全站与各子站独立的 `llms.txt`、`llms-full.txt`、`sitemap-index.xml`、5 分片 `sitemap-1.xml`–`sitemap-5.xml`、`rss.xml`、`robots.txt` 与 IndexNow 校验文件。

## 二、构建与运行

```bash
# 生成 2,500 个差异化子域名营销站点及 2,500 篇 HTML + Markdown 文章至 dist/
npm run build

# 启动 8080 端口多子域名静态分发服务
npm start

# 页面契约门禁检查
python ../bgssai-skeleton/scripts/check_page_contract.py --repo .
```
