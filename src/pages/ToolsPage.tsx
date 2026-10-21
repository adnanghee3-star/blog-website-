import React, { useState } from 'react';
import { Calculator, PieChart, ShieldAlert, TrendingUp } from 'lucide-react';
import { useSEO } from '../utils/seo';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { BudgetCalculator } from '../components/tools/BudgetCalculator';
import { EmergencyFundCalculator } from '../components/tools/EmergencyFundCalculator';
import { CompoundInterestCalculator } from '../components/tools/CompoundInterestCalculator';

interface ToolsPageProps {
  onNavigate: (path: string) => void;
}

export function ToolsPage({ onNavigate }: ToolsPageProps) {
  const [activeTab, setActiveTab] = useState<'budget' | 'emergency' | 'compound'>('budget');

  useSEO({
    title: 'Free Financial Calculators & Planning Tools | WealthPulse',
    description: 'Use our free interactive 50/30/20 budget calculator, emergency fund safety target estimator, and compound interest simulator to build wealth.',
    canonicalPath: '/tools',
    ogType: 'website',
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <Breadcrumbs items={[{ label: 'Financial Tools', path: '/tools' }]} onNavigate={onNavigate} />

      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
          <Calculator className="w-3.5 h-3.5" />
          <span>Interactive Money Utilities</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          Personal Financial Calculators
        </h1>
        <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
          Numbers turn ambiguous anxiety into an engineering equation. Use these free, client-side financial simulators to budget your paychecks, calculate safety buffers, and visualize compound growth.
        </p>
      </div>

      {/* Calculator Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('budget')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
            activeTab === 'budget'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <PieChart className="w-4 h-4" />
          <span>50/30/20 Budget Calculator</span>
        </button>

        <button
          onClick={() => setActiveTab('emergency')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
            activeTab === 'emergency'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Emergency Fund Estimator</span>
        </button>

        <button
          onClick={() => setActiveTab('compound')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap ${
            activeTab === 'compound'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Compound Growth Simulator</span>
        </button>
      </div>

      {/* Render Active Tool */}
      <div className="space-y-8">
        {activeTab === 'budget' && (
          <div className="space-y-6">
            <BudgetCalculator />
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-600 space-y-2">
              <h4 className="font-bold text-slate-900 text-base">How to Use the 50/30/20 Budget Rule</h4>
              <p>
                The 50/30/20 budget framework divides your after-tax net pay into three distinct buckets: 50% for living necessities, 30% for discretionary wants, and 20% for savings and extra debt payments. If your necessities exceed 50%, reduce your wants percentage until your income rises.
              </p>
              <div className="pt-2">
                <a
                  href="/blog/how-to-create-a-monthly-budget"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/blog/how-to-create-a-monthly-budget');
                  }}
                  className="font-bold text-emerald-700 hover:underline"
                >
                  Read our complete step-by-step monthly budgeting guide &rarr;
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'emergency' && (
          <div className="space-y-6">
            <EmergencyFundCalculator />
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-600 space-y-2">
              <h4 className="font-bold text-slate-900 text-base">Why You Need 3 to 6 Months of Liquid Cash</h4>
              <p>
                An emergency fund protects you from life&apos;s inevitable disruptions—auto repairs, medical copays, or sudden job loss—without forcing you into expensive high-interest credit card debt. Always store your emergency fund in an FDIC-insured high-yield savings account.
              </p>
              <div className="pt-2">
                <a
                  href="/blog/how-to-build-an-emergency-fund"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/blog/how-to-build-an-emergency-fund');
                  }}
                  className="font-bold text-blue-700 hover:underline"
                >
                  Read our full emergency fund savings guide &rarr;
                </a>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'compound' && (
          <div className="space-y-6">
            <CompoundInterestCalculator />
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-600 space-y-2">
              <h4 className="font-bold text-slate-900 text-base">The Mathematical Law of Compounding</h4>
              <p>
                Albert Einstein famously referred to compound interest as the eighth wonder of the world. By consistently investing surplus funds into broad-market index funds, your interest begins generating interest, transforming modest monthly contributions into multi-million dollar nest eggs over decades.
              </p>
              <div className="pt-2">
                <a
                  href="/blog/investing-for-beginners-complete-guide"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/blog/investing-for-beginners-complete-guide');
                  }}
                  className="font-bold text-indigo-700 hover:underline"
                >
                  Read our beginner&apos;s guide to index funds and compounding &rarr;
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
