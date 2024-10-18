import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"




export const letters = pgTable("letters", {
	id: serial().primaryKey().notNull(),
	to: text().notNull(),
	title: text().notNull(),
	body: text().notNull(),
	wantedOutcome: text("wanted_outcome").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	userId: text("user_id").notNull(),
});
