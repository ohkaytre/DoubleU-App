
"use client";

import React, { useState } from 'react';
import { Sparkles, Loader2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { generateTrackInsights, GenerateTrackInsightsOutput } from '@/ai/flows/generate-track-insights';
import { Track } from '@/types/audio';
import { cn } from '@/lib/utils';

interface TrackInsightPanelProps {
  track: Track;
  className?: string;
}

export const TrackInsightPanel: React.FC<TrackInsightPanelProps> = ({ track, className }) => {
  const [insight, setInsight] = useState<GenerateTrackInsightsOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateTrackInsights({
        trackTitle: track.title,
        artistName: track.artist,
        releaseYear: track.releaseYear,
        lyrics: track.lyrics
      });
      setInsight(result);
    } catch (error) {
      console.error("AI Insight error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={cn("bg-card/50 border-secondary/20 overflow-hidden", className)}>
      <CardHeader className="bg-secondary/5 py-3 border-b border-secondary/10 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-headline uppercase flex items-center gap-2 text-secondary">
          <Sparkles className="w-4 h-4" />
          Track Insights
        </CardTitle>
        {!insight && (
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={handleGenerate} 
            disabled={loading}
            className="h-7 text-xs text-secondary hover:bg-secondary/10"
          >
            {loading ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Sparkles className="w-3 h-3 mr-1" />}
            Generate
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-4">
        {insight ? (
          <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h5 className="font-bold text-primary text-sm">{insight.insightTitle}</h5>
            <p className="text-xs text-muted-foreground leading-relaxed italic">
              {insight.insightContent}
            </p>
            <Button 
              variant="link" 
              className="p-0 h-auto text-[10px] text-muted-foreground uppercase tracking-widest hover:text-secondary"
              onClick={() => setInsight(null)}
            >
              Regenerate
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
              <Info className="w-5 h-5 text-secondary/40" />
            </div>
            <p className="text-xs text-muted-foreground px-4">
              Curious about the story behind <span className="text-foreground font-medium">{track.title}</span>? Let our AI analyze the vibes.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
