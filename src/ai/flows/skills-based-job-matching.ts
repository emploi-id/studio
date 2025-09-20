'use server';
/**
 * @fileOverview An AI agent that matches job seeker skills with job postings.
 *
 * - skillsBasedJobMatching - A function that takes a job seeker profile and returns relevant job postings.
 * - SkillsBasedJobMatchingInput - The input type for the skillsBasedJobMatching function.
 * - SkillsBasedJobMatchingOutput - The return type for the skillsBasedJobMatching function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkillsBasedJobMatchingInputSchema = z.object({
  jobSeekerProfile: z
    .string()
    .describe(
      "Profil pencari kerja, termasuk keterampilan, pengalaman, dan preferensi."
    ),
  jobPostings: z.string().describe('Daftar lowongan pekerjaan untuk dicocokkan.'),
});
export type SkillsBasedJobMatchingInput = z.infer<
  typeof SkillsBasedJobMatchingInputSchema
>;

const SkillsBasedJobMatchingOutputSchema = z.object({
  matchedJobPostings: z
    .string()
    .describe('Daftar lowongan pekerjaan yang cocok dengan profil pencari kerja.'),
});
export type SkillsBasedJobMatchingOutput = z.infer<
  typeof SkillsBasedJobMatchingOutputSchema
>;

export async function skillsBasedJobMatching(
  input: SkillsBasedJobMatchingInput
): Promise<SkillsBasedJobMatchingOutput> {
  return skillsBasedJobMatchingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'skillsBasedJobMatchingPrompt',
  input: {schema: SkillsBasedJobMatchingInputSchema},
  output: {schema: SkillsBasedJobMatchingOutputSchema},
  prompt: `Anda adalah seorang ahli pencocokan pekerjaan AI. Berdasarkan profil pencari kerja dan daftar lowongan pekerjaan, identifikasi lowongan yang paling sesuai dengan keterampilan dan pengalaman pencari kerja.

Profil Pencari Kerja: {{{jobSeekerProfile}}}

Lowongan Pekerjaan: {{{jobPostings}}}

Kembalikan daftar lowongan pekerjaan yang cocok untuk pencari kerja.
`,
});

const skillsBasedJobMatchingFlow = ai.defineFlow(
  {
    name: 'skillsBasedJobMatchingFlow',
    inputSchema: SkillsBasedJobMatchingInputSchema,
    outputSchema: SkillsBasedJobMatchingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
