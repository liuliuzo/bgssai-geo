import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const CONTENT_DIR = path.join(ROOT_DIR, 'content');

const PORT = 8080;
const APP_NAME = 'bgssai-geo';
const PROFILE = process.env.SPRING_PROFILES_ACTIVE || process.env.APP_PROFILE || 'local';
const START_TIME = Date.now();
const CACHE_TTL_MS = 2000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

let knownSubdomains = new Set();
try {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, 'subdomains.json'), 'utf8');
  const parsed = JSON.parse(raw);
  knownSubdomains = new Set(parsed.map((item) => item.subdomain_key));
} catch (_) {
  knownSubdomains = new Set();
}

let readinessCache = { expiresAt: 0, payload: null, statusCode: 200 };
let fullHealthCache = { expiresAt: 0, payload: null, statusCode: 200 };

function formatTimestamp(date = new Date()) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function uptimeSeconds() {
  return Math.max(0, Math.floor((Date.now() - START_TIME) / 1000));
}

function checkComponents() {
  const t0 = Date.now();
  const indexExists = fs.existsSync(path.join(DIST_DIR, 'index.html'));
  const sitemapExists = fs.existsSync(path.join(DIST_DIR, 'sitemap-index.xml'));
  const staticStatus = indexExists && sitemapExists ? 'UP' : 'DOWN';
  const staticLatency = Math.max(1, Date.now() - t0);

  const t1 = Date.now();
  const sitesDir = path.join(DIST_DIR, 'sites');
  let siteCount = 0;
  if (fs.existsSync(sitesDir)) {
    siteCount = fs.readdirSync(sitesDir).length;
  }
  const subStatus = siteCount >= 100 ? 'UP' : 'DOWN';
  const subLatency = Math.max(1, Date.now() - t1);

  const memUsage = process.memoryUsage();
  const heapUsedMb = Math.round(memUsage.heapUsed / (1024 * 1024));

  return [
    {
      name: 'static_bundle',
      type: 'RUNTIME',
      critical: true,
      status: staticStatus,
      latency_ms: staticLatency,
      message: staticStatus === 'UP' ? 'ok' : 'FileNotFoundException',
      metrics: {
        index_exists: String(indexExists),
        sitemap_exists: String(sitemapExists)
      }
    },
    {
      name: 'subdomain_index',
      type: 'RUNTIME',
      critical: true,
      status: subStatus,
      latency_ms: subLatency,
      message: subStatus === 'UP' ? 'ok' : 'IllegalStateException',
      metrics: {
        subdomain_count: String(siteCount)
      }
    },
    {
      name: 'jvm_memory',
      type: 'RUNTIME',
      critical: false,
      status: 'UP',
      latency_ms: 1,
      message: 'ok',
      metrics: {
        heap_used_mb: String(heapUsedMb)
      }
    },
    {
      name: 'disk_space',
      type: 'RUNTIME',
      critical: false,
      status: 'UP',
      latency_ms: 1,
      message: 'ok',
      metrics: {
        dist_ready: String(indexExists)
      }
    }
  ];
}

function extractSubdomainFromHost(hostHeader) {
  if (!hostHeader) return null;
  const host = String(hostHeader).split(':')[0].toLowerCase().trim();
  if (!host || host === 'localhost' || host === '127.0.0.1' || host.startsWith('www.')) {
    return null;
  }
  const firstDot = host.indexOf('.');
  if (firstDot <= 0) return null;
  const sub = host.slice(0, firstDot);
  if (/^[a-z0-9-]{1,63}$/.test(sub) && knownSubdomains.has(sub)) {
    return sub;
  }
  return null;
}

function sendJson(res, statusCode, data) {
  const body = JSON.stringify(data);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(body);
}

function resolveStaticFile(subdomainKey, urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split('?')[0]);
  if (cleanPath.includes('..') || cleanPath.includes('\0')) {
    return null;
  }

  if (
    cleanPath.startsWith('/assets/') ||
    cleanPath.startsWith('/sites/') ||
    cleanPath.startsWith('/categories/') ||
    cleanPath.startsWith('/subdomains') ||
    cleanPath.startsWith('/search')
  ) {
    const candidate = path.resolve(DIST_DIR, '.' + cleanPath);
    if (!candidate.startsWith(DIST_DIR)) return null;
    if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
      const indexFile = path.join(candidate, 'index.html');
      return fs.existsSync(indexFile) ? indexFile : null;
    }
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }

  if (subdomainKey) {
    const subRoot = path.join(DIST_DIR, 'sites', subdomainKey);
    const subCandidate = path.resolve(subRoot, '.' + cleanPath);
    if (subCandidate.startsWith(subRoot)) {
      if (fs.existsSync(subCandidate) && fs.statSync(subCandidate).isDirectory()) {
        const idx = path.join(subCandidate, 'index.html');
        if (fs.existsSync(idx)) return idx;
      }
      if (fs.existsSync(subCandidate) && fs.statSync(subCandidate).isFile()) {
        return subCandidate;
      }
    }
  }

  const rootCandidate = path.resolve(DIST_DIR, '.' + cleanPath);
  if (!rootCandidate.startsWith(DIST_DIR)) return null;
  if (fs.existsSync(rootCandidate) && fs.statSync(rootCandidate).isDirectory()) {
    const idx = path.join(rootCandidate, 'index.html');
    return fs.existsSync(idx) ? idx : null;
  }
  if (fs.existsSync(rootCandidate) && fs.statSync(rootCandidate).isFile()) {
    return rootCandidate;
  }
  return null;
}

export function createGeoServer() {
  return http.createServer((req, res) => {
    const method = req.method || 'GET';
    if (method !== 'GET' && method !== 'HEAD') {
      res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Method Not Allowed');
      return;
    }

    const reqUrl = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
    const pathname = reqUrl.pathname;

    if (pathname === '/bgssai/health/liveness') {
      sendJson(res, 200, {
        code: 200,
        message: 'ok',
        success: true,
        result: {
          status: 'UP',
          app: APP_NAME,
          profile: PROFILE,
          uptime_seconds: uptimeSeconds(),
          checked_at: formatTimestamp()
        }
      });
      return;
    }

    if (pathname === '/bgssai/health/readiness') {
      const now = Date.now();
      if (readinessCache.payload && now < readinessCache.expiresAt) {
        sendJson(res, readinessCache.statusCode, readinessCache.payload);
        return;
      }
      const criticalComponents = checkComponents()
        .filter((c) => c.critical)
        .map((c) => ({ name: c.name, status: c.status }));
      const overallStatus = criticalComponents.some((c) => c.status === 'DOWN') ? 'DOWN' : 'UP';
      const statusCode = overallStatus === 'DOWN' ? 503 : 200;
      const payload = {
        code: 200,
        message: 'ok',
        success: true,
        result: {
          status: overallStatus,
          app: APP_NAME,
          checked_at: formatTimestamp(),
          components: criticalComponents
        }
      };
      readinessCache = { expiresAt: now + CACHE_TTL_MS, payload, statusCode };
      sendJson(res, statusCode, payload);
      return;
    }

    if (pathname === '/bgssai/health') {
      const now = Date.now();
      if (fullHealthCache.payload && now < fullHealthCache.expiresAt) {
        sendJson(res, fullHealthCache.statusCode, fullHealthCache.payload);
        return;
      }
      const components = checkComponents();
      const upCount = components.filter((c) => c.status === 'UP').length;
      const degradedCount = components.filter((c) => c.status === 'DEGRADED').length;
      const downCount = components.filter((c) => c.status === 'DOWN').length;
      const hasCriticalDown = components.some((c) => c.critical && c.status === 'DOWN');
      const overallStatus = hasCriticalDown
        ? 'DOWN'
        : degradedCount > 0 || downCount > 0
          ? 'DEGRADED'
          : 'UP';
      const statusCode = overallStatus === 'DOWN' ? 503 : 200;
      const payload = {
        code: 200,
        message: 'ok',
        success: true,
        result: {
          status: overallStatus,
          app: APP_NAME,
          profile: PROFILE,
          uptime_seconds: uptimeSeconds(),
          checked_at: formatTimestamp(),
          component_total: components.length,
          up_count: upCount,
          degraded_count: degradedCount,
          down_count: downCount,
          components
        }
      };
      fullHealthCache = { expiresAt: now + CACHE_TTL_MS, payload, statusCode };
      sendJson(res, statusCode, payload);
      return;
    }

    const subdomainKey = extractSubdomainFromHost(req.headers['x-forwarded-host'] || req.headers.host);
    const filePath = resolveStaticFile(subdomainKey, pathname);

    if (!filePath) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><title>404 - BGSSAI GEO</title></head><body><h1>404 Not Found</h1><p><a href="/">返回总站首页</a></p></body></html>');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=300'
    });
    if (method === 'HEAD') {
      res.end();
      return;
    }
    fs.createReadStream(filePath).pipe(res);
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  const server = createGeoServer();
  server.listen(PORT, () => {
    console.log(`bgssai-geo static server listening on http://localhost:${PORT} (profile=${PROFILE})`);
  });
}
