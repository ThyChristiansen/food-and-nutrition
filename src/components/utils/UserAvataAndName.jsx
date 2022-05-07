import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@mui/styles";
import { Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const useStyles = (theme) => ({
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: "0px auto",
  },
  userName: {
    textAlign: "center",
  },
});

class UserAvataAndName extends Component {
  render() {
    const { classes, user } = this.props;
    return (
      <>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>

        {user.name ? (
          <h2 className={classes.userName}>{user.name}</h2>
        ) : (
          <h2 className={classes.userName}>{user.email}</h2>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps)(
  withStyles(useStyles)(UserAvataAndName)
);
