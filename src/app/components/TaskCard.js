// components/TaskCard.js
import React from "react";
import Link from "next/link";

const TaskCard = ({ task }) => {
  const { title, description, priority, status, tags, assignedTo } = task;

  // Priority and Status color mapping
  const priorityColors = {
    High: "bg-red-500",
    Medium: "bg-yellow-500",
    Low: "bg-green-500",
  };

  const statusColors = {
    "To Do": "bg-gray-300 text-gray-800",
    "In Progress": "bg-yellow-300 text-yellow-800",
    Done: "bg-green-300 text-green-800",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col relative">
      {/* Priority Badge */}
      <div
        className={`absolute top-2 right-2 py-1 px-2 text-xs font-medium text-white rounded-full ${priorityColors[priority]}`}
      >
        {priority}
      </div>

      {/* Content Container */}
      <div className="flex-1 flex flex-col">
        {/* User */}
        <div className="text-sm font-medium text-gray-600 mb-2">
          <span className="font-semibold">Assigned to:</span>{" "}
          {assignedTo.join(", ")}
        </div>

        <div className="flex-1 flex flex-col">
          {/* Status Badge */}
          <div
            className={`my-2 py-1 px-2 text-xs font-medium rounded-full ${statusColors[status]}`}
          >
            {status}
          </div>

          {/* Task Title */}
          <h5 className="text-lg font-bold text-gray-800">{title}</h5>

          {/* Task Description */}
          <p className="mt-1 text-gray-600">{description}</p>
        </div>

        {/* Tags */}
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Link */}
      <div className="mt-4 text-right">
        <Link href={`/task/${task.id}`}>
          <div className="text-blue-600 hover:underline">More details</div>
        </Link>
      </div>
    </div>
  );
};

export default TaskCard;
