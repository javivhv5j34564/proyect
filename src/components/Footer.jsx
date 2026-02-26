import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 mt-20">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-xl font-bold text-white mb-4">Directorio AI</h3>
                        <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                            Tu portal de confianza para descubrir las mejores herramientas de Inteligencia Artificial gratuitas y freemium. Analizamos y catalogamos el software más potente para impulsar tu productividad.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/privacidad" className="hover:text-accent-400 transition-colors">Política de Privacidad</Link></li>
                            <li><Link to="/cookies" className="hover:text-accent-400 transition-colors">Política de Cookies</Link></li>
                            <li><Link to="/aviso-legal" className="hover:text-accent-400 transition-colors">Aviso Legal</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Comunidad</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/contacto" className="hover:text-accent-400 transition-colors">Contacto</Link></li>
                            <li><Link to="/enviar-ia" className="hover:text-accent-400 transition-colors font-bold text-accent-500">➕ Sugerir una Herramienta</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} Directorio AI. Todos los derechos reservados.</p>
                    <p className="mt-2 md:mt-0">Este sitio web no está afiliado con Google, Microsoft ni OpenAI.</p>
                </div>
            </div>
        </footer>
    );
}
