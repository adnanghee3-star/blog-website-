import { useEffect } from 'react';
import { Article } from '../types';

export const APP_BASE_URL = 'https://ais-dev-ofopl4rug7oo3237eruuid-806219308313.asia-east1.run.app';

export interface SEOProps {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  articleMeta?: {
    publishedTime: string;
    modifiedTime: string;
    authorName: string;
    section: string;
    tags: string[];
  };
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Hook to dynamically update document title, meta tags, OpenGraph, Twitter, canonical, and JSON-LD
 */
export function useSEO(props: SEOProps) {
  useEffect(() => {
    // 1. Title
    document.title = props.title;

    // 2. Canonical URL
    const canonicalHref = `${APP_BASE_URL}${props.canonicalPath.startsWith('/') ? props.canonicalPath : `/${props.canonicalPath}`}`;
    let canonicalTag = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalHref);

    // 3. Meta description
    setMeta('description', props.description);

    // 4. OpenGraph
    setMeta('property', 'og:title', props.title);
    setMeta('property', 'og:description', props.description);
    setMeta('property', 'og:url', canonicalHref);
    setMeta('property', 'og:type', props.ogType || 'website');
    if (props.ogImage) {
      setMeta('property', 'og:image', props.ogImage);
    }

    // 5. Twitter
    setMeta('name', 'twitter:title', props.title);
    setMeta('name', 'twitter:description', props.description);
    if (props.ogImage) {
      setMeta('name', 'twitter:image', props.ogImage);
    }

    // 6. JSON-LD Structured Data
    const scriptId = 'dynamic-json-ld';
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (props.jsonLd) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(props.jsonLd);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [props.title, props.description, props.canonicalPath, props.ogType, props.ogImage, props.jsonLd]);
}

function setMeta(attr: 'name' | 'property', name: string, content: string): void;
function setMeta(name: string, content: string): void;
function setMeta(arg1: string, arg2: string, arg3?: string) {
  let attr = 'name';
  let name = arg1;
  let content = arg2;

  if (arg3 !== undefined) {
    attr = arg1;
    name = arg2;
    content = arg3;
  }

  let tag = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

/**
 * Generate Article / BlogPosting Schema.org JSON-LD
 */
export function generateArticleJsonLd(article: Article, currentUrl: string) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${currentUrl}#article`,
      headline: article.seoTitle,
      name: article.title,
      description: article.metaDescription,
      url: currentUrl,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': currentUrl,
      },
      datePublished: article.publishedDate,
      dateModified: article.modifiedDate,
      author: {
        '@type': 'Person',
        name: article.author.name,
        jobTitle: article.author.title,
        description: article.author.bio,
      },
      publisher: {
        '@type': 'Organization',
        name: 'WealthPulse',
        url: APP_BASE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${APP_BASE_URL}/logo.png`,
        },
      },
      image: [article.featuredImage],
      keywords: [article.primaryKeyword, ...article.secondaryKeywords].join(', '),
      articleSection: article.category,
      inLanguage: 'en-US',
      wordCount: article.sections.reduce((acc, s) => acc + s.answerFirst.split(' ').length + s.bodyParagraphs.join(' ').split(' ').length, 0),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: APP_BASE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: `${APP_BASE_URL}/blog`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: article.category,
          item: `${APP_BASE_URL}/category/${article.categorySlug}`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: article.title,
          item: currentUrl,
        },
      ],
    },
    ...(article.faqs.length > 0
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: article.faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          },
        ]
      : []),
  ];
}

/**
 * Pre-publishing SEO Audit Scorecard calculation
 */
export interface ArticleAuditResult {
  slug: string;
  title: string;
  titleLength: number;
  titleValid: boolean; // 50-60 chars
  metaDescriptionLength: number;
  metaDescriptionValid: boolean; // 150-160 chars
  primaryKeyword: string;
  hasKeywordInTitle: boolean;
  hasKeywordInH1: boolean;
  hasKeywordInMetaDesc: boolean;
  h1: string;
  questionH2Count: number;
  totalH2Count: number;
  allH2sAreQuestions: boolean;
  answerFirstScore: number; // percentage
  internalLinkCount: number;
  internalLinkValid: boolean; // >= 2
  outboundRefCount: number;
  outboundRefValid: boolean; // >= 1
  faqCount: number;
  overallScore: number;
}

export function auditArticleSEO(article: Article): ArticleAuditResult {
  const titleLen = article.seoTitle.length;
  const titleValid = titleLen >= 50 && titleLen <= 60;

  const metaLen = article.metaDescription.length;
  const metaDescValid = metaLen >= 150 && metaLen <= 160;

  const pk = article.primaryKeyword.toLowerCase();
  const hasKeywordInTitle = article.seoTitle.toLowerCase().includes(pk) || article.title.toLowerCase().includes(pk);
  const hasKeywordInH1 = article.h1.toLowerCase().includes(pk);
  const hasKeywordInMetaDesc = article.metaDescription.toLowerCase().includes(pk);

  const totalH2 = article.sections.length;
  const questionH2 = article.sections.filter((s) => s.questionH2.trim().endsWith('?')).length;
  const allH2sAreQuestions = questionH2 === totalH2 && totalH2 > 0;

  // Answer first score: does each section provide an answerFirst field with at least 15 words?
  const answerFirstPass = article.sections.filter((s) => s.answerFirst && s.answerFirst.trim().length > 60).length;
  const answerFirstScore = totalH2 > 0 ? Math.round((answerFirstPass / totalH2) * 100) : 100;

  const internalLinkCount = article.internalLinks.length;
  const internalLinkValid = internalLinkCount >= 2;

  const outboundRefCount = article.outboundReferences.length;
  const outboundRefValid = outboundRefCount >= 1;

  // Calculate weighted 100-point score
  let score = 0;
  if (titleValid) score += 15; else if (titleLen >= 40 && titleLen <= 65) score += 10;
  if (metaDescValid) score += 15; else if (metaLen >= 135 && metaLen <= 170) score += 10;
  if (hasKeywordInTitle && hasKeywordInH1) score += 15;
  if (allH2sAreQuestions) score += 20;
  if (answerFirstScore === 100) score += 15;
  if (internalLinkValid) score += 10;
  if (outboundRefValid) score += 10;

  return {
    slug: article.slug,
    title: article.title,
    titleLength: titleLen,
    titleValid,
    metaDescriptionLength: metaLen,
    metaDescriptionValid: metaDescValid,
    primaryKeyword: article.primaryKeyword,
    hasKeywordInTitle,
    hasKeywordInH1,
    hasKeywordInMetaDesc,
    h1: article.h1,
    questionH2Count: questionH2,
    totalH2Count: totalH2,
    allH2sAreQuestions,
    answerFirstScore,
    internalLinkCount,
    internalLinkValid,
    outboundRefCount,
    outboundRefValid,
    faqCount: article.faqs.length,
    overallScore: Math.min(100, score),
  };
}
