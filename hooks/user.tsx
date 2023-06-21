// this example for this course and i dont use it because i think not good

import { fetchJson } from "@/lib/api";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

const USER_QUERY_KEY = "user";

export function useUser() {
  const query = useQuery(
    USER_QUERY_KEY,
    async () => {
      try {
        return await fetchJson(`/api/user`);
      } catch (error) {
        return undefined;
      }
    },
    {
      cacheTime: Infinity, // cache time infinite
      staleTime: 30_000, // ms = stale time = after 30ms will be run as normally, if triggered fethc data again
    }
  );

  return query.data;
}

export function useSignOut() {
  const mutation = useMutation(() => fetchJson("/api/logout"));
  const queryClient = useQueryClient();

  return async () => {
    await mutation.mutateAsync();
    queryClient.setQueryData(USER_QUERY_KEY, undefined); // for refresh the user data with call the key from useQuery
  };
}

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

export function useRegister() {
  const queryClient = useQueryClient();

  const mutation = useMutation(({ username, email, password }: any) =>
    fetchJson("api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
  );

  return {
    register: async (username: string, email: string, password: string) => {
      try {
        const user = await mutation.mutateAsync({ username, email, password });
        queryClient.setQueryData(USER_QUERY_KEY, user);

        return true;
      } catch (error) {
        return false;
      }
    },
    registerError: mutation.isError,
    resgiterLoading: mutation.isLoading,
  };
}
