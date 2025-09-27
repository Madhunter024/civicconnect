'use server';

import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { connectToDatabase } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import type { UserRole } from '@/lib/types';

const loginSchema = z.object({
    username: z.string().min(1, 'Username is required.'),
    password: z.string().min(1, 'Password is required.'),
    role: z.enum(['citizen', 'admin', 'official']),
});


export async function login(
  prevState: { error: string } | null,
  formData: FormData
) {
  const validatedFields = loginSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return { error: 'Invalid fields. Please check your inputs.' };
  }

  const { username, password, role } = validatedFields.data;

  try {
    const { db } = await connectToDatabase();
    const user = await db.collection('users').findOne({ username });

    if (!user) {
      return { error: 'Invalid username or password.' };
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return { error: 'Invalid username or password.' };
    }
    
    // In a real app, you'd verify the user's role against the database.
    // For now, we'll trust the role selected on the form.
    const userRole: UserRole = role;

    const session = await getSession();
    session.user = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: userRole
    };
    session.isLoggedIn = true;
    await session.save();

  } catch (error) {
    console.error(error);
    return { error: 'An unexpected error occurred. Please try again.' };
  }

  redirect('/home');
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect('/home');
}
