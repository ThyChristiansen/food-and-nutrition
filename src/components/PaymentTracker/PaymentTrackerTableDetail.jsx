import React, { Component } from "react";

import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import { Button, TableCell, TextField, TableRow } from "@material-ui/core";
import PaymentTrackerDialog from "./PaymentTrackerDialog";
const moment = require("moment");

const useStyles = (theme) => ({
  note: {
    wordWrap: "break-word",
  },
});

class PaymentKeepTrackDetail extends Component {
  state = {
    open: false,
    note: this.props.data.note,
    amount: this.props.data.amount,
  };

  handleInputChangeFor = (property) => (event) => {
    this.setState({
      [property]: event.target.value,
    });
    console.log(property)
  };

  handleEditPayment = () => {
    this.setState({
      open: true,
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleSaveAfterEdit = () => {
    //have to use this.props.currentMonth so then it will save the change of the month that we are changing on
    if (this.state.note.length > 200) {
      alert("Your note too long");
    } else {
      this.setState({
        open: false,
      });
      this.props.dispatch({
        type: "EDIT_PAYMENT",
        payload: {
          id: this.props.data.id,
          amount: this.state.amount,
          note: this.state.note,
          date: this.props.currentMonth,
        },
      });
    }
  };

  handleDeletePayment = () => {
    this.props.dispatch({
      type: "DELETE_PAYMENT",
      payload: {
        id: this.props.data.id,
        date: this.props.currentMonth,
      },
    });
  };

  render() {
    const { classes, data } = this.props;
    return (
      <TableRow key={data.id} className={classes.note}>
        {this.state.open ? (
          <PaymentTrackerDialog
            amount={this.state.amount}
            note={this.state.note}
            date={moment(data.date).format("L")}
            handleSave={this.handleSaveAfterEdit}
            handleClose={this.handleClose}
            handleAmountChange={this.handleInputChangeFor("amount")}
            handleNoteChange={this.handleInputChangeFor("note")}
            open={this.state.open}
            
            isEditPayment={true}
          />
        ) : (
          <>
            <TableCell align="center">
              {" "}
              {moment(data.date).format("L")}
            </TableCell>
            <TableCell align="center">{data.note}</TableCell>
            <TableCell align="center">${data.amount}</TableCell>
            <TableCell align="center">
              <Button
                size="small"
                variant="outlined"
                onClick={this.handleEditPayment}
              >
                Edit
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={this.handleDeletePayment}
              >
                Delete
              </Button>
            </TableCell>
          </>
        )}
      </TableRow>
    );
  }
}

const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(
  withStyles(useStyles)(PaymentKeepTrackDetail)
);
