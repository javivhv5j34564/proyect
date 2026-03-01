import { useState, useMemo, useEffect } from 'react';
import { Search, Sparkles, X, ExternalLink, ChevronRight, Zap, Flame, Clock, ChevronDown, TrendingUp, Lightbulb, Brain, Bookmark, ChevronUp, BookOpen, ArrowRight, ArrowDown, ArrowUp, Menu, Search as SearchIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { tools, categories } from '../data';
import { AdSensePlaceholder } from '../components/AdSensePlaceholder';
import { useSEO } from '../hooks/useSEO';

const top3Ids = ['chatgpt', 'gemini', 'copilot'];
const recentIds = ['claude', 'runway', 'kling'];

const aiFacts = [
  {
    id: 'fact-1',
    icon: <TrendingUp className="w-6 h-6 text-primary-500" />,
    title: "Impulsa tu Productividad",
    description: "Automatiza tareas repetitivas y enfócate en lo que realmente importa.",
    fact: "Dato: El 64% de los profesionales reportan un aumento en su eficiencia diaria al usar IA."
  },
  {
    id: 'fact-2',
    icon: <Lightbulb className="w-6 h-6 text-amber-500" />,
    title: "Desata tu Creatividad",
    description: "Supera el síndrome de la hoja en blanco con generación ilimitada de ideas.",
    fact: "Dato: La IA puede reducir el tiempo del proceso de ideación hasta en un 40%."
  },
  {
    id: 'fact-3',
    icon: <Brain className="w-6 h-6 text-indigo-500" />,
    title: "Decisiones Inteligentes",
    description: "Accede a respuestas complejas de forma estructurada y simple en segundos.",
    fact: "Dato: Los asistentes de IA mejoran la retención y la toma de decisiones informada."
  }
];

const blogPosts = [
  {
    id: 'blog-1',
    title: 'Las 10 Mejores Inteligencias Artificiales Gratis en 2026',
    category: 'Tendencias',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80',
    readTime: '1 min',
    excerpt: 'Descubre nuestra lista actualizada con las herramientas IA más potentes que puedes usar hoy mismo sin pagar ni un céntimo, desde edición hasta programación.',
    content: 'La inteligencia artificial ha evolucionado drásticamente. Lo que antes era exclusivo para grandes corporaciones, hoy está disponible gratis en el navegador. Las mejores herramientas gratis hoy en día te permiten automatizar horas de trabajo: generadores de texto como Claude 3.5 Sonnet o generadores de imágenes como Leonardo AI.\n\nAprovechar estos planes "Freemium" puede escalar tu productividad sin gastar un céntimo. Explora nuestro directorio completo y encuentra la herramienta perfecta para ti y tu equipo. La clave ya no es trabajar más duro, sino delegar lo monótono a modelos de lenguaje mientras tú dedicas tu energía a la estrategia y diseño a nivel humano.'
  },
  {
    id: 'blog-2',
    title: 'Generadores de Imágenes con IA Sin Registro: Guía Definitiva',
    category: 'Diseño Visual',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=600&q=80',
    readTime: '1 min',
    excerpt: 'Crea logos, avatares y arte hiperrealista en segundos. Te enseñamos qué plataformas no piden tarjeta de crédito ni crear cuenta.',
    content: 'Si necesitas generar una imagen rápido para una presentación o un prototipo, no tienes tiempo para pasarelas de pago ni cuentas obligatorias. Herramientas open-source basadas en Stable Diffusion y webs como Craiyon o Fal.ai permiten generar arte increíble desde la primera pantalla.\n\nSolo debes escribir un "prompt" descriptivo, y en segundos obtendrás resultados en alta resolución perfectos para redes sociales y páginas web. Muchas de estas webs están financiadas mediante publicidad sutil, permitiéndote iterar una decena de veces totalmente gratis cada día. Es momento de sustituir las fotografías pagadas por resultados irrepetibles.'
  },
  {
    id: 'blog-3',
    title: 'Mejores IAs para Redactar Textos y Ensayos que no Parecen Robots',
    category: 'Copywriting',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    readTime: '1 min',
    excerpt: 'Aprende a humanizar el contenido de ChatGPT o Claude. Analizamos las IA de redacción que aprueban todos los detectores de plagio.',
    content: 'El mayor problema del contenido generado por IA es ese tono genérico, aburrido y "robótico" caracterizado por usar palabras rebuscadas en cada párrafo. Descubre estrategias para humanizar tu texto pidiendo al modelo de IA que actúe bajo un rol específico, usando jerga local y frases más coloquiales cortas.\n\nHerramientas como Jasper o QuillBot están pensadas exactamente para dar fluidez y adaptar la voz de la marca a todos tus correos, posts de blogs o ensayos universitarios, y saltarse los detectores de plagio más estrictos (AI Checkers). Si buscas en nuestro directorio la categoría "Escritura y Productividad" encontrarás los líderes del mercado para dotar de alma sintética a tus escritos.'
  },
  {
    id: 'blog-4',
    title: 'Cómo Crear Presentaciones en PowerPoint en Segundos con IA Gratis',
    category: 'Productividad',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=600&q=80',
    readTime: '1 min',
    excerpt: 'Dile adiós al lienzo en blanco. Genera diapositivas completas con diseño profesional y animaciones usando solo una frase.',
    content: 'Tener una reunión en 30 minutos y no tener el PowerPoint hecho ya no es motivo de pánico. Aplicaciones modernas como Gamma App o Tome te permiten redactar el tema de tu presentación y en menos de un minuto analizan tus datos para generar más de diez diapositivas con tablas, esquemas, imágenes e información real estructurada.\n\nLuego solo tienes que exportar a PDF o archivo .ppt y lucirte en el trabajo ahorrando horas de insomnio. Atrás quedaron aquellos días en los que pasabas 40 minutos intentando alinear elementos y textos en un canvas infinito. Selecciona tu tema decorativo y deja que el asistente haga la magia aburrida.'
  },
  {
    id: 'blog-5',
    title: 'Mejores Prompts de ChatGPT para Programadores y Estudiantes',
    category: 'Ingeniería de Prompts',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    readTime: '1 min',
    excerpt: 'Optimiza tu código y resuelve bugs en segundos. Aprende a estructurar instrucciones para sacar el máximo rendimiento a GPT-4 y Claude.',
    content: 'La diferencia entre un resultado mediocre y un código listo para producción radica en cómo te comunicas con la Inteligencia Artificial. La "Ingeniería de Prompts" se ha convertido en la habilidad más demandada del mercado tech.\n\nEn lugar de pedir "escribe un código en Python", prueba asignarle un rol de experto Senior, detallar los casos límite de tu función y pedirle que documente cada línea. Plataformas como ChatGPT o Gemini pueden refactorizar bases de datos enteras, explicar errores lógicos complejos o escribir tests unitarios si les proporcionas el contexto adecuado. Domina el arte de hablar con las máquinas.'
  },
  {
    id: 'blog-6',
    title: '10 Alternativas Gratis a Midjourney para Generar Imágenes',
    category: 'Diseño e Ilustración',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=600&q=80',
    readTime: '1 min',
    excerpt: 'No pagues suscripciones mensuales. Descubre los mejores generadores de arte por inteligencia artificial de código abierto o con planes freemium.',
    content: 'Aunque Midjourney lideró la revolución del arte generativo, sus planes de pago ya no son la única opción para obtener imágenes fotorrealistas. Modelos como Stable Diffusion 3 (SD3) han democratizado el diseño visual a niveles asombrosos.\n\nHoy puedes acceder a webs gratuitas que te permiten aplicar estilos, controlar la pose de personajes, y generar texturas hiperrealistas sin requerir herramientas complejas. Si eres creador de contenido o emprendedor, explorar las alternativas en nuestra categoría de Generación Visual reducirá tus costos de diseño enormemente.'
  },
  {
    id: 'blog-7',
    title: 'Automatiza tu Emprendimiento con Herramientas de Inteligencia Artificial',
    category: 'Negocios y Productividad',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    readTime: '1 min',
    excerpt: 'Casos de uso reales para Pymes: automatiza la atención al cliente, integra agentes de IA en tus ventas y clasifica datos masivos sin programar.',
    content: 'Implementar la IA en una pequeña empresa o startup ya no requiere un equipo de ingenieros. Existen soluciones "No-Code" e integraciones como Make o Zapier que conectan modelos de lenguaje directamente al corazón de tus finanzas y marketing.\n\nDesde chatbots entrenados con el PDF de tu catálogo que atienden clientes 24/7, hasta sistemas que redactan propuestas de venta automáticamente tras cada reunión. El Retorno de Inversión de estas herramientas es inmediato al delegar microtareas. Descubre las mejores opciones B2B en el directorio y multiplica la eficiencia de tu equipo laboral.'
  },
  {
    id: 'blog-8',
    title: 'Guía Definitiva de SEO e IA: Posiciona tu Sitio Web en Google',
    category: 'Marketing Digital',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    readTime: '1 min',
    excerpt: 'Aprende a ejecutar estrategias sólidas de posicionamiento web: meta-etiquetas, clusters de contenido y análisis de la competencia usando herramientas free.',
    content: 'El SEO o posicionamiento en buscadores es un juego de datos. Herramientas basadas en inteligencia artificial son ahora capaces de auditar la arquitectura de una web entera en minutos, identificando oportunidades de mejora y redactando las optimizaciones necesarias (On-Page SEO).\n\nSin embargo, la clave frente a cambios de algoritmos masivos es no generar "Spam". Usa la mente analítica del bot para encontrar palabras clave transaccionales (Keywords LSI) y para armar los títulos clave (H1, H2), aportando tu experiencia humana real para generar confianza (E-E-A-T). Apaláncate en las herramientas de "Marketing" de nuestra plataforma.'
  }
];

// Tool card extracted for reuse
const ToolCard = ({ tool, onClick, customBgClass = "bg-white", borderClass = "border-slate-200", isBookmarked, onBookmark, upvotes, hasUpvoted, onUpvote }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    onClick={() => onClick(tool)}
    className={`group ${customBgClass} rounded-2xl p-4 md:p-6 border ${borderClass} hover:border-accent-300 shadow-sm hover:shadow-xl hover:shadow-accent-500/10 transition-all cursor-pointer flex flex-col h-full relative overflow-hidden`}
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 via-accent-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

    <button
      onClick={(e) => onBookmark(e, tool.id)}
      className="absolute top-4 right-4 md:top-5 md:right-5 z-20 p-1.5 md:p-2 rounded-full bg-slate-50/80 hover:bg-slate-100 backdrop-blur border border-slate-200 text-slate-400 hover:text-accent-500 transition-all opacity-100 shadow-sm"
      title="Guardar en favoritos"
    >
      <Bookmark className={`w-3.5 h-3.5 md:w-4 md:h-4 ${isBookmarked ? 'fill-accent-500 text-accent-500' : ''}`} />
    </button>

    <div className="flex justify-between items-start mb-3 md:mb-4 relative z-10">
      <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl flex items-center justify-center bg-white border border-slate-100 overflow-hidden group-hover:scale-105 transition-transform shadow-sm text-2xl md:text-3xl">
        {tool.emoji || '🤖'}
      </div>
    </div>

    <div className="mb-2 relative z-10">
      <span className="inline-flex text-[9px] md:text-[10px] font-bold px-2 py-0.5 md:px-2.5 rounded-full bg-slate-100 text-slate-600 uppercase tracking-wider mb-1 md:mb-2">
        {tool.sector}
      </span>
      <Link to={`/herramienta/${tool.id}`} onClick={(e) => e.stopPropagation()} className="block">
        <h3 className="text-lg md:text-xl font-bold group-hover:text-accent-600 transition-colors text-slate-900 leading-tight pr-8 hover:underline decoration-accent-500/50 underline-offset-4">{tool.name}</h3>
      </Link>
    </div>

    <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-4 md:mb-5 flex-grow line-clamp-3 relative z-10">
      {tool.description}
    </p>

    <div className="mt-auto pt-3 md:pt-4 border-t border-slate-200/50 flex items-center justify-between relative z-10">
      <button
        onClick={(e) => onUpvote(e, tool.id)}
        className={`flex items-center gap-1 md:gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg border text-xs md:text-sm font-bold transition-all z-20 shadow-sm ${hasUpvoted ? 'bg-accent-500 border-accent-500 text-white hover:bg-accent-600' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
        title="Votar herramienta"
      >
        <ChevronUp className={`w-3 h-3 md:w-4 md:h-4 ${hasUpvoted ? 'text-white' : 'text-slate-400'}`} />
        {upvotes || 0}
      </button>

      <div className="flex items-center gap-2 md:gap-3">
        <div className="flex items-center gap-1 md:gap-1.5 min-w-0">
          <Zap className={`w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0 ${tool.isFullyFree ? 'text-green-500' : 'text-amber-500'}`} />
          <span className={`text-[10px] sm:text-xs font-semibold truncate ${tool.isFullyFree ? 'text-green-600' : 'text-amber-600'}`} style={{ maxWidth: '90px' }}>
            {tool.freeTierDetails}
          </span>
        </div>
        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-accent-50 group-hover:text-accent-600 group-hover:border-accent-200 transition-colors shadow-sm flex-shrink-0">
          <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
        </div>
      </div>
    </div>
  </motion.div>
);

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedPricing, setSelectedPricing] = useState('Todos');
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoadingSub, setIsLoadingSub] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [displayCount, setDisplayCount] = useState(24);
  const [displayCategoryCount, setDisplayCategoryCount] = useState(3);

  useEffect(() => {
    setDisplayCount(24);
    setDisplayCategoryCount(3);
  }, [searchTerm, selectedCategory, selectedPricing, showFavorites]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  useSEO({
    title: 'Directorio de Inteligencia Artificial (IA) | Inicio',
    description: 'Explora nuestra colección curada de cientos de herramientas de Inteligencia Artificial gratis y freemium, organizadas por categoría para disparar tu productividad.'
  });

  // Persistence State
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('ai_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const [upvotes, setUpvotes] = useState(() => {
    const saved = localStorage.getItem('ai_upvotes');
    if (saved) return JSON.parse(saved);
    const initial = {};
    tools.forEach(t => { initial[t.id] = 0; });
    return initial;
  });

  const [userUpvoted, setUserUpvoted] = useState(() => {
    const saved = localStorage.getItem('ai_user_upvotes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => { localStorage.setItem('ai_bookmarks', JSON.stringify(bookmarks)); }, [bookmarks]);
  useEffect(() => { localStorage.setItem('ai_upvotes', JSON.stringify(upvotes)); }, [upvotes]);
  useEffect(() => { localStorage.setItem('ai_user_upvotes', JSON.stringify(userUpvoted)); }, [userUpvoted]);

  const toggleBookmark = (e, id) => {
    e.stopPropagation();
    setBookmarks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  const handleUpvote = (e, id) => {
    e.stopPropagation();
    if (userUpvoted.includes(id)) {
      setUserUpvoted(prev => prev.filter(u => u !== id));
      setUpvotes(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 1) - 1) }));
    } else {
      setUserUpvoted(prev => [...prev, id]);
      setUpvotes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsLoadingSub(true);
    setTimeout(() => {
      setIsLoadingSub(false);
      setIsSubscribed(true);
    }, 1000);
  };

  // Filter & Sort Logic
  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const searchStr = searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const nName = tool.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const nDesc = tool.description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const nLong = (tool.longDescription || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const nSector = tool.sector.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      const keywords = {
        'programacion': ['programar', 'codigo', 'codificar', 'web', 'desarrollo', 'app', 'python', 'javascript'],
        'imagen y diseno': ['fotos', 'foto', 'imagenes', 'imagen', 'dibujar', 'diseno', 'arte', 'logo', 'logotipos', 'dibujos'],
        'escritura y productividad': ['escribir', 'texto', 'redactar', 'resumir', 'ensayo', 'tarea', 'correos', 'email'],
        'video y animacion': ['video', 'animacion', 'cortometraje', 'videos', 'editar', 'clips', 'pelicula'],
        'audio y musica': ['musica', 'audio', 'cancion', 'canciones', 'voz', 'cantar', 'ritmo', 'melodia'],
        'chatbots y asistentes': ['hablar', 'conversar', 'chat', 'preguntar', 'dudas', 'ayuda'],
        'investigacion y datos': ['buscar', 'informacion', 'apuntes', 'pdf', 'excel', 'graficos', 'estudiar']
      };

      let matchesKeywords = false;
      if (searchStr.length > 2) {
        for (const [keySector, terms] of Object.entries(keywords)) {
          if (terms.some(term => searchStr.includes(term))) {
            if (nSector.includes(keySector)) {
              matchesKeywords = true;
              break;
            }
          }
        }
      }

      const matchesSearch = searchStr === '' ||
        nName.includes(searchStr) ||
        nDesc.includes(searchStr) ||
        nLong.includes(searchStr) ||
        nSector.includes(searchStr) ||
        matchesKeywords;

      const matchesCategory = selectedCategory === 'Todos' || tool.sector === selectedCategory;
      const matchesFavorites = showFavorites ? bookmarks.includes(tool.id) : true;

      let matchesPricing = true;
      if (selectedPricing === 'Gratis') {
        matchesPricing = tool.isFullyFree === true;
      } else if (selectedPricing === 'Freemium') {
        matchesPricing = tool.isFullyFree === false;
      }

      return matchesSearch && matchesCategory && matchesFavorites && matchesPricing;
    }).sort((a, b) => {
      // Sort by upvotes to emulate Product Hunt style
      return (upvotes[b.id] || 0) - (upvotes[a.id] || 0);
    });
  }, [searchTerm, selectedCategory, selectedPricing, showFavorites, bookmarks, upvotes]);

  const showSections = searchTerm === '' && selectedCategory === 'Todos' && selectedPricing === 'Todos' && !showFavorites;

  // Sorting explicit sections by upvotes too
  const top3Tools = tools.filter(t => top3Ids.includes(t.id)).sort((a, b) => (upvotes[b.id] || 0) - (upvotes[a.id] || 0));
  const recentTools = tools.filter(t => recentIds.includes(t.id)).sort((a, b) => (upvotes[b.id] || 0) - (upvotes[a.id] || 0));
  const otherTools = tools.filter(t => !top3Ids.includes(t.id) && !recentIds.includes(t.id)).sort((a, b) => (upvotes[b.id] || 0) - (upvotes[a.id] || 0));

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (selectedTool || selectedBlogPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedTool, selectedBlogPost]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-slate-200/50 px-4 py-3 md:px-6 md:py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 relative">
          <div className={`flex w-full md:w-auto items-center justify-between gap-2 ${isSearchFocused ? 'hidden md:flex' : 'flex'}`}>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('top')}>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-primary-500 via-accent-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-accent-500/20 flex-shrink-0">
                <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold tracking-tight">Directorio AI</h1>
                <p className="text-[10px] md:text-xs text-slate-500 font-medium tracking-wide uppercase hidden sm:block">Las mejores herramientas</p>
              </div>
            </div>
            <button
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-6 font-semibold text-sm text-slate-600">
            <button onClick={() => scrollToSection('herramientas')} className="hover:text-accent-600 transition-colors">Directorio</button>
            <button onClick={() => scrollToSection('blog-section')} className="hover:text-accent-600 transition-colors">Guías y Blog</button>
            <button onClick={() => scrollToSection('footer-contacto')} className="hover:text-accent-600 transition-colors">Contacto</button>
          </nav>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="md:hidden absolute top-full left-0 w-full h-screen bg-slate-900/60 backdrop-blur-sm z-30"
                />
                <motion.nav
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="md:hidden flex flex-col w-full overflow-hidden absolute top-full left-0 bg-white/95 shadow-xl rounded-b-2xl border-t border-slate-100 z-40"
                >
                  <div className="flex flex-col p-4 gap-2">
                    <button onClick={() => scrollToSection('herramientas')} className="w-full text-center px-4 py-3 font-semibold text-slate-700 bg-slate-50 active:bg-slate-100 rounded-xl transition-all border border-slate-100">Directorio de IAs</button>
                    <button onClick={() => scrollToSection('blog-section')} className="w-full text-center px-4 py-3 font-semibold text-slate-700 bg-slate-50 active:bg-slate-100 rounded-xl transition-all border border-slate-100">Guías y Blog</button>
                    <button onClick={() => scrollToSection('footer-contacto')} className="w-full text-center px-4 py-3 font-semibold text-slate-700 bg-slate-50 active:bg-slate-100 rounded-xl transition-all border border-slate-100">Contacto</button>
                  </div>
                </motion.nav>
              </>
            )}
          </AnimatePresence>

          <div className="relative w-full md:w-auto md:min-w-[300px] lg:min-w-[400px] group flex items-center">
            {isSearchFocused && (
              <button
                className="md:hidden mr-2 p-2 text-slate-500 hover:bg-slate-100 rounded-full"
                onClick={() => setIsSearchFocused(false)}
              >
                <ArrowRight className="w-5 h-5 rotate-180" />
              </button>
            )}
            <div className="relative w-full">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-accent-500 transition-colors" />
              <input
                type="text"
                placeholder="Buscar (ej: programar, hacer logos...)"
                value={searchTerm}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => {
                  if (!searchTerm) setIsSearchFocused(false);
                }}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-full py-2.5 pl-10 pr-4 outline-none focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all shadow-sm group-hover:shadow-md text-sm md:text-base"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-10">
        {/* Hero Section */}
        <section className="relative flex flex-col justify-center text-center max-w-5xl mx-auto pt-10 pb-8 px-4 sm:pt-16 sm:pb-12 sm:px-8 min-h-[45vh] md:min-h-[60vh] rounded-3xl md:rounded-[2rem] overflow-hidden shadow-2xl mb-8 group">
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-1000 mix-blend-multiply"
            >
              <source src="https://cdn.pixabay.com/video/2021/08/25/86270-593005898_large.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-slate-50/95 to-slate-50 z-10"></div>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative z-20">
            <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/60 backdrop-blur-md border border-accent-200/50 text-accent-700 text-xs md:text-sm font-bold mb-6 md:mb-8 shadow-sm">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
              <span>Directorio gratuito actualizado 2026</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight md:tracking-tighter leading-[1.05]">
              Descubre la <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-accent-500 to-indigo-600">IA ideal</span> <br className="hidden sm:block" /> para tu próximo proyecto
            </h1>
            <p className="text-base sm:text-lg md:text-2xl text-slate-600 font-medium mb-8 md:mb-10 leading-relaxed md:leading-relaxed max-w-3xl mx-auto px-2">
              Explora nuestra colección curada de cientos de herramientas de Inteligencia Artificial gratis y freemium, organizadas por categoría para disparar tu productividad.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 mb-4 md:mt-8">
              <button
                onClick={() => scrollToSection('blog-section')}
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 md:py-4 md:px-8 rounded-full transition-all shadow-lg hover:shadow-xl active:scale-95 text-sm md:text-base flex items-center justify-center gap-2"
              >
                Ver Artículos y Guías <ArrowDown className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button
                onClick={() => scrollToSection('herramientas')}
                className="w-full sm:w-auto bg-white/80 backdrop-blur border border-slate-200 hover:border-accent-300 text-slate-700 font-bold py-3.5 px-6 md:py-4 md:px-8 rounded-full transition-all shadow-sm hover:shadow-md hover:text-accent-600 active:scale-95 text-sm md:text-base flex items-center justify-center gap-2"
              >
                Explorar Directorio
              </button>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 10, 0] }}
              transition={{ delay: 1, duration: 2, repeat: Infinity }}
              className="hidden sm:flex justify-center mt-2 md:mt-4 text-accent-500/80 cursor-pointer w-fit mx-auto"
              onClick={() => scrollToSection('herramientas')}
            >
              <ChevronDown className="w-10 h-10" />
            </motion.div>
          </motion.div>
        </section>

        <AdSensePlaceholder type="horizontal" />

        {/* AI Facts & Advantages Section */}
        <section className="mb-12 mt-10 md:mb-16 md:mt-12">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight mb-2 md:mb-3">
              ¿Por qué usar Inteligencia Artificial hoy?
            </h2>
            <p className="text-slate-500 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">Ventajas clave y datos sorprendentes que transformarán tu forma de trabajar</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {aiFacts.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-accent-500/10 transition-all group relative overflow-hidden flex flex-col h-full"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-50 to-slate-100 rounded-bl-full -z-0 opacity-50 group-hover:scale-110 transition-transform duration-500"></div>

                <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative z-10">
                  {item.icon}
                </div>

                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3 group-hover:text-accent-600 transition-colors relative z-10">
                  {item.title}
                </h3>

                <p className="text-slate-600 text-xs md:text-sm mb-4 md:mb-6 leading-relaxed flex-grow relative z-10">
                  {item.description}
                </p>

                <div className="pt-4 md:pt-5 border-t border-slate-100 relative z-10 mt-auto">
                  <div className="flex items-start gap-2.5">
                    <div className="bg-accent-50 p-1.5 rounded-full flex-shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-accent-500" />
                    </div>
                    <p className="text-xs md:text-sm font-medium text-slate-700 leading-relaxed italic">
                      {item.fact}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Decorative Abstract Image 1 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full h-32 md:h-48 rounded-3xl overflow-hidden my-12 relative shadow-sm group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/60 via-accent-900/40 to-indigo-900/60 z-10 mix-blend-multiply border border-white/10 rounded-3xl transition-opacity group-hover:opacity-80"></div>
          <img
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200"
            alt="AI Brain technology"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <p className="text-white/90 font-medium tracking-[0.2em] uppercase text-xs md:text-sm drop-shadow-md">El futuro está aquí</p>
          </div>
        </motion.div>

        {/* Endless Marquee Carousel / Carrusel de IAs */}
        <section className="relative overflow-hidden mb-12 py-4">
          {/* Faders for smooth edges */}
          <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
          <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-slate-50 to-transparent z-10"></div>

          <div className="flex animate-marquee whitespace-nowrap gap-3 md:gap-4 w-max hover:[animation-play-state:paused] group">
            {[...tools, ...tools].map((tool, index) => (
              <div
                key={`${tool.id}-${index}`}
                onClick={() => setSelectedTool(tool)}
                className="flex items-center gap-2 md:gap-3 bg-white px-3 py-2 md:px-5 md:py-3 rounded-xl md:rounded-2xl border border-slate-200/60 shadow-sm cursor-pointer hover:border-accent-300 hover:shadow-md transition-all flex-shrink-0"
              >
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg overflow-hidden bg-slate-50 flex items-center justify-center flex-shrink-0 text-base md:text-xl">
                  {tool.emoji || '🤖'}
                </div>
                <span className="text-xs md:text-sm font-bold text-slate-700">{tool.name}</span>
                <span className="text-[9px] md:text-[10px] font-semibold px-1.5 py-0.5 md:px-2 md:py-0.5 rounded-full bg-slate-100 text-slate-500 uppercase tracking-wider">{tool.sector}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Categories / Filters */}
        <motion.section
          id="herramientas"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex flex-col gap-4 scroll-mt-24"
        >
          {/* Top Row: Precio y Favoritos */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowFavorites(!showFavorites)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-sm ${showFavorites
                ? 'bg-amber-100 text-amber-700 border-amber-200 border ring-2 ring-amber-300/50'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600'
                }`}
            >
              <Bookmark className={`w-4 h-4 ${showFavorites ? 'fill-amber-500 text-amber-500' : ''}`} />
              Favoritos
            </button>
            <div className="w-px h-6 bg-slate-200 mx-1 hidden sm:block"></div>

            <span className="text-sm font-bold text-slate-500 ml-1 mr-1 flex items-center gap-1"><Zap className="w-4 h-4 text-amber-400" /> Precio:</span>
            {['Todos', 'Gratis', 'Freemium'].map(price => (
              <button
                key={price}
                onClick={() => { setSelectedPricing(price); setShowFavorites(false); }}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${selectedPricing === price && !showFavorites
                  ? 'bg-slate-800 text-white shadow-md scale-105'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
              >
                {price}
              </button>
            ))}
          </div>

          <div className="w-full h-px bg-slate-200/60 my-1"></div>

          {/* Bottom Row: Categorías */}
          <div className="flex overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap items-center gap-2 scrollbar-hide no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setShowFavorites(false); }}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${selectedCategory === cat && !showFavorites
                  ? 'bg-accent-600 text-white shadow-md shadow-accent-500/20 scale-105'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-accent-200 hover:bg-accent-50 hover:text-accent-600'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.section>

        {/* Dynamic Grids */}
        {filteredTools.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-700">No encontramos herramientas</h3>
            <p className="text-slate-500">Prueba ajustando tu búsqueda o categoría.</p>
          </div>
        ) : (
          <div>
            {!showSections ? (
              <div className="flex flex-col">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  <AnimatePresence>
                    {filteredTools.slice(0, displayCount).map((tool) => (
                      <ToolCard
                        key={tool.id}
                        tool={tool}
                        onClick={setSelectedTool}
                        isBookmarked={bookmarks.includes(tool.id)}
                        onBookmark={toggleBookmark}
                        upvotes={upvotes[tool.id]}
                        hasUpvoted={userUpvoted.includes(tool.id)}
                        onUpvote={handleUpvote}
                      />
                    ))}
                  </AnimatePresence>
                </div>
                {displayCount < filteredTools.length && (
                  <div className="flex justify-center mt-8 md:mt-10">
                    <button
                      onClick={() => setDisplayCount(prev => prev + 24)}
                      className="bg-white border border-slate-200 hover:border-accent-300 text-slate-700 font-bold py-3 px-8 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-2"
                    >
                      <SearchIcon className="w-4 h-4 text-accent-500" />
                      Cargar {Math.min(24, filteredTools.length - displayCount)} más
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-12">
                {/* Top 3 Section */}
                <section>
                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-2 mb-4 md:mb-6">
                    <Flame className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
                    <h2 className="text-xl md:text-2xl font-bold text-slate-800">Top 3 Más Usadas</h2>
                  </motion.div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {top3Tools.map((tool) => (
                      <ToolCard
                        key={tool.id}
                        tool={tool}
                        onClick={setSelectedTool}
                        customBgClass="bg-gradient-to-br from-amber-50 to-orange-50/50"
                        borderClass="border-amber-200/60"
                        isBookmarked={bookmarks.includes(tool.id)}
                        onBookmark={toggleBookmark}
                        upvotes={upvotes[tool.id]}
                        hasUpvoted={userUpvoted.includes(tool.id)}
                        onUpvote={handleUpvote}
                      />
                    ))}
                  </div>
                </section>

                {/* Recent AI Section */}
                <section>
                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-2 mb-4 md:mb-6">
                    <Clock className="w-5 h-5 md:w-6 md:h-6 text-accent-500" />
                    <h2 className="text-xl md:text-2xl font-bold text-slate-800">Añadidas Recientemente</h2>
                  </motion.div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {recentTools.map((tool) => (
                      <ToolCard
                        key={tool.id}
                        tool={tool}
                        onClick={setSelectedTool}
                        customBgClass="bg-gradient-to-br from-fuchsia-50 to-purple-50/50"
                        borderClass="border-fuchsia-200/60"
                        isBookmarked={bookmarks.includes(tool.id)}
                        onBookmark={toggleBookmark}
                        upvotes={upvotes[tool.id]}
                        hasUpvoted={userUpvoted.includes(tool.id)}
                        onUpvote={handleUpvote}
                      />
                    ))}
                  </div>
                </section>

                {/* Banner Intermedio 2 */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-32 md:h-48 rounded-3xl overflow-hidden my-8 relative shadow-sm group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-900/60 via-indigo-900/40 to-primary-900/60 z-10 mix-blend-multiply border border-white/10 rounded-3xl transition-opacity group-hover:opacity-80"></div>
                  <img
                    src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80&w=1200"
                    alt="Digital Evolution"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <p className="text-white/90 font-medium tracking-[0.2em] uppercase text-xs md:text-sm drop-shadow-md">Evolución Digital</p>
                  </div>
                </motion.div>

                {/* Categorized Tools (Rest of Tools) */}
                {categories.filter(c => c !== 'Todos').slice(0, displayCategoryCount).map((category, index) => {
                  const categoryTools = otherTools.filter(t => t.sector === category);
                  if (categoryTools.length === 0) return null;

                  return (
                    <div key={category}>
                      {index === 2 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.8 }}
                          className="w-full h-32 md:h-48 rounded-3xl overflow-hidden my-10 relative shadow-sm group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-900/60 via-purple-900/40 to-indigo-900/60 z-10 mix-blend-multiply border border-white/10 rounded-3xl transition-opacity group-hover:opacity-80"></div>
                          <img
                            src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200"
                            alt="Data Matrix Cyber"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex items-center justify-center z-20">
                            <p className="text-white/90 font-medium tracking-[0.2em] uppercase text-xs md:text-sm drop-shadow-md">Precisión y Eficiencia</p>
                          </div>
                        </motion.div>
                      )}
                      {index === 5 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.8 }}
                          className="w-full h-32 md:h-48 rounded-3xl overflow-hidden my-10 relative shadow-sm group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-accent-900/60 via-indigo-900/40 to-primary-900/60 z-10 mix-blend-multiply border border-white/10 rounded-3xl transition-opacity group-hover:opacity-80"></div>
                          <img
                            src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1200"
                            alt="Creative Mind"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex items-center justify-center z-20">
                            <p className="text-white/90 font-medium tracking-[0.2em] uppercase text-xs md:text-sm drop-shadow-md">Creatividad Ilimitada</p>
                          </div>
                        </motion.div>
                      )}
                      {index === 8 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.8 }}
                          className="w-full h-32 md:h-48 rounded-3xl overflow-hidden my-10 relative shadow-sm group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-emerald-900/40 to-primary-900/60 z-10 mix-blend-multiply border border-white/10 rounded-3xl transition-opacity group-hover:opacity-80"></div>
                          <img
                            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200"
                            alt="Circuit Board"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex items-center justify-center z-20">
                            <p className="text-white/90 font-medium tracking-[0.2em] uppercase text-xs md:text-sm drop-shadow-md">Conexión Global</p>
                          </div>
                        </motion.div>
                      )}
                      {index === 10 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.8 }}
                          className="w-full h-32 md:h-48 rounded-3xl overflow-hidden my-10 relative shadow-sm group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/60 via-blue-900/40 to-indigo-900/60 z-10 mix-blend-multiply border border-white/10 rounded-3xl transition-opacity group-hover:opacity-80"></div>
                          <img
                            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"
                            alt="Tech Space Networking"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex items-center justify-center z-20">
                            <p className="text-white/90 font-medium tracking-[0.2em] uppercase text-xs md:text-sm drop-shadow-md">Potencia Sin Límites</p>
                          </div>
                        </motion.div>
                      )}
                      {index === 12 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.8 }}
                          className="w-full h-32 md:h-48 rounded-3xl overflow-hidden my-10 relative shadow-sm group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/60 via-orange-900/40 to-red-900/60 z-10 mix-blend-multiply border border-white/10 rounded-3xl transition-opacity group-hover:opacity-80"></div>
                          <img
                            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200"
                            alt="Data Neon Abstract"
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex items-center justify-center z-20">
                            <p className="text-white/90 font-medium tracking-[0.2em] uppercase text-xs md:text-sm drop-shadow-md">Soluciones Prácticas</p>
                          </div>
                        </motion.div>
                      )}
                      <section className="pt-2 md:pt-4 mt-6 md:mt-8 first:mt-0">
                        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-2 mb-4 md:mb-6 border-b border-slate-200/60 pb-2 md:pb-3">
                          <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-accent-500" />
                          <h2 className="text-xl md:text-2xl font-bold text-slate-800">{category}</h2>
                        </motion.div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                          {categoryTools.map((tool) => (
                            <ToolCard
                              key={tool.id}
                              tool={tool}
                              onClick={setSelectedTool}
                              isBookmarked={bookmarks.includes(tool.id)}
                              onBookmark={toggleBookmark}
                              upvotes={upvotes[tool.id]}
                              hasUpvoted={userUpvoted.includes(tool.id)}
                              onUpvote={handleUpvote}
                            />
                          ))}
                        </div>
                      </section>
                    </div>
                  );
                })}

                {/* Load More Categories Button */}
                {displayCategoryCount < categories.filter(c => c !== 'Todos').length && (
                  <div className="flex justify-center pt-6 pb-6 border-t border-slate-100">
                    <button
                      onClick={() => setDisplayCategoryCount(prev => prev + 3)}
                      className="bg-white border border-slate-200 hover:border-accent-300 text-slate-700 font-bold py-3 px-8 rounded-full shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-accent-500" />
                      Cargar más categorías
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Decorative Abstract Image 2 */}
        <motion.div
          initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full h-40 md:h-64 rounded-3xl overflow-hidden mt-16 relative shadow-md group"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10 transition-opacity group-hover:opacity-80 border border-white/10 rounded-3xl"></div>
          <img
            src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=1200"
            alt="AI abstract technology"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-10 z-20">
            <p className="text-white font-bold text-xl md:text-3xl drop-shadow-lg">Universo de Posibilidades.</p>
            <p className="text-white/80 text-sm md:text-base mt-1">Abre tu mente a la revolución de herramientas.</p>
          </div>
        </motion.div>

        {/* SEO Blog Cards Section */}
        <motion.section
          id="blog-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="mt-20 mb-10 scroll-mt-24"
        >
          <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
            <div className="bg-accent-100 p-2 md:p-2.5 rounded-xl">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-accent-600" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Guías y Recursos TOP</h2>
              <p className="text-slate-500 text-xs md:text-sm mt-1">Descubre artículos y tutoriales para exprimir al máximo la inteligencia artificial.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedBlogPost(post)}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-accent-500/10 hover:border-accent-200 transition-all group flex flex-col h-full cursor-pointer"
              >
                <div className="h-40 overflow-hidden relative">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-slate-800 text-[10px] font-bold px-2 py-1 rounded-md z-20 uppercase tracking-wider shadow-sm">{post.category}</span>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-tight group-hover:text-accent-600 transition-colors">{post.title}</h3>
                  <p className="text-slate-500 text-xs mb-4 flex-grow line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3">
                    <span className="text-[11px] font-semibold text-slate-400">Lectura de {post.readTime}</span>
                    <ArrowRight className="w-4 h-4 text-accent-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Newsletter / Suscripción (Detalle Final de Valor) */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-20"
        >
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 md:p-12 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-accent-500 rounded-full blur-[100px] opacity-20"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-primary-500 rounded-full blur-[100px] opacity-20"></div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 md:mb-4">No te quedes atrás en la era de la IA</h2>
              <p className="text-slate-300 mb-6 md:mb-8 text-base md:text-lg">
                Únete a más de 10,000 profesionales. Recibe cada semana un resumen con 3 nuevas herramientas de inteligencia artificial que te ahorrarán horas de trabajo.
              </p>
              {isSubscribed ? (
                <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-green-50 font-medium animate-in fade-in slide-in-from-bottom-2">
                  🎉 ¡Gracias por suscribirte! Revisa tu bandeja de entrada pronto.
                </div>
              ) : (
                <form action="https://formsubmit.co/f.javiergg06@gmail.com" method="POST" className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-20">
                  <input type="hidden" name="_next" value={window.location.href} />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_subject" value="Nueva suscripción a la newsletter" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Tu mejor correo electrónico..."
                    className="flex-grow px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all font-medium"
                    required
                  />
                  <button type="submit" className="px-6 py-3.5 bg-accent-500 hover:bg-accent-400 text-white font-bold rounded-xl transition-colors shadow-lg shadow-accent-500/30 whitespace-nowrap active:scale-95 flex items-center justify-center">
                    Suscribirme
                  </button>
                </form>
              )}
              <p className="text-xs text-slate-400 mt-4">Cero spam. Te puedes dar de baja cuando quieras.</p>
            </div>
          </div>
        </motion.section>

        {/* SEO Text Section for Home / AdSense Value */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="mt-16 pt-8 md:mt-24 md:pt-12 border-t border-slate-200"
        >
          <div className="prose prose-base md:prose-lg px-2 md:px-0 max-w-4xl mx-auto text-slate-600">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4 md:mb-6 tracking-tight">Directorio de Inteligencia Artificial Gratis en Español</h2>
            <p className="leading-relaxed">
              Bienvenido al directorio más completo, rápido y rigurosamente curado de <strong>herramientas de Inteligencia Artificial gratis</strong> y freemium del mercado hispanohablante. En un ecosistema donde diariamente nacen cientos de nuevos modelos y aplicaciones impulsadas por IA, encontrar plataformas que verdaderamente sumen valor a tu vida profesional, educación y rutina diaria puede resultar una tarea titánica. Nosotros hacemos ese trabajo por ti.
            </p>
            <h3 className="text-xl md:text-2xl font-bold text-slate-800 mt-6 lg:mt-8 mb-3 md:mb-4">¿Cómo elegir la mejor Inteligencia Artificial para tu proyecto?</h3>
            <p className="leading-relaxed">
              Nuestra plataforma está meticulosamente categorizada por sectores neurálgicos de la industria actual: desde <strong>IA para Escritura y Código</strong>, hasta nichos hiper-específicos como <strong>Moda, Cocina, Finanzas y Gestión de Horarios</strong>. Cada herramienta de Inteligencia Artificial que publicamos pasa por un exigente filtro de calidad humano. Evaluamos exhaustivamente su utilidad real, la calidad de su interfaz, la privacidad de datos y, sobre todo, la generosidad de sus planes gratuitos y modelos de código abierto (Open Source).
            </p>
            <ul className="space-y-3 my-6">
              <li><strong className="text-slate-900">IA para Productividad, Estudio y Trabajo:</strong> Maximiza tu eficiencia con potentes Asistentes Inteligentes y chatbots conversacionales como <em>ChatGPT (OpenAI), Claude (Anthropic), Gemini (Google)</em> o soluciones avanzadas de investigación como <em>NotebookLM</em> y <em>Perplexity AI</em>.</li>
              <li><strong className="text-slate-900">Generación Multimedia y Creatividad:</strong> Accede a listas exclusivas de Generadores de Imágenes por IA que te permitirán diseñar con acabado profesional en segundos (<em>Flux, Midjourney, Leonardo AI</em>), así como innovadores generadores de video (<em>Runway, Kling AI</em>) y plataformas para componer piezas musicales y de audio impecables sin necesidad de conocimientos previos de edición.</li>
            </ul>
            <p className="leading-relaxed">
              Nuestro objetivo primordial es <strong>democratizar el acceso a la Inteligencia Artificial</strong>. Aprovecha estas poderosas herramientas para automatizar procesos, reducir drásticamente los tiempos operativos y catapultar tu creatividad artística al siguiente nivel durante este {new Date().getFullYear()}.
            </p>
            <p className="leading-relaxed">
              Te recomendamos añadir nuestro directorio a tus <em>Favoritos</em> y visitarnos periódicamente. Constantemente estamos analizando y listando en nuestra sección de "Nuevas IA" las últimas maravillas tecnológicas, extensiones de navegador y aplicaciones móviles basadas en Inteligencia Artificial que están revolucionando el mundo digital.
            </p>
          </div>
          <div className="mt-8">
            <AdSensePlaceholder type="horizontal" />
          </div>
        </motion.section>
      </main>

      {/* Floating Scroll To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={() => scrollToSection('top')}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 p-3 md:p-4 bg-accent-500 hover:bg-accent-600 text-white rounded-full shadow-2xl hover:shadow-accent-500/30 transition-all active:scale-90 flex items-center justify-center group border border-accent-400"
            title="Volver al principio"
          >
            <ArrowUp className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Side Drawer Overlay & Panel */}
      <AnimatePresence>
        {selectedTool && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTool(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white shadow-2xl z-50 overflow-y-auto border-l border-slate-200"
            >
              <div className="relative min-h-full flex flex-col">
                {/* Drawer Header */}
                <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between z-10">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Detalles de la herramienta</span>
                  <button
                    onClick={() => setSelectedTool(null)}
                    className="p-2 -mr-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer Content */}
                <div className="p-5 md:p-8 flex-grow">
                  <div className="flex items-start gap-4 md:gap-5 mb-6 md:mb-8">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-slate-100 shadow-sm overflow-hidden bg-slate-50 flex items-center justify-center flex-shrink-0 text-4xl md:text-5xl">
                      {selectedTool.emoji || '🤖'}
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">{selectedTool.name}</h2>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="flex text-[10px] md:text-xs font-bold px-2.5 py-1 md:px-3 md:py-1 rounded-full bg-slate-100 text-slate-600">
                          {selectedTool.sector}
                        </span>
                        <span className={`flex items-center gap-1 text-[10px] md:text-xs font-bold px-2.5 py-1 md:px-3 md:py-1 rounded-full ${selectedTool.isFullyFree ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                          <Zap className="w-3 h-3" /> {selectedTool.freeTierDetails}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <button
                          onClick={(e) => handleUpvote(e, selectedTool.id)}
                          className={`flex items-center gap-1 md:gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg border text-xs md:text-sm font-bold transition-all z-20 shadow-sm ${userUpvoted.includes(selectedTool.id) ? 'bg-accent-500 border-accent-500 text-white hover:bg-accent-600' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
                        >
                          <ChevronUp className={`w-3.5 h-3.5 md:w-4 md:h-4 ${userUpvoted.includes(selectedTool.id) ? 'text-white' : 'text-slate-400'}`} />
                          {upvotes[selectedTool.id] || 0} Votos
                        </button>
                        <button
                          onClick={(e) => toggleBookmark(e, selectedTool.id)}
                          className={`flex items-center gap-1 md:gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg border text-xs md:text-sm font-bold transition-all shadow-sm ${bookmarks.includes(selectedTool.id) ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 md:w-4 md:h-4 ${bookmarks.includes(selectedTool.id) ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
                          Favorito
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="prose prose-slate prose-p:leading-relaxed max-w-none">
                    <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4">¿Por qué usarla?</h3>
                    <p className="text-slate-600 text-[15px] mb-4">
                      {selectedTool.description}
                    </p>
                    <p className="text-slate-600 text-[15px]">
                      {selectedTool.longDescription}
                    </p>
                  </div>
                </div>

                {/* Drawer Footer with CTA */}
                <div className="sticky bottom-0 bg-white border-t border-slate-100 p-4 md:p-6 z-10 space-y-2 md:space-y-3">
                  <a href={selectedTool.url} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-accent-600 text-white font-bold py-3 px-4 md:py-3.5 md:px-6 rounded-xl transition-all shadow-lg hover:shadow-accent-500/25 active:scale-[0.98] text-sm md:text-base">
                    Probar {selectedTool.name} Gratis <ExternalLink className="w-4 h-4" />
                  </a>
                  <Link to={`/herramienta/${selectedTool.id}`} className="w-full flex items-center justify-center gap-2 bg-slate-50 border border-slate-200 hover:border-accent-300 text-slate-700 font-bold py-2.5 px-4 md:py-3 md:px-6 rounded-xl transition-all shadow-sm hover:shadow-md hover:text-accent-600 text-sm md:text-base">
                    Ver página de reseña completa
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Blog Post Modal */}
      <AnimatePresence>
        {selectedBlogPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBlogPost(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="relative h-48 sm:h-64 flex-shrink-0">
                <img src={selectedBlogPost.image} alt={selectedBlogPost.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <button
                  onClick={() => setSelectedBlogPost(null)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 backdrop-blur text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="inline-block bg-accent-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md mb-2 uppercase tracking-wider">{selectedBlogPost.category}</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight drop-shadow-md">{selectedBlogPost.title}</h2>
                </div>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto">
                <div className="flex items-center gap-4 text-sm text-slate-500 font-medium mb-6 pb-6 border-b border-slate-100">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {selectedBlogPost.readTime}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span className="flex items-center gap-1.5 text-accent-600"><Sparkles className="w-4 h-4" /> Editorial</span>
                </div>

                <div className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-900 prose-a:text-accent-600 hover:prose-a:text-accent-500">
                  <p className="lead text-xl text-slate-700 font-medium mb-6">
                    {selectedBlogPost.excerpt}
                  </p>
                  <p className="whitespace-pre-line text-slate-600 leading-relaxed">
                    {selectedBlogPost.content}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div >
  );
}
