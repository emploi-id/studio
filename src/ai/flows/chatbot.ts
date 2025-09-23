'use server';
/**
 * @fileOverview A simple chatbot flow.
 *
 * - chat - A function that handles a chat conversation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z, Message} from 'genkit';

const ChatInputSchema = z.object({
  history: z.array(Message.schema).optional(),
  message: z.string(),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

export type ChatOutput = string;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const {history, message} = input;
    
    const systemPrompt = `You are a friendly and helpful AI assistant for a job board website called "emploi". Your goal is to assist users with their job search, provide career advice, and answer questions about the platform. Be concise and helpful.`;

    const llm = ai.model('googleai/gemini-2.5-flash');

    const response = await llm.generate({
      system: systemPrompt,
      history: history,
      prompt: message,
    });

    return response.text;
  }
);
