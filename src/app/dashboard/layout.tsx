
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { getSession } from '@/lib/session';
import Header from '@/components/layout/Header';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/dashboard/SidebarNav';

export const metadata: Metadata = {
  title: 'Dashboard - Civic Connect',
  description: 'Manage and report civic issues.',
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
      <SidebarProvider>
        <div className="flex h-full">
          <Sidebar>
            <SidebarNav />
          </Sidebar>
          <div className="flex flex-col flex-1">
            <Header user={session.user} />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
              <SidebarInset>{children}</SidebarInset>
            </main>
          </div>
        </div>
      </SidebarProvider>
  );
}
