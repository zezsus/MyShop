/** @format */

import { Button, Typography } from "@mui/material";
import { FormBody, FormFooter, UserForm } from "../../common/assets/formstyle";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import {
  setIsChangePassword,
  setUpdateUser,
} from "../common/redux/profileSlice";

const GetUserInfoElement = ({ userData }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <UserForm>
      <FormBody>
        <Typography variant='body1'>name: {userData?.username}</Typography>
        <Typography variant='body1'>address:{userData?.address}</Typography>
        <Typography variant='body1'>
          phone number:{userData?.phoneNumber}
        </Typography>
      </FormBody>
      <hr />
      <FormFooter mt={5}>
        <Button
          variant='contained'
          color='warning'
          onClick={() => dispatch(setUpdateUser(true))}>
          Update
        </Button>
        <Button
          variant='contained'
          onClick={() => dispatch(setIsChangePassword(true))}>
          Change Password
        </Button>
      </FormFooter>
    </UserForm>
  );
};

export default GetUserInfoElement;
