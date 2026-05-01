import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function TopBar({ filterLabel }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    setIsDark(!isDark);
    localStorage.setItem('todo-theme', isDark ? 'light' : 'dark');
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-64 right-0 h-16 glass border-b border-slate-200/50 dark:border-slate-700/50 z-30 px-8 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400">Currently viewing</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">{filterLabel}</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100/50 dark:bg-slate-800/50 rounded-lg">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{time}</span>
        </div>

        <button
          onClick={toggleDarkMode}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition flex items-center gap-2 text-slate-600 dark:text-slate-300"
        >
          {isDark ? (
            <motion.span key="sun" initial={{ rotate: -90 }} animate={{ rotate: 0 }} className="text-xl">☀️</motion.span>
          ) : (
            <motion.span key="moon" initial={{ rotate: -90 }} animate={{ rotate: 0 }} className="text-xl">🌙</motion.span>
          )}
        </button>
      </div>
    </motion.div>
  );
}
