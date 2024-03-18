/** @format */

import { Box, InputBase, styled } from "@mui/material";

export const Address = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

export const Hr = styled(Box)({
  backgroundImage:
    "repeating-linear-gradient(45deg,#6fa6d6,#6fa6d6 33px,transparent 0,transparent 41px,#f18d9b 0,#f18d9b 74px,transparent 0,transparent 82px)",
  backgroundPositionX: "-30px",
  backgroundSize: "116px 3px",
  height: "3px",
  width: "100%",
});

export const BuyPageDetail = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
});

export const BuyPageHeader = styled(Box)({
  display: "flex",
  gap: "2rem",
  alignItems: "center",
});

export const styleInfoBuyProduct = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "start",
  gap: "0.6rem",
};

export const BuyPageBody = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width:'100%'
});

export const Counter = styled(Box)({
  display: "flex",
  alignItems: "center",
  padding: 0,
  margin: 0,
});

export const CounterInput = styled(InputBase)({
  width: 50,
  border: "1px solid gray",
  paddingLeft: "10px",
  borderRadius: "5px",
});

export const BuyPageFooter = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});
