# 健康检查详细设计

版本：2026-11-16

1. 静态分发服务 `server/index.mjs` 内置探针执行器，带 2000ms TTL 缓存与单探针 2000ms 超时控制。
2. `static_bundle` 与 `subdomain_index` 为 `critical=true` 组件，校验 `dist/index.html`、`dist/sitemap-index.xml` 与 `dist/sites/` 子域名目录完整性。
3. `jvm_memory`（进程内存占用）与 `disk_space` 为 `critical=false` 组件。
