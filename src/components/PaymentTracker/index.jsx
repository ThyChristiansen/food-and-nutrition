import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import { Button, Container, Grid } from "@material-ui/core";
import * as dateFns from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import PaymentKeepTrackTable from "./PaymentTrackerTable";
import Calculator from "../Calculator/index";

import Chart from "./Chart";

import PaymentTrackerDialog from "./PaymentTrackerDialog";

const moment = require("moment");

const useStyles = (theme) => ({
  root: {
    display: "flex",
    textAlign: "center",
  },
  margin: {
    marginRight: "10px",
  },
  header: {
    paddingTop: "20px",
    background: "#a9a9a958",
  },
  totalRow: {
    fontWeight: "bold",
  },
});

class PaymentKeepTrack extends Component {
  state = {
    currentMonth: new Date(),
    open: false,
    amount: "",
    selectedDate: new Date(),
    note: "",
    editPayment: false,
  };

  componentDidMount() {
    this.fetchPaymentByMonth();
  }

  fetchPaymentByMonth = () => {
    setTimeout(() => {
      this.props.dispatch({
        type: "FETCH_PAYMENT",
        payload: {
          date: this.state.currentMonth,
        },
      });
    }, 100);
  };

  nextMonth = () => {
    this.fetchPaymentByMonth();
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1),
      //change the date in datepicker to next month everytime the user click on next month
      selectedDate: dateFns.addMonths(this.state.currentMonth, 1),
    });
  };

  prevMonth = () => {
    this.fetchPaymentByMonth();
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1),
      //change the date in datepicker to next month everytime the user click on prev month
      selectedDate: dateFns.subMonths(this.state.currentMonth, 1),
    });
  };

  renderHeader() {
    const dateFormat = "MMMM yyyy";
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>

        <div className="col col-center">
          <span>{dateFns.format(this.state.currentMonth, dateFormat)}</span>
        </div>

        {dateFns.format(this.state.currentMonth, dateFormat) ===
        dateFns.format(new Date(), dateFormat) ? (
          <div className="col col-end">
            <Button
              variant="outlined"
              color="primary"
              className={this.props.classes.margin}
              onClick={this.handleClickOpen}
            >
              Add new payment
            </Button>
          </div>
        ) : (
          <div className="col col-end">
            <div className="icon" onClick={this.nextMonth}>
              chevron_right
            </div>
          </div>
        )}
      </div>
    );
  }

  handleClickOpen = () => {
    this.setState({
      open: true,
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleAmountChange = (event) => {
    this.setState({
      amount: event.target.value,
    });
  };
  handleNoteChange = (event) => {
    this.setState({
      note: event.target.value,
    });
  };

  handleDateChange = (event) => {
    this.setState({
      selectedDate: event,
    });
  };

  handleSave = () => {
    this.props.dispatch({
      type: "ADD_PAYMENT",
      payload: {
        amount: this.state.amount,
        note: this.state.note,
        date: this.state.selectedDate,
      },
    });
    this.setState({
      open: false,
      amount: "",
      note: "",
      selectedDate: new Date(),
    });
  };

  render() {
    const { classes, reduxState } = this.props;

    return (
      <div>
        <Container maxWidth="md" className={classes.root}>
          <Grid container>
            <Grid item xs={9}>
              <PaymentKeepTrackTable
                paymentReducer={reduxState.paymentReducer}
                currentMonth={this.state.currentMonth}
                renderHeader={this.renderHeader()}
              />
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Calculator />
          </Grid>
          <PaymentTrackerDialog
            open={this.state.open}
            handleClose={this.handleClose}
            amount={this.state.amount}
            handleAmountChange={this.handleAmountChange}
            note={this.state.note}
            handleNoteChange={this.handleNoteChange}
            selectedDate={this.state.selectedDate}
            handleClose={this.handleClose}
            handleSave={this.handleSave}
            handleDateChange={this.handleDateChange}
          />
        </Container>
        <Chart year={moment(this.state.currentMonth).format("YYYY")} />
      </div>
    );
  }
}

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(
  withStyles(useStyles)(PaymentKeepTrack)
);
