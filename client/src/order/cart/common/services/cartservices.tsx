/** @format */

import { validateSchemas } from "@/common/utils";
import { cartsRouter } from "@/util/api";
import axios from "axios";
import { deleteCartSchemas } from "../schemas";

export const deleteCartData = async (cartItemId: string) => {
  try {
    const res = await axios.delete(`${cartsRouter}/${cartItemId}`);
    const cartItem = await res.data;
    return validateSchemas(deleteCartSchemas, cartItem);
  } catch (error) {
    console.log(error);
  }
};
