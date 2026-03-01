"use client";

import React from 'react';
import Link from 'next/link';
import { Instagram, Twitter, Music2, Mail, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-card/30 border-t border-white/5 pt-16 md:pt-24 pb-32 md:pb-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-16">
          <div className="md:col-span-5 space-y-6 md:space-y-8">
            <Link href="/" className="flex items-center gap-3 group inline-block">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center neon-glow-orange group-hover:scale-110 transition-transform duration-300">
                <span className="font-headline font-bold text-background text-2xl">W</span>
              </div>
              <span className="font-headline font-bold text-2xl tracking-tighter text-foreground uppercase">
                DoubleU Pulse
              </span>
            </Link>
            <p className="text-muted-foreground text-sm md:text-lg leading-relaxed max-w-sm">
              Exploring the boundary between organic emotion and digital precision. A neural network of sound and vision.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-all hover:scale-110">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-secondary transition-all hover:scale-110">
                <Twitter className="w-6 h-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-accent transition-all hover:scale-110">
                <Music2 className="w-6 h-6" />
              </Link>
            </div>
          </div>

          <div className="md:col-span-3 space-y-6">
            <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-primary">Protocol</h4>
            <nav className="flex flex-col gap-4">
              {['Feed', 'Artist', 'Music', 'Tour', 'Admin'].map(item => (
                <Link 
                  key={item} 
                  href={item === 'Feed' ? '/' : `/${item.toLowerCase()}`} 
                  className="text-muted-foreground hover:text-foreground transition-colors uppercase text-[10px] font-bold tracking-widest flex items-center group"
                >
                  {item} <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:col-span-4 space-y-6">
            <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-secondary">Inquiries</h4>
            <div className="space-y-4">
              <p className="text-muted-foreground text-sm">Join the encrypted network for priority access to tour nodes and digital drops.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="IDENTITY@PROTOCOL.COM" 
                  className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-secondary"
                />
                <Button size="sm" className="bg-secondary text-background font-bold hover:bg-secondary/90">
                  <Mail className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
            © 2025 DoubleU Pulse. All transmission rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
            <Link href="#" className="hover:text-foreground">Terms</Link>
            <Link href="#" className="hover:text-foreground">Privacy</Link>
            <Link href="#" className="hover:text-foreground">Press Kit</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
