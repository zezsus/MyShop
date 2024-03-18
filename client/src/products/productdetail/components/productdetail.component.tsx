/** @format */
"use client";

import SpinnerComponent from "@/components/spinnercomponent";
import { useGetProductDetailData } from "@/products/common/hooks";
import {
  Box,
  CardActions,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import { ContentProduct, ProductDetail } from "../common/assets";
import ContentProductElement from "../elements/contentproduct.element";
import ActionElement from "../elements/action.element";
import ButtonBackProductDetailElement from "@/products/productdetail/elements/buttonbackproductdetail.element";
import ToastMessageComponent from "@/components/toasmessage.component";

const ProductDetailComponent = ({ idProduct }: any) => {
  const getDataProdutDetail = useGetProductDetailData(idProduct);
  if (getDataProdutDetail.isLoading) {
    return <SpinnerComponent />;
  }

  return (
    <Box>
      <ToastMessageComponent />
      <ButtonBackProductDetailElement />
      <Container>
        <ProductDetail>
          <ContentProduct>
            <CardMedia
              component='img'
              image={getDataProdutDetail.data?.thumbnail}
              alt={getDataProdutDetail.data?.title}
              sx={{ maxWidth: 400 }}
            />
            <Box>
              <ContentProductElement
                titleProduct={getDataProdutDetail.data?.title}
                descriptionProduct={getDataProdutDetail.data?.description}
                priceProduct={getDataProdutDetail.data?.price}
                ratingProduct={getDataProdutDetail.data?.rating}
              />
              <CardActions>
                <ActionElement dataProduct={getDataProdutDetail.data} />
              </CardActions>
            </Box>
          </ContentProduct>
        </ProductDetail>
        <Box mt={2}>
          <Typography variant='h4'>
            Description
            <hr />
          </Typography>
          <Typography variant='body1'>
            {getDataProdutDetail.data?.description}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductDetailComponent;
