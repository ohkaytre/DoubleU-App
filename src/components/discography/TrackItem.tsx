
"use client";

import React from 'react';
import { Play } from 'lucide-react';
import { Track } from '@/types/audio';
import { useAudio } from '@/context/AudioContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface TrackItemProps {
  track: Track;
}

export const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();
  
  const isCurrent = currentTrack?.id === track.id;

  const handlePlay = () => {
    if (isCurrent) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  return (
    <div 
      className={cn(
        "group flex items-center justify-between p-3 rounded-xl transition-all border border-transparent",
        isCurrent ? "bg-accent/10 border-accent/20" : "hover:bg-white/5"
      )}
    >
      <div className="flex items-center gap-4">
        <div className="relative w-10 h-10 flex-shrink-0 group-hover:scale-105 transition-transform">
          <div className={cn(
            "absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-lg",
            isCurrent && "opacity-100"
          )}>
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={handlePlay}
              className="w-6 h-6 p-0 hover:bg-transparent"
            >
              {isCurrent && isPlaying ? (
                <div className="flex gap-0.5 items-end h-3">
                  <div className="w-0.5 bg-primary animate-[bounce_1s_infinite]" style={{ height: '60%' }} />
                  <div className="w-0.5 bg-primary animate-[bounce_0.8s_infinite]" style={{ height: '100%' }} />
                  <div className="w-0.5 bg-primary animate-[bounce_1.2s_infinite]" style={{ height: '40%' }} />
                </div>
              ) : (
                <Play className="w-4 h-4 fill-primary text-primary" />
              )}
            </Button>
          </div>
          <div className="w-full h-full relative rounded-lg overflow-hidden">
            <Image src={track.coverArt} alt={track.title} fill className="object-cover" />
          </div>
        </div>
        <div>
          <h5 className={cn(
            "text-sm font-bold uppercase tracking-tight",
            isCurrent ? "text-primary" : "text-foreground"
          )}>
            {track.title}
          </h5>
          <p className="text-xs text-muted-foreground">{track.artist}</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-xs font-mono text-muted-foreground hidden sm:block">{track.duration}</span>
      </div>
    </div>
  );
};
