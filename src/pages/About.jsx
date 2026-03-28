import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, ShieldCheck, Zap, ChevronRight, Users, Award, Globe } from 'lucide-react';

const BackButton = () => (
    <div className="mb-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-400 mb-6 overflow-x-auto no-scrollbar whitespace-nowrap px-1">
            <Link to="/" className="hover:text-accent-600 transition-colors flex items-center gap-1">Home</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span className="text-slate-600 dark:text-slate-400 font-bold">About Us</span>
        </nav>
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-accent-600 transition-colors bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 hover:border-accent-400 px-4 py-2 rounded-full shadow-sm dark:shadow-[0_2px_10px_rgb(0,0,0,0.2)] hover:shadow-md dark:hover:shadow-[0_4px_15px_rgba(217,70,239,0.15)]">
            <ArrowLeft className="w-4 h-4" />
            Back to home
        </Link>
    </div>
);

const About = () => {
    return (
        <div className="relative min-h-screen bg-transparent overflow-hidden">
            {/* Background Grid Setup */}
            <div className="absolute inset-0 z-0 pointer-events-none w-full h-full bg-grid-slate-100 dark:bg-grid-slate-900 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
            
            {/* Abstract Animated Blobs */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-primary-400/30 dark:bg-primary-600/20 blob z-0"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-400/30 dark:bg-accent-600/20 blob animation-delay-4000 z-0"></div>

            <div className="max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-16 relative z-10">
                <BackButton />

                <header className="mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">About AI Directory</h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">Your bridge to the best Artificial Intelligence tools.</p>
            </header>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
                <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm p-6 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.2)] hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(217,70,239,0.15)] transition-all">
                    <div className="w-14 h-14 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-5 shadow-sm">
                        <Target className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white group-hover:text-blue-500">Our Mission</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">Democratize access to AI, helping professionals and businesses find the perfect tool for their needs.</p>
                </div>

                <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm p-6 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.2)] hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(217,70,239,0.15)] transition-all">
                    <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-5 shadow-sm">
                        <ShieldCheck className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white group-hover:text-emerald-500">Expert Curation</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">Each tool in our directory is reviewed to ensure it provides real value and meets quality standards.</p>
                </div>

                <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm p-6 rounded-3xl border border-slate-200 dark:border-slate-700/80 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.2)] hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(217,70,239,0.15)] transition-all">
                    <div className="w-14 h-14 bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mb-5 shadow-sm">
                        <Zap className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-slate-900 dark:text-white group-hover:text-amber-500">Always Updated</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">The AI world moves fast. So do we. We update our database weekly.</p>
                </div>
            </div>

            <article className="prose prose-slate prose-lg max-w-none">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">Why AI Directory?</h2>
                <p>
                    AI Directory was born from the need to organize the chaotic but exciting landscape of Artificial Intelligence. With hundreds of new applications launching every month, users feel overwhelmed by the number of options and the difficulty of finding tools that are truly useful and accessible.
                </p>
                <p>
                    Our platform is not just a static list; it is a <strong>dynamic discovery tool</strong> designed to save you time and help you navigate today's technological revolution with judgment and efficiency.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12 not-prose">
                    <div className="flex gap-4 p-5 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm dark:bg-slate-900/50 dark:border-slate-700/80 dark:shadow-[0_4px_20px_rgb(0,0,0,0.2)] hover:-translate-y-1 hover:shadow-md dark:hover:shadow-[0_8px_30px_rgba(217,70,239,0.1)] transition-all">
                        <div className="p-3 bg-white dark:bg-slate-950 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 h-fit">
                            <Users className="w-6 h-6 text-primary-600 flex-shrink-0" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Community First</h4>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">We actively listen to our users' suggestions to list the tools they actually demand.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 p-5 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm dark:bg-slate-900/50 dark:border-slate-700/80 dark:shadow-[0_4px_20px_rgb(0,0,0,0.2)] hover:-translate-y-1 hover:shadow-md dark:hover:shadow-[0_8px_30px_rgba(217,70,239,0.1)] transition-all">
                        <div className="p-3 bg-white dark:bg-slate-950 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 h-fit">
                            <Award className="w-6 h-6 text-accent-600 flex-shrink-0" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Certified Quality</h4>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">We don't just list for the sake of listing. Each AI is tested to ensure its "Free Tier" is functional.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 p-5 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm dark:bg-slate-900/50 dark:border-slate-700/80 dark:shadow-[0_4px_20px_rgb(0,0,0,0.2)] hover:-translate-y-1 hover:shadow-md dark:hover:shadow-[0_8px_30px_rgba(217,70,239,0.1)] transition-all">
                        <div className="p-3 bg-white dark:bg-slate-950 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 h-fit">
                            <Globe className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Global Reach</h4>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">We look for solutions in all languages and markets, adapting them with clear explanations.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 p-5 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm dark:bg-slate-900/50 dark:border-slate-700/80 dark:shadow-[0_4px_20px_rgb(0,0,0,0.2)] hover:-translate-y-1 hover:shadow-md dark:hover:shadow-[0_8px_30px_rgba(217,70,239,0.1)] transition-all">
                        <div className="p-3 bg-white dark:bg-slate-950 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 h-fit">
                            <Target className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">Focus on Productivity</h4>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">We prioritize tools that automate tedious tasks and free up creative time.</p>
                        </div>
                    </div>
                </div>

                <h2>Who are we?</h2>
                <p>
                    We are a team of technology enthusiasts and digital productivity experts. We firmly believe that Artificial Intelligence is the ultimate co-pilot for the modern human, and our goal is to be the compass that guides you to success in this synthetic era.
                </p>
            </article>

            <div className="mt-16 p-8 md:p-12 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-[2.5rem] text-center text-white border border-slate-700 shadow-2xl group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent-500/30 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/30 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
                
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4 relative z-10 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">Want to collaborate with us?</h2>
                <p className="text-slate-300 mb-8 max-w-lg mx-auto relative z-10 text-lg">If you have an AI tool or want to suggest an improvement, we'd love to hear from you.</p>
                <Link to="/contact" className="inline-block bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 text-white font-black px-10 py-4 rounded-2xl border border-white/20 hover:scale-105 hover:-translate-y-1 transition-all duration-300 relative z-10 shadow-[0_0_20px_rgba(20,184,166,0.4)] hover:shadow-[0_0_30px_rgba(217,70,239,0.5)] glow-effect">
                    Contact now
                </Link>
            </div>
            </div>
        </div>
    );
};

export default About;
