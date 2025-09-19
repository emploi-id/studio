// src/ai/flows/personalized-job-recommendations.ts
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
  userSkills: z.array(z.string()).describe('List of the job seeker\'s skills.'),
  searchHistory: z.array(z.string()).describe('Job seeker\'s recent job search queries.'),
  preferences: z.string().describe('Job seeker\'s preferences (e.g., job type, location).'),
});
export type PersonalizedJobRecommendationsInput = z.infer<typeof PersonalizedJobRecommendationsInputSchema>;

const PersonalizedJobRecommendationsOutputSchema = z.object({
  jobRecommendations: z.array(z.string()).describe('A list of job recommendations tailored to the user.'),
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
  prompt: `You are an expert job recommendation system.

  Based on the job seeker's skills, search history, and preferences, provide a list of personalized job recommendations.

  Skills: {{#if userSkills}}{{#each userSkills}} - {{{this}}}\n{{/each}}{{else}}No skills listed.{{/if}}
  Search History: {{#if searchHistory}}{{#each searchHistory}} - {{{this}}}\n{{/each}}{{else}}No search history.{{/if}}
  Preferences: {{{preferences}}}

  Job Recommendations:`,
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
