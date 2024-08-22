"use client";

import React, { createContext, useState, useEffect } from 'react';
import { login, logout, checkSession, registerUser, forgotPassword, getUserDetails } from '../api';
import { useRouter } from 'next/navigation';
import { notification } from 'antd';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        let users = await userDetails();
        console.log(users);
        setUsers(users);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    loadUsers();

    const validateSession = async () => {
      try {
        const session = await checkSession();
        console.log(session, 'session');
        if (session) {
          setUser(session.user);
          setIsAuthenticated(true);
        }
        sessionStorage.setItem('auth', JSON.stringify(session));
      } catch (error) {
        console.error('Failed to validate session:', error);
      } finally {
        setLoading(false);
      }
    };

    validateSession();
  }, []);

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const authData = await login(email, password);
      console.log(authData);
      setUser(authData.user);
      setIsAuthenticated(true);
      sessionStorage.setItem('auth', JSON.stringify(authData));
      if (router) router.push('/');
    } catch (error) {
      notification.error({
        message: 'Login Error',
        description: error.message,
      });
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem('auth');
    if (router) router.push('/auth/login');
  };

  const handleRegister = async (username, email, password, name) => {
    setLoading(true);
    try {
      await registerUser(username, email, password, name);
      if (router) router.push('/auth/login');
    } catch (error) {
      notification.error({
        message: 'Registration Error',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const userDetails = async () => {
    try {
      let users = await getUserDetails();
      return users.map(user => ({
        username: user.username,
        name: user.name,
        id: user.id,
        email: user.email
      }));
    } catch (error) {
      throw new Error('Failed to fetch users.');
    }
  }

  const handleForgotPassword = async (email) => {
    try {
      await forgotPassword(email);
    } catch (error) {
      notification.error({
        message: 'Forgot Password Error',
        description: error.message,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        users,
        userDetails,
        handleLogin,
        handleLogout,
        handleRegister,
        handleForgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
