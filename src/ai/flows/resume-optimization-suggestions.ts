'use server';

/**
 * @fileOverview Agen AI yang memberikan saran pengoptimalan resume.
 *
 * - getResumeOptimizationSuggestions - Sebuah fungsi yang menangani proses pengoptimalan resume.
 * - ResumeOptimizationInput - Tipe input untuk fungsi getResumeOptimizationSuggestions.
 * - ResumeOptimizationOutput - Tipe kembalian untuk fungsi getResumeOptimizationSuggestions.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResumeOptimizationInputSchema = z.object({
  resumeText: z
    .string()
    .describe('Konten teks dari resume yang akan dioptimalkan.'),
  jobDescription: z
    .string()
    .optional()
    .describe('Deskripsi pekerjaan opsional untuk menyesuaikan resume.'),
});
export type ResumeOptimizationInput = z.infer<typeof ResumeOptimizationInputSchema>;

const ResumeOptimizationOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('Saran yang didukung AI tentang cara meningkatkan resume.'),
});
export type ResumeOptimizationOutput = z.infer<typeof ResumeOptimizationOutputSchema>;

export async function getResumeOptimizationSuggestions(
  input: ResumeOptimizationInput
): Promise<ResumeOptimizationOutput> {
  return resumeOptimizationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'resumeOptimizationPrompt',
  input: {schema: ResumeOptimizationInputSchema},
  output: {schema: ResumeOptimizationOutputSchema},
  prompt: `Anda adalah seorang ahli pengoptimal resume. Tinjau resume yang diberikan dan berikan saran untuk perbaikan.

Resume:
{{{resumeText}}}

{{#if jobDescription}}
Deskripsi pekerjaan:
{{{jobDescription}}}

Sesuaikan resume dengan deskripsi pekerjaan ini.
{{/if}}

Berikan saran yang spesifik dan dapat ditindaklanjuti, termasuk pengoptimalan kata kunci, perbaikan format, dan revisi konten.
`,
});

const resumeOptimizationFlow = ai.defineFlow(
  {
    name: 'resumeOptimizationFlow',
    inputSchema: ResumeOptimizationInputSchema,
    outputSchema: ResumeOptimizationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
