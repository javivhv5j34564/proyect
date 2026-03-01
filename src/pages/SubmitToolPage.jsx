import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

export function SubmitToolPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        // Prevent default if you want custom visual handling first
        // Or let FormSubmit do its redirect. We will use a standard action form but 
        // with an iframe trick or standard redirect for simplicity.
        // For best UX without complex backend, we just let FormSubmit handle it and set _next.
    };

    return (
        <div className="min-h-[80vh] bg-slate-50 py-10 md:py-16 px-4 md:px-6">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8 md:mb-10">
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 md:mb-4">➕ Añadir una Inteligencia Artificial</h1>
                    <p className="text-base md:text-lg text-slate-600">
                        ¿Conoces o has desarrollado una herramienta de IA que debería estar en nuestro directorio 🚀?
                        Envíanosla y la revisaremos para incluirla 📩.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200"
                >
                    <form action="https://formsubmit.co/f.javiergg06@gmail.com" method="POST" className="space-y-4 md:space-y-6">
                        <input type="hidden" name="_next" value={window.location.origin + "/"} />
                        <input type="hidden" name="_captcha" value="false" />
                        <input type="hidden" name="_subject" value="Nueva sugerencia de IA para el Directorio" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">🤖 Nombre de la Herramienta *</label>
                                <input required type="text" name="tool_name" placeholder="Ej: Midjourney" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">🌐 URL del Sitio Web *</label>
                                <input required type="url" name="tool_url" placeholder="https://..." className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">📂 Categoría Principal *</label>
                            <select required name="tool_category" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all">
                                <option value="" disabled selected>Selecciona una categoría</option>
                                <option value="Escritura y Productividad">Escritura y Productividad</option>
                                <option value="Imagen y Diseño">Imagen y Diseño</option>
                                <option value="Video y Animación">Video y Animación</option>
                                <option value="Programación">Programación</option>
                                <option value="Audio y Música">Audio y Música</option>
                                <option value="Horarios">Organización y Horarios</option>
                                <option value="Chatbots">Chatbots y Asistentes</option>
                                <option value="Otros">Otra categoría</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">💰 Precio de la herramienta *</label>
                            <select required name="tool_pricing" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all">
                                <option value="" disabled selected>¿Tiene plan gratuito?</option>
                                <option value="100% Gratis">100% Gratis / Open Source</option>
                                <option value="Freemium">Freemium (Tiene funciones gratis)</option>
                                <option value="Solo Pago">Solo de Pago (Prueba gratis limitada)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">📝 Breve Descripción *</label>
                            <textarea required name="tool_description" rows="3" placeholder="¿Qué problema resuelve y por qué es genial?" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all resize-none"></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">📧 Tu Email (opcional)</label>
                            <input type="email" name="submitter_email" placeholder="Por si necesitamos contactarte" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all" />
                        </div>

                        <button type="submit" className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-accent-600 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-xl transition-all shadow-lg hover:shadow-accent-500/25 active:scale-[0.98] text-base md:text-lg mt-4">
                            Enviar Sugerencia 🚀 <Send className="w-5 h-5" />
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
