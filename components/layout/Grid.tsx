import { cn } from "@/lib/utils";
import React from "react";

interface GridProps {
  children: React.ReactNode;
  className?: string;
}

const Grid: React.FC<GridProps> = ({ children, className = "" }) => {
  return (
    <div
      className={cn(
        `md:grid grid-cols-[1fr_2fr] gap-4 ${className} text-start`
      )}
    >
      {children}
    </div>
  );
};

export { Grid };
