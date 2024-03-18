/** @format */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteProduct,
  detailProdut,
  editProduct,
  getListProduct,
  postProduct,
} from "../services";
import { IProduct } from "@/common/interfaces/product.interface";

export const useGetProductData = () => {
  return useQuery({
    queryKey: ["getProductData"],
    queryFn: getListProduct,
    staleTime: 0,
    cacheTime: 2 * 60 * 1000,
  });
};

export const usePosProductData = () => {
  const queryClient = useQueryClient();
  return useMutation((productValue: IProduct) => postProduct(productValue), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getProductData"]);
    },
  });
};

export const useEditProductData = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    (productValue: IProduct) => editProduct(productValue, id),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(["getProductData", { id: id }], data);
        queryClient.invalidateQueries(["getProductData"]);
      },
    }
  );
};

export const useDeleteProductData = () => {
  const queryClient = useQueryClient();
  return useMutation((deleteItemId: string) => deleteProduct(deleteItemId), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getProductData"]);
    },
  });
};

export const useGetProductDetailData = (id: string) => {
  return useQuery({
    queryKey: ["productDetailData", id],
    queryFn: () => detailProdut(id),
    staleTime: 0,
    cacheTime: 2 * 60 * 1000,
  });
};
