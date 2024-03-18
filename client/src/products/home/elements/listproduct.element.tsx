/** @format */
"use client";

import { Box, Button, CardContent, CardMedia, Typography } from "@mui/material";
import {
  ButtonLearnMore,
  CardProduct,
  ListProducts,
  styleImageProduct,
} from "../common/assets/productpage";
import { useEffect, useState } from "react";
import { IProduct } from "@/common/interfaces/product.interface";
import { useRouter } from "next/navigation";
import { useGetProductData } from "@/products/common/hooks";
import SpinnerComponent from "@/components/spinnercomponent";

const ListProductElement = ({ listValue }: any) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<IProduct[]>([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const router = useRouter();

  const { data, isLoading } = useGetProductData();

  useEffect(() => {
    if (listValue === null) {
      setProducts(data);
    } else {
      setProducts(listValue);
    }
  }, [data, listValue]);

  useEffect(() => {
    setVisibleProducts(products?.slice(0, visibleCount));
  }, [products, visibleCount]);

  const handleDetail = (id: string) => {
    router.push(`product/${id}`);
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  if (isLoading) {
    <SpinnerComponent />;
  }

  return (
    <Box>
      {visibleProducts && visibleProducts.length > 0 ? (
        <Box>
          <ListProducts>
            {visibleProducts.map((item: IProduct, index: number) => {
              return (
                <CardProduct key={index} onClick={() => handleDetail(item.id)}>
                  <CardMedia
                    component='img'
                    image={item.thumbnail}
                    alt={item?.title}
                    sx={styleImageProduct}
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {item?.title}
                    </Typography>
                    <Typography variant='h6'>$ {item.price}</Typography>
                  </CardContent>
                </CardProduct>
              );
            })}
          </ListProducts>
          {visibleCount < products?.length && (
            <ButtonLearnMore>
              <Button variant='contained' onClick={handleShowMore}>
                Learn More
              </Button>
            </ButtonLearnMore>
          )}
        </Box>
      ) : (
        <ListProducts>
          <Typography variant='h5'>Products Not Found</Typography>
        </ListProducts>
      )}
    </Box>
  );
};
export default ListProductElement;
