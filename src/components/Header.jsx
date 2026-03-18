import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, Search as SearchIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header({ searchTerm = '', onSearchChange = () => { } }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

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
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-slate-200/50 px-4 py-3 md:px-6 md:py-4 shadow-sm">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 relative">
                <div className={`flex w-full md:w-auto items-center justify-between gap-2 ${isSearchFocused ? 'hidden md:flex' : 'flex'}`}>
                    <Link to="/" className="flex items-center gap-2 cursor-pointer">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary-500 via-accent-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-accent-500/20 flex-shrink-0">
                            <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <div>
                            <h1 className="text-lg md:text-xl font-bold tracking-tight text-slate-900">AI Directory</h1>
                            <p className="text-[10px] md:text-xs text-slate-500 font-medium tracking-wide uppercase hidden sm:block">The Best Professional Tools</p>
                        </div>
                    </Link>
                    <button
                        className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none flex items-center gap-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                <nav className="hidden md:flex items-center gap-6 font-semibold text-sm text-slate-600">
                    <button onClick={() => scrollToSection('directory-section')} className="hover:text-accent-600 transition-colors">Directory</button>
                    <Link to="/blog" className="hover:text-accent-600 transition-colors">Guides & Blog</Link>
                    <button onClick={() => scrollToSection('footer-contacto')} className="hover:text-accent-600 transition-colors">Contact</button>
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
                                className="md:hidden flex flex-col w-full overflow-hidden absolute top-full left-0 bg-white/95 shadow-xl rounded-b-2xl border-t border-slate-100 z-40"
                            >
                                <div className="flex flex-col p-4 gap-2">
                                    <button onClick={() => scrollToSection('directory-section')} className="w-full text-center px-4 py-3 font-semibold text-slate-700 bg-slate-50 active:bg-slate-100 rounded-xl transition-all border border-slate-100">AI Directory</button>
                                    <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center px-4 py-3 font-semibold text-slate-700 bg-slate-50 active:bg-slate-100 rounded-xl transition-all border border-slate-100">Guides & Blog</Link>
                                    <button onClick={() => scrollToSection('footer-contacto')} className="w-full text-center px-4 py-3 font-semibold text-slate-700 bg-slate-50 active:bg-slate-100 rounded-xl transition-all border border-slate-100">Contact</button>
                                </div>
                            </motion.nav>
                        </>
                    )}
                </AnimatePresence>

                <div className="relative w-full md:w-auto md:min-w-[300px] lg:min-w-[400px] group flex items-center">
                    <button 
                        onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
                        className="w-full bg-slate-50 border border-slate-200 hover:border-accent-300 hover:shadow-sm rounded-full py-2.5 pl-4 pr-3 flex items-center justify-between transition-all group-focus-within:border-accent-500"
                    >
                        <div className="flex items-center gap-2.5">
                            <SearchIcon className="w-4 h-4 text-slate-400 group-hover:text-accent-500 transition-colors" />
                            <span className="text-sm text-slate-500">Search AI tools...</span>
                        </div>
                        <kbd className="hidden md:inline-flex items-center gap-1 font-sans text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-400 font-bold shadow-sm">
                            <span className="text-[12px] leading-none">⌘</span> K
                        </kbd>
                    </button>
                </div>
            </div>
        </header>
    );
}
