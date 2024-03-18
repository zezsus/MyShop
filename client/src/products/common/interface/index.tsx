/** @format */

import { IProduct } from "@/common/interfaces/product.interface";

export interface IProductState {
  buyItem: Array<IProduct>;
  buyNumberProduct: number;
  isShowModal: boolean;
}

export interface ISearchProductState {
  searchName: IProduct[] | null;
  selectedType: string;
  selectedPrice: string;
  isSlider: boolean;
}
