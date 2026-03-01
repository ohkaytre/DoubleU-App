// src/components/ai/TrackInsightPanel.tsx
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  lyrics?: string;
}

interface TrackInsightPanelProps {
  track: Track;
  className?: string;
}

export function TrackInsightPanel({ track, className }: TrackInsightPanelProps) {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset state whenever the track changes
  useEffect(() => {
    setInsight(null);
    setError(null);
  }, [track.id]);

  const handleGenerateInsight = async () => {
    setLoading(true);
    setError(null);
    setInsight(null);

    try {
      // Fetch from the API route, not the server-side flow directly
      const response = await fetch('/api/generate-insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trackTitle: track.title,
          artistName: track.artist,
          albumName: track.album,
          lyrics: track.lyrics,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch insight');
      }

      const data = await response.json();
      setInsight(data.insightContent);
    } catch (err) {
      console.error(err);
      setError('Could not generate insight at this time.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={cn("border-primary/20 bg-card/50 backdrop-blur-sm", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-primary" />
          AI Track Analysis
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={handleGenerateInsight}
          disabled={loading}
          className="gap-2"
        >
          {loading ? (
            <Skeleton className="h-4 w-20" />
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Analyze
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground min-h-[100px]">
          {loading && (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
          )}

          {error && (
            <p className="text-destructive">{error}</p>
          )}

          {!loading && !insight && !error && (
            <p>Click "Analyze" to generate AI-driven insights about <strong>{track.title}</strong>.</p>
          )}

          {!loading && insight && (
            <div className="prose prose-sm prose-invert max-w-none">
              <p className="leading-relaxed">{insight}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

