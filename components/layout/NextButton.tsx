"use client";

import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface NextButtonProps {
  nextStep: () => void;
  currentStep: number;
  totalSteps: number;
  isDisabled: boolean;
}

function NextButton({
  nextStep,
  currentStep,
  totalSteps,
  isDisabled,
}: NextButtonProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
            onClick={nextStep}
            disabled={currentStep === totalSteps || isDisabled}
          >
            הבא
          </Button>
        </TooltipTrigger>
        {isDisabled && (
          <TooltipContent>
            <p>יש למלא את כל השדות הנדרשים כדי להמשיך</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}

export { NextButton };
