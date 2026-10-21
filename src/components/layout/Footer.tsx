import React, { useState } from 'react';
import { TrendingUp, ShieldAlert, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const handleNav = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Brand Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-800">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                <TrendingUp className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Wealth<span className="text-emerald-400">Pulse</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              WealthPulse is an independent, fact-checked personal finance publication dedicated to transparent budgeting frameworks, debt elimination methods, consumer credit health, and long-term wealth compounding.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2.5 py-1 text-xs rounded-md bg-slate-800 text-emerald-400 border border-slate-700/60 font-medium">
                CFP® Reviewed Content
              </span>
              <span className="px-2.5 py-1 text-xs rounded-md bg-slate-800 text-slate-300 border border-slate-700/60 font-medium">
                Answer-First AEO
              </span>
              <span className="px-2.5 py-1 text-xs rounded-md bg-slate-800 text-slate-300 border border-slate-700/60 font-medium">
                Zero Sponsored Bias
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-800/60 p-6 sm:p-8 rounded-2xl border border-slate-750">
            <h4 className="text-lg font-bold text-white mb-2">Join the Weekly Money Briefing</h4>
            <p className="text-slate-400 text-xs sm:text-sm mb-4">
              Get one actionable personal finance framework every Thursday morning. No spam, no affiliate hype—just math-backed money tactics.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 rounded-xl text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>You are subscribed! Welcome to the WealthPulse Money Briefing.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  placeholder="Enter your personal email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Subscribe Free</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 4 Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-slate-800 text-sm">
          <div>
            <h5 className="font-bold text-white uppercase text-xs tracking-wider mb-4">Core Categories</h5>
            <ul className="space-y-2.5 text-slate-400">
              {CATEGORIES.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <a
                    href={`/category/${c.slug}`}
                    onClick={(e) => handleNav(`/category/${c.slug}`, e)}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    {c.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase text-xs tracking-wider mb-4">Popular Guides</h5>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <a
                  href="/blog/how-to-create-a-monthly-budget"
                  onClick={(e) => handleNav('/blog/how-to-create-a-monthly-budget', e)}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Create a Monthly Budget
                </a>
              </li>
              <li>
                <a
                  href="/blog/how-to-build-an-emergency-fund"
                  onClick={(e) => handleNav('/blog/how-to-build-an-emergency-fund', e)}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Build an Emergency Fund
                </a>
              </li>
              <li>
                <a
                  href="/blog/how-to-improve-your-credit-score-fast"
                  onClick={(e) => handleNav('/blog/how-to-improve-your-credit-score-fast', e)}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Improve Credit Score Fast
                </a>
              </li>
              <li>
                <a
                  href="/blog/debt-snowball-vs-debt-avalanche-payoff"
                  onClick={(e) => handleNav('/blog/debt-snowball-vs-debt-avalanche-payoff', e)}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Debt Snowball vs Avalanche
                </a>
              </li>
              <li>
                <a
                  href="/blog/investing-for-beginners-complete-guide"
                  onClick={(e) => handleNav('/blog/investing-for-beginners-complete-guide', e)}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Investing for Beginners
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase text-xs tracking-wider mb-4">Calculators & Tools</h5>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <a
                  href="/tools"
                  onClick={(e) => handleNav('/tools', e)}
                  className="hover:text-emerald-400 transition-colors"
                >
                  50/30/20 Budget Calculator
                </a>
              </li>
              <li>
                <a
                  href="/tools"
                  onClick={(e) => handleNav('/tools', e)}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Emergency Fund Estimator
                </a>
              </li>
              <li>
                <a
                  href="/tools"
                  onClick={(e) => handleNav('/tools', e)}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Compound Growth Simulator
                </a>
              </li>
              <li>
                <a
                  href="/seo-matrix"
                  onClick={(e) => handleNav('/seo-matrix', e)}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center gap-1"
                >
                  <span>SEO & Keyword Matrix</span>
                  <span className="text-[10px] bg-emerald-900/60 px-1.5 py-0.5 rounded text-emerald-300">Live</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase text-xs tracking-wider mb-4">Editorial & Trust</h5>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <a
                  href="/about"
                  onClick={(e) => handleNav('/about', e)}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Editorial Guidelines
                </a>
              </li>
              <li>
                <a
                  href="/about#team"
                  onClick={(e) => handleNav('/about', e)}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Financial Review Board
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleNav('/contact', e)}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Contact Editorial Desk
                </a>
              </li>
              <li>
                <a
                  href="/disclaimer"
                  onClick={(e) => handleNav('/disclaimer', e)}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Financial Disclaimer
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => handleNav('/privacy', e)}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => handleNav('/terms', e)}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Financial Disclaimer Banner */}
        <div className="mt-8 p-5 bg-slate-800/40 border border-slate-800 rounded-xl text-xs text-slate-400 leading-relaxed">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-300 font-semibold block mb-1">
                Important Regulatory & Financial Advice Disclaimer:
              </strong>
              WealthPulse is an independent digital educational publisher. The financial, investment, budgeting, tax, and credit scoring information provided across our website, articles, and calculators is strictly intended for general educational and informational purposes only. Nothing on this website constitutes professional financial, tax, or legal advice, nor should it be interpreted as a personalized recommendation to buy, sell, or hold any security, open any bank account, or execute any financial transaction. Before taking action based on any information published here, consult with a licensed Certified Financial Planner (CFP®), Certified Public Accountant (CPA), or qualified fiduciary attorney in your jurisdiction.
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal line */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} WealthPulse Media. All rights reserved. Built for Search & AI Answer Engines.</p>
          <div className="flex items-center gap-6">
            <a href="/sitemap.xml" className="hover:text-slate-300 transition-colors" target="_blank" rel="noopener noreferrer">
              XML Sitemap
            </a>
            <a href="/robots.txt" className="hover:text-slate-300 transition-colors" target="_blank" rel="noopener noreferrer">
              Robots.txt
            </a>
            <a href="/disclaimer" onClick={(e) => handleNav('/disclaimer', e)} className="hover:text-slate-300 transition-colors">
              Compliance
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
