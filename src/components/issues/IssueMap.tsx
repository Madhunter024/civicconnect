'use client';

import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { MapPin } from 'lucide-react';

interface IssueMapProps {
  lat: number;
  lng: number;
  className?: string;
  zoom?: number;
}

export default function IssueMap({ lat, lng, className, zoom = 15 }: IssueMapProps) {
  const position = { lat, lng };

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="flex items-center justify-center bg-muted text-muted-foreground h-full w-full">
        <p>Google Maps API Key is missing.</p>
      </div>
    );
  }

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <Map
        defaultCenter={position}
        defaultZoom={zoom}
        mapId="citizengage-map"
        className={className}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        <AdvancedMarker position={position}>
            <MapPin className="w-8 h-8 text-primary fill-current transform -translate-y-full" />
        </AdvancedMarker>
      </Map>
    </APIProvider>
  );
}
