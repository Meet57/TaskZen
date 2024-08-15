// src/app/context/AuthContext.js
"use client";

import React, { createContext, useState, useEffect } from 'react';
import { login, logout, checkSession, register, forgotPassword } from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children, router }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const validateSession = async () => {
      try {
        const session = await checkSession();
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
      const authData = await login(email, password);
      setUser(authData.user);
      setIsAuthenticated(true);
      if (router) router.push('/');
    } catch (error) {
      setError(error.message);
    }
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
