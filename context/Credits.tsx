"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface CreditInfo {
  credits_left: number;
  last_usage: string;
}

export const fetchCredits = async (): Promise<CreditInfo> => {
  const response = await axios.get("/api/credits");
  return response.data;
};

export const useCredits = () => {
  return useQuery({
    queryKey: ["credits"],
    queryFn: fetchCredits,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useRefreshCredits = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: ["credits"] });
  };
};
