import React from "react";
import { fetchJson } from "@/lib/api";
import { useQuery } from "react-query";

const CART_QUERY_KEY = "cartItems";

export const useCart = () => {
  const query = useQuery(CART_QUERY_KEY, async () => {
    try {
      const cart = await fetchJson("/api/cart");
      return cart;
    } catch (error) {
      return [];
    }
  });

  return query;
  //   return query.data;
};
