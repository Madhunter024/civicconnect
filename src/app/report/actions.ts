'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { categorizeCivicIssue } from '@/ai/flows/categorize-civic-issues';
import type { Issue, IssueCategory, User } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getSession } from '@/lib/session';
import { connectToDatabase } from '@/lib/mongodb';

const formSchema = z.object({
  description: z.string(),
  address: z.string(),
  place: z.string(),
  district: z.string(),
  block: z.string(),
  pincode: z.string(),
  policeStation: z.string(),
  fatherName: z.string(),
  motherName: z.string(),
  department: z.string(),
  photo: z.instanceof(File),
  lat: z.coerce.number(),
  lng: z.coerce.number(),
});

type FormState = {
  message: string;
  success: boolean;
};

const categoryMap: Record<string, IssueCategory> = {
    'pothole': 'Pothole',
    'broken street light': 'Broken Streetlight',
    'graffiti': 'Graffiti',
    'trash overflow': 'Trash Overflow',
};

export async function reportIssue(prevState: FormState, formData: FormData): Promise<FormState> {
  const session = await getSession();
  if (!session.isLoggedIn || !session.user) {
    return {
        message: 'You must be logged in to report an issue.',
        success: false
    }
  }


  const validatedFields = formSchema.safeParse({
    description: formData.get('description'),
    address: formData.get('address'),
    place: formData.get('place'),
    district: formData.get('district'),
    block: formData.get('block'),
    pincode: formData.get('pincode'),
    policeStation: formData.get('policeStation'),
    fatherName: formData.get('fatherName'),
    motherName: formData.get('motherName'),
    department: formData.get('department'),
    photo: formData.get('photo'),
    lat: formData.get('lat'),
    lng: formData.get('lng'),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.errors);
    return {
      message: 'Invalid form data. Please check your inputs.',
      success: false,
    };
  }
  
  const { description, address, place, district, block, pincode, policeStation, fatherName, motherName, department, photo, lat, lng } = validatedFields.data;

  try {
    const buffer = Buffer.from(await photo.arrayBuffer());
    const photoDataUri = `data:${photo.type};base64,${buffer.toString('base64')}`;

    const { category, confidence } = await categorizeCivicIssue({
      description,
      photoDataUri,
    });

    const normalizedCategory = category.toLowerCase();
    const mappedCategory = Object.keys(categoryMap).find(key => normalizedCategory.includes(key))
      ? categoryMap[Object.keys(categoryMap).find(key => normalizedCategory.includes(key))!]
      : 'Other';
    
    // We can't save the uploaded image, so we'll use a placeholder based on category.
    const placeholderId = `issue-${mappedCategory.toLowerCase().split(' ')[0]}`;
    const placeholder = PlaceHolderImages.find(p => p.id === placeholderId) || PlaceHolderImages[0];


    const newIssue: Omit<Issue, 'id' | '_id'> = {
        title: `${mappedCategory} at ${address}`,
        description,
        address,
        place,
        district,
        block,
        pincode,
        policeStation,
        fatherName,
        motherName,
        category: mappedCategory,
        status: 'Reported',
        department,
        location: { lat, lng },
        imageUrl: placeholder.imageUrl,
        imageHint: placeholder.imageHint,
        reportedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        reporter: session.user as User,
    };
    
    const { db } = await connectToDatabase();
    const result = await db.collection('issues').insertOne(newIssue);
    const newIssueId = result.insertedId.toString();

    revalidatePath('/');
    revalidatePath('/issues');
    revalidatePath(`/issues/${newIssueId}`);
    revalidatePath('/dashboard');
    
    redirect(`/issues/${newIssueId}`);

  } catch (error) {
    console.error('Failed to report issue:', error);
    return {
      message: 'An unexpected error occurred. Please try again.',
      success: false,
    };
  }
}

export async function geocodeAddress(address: string): Promise<{lat: number, lng: number} | null> {
    if (!process.env.GOOGLE_MAPS_API_KEY) {
        console.error('Google Maps API key is missing.');
        return null;
    }
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'OK' && data.results[0]) {
            return data.results[0].geometry.location;
        }
        return null;
    } catch(error) {
        console.error('Geocoding error:', error);
        return null;
    }
}
