import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer id="footer-contacto" className="bg-slate-900 text-slate-300 py-8 md:py-12 mt-12 md:mt-20 border-t border-slate-800 relative overflow-hidden scroll-mt-24">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
            <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-xl font-bold text-white mb-3 md:mb-4 tracking-tight">Directorio AI</h3>
                        <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                            Tu portal de confianza para descubrir las mejores herramientas de Inteligencia Artificial gratuitas y freemium. Analizamos y catalogamos el software más potente para impulsar tu productividad.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/privacidad" className="hover:text-accent-400 transition-colors">Política de Privacidad</Link></li>
                            <li><Link to="/cookies" className="hover:text-accent-400 transition-colors">Política de Cookies</Link></li>
                            <li><Link to="/aviso-legal" className="hover:text-accent-400 transition-colors">Aviso Legal</Link></li>

                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Comunidad</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/contacto" className="hover:text-accent-400 transition-colors">Contacto</Link></li>
                            <li><Link to="/enviar-ia" className="hover:text-accent-400 transition-colors font-bold text-accent-500 hover:text-accent-400">➕ Sugerir una Herramienta</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} Directorio AI. Todos los derechos reservados.</p>
                    <div className="flex items-center gap-4 mt-2 md:mt-0">
                        <p>Hecho con ❤️ para la comunidad IA</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
