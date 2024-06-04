import React, { createContext, useContext, useState, ReactNode } from "react";

interface StepContextProps {
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  totalSteps: number;
}

const StepContext = createContext<StepContextProps | undefined>(undefined);

interface StepProviderProps {
  children: ReactNode;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  currentStep: number;
}

export const StepProvider: React.FC<StepProviderProps> = ({
  children,
  totalSteps,
  nextStep,
  prevStep,
  currentStep,
}) => {
  return (
    <StepContext.Provider
      value={{ currentStep, nextStep, prevStep, totalSteps }}
    >
      {children}
    </StepContext.Provider>
  );
};

export const useStep = (): StepContextProps => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error("useStep must be used within a StepProvider");
  }
  return context;
};
