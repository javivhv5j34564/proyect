import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Sparkles, ChevronRight } from 'lucide-react';
import { guidesData } from '../guidesData';
import { useSEO } from '../hooks/useSEO';
import { useEffect } from 'react';

export default function GuideDetail() {
    const { id } = useParams();
    const guide = guidesData.find(g => g.id === id);

    useSEO({
        title: guide ? `${guide.title} | AI Directory Guides` : 'Guide Not Found',
        description: guide ? guide.excerpt : 'The requested guide was not found.',
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const generateTOC = (content) => {
        const headings = [];
        const lines = content.split('\n');
        lines.forEach(line => {
            const h2Match = line.match(/^##\s+(.*)/);
            if (h2Match) headings.push({ text: h2Match[1], level: 2, id: h2Match[1].toLowerCase().replace(/[^a-z0-9]+/g, '-') });
            
            const h3Match = line.match(/^###\s+(.*)/);
            if (h3Match) headings.push({ text: h3Match[1], level: 3, id: h3Match[1].toLowerCase().replace(/[^a-z0-9]+/g, '-') });
        });
        return headings;
    }

    if (!guide) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Guide not found</h2>
                    <Link to="/guides" className="text-yellow-600 font-bold hover:underline">Return to Guides</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-8 pb-20">
            <div className="max-w-4xl mx-auto px-4 md:px-6">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-400 mb-8 overflow-x-auto no-scrollbar whitespace-nowrap px-1">
                    <Link to="/" className="hover:text-yellow-600 transition-colors flex items-center gap-1">Home</Link>
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                    <Link to="/guides" className="text-slate-600 dark:text-slate-400 font-bold hover:text-yellow-600 transition-colors">Guides</Link>
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                    <span className="text-slate-400 truncate max-w-[200px]">{guide.title}</span>
                </nav>

                <Link
                    to="/guides"
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-yellow-600 transition-all bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 hover:border-yellow-200 px-5 py-2.5 rounded-2xl shadow-sm dark:shadow-none hover:shadow-md mb-10 active:scale-95"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Guides
                </Link>

                <article className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-700/80/60 shadow-xl shadow-slate-200/40 overflow-hidden">
                    {/* Header Image */}
                    <div className="relative h-[300px] md:h-[450px] w-full">
                        <img
                            src={guide.coverImage}
                            alt={guide.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-500 text-slate-900 text-xs font-black uppercase tracking-widest mb-4 shadow-lg shadow-yellow-500/30">
                                {guide.category}
                            </span>
                            <h1 className="text-2xl md:text-4xl font-black text-white leading-tight tracking-tight drop-shadow-sm dark:shadow-none">
                                {guide.title}
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
                                <span>{guide.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>{guide.readTime}</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="prose prose-slate prose-lg md:prose-xl dark:prose-invert max-w-none">
                            <p className="text-xl md:text-2xl font-medium text-slate-700 dark:text-slate-300 leading-relaxed italic border-l-4 border-yellow-400 pl-6 mb-10">
                                {guide.excerpt}
                            </p>

                            {/* Table of Contents */}
                            {generateTOC(guide.content).length > 0 && (
                                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 mb-10 border border-slate-100 dark:border-slate-800">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Table of Contents</h3>
                                    <ul className="space-y-2.5">
                                        {generateTOC(guide.content).map((h, i) => (
                                            <li key={i} className={h.level === 3 ? "ml-6 list-[circle] text-sm" : "list-disc ml-4"}>
                                                <a href={`#${h.id}`} className="text-slate-600 dark:text-slate-400 hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors font-medium">
                                                    {h.text}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-6" dangerouslySetInnerHTML={{ __html: guide.content.replace(/\\n/g, '<br />').replace(/> "(.*?)"/g, '<blockquote class="border-l-4 border-yellow-500 pl-4 py-2 italic bg-slate-100 dark:bg-slate-800 my-4 text-slate-700 dark:text-slate-300 rounded-r-lg">"$1"</blockquote>').replace(/^##\s+(.*?)$/gm, (match, p1) => `<h2 id="${p1.toLowerCase().replace(/[^a-z0-9]+/g, '-')}" class="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4 scroll-mt-24">${p1}</h2>`).replace(/^###\s+(.*?)$/gm, (match, p1) => `<h3 id="${p1.toLowerCase().replace(/[^a-z0-9]+/g, '-')}" class="text-xl font-bold text-slate-800 dark:text-slate-100 mt-6 mb-3 scroll-mt-24">${p1}</h3>`) }} />

                            <div className="mt-16 p-8 md:p-10 bg-slate-900 rounded-[2rem] text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                                    <Sparkles className="w-32 h-32" />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-black mb-4">Mastered this guide?</h3>
                                    <p className="text-slate-400 mb-8 max-w-lg leading-relaxed">
                                        Put your new skills to the test. Browse our AI Directory and find the perfect tool to experiment with.
                                    </p>
                                    <Link
                                        to="/"
                                        className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-black px-8 py-4 rounded-2xl transition-all shadow-xl shadow-yellow-500/20 active:scale-95"
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
                    <img src="https://ui-avatars.com/api/?name=Javier+AI&background=f59e0b&color=fff&size=128" alt="Javier - AI Expert" className="w-20 h-20 rounded-full flex-shrink-0" />
                    <div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Written by Javier</h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed mb-3">Javier is an AI researcher and automation expert. He actively curates the Global AI Directory, rigorously testing new LLMs, computer vision frameworks, and generative AI tools to help professionals integrate artificial intelligence into their daily workflows.</p>
                        <Link to="/about" className="text-sm font-bold text-yellow-600 dark:text-yellow-500 hover:text-yellow-500 transition-colors">Read our editorial criteria →</Link>
                    </div>
                </div>

                {/* Related Guides Section */}
                {guidesData.filter(g => g.id !== guide.id).length > 0 && (
                    <div className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-16">
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Related Guides</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {guidesData.filter(g => g.id !== guide.id).slice(0, 2).map((relatedGuide) => (
                                <Link to={`/guide/${relatedGuide.id}`} key={relatedGuide.id} className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-xl hover:border-yellow-200 transition-all">
                                    <div className="w-full md:w-2/5 h-40 md:h-auto relative overflow-hidden flex-shrink-0">
                                        <img src={relatedGuide.coverImage} alt={relatedGuide.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="p-5 flex flex-col justify-center">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-600 dark:text-yellow-500 mb-2">{relatedGuide.category}</span>
                                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-yellow-600 transition-colors line-clamp-2">{relatedGuide.title}</h4>
                                        <span className="text-sm font-bold text-slate-400 flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> {relatedGuide.readTime}</span>
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
