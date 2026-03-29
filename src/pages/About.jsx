import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, ShieldCheck, Zap, ChevronRight, Users, Award, Globe, Rocket, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const BackButton = () => (
    <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
    >
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs md:text-sm text-slate-400 mb-6 overflow-x-auto no-scrollbar whitespace-nowrap px-1">
            <Link to="/" className="hover:text-amber-500 transition-colors flex items-center gap-1">Home</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span className="text-slate-600 dark:text-slate-300 font-bold">About Us</span>
        </nav>
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 transition-all bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-500 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to home
        </Link>
    </motion.div>
);

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { 
            staggerChildren: 0.15 
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { type: "spring", stiffness: 100 }
    }
};

const About = () => {
    return (
        <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden font-sans">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none w-full h-full bg-grid-slate-200 dark:bg-grid-slate-800/[0.04] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
            
            {/* Abstract Animated Blobs */}
            <motion.div 
                animate={{ scale: [1, 1.1, 1], rotate: [0, 45, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-gradient-to-br from-amber-400/20 to-orange-600/20 dark:from-yellow-500/10 dark:to-amber-700/10 rounded-full blur-[100px] pointer-events-none z-0"
            ></motion.div>
            
            <motion.div 
                animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[-10%] left-[-10%] w-[50rem] h-[50rem] bg-gradient-to-tr from-blue-400/20 to-indigo-600/20 dark:from-sky-500/10 dark:to-blue-800/10 rounded-full blur-[120px] pointer-events-none z-0"
            ></motion.div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
                <BackButton />

                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <header className="mb-16 md:mb-24 text-center md:text-left">
                        <motion.div variants={itemVariants} className="inline-flex items-center justify-center p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-amber-500 mb-6 shadow-xl shadow-amber-500/10">
                            <Sparkles className="w-8 h-8" />
                        </motion.div>
                        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight drop-shadow-sm">
                            Behind the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">AI Database</span>
                        </motion.h1>
                        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                            We are your bridge exclusively built to connect you with the most powerful Artificial Intelligence tools, cutting through the noise.
                        </motion.p>
                    </header>

                    <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-20">
                        {/* Mission Card */}
                        <motion.div 
                            variants={itemVariants} 
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="group bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700/80 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-[100px] transition-transform group-hover:scale-110"></div>
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-500/20 dark:to-blue-600/10 border border-blue-200 dark:border-blue-500/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:rotate-6 transition-transform">
                                <Target className="w-8 h-8" />
                            </div>
                            <h3 className="font-black text-2xl mb-4 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Our Mission</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">Democratize access to AI, helping professionals and businesses find the perfect tool to 10x their core processes.</p>
                        </motion.div>

                        {/* Curation Card */}
                        <motion.div 
                            variants={itemVariants} 
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="group bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700/80 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-[100px] transition-transform group-hover:scale-110"></div>
                            <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-50 dark:from-emerald-500/20 dark:to-emerald-600/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:-rotate-6 transition-transform">
                                <ShieldCheck className="w-8 h-8" />
                            </div>
                            <h3 className="font-black text-2xl mb-4 text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Expert Curation</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">Every single tool in our directory is rigorously tested to ensure it provides real value, avoiding the hype trap.</p>
                        </motion.div>

                        {/* Updated Card */}
                        <motion.div 
                            variants={itemVariants} 
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="group bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl p-8 rounded-[2rem] border border-slate-200 dark:border-slate-700/80 shadow-lg shadow-slate-200/50 dark:shadow-none hover:shadow-2xl hover:shadow-amber-500/10 hover:border-amber-500/30 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-bl-[100px] transition-transform group-hover:scale-110"></div>
                            <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-500/20 dark:to-amber-600/10 border border-amber-200 dark:border-amber-500/30 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:rotate-12 transition-transform">
                                <Zap className="w-8 h-8" />
                            </div>
                            <h3 className="font-black text-2xl mb-4 text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">Always Updated</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">The AI world moves at lightspeed. So do we. We update our database continuously to keep you at the frontier.</p>
                        </motion.div>
                    </motion.div>

                    {/* Interactive Story Section */}
                    <motion.div variants={itemVariants} className="bg-white/40 dark:bg-slate-800/20 border border-slate-200/50 dark:border-slate-700/50 rounded-[3rem] p-8 md:p-14 mb-20 backdrop-blur-md">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-8">Why AI Directory?</h2>
                            <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 space-y-6">
                                <p className="text-xl md:text-2xl leading-relaxed font-light">
                                    AI Directory was born from the need to organize the chaotic but exciting landscape of Artificial Intelligence. With hundreds of new applications launching every month, users feel overwhelmed by the number of options.
                                </p>
                                <p className="text-lg">
                                    Our platform isn't just a static list; it's a <strong className="text-amber-600 dark:text-amber-400">dynamic discovery engine</strong> designed to save you time. 
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
                                {[
                                    { icon: Users, title: "Community First", desc: "Built on user feedback" },
                                    { icon: Award, title: "Verified Free Tiers", desc: "No hidden paywalls" },
                                    { icon: Globe, title: "Global Reach", desc: "Tools for every language" },
                                    { icon: Rocket, title: "Productivity Focused", desc: "Automate your boring tasks" }
                                ].map((feature, idx) => (
                                    <motion.div 
                                        key={idx}
                                        whileHover={{ scale: 1.03 }}
                                        className="flex items-center gap-5 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group"
                                    >
                                        <div className="w-14 h-14 bg-slate-50 dark:bg-slate-950 rounded-2xl flex items-center justify-center border border-slate-100 dark:border-slate-800 group-hover:border-amber-500/50 transition-colors">
                                            <feature.icon className="w-6 h-6 text-slate-700 dark:text-slate-300 group-hover:text-amber-500 transition-colors" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white text-lg">{feature.title}</h4>
                                            <span className="text-slate-500 dark:text-slate-400 text-sm">{feature.desc}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Algorithm Transparency Section - Unique SEO Asset */}
                    <motion.div variants={itemVariants} className="mb-24">
                        <div className="text-center mb-16">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="inline-block px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-600 dark:text-pink-400 font-bold text-sm tracking-widest uppercase mb-4"
                            >
                                100% Unbiased
                            </motion.div>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">Zero Pay-to-Play Policy</h2>
                            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                                Unlike other directories, we don't sell our top rankings to the highest bidder. Here is our completely transparent review methodology.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4">
                            {[
                                { step: "01", title: "Discovery", desc: "Our crawler algorithms and tech community hunt for emerging AI models daily across GitHub, Discord, and HuggingFace before they hit the mainstream." },
                                { step: "02", title: "Free-Tier Audit", desc: "We register anonymously to verify if the 'Free' plan is actually usable in a production environment, or just a frustrating bait-and-switch." },
                                { step: "03", title: "Stress Testing", desc: "We run industry-standard prompt tests to evaluate generation speed, output quality, and systemic hallucination rates against competitors." },
                                { step: "04", title: "Publication", desc: "Only tools that survive the audit get listed. We label them strictly and clearly: Totally Free, Freemium, Open Source, or Paid." }
                            ].map((phase, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.15 }}
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-8 rounded-3xl relative overflow-hidden group shadow-sm hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-300"
                                >
                                    <div className="text-7xl font-black text-slate-100 dark:text-slate-800/40 absolute -top-4 -right-2 group-hover:text-pink-50 dark:group-hover:text-pink-500/10 transition-colors duration-500 pointer-events-none select-none">{phase.step}</div>
                                    <div className="relative z-10 pt-6">
                                        <div className="w-10 h-10 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold mb-6 group-hover:bg-pink-500 group-hover:text-white transition-colors shadow-md">
                                            {idx + 1}
                                        </div>
                                        <h4 className="text-xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">{phase.title}</h4>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{phase.desc}</p>
                                    </div>
                                    { /* Bottom animated progress bar */ }
                                    <div className="absolute bottom-0 left-0 h-1.5 bg-slate-100 dark:bg-slate-800 w-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-pink-500 to-rose-500 w-0 group-hover:w-full transition-all duration-700 ease-in-out"></div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* CTA Section */}
                    <motion.div 
                        variants={itemVariants}
                        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-[3rem] p-10 md:p-16 text-center text-white shadow-2xl group"
                    >
                        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-amber-500/20 rounded-full blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-1000 ease-out"></div>
                        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-indigo-500/30 rounded-full blur-[80px] pointer-events-none group-hover:scale-110 transition-transform duration-1000 ease-out"></div>
                        
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
                                Shape the future with us
                            </h2>
                            <p className="text-slate-300 mb-10 text-xl font-light leading-relaxed">
                                Are you an AI developer? Found an amazing tool we missed? Let's talk and expand the directory together.
                            </p>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link to="/contact" className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-black px-12 py-5 rounded-2xl shadow-[0_10px_40px_rgba(245,158,11,0.4)] hover:shadow-[0_15px_60px_rgba(245,158,11,0.6)] transition-all duration-300 text-lg">
                                    Get in Touch
                                    <ChevronRight className="w-5 h-5 absolute absolute-right-4 relative -translate-x-1 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </div>
    );
};

export default About;
