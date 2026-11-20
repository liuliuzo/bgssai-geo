import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const ROOT = new URL('../', import.meta.url);

function readUtf8(relPath) {
  const buf = readFileSync(new URL(relPath, ROOT));
  assert.equal(buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf, false, `${relPath} must not have UTF-8 BOM`);
  return buf.toString('utf8');
}

function sectionTableRows(text, heading, nextHeading) {
  const lines = text.split(/\r?\n/);
  let inSection = false;
  const rows = [];
  for (const line of lines) {
    if (line.startsWith(heading)) {
      inSection = true;
      continue;
    }
    if (inSection && nextHeading && line.startsWith(nextHeading)) {
      break;
    }
    if (inSection && line.startsWith('|')) {
      const cells = line.replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/)
        .map((c) => c.trim().replace(/^`|`$/g, ''));
      if (!cells.every((c) => /^[-:\s]+$/.test(c))) {
        rows.push(cells);
      }
    }
  }
  return rows;
}

test('静态网站台账结构、表格对齐与跨仓链接正确', () => {
  const md = readUtf8('docs/architecture/静态网站.md');
  const lines = md.split(/\r?\n/);
  let expectedCols = null;
  lines.forEach((line, i) => {
    if (line.startsWith('|')) {
      assert.ok(line.endsWith('|'), `line ${i + 1} missing trailing pipe`);
      const cols = line.replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/).length;
      if (expectedCols === null) expectedCols = cols;
      else assert.equal(cols, expectedCols, `line ${i + 1} column mismatch`);
    } else {
      expectedCols = null;
    }
  });

  const links = Object.fromEntries(sectionTableRows(md, '## 关联台账', '## 目录索引').slice(1));
  assert.ok(links['环境总册'].includes('https://github.com/liuliuzo/bgssai-devops/blob/develop/环境总册.md'));
  assert.ok(links['代码库与环境目录'].includes('https://github.com/liuliuzo/bgssai-devops/blob/develop/代码库与环境目录.md'));
});

test('静态网站台账工程属性与 content/subdomains.json 口径一致', () => {
  const md = readUtf8('docs/architecture/静态网站.md');
  const props = Object.fromEntries(sectionTableRows(md, '### 工程基础属性', '### 目录与配置文件路径').slice(1));
  assert.equal(props['代码库名称'], 'bgssai-geo-task');
  assert.equal(props['代码库地址'], 'https://github.com/liuliuzo/bgssai-geo-task.git');

  const subs = JSON.parse(readUtf8('content/subdomains.json'));
  const cats = JSON.parse(readUtf8('content/categories.json'));
  const cn = subs.filter((s) => s.deploy_region === 'cn');
  const globalSites = subs.filter((s) => s.deploy_region === 'global');

  assert.equal(Number(props['独立子域名站点总数']), subs.length);
  assert.equal(Number(props['境内显式子域名站点数']), cn.length);
  assert.equal(Number(props['境外显式子域名站点数']), globalSites.length);
  assert.equal(Number(props['覆盖业务与产品专题数']), cats.length);
  assert.equal(Number(props['境内主域名数']), new Set(cn.map((s) => s.root_domain)).size);
  assert.equal(Number(props['境外主域名数']), new Set(globalSites.map((s) => s.root_domain)).size);
  assert.equal(Number(props['自有主域名总数']), new Set(subs.map((s) => s.root_domain)).size);
});
