'use client';

import { useState, useEffect } from 'react';
import { UploadForm } from '@/components/UploadForm';
import { TaskDistribution } from '@/components/TaskDistribution';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload as UploadIcon, Users } from 'lucide-react';

export default function UploadPage() {
  const [agents, setAgents] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchAgents = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/agents`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAgents(data);
      }
    } catch (error) {
      console.error('Failed to fetch agents:', error);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleUploadSuccess = () => {
    setRefreshKey(prev => prev + 1);
    fetchAgents(); // Refresh agents in case new ones were added
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Task Distribution</h1>
        <p className="text-dark-400 mt-1">Upload CSV files and distribute tasks among agents</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-dark-600 bg-dark-800">
          <CardHeader>
            <CardTitle className="flex items-center">
              <UploadIcon className="h-5 w-5 mr-2" />
              Upload CSV File
            </CardTitle>
          </CardHeader>
          <CardContent>
            <UploadForm onUploadSuccess={handleUploadSuccess} />
          </CardContent>
        </Card>

        <Card className="border-dark-600 bg-dark-800">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Agent Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TaskDistribution agents={agents} refreshKey={refreshKey} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}