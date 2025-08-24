'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';

export function AgentForm({ onAgentAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/agents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        onAgentAdded();
        setFormData({ name: '', email: '', mobile: '', password: '' });
      } else {
        toast.error(data.message || 'Failed to create agent');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-dark-300 mb-1">
            Full Name
          </label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Agent Full Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-300 mb-1">
            Email Address
          </label>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="agent@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-300 mb-1">
            Mobile Number
          </label>
          <Input
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            placeholder="+1234567890"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-300 mb-1">
            Password
          </label>
          <Input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
            placeholder="Minimum 6 characters"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="submit" loading={loading} disabled={loading}>
          Create Agent
        </Button>
      </div>
    </form>
  );
}