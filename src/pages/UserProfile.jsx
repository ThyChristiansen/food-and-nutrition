import {
  Avatar,
  CardActionArea,
  Container,
  Grid,
  Paper,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
// import LogOutButton from '../LogOut/LogOut';
import EventNoteIcon from "@material-ui/icons/EventNote";
import LocalDiningIcon from "@material-ui/icons/LocalDining";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import Calendar from "../components/Calendar/CalendarPage";
import PaymentTracker from "../components/PaymentTracker";
import FavotireList from "../components/Recipes";

const useStyles = (theme) => ({
  root: {
    backgroundColor: "#e4e0dd1e",
    borderRadius: "10px",
    padding: theme.spacing(3),
    border: "1px solid lightgray",
  },
  avatarSize: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: "0px auto",
  },
  userName: {
    textAlign: "center",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
  },
});

const UserProfile = (props) => {
  const { classes } = props;

  const [componentToShow, setComponentToShow] = useState(<Calendar />);

  const handleChangeComponent = (value) => {
    console.log(value);
    if (value === "Calendar") {
      setComponentToShow(<Calendar />);
    } else if (value === "FavotireList") {
      setComponentToShow(<FavotireList />);
    } else if (value === "PaymentTracker") {
      setComponentToShow(<PaymentTracker />);
    }
  };

  const cardsMenu = (title, componentTarget, icon) => (
    <>
      <Grid item xs>
        <CardActionArea>
          <Paper
            className={classes.paper}
            onClick={() => handleChangeComponent(componentTarget)}
          >
            {icon}
            <Typography>{title}</Typography>
          </Paper>
        </CardActionArea>
      </Grid>
    </>
  );

  return (
    <Container maxWidth="md" className={classes.root}>
      <Avatar
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
        className={classes.avatarSize}
      />
      <h2 className={classes.userName}>{props.user.name}</h2>

      <br />
      <Grid container spacing={5}>
        {cardsMenu("Meal Planning", "Calendar", <EventNoteIcon />)}
        {cardsMenu("Favorite Recipe", "FavotireList", <LocalDiningIcon />)}
        {cardsMenu("Payment Tracker", "PaymentTracker", <MonetizationOnIcon />)}
      </Grid>
      <br />
      <br />
      {componentToShow}
    </Container>
  );
};
{
  /* <LogOutButton className="log-in" /> */
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(useStyles)(UserProfile));
