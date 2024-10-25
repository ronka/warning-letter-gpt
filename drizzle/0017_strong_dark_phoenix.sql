ALTER TABLE "letters" RENAME COLUMN "to" TO "recipient_name";--> statement-breakpoint
ALTER TABLE "letters" RENAME COLUMN "body" TO "warning_points";--> statement-breakpoint
ALTER TABLE "letters" ALTER COLUMN "warning_points" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "letters" ADD COLUMN "initial_date" text NOT NULL;--> statement-breakpoint
ALTER TABLE "letters" ADD COLUMN "sender_name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "letters" DROP COLUMN IF EXISTS "wanted_outcome";