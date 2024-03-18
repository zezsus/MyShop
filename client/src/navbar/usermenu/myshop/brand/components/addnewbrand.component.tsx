/** @format */

import { AppDispatch, RootState } from "@/app/store";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  FormBody,
  FormFooter,
  FormHeader,
  formStyle,
  UserForm,
} from "@/navbar/usermenu/common/assets/formstyle";
import { useGetListBrand, usePostNewBrand } from "../common/hook/brand.hook";
import { v4 as uuidv4 } from "uuid";
import { setColor, setIsMessage, setMessage } from "@/common/redux/userSlice";
import {
  setNewBrandProduct,
  setShowAddBrand,
} from "@/navbar/usermenu/common/redux/myproductSlice";
import { FieldValues, useForm } from "react-hook-form";

const AddNewBrandComponent = () => {
  const { register, handleSubmit, reset } = useForm();
  const showAddBrand = useSelector(
    (state: RootState) => state.myProducts.isShowAddBrand
  );
  const dispatch = useDispatch<AppDispatch>();
  const getBrand = useGetListBrand();
  const postNewBrand = usePostNewBrand();

  const handleAddBrand = (data: FieldValues) => {
    const checkBrand = getBrand.data?.filter(
      (item: any) => item.brand === data
    );
    if (!data) {
      dispatch(setIsMessage(true));
      dispatch(setMessage("Missing brand"));
      dispatch(setColor("error"));
      return;
    }

    if (checkBrand && checkBrand.length > 0) {
      dispatch(setIsMessage(true));
      dispatch(setMessage("Brand already"));
      dispatch(setColor("error"));
      return;
    }
    const newBrand: any = { ...data, id: uuidv4() };
    postNewBrand.mutate(newBrand, {
      onSuccess: () => {
        getBrand.refetch();
        handleCloseAddBrand();
        dispatch(setNewBrandProduct(data));
        reset();
      },
    });
  };
  const handleCloseAddBrand = () => {
    dispatch(setShowAddBrand(false));
  };

  return (
    <Modal open={showAddBrand}>
      <Box sx={formStyle}>
        <form onSubmit={handleSubmit(handleAddBrand)}>
          <FormHeader sx={{ backgroundColor: "blue" }}>
            <Typography variant='h6'>Add New Brand</Typography>
          </FormHeader>
          <FormBody>
            <TextField
              type='text'
              label='New Brand'
              variant='outlined'
              size='small'
              {...register("brand")}
            />
          </FormBody>
          <FormFooter>
            <Button variant='contained' type='submit'>
              Add
            </Button>
            <Button
              variant='contained'
              color='info'
              onClick={handleCloseAddBrand}>
              Close
            </Button>
          </FormFooter>
        </form>
      </Box>
    </Modal>
  );
};
export default AddNewBrandComponent;
