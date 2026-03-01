"use client";

import React, { useState } from 'react';
import { MOCK_TOUR_DATES, TourDate } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MapPin, Ticket, Zap, Bell } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function TourPage() {
  const [selectedShow, setSelectedShow] = useState<TourDate | null>(null);

  const handleNotifyMe = () => {
    const timer = setTimeout(() => {
      setSelectedShow(null);
      toast({
        title: "Protocol Registered",
        description: `We'll signal you when tickets for ${selectedShow?.venue} become available.`,
      });
    }, 1500);
    return () => clearTimeout(timer);
  };

  return (
    <div className="bg-background">
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-32 space-y-24 md:space-y-32">
        <header className="space-y-6 md:space-y-10 max-w-4xl">
          <Badge className="bg-secondary/10 text-secondary border-secondary/20 font-bold tracking-[0.4em] uppercase px-5 py-2.5 text-[10px] md:text-xs">
            WORLD TOUR 2025: THE FADED PROTOCOL
          </Badge>
          <h1 className="text-5xl md:text-9xl font-headline font-bold uppercase tracking-tighter leading-none italic">
            THE <span className="text-primary">PULSE</span> TRANSMISSION
          </h1>
          <p className="text-muted-foreground max-w-3xl text-lg md:text-2xl leading-relaxed font-medium">
            Experience the multi-sensory journey live. DoubleU translates the digital realm into physical reality across exclusive global nodes.
          </p>
        </header>

        <div className="space-y-6 md:space-y-8">
          {MOCK_TOUR_DATES.map((show) => (
            <div 
              key={show.id} 
              className="group flex flex-col lg:flex-row lg:items-center justify-between p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] bg-card/40 backdrop-blur-md border border-white/5 hover:border-primary/20 transition-all hover:bg-white/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[400px] h-full bg-gradient-to-l from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex flex-col lg:flex-row lg:items-center gap-6 md:gap-16 flex-1 relative z-10">
                <div className="flex flex-col min-w-[150px]">
                  <span className="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-2">{show.date.split(',')[1]?.trim() || '2025'}</span>
                  <span className="text-3xl md:text-5xl font-headline font-bold tracking-tighter italic">{show.date.split(',')[0]}</span>
                </div>
                
                <div className="hidden lg:block h-20 w-px bg-white/10" />
                
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-4xl font-bold uppercase tracking-tight group-hover:text-primary transition-colors italic">{show.venue}</h3>
                  <div className="flex items-center gap-3 text-muted-foreground text-xs md:text-base font-medium uppercase tracking-widest">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-secondary" />
                    {show.location}
                  </div>
                </div>
              </div>

              <div className="mt-8 lg:mt-0 flex items-center gap-4 relative z-10">
                {show.status === 'sold-out' ? (
                  <div className="flex items-center gap-4 w-full lg:w-auto">
                    <Badge variant="outline" className="border-red-500/30 text-red-400 font-bold px-8 py-3 rounded-full text-[10px] md:text-xs tracking-widest uppercase flex-1 text-center bg-red-500/5">SOLD OUT</Badge>
                    <Button 
                      variant="ghost" 
                      onClick={() => setSelectedShow(show)}
                      className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] hover:text-secondary h-14 px-6 group"
                    >
                      <Bell className="w-4 h-4 mr-2 group-hover:animate-bounce" /> Notify
                    </Button>
                  </div>
                ) : (
                  <Button className="w-full lg:w-auto bg-primary text-background font-bold px-12 md:px-16 h-14 md:h-16 rounded-full hover:bg-primary/90 neon-glow-orange transition-all text-xs md:text-sm tracking-[0.2em]">
                    <Ticket className="w-5 h-5 mr-3" /> ACCESS PASS
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <section className="bg-accent/5 rounded-[3rem] md:rounded-[5rem] p-12 md:p-32 border border-accent/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 md:w-[600px] md:h-[600px] bg-accent/20 blur-[100px] md:blur-[180px] group-hover:bg-accent/30 transition-all duration-1000" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-24">
            <div className="space-y-6 md:space-y-10 text-center lg:text-left">
              <h2 className="text-4xl md:text-7xl font-headline font-bold uppercase flex flex-col lg:flex-row lg:items-center gap-6 italic leading-none">
                <Zap className="text-accent w-12 h-12 md:w-20 md:h-20 fill-accent animate-pulse mx-auto lg:mx-0" />
                UPGRADE YOUR ACCESS
              </h2>
              <p className="text-muted-foreground text-lg md:text-2xl leading-relaxed max-w-2xl font-medium">
                Unlock exclusive perks: early node entry, signed merchandise, and private soundcheck access with DoubleU.
              </p>
            </div>
            <Button size="lg" className="w-full lg:w-auto bg-accent text-accent-foreground font-bold px-14 md:px-20 h-16 md:h-20 rounded-full hover:bg-accent/90 neon-glow-purple text-xs md:text-sm tracking-[0.3em]">
              UPGRADE PROTOCOL
            </Button>
          </div>
        </section>

        <Dialog open={!!selectedShow} onOpenChange={() => setSelectedShow(null)}>
          <DialogContent className="bg-card/95 backdrop-blur-2xl border-white/10 rounded-[2.5rem] p-10 md:p-16 sm:max-w-xl w-[95vw]">
            <DialogHeader className="space-y-6">
              <div className="w-20 h-20 rounded-[2rem] bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <Bell className="w-10 h-10 text-secondary" />
              </div>
              <DialogTitle className="text-3xl md:text-4xl font-headline font-bold text-center uppercase italic">Signal Registration</DialogTitle>
              <DialogDescription className="text-center text-muted-foreground uppercase text-[10px] md:text-xs tracking-[0.3em] font-bold">
                Registering for: {selectedShow?.venue} • {selectedShow?.location}
              </DialogDescription>
            </DialogHeader>
            <div className="py-10 space-y-8">
              <p className="text-sm md:text-lg text-center text-muted-foreground leading-relaxed">
                Enter your network identity to receive encrypted signals if any tickets are released for this node.
              </p>
              <Input 
                placeholder="IDENTITY@PROTOCOL.COM" 
                className="bg-black/50 h-16 md:h-20 text-center font-mono uppercase tracking-[0.3em] text-xs md:text-sm border-white/10 rounded-2xl" 
              />
            </div>
            <DialogFooter>
              <Button 
                className="w-full h-16 md:h-20 bg-secondary text-background font-bold rounded-2xl text-sm md:text-base tracking-widest"
                onClick={handleNotifyMe}
              >
                REGISTER PROTOCOL
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
