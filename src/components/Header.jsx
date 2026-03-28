import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, Menu, X, Search as SearchIcon, Dices, PlusCircle, ArrowLeftRight, Lightbulb, Target, ShieldAlert, Layers, FolderTree, MessageSquare, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { tools } from '../data';
import ThemeToggle from './ThemeToggle';

export default function Header({ searchTerm = '', onSearchChange = () => { } }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === '/';

    const handleSurpriseMe = () => {
        navigate('/surprise');
    };

    const scrollToSection = (id) => {
        setIsMobileMenuOpen(false);
        if (!isHome) {
            window.location.href = '/#' + id;
            return;
        }

        setTimeout(() => {
            if (id === 'top') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            const element = document.getElementById(id);
            if (element) {
                const offset = 80;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = element.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 150);
    };

    return (
        <header className="sticky top-0 z-40 bg-white dark:bg-slate-900/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700/80/50 px-4 py-3 md:px-6 md:py-4 shadow-sm dark:shadow-none">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 relative">
                <div className={`flex w-full md:w-auto items-center justify-between gap-2 ${isSearchFocused ? 'hidden md:flex' : 'flex'}`}>
                    <Link to="/" className="flex items-center gap-2 cursor-pointer">
                        <img 
                            src="/logo.png" 
                            alt="AI Directory Logo" 
                            className="w-8 h-8 md:w-10 md:h-10 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700/80 flex-shrink-0 object-cover"
                        />
                        <div>
                            <h1 className="text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white">AI Directory</h1>
                            <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide uppercase hidden sm:block">The Best Professional Tools</p>
                        </div>
                    </Link>
                    <button
                        className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors focus:outline-none flex items-center gap-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                <nav className="hidden md:flex items-center gap-6 font-semibold text-sm text-slate-600 dark:text-slate-400">
                    <button onClick={() => scrollToSection('directory-section')} className="hover:text-accent-600 transition-colors">Directory</button>
                    
                    <div className="relative group">
                        <button className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-purple-500" /> Discover ✨</button>
                        <div className="absolute top-full left-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl flex flex-col overflow-hidden">
                                <Link to="/compare" className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-300"><ArrowLeftRight className="w-4 h-4 text-blue-500"/> Industry Matrix</Link>
                                <Link to="/matchmaker" className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-300"><Target className="w-4 h-4 text-rose-500"/> AI Matchmaker</Link>
                                <Link to="/automation-risk" className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-300"><ShieldAlert className="w-4 h-4 text-amber-500"/> Risk Calculator</Link>
                                <Link to="/stack-builder" className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-300"><Layers className="w-4 h-4 text-indigo-500"/> Workflow Builder</Link>
                                <Link to="/viral" className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-300"><TrendingUp className="w-4 h-4 text-orange-500"/> Viral AI</Link>
                            </div>
                        </div>
                    </div>

                    <Link to="/prompts" className="hover:text-emerald-500 transition-colors flex items-center gap-1"><MessageSquare className="w-4 h-4 text-emerald-500"/> Prompts</Link>
                    <Link to="/guides" className="hover:text-yellow-500 transition-colors flex items-center gap-1"><Lightbulb className="w-4 h-4 text-yellow-500"/> Guides</Link>
                    <Link to="/blog" className="hover:text-accent-600 transition-colors">Blog</Link>
                    <Link to="/submit-tool" className="hover:text-accent-600 transition-colors flex items-center gap-1"><PlusCircle className="w-4 h-4"/> Submit AI</Link>
                </nav>

                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="md:hidden absolute top-full left-0 w-full h-screen bg-slate-900/60 backdrop-blur-sm z-30"
                            />
                            <motion.nav
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="md:hidden flex flex-col w-full overflow-hidden absolute top-full left-0 bg-white dark:bg-slate-900/95 shadow-xl rounded-b-2xl border-t border-slate-100 dark:border-slate-800 z-40 max-h-[80vh] overflow-y-auto"
                            >
                                <div className="flex flex-col p-4 gap-2">
                                    <button onClick={() => scrollToSection('directory-section')} className="w-full text-center px-4 py-3 font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 active:bg-slate-100 dark:bg-slate-800 rounded-xl transition-all border border-slate-100 dark:border-slate-800">AI Directory</button>
                                    
                                    <div className="w-full rounded-xl border border-purple-100 dark:border-purple-900/50 bg-purple-50/50 dark:bg-purple-900/10 p-2 space-y-2">
                                        <div className="text-xs font-bold text-purple-600 dark:text-purple-400 text-center uppercase tracking-wider mb-2 pt-2">Premium Tools</div>
                                        <Link to="/compare" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center px-4 py-2 font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center gap-2 border border-slate-100 dark:border-slate-800"><ArrowLeftRight className="w-4 h-4 text-blue-500"/> Industry Matrix</Link>
                                        <Link to="/matchmaker" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center px-4 py-2 font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center gap-2 border border-slate-100 dark:border-slate-800"><Target className="w-4 h-4 text-rose-500"/> AI Matchmaker</Link>
                                        <Link to="/automation-risk" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center px-4 py-2 font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center gap-2 border border-slate-100 dark:border-slate-800"><ShieldAlert className="w-4 h-4 text-amber-500"/> Risk Calculator</Link>
                                        <Link to="/stack-builder" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center px-4 py-2 font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center gap-2 border border-slate-100 dark:border-slate-800"><Layers className="w-4 h-4 text-indigo-500"/> Workflow Builder</Link>
                                        <Link to="/viral" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center px-4 py-2 font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center gap-2 border border-slate-100 dark:border-slate-800"><TrendingUp className="w-4 h-4 text-orange-500"/> Viral AI</Link>
                                    </div>

                                    <Link to="/prompts" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center px-4 py-3 font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 active:bg-slate-100 dark:bg-slate-800 rounded-xl transition-all border border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-500"><MessageSquare className="w-4 h-4"/> AI Prompts</Link>
                                    <Link to="/guides" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center px-4 py-3 font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 active:bg-slate-100 dark:bg-slate-800 rounded-xl transition-all border border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2 text-yellow-600 dark:text-yellow-500"><Lightbulb className="w-4 h-4"/> AI Guides</Link>
                                    <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center px-4 py-3 font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 active:bg-slate-100 dark:bg-slate-800 rounded-xl transition-all border border-slate-100 dark:border-slate-800">Blog</Link>
                                    <Link to="/submit-tool" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center px-4 py-3 font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950 active:bg-slate-100 dark:bg-slate-800 rounded-xl transition-all border border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2"><PlusCircle className="w-4 h-4"/> Submit AI</Link>
                                </div>
                            </motion.nav>
                        </>
                    )}
                </AnimatePresence>

                <div className="relative w-full md:w-auto md:min-w-[300px] lg:min-w-[400px] group flex items-center gap-3">
                    <button 
                        onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700/80 hover:border-accent-300 hover:shadow-sm dark:shadow-none rounded-full py-2.5 pl-4 pr-3 flex items-center justify-between transition-all group-focus-within:border-accent-500"
                    >
                        <div className="flex items-center gap-2.5">
                            <SearchIcon className="w-4 h-4 text-slate-400 group-hover:text-accent-500 transition-colors" />
                            <span className="text-sm text-slate-500 dark:text-slate-400">Search AI tools...</span>
                        </div>
                        <kbd className="hidden md:inline-flex items-center gap-1 font-sans text-[10px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 px-1.5 py-0.5 rounded text-slate-400 font-bold shadow-sm dark:shadow-none">
                            <span className="text-[12px] leading-none">⌘</span> K
                        </kbd>
                    </button>
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <button 
                            onClick={handleSurpriseMe} 
                            className="bg-accent-100 dark:bg-accent-900/40 hover:bg-accent-200 dark:hover:bg-accent-900/60 text-accent-600 dark:text-accent-400 p-2.5 rounded-full transition-colors flex items-center justify-center border border-accent-200 dark:border-accent-800/60 shadow-sm dark:shadow-none"
                            title="Surprise me with a random tool!"
                        >
                            <Dices className="w-4 h-4" />
                        </button>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
}
