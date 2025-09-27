import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Issue } from '@/lib/types';
import { MapPin } from 'lucide-react';

interface IssueCardProps {
  issue: Issue & { _id?: any };
}

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
    Reported: 'outline',
    'In Progress': 'default',
    Resolved: 'secondary',
    Rejected: 'destructive'
}

export default function IssueCard({ issue }: IssueCardProps) {
  const id = issue._id ? issue._id.toString() : issue.id;
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg">
      <CardHeader>
        <div className="relative w-full aspect-video rounded-t-lg overflow-hidden -mt-6 -mx-6">
          <Image
            src={issue.imageUrl}
            alt={issue.description}
            fill
            className="object-cover"
            data-ai-hint={issue.imageHint}
          />
        </div>
        <div className="pt-4 flex justify-between items-start">
            <Badge variant="secondary">{issue.category}</Badge>
            <Badge variant={statusVariant[issue.status]}>{issue.status}</Badge>
        </div>
        <CardTitle className="pt-2 font-headline leading-tight">
          <Link href={`/issues/${id}`} className="hover:text-primary transition-colors">
            {issue.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {issue.description}
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{issue.address}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
