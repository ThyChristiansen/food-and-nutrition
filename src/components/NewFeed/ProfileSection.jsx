import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@mui/styles";
import { Button, Grid, Paper} from "@mui/material";
import UserAvataAndName from "../utils/UserAvataAndName";
import FavoriteSection from "./FavoriteSection";

const useStyles = (theme) => ({
  root: {
    textAlign: "center",
  },
  paper: {
    padding: theme.spacing(2),
  },
});

const ProfileSection = (props) => {
  const handleViewProfile = () => {
    props.history.push(`/${props.user.name}`);
  };
  const { classes } = props;
  return (
    <Grid item xs={3} className= {classes.root}>
    <Paper className={classes.paper}>
        <UserAvataAndName />
        <Button onClick={handleViewProfile}>View Profile</Button>
      </Paper>
      <FavoriteSection />

    </Grid>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  getFavoriteRecipe: state.getFavoriteRecipe
});

export default withRouter(
  connect(mapStateToProps)(withStyles(useStyles)(ProfileSection))
);

