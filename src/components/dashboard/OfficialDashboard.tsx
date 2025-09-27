
'use client';

import type { Issue, User } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';

interface OfficialDashboardProps {
  user: User;
  issues: Issue[];
}

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
    Reported: 'outline',
    'In Progress': 'default',
    Resolved: 'secondary',
    Rejected: 'destructive'
};

export default function OfficialDashboard({ user, issues }: OfficialDashboardProps) {
  const pendingIssues = issues.filter(issue => issue.status === 'Reported' || issue.status === 'In Progress');
  const resolvedIssuesCount = issues.filter(issue => issue.status === 'Resolved').length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Official Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome, {user.username}. Viewing issues for the <span className="font-semibold text-foreground">{user.department}</span>.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Pending Issues</CardTitle>
            <CardDescription>Issues needing attention.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{pendingIssues.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Resolved</CardTitle>
            <CardDescription>Issues resolved by your department.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-600">{resolvedIssuesCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Issues</CardTitle>
            <CardDescription>All issues for your department.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{issues.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Issues for Your Department</CardTitle>
          <CardDescription>
            Here are all the issues currently assigned to the {user.department}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reported At</TableHead>
                <TableHead>Reporter</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {issues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell className="font-medium">
                    <Link href={`/issues/${issue.id}`} className="hover:underline">
                      {issue.title}
                    </Link>
                  </TableCell>
                  <TableCell>{issue.category}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[issue.status]}>{issue.status}</Badge>
                  </TableCell>
                  <TableCell>{new Date(issue.reportedAt).toLocaleDateString()}</TableCell>
                  <TableCell>{issue.reporter.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
