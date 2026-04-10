import React, { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'dark'
  );

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    const isDark = theme === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';

    localStorage.setItem('theme', nextTheme);

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    document.documentElement.classList.add('theme-transitioning');
    if (nextTheme === 'light') {
      document.documentElement.classList.add('theme-transitioning-light');
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
      // Force DOM mutation immediately inside startViewTransition
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    });

    transition.finished.finally(() => {
      document.documentElement.classList.remove('theme-transitioning', 'theme-transitioning-light');
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-accent-500 dark:hover:text-accent-400 transition-all shadow-sm focus:outline-none overflow-hidden flex items-center justify-center w-10 h-10"
      aria-label="Toggle dark mode"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.div
            key="dark"
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute"
          >
            <Moon className="w-5 h-5 fill-current" />
          </motion.div>
        ) : (
          <motion.div
            key="light"
            initial={{ y: 20, opacity: 0, rotate: 90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: -90 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute"
          >
            <Sun className="w-5 h-5 fill-current" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
