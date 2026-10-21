import React, { useState } from 'react';
import { PieChart, DollarSign, CheckCircle2, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

export function BudgetCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(4200);

  const needs = Math.round(monthlyIncome * 0.5);
  const wants = Math.round(monthlyIncome * 0.3);
  const savings = Math.round(monthlyIncome * 0.2);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
          <PieChart className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">50/30/20 Interactive Budget Calculator</h3>
          <p className="text-sm text-slate-500">Calculate your ideal monthly split for needs, wants, and savings</p>
        </div>
      </div>

      <div className="mb-8">
        <label htmlFor="monthly-income-input" className="block text-sm font-semibold text-slate-700 mb-2">
          Monthly Take-Home (Net) Income
        </label>
        <div className="relative max-w-md">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
          <input
            id="monthly-income-input"
            type="number"
            min="500"
            max="100000"
            step="100"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Math.max(0, Number(e.target.value)))}
            className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-lg transition-all"
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">
          Enter your net cash deposited into your bank account after all payroll taxes and health deductions.
        </p>
      </div>

      {/* Visual Proportional Bar */}
      <div className="space-y-2 mb-8">
        <div className="flex justify-between text-xs font-semibold text-slate-600">
          <span className="text-emerald-700">50% Needs: ${needs.toLocaleString()}</span>
          <span className="text-blue-700">30% Wants: ${wants.toLocaleString()}</span>
          <span className="text-indigo-700">20% Savings: ${savings.toLocaleString()}</span>
        </div>
        <div className="h-4 rounded-full overflow-hidden flex bg-slate-100 shadow-inner">
          <div style={{ width: '50%' }} className="bg-emerald-500 transition-all duration-300" title="50% Needs" />
          <div style={{ width: '30%' }} className="bg-blue-500 transition-all duration-300" title="30% Wants" />
          <div style={{ width: '20%' }} className="bg-indigo-600 transition-all duration-300" title="20% Savings" />
        </div>
      </div>

      {/* The 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Needs */}
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-emerald-100 text-emerald-800">
              50% Needs
            </span>
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mb-1">
            ${needs.toLocaleString()}
            <span className="text-xs font-medium text-slate-500 ml-1">/ month</span>
          </div>
          <p className="text-xs text-slate-600 mb-4 font-medium">Non-negotiable survival obligations:</p>
          <ul className="text-xs text-slate-600 space-y-1.5">
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Rent or mortgage & insurance</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Essential groceries & cooking</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Electric, gas, water & internet</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Car payments & transit passes</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Minimum credit card & loan dues</li>
          </ul>
        </div>

        {/* Wants */}
        <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-blue-100 text-blue-800">
              30% Wants
            </span>
            <Sparkles className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mb-1">
            ${wants.toLocaleString()}
            <span className="text-xs font-medium text-slate-500 ml-1">/ month</span>
          </div>
          <p className="text-xs text-slate-600 mb-4 font-medium">Lifestyle choices and enjoyment:</p>
          <ul className="text-xs text-slate-600 space-y-1.5">
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Dining out & food delivery</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Netflix, Spotify & subscriptions</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Weekend travel & vacation trips</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Hobbies, games & entertainment</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Clothing & personal shopping</li>
          </ul>
        </div>

        {/* Savings & Debt */}
        <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md bg-indigo-100 text-indigo-800">
              20% Savings
            </span>
            <DollarSign className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mb-1">
            ${savings.toLocaleString()}
            <span className="text-xs font-medium text-slate-500 ml-1">/ month</span>
          </div>
          <p className="text-xs text-slate-600 mb-4 font-medium">Building long-term wealth:</p>
          <ul className="text-xs text-slate-600 space-y-1.5">
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> Emergency fund in a high-yield account</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> Extra payments to erase credit debt</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> Roth IRA & 401(k) contributions</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> House down payment savings</li>
            <li className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> Low-cost index fund investments</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
