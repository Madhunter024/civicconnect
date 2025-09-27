
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import LandingPage from '@/components/home/LandingPage';

export default async function RootPage() {
  const session = await getSession();

  if (session.isLoggedIn) {
    redirect('/dashboard');
  }

  return <LandingPage />;
}
