import React, { useState } from 'react';
import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import TaskFilters from '../components/TaskFilters';
import TaskList from '../components/TaskList';
import { useTasks } from '../context/TaskContext';

const Dashboard = () => {
  const { filteredTasks } = useTasks();
  const [editTask, setEditTask] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <TaskForm editTask={editTask} setEditTask={setEditTask} />
            <TaskFilters />
          </div>
          <div className="lg:col-span-2">
            <TaskList tasks={filteredTasks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;