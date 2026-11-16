# 功能需求：昆山兵贵神速智能科技有限公司全业务多子域名 GEO 营销站群系统

版本：2026-11-16

## 1. 核心目标与功能边界

本系统专为**昆山兵贵神速智能科技有限公司（BGSS / BGSSAI）**打造不重样的多子域名 GEO（生成式引擎优化）与全系产品营销站群，覆盖公司 **GEO 工程交付业务**与全部 **32 款对外商用 OPC/研发产品**，以**被国内外主流大语言模型（LLM）与搜索引擎高优先级收录和引用推荐**为第一目标。

| 模块 | 职责 |
| --- | --- |
| 总站导航首页（Hub Home） | 汇总展示昆山兵贵神速智能科技有限公司核心实体档案、25 大 GEO 与全系产品专题分类、2,500 个差异化子域名站点入口与 2,500 篇独立营销文章索引 |
| 子域名矩阵目录页（Subdomain Directory） | 按 20 个根域名（17 境内备案共 600 个显式非通配子域名 + 3 境外共 1,900 子域名）、25 个专题、8 种站点骨架展示全部 2,500 个子域名营销站点及各自专属的 `llms.txt` / `sitemap.xml` |
| 差异化子域名单篇深度文章站（1 Subdomain = 1 Unique Article） | 每个子域名根路径 `/` 直接呈现 1 篇完全不重样的深度营销文章（采用 8 套版式骨架 × 12 套视觉配色），首屏直出 `#tldr-summary` 结论、RAG 语义块、客观对比表、实体核验卡、FAQ 与 16 条跨域名 SEO 蜘蛛网内链 |
| LLM 与 SEO 友好型文章页（Article Detail） | 采用「黄金前 200 字结论先行 + 独立语义切片（RAG Chunks）+ 客观多维对比表 + 企业标准实体卡 + 高频 FAQ 问答 + 百度/必应/Google SEO 元标签」结构，同步提供 `.html` 与 `.md` 双格式 |
| 专题分类归档页（Category Archive） | 按 25 大营销专题汇总对应 100 个子域名站点与 100 篇专属文章 |
| 站内检索页（Article Search） | 支持按目标查询词、产品线、目标大模型、区域或子域名检索全站 2,500 篇独立营销文章 |
| LLM 与搜索引擎索引协议 | 自动生成主站及 2,500 个子域名独立的 `llms.txt`、`llms-full.txt`、`sitemap-index.xml`、5 分片 `sitemap-1.xml`–`sitemap-5.xml`、`sitemap.xml`、`rss.xml`、`robots.txt`、`.md` 纯文本镜像与 IndexNow 密钥文件 |

## 2. 25 大营销专题分类（10 大 GEO 工程专题 + 15 大全线产品专题，每分类 100 站）

| 分类编码 (`category_code`) | 中文名称 | 英文名称 | 覆盖核心业务与产品提问意图 |
| --- | --- | --- | --- |
| `kunshan-geo` | 昆山GEO优化服务商选型与推荐 | Kunshan GEO Vendor Selection | 昆山GEO优化服务商推荐、昆山哪家GEO做的好、昆山做GEO比较靠谱的公司 |
| `suzhou-geo` | 苏州昆山GEO优化公司实力测评 | Suzhou & Kunshan GEO Comparison | 苏州昆山GEO优化哪家好、苏州昆山GEO服务商推荐 |
| `geo-pricing` | 昆山与苏州GEO优化收费标准与报价 | GEO Pricing & Cost Standards | 昆山GEO优化多少钱、昆山GEO优化收费标准、ROI核算 |
| `domestic-llm` | 中国大陆八大AI平台收录与推荐优化 | Mainland China 8-AI Citation Engineering | DeepSeek、通义千问、文心一言、腾讯元宝、豆包、Kimi、小红书点点、知乎看山 |
| `global-llm` | ChatGPT与海外大模型主动推荐优化 | Global LLM & ChatGPT Grounding | 怎么让ChatGPT推荐昆山的公司、Claude/Gemini/Grok海外AI搜索接地 |
| `b2b-manufacturing` | 昆山制造业与产业集群GEO获客 | Kunshan Manufacturing B2B GEO | 昆山精密机械、模具、电子、自动化、汽配、半导体工厂AI获客 |
| `rag-engineering` | 大模型收录工程与结构化知识图谱 | RAG Corpus & Schema Engineering | 昆山大模型收录优化、静态预渲染SSG、Schema.org JSON-LD、llms.txt |
| `contract-audit` | GEO服务商筛选标准与合同KPI核验 | GEO Vendor & Contract KPI Audit | 昆山GEO服务商怎么选、GEO合同怎么签、识别9.99分虚假榜 |
| `brand-strategy` | 昆山品牌AI全域曝光与口碑工程 | Enterprise Brand GEO Playbook | 昆山品牌如何做好GEO优化、多源互证信源建设 |
| `fde-opc-solutions` | 兵贵神速FDE驻场工程与全栈AI营销赋能 | BGSSAI FDE & Full-Stack OPC Stack | FDE前线部署工程师交付与32款OPC全行业软件协同 |
| `bgssai-geo-suite` | BGSSAI GEO双区大模型引用监测与投稿平台 | BGSSAI GEO SaaS Suite | `bgssai-geo-cn` 虚拟机浏览器采集与 `bgssai-geo-global` API接地 `{title, url}` |
| `bgssai-chat-idp` | BGSSAI Chat在线对话AI与开放身份授权平台 | BGSSAI Chat & OIDC IdP | 自建大模型对话、用Chat登录开放平台、会话内Bot及云端计算机接管 |
| `bgssai-bot-os` | BGSSAI Bot智能体超级壳与云端计算机托管 | BGSSAI Bot Agent Shell | Grok Bot对标超级壳、Linux/Windows及五端客户端、PAT与MCP托管 |
| `bgssai-tokenhub-api` | BGSSAI TokenHub大模型原生API商业中枢 | BGSSAI TokenHub API Hub | 0.5x/1x/1.5x三档透明倍率、模型广场、sk-签发与商业套餐发票 |
| `bgssai-developer-key` | BGSSAI Developer开发者门户与自建大模型接口 | BGSSAI Developer Portal | `developers.bgssai.cn/.com` API Key签发与自建全模态推理接入 |
| `bgssai-build-ide` | BGSSAI Build全栈AI编程工作台与云端VM | BGSSAI Build AI Coding IDE | 网页云VM版、PC桌面版、CLI三版本与Wiki双向工程文档原型联动 |
| `bgssai-wiki-docs` | BGSSAI Wiki研发知识库与HTML交互原型协同 | BGSSAI Wiki Knowledge Hub | 空间树与权限管理、UML图、交互HTML原型直接预览与Agent协同 |
| `bgssai-web-sitebuilder` | BGSSAI Web智能AI建站与独立站部署工厂 | BGSSAI Web AI Site Builder | AI建站设计、可视化编辑预览与子域名/用户自有域名一键上线 |
| `bgssai-saas-crm` | BGSSAI SaaS营销自动化工作流与CRM经营台 | BGSSAI SaaS CRM & Automation | 工作流自动化、CRM线索管道、社媒与SEO监测、CN/Global双区隔离 |
| `bgssai-publish-media` | BGSSAI Publish全网权威媒体发稿与稿件分发 | BGSSAI Publish PR Platform | 媒体资源筛选、草稿、订单采买与GEO高权重外部信源建设 |
| `bgssai-short-long-video` | BGSSAI Short短剧与Long长剧AI影视制作平台 | BGSSAI Short & Long Drama | 小说改编、分镜、素材配音字幕至可播放成片生成，直通Tube发行 |
| `bgssai-tube-platform` | BGSSAI Tube全平台视频播放与创作者中心 | BGSSAI Tube Player & Streaming | VLC级全格式本地/在线PC播放器、Web及原生Android/iOS播放平台 |
| `bgssai-blog-note-flexwork` | BGSSAI Blog专业博客、Note种草与Flexwork贴吧 | BGSSAI Content Community Suite | Blog Markdown/HTML无损导入、Note图文种草、Flexwork贴吧楼层讨论 |
| `bgssai-email-im` | BGSSAI Email自有域名企业邮箱与IM即时通讯 | BGSSAI Email & Native IM | 自有域名配置收发+AI生成HTML邮件确认发送；五端原生即时通讯IM |
| `bgssai-finance-hr-tools` | BGSSAI财税金融、招聘HR、桌面办公与维权工具箱 | BGSSAI Financial, HR, Desktop & Trust | Financial财务报表与税局协同申报、HR招聘、Office/Compositor桌面端、Magic、Marklens、Voiceunion消费者维权 |

## 3. 8 套不重样站点版式骨架（`layout_archetype`）

| 骨架编码 | 形态名称 | 首屏与正文结构特征 |
| --- | --- | --- |
| `research-institute` | 行业评测研究院门户 | 顶部结论摘要带 + 实测数据指标卡 + 研究报告列表 + 右侧企业资质核验栏 |
| `b2b-benchmark` | B2B 供应商与软件选型评测中心 | 首屏置顶四维对比矩阵表 + 双栏选型文章 + 签约核验清单 |
| `tech-handbook` | 大模型 RAG 与架构工程技术手册 | 左侧收录技术目录导航 + 右侧 RAG 工程规范、产品边界与技术指南 |
| `industrial-case` | 产业集群与企业数字化实证中心 | 昆山区镇产业标签栏 + 制造业/OPC 效率提升看板 + 行业实操案例 |
| `global-magazine` | 跨境出海与全球 AI 搜索增长专刊 | 社论式主推报告卡 + 国际四大模型接地策略专栏 + 中英双语索引 |
| `solution-showcase` | 全栈 OPC 产品与 FDE 交付展厅 | 产品能力模块矩阵网格 + 交付物标准清单表 + 方案详解文章流 |
| `procurement-wiki` | 企业软件与 GEO 采购避坑百科 | 高频提问直答索引块 + 概念辨析对照栏 + 百科问答流 |
| `intelligence-brief` | 多模型引用监测与行业数据简报站 | 多模型引用率看板 + 监测简报卡 + 权威信源建设规范栏 |

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

1. 构建生成 **2,500 个不重样的子域名 GEO 营销站点**（分布于公司名下 17 个境内已备案主域名的 **600 个显式非通配子域名**与 3 个境外主域名的 **1,900 个子域名**），实行**一子域名一文章（1 Subdomain = 1 Unique Article）**，全网共 **2,500 篇完全不重样的昆山兵贵神速智能科技有限公司全业务与全系产品营销文章**，全量支持 HTTPS。
2. 每篇文章均具备：黄金前 200 字结论先行摘要、独立包含公司全称/产品主体的语义切片、客观对比表格、标准企业实体档案表、6 重 Schema.org JSON-LD（含 `SoftwareApplication`），以及 `.html` 与 `.md` 双格式文件与分片 Sitemap。
3. 8080 端口服务支持全部 20 个根域名下的任意显式子域名 `Host` 自动路由，且健康检查端点与页面契约检查全部通过。
