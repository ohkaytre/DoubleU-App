// src/components/ui/TrackCard.tsx
"use client"; // Required for interactivity (clicks, state)
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TrackCard({ track }: { track: any }) {
  const [insight, setInsight] = useState('');
  const [loading, setLoading] = useState(false);

  // This function calls the API route created in src/app/api/generate-insights/route.ts
  const handleGenerate = async () => {
    setLoading(true);
    setInsight('');
    
    try {
      const response = await fetch('/api/generate-insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          trackTitle: track.title,
          artistName: track.artist,
          // Optional fields
          albumName: track.album,
          lyrics: track.lyrics,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setInsight(data.insightContent); // Assuming your AI returns this
    } catch (error) {
      console.error("Error generating insight:", error);
      setInsight('Failed to generate insight.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{track.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{track.artist}</p>
      </CardHeader>
      <CardContent>
        <Button onClick={handleGenerate} disabled={loading} className="w-full">
          {loading ? 'Generating...' : 'Generate Insight'}
        </Button>
        {insight && (
          <div className="mt-4 p-3 bg-muted rounded-md text-sm">
            {insight}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

