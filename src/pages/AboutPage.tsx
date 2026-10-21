import React from 'react';
import { ShieldCheck, Award, Users, BookOpen, CheckCircle2, HeartHandshake, FileCheck } from 'lucide-react';
import { AUTHORS } from '../data/authors';
import { useSEO } from '../utils/seo';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  useSEO({
    title: 'About WealthPulse & Editorial Standards | Financial Transparency',
    description: 'Learn about WealthPulse, our certified financial planning editorial board, zero-sponsored review standards, and fact-checking methodology.',
    canonicalPath: '/about',
    ogType: 'website',
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <Breadcrumbs items={[{ label: 'About & Standards', path: '/about' }]} onNavigate={onNavigate} />

      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Our Editorial Mission</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          Democratizing Rigorous Personal Financial Education
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          WealthPulse was founded on a simple premise: financial guidance should be based on mathematical realities, consumer protection laws, and peer-reviewed behavioral psychology—never on who paid the highest affiliate bounty.
        </p>
      </div>

      {/* 3 Core Editorial Commitments */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Credentialed Verification</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Every budgeting guideline, interest rate threshold, and tax code explanation is authored or audited by credentialed professionals (CFP®, CPA, CFA).
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Official Citations Only</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We ground all numerical claims in verified data from central banks and regulatory authorities, including the Federal Reserve, CFPB, FDIC, and SEC.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No Pay-to-Rank Reviews</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Financial institutions cannot buy higher placement, edit our comparison matrices, or censor legitimate consumer warnings on our platform.
          </p>
        </div>
      </div>

      {/* Editorial Process Workflow */}
      <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Our 5-Step Editorial & Fact-Checking Process</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs space-y-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
              1
            </span>
            <div className="font-bold text-slate-900">Search Intent Audit</div>
            <p className="text-slate-500">We analyze genuine search queries to isolate the exact question readers need answered.</p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs space-y-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
              2
            </span>
            <div className="font-bold text-slate-900">Mathematical Modeling</div>
            <p className="text-slate-500">We run independent compound interest, tax bracket, and debt payoff calculations.</p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs space-y-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
              3
            </span>
            <div className="font-bold text-slate-900">Answer-First Drafting</div>
            <p className="text-slate-500">The core question is answered upfront in plain English before exploring deep nuances.</p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs space-y-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
              4
            </span>
            <div className="font-bold text-slate-900">CFP® / CPA Review</div>
            <p className="text-slate-500">A second licensed professional reviews legal rules, risk disclosures, and citations.</p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs space-y-2">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
              5
            </span>
            <div className="font-bold text-slate-900">Routine Maintenance</div>
            <p className="text-slate-500">Guides are periodically audited to ensure interest rates and tax numbers stay accurate.</p>
          </div>
        </div>
      </section>

      {/* Editorial Board Profiles */}
      <section id="team" className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 block mb-1">
            Meet the Authors
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Our Financial Editorial Board
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Real professionals with verified licenses in financial planning, economics, and consumer credit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(AUTHORS).map((author) => (
            <div
              key={author.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/20"
                  width="64"
                  height="64"
                />
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{author.name}</h3>
                  <p className="text-xs text-emerald-700 font-semibold">{author.title}</p>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">{author.credentials}</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {author.bio}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                Peer Reviewer: <span className="font-semibold text-slate-600">{author.reviewedBy || 'WealthPulse Editorial Board'}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
