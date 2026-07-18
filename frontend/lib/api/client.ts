import axios, { AxiosInstance, AxiosError } from 'axios';
import { API_BASE_URL, API_TIMEOUT } from '@/lib/constants/api';
import { ApiResponse } from '@/lib/types';

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Redirect to login
          if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken');
            window.location.href = '/auth/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  async get<T = any>(url: string, config = {}) {
    try {
      const response = await this.instance.get<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async post<T = any>(url: string, data?: any, config = {}) {
    try {
      const response = await this.instance.post<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async put<T = any>(url: string, data?: any, config = {}) {
    try {
      const response = await this.instance.put<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async patch<T = any>(url: string, data?: any, config = {}) {
    try {
      const response = await this.instance.patch<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async delete<T = any>(url: string, config = {}) {
    try {
      const response = await this.instance.delete<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  private handleError(error: AxiosError) {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    const errors = error.response?.data?.errors;
    
    return {
      message,
      errors,
      status: error.response?.status,
    };
  }
}

export const apiClient = new ApiClient();
