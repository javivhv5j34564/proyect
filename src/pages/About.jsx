import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, ShieldCheck, Zap } from 'lucide-react';

const BackButton = () => (
    <div className="mb-8">
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
                <h2>¿Por qué Directorio AI?</h2>
                <p>
                    Directorio AI nació de la necesidad de organizar el caótico pero emocionante paisaje de la Inteligencia Artificial. Con cientos de nuevas aplicaciones lanzándose cada mes, los usuarios se sienten abrumados.
                </p>
                <p>
                    Nuestra plataforma no es solo un listado; es una herramienta de descubrimiento diseñada para ahorrarte tiempo y ayudarte a ser más productivo en la era digital.
                </p>

                <h2>¿Quiénes somos?</h2>
                <p>
                    Somos un equipo de entusiastas de la tecnología apasionados por la productividad. Creemos que la IA no viene a reemplazarnos, sino a potenciarnos.
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
