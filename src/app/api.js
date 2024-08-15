// src/app/api.js
import PocketBase from 'pocketbase';
import setup, { createTaskfummy, createUser, setupData } from './setup';

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

export const register = async (email, password) => {
  try {
    const newUser = await pocketbase.collection('users').create({
      email,
      password,
      passwordConfirm: password,
    });
    return newUser;
  } catch (error) {
    throw new Error('Registration failed.');
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

export const addComment = async (taskId, comment) => {
  try {
    const updatedTask = await pocketbase.collection('tasks').update(taskId, {
      $push: { comments: comment },
    });
    return updatedTask;
  } catch (error) {
    throw new Error('Failed to add comment.');
  }
};

export const editComment = async (taskId, commentId, updatedComment) => {
  try {
    const task = await pocketbase.collection('tasks').getOne(taskId);
    const updatedComments = task.comments.map((comment) =>
      comment.id === commentId ? { ...comment, text: updatedComment } : comment
    );
    const updatedTask = await pocketbase.collection('tasks').update(taskId, {
      comments: updatedComments,
    });
    return updatedTask;
  } catch (error) {
    throw new Error('Failed to edit comment.');
  }
};