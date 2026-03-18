import { useState } from 'react';
import { Twitter, Linkedin, Link2, Check, MessageCircle, Facebook } from 'lucide-react';

export function ShareButtons({ title, text, url }) {
    const [copied, setCopied] = useState(false);

    const shareUrl = url || window.location.href;
    const shareTitle = title || "Check out this AI tool!";
    const shareText = text || "Awesome AI Directory";

    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(shareTitle);
    const encodedText = encodeURIComponent(shareText);

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    };

    return (
        <div className="flex items-center gap-2 flex-wrap">
            <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" 
               className="flex items-center justify-center p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] border border-slate-200 dark:border-slate-700/80 hover:border-[#1DA1F2]/30 transition-all shadow-sm dark:shadow-none group"
               title="Share on Twitter / X">
                <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
            
            <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" 
               className="flex items-center justify-center p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 hover:bg-[#25D366]/10 hover:text-[#25D366] border border-slate-200 dark:border-slate-700/80 hover:border-[#25D366]/30 transition-all shadow-sm dark:shadow-none group"
               title="Share on WhatsApp">
                <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>

            <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" 
               className="flex items-center justify-center p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 hover:bg-[#0A66C2]/10 hover:text-[#0A66C2] border border-slate-200 dark:border-slate-700/80 hover:border-[#0A66C2]/30 transition-all shadow-sm dark:shadow-none group"
               title="Share on LinkedIn">
                <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
            
            <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" 
               className="flex items-center justify-center p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 hover:bg-[#1877F2]/10 hover:text-[#1877F2] border border-slate-200 dark:border-slate-700/80 hover:border-[#1877F2]/30 transition-all shadow-sm dark:shadow-none group"
               title="Share on Facebook">
                <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>

            <button onClick={handleCopy} 
               className={`flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2.5 rounded-xl border transition-all shadow-sm dark:shadow-none font-bold text-xs ${copied ? 'bg-green-500 border-green-500 text-white' : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700/80 hover:border-slate-300'}`}
               title="Copy direct link">
                {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Link'}
            </button>
        </div>
    );
}
