import React, { useState } from 'react';
import {
  Clock,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  List,
  Sparkles,
  Award,
  BookOpen,
} from 'lucide-react';
import { Article } from '../types';
import { ARTICLES } from '../data/articles';
import { useSEO, generateArticleJsonLd, APP_BASE_URL } from '../utils/seo';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ShareButtons } from '../components/common/ShareButtons';

interface ArticleDetailPageProps {
  article: Article;
  onNavigate: (path: string) => void;
}

export function ArticleDetailPage({ article, onNavigate }: ArticleDetailPageProps) {
  const currentUrl = `${APP_BASE_URL}/blog/${article.slug}`;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Dynamic SEO Injection (Title, Meta Description, Canonical, OG, JSON-LD)
  useSEO({
    title: article.seoTitle,
    description: article.metaDescription,
    canonicalPath: `/blog/${article.slug}`,
    ogType: 'article',
    ogImage: article.featuredImage,
    articleMeta: {
      publishedTime: article.publishedDate,
      modifiedTime: article.modifiedDate,
      authorName: article.author.name,
      section: article.category,
      tags: [article.primaryKeyword, ...article.secondaryKeywords],
    },
    jsonLd: generateArticleJsonLd(article, currentUrl),
  });

  const relatedArticles = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  const breadcrumbs = [
    { label: 'Blog', path: '/blog' },
    { label: article.category, path: `/category/${article.categorySlug}` },
    { label: article.title, path: `/blog/${article.slug}` },
  ];

  const handleInternalLinkClick = (targetSlug: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(`/blog/${targetSlug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumb Navigation with Structured Data */}
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      {/* Article Header & Category Label */}
      <header className="space-y-4 mb-8">
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={`/category/${article.categorySlug}`}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(`/category/${article.categorySlug}`);
            }}
            className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors"
          >
            {article.category}
          </a>
          <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium capitalize">
            Intent: {article.searchIntent}
          </span>
          <span className="text-xs text-slate-400 font-medium ml-auto flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {article.readingTimeMinutes} min read
          </span>
        </div>

        {/* The single clear H1 */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.2]">
          {article.h1}
        </h1>

        {/* Excerpt Summary */}
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          {article.excerpt}
        </p>

        {/* Author Byline & Fact Check Badge */}
        <div className="pt-4 pb-4 border-y border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500/20"
              width="44"
              height="44"
            />
            <div>
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                <span>{article.author.name}</span>
                <span className="inline-flex items-center text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  <Award className="w-3 h-3 mr-0.5" /> Verified
                </span>
              </div>
              <p className="text-slate-500 text-xs">{article.author.title}</p>
            </div>
          </div>

          <div className="flex flex-col sm:items-end text-slate-500 text-xs space-y-0.5">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> Published: {article.publishedDate}
            </span>
            <span className="text-[11px] text-emerald-700 font-medium">
              Last Fact-Checked: {article.modifiedDate}
            </span>
          </div>
        </div>

        {/* Social Share Bar */}
        <div className="py-2 flex items-center justify-between">
          <ShareButtons title={article.title} url={currentUrl} />
        </div>
      </header>

      {/* Featured Image with Semantic Alt & Ratio */}
      <figure className="mb-10 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
        <div className="aspect-[16/9] w-full overflow-hidden">
          <img
            src={article.featuredImage}
            alt={article.imageAlt}
            className="w-full h-full object-cover"
            loading="eager"
            width="1200"
            height="675"
          />
        </div>
        {article.imageCaption && (
          <figcaption className="p-3 text-xs text-slate-500 bg-slate-50 border-t border-slate-200 text-center italic">
            {article.imageCaption}
          </figcaption>
        )}
      </figure>

      {/* Key Takeaways Box (AEO Quick Reference) */}
      <section className="mb-10 p-6 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3" aria-label="Key Takeaways">
        <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-sm uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Quick Takeaways & Summary</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
          {article.intro.summary}
        </p>
        <ul className="space-y-2 pt-2 text-xs sm:text-sm text-slate-800">
          {article.intro.keyTakeaways.map((point, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Table of Contents */}
      <nav aria-label="Table of Contents" className="mb-10 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
          <List className="w-4 h-4 text-slate-500" />
          <span>In This Article (Questions Answered)</span>
        </div>
        <ol className="space-y-1.5 text-xs sm:text-sm text-slate-600 list-decimal list-inside">
          {article.sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="hover:text-emerald-700 hover:underline font-medium"
              >
                {section.questionH2}
              </a>
            </li>
          ))}
          {article.faqs.length > 0 && (
            <li>
              <a href="#frequently-asked-questions" className="hover:text-emerald-700 hover:underline font-medium">
                Frequently Asked Questions
              </a>
            </li>
          )}
        </ol>
      </nav>

      {/* Article Body Sections */}
      <div className="space-y-12 text-slate-800 leading-relaxed text-base sm:text-lg">
        {article.sections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4">
            {/* H2 MUST be a real question */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight pt-2 border-t border-slate-100">
              {section.questionH2}
            </h2>

            {/* Answer-First Content for AEO (Featured Snippets & AI Overviews) */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-100/80 border-l-4 border-emerald-600 text-slate-900 font-medium text-sm sm:text-base leading-relaxed">
              <span className="font-bold text-emerald-800 block text-xs uppercase tracking-wider mb-1">
                Direct Answer:
              </span>
              {section.answerFirst}
            </div>

            {/* In-depth Body Paragraphs */}
            <div className="space-y-4 text-slate-700 text-sm sm:text-base">
              {section.bodyParagraphs.map((para, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Calculation or Tip Box if present */}
            {section.highlightBox && (
              <div
                className={`p-5 rounded-xl border ${
                  section.highlightBox.type === 'calculation'
                    ? 'bg-blue-50/70 border-blue-200 text-blue-950'
                    : section.highlightBox.type === 'warning'
                    ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                    : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                }`}
              >
                <h4 className="text-xs font-bold uppercase tracking-wider mb-2">
                  {section.highlightBox.title}
                </h4>
                <ul className="text-xs sm:text-sm space-y-1.5">
                  {section.highlightBox.points.map((pt, ptIdx) => (
                    <li key={ptIdx} className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Worked Calculation Table if present */}
            {section.table && (
              <div className="my-6 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                <table className="w-full text-left text-xs sm:text-sm">
                  <caption className="p-3 text-xs font-bold text-slate-700 bg-slate-50 border-b border-slate-200 text-left">
                    {section.table.caption}
                  </caption>
                  <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[11px] tracking-wider">
                    <tr>
                      {section.table.headers.map((h, hIdx) => (
                        <th key={hIdx} className="px-4 py-3 border-b border-slate-200">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {section.table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`px-4 py-3 ${
                              cIdx === 0 ? 'font-semibold text-slate-900' : 'text-slate-600'
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Internal Links Card Section (Requirement: 2 to 3 contextual internal links with descriptive anchor text) */}
      <section className="mt-14 p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>Recommended Next Steps & Internal Guides</span>
        </div>
        <p className="text-xs text-slate-500">
          Continue strengthening your personal balance sheet with these related tutorials:
        </p>
        <ul className="space-y-3">
          {article.internalLinks.map((link, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
              <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span>{link.contextSentence.split(link.anchorText)[0]}</span>
                <a
                  href={`/blog/${link.targetSlug}`}
                  onClick={(e) => handleInternalLinkClick(link.targetSlug, e)}
                  className="font-bold text-emerald-700 underline decoration-emerald-300 hover:decoration-emerald-700 transition-all"
                >
                  {link.anchorText}
                </a>
                <span>{link.contextSentence.split(link.anchorText)[1]}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Outbound Official References (Requirement: Official authoritative citations like CFPB, FDIC, SEC, IRS) */}
      <section className="mt-8 p-6 bg-white border border-slate-200 rounded-2xl space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
          Official Regulatory & Academic Citations
        </h3>
        <p className="text-xs text-slate-500">
          WealthPulse adheres to strict fact-checking standards. Key claims and legal rules in this guide are supported by official regulatory sources:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {article.outboundReferences.map((ref, idx) => (
            <a
              key={idx}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-slate-50 transition-all text-xs flex flex-col justify-between group"
            >
              <div>
                <span className="font-bold text-slate-900 flex items-center gap-1 group-hover:text-emerald-700">
                  {ref.name} <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-emerald-600" />
                </span>
                <p className="text-slate-500 text-[11px] mt-1 line-clamp-2">
                  {ref.citation}
                </p>
              </div>
              <span className="text-[10px] text-emerald-700 font-mono mt-2 font-semibold">
                {ref.domain}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ Section with Accordion) */}
      {article.faqs.length > 0 && (
        <section id="frequently-asked-questions" className="mt-14 scroll-mt-24 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3 pt-2">
            {article.faqs.map((faq, fIdx) => {
              const isOpen = openFaqIndex === fIdx;
              return (
                <div
                  key={fIdx}
                  className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-emerald-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Author Bio Card */}
      <section className="mt-14 p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row gap-5 items-start">
        <img
          src={article.author.avatar}
          alt={article.author.name}
          className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/20 shrink-0"
          width="64"
          height="64"
        />
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Article Author</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            {article.author.name}
          </h3>
          <p className="text-xs text-slate-500 font-semibold">{article.author.credentials}</p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {article.author.bio}
          </p>
          {article.author.reviewedBy && (
            <p className="text-[11px] text-slate-400 pt-1">
              Editorial Reviewer: <span className="font-semibold text-slate-600">{article.author.reviewedBy}</span>
            </p>
          )}
        </div>
      </section>

      {/* Financial Disclaimer Banner */}
      <div className="mt-10 p-5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold block mb-1">Financial Disclaimer:</strong>
          This article is published for educational and informational purposes only and does not constitute individualized financial advice, fiduciary investment recommendations, or legal tax counsel. Past performance does not guarantee future results. Consult a licensed CFP® or tax advisor before making major financial commitments.
        </div>
      </div>

      {/* Related Articles Footer */}
      <section className="mt-16 pt-12 border-t border-slate-200">
        <h3 className="text-xl font-extrabold text-slate-900 mb-6">
          More Personal Finance Guides
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedArticles.map((rel) => (
            <div
              key={rel.slug}
              onClick={() => {
                onNavigate(`/blog/${rel.slug}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group cursor-pointer bg-white rounded-xl border border-slate-200 p-4 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
                  {rel.category}
                </span>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 mb-2">
                  {rel.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {rel.excerpt}
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>{rel.readingTimeMinutes} min read</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
