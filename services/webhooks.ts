/* src/app/actions.ts */

import { configureLemonSqueezy } from "@/config/lemonsqueezy";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { NewWebhookEvent, WebhookEvent, webhookEvents } from "@/db/schema";
import { webhookHasData, webhookHasMeta } from "@/lib/typeguards/webhook";

type WebhookEventToProcess = {
  id: WebhookEvent["id"];
  event_name: WebhookEvent["event_name"];
  body: WebhookEvent["body"];
};

/**
 * Process a webhook event in the database.
 */
export async function processWebhookEvent(webhookEvent: WebhookEventToProcess) {
  configureLemonSqueezy();

  const dbwebhookEvent = await db
    .select()
    .from(webhookEvents)
    .where(eq(webhookEvents.id, webhookEvent.id));

  if (dbwebhookEvent.length < 1) {
    throw new Error(
      `Webhook event #${webhookEvent.id} not found in the database.`
    );
  }

  if (!process.env.WEBHOOK_URL) {
    throw new Error(
      "Missing required WEBHOOK_URL env variable. Please, set it in your .env file."
    );
  }

  let processingError = "";
  const eventBody = webhookEvent.body;

  if (!webhookHasMeta(eventBody)) {
    processingError = "Event body is missing the 'meta' property.";
  } else if (webhookHasData(eventBody)) {
    if (webhookEvent.event_name.startsWith("order_")) {
      // Save orders; eventBody is a "Order"
      /* Not implemented */
    } else if (webhookEvent.event_name.startsWith("license_")) {
      // Save license keys; eventBody is a "License key"
      /* Not implemented */
    }

    // Update the webhook event in the database.
    await db
      .update(webhookEvents)
      .set({
        processed: true,
        processing_error: processingError,
      })
      .where(eq(webhookEvents.id, webhookEvent.id));
  }
}

export async function storeWebhookEvent(
  eventName: string,
  eventBody: unknown
): Promise<number> {
  if (!webhookHasMeta(eventBody)) {
    throw new Error("Invalid webhook event: missing 'meta' property");
  }

  const newWebhookEvent: NewWebhookEvent = {
    event_name: eventName,
    body: eventBody,
    processed: false,
  };

  const [insertedEvent] = await db
    .insert(webhookEvents)
    .values(newWebhookEvent)
    .returning({ id: webhookEvents.id });

  if (!insertedEvent || !insertedEvent.id) {
    throw new Error("Failed to insert webhook event");
  }

  return insertedEvent.id;
}
