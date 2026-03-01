// src/app/api/generate-insights/route.ts
import { NextResponse } from 'next/server';
// Import the logic, but NOT the file with 'use server'
import { generateTrackInsights } from '@/ai/flows/generate-track-insights'; 

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body
    if (!body.trackTitle || !body.artistName) {
      return NextResponse.json({ error: 'Missing trackTitle or artistName' }, { status: 400 });
    }

    // Call the Genkit flow logic
    const insights = await generateTrackInsights(body);
    
    // Return the JSON response
    return NextResponse.json(insights);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to generate insights' }, { status: 500 });
  }
}

