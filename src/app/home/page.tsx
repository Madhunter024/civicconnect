
'use server';

import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const session = await getSession();

  if (session.isLoggedIn && session.user) {
    if (session.user.role === 'admin') {
        redirect('/dashboard');
    }
    redirect('/dashboard'); // Redirect all logged-in users to dashboard
  }

  return redirect('/login');
}
