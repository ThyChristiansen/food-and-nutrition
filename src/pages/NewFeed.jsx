import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@mui/styles";
import { Container, Grid } from "@mui/material";
import ProfileSection from "../components/NewFeed/ProfileSection";
import PostSection from "../components/NewFeed/PostSection";
import FavoriteSection from "../components/NewFeed/FavoriteSection";

const useStyles = (theme) => ({
 
});

class NewFeed extends Component {
  render() {
    return (
      <Container maxWidth="lg" >
        <Grid container spacing={1}>
          <ProfileSection />
          <PostSection />
          {/* <FavoriteSection /> */}
        </Grid>
      </Container>
    );
  }
}

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(withStyles(useStyles)(NewFeed));
