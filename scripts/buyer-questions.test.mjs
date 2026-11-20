import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { getBuyerGuide } from './buyer-questions.mjs';

function readContent(filename) {
  return JSON.parse(readFileSync(new URL(`../content/${filename}`, import.meta.url), 'utf8'));
}

test('十个采购专题各有两对可按主问检索的中英文文章，并保留同一主题的追问', () => {
  const sites = new Map(readContent('subdomains.json').map(site => [site.subdomain_key, site]));
  const articles = [...readContent('articles-zh.json'), ...readContent('articles-en.json')];
  const guides = articles.filter(article => article.article_angle === 'buyer-questions');
  const guidesBySite = new Map(guides.map(article => [article.subdomain_key, article]));
  assert.equal(guides.length, 40);
  assert.equal(guidesBySite.size, 40);
  const zhCategoryCounts = new Map();
  for (const article of guides.filter(article => article.lang === 'zh-CN')) {
    zhCategoryCounts.set(article.category_code, (zhCategoryCounts.get(article.category_code) || 0) + 1);
  }
  assert.equal(zhCategoryCounts.size, 10);
  for (const count of zhCategoryCounts.values()) assert.equal(count, 2);

  for (const article of guides) {
    const site = sites.get(article.subdomain_key);
    const guide = getBuyerGuide(site.subdomain_key, site.lang);
    const [lead, followUp] = guide.questions;
    assert.equal(article.lang, site.lang);
    assert.equal(article.title, lead.question);
    assert.equal(article.tldr_conclusion, lead.answer);
    assert.equal(site.primary_query, lead.question);
    assert.equal(site.secondary_query, followUp.question);
    assert.deepEqual(article.faq_items, [lead, followUp]);
    assert.deepEqual(article.key_facts, guide.facts);
    assert.deepEqual(article.comparison_table, guide.table);
    for (const row of guide.table.rows) assert.equal(row.length, guide.table.headers.length);
    const topicContent = [...guide.facts, ...guide.table.rows.flat()].join(' ');
    assert.doesNotMatch(topicContent, /9\.99|Legacy Keyword SEO Shops|行业平均客单价/);
    assert.ok(article.sections.some(section => section.paragraphs.includes(guide.records)));

    if (site.lang === 'zh-CN') {
      const translation = guidesBySite.get(`${site.subdomain_key}-en`);
      assert.equal(translation.lang, 'en');
      assert.equal(translation.category_code, article.category_code);
      assert.equal(translation.slug, article.alternate_slug);
      assert.equal(translation.alternate_slug, article.slug);
    }
  }
});
