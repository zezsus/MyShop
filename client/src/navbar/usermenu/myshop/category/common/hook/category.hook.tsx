/** @format */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getListCategory, postNewCategory } from "../services/category.service";
import { ICategory } from "../interfaces/category.interface";

export const useGetListCategory = () => {
  return useQuery({
    queryKey: ["getCategory"],
    queryFn: getListCategory,
    staleTime: 0,
    cacheTime: 2 * 60 * 1000,
  });
};

export const usePostNewCategory = () => {
  const clientQuery = useQueryClient();
  return useMutation((newCategory: ICategory) => postNewCategory(newCategory), {
    onSuccess: () => {
      clientQuery.invalidateQueries(["getCategory"]);
    },
  });
};
