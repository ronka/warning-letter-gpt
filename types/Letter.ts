import * as z from "zod";
import { letters } from "../db/schema";

// Zod schema for letter input validation
export const LetterOuputSchema = z.object({
  title: z.string().describe("The title of the letter"),
  warningPoints: z
    .array(z.string())
    .describe("The body of the warning letter, should be listing in a list"),
});

// Zod schema for letter input validation
export const LetterInputSchema = z.object({
  title: z.string().describe("The title of the letter"),
  initialDate: z.string(),
  recipientName: z.string(),
  warningPoints: z
    .array(z.string())
    .describe("The body of the warning letter, should be listing in a list"),
  senderName: z.string(),
});

// Zod schema for letter response, including database fields
export const LetterResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  initialDate: z.string(),
  recipient: z.object({
    name: z.string(),
  }),
  warningPoints: z.array(z.string()),
  sender: z.object({
    name: z.string(),
  }),
});

export type LetterOuput = z.infer<typeof LetterOuputSchema>;
export type LetterInput = z.infer<typeof LetterInputSchema>;
export type LetterResponse = z.infer<typeof LetterResponseSchema>;

// Re-export types from the Drizzle schema
export type { Letter, NewLetter } from "../db/schema";
