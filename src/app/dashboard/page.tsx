

'use server';

import { getSession } from '@/lib/session';
import { issues as mockIssues } from '@/lib/data';
import type { User, IssueCategory } from '@/lib/types';
import Dashboard from '@/components/home/Dashboard';
import { summarizeIssueReports } from '@/ai/flows/summarize-issue-reports';
import ClientDashboard from '@/components/dashboard/ClientDashboard';
import { redirect } from 'next/navigation';
import OfficialDashboard from '@/components/dashboard/OfficialDashboard';
import { connectToDatabase } from '@/lib/mongodb';

export default async function DashboardPage() {
  const session = await getSession();

  if (!session.isLoggedIn || !session.user) {
    redirect('/login');
  }

  const user = session.user as User;

  // In a real app, you would fetch issues from the database.
  // For now, we continue to use the mock data for issues.
  const issues = mockIssues;

  if (user.role === 'admin') {
    const { db } = await connectToDatabase();
    // For admins, fetch all users and summarize reports
    const allUsers = await db.collection('users').find({}).toArray();
    
    const recentReports = issues.slice(0, 10).map(issue => `[${issue.category}] ${issue.title}: ${issue.description}`).join('\n');
    
    let summary = 'AI summary is currently unavailable.';
    try {
        const summaryResult = await summarizeIssueReports({ reports: recentReports });
        summary = summaryResult.summary;
    } catch (error) {
        console.error("Failed to generate AI summary:", error);
    }

    // Aggregate analytics data
    const issuesByCategory: { [key in IssueCategory]?: number } = {};
    issues.forEach(issue => {
        issuesByCategory[issue.category] = (issuesByCategory[issue.category] || 0) + 1;
    });

    const analyticsData = {
        issuesByCategory: Object.entries(issuesByCategory).map(([name, value]) => ({ name, value })),
    };

    return <ClientDashboard summary={summary} issues={issues} users={JSON.parse(JSON.stringify(allUsers))} analyticsData={analyticsData} />;
  }
  
  if (user.role === 'official') {
    const departmentIssues = issues.filter(issue => issue.department === user.department);
    return <OfficialDashboard user={user} issues={departmentIssues} />;
  }

  // For citizens, show their personalized dashboard
  const userIssues = issues.filter(issue => issue.reporter.username === user.username);
  const pendingIssues = userIssues.filter(issue => issue.status !== 'Resolved' && issue.status !== 'Rejected');
  const resolvedIssues = userIssues.filter(issue => issue.status === 'Resolved');

  return (
    <Dashboard
      user={user}
      pendingIssues={pendingIssues}
      resolvedIssues={resolvedIssues}
    />
  );
}
