"use client";

import React, { useEffect } from 'react';
import { MOCK_ALBUMS, MOCK_TRACKS } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { TrackItem } from '@/components/discography/TrackItem';
import Image from 'next/image';
import { Music, Disc } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';

export default function DiscographyPage() {
  const { setPlaylist } = useAudio();

  useEffect(() => {
    setPlaylist(MOCK_TRACKS);
  }, [setPlaylist]);

  return (
    <div className="bg-background">
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-32 space-y-16 md:space-y-24">
        <header className="space-y-4">
          <h1 className="text-5xl md:text-8xl font-headline font-bold uppercase tracking-tighter italic leading-none">
            Digital <span className="text-primary">Vault</span>
          </h1>
          <p className="text-muted-foreground font-medium uppercase text-xs md:text-sm tracking-[0.4em]">Historical Sonic Transmissions</p>
        </header>

        <div className="space-y-32 md:space-y-48">
          {MOCK_ALBUMS.map((album) => (
            <section key={album.id} className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-4 sticky top-32">
                  <div className="relative w-full aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group">
                    <Image 
                      src={album.coverArt} 
                      alt={album.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-8 left-8">
                      <Badge className="bg-primary/90 text-background font-bold uppercase text-[10px] tracking-widest px-4 py-1.5">NODE: {album.releaseYear}</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-8 space-y-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">RELEASE: {album.releaseYear}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <Music className="w-4 h-4 text-secondary" /> {album.tracks.length} SIGNALS
                      </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-headline font-bold uppercase tracking-tighter italic">{album.title}</h2>
                    <p className="text-base md:text-lg text-muted-foreground font-medium flex items-center gap-3">
                      <Disc className="w-5 h-5 text-accent animate-spin-slow" /> DoubleU • Protocol LP
                    </p>
                  </div>
                  
                  <div className="grid gap-2 border-t border-white/10 pt-10">
                    {album.tracks.map((track) => (
                      <TrackItem key={track.id} track={track} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
