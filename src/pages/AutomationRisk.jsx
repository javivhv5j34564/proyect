import { useState } from 'react';
import { tools } from '../data';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, Zap, ShieldAlert, ArrowRight, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';

const PROFESSIONS = [
    { name: 'Software Engineer', risk: 45, skills: ['Code Generation', 'Debugging', 'Automatización'], keyword: 'Programming' },
    { name: 'Video Content Creator', risk: 35, skills: ['Scripting', 'Video Editing', 'Audio'], keyword: 'Video' },
    { name: 'Graphic Designer', risk: 65, skills: ['Image Generation', 'Vectors', 'Mockups'], keyword: 'Design' },
    { name: 'Copywriter / Marketer', risk: 75, skills: ['SEO Writing', 'Idea Generation', 'Translation'], keyword: 'Writing' },
    { name: 'Educator / Teacher', risk: 20, skills: ['Syllabus Creation', 'Grading', 'Tutoring'], keyword: 'Education' },
    { name: 'Data Analyst', risk: 40, skills: ['Visualization', 'Data Cleaning', 'SQL Queries'], keyword: 'Data' },
    { name: 'Customer Support Agent', risk: 85, skills: ['Ticket Resolution', 'Chatbots', 'Email Drafting'], keyword: 'Support' },
    { name: 'HR & Recruiter', risk: 50, skills: ['Resume Screening', 'Interview Prep', 'Onboarding'], keyword: 'HR' },
    { name: 'Accountant', risk: 30, skills: ['Bookkeeping', 'Trend Analysis', 'Tax Prep'], keyword: 'Finance' },
    { name: 'Legal Professional', risk: 55, skills: ['Contract Review', 'Legal Research', 'Briefs'], keyword: 'Legal' },
    { name: 'Sales Representative', risk: 40, skills: ['Lead Scoring', 'Email Outreach', 'CRM'], keyword: 'Sales' },
    { name: 'Administrative Assistant', risk: 70, skills: ['Scheduling', 'Data Entry', 'Email Triage'], keyword: 'Productivity' },
    { name: 'Audio Engineer', risk: 40, skills: ['Mixing', 'Mastering', 'Noise Reduction'], keyword: 'Audio' },
    { name: 'E-commerce Manager', risk: 55, skills: ['Product Descriptions', 'Inventory', 'Ad Creatives'], keyword: 'E-commerce' },
    { name: 'SEO Specialist', risk: 60, skills: ['Keyword Research', 'Content Outlines', 'Link Analysis'], keyword: 'SEO' },
    { name: 'Translator / Interpreter', risk: 80, skills: ['Real-time Translation', 'Localization', 'Proofreading'], keyword: 'Translation' },
    { name: 'UI / UX Designer', risk: 45, skills: ['Wireframing', 'User Flows', 'Prototyping'], keyword: 'Design' },
    { name: 'Cybersecurity Analyst', risk: 30, skills: ['Threat Detection', 'Log Analysis', 'Vulnerability Scans'], keyword: 'Security' },
    { name: 'Financial Analyst', risk: 45, skills: ['Forecasting', 'Market Research', 'Reporting'], keyword: 'Finance' },
    { name: 'Data Scientist', risk: 35, skills: ['Machine Learning', 'Big Data', 'Pattern Recognition'], keyword: 'Data' },
    { name: 'Project Manager', risk: 25, skills: ['Task Allocation', 'Sprint Planning', 'Risk Mitigation'], keyword: 'Productivity' },
    { name: 'Social Media Manager', risk: 60, skills: ['Content Scheduling', 'Trend Analysis', 'Engagement'], keyword: 'SEO' },
    { name: 'Journalist / Reporter', risk: 65, skills: ['Article Drafting', 'Fact-checking', 'Transcriptions'], keyword: 'Writing' },
    { name: 'Photographer', risk: 40, skills: ['Retouching', 'Lighting Correction', 'Culling'], keyword: 'Design' },
    { name: '3D Artist / Animator', risk: 30, skills: ['Rigging', 'Texture Generation', 'Rendering'], keyword: 'Video' },
    { name: 'Real Estate Agent', risk: 35, skills: ['Listing Descriptions', 'Virtual Tours', 'Client Follow-ups'], keyword: 'Sales' },
    { name: 'Architect', risk: 20, skills: ['Floor Plan Generation', 'Structural Analysis', '3D Modeling'], keyword: 'Design' },
    { name: 'Virtual Assistant', risk: 80, skills: ['Email Management', 'Calendar Sync', 'Research'], keyword: 'Productivity' },
    { name: 'DevOps Engineer', risk: 30, skills: ['CI/CD Pipeline', 'Infrastructure as Code', 'Monitoring'], keyword: 'Programming' },
    { name: 'Musician / Composer', risk: 25, skills: ['Chord Generation', 'Mixing', 'Stem Separation'], keyword: 'Audio' },
    { name: 'Librarian / Archivist', risk: 45, skills: ['Cataloging', 'Metadata Tagging', 'Search Indexing'], keyword: 'Research' }
];

export default function AutomationRisk() {
    const [selectedJob, setSelectedJob] = useState(null);
    const [showResults, setShowResults] = useState(false);

    const handleSelect = (job, variant) => {
        setSelectedJob({ ...job, variant });
        setShowResults(true);
    };

    const recommendedTools = selectedJob 
        ? tools.filter(t => t.sector.includes(selectedJob.keyword)).slice(0, 3)
        : [];

    return (
        <div className="min-h-[80vh] bg-slate-50 dark:bg-slate-950 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                        ⚠️ Career <span className="text-rose-500">Automation</span> Risk Test
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Determine the probability of AI replacing your manual daily tasks. Discover your job's exposure rate and unlock the exact AI toolkit you must master to remain indispensable.
                    </p>
                </div>

                {!showResults ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {PROFESSIONS.map((job, idx) => {
                            const COLOR_VARIANTS = [
                                { bg: 'bg-gradient-to-br from-rose-500 to-pink-600', shadow: 'hover:shadow-rose-500/40' },
                                { bg: 'bg-gradient-to-br from-blue-500 to-indigo-600', shadow: 'hover:shadow-blue-500/40' },
                                { bg: 'bg-gradient-to-br from-emerald-500 to-teal-600', shadow: 'hover:shadow-emerald-500/40' },
                                { bg: 'bg-gradient-to-br from-purple-500 to-fuchsia-600', shadow: 'hover:shadow-purple-500/40' },
                                { bg: 'bg-gradient-to-br from-amber-500 to-orange-600', shadow: 'hover:shadow-amber-500/40' },
                                { bg: 'bg-gradient-to-br from-cyan-500 to-blue-600', shadow: 'hover:shadow-cyan-500/40' },
                                { bg: 'bg-gradient-to-br from-pink-500 to-rose-600', shadow: 'hover:shadow-pink-500/40' },
                                { bg: 'bg-gradient-to-br from-indigo-500 to-purple-600', shadow: 'hover:shadow-indigo-500/40' },
                            ];
                            const variant = COLOR_VARIANTS[idx % COLOR_VARIANTS.length];
                            
                            return (
                                <button
                                    key={job.name}
                                    onClick={() => handleSelect(job, variant)}
                                    className={`relative ${variant.bg} p-6 rounded-2xl hover:scale-[1.03] hover:shadow-2xl ${variant.shadow} transition-all duration-300 text-left group overflow-hidden border border-white/20`}
                                >
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                                    <div className="absolute -right-4 -top-4 w-28 h-28 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                                    
                                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4 transition-transform group-hover:-translate-y-1 relative z-10 border border-white/30 shadow-sm">
                                        <Briefcase className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-bold text-white text-lg relative z-10 drop-shadow-sm">{job.name}</h3>
                                    <p className="text-sm text-white/90 mt-2 relative z-10 font-medium tracking-wide">Click to calculate risk</p>
                                </button>
                            );
                        })}
                    </div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl"
                    >
                        <div className="mb-8 border-b border-slate-100 dark:border-slate-800 pb-8 text-center flex flex-col items-center">
                            <span className={`text-white px-5 py-2 rounded-full font-bold text-sm tracking-widest shadow-sm ${selectedJob.variant?.bg || 'bg-rose-500'} bg-[length:200%_200%] animate-gradient`}>
                                ESTIMATED EXPOSURE RATE
                            </span>
                            <div className={`text-7xl font-black mb-2 bg-clip-text text-transparent ${selectedJob.variant?.bg || 'bg-gradient-to-r from-rose-500 to-pink-600'}`}>
                                {selectedJob.risk}%
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 max-w-lg">
                                AI technologies are currently capable of automating {selectedJob.risk}% of the repetitive workload of a typical <strong className="text-slate-900 dark:text-white">{selectedJob.name}</strong>. 
                                The only strategy to future-proof your career is to adopt these core platforms:
                            </p>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <ShieldAlert className="w-5 h-5 text-emerald-500" /> 
                                Professional Survival Kit
                            </h3>
                            <div className="grid gap-4">
                                {recommendedTools.map(t => (
                                    <div key={t.id} className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                                        <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center text-3xl shadow-sm border border-slate-200 dark:border-slate-700">
                                            {t.emoji}
                                        </div>
                                        <div className="flex-1 text-center sm:text-left">
                                            <h4 className="font-bold text-slate-900 dark:text-white text-lg">{t.name}</h4>
                                            <p className="text-sm text-slate-500 line-clamp-1">{t.description}</p>
                                        </div>
                                        <Link to={`/tool/${t.id}`} className="px-5 py-2.5 bg-accent-600 text-white rounded-xl font-bold hover:bg-accent-700 transition flex items-center gap-2 whitespace-nowrap w-full sm:w-auto justify-center">
                                            Master this AI <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                ))}
                                {recommendedTools.length === 0 && (
                                    <p className="text-slate-500 italic">No specific tools found in this exact category, but starting with ChatGPT is strongly advised.</p>
                                )}
                            </div>
                        </div>

                        <button 
                            onClick={() => setShowResults(false)}
                            className="text-sm font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition w-full text-center mt-6"
                        >
                            ← Analyze a different profession
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
