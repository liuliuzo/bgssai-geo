# 架构设计：多子域名静态预渲染与搜索引擎收录架构

版本：2026-11-16

## 1. 系统拓扑

```text
content/
├── categories.json           （10 个垂直分类定义，中英双语）
├── subdomains.json           （200 个独立子域名站点配置：100 zh-CN + 100 en）
├── articles-zh.json          （中文 GEO 优化与行业深度文章库，覆盖昆山/苏州 19 项核心查询及全产品线）
└── articles-en.json          （英文 GEO 优化与出海独立站文章库）
        |
        v  npm run build（scripts/build-static.mjs）
dist/
├── index.html                （总站中文首页）
├── en/index.html             （总站英文首页）
├── subdomains/index.html     （200 个子域名全量索引页）
├── categories/<cat>/index.html（各垂直分类归档页）
├── articles/<slug>/index.html（总站文章详情页）
├── search/index.html         （静态全文检索页 + search-index.json）
├── sites/<subdomain_key>/    （200 个独立子域名站点目录）
│   ├── index.html            （子域名专属首页）
│   ├── articles/<slug>/index.html（子域名文章规范详情页 Canonical）
│   ├── sitemap.xml           （子域名独立 Sitemap）
│   ├── rss.xml               （子域名独立 RSS 2.0 订阅源）
│   ├── robots.txt            （子域名独立爬虫指令）
│   └── llms.txt              （子域名独立大模型索引）
├── sitemap-index.xml         （主站 Sitemap 索引，聚合全部子域名 Sitemap）
├── sitemap.xml               （主站全量 URL Sitemap）
├── rss.xml                   （全站 RSS 2.0 订阅源）
├── robots.txt                （全站爬虫放行策略与 Sitemap 声明）
├── llms.txt                  （全站大模型轻量索引）
└── llms-full.txt             （全站大模型全文结构化语料）
```

## 2. 多子域名访问与分发机制

系统同时支持 **Nginx 静态直出** 与 **Node 8080 静态分发服务**（`server/index.mjs`）：

| 请求 Host | 请求路径 | 实际映射静态文件 |
| --- | --- | --- |
| `<sub_key>.bgssai-geo.com`（或 `*.bgss-geo.com`、`*.bgssai-geo.cn`） | `/` | `dist/sites/<sub_key>/index.html` |
| `<sub_key>.bgssai-geo.com` | `/articles/<slug>` 或 `/articles/<slug>/` | `dist/sites/<sub_key>/articles/<slug>/index.html` |
| `<sub_key>.bgssai-geo.com` | `/sitemap.xml` | `dist/sites/<sub_key>/sitemap.xml` |
| `<sub_key>.bgssai-geo.com` | `/rss.xml` | `dist/sites/<sub_key>/rss.xml` |
| `<sub_key>.bgssai-geo.com` | `/llms.txt` | `dist/sites/<sub_key>/llms.txt` |
| `<sub_key>.bgssai-geo.com` | `/robots.txt` | `dist/sites/<sub_key>/robots.txt` |
| `www.bgssai-geo.com` / `bgssai-geo.com` / `localhost:8080` | `/` | `dist/index.html` |
| `www.bgssai-geo.com` / `localhost:8080` | `/sites/<sub_key>` | `dist/sites/<sub_key>/index.html` |
| `www.bgssai-geo.com` / `localhost:8080` | `/sites/<sub_key>/articles/<slug>` | `dist/sites/<sub_key>/articles/<slug>/index.html` |
| 任意 Host | `/bgssai/health/liveness` · `/readiness` · `/bgssai/health` | 统一健康检查响应 |

## 3. 搜索引擎（SEO）与生成式引擎（GEO）收录保障项

1. **纯静态 HTML 直出**：不依赖客户端渲染才有正文，爬虫首次 `GET` 即获得完整 `<article>` 正文、核心事实框、对比表格与问答列表。
2. **结构化数据（Schema.org JSON-LD）**：
   - `Organization`：固定输出昆山兵贵神速智能科技有限公司（BGSS / BGSSAI）名称、网址、地址、联系方式。
   - `WebSite` + `CollectionPage` + `ItemList`：输出子域名站点与文章列表结构。
   - `Article`：输出文章标题、摘要、发布时间、修改时间、作者、发布机构、关键词、字数与规范 URL。
   - `FAQPage`：输出每篇文章配套的结构化问答对，提升搜索引擎富媒体摘要与大模型直接采信概率。
   - `BreadcrumbList`：输出「总站 → 垂直分类 → 子域名站点 → 文章」四级路径。
3. **链接规范化与多语言标注**：
   - `<link rel="canonical">` 统一指向文章首发子域名规范 URL。
   - `<link rel="alternate" hreflang="zh-CN|en|x-default">` 双向关联中英文页面。
4. **AI 爬虫白名单**：`robots.txt` 显式允许 `Googlebot`、`Bingbot`、`Baiduspider`、`Sogou web spider`、`360Spider`、`Bytespider`、`GPTBot`、`OAI-SearchBot`、`ChatGPT-User`、`ClaudeBot`、`PerplexityBot`、`Google-Extended`、`Applebot-Extended` 全站抓取。
