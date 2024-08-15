// src/app/context/TaskContext.js
"use client";
import React, { createContext, useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask, addComment, editComment } from '../api';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({ status: '', assignedUser: '', tags: [] });

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const taskList = await fetchTasks();
        console.log(JSON.stringify(taskList));
        setTasks(taskList);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await createTask(taskData);
      setTasks([...tasks, newTask]);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      const updatedTask = await updateTask(taskId, updates);
      setTasks(tasks.map(task => (task.id === taskId ? updatedTask : task)));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddComment = async (taskId, comment) => {
    try {
      const updatedTask = await addComment(taskId, comment);
      setTasks(tasks.map(task => (task.id === taskId ? updatedTask : task)));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditComment = async (taskId, commentId, updatedComment) => {
    try {
      const updatedTask = await editComment(taskId, commentId, updatedComment);
      setTasks(tasks.map(task => (task.id === taskId ? updatedTask : task)));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFilterTasks = (filterCriteria) => {
    setFilter(filterCriteria);
  };

  const filteredTasks = tasks.filter(task => {
    return (
      (!filter.status || task.status === filter.status) &&
      (!filter.assignedUser || task.assignedUsers.includes(filter.assignedUser)) &&
      (!filter.tags.length || filter.tags.every(tag => task.tags.includes(tag)))
    );
  });

  return (
    <TaskContext.Provider
      value={{
        tasks: filteredTasks,
        loading,
        error,
        handleCreateTask,
        handleUpdateTask,
        handleDeleteTask,
        handleAddComment,
        handleEditComment,
        handleFilterTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
