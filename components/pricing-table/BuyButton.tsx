"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const BuyButton = () => {
  const { user } = useUser();
  const userId = user?.id;
  const buyLink = `https://ronka.lemonsqueezy.com/buy/6433b64d-414d-4a61-b849-25178b000b1b?checkout[custom][user_id]=${
    userId || ""
  }`;

  return (
    <Link href={userId ? buyLink : "#"} passHref>
      <Button
        className={`text-white bg-blue-600 ${
          !userId ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={!userId}
      >
        קנה קרדיטים
      </Button>
    </Link>
  );
};

export { BuyButton };
