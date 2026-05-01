import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function StatsCard({ label, value, icon, color }) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let current = 0;
      const increment = value / 10;
      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setAnimatedValue(value);
          clearInterval(interval);
        } else {
          setAnimatedValue(Math.floor(current));
        }
      }, 30);
      return () => clearInterval(interval);
    }, 100);
    return () => clearTimeout(timeout);
  }, [value]);

  const bgGradients = {
    blue: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
    green: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
    purple: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
  };

  const iconBg = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-600',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`card-premium p-6 bg-gradient-to-br ${bgGradients[color] || bgGradients.blue}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{label}</p>
          <motion.p
            key={animatedValue}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gradient"
          >
            {animatedValue}
          </motion.p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${iconBg[color] || iconBg.blue}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
