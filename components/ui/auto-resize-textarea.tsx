"use client";

import { useEffect, useRef } from "react";
import { Textarea, TextareaProps } from "./textarea";

export function AutoResizeTextarea({
  value,
  className,
  ...props
}: TextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const adjustHeight = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    adjustHeight();
    textarea.addEventListener("input", adjustHeight);

    return () => textarea.removeEventListener("input", adjustHeight);
  }, [value]);

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      className={`resize-none overflow-hidden ${className}`}
      {...props}
    />
  );
}
