"use client";
import React, { createContext, useState, useEffect } from "react";
import {
  fetchTasks,
  fetchTaskById,
  createTask,
  updateTask,
  deleteTask,
  fetchCommentsByTaskId,
  addComment,
  editComment,
  deleteComment,
} from "../api";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    status: "",
    assignedUser: "",
    tags: [],
    searchText: "",
  });

  useEffect(() => {
    loadTasks();
  }, []);

  const getSessionDetails = () => {
    const session = sessionStorage.getItem('auth');
    if (session) {
      const authData = JSON.parse(session);
      return authData.user;
    }
    return null;
  };

  const loadTasks = async () => {
    try {
      const taskList = await fetchTasks();
      setTasks(taskList);

      const allTags = taskList.reduce((acc, task) => {
        task.tags.forEach((tag) => {
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

  const handleCreateTask = async (taskData) => {
    try {
      taskData.createdBy = getSessionDetails().username;
      const newTask = await createTask(taskData);
      loadTasks();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      const updatedTask = await updateTask(taskId, updates);
      setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchTaskByID = async (taskId) => {
    try {
      return await fetchTaskById(taskId);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchCommentsByTaskID = async (taskId) => {
    try {
      return await fetchCommentsByTaskId(taskId);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddComment = async (taskId, commentText) => {
    try {
      const user = JSON.parse(sessionStorage.getItem("auth"));
      const updatedTask = await addComment(
        taskId,
        commentText,
        user.user.username,
        user.user.name
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditComment = async (taskId, commentId, newText) => {
    try {
      const updatedTask = await editComment(taskId, commentId, newText);
      setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteComment = async (taskId, commentId) => {
    try {
      const updatedTask = await deleteComment(commentId);
      setTasks(tasks.map((task) => (task.id === taskId ? updatedTask : task)));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFilterTasks = (filterCriteria) => {
    setFilter(filterCriteria);
  };

  const filteredTasks = tasks.filter((task) => {
    if (task) {
      const matchesText =
        task.title.toLowerCase().includes(filter.searchText.toLowerCase()) ||
        task.description
          .toLowerCase()
          .includes(filter.searchText.toLowerCase());
      return (
        matchesText &&
        (!filter.status || task.status === filter.status) &&
        (!filter.assignedUser ||
          task.assignedUsers.includes(filter.assignedUser)) &&
        (!filter.tags.length ||
          filter.tags.some((tag) => task.tags.includes(tag)))
      );
    }
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
        fetchTaskById: fetchTaskByID,
        fetchCommentsByTaskId: fetchCommentsByTaskID,
        addComment: handleAddComment,
        editComment: handleEditComment,
        deleteComment: handleDeleteComment,
        handleFilterTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
