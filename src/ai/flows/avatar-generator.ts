'use server';
/**
 * @fileOverview A flow for generating user avatars.
 *
 * - generateAvatar - A function that creates an avatar image based on a name.
 * - GenerateAvatarInput - The input type for the generateAvatar function.
 * - GenerateAvatarOutput - The return type for the generateAvatar function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateAvatarInputSchema = z.object({
  name: z.string().describe('The name of the user.'),
});
export type GenerateAvatarInput = z.infer<typeof GenerateAvatarInputSchema>;

const GenerateAvatarOutputSchema = z.object({
  avatarDataUri: z.string().describe("The generated avatar image as a data URI."),
});
export type GenerateAvatarOutput = z.infer<typeof GenerateAvatarOutputSchema>;


export async function generateAvatar(input: GenerateAvatarInput): Promise<GenerateAvatarOutput> {
  return generateAvatarFlow(input);
}

const generateAvatarFlow = ai.defineFlow(
  {
    name: 'generateAvatarFlow',
    inputSchema: GenerateAvatarInputSchema,
    outputSchema: GenerateAvatarOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Generate a vibrant, playful, and friendly avatar suitable for a Loteria game player named ${input.name}. The avatar should be in a cartoon or illustrated style, reflecting the festive and colorful nature of the game.`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media?.url) {
      throw new Error('Image generation failed to produce an image.');
    }

    return { avatarDataUri: media.url };
  }
);
