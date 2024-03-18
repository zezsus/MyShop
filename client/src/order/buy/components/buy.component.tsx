/** @format */
"use client";

import { RootState } from "@/app/store";
import SpinnerComponent from "@/components/spinnercomponent";
import { Box, CardMedia, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import {
  Address,
  BuyPageBody,
  BuyPageDetail,
  BuyPageFooter,
  BuyPageHeader,
  Hr,
  styleInfoBuyProduct,
} from "@/order/buy/common/assets/buypage";
import BuyButtonElement from "../elements/buttonbuy.element";
import ModalSuccessElement from "../elements/modalsuccess.element";
import BuyContentElement from "../elements/buycontent.element";
import { useGetUserData } from "@/common/hook/user.hook";
import { useEffect, useState } from "react";
import { IUser } from "@/common/interfaces/user.interface";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ProductBuyComponent = () => {
  const buyItem: any = useSelector(
    (state: RootState) => state.products.buyItem
  );
  const numberBuyProduct = useSelector(
    (state: RootState) => state.products.buyNumberProduct
  );
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const [userLogin, setUserLogin] = useState<any>({});
  const [shipping, setShipping] = useState<number>(0);

  const getUserInfo: any = useGetUserData();

  useEffect(() => {
    const userLoaclStorage = localStorage.getItem("user");
    if (userLoaclStorage) {
      const user: any = JSON.parse(userLoaclStorage);
      user.map((item: IUser) => {
        if (
          item.username !== userLogin.username ||
          item.address !== userLogin.address ||
          item.phoneNumber !== userLogin.phoneNumber
        ) {
          setUserLogin(item);
        }
      });
    }
  }, [userLogin]);

  useEffect(() => {
    if (getUserInfo.data) {
      const user = getUserInfo.data?.filter(
        (item: IUser) => item.email === userLogin.email
      );
      user?.map((item: IUser) => setUserInfo(item));
    }
  }, [getUserInfo.data, userLogin]);

  useEffect(() => {
    setShipping(Math.floor(Math.random() * 100));
  }, []);

  if (!buyItem) {
    return <SpinnerComponent />;
  }

  return (
    <Box>
      <Address py={1}>
        <Container>
          <Typography
            variant='h6'
            sx={{ display: "flex", alignItems: "center" }}>
            <LocationOnIcon sx={{ color: "orange" }} />
            Address
          </Typography>
          <Typography component={"span"}>
            {userInfo?.username} | {userInfo?.phoneNumber}
          </Typography>
          <Typography component={"span"} px={2}>
            {userInfo?.address}
          </Typography>
        </Container>
      </Address>
      <Hr></Hr>
      <Container>
        <BuyPageDetail p={2}>
          <BuyPageHeader>
            <CardMedia
              component='img'
              image={buyItem.thumbnail}
              alt={buyItem?.title}
              style={{ minHeight: 100, width: 200 }}
            />
            <Box sx={styleInfoBuyProduct}>
              <Typography
                variant='h5'
                sx={{ textTransform: "capitalize", width: "100%" }}>
                {buyItem?.title}
              </Typography>
              <BuyContentElement priceBuyProduct={buyItem.price} />
            </Box>
          </BuyPageHeader>
          <BuyPageBody>
            <Typography component={"div"} sx={{ textAlign: "end" }}>
              Shipping Costs: ${shipping}
            </Typography>
            <Typography component={"div"} sx={{ textAlign: "end" }}>
              Total : ${buyItem?.price * numberBuyProduct}
            </Typography>
          </BuyPageBody>
          <BuyPageFooter>
            <BuyButtonElement buyItem={buyItem} shipping={shipping} />
          </BuyPageFooter>
        </BuyPageDetail>
      </Container>
      <ModalSuccessElement />
    </Box>
  );
};
export default ProductBuyComponent;
