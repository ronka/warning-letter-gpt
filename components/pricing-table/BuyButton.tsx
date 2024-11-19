"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Script from "next/script";
import { useLemonSqueezy } from "@/hooks/useLemonSqueezy";
import { getProductLink, ProductType } from "@/utils/productLinks";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type BuyButtonProps = {
  productType: ProductType;
};

const BuyButton = ({ productType }: BuyButtonProps) => {
  const router = useRouter();

  const { user } = useUser();
  const userId = user?.id;
  const isCheckoutReady = useLemonSqueezy();

  const buyLink = getProductLink(productType, userId);

  return (
    <>
      <Link
        href={buyLink}
        onClick={() => {
          if (!userId) {
            router.push("/sign-in");
          }
        }}
        className={cn("lemonsqueezy-button", {
          "pointer-events-none": !isCheckoutReady,
        })}
      >
        <Button
          className="text-lg px-8 py-6 rounded-xl hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl bg-primary"
          disabled={!isCheckoutReady}
        >
          קנה קרדיטים
        </Button>
      </Link>
      <Script src="https://app.lemonsqueezy.com/js/lemon.js" defer />
    </>
  );
};

export { BuyButton };
