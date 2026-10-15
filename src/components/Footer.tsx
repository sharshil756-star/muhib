import React from 'react';
import { Link } from 'react-router-dom';
import { ARTICLES_DATA } from '../data/articlesData';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-stone-300 bg-[#F3EFE6] text-stone-700 mt-16">
      <div className="max-w-[1320px] mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-300/80">
          {/* Brand & Mission Column */}
          <div className="md:col-span-4 space-y-4">
            <Link
              to="/"
              aria-label="Aethelgard Future Use of AI Journal Homepage"
              className="font-editorial text-2xl font-semibold text-stone-900 tracking-tight block"
            >
              Aethelgard
            </Link>
            <p className="text-xs text-stone-600 leading-relaxed max-w-sm">
              An institutional editorial archive and interactive foresight application examining the{' '}
              <strong>future use of AI</strong> from 2026 to 2035. Engineered for On-Page SEO and
              Answer Engine Optimization (AEO) with unique URLs, verified keyword triads, and
              question-and-answer monographs.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-[#9A3412]">
              <Link
                to="/future-ai-simulator"
                aria-label="Launch 2035 AI Impact Simulator App"
                className="hover:underline"
              >
                Launch 2035 AI Impact Simulator App →
              </Link>
            </div>
          </div>

          {/* All 10 Articles Directory with Descriptive Anchor Text */}
          <div className="md:col-span-8">
            <p className="text-xs font-mono-tabular uppercase tracking-wider text-stone-500 mb-4">
              COMPLETE INDEX OF 10 UNIQUE ARTICLE URLS (DESCRIPTIVE ANCHOR LINKS)
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 text-xs">
              {ARTICLES_DATA.map((article) => (
                <Link
                  key={article.id}
                  to={article.urlPath}
                  aria-label={`Read Monograph ${article.numberIndex}: ${article.headlineH1}`}
                  className="text-stone-700 hover:text-[#9A3412] transition-colors flex items-baseline gap-2 py-0.5"
                >
                  <span className="font-mono-tabular text-stone-400 shrink-0">
                    {article.numberIndex}.
                  </span>
                  <span className="underline underline-offset-4 decoration-stone-300 hover:decoration-[#9A3412]">
                    {article.seoTitle} ({article.mainKeyword})
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 Aethelgard Journal of Applied Foresight. Prepared for Vercel &amp; GitHub Deployment.</p>
          <p className="font-mono-tabular">
            10 Unique Article URLs · 10 Dedicated Images with Alt Text · AEO Q&amp;A Schema
          </p>
        </div>
      </div>
    </footer>
  );
};
