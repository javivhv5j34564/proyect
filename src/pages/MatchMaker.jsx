import { useState } from 'react';
import { tools } from '../data';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MousePointerClick, ChevronRight, Zap, RefreshCw, Star } from 'lucide-react';

const QUESTIONS = [
    {
        id: 'task',
        title: '¿Qué necesitas crear o resolver hoy?',
        options: [
            { label: 'Escribir textos o ideas', value: 'Writing', emoji: '✍️' },
            { label: 'Generar imágenes / arte', value: 'Image', emoji: '🎨' },
            { label: 'Programar o depurar código', value: 'Programming', emoji: '💻' },
            { label: 'Crear videos o animaciones', value: 'Video', emoji: '🎬' },
            { label: 'Investigar o resumir PDFs', value: 'Research', emoji: '📚' }
        ]
    },
    {
        id: 'budget',
        title: '¿Cuál es tu presupuesto actual?',
        options: [
            { label: 'Uso gratuito intermitente', value: 'free_tier', emoji: '🆓' },
            { label: '100% Gratis o Código Abierto', value: 'fully_free', emoji: '🔓' },
            { label: 'Busco algo Pro (de pago)', value: 'paid', emoji: '💳' }
        ]
    },
    {
        id: 'expertise',
        title: '¿Cuál es tu nivel técnico con IAs?',
        options: [
            { label: 'Principiante total (fácil de usar)', value: 'beginner', emoji: '👶' },
            { label: 'Intermedio (uso prompts diarios)', value: 'intermediate', emoji: '😎' },
            { label: 'Avanzado / Desarrollador (APIs)', value: 'advanced', emoji: '🥷' }
        ]
    }
];

export default function MatchMaker() {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [match, setMatch] = useState(null);
    const [isThinking, setIsThinking] = useState(false);

    const handleAnswer = (questionId, value) => {
        const newAnswers = { ...answers, [questionId]: value };
        setAnswers(newAnswers);

        if (step < QUESTIONS.length - 1) {
            setStep(step + 1);
        } else {
            calculateMatch(newAnswers);
        }
    };

    const calculateMatch = (finalAnswers) => {
        setIsThinking(true);
        setTimeout(() => {
            // Logic to find best fit
            let candidates = tools.filter(t => t.sector.includes(finalAnswers.task) || t.sector.includes('Productivity'));
            
            if (finalAnswers.budget === 'fully_free') {
                candidates = candidates.filter(t => t.isFullyFree);
            }
            if (finalAnswers.expertise === 'advanced') {
                candidates = candidates.sort((a,b) => (b.hasAPI ? 1 : -1));
            }

            setMatch(candidates.length > 0 ? candidates[0] : tools[0]);
            setIsThinking(false);
        }, 1500); // fake loading for effect
    };

    const startOver = () => {
        setStep(0);
        setAnswers({});
        setMatch(null);
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4">
            <div className="max-w-2xl w-full">
                
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-3 flex items-center justify-center gap-3">
                        <Zap className="w-10 h-10 text-amber-500" />
                        Trivago de las IAs
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        No pierdas horas buscando. Responde 3 preguntas y encontraremos tu herramienta perfecta al instante.
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-6 md:p-10 relative overflow-hidden min-h-[400px] flex flex-col justify-center">
                    
                    {/* Progress Bar */}
                    {match === null && !isThinking && (
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-100 dark:bg-slate-800">
                            <div 
                                className="h-full bg-accent-500 transition-all duration-300" 
                                style={{ width: `${((step) / QUESTIONS.length) * 100}%` }}
                            />
                        </div>
                    )}

                    <AnimatePresence mode="wait">
                        {isThinking && (
                            <motion.div 
                                key="thinking"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center text-center space-y-4"
                            >
                                <RefreshCw className="w-12 h-12 text-accent-500 animate-spin" />
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Analizando algoritmos...</h2>
                                <p className="text-slate-500">Filtrando entre más de {tools.length} IAs...</p>
                            </motion.div>
                        )}

                        {!isThinking && match && (
                            <motion.div 
                                key="result"
                                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                className="text-center"
                            >
                                <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 rounded-full font-bold text-sm mb-6">
                                    ¡MATCH PERFECTO ENCONTRADO 99%!
                                </span>
                                
                                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl mb-8 transform transition hover:-translate-y-1">
                                    <div className="w-24 h-24 bg-white dark:bg-slate-900 mx-auto rounded-full flex items-center justify-center text-5xl shadow-md border border-slate-100 dark:border-slate-800 mb-6">
                                        {match.emoji}
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">{match.name}</h2>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium mb-4">{match.sector}</p>
                                    <p className="text-slate-700 dark:text-slate-300 mb-6">{match.description}</p>
                                    
                                    <Link to={`/tool/${match.id}`} className="block w-full bg-accent-600 hover:bg-accent-700 text-white font-bold py-4 px-6 rounded-xl transition shadow-lg shadow-accent-500/20">
                                        Ver review de {match.name}
                                    </Link>
                                </div>

                                <button onClick={startOver} className="text-slate-400 hover:text-slate-800 dark:hover:text-white font-semibold transition text-sm">
                                    ↻ Volver a intentar el test
                                </button>
                            </motion.div>
                        )}

                        {!isThinking && !match && (
                            <motion.div 
                                key={`step-${step}`}
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                className="w-full"
                            >
                                <p className="text-accent-500 font-bold text-sm mb-2 uppercase tracking-wide">Paso {step + 1} de {QUESTIONS.length}</p>
                                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-8">
                                    {QUESTIONS[step].title}
                                </h2>
                                
                                <div className="grid gap-3">
                                    {QUESTIONS[step].options.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => handleAnswer(QUESTIONS[step].id, opt.value)}
                                            className="w-full flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl hover:border-accent-500 dark:hover:border-accent-500 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all text-left font-bold text-slate-700 dark:text-slate-200 group"
                                        >
                                            <span className="flex items-center gap-3">
                                                <span className="text-2xl">{opt.emoji}</span>
                                                {opt.label}
                                            </span>
                                            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-accent-500" />
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
