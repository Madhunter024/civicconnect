
'use server';

import { getSession } from '@/lib/session';
import { issues } from '@/lib/data';
import type { User } from '@/lib/types';
import LandingPage from '@/components/home/LandingPage';
import Dashboard from '@/components/home/Dashboard';

export default async function HomePage() {
  const session = await getSession();

  if (!session.isLoggedIn || !session.user) {
    return <LandingPage />;
  }

  const user = session.user as User;

  // Filter issues reported by the current user
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
