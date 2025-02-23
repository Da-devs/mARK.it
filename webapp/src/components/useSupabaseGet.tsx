"use client"

import { AuthData, SupabaseGetOptions } from '@/types';
import { useState } from 'react';

export const useSupabaseGet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getFromSupabase = async <T,>(
    endpoint: string,
    authData: AuthData,
    options?: SupabaseGetOptions
  ): Promise<T | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Construct URL with query parameters if provided
      let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`;
      if (options?.queryParams) {
        const params = new URLSearchParams(options.queryParams);
        url += `?${params.toString()}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authData.session_token}`,
          ...(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && { 'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY })
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        const text = await response.text();
        // Only parse if there's actual content
        data = text ? JSON.parse(text) : null;
      } else {
        // Handle non-JSON responses
        data = await response.text();
      }

      // If the response is empty but status is ok, consider it successful
      if (response.ok) {
        options?.onSuccess?.(data);
        return data as T;
      }

      return null;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      const error = new Error(errorMessage);
      setError(error);
      options?.onError?.(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getFromSupabase,
    isLoading,
    error
  };
};