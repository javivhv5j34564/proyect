import { useState } from 'react';
import { tools } from '../data';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, Zap, ShieldAlert, ArrowRight, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';

const PROFESSIONS = [
    { name: 'Desarrollador / Programador', risk: 45, skills: ['Code Generation', 'Debugging', 'Automatización'], keyword: 'Programming' },
    { name: 'Creador de Contenido (Video/YouTube)', risk: 35, skills: ['Generación de guiones', 'Edición de Video', 'Audio'], keyword: 'Video & Animation' },
    { name: 'Diseñador Gráfico', risk: 65, skills: ['Generación de imágenes', 'Vectores', 'Mockups'], keyword: 'Image & Design' },
    { name: 'Copywriter / Escritor', risk: 75, skills: ['Redacción SEO', 'Generación de ideas', 'Traducción'], keyword: 'Writing & SEO' },
    { name: 'Educador / Profesor', risk: 20, skills: ['Creación de temarios', 'Corrección de exámenes', 'Tutoría'], keyword: 'Education' },
    { name: 'Analista de Datos / Data Scientist', risk: 40, skills: ['Visualización', 'Limpieza de datos', 'Consultas SQL'], keyword: 'Research' }
];

export default function AutomationRisk() {
    const [selectedJob, setSelectedJob] = useState(null);
    const [showResults, setShowResults] = useState(false);

    const handleSelect = (job) => {
        setSelectedJob(job);
        setShowResults(true);
    };

    const recommendedTools = selectedJob 
        ? tools.filter(t => t.sector.includes(selectedJob.keyword)).slice(0, 3)
        : [];

    return (
        <div className="min-h-[80vh] bg-slate-50 dark:bg-slate-950 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                        ⚠️ Calculadora de <span className="text-rose-500">Supervivencia</span> Profesional
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        ¿Qué probabilidad hay de que la IA automatice tus tareas diarias? Descubre tu porcentaje de riesgo y adopta las herramientas clave para volverte indispensable.
                    </p>
                </div>

                {!showResults ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {PROFESSIONS.map((job) => (
                            <button
                                key={job.name}
                                onClick={() => handleSelect(job)}
                                className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:border-accent-500 hover:shadow-lg transition-all text-left group"
                            >
                                <Briefcase className="w-8 h-8 text-slate-400 group-hover:text-accent-500 mb-4 transition-colors" />
                                <h3 className="font-bold text-slate-900 dark:text-white text-lg">{job.name}</h3>
                                <p className="text-sm text-slate-500 mt-2">Haz clic para analizar</p>
                            </button>
                        ))}
                    </div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl"
                    >
                        <div className="mb-8 border-b border-slate-100 dark:border-slate-800 pb-8 text-center flex flex-col items-center">
                            <span className="bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400 px-4 py-1.5 rounded-full font-bold text-sm tracking-wide mb-4">
                                RIESGO DE AUTOMATIZACIÓN
                            </span>
                            <div className="text-7xl font-black text-slate-900 dark:text-white mb-2">
                                {selectedJob.risk}%
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 max-w-lg">
                                La IA puede automatizar un {selectedJob.risk}% de las tareas repetitivas de un <strong className="text-slate-900 dark:text-white">{selectedJob.name}</strong>. 
                                La única forma de no quedarte atrás es dominar estas herramientas:
                            </p>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <ShieldAlert className="w-5 h-5 text-emerald-500" /> 
                                Kit de Supervivencia (Aprende esto hoy)
                            </h3>
                            <div className="grid gap-4">
                                {recommendedTools.map(t => (
                                    <div key={t.id} className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                                        <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-3xl shadow-sm border border-slate-200 dark:border-slate-700">
                                            {t.emoji}
                                        </div>
                                        <div className="flex-1 text-center sm:text-left">
                                            <h4 className="font-bold text-slate-900 dark:text-white text-lg">{t.name}</h4>
                                            <p className="text-sm text-slate-500 line-clamp-1">{t.description}</p>
                                        </div>
                                        <Link to={`/tool/${t.id}`} className="px-5 py-2.5 bg-accent-600 text-white rounded-xl font-bold hover:bg-accent-700 transition flex items-center gap-2 whitespace-nowrap w-full sm:w-auto justify-center">
                                            Estudiar IA <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                ))}
                                {recommendedTools.length === 0 && (
                                    <p className="text-slate-500 italic">No se encontraron herramientas específicas, pero ChatGPT siempre es un buen comienzo.</p>
                                )}
                            </div>
                        </div>

                        <button 
                            onClick={() => setShowResults(false)}
                            className="text-sm font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition w-full text-center mt-6"
                        >
                            ← Analizar otra profesión
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
