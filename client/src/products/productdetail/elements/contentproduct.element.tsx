/** @format */

import { CardContent, Rating, Typography } from "@mui/material";
import { RatingNumber } from "../common/assets";

const ContentProductElement = (props: any) => {
  return (
    <CardContent>
      <Typography
        gutterBottom
        variant='h5'
        component='div'
        sx={{ textTransform: "capitalize" }}>
        {props.titleProduct}
      </Typography>
      <Typography
        gutterBottom
        variant='h4'
        component='div'
        sx={{ color: "#ee4d2d" }}>
        ${props.priceProduct}
      </Typography>
      <RatingNumber variant='body1'>
        {props.ratingProduct}
        <Rating value={props.ratingProduct} precision={0.1} readOnly />
      </RatingNumber>
    </CardContent>
  );
};
export default ContentProductElement;
