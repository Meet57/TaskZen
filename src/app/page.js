"use client";

// src/app/page.js
import { useContext } from "react";
import { TaskContext } from "./context/TaskContext";
import TaskCard from "./components/TaskCard";
import SearchBar from "./components/SearchBar";
import { Empty } from "antd"; // Import the Empty component from Ant Design

export default function Home() {
  const { tasks } = useContext(TaskContext);

  return (
    <div className="p-6">
      <SearchBar />
      {tasks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <Empty description="No Tasks Available" /> // Display the Empty component if no tasks
      )}
    </div>
  );
}
