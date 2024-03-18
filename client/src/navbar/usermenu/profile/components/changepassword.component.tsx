/** @format */

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from "@mui/material";
import { FormBody, FormFooter, UserForm } from "../../common/assets/formstyle";
import { useState } from "react";
import { useUpdateUser } from "../common/hook/profile.hook";
import { stylePassword } from "@/auth/common/assets/signup.style";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { setIsChangePassword } from "../common/redux/profileSlice";
import { useGetUserData } from "@/common/hook/user.hook";
import { setColor, setIsMessage, setMessage } from "@/common/redux/userSlice";
import { useForm } from "react-hook-form";

const ChangePassWordComponent = ({ userData }: any) => {
  const { register, handleSubmit, reset } = useForm();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const updatePassword = useUpdateUser(userData.id);
  const getDataUser = useGetUserData();

  const handleSave = (data: any) => {
    if (!data.email || !data.password || !data.newPassword) {
      dispatch(setIsMessage(true));
      dispatch(setMessage("Please fill in all fields"));
      dispatch(setColor("error"));
      return;
    }
    if (userData.email !== data.email || userData.password !== data.password) {
      dispatch(setIsMessage(true));
      dispatch(setMessage("Incorrect email or password"));
      dispatch(setColor("error"));
      return;
    }
    if (userData.password === data.newPassword) {
      dispatch(setIsMessage(true));
      dispatch(setMessage("Password cannot be the same as the new password"));
      dispatch(setColor("error"));
      return;
    }
    const newPassword: any = { ...userData, password: data.newPassword };

    updatePassword.mutate(newPassword, {
      onSuccess: () => {
        getDataUser.refetch();
        dispatch(setIsMessage(true));
        dispatch(setMessage("Change password successfully."));
        dispatch(setColor("success"));
        reset();
      },
    });
  };

  const handleClose = () => {
    dispatch(setIsChangePassword(false));
  };
  return (
    <UserForm onSubmit={handleSubmit(handleSave)}>
      <FormBody>
        <TextField
          type='email'
          label='Email'
          variant='outlined'
          size='small'
          {...register("email")}
        />
        {showPassword ? (
          <Box sx={stylePassword}>
            <TextField
              label='Password'
              variant='outlined'
              size='small'
              {...register("pasword")}
            />
            <TextField
              label='NewPassword'
              size='small'
              variant='outlined'
              {...register("newPassword")}
            />
          </Box>
        ) : (
          <Box sx={stylePassword}>
            <TextField
              type='password'
              label='Password'
              variant='outlined'
              size='small'
              {...register("password")}
            />
            <TextField
              type='password'
              label='NewPassword'
              size='small'
              variant='outlined'
              {...register("newPassword")}
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
      </FormBody>
      <FormFooter>
        <Button type='submit' variant='contained' color='warning'>
          Save
        </Button>
        <Button variant='contained' color='info' onClick={handleClose}>
          Close
        </Button>
      </FormFooter>
    </UserForm>
  );
};
export default ChangePassWordComponent;
