'use server';

import { redirect } from 'next/navigation';
import { connectToDatabase } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import type { UserRole } from '@/lib/types';
import { departments } from '@/lib/departments';

const signupSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters long.'),
    email: z.string().email('Invalid email address.'),
    password: z.string().min(6, 'Password must be at least 6 characters long.'),
    role: z.enum(['citizen', 'official']),
    department: z.string().optional(),
}).refine(data => {
    if (data.role === 'official') {
        return !!data.department && departments.some(d => d.name === data.department);
    }
    return true;
}, {
    message: 'A valid department is required for officials.',
    path: ['department'],
});


export async function signup(
  prevState: { error: string } | null,
  formData: FormData
) {

  const validatedFields = signupSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    const firstError = validatedFields.error.errors[0].message;
    return { error: firstError || 'Invalid fields. Please check your inputs.' };
  }

  const { username, email, password, role, department } = validatedFields.data;

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
    
    const userDocument: any = {
        username,
        email,
        password: hashedPassword,
        role: role as UserRole,
        createdAt: new Date(),
    };

    if (role === 'official') {
        userDocument.department = department;
    }


    await db.collection('users').insertOne(userDocument);

    return { success: true };

  } catch (error) {
    console.error(error);
    return { error: 'An unexpected error occurred. Please try again.' };
  }
}
