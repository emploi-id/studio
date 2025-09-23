'use server';

import { z } from 'zod';
import { getResumeOptimizationSuggestions } from '@/ai/flows/resume-optimization-suggestions';
import { skillsBasedJobMatching } from '@/ai/flows/skills-based-job-matching';
import { chat, ChatInput } from '@/ai/flows/chatbot';
import { Message } from 'genkit';


type PolishResumeState = {
  suggestions: string;
  error: string;
};

export async function polishResumeAction(
  prevState: PolishResumeState,
  formData: FormData
): Promise<PolishResumeState> {
  const schema = z.object({
    resumeText: z.string().min(1, 'Resume text cannot be empty.'),
    jobDescription: z.string().optional(),
  });

  const validatedFields = schema.safeParse({
    resumeText: formData.get('resumeText'),
    jobDescription: formData.get('jobDescription'),
  });

  if (!validatedFields.success) {
    return {
      suggestions: '',
      error: validatedFields.error.errors.map((e) => e.message).join(', '),
    };
  }

  try {
    const result = await getResumeOptimizationSuggestions(validatedFields.data);
    return {
      suggestions: result.suggestions,
      error: '',
    };
  } catch (e) {
    const error = e instanceof Error ? e.message : 'An unexpected error occurred.';
    return {
      suggestions: '',
      error,
    };
  }
}


type MatchSkillsState = {
  matchedJobs: string;
  error: string;
};

export async function matchSkillsAction(
  prevState: MatchSkillsState,
  formData: FormData
): Promise<MatchSkillsState> {
  const schema = z.object({
    jobSeekerProfile: z.string().min(1, 'Profile cannot be empty.'),
    jobPostings: z.string().min(1, 'Job postings are required.'),
  });

  const validatedFields = schema.safeParse({
    jobSeekerProfile: formData.get('jobSeekerProfile'),
    jobPostings: formData.get('jobPostings'),
  });

  if (!validatedFields.success) {
    return {
      matchedJobs: '',
      error: validatedFields.error.errors.map((e) => e.message).join(', '),
    };
  }

  try {
    const result = await skillsBasedJobMatching(validatedFields.data);
    return {
      matchedJobs: result.matchedJobPostings,
      error: '',
    };
  } catch (e) {
    const error = e instanceof Error ? e.message : 'An unexpected error occurred.';
    return {
      matchedJobs: '',
      error,
    };
  }
}

export type ChatState = {
  messages: Message[];
  error?: string;
};

export async function chatAction(prevState: ChatState, formData: FormData): Promise<ChatState> {
  const schema = z.object({
    message: z.string().min(1, 'Message cannot be empty.'),
  });

  const validatedFields = schema.safeParse({
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      error: validatedFields.error.errors.map((e) => e.message).join(', '),
    };
  }
  
  const userMessage: Message = { role: 'user', content: [{ text: validatedFields.data.message }] };
  const history = [...prevState.messages, userMessage];

  try {
    const response = await chat({
        history: prevState.messages,
        message: validatedFields.data.message,
    });

    const modelMessage: Message = { role: 'model', content: [{ text: response }] };
    return {
      messages: [...history, modelMessage],
    };
  } catch (e) {
    const error = e instanceof Error ? e.message : 'An unexpected error occurred.';
    return {
      ...prevState,
      error,
    };
  }
}
