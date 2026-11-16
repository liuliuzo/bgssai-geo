# 功能需求：多子域名 GEO 文章矩阵与搜索引擎收录系统

版本：2026-11-16

## 1. 功能边界

本系统为纯静态预渲染（SSG）的多子域名文章发布与展示工程，无数据库、无后台管理端、无用户登录及业务交易逻辑。

| 模块 | 职责 |
| --- | --- |
| 总站导航首页（Hub Home） | 展示全站分类导航、精选子域名入口、最新发布的内部文章列表、中英文语言切换 |
| 子域名矩阵目录页（Subdomain Directory） | 按 10 个行业垂直分类展示全部 200+ 个子域名站点，支持按语言、分类与关键词筛选 |
| 子域名独立站点首页（Subdomain Site Home） | 按访问的子域名（或 `/sites/:subdomain` 路径）展示该子域名专属站点标题、主题简介、下属文章列表、关联子域名及独立 Sitemap/RSS/LLMs 入口 |
| 文章详情页（Article Detail） | 展示完整文章正文、发布与更新时间、核心事实摘要、数据对比表、FAQ 问答列表、标签、面包屑导航、同子域名相关文章、中英对照链接 |
| 分类归档页（Category Archive） | 按垂直领域分类汇总子域名与文章列表 |
| 站内检索页（Article Search） | 支持按关键词、语言、垂直分类、子域名检索全站文章与子域名 |
| 搜索引擎与 AI 索引产物 | 构建期静态输出 `sitemap-index.xml`、`sitemap.xml`、各子域名 `sitemap.xml`、`rss.xml`、`robots.txt`、`llms.txt`、`llms-full.txt` |

## 2. 页面路由与静态文件路径契约

| 页面名称 | 原型文件 | 前端路由 | 预渲染静态 HTML 路径 |
| --- | --- | --- | --- |
| 总站首页 | `home.html` | `/` | `dist/index.html`、`dist/en/index.html` |
| 子域名矩阵目录 | `subdomains.html` | `/subdomains` | `dist/subdomains/index.html` |
| 子域名独立站点首页 | `site-home.html` | `/sites/:subdomain` | `dist/sites/<subdomain>/index.html` |
| 子域名文章详情页 | `site-article.html` | `/sites/:subdomain/articles/:slug` | `dist/sites/<subdomain>/articles/<slug>/index.html` |
| 总站文章详情页 | `article-detail.html` | `/articles/:slug` | `dist/articles/<slug>/index.html` |
| 垂直分类归档页 | `category-archive.html` | `/categories/:category` | `dist/categories/<category>/index.html` |
| 站内检索页 | `search.html` | `/search` | `dist/search/index.html` |

## 3. 数据结构定义（snake_case）

### 3.1 垂直分类对象（`category_item`）

| 字段名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `category_code` | string | 是 | 分类唯一标识（如 `opc-suite`、`global-marketing`、`ai-coding`） |
| `name_zh` | string | 是 | 中文分类名 |
| `name_en` | string | 是 | 英文分类名 |
| `subdomain_count` | integer | 是 | 归属子域名数量 |
| `article_count` | integer | 是 | 归属文章数量 |

### 3.2 子域名站点配置对象（`subdomain_site`）

| 字段名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `subdomain_key` | string | 是 | 子域名前缀（如 `opc-tools`、`ai-seo-guide`），匹配 `[a-z0-9-]+` |
| `full_domain` | string | 是 | 完整默认主机名（如 `opc-tools.bgssai-geo.com`） |
| `site_name` | string | 是 | 子域名站点名称 |
| `site_tagline` | string | 是 | 站点核心主题词 |
| `site_description` | string | 是 | 站点 SEO 描述（用于 meta description 与 JSON-LD） |
| `category_code` | string | 是 | 所属行业分类标识 |
| `lang` | string | 是 | 站点主语言：`zh-CN` 或 `en` |
| `keywords` | string[] | 是 | 站点核心关键词数组 |
| `article_count` | integer | 是 | 该子域名下发布的文章数 |
| `updated_at` | string | 是 | 最近更新日期（`YYYY-MM-DD`） |

### 3.3 文章对象（`article_item`）

| 字段名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `article_id` | string | 是 | 文章唯一标识 |
| `slug` | string | 是 | URL 路径标识（kebab-case） |
| `subdomain_key` | string | 是 | 首发归属子域名标识 |
| `related_subdomains` | string[] | 是 | 关联分发子域名标识列表 |
| `category_code` | string | 是 | 所属垂直分类标识 |
| `lang` | string | 是 | 文章语言：`zh-CN` 或 `en` |
| `alternate_slug` | string | 否 | 对应另一语言版本的文章 `slug`（用于生成 `hreflang`） |
| `title` | string | 是 | 文章标题（`<h1>` 与 `<title>`） |
| `summary` | string | 是 | 文章摘要（用于列表展示、`meta description` 与 `llms.txt`） |
| `author_name` | string | 是 | 发布署名（如 `BGSSAI Research`） |
| `published_at` | string | 是 | 发布日期（`YYYY-MM-DD`） |
| `updated_at` | string | 是 | 更新日期（`YYYY-MM-DD`） |
| `reading_minutes` | integer | 是 | 预计阅读分钟数 |
| `word_count` | integer | 是 | 字数统计 |
| `keywords` | string[] | 是 | 关键词标签数组 |
| `key_facts` | string[] | 是 | 核心结论与可引用事实条目（供搜索引擎摘要与大模型引用提取） |
| `comparison_table` | object | 否 | 结构化对比表（含 `headers` 数组与 `rows` 二维数组） |
| `sections` | object[] | 是 | 正文小节数组，每项含 `heading` 与 `paragraphs` 数组 |
| `faq_items` | object[] | 是 | 结构化问答数组，每项含 `question` 与 `answer`（同步输出 `FAQPage` JSON-LD） |

## 4. 搜索引擎与 AI 爬虫收录规则

1. **零 JS 首屏直出**：所有页面在构建阶段输出完整静态 HTML 文件，正文、标题、面包屑、相关链接、表格和问答均在服务端静态 HTML 中直接存在，不依赖客户端异步请求拉取。
2. **子域名 Host 自动分流**：
   - 当访问主机名为 `<subdomain_key>.bgssai-geo.com`（或 `*.bgss-geo.com`、`*.bgssai-geo.cn`）时，根路径 `/` 直接返回 `dist/sites/<subdomain_key>/index.html`，文章路径 `/articles/<slug>` 返回 `dist/sites/<subdomain_key>/articles/<slug>/index.html`，`/sitemap.xml` 返回该子域名专属 Sitemap。
   - 当访问主域名 `www.bgssai-geo.com` 或本地 `localhost:8080` 时，根路径 `/` 返回总站导航，同时可通过 `/sites/<subdomain_key>` 直接访问任意子域名站点页面，确保单域名与多子域名双路径均可被爬虫完整遍历。
3. **Canonical 与 Hreflang 规则**：
   - 每篇文章固定唯一 Canonical URL 为其归属子域名地址 `https://<subdomain_key>.bgssai-geo.com/articles/<slug>/`。
   - 配有中英文对照版本的页面输出 `hreflang="zh-CN"`、`hreflang="en"` 与 `hreflang="x-default"`。
4. **JSON-LD 结构化数据**：
   - 文章页必须输出合法的 `Article`、`FAQPage` 与 `BreadcrumbList` 三组 JSON-LD。
   - 站点首页与目录页必须输出 `WebSite`、`Organization`、`CollectionPage` 与 `ItemList` JSON-LD。
5. **爬虫索引文件**：
   - `robots.txt` 显式声明 `Allow: /` 并指定 `Sitemap` 地址。
   - `sitemap-index.xml` 汇总全部子站点 Sitemap；每个子站点独立生成 `sitemap.xml` 与 `rss.xml`。
   - `llms.txt` 与 `llms-full.txt` 提供全站子域名清单、文章结构化索引与核心事实正文。

## 5. 验收标准

1. 运行构建脚本后，`dist/` 生成不少于 200 个独立子域名站点静态目录（`dist/sites/<subdomain_key>/index.html`、`sitemap.xml`、`rss.xml`、`llms.txt`）及全量中英文文章静态 HTML 页面。
2. 任一文章静态 HTML 源码内直接包含 `<h1>`、`<article>`、`<meta name="description">`、`<link rel="canonical">`、`application/ld+json`（含 `Article`、`FAQPage`、`BreadcrumbList`）。
3. 静态站点服务监听 `8080` 端口，支持 `Host` 头子域名路由与 `/sites/<subdomain_key>` 路径路由，且 `GET /bgssai/health/liveness`、`GET /bgssai/health/readiness`、`GET /bgssai/health` 按规范返回 200。
4. 页面契约检查 `python ../bgssai-skeleton/scripts/check_page_contract.py --repo .` 通过。
