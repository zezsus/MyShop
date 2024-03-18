/** @format */

import { Box, Typography, styled } from "@mui/material";

export const ProductDetail = styled(Box)({
  boxSizing: "border-box",
  maxHeight: "83vh",
  padding: "1rem",
  overflow: "auto",
});

export const ContentProduct = styled(Box)({
  display: "flex",
  gap: "2rem",
});

export const RatingNumber = styled(Typography)({
  display: "flex",
  alignItems: "center",
  gap: "0.2rem",
  color: "#ee4d2d",
});
