import React, { useState } from 'react';
import { Share2, Check, Link2, Twitter, Linkedin, Facebook } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-2 flex items-center gap-1.5">
        <Share2 className="w-3.5 h-3.5" /> Share:
      </span>

      <button
        onClick={handleCopy}
        type="button"
        title="Copy article link"
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
          copied
            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
        }`}
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Link2 className="w-3.5 h-3.5" />}
        <span>{copied ? 'Copied!' : 'Copy Link'}</span>
      </button>

      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on X (Twitter)"
        className="p-1.5 rounded-lg text-slate-600 bg-white border border-slate-200 hover:text-slate-900 hover:bg-slate-50 transition-colors"
      >
        <Twitter className="w-3.5 h-3.5" />
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on LinkedIn"
        className="p-1.5 rounded-lg text-slate-600 bg-white border border-slate-200 hover:text-blue-700 hover:bg-slate-50 transition-colors"
      >
        <Linkedin className="w-3.5 h-3.5" />
      </a>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Share on Facebook"
        className="p-1.5 rounded-lg text-slate-600 bg-white border border-slate-200 hover:text-blue-800 hover:bg-slate-50 transition-colors"
      >
        <Facebook className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}
