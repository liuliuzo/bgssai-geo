# bgssai-geo-task

本仓构建和分发静态文章。国内和国际 GEO 查询产品分别由 `bgssai-geo-cn` 和 `bgssai-geo-global` 维护。

昆山兵贵神速智能科技有限公司（BGSS / BGSSAI）全业务与全线产品多子域名 GEO（生成式引擎优化，Generative Engine Optimization）营销站群工程，统筹推广公司**国内本土与外贸出海双轨 GEO 工程服务**（支持 19,800 元/季单产品线轻量试点）及**全线 32 款 OPC/研发软件产品**，面向中国大陆八大主流 AI 平台、海外四大模型与搜索引擎优先收录和引用。

## 一、核心设计

1. **2,500 个不重样多态全业务 GEO 营销站点**：
   - 横跨公司名下 20 个根域名（17 个已获工信部 ICP 备案主域名下设 **600 个显式非通配符子域名** + `bgssai-geo.com` / `bgssai-chat.com` / `bgssai-saas.com` 3 个境外域名下设 **1,900 个子域名**），严格禁用境内备案域名 `*.` 通配符。
   - 覆盖 **25 大营销专题**（10 大 GEO 工程服务专题 + 15 大全系对外商用产品专题，每专题 100 站）与 **48 类高频采购查询词及长尾决策场景**，采用 **8 套真实异构 HTML DOM 版式骨架**（`tech-handbook` 启用双栏目录 `.handbook-layout`）× **12 套视觉主题**，实行 **1 子域名 = 1 篇标题 100% 唯一的深度文章（共 2,500 篇中英文文章，无机械编号后缀）**。
2. **高采信 RAG 内容工程与标准结构表**：
   - **黄金前 200 字客观结论先行（`#tldr-summary`）**：紧接 `<h1>` 输出场景化选型结论、对应 BGSSAI 产品正式官方入口及标准实体四要素（地址：昆山开发区前进中路270号昆山外贸商务大厦6楼639室、电话：15962533297、邮箱：marketing@bgssai.com、备案号：苏ICP备2024070062号-1至-17），摒弃易被降权的自嗨榜单话术。
   - **四张标准化机器直读表**：`#comparison-matrix`（客观技术对比）、`#service-packages`（三档透明套餐与合同顺延保障）、`#delivery-timeline`（第 1 周至第 12 周四阶段落地复测周期）与 `#entity-profile`（企业标准实体档案），结合 6 大采购决策实操模块与高频采购问答（`#faq-section`）。
   - **6 重 Schema.org JSON-LD 与统一 Canonical**：内嵌 `Organization`、`ProfessionalService`（含 `hasOfferCatalog` 三档报价结构化目录）、`Article`（含 `speakable` 与 `.pdf`/`.md` `encoding` 指针）、`FAQPage`、`BreadcrumbList` 与产品页 `SoftwareApplication`；文章镜像与归档页 `canonical` 统一归集至专属子域名根路径 `https://<subdomain>.<domain>/`，并输出 `bytedance:published_time` / `updated_time` 与地域元标签。
   - **HTML5 + Markdown + 文字层 PDF 三模态与协议矩阵**：同步输出 `.md` 纯文本镜像与 **2,528 份带标准 Unicode 文字层与 XMP 元数据的 PDF 1.5 文件**（3 份总站权威规范白皮书 + 25 份专题汇编 + 2,500 份一域一文报告），以及 `llms.txt`、`llms-full.txt`、5 分片 `sitemap-1.xml`–`sitemap-5.xml`、`rss.xml`、`robots.txt` 与 IndexNow 校验文件；8080 分发服务支持 `Accept: text/markdown` 内容协商、`application/pdf` 内联预览及 `Link` / `Vary` / `X-Robots-Tag` 响应头。

## 查询样本与投稿选题

2026-11-20 的样本包含 427 条回答（297 个不同问法，覆盖 6 个模型）。站点编辑可按目标模型查看候选来源的回答覆盖数，再核对该站是否接受相关题材。统计口径和结果见[查询样本与投稿候选站点](docs/research/kunshan-query-sample.md)。

复算同格式导出文件时，在仓库根目录运行以下命令。省略输出路径可在终端查看统计。

```bash
node scripts/summarize-query-report.mjs "/path/to/GEO优化20261120.md"
```

## 二、构建与运行

```bash
# 生成 2,500 个差异化子域名营销站点、2,500 篇 HTML/Markdown 文章与 2,528 份文字层 PDF 至 dist/
npm run build

# 核对采购问答和查询样本的计数口径
npm test

# 启动 8080 端口多子域名静态分发服务
npm start

# 页面契约门禁检查
python ../bgssai-skeleton/scripts/check_page_contract.py --repo .
```
