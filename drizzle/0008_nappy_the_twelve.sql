ALTER TABLE "webhookEvent" ALTER COLUMN "processed" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "webhookEvent" ADD COLUMN "body" jsonb NOT NULL;