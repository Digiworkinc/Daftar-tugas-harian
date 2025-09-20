
import React from 'react';
import { Todo } from '../types';
import { TrashIcon } from './icons';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li
      className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
        todo.completed
          ? 'bg-green-100 dark:bg-green-900/50'
          : 'bg-slate-50 dark:bg-slate-800'
      }`}
    >
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="h-6 w-6 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
        />
        <span
          className={`text-lg transition-all duration-300 ${
            todo.completed
              ? 'line-through text-slate-500 dark:text-slate-400'
              : 'text-slate-800 dark:text-slate-200'
          }`}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-slate-400 hover:text-danger dark:hover:text-danger-hover transition-colors"
        aria-label={`Hapus tugas ${todo.text}`}
      >
        <TrashIcon className="h-6 w-6" />
      </button>
    </li>
  );
};

export default TodoItem;
