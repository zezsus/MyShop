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
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  SignUpFormLeft,
  SignUpFormRight,
  stylePassword,
} from "../common/assets/signup.style";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import ToastMessageComponent from "@/components/toasmessage.component";
import { v4 as uuidv4 } from "uuid";
import { usePostNewtUser } from "../common/hook";
import { useGetUserData } from "@/common/hook/user.hook";
import { setColor, setIsMessage, setMessage } from "@/common/redux/userSlice";
import { IUser } from "@/common/interfaces/user.interface";
import { FieldValues, useForm } from "react-hook-form";

const SignUpPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const postUser = usePostNewtUser();
  const listUser = useGetUserData();

  const handleSignUp = async (data: FieldValues) => {
    const { username, email, password, comfirmPassword } = data;

    if (!username || !email || !password || !comfirmPassword) {
      dispatch(setIsMessage(true));
      dispatch(setMessage("Please complete all the required fields"));
      dispatch(setColor("error"));
      return;
    }
    if (password !== comfirmPassword) {
      dispatch(setIsMessage(true));
      dispatch(setMessage("Password and Confirm Password do not match"));
      dispatch(setColor("error"));
      return;
    }

    if (listUser.data) {
      const checkUser = listUser.data?.filter(
        (user: IUser) => user.email === email
      );

      if (checkUser.length > 0) {
        dispatch(setIsMessage(true));
        dispatch(setMessage("Email already"));
        dispatch(setColor("error"));
        return;
      }
    }

    const newUser: IUser = {
      id: uuidv4(),
      username,
      email,
      password,
    };
    postUser.mutate(newUser, {
      onSuccess: () => {
        listUser.refetch();
        dispatch(setIsMessage(true));
        dispatch(setMessage("SignUp successfully"));
        dispatch(setColor("success"));
        reset();
      },
    });
  };

  return (
    <Div>
      <ToastMessageComponent />
      <AuthForm onSubmit={handleSubmit(handleSignUp)}>
        <SignUpFormLeft>
          <AuthBody>
            <TextField
              variant='outlined'
              label='UserName'
              size='small'
              fullWidth
              {...register("username")}
            />
            <TextField
              type='email'
              variant='outlined'
              label='Email'
              size='small'
              fullWidth
              {...register("email")}
            />
            {showPassword ? (
              <Box sx={stylePassword}>
                <TextField
                  variant='outlined'
                  label='Password'
                  size='small'
                  fullWidth
                  {...register("password")}
                />
                <TextField
                  variant='outlined'
                  label='Comfirm Password'
                  size='small'
                  fullWidth
                  {...register("comfirmPassword")}
                />
              </Box>
            ) : (
              <Box sx={stylePassword}>
                <TextField
                  type='password'
                  variant='outlined'
                  label='Password'
                  size='small'
                  fullWidth
                  {...register("password")}
                />
                <TextField
                  type='password'
                  variant='outlined'
                  label='Comfirm Password'
                  size='small'
                  fullWidth
                  {...register("comfirmPassword")}
                />
              </Box>
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
            <Button type='submit' variant='contained' color='primary'>
              Sign Up
            </Button>
          </AuthFooter>
        </SignUpFormLeft>

        <SignUpFormRight>
          <AuthHeader variant='h5'>Sign Up</AuthHeader>
          <Typography variant='body1' sx={{ textAlign: "center" }}>
            {`SignIn if you are already a member`}
          </Typography>
          <Button
            variant='outlined'
            sx={{ color: "#ffffff" }}
            onClick={() => router.push("/auth/login")}>
            Login
          </Button>
        </SignUpFormRight>
      </AuthForm>
    </Div>
  );
};
export default SignUpPage;
