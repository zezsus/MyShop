/** @format */

import { IBrand } from "../../myshop/brand/common/interfaces/brand.interface";

export interface IMyProductState {
  editMyProduct: Object;
  deleteMyProductId: string;
  isShowAddMyProduct: boolean;
  isShowEditMyProduct: boolean;
  isShowDeleteMyProduct: boolean;
  isShowAddBrand: boolean;
  isShowAddCategory: boolean;
  newBrandProduct: string;
  newCategoryProduct: string;
}
