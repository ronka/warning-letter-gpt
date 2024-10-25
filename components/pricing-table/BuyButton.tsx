"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Script from "next/script";
import { useLemonSqueezy } from "@/hooks/useLemonSqueezy";
import { getProductLink, ProductType } from "@/utils/productLinks";

type BuyButtonProps = {
  productType: ProductType;
};

const BuyButton = ({ productType }: BuyButtonProps) => {
  const { user } = useUser();
  const userId = user?.id;
  const isCheckoutReady = useLemonSqueezy();

  const buyLink = getProductLink(productType, userId);

  return (
    <>
      <Link href={buyLink} className="lemonsqueezy-button">
        <Button disabled={!isCheckoutReady}>קנה קרדיטים</Button>
      </Link>
      <Script src="https://app.lemonsqueezy.com/js/lemon.js" defer />
    </>
  );
};

export { BuyButton };
