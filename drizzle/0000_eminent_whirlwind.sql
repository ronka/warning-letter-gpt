CREATE TABLE IF NOT EXISTS "letters" (
	"id" serial PRIMARY KEY NOT NULL,
	"to" text NOT NULL,
	"title" text NOT NULL,
	"body" text NOT NULL,
	"wanted_outcome" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
