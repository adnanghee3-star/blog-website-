import React, { useState } from 'react';
import { Mail, MessageSquare, CheckCircle2, Send, ShieldAlert, Clock, MapPin } from 'lucide-react';
import { useSEO } from '../utils/seo';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('editorial');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useSEO({
    title: 'Contact Editorial Desk & Corrections | WealthPulse',
    description: 'Reach our financial editorial desk for corrections, fact-checking queries, licensing, or media interviews.',
    canonicalPath: '/contact',
    ogType: 'website',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      <Breadcrumbs items={[{ label: 'Contact', path: '/contact' }]} onNavigate={onNavigate} />

      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
          <Mail className="w-3.5 h-3.5" />
          <span>Editorial Communication</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
          Contact the WealthPulse Desk
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Have a question about a calculation, a regulatory correction to submit, or an inquiry for our financial review board? We respond to all reader inquiries within two business days.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Message Received</h3>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Thank you for reaching out. Our editorial team will review your inquiry and follow up shortly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="jane@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Inquiry Topic
                </label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white font-medium"
                >
                  <option value="editorial">Editorial Question or Topic Request</option>
                  <option value="correction">Fact-Check or Numerical Correction</option>
                  <option value="press">Press, Media & Interview Inquiry</option>
                  <option value="technical">Website Accessibility or Technical Issue</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Message Details
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your inquiry, feedback, or citation reference..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white resize-y"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message to Editorial Desk</span>
              </button>
            </form>
          )}
        </div>

        {/* Info Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Direct Channels</h3>
            
            <div className="space-y-3 text-xs sm:text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">General Editorial</span>
                  <span>editorial@wealthpulse.org</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Editorial Turnaround</span>
                  <span>Monday – Friday, 9:00 AM – 5:00 PM EST</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Publication Office</span>
                  <span>Financial District, New York, NY 10005</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 leading-relaxed">
            <strong className="font-bold block mb-1">Notice Regarding Advisory Requests:</strong>
            Our editorial staff cannot provide personalized financial planning or tax preparation advice to individual readers. For personal portfolio advice, please consult an independent fee-only CFP®.
          </div>
        </div>
      </div>
    </div>
  );
}
