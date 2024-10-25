"use client";
import {
  fetchLetter,
  generateAsync,
  type GenerateResponse,
  fetchUserLetters,
} from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";

export const useLetterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: generateAsync,
    onSuccess: (data) => {
      queryClient.setQueryData(["letter", data.id], data);
      queryClient.invalidateQueries({ queryKey: ["credits"] });
      queryClient.invalidateQueries({ queryKey: ["userLetters"] });
    },
  });
};

export const useLetterQuery = (id: string) => {
  return useQuery({
    queryKey: ["letter", id],
    queryFn: () => fetchLetter(id),
    enabled: !!id,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useUpdateLetter = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedLetter: Partial<GenerateResponse>) => {
      const response = await axios.put(`/api/letters/${id}`, updatedLetter);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["letter", id], data);
    },
  });
};

export const useUserLettersQuery = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["userLetters"],
    queryFn: fetchUserLetters,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      // Set individual letter data in the cache
      query.data.forEach((letter) => {
        queryClient.setQueryData(["letter", letter.id.toString()], letter);
      });
    }
  }, [query.isSuccess, query.data, queryClient]);

  return query;
};
