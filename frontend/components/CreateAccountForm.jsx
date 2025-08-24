'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Lock, ArrowLeft, UserPlus } from 'lucide-react';

export function CreateAccountForm({ onSubmit, loading, onBackToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!email || !password || !confirmPassword) {
      // Validation is handled in parent component with toast
      return;
    }
    
    if (password !== confirmPassword) {
      // This will be handled with toast in parent
      return;
    }
    
    if (password.length < 6) {
      // This will be handled with toast in parent
      return;
    }
    
    onSubmit(email, password);
  };

  return (
    <Card className="border-dark-600 bg-dark-800/50 backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-xl flex items-center justify-center">
          <UserPlus className="h-5 w-5 mr-2" />
          Create Account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="create-email" className="block text-sm font-medium text-dark-300 mb-1">
              Email address *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-dark-400" />
              </div>
              <Input
                id="create-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="create-password" className="block text-sm font-medium text-dark-300 mb-1">
              Password *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-dark-400" />
              </div>
              <Input
                id="create-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                placeholder="••••••••"
                minLength="6"
              />
            </div>
            <p className="text-xs text-dark-500 mt-1">Minimum 6 characters</p>
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-dark-300 mb-1">
              Confirm Password *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-dark-400" />
              </div>
              <Input
                id="confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`pl-10 ${password && confirmPassword && password !== confirmPassword ? 'border-error-500' : ''}`}
                placeholder="••••••••"
              />
            </div>
          </div>

          {password && confirmPassword && password !== confirmPassword && (
            <div className="text-sm text-error-400 flex items-center">
              <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Passwords do not match
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            loading={loading}
            disabled={loading || (password && confirmPassword && password !== confirmPassword) || password.length < 6}
          >
            Create Account
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={onBackToLogin}
              className="inline-flex items-center text-sm text-dark-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Login
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}