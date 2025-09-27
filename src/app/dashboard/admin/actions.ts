'use server';

import { connectToDatabase } from '@/lib/mongodb';
import { revalidatePath } from 'next/cache';
import { ObjectId } from 'mongodb';

export async function deleteIssue(issueId: string) {
  try {
    const { db } = await connectToDatabase();
    
    if (!ObjectId.isValid(issueId)) {
        return { success: false, message: 'Invalid issue ID.' };
    }

    const result = await db.collection('issues').deleteOne({ _id: new ObjectId(issueId) });

    if (result.deletedCount === 0) {
      return { success: false, message: 'Issue not found.' };
    }

    revalidatePath('/dashboard');
    return { success: true, message: 'Issue deleted successfully.' };
  } catch (error) {
    console.error('Failed to delete issue:', error);
    return { success: false, message: 'An unexpected error occurred.' };
  }
}
