// src/app/context/TaskContext.js
"use client";
import React, { createContext, useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask, addComment, editComment } from '../api';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    status: '',
    assignedUser: '',
    tags: [],
    searchText: '' // Added for text-based search
  });

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const taskList = await fetchTasks();
        setTasks(taskList);

        const allTags = taskList.reduce((acc, task) => {
          task.tags.forEach(tag => {
            if (!acc.includes(tag)) {
              acc.push(tag);
            }
          });
          return acc;
        }, []);

        setTags(allTags);
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
    const matchesText = task.title.toLowerCase().includes(filter.searchText.toLowerCase()) || 
                        task.description.toLowerCase().includes(filter.searchText.toLowerCase());
    return (
      matchesText &&
      (!filter.status || task.status === filter.status) &&
      (!filter.assignedUser || task.assignedUsers.includes(filter.assignedUser)) &&
      (!filter.tags.length || filter.tags.some(tag => task.tags.includes(tag)))
    );
  });

  return (
    <TaskContext.Provider
      value={{
        tasks: filteredTasks,
        loading,
        error,
        tags,
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
