/** @format */
"use client";

import {
  AuthBody,
  AuthFooter,
  AuthForm,
  AuthHeader,
  Div,
} from "@/auth/common/assets/auth.style";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { useGetUserData } from "@/common/hook/user.hook";
import {
  setColor,
  setIsLogin,
  setIsMessage,
  setMessage,
} from "@/common/redux/userSlice";
import ToastMessageComponent from "@/components/toasmessage.component";
import { FormLoginLeft, FormLoginRight } from "../common/assets/login.style";
import { FieldValues, useForm } from "react-hook-form";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const getDataUser = useGetUserData();

  const handleLogin = async (data: FieldValues) => {
    if (!data.email || !data.password) {
      dispatch(setIsMessage(true));
      dispatch(setMessage("Please complete all the required fields"));
      dispatch(setColor("error"));
      return;
    }

    if (getDataUser.data) {
      const checkUser = getDataUser.data?.filter(
        (user: any) =>
          user.email === data.email && user.password === data.password
      );

      if (checkUser.length === 0) {
        dispatch(setIsMessage(true));
        dispatch(setMessage("User not found"));
        dispatch(setColor("error"));
        return;
      }

      router.push("/product");
      if (!localStorage.getItem("user")) {
        localStorage.setItem("user", JSON.stringify(checkUser));
      }
      dispatch(setIsLogin(true));
      reset();
    }
  };

  return (
    <Div>
      <ToastMessageComponent />
      <AuthForm onSubmit={handleSubmit(handleLogin)}>
        <FormLoginLeft>
          <AuthHeader variant='h5'>Sign In</AuthHeader>
          <Typography
            variant='body1'
            component={"div"}
            sx={{ textAlign: "center" }}>
            {`SignUp an account if you are a new member`}
          </Typography>
          <Button
            variant='outlined'
            onClick={() => router.push("/auth/signup")}
            sx={{ color: "white" }}>
            Sign Up
          </Button>
        </FormLoginLeft>
        <FormLoginRight>
          <AuthBody>
            <TextField
              type='email'
              variant='outlined'
              label='Email'
              size='small'
              fullWidth
              {...register("email")}
            />
            {showPassword ? (
              <TextField
                variant='outlined'
                label='Password'
                size='small'
                fullWidth
                {...register("password")}
              />
            ) : (
              <TextField
                type='password'
                variant='outlined'
                label='Password'
                size='small'
                fullWidth
                {...register("password")}
              />
            )}

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox onClick={() => setShowPassword(!showPassword)} />
                }
                label='Show Password'
              />
            </FormGroup>
          </AuthBody>
          <AuthFooter>
            <Button
              type='submit'
              sx={{ width: 150 }}
              variant='contained'
              color='primary'>
              sign in
            </Button>
          </AuthFooter>
        </FormLoginRight>
      </AuthForm>
    </Div>
  );
};
export default LoginPage;
