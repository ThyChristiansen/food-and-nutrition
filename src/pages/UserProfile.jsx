import {
  CardActionArea,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import React, { useState } from "react";
import { connect } from "react-redux";
// import LogOutButton from '../LogOut/LogOut';
import EventNoteIcon from "@mui/icons-material/EventNote";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Calendar from "../components/Calendar/CalendarPage";
import PaymentTracker from "../components/PaymentTracker";
import FavotireList from "../components/FavoriteList/index";
import UserAvataAndName from "../components/utils/UserAvataAndName";

const useStyles = (theme) => ({
  root: {
    backgroundColor: "#e4e0dd1e",
    borderRadius: "10px",
    padding: theme.spacing(3),
    border: "1px solid lightgray",
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
      <UserAvataAndName />

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

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(useStyles)(UserProfile));
