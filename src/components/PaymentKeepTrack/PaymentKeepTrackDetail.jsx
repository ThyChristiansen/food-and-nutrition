import React, { Component } from 'react';

import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { Button, Card, Container, Grid, TableCell, TextField, Typography, TableRow } from '@material-ui/core';
const moment = require("moment");



const useStyles = (theme) => ({
  // root: {
  //   marginTop: '30vh',
  //   display: 'flex',
  //   textAlign: "center",
  // },
})

class PaymentKeepTrackDetail extends Component {
  state = {
    editPayment: false,
    note: this.props.data.note,
    amount: this.props.data.amount,
  }


  handleAmountChange = (event) => {
    this.setState({
      amount: event.target.value
    });
  }
  handleNoteChange = (event) => {
    this.setState({
      note: event.target.value
    });
    console.log(event.target.value)
  }
  handleEditPayment = () => {
    this.setState({
      editPayment: true
    });
  }

  handleSave = () => {
    this.setState({
      editPayment: false
    });
    //have to use this.props.currentMonth so then it will save the change of the month that we are changing on
    this.props.dispatch({
      type: 'EDIT_PAYMENT',
      payload: {
        id: this.props.data.id,
        amount: this.state.amount,
        note: this.state.note,
        date: moment(this.props.currentMonth).format("MM")
      }
    });
  }

  render() {

    const { classes, data } = this.props;
    return (
      <TableRow key={data.id}>
        {this.state.editPayment ? (
          <>
            <TableCell align="center"> {moment(data.date).format("L")}</TableCell>
            {/* use defaultValue to able use data.note instead for this.state.note */}
            <TableCell><TextField id="outlined-basic" variant="outlined" size="small" defaultValue={data.note} onChange={this.handleNoteChange} /></TableCell>
            <TableCell><TextField id="outlined-basic" variant="outlined" size="small" defaultValue={data.amount} onChange={this.handleAmountChange} /></TableCell>
            <TableCell><Button onClick={this.handleSave} color="primary" size="small" variant="outlined" >Save </Button></TableCell>
          </>
        )
          :
          (<>
            <TableCell align="center"> {moment(data.date).format("L")}</TableCell>
            <TableCell align="center">{data.note}</TableCell>
            <TableCell align="center">${data.amount}</TableCell>
            <TableCell align="center">
              <Button size="small" variant="outlined" onClick={this.handleEditPayment}>Edit</Button>
              <Button size="small" variant="outlined" onClick={this.handleDeletePayment}>Delete</Button>
            </TableCell>
          </>
          )

        }
      </TableRow>
    )
  }
};


const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(withStyles(useStyles)(PaymentKeepTrackDetail));
