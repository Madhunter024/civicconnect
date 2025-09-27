'use server';

import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export async function login(
  prevState: { error: string } | null,
  formData: FormData
) {
  const session = await getSession();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // In a real app, you'd look up the user from the database
  if (email === 'm@example.com' && password === 'password') {
    session.user = {
      name: 'Admin User',
      avatarUrl: 'https://i.pravatar.cc/150?u=admin',
    };
    session.isLoggedIn = true;
    await session.save();
    return { success: true };
  }

  return { error: 'Invalid email or password.' };
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect('/login');
}
