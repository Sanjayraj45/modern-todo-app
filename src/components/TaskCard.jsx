import { motion } from 'framer-motion';

function getDeadlineStyle(deadline, completed) {
  if (!deadline || completed) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(deadline);
  const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return { label: 'Overdue', cls: 'text-red-500 dark:text-red-400' };
  if (diffDays <= 2) return { label: `Due in ${diffDays}d`, cls: 'text-orange-500 dark:text-orange-400' };
  return { label: due.toLocaleDateString([], { month: 'short', day: 'numeric' }), cls: 'text-accent-500 dark:text-accent-400' };
}

export default function TaskCard({ task, onToggle, onDelete }) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -100 },
  };

  const deadlineInfo = getDeadlineStyle(task.deadline, task.completed);

  return (
    <motion.div
      layout
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.3, ease: 'easeOut' }}
      whileHover={{ y: -2 }}
      className="card p-4 group cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <motion.button
          onClick={() => onToggle(task.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            task.completed
              ? 'bg-gradient-to-br from-green-400 to-green-500 border-green-500 text-white'
              : 'border-slate-300 dark:border-slate-600 hover:border-accent-500'
          }`}
        >
          {task.completed && (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-sm font-bold">
              ✓
            </motion.span>
          )}
        </motion.button>

        <div className="flex-1 min-w-0">
          <motion.p
            className={`text-sm font-medium truncate transition-all ${
              task.completed ? 'text-slate-400 line-through dark:text-slate-500' : 'text-slate-900 dark:text-white'
            }`}
          >
            {task.title}
          </motion.p>
          {deadlineInfo && (
            <p className={`text-xs mt-0.5 font-medium ${deadlineInfo.cls}`}>
              📅 {deadlineInfo.label}
            </p>
          )}
          {task.deadline && task.completed && (
            <p className="text-xs mt-0.5 text-slate-400 dark:text-slate-500">
              📅 {new Date(task.deadline).toLocaleDateString([], { month: 'short', day: 'numeric' })}
            </p>
          )}
        </div>

        <motion.button
          onClick={() => onDelete(task.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex-shrink-0 w-8 h-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400"
        >
          ×
        </motion.button>
      </div>
    </motion.div>
  );
}
