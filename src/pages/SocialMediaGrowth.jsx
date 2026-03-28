import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Share2, Zap, Rocket, Video, Image as ImageIcon, MessageCircle, BarChart, CheckCircle2, ChevronRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const workflows = [
  {
    icon: <Video className="w-6 h-6 text-pink-500" />,
    title: 'Short-Form Video Factory (TikTok/Reels)',
    description: 'Turn a single YouTube video or podcast into 10+ viral shorts automatically.',
    tools: ['OpusClip', 'Vizard.ai', 'CapCut Pro'],
    steps: [
      'Find a trending long-form video in your niche.',
      'Paste the URL into OpusClip or Vizard.ai.',
      'AI automatically selects the most engaging moments and adds viral-style captions (Hormozi style).',
      'Download and schedule across TikTok, Instagram Reels, and YouTube Shorts using Metricool.'
    ],
    color: 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800/50'
  },
  {
    icon: <Share2 className="w-6 h-6 text-blue-500" />,
    title: 'The Infinite Content Engine (Twitter/LinkedIn)',
    description: 'Transform one core idea into a week\'s worth of text content.',
    tools: ['ChatGPT/Claude', 'Make.com', 'Typefully/Taplio'],
    steps: [
      'Write down a single core thought or lesson (e.g., "Why sleep matters for productivity").',
      'Use a prompt to ask ChatGPT to rewrite it as: 1 Thread, 3 short tweets, 1 long LinkedIn post, and 1 engaging question.',
      'Connect an RSS feed of your favorite blogs via Make.com to Auto-Draft posts in Typefully.',
      'Review, tweak the hook, and schedule.'
    ],
    color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/50'
  },
  {
    icon: <ImageIcon className="w-6 h-6 text-purple-500" />,
    title: 'Faceless Aesthetic Channels',
    description: 'Create highly aesthetic, atmosphere-driven videos without showing your face.',
    tools: ['Midjourney', 'ElevenLabs', 'Canva'],
    steps: [
      'Generate aesthetic background images or looping videos using Midjourney ("lofi study girl, rainy window, cinematic lighting --ar 9:16").',
      'Write a motivational or philosophical script using ChatGPT.',
      'Generate a hyper-realistic AI voiceover using ElevenLabs.',
      'Combine audio and visual in Canva or CapCut, add a trending lofi or cinematic audio track.'
    ],
    color: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800/50'
  },
  {
    icon: <BarChart className="w-6 h-6 text-emerald-500" />,
    title: 'Automated Newsletter Curation',
    description: 'Build a high-value niche newsletter on autopilot with AI curation.',
    tools: ['Make.com', 'ChatGPT', 'Beehiiv'],
    steps: [
      'Set up a Make.com scenario that scrapes Google Alerts or RSS feeds in your niche weekly.',
      'Pass the articles to ChatGPT to summarize the top 5 most important news into 3 bullet points each.',
      'Draft the newsletter directly into Beehiiv via API with an engaging intro and subject line.',
      'Review the draft and click send. Monetize with sponsorships.'
    ],
    color: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/50'
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-amber-500" />,
    title: 'LinkedIn Lead Magnet Automation',
    description: 'Turn a single PDF into hundreds of qualified leads automatically on LinkedIn.',
    tools: ['Phantombuster', 'Make.com', 'ChatGPT'],
    steps: [
      'Create a visual lead magnet (Cheat Sheet or PDF) using Canva.',
      'Post on LinkedIn: "I built this cheat sheet for [Niche]. Comment \'Send\' and I\'ll DM it to you."',
      'Use Phantombuster to track comments and set Make.com to automatically reply and send DMs.',
      'Connect the DM flow to a CRM to track hot leads and follow up seamlessly.'
    ],
    color: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/50'
  }
];

const viralTips = [
  {
    title: 'The 3-Second Hook Rule',
    text: 'If you don\'t capture attention in the first 3 seconds, they will scroll. Start with a bold claim, a visual disruption, or a highly specific question. Use AI to brainstorm "10 scroll-stopping hooks about [topic]".'
  },
  {
    title: 'Optimize for Metric "Watch Time"',
    text: 'Algorithms push content that keeps people on the platform. Tell a story with a payoff at the very end. Keep your pacing fast and remove dead air.'
  },
  {
    title: 'Steal Like an Artist',
    text: 'Don\'t reinvent the wheel. Find highly viral videos in your niche, transcribe them using AI, analyze why they worked (pacing, hook, topic), and recreate them with your own unique twist.'
  },
  {
    title: 'Native AI Captions',
    text: '80% of people watch social media videos on mute. Always use dynamic, animated captions. Highlight keyword colors to keep the eyes moving.'
  },
  {
    title: 'Engagement Baiting (The Good Kind)',
    text: 'Ask a polarizing (but safe) question or leave a tiny, intentional mistake that people will want to correct in the comments. More comments = more virality.'
  },
  {
    title: 'The Story Gap Framework',
    text: 'Frame your content by defining a clear Point A (painful current state) and Point B (desired future state). The content is the bridge. "How I went from 0 to 10k followers..."'
  },
  {
    title: 'Strategic Negativity Hook',
    text: 'Humans have a hardwired negativity bias. Videos titled "Don\'t do this" or "Why your [X] is failing" get 3x higher click-through rates than positive equivalents.'
  }
];

export default function SocialMediaGrowth() {
  const [activeWorkflow, setActiveWorkflow] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-50/50 via-white to-orange-50/50 dark:from-pink-950/20 dark:via-slate-950 dark:to-orange-950/20 z-0"></div>
        <div className="max-w-5xl mx-auto px-6 relative z-10 pt-16 pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-500/10 to-orange-500/10 dark:from-pink-500/20 dark:to-orange-500/20 text-pink-700 dark:text-pink-300 font-medium text-sm mb-6 border border-pink-200/50 dark:border-pink-800/30"
          >
            <TrendingUp className="w-4 h-4" />
            <span>AI Social Growth Engine</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6"
          >
            Automate & Go <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">Viral</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Discover the secret AI workflows used by top creators to generate infinite content, automate posting, and trigger the algorithm.
          </motion.p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6">
        
        {/* Workflows Section */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-center gap-2">
              <Zap className="w-8 h-8 text-yellow-500" />
              Automated AI Workflows
            </h2>
            <p className="text-slate-600 dark:text-slate-400">Step-by-step blueprints to clone yourself online.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Workflow Selectors */}
            <div className="flex flex-col gap-3">
              {workflows.map((workflow, index) => (
                <button
                  key={index}
                  onClick={() => setActiveWorkflow(index)}
                  className={`text-left p-5 rounded-2xl transition-all duration-200 border ${
                    activeWorkflow === index 
                      ? 'bg-white dark:bg-slate-900 border-indigo-500 shadow-md shadow-indigo-500/10 scale-[1.02]' 
                      : 'bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className={`p-2 rounded-xl ${
                      activeWorkflow === index ? 'bg-indigo-50 dark:bg-indigo-900/40' : 'bg-slate-100 dark:bg-slate-800'
                    }`}>
                      {workflow.icon}
                    </div>
                    <h3 className={`font-bold ${activeWorkflow === index ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'}`}>
                      {workflow.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 pl-14">
                    {workflow.description}
                  </p>
                </button>
              ))}
            </div>

            {/* Workflow Details */}
            <div className="lg:col-span-2">
              <motion.div 
                key={activeWorkflow}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`h-full rounded-3xl p-6 md:p-8 border ${workflows[activeWorkflow].color} shadow-sm relative overflow-hidden`}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    {workflows[activeWorkflow].icon}
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {workflows[activeWorkflow].title}
                    </h3>
                  </div>
                  
                  <p className="text-slate-700 dark:text-slate-300 mb-8 text-lg">
                    {workflows[activeWorkflow].description}
                  </p>

                  <div className="mb-8">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
                      <Rocket className="w-4 h-4" /> Tools Required
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {workflows[activeWorkflow].tools.map((tool, idx) => (
                        <span key={idx} className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2">
                      <Play className="w-4 h-4" /> Step-by-Step Playbook
                    </h4>
                    <ul className="space-y-4">
                      {workflows[activeWorkflow].steps.map((step, idx) => (
                        <li key={idx} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-sm mt-0.5 shadow-md">
                            {idx + 1}
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                            {step}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Viral Tips Grid */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-center gap-2">
              <FlameIcon className="w-8 h-8 text-orange-500" />
              Anatomy of Virality
            </h2>
            <p className="text-slate-600 dark:text-slate-400">Psychological principles to manipulate the algorithm.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {viralTips.map((tip, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.1)] hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center mb-4 font-bold">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                  {tip.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {tip.text}
                </p>
              </div>
            ))}
            
            {/* CTA Card inside the grid */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 shadow-lg shadow-indigo-500/20 text-white flex flex-col justify-center items-center text-center">
                <MessageCircle className="w-12 h-12 text-indigo-200 mb-4" />
                <h3 className="text-xl font-bold mb-3">Need Hooks?</h3>
                <p className="text-indigo-100 text-sm mb-6">Check out our Prompts Library to generate viral hooks and scripts instantly.</p>
                <Link to="/prompts" className="bg-white text-indigo-600 px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-50 transition-colors w-full flex items-center justify-center gap-2">
                  Get Prompts <ChevronRight className="w-4 h-4" />
                </Link>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

// Temporary icon component for Flame
const FlameIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);
