/** @format */

import { AppDispatch, RootState } from "@/app/store";
import { useGetCartItem, usePostCartItem } from "@/common/hook/cart.hook";
import { ICartItem } from "@/common/interfaces/cart.interface";
import { IUser } from "@/common/interfaces/user.interface";
import { setShowModal } from "@/products/common/redux/productSlice";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { ButtonBuy, BuyFooter } from "../common/assets/buttonbuy";

const BuyButtonElement = (props: any) => {
  const [cartItemId, setCartItemId] = useState<string>(uuidv4());
  const [userId, setUserId] = useState<string>("");
  const numberBuyProduct = useSelector(
    (state: RootState) => state.products.buyNumberProduct
  );
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
      ...props.buyItem,
      id: cartItemId,
      userId: userId,
    };

    const checkCartItem = getCartItem.data?.filter(
      (item: any) => item.userId === userId && item.title === newCartItem.title
    );

    if (!checkCartItem?.length) {
      postCartItem.mutate(newCartItem);
    }
  };
  return (
    <BuyFooter>
      <Typography variant='body1' sx={{ width: "100%" }}>
        <Typography component={"div"}>Total Payment</Typography>$
        {props.buyItem?.price * numberBuyProduct + props.shipping}
      </Typography>
      <ButtonBuy variant='contained' onClick={handleByNow}>
        Buy
      </ButtonBuy>
    </BuyFooter>
  );
};
export default BuyButtonElement;
