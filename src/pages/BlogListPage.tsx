import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Clock,
  ArrowRight,
  BookOpen,
  Calendar,
  Sparkles,
  Tag,
  Check,
} from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { CATEGORIES } from '../data/categories';
import { useSEO, APP_BASE_URL } from '../utils/seo';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

interface BlogListPageProps {
  onNavigate: (path: string) => void;
  initialCategory?: string;
  initialQuery?: string;
}

export function BlogListPage({ onNavigate, initialCategory = 'all', initialQuery = '' }: BlogListPageProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedIntent, setSelectedIntent] = useState<'all' | 'informational' | 'comparison'>('all');

  useSEO({
    title: 'Personal Finance Blog & Money Guides | WealthPulse Archive',
    description: 'Explore all in-depth articles on budgeting, emergency funds, credit score improvement, debt payoff strategies, and index investing basics.',
    canonicalPath: '/blog',
    ogType: 'website',
  });

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchCat =
        selectedCategory === 'all' ||
        article.categorySlug === selectedCategory ||
        article.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchIntent =
        selectedIntent === 'all' || article.searchIntent === selectedIntent;

      if (!matchCat || !matchIntent) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        article.title.toLowerCase().includes(q) ||
        article.primaryKeyword.toLowerCase().includes(q) ||
        article.secondaryKeywords.some((k) => k.toLowerCase().includes(q)) ||
        article.excerpt.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedCategory, selectedIntent]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ label: 'Blog Archive', path: '/blog' }]} onNavigate={onNavigate} />

      {/* Header */}
      <div className="max-w-3xl mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 block mb-2">
          Comprehensive Money Guides
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Personal Finance & Money Article Archive
        </h1>
        <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
          Every article is written with direct answers for search and AI answer engines, supported by step-by-step mathematical calculations and vetted regulatory citations.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 mb-10 shadow-sm space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search all articles by keyword, question, or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="font-bold text-slate-500 uppercase tracking-wider text-[11px] shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Topic:
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-semibold ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Topics ({ARTICLES.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = ARTICLES.filter((a) => a.categorySlug === cat.slug).length;
            return (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-semibold flex items-center gap-1.5 ${
                  selectedCategory === cat.slug
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{cat.name}</span>
                {count > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${selectedCategory === cat.slug ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Intent Filter */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="font-bold text-slate-500 uppercase tracking-wider text-[11px] shrink-0 mr-1">
            Search Intent:
          </span>
          {(['all', 'informational', 'comparison'] as const).map((intent) => (
            <button
              key={intent}
              onClick={() => setSelectedIntent(intent)}
              className={`px-2.5 py-1 rounded-md capitalize transition-colors font-medium ${
                selectedIntent === intent
                  ? 'bg-blue-100 text-blue-800 font-bold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {intent}
            </button>
          ))}
          <span className="text-slate-400 text-xs ml-auto">
            Showing {filteredArticles.length} of {ARTICLES.length} guides
          </span>
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-xl mx-auto">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900 mb-1">No articles match your search</h3>
          <p className="text-xs text-slate-500 mb-6">
            Try adjusting your search query or reset the topic filter to see all guides.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedIntent('all');
            }}
            className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.slug}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <a
                  href={`/blog/${article.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/blog/${article.slug}`);
                  }}
                  className="block aspect-[16/10] bg-slate-100 overflow-hidden relative"
                >
                  <img
                    src={article.featuredImage}
                    alt={article.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width="400"
                    height="250"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md bg-white/95 text-slate-800 shadow-sm backdrop-blur-sm">
                      {article.category}
                    </span>
                    <span className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-slate-900/80 text-white shadow-sm backdrop-blur-sm">
                      {article.searchIntent}
                    </span>
                  </div>
                </a>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {article.publishedDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {article.readingTimeMinutes} min read
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                    <a
                      href={`/blog/${article.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(`/blog/${article.slug}`);
                      }}
                    >
                      {article.title}
                    </a>
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>

                  <div className="pt-2">
                    <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1 font-mono">
                      <Tag className="w-3 h-3 text-slate-400" />
                      &quot;{article.primaryKeyword}&quot;
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-6 h-6 rounded-full object-cover"
                    width="24"
                    height="24"
                  />
                  <span className="font-semibold text-slate-700">{article.author.name}</span>
                </div>
                <a
                  href={`/blog/${article.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/blog/${article.slug}`);
                  }}
                  className="text-emerald-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1"
                >
                  Read Article <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
