import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { tools } from '../data';
import { semanticSearchTools } from '../utils/semanticSearch';

export default function AIAssistantWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: 'Hi! I am your AI Guide. What task do you want to automate today?', type: 'text' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, isOpen]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userText = inputValue.trim();
        setInputValue('');
        
        // Add user message
        setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userText, type: 'text' }]);
        setIsTyping(true);

        // Simulate thinking time
        setTimeout(() => {
            setIsTyping(false);
            
            // Generate recommendations
            const recommendations = semanticSearchTools(userText, tools).slice(0, 3);
            
            if (recommendations.length > 0) {
                setMessages(prev => [
                    ...prev, 
                    { 
                        id: Date.now() + 1, 
                        sender: 'ai', 
                        text: 'Based on what you told me, here is the perfect AI stack for you:', 
                        type: 'text' 
                    },
                    {
                        id: Date.now() + 2,
                        sender: 'ai',
                        type: 'stack',
                        tools: recommendations
                    }
                ]);
            } else {
                setMessages(prev => [
                    ...prev, 
                    { 
                        id: Date.now() + 1, 
                        sender: 'ai', 
                        text: "I couldn't find a direct match for that. Could you describe the task using different words? (e.g. 'editar videos', 'escribir código', 'generar imágenes')", 
                        type: 'text' 
                    }
                ]);
            }
        }, 1500);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute bottom-16 right-0 w-[calc(100vw-3rem)] sm:w-[350px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col mb-2 origin-bottom-right"
                        style={{ maxHeight: 'calc(100vh - 120px)' }}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 flex items-center justify-between shadow-md relative z-10">
                            <div className="flex items-center gap-3 text-white">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                                    <Bot className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm leading-tight">AI Guide</h3>
                                    <p className="text-[10px] text-white/80">Online & Ready</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/20 transition-colors focus:outline-none"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Chat Area */}
                        <div className="p-4 overflow-y-auto flex-grow bg-slate-50 dark:bg-slate-950 flex flex-col gap-4 hidden-scrollbar min-h-[300px] max-h-[400px]">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.type === 'text' ? (
                                        <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                                            msg.sender === 'user' 
                                            ? 'bg-indigo-500 text-white shadow-md rounded-br-none' 
                                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-sm border border-slate-100 dark:border-slate-700/50 rounded-bl-none'
                                        }`}>
                                            {msg.text}
                                        </div>
                                    ) : (
                                        <div className="w-full flex justify-start">
                                            <div className="w-full space-y-2 mt-1">
                                                {msg.tools.map((targetTool) => (
                                                    <Link 
                                                        key={targetTool.id}
                                                        to={`/tool/${targetTool.id}`} 
                                                        onClick={() => setIsOpen(false)}
                                                        className="block w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-xl shadow-sm hover:shadow-md hover:border-indigo-300 transition-all group"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-xl flex-shrink-0">
                                                                {targetTool.emoji}
                                                            </div>
                                                            <div className="flex-grow min-w-0">
                                                                <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate group-hover:text-indigo-500 transition-colors">{targetTool.name}</h4>
                                                                <p className="text-[10px] sm:text-xs text-slate-500 truncate">{targetTool.sector}</p>
                                                            </div>
                                                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                                        <span className="w-2 h-2 bg-slate-300 dark:bg-slate-500 rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-slate-300 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-2 h-2 bg-slate-300 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                            <form onSubmit={handleSendMessage} className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ex: Edit short videos for tiktok..."
                                    className="flex-grow bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700/80 focus:border-indigo-500 dark:focus:border-indigo-400 rounded-full px-4 py-2.5 text-sm focus:outline-none transition-colors text-slate-900 dark:text-white"
                                />
                                <button 
                                    type="submit"
                                    disabled={!inputValue.trim()}
                                    className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white rounded-full p-2.5 transition-colors focus:outline-none flex-shrink-0 flex items-center justify-center w-10 h-10"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            {!isOpen && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-[0_8px_30px_rgb(99,102,241,0.4)] hover:shadow-[0_8px_40px_rgb(99,102,241,0.6)] transition-shadow border-[3px] border-white dark:border-slate-800 focus:outline-none relative group"
                >
                    <Sparkles className="w-6 h-6 animate-pulse" />
                    
                    {/* Tooltip */}
                    <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-xs font-bold rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none after:content-[''] after:absolute after:left-full after:top-1/2 after:-translate-y-1/2 after:border-8 after:border-y-transparent after:border-r-transparent after:border-l-white dark:after:border-l-slate-800">
                        Help me choose AI 👀
                    </div>
                </motion.button>
            )}
        </div>
    );
}
