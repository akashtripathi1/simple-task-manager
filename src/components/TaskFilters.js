import React, { useContext } from 'react';
import { useTasks } from '../context/TaskContext';

const TaskFilters = () => {
  const { 
    searchTerm, 
    setSearchTerm,
    filterPriority,
    setFilterPriority,
    filterStatus,
    setFilterStatus
  } = useTasks();

  return (
    <div className="mb-4 bg-white p-4 rounded shadow">
      <input
        type="text"
        placeholder="Search tasks..."
        className="w-full p-2 mb-2 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-2 gap-2">
        <select
          className="p-2 border rounded"
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select
          className="p-2 border rounded"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="completed">Completed</option>
          <option value="active">Active</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilters;