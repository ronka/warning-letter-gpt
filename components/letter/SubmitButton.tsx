import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, CheckCircle } from "lucide-react";

interface SubmitButtonProps {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  className?: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading,
  isError,
  isSuccess,
  className = "",
}) => {
  return (
    <Button
      className={`w-full ${className}`}
      type="submit"
      disabled={isLoading || isSuccess}
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
  );
};
