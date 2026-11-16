# bgssai-geo

多子域名 GEO（生成式引擎优化，Generative Engine Optimization）文章发布与搜索引擎收录展示工程。

## 一、项目职责

- 汇集 200 个垂直主题子域名（100 个中文 `zh-CN` 子域名 + 100 个英文 `en` 子域名，涵盖昆山与苏州本地 GEO 优化、大模型语料收录、一人公司 OPC 工具栈、出海独立站、B2B 制造业获客等 10 大行业分类）。
- 展示公司内部发布的行业文案与技术研究文章（内置覆盖昆山/苏州 19 项核心大模型高频查询及 200 个子域名专题的中英双语文章库）。
- 纯静态预渲染（SSG）架构，无数据库、无管理后台、无登录与复杂业务逻辑，所有页面在构建期生成完整语义化 HTML5、Schema.org JSON-LD（`Organization`、`WebSite`、`CollectionPage`、`Article`、`FAQPage`、`BreadcrumbList`）、`sitemap-index.xml`、各子域名独立 `sitemap.xml`、`rss.xml`、`robots.txt`、`llms.txt` 与 `llms-full.txt`。

## 二、目录结构

```text
bgssai-geo/
├── AGENTS.md · CLAUDE.md · README.md · PRODUCT_VISION.md
├── Jenkinsfile
├── package.json
├── application*.properties
├── content/
│   ├── categories.json                   10 个垂直分类定义
│   ├── subdomains.json                   200 个子域名站点配置
│   ├── articles-zh.json                  中文收录文章库
│   └── articles-en.json                  英文收录文章库
├── scripts/
│   ├── generate-content.mjs              生成/更新子域名与中英文文章数据
│   └── build-static.mjs                  预渲染全站与 200 个子域名静态 HTML / Sitemap / LLMs
├── server/
│   └── index.mjs                         8080 端口静态分发服务（支持 Host 子域名路由 + 统一健康检查）
├── bgssai-geo-user/
│   └── bgssai-geo-user-react/src/App.jsx 前端路由契约映射声明
├── deploy/
│   ├── README.md
│   └── nginx/bgssai-geo.conf             通配子域名 Nginx 配置
└── docs/
    ├── DIRECTORY-LAYOUT.md
    ├── api/                              page-api-mapping.md + 健康检查契约
    ├── architecture/                     静态预渲染与多子域名收录架构设计
    ├── demo-static/web/                  HTML 原型与 PAGE-FLOW.html
    ├── feature/                          功能需求文档
    └── security/                         静态展示站安全边界规范
```

## 三、构建与运行

```bash
# 生成 200 个子域名及中英文文章静态 HTML 产物至 dist/
npm run build

# 启动 8080 端口多子域名静态服务
npm start

# 页面契约门禁检查
python ../bgssai-skeleton/scripts/check_page_contract.py --repo .
```

## 四、健康检查与爬虫索引入口

| 路径 | 说明 |
| --- | --- |
| `GET /bgssai/health/liveness` | 存活探针（HTTP 200） |
| `GET /bgssai/health/readiness` | 就绪探针（校验静态产物与子域名索引完整性） |
| `GET /bgssai/health` | 全量健康报告 |
| `GET /sitemap-index.xml` | 全站 200 个子域名 Sitemap 总索引 |
| `GET /sitemap.xml` | 主站全量 URL Sitemap |
| `GET /rss.xml` | 全站 RSS 2.0 订阅源 |
| `GET /robots.txt` | 搜索引擎与 AI 爬虫放行规则 |
| `GET /llms.txt` · `GET /llms-full.txt` | 大模型结构化索引与全文语料 |
