import { fetchJson } from "@/lib/api";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

const USER_QUERY_KEY = "user";

export function useSigIn() {
  const queryClient = useQueryClient();

  const mutation = useMutation(({ email, password }: any) =>
    fetchJson("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    })
  );

  return {
    signIn: async (email: string, password: string) => {
      try {
        const user = await mutation.mutateAsync({ email, password });
        queryClient.setQueryData(USER_QUERY_KEY, user); // for refresh the user data with call the key from useQuery

        return true;
      } catch (error) {
        return false;
      }
    },
    signInError: mutation.isError,
    signInLoading: mutation.isLoading,
  };
}
