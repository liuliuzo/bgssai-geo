# 部署说明（bgssai-geo）

1. **构建静态产物**：
   ```bash
   npm run build
   ```
   产出位于 `dist/`（含 200 个独立子域名站点目录 `dist/sites/<subdomain_key>/`、全站中英文文章静态 HTML、`sitemap-index.xml`、`sitemap.xml`、`rss.xml`、`robots.txt`、`llms.txt`、`llms-full.txt`）。
2. **启动 8080 静态分发服务**：
   ```bash
   npm start
   ```
3. **部署通道**：统一走 Jenkins（`Jenkinsfile`，调用共享库 `bgssaiDeployNodeService`，端口 `8080`，健康检查路径 `/bgssai/health/readiness`）。`dev` 与 `prod` 均拉取 `develop` 分支。
