import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { appConfig } from "@/config";

export default defineConfig({
  out: "./drizzle",
  schema: "./db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: appConfig.databaseUrl,
  },
});
