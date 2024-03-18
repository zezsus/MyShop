/** @format */

import { Box, Button, styled } from "@mui/material";

export const BuyFooter = styled(Box)({
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderTop: "2px solid #CCCCCC",
  height: 50,
});

export const ButtonBuy = styled(Button)({
  backgroundColor: "red",
  border: "none",
  boxShadow: "none",
  borderRadius: 0,
  height: "100%",
  width: 250,

  "&:hover": {
    backgroundColor: "red",
  },
});
