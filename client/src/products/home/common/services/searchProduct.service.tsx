/** @format */

import { productsSchemas } from "@/common/schemas/product.schemas";
import { validateSchemas } from "@/common/utils";
import { productsRouter } from "@/util/api";
import axios from "axios";

export const getSearchNameProduct = async (name: string) => {
  try {
    const res = await axios.get(`${productsRouter}?title_like=${name}`);
    const data = res.data;
    return data;
  } catch (error) {
    throw error;
  }
};
