import React from "react";

interface HStackProps {
  children: React.ReactNode;
  spacing?: number;
  className?: string;
}

const HStack: React.FC<HStackProps> = ({
  children,
  spacing = 2,
  className = "",
}) => {
  return (
    <div className={`flex flex-row flex-auto gap-${spacing} ${className}`}>
      {children}
    </div>
  );
};

export { HStack };
