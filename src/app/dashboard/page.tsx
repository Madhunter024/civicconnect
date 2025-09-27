import { issues } from '@/lib/data';
import ClientDashboard from '@/components/dashboard/ClientDashboard';
import { summarizeIssueReports } from '@/ai/flows/summarize-issue-reports';
import type { Issue, IssueCategory } from '@/lib/types';
import { redirect } from 'next/navigation';

async function getDashboardData() {
  const recentReports = issues
    .sort((a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime())
    .slice(0, 5)
    .map(r => r.description)
    .join('\n\n');
  
  const summary = await summarizeIssueReports({ reports: recentReports });

  const issuesByCategory = issues.reduce((acc, issue) => {
    acc[issue.category] = (acc[issue.category] || 0) + 1;
    return acc;
  }, {} as Record<IssueCategory, number>);

  const analyticsData = {
    issuesByCategory: Object.entries(issuesByCategory).map(([name, value]) => ({ name, value })),
  };

  return { summary, issues, analyticsData };
}

export default async function DashboardPage() {
  // Since we have a multi-page dashboard via a sidebar, we redirect to the overview
  // which is handled by the ClientDashboard component's default tab.
  // In a real app with route groups, this might be `/dashboard/overview`.
  
  const { summary, issues, analyticsData } = await getDashboardData();
  
  return <ClientDashboard summary={summary.summary} issues={issues} analyticsData={analyticsData} />;
}
