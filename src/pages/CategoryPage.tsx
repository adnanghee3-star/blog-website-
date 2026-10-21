import React from 'react';
import { ArrowRight, Clock, Calendar, BookOpen, Layers } from 'lucide-react';
import { Category, Article } from '../types';
import { ARTICLES } from '../data/articles';
import { useSEO, APP_BASE_URL } from '../utils/seo';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

interface CategoryPageProps {
  category: Category;
  onNavigate: (path: string) => void;
}

export function CategoryPage({ category, onNavigate }: CategoryPageProps) {
  const articles = ARTICLES.filter((a) => a.categorySlug === category.slug);

  useSEO({
    title: `${category.name} Guides & Financial Strategies | WealthPulse`,
    description: category.description,
    canonicalPath: `/category/${category.slug}`,
    ogType: 'website',
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs
        items={[
          { label: 'Categories', path: '/categories' },
          { label: category.name, path: `/category/${category.slug}` },
        ]}
        onNavigate={onNavigate}
      />

      {/* Category Hero Banner */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-12 mb-12 shadow-lg">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Topic Category</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            {category.name}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {category.description}
          </p>
          <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
            <span className="font-semibold text-emerald-400">
              {articles.length} Published {articles.length === 1 ? 'Guide' : 'Guides'}
            </span>
            <span>•</span>
            <span className="font-mono">Primary Focus: &quot;{category.primaryKeyword}&quot;</span>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Articles in {category.name}
        </h2>

        {articles.length === 0 ? (
          <div className="p-12 bg-white rounded-2xl border border-slate-200 text-center text-slate-500">
            <BookOpen className="w-10 h-10 mx-auto mb-3 text-slate-300" />
            <p className="font-bold text-slate-700">No articles currently published in this category.</p>
            <p className="text-xs text-slate-400 mt-1">Our editorial board is actively preparing verified guides for this topic.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={article.slug}
                onClick={() => onNavigate(`/blog/${article.slug}`)}
                className="group cursor-pointer bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative">
                    <img
                      src={article.featuredImage}
                      alt={article.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      width="400"
                      height="250"
                    />
                  </div>
                  <div className="p-6 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {article.publishedDate}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {article.readingTimeMinutes} min read
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3">
                      {article.excerpt}
                    </p>
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
                  <span className="text-emerald-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
