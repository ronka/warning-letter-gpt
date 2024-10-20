"use client";

import { useCredits } from "@/context/Credits";

const Credits = () => {
  const { data: credits, isLoading } = useCredits();

  return (
    <li className="text-sm">
      קרדיטים: {isLoading ? "..." : credits?.credits_left ?? "-"}
    </li>
  );
};

export { Credits };
