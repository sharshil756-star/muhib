import React, { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ARTICLES_DATA } from '../data/articlesData';
import { ResilientImage } from '../components/ResilientImage';
import { updateDocumentSeoMeta } from '../utils/seoDomUpdater';
import { ArrowLeft, ArrowUpRight, CheckCircle2, BookOpen, Share2 } from 'lucide-react';

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [copiedUrl, setCopiedUrl] = useState(false);

  const articleIndex = ARTICLES_DATA.findIndex((a) => a.slug === slug);
  const article = ARTICLES_DATA[articleIndex];

  useEffect(() => {
    if (!article) return;

    updateDocumentSeoMeta(
      {
        pageName: `Article ${article.numberIndex}: ${article.headlineH1}`,
        urlPath: article.urlPath,
        seoTitle: article.seoTitle,
        metaDescription: article.metaDescription,
        mainKeyword: article.mainKeyword,
        relatedKeywords: article.relatedKeywords,
        monthlySearchVolume: article.monthlySearchVolume,
        keywordDifficulty: article.keywordDifficulty,
        searchIntent: article.searchIntent,
        isCoreStep2Target: article.isCoreThree,
      },
      article
    );

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article]);

  if (!article) {
    return <Navigate to="/" replace />;
  }

  const prevArticle =
    ARTICLES_DATA[(articleIndex - 1 + ARTICLES_DATA.length) % ARTICLES_DATA.length];
  const nextArticle = ARTICLES_DATA[(articleIndex + 1) % ARTICLES_DATA.length];
  const relatedArticles = ARTICLES_DATA.filter((a) => a.id !== article.id).slice(0, 3);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <article className="min-h-screen pb-20">
      {/* Top Breadcrumb & On-Page Keyword Strip */}
      <div className="bg-[#F5F1E8] border-b border-stone-200 text-xs text-stone-600">
        <div className="max-w-[1320px] mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 font-medium text-stone-900 hover:text-[#9A3412] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Future Use of AI Journal Homepage</span>
            </Link>
            <span aria-hidden="true">·</span>
            <span className="font-mono-tabular text-stone-500">
              URL: {article.urlPath}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono-tabular">
            <span className="text-stone-500">Main Keyword:</span>
            <strong className="text-[#9A3412]">{article.mainKeyword}</strong>
            <span aria-hidden="true">·</span>
            <span className="text-stone-500">Related:</span>
            <span>{article.relatedKeywords[0]}</span>
            <span aria-hidden="true">/</span>
            <span>{article.relatedKeywords[1]}</span>
          </div>
        </div>
      </div>

      {/* Article Header (H1, Subtitle Deck, Author & Publication Metadata) */}
      <header className="max-w-[1320px] mx-auto px-6 pt-10 pb-10 border-b border-stone-200">
        <div className="max-w-4xl space-y-5">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-mono-tabular">
            <span>MONOGRAPH {article.numberIndex} OF 10</span>
            <span aria-hidden="true">·</span>
            <span>{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>PUBLISHED {article.publishedDate.toUpperCase()}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readingTimeMinutes} MIN READ ({article.wordCount} WORDS)</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-[52px] font-semibold text-stone-900 leading-[1.1] text-balance">
            {article.headlineH1}
          </h1>

          <p className="text-lg sm:text-xl text-stone-700 leading-relaxed max-w-3xl">
            {article.subtitleDeck}
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-stone-200/80 text-xs text-stone-600">
            <div>
              <span className="font-semibold text-stone-900">{article.author.name}</span>
              <span aria-hidden="true"> · </span>
              <span>{article.author.role}</span>
              <span aria-hidden="true"> · </span>
              <span className="italic">{article.author.institution}</span>
            </div>

            <button
              type="button"
              onClick={handleCopyUrl}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-stone-300 rounded text-stone-800 hover:border-stone-900 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedUrl ? 'Unique Article URL Copied' : 'Copy Unique Article URL'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Pattern D: Two-Column Asymmetric Reading Canvas (70% Main Essay / 30% Archival & SEO Sidebar) */}
      <div className="max-w-[1320px] mx-auto px-6 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Main Long-Form Essay Narrative (8 columns) */}
        <div className="lg:col-span-8 space-y-10">
          {/* Dedicated Unique Article Image with Alt Text & Figure Caption */}
          <figure className="space-y-2.5">
            <ResilientImage
              src={article.image.src}
              alt={article.image.altText}
              aspectRatioClass="aspect-[4/3]"
              fileSizeKb={article.image.fileSizeKb}
              dimensions={article.image.dimensions}
              priority
            />
            <figcaption className="text-xs font-editorial italic text-stone-600 leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
              <span>{article.image.caption}</span>
              <span className="font-mono-tabular not-italic text-[11px] text-stone-500 shrink-0">
                Alt attribute: &ldquo;{article.image.altText}&rdquo;
              </span>
            </figcaption>
          </figure>

          {/* Executive Summary Callout */}
          <div className="p-6 bg-[#F3EFE6] border border-stone-300 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono-tabular text-stone-600">
              <span>EMPIRICAL HORIZON BENCHMARK</span>
              <span>{article.forecast2035Metric.timeframe}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-4">
              <span className="font-mono-tabular text-3xl font-semibold text-[#9A3412]">
                {article.forecast2035Metric.value}
              </span>
              <p className="text-sm text-stone-800 font-medium">
                {article.forecast2035Metric.label} ({article.forecast2035Metric.baselineComparison})
              </p>
            </div>
          </div>

          {/* AEO Question & Answer Sections (H2 Subheadings + Direct Answers + Deep Dive Prose) */}
          <div className="space-y-12">
            {article.aeoSections.map((section, idx) => (
              <section
                key={section.id}
                id={section.id}
                className="space-y-5 scroll-mt-24 border-b border-stone-200 pb-10 last:border-b-0"
              >
                <div className="text-xs font-mono-tabular uppercase tracking-widest text-[#9A3412]">
                  AEO QUESTION &amp; ANSWER SECTION 0{idx + 1}
                </div>

                {/* H2 Strictly in Question Format for AEO */}
                <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-stone-900 leading-snug text-balance">
                  {section.questionH2}
                </h2>

                {/* Direct Answer Paragraph for Answer Engine Optimization */}
                <p
                  className={`text-base sm:text-[17px] text-stone-900 font-medium leading-[1.8] max-w-[68ch] ${
                    idx === 0
                      ? 'first-letter:text-5xl first-letter:font-editorial first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-[#9A3412]'
                      : ''
                  }`}
                >
                  {section.directAnswerParagraph}
                </p>

                {/* Deep-Dive Long-Form Paragraphs */}
                {section.deepDiveParagraphs.map((para, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-base text-stone-700 leading-[1.8] max-w-[68ch]"
                  >
                    {para}
                  </p>
                ))}

                {/* Contextual Internal Link with Descriptive Keyword-Rich Anchor Text */}
                <p className="text-base text-stone-700 leading-[1.8] max-w-[68ch]">
                  {section.internalLink.contextSentence}{' '}
                  <Link
                    to={section.internalLink.targetUrl}
                    className="font-semibold text-[#9A3412] underline underline-offset-4 hover:text-stone-900 transition-colors"
                  >
                    {section.internalLink.anchorText}
                  </Link>
                  , establishing a verifiable cross-disciplinary framework for 2030 deployments.
                </p>

                {/* Key Takeaway Box */}
                <div className="p-4 bg-white border border-stone-200 text-xs text-stone-700 flex items-start gap-2.5 max-w-[68ch]">
                  <CheckCircle2 className="w-4 h-4 text-[#9A3412] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-900">Key AEO Takeaway: </strong>
                    {section.keyTakeaway}
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Editorial Pull Quote (Top & Bottom Hairline Dividers, NO thick left accent border) */}
          <blockquote className="py-8 my-8 border-y border-stone-300 text-center px-4">
            <p className="font-editorial text-2xl sm:text-3xl italic text-stone-900 leading-relaxed max-w-2xl mx-auto">
              &ldquo;{article.pullQuote.text}&rdquo;
            </p>
            <footer className="text-xs uppercase tracking-widest text-stone-500 mt-4 font-sans not-italic">
              — {article.pullQuote.attribution}
            </footer>
          </blockquote>

          {/* Sequential Article Navigation with Descriptive Anchor Text */}
          <nav
            aria-label="Adjacent Monograph Navigation"
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-stone-300"
          >
            <Link
              to={prevArticle.urlPath}
              className="p-5 border border-stone-200 bg-white/70 hover:border-stone-900 transition-colors group"
            >
              <span className="text-xs font-mono-tabular text-stone-500 block">
                ← Previous Monograph ({prevArticle.numberIndex})
              </span>
              <span className="font-editorial text-lg font-semibold text-stone-900 group-hover:text-[#9A3412] mt-1 block">
                Read {prevArticle.mainKeyword}: {prevArticle.seoTitle}
              </span>
            </Link>

            <Link
              to={nextArticle.urlPath}
              className="p-5 border border-stone-200 bg-white/70 hover:border-stone-900 transition-colors group text-right"
            >
              <span className="text-xs font-mono-tabular text-stone-500 block">
                Next Monograph ({nextArticle.numberIndex}) →
              </span>
              <span className="font-editorial text-lg font-semibold text-stone-900 group-hover:text-[#9A3412] mt-1 block">
                Read {nextArticle.mainKeyword}: {nextArticle.seoTitle}
              </span>
            </Link>
          </nav>
        </div>

        {/* Right Margin Sidebar: On-Page SEO Verification & Chapter Index (4 columns) */}
        <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
          {/* Step 3 On-Page SEO Verification Card */}
          <div className="border border-stone-300 bg-white p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <span className="text-xs font-mono-tabular uppercase tracking-wider font-semibold text-[#9A3412]">
                STEP 3 · ON-PAGE SEO RECORD
              </span>
              <span className="text-[11px] font-mono-tabular text-emerald-800">
                100% COMPLIANT
              </span>
            </div>

            <dl className="space-y-3 text-xs">
              <div className="border-b border-stone-100 pb-2.5">
                <dt className="text-stone-500 font-medium">1. Unique URL (Good URL Rules):</dt>
                <dd className="font-mono-tabular text-stone-900 mt-1 break-all bg-stone-50 p-1.5 border border-stone-200">
                  {article.urlPath}
                </dd>
              </div>

              <div className="border-b border-stone-100 pb-2.5">
                <dt className="text-stone-500 font-medium">2. Main Keyword (1):</dt>
                <dd className="font-mono-tabular font-semibold text-[#9A3412] mt-0.5 text-sm">
                  {article.mainKeyword}
                </dd>
              </div>

              <div className="border-b border-stone-100 pb-2.5">
                <dt className="text-stone-500 font-medium">3. Related Keywords (2):</dt>
                <dd className="font-mono-tabular text-stone-900 mt-1 space-y-1">
                  <div className="bg-stone-50 px-2 py-1 border border-stone-200">
                    • {article.relatedKeywords[0]}
                  </div>
                  <div className="bg-stone-50 px-2 py-1 border border-stone-200">
                    • {article.relatedKeywords[1]}
                  </div>
                </dd>
              </div>

              <div className="border-b border-stone-100 pb-2.5">
                <dt className="text-stone-500 font-medium flex justify-between">
                  <span>4. Page Title Tag:</span>
                  <span className="font-mono-tabular text-emerald-800">
                    {article.seoTitle.length} chars
                  </span>
                </dt>
                <dd className="text-stone-800 mt-1 leading-relaxed">{article.seoTitle}</dd>
              </div>

              <div className="border-b border-stone-100 pb-2.5">
                <dt className="text-stone-500 font-medium flex justify-between">
                  <span>5. Meta Description Tag:</span>
                  <span className="font-mono-tabular text-emerald-800">
                    {article.metaDescription.length} chars
                  </span>
                </dt>
                <dd className="text-stone-800 mt-1 leading-relaxed">
                  {article.metaDescription}
                </dd>
              </div>

              <div>
                <dt className="text-stone-500 font-medium flex justify-between">
                  <span>6. Image Size &amp; Alt Text:</span>
                  <span className="font-mono-tabular text-emerald-800">
                    {article.image.fileSizeKb} KB
                  </span>
                </dt>
                <dd className="text-stone-700 mt-1 italic leading-relaxed">
                  &ldquo;{article.image.altText}&rdquo;
                </dd>
              </div>
            </dl>

            <div className="pt-2">
              <Link
                to="/seo-keyword-research"
                className="w-full py-2.5 px-4 bg-stone-900 text-stone-50 text-xs font-medium rounded text-center block hover:bg-[#9A3412] transition-colors"
              >
                View Full Step 2 Keyword Research Table
              </Link>
            </div>
          </div>

          {/* AEO Question Table of Contents */}
          <div className="border border-stone-200 bg-[#F3EFE6]/70 p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-700">
              <BookOpen className="w-3.5 h-3.5 text-[#9A3412]" />
              <span>AEO Question-Answer Outline (H2s)</span>
            </div>
            <ul className="space-y-2.5 text-xs">
              {article.aeoSections.map((sec, i) => (
                <li key={sec.id}>
                  <a
                    href={`#${sec.id}`}
                    className="text-stone-700 hover:text-[#9A3412] transition-colors block leading-relaxed"
                  >
                    <span className="font-mono-tabular text-stone-400 mr-1.5">0{i + 1}.</span>
                    {sec.questionH2}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Related Monographs with Descriptive Anchor Text */}
          <div className="border border-stone-200 bg-white p-6 space-y-4">
            <h3 className="font-editorial text-xl font-semibold text-stone-900">
              Related Future AI Monographs
            </h3>
            <div className="space-y-4 divide-y divide-stone-200">
              {relatedArticles.map((rel) => (
                <div key={rel.id} className="pt-3 first:pt-0">
                  <span className="text-[11px] font-mono-tabular text-stone-500 block">
                    Monograph {rel.numberIndex} · {rel.category}
                  </span>
                  <Link
                    to={rel.urlPath}
                    className="font-medium text-xs text-[#9A3412] hover:text-stone-900 transition-colors inline-flex items-center gap-1 mt-1"
                  >
                    <span>
                      Read {rel.mainKeyword}: {rel.seoTitle}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
};
