import { Link } from 'react-router-dom';
import { blogPosts } from '../data';
import { useSEO } from '../hooks/useSEO';
import { BookOpen, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Newsletter } from '../components/Newsletter';

export default function Blog() {
    useSEO({
        title: 'AI Blog & Guides | AI Directory',
        description: 'Read the latest trends, guides, and news about Artificial Intelligence. Stay updated with our comprehensive AI blog.'
    });

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-accent-100 text-accent-600 mb-6">
                        <BookOpen className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">Articles & Guides</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Deep dives, tutorials, and latest news from the Artificial Intelligence world. Learn how to automate your daily tasks.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <motion.div 
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700/80 shadow-sm dark:shadow-none hover:shadow-xl hover:shadow-accent-500/10 transition-all group flex flex-col"
                        >
                            <Link to={`/blog/${post.id}`} className="block relative aspect-video overflow-hidden">
                                <img 
                                    src={post.image} 
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-white dark:bg-slate-900/90 backdrop-blur text-slate-800 dark:text-slate-100 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                                        {post.category}
                                    </span>
                                </div>
                            </Link>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-3">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>{post.readTime} read</span>
                                </div>
                                <Link to={`/blog/${post.id}`} className="block group-hover:text-accent-600 transition-colors mb-4">
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                                        {post.title}
                                    </h2>
                                </Link>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <Link to={`/blog/${post.id}`} className="mt-auto inline-flex items-center gap-1.5 text-accent-600 font-bold hover:text-accent-700 transition-colors text-sm">
                                    Read Article <ChevronRight className="w-4 h-4" />
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
