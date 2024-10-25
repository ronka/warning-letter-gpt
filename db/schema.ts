import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  jsonb,
  boolean,
} from "drizzle-orm/pg-core";

export const letters = pgTable("letters", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  initialDate: text("initial_date").notNull(),
  recipientName: text("recipient_name").notNull(),
  warningPoints: text("warning_points").array().notNull(),
  senderName: text("sender_name").notNull(),
  user_id: text("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userCredits = pgTable("user_credits", {
  id: serial("id").primaryKey(),
  user_id: text("user_id").notNull().unique(),
  credits_left: integer("credits_left").notNull(),
  last_usage: timestamp("last_usage").defaultNow().notNull(),
});

export const webhookEvents = pgTable("webhook_event", {
  id: serial("id").primaryKey(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  event_name: text("event_name").notNull(),
  processed: boolean("processed").default(false),
  body: jsonb("body").notNull(),
  processing_error: text("processing_error"),
});

export type Letter = typeof letters.$inferSelect;
export type NewLetter = typeof letters.$inferInsert;

export type UserCredit = typeof userCredits.$inferSelect;
export type NewUserCredit = typeof userCredits.$inferInsert;

export type WebhookEvent = typeof webhookEvents.$inferSelect;
export type NewWebhookEvent = typeof webhookEvents.$inferInsert;
