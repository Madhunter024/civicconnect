import IssueCard from '@/components/issues/IssueCard';
import { connectToDatabase } from '@/lib/mongodb';
import type { Issue } from '@/lib/types';

export default async function IssuesPage() {
  const { db } = await connectToDatabase();
  const issues = await db.collection('issues').find({}).sort({ reportedAt: -1 }).toArray();

  return (
    <div>
      <div className="text-left mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">All Reported Issues</h1>
        <p className="mt-1 text-lg text-muted-foreground">
          Browse all issues reported by the community. See what's being addressed in your city.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {issues.map((issue) => (
          <IssueCard key={issue._id.toString()} issue={JSON.parse(JSON.stringify(issue))} />
        ))}
      </div>
    </div>
  );
}
