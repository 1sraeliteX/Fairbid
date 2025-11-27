'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// Note: Commenting out useAuth as it's not currently in the project
// import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/auth/Login';

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  // Temporary login function until auth context is set up
  const login = async (email: string, password: string) => {
    // This is a placeholder. In a real app, you would call your authentication API
    console.log('Login attempt with:', { email, password });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          resolve({ success: true });
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };

  const handleSubmit = async (email: string, password: string) => {
    if (!login) {
      setError('Authentication service is not available');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      await login(email, password);
      router.push('/profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm onSubmit={handleSubmit} isLoading={isLoading} error={error} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
