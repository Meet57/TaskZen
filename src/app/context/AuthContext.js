// src/app/context/AuthContext.js
"use client";

import React, { createContext, useState, useEffect } from 'react';
import { login, logout, checkSession, register, forgotPassword, getUserDetails } from '../api';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        let users = await userDetails();
        console.log(users);
        
        setUsers(users);
      } catch (error) {
        setError(error.message);
      }
      setError(null);
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
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    validateSession();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      const authData = await login(email, password);
      console.log(authData);
      setUser(authData.user);
      setIsAuthenticated(true);
      if (router) router.push('/');
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setIsAuthenticated(false);
    if (router) router.push('/auth/login');
  };

  const handleRegister = async (email, password) => {
    try {
      const newUser = await register(email, password);
      setUser(newUser);
      setIsAuthenticated(true);
      if (router) router.push('/');
    } catch (error) {
      setError(error.message);
    }
  };

  const userDetails = async () => {
    try {
      let users = await getUserDetails();
      console.log(users);
      
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
      setError(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
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
