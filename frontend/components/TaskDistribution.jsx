'use client';

import { useState, useEffect } from 'react';
import { LoadingSpinner } from '@/components/ui/loading';
import { Button } from '@/components/ui/button';
import { RefreshCw, User, Phone, FileText } from 'lucide-react';
import { toast } from 'react-hot-toast';

export function TaskDistribution({ agents, refreshKey }) {
  const [tasksByAgent, setTasksByAgent] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    if (agents.length === 0) return;

    setLoading(true);
    try {
      const tasksData = {};
      for (const agent of agents) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/tasks/agent/${agent._id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          });

          if (response.ok) {
            const tasks = await response.json();
            tasksData[agent._id] = tasks;
          }
        } catch (error) {
          console.error(`Error fetching tasks for agent ${agent._id}:`, error);
        }
      }
      setTasksByAgent(tasksData);
    } catch (error) {
      toast.error('Failed to load task distribution');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [agents, refreshKey]);

  const handleRefresh = () => {
    fetchTasks();
  };

  if (agents.length === 0) {
    return (
      <div className="text-center py-8">
        <User className="h-12 w-12 text-dark-500 mx-auto mb-3" />
        <p className="text-dark-400">No agents found. Create agents first.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-dark-400">
          {agents.length} agent{agents.length !== 1 ? 's' : ''} available
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center"
        >
          <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {agents.map((agent) => (
            <div key={agent._id} className="border border-dark-600 rounded-lg bg-dark-700/50">
              <div className="p-3 border-b border-dark-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-primary-500/20 flex items-center justify-center mr-3">
                      <span className="text-primary-400 font-medium text-sm">
                        {agent.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white">{agent.name}</h4>
                      <p className="text-xs text-dark-400">{agent.email}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-dark-600 text-dark-300">
                    {tasksByAgent[agent._id]?.length || 0} tasks
                  </span>
                </div>
              </div>
              
              <div className="p-3">
                {tasksByAgent[agent._id] && tasksByAgent[agent._id].length > 0 ? (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {tasksByAgent[agent._id].slice(0, 5).map((task, index) => (
                      <div key={task._id} className="flex items-start text-sm">
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-primary-500"></div>
                        </div>
                        <div className="ml-2 flex-1 min-w-0">
                          <p className="text-white truncate">{task.firstName}</p>
                          <p className="text-dark-400 text-xs truncate">{task.phone}</p>
                        </div>
                      </div>
                    ))}
                    {tasksByAgent[agent._id].length > 5 && (
                      <p className="text-xs text-dark-500 text-center pt-1">
                        + {tasksByAgent[agent._id].length - 5} more tasks
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-dark-500 text-center py-2">
                    No tasks assigned
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}