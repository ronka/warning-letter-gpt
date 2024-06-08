import * as z from "zod";

const LetterResponseSchema = z.object({
  letter: z.object({
    to: z.string().describe("The recipient of the warning letter"),
    title: z.string().describe("The title of the warning letter"),
    body: z
      .string()
      .describe("The body of the warning letter, what this letter is about"),
    wanted_outcome: z
      .string()
      .describe("The wanted outcome of the warning letter"),
  }),
});

type LetterResponseType = z.infer<typeof LetterResponseSchema>;

export { LetterResponseSchema, type LetterResponseType };
