/** @format */

import { Box, Card, CardContent, styled } from "@mui/material";

export const Cart = styled(Box)({
  height: "88vh",
  overflow: "auto",
  "&::-webkit-scrollbar": {
    width: "8px",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
    borderRadius: "4px",
  },
});

export const CartHeader = styled(Card)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px",
  gap: "1rem",
});

export const CartItem = styled(Card)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px",
  gap: "1rem",
  border: "1px solid transparent",
  transition: "border-color 0.3s ease",
  "&:hover": {
    borderColor: "orange",
  },
});

export const CartItemImage = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  width: 200,
});

export const CartContent = styled(CardContent)({
  width: "50%",
  display: "flex",
  gap: "2rem",
  alignItems: "center",
  justifyContent: "space-between",
});
