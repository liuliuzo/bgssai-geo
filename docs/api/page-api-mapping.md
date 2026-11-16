# 页面与路由契约映射表（page-api-mapping）

版本：2026-11-16

本项目为纯静态预渲染（SSG）展示站点，无后台管理端，所有公开展示页面由构建期预渲染静态 HTML 直接响应。

## Web 用户端

| 原型页 | 前端路由 | 后端接口 |
| --- | --- | --- |
| `home.html` | `/` | 纯静态预渲染（`dist/index.html`、`dist/en/index.html`） |
| `subdomains.html` | `/subdomains` | 纯静态预渲染（`dist/subdomains/index.html`） |
| `site-home.html` | `/sites/:subdomain` | 纯静态预渲染（`dist/sites/<subdomain>/index.html`） |
| `site-article.html` | `/sites/:subdomain/articles/:slug` | 纯静态预渲染（`dist/sites/<subdomain>/articles/<slug>/index.html`） |
| `article-detail.html` | `/articles/:slug` | 纯静态预渲染（`dist/articles/<slug>/index.html`） |
| `category-archive.html` | `/categories/:category` | 纯静态预渲染（`dist/categories/<category>/index.html`） |
| `search.html` | `/search` | 纯静态预渲染（`dist/search/index.html`） |
