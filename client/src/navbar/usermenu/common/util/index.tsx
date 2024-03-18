/** @format */

import { IProduct } from "@/common/interfaces/product.interface";


export const validateMyProductSchemas = async (
  schemas: any,
  data: Array<IProduct>
) => {
  try {
    return schemas.validate(data);
  } catch (error) {
    throw error;
  }
};
