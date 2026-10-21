export type SearchIntent = 'informational' | 'comparison' | 'transactional' | 'navigational';

export interface Author {
  id: string;
  name: string;
  title: string;
  credentials: string;
  bio: string;
  avatar: string;
  reviewedBy?: string;
}

export interface InternalLinkItem {
  anchorText: string;
  targetSlug: string;
  contextSentence: string;
}

export interface ExternalReference {
  name: string;
  url: string;
  citation: string;
  domain: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ArticleSection {
  id: string;
  questionH2: string;
  answerFirst: string;
  bodyParagraphs: string[];
  subsections?: {
    h3: string;
    content: string;
    list?: string[];
  }[];
  table?: {
    caption: string;
    headers: string[];
    rows: (string | number)[][];
  };
  highlightBox?: {
    title: string;
    points: string[];
    type: 'tip' | 'warning' | 'calculation' | 'example';
  };
}

export interface Article {
  slug: string;
  title: string;
  seoTitle: string; // Target: 50-60 chars
  metaDescription: string; // Target: 150-160 chars
  h1: string;
  primaryKeyword: string;
  secondaryKeywords: [string, string];
  searchIntent: SearchIntent;
  category: string;
  categorySlug: string;
  excerpt: string;
  featuredImage: string;
  imageAlt: string;
  imageCaption?: string;
  publishedDate: string;
  modifiedDate: string;
  author: Author;
  readingTimeMinutes: number;
  featured?: boolean;
  intro: {
    summary: string;
    keyTakeaways: string[];
  };
  sections: ArticleSection[];
  internalLinks: InternalLinkItem[];
  outboundReferences: ExternalReference[];
  faqs: FAQItem[];
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  iconName: string;
  color: string;
  gradient: string;
  primaryKeyword: string;
}
