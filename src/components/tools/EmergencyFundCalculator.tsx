import React, { useState } from 'react';
import { ShieldAlert, CheckCircle, ArrowRight } from 'lucide-react';

export function EmergencyFundCalculator() {
  const [monthlyEssentialExpenses, setMonthlyEssentialExpenses] = useState<number>(2800);
  const [targetMonths, setTargetMonths] = useState<number>(6);
  const [currentSavings, setCurrentSavings] = useState<number>(4500);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(400);

  const targetAmount = monthlyEssentialExpenses * targetMonths;
  const shortfall = Math.max(0, targetAmount - currentSavings);
  const fundedPercentage = Math.min(100, Math.round((currentSavings / targetAmount) * 100));
  const monthsToGoal = monthlyContribution > 0 ? Math.ceil(shortfall / monthlyContribution) : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Emergency Fund Safety Target Estimator</h3>
          <p className="text-sm text-slate-500">Calculate how much cash you need to buffer unexpected life events</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            Monthly Essential Expenses
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
            <input
              type="number"
              value={monthlyEssentialExpenses}
              onChange={(e) => setMonthlyEssentialExpenses(Math.max(100, Number(e.target.value)))}
              className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Rent, food, utilities, minimum debt</span>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            Buffer Horizon
          </label>
          <select
            value={targetMonths}
            onChange={(e) => setTargetMonths(Number(e.target.value))}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={3}>3 Months (Dual Income / Low Risk)</option>
            <option value={6}>6 Months (Standard Benchmark)</option>
            <option value={9}>9 Months (Homeowner / High Dependents)</option>
            <option value={12}>12 Months (Freelancer / Variable Pay)</option>
          </select>
          <span className="text-[11px] text-slate-500 mt-1 block">Recommended: 6 months for security</span>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            Current Emergency Cash
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Math.max(0, Number(e.target.value)))}
              className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Cash in bank savings & checking</span>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            Monthly Savings Added
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">$</span>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Math.max(0, Number(e.target.value)))}
              className="w-full pl-8 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">Amount saved each month</span>
        </div>
      </div>

      {/* Results Bar */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="text-xs uppercase font-bold tracking-wider text-slate-500">Total Safety Target</div>
            <div className="text-3xl font-extrabold text-slate-900">${targetAmount.toLocaleString()}</div>
          </div>
          <div className="flex items-center gap-6">
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500">Funded Status</div>
              <div className="text-xl font-extrabold text-blue-600">{fundedPercentage}% Complete</div>
            </div>
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500">Remaining Gap</div>
              <div className="text-xl font-extrabold text-slate-700">${shortfall.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500">Estimated Timeline</div>
              <div className="text-xl font-extrabold text-emerald-600">
                {shortfall === 0 ? 'Fully Funded!' : `${monthsToGoal} Months`}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-3 rounded-full bg-slate-200 overflow-hidden mb-3">
          <div
            className={`h-full transition-all duration-500 ${fundedPercentage >= 100 ? 'bg-emerald-500' : 'bg-blue-600'}`}
            style={{ width: `${fundedPercentage}%` }}
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            {shortfall === 0
              ? 'Congratulations! You have met your emergency savings benchmark. Excess cash can now be funneled into index investments.'
              : `At $${monthlyContribution}/month, you will fully fund your $${targetAmount.toLocaleString()} safety cushion in approximately ${monthsToGoal} months.`}
          </span>
        </div>
      </div>
    </div>
  );
}
