'use server';

import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { connectToDatabase } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const loginSchema = z.object({
    username: z.string().min(1, 'Username is required.'),
    password: z.string().min(1, 'Password is required.'),
});


export async function login(
  prevState: { error: string } | null,
  formData: FormData
) {
  const validatedFields = loginSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return { error: 'Invalid fields. Please check your inputs.' };
  }

  const { username, password } = validatedFields.data;

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

    const session = await getSession();
    session.user = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
    };
    session.isLoggedIn = true;
    await session.save();

  } catch (error) {
    console.error(error);
    return { error: 'An unexpected error occurred. Please try again.' };
  }

  redirect('/dashboard');
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect('/login');
}
