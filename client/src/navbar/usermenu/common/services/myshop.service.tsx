/** @format */

import { myProductsRouter } from "@/util/api";
import axios from "axios";
import { deleteMyProductSchemas } from "../schemas/myshop.schemas";
import { validateMyProductSchemas } from "../util";
import {
  productSchemas,
  productsSchemas,
} from "@/common/schemas/product.schemas";
import { IProduct } from "@/common/interfaces/product.interface";

export const getMyProduct = async () => {
  try {
    const res = await axios.get(myProductsRouter);
    const product = await res.data;
    return validateMyProductSchemas(productsSchemas, product);
  } catch (error) {
    throw error;
  }
};

export const postNewProduct = async (newProduct: IProduct) => {
  try {
    const res = await axios.post(myProductsRouter, newProduct);
    const product = await res.data;
    return validateMyProductSchemas(productsSchemas, product.products);
  } catch (error) {
    throw error;
  }
};

export const editProduct = async (updateProduct: IProduct, id: string) => {
  try {
    const res = await axios.put(`${myProductsRouter}/${id}`, updateProduct);
    const product = await res.data;
    return validateMyProductSchemas(productSchemas, product);
  } catch (error) {
    throw error;
  }
};

export const deleteMyProduct = async (deleteItemId: string) => {
  try {
    const res = await axios.delete(`${myProductsRouter}/${deleteItemId}`);
    const product = await res.data;
    return validateMyProductSchemas(deleteMyProductSchemas, product);
  } catch (error) {
    throw error;
  }
};
