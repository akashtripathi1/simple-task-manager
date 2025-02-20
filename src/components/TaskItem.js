import React, { useContext } from 'react';
import { useTasks } from '../context/TaskContext';

const TaskItem = ({ task }) => {
  const { deleteTask, toggleComplete, editTask } = useTasks();
  const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <div className={`mb-2 p-4 border-l-4 rounded shadow ${task.priority}-priority bg-white`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </h3>
          <p className={`text-gray-600 ${task.completed ? 'line-through' : ''}`}>{task.description}</p>
          <div className="mt-2 text-sm">
            <span className="text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
            {isOverdue && !task.completed && (
              <span className="ml-2 text-red-500">Overdue</span>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-2 ml-4">
          <button
            onClick={() => toggleComplete(task.id)}
            className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            {task.completed ? 'Mark Active' : 'Complete'}
          </button>
          <button
            onClick={() => editTask(task)}
            className="px-2 py-1 text-sm bg-blue-200 rounded hover:bg-blue-300"
          >
            Edit
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="px-2 py-1 text-sm bg-red-200 rounded hover:bg-red-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;