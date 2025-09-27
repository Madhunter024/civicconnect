'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/layout/Logo';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/issues', label: 'View Issues' },
  { href: '/dashboard', label: 'Dashboard' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" aria-label="CitizEngage Home">
              <Logo />
            </Link>
          </div>
          <nav className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <Button key={link.href} variant="ghost" asChild>
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
            <Button asChild>
              <Link href="/report">Report an Issue</Link>
            </Button>
          </nav>
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-card border-t">
          <nav className="flex flex-col items-center p-4 space-y-2">
            {navLinks.map((link) => (
              <Button key={link.href} variant="ghost" className="w-full" asChild>
                <Link href={link.href} onClick={() => setIsOpen(false)}>{link.label}</Link>
              </Button>
            ))}
            <Button asChild className="w-full">
              <Link href="/report" onClick={() => setIsOpen(false)}>Report an Issue</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
