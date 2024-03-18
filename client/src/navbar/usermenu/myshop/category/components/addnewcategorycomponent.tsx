/** @format */

import { AppDispatch, RootState } from "@/app/store";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  FormBody,
  FormFooter,
  FormHeader,
  formStyle,
} from "@/navbar/usermenu/common/assets/formstyle";
import {
  useGetListCategory,
  usePostNewCategory,
} from "../common/hook/category.hook";
import { v4 as uuidv4 } from "uuid";
import { setColor, setIsMessage, setMessage } from "@/common/redux/userSlice";
import {
  setNewCategoryProduct,
  setShowAddCategory,
} from "@/navbar/usermenu/common/redux/myproductSlice";
import { FieldValues, useForm } from "react-hook-form";

const AddNewCategoryComponent = () => {
  const { register, handleSubmit, reset } = useForm();
  const showAddCategory = useSelector(
    (state: RootState) => state.myProducts.isShowAddCategory
  );
  const dispatch = useDispatch<AppDispatch>();
  const getListCategory = useGetListCategory();
  const postNewCategory = usePostNewCategory();

  const handleAddCategory = (data: FieldValues) => {
    const checkCategory = getListCategory.data?.filter(
      (item: any) => item.category === data.category
    );
    if (checkCategory && checkCategory.length > 0) {
      dispatch(setIsMessage(true));
      dispatch(setMessage("Category already"));
      dispatch(setColor("error"));
      return;
    }

    const newCategory: any = {
      ...data,
      id: uuidv4(),
    };

    postNewCategory.mutate(newCategory, {
      onSuccess: () => {
        getListCategory.refetch();
        handleCloseAddCategory();
        dispatch(setNewCategoryProduct(data));
        reset();
      },
    });
  };
  const handleCloseAddCategory = () => {
    dispatch(setShowAddCategory(false));
  };

  return (
    <Modal open={showAddCategory}>
      <Box sx={formStyle}>
        <form onSubmit={handleSubmit(handleAddCategory)}>
          <FormHeader sx={{ backgroundColor: "blue" }}>
            <Typography variant='h6'>Add New Category</Typography>
          </FormHeader>
          <FormBody>
            <TextField
              type='text'
              label='New Category'
              variant='outlined'
              size='small'
              {...register("category")}
            />
          </FormBody>
          <FormFooter>
            <Button variant='contained' type='submit'>
              Add
            </Button>
            <Button
              variant='contained'
              color='info'
              onClick={handleCloseAddCategory}>
              Close
            </Button>
          </FormFooter>
        </form>
      </Box>
    </Modal>
  );
};
export default AddNewCategoryComponent;
