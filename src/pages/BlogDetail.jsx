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
        title: post ? `${post.title} | AI News & Tutorials 2024` : 'Post Not Found',
        description: post ? `${post.excerpt} Learn more about Artificial Intelligence trends and guides.` : 'The requested blog post was not found.',
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
                    <Link to="/" className="text-indigo-600 font-bold hover:underline">Return to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-8 pb-20 relative overflow-hidden">
            {/* Background Layers */}
            <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.03] bg-[length:32px_32px] pointer-events-none" />
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-80 left-10 w-80 h-80 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-500 mb-8 overflow-x-auto no-scrollbar whitespace-nowrap px-1 py-2 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md w-fit rounded-full pl-4 pr-6 border border-slate-200 dark:border-slate-800">
                    <Link to="/" className="hover:text-indigo-600 font-bold transition-colors flex items-center gap-1">Home</Link>
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                    <span className="text-slate-600 dark:text-slate-400 font-bold">Blog</span>
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                    <span className="text-indigo-600 dark:text-indigo-500 font-bold truncate max-w-[200px]">{post.title}</span>
                </nav>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 px-6 py-3 rounded-2xl shadow-sm dark:shadow-none hover:shadow-md mb-10 active:scale-95 group/btn"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
                        Back to Directory
                    </Link>

                    <article className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-3xl rounded-[3rem] border border-slate-200/80 dark:border-slate-700/50 shadow-2xl shadow-slate-200/40 dark:shadow-none overflow-hidden relative">
                        {/* Header Image */}
                        <div className="relative h-[300px] md:h-[500px] w-full p-3 md:p-6 pb-0">
                            <div className="w-full h-full rounded-[2rem] overflow-hidden relative shadow-lg">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                                <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12">
                                    <span className="inline-block px-4 py-2 rounded-full bg-indigo-500 text-white text-xs font-black uppercase tracking-widest mb-4 shadow-lg shadow-indigo-500/30">
                                        {post.category}
                                    </span>
                                    <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-md">
                                        {post.title}
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 md:p-16 pt-10">
                            {/* Meta info */}
                            <div className="flex flex-wrap items-center gap-6 mb-12 pb-8 border-b border-slate-100 dark:border-slate-800 text-sm font-black tracking-wide text-slate-400 dark:text-slate-500">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                                    </div>
                                    <span>March 2026</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-indigo-500" />
                                    </div>
                                    <span className="text-indigo-600 dark:text-indigo-500">{post.readTime}</span>
                                </div>
                                <div className="ml-auto flex items-center gap-3">
                                    <ShareButtons title={post.title} text={post.excerpt} />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="prose prose-slate prose-lg md:prose-xl dark:prose-invert max-w-none">
                                <p className="text-xl md:text-3xl font-medium text-slate-700 dark:text-slate-300 leading-pristine italic border-l-4 border-indigo-400 pl-8 mb-12">
                                    {post.excerpt}
                                </p>

                                {/* Table of Contents */}
                                {generateTOC(post.content).length > 0 && (
                                    <div className="bg-slate-50/50 dark:bg-slate-800/30 rounded-3xl p-8 mb-12 border border-slate-100 dark:border-slate-800/50 backdrop-blur-sm shadow-sm">
                                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                            <span className="bg-indigo-500 w-2 h-6 rounded-full inline-block"></span>
                                            Table of Contents
                                        </h3>
                                        <ul className="space-y-3 m-0 p-0 list-none">
                                            {generateTOC(post.content).map((h, i) => (
                                                <li key={i} className="ml-0">
                                                    <a href={`#${h.id}`} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-500 transition-colors font-bold text-base md:text-lg no-underline group/link">
                                                        <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover/link:text-indigo-500 transition-colors" />
                                                        {h.text}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="text-slate-600 dark:text-slate-300 leading-relaxed md:leading-[1.8] space-y-6">
                                    {post.content.split('\n\n').map((paragraph, idx) => {
                                        if (isHeading(paragraph)) {
                                            const id = paragraph.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                                            return <h2 key={idx} id={id} className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-16 mb-8 scroll-mt-24 tracking-tight"><span className="text-indigo-500 mr-2">#</span>{paragraph}</h2>;
                                        }
                                        return <p key={idx}>{paragraph}</p>;
                                    })}
                                </div>

                                <div className="mt-20 p-8 md:p-12 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none" />
                                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 group-hover:rotate-12 transition-all duration-1000 ease-out">
                                        <Sparkles className="w-40 h-40 text-indigo-400" />
                                    </div>
                                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
                                        <div>
                                            <h3 className="text-3xl font-black mb-4">Start using AI tools today</h3>
                                            <p className="text-slate-400 text-lg max-w-lg leading-relaxed mb-0">
                                                Explore our curated list with more than 100 free and freemium Artificial Intelligence tools for professional use.
                                            </p>
                                        </div>
                                        <Link
                                            to="/"
                                            className="inline-flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white hover:text-slate-900 font-black px-8 py-5 rounded-2xl md:rounded-3xl transition-all shadow-xl shadow-indigo-500/20 active:scale-95 whitespace-nowrap"
                                        >
                                            Explore AI Tools
                                            <ArrowLeft className="w-5 h-5 rotate-180" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* E-E-A-T Author Box */}
                    <div className="mt-12 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start border border-slate-200/80 dark:border-slate-800/80 shadow-md">
                        <div className="relative">
                            <img src="https://ui-avatars.com/api/?name=Editorial+Team&background=6366f1&color=fff&size=128" alt="Editorial Team" className="w-24 h-24 rounded-full flex-shrink-0 shadow-lg border-4 border-white dark:border-slate-800" />
                            <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white dark:border-slate-900"></div>
                        </div>
                        <div>
                            <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Written by the Editorial Team</h4>
                            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed mb-4">Our team of AI researchers and automation experts actively curates the Global AI Directory, rigorously testing new LLMs, computer vision frameworks, and generative AI tools to help professionals integrate artificial intelligence into their daily workflows.</p>
                            <Link to="/about" className="inline-flex items-center gap-2 text-sm font-black text-indigo-600 dark:text-indigo-500 hover:text-indigo-700 transition-colors uppercase tracking-wider">Read our editorial criteria <ChevronRight className="w-4 h-4" /></Link>
                        </div>
                    </div>

                    {/* Related Articles Section */}
                    {blogPosts.filter(p => p.id !== post.id).length > 0 && (
                        <div className="mt-16 pt-16">
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-10 flex items-center gap-3">
                                <Sparkles className="w-8 h-8 text-indigo-500" />
                                Keep Reading
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {blogPosts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 2).concat(
                                    blogPosts.filter(p => p.id !== post.id && p.category !== post.category).slice(0, 1)
                                ).slice(0, 2).map((relatedPost) => (
                                    <Link to={`/blog/${relatedPost.id}`} key={relatedPost.id} className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-[2rem] border border-slate-200/80 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-2xl hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all duration-300">
                                        <div className="w-full md:w-2/5 h-48 md:h-auto relative overflow-hidden flex-shrink-0 m-2 rounded-[1.5rem]">
                                            <img src={relatedPost.image} alt={relatedPost.title} className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-transform duration-700" />
                                        </div>
                                        <div className="p-6 md:p-8 flex flex-col justify-center flex-grow">
                                            <span className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-500 mb-3">{relatedPost.category}</span>
                                            <h4 className="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-500 transition-colors line-clamp-2 leading-tight">{relatedPost.title}</h4>
                                            <span className="text-sm font-bold text-slate-400 flex items-center gap-2"><Clock className="w-4 h-4 text-indigo-500"/> {relatedPost.readTime}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
