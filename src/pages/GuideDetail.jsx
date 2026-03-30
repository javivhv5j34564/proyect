import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Sparkles, ChevronRight } from 'lucide-react';
import { guidesData } from '../guidesData';
import { useSEO } from '../hooks/useSEO';
import { useEffect, useState } from 'react';

const InteractiveQuiz = ({ category }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const getQuizData = () => {
        if (category === "Productivity") {
            return { question: "What is the primary benefit of RAG (Retrieval-Augmented Generation)?", options: ["It draws vector art", "It allows AI to search your private documents safely", "It creates new LLMs from scratch", "It speeds up local internet connections"], correctIndex: 1, explanation: "RAG grounds the AI in your specific data, eliminating hallucinations and keeping data private." };
        } else if (category === "Creative & Design") {
            return { question: "What does ControlNet do in Stable Diffusion?", options: ["It writes better prompts", "It generates free royalty-free music", "It forces the AI to respect exact structural lines and architectural boundaries", "It edits video automatically"], correctIndex: 2, explanation: "ControlNet allows for precise spatial control, like locking in the dimensions and walls of a real living room." };
        } else if (category === "Coding & Dev") {
            return { question: "What differentiates an AutoGPT 'Agent' from standard ChatGPT?", options: ["It speaks more natural languages natively", "It can execute multi-step tasks autonomously and browse the web without manual prompting", "It runs entirely offline without an API", "It has a better dark-mode UI"], correctIndex: 1, explanation: "Agents don't just answer questions; they set sub-goals, interact with tools, and act autonomously." };
        } else {
             return { question: "Which psychological technique significantly improves AI retention hooks?", options: ["Saying 'Hello guys, welcome back'", "Opening a 'curiosity gap' while introducing a high stakes conflict", "Using extreme clickbait with no payoff", "Rambling for 30 seconds before the point"], correctIndex: 1, explanation: "A viral hook validates the title, introduces conflict, and opens a curiosity gap in the first 5 seconds." };
        }
    }
    
    const data = getQuizData();

    return (
        <div className="mt-16 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-100 dark:border-indigo-800/50 rounded-[2.5rem] p-8 md:p-12 shadow-inner group transition-all duration-500 hover:shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 dark:bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3 relative z-10">
                <span className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white w-10 h-10 rounded-2xl flex items-center justify-center text-lg shadow-lg">?</span>
                Interactive Knowledge Check
            </h3>
            <p className="font-medium text-slate-700 dark:text-slate-300 text-xl md:text-2xl mb-8 leading-relaxed relative z-10">{data.question}</p>
            <div className="space-y-4 relative z-10">
                {data.options.map((option, idx) => (
                    <button 
                        key={idx}
                        onClick={() => !isSubmitted && setSelectedAnswer(idx)}
                        className={`w-full text-left px-6 py-5 rounded-2xl font-bold border-2 transition-all duration-300 transform ${isSubmitted && idx === data.correctIndex ? 'bg-green-100 border-green-500 text-green-900 dark:bg-green-900/40 dark:border-green-500 dark:text-green-100 shadow-md scale-[1.02]' : isSubmitted && selectedAnswer === idx ? 'bg-red-100 border-red-500 text-red-900 dark:bg-red-900/40 dark:border-red-500 dark:text-red-100' : selectedAnswer === idx ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/50 text-indigo-900 dark:text-indigo-100 scale-[1.02] shadow-md' : 'border-white dark:border-slate-800/80 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:border-indigo-300 dark:hover:border-indigo-600 shadow-sm hover:shadow-md'}`}
                    >
                        <div className="flex items-center gap-4">
                            <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 ${isSubmitted && idx === data.correctIndex ? 'border-green-500 bg-green-500 text-white' : isSubmitted && selectedAnswer === idx ? 'border-red-500 bg-red-500 text-white' : selectedAnswer === idx ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-slate-300 dark:border-slate-600'}`}>
                                {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="text-lg">{option}</span>
                        </div>
                    </button>
                ))}
            </div>
            {!isSubmitted ? (
                <button 
                    onClick={() => setIsSubmitted(true)}
                    disabled={selectedAnswer === null}
                    className="mt-8 relative z-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-indigo-600 dark:hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-slate-900 font-black px-10 py-4 md:py-5 rounded-2xl shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 w-full md:w-auto text-lg hover:-translate-y-1"
                >
                    Submit Answer
                </button>
            ) : (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mt-10 p-8 rounded-[2rem] relative z-10 ${selectedAnswer === data.correctIndex ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800/50 text-green-900 dark:text-green-100' : 'bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800/50 text-orange-900 dark:text-orange-100'}`}>
                    <p className="mb-3 text-2xl font-black flex items-center gap-2">
                        {selectedAnswer === data.correctIndex ? '🎯 Flawless Victory!' : '🤔 Not quite...'}
                    </p>
                    <p className="text-lg leading-relaxed font-medium opacity-90">{data.explanation}</p>
                </motion.div>
            )}
        </div>
    );
};

export default function GuideDetail() {
    const { id } = useParams();
    const guide = guidesData.find(g => g.id === id);

    useSEO({
        title: guide ? `${guide.title} | 2024 Ultimate AI Guide` : 'Guide Not Found',
        description: guide ? `${guide.excerpt} Discover the best AI strategies and step-by-step tutorials.` : 'The requested guide was not found.',
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
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-8 pb-20 relative overflow-hidden">
            {/* Background Layers */}
            <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-100/[0.03] bg-[length:32px_32px] pointer-events-none" />
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-400/20 dark:bg-yellow-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-80 left-10 w-80 h-80 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-500 mb-8 overflow-x-auto no-scrollbar whitespace-nowrap px-1 py-2 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md w-fit rounded-full pl-4 pr-6 border border-slate-200 dark:border-slate-800">
                    <Link to="/" className="hover:text-yellow-600 font-bold transition-colors flex items-center gap-1">Home</Link>
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                    <Link to="/guides" className="text-slate-600 dark:text-slate-400 font-bold hover:text-yellow-600 transition-colors">Guides</Link>
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                    <span className="text-yellow-600 dark:text-yellow-500 font-bold truncate max-w-[200px]">{guide.title}</span>
                </nav>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Link
                        to="/guides"
                        className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 px-6 py-3 rounded-2xl shadow-sm dark:shadow-none hover:shadow-md mb-10 active:scale-95 group/btn"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
                        Back to Guides
                    </Link>

                    <article className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-3xl rounded-[3rem] border border-slate-200/80 dark:border-slate-700/50 shadow-2xl shadow-slate-200/40 dark:shadow-none overflow-hidden relative">
                        {/* Header Image */}
                        <div className="relative h-[300px] md:h-[500px] w-full p-3 md:p-6 pb-0">
                            <div className="w-full h-full rounded-[2rem] overflow-hidden relative shadow-lg">
                                <img
                                    src={guide.coverImage}
                                    alt={guide.title}
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80";
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                                <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12 md:right-12">
                                    <span className="inline-block px-4 py-2 rounded-full bg-yellow-500 text-slate-900 text-xs font-black uppercase tracking-widest mb-4 shadow-lg shadow-yellow-500/30">
                                        {guide.category}
                                    </span>
                                    <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-md">
                                        {guide.title}
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
                                    <span>{guide.date}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                                        <Clock className="w-5 h-5 text-yellow-500" />
                                    </div>
                                    <span className="text-yellow-600 dark:text-yellow-500">{guide.readTime}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="prose prose-slate prose-lg md:prose-xl dark:prose-invert max-w-none">
                                <p className="text-xl md:text-3xl font-medium text-slate-700 dark:text-slate-300 leading-pristine italic border-l-4 border-yellow-400 pl-8 mb-12">
                                    {guide.excerpt}
                                </p>

                                {/* Table of Contents */}
                                {generateTOC(guide.content).length > 0 && (
                                    <div className="bg-slate-50/50 dark:bg-slate-800/30 rounded-3xl p-8 mb-12 border border-slate-100 dark:border-slate-800/50 backdrop-blur-sm shadow-sm">
                                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                            <span className="bg-yellow-500 w-2 h-6 rounded-full inline-block"></span>
                                            Table of Contents
                                        </h3>
                                        <ul className="space-y-3 m-0 p-0 list-none">
                                            {generateTOC(guide.content).map((h, i) => (
                                                <li key={i} className={h.level === 3 ? "ml-6" : "ml-0"}>
                                                    <a href={`#${h.id}`} className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors font-bold text-base md:text-lg no-underline group/link">
                                                        <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover/link:text-yellow-500 transition-colors" />
                                                        {h.text}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="text-slate-600 dark:text-slate-300 leading-relaxed md:leading-[1.8] space-y-6" dangerouslySetInnerHTML={{ __html: guide.content.replace(/\\n/g, '<br />').replace(/> "(.*?)"/g, '<blockquote class="border-l-4 border-yellow-500 pl-6 py-4 italic bg-yellow-50/50 dark:bg-yellow-500/5 my-8 text-slate-700 dark:text-slate-300 rounded-r-2xl font-medium shadow-sm">"$1"</blockquote>').replace(/^##\s+(.*?)$/gm, (match, p1) => `<h2 id="${p1.toLowerCase().replace(/[^a-z0-9]+/g, '-')}" class="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mt-16 mb-8 scroll-mt-24 tracking-tight"><span class="text-yellow-500 mr-2">#</span>${p1}</h2>`).replace(/^###\s+(.*?)$/gm, (match, p1) => `<h3 id="${p1.toLowerCase().replace(/[^a-z0-9]+/g, '-')}" class="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-10 mb-6 scroll-mt-24">${p1}</h3>`) }} />

                                <InteractiveQuiz category={guide.category} />

                                <div className="mt-20 p-8 md:p-12 bg-slate-900 rounded-[3rem] text-white relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent pointer-events-none" />
                                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 group-hover:rotate-12 transition-all duration-1000 ease-out">
                                        <Sparkles className="w-40 h-40 text-yellow-400" />
                                    </div>
                                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
                                        <div>
                                            <h3 className="text-3xl font-black mb-4">Mastered this guide?</h3>
                                            <p className="text-slate-400 text-lg max-w-lg leading-relaxed mb-0">
                                                Put your new skills to the test. Browse our AI Directory and find the perfect tool to experiment with.
                                            </p>
                                        </div>
                                        <Link
                                            to="/"
                                            className="inline-flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-black px-8 py-5 rounded-2xl md:rounded-3xl transition-all shadow-xl shadow-yellow-500/20 active:scale-95 whitespace-nowrap"
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
                            <img src="https://ui-avatars.com/api/?name=Editorial+Team&background=f59e0b&color=fff&size=128" alt="Editorial Team" className="w-24 h-24 rounded-full flex-shrink-0 shadow-lg border-4 border-white dark:border-slate-800" />
                            <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white dark:border-slate-900"></div>
                        </div>
                        <div>
                            <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Written by the Editorial Team</h4>
                            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed mb-4">Our team of AI researchers and automation experts actively curates the Global AI Directory, rigorously testing new LLMs, computer vision frameworks, and generative AI tools to help professionals integrate artificial intelligence into their daily workflows.</p>
                            <Link to="/about" className="inline-flex items-center gap-2 text-sm font-black text-yellow-600 dark:text-yellow-500 hover:text-yellow-700 transition-colors uppercase tracking-wider">Read our editorial criteria <ChevronRight className="w-4 h-4" /></Link>
                        </div>
                    </div>

                    {/* Related Guides Section */}
                    {guidesData.filter(g => g.id !== guide.id).length > 0 && (
                        <div className="mt-16 pt-16">
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-10 flex items-center gap-3">
                                <Sparkles className="w-8 h-8 text-yellow-500" />
                                Continue Learning
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {guidesData.filter(g => g.id !== guide.id).slice(0, 2).map((relatedGuide) => (
                                    <Link to={`/guide/${relatedGuide.id}`} key={relatedGuide.id} className="group bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-[2rem] border border-slate-200/80 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-2xl hover:border-yellow-300 dark:hover:border-yellow-500/50 transition-all duration-300">
                                        <div className="w-full md:w-2/5 h-48 md:h-auto relative overflow-hidden flex-shrink-0 m-2 rounded-[1.5rem]">
                                            <img 
                                                src={relatedGuide.coverImage} 
                                                alt={relatedGuide.title} 
                                                className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-2 transition-transform duration-700" 
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80";
                                                }}
                                            />
                                        </div>
                                        <div className="p-6 md:p-8 flex flex-col justify-center flex-grow">
                                            <span className="text-xs font-black uppercase tracking-widest text-yellow-600 dark:text-yellow-500 mb-3">{relatedGuide.category}</span>
                                            <h4 className="text-xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-yellow-600 dark:group-hover:text-yellow-500 transition-colors line-clamp-2 leading-tight">{relatedGuide.title}</h4>
                                            <span className="text-sm font-bold text-slate-400 flex items-center gap-2"><Clock className="w-4 h-4 text-yellow-500"/> {relatedGuide.readTime}</span>
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
