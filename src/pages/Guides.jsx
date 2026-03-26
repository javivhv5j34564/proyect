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
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-yellow-100 text-yellow-600 mb-6">
                        <Lightbulb className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">AI How-to Guides</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Master the tools of tomorrow. Step-by-step tutorials, prompt engineering tricks, and workflow automations to 10x your productivity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {guidesData.map((guide, index) => (
                        <motion.div 
                            key={guide.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700/80 shadow-sm dark:shadow-none hover:shadow-xl hover:shadow-yellow-500/10 transition-all group flex flex-col"
                        >
                            <Link to={`/guide/${guide.id}`} className="block relative aspect-video overflow-hidden">
                                <img 
                                    src={guide.coverImage} 
                                    alt={guide.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white dark:bg-slate-900/90 backdrop-blur text-slate-800 dark:text-slate-100 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                                        {guide.category}
                                    </span>
                                </div>
                            </Link>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-3">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>{guide.readTime}</span>
                                </div>
                                <Link to={`/guide/${guide.id}`} className="block group-hover:text-yellow-600 transition-colors mb-4">
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                                        {guide.title}
                                    </h2>
                                </Link>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                                    {guide.excerpt}
                                </p>
                                <Link to={`/guide/${guide.id}`} className="mt-auto inline-flex items-center gap-1.5 text-yellow-600 font-bold hover:text-yellow-700 transition-colors text-sm">
                                    Read Guide <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12">
                    <Newsletter />
                </div>
            </div>
        </div>
    );
}
