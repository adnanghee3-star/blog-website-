import React from 'react';
import {
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Award,
  BookOpen,
  PieChart,
  PiggyBank,
  CreditCard,
  BarChart3,
  Landmark,
  Compass,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
} from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { CATEGORIES } from '../data/categories';
import { useSEO, APP_BASE_URL } from '../utils/seo';
import { BudgetCalculator } from '../components/tools/BudgetCalculator';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export function HomePage({ onNavigate, onOpenSearch }: HomePageProps) {
  useSEO({
    title: 'WealthPulse – Money, Budgeting & Smart Personal Finance',
    description: 'Expert personal finance guides, budgeting strategies, debt payoff methods, banking comparisons, and investing basics for financial freedom.',
    canonicalPath: '/',
    ogType: 'website',
    ogImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&h=630&q=80',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'WealthPulse',
      url: APP_BASE_URL,
      description: 'Comprehensive personal finance blog and money guide.',
    },
  });

  const featuredArticles = ARTICLES.filter((a) => a.featured);
  const heroArticle = featuredArticles[0] || ARTICLES[0];
  const secondaryFeatured = featuredArticles.slice(1, 4);
  const latestArticles = ARTICLES.slice(0, 6);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'PieChart': return <PieChart className="w-5 h-5 text-emerald-600" />;
      case 'PiggyBank': return <PiggyBank className="w-5 h-5 text-blue-600" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-amber-600" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-indigo-600" />;
      case 'CreditCard': return <CreditCard className="w-5 h-5 text-rose-600" />;
      case 'Landmark': return <Landmark className="w-5 h-5 text-cyan-600" />;
      default: return <Compass className="w-5 h-5 text-purple-600" />;
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-16 sm:pt-24 pb-20 sm:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.18),rgba(255,255,255,0))]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Independent Personal Finance & AEO Guides</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
              Master Your Money with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Clarity & Confidence</span>
            </h1>

            <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed">
              No hype, no fabricated promises. Just rigorously fact-checked budgeting systems, debt reduction strategies, and investing fundamentals engineered for real life.
            </p>

            {/* Quick search and action row */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <button
                type="button"
                onClick={onOpenSearch}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 px-5 py-3.5 bg-slate-800/90 hover:bg-slate-800 border border-slate-700 rounded-xl text-slate-300 hover:text-white text-sm font-semibold transition-all shadow-lg"
              >
                <Search className="w-4 h-4 text-emerald-400" />
                <span>Search money guides...</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/blog')}
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                <span>Browse Articles</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Featured Hero Article Banner */}
          <div className="mt-14 max-w-5xl mx-auto">
            <div
              onClick={() => onNavigate(`/blog/${heroArticle.slug}`)}
              className="group cursor-pointer bg-slate-800/80 hover:bg-slate-800 rounded-3xl border border-slate-700/80 p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:border-emerald-500/50 shadow-2xl flex flex-col lg:flex-row gap-8 items-center"
            >
              <div className="w-full lg:w-1/2 aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-700 relative">
                <img
                  src={heroArticle.featuredImage}
                  alt={heroArticle.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="eager"
                  width="600"
                  height="450"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow">
                  Featured Guide
                </span>
              </div>

              <div className="w-full lg:w-1/2 space-y-4">
                <div className="flex items-center gap-3 text-xs text-emerald-400 font-bold uppercase tracking-wider">
                  <span>{heroArticle.category}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400 flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5" /> {heroArticle.readingTimeMinutes} min read
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                  {heroArticle.title}
                </h2>

                <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">
                  {heroArticle.excerpt}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={heroArticle.author.avatar}
                      alt={heroArticle.author.name}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/30"
                      width="32"
                      height="32"
                    />
                    <span className="text-xs text-slate-300 font-semibold">{heroArticle.author.name}</span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                    Read Guide <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 block mb-1">
              Explore By Topic
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Essential Money Categories
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/categories')}
            className="text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 self-start"
          >
            <span>View All 10 Categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.slice(0, 6).map((cat) => (
            <div
              key={cat.slug}
              onClick={() => onNavigate(`/category/${cat.slug}`)}
              className="group cursor-pointer p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {getCategoryIcon(cat.iconName)}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Tool Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-xl">
          <div className="max-w-3xl mb-8">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider inline-block mb-3">
              Interactive Financial Utility
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Calculate Your Ideal 50/30/20 Budget in Seconds
            </h2>
            <p className="text-slate-300 text-sm mt-2">
              Input your net monthly take-home pay to see a clear, mathematical allocation across essential survival needs, discretionary wants, and wealth-building savings.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-2 text-slate-900 shadow-2xl">
            <BudgetCalculator />
          </div>
        </div>
      </section>

      {/* Latest Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 block mb-1">
              Fresh Insights
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Latest Personal Finance Articles
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/blog')}
            className="text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 self-start"
          >
            <span>View Full Archive</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestArticles.map((article) => (
            <article
              key={article.slug}
              onClick={() => onNavigate(`/blog/${article.slug}`)}
              className="group cursor-pointer bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col"
            >
              <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative">
                <img
                  src={article.featuredImage}
                  alt={article.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width="400"
                  height="250"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md bg-white/95 text-slate-800 shadow-sm backdrop-blur-sm">
                  {article.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                    <span>{article.publishedDate}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {article.readingTimeMinutes} min read
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
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
                  <span className="text-emerald-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Editorial Trust & Transparency Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100/70 border border-slate-200 rounded-3xl p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 block mb-1">
              Editorial Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Why Readers Trust WealthPulse
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Financial advice without integrity destroys lives. Here is how we uphold our editorial commitment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">CFP® & CPA Fact Checking</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every calculation, rule threshold, and legal citation is verified by credentialed financial planners before publication.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Zero Pay-to-Rank Bias</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Banks and lenders cannot buy positive reviews or pay to alter our mathematical comparisons. Editorial is 100% independent.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Answer-First Clarity</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We respect your time. Every major financial question is answered in the first two sentences before diving into deep math.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
