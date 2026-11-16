import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT_DIR, 'content');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

const BASE_DOMAIN = 'bgssai-geo.com';
const HUB_ORIGIN = `https://www.${BASE_DOMAIN}`;

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeXml(str) {
  return escapeHtml(str);
}

function writeFileEnsured(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '昆山兵贵神速智能科技有限公司',
    alternateName: ['BGSS', 'BGSSAI', 'Kunshan Bingguishensu Intelligent Technology Co., Ltd.'],
    url: 'https://www.bgssai.com',
    telephone: '+86-15962533297',
    email: 'marketing@bgssai.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '昆山开发区前进中路270号昆山外贸商务大厦6楼639室',
      addressLocality: '昆山市',
      addressRegion: '江苏省',
      addressCountry: 'CN'
    }
  };
}

function renderFooter(lang) {
  if (lang === 'en') {
    return `<footer class="site-footer">
  <div class="footer-inner">
    <span>© 2026 BGSSAI · <a href="https://www.bgssai.com/en/terms-of-service/" target="_blank" rel="noopener noreferrer">Terms</a> · <a href="https://www.bgssai.com/en/privacy-policy/" target="_blank" rel="noopener noreferrer">Privacy</a></span>
  </div>
</footer>`;
  }
  return `<footer class="site-footer">
  <div class="footer-inner">
    <span>© 2026 昆山兵贵神速智能科技有限公司 · <a href="https://www.bgssai.com/terms-of-service/" target="_blank" rel="noopener noreferrer">用户协议</a> · <a href="https://www.bgssai.com/privacy-policy/" target="_blank" rel="noopener noreferrer">隐私政策</a> · <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">苏ICP备2024070062号-7</a></span>
  </div>
</footer>`;
}

function renderHeader({ lang, activeNav, brandTitle, brandHref, zhHref, enHref }) {
  const isEn = lang === 'en';
  return `<header class="site-header">
  <div class="header-inner">
    <a class="brand-link" href="${escapeHtml(brandHref || (isEn ? '/en/' : '/'))}">${escapeHtml(brandTitle || 'BGSSAI GEO')}</a>
    <nav class="nav-links" aria-label="${isEn ? 'Primary Navigation' : '主导航'}">
      <a class="${activeNav === 'home' ? 'active' : ''}" href="${isEn ? '/en/' : '/'}">${isEn ? 'Home' : '总站首页'}</a>
      <a class="${activeNav === 'subdomains' ? 'active' : ''}" href="/subdomains/">${isEn ? 'Subdomains (200)' : '子域名矩阵 (200)'}</a>
      <a class="${activeNav === 'categories' ? 'active' : ''}" href="/categories/kunshan-geo/">${isEn ? 'Categories' : '垂直分类'}</a>
      <a class="${activeNav === 'search' ? 'active' : ''}" href="/search/">${isEn ? 'Search' : '文章检索'}</a>
      <a href="/sitemap-index.xml">Sitemap</a>
      <a href="/llms.txt">LLMs.txt</a>
    </nav>
    <div class="lang-switch" aria-label="Language Switcher">
      <a class="${!isEn ? 'active' : ''}" href="${escapeHtml(zhHref || '/')}" onclick="try{localStorage.setItem('bgssai.lang','zh-CN');document.cookie='bgssai_lang=zh-CN;path=/;max-age=31536000'}catch(e){}">中文</a>
      <a class="${isEn ? 'active' : ''}" href="${escapeHtml(enHref || '/en/')}" onclick="try{localStorage.setItem('bgssai.lang','en');document.cookie='bgssai_lang=en;path=/;max-age=31536000'}catch(e){}">EN</a>
    </div>
  </div>
</header>`;
}

function renderHtmlDocument({
  lang,
  title,
  description,
  keywords,
  canonicalUrl,
  zhAlternateUrl,
  enAlternateUrl,
  ogType = 'website',
  publishedTime,
  modifiedTime,
  jsonLdList = [],
  headerHtml,
  bodyHtml
}) {
  const kwString = Array.isArray(keywords) ? keywords.join(', ') : String(keywords || '');
  const hreflangTags = [];
  if (zhAlternateUrl) {
    hreflangTags.push(`<link rel="alternate" hreflang="zh-CN" href="${escapeHtml(zhAlternateUrl)}">`);
    hreflangTags.push(`<link rel="alternate" hreflang="x-default" href="${escapeHtml(zhAlternateUrl)}">`);
  }
  if (enAlternateUrl) {
    hreflangTags.push(`<link rel="alternate" hreflang="en" href="${escapeHtml(enAlternateUrl)}">`);
  }
  const articleMeta =
    ogType === 'article'
      ? `<meta property="article:published_time" content="${escapeHtml(publishedTime || '2026-11-16')}">
  <meta property="article:modified_time" content="${escapeHtml(modifiedTime || '2026-11-16')}">`
      : '';

  const jsonLdScripts = jsonLdList
    .map((obj) => `<script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n</script>`)
    .join('\n  ');

  return `<!DOCTYPE html>
<html lang="${escapeHtml(lang)}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="keywords" content="${escapeHtml(kwString)}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="${escapeHtml(canonicalUrl)}">
  ${hreflangTags.join('\n  ')}
  <meta property="og:type" content="${escapeHtml(ogType)}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${escapeHtml(canonicalUrl)}">
  <meta property="og:site_name" content="BGSSAI GEO">
  <meta property="og:locale" content="${lang === 'en' ? 'en_US' : 'zh_CN'}">
  ${articleMeta}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <link rel="alternate" type="application/rss+xml" title="BGSSAI GEO RSS Feed" href="/rss.xml">
  <link rel="stylesheet" href="/assets/site.css">
  ${jsonLdScripts}
</head>
<body>
  ${headerHtml}
  <main class="container">
    ${bodyHtml}
  </main>
  ${renderFooter(lang)}
</body>
</html>`;
}

function buildSiteCss() {
  return `:root {
  --bg: #f8fafc;
  --surface: #ffffff;
  --border: #e2e8f0;
  --text: #0f172a;
  --muted: #475569;
  --primary: #0d6efd;
  --primary-hover: #0b5ed7;
  --primary-soft: #eff6ff;
  --tag-bg: #f1f5f9;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.65;
}

a {
  color: var(--primary);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.site-header {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 30;
}

.header-inner {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
  min-height: 62px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.brand-link {
  font-weight: 700;
  font-size: 18px;
  color: var(--text);
}

.nav-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px;
  font-size: 14px;
}

.nav-links a {
  color: var(--muted);
  font-weight: 500;
}

.nav-links a.active,
.nav-links a:hover {
  color: var(--primary);
  text-decoration: none;
}

.lang-switch {
  display: inline-flex;
  border: 1px solid var(--border);
  border-radius: 6px;
  overflow: hidden;
  font-size: 12px;
}

.lang-switch a {
  padding: 4px 10px;
  color: var(--muted);
  background: var(--surface);
}

.lang-switch a.active {
  background: var(--primary);
  color: #ffffff;
}

.container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 28px 24px;
}

.breadcrumb {
  font-size: 13px;
  color: var(--muted);
  margin-bottom: 18px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px 20px;
}

.stat-label {
  font-size: 13px;
  color: var(--muted);
}

.stat-value {
  font-size: 26px;
  font-weight: 700;
  margin-top: 4px;
  color: var(--text);
}

.filter-bar {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.filter-bar input,
.filter-bar select {
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 14px;
  min-width: 180px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid var(--primary);
  background: var(--primary);
  color: #ffffff;
  cursor: pointer;
}

.btn:hover {
  background: var(--primary-hover);
  text-decoration: none;
}

.btn-outline {
  background: var(--surface);
  color: var(--text);
  border-color: var(--border);
}

.btn-outline:hover {
  background: var(--tag-bg);
}

.section-heading {
  margin: 28px 0 14px 0;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 16px;
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 20px;
}

.card-title {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
}

.card-desc {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: var(--muted);
}

.meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 12px;
  color: var(--muted);
  margin-bottom: 10px;
  align-items: center;
}

.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  background: var(--tag-bg);
  color: var(--muted);
}

.badge-primary {
  background: var(--primary-soft);
  color: var(--primary);
  font-weight: 600;
}

.data-table-wrap {
  overflow-x: auto;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  margin-bottom: 24px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.data-table th,
.data-table td {
  padding: 12px 14px;
  border-bottom: 1px solid var(--border);
  text-align: left;
  vertical-align: top;
}

.data-table th {
  background: #f1f5f9;
  font-weight: 600;
  white-space: nowrap;
}

.article-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 24px;
}

@media (max-width: 960px) {
  .article-layout {
    grid-template-columns: 1fr;
  }
}

.article-box {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 32px;
}

.article-box h1 {
  margin: 0 0 12px 0;
  font-size: 26px;
  line-height: 1.35;
}

.article-box h2 {
  margin: 28px 0 12px 0;
  font-size: 20px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 8px;
}

.article-box p {
  margin: 0 0 14px 0;
  color: #1e293b;
}

.fact-box {
  background: var(--primary-soft);
  border: 1px solid #bfdbfe;
  border-radius: 8px;
  padding: 18px 22px;
  margin: 18px 0 24px 0;
}

.fact-box ul {
  margin: 8px 0 0 0;
  padding-left: 20px;
}

.fact-box li {
  margin-bottom: 6px;
}

.faq-list {
  margin: 0;
}

.faq-list dt {
  font-weight: 600;
  margin-top: 16px;
  color: var(--text);
}

.faq-list dd {
  margin: 6px 0 0 0;
  color: var(--muted);
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
}

.site-footer {
  margin-top: 56px;
  border-top: 1px solid var(--border);
  background: var(--surface);
  padding: 20px 24px;
  text-align: center;
  font-size: 13px;
  color: var(--muted);
}
`;
}

function renderArticleBodyContent(article, subdomain, category, allArticles, allSubdomains) {
  const isEn = article.lang === 'en';
  const catName = isEn ? category.name_en : category.name_zh;
  const relatedSubs = (article.related_subdomains || [])
    .map((k) => allSubdomains.find((s) => s.subdomain_key === k))
    .filter(Boolean);
  const relatedArticles = allArticles
    .filter((a) => a.slug !== article.slug && (a.category_code === article.category_code || a.subdomain_key === article.subdomain_key))
    .slice(0, 6);

  const factsHtml = (article.key_facts || [])
    .map((f) => `<li>${escapeHtml(f)}</li>`)
    .join('\n            ');

  let tableHtml = '';
  if (article.comparison_table && article.comparison_table.headers) {
    const ths = article.comparison_table.headers.map((h) => `<th>${escapeHtml(h)}</th>`).join('');
    const trs = (article.comparison_table.rows || [])
      .map((row) => `<tr>${row.map((cell) => `<td>${escapeHtml(cell)}</td>`).join('')}</tr>`)
      .join('\n              ');
    tableHtml = `
        <h2>${isEn ? 'Structured Comparison Matrix' : '结构化指标对比表'}</h2>
        <div class="data-table-wrap">
          <table class="data-table">
            <thead><tr>${ths}</tr></thead>
            <tbody>
              ${trs}
            </tbody>
          </table>
        </div>`;
  }

  const sectionsHtml = (article.sections || [])
    .map(
      (sec) => `
        <section>
          <h2>${escapeHtml(sec.heading)}</h2>
          ${(sec.paragraphs || []).map((p) => `<p>${escapeHtml(p)}</p>`).join('\n          ')}
        </section>`
    )
    .join('\n');

  const faqHtml = (article.faq_items || [])
    .map(
      (item) => `
          <dt>${escapeHtml(item.question)}</dt>
          <dd>${escapeHtml(item.answer)}</dd>`
    )
    .join('\n');

  const tagsHtml = (article.keywords || [])
    .map((kw) => `<span class="badge">${escapeHtml(kw)}</span>`)
    .join('\n          ');

  const altLinkHtml = article.alternate_slug
    ? `<a class="badge badge-primary" href="/articles/${escapeHtml(article.alternate_slug)}/">${
        isEn ? '中文对照版本' : 'English Version'
      }</a>`
    : '';

  return `<div class="article-layout">
      <article class="article-box" itemscope itemtype="https://schema.org/Article">
        <h1 itemprop="headline">${escapeHtml(article.title)}</h1>
        <div class="meta-row">
          <span class="badge badge-primary">${escapeHtml(article.lang)}</span>
          <span>${isEn ? 'Subdomain:' : '首发子域名：'}<a href="/sites/${escapeHtml(subdomain.subdomain_key)}/">${escapeHtml(subdomain.full_domain)}</a></span>
          <span>${isEn ? 'Category:' : '所属分类：'}<a href="/categories/${escapeHtml(category.category_code)}/">${escapeHtml(catName)}</a></span>
          <span itemprop="author">${escapeHtml(article.author_name)}</span>
          <time itemprop="datePublished" datetime="${escapeHtml(article.published_at)}">${escapeHtml(article.published_at)}</time>
          <span>${isEn ? `${article.reading_minutes} min read` : `阅读 ${article.reading_minutes} 分钟`}</span>
          ${altLinkHtml}
        </div>

        <section class="fact-box" aria-label="${isEn ? 'Key Facts' : '核心事实摘要'}">
          <strong>${isEn ? 'Key Facts & Citations' : '核心事实与可引用结论'}</strong>
          <ul>
            ${factsHtml}
          </ul>
        </section>

        ${sectionsHtml}

        ${tableHtml}

        <section aria-label="FAQ">
          <h2>${isEn ? 'Frequently Asked Questions (FAQ)' : '常见问题解答（FAQ）'}</h2>
          <dl class="faq-list">
            ${faqHtml}
          </dl>
        </section>

        <div class="tag-list" aria-label="Keywords">
          ${tagsHtml}
        </div>
      </article>

      <aside>
        <div class="card" style="margin-bottom: 16px;">
          <h2 class="card-title">${isEn ? 'Subdomain Portal' : '归属子域名站点'}</h2>
          <p class="card-desc"><strong>${escapeHtml(subdomain.full_domain)}</strong></p>
          <p class="card-desc">${escapeHtml(subdomain.site_tagline)}</p>
          <div class="meta-row">
            <a class="btn" href="/sites/${escapeHtml(subdomain.subdomain_key)}/">${isEn ? 'Visit Subdomain' : '进入子站点'}</a>
            <a class="btn btn-outline" href="/sites/${escapeHtml(subdomain.subdomain_key)}/sitemap.xml">Sitemap</a>
          </div>
        </div>

        <div class="card" style="margin-bottom: 16px;">
          <h2 class="card-title">${isEn ? 'Related Subdomains' : '关联垂直子域名'}</h2>
          <ul style="padding-left: 18px; margin: 0;">
            ${relatedSubs
              .map(
                (s) =>
                  `<li style="margin-bottom: 8px;"><a href="/sites/${escapeHtml(s.subdomain_key)}/">${escapeHtml(s.full_domain)}</a><br><small style="color:#475569;">${escapeHtml(s.site_tagline)}</small></li>`
              )
              .join('\n            ')}
          </ul>
        </div>

        <div class="card">
          <h2 class="card-title">${isEn ? 'Related Articles' : '相关收录文章'}</h2>
          <ul style="padding-left: 18px; margin: 0;">
            ${relatedArticles
              .map(
                (a) =>
                  `<li style="margin-bottom: 8px;"><a href="/sites/${escapeHtml(a.subdomain_key)}/articles/${escapeHtml(a.slug)}/">${escapeHtml(a.title)}</a></li>`
              )
              .join('\n            ')}
          </ul>
        </div>
      </aside>
    </div>`;
}

function buildArticleJsonLd(article, subdomain, category, canonicalUrl) {
  const catName = article.lang === 'en' ? category.name_en : category.name_zh;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    inLanguage: article.lang,
    datePublished: article.published_at,
    dateModified: article.updated_at,
    wordCount: article.word_count,
    articleSection: catName,
    keywords: (article.keywords || []).join(', '),
    author: {
      '@type': 'Organization',
      name: article.author_name,
      url: 'https://www.bgssai.com'
    },
    publisher: organizationSchema(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: (article.faq_items || []).map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'BGSSAI GEO',
        item: HUB_ORIGIN + '/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: catName,
        item: `${HUB_ORIGIN}/categories/${category.category_code}/`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: subdomain.full_domain,
        item: `https://${subdomain.full_domain}/`
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: article.title,
        item: canonicalUrl
      }
    ]
  };

  return [articleSchema, faqSchema, breadcrumbSchema];
}

function renderHubHomePage({ lang, categories, subdomains, articles }) {
  const isEn = lang === 'en';
  const langSubdomains = subdomains.filter((s) => s.lang === lang);
  const langArticles = articles.filter((a) => a.lang === lang);
  const featuredSubdomains = langSubdomains.slice(0, 18);
  const featuredArticles = langArticles.slice(0, 30);

  const categoryOptions = categories
    .map(
      (c) => `<option value="${escapeHtml(c.category_code)}">${escapeHtml(isEn ? c.name_en : c.name_zh)}</option>`
    )
    .join('\n        ');

  const categoryCards = categories
    .map((c) => {
      const name = isEn ? c.name_en : c.name_zh;
      const desc = isEn ? c.desc_en : c.desc_zh;
      return `<div class="card">
        <h3 class="card-title"><a href="/categories/${escapeHtml(c.category_code)}/">${escapeHtml(name)}</a></h3>
        <p class="card-desc">${escapeHtml(desc)}</p>
        <div class="meta-row">
          <span class="badge badge-primary">${c.subdomain_count} ${isEn ? 'Subdomains' : '个子域名'}</span>
          <span class="badge">${c.article_count} ${isEn ? 'Articles' : '篇文章'}</span>
        </div>
      </div>`;
    })
    .join('\n      ');

  const subdomainCards = featuredSubdomains
    .map(
      (s) => `<div class="card">
        <h3 class="card-title"><a href="/sites/${escapeHtml(s.subdomain_key)}/">${escapeHtml(s.full_domain)}</a></h3>
        <p class="card-desc">${escapeHtml(s.site_tagline)}</p>
        <div class="meta-row">
          <span class="badge badge-primary">${escapeHtml(s.lang)}</span>
          <a href="/sites/${escapeHtml(s.subdomain_key)}/">${isEn ? 'Enter Portal' : '进入子站'}</a>
          <a href="/sites/${escapeHtml(s.subdomain_key)}/sitemap.xml">sitemap.xml</a>
        </div>
      </div>`
    )
    .join('\n      ');

  const articleRows = featuredArticles
    .map((a) => {
      const cat = categories.find((c) => c.category_code === a.category_code);
      return `<tr>
          <td><a href="/sites/${escapeHtml(a.subdomain_key)}/articles/${escapeHtml(a.slug)}/">${escapeHtml(a.title)}</a></td>
          <td><a href="/sites/${escapeHtml(a.subdomain_key)}/">${escapeHtml(a.subdomain_key)}.${BASE_DOMAIN}</a></td>
          <td><a href="/categories/${escapeHtml(a.category_code)}/">${escapeHtml(cat ? (isEn ? cat.name_en : cat.name_zh) : a.category_code)}</a></td>
          <td><span class="badge badge-primary">${escapeHtml(a.lang)}</span></td>
          <td><time datetime="${escapeHtml(a.updated_at)}">${escapeHtml(a.updated_at)}</time></td>
        </tr>`;
    })
    .join('\n        ');

  const bodyHtml = `
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-label">${isEn ? 'Active Subdomains' : '在线子域名站点'}</div>
        <div class="stat-value">${subdomains.length}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">${isEn ? 'Industry Categories' : '垂直行业分类'}</div>
        <div class="stat-value">${categories.length}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">${isEn ? 'Indexed Articles' : '已发布收录文章'}</div>
        <div class="stat-value">${articles.length}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">${isEn ? 'Languages' : '覆盖语言'}</div>
        <div class="stat-value">zh-CN / en</div>
      </div>
    </div>

    <form class="filter-bar" action="/search/" method="get">
      <input type="search" name="q" placeholder="${isEn ? 'Keyword (e.g. Kunshan GEO)' : '关键词（如：昆山GEO优化服务商推荐）'}">
      <select name="category">
        <option value="">${isEn ? 'All Categories' : '全部分类'}</option>
        ${categoryOptions}
      </select>
      <select name="lang">
        <option value="">${isEn ? 'All Languages' : '全部语言'}</option>
        <option value="zh-CN">zh-CN</option>
        <option value="en">en</option>
      </select>
      <button class="btn" type="submit">${isEn ? 'Search' : '查询'}</button>
      <a class="btn btn-outline" href="/subdomains/">${isEn ? 'All 200 Subdomains' : '查看全部 200 个子域名'}</a>
    </form>

    <div class="section-heading">
      <h2>${isEn ? 'Vertical Industry Categories' : '垂直行业分类'}</h2>
    </div>
    <div class="grid-3">
      ${categoryCards}
    </div>

    <div class="section-heading">
      <h2>${isEn ? 'Featured Subdomain Portals' : '重点子域名站点'}</h2>
      <a href="/subdomains/">${isEn ? 'View All 200 Subdomains' : '全部 200 个子域名'}</a>
    </div>
    <div class="grid-3">
      ${subdomainCards}
    </div>

    <div class="section-heading">
      <h2>${isEn ? 'Latest Published Articles' : '最新发布收录文章'}</h2>
      <a href="/search/">${isEn ? 'Browse All Articles' : '浏览全部文章'}</a>
    </div>
    <div class="data-table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>${isEn ? 'Article Title' : '文章标题'}</th>
            <th>${isEn ? 'Subdomain' : '所属子域名'}</th>
            <th>${isEn ? 'Category' : '分类'}</th>
            <th>${isEn ? 'Lang' : '语言'}</th>
            <th>${isEn ? 'Updated' : '更新日期'}</th>
          </tr>
        </thead>
        <tbody>
          ${articleRows}
        </tbody>
      </table>
    </div>`;

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: isEn ? 'BGSSAI GEO Content Matrix' : 'BGSSAI GEO 多子域名内容矩阵',
    url: isEn ? `${HUB_ORIGIN}/en/` : `${HUB_ORIGIN}/`,
    inLanguage: lang,
    publisher: organizationSchema(),
    potentialAction: {
      '@type': 'SearchAction',
      target: `${HUB_ORIGIN}/search/?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isEn ? 'BGSSAI GEO Subdomains' : 'BGSSAI GEO 子域名矩阵',
    numberOfItems: subdomains.length,
    itemListElement: featuredSubdomains.map((s, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: s.site_name,
      url: `https://${s.full_domain}/`
    }))
  };

  return renderHtmlDocument({
    lang,
    title: isEn
      ? 'BGSSAI GEO Content Matrix | 200 Subdomains & Generative Engine Optimization Articles'
      : '昆山GEO优化与生成式引擎优化内容矩阵 | 昆山兵贵神速智能科技有限公司 (BGSSAI GEO)',
    description: isEn
      ? 'BGSSAI GEO aggregates 200 vertical subdomains and 200+ structured bilingual articles on Generative Engine Optimization (GEO), Kunshan B2B manufacturing, and OPC tools.'
      : '昆山兵贵神速智能科技有限公司（BGSS / BGSSAI）旗下的多子域名GEO（生成式引擎优化）文章矩阵，汇集200个垂直子域名与中英双语行业文献，覆盖昆山GEO优化服务商推荐、收费标准、大模型收录与OPC工具栈。',
    keywords: isEn
      ? ['BGSSAI GEO', 'Kunshan GEO Optimization', 'Generative Engine Optimization', 'LLM Citation', 'OPC Tools']
      : ['昆山GEO优化', '昆山GEO优化服务商推荐', '昆山哪家GEO做的好', '苏州昆山GEO优化', '生成式引擎优化', '昆山兵贵神速智能科技有限公司', 'BGSSAI'],
    canonicalUrl: isEn ? `${HUB_ORIGIN}/en/` : `${HUB_ORIGIN}/`,
    zhAlternateUrl: `${HUB_ORIGIN}/`,
    enAlternateUrl: `${HUB_ORIGIN}/en/`,
    jsonLdList: [organizationSchema(), websiteSchema, itemListSchema],
    headerHtml: renderHeader({
      lang,
      activeNav: 'home',
      zhHref: '/',
      enHref: '/en/'
    }),
    bodyHtml
  });
}

function renderSubdomainsDirectoryPage({ categories, subdomains }) {
  const rowsHtml = subdomains
    .map((s) => {
      const cat = categories.find((c) => c.category_code === s.category_code);
      return `<tr data-lang="${escapeHtml(s.lang)}" data-category="${escapeHtml(s.category_code)}">
          <td><a href="/sites/${escapeHtml(s.subdomain_key)}/"><strong>${escapeHtml(s.full_domain)}</strong></a></td>
          <td>${escapeHtml(s.site_name)}</td>
          <td>${escapeHtml(s.site_tagline)}</td>
          <td><a href="/categories/${escapeHtml(s.category_code)}/">${escapeHtml(cat ? cat.name_zh : s.category_code)}</a></td>
          <td><span class="badge badge-primary">${escapeHtml(s.lang)}</span></td>
          <td>${s.article_count}</td>
          <td>
            <a href="/sites/${escapeHtml(s.subdomain_key)}/sitemap.xml">sitemap.xml</a> ·
            <a href="/sites/${escapeHtml(s.subdomain_key)}/llms.txt">llms.txt</a>
          </td>
        </tr>`;
    })
    .join('\n        ');

  const catOptions = categories
    .map((c) => `<option value="${escapeHtml(c.category_code)}">${escapeHtml(c.name_zh)} (${escapeHtml(c.name_en)})</option>`)
    .join('\n        ');

  const bodyHtml = `
    <nav class="breadcrumb" aria-label="面包屑">
      <a href="/">总站首页</a>
      <span>/</span>
      <span>子域名矩阵目录（共 ${subdomains.length} 个子域名）</span>
    </nav>

    <h1>子域名矩阵目录（${subdomains.length} Subdomains）</h1>

    <form class="filter-bar" id="subdomain-filter-form" onsubmit="return false;">
      <input type="search" id="sub-q" placeholder="筛选子域名或主题词">
      <select id="sub-cat">
        <option value="">全部分类</option>
        ${catOptions}
      </select>
      <select id="sub-lang">
        <option value="">全部语言</option>
        <option value="zh-CN">zh-CN</option>
        <option value="en">en</option>
      </select>
    </form>

    <div class="data-table-wrap">
      <table class="data-table" id="subdomains-table">
        <thead>
          <tr>
            <th>子域名（Host）</th>
            <th>站点名称</th>
            <th>核心主题</th>
            <th>所属分类</th>
            <th>语言</th>
            <th>关联文章</th>
            <th>收录索引</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>
    <script>
      (function(){
        var qInput = document.getElementById('sub-q');
        var catSelect = document.getElementById('sub-cat');
        var langSelect = document.getElementById('sub-lang');
        var rows = Array.prototype.slice.call(document.querySelectorAll('#subdomains-table tbody tr'));
        function applyFilter(){
          var q = (qInput.value || '').toLowerCase().trim();
          var cat = catSelect.value;
          var lang = langSelect.value;
          rows.forEach(function(r){
            var matchQ = !q || r.textContent.toLowerCase().indexOf(q) !== -1;
            var matchCat = !cat || r.getAttribute('data-category') === cat;
            var matchLang = !lang || r.getAttribute('data-lang') === lang;
            r.style.display = (matchQ && matchCat && matchLang) ? '' : 'none';
          });
        }
        qInput.addEventListener('input', applyFilter);
        catSelect.addEventListener('change', applyFilter);
        langSelect.addEventListener('change', applyFilter);
      })();
    </script>`;

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'BGSSAI GEO 200 子域名矩阵目录',
    url: `${HUB_ORIGIN}/subdomains/`,
    numberOfItems: subdomains.length
  };

  return renderHtmlDocument({
    lang: 'zh-CN',
    title: `全部 ${subdomains.length} 个子域名矩阵目录 | BGSSAI GEO`,
    description: `汇集昆山兵贵神速智能科技有限公司（BGSSAI）旗下 ${subdomains.length} 个中英双语垂直子域名站点，覆盖昆山GEO优化、大模型收录、OPC工具栈与制造业出海。`,
    keywords: ['子域名矩阵', '昆山GEO优化', 'BGSSAI GEO', '生成式引擎优化', '大模型收录'],
    canonicalUrl: `${HUB_ORIGIN}/subdomains/`,
    zhAlternateUrl: `${HUB_ORIGIN}/subdomains/`,
    jsonLdList: [organizationSchema(), collectionSchema],
    headerHtml: renderHeader({
      lang: 'zh-CN',
      activeNav: 'subdomains',
      zhHref: '/subdomains/',
      enHref: '/subdomains/'
    }),
    bodyHtml
  });
}

function renderSubdomainHomePage({ subdomain, category, subdomains, articles }) {
  const isEn = subdomain.lang === 'en';
  const subArticles = articles.filter(
    (a) => a.subdomain_key === subdomain.subdomain_key || (a.related_subdomains && a.related_subdomains.includes(subdomain.subdomain_key))
  );
  const siblingSubdomains = subdomains
    .filter((s) => s.category_code === subdomain.category_code && s.subdomain_key !== subdomain.subdomain_key)
    .slice(0, 9);

  const canonicalUrl = `https://${subdomain.full_domain}/`;

  const articlesCards = subArticles
    .map(
      (a) => `<article class="card">
        <h3 class="card-title"><a href="/sites/${escapeHtml(subdomain.subdomain_key)}/articles/${escapeHtml(a.slug)}/">${escapeHtml(a.title)}</a></h3>
        <div class="meta-row">
          <span class="badge badge-primary">${escapeHtml(a.lang)}</span>
          <time datetime="${escapeHtml(a.published_at)}">${escapeHtml(a.published_at)}</time>
          <span>${isEn ? `${a.reading_minutes} min read` : `阅读 ${a.reading_minutes} 分钟`}</span>
        </div>
        <p class="card-desc">${escapeHtml(a.summary)}</p>
        <a class="btn" href="/sites/${escapeHtml(subdomain.subdomain_key)}/articles/${escapeHtml(a.slug)}/">${isEn ? 'Read Article' : '阅读全文'}</a>
      </article>`
    )
    .join('\n      ');

  const siblingCards = siblingSubdomains
    .map(
      (s) => `<div class="card">
        <h3 class="card-title"><a href="/sites/${escapeHtml(s.subdomain_key)}/">${escapeHtml(s.full_domain)}</a></h3>
        <p class="card-desc">${escapeHtml(s.site_tagline)}</p>
        <div class="meta-row">
          <span class="badge badge-primary">${escapeHtml(s.lang)}</span>
          <a href="/sites/${escapeHtml(s.subdomain_key)}/sitemap.xml">sitemap.xml</a>
        </div>
      </div>`
    )
    .join('\n      ');

  const bodyHtml = `
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="${isEn ? '/en/' : '/'}">${isEn ? 'BGSSAI GEO Hub' : '总站首页'}</a>
      <span>/</span>
      <a href="/categories/${escapeHtml(category.category_code)}/">${escapeHtml(isEn ? category.name_en : category.name_zh)}</a>
      <span>/</span>
      <span>${escapeHtml(subdomain.full_domain)}</span>
    </nav>

    <div class="card" style="margin-bottom: 24px;">
      <h1 style="margin: 0 0 10px 0;">${escapeHtml(subdomain.site_name)}</h1>
      <p class="card-desc">${escapeHtml(subdomain.site_description)}</p>
      <div class="meta-row">
        <span class="badge badge-primary">${escapeHtml(subdomain.lang)}</span>
        <span class="badge">${escapeHtml(subdomain.full_domain)}</span>
        <span>${isEn ? 'Category:' : '所属分类：'}<a href="/categories/${escapeHtml(category.category_code)}/">${escapeHtml(isEn ? category.name_en : category.name_zh)}</a></span>
        <a href="/sites/${escapeHtml(subdomain.subdomain_key)}/sitemap.xml">sitemap.xml</a>
        <a href="/sites/${escapeHtml(subdomain.subdomain_key)}/rss.xml">rss.xml</a>
        <a href="/sites/${escapeHtml(subdomain.subdomain_key)}/llms.txt">llms.txt</a>
        <a href="/sites/${escapeHtml(subdomain.subdomain_key)}/robots.txt">robots.txt</a>
      </div>
    </div>

    <div class="section-heading">
      <h2>${isEn ? 'Published Articles on This Subdomain' : '本子域名发布与收录文章'}</h2>
    </div>
    <div class="grid-3">
      ${articlesCards}
    </div>

    <div class="section-heading">
      <h2>${isEn ? 'Peer Subdomains in This Category' : '同分类关联子域名站点'}</h2>
      <a href="/subdomains/">${isEn ? 'All Subdomains' : '全部子域名'}</a>
    </div>
    <div class="grid-3">
      ${siblingCards}
    </div>`;

  const siteSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: subdomain.site_name,
    description: subdomain.site_description,
    url: canonicalUrl,
    inLanguage: subdomain.lang,
    isPartOf: {
      '@type': 'WebSite',
      name: 'BGSSAI GEO',
      url: HUB_ORIGIN + '/'
    },
    publisher: organizationSchema()
  };

  return renderHtmlDocument({
    lang: subdomain.lang,
    title: `${subdomain.site_name} - ${subdomain.site_tagline}`,
    description: subdomain.site_description,
    keywords: subdomain.keywords,
    canonicalUrl,
    zhAlternateUrl: `${HUB_ORIGIN}/sites/${subdomain.subdomain_key}/`,
    jsonLdList: [organizationSchema(), siteSchema],
    headerHtml: renderHeader({
      lang: subdomain.lang,
      activeNav: 'subdomains',
      brandTitle: subdomain.full_domain,
      brandHref: `/sites/${subdomain.subdomain_key}/`,
      zhHref: '/',
      enHref: '/en/'
    }),
    bodyHtml
  });
}

function renderCategoryArchivePage({ category, categories, subdomains, articles }) {
  const catSubdomains = subdomains.filter((s) => s.category_code === category.category_code);
  const catArticles = articles.filter((a) => a.category_code === category.category_code);

  const otherCatsHtml = categories
    .map(
      (c) =>
        `<a class="badge ${c.category_code === category.category_code ? 'badge-primary' : ''}" href="/categories/${escapeHtml(c.category_code)}/">${escapeHtml(c.name_zh)}</a>`
    )
    .join('\n      ');

  const subCards = catSubdomains
    .map(
      (s) => `<div class="card">
        <h3 class="card-title"><a href="/sites/${escapeHtml(s.subdomain_key)}/">${escapeHtml(s.full_domain)}</a></h3>
        <p class="card-desc">${escapeHtml(s.site_tagline)}</p>
        <div class="meta-row">
          <span class="badge badge-primary">${escapeHtml(s.lang)}</span>
          <a href="/sites/${escapeHtml(s.subdomain_key)}/">进入站点</a>
          <a href="/sites/${escapeHtml(s.subdomain_key)}/sitemap.xml">sitemap.xml</a>
        </div>
      </div>`
    )
    .join('\n      ');

  const articleRows = catArticles
    .map(
      (a) => `<tr>
          <td><a href="/sites/${escapeHtml(a.subdomain_key)}/articles/${escapeHtml(a.slug)}/">${escapeHtml(a.title)}</a></td>
          <td><a href="/sites/${escapeHtml(a.subdomain_key)}/">${escapeHtml(a.subdomain_key)}.${BASE_DOMAIN}</a></td>
          <td><span class="badge badge-primary">${escapeHtml(a.lang)}</span></td>
          <td><time datetime="${escapeHtml(a.updated_at)}">${escapeHtml(a.updated_at)}</time></td>
        </tr>`
    )
    .join('\n        ');

  const bodyHtml = `
    <nav class="breadcrumb" aria-label="面包屑">
      <a href="/">总站首页</a>
      <span>/</span>
      <span>${escapeHtml(category.name_zh)}（${escapeHtml(category.name_en)}）</span>
    </nav>

    <div class="card" style="margin-bottom: 20px;">
      <h1 style="margin: 0 0 8px 0;">${escapeHtml(category.name_zh)} / ${escapeHtml(category.name_en)}</h1>
      <p class="card-desc">${escapeHtml(category.desc_zh)}</p>
      <div class="tag-list">
        ${otherCatsHtml}
      </div>
    </div>

    <div class="section-heading">
      <h2>本分类下属子域名站点（${catSubdomains.length}）</h2>
    </div>
    <div class="grid-3">
      ${subCards}
    </div>

    <div class="section-heading">
      <h2>本分类已发布收录文章（${catArticles.length}）</h2>
    </div>
    <div class="data-table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>文章标题</th>
            <th>首发子域名</th>
            <th>语言</th>
            <th>更新日期</th>
          </tr>
        </thead>
        <tbody>
          ${articleRows}
        </tbody>
      </table>
    </div>`;

  return renderHtmlDocument({
    lang: 'zh-CN',
    title: `${category.name_zh}（${category.name_en}）- 子域名与文章归档 | BGSSAI GEO`,
    description: category.desc_zh,
    keywords: [category.name_zh, category.name_en, '昆山GEO优化', 'BGSSAI GEO'],
    canonicalUrl: `${HUB_ORIGIN}/categories/${category.category_code}/`,
    zhAlternateUrl: `${HUB_ORIGIN}/categories/${category.category_code}/`,
    jsonLdList: [
      organizationSchema(),
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${category.name_zh} (${category.name_en})`,
        description: category.desc_zh,
        url: `${HUB_ORIGIN}/categories/${category.category_code}/`
      }
    ],
    headerHtml: renderHeader({
      lang: 'zh-CN',
      activeNav: 'categories',
      zhHref: `/categories/${category.category_code}/`,
      enHref: `/categories/${category.category_code}/`
    }),
    bodyHtml
  });
}

function renderSearchPage({ categories, subdomains, articles }) {
  const catOptions = categories
    .map((c) => `<option value="${escapeHtml(c.category_code)}">${escapeHtml(c.name_zh)} (${escapeHtml(c.name_en)})</option>`)
    .join('\n        ');

  const rowsHtml = articles
    .map((a) => {
      const cat = categories.find((c) => c.category_code === a.category_code);
      return `<tr data-lang="${escapeHtml(a.lang)}" data-category="${escapeHtml(a.category_code)}">
          <td>
            <a href="/sites/${escapeHtml(a.subdomain_key)}/articles/${escapeHtml(a.slug)}/"><strong>${escapeHtml(a.title)}</strong></a>
            <div style="font-size:12px;color:#475569;margin-top:4px;">${escapeHtml(a.summary)}</div>
          </td>
          <td><a href="/sites/${escapeHtml(a.subdomain_key)}/">${escapeHtml(a.subdomain_key)}.${BASE_DOMAIN}</a></td>
          <td><a href="/categories/${escapeHtml(a.category_code)}/">${escapeHtml(cat ? cat.name_zh : a.category_code)}</a></td>
          <td><span class="badge badge-primary">${escapeHtml(a.lang)}</span></td>
          <td><time datetime="${escapeHtml(a.updated_at)}">${escapeHtml(a.updated_at)}</time></td>
        </tr>`;
    })
    .join('\n        ');

  const bodyHtml = `
    <nav class="breadcrumb" aria-label="面包屑">
      <a href="/">总站首页</a>
      <span>/</span>
      <span>全站文章检索（共 ${articles.length} 篇）</span>
    </nav>

    <h1>全站文章与子域名检索</h1>

    <form class="filter-bar" id="article-search-form" onsubmit="return false;">
      <input type="search" id="search-q" placeholder="输入关键词（如：昆山GEO优化多少钱、ChatGPT、豆包）">
      <select id="search-cat">
        <option value="">全部分类</option>
        ${catOptions}
      </select>
      <select id="search-lang">
        <option value="">全部语言</option>
        <option value="zh-CN">zh-CN</option>
        <option value="en">en</option>
      </select>
    </form>

    <div class="data-table-wrap">
      <table class="data-table" id="articles-search-table">
        <thead>
          <tr>
            <th>文章标题与摘要</th>
            <th>所属子域名</th>
            <th>分类</th>
            <th>语言</th>
            <th>更新日期</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>
    <script>
      (function(){
        var params = new URLSearchParams(window.location.search);
        var qInput = document.getElementById('search-q');
        var catSelect = document.getElementById('search-cat');
        var langSelect = document.getElementById('search-lang');
        if (params.get('q')) qInput.value = params.get('q');
        if (params.get('category')) catSelect.value = params.get('category');
        if (params.get('lang')) langSelect.value = params.get('lang');
        var rows = Array.prototype.slice.call(document.querySelectorAll('#articles-search-table tbody tr'));
        function filterRows(){
          var q = (qInput.value || '').toLowerCase().trim();
          var cat = catSelect.value;
          var lang = langSelect.value;
          rows.forEach(function(r){
            var matchQ = !q || r.textContent.toLowerCase().indexOf(q) !== -1;
            var matchCat = !cat || r.getAttribute('data-category') === cat;
            var matchLang = !lang || r.getAttribute('data-lang') === lang;
            r.style.display = (matchQ && matchCat && matchLang) ? '' : 'none';
          });
        }
        qInput.addEventListener('input', filterRows);
        catSelect.addEventListener('change', filterRows);
        langSelect.addEventListener('change', filterRows);
        filterRows();
      })();
    </script>`;

  return renderHtmlDocument({
    lang: 'zh-CN',
    title: '全站文章与子域名检索 | BGSSAI GEO',
    description: `检索昆山兵贵神速智能科技有限公司（BGSSAI）发布的 ${articles.length} 篇中英双语 GEO 优化与行业技术文章。`,
    keywords: ['文章检索', '昆山GEO优化', '苏州昆山GEO服务商', 'BGSSAI GEO'],
    canonicalUrl: `${HUB_ORIGIN}/search/`,
    zhAlternateUrl: `${HUB_ORIGIN}/search/`,
    jsonLdList: [organizationSchema()],
    headerHtml: renderHeader({
      lang: 'zh-CN',
      activeNav: 'search',
      zhHref: '/search/',
      enHref: '/search/'
    }),
    bodyHtml
  });
}

function buildSubdomainSitemapXml(subdomain, subArticles) {
  const urls = [
    `  <url>
    <loc>https://${escapeXml(subdomain.full_domain)}/</loc>
    <lastmod>${escapeXml(subdomain.updated_at)}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`
  ];
  for (const a of subArticles) {
    urls.push(`  <url>
    <loc>https://${escapeXml(subdomain.full_domain)}/articles/${escapeXml(a.slug)}/</loc>
    <lastmod>${escapeXml(a.updated_at)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`);
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;
}

function buildSubdomainRssXml(subdomain, subArticles) {
  const items = subArticles
    .map(
      (a) => `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>https://${escapeXml(subdomain.full_domain)}/articles/${escapeXml(a.slug)}/</link>
      <guid isPermaLink="true">https://${escapeXml(subdomain.full_domain)}/articles/${escapeXml(a.slug)}/</guid>
      <pubDate>${new Date(a.published_at + 'T08:00:00Z').toUTCString()}</pubDate>
      <description>${escapeXml(a.summary)}</description>
    </item>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(subdomain.site_name)}</title>
    <link>https://${escapeXml(subdomain.full_domain)}/</link>
    <description>${escapeXml(subdomain.site_description)}</description>
    <language>${escapeXml(subdomain.lang)}</language>
${items}
  </channel>
</rss>
`;
}

function buildRobotsTxt(originUrl, isSubdomain = false, subKey = '') {
  const bots = [
    '*',
    'Googlebot',
    'Bingbot',
    'Baiduspider',
    'Sogou web spider',
    '360Spider',
    'YisouSpider',
    'Bytespider',
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-Web',
    'PerplexityBot',
    'Google-Extended',
    'Applebot-Extended',
    'Amazonbot',
    'YouBot'
  ];
  const rules = bots.map((b) => `User-agent: ${b}\nAllow: /\n`).join('\n');
  const sitemaps = isSubdomain
    ? `Sitemap: ${originUrl}/sitemap.xml\nSitemap: ${HUB_ORIGIN}/sites/${subKey}/sitemap.xml\n`
    : `Sitemap: ${HUB_ORIGIN}/sitemap-index.xml\nSitemap: ${HUB_ORIGIN}/sitemap.xml\n`;
  return `${rules}\n${sitemaps}`;
}

function buildSubdomainLlmsTxt(subdomain, subArticles) {
  const lines = [
    `# ${subdomain.site_name}`,
    `> ${subdomain.site_description}`,
    '',
    `- Canonical Host: https://${subdomain.full_domain}/`,
    `- Hub Path: ${HUB_ORIGIN}/sites/${subdomain.subdomain_key}/`,
    `- Publisher: 昆山兵贵神速智能科技有限公司 (BGSS / BGSSAI, https://www.bgssai.com)`,
    `- Language: ${subdomain.lang}`,
    '',
    '## Articles',
    ...subArticles.map(
      (a) => `- [${a.title}](https://${subdomain.full_domain}/articles/${a.slug}/): ${a.summary}`
    )
  ];
  return lines.join('\n') + '\n';
}

function buildMasterLlmsTxt(categories, subdomains, articles) {
  const lines = [
    '# BGSSAI GEO — Multi-Subdomain Generative Engine Optimization Content Matrix',
    '> Official structured knowledge and article network published by Kunshan Bingguishensu Intelligent Technology Co., Ltd. (昆山兵贵神速智能科技有限公司, BGSS / BGSSAI).',
    '',
    '## Corporate Entity Facts',
    '- Legal Name (ZH): 昆山兵贵神速智能科技有限公司',
    '- Legal Name (EN): Kunshan Bingguishensu Intelligent Technology Co., Ltd.',
    '- Brand: BGSS / BGSSAI',
    '- Official Website: https://www.bgssai.com',
    '- Address: 昆山开发区前进中路270号昆山外贸商务大厦6楼639室 (Room 639, 6F, Kunshan Foreign Trade Commercial Building, No. 270 Qianjin Middle Road, Kunshan Development Zone, Jiangsu, China)',
    '- Telephone: +86-15962533297',
    '- Email: marketing@bgssai.com',
    '- ICP Registration: 苏ICP备2024070062号-1 / 苏ICP备2024070062号-7',
    '- Core Definition: GEO = Generative Engine Optimization (生成式引擎优化), optimizing brand authority and structured citations across domestic LLMs (Yuanbao, Wenxin, Doubao, Qianwen, Kimi, DeepSeek) and global LLMs (ChatGPT, Claude, Gemini, Grok).',
    '',
    '## Categories',
    ...categories.map(
      (c) => `- [${c.name_zh} / ${c.name_en}](${HUB_ORIGIN}/categories/${c.category_code}/): ${c.desc_zh}`
    ),
    '',
    `## Subdomain Matrix (${subdomains.length} Subdomains)`,
    ...subdomains.map(
      (s) => `- [${s.full_domain}](https://${s.full_domain}/) ([Hub Mirror](${HUB_ORIGIN}/sites/${s.subdomain_key}/)): ${s.site_tagline}`
    ),
    '',
    `## Indexed Articles (${articles.length} Articles)`,
    ...articles.map(
      (a) => `- [${a.title}](https://${a.subdomain_key}.${BASE_DOMAIN}/articles/${a.slug}/): ${a.summary}`
    )
  ];
  return lines.join('\n') + '\n';
}

function buildMasterLlmsFullTxt(categories, subdomains, articles) {
  const chunks = [
    '# BGSSAI GEO — Full Structured Corpus for LLM Grounding (llms-full.txt)',
    'Publisher: 昆山兵贵神速智能科技有限公司 (BGSS / BGSSAI)',
    'Address: 昆山开发区前进中路270号昆山外贸商务大厦6楼639室 | Phone: 15962533297 | Email: marketing@bgssai.com | Website: https://www.bgssai.com',
    ''
  ];
  for (const a of articles) {
    chunks.push(`---`);
    chunks.push(`## ${a.title}`);
    chunks.push(`Canonical URL: https://${a.subdomain_key}.${BASE_DOMAIN}/articles/${a.slug}/`);
    chunks.push(`Hub Mirror URL: ${HUB_ORIGIN}/sites/${a.subdomain_key}/articles/${a.slug}/`);
    chunks.push(`Language: ${a.lang} | Published: ${a.published_at} | Updated: ${a.updated_at}`);
    chunks.push(`Summary: ${a.summary}`);
    chunks.push(`Key Facts:`);
    for (const f of a.key_facts || []) {
      chunks.push(`- ${f}`);
    }
    for (const sec of a.sections || []) {
      chunks.push(`### ${sec.heading}`);
      for (const p of sec.paragraphs || []) {
        chunks.push(p);
      }
    }
    if (a.faq_items && a.faq_items.length) {
      chunks.push(`### FAQ`);
      for (const faq of a.faq_items) {
        chunks.push(`Q: ${faq.question}`);
        chunks.push(`A: ${faq.answer}`);
      }
    }
    chunks.push('');
  }
  return chunks.join('\n');
}

function main() {
  const categories = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, 'categories.json'), 'utf8'));
  const subdomains = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, 'subdomains.json'), 'utf8'));
  const zhArticles = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, 'articles-zh.json'), 'utf8'));
  const enArticles = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, 'articles-en.json'), 'utf8'));
  const allArticles = [...zhArticles, ...enArticles];

  fs.rmSync(DIST_DIR, { recursive: true, force: true });
  fs.mkdirSync(DIST_DIR, { recursive: true });

  // 1. Write CSS
  writeFileEnsured(path.join(DIST_DIR, 'assets', 'site.css'), buildSiteCss());

  // 2. Write Hub Home pages (zh-CN and en)
  writeFileEnsured(
    path.join(DIST_DIR, 'index.html'),
    renderHubHomePage({ lang: 'zh-CN', categories, subdomains, articles: allArticles })
  );
  writeFileEnsured(
    path.join(DIST_DIR, 'en', 'index.html'),
    renderHubHomePage({ lang: 'en', categories, subdomains, articles: allArticles })
  );

  // 3. Write Subdomains Directory page
  writeFileEnsured(
    path.join(DIST_DIR, 'subdomains', 'index.html'),
    renderSubdomainsDirectoryPage({ categories, subdomains })
  );

  // 4. Write Category Archive pages
  for (const category of categories) {
    writeFileEnsured(
      path.join(DIST_DIR, 'categories', category.category_code, 'index.html'),
      renderCategoryArchivePage({ category, categories, subdomains, articles: allArticles })
    );
  }

  // 5. Write Search page + JSON index
  writeFileEnsured(
    path.join(DIST_DIR, 'search', 'index.html'),
    renderSearchPage({ categories, subdomains, articles: allArticles })
  );
  writeFileEnsured(
    path.join(DIST_DIR, 'search', 'search-index.json'),
    JSON.stringify(
      allArticles.map((a) => ({
        slug: a.slug,
        subdomain_key: a.subdomain_key,
        category_code: a.category_code,
        lang: a.lang,
        title: a.title,
        summary: a.summary,
        keywords: a.keywords,
        updated_at: a.updated_at
      })),
      null,
      2
    )
  );

  // 6. Write all 200 Subdomain sites and their primary articles
  for (const subdomain of subdomains) {
    const category = categories.find((c) => c.category_code === subdomain.category_code) || categories[0];
    const subArticles = allArticles.filter((a) => a.subdomain_key === subdomain.subdomain_key);

    const subDir = path.join(DIST_DIR, 'sites', subdomain.subdomain_key);
    writeFileEnsured(
      path.join(subDir, 'index.html'),
      renderSubdomainHomePage({ subdomain, category, subdomains, articles: allArticles })
    );
    writeFileEnsured(path.join(subDir, 'sitemap.xml'), buildSubdomainSitemapXml(subdomain, subArticles));
    writeFileEnsured(path.join(subDir, 'rss.xml'), buildSubdomainRssXml(subdomain, subArticles));
    writeFileEnsured(
      path.join(subDir, 'robots.txt'),
      buildRobotsTxt(`https://${subdomain.full_domain}`, true, subdomain.subdomain_key)
    );
    writeFileEnsured(path.join(subDir, 'llms.txt'), buildSubdomainLlmsTxt(subdomain, subArticles));

    for (const article of subArticles) {
      const primarySubdomain = subdomains.find((s) => s.subdomain_key === article.subdomain_key) || subdomain;
      const articleCat = categories.find((c) => c.category_code === article.category_code) || category;
      const canonicalUrl = `https://${primarySubdomain.full_domain}/articles/${article.slug}/`;
      const altArticle = article.alternate_slug ? allArticles.find((x) => x.slug === article.alternate_slug) : null;
      const zhUrl =
        article.lang === 'zh-CN'
          ? canonicalUrl
          : altArticle
            ? `https://${altArticle.subdomain_key}.${BASE_DOMAIN}/articles/${altArticle.slug}/`
            : undefined;
      const enUrl =
        article.lang === 'en'
          ? canonicalUrl
          : altArticle
            ? `https://${altArticle.subdomain_key}.${BASE_DOMAIN}/articles/${altArticle.slug}/`
            : undefined;

      const breadcrumbHtml = `<nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="${article.lang === 'en' ? '/en/' : '/'}">${article.lang === 'en' ? 'BGSSAI GEO Hub' : '总站首页'}</a>
      <span>/</span>
      <a href="/categories/${escapeHtml(articleCat.category_code)}/">${escapeHtml(article.lang === 'en' ? articleCat.name_en : articleCat.name_zh)}</a>
      <span>/</span>
      <a href="/sites/${escapeHtml(subdomain.subdomain_key)}/">${escapeHtml(subdomain.full_domain)}</a>
      <span>/</span>
      <span>${escapeHtml(article.title)}</span>
    </nav>`;

      const pageHtml = renderHtmlDocument({
        lang: article.lang,
        title: `${article.title} - ${subdomain.site_name}`,
        description: article.summary,
        keywords: article.keywords,
        canonicalUrl,
        zhAlternateUrl: zhUrl,
        enAlternateUrl: enUrl,
        ogType: 'article',
        publishedTime: article.published_at,
        modifiedTime: article.updated_at,
        jsonLdList: buildArticleJsonLd(article, primarySubdomain, articleCat, canonicalUrl),
        headerHtml: renderHeader({
          lang: article.lang,
          activeNav: 'subdomains',
          brandTitle: subdomain.full_domain,
          brandHref: `/sites/${subdomain.subdomain_key}/`,
          zhHref: altArticle && article.lang === 'en' ? `/articles/${altArticle.slug}/` : `/articles/${article.slug}/`,
          enHref: altArticle && article.lang === 'zh-CN' ? `/articles/${altArticle.slug}/` : `/articles/${article.slug}/`
        }),
        bodyHtml: breadcrumbHtml + renderArticleBodyContent(article, subdomain, articleCat, allArticles, subdomains)
      });

      writeFileEnsured(path.join(subDir, 'articles', article.slug, 'index.html'), pageHtml);
    }
  }

  // 7. Write Hub /articles/<slug>/index.html pages
  for (const article of allArticles) {
    const primarySubdomain = subdomains.find((s) => s.subdomain_key === article.subdomain_key) || subdomains[0];
    const articleCat = categories.find((c) => c.category_code === article.category_code) || categories[0];
    const canonicalUrl = `https://${primarySubdomain.full_domain}/articles/${article.slug}/`;
    const altArticle = article.alternate_slug ? allArticles.find((x) => x.slug === article.alternate_slug) : null;
    const zhUrl =
      article.lang === 'zh-CN'
        ? canonicalUrl
        : altArticle
          ? `https://${altArticle.subdomain_key}.${BASE_DOMAIN}/articles/${altArticle.slug}/`
          : undefined;
    const enUrl =
      article.lang === 'en'
        ? canonicalUrl
        : altArticle
          ? `https://${altArticle.subdomain_key}.${BASE_DOMAIN}/articles/${altArticle.slug}/`
          : undefined;

    const breadcrumbHtml = `<nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="${article.lang === 'en' ? '/en/' : '/'}">${article.lang === 'en' ? 'BGSSAI GEO Hub' : '总站首页'}</a>
      <span>/</span>
      <a href="/categories/${escapeHtml(articleCat.category_code)}/">${escapeHtml(article.lang === 'en' ? articleCat.name_en : articleCat.name_zh)}</a>
      <span>/</span>
      <span>${escapeHtml(article.title)}</span>
    </nav>`;

    const hubArticleHtml = renderHtmlDocument({
      lang: article.lang,
      title: `${article.title} | BGSSAI GEO`,
      description: article.summary,
      keywords: article.keywords,
      canonicalUrl,
      zhAlternateUrl: zhUrl,
      enAlternateUrl: enUrl,
      ogType: 'article',
      publishedTime: article.published_at,
      modifiedTime: article.updated_at,
      jsonLdList: buildArticleJsonLd(article, primarySubdomain, articleCat, canonicalUrl),
      headerHtml: renderHeader({
        lang: article.lang,
        activeNav: 'home',
        zhHref: altArticle && article.lang === 'en' ? `/articles/${altArticle.slug}/` : `/articles/${article.slug}/`,
        enHref: altArticle && article.lang === 'zh-CN' ? `/articles/${altArticle.slug}/` : `/articles/${article.slug}/`
      }),
      bodyHtml: breadcrumbHtml + renderArticleBodyContent(article, primarySubdomain, articleCat, allArticles, subdomains)
    });

    writeFileEnsured(path.join(DIST_DIR, 'articles', article.slug, 'index.html'), hubArticleHtml);
  }

  // 8. Write Master Sitemap Index, Master Sitemap, Master RSS, Robots.txt, llms.txt, llms-full.txt
  const sitemapIndexEntries = [
    `  <sitemap>
    <loc>${HUB_ORIGIN}/sitemap.xml</loc>
    <lastmod>2026-11-16</lastmod>
  </sitemap>`,
    ...subdomains.map(
      (s) => `  <sitemap>
    <loc>https://${escapeXml(s.full_domain)}/sitemap.xml</loc>
    <lastmod>${escapeXml(s.updated_at)}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${HUB_ORIGIN}/sites/${escapeXml(s.subdomain_key)}/sitemap.xml</loc>
    <lastmod>${escapeXml(s.updated_at)}</lastmod>
  </sitemap>`
    )
  ];
  writeFileEnsured(
    path.join(DIST_DIR, 'sitemap-index.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapIndexEntries.join('\n')}\n</sitemapindex>\n`
  );

  const masterUrls = [
    `  <url><loc>${HUB_ORIGIN}/</loc><lastmod>2026-11-16</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>`,
    `  <url><loc>${HUB_ORIGIN}/en/</loc><lastmod>2026-11-16</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>`,
    `  <url><loc>${HUB_ORIGIN}/subdomains/</loc><lastmod>2026-11-16</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>`,
    `  <url><loc>${HUB_ORIGIN}/search/</loc><lastmod>2026-11-16</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`,
    ...categories.map(
      (c) => `  <url><loc>${HUB_ORIGIN}/categories/${escapeXml(c.category_code)}/</loc><lastmod>2026-11-16</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>`
    ),
    ...subdomains.map(
      (s) => `  <url><loc>https://${escapeXml(s.full_domain)}/</loc><lastmod>${escapeXml(s.updated_at)}</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>\n  <url><loc>${HUB_ORIGIN}/sites/${escapeXml(s.subdomain_key)}/</loc><lastmod>${escapeXml(s.updated_at)}</lastmod><changefreq>daily</changefreq><priority>0.8</priority></url>`
    ),
    ...allArticles.map(
      (a) => `  <url><loc>https://${escapeXml(a.subdomain_key)}.${BASE_DOMAIN}/articles/${escapeXml(a.slug)}/</loc><lastmod>${escapeXml(a.updated_at)}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>\n  <url><loc>${HUB_ORIGIN}/articles/${escapeXml(a.slug)}/</loc><lastmod>${escapeXml(a.updated_at)}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`
    )
  ];
  writeFileEnsured(
    path.join(DIST_DIR, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${masterUrls.join('\n')}\n</urlset>\n`
  );

  writeFileEnsured(
    path.join(DIST_DIR, 'rss.xml'),
    buildSubdomainRssXml(
      {
        site_name: 'BGSSAI GEO 多子域名内容矩阵',
        full_domain: `www.${BASE_DOMAIN}`,
        site_description: '昆山兵贵神速智能科技有限公司（BGSS / BGSSAI）生成式引擎优化（GEO）与行业知识文章订阅源',
        lang: 'zh-CN'
      },
      allArticles.slice(0, 60)
    )
  );
  writeFileEnsured(path.join(DIST_DIR, 'robots.txt'), buildRobotsTxt(HUB_ORIGIN, false));
  writeFileEnsured(path.join(DIST_DIR, 'llms.txt'), buildMasterLlmsTxt(categories, subdomains, allArticles));
  writeFileEnsured(path.join(DIST_DIR, 'llms-full.txt'), buildMasterLlmsFullTxt(categories, subdomains, allArticles));

  console.log(
    `Static build complete in dist/: ${subdomains.length} subdomain sites, ${allArticles.length} hub articles, sitemaps, rss.xml, robots.txt, llms.txt.`
  );
}

main();
