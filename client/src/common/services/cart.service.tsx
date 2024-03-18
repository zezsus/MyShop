/** @format */

import { cartsRouter } from "@/util/api";
import { IProduct } from "../interfaces/product.interface";
import axios from "axios";
import { validateSchemas } from "../utils";
import { productSchemas, productsSchemas } from "../schemas/product.schemas";

export const getCartData = async () => {
  try {
    const res = await axios.get(cartsRouter);
    const cartItems = res.data;
    return validateSchemas(productsSchemas, cartItems);
  } catch (error) {
    console.log(error);
  }
};

export const postCartData = async (cartItem: IProduct) => {
  try {
    const res = await axios.post(cartsRouter, cartItem);
    const cartItems = res.data;
    return validateSchemas(productSchemas, cartItems);
  } catch (error) {
    console.log(error);
  }
};
