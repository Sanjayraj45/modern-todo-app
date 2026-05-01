import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function FloatingAddButton({ onAdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleAdd = () => {
    if (input.trim()) {
      onAdd(input, deadline || null);
      setInput('');
      setDeadline('');
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-20 right-0 w-72 glass rounded-3xl p-4 shadow-float"
          >
            <input
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              placeholder="What needs to be done?"
              className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none text-sm"
            />
            <div className="mt-3">
              <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">Deadline (optional)</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg px-3 py-1.5 text-sm outline-none border border-slate-200 dark:border-slate-700"
              />
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleAdd}
                className="flex-1 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-lg py-2 font-medium hover:shadow-lg transition-all text-sm"
              >
                Add
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg py-2 font-medium hover:bg-slate-300 transition-all text-sm"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: isOpen
            ? '0 20px 60px rgba(14, 165, 233, 0.4)'
            : '0 20px 60px rgba(14, 165, 233, 0.2)',
        }}
        className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-float hover:shadow-float transition-all"
      >
        {isOpen ? '✕' : '+'}
      </motion.button>
    </div>
  );
}
