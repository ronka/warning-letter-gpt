import React from "react";

interface StepProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const Step: React.FC<StepProps> = ({ title, description, children }) => (
  <div className="space-y-4">
    <div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </div>
    {children}
  </div>
);

export { Step };
