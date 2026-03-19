export const ToolCardSkeleton = () => (
  <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 md:p-6 border border-slate-200 dark:border-slate-700/80 shadow-sm dark:shadow-none flex flex-col h-full relative overflow-hidden animate-pulse">
    <div className="absolute top-4 right-4 md:top-5 md:right-5 w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800"></div>

    <div className="flex justify-between items-start mb-3 md:mb-4 relative z-10">
      <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-slate-200 dark:bg-slate-800"></div>
    </div>

    <div className="mb-2">
      <div className="w-20 h-4 bg-slate-200 dark:bg-slate-800 rounded-full mb-2"></div>
      <div className="w-3/4 h-6 bg-slate-200 dark:bg-slate-800 rounded-md mb-1"></div>
    </div>

    <div className="space-y-2 mb-4 md:mb-5 flex-grow">
      <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
      <div className="w-5/6 h-3 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
      <div className="w-4/6 h-3 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
    </div>

    <div className="mt-auto pt-3 md:pt-4 border-t border-slate-200 dark:border-slate-700/80/50 flex items-center justify-between">
      <div className="w-16 h-8 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
      <div className="flex items-center gap-2">
        <div className="w-16 h-4 bg-slate-200 dark:bg-slate-800 rounded-md"></div>
        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-200 dark:bg-slate-800"></div>
      </div>
    </div>
  </div>
);
