# 页面与路由契约映射表（page-api-mapping）

版本：2026-11-18

本项目为纯静态预渲染（SSG）展示站点，无后台管理端，所有公开展示页面由构建期预渲染静态 HTML、Markdown 镜像与可检索文字层 PDF 文件（`/files/*.pdf`）直接响应。`server/index.mjs` 仅接受 `GET` 与 `HEAD` 请求；当请求头 `Accept` 包含 `text/markdown` 且不含 `text/html` 时，文章与子站根路径优先返回同目录 `index.md`（`text/markdown; charset=utf-8`），HTML 响应附带 `Link`（`.md`、对应 `.pdf` 报告与 `llms.txt`）、`Vary: Host, Accept` 与 `Last-Modified` 响应头；`/files/*.pdf` 返回 `application/pdf`、`Content-Disposition: inline`、`X-Robots-Tag: index, follow, max-snippet:-1` 及 `Link` canonical 响应头。

采购主问沿用现有文章地址，按标题可在 `/search/` 检索，主问与追问可在文章正文及下载版本中阅读。

## Web 用户端

| 原型页 | 前端路由 | 后端接口 |
| --- | --- | --- |
| `home.html` | `/` | 纯静态预渲染（`dist/index.html`、`dist/en/index.html`、`dist/files/bgssai-*.pdf`） |
| `subdomains.html` | `/subdomains` | 纯静态预渲染（`dist/subdomains/index.html`） |
| `site-home.html` | `/sites/:subdomain` | 纯静态预渲染（`dist/sites/<subdomain>/index.html`、`dist/files/<slug>.pdf`） |
| `site-article.html` | `/sites/:subdomain/articles/:slug` | 纯静态预渲染（`dist/sites/<subdomain>/articles/<slug>/index.html`、`dist/files/<slug>.pdf`） |
| `article-detail.html` | `/articles/:slug` | 纯静态预渲染（`dist/articles/<slug>/index.html`、`dist/files/<slug>.pdf`） |
| `category-archive.html` | `/categories/:category` | 纯静态预渲染（`dist/categories/<category>/index.html`、`dist/files/category-<category>-guide-2026.pdf`） |
| `search.html` | `/search` | 纯静态预渲染（`dist/search/index.html`） |
