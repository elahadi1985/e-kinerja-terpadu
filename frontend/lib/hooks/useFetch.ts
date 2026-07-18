'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api/client';

interface UseFetchOptions {
  enabled?: boolean;
  refetchInterval?: number;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export const useFetch = <T = any>(
  url: string,
  options: UseFetchOptions = {}
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { enabled = true, refetchInterval = 0, onSuccess, onError } = options;

  const fetchData = useCallback(async () => {
    if (!enabled) return;

    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<T>(url);
      setData(response.data as T);
      onSuccess?.(response.data);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch data';
      setError(errorMessage);
      onError?.(err);
    } finally {
      setLoading(false);
    }
  }, [url, enabled, onSuccess, onError]);

  useEffect(() => {
    fetchData();

    if (refetchInterval > 0) {
      const interval = setInterval(fetchData, refetchInterval);
      return () => clearInterval(interval);
    }
  }, [fetchData, refetchInterval]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
};
