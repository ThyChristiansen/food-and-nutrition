import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@mui/styles";
import { CircularProgress, Fade, Grid, Paper } from "@mui/material";
import RecipeSummary from "../Recipes/RecipeSummary";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper";

const useStyles = (theme) => ({
  root: {
    textAlign: "center",
  },
  paper: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
  },
  swipeGroup: {
    width: "100%",
    height: "20rem",
    position: "relative",
    margin: "0 auto",
    overflow: "hidden",
    listStyle: "none",
    padding: "0",
    zIndex: "1",
  },
  receipe: {
    width: "100%",
    height: "30rem",
    justifyContent: "center",
    alignItems: "center",
    objectFit: "contain",
  },
});

class FavoriteSection extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_FAVORITE_RECIPE",
    });
  }

  render() {
    const { classes, reduxState } = this.props;
    const params = {
      direction: "vertical",
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      //slidesPerView: "3",
      //spaceBetween: "10",
      lazy: {
        loadPrevNext: true,
      },
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    };
    return (
      // <Grid item xs={3} className= {classes.root}>
      <Paper className={classes.paper}>
        <h5>Favorite Receipes</h5>
        <div className = {classes.swipeGroup}>
          <Swiper {...params}>
            {reduxState.getFavoriteRecipe.map((item) => (
              <SwiperSlide>
                <div>
                  <RecipeSummary
                    key={item.id}
                    item={item}
                    className={classes.receipe}
                  />
                  {/* <div class="swiper-lazy-preloader"></div> */}
                </div>

                {/* <Fade in={true}>
                <CircularProgress />
              </Fade> */}
              </SwiperSlide>
            ))}

            {reduxState.getFavoriteRecipe.length > 1 ? (
              <div class="swiper-pagination"></div>
            ) : (
              ""
            )}
          </Swiper>
        </div>
      </Paper>
      //</Grid>
    );
  }
}

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(
  withStyles(useStyles)(FavoriteSection)
);
