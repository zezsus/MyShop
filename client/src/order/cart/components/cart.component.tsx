/** @format */

import { RootState } from "@/app/store";
import {
  Box,
  Card,
  CardActions,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import CartNotFoundElement from "../elements/cartnotfound.element";
import CartInfoElement from "../elements/cartinfo.element";
import {
  Cart,
  CartContent,
  CartHeader,
  CartItem,
  CartItemImage,
} from "../common/assets/cartinfo";
import ToastMessageComponent from "@/components/toasmessage.component";
import { useEffect, useState } from "react";
import { IProduct } from "@/common/interfaces/product.interface";
import { IUser } from "@/common/interfaces/user.interface";
import DeleteCartItemComponent from "./deletecartitemcomponent";
import { useGetCartItem } from "@/common/hook/cart.hook";

const CartComponent = () => {
  const [listCart, setListCart] = useState<IProduct[]>([]);
  const listCartItem = useGetCartItem();
  const showDelete = useSelector(
    (state: RootState) => state.carts.isShowDeleteCart
  );
  const [userId, setUserId] = useState<string>("");
  useEffect(() => {
    const user: IUser[] = JSON.parse(localStorage.getItem("user"));
    user?.map((user: IUser) => {
      setUserId(user.id);
    });
  });

  useEffect(() => {
    if (listCartItem.data) {
      const cart = listCartItem.data?.filter(
        (item: IProduct) => item.userId === userId
      );
      setListCart(cart);
    }
  }, [listCartItem.data, userId]);

  return (
    <Box sx={{ backgroundColor: "#DDDDDC", py: "1vh" }}>
      <Cart>
        <Container>
          <ToastMessageComponent />
          {listCart && listCart.length === 0 ? (
            <CartNotFoundElement />
          ) : (
            <Stack spacing={2} p={1}>
              <CartHeader>
                <Typography
                  gutterBottom
                  variant='body2'
                  component='div'
                  width={200}>
                  Product
                </Typography>
                <CartContent>
                  <Typography variant='body2' width={150}>
                    Price
                  </Typography>
                  <Typography variant='body2' width={250}>
                    Number
                  </Typography>
                  <Typography variant='body2' width={150}>
                    Total
                  </Typography>
                </CartContent>
                <Typography variant='body2' sx={{ width: 150 }}>
                  Action
                </Typography>
              </CartHeader>
              {listCart?.map((item: IProduct) => {
                return (
                  <CartInfoElement
                    userId={userId}
                    cartProduct={item}
                    key={item.id}
                  />
                );
              })}
            </Stack>
          )}
        </Container>
        {showDelete && <DeleteCartItemComponent />}
      </Cart>
    </Box>
  );
};
export default CartComponent;
