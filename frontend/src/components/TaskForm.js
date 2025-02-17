import React, { useState, useContext } from 'react';
import { useTasks } from '../context/TaskContext';

const TaskForm = ({ editTask, setEditTask }) => {
  const { addTask, editTask: updateTask } = useTasks();
  const [task, setTask] = useState(editTask || {
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) return;

    if (editTask) {
      updateTask(task);
      setEditTask(null);
    } else {
      addTask(task);
    }
    setTask({ title: '', description: '', dueDate: '', priority: 'medium' });
  };

  return (
    <div className='flex flex-col  p-2'>

    <form onSubmit={handleSubmit} className=" mb-6 bg-white p-4 rounded shadow">
      <input
        type="text"
        placeholder="Task title"
        className="w-full p-2 mb-2 border rounded"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        required
        />
      <textarea
        placeholder="Task description"
        className="w-full p-2 mb-2 border rounded"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
      <input
        type="date"
        className="w-full p-2 mb-2 border rounded"
        value={task.dueDate}
        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
        required
        />
      <select
        className="w-full p-2 mb-2 border rounded"
        value={task.priority}
        onChange={(e) => setTask({ ...task, priority: e.target.value })}
        >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
        {editTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
</div>
  );
};

export default TaskForm;