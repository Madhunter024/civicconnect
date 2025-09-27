'use client';

import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { MapPin } from 'lucide-react';
import type { Issue } from '@/lib/types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface HotspotMapProps {
  issues: Issue[];
  className?: string;
}

export default function HotspotMap({ issues, className }: HotspotMapProps) {
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
        return (
          <div className="flex items-center justify-center bg-muted text-muted-foreground h-full w-full">
            <p>Google Maps API Key is missing.</p>
          </div>
        );
      }
    
    // Calculate center of all issues
    const center = issues.reduce(
        (acc, issue) => {
            acc.lat += issue.location.lat;
            acc.lng += issue.location.lng;
            return acc;
        },
        { lat: 0, lng: 0 }
    );
    center.lat /= issues.length;
    center.lng /= issues.length;

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <Map
        defaultCenter={center || { lat: 34.0522, lng: -118.2437 }}
        defaultZoom={12}
        mapId="citizengage-hotspot-map"
        className={className}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        {issues.map(issue => (
          <Popover key={issue.id}>
            <PopoverTrigger asChild>
              <AdvancedMarker position={issue.location}>
                <MapPin className="w-6 h-6 text-primary fill-current cursor-pointer" />
              </AdvancedMarker>
            </PopoverTrigger>
            <PopoverContent>
                <h4 className="font-semibold">{issue.title}</h4>
                <p className="text-sm text-muted-foreground">{issue.address}</p>
            </PopoverContent>
          </Popover>
        ))}
      </Map>
    </APIProvider>
  );
}
