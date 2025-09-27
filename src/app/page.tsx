import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, MapPin, Search } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { issues } from '@/lib/data';
import IssueCard from '@/components/issues/IssueCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

const features = [
    {
        icon: <MapPin className="h-8 w-8 text-primary" />,
        title: 'Report Issues Easily',
        description: 'Snap a photo, add a description, and tag the location. Reporting civic problems takes just a minute.',
    },
    {
        icon: <Search className="h-8 w-8 text-primary" />,
        title: 'Track Progress',
        description: 'Stay updated on the status of your report, from submission to resolution, with real-time tracking.',
    },
    {
        icon: <CheckCircle className="h-8 w-8 text-primary" />,
        title: 'See Real Change',
        description: 'Join your neighbors in making your community a better place, one reported issue at a time.',
    },
];

export default function Home() {
  const recentIssues = issues.slice(0, 3);

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center text-white">
        {heroImage && (
            <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                priority
                data-ai-hint={heroImage.imageHint}
            />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center p-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight drop-shadow-lg">
            Your Voice for a Better City
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
            CitizEngage empowers you to report civic issues, track their resolution, and collaborate with your local government to improve our community.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/login">
                Get Started
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/issues">View Active Issues</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight font-headline">How It Works</h2>
                <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">A simple, transparent process for civic engagement.</p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
                {features.map((feature, index) => (
                    <div key={index} className="text-center">
                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto">
                            {feature.icon}
                        </div>
                        <h3 className="mt-6 text-xl font-bold font-headline">{feature.title}</h3>
                        <p className="mt-2 text-muted-foreground">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
      
      <section id="recent-issues" className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold tracking-tight font-headline">Recently Reported</h2>
                <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">See what your neighbors are reporting in the community.</p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {recentIssues.map((issue) => (
                    <IssueCard key={issue.id} issue={issue} />
                ))}
            </div>
            <div className="mt-12 text-center">
                <Button variant="outline" asChild>
                    <Link href="/issues">
                        View All Issues <ArrowRight className="ml-2" />
                    </Link>
                </Button>
            </div>
        </div>
      </section>
    </div>
  );
}
