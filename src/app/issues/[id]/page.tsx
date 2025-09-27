import { issues } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, User } from 'lucide-react';
import StatusTracker from '@/components/issues/StatusTracker';

export function generateStaticParams() {
  return issues.map((issue) => ({
    id: issue.id,
  }));
}

export default function IssueDetailPage({ params }: { params: { id: string } }) {
  const issue = issues.find((issue) => issue.id === params.id);

  if (!issue) {
    notFound();
  }
  
  const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
    Reported: 'outline',
    'In Progress': 'default',
    Resolved: 'secondary',
    Rejected: 'destructive'
  };

  return (
    <div className="container mx-auto max-w-4xl py-8 md:py-12">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                  <div>
                      <Badge variant="secondary" className="mb-2">{issue.category}</Badge>
                      <CardTitle className="text-3xl font-headline">{issue.title}</CardTitle>
                  </div>
                  <Badge variant={statusVariant[issue.status]}>{issue.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6">
                <Image
                  src={issue.imageUrl}
                  alt={issue.description}
                  fill
                  className="object-cover"
                  data-ai-hint={issue.imageHint}
                />
              </div>
              <p className="text-lg text-foreground">{issue.description}</p>
            </CardContent>
          </Card>
          <Card>
              <CardHeader>
                  <CardTitle>Status History</CardTitle>
              </CardHeader>
              <CardContent>
                  <StatusTracker currentStatus={issue.status} />
              </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                            <p className="font-semibold">Location</p>
                            <p className="text-muted-foreground">{issue.address}</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                            <p className="font-semibold">Reported On</p>
                            <p className="text-muted-foreground">{new Date(issue.reportedAt).toLocaleString()}</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-3">
                        <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                        <div>
                            <p className="font-semibold">Reported By</p>
                            <div className="flex items-center gap-2 mt-1">
                                <Avatar className="w-6 h-6">
                                    <AvatarImage src={issue.reporter.avatarUrl} alt={issue.reporter.name} />
                                    <AvatarFallback>{issue.reporter.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <p className="text-muted-foreground">{issue.reporter.name}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
