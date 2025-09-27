'use server';

import { redirect } from 'next/navigation';
import { connectToDatabase } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const signupSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters long.'),
    email: z.string().email('Invalid email address.'),
    password: z.string().min(6, 'Password must be at least 6 characters long.'),
});


export async function signup(
  prevState: { error: string } | null,
  formData: FormData
) {

  const validatedFields = signupSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return { error: 'Invalid fields. Please check your inputs.' };
  }

  const { username, email, password } = validatedFields.data;

  try {
    const { db } = await connectToDatabase();

    const existingUser = await db.collection('users').findOne({ username });
    if (existingUser) {
        return { error: 'Username already exists.' };
    }
    
    const existingEmail = await db.collection('users').findOne({ email });
    if (existingEmail) {
        return { error: 'An account with this email already exists.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection('users').insertOne({
        username,
        email,
        password: hashedPassword,
        createdAt: new Date(),
    });

    return { success: true };

  } catch (error) {
    console.error(error);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}
