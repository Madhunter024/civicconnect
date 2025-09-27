import IssueCard from '@/components/issues/IssueCard';
import { issues } from '@/lib/data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function IssuesPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight font-headline">All Reported Issues</h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          Browse all issues reported by the community. See what's being addressed in your city.
        </p>
         <Button asChild className="mt-6">
          <Link href="/login">Report an Issue or View Dashboard</Link>
        </Button>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {issues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
}
