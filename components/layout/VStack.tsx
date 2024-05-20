import React from "react";

interface VStackProps {
  children: React.ReactNode;
  spacing?: number;
  className?: string;
}

const VStack: React.FC<VStackProps> = ({
  children,
  spacing = 2,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-${spacing} ${className}`}>
      {children}
    </div>
  );
};

export { VStack };
