'use server';

/**
 * @fileOverview This file defines a Genkit flow for categorizing civic issues reported by citizens.
 *
 * It includes:
 * - `categorizeCivicIssue` -  A function that takes an issue description and media (image) and categorizes it.
 * - `CategorizeCivicIssueInput` - The input type for the categorizeCivicIssue function.
 * - `CategorizeCivicIssueOutput` - The return type for the categorizeCivicIssue function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeCivicIssueInputSchema = z.object({
  description: z.string().describe('A detailed description of the civic issue reported by the citizen.'),
  photoDataUri: z
    .string()
    .describe(
      "A photo of the civic issue, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    )
    .optional(),
});
export type CategorizeCivicIssueInput = z.infer<typeof CategorizeCivicIssueInputSchema>;

const CategorizeCivicIssueOutputSchema = z.object({
  category: z.string().describe('The category of the civic issue (e.g., pothole, broken street light, graffiti).'),
  confidence: z.number().describe('A confidence score (0-1) indicating the accuracy of the categorization.'),
});
export type CategorizeCivicIssueOutput = z.infer<typeof CategorizeCivicIssueOutputSchema>;

export async function categorizeCivicIssue(input: CategorizeCivicIssueInput): Promise<CategorizeCivicIssueOutput> {
  return categorizeCivicIssueFlow(input);
}

const categorizeCivicIssuePrompt = ai.definePrompt({
  name: 'categorizeCivicIssuePrompt',
  input: {schema: CategorizeCivicIssueInputSchema},
  output: {schema: CategorizeCivicIssueOutputSchema},
  prompt: `You are an AI assistant that categorizes civic issues based on user descriptions and images.

  Analyze the following report to determine the most appropriate category. Provide a confidence score (0-1) for your categorization.

  Description: {{{description}}}
  {{#if photoDataUri}}
  Photo: {{media url=photoDataUri}}
  {{/if}}
  `, // Use Handlebars to conditionally include the image
});

const categorizeCivicIssueFlow = ai.defineFlow(
  {
    name: 'categorizeCivicIssueFlow',
    inputSchema: CategorizeCivicIssueInputSchema,
    outputSchema: CategorizeCivicIssueOutputSchema,
  },
  async input => {
    const {output} = await categorizeCivicIssuePrompt(input);
    return output!;
  }
);
