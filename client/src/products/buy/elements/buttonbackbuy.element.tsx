/** @format */

import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

const ButtonBackBuyElement = () => {
  const router = useRouter();

  return (
    <IconButton sx={{ color: "black" }} onClick={() => router.push(`/cart`)}>
      <ArrowBackIcon />
    </IconButton>
  );
};

export default ButtonBackBuyElement;
