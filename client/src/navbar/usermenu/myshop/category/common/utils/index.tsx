/** @format */

import { ICategory } from "../interfaces/category.interface";


export const validataSchemas = (schemas: any, data: ICategory) => {
  try {
    return schemas.validate(data);
  } catch (error) {
    throw error;
  }
};
