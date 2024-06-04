import React, { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { StepProvider } from "@/context/Step";

interface MultiStepFormProps {
  children: React.ReactElement[];
}

const Required = () => <span className="font-bold text-red-500">* </span>;

const MultiStepForm: React.FC<MultiStepFormProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const progress = Math.max((currentStep / (children.length - 1)) * 100, 10);

  const childrenArray = React.Children.toArray(children);
  const currentChild = childrenArray[currentStep];

  const totalSteps = childrenArray.length;
  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, childrenArray.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  return (
    <StepProvider
      totalSteps={totalSteps}
      nextStep={nextStep}
      prevStep={prevStep}
      currentStep={currentStep}
    >
      <div dir="rtl" className="w-full max-w-3xl mx-auto py-12 md:py-24">
        <div className="flex items-center justify-center mb-8">
          <Progress value={progress} className="w-full" />
        </div>
        <div className="bg-white dark:bg-gray-950 rounded-lg shadow-lg">
          <div className="p-6 md:p-8">
            {React.cloneElement(currentChild as React.ReactElement)}
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <Required /> הינו שדה חובה
            </div>
          </div>
        </div>
      </div>
    </StepProvider>
  );
};

export { MultiStepForm, Required };
