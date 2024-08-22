// src/app/api.js
import PocketBase from 'pocketbase';

const POCKETBASE_URL = process.env.POCKETBASE_URL || "http://localhost:8090";

const pocketbase = new PocketBase(POCKETBASE_URL);

// Function to check and refresh the session
export const checkSession = async () => {
  try {
    // Refresh auth data
    await pocketbase.collection('users').authRefresh();

    if (pocketbase.authStore.isValid) {
      return { user: pocketbase.authStore.model };
    }
    return null;
  } catch (error) {
    console.error("Failed to check session:", error);
    throw error;
  }
};

// Authentication API
export const login = async (email, password) => {
  try {
    const authData = await pocketbase.collection('users').authWithPassword(email, password);
    return authData;
  } catch (error) {
    throw new Error('Login failed. Please check your credentials.');
  }
};

export const logout = async () => {
  pocketbase.authStore.clear();
};

export const registerUser = async (username, email, password, name) => {
  try {
    const response = await pocketbase.collection('users').create({
      username,
      email,
      password,
      name,
      emailVisibility: true,
      passwordConfirm: password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const getUserDetails = async () => {
  try {
    const users = await pocketbase.collection('users').getFullList();    
    return users;
  } catch (error) {
    throw new Error('Failed to fetch users.');
  }
};

export const forgotPassword = async (email) => {
  try {
    await pocketbase.collection('users').requestPasswordReset(email);
  } catch (error) {
    throw new Error('Password reset failed.');
  }
};

// Tasks API
export const fetchTasks = async () => {
  try {
    const tasks = await pocketbase.collection('tasks').getFullList();
    return tasks;
  } catch (error) {
    throw new Error('Failed to fetch tasks.');
  }
};

export const createTask = async (taskData) => {
  try {
    const task = await pocketbase.collection('tasks').create(taskData);
    return task;
  } catch (error) {
    throw new Error('Failed to create task.');
  }
};

export const updateTask = async (taskId, updates) => {
  try {
    const updatedTask = await pocketbase.collection('tasks').update(taskId, updates);
    return updatedTask;
  } catch (error) {
    throw new Error('Failed to update task.');
  }
};

export const deleteTask = async (taskId) => {
  try {
    await pocketbase.collection('tasks').delete(taskId);
  } catch (error) {
    throw new Error('Failed to delete task.');
  }
};

export const fetchTaskById = async (taskId) => {
  try {
    const task = await pocketbase.collection('tasks').getOne(taskId);
    return task;
  } catch (error) {
    throw new Error('Failed to fetch task details.');
  }
};

export const fetchCommentsByTaskId = async (taskId) => {
  try {
    const comments = await pocketbase.collection('comments').getFullList({
      filter: `taskId = '${taskId}'`
    });
    return comments;
  } catch (error) {
    throw new Error('Failed to fetch comments.');
  }
};

export const addComment = async (taskId, commentText, username, name) => {
  try {
    console.log({ taskId, commentText, username, name });
    const newComment = {
      taskId,
      username,
      name,
      content: commentText,
    };
    const response = await pocketbase.collection('comments').create(newComment);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add comment.');
  }
};

export const deleteComment = async (commentId) => {
  try {
    await pocketbase.collection('comments').delete(commentId);
  } catch (error) {
    throw new Error('Failed to delete comment.');
  }
};

export const editComment = async (commentId, newText) => {
  try {
    await pocketbase.collection('comments').update(commentId, { content: newText });
  } catch (error) {
    throw new Error('Failed to edit comment.');
  }
};
