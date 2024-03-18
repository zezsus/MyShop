/** @format */

import { configureStore } from "@reduxjs/toolkit";
import productReducer from "@/products/common/redux/productSlice";
import searchProductReducer from "@/products/common/redux/searchProductSlice";
import profileReducer from "@/navbar/usermenu/profile/common/redux/profileSlice";
import userSlice from "@/common/redux/userSlice";
import cartSlice from "@/order/cart/common/redux/cartSlices";
import myProductSlice from "@/navbar/usermenu/common/redux/myproductSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    search: searchProductReducer,
    myProducts: myProductSlice,
    carts: cartSlice,
    users: userSlice,
    profileUser: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
