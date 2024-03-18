/** @format */

import { AppDispatch } from "@/app/store";
import { Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { ProductNotFound } from "../../common/assets/productnotfound";
import { setShowAddMyProduct } from "@/navbar/usermenu/common/redux/myproductSlice";

const ProductNotFoundElement = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <ProductNotFound py={5}>
      <Typography variant='h5'> Products Not Found</Typography>
      <Button
        variant='contained'
        onClick={() => dispatch(setShowAddMyProduct(true))}>
        Add New Product
      </Button>
    </ProductNotFound>
  );
};

export default ProductNotFoundElement;
