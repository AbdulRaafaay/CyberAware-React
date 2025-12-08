import React, { createContext, useState, useEffect } from 'react';
import { authAPI, usersAPI } from '../services/backendApi';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  // Check if user is logged in on mount
  useEffect(() => {
    if (token) {
      usersAPI
        .getProfile()
        .then((res) => {
          setUser(res.data.data);
        })
        .catch(() => {
          // Token invalid, clear it
          localStorage.removeItem('authToken');
          setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await authAPI.login({ email, password });
    localStorage.setItem('authToken', res.data.data.token);
    setToken(res.data.data.token);
    setUser(res.data.data.user);
    return res.data;
  };

  const register = async (name, email, password) => {
    const res = await authAPI.register({ name, email, password });
    localStorage.setItem('authToken', res.data.data.token);
    setToken(res.data.data.token);
    setUser(res.data.data.user);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    loading,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
