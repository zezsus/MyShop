/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { IState } from "../interfaces/user.interface";

const initialState: IState = {
  isLogin: false,
  isLocalStorage: false,
  isMessage: false,
  message: "",
  color: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLocalStorage: (state) => {
      if (localStorage.getItem("user")) {
        state.isLocalStorage = true;
      } else {
        state.isLocalStorage = false;
      }
    },
    setIsLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    setIsMessage: (state, action) => {
      state.isMessage = action.payload;
    },

    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setColor: (state, action) => {
      state.color = action.payload;
    },
  },
});

export const {
  setIsLocalStorage,
  setIsLogin,
  setIsMessage,
  setMessage,
  setColor,
} = userSlice.actions;

export default userSlice.reducer;
