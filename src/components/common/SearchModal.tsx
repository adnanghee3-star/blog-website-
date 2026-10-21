import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, BookOpen, Sparkles, Filter } from 'lucide-react';
import { ARTICLES } from '../../data/articles';
import { Article } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export function SearchModal({ isOpen, onClose, onNavigate }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const categories = ['all', ...Array.from(new Set(ARTICLES.map((a) => a.category)))];

  const results: Article[] = ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    if (!matchesCategory) return false;

    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      article.title.toLowerCase().includes(q) ||
      article.primaryKeyword.toLowerCase().includes(q) ||
      article.secondaryKeywords.some((k) => k.toLowerCase().includes(q)) ||
      article.excerpt.toLowerCase().includes(q) ||
      article.sections.some((s) => s.questionH2.toLowerCase().includes(q) || s.answerFirst.toLowerCase().includes(q))
    );
  });

  const handleSelect = (path: string) => {
    onNavigate(path);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search articles"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-12 sm:pt-20 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0 ml-1" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by topic, question, or keyword (e.g. 50/30/20 budget, emergency fund)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-base sm:text-lg text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-md"
          >
            ESC
          </button>
        </div>

        {/* Filter Bar */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap capitalize transition-colors font-medium ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-4 space-y-3 flex-1">
          {results.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-base font-semibold text-slate-600">No matching articles found</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for &quot;budget&quot;, &quot;emergency&quot;, &quot;credit&quot;, or &quot;investing&quot;</p>
            </div>
          ) : (
            results.map((article) => (
              <div
                key={article.slug}
                onClick={() => handleSelect(`/blog/${article.slug}`)}
                className="group p-3.5 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/40 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-slate-100 text-slate-700 group-hover:bg-emerald-100 group-hover:text-emerald-800">
                    {article.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {article.readingTimeMinutes} min read
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-medium ml-auto">
                    Intent: {article.searchIntent}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {article.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                  {article.excerpt}
                </p>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                  <span className="italic text-slate-500 font-mono">
                    Keyword: &quot;{article.primaryKeyword}&quot;
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600 font-semibold group-hover:translate-x-1 transition-transform">
                    Read Guide <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
