/** @format */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCartData } from "../services/cartservices";

export const useDeleteCartItem = () => {
  const clientQuery = useQueryClient();
  return useMutation((cartItemId: string) => deleteCartData(cartItemId), {
    onSuccess: () => {
      clientQuery.invalidateQueries(["getCartItems"]);
    },
  });
};
