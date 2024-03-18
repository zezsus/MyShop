/** @format */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getListBrand, postNewBrand } from "../services/brand.service";
import { IBrand } from "../interfaces/brand.interface";

export const useGetListBrand = () => {
  return useQuery({
    queryKey: ["getBrand"],
    queryFn: getListBrand,
    staleTime: 0,
    cacheTime: 2 * 60 * 1000,
  });
};

export const usePostNewBrand = () => {
  const clientQuery = useQueryClient();
  return useMutation((newBrand: IBrand) => postNewBrand(newBrand), {
    onSuccess: () => {
      clientQuery.invalidateQueries(["getBrand"]);
    },
  });
};
