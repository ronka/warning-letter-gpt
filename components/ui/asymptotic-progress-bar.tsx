"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Custom hook for the asymptotic progress animation
function useAsymptoticProgress(isRunning: boolean, tau: number = 10000) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const startTime = Date.now();
    const animationFrame = () => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = (1 - Math.exp(-elapsedTime / tau)) * 100;
      setProgress(newProgress);

      if (isRunning) {
        requestAnimationFrame(animationFrame);
      }
    };

    const animationId = requestAnimationFrame(animationFrame);
    return () => cancelAnimationFrame(animationId);
  }, [isRunning, tau]);

  return progress;
}

export function AsymptoticProgressBar({
  isRunning,
  forceFinish,
}: {
  isRunning: boolean;
  forceFinish: boolean;
}) {
  const progress = useAsymptoticProgress(isRunning);

  return (
    <Progress value={!forceFinish ? progress : 100} className="h-1 w-full" />
  );
}
