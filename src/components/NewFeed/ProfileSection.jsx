import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import { Button, Grid, Paper} from "@material-ui/core";
import UserAvataAndName from "../UserAvataAndName";

const useStyles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
});

const ProfileSection = (props) => {
  const handleViewProfile = () => {
    console.log("clicked");
    let profilePath;
    /(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/.test(
      props.user.email
    )
      ? (profilePath = props.user.name)
      : (profilePath = props.user.email);
    props.history.push(`/${profilePath}`);
  };
  const { classes } = props;
  return (
    <Grid item xs={3}>
      <Paper className={classes.paper}>
        <UserAvataAndName />
        <Button onClick={handleViewProfile}>View Profile</Button>
      </Paper>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(
  connect(mapStateToProps)(withStyles(useStyles)(ProfileSection))
);
