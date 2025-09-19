// src/ai/flows/personalized-job-recommendations.ts
'use server';

/**
 * @fileOverview Memberikan rekomendasi pekerjaan yang dipersonalisasi berdasarkan keterampilan pengguna, riwayat pencarian, dan preferensi.
 *
 * - getPersonalizedJobRecommendations - Fungsi yang mengembalikan rekomendasi pekerjaan yang dipersonalisasi untuk pengguna.
 * - PersonalizedJobRecommendationsInput - Tipe input untuk fungsi getPersonalizedJobRecommendations.
 * - PersonalizedJobRecommendationsOutput - Tipe kembalian untuk fungsi getPersonalizedJobRecommendations.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedJobRecommendationsInputSchema = z.object({
  userSkills: z.array(z.string()).describe('Daftar keterampilan pencari kerja.'),
  searchHistory: z.array(z.string()).describe('Kueri pencarian pekerjaan terakhir pencari kerja.'),
  preferences: z.string().describe('Preferensi pencari kerja (misalnya, jenis pekerjaan, lokasi).'),
});
export type PersonalizedJobRecommendationsInput = z.infer<typeof PersonalizedJobRecommendationsInputSchema>;

const PersonalizedJobRecommendationsOutputSchema = z.object({
  jobRecommendations: z.array(z.string()).describe('Daftar rekomendasi pekerjaan yang disesuaikan dengan pengguna.'),
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
