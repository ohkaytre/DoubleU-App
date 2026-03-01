
/**
 * @fileOverview This file implements a Genkit flow for generating creative interpretations,
 * backstories, or thematic insights for music tracks based on their metadata.
 *
 * - generateTrackInsights - A function that handles the track insight generation process.
 * - GenerateTrackInsightsInput - The input type for the generateTrackInsights function.
 * - GenerateTrackInsightsOutput - The return type for the generateTrackInsights function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateTrackInsightsInputSchema = z.object({
  trackTitle: z.string().describe('The title of the music track.'),
  artistName: z.string().describe('The name of the artist for the track.'),
  albumName: z.string().optional().describe('The name of the album the track belongs to.'),
  releaseYear: z.number().optional().describe('The year the track was released.'),
  lyrics: z.string().optional().describe('The lyrics of the track, if available.'),
});
export type GenerateTrackInsightsInput = z.infer<typeof GenerateTrackInsightsInputSchema>;

const GenerateTrackInsightsOutputSchema = z.object({
  insightTitle: z.string().describe('A concise and engaging title for the generated insight.'),
  insightContent: z.string().describe('The detailed creative interpretation, backstory, or thematic insight.'),
});
export type GenerateTrackInsightsOutput = z.infer<typeof GenerateTrackInsightsOutputSchema>;

const trackInsightPrompt = ai.definePrompt({
  name: 'trackInsightPrompt',
  input: { schema: GenerateTrackInsightsInputSchema },
  output: { schema: GenerateTrackInsightsOutputSchema },
  prompt: `You are an AI music critic and storyteller specializing in the artist DoubleU. Your task is to generate a unique creative interpretation, backstory, or thematic insight for a given music track.

Consider the track's metadata and lyrics (if provided) to craft an engaging and thought-provoking piece that deepens a fan's connection to the music.

Track Title: {{{trackTitle}}}
Artist: {{{artistName}}}
{{#if albumName}}Album: {{{albumName}}}{{/if}}
{{#if releaseYear}}Release Year: {{{releaseYear}}}{{/if}}
{{#if lyrics}}Lyrics:
"""
{{{lyrics}}}
"""{{/if}}

Generate an insight that is creative, original, and explores hidden meanings or unique perspectives on the song. Focus on providing a backstory, an emotional interpretation, or a thematic analysis.

Return the output in JSON format, with an 'insightTitle' and 'insightContent' field.`,
});

const generateTrackInsightsFlow = ai.defineFlow(
  {
    name: 'generateTrackInsightsFlow',
    inputSchema: GenerateTrackInsightsInputSchema,
    outputSchema: GenerateTrackInsightsOutputSchema,
  },
  async (input) => {
    const { output } = await trackInsightPrompt(input);
    return output!;
  }
);

export async function generateTrackInsights(input: GenerateTrackInsightsInput): Promise<GenerateTrackInsightsOutput> {
  return generateTrackInsightsFlow(input);
}

