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
    .describe("The job seeker's profile, including skills, experience, and preferences."),
  jobPostings: z.string().describe('A list of job postings to match against.'),
});
export type SkillsBasedJobMatchingInput = z.infer<
  typeof SkillsBasedJobMatchingInputSchema
>;

const SkillsBasedJobMatchingOutputSchema = z.object({
  matchedJobPostings: z
    .string()
    .describe('A list of job postings that match the job seeker profile.'),
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
  prompt: `You are an AI job matching expert. Given a job seeker's profile and a list of job postings, identify the most suitable postings that match the seeker's skills and experience.

Job Seeker Profile: {{{jobSeekerProfile}}}

Job Postings: {{{jobPostings}}}

Return a list of matched job postings for the job seeker.
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
