import { ArticleData, PageSeoConfig } from '../types/seoArticle';

/**
 * Dynamically updates document.title, <meta name="description">, <meta name="keywords">,
 * OpenGraph tags, canonical link, and Schema.org JSON-LD (FAQPage + Article / WebSite)
 * whenever the route changes so every unique URL has live On-Page SEO & AEO compliance.
 */
export function updateDocumentSeoMeta(
  config: PageSeoConfig,
  article?: ArticleData,
  faqItems?: { question: string; answer: string }[]
) {
  document.title = config.seoTitle;

  const setMetaTag = (selector: string, attrName: string, attrValue: string, content: string) => {
    let el = document.querySelector<HTMLMetaElement>(selector);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrValue);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMetaTag('meta[name="description"]', 'name', 'description', config.metaDescription);
  setMetaTag(
    'meta[name="keywords"]',
    'name',
    'keywords',
    [config.mainKeyword, ...config.relatedKeywords].join(', ')
  );
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', config.seoTitle);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', config.metaDescription);
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', config.seoTitle);
  setMetaTag(
    'meta[name="twitter:description"]',
    'name',
    'twitter:description',
    config.metaDescription
  );

  const imageUrl = article
    ? (article.image.src.startsWith('http') ? article.image.src : `${window.location.origin}${article.image.src}`)
    : `${window.location.origin}/images/future-ai-neural-hero.svg`;
  setMetaTag('meta[property="og:image"]', 'property', 'og:image', imageUrl);
  setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl);

  // Update canonical URL dynamically
  const canonicalUrl = `${window.location.origin}${config.urlPath}`;
  let canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', canonicalUrl);

  // Build Schema.org JSON-LD for Article + FAQPage (for AEO Answer Engine Optimization)
  const schemaEl = document.getElementById('dynamic-schema-ld');
  if (schemaEl) {
    if (article) {
      const schemaGraph = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'TechArticle',
            headline: article.headlineH1,
            name: article.seoTitle,
            description: article.metaDescription,
            keywords: [article.mainKeyword, ...article.relatedKeywords].join(', '),
            datePublished: '2026-10-14',
            author: {
              '@type': 'Person',
              name: article.author.name,
              jobTitle: article.author.role,
              affiliation: {
                '@type': 'Organization',
                name: article.author.institution,
              },
            },
            image: imageUrl,
            url: canonicalUrl,
          },
          {
            '@type': 'FAQPage',
            mainEntity: article.aeoSections.map((sec) => ({
              '@type': 'Question',
              name: sec.questionH2,
              acceptedAnswer: {
                '@type': 'Answer',
                text: sec.directAnswerParagraph,
              },
            })),
          },
        ],
      };
      schemaEl.textContent = JSON.stringify(schemaGraph, null, 2);
    } else if (faqItems && faqItems.length > 0) {
      const homeSchema = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            name: 'Aethelgard: Future Use of AI Journal & Foresight Atlas',
            url: canonicalUrl,
            description: config.metaDescription,
            keywords: [config.mainKeyword, ...config.relatedKeywords].join(', '),
          },
          {
            '@type': 'FAQPage',
            mainEntity: faqItems.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          },
        ],
      };
      schemaEl.textContent = JSON.stringify(homeSchema, null, 2);
    }
  }
}
