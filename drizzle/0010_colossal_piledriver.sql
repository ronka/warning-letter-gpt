ALTER TABLE "webhook_event" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "webhook_event" RENAME COLUMN "eventName" TO "event_name";--> statement-breakpoint
ALTER TABLE "webhook_event" RENAME COLUMN "processingError" TO "processing_error";