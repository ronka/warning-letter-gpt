ALTER TABLE "webhookEvent" RENAME TO "webhook_event";--> statement-breakpoint
ALTER TABLE "webhook_event" ALTER COLUMN "id" SET DATA TYPE serial;