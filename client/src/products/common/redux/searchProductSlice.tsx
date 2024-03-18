/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { ISearchProductState } from "../interface";

const initialState: ISearchProductState = {
  searchName: null,
  selectedType: "",
  selectedPrice: "",
  isSlider: true,
};

export const searchProductSlice = createSlice({
  name: "searchProduct",
  initialState,
  reducers: {
    setSearchName: (state, action) => {
      state.searchName = action.payload;
    },
    setSearchType: (state, action) => {
      state.selectedType = action.payload;
    },
    setSearchPrice: (state, action) => {
      state.selectedPrice = action.payload;
    },
    setIsSlider: (state, action) => {
      state.isSlider = action.payload;
    },
  },
});

export const { setSearchName, setSearchType, setSearchPrice, setIsSlider } =
  searchProductSlice.actions;

export default searchProductSlice.reducer;
