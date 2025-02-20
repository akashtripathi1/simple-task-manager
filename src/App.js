import React from 'react';
import { TaskProvider } from './context/TaskContext';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <TaskProvider>
      <Dashboard />
    </TaskProvider>
  );
}

export default App;