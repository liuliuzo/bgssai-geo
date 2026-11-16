# 健康检查接口契约

版本：2026-11-16
权威基准：`bgssai-skeleton/docs/BGSSAI-Standards.md` §13

## 1. 端点列表

| 端点 | 方法 | 路径 | 鉴权 |
| --- | --- | --- | --- |
| 存活探针 | `GET` | `/bgssai/health/liveness` | 公开 |
| 就绪探针 | `GET` | `/bgssai/health/readiness` | 公开 |
| 全量报告 | `GET` | `/bgssai/health` | 公开 |

## 2. 响应格式

### 2.1 `GET /bgssai/health/liveness`

```json
{
  "code": 200,
  "message": "ok",
  "success": true,
  "result": {
    "status": "UP",
    "app": "bgssai-geo",
    "profile": "prod",
    "uptime_seconds": 120,
    "checked_at": "2026-11-16 12:00:00"
  }
}
```

### 2.2 `GET /bgssai/health/readiness`

```json
{
  "code": 200,
  "message": "ok",
  "success": true,
  "result": {
    "status": "UP",
    "app": "bgssai-geo",
    "checked_at": "2026-11-16 12:00:00",
    "components": [
      { "name": "static_bundle", "status": "UP" },
      { "name": "subdomain_index", "status": "UP" }
    ]
  }
}
```

### 2.3 `GET /bgssai/health`

```json
{
  "code": 200,
  "message": "ok",
  "success": true,
  "result": {
    "status": "UP",
    "app": "bgssai-geo",
    "profile": "prod",
    "uptime_seconds": 120,
    "checked_at": "2026-11-16 12:00:00",
    "component_total": 4,
    "up_count": 4,
    "degraded_count": 0,
    "down_count": 0,
    "components": [
      {
        "name": "static_bundle",
        "type": "RUNTIME",
        "critical": true,
        "status": "UP",
        "latency_ms": 1,
        "message": "ok",
        "metrics": { "index_exists": "true", "sitemap_exists": "true" }
      },
      {
        "name": "subdomain_index",
        "type": "RUNTIME",
        "critical": true,
        "status": "UP",
        "latency_ms": 1,
        "message": "ok",
        "metrics": { "subdomain_count": "200", "article_count": "60" }
      },
      {
        "name": "jvm_memory",
        "type": "RUNTIME",
        "critical": false,
        "status": "UP",
        "latency_ms": 1,
        "message": "ok",
        "metrics": { "heap_used_mb": "24" }
      },
      {
        "name": "disk_space",
        "type": "RUNTIME",
        "critical": false,
        "status": "UP",
        "latency_ms": 1,
        "message": "ok",
        "metrics": { "free_mb": "10240" }
      }
    ]
  }
}
```
