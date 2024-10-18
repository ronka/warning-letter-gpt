import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const letters = pgTable("letters", {
  id: serial("id").primaryKey(),
  to: text("to").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  user_id: text("user_id").notNull(),
  wantedOutcome: text("wanted_outcome").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Letter = typeof letters.$inferSelect;
export type NewLetter = typeof letters.$inferInsert;
