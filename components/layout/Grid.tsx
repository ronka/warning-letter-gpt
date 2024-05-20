import { cn } from "@/lib/utils";
import React from "react";

interface GridProps {
  children: React.ReactNode;
  columns: 2; // Enforce 2 columns
  columnWidths?: [string, string]; // Array for custom widths of both columns
  className?: string;
}

const Grid: React.FC<GridProps> = ({
  children,
  columnWidths,
  className = "",
}) => {
  const gridTemplateColumns = columnWidths ? columnWidths.join("_") : "1fr_2fr";

  return (
    <div
      className={cn(
        `md:grid grid-cols-[${gridTemplateColumns}] gap-4 ${className} text-start`
      )}
    >
      {children}
    </div>
  );
};

export { Grid };
