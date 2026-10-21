import React from 'react';
import {
  PieChart,
  PiggyBank,
  TrendingUp,
  BarChart3,
  CreditCard,
  Landmark,
  Compass,
  Receipt,
  Wallet,
  CheckCircle2,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { ARTICLES } from '../data/articles';
import { useSEO } from '../utils/seo';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

interface CategoriesOverviewPageProps {
  onNavigate: (path: string) => void;
}

export function CategoriesOverviewPage({ onNavigate }: CategoriesOverviewPageProps) {
  useSEO({
    title: 'Financial Topics & Money Categories | WealthPulse Directory',
    description: 'Browse all 10 core personal finance categories including budgeting, emergency funds, debt payoff, banking, credit scores, investing, and taxes.',
    canonicalPath: '/categories',
    ogType: 'website',
  });

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'PieChart': return <PieChart className="w-6 h-6 text-emerald-600" />;
      case 'PiggyBank': return <PiggyBank className="w-6 h-6 text-blue-600" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-amber-600" />;
      case 'BarChart3': return <BarChart3 className="w-6 h-6 text-indigo-600" />;
      case 'CreditCard': return <CreditCard className="w-6 h-6 text-rose-600" />;
      case 'Landmark': return <Landmark className="w-6 h-6 text-cyan-600" />;
      case 'Receipt': return <Receipt className="w-6 h-6 text-red-600" />;
      case 'Wallet': return <Wallet className="w-6 h-6 text-teal-600" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-6 h-6 text-green-600" />;
      default: return <Compass className="w-6 h-6 text-violet-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ label: 'Categories Directory', path: '/categories' }]} onNavigate={onNavigate} />

      <div className="max-w-3xl mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 block mb-2">
          Knowledge Taxonomy
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          Personal Finance Topics & Categories
        </h1>
        <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
          Structured into ten logical money disciplines, our content covers every phase of your personal financial journey—from survival budgeting to generational wealth transfer.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => {
          const articleCount = ARTICLES.filter((a) => a.categorySlug === cat.slug).length;

          return (
            <div
              key={cat.slug}
              onClick={() => onNavigate(`/category/${cat.slug}`)}
              className="group cursor-pointer bg-white rounded-2xl border border-slate-200 p-6 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getCategoryIcon(cat.iconName)}
                  </div>
                  <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-slate-100 text-slate-700 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                    {articleCount} {articleCount === 1 ? 'Guide' : 'Guides'}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2">
                  {cat.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {cat.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400 text-[11px]">
                  Focus: &quot;{cat.primaryKeyword}&quot;
                </span>
                <span className="text-emerald-600 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
