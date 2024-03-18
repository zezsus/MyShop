/** @format */

import { IconButton, Tooltip } from "@mui/material";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { IProduct } from "@/common/interfaces/product.interface";
import { setEditMyProduct, setShowEditMyProduct } from "@/navbar/usermenu/common/redux/myproductSlice";

const ButtonEditElement = ({ editItem }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleClickEditProduct = (editItem: IProduct) => {
    dispatch(setShowEditMyProduct(true));
    dispatch(setEditMyProduct(editItem));
  };

  return (
    <Tooltip title='Edit' arrow>
      <IconButton
        color='warning'
        onClick={() => handleClickEditProduct(editItem)}>
        <EditCalendarIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ButtonEditElement;
