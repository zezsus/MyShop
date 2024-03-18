/** @format */

import { Button, TextField } from "@mui/material";
import { FormBody, FormFooter, UserForm } from "../../common/assets/formstyle";
import { useUpdateUser } from "../common/hook/profile.hook";
import { setUpdateUser } from "../common/redux/profileSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { useGetUserData } from "@/common/hook/user.hook";
import { setColor, setIsMessage, setMessage } from "@/common/redux/userSlice";
import { useForm } from "react-hook-form";

const UpdateUserElement = ({ userData }: any) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: userData,
  });
  const dispatch = useDispatch<AppDispatch>();

  const updateUserMutation = useUpdateUser(userData.id);
  const getUserData = useGetUserData();

  const handleSave = (data: any) => {
    updateUserMutation.mutate(data, {
      onSuccess: () => {
        getUserData.refetch();
        dispatch(setIsMessage(true));
        dispatch(setMessage("Update user success."));
        dispatch(setColor("success"));
        dispatch(setUpdateUser(false));
        reset();
      },
    });
  };

  return (
    <UserForm onSubmit={handleSubmit(handleSave)}>
      <FormBody>
        <TextField
          label='Name'
          variant='outlined'
          size='small'
          {...register("username")}
        />
        <TextField
          label='Address'
          variant='outlined'
          size='small'
          {...register("address")}
        />
        <TextField
          label='Phone Number'
          size='small'
          variant='outlined'
          {...register("phoneNumber")}
        />
      </FormBody>
      <hr></hr>
      <FormFooter mt={5}>
        <Button type='submit' variant='contained' color='warning'>
          Save
        </Button>
      </FormFooter>
    </UserForm>
  );
};

export default UpdateUserElement;
