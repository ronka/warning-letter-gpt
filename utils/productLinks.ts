export type ProductType = "5-credits" | "20-credits";

const productLinks: Record<ProductType, string> = {
  "5-credits":
    "https://ronka.lemonsqueezy.com/buy/6433b64d-414d-4a61-b849-25178b000b1b",
  "20-credits":
    "https://ronka.lemonsqueezy.com/buy/85fb1b80-f4e4-4ea4-a840-1e23783e6e59",
};

export function getProductLink(
  productType: ProductType,
  userId: string | undefined
): string {
  if (!userId) {
    return "/sign-in";
  }

  const baseLink = productLinks[productType];
  if (!baseLink) {
    throw new Error(`Invalid product type: ${productType}`);
  }

  return `${baseLink}?embed=1&media=0&logo=0&discount=0&checkout[custom][user_id]=${userId}`;
}
