import { useParams, Link } from 'react-router-dom';
import { tools, categories } from '../data';
import { useSEO } from '../hooks/useSEO';
import { ArrowLeft, Sparkles, Zap, ChevronRight, Bookmark, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';

export default function CategoryPage() {
    const { categoryId } = useParams();
    
    // Unslugify categoryId to match sector in data.js
    const sectorName = useMemo(() => {
        return categories.find(c => c.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') === categoryId) || categoryId;
    }, [categoryId]);

    const categoryTools = useMemo(() => {
        return tools.filter(t => t.sector === sectorName);
    }, [sectorName]);

    useSEO({
        title: `${sectorName} AI Tools | AI Directory`,
        description: `Explore the best free and freemium Artificial Intelligence tools for ${sectorName}. Compare features and boost your workflow.`
    });

    // Mock states for upvotes and bookmarks to keep cards functional visually
    const [bookmarks, setBookmarks] = useState(() => {
        const saved = localStorage.getItem('ai_bookmarks');
        return saved ? JSON.parse(saved) : [];
    });
    
    const [userUpvoted, setUserUpvoted] = useState(() => {
        const saved = localStorage.getItem('ai_user_upvotes');
        return saved ? JSON.parse(saved) : [];
    });

    const toggleBookmark = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        const newBookmarks = bookmarks.includes(id) ? bookmarks.filter(b => b !== id) : [...bookmarks, id];
        setBookmarks(newBookmarks);
        localStorage.setItem('ai_bookmarks', JSON.stringify(newBookmarks));
    };

    const handleUpvote = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        const newUpvoted = userUpvoted.includes(id) ? userUpvoted.filter(u => u !== id) : [...userUpvoted, id];
        setUserUpvoted(newUpvoted);
        localStorage.setItem('ai_user_upvotes', JSON.stringify(newUpvoted));
    };

    if (categoryTools.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-3xl font-bold mb-4">Category not found</h1>
                <Link to="/" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-accent-600 transition-colors">
                    Back to Directory
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
                <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-400 mb-8 overflow-x-auto no-scrollbar whitespace-nowrap">
                    <Link to="/" className="hover:text-accent-600 transition-colors">Home</Link>
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                    <span className="text-slate-600 font-bold">Categories</span>
                    <ChevronRight className="w-3 h-3 flex-shrink-0" />
                    <span className="text-slate-900 font-bold">{sectorName}</span>
                </nav>

                <div className="mb-10">
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 flex items-center gap-3">
                        {sectorName} Tools
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl">
                        Discover {categoryTools.length} powerful AI tools specially curated for {sectorName.toLowerCase()}. Filter out the noise and find exactly what you need.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryTools.map(tool => (
                        <div key={tool.id} className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-accent-300 shadow-sm hover:shadow-xl hover:shadow-accent-500/10 transition-all flex flex-col h-full relative cursor-pointer">
                            <button
                                onClick={(e) => toggleBookmark(e, tool.id)}
                                className="absolute top-5 right-5 z-20 p-2 rounded-full bg-slate-50 hover:bg-white border border-slate-200 text-slate-400 hover:text-accent-500 transition-all"
                            >
                                <Bookmark className={`w-4 h-4 ${bookmarks.includes(tool.id) ? 'fill-accent-500 text-accent-500' : ''}`} />
                            </button>

                            <div className="flex justify-between items-start mb-4">
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-100 text-3xl group-hover:scale-105 transition-transform">
                                    {tool.emoji || '🤖'}
                                </div>
                            </div>

                            <div className="mb-2">
                                <span className="inline-flex text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase tracking-wider mb-2">
                                    {tool.sector}
                                </span>
                                <Link to={`/tool/${tool.id}`} className="block">
                                    <h3 className="text-xl font-bold group-hover:text-accent-600 transition-colors text-slate-900 leading-tight pr-8">{tool.name}</h3>
                                </Link>
                            </div>

                            <p className="text-slate-600 text-sm leading-relaxed mb-5 flex-grow line-clamp-3">
                                {tool.description}
                            </p>

                            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                                <button
                                    onClick={(e) => handleUpvote(e, tool.id)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm font-bold transition-all ${userUpvoted.includes(tool.id) ? 'bg-accent-500 border-accent-500 text-white' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                >
                                    <ChevronUp className="w-4 h-4" />
                                    Like
                                </button>
                                <div className="flex items-center gap-1.5">
                                    <Zap className={`w-4 h-4 ${tool.isFullyFree ? 'text-green-500' : 'text-amber-500'}`} />
                                    <span className={`text-xs font-semibold ${tool.isFullyFree ? 'text-green-600' : 'text-amber-600'}`}>
                                        {tool.freeTierDetails}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
