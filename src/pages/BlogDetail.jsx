import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Bookmark, Share2, Sparkles, ChevronRight } from 'lucide-react';
import { blogPosts } from '../data';
import { useSEO } from '../hooks/useSEO';
import { useEffect } from 'react';
import { ShareButtons } from '../components/ShareButtons';

export default function BlogDetail() {
    const { id } = useParams();
    const post = blogPosts.find(p => p.id === id);

    useSEO({
        title: post ? `${post.title} | AI Directory Blog` : 'Post Not Found',
        description: post ? post.excerpt : 'The requested blog post was not found.',
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const isHeading = (text) => text.length > 5 && text.length < 80 && !text.endsWith('.') && !text.endsWith('!') && !text.endsWith('?') && !text.includes(':');

    const generateTOC = (content) => {
        const headings = [];
        const paragraphs = content.split('\n\n');
        paragraphs.forEach(p => {
             if (isHeading(p)) {
                 headings.push({ text: p, id: p.toLowerCase().replace(/[^a-z0-9]+/g, '-') });
             }
        });
        return headings;
    }

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Post not found</h2>
                    <Link to="/" className="text-accent-600 font-bold hover:underline">Return to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-8 pb-20">
            <div className="max-w-4xl mx-auto px-4 md:px-6">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-400 mb-8 overflow-x-auto no-scrollbar whitespace-nowrap px-1">
                    <Link to="/" className="hover:text-accent-600 transition-colors flex items-center gap-1">Home</Link>
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                    <span className="text-slate-600 dark:text-slate-400 font-bold">Blog</span>
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                    <span className="text-slate-400 truncate max-w-[200px]">{post.title}</span>
                </nav>

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-accent-600 transition-all bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 hover:border-accent-200 px-5 py-2.5 rounded-2xl shadow-sm dark:shadow-none hover:shadow-md mb-10 active:scale-95"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Directory
                </Link>

                <article className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-700/80/60 shadow-xl shadow-slate-200/40 overflow-hidden">
                    {/* Header Image */}
                    <div className="relative h-[300px] md:h-[450px] w-full">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-accent-500 text-white text-xs font-black uppercase tracking-widest mb-4 shadow-lg shadow-accent-500/30">
                                {post.category}
                            </span>
                            <h1 className="text-2xl md:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-sm dark:shadow-none">
                                {post.title}
                            </h1>
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        {/* Meta info */}
                        <div className="flex flex-wrap items-center gap-6 mb-10 pb-8 border-b border-slate-100 dark:border-slate-800 text-sm font-bold text-slate-500 dark:text-slate-400">

                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                </div>
                                <span>March 2026</span>
                            </div>
                            <div className="ml-auto flex items-center gap-3">
                                <ShareButtons title={post.title} text={post.excerpt} />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="prose prose-slate prose-lg md:prose-xl max-w-none">
                            <p className="text-xl md:text-2xl font-medium text-slate-700 dark:text-slate-300 leading-relaxed italic border-l-4 border-accent-400 pl-6 mb-10">
                                {post.excerpt}
                            </p>

                            {/* Table of Contents */}
                            {generateTOC(post.content).length > 0 && (
                                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 mb-10 border border-slate-100 dark:border-slate-800">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Table of Contents</h3>
                                    <ul className="space-y-2.5">
                                        {generateTOC(post.content).map((h, i) => (
                                            <li key={i} className="list-disc ml-4">
                                                <a href={`#${h.id}`} className="text-slate-600 dark:text-slate-400 hover:text-accent-500 transition-colors font-medium">
                                                    {h.text}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-6">
                                {post.content.split('\n\n').map((paragraph, idx) => {
                                    if (isHeading(paragraph)) {
                                        const id = paragraph.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                                        return <h2 key={idx} id={id} className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4 scroll-mt-24">{paragraph}</h2>;
                                    }
                                    return <p key={idx}>{paragraph}</p>;
                                })}
                            </div>

                            <div className="mt-16 p-8 md:p-10 bg-slate-900 rounded-[2rem] text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                    <Sparkles className="w-32 h-32" />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-black mb-4">Start using AI tools today</h3>
                                    <p className="text-slate-400 mb-8 max-w-lg leading-relaxed">
                                        Explore our curated list with more than 100 free and freemium Artificial Intelligence tools for professional use.
                                    </p>
                                    <Link
                                        to="/"
                                        className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white font-black px-8 py-4 rounded-2xl transition-all shadow-xl shadow-accent-500/20 active:scale-95"
                                    >
                                        Go to Directory
                                        <ArrowLeft className="w-5 h-5 rotate-180" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                {/* E-E-A-T Author Box */}
                <div className="mt-12 bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                    <img src="https://ui-avatars.com/api/?name=Javier+AI&background=6366f1&color=fff&size=128" alt="Javier - AI Expert" className="w-20 h-20 rounded-full flex-shrink-0" />
                    <div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Written by Javier</h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed mb-3">Javier is an AI researcher and automation expert. He actively curates the Global AI Directory, rigorously testing new LLMs, computer vision frameworks, and generative AI tools to help professionals integrate artificial intelligence into their daily workflows.</p>
                        <Link to="/about" className="text-sm font-bold text-accent-600 dark:text-accent-500 hover:text-accent-500 transition-colors">Read our editorial criteria →</Link>
                    </div>
                </div>

                {/* Related Articles Section */}
                {blogPosts.filter(p => p.id !== post.id).length > 0 && (
                    <div className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-16">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Related Articles</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {blogPosts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 2).concat(
                                blogPosts.filter(p => p.id !== post.id && p.category !== post.category).slice(0, 1)
                            ).slice(0, 2).map((relatedPost) => (
                                <Link to={`/blog/${relatedPost.id}`} key={relatedPost.id} className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-xl hover:border-accent-200 transition-all">
                                    <div className="w-full md:w-2/5 h-40 md:h-auto relative overflow-hidden flex-shrink-0">
                                        <img src={relatedPost.image} alt={relatedPost.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="p-5 flex flex-col justify-center">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-accent-600 dark:text-accent-500 mb-2">{relatedPost.category}</span>
                                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-accent-600 transition-colors line-clamp-2">{relatedPost.title}</h4>
                                        <span className="text-sm font-bold text-slate-400 flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> {relatedPost.readTime}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
