import { Link } from 'react-router-dom';
import { guidesData } from '../guidesData';
import { useSEO } from '../hooks/useSEO';
import { Lightbulb, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Newsletter } from '../components/Newsletter';

export default function Guides() {
    useSEO({
        title: 'How-to Guides & Tutorials | AI Directory',
        description: 'Learn how to use AI tools effectively. Step-by-step guides, prompts, and tutorials for ChatGPT, Midjourney, and more.'
    });

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 relative overflow-hidden">
            
            {/* Background elements */}
            <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.03] bg-[length:32px_32px] pointer-events-none" />
            <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-yellow-400/20 dark:bg-yellow-600/10 blur-3xl pointer-events-none animate-blob" />
            <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-3xl pointer-events-none animate-blob animation-delay-4000" />
            
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16 pt-10">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="inline-flex items-center justify-center p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-yellow-500 mb-6 shadow-xl shadow-yellow-500/10"
                    >
                        <Lightbulb className="w-10 h-10" />
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 drop-shadow-sm"
                    >
                        AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600 text-gradient">How-to Guides</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Master the tools of tomorrow. Step-by-step tutorials, prompt engineering tricks, and workflow automations to 10x your productivity.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {guidesData.map((guide, index) => (
                        <motion.div 
                            key={guide.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-slate-200/80 dark:border-slate-700/50 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-yellow-500/10 hover:border-yellow-500/30 transition-all duration-300 group flex flex-col relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/0 via-transparent to-yellow-500/0 group-hover:from-yellow-500/5 group-hover:to-transparent transition-all duration-500 pointer-events-none" />
                            
                            <Link to={`/guide/${guide.id}`} className="block relative aspect-[16/10] overflow-hidden m-3 rounded-[1.5rem]">
                                <img 
                                    src={guide.coverImage} 
                                    alt={guide.title}
                                    className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                                        {guide.category}
                                    </span>
                                </div>
                            </Link>

                            <div className="p-6 md:p-8 flex flex-col flex-grow relative z-10">
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold mb-4 uppercase tracking-wider">
                                    <Clock className="w-4 h-4 text-yellow-500" />
                                    <span>{guide.readTime}</span>
                                </div>
                                <Link to={`/guide/${guide.id}`} className="block group-hover:text-yellow-600 transition-colors mb-4">
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                                        {guide.title}
                                    </h2>
                                </Link>
                                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-8 flex-grow line-clamp-3">
                                    {guide.excerpt}
                                </p>
                                <Link to={`/guide/${guide.id}`} className="mt-auto inline-flex items-center gap-2 text-slate-900 dark:text-white font-black hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors bg-slate-100 dark:bg-slate-800/50 hover:bg-yellow-50 dark:hover:bg-yellow-500/10 px-6 py-3 rounded-2xl w-fit group/btn">
                                    Read Full Guide 
                                    <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20"
                >
                    <Newsletter />
                </motion.div>
            </div>
        </div>
    );
}
