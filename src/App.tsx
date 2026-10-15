/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { OnPageSeoBar } from './components/OnPageSeoBar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { KeywordResearchPage } from './pages/KeywordResearchPage';
import { FutureSimulatorPage } from './pages/FutureSimulatorPage';
import { ARTICLES_DATA, HOMEPAGE_SEO_CONFIG } from './data/articlesData';
import { PageSeoConfig } from './types/seoArticle';

const AppShell: React.FC = () => {
  const [seoInspectorOpen, setSeoInspectorOpen] = useState<boolean>(true);
  const location = useLocation();

  // Resolve current page's live SEO configuration based on pathname
  let activeSeoConfig: PageSeoConfig = HOMEPAGE_SEO_CONFIG;
  const matchedArticle = ARTICLES_DATA.find((a) => a.urlPath === location.pathname);

  if (matchedArticle) {
    activeSeoConfig = {
      pageName: `Monograph ${matchedArticle.numberIndex}: ${matchedArticle.seoTitle}`,
      urlPath: matchedArticle.urlPath,
      seoTitle: matchedArticle.seoTitle,
      metaDescription: matchedArticle.metaDescription,
      mainKeyword: matchedArticle.mainKeyword,
      relatedKeywords: matchedArticle.relatedKeywords,
      monthlySearchVolume: matchedArticle.monthlySearchVolume,
      keywordDifficulty: matchedArticle.keywordDifficulty,
      searchIntent: matchedArticle.searchIntent,
      isCoreStep2Target: matchedArticle.isCoreThree,
    };
  } else if (location.pathname === '/seo-keyword-research') {
    activeSeoConfig = {
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
    };
  } else if (location.pathname === '/future-ai-simulator') {
    activeSeoConfig = {
      pageName: '2035 Future Use of AI Impact Simulator App',
      urlPath: '/future-ai-simulator',
      seoTitle: '2035 AI Impact Simulator: Future Use of AI Forecasting App',
      metaDescription:
        'Simulate the future use of AI from 2026 to 2035 across healthcare, climate grids, robotics, and quantum materials with our interactive forecasting application.',
      mainKeyword: '2035 AI impact simulator',
      relatedKeywords: ['future use of AI forecasting app', 'autonomous systems ROI model'],
      monthlySearchVolume: 11200,
      keywordDifficulty: 29,
      searchIntent: 'Informational',
      isCoreStep2Target: false,
    };
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917]">
      <Navbar
        seoInspectorOpen={seoInspectorOpen}
        onToggleSeoInspector={() => setSeoInspectorOpen((prev) => !prev)}
      />

      <OnPageSeoBar
        seoConfig={activeSeoConfig}
        currentArticle={matchedArticle}
        isOpen={seoInspectorOpen}
        onClose={() => setSeoInspectorOpen(false)}
      />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/articles/:slug" element={<ArticleDetailPage />} />
          <Route path="/seo-keyword-research" element={<KeywordResearchPage />} />
          <Route path="/future-ai-simulator" element={<FutureSimulatorPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
