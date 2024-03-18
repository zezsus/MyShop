/** @format */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteMyProduct,
  editProduct,
  getMyProduct,
  postNewProduct,
} from "../services/myshop.service";
import { IProduct } from "@/common/interfaces/product.interface";

export const useGetMyProductData = () => {
  return useQuery({
    queryKey: ["getMyProduct"],
    queryFn: getMyProduct,
    staleTime:0,
    cacheTime: 2 * 60 * 1000,
  });
};

export const usePostMyProductData = () => {
  const queryClient = useQueryClient();
  return useMutation((productValue: IProduct) => postNewProduct(productValue), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getMyProduct"]);
    },
  });
};

export const useEditMyProductData = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    (productValue: IProduct) => editProduct(productValue, id),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(["getMyProduct", { id: id }], data);
        queryClient.invalidateQueries(["getMyProduct"]);
      },
    }
  );
};

export const useDeleteMyProductData = () => {
  const queryClient = useQueryClient();
  return useMutation((deleteItemId: string) => deleteMyProduct(deleteItemId), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getMyProduct"]);
    },
  });
};
