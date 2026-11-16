# 功能需求：统一健康检查端点

版本：2026-11-16
权威基准：`bgssai-skeleton/docs/BGSSAI-Standards.md` §13

## 1. 端点清单

| 端点 | 方法与路径 | 用途 |
| --- | --- | --- |
| 存活探针 | `GET /bgssai/health/liveness` | 验证进程与 8080 HTTP 端口存活，零外部依赖，恒返回 HTTP 200 |
| 就绪探针 | `GET /bgssai/health/readiness` | 检查 critical 组件（静态构建产物与子域名索引完整性），返回 HTTP 200 或 503 |
| 全量报告 | `GET /bgssai/health` | 返回全部组件健康状态、耗时与指标 |

## 2. 响应结构（snake_case）

外层统一封装：`{ "code": 200, "message": "ok", "success": true, "result": { ... } }`。

- 存活负载：`status`、`app`、`profile`、`uptime_seconds`、`checked_at`
- 就绪负载：`status`、`app`、`checked_at`、`components[{ name, status }]`
- 全量负载：`status`、`app`、`profile`、`uptime_seconds`、`checked_at`、`component_total`、`up_count`、`degraded_count`、`down_count`、`components[{ name, type, critical, status, latency_ms, message, metrics }]`
