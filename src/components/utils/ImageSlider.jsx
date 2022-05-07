import React from "react";
import { connect } from "react-redux";

import { withStyles } from "@mui/styles";
// Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper";

// Import Swiper styles
// import "swiper/swiper.scss";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

const useStyles = (theme) => ({
  root: {
    width: "100%",
    height: "30rem",
    position: "relative",
    margin: "0 auto",
    overflow: "hidden",
    listStyle: "none",
    padding: "0",
    zIndex: "1",
  },
  image: {
    width: "100%",
    height: "30rem",
    justifyContent: "center",
    alignItems: "center",
    objectFit: "contain",
  },
});

const ImageSlider = (props) => {
  const { classes, post } = props;

  const params = {
    //direction: "vertical",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    // slidesPerView: "1",
    //spaceBetween:"10",
    lazy: {
      loadPrevNext: true,
    },
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },
  };

  return (
    <div className={classes.root}>
      {/* <Swiper {...params}>
        {post.media_url.map((img) => (
          <SwiperSlide>
            <div>
              <img src={img} alt={post.image} className={classes.image} /> */}
              {/* <div class="swiper-lazy-preloader"></div> */}
            {/* </div>
          </SwiperSlide>
        ))}

{post.media_url.length > 1 ? <div class="swiper-pagination"></div> : ""}
      </Swiper> */}
    </div>
  );
};

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(
  withStyles(useStyles)(ImageSlider)
);
