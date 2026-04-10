import { useParams, Link } from 'react-router-dom';
import { curatedLists } from '../curatedLists';
import { tools } from '../data';
import { useSEO } from '../hooks/useSEO';
import { ArrowLeft, Clock, Layers, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { ToolCard } from '../components/ToolCard';
import ShareButtons from '../components/ShareButtons';
import NotFound from './NotFound';

export default function CollectionDetail() {
    const { slug } = useParams();
    const collection = curatedLists.find(c => c.slug === slug);

    if (!collection) {
        return <NotFound />;
    }

    useSEO({
        title: `${collection.title} | AI Directory`,
        description: collection.excerpt
    });

    const collectionTools = collection.tools.map(toolId => tools.find(t => t.id === toolId)).filter(Boolean);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20 relative">
            
            {/* Hero Section */}
            <div className="relative w-full h-[50vh] md:h-[60vh] min-h-[400px] overflow-hidden">
                <div className="absolute inset-0 bg-slate-900">
                    <img 
                        src={collection.coverImage} 
                        alt={collection.title} 
                        className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                        loading="eager"
                        fetchpriority="high"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent"></div>
                </div>

                <div className="relative h-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col justify-end pb-12 md:pb-16 pt-24">
                    <Link to="/collections" className="inline-flex items-center gap-2 text-white/70 hover:text-white font-bold mb-6 transition-colors w-fit bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm">
                        <ArrowLeft className="w-4 h-4" /> Back to Collections
                    </Link>
                    
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="bg-accent-500 text-white text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-accent-500/20">
                            <Layers className="w-3.5 h-3.5" /> Curated List
                        </span>
                        <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" /> {collection.readTime} read
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 drop-shadow-lg max-w-3xl">
                        {collection.title}
                    </h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 md:p-12 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
                    
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-8 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-4">
                            <img src="https://ui-avatars.com/api/?name=AI+Directory&background=020617&color=fff&size=128" alt="Author" className="w-12 h-12 rounded-full ring-2 ring-slate-100 dark:ring-slate-800" />
                            <div>
                                <p className="font-bold text-slate-900 dark:text-white">AI Directory Editors</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Curated specifically for performance</p>
                            </div>
                        </div>
                        <ShareButtons title={collection.title} url={typeof window !== 'undefined' ? window.location.href : ''} />
                    </div>

                    <article 
                        className="prose prose-slate md:prose-lg dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-accent-600 dark:prose-a:text-accent-400 prose-img:rounded-3xl prose-img:shadow-xl mb-16"
                        dangerouslySetInnerHTML={{ __html: collection.content }}
                    />
                    
                    {/* The Curated Tools List */}
                    <div className="mt-12 bg-slate-50 dark:bg-slate-950/50 rounded-3xl p-6 md:p-10 border border-slate-200/80 dark:border-slate-800/80">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center text-accent-600">
                                <Layers className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">Top Tools Included</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {collectionTools.map((tool) => (
                                <ToolCard
                                  key={tool.id}
                                  tool={tool}
                                  onClick={() => window.location.href = `/tool/${tool.id}`}
                                  isBookmarked={false}
                                  onBookmark={() => {}}
                                  customBgClass="bg-white dark:bg-slate-900"
                                  upvotes={0}
                                  hasUpvoted={false}
                                  onUpvote={() => {}}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
