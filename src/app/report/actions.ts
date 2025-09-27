'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { categorizeCivicIssue } from '@/ai/flows/categorize-civic-issues';
import { issues } from '@/lib/data';
import type { Issue, IssueCategory } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const formSchema = z.object({
  description: z.string(),
  address: z.string(),
  photo: z.instanceof(File),
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
  const validatedFields = formSchema.safeParse({
    description: formData.get('description'),
    address: formData.get('address'),
    photo: formData.get('photo'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data. Please check your inputs.',
      success: false,
    };
  }
  
  const { description, address, photo } = validatedFields.data;

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

    const newIssueId = `IS-${issues.length + 1}`;
    
    // We can't save the uploaded image, so we'll use a placeholder based on category.
    const placeholderId = `issue-${mappedCategory.toLowerCase().split(' ')[0]}`;
    const placeholder = PlaceHolderImages.find(p => p.id === placeholderId) || PlaceHolderImages[0];


    const newIssue: Issue = {
        id: newIssueId,
        title: `${mappedCategory} at ${address}`,
        description,
        address,
        category: mappedCategory,
        status: 'Reported',
        location: { lat: 34.0522 + (Math.random() - 0.5) * 0.02, lng: -118.2437 + (Math.random() - 0.5) * 0.02 }, // Randomize location slightly for demo
        imageUrl: placeholder.imageUrl,
        imageHint: placeholder.imageHint,
        reportedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        reporter: { name: 'Current User', avatarUrl: 'https://i.pravatar.cc/150?u=user' },
    };

    issues.unshift(newIssue);
    
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
