import React, { useState } from 'react';
import { TrendingUp, BarChart, Sparkles } from 'lucide-react';

export function CompoundInterestCalculator() {
  const [initialPrincipal, setInitialPrincipal] = useState<number>(5000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(350);
  const [annualRate, setAnnualRate] = useState<number>(8.0);
  const [years, setYears] = useState<number>(25);

  // Calculation logic
  // FV of lump sum: P * (1 + r/n)^(nt)
  // FV of series: PMT * [((1 + r/n)^(nt) - 1) / (r/n)]
  const r = annualRate / 100;
  const n = 12; // monthly compounding
  const totalMonths = years * 12;

  const fvPrincipal = initialPrincipal * Math.pow(1 + r / n, totalMonths);
  const fvContributions =
    r === 0
      ? monthlyContribution * totalMonths
      : monthlyContribution * ((Math.pow(1 + r / n, totalMonths) - 1) / (r / n));

  const totalBalance = Math.round(fvPrincipal + fvContributions);
  const totalDeposited = initialPrincipal + monthlyContribution * totalMonths;
  const totalInterest = Math.max(0, totalBalance - totalDeposited);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Compound Growth Wealth Simulator</h3>
          <p className="text-sm text-slate-500">Calculate how consistent monthly investing compounds over long horizons</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            Starting Principal
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
            <input
              type="number"
              value={initialPrincipal}
              onChange={(e) => setInitialPrincipal(Math.max(0, Number(e.target.value)))}
              className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            Monthly Contribution
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Math.max(0, Number(e.target.value)))}
              className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            Estimated Annual Return (%)
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.1"
              value={annualRate}
              onChange={(e) => setAnnualRate(Math.max(0, Number(e.target.value)))}
              className="w-full pl-4 pr-8 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">%</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">S&P 500 historical average ~8-10%</span>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            Time Horizon (Years)
          </label>
          <input
            type="number"
            min="1"
            max="50"
            value={years}
            onChange={(e) => setYears(Math.max(1, Number(e.target.value)))}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <span className="text-[11px] text-slate-500 mt-1 block">Longer horizon = exponential growth</span>
        </div>
      </div>

      {/* Summary Highlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-slate-900 text-white rounded-2xl mb-6">
        <div>
          <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
            Total Future Portfolio
          </div>
          <div className="text-3xl lg:text-4xl font-extrabold text-emerald-400">
            ${totalBalance.toLocaleString()}
          </div>
          <p className="text-xs text-slate-400 mt-1">Value after {years} years</p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
            Out-of-Pocket Deposited
          </div>
          <div className="text-2xl font-bold text-slate-200">
            ${totalDeposited.toLocaleString()}
          </div>
          <p className="text-xs text-slate-400 mt-1">Your direct contributions</p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
            Compound Interest Earned
          </div>
          <div className="text-2xl font-bold text-indigo-400">
            ${totalInterest.toLocaleString()}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {totalDeposited > 0 ? `${Math.round((totalInterest / totalBalance) * 100)}% of ending wealth` : 'Pure growth'}
          </p>
        </div>
      </div>
    </div>
  );
}
