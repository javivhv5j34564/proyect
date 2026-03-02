import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Sparkles, Ghost } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-slate-50">
            <div className="max-w-xl w-full text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative mb-8"
                >
                    <div className="absolute inset-0 bg-accent-500/10 blur-3xl rounded-full"></div>
                    <Ghost className="w-24 h-24 md:w-32 md:h-32 text-slate-300 mx-auto animate-pulse relative z-10" />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl md:text-9xl font-black text-slate-100 -z-0 opacity-50">404</span>
                </motion.div>

                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">¡Vaya! Página no encontrada</h1>
                <p className="text-slate-600 text-lg mb-10 leading-relaxed">
                    Parece que la inteligencia artificial se ha tomado el día libre o la página que buscas ha sido movida a otra dimensión. 🤖🌌
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-accent-600 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-accent-500/20 active:scale-95"
                    >
                        <Home className="w-5 h-5" />
                        Ir al Inicio
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold py-4 px-8 rounded-xl transition-all hover:bg-slate-50 active:scale-95"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Volver atrás
                    </button>
                </div>

                <div className="mt-16 flex items-center justify-center gap-2 text-slate-400 font-medium">
                    <Sparkles className="w-4 h-4 text-accent-400" />
                    <span>¿Buscabas una herramienta específica? Prueba en el buscador principal.</span>
                </div>
            </div>
        </div>
    );
}
