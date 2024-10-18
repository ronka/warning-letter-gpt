import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  databaseUrl: z.string().url(),
  supabaseUrl: z.string().url(),
  supabaseKey: z.string(),
});

const envParse = envSchema.safeParse({
  databaseUrl: process.env.DATABASE_URL,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_ANON_KEY,
});

if (!envParse.success) {
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(envParse.error.format(), null, 2)
  );
  throw new Error("Invalid environment variables");
}

export const appConfig = {
  ...envParse.data,
};
