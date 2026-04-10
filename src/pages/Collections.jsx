import { Link } from 'react-router-dom';
import { curatedLists } from '../curatedLists';
import { useSEO } from '../hooks/useSEO';
import { Layers, ChevronRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Collections() {
    useSEO({
        title: 'Curated AI Collections | Top AI Tools Lists',
        description: 'Discover our hand-picked collections of the best Artificial Intelligence tools sorted by use-case. Avoid the noise and find exactly what you need quickly.'
    });

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.03] bg-[length:32px_32px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent-400/20 dark:bg-accent-600/10 blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10 pt-10">
                <div className="text-center mb-16">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center justify-center p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-accent-500 mb-6 shadow-xl"
                    >
                        <Layers className="w-10 h-10" />
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight"
                    >
                        Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-500 to-primary-600">AI Collections</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
                    >
                        Hand-picked lists of the absolute best tools for specific workflows, ensuring maximum productivity with zero fluff.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {curatedLists.map((list, index) => (
                        <motion.div 
                            key={list.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-accent-500/30 transition-all duration-300 group flex flex-col"
                        >
                            <Link to={`/collections/${list.slug}`} className="block relative aspect-[16/9] overflow-hidden m-2 rounded-2xl">
                                <img 
                                    src={list.coverImage} 
                                    alt={list.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md shadow-lg border border-white/20">
                                    {list.tools.length} Tools
                                </div>
                            </Link>

                            <div className="p-6 md:p-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold mb-3 uppercase tracking-wider">
                                    <Clock className="w-4 h-4 text-accent-500" />
                                    <span>{list.readTime} read</span>
                                </div>
                                <Link to={`/collections/${list.slug}`} className="block group-hover:text-accent-600 transition-colors mb-3">
                                    <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                                        {list.title}
                                    </h2>
                                </Link>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                                    {list.excerpt}
                                </p>
                                <Link to={`/collections/${list.slug}`} className="mt-auto inline-flex items-center gap-2 text-slate-900 dark:text-white font-black hover:text-accent-600 dark:hover:text-accent-500 transition-colors bg-slate-100 dark:bg-slate-800/50 hover:bg-accent-50 dark:hover:bg-accent-900/20 px-6 py-3 rounded-xl w-fit group/btn border border-slate-200 dark:border-slate-700/50">
                                    View Collection 
                                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
