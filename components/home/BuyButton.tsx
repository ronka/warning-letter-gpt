"use client";

import { useUser } from "@clerk/nextjs";

const BuyButton = () => {
  const { user } = useUser();
  const userId = user?.id;
  const buyLink = `https://ronka.lemonsqueezy.com/buy/6433b64d-414d-4a61-b849-25178b000b1b?checkout[custom][user_id]=${
    userId || ""
  }`;

  return (
    <button
      onClick={() => {
        if (userId) {
          window.open(buyLink, "_blank", "noopener,noreferrer");
        }
      }}
      className={`inline-block px-6 py-3 text-white bg-blue-600 rounded-md ${
        !userId ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={!userId}
    >
      קנה קרדיטים
    </button>
  );
};

export default BuyButton;
