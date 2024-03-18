/** @format */

import {
  Button,
  CardActions,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import {
  CartContent,
  CartItem,
  CartItemImage,
} from "../common/assets/cartinfo";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/app/store";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  setDeleteItemCartId,
  showDeleteCartItemModal,
} from "../common/redux/cartSlices";
import {
  setBuyItem,
  setBuyNumberProduct,
} from "@/products/common/redux/productSlice";
import { IProduct } from "@/common/interfaces/product.interface";
import { useState } from "react";
import { Counter, CounterInput } from "@/order/buy/common/assets/buypage";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CartInfoElement = ({ cartProduct }: any) => {
  const [numberProduct, setNumberProduct] = useState<number>(1);

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const incrementNumberProduct = () => {
    setNumberProduct(numberProduct + 1);
    dispatch(setBuyNumberProduct(numberProduct + 1));
  };

  const decrementNumberProduct = () => {
    if (numberProduct > 0) {
      setNumberProduct(numberProduct - 1);
    } else {
      setNumberProduct(0);
    }
    dispatch(setBuyNumberProduct(numberProduct - 1));
  };

  const handleOnChangeNumberProduct = (e: any) => {
    setNumberProduct(e.target.value);
    dispatch(setBuyNumberProduct(numberProduct));
  };

  const handleBuyNow = (buyItem: IProduct) => {
    router.push("/buy");
    dispatch(setBuyItem(buyItem));
  };

  const handleDeleteItemCart = (deleteItemId: number) => {
    dispatch(showDeleteCartItemModal(true));
    dispatch(setDeleteItemCartId(deleteItemId));
  };
  return (
    <CartItem>
      <CartItemImage>
        <CardMedia
          component={"img"}
          sx={{ height: 80, width: 80 }}
          image={cartProduct.thumbnail}
          title={cartProduct.title}
        />
        <Typography gutterBottom variant='body2' component='div' sx={{textTransform:"capitalize"}}>
          {cartProduct.title}
        </Typography>
      </CartItemImage>
      <CartContent>
        <Typography variant='body2' width={150}>
          ${cartProduct.price}
        </Typography>
        <Typography
          variant='body1'
          py={2}
          width={250}
          sx={{ display: "flex", alignItems: "center" }}
          component={"div"}>
          <Counter>
            <IconButton onClick={decrementNumberProduct}>
              <RemoveIcon />
            </IconButton>
            <CounterInput
              value={numberProduct}
              onChange={handleOnChangeNumberProduct}
            />
            <IconButton onClick={incrementNumberProduct}>
              <AddIcon />
            </IconButton>
          </Counter>
        </Typography>
        <Typography variant='body1' width={150} sx={{ color: "red" }}>
          $ {cartProduct.price * numberProduct}
        </Typography>
      </CartContent>
      <CardActions sx={{ width: 150 }}>
        <Button onClick={() => handleBuyNow(cartProduct)}>Buy now</Button>
        <IconButton
          color='error'
          onClick={() => handleDeleteItemCart(cartProduct.id)}>
          <DeleteForeverIcon />
        </IconButton>
      </CardActions>
    </CartItem>
  );
};

export default CartInfoElement;
