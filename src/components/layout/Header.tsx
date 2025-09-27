'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BarChart3, Users, CheckCircle, ArrowRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { User } from '@/lib/types';

interface HeaderProps {
  user?: User | null;
  className?: string;
}

const NavLink = ({ href, children, mobile = false }: { href: string; children: React.ReactNode; mobile?: boolean }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link
      href={href}
      className={cn(
        'font-medium transition-colors',
        mobile 
          ? 'block px-3 py-2 rounded-lg' 
          : 'text-sm',
        isActive 
          ? 'text-primary' 
          : 'text-muted-foreground hover:text-primary'
      )}
    >
      {children}
    </Link>
  )
};


export default function Header({ user, className }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className={cn("bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50", className)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/home">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-orange-600 to-green-600 p-2 rounded-xl shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                    Civic Connect
                  </h1>
                  <p className="text-xs text-gray-600">झारखंड सरकार</p>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="/home">Home</NavLink>
              <NavLink href="/issues">Browse Issues</NavLink>
              {user ? (
                <>
                  <span className="text-sm text-muted-foreground">Welcome, {user.username}</span>
                  <Button asChild size="sm">
                    <Link href="/home">Dashboard</Link>
                  </Button>
                </>
              ) : (
                <Button asChild size="sm" className="bg-gradient-to-r from-orange-600 to-green-600 text-white font-semibold hover:from-orange-700 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                  <Link href="/login">Login or Sign Up</Link>
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-orange-600 p-2"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="space-y-2">
                <NavLink href="/home" mobile>Home</NavLink>
                <NavLink href="/issues" mobile>Browse Issues</NavLink>
                <div className="pt-2">
                   {user ? (
                      <Button asChild className="w-full">
                        <Link href="/home">Dashboard</Link>
                      </Button>
                   ) : (
                      <Button asChild className="w-full bg-gradient-to-r from-orange-600 to-green-600 text-white font-semibold">
                        <Link href="/login">Login or Sign Up</Link>
                      </Button>
                   )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
  );
}
