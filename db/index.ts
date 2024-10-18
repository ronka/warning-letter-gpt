import { appConfig } from "@/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres(appConfig.databaseUrl);
export const db = drizzle(client);
