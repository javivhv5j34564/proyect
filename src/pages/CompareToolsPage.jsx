import { useState } from 'react';
import { tools } from '../data';
import { useSEO } from '../hooks/useSEO';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, Check, Shield, Zap, TrendingUp, ExternalLink, Dices, FolderTree } from 'lucide-react';

export default function CompareToolsPage() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    useSEO({
        title: 'Comparar IAs por Categoría | Directorio de IA',
        description: 'Compara múltiples herramientas de inteligencia artificial en cualquier categoría para encontrar la perfecta para tu flujo de trabajo.'
    });

    const categories = [...new Set(tools.map(t => t.sector))].sort();
    
    const toolsToCompare = selectedCategory 
        ? tools.filter(t => t.sector === selectedCategory) 
        : [];

    return (
        <div className="min-h-[80vh] bg-slate-50 dark:bg-slate-950 py-10 md:py-16 px-4 md:px-6">
            <div className="max-w-[95vw] 2xl:max-w-7xl mx-auto">
                <div className="text-center mb-10 md:mb-16">
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">⚔️ Comparador Global de IAs</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Selecciona una categoría (nodo) en el desplegable inferior para comparar simultáneamente todas las inteligencias artificiales de ese sector.
                    </p>
                </div>

                {/* Category Selector */}
                <div className="max-w-md mx-auto mb-10 relative">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 text-center">Selecciona un Nodo / Categoría</label>
                    <div 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200 hover:border-accent-500 dark:border-slate-800 dark:hover:border-accent-500 rounded-2xl px-5 py-4 flex items-center justify-between cursor-pointer shadow-sm transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <FolderTree className="w-5 h-5 text-accent-500" />
                            <span className="font-bold text-slate-800 dark:text-slate-200">
                                {selectedCategory || "Elige una categoría..."}
                            </span>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>

                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 overflow-hidden max-h-80 overflow-y-auto">
                            <div 
                                onClick={() => { setSelectedCategory(''); setIsDropdownOpen(false); }}
                                className="px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer font-medium text-slate-500 transition-colors border-b border-slate-100 dark:border-slate-800"
                            >
                                Limpiar selección
                            </div>
                            {categories.map(cat => (
                                <div 
                                    key={cat}
                                    onClick={() => { setSelectedCategory(cat); setIsDropdownOpen(false); }}
                                    className="px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer flex items-center gap-3 transition-colors text-slate-700 dark:text-slate-300 font-bold"
                                >
                                    {cat}
                                    <span className="ml-auto text-xs font-normal text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                                        {tools.filter(t => t.sector === cat).length} IAs
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {toolsToCompare.length > 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden relative"
                    >
                        {/* Horizontal Scroll Container */}
                        <div className="overflow-x-auto pb-4" style={{scrollbarWidth: 'thin'}}>
                            <div className="flex min-w-max">
                                {toolsToCompare.map((t, index) => (
                                    <div 
                                        key={t.id} 
                                        className={`w-80 flex-shrink-0 flex flex-col ${index !== toolsToCompare.length - 1 ? 'border-r border-slate-200 dark:border-slate-800' : ''}`}
                                    >
                                        {/* Header */}
                                        <div className="p-6 md:p-8 text-center bg-slate-50/50 dark:bg-slate-900 flex-1 border-b border-slate-200 dark:border-slate-800">
                                            <div className="w-16 h-16 md:w-24 md:h-24 mx-auto rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-4xl md:text-5xl mb-4 shadow-sm">
                                                {t.emoji || '🤖'}
                                            </div>
                                            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">{t.name}</h2>
                                            <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-xs font-bold uppercase tracking-wide">
                                                {t.sector}
                                            </span>
                                        </div>

                                        {/* Pricing Row */}
                                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex-1">
                                            <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
                                                <Zap className="w-4 h-4 text-amber-500" /> Precios
                                            </div>
                                            <p className={`font-bold text-lg ${t.isFullyFree ? 'text-green-600 dark:text-green-400' : 'text-slate-800 dark:text-slate-200'}`}>
                                                {t.freeTierDetails}
                                            </p>
                                            <div className="mt-2 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                                {t.isFullyFree ? <Check className="w-4 h-4 text-green-500" /> : <Shield className="w-4 h-4 text-amber-500" />}
                                                {t.isFullyFree ? '100% Gratis / Libre' : 'Opciones de pago'}
                                            </div>
                                        </div>

                                        {/* Description Row */}
                                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex-1">
                                            <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4 text-accent-500" /> Enfoque
                                            </div>
                                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                                {t.description}
                                            </p>
                                        </div>

                                        {/* Actions Row */}
                                        <div className="p-6 text-center bg-slate-50/50 dark:bg-slate-900/50 mt-auto">
                                            <div className="flex flex-col gap-3">
                                                <a href={t.url} target="_blank" rel="noopener noreferrer" className="bg-slate-900 hover:bg-accent-600 dark:bg-accent-600 dark:hover:bg-accent-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2">
                                                    Visitar Web <ExternalLink className="w-4 h-4" />
                                                </a>
                                                <Link to={`/tool/${t.id}`} className="text-sm font-semibold text-slate-500 hover:text-accent-600 transition-colors">
                                                    Leer review completa
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <div className="text-center py-20 bg-slate-100 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 max-w-2xl mx-auto">
                        <Dices className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-500 dark:text-slate-400">Selecciona una categoría arriba para iniciar</h3>
                        <p className="text-sm text-slate-400 mt-2">Podrás comparar lado a lado todas las inteligencias artificiales del sector simultáneamente deslizando hacia la derecha.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
