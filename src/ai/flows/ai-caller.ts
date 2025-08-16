'use server';

/**
 * @fileOverview Implements the AI caller for the Loteria game.
 *
 * - aiCaller - A function that returns audio of AI caller reading a card.
 * - AICallerInput - The input type for the aiCaller function.
 * - AICallerOutput - The return type for the aiCaller function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const AICallerInputSchema = z.object({
  cardName: z.string().describe('The name of the Loteria card to be read aloud.'),
});
export type AICallerInput = z.infer<typeof AICallerInputSchema>;

const AICallerOutputSchema = z.object({
  media: z.string().describe('The audio data URI of the card being read.'),
});
export type AICallerOutput = z.infer<typeof AICallerOutputSchema>;

export async function aiCaller(input: AICallerInput): Promise<AICallerOutput> {
  return aiCallerFlow(input);
}

const aiCallerFlow = ai.defineFlow(
  {
    name: 'aiCallerFlow',
    inputSchema: AICallerInputSchema,
    outputSchema: AICallerOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: `Read the loteria card ${input.cardName} with traditional verses.`,
    });
    if (!media) {
      throw new Error('no media returned');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    return {
      media: 'data:audio/wav;base64,' + (await toWav(audioBuffer)),
    };
  }
);

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
