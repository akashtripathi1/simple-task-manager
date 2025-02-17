import React, { createContext, useContext, useEffect, useState } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  const addTask = (task) => {
    saveTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
  };

  const editTask = (updatedTask) => {
    console.log("Edit clicked");
    saveTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  const deleteTask = (taskId) => {
    saveTasks(tasks.filter(t => t.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    saveTasks(tasks.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    ));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'completed' ? task.completed : !task.completed);
    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <TaskContext.Provider value={{
      tasks,
      filteredTasks,
      addTask,
      editTask,
      deleteTask,
      toggleComplete,
      searchTerm,
      setSearchTerm,
      filterPriority,
      setFilterPriority,
      filterStatus,
      setFilterStatus
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);