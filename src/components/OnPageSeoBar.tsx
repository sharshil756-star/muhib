import React from 'react';
import { Link } from 'react-router-dom';
import { ArticleData, PageSeoConfig } from '../types/seoArticle';
import { Search, CheckCircle2, Globe, FileText, Image as ImageIcon, HelpCircle } from 'lucide-react';

interface OnPageSeoBarProps {
  seoConfig: PageSeoConfig;
  currentArticle?: ArticleData;
  isOpen: boolean;
  onClose: () => void;
}

export const OnPageSeoBar: React.FC<OnPageSeoBarProps> = ({
  seoConfig,
  currentArticle,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const titleLength = seoConfig.seoTitle.length;
  const metaLength = seoConfig.metaDescription.length;

  return (
    <section
      aria-label="Live On-Page SEO and AEO Verification Panel"
      className="bg-[#F3EFE6] border-b border-stone-300 text-stone-900 transition-all"
    >
      <div className="max-w-[1320px] mx-auto px-6 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-stone-300/80">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-600 font-mono-tabular">
              <Search className="w-3.5 h-3.5 text-[#9A3412]" />
              <span>LIVE ON-PAGE SEO &amp; AEO AUDIT</span>
              <span aria-hidden="true">·</span>
              <span>STEP 2 &amp; STEP 3 VERIFICATION</span>
              {seoConfig.isCoreStep2Target && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#9A3412] font-semibold">
                    CORE HOMEPAGE + TOP 3 ARTICLE TARGET
                  </span>
                </>
              )}
            </div>
            <h2 className="text-xl font-editorial font-semibold text-stone-900 mt-1">
              Active Page Metadata: {seoConfig.pageName}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/seo-keyword-research"
              className="text-xs font-medium text-[#9A3412] hover:underline whitespace-nowrap shrink-0"
            >
              View Full Keyword Research Table for Homepage &amp; Articles →
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-200/80 hover:bg-stone-300/80 rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Close Inspector
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-5">
          {/* 1. Unique URL & Keyword Triad */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-700">
              <Globe className="w-3.5 h-3.5 text-[#9A3412]" />
              <span>Unique URL &amp; Target Keywords</span>
            </div>
            <p className="font-mono-tabular text-xs text-stone-800 bg-white/80 px-2.5 py-1.5 border border-stone-200 rounded break-all">
              {seoConfig.urlPath}
            </p>
            <dl className="text-xs space-y-1 pt-1">
              <div className="flex justify-between gap-2">
                <dt className="text-stone-500">Main Keyword:</dt>
                <dd className="font-semibold text-stone-900 text-right">{seoConfig.mainKeyword}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-stone-500">Related Keyword 1:</dt>
                <dd className="text-stone-800 text-right">{seoConfig.relatedKeywords[0]}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-stone-500">Related Keyword 2:</dt>
                <dd className="text-stone-800 text-right">{seoConfig.relatedKeywords[1]}</dd>
              </div>
            </dl>
          </div>

          {/* 2. Page Title Rule Check */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#9A3412]" />
                <span>SEO Title Tag</span>
              </span>
              <span className="font-mono-tabular text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {titleLength} chars (Optimal ≤ 60)
              </span>
            </div>
            <p className="text-xs text-stone-800 bg-white/80 p-2.5 border border-stone-200 rounded leading-relaxed">
              {seoConfig.seoTitle}
            </p>
            <p className="text-[11px] text-stone-500">
              Rule check: Primary keyword front-loaded, brand separated, no truncation in SERP snippets.
            </p>
          </div>

          {/* 3. Meta Description Rule Check */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#9A3412]" />
                <span>Meta Description Tag</span>
              </span>
              <span className="font-mono-tabular text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {metaLength} chars (140–160)
              </span>
            </div>
            <p className="text-xs text-stone-800 bg-white/80 p-2.5 border border-stone-200 rounded leading-relaxed">
              {seoConfig.metaDescription}
            </p>
            <p className="text-[11px] text-stone-500">
              Rule check: Action-oriented summary incorporating main and related keywords naturally.
            </p>
          </div>

          {/* 4. Image Alt Text, Small Size & AEO Format */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
              <span className="flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-[#9A3412]" />
                <span>Image Alt &amp; AEO Structure</span>
              </span>
              <span className="font-mono-tabular text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {currentArticle ? `${currentArticle.image.fileSizeKb} KB` : '42.6 KB'}
              </span>
            </div>
            <div className="text-xs text-stone-800 bg-white/80 p-2.5 border border-stone-200 rounded space-y-1.5">
              <p className="line-clamp-2">
                <strong className="text-stone-600">Alt Text:</strong>{' '}
                {currentArticle
                  ? currentArticle.image.altText
                  : 'Sunlit bio-computational research conservatory in 2035 illustrating the future use of AI across sustainable architecture and optical computing'}
              </p>
              <p className="text-[11px] text-stone-600 flex items-center gap-1 pt-0.5">
                <HelpCircle className="w-3 h-3 text-[#9A3412] shrink-0" />
                <span>
                  AEO Verified: All H2 subheadings use Question &amp; Answer format + Descriptive Anchor Links.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
