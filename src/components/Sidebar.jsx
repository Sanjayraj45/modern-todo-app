import { useState } from 'react';
import { motion } from 'framer-motion';

const menuItems = [
  { id: 'all', label: 'All Tasks', icon: '✓' },
  { id: 'active', label: 'Active', icon: '●' },
  { id: 'completed', label: 'Completed', icon: '✔' },
];

export default function Sidebar({ activeFilter, onFilterChange, totalTasks, completedTasks }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`${expanded ? 'w-64' : 'w-20'} fixed left-0 top-0 h-screen bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 shadow-lg transition-all duration-300 z-40 flex flex-col`}
    >
      {/* Header */}
      <div className="p-6 pb-4 flex items-center justify-between">
        {expanded && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center text-white font-bold text-sm">
                T
              </div>
              {expanded && <span className="font-bold text-slate-900 dark:text-white">TaskStudio</span>}
            </div>
          </motion.div>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
        >
          {expanded ? '◀' : '▶'}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item, idx) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * idx }}
            onClick={() => onFilterChange(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeFilter === item.id
                ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-lg'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {expanded && <span className="font-medium text-sm">{item.label}</span>}
          </motion.button>
        ))}
      </nav>

      {/* Stats */}
      {expanded && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="p-4 space-y-3 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-700 rounded-xl p-3">
            <p className="text-xs text-slate-600 dark:text-slate-400">Total Tasks</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalTasks}</p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-slate-800 dark:to-slate-700 rounded-xl p-3">
            <p className="text-xs text-slate-600 dark:text-slate-400">Completed</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{completedTasks}</p>
          </div>
          <div className="w-full bg-slate-200/50 dark:bg-slate-700 rounded-full h-1.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
              transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
