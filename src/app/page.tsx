"use client";

import { useEffect } from 'react';
import { MOCK_TRACKS, MOCK_ALBUMS } from '@/lib/mock-data';
import { TrackItem } from '@/components/discography/TrackItem';
import { TrackInsightPanel } from '@/components/ai/TrackInsightPanel';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Play, Disc, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { useAudio } from '@/context/AudioContext';
import { useSiteConfig } from '@/context/SiteConfigContext';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const { currentTrack, playTrack, setPlaylist } = useAudio();
  const { config } = useSiteConfig();
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-artist');

  useEffect(() => {
    setPlaylist(MOCK_TRACKS);
  }, [setPlaylist]);

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] w-full flex items-center p-6 md:p-16 lg:p-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroImage && (
            <Image 
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover opacity-60 filter grayscale hover:grayscale-0 transition-all duration-1000"
              priority
              data-ai-hint={heroImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent hidden md:block" />
        </div>
        
        <div className="relative z-10 max-w-5xl space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/20 text-[10px] md:text-xs uppercase font-bold tracking-widest">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
            Operational Frequency Detected
          </div>
          <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-headline font-bold leading-[0.9] tracking-tighter uppercase italic">
            {config.heroHeadline.split(' ').map((word, i) => (
              <span key={i} className={i === 1 ? "text-primary neon-glow-orange inline-block animate-pulse-glow" : ""}>
                {word}{' '}
              </span>
            ))}
          </h1>
          <p className="text-base md:text-2xl text-muted-foreground font-medium max-w-3xl leading-relaxed">
            {config.heroTagline}
          </p>
          <div className="flex flex-wrap gap-4 pt-4 md:pt-8">
            <Button size="lg" className="bg-primary text-background font-bold hover:bg-primary/90 neon-glow-orange h-14 md:h-16 px-10 md:px-14 text-xs md:text-sm" onClick={() => playTrack(MOCK_TRACKS[0])}>
              <Play className="w-5 h-5 mr-3 fill-current" /> STREAM NOW
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-foreground hover:bg-white/5 font-bold h-14 md:h-16 px-10 md:px-14 text-xs md:text-sm" asChild>
              <Link href="/discography">THE VAULT</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-32">
        {/* Latest Tracks */}
        <div className="lg:col-span-8 space-y-12 md:space-y-16">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl md:text-4xl font-headline font-bold uppercase flex items-center gap-4">
              <Disc className="text-secondary w-8 h-8 md:w-10 md:h-10" />
              Latest Signals
            </h2>
            <Button variant="ghost" size="sm" className="text-muted-foreground text-[10px] md:text-xs uppercase hover:text-secondary group" asChild>
              <Link href="/discography">
                Access All <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          
          <div className="grid gap-3 md:gap-4">
            {MOCK_TRACKS.map(track => (
              <TrackItem key={track.id} track={track} />
            ))}
          </div>

          {currentTrack && (
            <div className="mt-12 md:mt-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <TrackInsightPanel track={currentTrack} />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-16 md:space-y-24">
           <div className="bg-card/40 backdrop-blur-md rounded-[2rem] p-8 md:p-10 border border-white/5 relative overflow-hidden group neon-glow-purple">
             <div className="absolute top-0 right-0 -mr-12 -mt-12 w-32 h-32 bg-accent opacity-10 blur-3xl group-hover:opacity-20 transition-opacity" />
             <h3 className="text-2xl md:text-3xl font-headline font-bold mb-4 flex items-center gap-3 uppercase italic">
               Join the <span className="text-accent">Squad</span>
             </h3>
             <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
               Subscribe for encrypted updates, priority tour access, and exclusive merchandise drops.
             </p>
             <div className="flex flex-col gap-4">
               <input 
                type="email" 
                placeholder="IDENTITY@PROTOCOL.COM" 
                className="bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-accent transition-all" 
               />
               <Button className="w-full h-14 bg-accent text-accent-foreground font-bold hover:bg-accent/90 text-xs uppercase tracking-widest">
                 INITIALIZE CONNECTION
               </Button>
             </div>
           </div>

           <div className="space-y-8 md:space-y-12">
              <h3 className="text-xl md:text-2xl font-headline font-bold uppercase flex items-center gap-3">
                <TrendingUp className="text-primary w-6 h-6" /> Trending Nodes
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {MOCK_ALBUMS.map(album => (
                  <Link href="/discography" key={album.id} className="group flex items-center gap-6 p-3 rounded-[1.5rem] hover:bg-white/5 transition-all">
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-white/5">
                      <Image src={album.coverArt} alt={album.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm md:text-base font-bold uppercase truncate group-hover:text-primary transition-colors">{album.title}</h4>
                      <p className="text-[10px] md:text-xs text-muted-foreground font-medium">{album.releaseYear} • {album.tracks.length} TRACKS</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
