'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard/agents');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="animate-pulse">
          <div className="h-12 w-12 bg-primary-500 rounded-full mx-auto mb-4"></div>
          <p className="text-dark-400">Redirecting to dashboard...</p>
        </div>
      </div>
    </div>
  );
}