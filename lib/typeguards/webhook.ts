type WebhookEventBodyWithMeta = {
  meta: {
    event_name: string;
    custom_data: {
      user_id: string;
    };
  };
  data?: {
    id: string;
    attributes: {
      variant_id: string;
      order_id: number;
      user_name: string;
      user_email: string;
      status: string;
      status_formatted: string;
      renews_at: string;
      ends_at: string;
      trial_ends_at: string;
      first_subscription_item: {
        id: string;
        price_id: string;
        is_usage_based: boolean;
      };
    };
  };
};

type WebhookEventBodyWithData = {
  meta?: {
    event_name?: string;
    custom_data?: {
      user_id: string;
    };
  };
  data: {
    id: string;
    attributes: {
      variant_id: string;
      order_id: number;
      user_name: string;
      user_email: string;
      status: string;
      status_formatted: string;
      renews_at: string;
      ends_at: string;
      trial_ends_at: string;
      first_subscription_item: {
        id: string;
        price_id: string;
        product_id: string;
        is_usage_based: boolean;
      };
    };
  };
};

/**
 * Type guard to check if the webhook event body has the 'meta' property
 * @param body - The webhook event body to check
 * @returns True if the body has the 'meta' property, false otherwise
 */
export function webhookHasMeta(
  body: unknown
): body is WebhookEventBodyWithMeta {
  return typeof body === "object" && body !== null && "meta" in body;
}

/**
 * Type guard to check if the webhook event body has the 'data' property
 * @param body - The webhook event body to check
 * @returns True if the body has the 'data' property, false otherwise
 */
export function webhookHasData(
  body: unknown
): body is WebhookEventBodyWithData {
  return typeof body === "object" && body !== null && "data" in body;
}
