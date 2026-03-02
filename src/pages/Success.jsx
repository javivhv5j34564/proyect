import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10 text-center"
            >
                <div className="mb-6 flex justify-center">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center relative">
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute inset-0 bg-green-500/20 rounded-full"
                        />
                    </div>
                </div>

                <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">¡Mensaje Enviado!</h1>
                <p className="text-slate-600 mb-8 leading-relaxed">
                    Gracias por tu evaluación. Tu opinión nos ayuda a mejorar el directorio cada día para toda la comunidad.
                </p>

                <div className="space-y-3">
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-accent-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-accent-500/20 active:scale-[0.98]"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Volver a la web
                    </Link>

                    <div className="pt-4 flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <Sparkles className="w-3 h-3 text-accent-500" />
                        Directorio AI Global
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
