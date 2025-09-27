'use client';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { LayoutDashboard, List, FilePlus2, BarChart3, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/app/login/actions';

const menuItems = [
  {
    href: '/dashboard',
    label: 'Overview',
    icon: <LayoutDashboard />,
  },
  {
    href: '/dashboard/issues',
    label: 'All Issues',
    icon: <List />,
  },
  {
    href: '/dashboard/report',
    label: 'Report Issue',
    icon: <FilePlus2 />,
  },
];
export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href}>
            <SidebarMenuButton
              isActive={pathname === item.href || (item.href === '/dashboard' && pathname.startsWith('/dashboard/analytics'))}
              icon={item.icon}
              tooltip={item.label}
            >
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
       <SidebarMenuItem>
          <form action={logout} className="w-full">
            <SidebarMenuButton
              icon={<LogOut />}
              tooltip="Logout"
              className="w-full"
              type="submit"
            >
              <span>Logout</span>
            </SidebarMenuButton>
          </form>
        </SidebarMenuItem>
    </SidebarMenu>
  );
}
