import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";
import ProfileSection from "../components/NewFeed/ProfileSection";
import Posts from "../components/NewFeed/Posts";
import FavoriteSection from "../components/NewFeed/FavoriteSection";

const useStyles = (theme) => ({
  root: {
  },
});

class NewFeed extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Container maxWidth="lg" className={classes.root}>
        <Grid container spacing={1}>
          <ProfileSection />
          <Posts />
          <FavoriteSection />
        </Grid>
      </Container>
    );
  }
}

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(withStyles(useStyles)(NewFeed));
