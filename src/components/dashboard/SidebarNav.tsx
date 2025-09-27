'use client';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { LayoutDashboard, List, FilePlus2, BarChart3, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

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
  {
    href: '/dashboard/analytics',
    label: 'Analytics',
    icon: <BarChart3 />,
  },
];
export function SidebarNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    document.cookie = 'auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/login');
  };

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href}>
            <SidebarMenuButton
              isActive={pathname === item.href}
              icon={item.icon}
              tooltip={item.label}
            >
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
       <SidebarMenuItem>
          <a href="#" onClick={handleLogout}>
            <SidebarMenuButton
              icon={<LogOut />}
              tooltip="Logout"
            >
              <span>Logout</span>
            </SidebarMenuButton>
          </a>
        </SidebarMenuItem>
    </SidebarMenu>
  );
}
