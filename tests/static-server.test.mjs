import assert from 'node:assert/strict';
import { copyFile, mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { pathToFileURL } from 'node:url';

// The server reads content and dist relative to its own module on startup.
async function startFixture(t, built) {
  const root = await mkdtemp(path.join(tmpdir(), 'geo-functional-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, 'server'));
  const modulePath = path.join(root, 'server/index.mjs');
  await copyFile(new URL('../server/index.mjs', import.meta.url), modulePath);
  if (built) {
    const dist = path.join(root, 'dist');
    await mkdir(path.join(dist, 'sites'), { recursive: true });
    await writeFile(path.join(dist, 'index.html'), '<p>Example site</p>');
    await writeFile(path.join(dist, 'index.md'), '# Example site');
    await writeFile(path.join(dist, 'sitemap-index.xml'), '<sitemapindex/>');
    await Promise.all(Array.from({ length: 100 }, (_, i) => mkdir(path.join(dist, 'sites', String(i)))));
  }

  const { createGeoServer } = await import(pathToFileURL(modulePath).href);
  const server = createGeoServer();
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  t.after(() => new Promise((resolve) => server.close(resolve)));
  return 'http://127.0.0.1:' + server.address().port;
}

test('content negotiation preserves the HTML default for browsers', async (t) => {
  const url = await startFixture(t, true);
  for (const [accept, mime, body] of [
    ['text/html', 'text/html', '<p>Example site</p>'],
    ['text/markdown', 'text/markdown', '# Example site'],
    ['text/html, text/markdown', 'text/html', '<p>Example site</p>'],
  ]) {
    const response = await fetch(url, { headers: { Accept: accept } });
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('content-type').split(';')[0], mime);
    assert.equal(await response.text(), body);
  }
});

test('readiness depends on static assets while liveness remains available', async (t) => {
  for (const built of [true, false]) {
    const url = await startFixture(t, built);
    const live = await fetch(url + '/bgssai/health/liveness');
    assert.equal(live.status, 200);
    assert.equal((await live.json()).result.status, 'UP');
    const ready = await fetch(url + '/bgssai/health/readiness');
    assert.equal(ready.status, built ? 200 : 503);
    const { result } = await ready.json();
    assert.equal(result.status, built ? 'UP' : 'DOWN');
    for (const name of ['static_bundle', 'subdomain_index']) {
      assert.equal(result.components.find((component) => component.name === name)?.status, result.status);
    }
  }
});
