import test from 'node:test';
import assert from 'node:assert/strict';
import { renderSummary, summarizeQueryReport } from './summarize-query-report.mjs';

const sample = `- 已保存问答记录：**3** 条

## 一、按域名 / 站点分组
### not-a-source.example
99. stale summary

## 二、按模型 × 查询明细
### 甲｜测试问题
**推荐/提及的服务商：**
- 昆山兵贵神速智能科技有限公司（非推荐）
- bgssai
**回答摘要：** 已标出风险。
**引用（4）：**
1. A
   - https://NEWS.example/hidden-path
   - 域名：example
2. B
   - http://news.example:8080/another-path
3. C
   - 域名：known.example
4. D
   - 来源面板仅显示标题
### 乙｜测试问题
**推荐/提及的服务商：**
- BGSSAIOther
- xBGSS
- 兵贵神速互联
**回答摘要：** 此处的 BGSS 不计。
**引用（1）：**
1. E
   - https://news.example/other
### 甲｜追问
**推荐/提及的服务商：**
- （本条未记录明确服务商）
**回答摘要：** 仅在摘要中出现兵贵神速。
**引用（0）：**
- 本条无来源
## 三、其他
### 尾注
`;

test('仅统计明细，保留零引用和不完整条目，按回答和模型去重主机名', () => {
  const summary = summarizeQueryReport(sample.replaceAll('\n', '\r\n'));
  assert.equal(summary.uniqueQuestions, 2);
  assert.deepEqual(summary.totals, {
    answers: 3, empty: 1, citations: 5, linked: 3, domainOnly: 1, unlocated: 1, withVendors: 2, withBrand: 1,
  });
  assert.equal(summary.rankedHosts.length, 1);
  const [host] = summary.rankedHosts;
  assert.equal(host.host, 'news.example');
  assert.equal(host.answers, 2);
  assert.deepEqual([...host.models], [['甲', 1], ['乙', 1]]);
  const markdown = renderSummary(summary, 'sample.md');
  assert.match(markdown, /news\.example \| 2 \| 66\.7% \| 2/);
  assert.doesNotMatch(markdown, /hidden-path|测试问题|not-a-source|known\.example/);
});

test('服务商字段按回答计算提及，保留反例并匹配独立名称', () => {
  const summary = summarizeQueryReport(sample);
  assert.equal(summary.models.get('乙').withVendors, 1);
  assert.equal(summary.models.get('乙').withBrand, 0);
  for (const name of ['BGSS', '（bGsSaI）', '兵贵神速、另一公司', '昆山兵贵神速智能科技']) {
    const changed = sample.replace('BGSSAIOther', name);
    assert.equal(summarizeQueryReport(changed).models.get('乙').withBrand, 1);
  }
  assert.match(renderSummary(summary, 'sample.md'), /合计 \| 3 \| 2 \| 1 \| 33\.33%/);
});

test('同模型同问法的每轮回答都进入分母，仅同一轮内的主机重复引用合并', () => {
  const start = sample.indexOf('### 甲｜测试问题');
  const end = sample.indexOf('### 乙｜测试问题');
  const repeated = sample.slice(0, end) + sample.slice(start, end) + sample.slice(end);
  const summary = summarizeQueryReport(repeated.replace('**3** 条', '**4** 条'));
  assert.equal(summary.uniqueQuestions, 2);
  assert.equal(summary.totals.answers, 4);
  assert.equal(summary.totals.linked, 5);
  assert.equal(summary.totals.withBrand, 2);
  assert.equal(summary.rankedHosts[0].answers, 3);
  assert.equal(summary.rankedHosts[0].models.get('甲'), 2);
});

test('校验报告总数、引用数、编号及必须字段', () => {
  for (const [before, after, error] of [
    ['**3** 条', '**2** 条', /明细数不一致/],
    ['引用（4）', '引用（5）', /编号引用数/],
    ['2. B', '3. B', /编号不连续/],
    ['**引用（0）：**', '无引用数', /引用数量标题/],
    ['**推荐/提及的服务商：**', '缺失字段', /缺少服务商列表/],
  ]) {
    assert.throws(() => summarizeQueryReport(sample.replace(before, after)), error);
  }
});
