"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Script from "next/script";
import { useLemonSqueezy } from "@/hooks/useLemonSqueezy";

type BuyButtonProps = {
  productType: "5-credits" | "20-credits";
};

const productLinks: Record<BuyButtonProps["productType"], string> = {
  "5-credits":
    "https://ronka.lemonsqueezy.com/buy/6433b64d-414d-4a61-b849-25178b000b1b",
  "20-credits":
    "https://ronka.lemonsqueezy.com/buy/85fb1b80-f4e4-4ea4-a840-1e23783e6e59",
};

const BuyButton = ({ productType }: BuyButtonProps) => {
  const { user } = useUser();
  const userId = user?.id;
  const isCheckoutReady = useLemonSqueezy();

  const buyLink = userId
    ? `${productLinks[productType]}?embed=1&media=0&logo=0&discount=0&checkout[custom][user_id]=${userId}`
    : "/sign-in"; // Route to sign-in page if no user ID

  return (
    <>
      <Link href={buyLink} className="lemonsqueezy-button">
        <Button
          className="text-white bg-blue-600"
          disabled={userId ? !isCheckoutReady : false}
        >
          קנה קרדיטים
        </Button>
      </Link>
      <Script src="https://app.lemonsqueezy.com/js/lemon.js" defer />
    </>
  );
};

export { BuyButton };
