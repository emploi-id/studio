'use server';

/**
 * @fileOverview An AI agent that provides resume optimization suggestions.
 *
 * - getResumeOptimizationSuggestions - A function that handles the resume optimization process.
 * - ResumeOptimizationInput - The input type for the getResumeOptimizationSuggestions function.
 * - ResumeOptimizationOutput - The return type for the getResumeOptimizationSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResumeOptimizationInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the resume to be optimized.'),
  jobDescription: z
    .string()
    .optional()
    .describe('Optional job description to tailor the resume to.'),
});
export type ResumeOptimizationInput = z.infer<typeof ResumeOptimizationInputSchema>;

const ResumeOptimizationOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('AI-powered suggestions on how to improve the resume.'),
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
  prompt: `You are an expert resume optimizer. Review the provided resume and provide suggestions for improvement.

Resume:
{{{resumeText}}}

{{#if jobDescription}}
Job Description:
{{{jobDescription}}}

Tailor the resume to this job description.
{{/if}}

Provide specific, actionable suggestions, including keyword optimization, formatting improvements, and content revisions.
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
