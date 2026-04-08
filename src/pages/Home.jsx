import { useState, useMemo, useEffect, useRef } from 'react';
import { Search, Sparkles, X, ExternalLink, ChevronRight, Zap, Flame, Clock, ChevronDown, TrendingUp, Lightbulb, Brain, Bookmark, ChevronUp, BookOpen, ArrowRight, ArrowDown, ArrowUp, Menu, Search as SearchIcon, Sun, Moon, Palette, Video, Code, PenTool, Music, Settings, Utensils, Calendar, ShoppingBag, Star, User, MessageSquare, MoveHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { tools, categories } from '../data';
import { guidesData } from '../guidesData';
import { AdSensePlaceholder } from '../components/AdSensePlaceholder';
import { useSEO } from '../hooks/useSEO';
import { db } from '../firebase';
import { collection, doc, onSnapshot, setDoc, updateDoc, increment } from 'firebase/firestore';
import { Newsletter } from '../components/Newsletter';
import { ToolCardSkeleton } from '../components/ToolCardSkeleton';
const top3Ids = ['midjourney_ai', 'heygen_video', 'jasper_copy'];
const recentIds = ['runway_gen3', 'leonardo_ai', 'descript_audio'];

const aiFacts = [
  {
    id: 'fact-1',
    icon: <TrendingUp className="w-6 h-6 text-primary-500" />,
    title: "Boost Your Productivity",
    description: "Automate repetitive tasks and concentrate on what really matters.",
    fact: "Fact 64 of professionals report an increase in diurnal effectiveness when using AI."
  },
  {
    id: 'fact-2',
    icon: <Lightbulb className="w-6 h-6 text-amber-500" />,
    title: "Unleash Your Creativity",
    description: "Overcome blank page syndrome with unlimited idea generation.",
    fact: "Fact: AI can reduce ideation process time by up to 40%."
  },
  {
    id: 'fact-3',
    icon: <Brain className="w-6 h-6 text-indigo-500" />,
    title: "Smart Decisions",
    description: "Access complex answers in a structured and simple way in seconds.",
    fact: "Fact: AI assistants improve retention and informed decision-making."
  }
];

const faqs = [
  {
    question: "What is AI Directory?",
    answer: "We are a curated platform that collects the best Artificial Intelligence tools on the market, classifying them by categories so you can find the ideal solution for your needs quickly and easily."
  },
  {
    question: "Are all the tools listed free?",
    answer: "We focus mainly on tools with free plans (Free) or with 'Freemium' models (offering limited free use). Each technical sheet specifies the license type so you don't waste time."
  },
  {
    question: "How can I suggest a new AI?",
    answer: "We love discovering new tools! You can use the 'Suggest a Tool' link in the footer or contact us directly through the contact form."
  },
  {
    question: "How often is the directory updated?",
    answer: "Our team analyzes the AI ecosystem almost daily. We add new tools and update information on existing ones weekly to ensure you always have the latest at your fingertips."
  }
];

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 dark:border-slate-700/80 last:border-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 md:py-5 flex items-center justify-between text-left group transition-all"
      >
        <span className="text-sm md:text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-accent-600 transition-colors pr-8">
          {question}
        </span>
        <ChevronDown className={`w-5 h-5 text-slate-400 group-hover:text-accent-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent-500' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};



const categoryIcons = {
  'All': <Sparkles className="w-4 h-4" />,
  'Chatbots & Assistants': <Brain className="w-4 h-4" />,
  'Image & Design': <Palette className="w-4 h-4" />,
  'Video & Animation': <Video className="w-4 h-4" />,
  'Programming': <Code className="w-4 h-4" />,
  'Writing & Productivity': <PenTool className="w-4 h-4" />,
  'Research & Data': <Search className="w-4 h-4" />,
  'Audio & Music': <Music className="w-4 h-4" />,
  'Automation': <Zap className="w-4 h-4" />,
  'Marketing & Sales': <TrendingUp className="w-4 h-4" />,
  'Utilities': <Settings className="w-4 h-4" />,
  'Cooking': <Utensils className="w-4 h-4" />,
  'Schedules': <Calendar className="w-4 h-4" />,
  'Fashion': <ShoppingBag className="w-4 h-4" />,
};

import { ToolCard } from '../components/ToolCard';

export default function Home({ searchTerm, setSearchTerm }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPricing, setSelectedPricing] = useState('All');
  const [showFavorites, setShowFavorites] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoadingSub, setIsLoadingSub] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [displayCount, setDisplayCount] = useState(15);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [formRating, setFormRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  const categoryContainerRef = useRef(null);
  const [isDraggingCategory, setIsDraggingCategory] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const handleMouseDown = (e) => {
    setIsDraggingCategory(true);
    setHasDragged(false);
    setStartX(e.pageX - categoryContainerRef.current.offsetLeft);
    setScrollLeft(categoryContainerRef.current.scrollLeft);
  };
  
  const handleMouseLeave = () => {
    setIsDraggingCategory(false);
  };
  
  const handleMouseUp = () => {
    setIsDraggingCategory(false);
  };
  
  const handleMouseMove = (e) => {
    if (!isDraggingCategory) return;
    e.preventDefault();
    const x = e.pageX - categoryContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    categoryContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    setDisplayCount(15);
  }, [searchTerm, selectedCategory, selectedPricing, showFavorites]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setTimeout(() => {
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
    }, 150);
  };

  useSEO({
    title: 'The Ultimate Artificial Intelligence (AI) Directory & Tools List',
    description: 'Explore the largest curated collection of free and freemium Artificial Intelligence tools. Discover the best AI software for productivity, design, writing, and more in 2024.'
  });

  // Persistence State
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('ai_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const [upvotes, setUpvotes] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'upvotes'), (snapshot) => {
      const data = {};
      snapshot.forEach(doc => {
        data[doc.id] = doc.data().count || 0;
      });
      setUpvotes(data);
    });
    return () => unsubscribe();
  }, []);

  const [userUpvoted, setUserUpvoted] = useState(() => {
    const saved = localStorage.getItem('ai_user_upvotes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => { localStorage.setItem('ai_bookmarks', JSON.stringify(bookmarks)); }, [bookmarks]);
  useEffect(() => { localStorage.setItem('ai_user_upvotes', JSON.stringify(userUpvoted)); }, [userUpvoted]);

  const toggleBookmark = (e, id) => {
    e.stopPropagation();
    setBookmarks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
  };

  const handleUpvote = async (e, id) => {
    e.stopPropagation();
    const toolRef = doc(db, 'upvotes', id);

    if (userUpvoted.includes(id)) {
      // Local optimistic update
      setUserUpvoted(prev => prev.filter(u => u !== id));
      setUpvotes(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 1) - 1) }));
      
      // Firestore update
      try {
        await updateDoc(toolRef, { count: increment(-1) });
      } catch (error) {
        if (error.code === 'not-found') {
          // Does not exist yet, safely ignore
        }
      }
    } else {
      // Local optimistic update
      setUserUpvoted(prev => [...prev, id]);
      setUpvotes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
      
      // Firestore update
      try {
        await updateDoc(toolRef, { count: increment(1) });
      } catch (error) {
        if (error.code === 'not-found') {
          await setDoc(toolRef, { count: 1 });
        }
      }
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
      const nKeywords = (tool.keywords || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      const matchesSearch = searchStr === '' ||
        nName.includes(searchStr) ||
        nDesc.includes(searchStr) ||
        nLong.includes(searchStr) ||
        nSector.includes(searchStr) ||
        nKeywords.includes(searchStr);

      const matchesCategory = selectedCategory === 'All' || tool.sector === selectedCategory;
      const matchesFavorites = showFavorites ? bookmarks.includes(tool.id) : true;

      let matchesPricing = true;
      if (selectedPricing === 'Gratis') {
        matchesPricing = tool.isFullyFree === true;
      } else if (selectedPricing === 'Freemium') {
        matchesPricing = tool.isFullyFree === false;
      }

      return matchesSearch && matchesCategory && matchesFavorites && matchesPricing;
    }).sort((a, b) => {
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      
      const aUpvotes = upvotes[a.id] || 0;
      const bUpvotes = upvotes[b.id] || 0;
      if (bUpvotes === aUpvotes) {
          if (a.isFullyFree && !b.isFullyFree) return -1;
          if (!a.isFullyFree && b.isFullyFree) return 1;
      }
      return bUpvotes - aUpvotes;
    });
  }, [searchTerm, selectedCategory, selectedPricing, showFavorites, bookmarks, upvotes, sortBy]);

  const showSections = searchTerm === '' && selectedCategory === 'All' && selectedPricing === 'All' && !showFavorites && sortBy === 'popular';

  // Sorting explicit sections by upvotes too
  // Sorting explicit sections: Top3 and Recent keep their fixed id order/upvotes, 
  // but OtherTools (the main directory) will respect the "Free First" rule.
  const top3Tools = tools.filter(t => top3Ids.includes(t.id)).sort((a, b) => (upvotes[b.id] || 0) - (upvotes[a.id] || 0));
  const recentTools = tools.filter(t => recentIds.includes(t.id)).sort((a, b) => (upvotes[b.id] || 0) - (upvotes[a.id] || 0));
  const otherTools = tools.filter(t => !top3Ids.includes(t.id) && !recentIds.includes(t.id)).sort((a, b) => {
    if (a.isFullyFree && !b.isFullyFree) return -1;
    if (!a.isFullyFree && b.isFullyFree) return 1;
    return (upvotes[b.id] || 0) - (upvotes[a.id] || 0);
  });

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (selectedTool || selectedBlogPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedTool, selectedBlogPost]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayCount(prev => prev + 15);
      setIsLoadingMore(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-sans relative overflow-hidden">
      {/* Background Grid Setup */}
      <div className="absolute inset-0 z-0 pointer-events-none w-full h-full bg-grid-slate-100 dark:bg-grid-slate-900 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
      
      {/* Abstract Animated Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/30 dark:bg-primary-600/20 blob z-0"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-accent-400/30 dark:bg-accent-600/20 blob animation-delay-2000 z-0"></div>
      <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-indigo-400/30 dark:bg-indigo-600/20 blob animation-delay-4000 z-0"></div>

      {/* Header element is already rendered via App.jsx */}


      {/* Hero Section */}
      <section className="relative flex flex-col justify-center text-center w-full pt-16 pb-12 px-4 sm:pt-24 sm:pb-20 sm:px-8 min-h-[45vh] md:min-h-[55vh] overflow-hidden mb-4 md:mb-8 group">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-1000 mix-blend-multiply hidden md:block"
          >
            <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-slate-50/95 to-slate-50 dark:from-[#000000]/80 dark:via-[#000000]/95 dark:to-[#000000] z-10"></div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative z-20">
          <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-accent-50/80 backdrop-blur-md border border-accent-200/50 text-accent-700 text-xs md:text-sm font-black mb-6 md:mb-8 shadow-sm dark:shadow-none tracking-wide uppercase">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
            <span>AI Tools Directory • 100% Updated</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white mb-4 md:mb-6 tracking-tight md:tracking-tighter leading-[1.05] drop-shadow-sm">
            Find the Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-accent-500 to-indigo-600">AI Tools</span> <br className="hidden sm:block" /> For Your Workflow
          </h1>
          <p className="text-base sm:text-lg md:text-2xl text-slate-600 dark:text-slate-400 font-medium mb-6 md:mb-8 leading-relaxed md:leading-relaxed max-w-3xl mx-auto px-2 drop-shadow-sm">
            The largest curated AI directory. Filter through hundreds of <span className="text-accent-600 font-bold">free</span> tools to code, design, write, and automate your workflow.
          </p>


          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4 mb-4 md:mt-8">
            <button
              onClick={() => scrollToSection('directory-section')}
              className="w-full sm:w-auto bg-gradient-to-r from-primary-500 via-accent-500 to-indigo-600 hover:from-primary-600 hover:via-accent-600 hover:to-indigo-700 text-white font-black py-4 px-8 md:py-5 md:px-10 rounded-full transition-all shadow-lg shadow-accent-500/30 hover:shadow-accent-500/50 hover:scale-105 active:scale-95 text-base md:text-lg flex items-center justify-center gap-2 border-[3px] border-white/20"
            >
              🪄 Explore AI Now <ArrowDown className="w-5 h-5 md:w-6 md:h-6 hover:animate-bounce" />
            </button>
            <button
              onClick={() => scrollToSection('blog-section')}
              className="w-full sm:w-auto bg-white/80 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300 font-bold py-3.5 px-6 md:py-4 md:px-8 rounded-full transition-all shadow-sm dark:shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(217,70,239,0.15)] hover:bg-white dark:hover:bg-slate-900 hover:text-accent-600 active:scale-95 text-sm md:text-base flex items-center justify-center gap-2"
            >
              Articles & Guides <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Quick Value Prop / How it Works */}
      <section className="bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-black text-xl flex-shrink-0">1</div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Explore Categories</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Navigate through programming, design, video, and more.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 border-y md:border-y-0 md:border-x border-slate-100 dark:border-slate-800 py-6 md:py-0 md:px-8">
              <div className="w-12 h-12 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center font-black text-xl flex-shrink-0">2</div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Find Free Tools</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">We prioritize free options so you don't spend a dime testing.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-xl flex-shrink-0">3</div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Boost Your Workflow</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Save hours of repetitive tasks using the right AI for each case.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-2 md:py-6">

        {/* FEATURED GUIDES (HIGH VALUE CONTENT FOR ADSENSE) */}
        <section className="mb-16 mt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight flex items-center gap-2">
                        <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-accent-500" />
                        Featured Guides & Tutorials
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">100% original pedagogical content to master Artificial Intelligence.</p>
                </div>
                <Link to="/guides" className="flex items-center gap-2 text-accent-600 font-bold hover:text-accent-700 transition-colors bg-accent-50 dark:bg-accent-900/30 px-5 py-2.5 rounded-full">
                    View All Guides <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {guidesData.slice(0, 3).map((guide, index) => (
                    <motion.div 
                        key={guide.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-xl transition-all group flex flex-col"
                    >
                        <Link to={`/guide/${guide.id}`} className="block relative aspect-[16/9] overflow-hidden m-2 rounded-2xl">
                            <img 
                                src={guide.coverImage} 
                                alt={guide.title}
                                loading="lazy"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-sm shadow-sm">
                                {guide.category}
                            </div>
                        </Link>
                        <div className="p-5 flex flex-col flex-grow">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-accent-600 transition-colors line-clamp-2 leading-tight">
                                {guide.title}
                            </h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 mb-4 flex-grow">
                                {guide.excerpt}
                            </p>
                            <Link to={`/guide/${guide.id}`} className="mt-auto text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1 group-hover/link:text-accent-600">
                                Read Guide <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>

        {/* SEO Text Section for AdSense (Combats Thin Content) */}
        <section className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.2)] border border-slate-200 dark:border-slate-700/80/60 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -z-10"></div>
          
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-6">Mastering Artificial Intelligence: Your Comprehensive Educational Hub</h2>
            <div className="prose prose-slate md:prose-lg max-w-none text-slate-600 dark:text-slate-400 space-y-5">
              <p>
                Welcome to the leading educational platform dedicated to demystifying Artificial Intelligence. Our mission is to provide <strong>100% original, high-value pedagogical content</strong> that empowers professionals, students, and beginners to leverage AI technologies safely and effectively. The landscape of machine learning and natural language processing is evolving rapidly, and staying informed requires reliable, deeply researched information rather than scraped or superficial data.
              </p>
              <p>
                Unlike basic tool aggregators, we prioritize <strong>in-depth tutorials, practical step-by-step guides, and analytical reviews</strong>. Whether you are looking to understand the nuanced differences between large language models (LLMs) via our extensive <Link to="/guides" className="text-accent-600 font-bold hover:underline">Guides section</Link>, or seeking rigorous evaluations of productivity software, our human-authored content ensures you receive actionable and factual insights. We strongly advocate against plagiarism and auto-generated spam, ensuring every article provides distinct value.
              </p>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mt-8 mb-4 border-l-4 border-accent-500 pl-4">Why Originality and Deep Understanding Matter</h3>
              <p>
                In an era where "thin content" is pervasive, discovering authentic usage scenarios for AI is critical. For instance, our tutorials not only list tools but explicitly demonstrate <em>how</em> to integrate them into daily workflows—such as automating spreadsheet formulas or optimizing SEO metadata using advanced prompting techniques. This pedagogical approach is designed to elevate your technological literacy, ensuring that when you browse our categorized resources (from Data Analysis to Generative Video), you comprehend the underlying mechanics. 
              </p>
              <p>
                Explore our constantly updated educational resources, read our comprehensive analyses, and transform the way you interact with digital environments. We are committed to maintaining the highest standards of content excellence, providing you with a safe, verified, and immensely valuable learning environment.
              </p>
            </div>
          </div>
        </section>
        {/* AI Facts & Advantages Section */}
        <section className="mb-12 mt-10 md:mb-16 md:mt-12">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight mb-2 md:mb-3">
              Why use Artificial Intelligence today?
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">Key advantages and surprising facts that will transform how you work</p>
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
                className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-slate-700/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.2)] hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(217,70,239,0.15)] transition-all group relative overflow-hidden flex flex-col h-full"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-bl-full -z-0 opacity-50 group-hover:scale-110 transition-transform duration-500"></div>

                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-100 dark:border-slate-800 shadow-sm dark:shadow-[0_2px_10px_rgb(0,0,0,0.3)] flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative z-10">
                  {item.icon}
                </div>

                <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-2 md:mb-3 group-hover:text-accent-600 transition-colors relative z-10">
                  {item.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 text-xs md:text-sm mb-4 md:mb-6 leading-relaxed flex-grow relative z-10">
                  {item.description}
                </p>

                <div className="pt-4 md:pt-5 border-t border-slate-100 dark:border-slate-800 relative z-10 mt-auto">
                  <div className="flex items-start gap-2.5">
                    <div className="bg-accent-50 p-1.5 rounded-full flex-shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-accent-500" />
                    </div>
                    <p className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 leading-relaxed italic">
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
          className="w-full h-32 md:h-48 rounded-3xl overflow-hidden my-12 relative shadow-sm dark:shadow-none group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/60 via-accent-900/40 to-indigo-900/60 z-10 mix-blend-multiply border border-white/10 rounded-3xl transition-opacity group-hover:opacity-80"></div>
          <img
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80"
            alt="AI Brain technology"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80";
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <p className="text-white/90 font-medium tracking-[0.2em] uppercase text-xs md:text-sm drop-shadow-md">The future is here</p>
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
                className="flex items-center gap-2 md:gap-3 bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm px-3 py-2 md:px-5 md:py-3 rounded-xl md:rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-[0_4px_15px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_15px_rgba(0,0,0,0.3)] cursor-pointer hover:border-accent-400 dark:hover:border-accent-600 hover:shadow-lg dark:hover:shadow-[0_4px_20px_rgba(217,70,239,0.2)] transition-all flex-shrink-0 hover:-translate-y-0.5"
              >
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-950 flex items-center justify-center flex-shrink-0 text-base md:text-xl">
                  {tool.emoji || '🤖'}
                </div>
                <span className="text-xs md:text-sm font-bold text-slate-700 dark:text-slate-300">{tool.name}</span>
                <span className="text-[9px] md:text-[10px] font-semibold px-1.5 py-0.5 md:px-2 md:py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-400 uppercase tracking-wider">{tool.sector}</span>
              </div>
            ))}
          </div>
        </section>


        {/* Categories / Filters */}
        <section id="directory-section" className="mt-12 md:mt-20 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
            <div className="text-left">
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">AI Tools Directory</h2>
              <p className="font-medium">Found <span className="text-accent-600 font-bold">{typeof filteredTools !== 'undefined' ? filteredTools.length : 0}</span> professional tools for you</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700/80 shadow-sm dark:shadow-none overflow-hidden">
                {['All', 'Free', 'Freemium'].map(price => (
                  <button
                    key={price}
                    onClick={() => setSelectedPricing(price)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedPricing === price ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-white hover:bg-slate-50 dark:bg-slate-950'}`}
                  >
                    {price === 'All' ? 'All Plans' : price}
                  </button>
                ))}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 text-sm font-bold rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-accent-500 cursor-pointer shadow-sm dark:shadow-none hover:border-slate-300 transition-colors"
              >
                <option value="popular">🔥 Most Popular</option>
                <option value="newest">✨ Newest</option>
                <option value="name">A-Z Name</option>
              </select>

              <button
                onClick={() => setShowFavorites(!showFavorites)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-bold text-xs transition-all shadow-sm dark:shadow-none ${showFavorites ? 'bg-accent-500 border-accent-500 text-white shadow-accent-500/20' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-400 hover:border-accent-300 hover:text-accent-600'}`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${showFavorites ? 'fill-white' : ''}`} />
                My Favorites
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute right-0 top-0 bottom-8 w-12 bg-gradient-to-l from-slate-50 dark:from-[#000000] to-transparent pointer-events-none z-10"></div>
            <div 
              ref={categoryContainerRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className={`flex gap-2 overflow-x-auto no-scrollbar pb-6 md:pb-8 -mx-4 px-4 md:mx-0 md:px-0 ${isDraggingCategory ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
            >
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={(e) => {
                    if (hasDragged) {
                      e.preventDefault();
                      e.stopPropagation();
                      return;
                    }
                    setSelectedCategory(cat);
                    setDisplayCount(15);
                  }}
                  className={`flex items-center gap-2 px-5 py-3 rounded-2xl whitespace-nowrap font-bold text-sm transition-all border-2 flex-shrink-0 ${selectedCategory === cat ? 'bg-gradient-to-r from-primary-600 to-indigo-600 border-transparent text-white shadow-[0_4px_15px_rgba(20,184,166,0.3)] dark:shadow-[0_4px_15px_rgba(20,184,166,0.5)] -translate-y-1' : 'bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-accent-300 dark:hover:border-accent-700 hover:text-accent-600 dark:hover:text-accent-400 hover:-translate-y-0.5 shadow-sm'}`}
                >
                  {categoryIcons[cat] || <Brain className="w-4 h-4" />}
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="mt-1 flex items-center justify-center gap-1.5 text-slate-400 opacity-80 animate-pulse pointer-events-none pb-2">
              <MoveHorizontal className="w-3 h-3" />
              <span className="text-[10px] uppercase font-bold tracking-wider">Swipe to see more</span>
            </div>
          </div>
        </section>

        {/* Dynamic Grids */}
        {filteredTools.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">No tools found</h3>
            <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or category.</p>
          </div>
        ) : (
          <div>
            {!showSections ? (
              <div className="flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
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
                    {isLoadingMore ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 w-full">
                            {[...Array(3)].map((_, i) => <ToolCardSkeleton key={i} />)}
                        </div>
                    ) : (
                        <button
                        onClick={handleLoadMore}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 hover:border-accent-300 text-slate-700 dark:text-slate-300 font-bold py-3 px-8 rounded-full shadow-sm dark:shadow-none hover:shadow-md transition-all active:scale-95 flex items-center gap-2"
                        >
                        <SearchIcon className="w-4 h-4 text-accent-500" />
                        Load {Math.min(15, filteredTools.length - displayCount)} more
                        </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-12">
                {/* Top 3 Section */}
                <section>
                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-2 mb-4 md:mb-6">
                    <Flame className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
                    <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">Top 3 Most Used</h2>
                  </motion.div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {top3Tools.map((tool) => (
                      <ToolCard
                        key={tool.id}
                        tool={tool}
                        onClick={setSelectedTool}
                        customBgClass="bg-gradient-to-br from-amber-50 to-orange-50/50 dark:from-[#111111] dark:to-[#0a0a0a]"
                        borderClass="border-amber-200/60 dark:border-slate-800"
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
                    <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">Recently Added</h2>
                  </motion.div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {recentTools.map((tool) => (
                      <ToolCard
                        key={tool.id}
                        tool={tool}
                        onClick={setSelectedTool}
                        customBgClass="bg-gradient-to-br from-fuchsia-50 to-purple-50/50 dark:from-[#111111] dark:to-[#0a0a0a]"
                        borderClass="border-fuchsia-200/60 dark:border-slate-800"
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
                  className="w-full h-32 md:h-48 rounded-3xl overflow-hidden my-8 relative shadow-sm dark:shadow-none group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-900/60 via-indigo-900/40 to-primary-900/60 z-10 mix-blend-multiply border border-white/10 rounded-3xl transition-opacity group-hover:opacity-80"></div>
                  <img
                    src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1200&q=80"
                    alt="Digital Evolution"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80";
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <p className="text-white/90 font-medium tracking-[0.2em] uppercase text-xs md:text-sm drop-shadow-md">Digital Evolution</p>
                  </div>
                </motion.div>

                {/* All Other Tools Section */}
                <section className="pt-2 md:pt-4 mt-6 md:mt-8">
                  <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex items-center gap-2 mb-4 md:mb-6 border-b border-slate-200 dark:border-slate-700/80/60 pb-2 md:pb-3">
                    <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-accent-500" />
                    <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100">Explore Directory</h2>
                  </motion.div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                    {otherTools.slice(0, displayCount).map((tool) => (
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
                  {displayCount < otherTools.length && (
                    <div className="flex justify-center mt-8 md:mt-10 w-full">
                      {isLoadingMore ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 w-full">
                              {[...Array(6)].map((_, i) => <ToolCardSkeleton key={i} />)}
                          </div>
                      ) : (
                          <button
                            onClick={handleLoadMore}
                            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 hover:border-accent-300 text-slate-700 dark:text-slate-300 font-bold py-3 px-4 md:px-8 rounded-full shadow-sm dark:shadow-none hover:shadow-md transition-all active:scale-95 flex items-center gap-2 w-full md:w-auto justify-center"
                          >
                            <SearchIcon className="w-4 h-4 text-accent-500" />
                            Load {Math.min(15, otherTools.length - displayCount)} more
                          </button>
                      )}
                    </div>
                  )}
                </section>
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
            src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80"
            alt="AI abstract technology"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80";
            }}
          />
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-10 z-20">
            <p className="text-white font-bold text-xl md:text-3xl drop-shadow-lg">Universe of Possibilities.</p>
            <p className="text-white/80 text-sm md:text-base mt-1">Open your mind to the tool revolution.</p>
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
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Top Guides & Resources</h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mt-1">Discover articles and tutorials to get the most out of artificial intelligence.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700/80 overflow-hidden shadow-sm dark:shadow-none hover:shadow-xl hover:shadow-accent-500/10 hover:border-accent-200 transition-all group flex flex-col h-full cursor-pointer"
              >
                <div className="h-40 overflow-hidden relative">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    loading="lazy" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80";
                    }}
                  />
                  <span className="absolute top-3 left-3 bg-white dark:bg-slate-900/90 backdrop-blur text-slate-800 dark:text-slate-100 text-[10px] font-bold px-2 py-1 rounded-md z-20 uppercase tracking-wider shadow-sm dark:shadow-none">{post.category}</span>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-accent-600 transition-colors">{post.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mb-4 flex-grow line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  <div className="mt-auto flex items-center justify-end border-t border-slate-100 dark:border-slate-800 pt-3">
                    <ArrowRight className="w-4 h-4 text-accent-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* Newsletter / Suscripción (Detalle Final de Valor) */}
        <Newsletter />

        {/* FAQ Section - Excellent for AdSense Weight but compact */}
        <section className="mt-16 md:mt-24 max-w-4xl mx-auto px-4 sm:px-0">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-3">Frequently Asked Questions</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">Everything you need to know about our directory.</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-2 md:p-6 shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-700/80/60">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} {...faq} />
            ))}
          </div>
        </section>

        {/* SEO Text Section for Home / AdSense Value - Refined for Mobile Precision */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="mt-16 pt-8 md:mt-24 md:pt-12 border-t border-slate-200 dark:border-slate-700/80"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 md:mb-10 text-center md:text-left leading-tight">
              Global and Free <span className="text-accent-600">Artificial Intelligence</span> Directory
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-4 md:space-y-6">
                <p className="text-slate-600 dark:text-slate-400 text-sm md:text-lg leading-relaxed">
                  Welcome to the most comprehensive and rigorously curated directory of <strong>free and freemium Artificial Intelligence tools</strong> on the market. In an ecosystem where hundreds of new models are born daily, finding the ones that truly add value can be a titanic task.
                </p>
                <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100">How to choose the stylish AI for you?</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                  Our platform is distributed by crucial sectors from <strong>Writing & Rendering</strong>, to niches like <strong>Fashion, cuisine, and Management</strong>. Each tool passes through a demanding human quality filter where we evaluate real utility and the generosity of its free plans.
                </p>
              </div>

              <div className="space-y-4 md:space-y-6">
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <Zap className="w-3.5 h-3.5 text-primary-600" />
                    </div>
                    <div>
                      <strong className="text-slate-900 dark:text-white block text-sm md:text-base">Productivity & Study</strong>
                      <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm">Maximize your efficiency with powerful Smart Assistants and chatbots like ChatGPT, Gemini, or Perplexity.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <Palette className="w-3.5 h-3.5 text-accent-600" />
                    </div>
                    <div>
                      <strong className="text-slate-900 dark:text-white block text-sm md:text-base">Multimedia Generation</strong>
                      <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm">Access Image Generators (Flux, Leonardo) and Video Generators (Runway) for professional designs in seconds.</p>
                    </div>
                  </li>
                </ul>
                <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm italic border-l-2 border-accent-500 pl-4 py-1">
                  Add our directory to your favorites. We constantly analyze the latest extensions and mobile apps based on AI that are revolutionizing the digital world.
                </p>
              </div>
            </div>

          </div>
        </motion.section>

        {/* Comments & Evaluation Section */}
        <section id="comentarios" className="mt-16 md:mt-24 mb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-0">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-2">Community Evaluation</h2>
                <p className="text-slate-500 dark:text-slate-400">Has the directory been useful to you? Leave us your feedback.</p>
              </div>
            </div>

            {/* Reviews removed as per request - Keeping only the form */}


            {/* Leave a Comment Form */}
            <div className="bg-slate-900 rounded-3xl p-6 md:p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/10 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare className="w-6 h-6 text-accent-400" />
                  <h3 className="text-xl font-bold">Tell us about your experience</h3>
                </div>
                <form action="https://formsubmit.co/f.javiergg06@gmail.com" method="POST" className="space-y-4 md:space-y-6">
                  <input type="hidden" name="_next" value={window.location.origin + "/success"} />
                  <input type="hidden" name="_subject" value="New Community Review - AI Directory" />
                  <input type="hidden" name="_captcha" value="false" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      required
                      className="bg-white dark:bg-slate-900/10 border border-white/20 dark:border-slate-700/80 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all"
                    />
                    <div className="flex items-center gap-3 bg-white dark:bg-slate-900/5 border border-white/20 dark:border-slate-700/80 rounded-xl px-4 py-3 min-w-[140px]">
                      <span className="text-sm text-slate-400 font-medium whitespace-nowrap">Your rating:</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setFormRating(s)}
                            onMouseEnter={() => setHoverRating(s)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="focus:outline-none transition-transform active:scale-95 px-0.5"
                          >
                            <Star
                              className={`w-6 h-6 transition-all ${s <= (hoverRating || formRating)
                                ? 'fill-amber-400 text-amber-400 scale-110'
                                : 'text-slate-300 dark:text-slate-600'
                                }`}
                            />
                          </button>
                        ))}
                      </div>
                      <input type="hidden" name="rating" value={formRating} />
                    </div>
                  </div>
                  <textarea
                    name="message"
                    rows="3"
                    placeholder="Write your comment or suggestion here..."
                    required
                    className="w-full bg-white dark:bg-slate-900/10 border border-white/20 dark:border-slate-700/80 rounded-xl px-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-accent-500 transition-all resize-none"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-accent-500 hover:bg-accent-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-accent-500/20 transition-all active:scale-[0.98]"
                  >
                    Submit evaluation
                  </button>
                  <p className="text-[10px] text-center text-slate-500 dark:text-slate-400 mt-2 italic">We value every suggestion to improve the directory daily.</p>
                </form>
              </div>
            </div>
          </div>
        </section>
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
            title="Back to top"
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
              className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white dark:bg-slate-900 shadow-2xl z-50 overflow-y-auto border-l border-slate-200 dark:border-slate-700/80"
            >
              <div className="relative min-h-full flex flex-col">
                {/* Drawer Header */}
                <div className="sticky top-0 bg-white dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex items-center justify-between z-10">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tool details</span>
                  <button
                    onClick={() => setSelectedTool(null)}
                    className="p-2 -mr-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer Content */}
                <div className="p-5 md:p-8 flex-grow text-slate-900 dark:text-white">
                  <div className="flex items-start gap-4 md:gap-5 mb-6 md:mb-8">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm dark:shadow-none overflow-hidden bg-slate-50 dark:bg-slate-950 flex items-center justify-center flex-shrink-0 text-4xl md:text-5xl">
                      {selectedTool.emoji || '🤖'}
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white mb-2">{selectedTool.name}</h2>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="flex text-[10px] md:text-xs font-bold px-2.5 py-1 md:px-3 md:py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          {selectedTool.sector}
                        </span>
                        <span className={`flex items-center gap-1 text-[10px] md:text-xs font-bold px-2.5 py-1 md:px-3 md:py-1 rounded-full ${selectedTool.isFullyFree ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                          <Zap className="w-3 h-3" /> {selectedTool.freeTierDetails}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <button
                          onClick={(e) => handleUpvote(e, selectedTool.id)}
                          className={`flex items-center gap-1 md:gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg border text-xs md:text-sm font-bold transition-all z-20 shadow-sm dark:shadow-none ${userUpvoted.includes(selectedTool.id) ? 'bg-accent-500 border-accent-500 text-white hover:bg-accent-600' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-400 hover:border-slate-300 hover:bg-slate-50 dark:bg-slate-950'}`}
                        >
                          <ChevronUp className={`w-3.5 h-3.5 md:w-4 md:h-4 ${userUpvoted.includes(selectedTool.id) ? 'text-white' : 'text-slate-400'}`} />
                          {upvotes[selectedTool.id] || 0} Votes
                        </button>
                        <button
                          onClick={(e) => toggleBookmark(e, selectedTool.id)}
                          className={`flex items-center gap-1 md:gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg border text-xs md:text-sm font-bold transition-all shadow-sm dark:shadow-none ${bookmarks.includes(selectedTool.id) ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-400 hover:border-slate-300 hover:bg-slate-50 dark:bg-slate-950'}`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 md:w-4 md:h-4 ${bookmarks.includes(selectedTool.id) ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
                          Favorite
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="prose prose-slate prose-p:leading-relaxed max-w-none">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 mb-4">Why use it?</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-[15px] mb-4">
                      {selectedTool.description}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-[15px]">
                      {selectedTool.longDescription}
                    </p>
                  </div>
                </div>

                {/* Drawer Footer with CTA */}
                <div className="sticky bottom-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 p-4 md:p-6 z-10 space-y-2 md:space-y-3">
                  <a href={selectedTool.url} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-accent-600 text-white font-bold py-3 px-4 md:py-3.5 md:px-6 rounded-xl transition-all shadow-lg hover:shadow-accent-500/25 active:scale-[0.98] text-sm md:text-base">
                    Try {selectedTool.name} Free <ExternalLink className="w-4 h-4" />
                  </a>
                  <Link to={`/tool/${selectedTool.id}`} className="w-full flex items-center justify-center gap-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700/80 hover:border-accent-300 text-slate-700 dark:text-slate-300 font-bold py-2.5 px-4 md:py-3 md:px-6 rounded-xl transition-all shadow-sm dark:shadow-none hover:shadow-md hover:text-accent-600 text-sm md:text-base">
                    View full review page
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
              className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border"
            >
              <div className="relative h-48 sm:h-64 flex-shrink-0">
                <img 
                  src={selectedBlogPost.image} 
                  alt={selectedBlogPost.title} 
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <button
                  onClick={() => setSelectedBlogPost(null)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-slate-900/20 hover:bg-white dark:bg-slate-900/40 backdrop-blur text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="inline-block bg-accent-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md mb-2 uppercase tracking-wider">{selectedBlogPost.category}</span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight drop-shadow-md">{selectedBlogPost.title}</h2>
                </div>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto">
                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 font-medium mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                  <span className="flex items-center gap-1.5 text-accent-600"><Sparkles className="w-4 h-4" /> Editorial</span>
                </div>

                <div className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-900 dark:text-white prose-a:text-accent-600 hover:prose-a:text-accent-500">
                  <p className="lead text-xl text-slate-700 dark:text-slate-300 font-medium mb-6">
                    {selectedBlogPost.excerpt}
                  </p>
                  <p className="whitespace-pre-line text-slate-600 dark:text-slate-400 leading-relaxed">
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
