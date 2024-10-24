"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Script from "next/script";
import { useEffect } from "react";

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
  const buyLink = `${
    productLinks[productType]
  }?embed=1&media=0&logo=0&discount=0&checkout[custom][user_id]=${
    userId || ""
  }`;

  useEffect(() => {
    // @ts-ignore lemon squeezy is defined in the global scope
    if (typeof window.createLemonSqueezy === "function") {
      // @ts-ignore lemon squeezy is defined in the global scope
      window.createLemonSqueezy();
    }
  }, []);

  // @ts-ignore lemon squeezy is defined in the global scope
  const isCheckoutReady = window.LemonSqueezy;

  return (
    <>
      <Link href={userId ? buyLink : "#"} className="lemonsqueezy-button">
        <Button
          className={`text-white bg-blue-600 `}
          disabled={!userId || !isCheckoutReady}
        >
          קנה קרדיטים
        </Button>
      </Link>
      <Script src="https://app.lemonsqueezy.com/js/lemon.js" defer />
    </>
  );
};

export { BuyButton };
