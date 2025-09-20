'use server';

/**
 * @fileOverview Provides personalized job recommendations based on user skills, search history, and preferences.
 *
 * - getPersonalizedJobRecommendations - A function that returns personalized job recommendations for a user.
 * - PersonalizedJobRecommendationsInput - The input type for the getPersonalizedJobRecommendations function.
 * - PersonalizedJobRecommendationsOutput - The return type for the getPersonalizedJobRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedJobRecommendationsInputSchema = z.object({
  userSkills: z.array(z.string()).describe("Daftar keterampilan pencari kerja."),
  searchHistory: z.array(z.string()).describe("Riwayat pencarian kerja terbaru pencari kerja."),
  preferences: z.string().describe("Preferensi pencari kerja (misalnya, jenis pekerjaan, lokasi)."),
});
export type PersonalizedJobRecommendationsInput = z.infer<typeof PersonalizedJobRecommendationsInputSchema>;

const PersonalizedJobRecommendationsOutputSchema = z.object({
  jobRecommendations: z.array(z.string()).describe('Daftar rekomendasi pekerjaan yang disesuaikan untuk pengguna.'),
});
export type PersonalizedJobRecommendationsOutput = z.infer<typeof PersonalizedJobRecommendationsOutputSchema>;

export async function getPersonalizedJobRecommendations(
  input: PersonalizedJobRecommendationsInput
): Promise<PersonalizedJobRecommendationsOutput> {
  return personalizedJobRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedJobRecommendationsPrompt',
  input: {schema: PersonalizedJobRecommendationsInputSchema},
  output: {schema: PersonalizedJobRecommendationsOutputSchema},
  prompt: `Anda adalah sistem rekomendasi pekerjaan ahli.

  Berdasarkan keterampilan, riwayat pencarian, dan preferensi pencari kerja, berikan daftar rekomendasi pekerjaan yang dipersonalisasi.

  Keterampilan: {{#if userSkills}}{{#each userSkills}} - {{{this}}}\n{{/each}}{{else}}Tidak ada keterampilan yang terdaftar.{{/if}}
  Riwayat Pencarian: {{#if searchHistory}}{{#each searchHistory}} - {{{this}}}\n{{/each}}{{else}}Tidak ada riwayat pencarian.{{/if}}
  Preferensi: {{{preferences}}}

  Rekomendasi Pekerjaan:`,
});

const personalizedJobRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedJobRecommendationsFlow',
    inputSchema: PersonalizedJobRecommendationsInputSchema,
    outputSchema: PersonalizedJobRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
