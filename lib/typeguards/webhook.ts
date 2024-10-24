type WebhookEventBodyWithMeta = {
  meta: {
    test_mode: boolean;
    event_name: string;
    webhook_id: string;
    custom_data: {
      user_id: string;
    };
  };
  data?: WebhookData;
};

type WebhookEventBodyWithData = {
  meta?: {
    test_mode?: boolean;
    event_name?: string;
    webhook_id?: string;
    custom_data?: {
      user_id?: string;
    };
  };
  data: WebhookData;
};

type WebhookData = {
  id: string;
  type: string;
  links: {
    self: string;
  };
  attributes: {
    tax: number;
    urls: {
      receipt: string;
    };
    total: number;
    status: string;
    tax_usd: number;
    currency: string;
    refunded: boolean;
    store_id: number;
    subtotal: number;
    tax_name: string;
    tax_rate: number;
    setup_fee: number;
    test_mode: boolean;
    total_usd: number;
    user_name: string;
    created_at: string;
    identifier: string;
    updated_at: string;
    user_email: string;
    customer_id: number;
    refunded_at: string | null;
    order_number: number;
    subtotal_usd: number;
    currency_rate: string;
    setup_fee_usd: number;
    tax_formatted: string;
    tax_inclusive: boolean;
    discount_total: number;
    refunded_amount: number;
    total_formatted: string;
    first_order_item: {
      id: number;
      price: number;
      order_id: number;
      price_id: number;
      quantity: number;
      test_mode: boolean;
      created_at: string;
      product_id: number;
      updated_at: string;
      variant_id: number;
      product_name: string;
      variant_name: string;
    };
    status_formatted: string;
    discount_total_usd: number;
    subtotal_formatted: string;
    refunded_amount_usd: number;
    setup_fee_formatted: string;
    discount_total_formatted: string;
    refunded_amount_formatted: string;
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
