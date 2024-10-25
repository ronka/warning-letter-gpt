ALTER TABLE "letters" RENAME COLUMN "warning_points" TO "letter_content";--> statement-breakpoint
ALTER TABLE "letters" ALTER COLUMN "letter_content" SET DATA TYPE text;