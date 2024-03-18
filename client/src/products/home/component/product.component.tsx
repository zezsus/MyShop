/** @format */
"use client";

import { Box, Container, Stack } from "@mui/material";
import { Product } from "@/products/home/common/assets/productpage";
import ListProductElement from "../elements/listproduct.element";
import SliderComponent from "./slider.component";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { IProduct } from "@/common/interfaces/product.interface";

const ProductComponent = () => {
  const isSlider: boolean = useSelector(
    (state: RootState) => state.search.isSlider
  );
  const searchNameProduct: IProduct[] | null = useSelector(
    (state: RootState) => state.search.searchName
  );

  return (
    <Box sx={{ backgroundColor: "#DDDDDD", p: "1vh", height: "88vh" }}>
      <Product>
        {isSlider === true ? (
          <Container>
            <SliderComponent />
          </Container>
        ) : (
          ""
        )}
        <Container>
          <ListProductElement listValue={searchNameProduct} />
        </Container>
      </Product>
    </Box>
  );
};
export default ProductComponent;
