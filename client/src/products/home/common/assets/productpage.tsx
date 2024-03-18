/** @format */

import { Box, Button, Card, Stack, styled } from "@mui/material";

export const CardProduct = styled(Card)({
  width: 245,
  cursor: "pointer",
  padding: 5,
  border: "2px solid transparent",
  transition: "border-color 0.3s ease",
  "&:hover": {
    borderColor: "orange",
  },
});

export const ProductHeader = styled(Stack)({
  padding: "1rem 0 0.5rem 1rem",
  display: "flex",
  justifyContent: "flex-start",
});

export const Product = styled(Stack)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  maxHeight: "88vh",
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

export const ListProducts = styled(Box)({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-evenly",
  gap: "1rem",
  boxSizing: "border-box",
});

export const styleImageProduct = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 225,
  width: 245,
};

export const ButtonLearnMore = styled(Button)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  paddingTop: 20,
});
