import IssueCard from '@/components/issues/IssueCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import { getSession } from '@/lib/session';
import { connectToDatabase } from '@/lib/mongodb';
import type { Issue } from '@/lib/types';

export default async function IssuesPage() {
  const session = await getSession();
  const { db } = await connectToDatabase();
  const issues = await db.collection('issues').find({}).sort({ reportedAt: -1 }).toArray();

  return (
    <>
      <Header user={session.user} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight font-headline">All Reported Issues</h1>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse all issues reported by the community. See what's being addressed in your city.
          </p>
           <Button asChild className="mt-6">
            <Link href="/dashboard">Report an Issue or View Dashboard</Link>
          </Button>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {issues.map((issue) => (
            <IssueCard key={issue._id.toString()} issue={JSON.parse(JSON.stringify(issue))} />
          ))}
        </div>
      </div>
    </>
  );
}
