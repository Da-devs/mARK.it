"use client"
import React, { useState } from 'react';
import { AuthInput } from '@/components/auth/AuthInput';
import { GoogleButton } from '@/components/auth/GoogleButton';
import { Divider } from '@/components/auth/Divider';
import { signup, signInWithGoogle } from '@/lib/auth-actions';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);  // Track form submission

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
  
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0) {
      try {
        const formDataObj = new FormData();
        formDataObj.append('first-name', formData.firstName);
        formDataObj.append('last-name', formData.lastName);
        formDataObj.append('email', formData.email);
        formDataObj.append('password', formData.password);
        formDataObj.append('confirm-password', formData.confirmPassword);

        await signup(formDataObj);
        setIsSubmitted(true); // Show confirmation message after successful signup
      } catch (error) {
        console.error('Signup failed:', error);
      }
    }
  };

  // ✅ Show email confirmation page after signup
  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Check Your Email</h2>
          <p className="text-gray-600 dark:text-gray-400">
            We’ve sent a confirmation link to <strong>{formData.email}</strong>. 
            Please check your inbox and click the link to activate your account.
          </p>
          <p className="text-sm text-gray-500">
            Didn’t receive an email? <a href="/resend-verification" className="text-blue-600 hover:text-blue-500">Resend it</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:text-blue-500">
              Sign in
            </a>
          </p>
        </div>

        <GoogleButton onClick={signInWithGoogle} isSignUp />
        <Divider />

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* First Name & Last Name in one row */}
          <div className="flex gap-4">
            <AuthInput
              label="First Name"
              type="text"
              name="first-name"
              id="first-name"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              error={errors.firstName}
            />
            <AuthInput
              label="Last Name"
              type="text"
              name="last-name"
              id="last-name"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              error={errors.lastName}
            />
          </div>

          <AuthInput
            label="Email address"
            type="email"
            name='email'
            id='email'
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
          />

          <AuthInput
            label="Password"
            type="password"
            name='password'
            id='password'
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={errors.password}
          />

          <AuthInput
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            error={errors.confirmPassword}
          />

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
