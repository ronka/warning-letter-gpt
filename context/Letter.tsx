"use client";
import { generateAsync, type GenerateResponse } from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useLetterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: generateAsync,
    onSuccess: (data) => {
      // Optionally invalidate queries or update the cache with the new item
      queryClient.invalidateQueries({ queryKey: ["letters"] });
      queryClient.setQueryData(["generateLetter"], data);
    },
  });
};

export const useLetterQuery = () => {
  const queryClient = useQueryClient();

  const fetchLetters = async () => {
    const data = queryClient.getQueryData(["generateLetter"]);
    return data as GenerateResponse;
  };

  return useQuery({
    queryKey: ["letters"],
    queryFn: fetchLetters,
    enabled: !!queryClient.getQueryData(["generateLetter"]),
  });
};
