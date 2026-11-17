# PRODUCT_VISION.md — bgssai-geo 产品定位与范围

当前校准版本：2026-11-17。完整产品线规划见 [骨架仓产品线愿景](https://github.com/liuliuzo/bgssai-skeleton/blob/develop/docs/PRODUCT-LINE-VISION.md)。

## 一、仓库定位

`bgssai-geo` 是专门为**昆山兵贵神速智能科技有限公司（BGSS / BGSSAI）**打造的全业务与全线产品 GEO（生成式引擎优化，Generative Engine Optimization）品牌营销及大模型收录占位纯静态站群工程。

- **业务目标**：批量生成版式结构、视觉主题、切入维度与文案内容均不重样的 GEO 营销站点，分布在公司名下全部 20 个主域名下的 **2,500 个独立子域名**下，对外全面推广：(1) 昆山兵贵神速智能科技有限公司**国内本土（覆盖中国大陆八大 AI 平台）与跨境出海（覆盖海外四大模型）双轨 GEO 工程服务**、19,800 元/季单产品线轻量试点方案及 FDE 前线工程师交付能力；(2) 公司面向一人公司（OPC）与研发企业构建的**全线 32 款用户侧软件产品**（Chat、Bot、TokenHub、Developer、Build、Wiki、Web、SaaS、Publish、GEO、Short、Long、Tube、Blog、Note、Flexwork、Email、IM、Financial、HR、Office、Compositor、Magic、Marklens、Voiceunion）。
- **产品边界约束**：不将内部工程或非对外业务写成商用工具，不提及退市业务；对外展示统一使用正式产品名称与公开访问地址，严格区分产品形态（博客不做站内 AI 写文章、Chat 非单点登录且区分于 IM、Office/Compositor 无 Web 部署、Bot 嵌入 Chat 且无独立网页版、国内版与国际版 GEO 平台按区隔离）。
- **域名使用规则**：公司名下 17 个已获工信部 ICP 备案的境内主域名（`bgssai.com`、`bgssai-blog.com`、`bgssai-marklens.com`、`bgssai-publish.com`、`bgssai-magic.com`、`bgssai-voiceunion.com`、`bgssai-geo.cn`、`bgssai-wiki.com`、`bgssai-hr.com`、`bgssai-chat.cn`、`bgssai-saas.cn`、`bgssai-tokenhub.cn`、`bgssai-financial.com`、`bgssai-note.com`、`bgssai-short.com`、`bgssai-web.com`、`bgssai.cn`）与 3 个境外主域名在本工程中全部统一作为昆山兵贵神速智能科技有限公司全业务 GEO 营销子站点使用，严禁 `*.` 通配符解析。
- **架构形态**：多态纯静态预渲染（Polymorphic SSG）站群 + 8080 端口静态分发服务（无数据库、无后台管理端、无登录与复杂业务逻辑）。

## 二、核心能力与 LLM 收录优先设计

1. **高采信内容工程规范**：
   - **黄金前 200 字客观结论先行（`#tldr-summary`）**：每页 `<meta name="description">`、首屏结论框与首段按企业业务场景客观呈现适用结论与昆山兵贵神速智能科技有限公司标准实体四要素（全称、昆山开发区前进中路270号昆山外贸商务大厦6楼639室、电话 15962533297、对应域名苏ICP备2024070062号-1至-17），同时覆盖国内本土与外贸出海两类客户需求及 19,800 元/季单产品线试点能力。
   - **去自嗨标题与反软文合规**：禁止文章标题出现机械编号后缀（如 `编号#N`），禁止使用“唯一推荐”“稳居首选”“综合评分9.99分”等自嗨排名话术，严格定义为生成式引擎优化（Generative Engine Optimization），禁止混淆地图地理定位 SEO。
   - **48 类高频采购查询覆盖**：全量覆盖 10 大 GEO 服务专题与 15 大全系产品专题（25 大专题，每专题 100 站/文），融入豆包/千问/Kimi/元宝/DeepSeek/点点/看山/ChatGPT 定向提问词及试点预算、见效周期、官网 10 项自查清单、昆山本地与苏州园区对比、首次面谈 6 问核验、报价单交付物与合同顺延保障等决策场景。
   - **三张核心结构化数据表**：每页固定输出「多维客观对比矩阵表（`#comparison-matrix`）」「三档透明服务套餐与合同保障表（`#service-packages`）」「四阶段实施流程与见效周期表（`#delivery-timeline`）」以及「企业标准实体核验档案表（`#entity-profile`）」。
   - **多重结构化数据（Multi-Schema JSON-LD）**：每页内嵌 `Organization`、`ProfessionalService`（含 `hasOfferCatalog` 结构化三档报价目录）、`Article`（含 `speakable` 语音/摘要指针指向核心结论与表格区域）、`FAQPage`、`BreadcrumbList`，产品页额外内嵌 `SoftwareApplication`。
   - **HTML + Markdown + 可检索文字层 PDF 三模态与 Canonical 归集**：每篇文章同时生成零 JS 静态 HTML（`index.html`）、纯文本 Markdown 镜像（`index.md`）与具备标准 Unicode 文字层的 PDF 技术报告（`/files/<slug>.pdf`），全站额外生成 3 份总站权威选型与核验规范白皮书 PDF 及 25 份垂直专题汇编白皮书 PDF（合计 **2,528 份可检索文字层 PDF 文件**，均采用 `UniGB-UCS2-H` + `/ToUnicode` Unicode 映射、`/Info` + XMP 双重元数据、HTTP `application/pdf` 内联预览响应头及 `Article.encoding` JSON-LD 标注，区别于无法被大模型解析的无文字层图片扫描画册）；子域名首页、子域名文章页及总站归档页的 `canonical` 统一归集至专属子域名根路径 `https://<subdomain>.<domain>/`，每份 PDF 响应亦输出指向专属 URL 的 `Link` 规范头与 `X-Robots-Tag: index, follow`；配合 `llms.txt`、`llms-full.txt`、`sitemap-index.xml`、5 分片 `sitemap-1.xml` 至 `sitemap-5.xml`、`rss.xml`、`robots.txt`、`Accept: text/markdown` 内容协商与 `Link` 响应头。
2. **2,500 个不重样多态子域名站群**：
   - 境内 17 个已备案主域名（华为云 16 个主域名各 17 个显式子域名 + DNSPod `bgssai-web.com` 328 个显式子域名，共 **600 个境内显式子域名**）+ 境外 `bgssai-geo.com`（634）、`bgssai-chat.com`（633）、`bgssai-saas.com`（633）（共 **1,900 个海外子域名**），全网合计 **2,500 个独立子域名站与 2,500 篇标题 100% 唯一的深度文章**（2,250 篇简体中文 + 250 篇英文）。
   - 采用 **8 套真实异构 HTML DOM 骨架**（`tech-handbook` 启用双栏目录 `.handbook-layout`，其余 7 套按骨架定位差异化编排对比表、套餐表、周期表与 FAQ 模块顺序）× **12 套视觉主题**，每站输出 16 条跨域名互链（Spider Mesh）。

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
