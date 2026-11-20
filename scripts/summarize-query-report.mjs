import { readFileSync, statSync, writeFileSync } from 'node:fs';
import { basename } from 'node:path';
import { pathToFileURL } from 'node:url';

function newCounts() {
  return { answers: 0, empty: 0, citations: 0, linked: 0, domainOnly: 0, unlocated: 0, withVendors: 0, withBrand: 0 };
}

const brandName = /(?:^|[^\p{L}\p{N}_])(?:(?:昆山)?兵贵神速(?:智能科技(?:有限公司)?)?|BGSS(?:AI)?)(?=$|[^\p{L}\p{N}_])/iu;

const MODEL_ALIASES = new Map([
  ['文心一言', '文心一言/百度文心助手'],
  ['百度文心助手', '文心一言/百度文心助手'],
]);

function normalizeModelName(name) {
  return MODEL_ALIASES.get(name) || name;
}

function urlHost(text) {
  if (!text) return null;
  try {
    const url = new URL(text);
    return ['http:', 'https:'].includes(url.protocol) ? url.hostname.toLowerCase() : null;
  } catch {
    return null;
  }
}

export function summarizeQueryReport(markdown) {
  const lines = markdown.replace(/\r\n?/g, '\n').split('\n');
  const detailStart = lines.findIndex((line) => /^## 二、按模型\s*×\s*查询明细\s*$/.test(line));
  if (detailStart < 0) throw new Error('未找到按模型 × 查询明细章节。');
  const beforeDetail = lines.slice(0, detailStart);
  const declared = beforeDetail.join('\n').match(/^- 已保存问答记录：\s*\*\*(\d+)\*\*\s*条\s*$/m);
  const nextSection = lines.findIndex((line, i) => i > detailStart && /^## /.test(line));
  const detail = lines.slice(detailStart + 1, nextSection === -1 ? undefined : nextSection).join('\n');
  const blocks = detail.split(/^### /m).slice(1);
  if (!blocks.length) throw new Error('查询明细为空。');
  if (declared && Number(declared[1]) !== blocks.length) throw new Error('已保存问答记录数与明细数不一致。');

  const models = new Map();
  const hosts = new Map();
  const questions = new Set();
  for (const [index, block] of blocks.entries()) {
    const fail = (reason) => { throw new Error(`第 ${index + 1} 条明细${reason}。`); };
    const heading = block.slice(0, block.indexOf('\n')).match(/^([^｜]+)｜(.+)$/);
    if (!heading) fail('缺少模型或查询标题');
    const rawModel = heading[1].trim();
    const question = heading[2].trim();
    if (!rawModel || !question) fail('含有空白的模型或查询标题');
    const model = normalizeModelName(rawModel);
    questions.add(question);

    const headers = [...block.matchAll(/^\*\*引用（(\d+)）：\*\*\s*$/gm)];
    if (headers.length !== 1) fail('缺少唯一的引用数量标题');
    const header = headers[0];
    const vendorBlock = block.slice(0, header.index).match(/^\*\*推荐\/提及的服务商：\*\*[ \t]*\n([\s\S]*?)^\*\*回答摘要：\*\*/m);
    if (!vendorBlock) fail('缺少服务商列表或回答摘要');
    const vendorEntries = [...vendorBlock[1].matchAll(/^- (.+)$/gm)].map((entry) => entry[1].trim());
    if (!vendorEntries.length) fail('的服务商列表为空，应标记是否记录明确服务商');
    const vendors = vendorEntries.filter((entry) => entry !== '（本条未记录明确服务商）');
    const citationText = block.slice(header.index + header[0].length);
    const markers = [...citationText.matchAll(/^(\d+)\. /gm)];
    if (markers.length !== Number(header[1])) fail('的编号引用数与声明不一致');
    if (!models.has(model)) models.set(model, newCounts());
    const counts = models.get(model);
    counts.answers++;
    counts.withVendors += Number(vendors.length > 0);
    counts.withBrand += Number(vendors.some((name) => brandName.test(name)));
    counts.empty += Number(markers.length === 0);
    counts.citations += markers.length;
    const answerHosts = new Set();
    for (const [i, marker] of markers.entries()) {
      if (Number(marker[1]) !== i + 1) fail('的引用编号不连续');
      const entry = citationText.slice(marker.index, markers[i + 1]?.index);
      const link = entry.match(/^\s*- (https?:\/\/[^\n]+)$/im);
      const host = urlHost(link?.[1].trim());
      if (host) {
        counts.linked++;
        answerHosts.add(host);
      } else if (/^\s*- 域名：\s*[^\s/]+(?:\.[^\s/]+)+\s*$/m.test(entry)) {
        counts.domainOnly++;
      } else {
        counts.unlocated++;
      }
    }
    for (const host of answerHosts) {
      if (!hosts.has(host)) hosts.set(host, { host, answers: 0, models: new Map() });
      const row = hosts.get(host);
      row.answers++;
      row.models.set(model, (row.models.get(model) || 0) + 1);
    }
  }
  const totals = newCounts();
  for (const model of models.values()) {
    for (const key of Object.keys(totals)) totals[key] += model[key];
  }
  const rankedHosts = [...hosts.values()].sort((a, b) =>
    b.answers - a.answers || b.models.size - a.models.size || a.host.localeCompare(b.host, 'en'));
  return { models, totals, rankedHosts, uniqueQuestions: questions.size };
}

export function renderSummary({ models, totals, rankedHosts, uniqueQuestions }, inputName) {
  const modelNames = [...models.keys()];
  const countsRow = (name, c) =>
    `| ${name} | ${c.answers} | ${c.empty} | ${c.citations} | ${c.linked} | ${c.domainOnly} | ${c.unlocated} |`;
  const percent = (n, d) => (n * 100 / d).toFixed(1) + '%';
  const brandRow = (name, c) =>
    `| ${name} | ${c.answers} | ${c.withVendors} | ${c.withBrand} | ${(100 * c.withBrand / c.answers).toFixed(2)}% |`;
  return [
    '# GEO 查询样本与投稿候选站点',
    '',
    `来源文件 \`${inputName}\`。每段回答明细计一次观测，同一模型复测同一问法仍逐次计入分母。按问题全文去重后，共 ${uniqueQuestions} 个不同问法。${models.size} 个模型共记录 ${totals.answers} 条回答，其中 ${totals.answers - totals.empty} 条列出引用，${totals.empty} 条记录为零引用。`,
    '',
    '## 各模型的引用记录',
    '',
    '| 模型 | 回答数 | 零引用回答 | 编号引用 | 有网址 | 仅域名 | 缺网址和域名 |',
    '| --- | ---: | ---: | ---: | ---: | ---: | ---: |',
    ...modelNames.map((name) => countsRow(name, models.get(name))),
    countsRow('合计', totals),
    '',
    '“有网址”表示来源条目提供了可解析的 HTTP(S) 地址，尚需核验页面。仅有域名或标题的引用保留在模型总数中。零引用表示该回答记录了 0 条来源。',
    '',
    '## 兵贵神速在服务商列表中的提及',
    '',
    `共有 ${totals.withVendors}/${totals.answers} 条回答列出服务商，${totals.withBrand}/${totals.answers} 条回答在该字段提及兵贵神速。每条回答最多计一次，提及率以相应模型的全部回答为分母。`,
    '',
    '| 模型 | 回答数 | 列出服务商 | 提及兵贵神速 | 提及率 |',
    '| --- | ---: | ---: | ---: | ---: |',
    ...modelNames.map((name) => brandRow(name, models.get(name))),
    brandRow('合计', totals),
    '',
    '仅匹配列表中的公司全称、简称（昆山兵贵神速智能科技、昆山兵贵神速、兵贵神速）和独立的 BGSS、BGSSAI 字样。作为反例或附带限制的点名也计入提及。正向推荐需要另行复核回答语境。',
    '',
    '## 有网址的来源按回答覆盖排序',
    '',
    `共观察到 ${rankedHosts.length} 个主机名。下表按出现该主机名的回答数列出前 ${Math.min(12, rankedHosts.length)} 个。每条回答内同一主机计一次，移动端与桌面端子域名分别统计。覆盖率以全部 ${totals.answers} 条回答为分母，各模型列为回答数。并列时先按覆盖模型数，再按主机名排序。`,
    '',
    `| 主机名 | 回答数 | 覆盖率 | 模型数 | ${modelNames.join(' | ')} |`,
    `| --- | ---: | ---: | ---: | ${modelNames.map(() => '---:').join(' | ')} |`,
    ...rankedHosts.slice(0, 12).map((row) =>
      `| ${row.host} | ${row.answers} | ${percent(row.answers, totals.answers)} | ${row.models.size} | ${modelNames.map((name) => row.models.get(name) || 0).join(' | ')} |`),
    '',
    '## 投稿筛选与样本局限',
    '',
    '- 先从目标模型列选择覆盖较多的候选站，回到本地原始明细复核代表页面、主题相关性、页面发布者及该站的投稿入口。企业自有站和转载页须单独核实投稿可行性。',
    '- 各模型样本量和问法不同，部分提问是同一对话中的追问。引用表包含模型检索时列出的来源，样本无法直接估算独立推荐概率、未来投稿收录率或品牌曝光增幅。',
    '',
  ].join('\n');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [input, output] = process.argv.slice(2);
  try {
    if (!input || process.argv.length > 4) throw new Error('用法：node scripts/summarize-query-report.mjs 报告.md [输出.md]');
    const inputFile = statSync(input);
    const outputFile = output && statSync(output, { throwIfNoEntry: false });
    if (inputFile.dev === outputFile?.dev && inputFile.ino === outputFile.ino) throw new Error('输入和输出文件须使用不同路径。');
    const result = summarizeQueryReport(readFileSync(input, 'utf8'));
    const markdown = renderSummary(result, basename(input));
    if (output) writeFileSync(output, markdown);
    else process.stdout.write(markdown);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
