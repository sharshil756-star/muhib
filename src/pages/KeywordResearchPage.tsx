import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ALL_SEO_KEYWORD_TABLE_ROWS,
  ARTICLES_DATA,
  HERO_EDITORIAL_IMAGE,
  HOMEPAGE_SEO_CONFIG,
} from '../data/articlesData';
import { updateDocumentSeoMeta } from '../utils/seoDomUpdater';
import { Copy, Check, ArrowUpRight, CheckCircle2, Download } from 'lucide-react';

export const KeywordResearchPage: React.FC = () => {
  const [filterMode, setFilterMode] = useState<'step2Core' | 'allPages'>('step2Core');
  const [copiedCsv, setCopiedCsv] = useState(false);

  useEffect(() => {
    updateDocumentSeoMeta({
      pageName: 'Step 2: SEO Keyword Research Table & On-Page Audit',
      urlPath: '/seo-keyword-research',
      seoTitle: 'AI SEO Keyword Research Table: Homepage & Articles | Aethelgard',
      metaDescription:
        'Review the complete SEO keyword research table for the homepage and future of AI articles, including main keywords, related keywords, titles, and meta tags.',
      mainKeyword: 'AI SEO keyword research table',
      relatedKeywords: ['on page SEO keyword mapping', 'AEO question answer optimization'],
      monthlySearchVolume: 12400,
      keywordDifficulty: 31,
      searchIntent: 'Informational',
      isCoreStep2Target: false,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const rows =
    filterMode === 'step2Core'
      ? ALL_SEO_KEYWORD_TABLE_ROWS.filter((r) => r.isCoreStep2Target)
      : ALL_SEO_KEYWORD_TABLE_ROWS;

  const handleCopyCsv = () => {
    const headers = [
      'Page Name',
      'Unique URL',
      'Main Keyword (1)',
      'Related Keyword 1',
      'Related Keyword 2',
      'Monthly Search Volume',
      'Keyword Difficulty',
      'Search Intent',
      'SEO Title (50-60 chars)',
      'Meta Description (140-160 chars)',
    ];
    const csvLines = [
      headers.join(','),
      ...rows.map((r) =>
        [
          `"${r.pageName}"`,
          `"${r.urlPath}"`,
          `"${r.mainKeyword}"`,
          `"${r.relatedKeywords[0]}"`,
          `"${r.relatedKeywords[1]}"`,
          r.monthlySearchVolume,
          r.keywordDifficulty,
          `"${r.searchIntent}"`,
          `"${r.seoTitle}"`,
          `"${r.metaDescription}"`,
        ].join(',')
      ),
    ];
    navigator.clipboard.writeText(csvLines.join('\n'));
    setCopiedCsv(true);
    setTimeout(() => setCopiedCsv(false), 2500);
  };

  const handleDownloadCsv = () => {
    const headers = [
      'Page Name',
      'Unique URL',
      'Main Keyword (1)',
      'Related Keyword 1',
      'Related Keyword 2',
      'Monthly Search Volume',
      'Keyword Difficulty',
      'Search Intent',
      'SEO Title',
      'Meta Description',
    ];
    const csvLines = [
      headers.join(','),
      ...ALL_SEO_KEYWORD_TABLE_ROWS.map((r) =>
        [
          `"${r.pageName}"`,
          `"${r.urlPath}"`,
          `"${r.mainKeyword}"`,
          `"${r.relatedKeywords[0]}"`,
          `"${r.relatedKeywords[1]}"`,
          r.monthlySearchVolume,
          r.keywordDifficulty,
          `"${r.searchIntent}"`,
          `"${r.seoTitle}"`,
          `"${r.metaDescription}"`,
        ].join(',')
      ),
    ];
    const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'future-use-of-ai-keyword-research-table.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-[1320px] mx-auto px-6 space-y-12">
        {/* Page Header */}
        <header className="border-b border-stone-300 pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <p className="text-xs uppercase tracking-widest text-[#9A3412] font-semibold">
              STEP 2 &amp; STEP 3 VERIFICATION MATRIX · ON-PAGE SEO &amp; AEO
            </p>
            <h1 className="font-editorial text-4xl sm:text-5xl font-semibold text-stone-900 leading-tight text-balance">
              How Are Keywords, Titles, and AEO Subheadings Mapped Across Every Page?
            </h1>
            <p className="text-base text-stone-700 leading-relaxed">
              This interactive matrix documents our <strong>AI SEO keyword research table</strong> for
              the Homepage and 3 Core Articles (plus all 10 blog monographs), along with full
              On-Page SEO and Answer Engine Optimization (AEO) rule verification.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleCopyCsv}
              className="px-4 py-2.5 border border-stone-300 bg-white text-stone-900 text-xs font-medium rounded-lg hover:border-stone-900 transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              {copiedCsv ? (
                <>
                  <Check className="w-4 h-4 text-emerald-700" />
                  <span>Copied Table to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Table CSV</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownloadCsv}
              className="px-4 py-2.5 bg-stone-900 text-stone-50 text-xs font-medium rounded-lg hover:bg-[#9A3412] transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download CSV</span>
            </button>
          </div>
        </header>

        {/* Filter Mode Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1 p-1 bg-stone-200/80 rounded-lg w-fit">
            <button
              type="button"
              onClick={() => setFilterMode('step2Core')}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                filterMode === 'step2Core'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Step 2 Focus: Homepage + 3 Articles (4 Rows)
            </button>
            <button
              type="button"
              onClick={() => setFilterMode('allPages')}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                filterMode === 'allPages'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Full Blog Scope: Homepage + All 10 Articles (11 Rows)
            </button>
          </div>

          <div className="text-xs text-stone-600 font-mono-tabular">
            Showing {rows.length} verified URLs · 1 Main Keyword + 2 Related Keywords per page
          </div>
        </div>

        {/* STEP 2 TABLE: KEYWORD RESEARCH TABLE */}
        <section className="space-y-4">
          <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-stone-900">
            What Is the Keyword Research Table for the Homepage and Articles?
          </h2>
          <p className="text-sm text-stone-600 max-w-3xl">
            Each page targets one primary high-volume keyword and two semantically related long-tail
            keywords to maximize topical authority without keyword cannibalization.
          </p>

          <div className="overflow-x-auto border border-stone-300 bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-300 bg-[#F3EFE6] text-[11px] font-semibold uppercase tracking-wider text-stone-700">
                  <th className="py-3.5 px-4">Page &amp; Unique URL Slug</th>
                  <th className="py-3.5 px-4">Main Keyword (Primary)</th>
                  <th className="py-3.5 px-4">Related Keyword #1</th>
                  <th className="py-3.5 px-4">Related Keyword #2</th>
                  <th className="py-3.5 px-4 text-right">Search Vol.</th>
                  <th className="py-3.5 px-4 text-right">Difficulty</th>
                  <th className="py-3.5 px-4">Intent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-xs">
                {rows.map((row) => (
                  <tr key={row.urlPath} className="hover:bg-stone-50 transition-colors">
                    <td className="py-4 px-4 align-top">
                      <div className="font-semibold text-stone-900">{row.pageName}</div>
                      <Link
                        to={row.urlPath}
                        className="font-mono-tabular text-[11px] text-[#9A3412] hover:underline inline-flex items-center gap-1 mt-1"
                      >
                        <span>
                          {row.urlPath === '/'
                            ? 'Navigate to Future Use of AI Homepage (/)'
                            : `Visit ${row.mainKeyword} article (${row.urlPath})`}
                        </span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </td>
                    <td className="py-4 px-4 align-top font-mono-tabular font-semibold text-[#9A3412]">
                      {row.mainKeyword}
                    </td>
                    <td className="py-4 px-4 align-top font-mono-tabular text-stone-800">
                      {row.relatedKeywords[0]}
                    </td>
                    <td className="py-4 px-4 align-top font-mono-tabular text-stone-800">
                      {row.relatedKeywords[1]}
                    </td>
                    <td className="py-4 px-4 align-top font-mono-tabular text-right font-medium text-stone-900">
                      {row.monthlySearchVolume.toLocaleString()}/mo
                    </td>
                    <td className="py-4 px-4 align-top font-mono-tabular text-right text-stone-700">
                      {row.keywordDifficulty}/100
                    </td>
                    <td className="py-4 px-4 align-top text-stone-700">{row.searchIntent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* STEP 3 TABLE: ON-PAGE SEO & AEO VERIFICATION MATRIX */}
        <section className="space-y-4 pt-6 border-t border-stone-200">
          <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-stone-900">
            How Does Every Page Satisfy Step 3 On-Page SEO and AEO Rules?
          </h2>
          <p className="text-sm text-stone-600 max-w-3xl">
            Every page follows strict title tag rules (50–60 characters), meta description rules
            (140–160 characters), lightweight image optimization with descriptive alt attributes,
            descriptive anchor text links, and Question-Answer H2 subheadings for AEO.
          </p>

          <div className="overflow-x-auto border border-stone-300 bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-300 bg-[#F3EFE6] text-[11px] font-semibold uppercase tracking-wider text-stone-700">
                  <th className="py-3.5 px-4">Unique URL</th>
                  <th className="py-3.5 px-4">Page Title (Rule: 50–60 chars)</th>
                  <th className="py-3.5 px-4">Meta Description (Rule: 140–160 chars)</th>
                  <th className="py-3.5 px-4">Dedicated Image, Size &amp; Alt Text</th>
                  <th className="py-3.5 px-4">AEO Q&amp;A H2s</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-xs">
                {/* Homepage Row */}
                <tr className="hover:bg-stone-50">
                  <td className="py-4 px-4 align-top font-mono-tabular">
                    <Link
                      to="/"
                      className="text-[#9A3412] font-semibold hover:underline"
                    >
                      / (Homepage)
                    </Link>
                  </td>
                  <td className="py-4 px-4 align-top max-w-xs">
                    <div className="font-medium text-stone-900">{HOMEPAGE_SEO_CONFIG.seoTitle}</div>
                    <div className="font-mono-tabular text-[11px] text-emerald-800 mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {HOMEPAGE_SEO_CONFIG.seoTitle.length} characters
                    </div>
                  </td>
                  <td className="py-4 px-4 align-top max-w-sm">
                    <div className="text-stone-700 leading-relaxed">
                      {HOMEPAGE_SEO_CONFIG.metaDescription}
                    </div>
                    <div className="font-mono-tabular text-[11px] text-emerald-800 mt-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {HOMEPAGE_SEO_CONFIG.metaDescription.length} characters
                    </div>
                  </td>
                  <td className="py-4 px-4 align-top max-w-xs">
                    <div className="font-mono-tabular text-[11px] text-stone-900">
                      {HERO_EDITORIAL_IMAGE.fileSizeKb} KB · {HERO_EDITORIAL_IMAGE.dimensions}
                    </div>
                    <div className="text-stone-600 italic mt-1">
                      Alt: &ldquo;{HERO_EDITORIAL_IMAGE.altText}&rdquo;
                    </div>
                  </td>
                  <td className="py-4 px-4 align-top font-mono-tabular text-emerald-800">
                    3 Q&amp;A H2s + FAQ Schema
                  </td>
                </tr>

                {/* Article Rows */}
                {(filterMode === 'step2Core'
                  ? ARTICLES_DATA.filter((a) => a.isCoreThree)
                  : ARTICLES_DATA
                ).map((art) => (
                  <tr key={art.id} className="hover:bg-stone-50">
                    <td className="py-4 px-4 align-top font-mono-tabular">
                      <Link
                        to={art.urlPath}
                        className="text-[#9A3412] font-semibold hover:underline break-all"
                      >
                        {art.urlPath}
                      </Link>
                    </td>
                    <td className="py-4 px-4 align-top max-w-xs">
                      <div className="font-medium text-stone-900">{art.seoTitle}</div>
                      <div className="font-mono-tabular text-[11px] text-emerald-800 mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {art.seoTitle.length} characters
                      </div>
                    </td>
                    <td className="py-4 px-4 align-top max-w-sm">
                      <div className="text-stone-700 leading-relaxed">{art.metaDescription}</div>
                      <div className="font-mono-tabular text-[11px] text-emerald-800 mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {art.metaDescription.length} characters
                      </div>
                    </td>
                    <td className="py-4 px-4 align-top max-w-xs">
                      <div className="font-mono-tabular text-[11px] text-stone-900">
                        {art.image.fileSizeKb} KB · {art.image.dimensions}
                      </div>
                      <div className="text-stone-600 italic mt-1">
                        Alt: &ldquo;{art.image.altText}&rdquo;
                      </div>
                    </td>
                    <td className="py-4 px-4 align-top font-mono-tabular text-emerald-800">
                      {art.aeoSections.length} Q&amp;A H2s + FAQ Schema
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};
