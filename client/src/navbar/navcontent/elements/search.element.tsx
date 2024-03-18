/** @format */
"use client";

import { useState } from "react";
import {
  InputSearch,
  Search,
  SearchIconWrapper,
} from "../../common/assets/navbarcomponent";
import SearchIcon from "@mui/icons-material/Search";
import {
  setIsSlider,
  setSearchName,
} from "@/products/common/redux/searchProductSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { useGetSearchNameProduct } from "@/products/home/common/hook/searchProduct.hook";

const SearchElement = () => {
  const [nameProduct, setNameProduct] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const getSearchNameProduct = useGetSearchNameProduct(nameProduct);

  const handleSearchName = () => {
    dispatch(setSearchName(getSearchNameProduct.data));
    getSearchNameProduct.refetch();
    if (nameProduct !== "") {
      dispatch(setIsSlider(false));
    } else {
      dispatch(setIsSlider(true));
    }
  };

  return (
    <Search>
      <InputSearch
        placeholder='Search name...'
        value={nameProduct}
        onChange={(e: any) => setNameProduct(e.target.value)}
        onKeyDown={handleSearchName}
        onKeyUp={handleSearchName}
      />
      <SearchIconWrapper onClick={handleSearchName}>
        <SearchIcon />
      </SearchIconWrapper>
    </Search>
  );
};

export default SearchElement;
