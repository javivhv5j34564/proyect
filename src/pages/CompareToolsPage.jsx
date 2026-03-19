import { useState } from 'react';
import { tools } from '../data';
import { useSEO } from '../hooks/useSEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, Check, X, Shield, Zap, TrendingUp, ExternalLink, Dices } from 'lucide-react';

export default function CompareToolsPage() {
    const [tool1Id, setTool1Id] = useState('');
    const [tool2Id, setTool2Id] = useState('');
    
    useSEO({
        title: 'Compare AI Tools | AI Directory',
        description: 'Compare two artificial intelligence tools side by side to find the perfect fit for your workflow.'
    });

    const tool1 = tools.find(t => t.id === tool1Id);
    const tool2 = tools.find(t => t.id === tool2Id);

    // Calculate Winner
    let winner = null;
    let winReason = "";
    if (tool1 && tool2) {
        let score1 = (tool1.isFullyFree ? 3 : 0) + (tool1.hasAPI ? 1 : 0);
        let score2 = (tool2.isFullyFree ? 3 : 0) + (tool2.hasAPI ? 1 : 0);
        
        // Tie breaker
        if (score1 === score2) {
            score1 += tool1.name.length;
            score2 += tool2.name.length;
        }

        if (score1 >= score2) {
            winner = tool1;
            winReason = tool1.isFullyFree && !tool2.isFullyFree 
                ? "Is 100% Free / Open Source!" 
                : "Better overall flexibility and features.";
        } else {
            winner = tool2;
            winReason = tool2.isFullyFree && !tool1.isFullyFree 
                ? "Is 100% Free / Open Source!" 
                : "Better overall flexibility and features.";
        }
    }

    const ToolSelector = ({ value, onChange, label, restrictSector }) => {
        const [search, setSearch] = useState('');
        const [isOpen, setIsOpen] = useState(false);

        const filtered = tools.filter(t => 
            (!restrictSector || t.sector === restrictSector) &&
            (t.name.toLowerCase().includes(search.toLowerCase()) || 
             t.sector.toLowerCase().includes(search.toLowerCase()))
        ).slice(0, 10);

        const selectedTool = tools.find(t => t.id === value);

        return (
            <div className="relative flex-1">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{label}</label>
                <div 
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer shadow-sm dark:shadow-none"
                >
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                        {selectedTool ? selectedTool.name : "Select an AI tool..."}
                    </span>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                </div>

                {isOpen && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 rounded-xl shadow-xl z-50 overflow-hidden">
                        <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                            <div className="relative">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type="text" 
                                    autoFocus
                                    placeholder="Search..." 
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm focus:outline-none"
                                />
                            </div>
                        </div>
                        <div className="max-h-60 overflow-y-auto">
                            {filtered.map(t => (
                                <div 
                                    key={t.id}
                                    onClick={() => { onChange(t.id); setIsOpen(false); setSearch(''); }}
                                    className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer flex items-center gap-3 transition-colors"
                                >
                                    <span className="text-xl">{t.emoji || '🤖'}</span>
                                    <div>
                                        <div className="font-bold text-sm text-slate-900 dark:text-white">{t.name}</div>
                                        <div className="text-[10px] text-slate-500 uppercase">{t.sector}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="min-h-[80vh] bg-slate-50 dark:bg-slate-950 py-10 md:py-16 px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10 md:mb-16">
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">⚔️ Compare AI Tools</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Not sure which AI is best for you? Select two tools from our directory below and compare their features, pricing, and use cases side by side.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-10">
                    <ToolSelector value={tool1Id} onChange={(id) => { setTool1Id(id); setTool2Id(''); }} label="First Tool" />
                    <div className="hidden md:flex items-end pb-3 px-4 text-slate-400 font-bold italic">VS</div>
                    <ToolSelector 
                        value={tool2Id} 
                        onChange={setTool2Id} 
                        label="Second Tool (Same Category)" 
                        restrictSector={tool1 ? tool1.sector : null} 
                    />
                </div>

                {(tool1 && tool2) ? (
                    <div className="space-y-6">
                        {/* Winner Section */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                            className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 p-1 rounded-3xl"
                        >
                            <div className="bg-white dark:bg-slate-900 rounded-[22px] p-6 md:p-8 text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 dark:bg-yellow-400/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
                                <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-2">
                                    🏆 Recommended Winner: <span className="text-amber-500">{winner.name}</span>
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 font-medium">
                                    {winReason}
                                </p>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-700/80 overflow-hidden"
                        >
                        <div className="grid grid-cols-2 divide-x divide-slate-200 dark:divide-slate-700/80">
                            {/* Headers */}
                            {[tool1, tool2].map(t => (
                                <div key={t.id} className="p-6 md:p-8 text-center bg-slate-50/50 dark:bg-slate-900">
                                    <div className="w-16 h-16 md:w-24 md:h-24 mx-auto rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-4xl md:text-5xl mb-4 shadow-sm dark:shadow-none">
                                        {t.emoji || '🤖'}
                                    </div>
                                    <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{t.name}</h2>
                                    <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-xs font-bold uppercase tracking-wide">
                                        {t.sector}
                                    </span>
                                </div>
                            ))}

                            {/* Pricing Row */}
                            {[tool1, tool2].map(t => (
                                <div key={t.id + '-price'} className="p-6 border-t border-slate-200 dark:border-slate-700/80">
                                    <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
                                        <Zap className="w-4 h-4 text-amber-500" /> Pricing Model
                                    </div>
                                    <p className={`font-bold text-lg ${t.isFullyFree ? 'text-green-600 dark:text-green-400' : 'text-slate-800 dark:text-slate-200'}`}>
                                        {t.freeTierDetails}
                                    </p>
                                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                        {t.isFullyFree ? <Check className="w-4 h-4 text-green-500" /> : <Shield className="w-4 h-4 text-amber-500" />}
                                        {t.isFullyFree ? '100% Free / Open Source' : 'Paid plans available'}
                                    </div>
                                </div>
                            ))}

                            {/* Description Row */}
                            {[tool1, tool2].map(t => (
                                <div key={t.id + '-desc'} className="p-6 border-t border-slate-200 dark:border-slate-700/80">
                                    <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4 text-primary-500" /> Core Focus
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                        {t.description}
                                    </p>
                                </div>
                            ))}

                            {/* Actions Row */}
                            {[tool1, tool2].map(t => (
                                <div key={t.id + '-action'} className="p-6 text-center border-t border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-900/50">
                                    <div className="flex flex-col gap-3">
                                        <a href={t.url} target="_blank" rel="noopener noreferrer" className="bg-slate-900 hover:bg-accent-600 dark:bg-accent-600 dark:hover:bg-accent-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2">
                                            Visit Website <ExternalLink className="w-4 h-4" />
                                        </a>
                                        <Link to={`/tool/${t.id}`} className="text-sm font-semibold text-slate-500 hover:text-accent-600 transition-colors">
                                            Read full review
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-slate-100 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700/80">
                        <Dices className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-500 dark:text-slate-400">Select two tools above to begin</h3>
                    </div>
                )}
            </div>
        </div>
    );
}
