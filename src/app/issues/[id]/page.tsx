import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, User, Building2 } from 'lucide-react';
import StatusTracker from '@/components/issues/StatusTracker';
import IssueMap from '@/components/issues/IssueMap';
import Header from '@/components/layout/Header';
import { getSession } from '@/lib/session';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import type { Issue } from '@/lib/types';


export default async function IssueDetailPage({ params }: { params: { id: string } }) {
  const { db } = await connectToDatabase();
  
  if (!ObjectId.isValid(params.id)) {
    notFound();
  }

  const issue = await db.collection('issues').findOne({ _id: new ObjectId(params.id) });
  const session = await getSession();


  if (!issue) {
    notFound();
  }
  
  const typedIssue = issue as unknown as Issue;

  const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
    Reported: 'outline',
    'In Progress': 'default',
    Resolved: 'secondary',
    Rejected: 'destructive'
  };

  return (
    <>
      <Header user={session.user} />
      <div className="container mx-auto max-w-4xl py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <Badge variant="secondary" className="mb-2">{typedIssue.category}</Badge>
                        <CardTitle className="text-3xl font-headline">{typedIssue.title}</CardTitle>
                    </div>
                    <Badge variant={statusVariant[typedIssue.status]}>{typedIssue.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6">
                  <Image
                    src={typedIssue.imageUrl}
                    alt={typedIssue.description}
                    fill
                    className="object-cover"
                    data-ai-hint={typedIssue.imageHint}
                  />
                </div>
                <p className="text-lg text-foreground">{typedIssue.description}</p>
              </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Status History</CardTitle>
                </CardHeader>
                <CardContent>
                    <StatusTracker currentStatus={typedIssue.status} />
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
                              <p className="text-muted-foreground">{typedIssue.address}</p>
                          </div>
                      </div>
                       <div className="flex items-start gap-3">
                          <Building2 className="w-5 h-5 text-muted-foreground mt-0.5" />
                          <div>
                              <p className="font-semibold">Department</p>
                              <p className="text-muted-foreground">{typedIssue.department}</p>
                          </div>
                      </div>
                       <div className="flex items-start gap-3">
                          <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                          <div>
                              <p className="font-semibold">Reported On</p>
                              <p className="text-muted-foreground">{new Date(typedIssue.reportedAt).toLocaleString()}</p>
                          </div>
                      </div>
                       <div className="flex items-start gap-3">
                          <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                          <div>
                              <p className="font-semibold">Reported By</p>
                              <div className="flex items-center gap-2 mt-1">
                                  <Avatar className="w-6 h-6">
                                      <AvatarImage src={typedIssue.reporter.avatarUrl} alt={typedIssue.reporter.name} />
                                      <AvatarFallback>{typedIssue.reporter.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <p className="text-muted-foreground">{typedIssue.reporter.name}</p>
                              </div>
                          </div>
                      </div>
                  </CardContent>
              </Card>
               <Card>
                  <CardHeader>
                      <CardTitle>Location</CardTitle>
                  </CardHeader>
                  <CardContent className="h-64 -mx-6 -mb-6">
                     <IssueMap lat={typedIssue.location.lat} lng={typedIssue.location.lng} />
                  </CardContent>
              </Card>
          </div>
        </div>
      </div>
    </>
  );
}
