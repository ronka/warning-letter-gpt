"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useStep } from "@/context/Step";
import { NextButton } from "./NextButton";

interface StepProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  isNextDisabled: boolean | (() => boolean);
}

const Step: React.FC<StepProps> = ({
  children,
  title,
  description,
  isNextDisabled,
}) => {
  const isDisabled =
    typeof isNextDisabled === "function" ? isNextDisabled() : isNextDisabled;

  const { currentStep, nextStep, prevStep, totalSteps } = useStep();

  return (
    <div className="space-y-4">
      <div>
        {title && <h2 className="text-2xl font-bold">{title}</h2>}
        {description && (
          <p className="text-gray-500 dark:text-gray-400">{description}</p>
        )}
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
          <NextButton
            nextStep={nextStep}
            currentStep={currentStep}
            totalSteps={totalSteps}
            isDisabled={isDisabled}
          />
        )}
      </div>
    </div>
  );
};

export { Step };
