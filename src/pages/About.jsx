import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, ShieldCheck, Zap, ChevronRight, Users, Award, Globe } from 'lucide-react';

const BackButton = () => (
    <div className="mb-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-400 mb-6 overflow-x-auto no-scrollbar whitespace-nowrap px-1">
            <Link to="/" className="hover:text-accent-600 transition-colors flex items-center gap-1">Inicio</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span className="text-slate-600 font-bold">Sobre Nosotros</span>
        </nav>
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-accent-600 transition-colors bg-white border border-slate-200 hover:border-accent-200 px-4 py-2 rounded-full shadow-sm hover:shadow-md">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
        </Link>
    </div>
);

const About = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-16">
            <BackButton />

            <header className="mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Sobre Directorio AI</h1>
                <p className="text-xl text-slate-600 leading-relaxed">Tu puente hacia las mejores herramientas de Inteligencia Artificial.</p>
            </header>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                        <Target className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-slate-900">Nuestra Misión</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">Democratizar el acceso a la IA, ayudando a profesionales y empresas a encontrar la herramienta perfecta para sus necesidades.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-slate-900">Curación Experta</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">Cada herramienta en nuestro directorio es revisada para asegurar que aporta valor real y cumple con los estándares de calidad.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                        <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-slate-900">Actualización</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">El mundo de la IA se mueve rápido. Nosotros también. Actualizamos nuestra base de datos semanalmente.</p>
                </div>
            </div>

            <article className="prose prose-slate prose-lg max-w-none">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">¿Por qué Directorio AI?</h2>
                <p>
                    Directorio AI nació de la necesidad de organizar el caótico pero emocionante paisaje de la Inteligencia Artificial. Con cientos de nuevas aplicaciones lanzándose cada mes, los usuarios se sienten abrumados por la cantidad de opciones y la dificultad de encontrar herramientas que sean realmente útiles y accesibles.
                </p>
                <p>
                    Nuestra plataforma no es solo un listado estático; es una <strong>herramienta de descubrimiento dinámico</strong> diseñada para ahorrarte tiempo y ayudarte a navegar la revolución tecnológica actual con criterio y eficiencia.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12 not-prose">
                    <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                        <Users className="w-6 h-6 text-primary-600 flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-slate-900 mb-1">Comunidad Primero</h4>
                            <p className="text-slate-500 text-sm">Escuchamos activamente las sugerencias de nuestros usuarios para listar las herramientas que realmente demandan.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                        <Award className="w-6 h-6 text-accent-600 flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-slate-900 mb-1">Calidad Certificada</h4>
                            <p className="text-slate-500 text-sm">No listamos por listar. Cada IA es probada para asegurar que su "Free Tier" es funcional y no una simple demo.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                        <Globe className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-slate-900 mb-1">Alcance Global</h4>
                            <p className="text-slate-500 text-sm">Buscamos soluciones en todos los idiomas y mercados, adaptándolas con explicaciones claras en español.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                        <Target className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                        <div>
                            <h4 className="font-bold text-slate-900 mb-1">Foco en Productividad</h4>
                            <p className="text-slate-500 text-sm">Priorizamos aquellas herramientas que automatizan tareas tediosas y liberan tiempo creativo.</p>
                        </div>
                    </div>
                </div>

                <h2>¿Quiénes somos?</h2>
                <p>
                    Somos un equipo de entusiastas de la tecnología y expertos en productividad digital. Creemos firmemente que la Inteligencia Artificial es el copiloto definitivo para el ser humano moderno, y nuestra meta es ser la brújula que te guíe hacia el éxito en esta era sintética.
                </p>
            </article>

            <div className="mt-16 p-8 bg-slate-900 rounded-3xl text-center text-white">
                <h2 className="text-2xl font-bold mb-4">¿Quieres colaborar con nosotros?</h2>
                <p className="text-slate-300 mb-8 max-w-lg mx-auto">Si tienes una herramienta de IA o quieres sugerir una mejora, estamos encantados de escucharte.</p>
                <Link to="/contacto" className="inline-block bg-white text-slate-900 font-bold px-8 py-3 rounded-xl hover:bg-slate-100 transition-colors">
                    Contactar ahora
                </Link>
            </div>
        </div>
    );
};

export default About;
