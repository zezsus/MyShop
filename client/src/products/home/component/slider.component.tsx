/** @format */

import Slider from "react-slick";
import { Box, CardMedia } from "@mui/material";
import { SliderCPN } from "../common/assets/slider.style";

const SliderComponent = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  return (
    <SliderCPN px={'15%'} py={1}>
      <Slider {...settings}>
        <Box>
          <CardMedia
            component='img'
            alt='https://cdn.dummyjson.com/product-images/1/thumbnail.jpg'
            image='https://cdn.dummyjson.com/product-images/1/thumbnail.jpg'
            sx={{ height: 300, width: "100%" }}
          />
        </Box>
        <Box>
          <CardMedia
            component='img'
            alt='https://cdn.dummyjson.com/product-images/5/1.jpg'
            image='https://cdn.dummyjson.com/product-images/5/1.jpg'
            sx={{ height: 300, width: "100%" }}
          />
        </Box>
        <Box>
          <CardMedia
            component='img'
            alt='https://cdn.dummyjson.com/product-images/6/1.png'
            image='https://cdn.dummyjson.com/product-images/6/1.png'
            sx={{ height: 300, width: "100%" }}
          />
        </Box>
        <Box>
          <CardMedia
            component='img'
            alt='https://cdn.dummyjson.com/product-images/8/3.jpg'
            image='https://cdn.dummyjson.com/product-images/8/3.jpg'
            sx={{ height: 300, width: "100%" }}
          />
        </Box>
        <Box>
          <CardMedia
            component='img'
            alt='https://cdn.dummyjson.com/product-images/12/1.jpg'
            image='https://cdn.dummyjson.com/product-images/12/1.jpg'
            sx={{ height: 300, width: "100%" }}
          />
        </Box>
      </Slider>
    </SliderCPN>
  );
};

export default SliderComponent;
