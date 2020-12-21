import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import { Container, Grid, Typography } from "@material-ui/core";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper";

// Import Swiper styles
import "swiper/swiper.scss";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

const useStyles = (theme) => ({
  root: {
    width: "100%",
    height: "20rem",
    position: "relative",
    margin: "0 autom",
    position: "relative",
    overflow: "hidden",
    listStyle: "none",
    padding: "0",
    zIndex: "1",
  },
  image: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "20rem",
  },
  swiperSlide: {},
});

const ImageSlider = (props) => {
  const { classes, image } = props;

  const params = {
    direction: "vertical",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    slidesPerView: "1",
  };
  return (
    <div className={classes.root}>
      <Swiper
        {...params}
      >
        {image.map((img) => (
          <SwiperSlide>
            <div>
              <img src={img} clasName={classes.image} />
            </div>
          </SwiperSlide>
        ))}
        <div class="swiper-pagination"></div>
      </Swiper>
    </div>
  );
};

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(
  withStyles(useStyles)(ImageSlider)
);
