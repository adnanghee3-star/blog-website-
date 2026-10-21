import React from 'react';
import { Compass, ArrowRight, Home, Search, BookOpen } from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { useSEO } from '../utils/seo';

interface NotFoundPageProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export function NotFoundPage({ onNavigate, onOpenSearch }: NotFoundPageProps) {
  useSEO({
    title: '404 – Page Not Found | WealthPulse',
    description: 'The requested personal finance page or guide could not be located. Browse our top financial articles or use our search tool.',
    canonicalPath: '/404',
    ogType: 'website',
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
        <Compass className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Error 404</span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Page Not Located
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
          The link you clicked may have moved, expired, or been restructured. Explore our core money guides below or search our archive.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          onClick={() => onNavigate('/')}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-colors flex items-center gap-2 shadow-xs"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </button>

        <button
          onClick={onOpenSearch}
          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-xl transition-colors flex items-center gap-2"
        >
          <Search className="w-4 h-4" />
          <span>Search Archive</span>
        </button>
      </div>

      <div className="pt-10 text-left border-t border-slate-200">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>Popular Financial Guides</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ARTICLES.slice(0, 4).map((a) => (
            <a
              key={a.slug}
              href={`/blog/${a.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(`/blog/${a.slug}`);
              }}
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-xs transition-all text-xs font-semibold text-slate-800 flex items-center justify-between group"
            >
              <span className="truncate mr-2 group-hover:text-emerald-700">{a.title}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
