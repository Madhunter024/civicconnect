
'use server';

import { getSession } from '@/lib/session';
import { issues } from '@/lib/data';
import type { User, IssueCategory } from '@/lib/types';
import Dashboard from '@/components/home/Dashboard';
import { summarizeIssueReports } from '@/ai/flows/summarize-issue-reports';
import ClientDashboard from '@/components/dashboard/ClientDashboard';
import { redirect } from 'next/navigation';
import OfficialDashboard from '@/components/dashboard/OfficialDashboard';

export default async function DashboardPage() {
  const session = await getSession();

  if (!session.isLoggedIn || !session.user) {
    redirect('/login');
  }

  const user = session.user as User;

  if (user.role === 'admin') {
    // For admins, summarize the latest 10 reports
    const recentReports = issues.slice(0, 10).map(issue => `[${issue.category}] ${issue.title}: ${issue.description}`).join('\n');
    const { summary } = await summarizeIssueReports({ reports: recentReports });

    // Aggregate analytics data
    const issuesByCategory: { [key in IssueCategory]?: number } = {};
    issues.forEach(issue => {
        issuesByCategory[issue.category] = (issuesByCategory[issue.category] || 0) + 1;
    });

    const analyticsData = {
        issuesByCategory: Object.entries(issuesByCategory).map(([name, value]) => ({ name, value })),
    };

    return <ClientDashboard summary={summary} issues={issues} analyticsData={analyticsData} />;
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
