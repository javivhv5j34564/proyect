import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { tools, blogPosts } from '../data';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Zap, ChevronRight, X } from 'lucide-react';

export default function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((open) => !open);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };
        
        const handleOpenEvent = () => setIsOpen(true);

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('open-command-palette', handleOpenEvent);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('open-command-palette', handleOpenEvent);
        };
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
            setQuery(''); // Reset query when opening
        }
    }, [isOpen]);

    // Format query
    const searchString = query.toLowerCase().trim();

    // Search tools
    const matchedTools = searchString === '' ? [] : tools.filter(t => 
        t.name.toLowerCase().includes(searchString) || 
        t.sector.toLowerCase().includes(searchString) ||
        t.description.toLowerCase().includes(searchString)
    ).slice(0, 5);

    // Search blog posts
    const matchedBlogs = searchString === '' ? [] : blogPosts.filter(b => 
        b.title.toLowerCase().includes(searchString) || 
        b.category.toLowerCase().includes(searchString)
    ).slice(0, 3);
    
    // Default recommendations when typing nothing
    const defaultTools = tools.slice(0, 4);

    const handleSelectPath = (path) => {
        setIsOpen(false);
        setQuery('');
        navigate(path);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100]" 
                    />
                    <div className="fixed inset-0 z-[101] flex items-start justify-center pt-[10vh] sm:pt-[15vh] px-4 sm:px-0 pointer-events-none">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_30px_60px_-15px_rgba(217,70,239,0.2)] overflow-hidden w-full max-w-2xl border border-white/60 dark:border-slate-700/80 pointer-events-auto"
                        >
                            <div className="flex items-center px-4 py-4 border-b border-slate-100 dark:border-slate-800 relative">
                                <Search className="w-5 h-5 text-accent-500 absolute left-6" />
                                <input 
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search APIs, tools, articles..."
                                    autoFocus
                                    className="w-full pl-10 pr-4 py-2 bg-transparent text-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                                />
                                <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700/80 ml-2 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            
                            <div className="max-h-[60vh] overflow-y-auto p-4 bg-slate-50/50 dark:bg-slate-950/40 hidden-scrollbar">
                                {searchString === '' ? (
                                    <div>
                                        <h3 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider px-2">Popular Tools</h3>
                                        <div className="space-y-1.5">
                                            {defaultTools.map(t => (
                                                <button key={t.id} onClick={() => handleSelectPath(`/tool/${t.id}`)} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-700/80 hover:shadow-md dark:hover:shadow-[0_4px_20px_rgba(217,70,239,0.1)] transition-all focus:outline-none text-left">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm dark:shadow-none flex items-center justify-center text-xl">{t.emoji || '🤖'}</div>
                                                        <span className="font-bold text-slate-800 dark:text-slate-100">{t.name}</span>
                                                    </div>
                                                    <span className="text-[10px] font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hidden sm:block">{t.sector}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {matchedTools.length > 0 && (
                                            <div>
                                                <h3 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider px-2 flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> AI Tools</h3>
                                                <div className="space-y-1.5">
                                                    {matchedTools.map(t => (
                                                        <button key={t.id} onClick={() => handleSelectPath(`/tool/${t.id}`)} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-700/80 hover:shadow-md dark:hover:shadow-[0_4px_20px_rgba(217,70,239,0.1)] transition-all focus:outline-none text-left">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm dark:shadow-none flex items-center justify-center text-xl flex-shrink-0">{t.emoji || '🤖'}</div>
                                                                <div className="w-full">
                                                                    <div className="font-bold text-slate-800 dark:text-slate-100 flex items-center justify-between w-full">
                                                                        {t.name}
                                                                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 ml-2 hidden sm:block">{t.sector}</span>
                                                                    </div>
                                                                    <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{t.description}</div>
                                                                </div>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {matchedBlogs.length > 0 && (
                                            <div>
                                                <h3 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider px-2 flex items-center gap-1.5"><FileText className="w-3.5 h-3.5" /> Articles & Guides</h3>
                                                <div className="space-y-1.5">
                                                    {matchedBlogs.map(b => (
                                                        <button key={b.id} onClick={() => handleSelectPath(`/blog/${b.id}`)} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-700/80 hover:shadow-md dark:hover:shadow-[0_4px_20px_rgba(217,70,239,0.1)] transition-all focus:outline-none text-left">
                                                            <div className="flex items-center gap-3 w-full">
                                                                <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-accent-50 border border-accent-100 shadow-sm dark:shadow-none flex items-center justify-center text-accent-500"><FileText className="w-4 h-4" /></div>
                                                                 <div className="overflow-hidden w-full">
                                                                    <div className="font-bold text-slate-800 dark:text-slate-100 line-clamp-1">{b.title}</div>
                                                                    <div className="text-[10px] font-bold text-slate-400 mt-0.5">{b.category}</div>
                                                                </div>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        
                                        {matchedTools.length === 0 && matchedBlogs.length === 0 && (
                                            <div className="text-center py-10 px-4">
                                                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3">
                                                    <Search className="w-6 h-6 text-slate-400" />
                                                </div>
                                                <p className="font-bold text-slate-800 dark:text-slate-100">No results found for "{query}"</p>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Try searching for keywords like "video", "writing", or "Claude".</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="bg-slate-100 dark:bg-slate-800/50 px-4 py-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] sm:text-xs text-slate-400 font-medium hidden sm:flex">
                                <span className="flex items-center gap-1"><kbd className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 px-1.5 py-0.5 rounded shadow-sm dark:shadow-none text-slate-600 dark:text-slate-400 font-sans font-bold text-[10px]">Esc</kbd> to close</span>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
