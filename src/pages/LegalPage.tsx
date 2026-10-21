import React, { useState, useEffect } from 'react';
import { ShieldAlert, FileText, Lock, Scale } from 'lucide-react';
import { useSEO } from '../utils/seo';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

interface LegalPageProps {
  initialTab?: 'disclaimer' | 'privacy' | 'terms';
  onNavigate: (path: string) => void;
}

export function LegalPage({ initialTab = 'disclaimer', onNavigate }: LegalPageProps) {
  const [activeTab, setActiveTab] = useState<'disclaimer' | 'privacy' | 'terms'>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useSEO({
    title:
      activeTab === 'disclaimer'
        ? 'Financial Disclaimer & Compliance | WealthPulse'
        : activeTab === 'privacy'
        ? 'Privacy Policy & Data Protection | WealthPulse'
        : 'Terms of Service & Usage Terms | WealthPulse',
    description:
      'Official legal disclosures, educational financial disclaimer, privacy policy, and terms of service for WealthPulse.',
    canonicalPath: `/${activeTab}`,
    ogType: 'website',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <Breadcrumbs
        items={[
          {
            label:
              activeTab === 'disclaimer'
                ? 'Financial Disclaimer'
                : activeTab === 'privacy'
                ? 'Privacy Policy'
                : 'Terms of Service',
            path: `/${activeTab}`,
          },
        ]}
        onNavigate={onNavigate}
      />

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => {
            setActiveTab('disclaimer');
            onNavigate('/disclaimer');
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'disclaimer'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Financial Disclaimer</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('privacy');
            onNavigate('/privacy');
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'privacy'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Privacy Policy</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('terms');
            onNavigate('/terms');
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'terms'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>Terms of Service</span>
        </button>
      </div>

      {/* Financial Disclaimer Content */}
      {activeTab === 'disclaimer' && (
        <section className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              General Financial & Investment Disclaimer
            </h1>
            <p className="text-xs text-slate-500 mt-1">Last Updated: October 2026</p>
          </div>

          <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-950 font-medium text-xs sm:text-sm">
            WealthPulse does not provide individualized investment, financial, tax, or legal advice. All content published across this website is strictly educational.
          </div>

          <h2 className="text-lg font-bold text-slate-900 pt-2">1. No Fiduciary or Advisory Relationship</h2>
          <p>
            The articles, mathematical models, calculators, and commentary provided on WealthPulse are for general informational purposes only. Accessing or using this website does not establish a financial advisor-client, fiduciary, or attorney-client relationship. You should never execute financial decisions based exclusively on digital articles without consulting an independent Certified Financial Planner (CFP®), Certified Public Accountant (CPA), or licensed legal counsel.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-2">2. Risk of Financial Loss & Past Performance</h2>
          <p>
            All investing carries inherent financial risk, including the possible loss of principal capital. Historical stock market returns (such as historical S&P 500 averages) are never a guarantee of future investment yields or economic stability. Any hypothetical simulations, compound growth tables, or savings projections are for illustrative purposes only.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-2">3. Accuracy of Tax Rules & Bank APYs</h2>
          <p>
            While our editorial board strives to verify all data against official IRS, Federal Reserve, and CFPB benchmarks at the time of publication, tax brackets, interest rates (APYs), and credit rules are subject to frequent statutory revision. Always verify current federal and state figures with authoritative government publications.
          </p>
        </section>
      )}

      {/* Privacy Policy Content */}
      {activeTab === 'privacy' && (
        <section className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-500 mt-1">Effective Date: October 2026</p>
          </div>

          <p>
            At WealthPulse, reader privacy is a fundamental right. We do not sell, rent, or trade your personal information to third-party data brokers, predatory lending platforms, or credit card marketers.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-2">1. Information We Collect</h2>
          <p>
            When you subscribe to our newsletter or submit an editorial inquiry via our contact form, we collect your email address and message content strictly to deliver the requested communications. We do not retain sensitive financial identifiers such as social security numbers, bank logins, or credit card accounts.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-2">2. Client-Side Financial Calculators</h2>
          <p>
            All inputs entered into our 50/30/20 budget calculator, emergency fund estimator, and compound interest simulator are executed entirely within your web browser. We never log, transmit, or store your private income numbers or expense figures on our servers.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-2">3. Cookies & Analytical Telemetry</h2>
          <p>
            We use minimal, privacy-respecting cookies exclusively to remember user preferences and measure aggregate traffic performance. You may disable cookies at any time through your browser settings without loss of article functionality.
          </p>
        </section>
      )}

      {/* Terms of Service Content */}
      {activeTab === 'terms' && (
        <section className="bg-white p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
          <div className="border-b border-slate-200 pb-4">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Terms of Service
            </h1>
            <p className="text-xs text-slate-500 mt-1">Effective Date: October 2026</p>
          </div>

          <h2 className="text-lg font-bold text-slate-900 pt-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or browsing WealthPulse, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service and our Financial Disclaimer. If you do not agree, you must discontinue using our website.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-2">2. Intellectual Property & Fair Use</h2>
          <p>
            All original articles, calculation models, graphics, and written content are the protected intellectual property of WealthPulse Media. You may quote short excerpts for educational or review purposes provided you give clear attribution and include an active canonical hyperlink back to the original source URL.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-2">3. Limitation of Liability</h2>
          <p>
            In no event shall WealthPulse, its authors, editors, or certified financial reviewers be held liable for any direct, indirect, incidental, or consequential financial losses arising out of your reliance on the information, estimates, or calculations published on this website.
          </p>
        </section>
      )}
    </div>
  );
}
