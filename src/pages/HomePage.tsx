import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ARTICLES_DATA,
  HERO_EDITORIAL_IMAGE,
  HOMEPAGE_AEO_FAQS,
  HOMEPAGE_SEO_CONFIG,
} from '../data/articlesData';
import { ResilientImage } from '../components/ResilientImage';
import { updateDocumentSeoMeta } from '../utils/seoDomUpdater';
import { ArrowUpRight, Search, SlidersHorizontal, Sparkles } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    updateDocumentSeoMeta(HOMEPAGE_SEO_CONFIG, undefined, HOMEPAGE_AEO_FAQS);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const categories = [
    'All',
    'Biomedicine',
    'Planetary Systems',
    'Embodied Robotics',
    'Cognitive & Society',
    'Deep Science',
  ];

  const filteredArticles = ARTICLES_DATA.filter((article) => {
    const matchesCategory =
      selectedCategory === 'All' || article.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === '' ||
      article.headlineH1.toLowerCase().includes(query) ||
      article.mainKeyword.toLowerCase().includes(query) ||
      article.relatedKeywords.some((k) => k.toLowerCase().includes(query)) ||
      article.subtitleDeck.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const coreThreeArticles = ARTICLES_DATA.filter((a) => a.isCoreThree);

  return (
    <div className="min-h-screen">


      {/* Tier 1: Lead Editorial Hero Split */}
      <section className="max-w-[1320px] mx-auto px-6 pt-10 pb-14 border-b border-stone-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500">
                <span>VOL. XIV MONOGRAPH SERIES</span>
                <span aria-hidden="true">·</span>
                <span>2026–2035 HORIZON ATLAS</span>
              </div>

              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-[54px] font-semibold text-stone-900 leading-[1.08] tracking-tight text-balance">
                What Is the Future Use of AI Across Science, Climate, and Human Craft?
              </h1>

              <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl">
                The <strong>future use of AI</strong> is graduating from conversational text interfaces
                into embodied physical and biological systems. Across our ten peer-reviewed monographs,
                we examine how <strong>artificial intelligence applications 2030</strong> and{' '}
                <strong>next generation AI technology</strong> are synthesizing patient-specific genomic
                therapies, stabilizing renewable power grids, and partnering with human artisans.
              </p>
            </div>

            <div className="pt-8 mt-8 border-t border-stone-200 space-y-5">
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/articles/future-of-ai-in-healthcare-diagnostics"
                  className="px-5 py-3 bg-stone-900 text-stone-50 text-xs font-medium rounded-lg hover:bg-[#9A3412] transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-2"
                >
                  <span>Read Monograph 01: Future of AI in Healthcare Diagnostics</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="#all-articles"
                  className="px-4 py-3 border border-stone-300 text-stone-800 text-xs font-medium rounded-lg hover:border-stone-900 transition-colors whitespace-nowrap shrink-0"
                >
                  Explore All 10 Monographs
                </a>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-2">
                <div>
                  <p className="font-mono-tabular text-xl font-semibold text-stone-900">10 Monographs</p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Unique SEO URLs &amp; dedicated visual plates
                  </p>
                </div>
                <div>
                  <p className="font-mono-tabular text-xl font-semibold text-stone-900">100% AEO Q&amp;A</p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Question-and-answer H2 structure for Answer Engines
                  </p>
                </div>
                <div>
                  <p className="font-mono-tabular text-xl font-semibold text-stone-900">≤ 43 KB Assets</p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Fast-loading visual plates with descriptive alt text
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between">
            <figure className="h-full flex flex-col">
              <ResilientImage
                src={HERO_EDITORIAL_IMAGE.src}
                alt={HERO_EDITORIAL_IMAGE.altText}
                aspectRatioClass="aspect-[16/10] lg:h-full"
                fileSizeKb={HERO_EDITORIAL_IMAGE.fileSizeKb}
                dimensions={HERO_EDITORIAL_IMAGE.dimensions}
                priority
              />
              <figcaption className="text-xs font-editorial italic text-stone-600 mt-2.5 leading-relaxed">
                {HERO_EDITORIAL_IMAGE.caption}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Tier 2: Core 3 Articles Highlight (Step 1, Step 2 & Step 3 Primary Pillar Showcase) */}
      <section className="max-w-[1320px] mx-auto px-6 py-14 border-b border-stone-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#9A3412] font-semibold">
              CURATED PILLAR MONOGRAPHS · CORE 3 ARTICLES
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-stone-900 mt-1 text-balance">
              Which Three AI Frontiers Will Reshape Civilization First?
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-md">
            Each pillar article features a unique URL slug, primary and related keyword triad,
            optimized meta tags, compact imagery with descriptive alt text, and AEO question-answer subheadings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {coreThreeArticles.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col justify-between border border-stone-200 bg-white/70 p-6 hover:border-stone-400 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 mb-3 font-mono-tabular">
                  <span>
                    {article.numberIndex} · {article.category}
                  </span>
                  <span>
                    {article.readingTimeMinutes} min read · {article.wordCount} words
                  </span>
                </div>

                <Link to={article.urlPath} className="block overflow-hidden mb-4">
                  <ResilientImage
                    src={article.image.src}
                    alt={article.image.altText}
                    aspectRatioClass="aspect-[4/3]"
                    fileSizeKb={article.image.fileSizeKb}
                    dimensions={article.image.dimensions}
                    className="group-hover:scale-[1.02]"
                  />
                </Link>

                <h3 className="font-editorial text-2xl font-semibold text-stone-900 leading-snug group-hover:text-[#9A3412] transition-colors">
                  <Link to={article.urlPath}>{article.headlineH1}</Link>
                </h3>

                <p className="text-sm text-stone-600 mt-2.5 leading-relaxed line-clamp-3">
                  {article.subtitleDeck}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-stone-200/80 space-y-3">
                <div className="text-xs space-y-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-stone-500">Lead Investigator:</span>
                    <span className="font-medium text-stone-900">{article.author.name}</span>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-stone-500">Affiliation:</span>
                    <span className="text-stone-700 text-right truncate max-w-[210px]">{article.author.institution}</span>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-stone-500">2035 Horizon:</span>
                    <span className="font-mono-tabular font-semibold text-[#9A3412]">{article.forecast2035Metric.value}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to={article.urlPath}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9A3412] hover:text-stone-900 transition-colors"
                  >
                    <span>Read Monograph {article.numberIndex} Analysis</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Tier 3: Complete 10-Article Blog Archive */}
      <section id="all-articles" className="max-w-[1320px] mx-auto px-6 py-14 border-b border-stone-200">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-500">
              COMPLETE EDITORIAL ARCHIVE · 10 BLOG ARTICLES
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-stone-900 mt-1">
              How Will Next Generation AI Technology Transform Ten Essential Domains?
            </h2>
          </div>

          {/* Search input */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 10 articles or keywords..."
              aria-label="Search 10 articles or keywords"
              className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900"
            />
          </div>
        </div>

        {/* Interactive Category Filter Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/70 rounded-lg w-fit max-w-full overflow-x-auto mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {cat === 'All' ? `All 10 Articles (${ARTICLES_DATA.length})` : cat}
            </button>
          ))}
        </div>

        {filteredArticles.length === 0 ? (
          <div className="py-12 text-center border border-stone-200 bg-white/50 p-8">
            <p className="font-editorial text-2xl text-stone-800">
              No monographs matched "{searchQuery}"
            </p>
            <p className="text-xs text-stone-500 mt-1">
              Try searching for healthcare, climate, robotics, quantum, space, or ethics.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-stone-900 text-white text-xs rounded-lg cursor-pointer"
            >
              Reset Article Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="group grid grid-cols-1 sm:grid-cols-12 gap-5 border border-stone-200 bg-white/60 p-5 hover:border-stone-400 transition-colors items-stretch"
              >
                <div className="sm:col-span-5 flex flex-col">
                  <Link to={article.urlPath} className="block h-full">
                    <ResilientImage
                      src={article.image.src}
                      alt={article.image.altText}
                      aspectRatioClass="aspect-[4/3] sm:h-full"
                      fileSizeKb={article.image.fileSizeKb}
                      className="group-hover:scale-[1.02]"
                    />
                  </Link>
                </div>

                <div className="sm:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-stone-500 font-mono-tabular">
                      <span>MONOGRAPH {article.numberIndex}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readingTimeMinutes} min read</span>
                    </div>

                    <h3 className="font-editorial text-xl font-semibold text-stone-900 mt-1.5 leading-snug group-hover:text-[#9A3412] transition-colors">
                      <Link to={article.urlPath}>{article.headlineH1}</Link>
                    </h3>

                    <p className="text-xs text-stone-600 mt-2 leading-relaxed line-clamp-2">
                      {article.metaDescription}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-stone-200/80 space-y-2">
                    <div className="text-[11px] text-stone-600 truncate">
                      <span className="font-medium text-stone-900">{article.author.name}</span>
                      <span aria-hidden="true"> · </span>
                      <span className="text-stone-500 italic">{article.author.institution}</span>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <span className="font-mono-tabular text-[11px] text-[#9A3412] font-semibold">
                        2035 Horizon: {article.forecast2035Metric.value}
                      </span>
                      <Link
                        to={article.urlPath}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#9A3412] hover:text-stone-900 transition-colors"
                      >
                        <span>Read Monograph {article.numberIndex}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>



      {/* Homepage AEO Question & Answer Section + Interactive Foresight CTA */}
      <section className="max-w-[1320px] mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#9A3412] font-semibold">
                ANSWER ENGINE OPTIMIZATION (AEO) · HOMEPAGE Q&amp;A
              </p>
              <h2 className="font-editorial text-3xl sm:text-4xl font-semibold text-stone-900 mt-1">
                Frequently Asked Questions on the Future Use of AI
              </h2>
            </div>

            <div className="space-y-8 divide-y divide-stone-200">
              {HOMEPAGE_AEO_FAQS.map((faq, idx) => (
                <div key={idx} className={idx > 0 ? 'pt-8' : ''}>
                  <h2 className="font-editorial text-2xl font-semibold text-stone-900">
                    {faq.question}
                  </h2>
                  <p className="text-sm sm:text-base text-stone-700 leading-relaxed mt-3">
                    {faq.answer}
                  </p>
                  <p className="text-xs text-stone-600 mt-3">
                    Further empirical reading:{' '}
                    <Link
                      to={faq.relatedLinkUrl}
                      className="font-semibold text-[#9A3412] underline underline-offset-4 hover:text-stone-900"
                    >
                      {faq.relatedLinkAnchor}
                    </Link>
                    .
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive 2035 AI Impact Simulator Callout Card */}
          <div className="lg:col-span-5 border border-stone-300 bg-[#F3EFE6] p-8 space-y-5">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#9A3412] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INTERACTIVE FORESIGHT APPLICATION</span>
            </div>

            <h2 className="font-editorial text-3xl font-semibold text-stone-900 leading-tight">
              How Can You Model 2026–2035 AI Adoption Across Industries?
            </h2>

            <p className="text-sm text-stone-700 leading-relaxed">
              Use our interactive <strong>2035 AI Impact Simulator &amp; Custom Monograph Synthesis App</strong>{' '}
              to test compute efficiency, regulatory audit strictness, and R&amp;D investment across
              healthcare, climate grids, robotics, and education.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-stone-300/80 font-mono-tabular text-xs">
              <div>
                <span className="text-stone-500 block">Simulated Horizon</span>
                <strong className="text-base text-stone-900">2026 → 2035</strong>
              </div>
              <div>
                <span className="text-stone-500 block">Interactive Sectors</span>
                <strong className="text-base text-stone-900">10 Core Domains</strong>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/future-ai-simulator"
                className="w-full py-3 px-5 bg-stone-900 text-stone-50 text-xs font-medium rounded-lg hover:bg-[#9A3412] transition-colors inline-flex items-center justify-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Launch Interactive 2035 AI Impact Simulator App</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
