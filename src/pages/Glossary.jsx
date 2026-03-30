import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BookA, Search } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

const glossaryTerms = [
    {
        term: "LLM (Large Language Model)",
        definition: "A type of artificial intelligence algorithm that uses deep learning techniques and massively large data sets to understand, summarize, generate, and predict new content.",
        category: "Foundations"
    },
    {
        term: "Prompt Engineering",
        definition: "The process of structuring text that can be interpreted and understood by a generative AI model. A prompt is the text provided by the user to instruct the model what to do.",
        category: "Techniques"
    },
    {
        term: "Stable Diffusion",
        definition: "A deep learning, text-to-image model released in 2022. It is primarily used to generate detailed images conditioned on text descriptions, though it can also be applied to other tasks such as inpainting, outpainting.",
        category: "Models"
    },
    {
        term: "RAG (Retrieval-Augmented Generation)",
        definition: "An AI framework that improves the quality of LLM-generated responses by grounding the model on external sources of knowledge to supplement the LLM's internal representation of information.",
        category: "Architecture"
    },
    {
        term: "Generative AI",
        definition: "A broad label describing any type of artificial intelligence that can be used to create new text, images, video, audio, code or synthetic data.",
        category: "Foundations"
    },
    {
        term: "Machine Learning (ML)",
        definition: "A branch of artificial intelligence and computer science which focuses on the use of data and algorithms to imitate the way that humans learn, gradually improving its accuracy.",
        category: "Foundations"
    },
    {
        term: "NLP (Natural Language Processing)",
        definition: "A branch of AI that helps computers understand, interpret and manipulate human language. NLP draws from many disciplines, including computer science and computational linguistics.",
        category: "Foundations"
    },
    {
        term: "Hallucination",
        definition: "In the context of AI, a hallucination or artificial hallucination is a confident response by an AI that does not seem to be justified by its training data. The model 'makes things up'.",
        category: "Concepts"
    },
    {
        term: "Token",
        definition: "The basic units of text or code that an LLM uses to process and generate language. A token can be a single character, a part of a word, or an entire word.",
        category: "Technical"
    },
    {
        term: "Fine-tuning",
        definition: "The process of taking a pre-trained model and training it further on a smaller, specific dataset to adapt it for specialized tasks or domains.",
        category: "Techniques"
    },
    {
        term: "API (Application Programming Interface)",
        definition: "A set of rules and protocols for building and interacting with software applications. AI tools like OpenAI provide APIs so developers can embed AI into their own apps.",
        category: "Technical"
    },
    {
        term: "Zero-shot Learning",
        definition: "A machine learning setup where a model is asked to learn to recognize things it has never seen during training, based only on a description or prompt.",
        category: "Techniques"
    }
].sort((a, b) => a.term.localeCompare(b.term));

export default function Glossary() {
    useSEO({
        title: 'AI Glossary: The Ultimate Artificial Intelligence Dictionary | AI Directory',
        description: 'Comprehensive dictionary of Artificial Intelligence terms. Learn the definitions of LLM, RAG, Prompt Engineering, Stable Diffusion, Generative AI, and more in 2024.'
    });

    const [searchTerm, setSearchTerm] = useState('');

    const filteredTerms = useMemo(() => {
        return glossaryTerms.filter(item => 
            item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
            item.definition.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const groupedTerms = useMemo(() => {
        const groups = {};
        filteredTerms.forEach(item => {
            const firstLetter = item.term[0].toUpperCase();
            if (!groups[firstLetter]) {
                groups[firstLetter] = [];
            }
            groups[firstLetter].push(item);
        });
        return groups;
    }, [filteredTerms]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-indigo-100 text-indigo-600 mb-6">
                        <BookA className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6">AI Glossary & Dictionary</h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Your definitive dictionary to understand the terminology of Artificial Intelligence. From basic concepts to advanced architectures.
                    </p>
                </div>

                <div className="relative mb-12">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for a term (e.g., 'LLM', 'Prompt')..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                    />
                </div>

                {Object.keys(groupedTerms).length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-slate-500 dark:text-slate-400 text-lg">No terms found matching "{searchTerm}"</p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {Object.keys(groupedTerms).sort().map((letter) => (
                            <div key={letter}>
                                <div className="flex items-center gap-4 mb-6">
                                    <h2 className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{letter}</h2>
                                    <div className="h-px bg-slate-200 dark:bg-slate-800 flex-grow"></div>
                                </div>
                                <div className="grid grid-cols-1 gap-6">
                                    {groupedTerms[letter].map((item, idx) => (
                                        <motion.div 
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 shadow-sm"
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-4">
                                                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white" id={item.term.toLowerCase().replace(/[^a-z0-9]+/g, '-')}>
                                                    {item.term}
                                                </h3>
                                                <span className="inline-flex max-w-fit px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                                                    {item.category}
                                                </span>
                                            </div>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base md:text-lg">
                                                {item.definition}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
