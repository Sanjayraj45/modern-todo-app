import { motion } from 'framer-motion';

export default function EmptyState({ filterType }) {
  const messages = {
    all: {
      icon: '📝',
      title: 'No tasks yet',
      description: 'Get started by adding your first task with the button below.',
    },
    active: {
      icon: '✨',
      title: 'All tasks completed',
      description: "You're all caught up! Take a break or add a new task.",
    },
    completed: {
      icon: '🎉',
      title: 'No completed tasks',
      description: 'Start completing tasks to see them here.',
    },
  };

  const msg = messages[filterType] || messages.all;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-6xl mb-4"
      >
        {msg.icon}
      </motion.div>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{msg.title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm text-center">{msg.description}</p>
    </motion.div>
  );
}
