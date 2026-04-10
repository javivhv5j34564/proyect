import { useState, useEffect } from 'react';
import { tools } from '../data';
import { useSEO } from '../hooks/useSEO';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, Check, Shield, Zap, TrendingUp, ExternalLink, Dices, FolderTree, ThumbsUp, ThumbsDown, VS } from 'lucide-react';

export default function CompareToolsPage() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedToolIds, setSelectedToolIds] = useState([]);
    
    useSEO({
        title: 'Compare AI Tools by Category | AI Directory',
        description: 'Analyze side-by-side multiple artificial intelligence platforms within specific industries to find your optimal workflow software.'
    });

    const categories = [...new Set(tools.map(t => t.sector))].sort();
    
    const categoryTools = selectedCategory 
        ? tools.filter(t => t.sector === selectedCategory) 
        : [];

    const toolsToCompare = categoryTools.filter(t => selectedToolIds.includes(t.id));

    useEffect(() => {
        setSelectedToolIds([]);
    }, [selectedCategory]);

    const toggleToolSelection = (id) => {
        if (selectedToolIds.includes(id)) {
            setSelectedToolIds(selectedToolIds.filter(tId => tId !== id));
        } else {
            if (selectedToolIds.length < 3) {
                setSelectedToolIds([...selectedToolIds, id]);
            }
        }
    };

    const getPros = (t) => t.pros || ['Resultados rápidos y eficientes', 'Interfaz intuitiva', 'Excelente integración de IA'];
    const getCons = (t) => t.cons || ['Curva de aprendizaje inicial', 'Limitaciones en la versión gratuita'];

    return (
        <div className="min-h-[80vh] bg-slate-50 dark:bg-slate-950 py-10 md:py-16 px-4 md:px-6">
            <div className="max-w-[95vw] 2xl:max-w-7xl mx-auto">
                <div className="text-center mb-10 md:mb-16">
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">⚔️ Comparador de Herramientas</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Selecciona tu categoría y elige entre 2 o 3 herramientas para comparar sus precios, ventajas y desventajas cara a cara.
                    </p>
                </div>

                {/* Category Selector */}
                <div className="max-w-md mx-auto mb-10 relative z-50">
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 text-center">Selecciona un Sector</label>
                    <div 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full bg-white dark:bg-slate-900 border-2 border-slate-200 hover:border-accent-500 dark:border-slate-800 dark:hover:border-accent-500 rounded-2xl px-5 py-4 flex items-center justify-between cursor-pointer shadow-sm transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <FolderTree className="w-5 h-5 text-accent-500" />
                            <span className="font-bold text-slate-800 dark:text-slate-200">
                                {selectedCategory || "Explorar sectores..."}
                            </span>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>

                    <AnimatePresence>
                        {isDropdownOpen && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 overflow-hidden max-h-80 overflow-y-auto"
                            >
                                <div 
                                    onClick={() => { setSelectedCategory(''); setIsDropdownOpen(false); }}
                                    className="px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer font-medium text-slate-500 transition-colors border-b border-slate-100 dark:border-slate-800"
                                >
                                    Limpiar Selección
                                </div>
                                {categories.map(cat => (
                                    <div 
                                        key={cat}
                                        onClick={() => { setSelectedCategory(cat); setIsDropdownOpen(false); }}
                                        className="px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer flex items-center gap-3 transition-colors text-slate-700 dark:text-slate-300 font-bold"
                                    >
                                        {cat}
                                        <span className="ml-auto text-xs font-normal text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                                            {tools.filter(t => t.sector === cat).length} AIs
                                        </span>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {selectedCategory ? (
                    <div className="mb-12">
                        <div className="flex flex-col items-center mb-6">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">Selecciona herramientas para comparar (Máximo 3)</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Has seleccionado: {selectedToolIds.length}/3</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                            {categoryTools.map(t => {
                                const isSelected = selectedToolIds.includes(t.id);
                                const isDisabled = !isSelected && selectedToolIds.length >= 3;
                                return (
                                    <button
                                        key={t.id}
                                        onClick={() => toggleToolSelection(t.id)}
                                        disabled={isDisabled}
                                        className={`px-4 py-3 rounded-xl border-2 font-bold flex items-center gap-2 transition-all ${
                                            isSelected 
                                                ? 'bg-accent-500 border-accent-500 text-white shadow-md scale-105' 
                                                : isDisabled 
                                                    ? 'bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-400 cursor-not-allowed opacity-60' 
                                                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-accent-400 hover:shadow-sm'
                                        }`}
                                    >
                                        <span className="text-xl">{t.emoji || '🤖'}</span>
                                        {t.name}
                                        {isSelected && <Check className="w-4 h-4 ml-1" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-slate-100 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 max-w-2xl mx-auto">
                        <Dices className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-500 dark:text-slate-400">Esperando tu selección</h3>
                        <p className="text-sm text-slate-400 mt-2">Elige un sector arriba para empezar a comparar.</p>
                    </div>
                )}

                {toolsToCompare.length >= 2 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden relative"
                    >
                        <div className="overflow-x-auto" style={{scrollbarWidth: 'thin'}}>
                            <div className="flex min-w-max">
                                {toolsToCompare.map((t, index) => (
                                    <div 
                                        key={t.id} 
                                        className={`w-80 md:w-96 flex-shrink-0 flex flex-col ${index !== toolsToCompare.length - 1 ? 'border-r border-slate-200 dark:border-slate-800' : ''}`}
                                    >
                                        {/* Header */}
                                        <div className="p-6 md:p-8 text-center bg-slate-50/80 dark:bg-slate-900/80 flex-1 border-b border-slate-200 dark:border-slate-800">
                                            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-4xl md:text-5xl mb-4 shadow-sm">
                                                {t.emoji || '🤖'}
                                            </div>
                                            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{t.name}</h2>
                                        </div>

                                        {/* Pricing Row */}
                                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex-1 bg-white dark:bg-slate-800/20">
                                            <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3 flex items-center gap-2">
                                                <Zap className="w-4 h-4 text-emerald-500" /> Precio y Plan
                                            </div>
                                            <p className={`font-bold text-lg md:text-xl ${t.isFullyFree ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'}`}>
                                                {t.freeTierDetails}
                                            </p>
                                            <div className="mt-2 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
                                                {t.isFullyFree ? <Check className="w-4 h-4 text-emerald-500" /> : <Shield className="w-4 h-4 text-amber-500" />}
                                                {t.isFullyFree ? '100% Gratuito / Open Source' : 'Planes premium requeridos'}
                                            </div>
                                        </div>

                                        {/* Pros */}
                                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex-1 bg-emerald-50/50 dark:bg-emerald-950/10">
                                            <div className="text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold mb-4 flex items-center gap-2">
                                                <ThumbsUp className="w-4 h-4" /> Pros
                                            </div>
                                            <ul className="space-y-3">
                                                {getPros(t).map((pro, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                                                        <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                                                        <span>{pro}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Cons */}
                                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex-1 bg-red-50/50 dark:bg-red-950/10">
                                            <div className="text-xs uppercase tracking-wider text-red-600 dark:text-red-400 font-bold mb-4 flex items-center gap-2">
                                                <ThumbsDown className="w-4 h-4" /> Contras
                                            </div>
                                            <ul className="space-y-3">
                                                {getCons(t).map((con, i) => (
                                                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                                                        <span className="text-red-500 font-bold mt-[-2px] flex-shrink-0">-</span>
                                                        <span>{con}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Description Row (Optional Context) */}
                                        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex-1 bg-white dark:bg-slate-800/20">
                                            <div className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3 flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4 text-accent-500" /> Especialidad
                                            </div>
                                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                                {t.description}
                                            </p>
                                        </div>

                                        {/* Actions Row */}
                                        <div className="p-6 text-center bg-slate-50/80 dark:bg-slate-900/80 mt-auto">
                                            <div className="flex flex-col gap-3">
                                                <a href={t.url} target="_blank" rel="noopener noreferrer" className="bg-slate-900 hover:bg-accent-600 dark:bg-accent-600 dark:hover:bg-accent-500 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2">
                                                    Visitar Plataforma <ExternalLink className="w-4 h-4" />
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
                )}
                
                {selectedCategory && toolsToCompare.length < 2 && (
                    <div className="text-center py-10 text-slate-500 dark:text-slate-400">
                        Selecciona al menos 2 herramientas para habilitar la tabla comparativa.
                    </div>
                )}
            </div>
        </div>
    );
}
