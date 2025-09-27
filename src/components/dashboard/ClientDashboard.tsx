'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Overview from './Overview';
import Analytics from './Analytics';
import type { Issue } from '@/lib/types';

interface ClientDashboardProps {
  summary: string;
  issues: Issue[];
  analyticsData: {
    issuesByCategory: { name: string, value: number }[];
  };
}

export default function ClientDashboard({ summary, issues, analyticsData }: ClientDashboardProps) {
  return (
    <>
      <div className="pb-6">
        <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening in your city.</p>
      </div>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Overview summary={summary} issues={issues} />
        </TabsContent>
        <TabsContent value="analytics">
          <Analytics issues={issues} analyticsData={analyticsData} />
        </TabsContent>
      </Tabs>
    </>
  );
}
