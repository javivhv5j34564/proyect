import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, ArrowDown, ChevronRight, Wand2 } from 'lucide-react';
import { tools } from '../data';
import { Link } from 'react-router-dom';

const WORKFLOWS = {
    'Marketing': [
        { desc: '1. Generación de Ideas & Copys', role: 'Writing & SEO', toolIds: ['chatgpt', 'claude-3'] },
        { desc: '2. Creatividades Visuales', role: 'Image & Design', toolIds: ['midjourney', 'krea'] },
        { desc: '3. Edición de Video Corto', role: 'Video & Animation', toolIds: ['opus-clip', 'capcut-ai'] }
    ],
    'Desarrollo Web': [
        { desc: '1. Arquitectura y Lógica', role: 'Programming', toolIds: ['claude-3', 'o1'] },
        { desc: '2. Programación de UI (Frontend)', role: 'Programming', toolIds: ['v0', 'lovable'] },
        { desc: '3. Autocompletado mientras programas', role: 'Programming', toolIds: ['cursor', 'supermaven'] }
    ],
    'Emprendedores (Startups)': [
        { desc: '1. Análisis de Mercado y Competencia', role: 'Research', toolIds: ['perplexity', 'consensus'] },
        { desc: '2. Diseño de Logotipo y Marca', role: 'Image & Design', toolIds: ['logoai', 'midjourney'] },
        { desc: '3. Creación de Presentación (Pitch Deck)', role: 'Productivity', toolIds: ['gamma'] }
    ]
};

export default function AIStackBuilder() {
    const [selectedRole, setSelectedRole] = useState(Object.keys(WORKFLOWS)[0]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <span className="bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400 px-4 py-1.5 rounded-full font-bold text-sm tracking-wide mb-4 inline-block">
                        FLUJOS DE TRABAJO (WORKFLOWS)
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mt-4 mb-4">
                        El Creador de <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-accent-500">Stacks de IA</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        No uses las herramientas de forma aislada. Aprende a conectarlas para crear flujos de trabajo automatizados como los profesionales.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Roles */}
                    <div className="w-full md:w-1/3 flex flex-col gap-3">
                        {Object.keys(WORKFLOWS).map(role => (
                            <button
                                key={role}
                                onClick={() => setSelectedRole(role)}
                                className={`w-full text-left px-6 py-5 rounded-2xl font-bold transition-all border-2 flex justify-between items-center \${
                                    selectedRole === role 
                                        ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-500 text-purple-700 dark:text-purple-400 shadow-md' 
                                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                                }`}
                            >
                                {role}
                                {selectedRole === role && <ChevronRight className="w-5 h-5" />}
                            </button>
                        ))}
                    </div>

                    {/* Workflow Flowchart */}
                    <div className="w-full md:w-2/3 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl relative">
                        <div className="absolute top-0 right-0 p-6 opacity-10">
                            <Layers className="w-40 h-40 text-slate-500" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-8 relative z-10 flex items-center gap-2">
                            <Wand2 className="w-6 h-6 text-purple-500" /> Pipeline Ideal: {selectedRole}
                        </h2>

                        <div className="space-y-4 relative z-10">
                            {WORKFLOWS[selectedRole].map((step, idx) => (
                                <div key={idx} className="flex flex-col">
                                    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 p-5 rounded-2xl">
                                        <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4">{step.desc}</h3>
                                        <div className="flex flex-wrap gap-3">
                                            {step.toolIds.map(tid => {
                                                const tool = tools.find(t => t.id === tid) || tools[0]; // fallback
                                                return (
                                                    <Link 
                                                        to={`/tool/${tool.id}`} 
                                                        key={tid}
                                                        className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl hover:border-purple-500 transition-colors shadow-sm"
                                                    >
                                                        <span className="text-xl">{tool.emoji}</span>
                                                        <span className="font-bold text-sm text-slate-700 dark:text-slate-300">{tool.name}</span>
                                                    </Link>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    {idx !== WORKFLOWS[selectedRole].length - 1 && (
                                        <div className="flex justify-center py-2 h-10 items-center">
                                            <ArrowDown className="w-6 h-6 text-slate-300 dark:text-slate-600" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
