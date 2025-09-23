'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/skills-based-job-matching.ts';
import '@/ai/flows/resume-optimization-suggestions.ts';
import '@/ai/flows/personalized-job-recommendations.ts';
import '@/ai/flows/chatbot.ts';
