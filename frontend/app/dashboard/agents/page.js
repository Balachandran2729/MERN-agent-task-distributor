'use client';

import { useState, useEffect } from 'react';
import { AgentForm } from '@/components/AgentForm';
import { AgentList } from '@/components/AgentList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AgentsPage() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/agents`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAgents(data);
      } else {
        throw new Error('Failed to fetch agents');
      }
    } catch (error) {
      toast.error('Failed to load agents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleAgentAdded = () => {
    fetchAgents();
    setShowForm(false);
    toast.success('Agent created successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Agent Management</h1>
          <p className="text-dark-400 mt-1">Manage your task distribution agents</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          {showForm ? 'Cancel' : 'Add Agent'}
        </button>
      </div>

      {showForm && (
        <Card className="border-dark-600 bg-dark-800">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Create New Agent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AgentForm onAgentAdded={handleAgentAdded} />
          </CardContent>
        </Card>
      )}

      <AgentList agents={agents} loading={loading} onRefresh={fetchAgents} />
    </div>
  );
}