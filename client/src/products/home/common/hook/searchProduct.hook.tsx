/** @format */

import { useQuery } from "@tanstack/react-query";
import { getSearchNameProduct } from "../services/searchProduct.service";

export const useGetSearchNameProduct = (name: string) => {
  return useQuery({
    queryKey: ["productSearchName"],
    queryFn: () => getSearchNameProduct(name),
    staleTime: 0,
    cacheTime: 2 * 60 * 1000,
  });
};
