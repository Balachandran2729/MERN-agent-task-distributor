'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/LoginForm';
import { CreateAccountForm } from '@/components/CreateAccountForm';
import { isAuthenticated, setAuthToken } from '@/lib/auth';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogin = async (email, password) => {
    // Client-side validation
    if (!email || !password) {
      toast.error('Please fill in both email and password fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setAuthToken(data.token);
        toast.success('Login successful!');
        router.push('/dashboard');
      } else {
        toast.error(data.message || 'Invalid credentials');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAccount = async (email, password) => {
    // Client-side validation
    if (!email || !password) {
      toast.error('Please fill in both email and password fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Account created successfully! Please login.');
        // Redirect to login page
        setShowCreateAccount(false);
      } else {
        toast.error(data.message || 'Failed to create account');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Task Distribution</h1>
          <p className="text-dark-400">
            {showCreateAccount ? 'Create New Account' : 'Admin Dashboard Login'}
          </p>
        </div>
        
        {showCreateAccount ? (
          <CreateAccountForm 
            onSubmit={handleCreateAccount} 
            loading={isLoading}
            onBackToLogin={() => setShowCreateAccount(false)}
          />
        ) : (
          <LoginForm 
            onSubmit={handleLogin} 
            loading={isLoading}
            onCreateAccount={() => setShowCreateAccount(true)}
          />
        )}
        
        <div className="mt-6 text-center text-sm text-dark-400">
          <p>Note : <strong>If You are New User, First Create Account !</strong> </p>
        </div>
      </div>
    </div>
  );
}