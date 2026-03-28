import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bookmark, ChevronUp, Zap, ChevronRight } from 'lucide-react';

export const ToolCard = ({ 
  tool, 
  onClick, 
  customBgClass = "bg-white dark:bg-slate-900", 
  borderClass = "border-slate-200 dark:border-slate-700/80", 
  isBookmarked, 
  onBookmark, 
  upvotes, 
  hasUpvoted, 
  onUpvote 
}) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    onClick={() => onClick(tool)}
    className={`group ${customBgClass} rounded-3xl p-5 md:p-6 border ${borderClass} hover:border-accent-300 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.2)] hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full relative overflow-hidden`}
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 via-accent-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

    <button
      onClick={(e) => onBookmark(e, tool.id)}
      className="absolute top-4 right-4 md:top-5 md:right-5 z-20 p-1.5 md:p-2 rounded-full bg-white dark:bg-slate-900/80 hover:bg-white dark:bg-slate-900 backdrop-blur border border-slate-200 dark:border-slate-700/80 text-slate-400 hover:text-accent-500 transition-all opacity-100 shadow-sm dark:shadow-none"
      title="Save to favorites"
    >
      <Bookmark className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isBookmarked ? 'fill-accent-500 text-accent-500' : ''}`} />
    </button>

    <div className="flex justify-between items-start mb-3 md:mb-4 relative z-10">
      <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 overflow-hidden group-hover:scale-105 transition-transform shadow-sm dark:shadow-none text-2xl md:text-3xl">
        {tool.emoji || '🤖'}
      </div>
    </div>

    <div className="mb-2 relative z-10">
      <span className="inline-flex text-[9px] md:text-[10px] font-bold px-2 py-0.5 md:px-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1 md:mb-2 border border-slate-200 dark:border-slate-700/80/50">
        {tool.sector}
      </span>
      <Link to={`/tool/${tool.id}`} onClick={(e) => e.stopPropagation()} className="block">
        <h3 className="text-lg md:text-xl font-bold group-hover:text-accent-600 transition-colors text-slate-900 dark:text-white leading-tight pr-8 hover:underline decoration-accent-500/50 underline-offset-4">{tool.name}</h3>
      </Link>
    </div>

    <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm leading-relaxed mb-4 md:mb-5 flex-grow line-clamp-3 relative z-10">
      {tool.description}
    </p>

    <div className="mt-auto pt-3 md:pt-4 border-t border-slate-200 dark:border-slate-700/80/50 flex items-center justify-between relative z-10">
      <button
        onClick={(e) => onUpvote(e, tool.id)}
        className={`flex items-center gap-1 md:gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg border text-xs md:text-sm font-bold transition-all z-20 shadow-sm dark:shadow-none ${hasUpvoted ? 'bg-accent-500 border-accent-500 text-white hover:bg-accent-600' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-400 hover:border-slate-300 hover:bg-slate-50 dark:bg-slate-950'}`}
        title="Vote for this tool"
      >
        <ChevronUp className={`w-3 h-3 md:w-4 md:h-4 ${hasUpvoted ? 'text-white' : 'text-slate-400'}`} />
        {upvotes || 0}
      </button>

      <div className="flex items-center gap-2 md:gap-3">
        <div className="flex items-center gap-1 md:gap-1.5 min-w-0">
          <Zap className={`w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0 ${tool.isFullyFree ? 'text-green-500' : 'text-amber-500'}`} />
          <span className={`text-[10px] sm:text-xs font-semibold truncate ${tool.isFullyFree ? 'text-green-600' : 'text-amber-600'}`} style={{ maxWidth: '90px' }}>
            {tool.freeTierDetails}
          </span>
        </div>
        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-accent-50 group-hover:text-accent-600 group-hover:border-accent-200 transition-colors shadow-sm dark:shadow-none flex-shrink-0">
          <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
        </div>
      </div>
    </div>
  </motion.div>
);
