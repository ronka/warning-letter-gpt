import React from "react";

import { Button } from "@/components/ui/button";
import { useStep } from "@/context/Step";

interface StepProps {
  children: React.ReactNode;
  title: string;
  description: string;
  isNextDisabled: boolean;
}

const Step: React.FC<StepProps> = ({
  children,
  title,
  description,
  isNextDisabled = false,
}) => {
  const { currentStep, nextStep, prevStep, totalSteps } = useStep();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      {children}
      <div className="flex justify-between py-6 md:py-8 border-t dark:border-gray-800">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          type="button"
        >
          הקודם
        </Button>
        {currentStep < totalSteps - 1 && (
          <Button
            onClick={nextStep}
            disabled={currentStep === totalSteps || isNextDisabled}
          >
            הבא
          </Button>
        )}
      </div>
    </div>
  );
};

export { Step };
