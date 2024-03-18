/** @format */

import axios from "axios";
import { validateSchemas } from "../utils";
import { productsRouter } from "@/util/api";
import {
  deleteProductSchemas,
  productSchemas,
  productsSchemas,
} from "@/common/schemas/product.schemas";
import { IProduct } from "@/common/interfaces/product.interface";

export const getListProduct = async () => {
  try {
    const res = await axios.get(productsRouter);
    const product = await res.data;
    return validateSchemas(productsSchemas, product);
  } catch (error) {
    throw error;
  }
};

export const postProduct = async (newProduct: IProduct) => {
  try {
    const res = await axios.post(productsRouter, newProduct);
    const product = await res.data;
    return validateSchemas(productsSchemas, product);
  } catch (error) {
    throw error;
  }
};

export const editProduct = async (editProduct: IProduct, id: string) => {
  try {
    const res = await axios.put(`${productsRouter}/${id}`, editProduct);
    const product = await res.data;
    return validateSchemas(productSchemas, product);
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (deleteProductId: string) => {
  try {
    const res = await axios.delete(`${productsRouter}/${deleteProductId}`);
    const product = await res.data;
    return validateSchemas(productSchemas, product);
  } catch (error) {
    throw error;
  }
};

export const detailProdut = async (id: string) => {
  try {
    const res = await axios.get(`${productsRouter}/${id}`);
    const productDetail = await res.data;
    return validateSchemas(deleteProductSchemas, productDetail);
  } catch (error) {
    throw error;
  }
};
