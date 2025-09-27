'use server';

/**
 * @fileOverview Summarizes issue reports for admins.
 *
 * - summarizeIssueReports - A function that summarizes issue reports.
 * - SummarizeIssueReportsInput - The input type for the summarizeIssueReports function.
 * - SummarizeIssueReportsOutput - The return type for the summarizeIssueReports function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeIssueReportsInputSchema = z.object({
  reports: z
    .string()
    .describe('A list of issue reports, each separated by a newline.'),
});
export type SummarizeIssueReportsInput = z.infer<
  typeof SummarizeIssueReportsInputSchema
>;

const SummarizeIssueReportsOutputSchema = z.object({
  summary: z.string().describe('A summary of the issue reports.'),
});
export type SummarizeIssueReportsOutput = z.infer<
  typeof SummarizeIssueReportsOutputSchema
>;

export async function summarizeIssueReports(
  input: SummarizeIssueReportsInput
): Promise<SummarizeIssueReportsOutput> {
  return summarizeIssueReportsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeIssueReportsPrompt',
  input: {schema: SummarizeIssueReportsInputSchema},
  output: {schema: SummarizeIssueReportsOutputSchema},
  prompt: `You are an expert at summarizing issue reports for city admins.

  Please provide a concise summary of the following issue reports:

  {{{reports}}}
  `,
});

const summarizeIssueReportsFlow = ai.defineFlow(
  {
    name: 'summarizeIssueReportsFlow',
    inputSchema: SummarizeIssueReportsInputSchema,
    outputSchema: SummarizeIssueReportsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
