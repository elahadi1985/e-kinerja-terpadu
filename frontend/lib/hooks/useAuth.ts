'use client';

import { useState, useCallback, useEffect } from 'react';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/constants/api';
import { User, LoginFormData } from '@/lib/types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const response = await apiClient.get<User>(API_ENDPOINTS.AUTH.PROFILE);
          setUser(response.data as User);
        }
      } catch (err: any) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (credentials: LoginFormData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post<{ token: string; user: User }>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );
      localStorage.setItem('authToken', response.data?.token || '');
      setUser(response.data?.user || null);
      return response;
    } catch (err: any) {
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('authToken');
      setUser(null);
    }
  }, []);

  const isAuthenticated = !!user && !!localStorage.getItem('authToken');

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
  };
};
