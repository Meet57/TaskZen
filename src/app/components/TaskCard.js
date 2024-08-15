// components/TaskCard.js
import React from 'react';

const TaskCard = ({ task }) => {
  const { title, description, priority, status, tags, assignedTo } = task;

  // Priority and Status color mapping
  const priorityColors = {
    High: 'bg-red-500',
    Medium: 'bg-yellow-500',
    Low: 'bg-green-500',
  };

  const statusColors = {
    'To Do': 'bg-gray-300 text-gray-800',
    'In Progress': 'bg-yellow-300 text-yellow-800',
    Done: 'bg-green-300 text-green-800',
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col relative">
      {/* Priority Badge */}
      <div className={`absolute top-2 right-2 py-1 px-2 text-xs font-medium text-white rounded-full ${priorityColors[priority]}`}>
        {priority}
      </div>

      {/* User */}
      <div className="text-sm font-medium text-gray-600 mb-2">
        <span className="font-semibold">Assigned to:</span> {assignedTo.join(', ')}
      </div>

      {/* Status Badge */}
      <div className={`my-2 py-1 px-2 text-xs font-medium rounded-full ${statusColors[status]}`}>
        {status}
      </div>

      {/* Task Title */}
      <h5 className="text-lg font-bold text-gray-800">{title}</h5>
      
      {/* Task Description */}
      <p className="mt-1 text-gray-600">{description}</p>

      {/* Tags */}
      <div className="mt-2 flex flex-wrap gap-1">
        {tags.map((tag, index) => (
          <span key={index} className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      
      {/* Read More Button */}
      <a href="#" className="mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500">
        View
      </a>
    </div>
  );
};

export default TaskCard;
