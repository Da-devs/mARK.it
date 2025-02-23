"use client"
import React, { useState, useEffect } from 'react';
import { AuthInput } from '@/components/auth/AuthInput';
import { GoogleButton } from '@/components/auth/GoogleButton';
import { Divider } from '@/components/auth/Divider';
import { login, signInWithGoogle } from '@/lib/auth-actions';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/utils/authContext';

const Login: React.FC = () => {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [extensionStatus, setExtensionStatus] = useState<'synced' | 'failed' | null>(null);

  useEffect(() => {
    // Check extension sync status
    const syncStatus = localStorage.getItem('extensionSynced');
    if (syncStatus === 'true') {
      setExtensionStatus('synced');
    } else if (syncStatus === 'false') {
      setExtensionStatus('failed');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
  
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      try {
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('email', formData.email);
        formDataToSubmit.append('password', formData.password);
        
        await login(formDataToSubmit);
        await refreshUser();
        router.push('/');
      } catch (error) {
        console.error('Login failed:', error);
        setErrors({ submit: 'Login failed. Please try again.' });
      }
    }
  };
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-600 hover:text-blue-500">
              Sign up
            </a>
          </p>
        </div>

        <GoogleButton onClick={signInWithGoogle} />
        <Divider />

        <form className="space-y-6" onSubmit={handleSubmit}>
          <AuthInput
            label="Email address"
            type="email"
            name="email"
            id='email'
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
          />

          <AuthInput
            label="Password"
            type="password"
            id="password"
            name='password'
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={errors.password}
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                Remember me
              </label>
            </div>

            <a href="/forgot-password" className="text-sm dark:text-white hover:text-blue-500 dark:hover:text-blue-400">
              Forgot your password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign in
          </button>
        </form>
          {extensionStatus === 'failed' && (
        <div className="text-red-500 text-sm mt-2">
          Failed to sync with extension. Please try reinstalling the extension.
        </div>
      )}
      </div>
    </div>
  );
};

export default Login;