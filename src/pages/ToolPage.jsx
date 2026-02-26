import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { tools } from '../data';
import { useSEO } from '../hooks/useSEO';
import { ArrowLeft, ExternalLink, Zap, Star, Share2, Twitter, Copy, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ToolPage() {
    const { id } = useParams();
    const tool = tools.find(t => t.id === id);

    // Generar JSON-LD para SEO (Schema.org SoftwareApplication)
    const schemaData = tool ? {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": tool.name,
        "description": tool.description,
        "applicationCategory": tool.sector,
        "operatingSystem": "Web",
        "url": tool.url,
        "offers": {
            "@type": "Offer",
            "price": tool.isFullyFree ? "0" : "0",
            "priceCurrency": "USD",
            "description": tool.freeTierDetails,
            "url": tool.url
        }
    } : null;

    useSEO({
        title: tool ? `${tool.name} - Prueba esta IA | Directorio AI` : 'Herramienta no encontrada',
        description: tool ? tool.description : 'Esta herramienta de Inteligencia Artificial no existe o ha sido eliminada del directorio.',
        schema: schemaData
    });

    const [isCopied, setIsCopied] = useState(false);

    // Get related tools (same sector, exclude current, limit 3)
    const relatedTools = tool ? tools
        .filter(t => t.sector === tool.sector && t.id !== tool.id)
        .slice(0, 3) : [];

    // Rating State
    const [ratingData, setRatingData] = useState(() => {
        const saved = localStorage.getItem(`ai_rating_${id}`);
        if (saved) return JSON.parse(saved);

        // Start ratings at 0.0 with 0 votes
        return {
            average: "0.0",
            count: 0,
            userRating: 0
        };
    });
    const [hoveredStar, setHoveredStar] = useState(0);

    useEffect(() => {
        if (id) {
            localStorage.setItem(`ai_rating_${id}`, JSON.stringify(ratingData));
        }
    }, [ratingData, id]);

    const handleRate = (stars) => {
        setRatingData(prev => {
            // Si hace click en la misma estrella, quita el voto (resta 1)
            if (prev.userRating === stars) {
                const prevSum = parseFloat(prev.average) * prev.count;
                const newCount = prev.count - 1;
                const newAverage = newCount === 0 ? "0.0" : ((prevSum - stars) / newCount).toFixed(1);
                return { average: newAverage, count: newCount, userRating: 0 };
            }

            // Si vota por primera vez, o cambia su voto
            const prevTotal = parseFloat(prev.average) * prev.count;
            const newCount = prev.userRating === 0 ? prev.count + 1 : prev.count;
            const adjustedTotal = prev.userRating === 0 ? prevTotal : prevTotal - prev.userRating;
            const newAverage = ((adjustedTotal + stars) / newCount).toFixed(1);

            return {
                average: newAverage,
                count: newCount,
                userRating: stars
            };
        });
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const shareOnTwitter = () => {
        const text = `¡Acabo de descubrir ${tool.name} en Directorio AI! Te ayuda en: ${tool.sector}. Échale un vistazo 👇`;
        const url = window.location.href;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    };

    if (!tool) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-3xl font-bold mb-4">Herramienta no encontrada</h1>
                <p className="text-slate-600 mb-8">Esta página no existe o la IA ha sido eliminada del directorio.</p>
                <Link to="/" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-accent-600 transition-colors">
                    Volver al Inicio
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] bg-slate-50 py-12">
            <div className="max-w-4xl mx-auto px-6">
                <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-accent-600 transition-colors bg-white border border-slate-200 hover:border-accent-200 px-4 py-2 rounded-full shadow-sm hover:shadow-md mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    Volver al Directorio
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200"
                >
                    <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl border border-slate-100 shadow-sm overflow-hidden bg-slate-50 flex items-center justify-center flex-shrink-0 text-6xl md:text-7xl">
                            {tool.emoji || '🤖'}
                        </div>

                        <div className="flex-grow">
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">{tool.name}</h1>

                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <span className="flex text-sm font-bold px-4 py-1.5 rounded-full bg-slate-100 text-slate-600">
                                    {tool.sector}
                                </span>
                                <span className={`flex items-center gap-1.5 text-sm font-bold px-4 py-1.5 rounded-full ${tool.isFullyFree ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                                    <Zap className="w-4 h-4" /> {tool.freeTierDetails}
                                </span>
                            </div>

                            <div className="flex flex-col gap-2 mb-6">
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => {
                                        const isFilled = ratingData.userRating
                                            ? star <= ratingData.userRating
                                            : star <= (hoveredStar || Math.round(ratingData.average));

                                        return (
                                            <Star
                                                key={star}
                                                className={`w-7 h-7 cursor-pointer transition-all hover:scale-110 active:scale-95 ${isFilled
                                                    ? 'fill-amber-400 text-amber-400 drop-shadow-sm'
                                                    : 'fill-slate-100 text-slate-200 hover:text-amber-200'
                                                    }`}
                                                onMouseEnter={() => setHoveredStar(star)}
                                                onMouseLeave={() => setHoveredStar(0)}
                                                onClick={() => handleRate(star)}
                                            />
                                        );
                                    })}
                                    <span className="text-slate-800 font-bold text-lg ml-2">{ratingData.average}</span>
                                </div>
                                <span className="text-slate-500 text-sm font-medium">
                                    {ratingData.userRating > 0
                                        ? `Has votado ${ratingData.userRating} estrellas. (Click para quitar)`
                                        : `Basado en ${ratingData.count} opiniones. ¡Valórala tú también!`
                                    }
                                </span>
                            </div>
                        </div>

                        <div className="w-full md:w-auto mt-4 md:mt-0">
                            <a href={tool.url} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-accent-600 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-accent-500/25 active:scale-95 text-lg">
                                Visitar Web <ExternalLink className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div className="prose prose-slate prose-lg max-w-none mb-12">
                        <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3 mb-6">¿Qué es y por qué usar {tool.name}?</h2>
                        <p className="text-slate-700 font-medium text-xl leading-relaxed mb-6">
                            {tool.description}
                        </p>
                        <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100 text-slate-600 leading-relaxed">
                            {tool.longDescription}
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-8 border-t border-slate-100">
                        <span className="text-slate-500 font-semibold flex flex-row items-center gap-2"><Share2 className="w-5 h-5" /> Compartir herramienta:</span>
                        <div className="flex gap-3 w-full sm:w-auto">
                            <button onClick={handleCopyLink} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold transition-all hover:border-slate-300">
                                {isCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                {isCopied ? '¡Enlace copiado!' : 'Copiar enlace'}
                            </button>
                            <button onClick={shareOnTwitter} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] font-bold transition-all">
                                <Twitter className="w-4 h-4 fill-current" />
                                Postear en X
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Related Tools Section */}
                {relatedTools.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-16"
                    >
                        <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-accent-500" /> Alternativas a {tool.name}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedTools.map(relatedTool => (
                                <Link to={`/herramienta/${relatedTool.id}`} key={relatedTool.id} className="block group">
                                    <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-accent-300 shadow-sm hover:shadow-xl hover:shadow-accent-500/10 transition-all h-full flex flex-col pt-1">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-100 text-2xl group-hover:scale-105 transition-transform">
                                                {relatedTool.emoji || '🤖'}
                                            </div>
                                            <span className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full ${relatedTool.isFullyFree ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                                                {relatedTool.freeTierDetails}
                                            </span>
                                        </div>
                                        <h4 className="font-bold text-slate-900 group-hover:text-accent-600 mb-2 leading-tight">{relatedTool.name}</h4>
                                        <p className="text-slate-500 text-xs line-clamp-3 leading-relaxed mb-4 flex-grow">{relatedTool.description}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
