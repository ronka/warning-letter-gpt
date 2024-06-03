import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface MultiStepFormProps {
  children: React.ReactElement[];
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, children.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const progress = Math.max((currentStep / (children.length - 1)) * 100, 1);

  const currentChild = React.Children.toArray(children)[currentStep];

  return (
    <div className="w-full max-w-3xl mx-auto py-12 md:py-24">
      <div className="flex items-center justify-center mb-8">
        <Progress value={progress} className="w-full" />
      </div>
      <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg">
        <div className="p-6 md:p-8">
          {React.cloneElement(currentChild as React.ReactElement)}
        </div>
        <div className="flex justify-between p-6 md:p-8 border-t dark:border-gray-800">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          {currentStep < children.length - 1 && (
            <Button
              onClick={nextStep}
              disabled={currentStep === children.length - 1}
            >
              {currentStep === children.length - 1 ? "Submit" : "Next"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export { MultiStepForm };
