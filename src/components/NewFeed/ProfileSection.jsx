import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import { withStyles } from "@material-ui/core/styles";
import { Button, Grid, Paper} from "@material-ui/core";
import UserAvataAndName from "../UserAvataAndName";

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
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(
  connect(mapStateToProps)(withStyles(useStyles)(ProfileSection))
);
