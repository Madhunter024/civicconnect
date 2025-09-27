'use server';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import Logo from '@/components/layout/Logo';
import { SidebarNav } from '@/components/dashboard/SidebarNav';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 flex-shrink-0 bg-card border-r hidden md:flex flex-col">
         <div className="h-16 flex items-center px-6 border-b">
           <Logo />
         </div>
         <nav className="flex-grow p-4">
            <SidebarNav />
         </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 bg-background">
            {children}
        </main>
      </div>
    </div>
  );
}
