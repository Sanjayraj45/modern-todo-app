import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import TaskCard from './components/TaskCard';
import StatsCard from './components/StatsCard';
import FloatingAddButton from './components/FloatingAddButton';
import EmptyState from './components/EmptyState';
import { loadTasks, saveTasks } from './utils/taskStorage';

const initialTasks = [
  { id: 1, title: 'Design the perfect dashboard layout', completed: false, deadline: '2025-07-20' },
  { id: 2, title: 'Implement smooth animations', completed: true, deadline: '2025-07-10' },
  { id: 3, title: 'Add dark mode support', completed: true, deadline: null },
  { id: 4, title: 'Polish the UI components', completed: false, deadline: '2025-07-25' },
  { id: 5, title: 'Test responsiveness', completed: false, deadline: null },
];

function App() {
  const [tasks, setTasks] = useState(loadTasks() ?? initialTasks);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    const stored = localStorage.getItem('todo-theme');
    if (stored === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    });
  }, [tasks, filter]);

  const handleAddTask = (title, deadline) => {
    setTasks((prev) => [
      { id: Date.now(), title, completed: false, deadline: deadline ?? null },
      ...prev,
    ]);
  };

  const handleToggle = (id) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const activeCount = tasks.length - completedCount;

  const filterLabels = {
    all: 'All Tasks',
    active: 'Active Tasks',
    completed: 'Completed Tasks',
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Sidebar */}
      <Sidebar
        activeFilter={filter}
        onFilterChange={setFilter}
        totalTasks={tasks.length}
        completedTasks={completedCount}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64 overflow-hidden">
        {/* Top Bar */}
        <TopBar filterLabel={filterLabels[filter]} />

        {/* Main Area */}
        <main className="flex-1 overflow-y-auto pt-20">
          <div className="p-8 max-w-6xl">
            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              <StatsCard label="Total Tasks" value={tasks.length} icon="📋" color="blue" />
              <StatsCard label="Active" value={activeCount} icon="🔥" color="purple" />
              <StatsCard label="Completed" value={completedCount} icon="✓" color="green" />
            </motion.div>

            {/* Tasks Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card-premium p-8"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  {filterLabels[filter]}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
                </p>
              </div>

              <AnimatePresence mode="wait">
                {filteredTasks.length === 0 ? (
                  <EmptyState filterType={filter} key="empty" />
                ) : (
                  <motion.div key="tasks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                    {filteredTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Floating Add Button */}
      <FloatingAddButton onAdd={handleAddTask} />
    </div>
  );
}

export default App;
