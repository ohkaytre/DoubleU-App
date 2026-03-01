// src/app/api/generate-insights/route.ts
import { NextResponse } from 'next/server';
// Server-only import
import { generateTrackInsights } from '@/ai/flows/generate-track-insights'; 

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Call the server-side Genkit flow
    const insight = await generateTrackInsights(body);
    
    return NextResponse.json(insight);
  } catch (error) {
    console.error("Genkit Error:", error);
    return NextResponse.json({ error: 'Failed to generate insight' }, { status: 500 });
  }
}

