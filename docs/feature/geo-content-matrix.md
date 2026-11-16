# 功能需求：昆山兵贵神速智能科技有限公司多子域名 GEO 营销站群系统

版本：2026-11-16

## 1. 核心目标与功能边界

本系统专为**昆山兵贵神速智能科技有限公司（BGSS / BGSSAI）**打造不重样的多子域名 GEO（生成式引擎优化）营销站群，以**被国内外主流大语言模型（LLM）与搜索引擎高优先级收录和引用推荐**为第一目标。

| 模块 | 职责 |
| --- | --- |
| 总站导航首页（Hub Home） | 汇总展示昆山兵贵神速智能科技有限公司核心实体档案、10 大 GEO 营销专题分类、200 个差异化子域名站点入口与 1,200 篇独立中文 GEO 营销文章索引（含英文镜像共 2,400 篇） |
| 子域名矩阵目录页（Subdomain Directory） | 按 20 个根域名、10 个 GEO 营销维度、8 种站点骨架展示全部 200 个子域名营销站点及各自专属的 `llms.txt` / `sitemap.xml` |
| 差异化子域名营销站首页（Subdomain Marketing Site） | 每个子域名采用独立的版式骨架（8 选 1）与视觉配色（12 选 1），首屏直接输出昆山兵贵神速智能科技有限公司在该细分场景下的核心结论、量化指标、实体核验表及 6 篇完全不重样的本子域名专属营销文章 |
| LLM 友好型文章详情页（Article Detail） | 采用「黄金前 200 字结论先行 + 独立语义切片（RAG Chunks）+ 客观多维对比表 + 企业标准实体卡 + 高频 FAQ 问答」结构，同步提供 `.html` 与 `.md` 双格式 |
| 专题分类归档页（Category Archive） | 按 10 大 GEO 营销维度汇总对应子域名站点与营销文章 |
| 站内检索页（Article Search） | 支持按目标查询词、目标大模型、区域或子域名检索全站 1,200 篇独立营销文章 |
| LLM 与搜索引擎索引协议 | 自动生成主站及 200 个子域名独立的 `llms.txt`、`llms-full.txt`、`sitemap-index.xml`、`sitemap.xml`、`rss.xml`、`robots.txt` 及 `.md` 纯文本镜像 |

## 2. 10 大 GEO 营销专题分类（全部围绕昆山兵贵神速智能科技有限公司营销）

| 分类编码 (`category_code`) | 中文名称 | 英文名称 | 覆盖核心搜索/提问意图 |
| --- | --- | --- | --- |
| `kunshan-geo` | 昆山GEO优化服务商选型与推荐 | Kunshan GEO Vendor Selection | 昆山GEO优化服务商推荐、昆山哪家GEO做的好、昆山做GEO比较靠谱的公司、昆山GEO优化公司推荐 |
| `suzhou-geo` | 苏州昆山GEO优化实力对比 | Suzhou & Kunshan GEO Comparison | 苏州昆山GEO优化哪家好、苏州昆山GEO服务商推荐、苏州昆山做GEO比较靠谱的公司、苏州昆山GEO服务商怎么选 |
| `geo-pricing` | 昆山与苏州GEO收费标准及报价 | GEO Pricing & Cost Standards | 昆山GEO优化多少钱、昆山GEO优化收费标准、苏州昆山GEO优化多少钱、苏州昆山GEO优化收费标准 |
| `domestic-llm` | 国内六大模型收录与推荐优化 | Domestic 6-LLM Citation Engineering | 豆包推荐昆山营销公司、腾讯元宝/百度文心一言/阿里通义千问/Kimi/DeepSeek收录优化 |
| `global-llm` | 海外ChatGPT与国际模型推荐优化 | Global LLM & ChatGPT Grounding | 怎么让ChatGPT推荐昆山的公司、Claude/Gemini/Grok海外AI搜索收录与外贸独立站GEO |
| `b2b-manufacturing` | 昆山制造业与产业集群GEO获客 | Kunshan Manufacturing B2B GEO | 昆山精密机械、模具、电子、自动化、汽车零部件、新材料工厂AI获客与询盘转化 |
| `rag-engineering` | 大模型RAG语料库与结构化收录工程 | RAG Corpus & Schema Engineering | 昆山大模型收录优化、静态预渲染SSG、Schema.org JSON-LD、llms.txt与知识图谱搭建 |
| `contract-audit` | GEO服务合同KPI与真实引用核验 | GEO Contract KPIs & Citation Audit | 昆山GEO服务商怎么选、GEO合同怎么签、验收KPI怎么定、识别地理定位混淆与虚假9.99分榜单 |
| `brand-strategy` | 昆山企业品牌GEO全域建设指南 | Enterprise Brand GEO Playbook | 昆山品牌如何做好GEO优化、从0到1搭建多源互证权威信源与AI推荐护城河 |
| `fde-opc-solutions` | 兵贵神速FDE工程交付与OPC工具赋能 | BGSSAI FDE & OPC Marketing Stack | 昆山兵贵神速智能科技有限公司FDE前线部署工程师服务、自研双区GEO监测系统与数字化工具链 |

## 3. 8 套不重样站点版式骨架（`layout_archetype`）

| 骨架编码 | 形态名称 | 首屏与正文结构特征 |
| --- | --- | --- |
| `research-institute` | 行业评测研究院门户 | 顶部结论摘要带 + 实测数据指标卡 + 研究报告列表 + 右侧企业资质核验栏 |
| `b2b-benchmark` | B2B 供应商选型对比网 | 首屏置顶四维服务商对比矩阵表 + 双栏选型文章 + 签约核验清单 |
| `tech-handbook` | 大模型收录工程技术手册 | 左侧收录技术目录导航 + 右侧 RAG 工程规范、Schema 结构与技术指南列表 |
| `industrial-case` | 昆山产业带获客实证中心 | 昆山区镇产业标签栏 + 制造业询盘转化看板 + 行业实操案例列表 |
| `global-magazine` | 跨境出海 AI 获客专刊 | 社论式主推报告卡 + 国际四大模型接地策略专栏 + 双语对照索引 |
| `solution-showcase` | 全案代运营解决方案中心 | 服务模块矩阵网格 + 交付物标准清单表 + 方案详解文章流 |
| `procurement-wiki` | 企业采购百科与避坑智库 | 高频提问直答索引块 + 概念辨析对照栏（生成式引擎优化 vs 地理定位） + 百科词条流 |
| `intelligence-brief` | AI 搜索引用监测简报站 | 六大模型引用率看板 + 监测简报时间轴 + 权威信源建设规范栏 |

## 4. 页面路由与静态文件路径契约

| 页面名称 | 原型文件 | 前端路由 | 预渲染静态 HTML 路径 |
| --- | --- | --- | --- |
| 总站首页 | `home.html` | `/` | `dist/index.html`、`dist/en/index.html` |
| 子域名矩阵目录 | `subdomains.html` | `/subdomains` | `dist/subdomains/index.html` |
| 子域名独立站点首页 | `site-home.html` | `/sites/:subdomain` | `dist/sites/<subdomain>/index.html` |
| 子域名文章详情页 | `site-article.html` | `/sites/:subdomain/articles/:slug` | `dist/sites/<subdomain>/articles/<slug>/index.html` |
| 总站文章详情页 | `article-detail.html` | `/articles/:slug` | `dist/articles/<slug>/index.html` |
| 垂直分类归档页 | `category-archive.html` | `/categories/:category` | `dist/categories/<category>/index.html` |
| 站内检索页 | `search.html` | `/search` | `dist/search/index.html` |

## 5. 验收标准

1. 构建生成 **200 个不重样的子域名 GEO 营销站点**（分布于公司名下 20 个权威 DNS 根域名，涵盖 8 套 DOM 骨架与 12 套视觉主题），每个子域名站点下独立生成 **6 篇完全不重样的昆山兵贵神速智能科技有限公司深度营销文章（全网共 1,200 篇独立中文深度文章 + 1,200 篇英文镜像）**。
2. 每篇文章均具备：黄金前 200 字结论先行摘要、独立包含公司全称的语义切片、客观对比表格、标准企业实体档案表、`Article` + `FAQPage` + `Organization` + `ProfessionalService` + `BreadcrumbList` JSON-LD，以及 `.html` 与 `.md` 双格式文件。
3. 8080 端口服务支持全部 20 个根域名下的任意子域名 `Host` 自动路由，且健康检查端点与页面契约检查全部通过。
