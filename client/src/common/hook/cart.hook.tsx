/** @format */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICartItem } from "../interfaces/cart.interface";
import { getCartData, postCartData } from "../services/cart.service";

export const useGetCartItem = () => {
  return useQuery({
    queryKey: ["getCartItems"],
    queryFn: getCartData,
    staleTime: 0,
    cacheTime: 2 * 60 * 1000,
    keepPreviousData: true,
  });
};

export const usePostCartItem = () => {
  const clientQuery = useQueryClient();
  return useMutation((postData: ICartItem) => postCartData(postData), {
    onSuccess: () => {
      clientQuery.invalidateQueries(["getCartItems"]);
    },
  });
};
