
import React, { useState, useEffect } from 'react';
import { Todo } from './types';
import TodoItem from './components/TodoItem';
import { PlusIcon } from './components/icons';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
        const localData = localStorage.getItem('todos');
        return localData ? JSON.parse(localData) : [];
    } catch (error) {
        console.error("Gagal memuat tugas dari localStorage", error);
        return [];
    }
  });
  const [newTodo, setNewTodo] = useState<string>('');
  
  useEffect(() => {
    try {
        localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
        console.error("Gagal menyimpan tugas ke localStorage", error);
    }
  }, [todos]);

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;
    const todo: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };
    setTodos([todo, ...todos]);
    setNewTodo('');
  };

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const remainingTasks = todos.filter(todo => !todo.completed).length;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans">
      <main className="w-full max-w-2xl mx-auto">
        <div className="bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8">
          <header className="mb-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white">
              Daftar Tugas
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Atur harimu, selesaikan tugasmu.
            </p>
          </header>

          <form onSubmit={handleAddTodo} className="flex gap-2 mb-6">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Apa yang ingin kamu lakukan?"
              className="flex-grow p-3 bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-lg border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary-hover text-white font-bold p-3 rounded-lg flex items-center justify-center transition-colors shadow-md hover:shadow-lg disabled:bg-slate-400 disabled:cursor-not-allowed"
              disabled={newTodo.trim() === ''}
              aria-label="Tambah tugas baru"
            >
              <PlusIcon className="h-6 w-6" />
            </button>
          </form>

          <div className="space-y-3 h-96 overflow-y-auto pr-2">
            {todos.length > 0 ? (
              <ul className="space-y-3">
                {todos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={handleToggleTodo}
                    onDelete={handleDeleteTodo}
                  />
                ))}
              </ul>
            ) : (
              <div className="text-center py-10">
                <p className="text-slate-500 dark:text-slate-400">
                  Kamu belum punya tugas. Ayo tambahkan satu!
                </p>
              </div>
            )}
          </div>
          
          {todos.length > 0 && (
            <footer className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-slate-500 dark:text-slate-400">
                <span>
                    {remainingTasks} tugas tersisa
                </span>
                <button
                    onClick={handleClearCompleted}
                    className="text-sm font-medium hover:text-danger dark:hover:text-danger-hover transition-colors"
                >
                    Hapus yang Selesai
                </button>
            </footer>
          )}
        </div>
        <p className="text-center mt-8 text-sm text-slate-500 dark:text-slate-400">Dibuat dengan React & Tailwind CSS.</p>
      </main>
    </div>
  );
};

export default App;
