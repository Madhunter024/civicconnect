import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Issue } from "@/lib/types";
import { Bot } from "lucide-react";
import Link from "next/link";
import HotspotMap from "./HotspotMap";

interface OverviewProps {
  summary: string;
  issues: Issue[];
}

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
    Reported: 'outline',
    'In Progress': 'default',
    Resolved: 'secondary',
    Rejected: 'destructive'
}

export default function Overview({ summary, issues }: OverviewProps) {
  const totalIssues = issues.length;
  const resolvedIssues = issues.filter(i => i.status === 'Resolved').length;
  const inProgressIssues = issues.filter(i => i.status === 'In Progress').length;
  const recentIssues = issues.slice(0, 5);

  return (
    <div className="grid gap-6 mt-4">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{totalIssues}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-600">{resolvedIssues}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">{inProgressIssues}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bot /> AI Summary</CardTitle>
            <CardDescription>A summary of the latest reported issues.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{summary}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Issue Hotspots</CardTitle>
            <CardDescription>A real-time view of reported issues across the city.</CardDescription>
          </CardHeader>
          <CardContent className="h-full w-full -p-6">
            <HotspotMap issues={issues} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Reported At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recentIssues.map((issue) => (
                        <TableRow key={issue.id}>
                            <TableCell className="font-medium">
                                <Link href={`/issues/${issue.id}`} className="hover:underline">{issue.title}</Link>
                            </TableCell>
                            <TableCell>{issue.category}</TableCell>
                            <TableCell>
                                <Badge variant={statusVariant[issue.status]}>{issue.status}</Badge>
                            </TableCell>
                            <TableCell>{new Date(issue.reportedAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
