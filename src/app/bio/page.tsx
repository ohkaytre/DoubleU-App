"use client";

import Image from 'next/image';
import { Music, Star, MapPin, Globe, Award } from 'lucide-react';
import { useSiteConfig } from '@/context/SiteConfigContext';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function BioPage() {
  const { config } = useSiteConfig();
  const bioImage = PlaceHolderImages.find(img => img.id === 'bio-artist-1');

  return (
    <div className="bg-background min-h-screen">
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-32 space-y-16 md:space-y-32">
        <header className="space-y-6 md:space-y-10 max-w-5xl">
          <h1 className="text-5xl md:text-9xl font-headline font-bold tracking-tighter uppercase leading-[0.8] italic">
            THE <span className="text-accent">VISIONARY</span>
          </h1>
          <div className="flex flex-wrap gap-4 md:gap-8 text-[10px] md:text-xs font-bold uppercase tracking-widest md:tracking-[0.4em] text-muted-foreground">
            <span className="flex items-center gap-3 bg-white/5 px-5 py-2.5 rounded-full border border-white/10">
              <MapPin className="w-4 h-4 text-primary" /> {config.locationNode}
            </span>
            <span className="flex items-center gap-3 bg-white/5 px-5 py-2.5 rounded-full border border-white/10">
              <Music className="w-4 h-4 text-secondary" /> SYNTH-WAVE
            </span>
            <span className="flex items-center gap-3 bg-white/5 px-5 py-2.5 rounded-full border border-white/10">
              <Globe className="w-4 h-4 text-accent" /> DIGITAL NATIVE
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-start">
          <div className="relative aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(128,25,230,0.15)] border border-white/10 group">
            {bioImage && (
              <Image 
                src={bioImage.imageUrl} 
                alt={bioImage.description} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                data-ai-hint={bioImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10">
              <p className="text-4xl md:text-6xl font-headline font-bold text-white uppercase italic tracking-tighter">DoubleU</p>
              <p className="text-xs font-bold text-accent tracking-[0.3em] uppercase mt-2">Founding Neural Link</p>
            </div>
          </div>
          
          <div className="space-y-12 md:space-y-20">
            <div className="space-y-8 md:space-y-10 font-body text-lg md:text-2xl leading-relaxed text-muted-foreground/90 italic">
              <p className="first-letter:text-7xl md:first-letter:text-9xl first-letter:font-bold first-letter:text-primary first-letter:mr-4 md:first-letter:mr-6 first-letter:float-left first-letter:leading-[0.8] not-italic">
                {config.artistBio}
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
              <div className="p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] bg-card/40 border border-white/5 space-y-6 hover:border-primary/20 transition-all group">
                <h3 className="text-xl md:text-2xl font-headline font-bold text-foreground flex items-center gap-4 uppercase italic">
                  <Star className="text-primary w-6 h-6 md:w-8 md:h-8 fill-primary/20 group-hover:scale-110 transition-transform" /> Milestones
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase text-primary tracking-[0.3em] mb-1">2024</p>
                    <p className="text-sm md:text-base font-medium">Sonic Innovation Award • DAA</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-primary tracking-[0.3em] mb-1">2023</p>
                    <p className="text-sm md:text-base font-medium">9-Digit Streaming Threshold Exceeded</p>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] bg-card/40 border border-white/5 space-y-6 hover:border-secondary/20 transition-all group">
                <h3 className="text-xl md:text-2xl font-headline font-bold text-foreground flex items-center gap-4 uppercase italic">
                  <Award className="text-secondary w-6 h-6 md:w-8 md:h-8 fill-secondary/20 group-hover:scale-110 transition-transform" /> Frequencies
                </h3>
                <div className="flex flex-wrap gap-3">
                  {['Analog', 'Cyber', 'Neon', 'Industrial', 'Ethereal', 'Binary'].map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase px-4 py-2 rounded-full bg-white/5 border border-white/10 group-hover:border-secondary/30 transition-colors tracking-widest">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
