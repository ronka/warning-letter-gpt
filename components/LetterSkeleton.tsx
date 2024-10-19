import React from "react";
import { Skeleton } from "./ui/skeleton";

interface LetterSkeletonProps {
  count?: number;
}

const LetterSkeleton: React.FC<LetterSkeletonProps> = ({ count = 5 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={index}
          className={`h-4 w-full w-${
            ["3/4", "1/2", "5/6", "2/3", "3/4"][index % 5]
          }`}
        />
      ))}
    </>
  );
};

export default LetterSkeleton;
