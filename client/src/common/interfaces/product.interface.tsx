/** @format */

import { InferType } from "yup";
import { productSchemas } from "../../products/common/schemas/productsSchemas";

export type IProduct = InferType<typeof productSchemas>;
