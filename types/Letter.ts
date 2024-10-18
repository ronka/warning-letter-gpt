import * as z from "zod";
import { letters } from "../db/schema";

// Zod schema for letter input validation
export const LetterInputSchema = z.object({
  to: z.string().min(1).describe("The recipient of the warning letter"),
  title: z.string().min(1).describe("The title of the warning letter"),
  body: z
    .string()
    .min(1)
    .describe("The body of the warning letter, what this letter is about"),
  wantedOutcome: z
    .string()
    .min(1)
    .describe("The wanted outcome of the warning letter"),
  user_id: z
    .string()
    .min(1)
    .describe("The ID of the user who created the letter"),
});

// Zod schema for letter response, including database fields
export const LetterResponseSchema = z.object({
  id: z.number(),
  to: z.string(),
  title: z.string(),
  body: z.string(),
  wantedOutcome: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type LetterInput = z.infer<typeof LetterInputSchema>;
export type LetterResponse = z.infer<typeof LetterResponseSchema>;

// Re-export types from the Drizzle schema
export type { Letter, NewLetter } from "../db/schema";
