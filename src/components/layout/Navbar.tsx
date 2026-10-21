import React, { useState } from 'react';
import {
  TrendingUp,
  Search,
  Menu,
  X,
  Calculator,
  BookOpen,
  Layers,
  Info,
  ShieldAlert,
  SlidersHorizontal,
  ChevronRight,
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch?: () => void;
}

export function Navbar({ currentPath, onNavigate, onOpenSearch }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'All Articles', path: '/blog' },
    { label: 'Categories', path: '/categories' },
    { label: 'Financial Tools', path: '/tools' },
    { label: 'About & Standards', path: '/about' },
    { label: 'SEO Matrix', path: '/seo-matrix', badge: 'Audit' },
  ];

  const handleLinkClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <a
            href="/"
            onClick={(e) => handleLinkClick('/', e)}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                Wealth<span className="text-emerald-600">Pulse</span>
              </span>
              <span className="hidden sm:block text-[10px] uppercase font-bold tracking-widest text-slate-400">
                Personal Finance & SEO
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive =
                item.path === '/'
                  ? currentPath === '/'
                  : currentPath.startsWith(item.path);

              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleLinkClick(item.path, e)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-emerald-100 text-emerald-800 tracking-wide">
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenSearch}
              className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Search articles"
              title="Search articles"
            >
              <Search className="w-5 h-5" />
            </button>

            <a
              href="/tools"
              onClick={(e) => handleLinkClick('/tools', e)}
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow transition-all"
            >
              <Calculator className="w-4 h-4" />
              <span>Free Calculators</span>
            </a>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-xl">
          {navItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              onClick={(e) => handleLinkClick(item.path, e)}
              className="flex items-center justify-between px-3 py-3 rounded-xl text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
            >
              <span className="flex items-center gap-2">
                {item.label}
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-emerald-100 text-emerald-800">
                    {item.badge}
                  </span>
                )}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
          ))}
          <div className="pt-4">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch?.();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold bg-slate-50"
            >
              <Search className="w-4 h-4" /> Search articles & topics
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
