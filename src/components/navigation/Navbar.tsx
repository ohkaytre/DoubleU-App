"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Disc, Calendar, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Feed', icon: Home, href: '/' },
    { label: 'Artist', icon: User, href: '/bio' },
    { label: 'Music', icon: Disc, href: '/discography' },
    { label: 'Tour', icon: Calendar, href: '/tour' },
    { label: 'Admin', icon: ShieldCheck, href: '/admin' },
  ];

  const isActiveRoute = (href: string) => pathname === href || (href !== '/' && pathname?.startsWith(href));
  const currentPage = navItems.find((item) => isActiveRoute(item.href));

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-4 pt-[calc(0.6rem+env(safe-area-inset-top))] pb-3 md:px-12 md:pt-4 md:pb-4",
          isScrolled ? "bg-background/85 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto hidden md:flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center neon-glow-orange group-hover:scale-110 transition-transform duration-300">
              <span className="font-headline font-bold text-background text-2xl">W</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-headline font-bold text-2xl tracking-tighter text-foreground">DoubleU Pulse</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Android Edition</span>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = isActiveRoute(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    "px-4 py-2 rounded-full transition-all uppercase text-[10px] font-bold tracking-widest",
                    isActive ? "bg-primary text-background shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="max-w-xl mx-auto md:hidden">
          <div className="rounded-2xl border border-white/10 bg-card/75 backdrop-blur-xl px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="font-headline font-bold text-background text-lg">W</span>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">DoubleU Pulse</p>
                  <p className="text-sm font-semibold truncate">{currentPage?.label ?? 'Home'}</p>
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Android</span>
            </div>
          </div>
        </div>
      </header>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[120] px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-2">
        <div className="max-w-xl mx-auto rounded-[1.6rem] border border-white/10 bg-card/90 backdrop-blur-xl p-2 grid grid-cols-5 gap-1 shadow-[0_-4px_26px_rgba(0,0,0,0.35)]">
          {navItems.map((item) => {
            const isActive = isActiveRoute(item.href);
            return (
              <Link
                key={`bottom-${item.href}`}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  "relative flex flex-col items-center justify-center py-2 rounded-xl transition-all",
                  isActive ? "text-foreground" : "text-muted-foreground active:scale-95"
                )}
              >
                <span
                  className={cn(
                    "absolute inset-x-2 top-1 h-0.5 rounded-full transition-opacity",
                    isActive ? "bg-primary opacity-100" : "opacity-0"
                  )}
                />
                <item.icon className={cn("mb-1 transition-all", isActive ? "w-5 h-5 text-primary" : "w-4 h-4")} />
                <span className={cn("text-[10px] uppercase tracking-wider font-semibold", isActive ? "text-foreground" : "text-muted-foreground")}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};
