ALTER TABLE "webhook_event" DROP COLUMN IF EXISTS "event_name";--> statement-breakpoint
ALTER TABLE "webhook_event" DROP COLUMN IF EXISTS "processed";--> statement-breakpoint
ALTER TABLE "webhook_event" DROP COLUMN IF EXISTS "body";--> statement-breakpoint
ALTER TABLE "webhook_event" DROP COLUMN IF EXISTS "processing_error";