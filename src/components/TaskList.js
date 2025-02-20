import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks }) => {
  const categorizeTasks = (allTasks) => {
    const now = new Date();
    return allTasks.reduce((acc, task) => {
      if (task.completed) {
        acc.completed.push(task);
      } else if (new Date(task.dueDate) < now) {
        acc.overdue.push(task);
      } else {
        acc.upcoming.push(task);
      }
      return acc;
    }, { upcoming: [], overdue: [], completed: [] });
  };

  const { upcoming, overdue, completed } = categorizeTasks(tasks);

  const renderSection = (title, tasks) => (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">{title} ({tasks.length})</h2>
      {tasks.length > 0 ? (
        tasks.map(task => <TaskItem key={task.id} task={task} />)
      ) : (
        <p className="text-gray-500">No tasks in this category</p>
      )}
    </div>
  );

  return (
    <div>
      {renderSection('Upcoming Tasks', upcoming)}
      {renderSection('Overdue Tasks', overdue)}
      {renderSection('Completed Tasks', completed)}
    </div>
  );
};

export default TaskList;