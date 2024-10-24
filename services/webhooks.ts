/* src/app/actions.ts */

import { configureLemonSqueezy } from "@/config/lemonsqueezy";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import {
  NewWebhookEvent,
  userCredits,
  WebhookEvent,
  webhookEvents,
} from "@/db/schema";
import { webhookHasData, webhookHasMeta } from "@/lib/typeguards/webhook";
import { sql } from "drizzle-orm";

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

// Mapping of product_id to credits
const productCreditsMap: Record<string, number> = {
  "375259": 5,
  // Add more mappings as needed
};

export async function handleOrderEvent(rawEvent: unknown) {
  if (!webhookHasData(rawEvent)) {
    throw new Error("Invalid event data: event body missing 'data' property.");
  }

  const event = rawEvent;

  const { product_id } = event.data.attributes.first_subscription_item;
  const user_id = event.meta?.custom_data?.user_id;

  if (!user_id || !product_id) {
    throw new Error("Invalid event data: user_id or product_id missing.");
  }

  const credits = productCreditsMap[product_id];
  if (credits === undefined) {
    throw new Error(`No credits mapping found for product_id: ${product_id}`);
  }

  // Insert or update the user_credits table
  await db.transaction(async (trx) => {
    const existingRecord = await trx
      .select()
      .from(userCredits)
      .where(eq(userCredits.user_id, user_id));

    if (existingRecord.length > 0) {
      // Update existing record
      await trx
        .update(userCredits)
        .set({
          credits_left: sql`credits_left + ${credits}`,
        })
        .where(eq(userCredits.user_id, user_id));
    } else {
      // Insert new record
      await trx
        .insert(userCredits)
        .values({
          user_id,
          credits_left: credits,
        })
        .execute();
    }
  });
}
