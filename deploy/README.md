# 部署说明（bgssai-geo-task）

1. **构建静态产物**：
   ```bash
   npm run build
   ```
   产出位于 `dist/`（含 2,500 个独立子域名站点目录 `dist/sites/<subdomain_key>/`、全站 2,500 篇中英文文章静态 HTML + `.md`、`sitemap-index.xml`、5 分片 `sitemap-1.xml`–`sitemap-5.xml`、`sitemap.xml`、`rss.xml`、`robots.txt`、`llms.txt`、`llms-full.txt` 与 IndexNow 校验文件），同时生成零通配符显式 `server_name` 配置 `deploy/nginx/bgssai-geo.conf`。
2. **启动 8080 静态分发服务**：
   ```bash
   npm start
   ```
3. **部署通道**：统一走 Jenkins（`Jenkinsfile`，调用共享库 `bgssaiDeployNodeService`，端口 `8080`，健康检查路径 `/bgssai/health/readiness`）。`dev` 与 `prod` 均从 `bgssai-geo-task` 拉取 `develop` 分支，分别使用 `application-dev.properties` 和 `application-prod.properties`。Jenkins 产品键 `geo` 对应现有主机清单与 systemd 服务。
