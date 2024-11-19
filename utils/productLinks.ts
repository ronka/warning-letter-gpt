export type ProductType = "5-credits" | "20-credits" | "1-credits";

const productLinks: Record<ProductType, string> = {
  "1-credits":
    "https://warninggpt.lemonsqueezy.com/buy/922f9428-0539-49c2-8abe-9062d1c376f5",
  "5-credits":
    "https://warninggpt.lemonsqueezy.com/buy/930a3287-9d2c-49e7-b020-95cd9ac7d4c9",
  "20-credits":
    "https://warninggpt.lemonsqueezy.com/buy/613071af-e6e6-4238-9b46-a3fc906f8b00",
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
