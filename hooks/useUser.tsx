import { fetchJson } from "@/lib/api";
import React from "react";
import { useQuery } from "react-query";

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
