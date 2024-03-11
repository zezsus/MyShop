/** @format */

import { AppDispatch } from "@/app/store";
import { IUser } from "@/auth/common/interfaces";
import {
  useGetCartItem,
  usePostCartItem,
} from "@/products/cart/common/hooks/cartproducts";
import { ICartItem } from "@/products/common/interface";
import { setShowModal } from "@/products/common/redux/productSlice";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const BuyButtonElement = ({ buyItem }: any) => {
  const [cartItemId, setCartItemId] = useState<string>(uuidv4());
  const [userId, setUserId] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const postCartItem = usePostCartItem();
  const getCartItem = useGetCartItem();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const listUser: IUser[] = JSON.parse(localStorage.getItem("user"));
      listUser?.map((user: IUser) => setUserId(user.id));
    }
  }, []);

  const handleByNow = () => {
    dispatch(setShowModal(true));
    const newCartItem: ICartItem = {
      ...buyItem,
      id: cartItemId,
      userId: userId,
    };

    const checkCartItem = getCartItem.data.filter(
      (item: any) => item.userId === userId && item.title === newCartItem.title
    );

    if (checkCartItem.length === 0) {
      postCartItem.mutate(newCartItem);
    }
  };
  return (
    <Button variant='contained' sx={{ width: 200 }} onClick={handleByNow}>
      Buy
    </Button>
  );
};
export default BuyButtonElement;
