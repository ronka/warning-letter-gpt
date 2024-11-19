import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { AsymptoticProgressBar } from "../ui/asymptotic-progress-bar";

interface SubmitButtonProps {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  disabled?: boolean;
  className?: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading,
  isError,
  isSuccess,
  disabled,
  className = "",
}) => {
  return (
    <div>
      <Button
        className={`w-full ${className} rounded-b-none`}
        type="submit"
        disabled={isLoading || isSuccess || disabled}
      >
        {isLoading ? (
          <>
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            יוצר מכתב... זה עלול לקחת מספר רגעים
          </>
        ) : isError ? (
          <>
            <AlertCircle className="ml-2 h-4 w-4" />
            נסה שוב
          </>
        ) : isSuccess ? (
          <>
            <CheckCircle className="ml-2 h-4 w-4" />
            מכתב נוצר בהצלחה, עובר לעמוד המכתב
          </>
        ) : (
          "יצירת מכתב"
        )}
      </Button>
      <AsymptoticProgressBar
        isRunning={isLoading}
        forceFinish={isSuccess || isError}
      />
    </div>
  );
};
