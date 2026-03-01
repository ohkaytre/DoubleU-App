"use client";

import React from 'react';
import { useAudio } from '@/context/AudioContext';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Image from 'next/image';

export const GlobalPlayer: React.FC = () => {
  const { currentTrack, isPlaying, progress, duration, togglePlay, seek, nextTrack, prevTrack } = useAudio();

  if (!currentTrack) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[110] bg-background/80 backdrop-blur-2xl border-t border-primary/20 p-3 md:p-6 transition-all duration-500 animate-in slide-in-from-bottom-full">
      <div className="max-w-7xl mx-auto flex items-center gap-4 md:gap-12">
        {/* Track Info */}
        <div className="flex items-center gap-4 min-w-0 flex-1 md:flex-none md:w-80">
          <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-xl overflow-hidden flex-shrink-0 neon-glow-orange shadow-lg">
            <Image 
              src={currentTrack.coverArt} 
              alt={currentTrack.title} 
              fill 
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <h4 className="font-headline text-sm md:text-lg font-bold truncate text-primary uppercase tracking-tighter">{currentTrack.title}</h4>
            <p className="text-[10px] md:text-xs text-muted-foreground truncate uppercase font-bold tracking-widest">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex-none md:flex-1 flex flex-col items-center gap-2">
          <div className="flex items-center gap-4 md:gap-8">
            <Button variant="ghost" size="icon" onClick={prevTrack} className="hover:text-secondary hidden md:flex text-muted-foreground">
              <SkipBack className="w-6 h-6" />
            </Button>
            <Button 
              onClick={togglePlay} 
              size="icon"
              className="bg-primary text-primary-foreground rounded-full w-10 h-10 md:w-14 md:h-14 hover:bg-primary/80 transition-all active:scale-95 neon-glow-orange shadow-xl"
            >
              {isPlaying ? <Pause className="w-5 h-5 md:w-7 md:h-7" /> : <Play className="w-5 h-5 md:w-7 md:h-7 ml-1" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={nextTrack} className="hover:text-secondary text-muted-foreground">
              <SkipForward className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
          </div>
          
          <div className="hidden md:flex items-center gap-4 w-full max-w-2xl">
            <span className="text-[10px] text-muted-foreground font-mono w-12 text-right">{formatTime(progress)}</span>
            <Slider 
              value={[progress]} 
              max={duration || 100} 
              step={0.1}
              onValueChange={(vals) => seek(vals[0])}
              className="flex-1"
            />
            <span className="text-[10px] text-muted-foreground font-mono w-12">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Extra Controls */}
        <div className="hidden md:flex items-center justify-end w-80 gap-6">
          <div className="flex items-center gap-3 w-40">
            <Volume2 className="w-5 h-5 text-secondary" />
            <Slider defaultValue={[80]} max={100} className="flex-1" />
          </div>
        </div>
      </div>
      
      {/* Mobile progress bar (on top of player) */}
      <div className="md:hidden absolute top-0 left-0 right-0 h-1 bg-white/5 overflow-hidden">
         <div 
          className="h-full bg-primary transition-all duration-300" 
          style={{ width: `${(progress / (duration || 1)) * 100}%` }} 
        />
      </div>
    </div>
  );
};
