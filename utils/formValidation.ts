import { UseFormReturn } from "react-hook-form";
import { FormData } from "@/types/FormData";

export const isStepValid = (
  form: UseFormReturn<FormData>,
  fields: (keyof FormData)[]
): boolean => {
  const { errors } = form.formState;
  return fields.some((field) => !form.watch(field) || !!errors[field]);
};
