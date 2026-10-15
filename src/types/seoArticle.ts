export interface AeoSection {
  id: string;
  questionH2: string; // Strictly in Question format for AEO (Answer Engine Optimization)
  directAnswerParagraph: string; // Concise, high-signal direct answer paragraph immediately following H2
  deepDiveParagraphs: string[];
  keyTakeaway: string;
  internalLink: {
    targetUrl: string; // e.g., "/articles/future-of-ai-climate-energy-grids"
    anchorText: string; // Descriptive keyword-rich anchor text following SEO rules
    contextSentence: string;
  };
}

export interface ArticleData {
  id: string;
  numberIndex: string; // e.g., "01"
  slug: string; // e.g., "future-of-ai-in-healthcare-diagnostics"
  urlPath: string; // e.g., "/articles/future-of-ai-in-healthcare-diagnostics"
  isCoreThree: boolean; // Highlights Homepage + Top 3 Articles for Step 2 while providing all 10 for full blog
  category: 'Biomedicine' | 'Planetary Systems' | 'Embodied Robotics' | 'Cognitive & Society' | 'Deep Science';
  seoTitle: string; // 50-60 chars following strict SEO Title Rules
  metaDescription: string; // 140-160 chars following strict Meta Description Rules
  mainKeyword: string;
  relatedKeywords: [string, string];
  monthlySearchVolume: number;
  keywordDifficulty: number; // 1-100
  searchIntent: 'Informational' | 'Commercial Investigation' | 'Transactional';
  headlineH1: string;
  subtitleDeck: string;
  author: {
    name: string;
    role: string;
    institution: string;
  };
  publishedDate: string;
  readingTimeMinutes: number;
  wordCount: number;
  image: {
    src: string;
    altText: string; // Descriptive SEO alt text
    caption: string;
    fileSizeKb: number; // Small optimized image size metric
    dimensions: string;
  };
  pullQuote: {
    text: string;
    attribution: string;
  };
  forecast2035Metric: {
    value: string;
    label: string;
    timeframe: string;
    baselineComparison: string;
  };
  aeoSections: AeoSection[];
}

export interface PageSeoConfig {
  pageName: string;
  urlPath: string;
  seoTitle: string;
  metaDescription: string;
  mainKeyword: string;
  relatedKeywords: [string, string];
  monthlySearchVolume: number;
  keywordDifficulty: number;
  searchIntent: string;
  isCoreStep2Target: boolean;
}
