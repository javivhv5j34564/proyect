import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton = () => (
    <div className="mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-accent-600 transition-colors bg-white border border-slate-200 hover:border-accent-200 px-4 py-2 rounded-full shadow-sm hover:shadow-md">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
        </Link>
    </div>
);
export const PrivacyPolicy = () => (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-16 prose prose-slate">
        <BackButton />
        <h1>🛡️ Política de Privacidad</h1>
        <p><em>Última actualización: Marzo 2026</em></p>

        <h2>1. 📝 Información que recopilamos</h2>
        <p>En Directorio AI, respetamos su privacidad y nos comprometemos a protegerla. Solo recopilamos datos que usted nos proporciona voluntariamente a través del formulario de contacto y mediante el uso de cookies analíticas y publicitarias 🍪.</p>

        <h2>2. 🎯 Uso de la información</h2>
        <p>Utilizamos sus datos para mejorar el rendimiento del sitio web, analizar el tráfico (Google Analytics 📈) y mostrar publicidad relevante proporcionada por terceros como Google AdSense.</p>

        <h2>3. 👁️ Publicidad de Google AdSense y Cookies</h2>
        <p>Utilizamos Google AdSense para publicar anuncios cuando visita nuestro sitio web. Los proveedores de terceros, incluido Google, utilizan cookies para mostrar anuncios relevantes basándose en las visitas anteriores de un usuario a nuestro sitio web o a otros sitios web en Internet.</p>
        <p><strong>Uso de cookies publicitarias:</strong> El uso de cookies de publicidad permite a Google y a sus socios mostrar anuncios a nuestros usuarios basados en sus visitas a nuestros sitios y/o a otros sitios de Internet.</p>
        <p>Los usuarios pueden inhabilitar la publicidad personalizada. Para ello, deberán acceder a Preferencias de anuncios de Google o visitar <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:underline">www.aboutads.info</a> para inhabilitar el uso de cookies para publicidad personalizada por parte de proveedores externos.</p>

        <h2>4. 🤝 Enlaces de Afiliados</h2>
        <p>Algunas de las herramientas listadas incluyen enlaces de afiliados. Esto significa que si hace clic y realiza una compra, podemos recibir una pequeña comisión sin coste adicional para usted ✨. Esto nos ayuda a mantener el directorio actualizado de forma gratuita ❤️.</p>
    </div>
);

export const CookiesPolicy = () => (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-16 prose prose-slate">
        <BackButton />
        <h1>🍪 Política de Cookies</h1>
        <h2>🤔 ¿Qué son las cookies?</h2>
        <p>Las cookies son pequeños archivos de texto que los sitios web que visita colocan en su ordenador 💻 para asegurar el correcto funcionamiento del sitio, así como para proporcionar información a los propietarios del sitio.</p>
        <h2>📋 Tipos de Cookies que utilizamos</h2>
        <ul>
            <li><strong>🛠️ Cookies esenciales:</strong> Necesarias para el funcionamiento básico de la web.</li>
            <li><strong>📊 Cookies de análisis:</strong> (Google Analytics) Nos permiten comprender cómo los usuarios interactúan con la web para mejorar la experiencia.</li>
            <li><strong>📢 Cookies publicitarias:</strong> (Google AdSense) Utilizadas por los proveedores externos, incluido Google, para mostrar anuncios relevantes. Los usuarios pueden optar por no recibir publicidad personalizada visitando <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:underline">Preferencias de anuncios</a> o <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-accent-600 hover:underline">www.aboutads.info</a>.</li>
        </ul>
    </div>
);

export const LegalNotice = () => (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-10 md:py-16 prose prose-slate">
        <BackButton />
        <h1>⚖️ Aviso Legal</h1>
        <p>El portal Directorio AI tiene como objetivo proporcionar información sobre herramientas de software de Inteligencia Artificial 🤖.</p>
        <h2>⚠️ Descargo de responsabilidad</h2>
        <p>La información contenida en este sitio web es solo para fines de información general. No nos hacemos responsables de los cambios en los precios de suscripción o términos de uso de las herramientas de terceros referenciadas. Algunas de las herramientas pueden incluir enlaces de afiliados por los cuales recibimos una pequeña comisión sin coste extra para usted 💸.</p>
    </div>
);

export const Contact = () => {
    return (
        <div className="max-w-2xl mx-auto px-4 md:px-6 py-10 md:py-16">
            <BackButton />
            <h1 className="text-3xl font-bold mb-6">📬 Contacto</h1>
            <p className="text-slate-600 mb-8">¿Tienes alguna duda 🤔, propuesta de colaboración 🤝, o quieres sugerir una nueva Inteligencia Artificial 💡? Escríbenos y te responderemos pronto ⚡.</p>

            <form action="https://formsubmit.co/f.javiergg06@gmail.com" method="POST" className="space-y-4 shadow-sm bg-white p-5 md:p-8 rounded-2xl border border-slate-200">
                <input type="hidden" name="_next" value={`${window.location.origin}/gracias`} />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value="Nuevo mensaje de contacto - Directorio AI" />

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">👤 Nombre o Empresa</label>
                    <input type="text" name="name" required className="w-full border border-slate-200 rounded-xl p-3.5 focus:ring-2 focus:ring-accent-500 outline-none transition-shadow hover:border-accent-200 bg-slate-50 focus:bg-white" placeholder="Ej. Ana García" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">📧 Email de contacto</label>
                    <input type="email" name="email" required className="w-full border border-slate-200 rounded-xl p-3.5 focus:ring-2 focus:ring-accent-500 outline-none transition-shadow hover:border-accent-200 bg-slate-50 focus:bg-white" placeholder="correo@ejemplo.com" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">💬 ¿En qué podemos ayudarte?</label>
                    <textarea name="message" required className="w-full border border-slate-200 rounded-xl p-3.5 focus:ring-2 focus:ring-accent-500 outline-none h-36 transition-shadow hover:border-accent-200 bg-slate-50 focus:bg-white resize-y" placeholder="Escribe tu mensaje o propuesta aquí..."></textarea>
                </div>
                <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 px-6 rounded-xl hover:bg-accent-600 transition-colors shadow-lg shadow-slate-900/10 active:scale-[0.98]">
                    🚀 Enviar Mensaje
                </button>
            </form>
        </div>
    );
};
