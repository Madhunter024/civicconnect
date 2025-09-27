
import { getSession } from '@/lib/session';
import { issues } from '@/lib/data';
import type { Issue, User } from '@/lib/types';
import CivicDashboardClient from '@/components/dashboard/CivicDashboardClient';

export default async function CivicDashboard() {
    const session = await getSession();
    const user = session.user as User;

    // Filter issues reported by the current user
    const userIssues = issues.filter(issue => issue.reporter.username === user.username);

    const pendingIssues = userIssues.filter(issue => issue.status !== 'Resolved' && issue.status !== 'Rejected');
    const resolvedIssues = userIssues.filter(issue => issue.status === 'Resolved');

    return (
        <CivicDashboardClient
            user={user}
            pendingIssues={pendingIssues}
            resolvedIssues={resolvedIssues}
        />
    );
}
