/** @format */

import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FormBody } from "../../../common/assets/formstyle";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { IBrand } from "../../brand/common/interfaces/brand.interface";
import { ICategory } from "../../category/common/interfaces/category.interface";
import { setShowAddBrand, setShowAddCategory } from "@/navbar/usermenu/common/redux/myproductSlice";

const FormBodyMyProductElement = (props: any) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <FormBody>
      <Input
        type='file'
        inputProps={{
          accept: "image/*",
          onChange: props.upLoadImage,
        }}
      />
      <TextField
        label='Name'
        variant='outlined'
        size='small'
        name='title'
        value={props.myProductValue?.title}
        onChange={props.onChangeValue}
      />
      <TextField
        label='Description'
        size='small'
        variant='outlined'
        multiline
        maxRows={4}
        name='description'
        value={props.myProductValue?.description}
        onChange={props.onChangeValue}
      />
      <TextField
        label='Price'
        variant='outlined'
        size='small'
        name='price'
        value={props.myProductValue?.price}
        onChange={props.onChangeValue}
      />
      <TextField
        label='Rating'
        variant='outlined'
        size='small'
        name='rating'
        value={props.myProductValue?.rating}
        onChange={props.onChangeValue}
      />
      <FormControl size='small' sx={{ maxHeight: 350 }}>
        <InputLabel id='brandProduct-label' sx={{ maxHeight: 350 }}>
          Brand
        </InputLabel>
        <Select
          labelId='brandProduct'
          id='brandProduct'
          label='Brand'
          name='brand'
          sx={{ maxHeight: 350 }}
          value={props.myProductValue?.brand}
          onChange={props.onChangeValue}>
          {props.brandProduct?.map((item: IBrand) => {
            return (
              <MenuItem
                key={item.id}
                value={item.brand}
                sx={{ maxHeight: 350 }}>
                {item.brand}
              </MenuItem>
            );
          })}
          <MenuItem>
            <Button onClick={() => dispatch(setShowAddBrand(true))}>
              Add new...
            </Button>
          </MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ maxHeight: 350 }} size='small'>
        <InputLabel id='categoryProduct-label'>Category</InputLabel>
        <Select
          labelId='categoryProduct'
          id='categoryProduct'
          label='Category'
          name='category'
          sx={{ maxHeight: 350 }}
          value={props.myProductValue?.category}
          onChange={props.onChangeValue}>
          {props.categoryProduct?.map((item: ICategory) => {
            return (
              <MenuItem
                key={item.id}
                value={item.category}
                sx={{ maxHeight: 350 }}>
                {item.category}
              </MenuItem>
            );
          })}
          <MenuItem>
            <Button onClick={() => dispatch(setShowAddCategory(true))}>
              Add new...
            </Button>
          </MenuItem>
        </Select>
      </FormControl>
    </FormBody>
  );
};

export default FormBodyMyProductElement;
