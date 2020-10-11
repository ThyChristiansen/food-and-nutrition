import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import '../Calendar/Calendar.css'
import { Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, Slide, DialogActions, FormControl, InputLabel, OutlinedInput, InputAdornment, Grid, TextField } from '@material-ui/core';
import * as dateFns from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PaymentKeepTrackDetail from './PaymentKeepTrackDetail';
import Chart from './Chart';

const moment = require("moment");


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = (theme) => ({
  root: {
    marginTop: '30vh',
    display: 'flex',
    textAlign: "center",
  },
  margin: {
    margin: "10px 0"
  },
  headerMargin: {
    marginTop: "20px"

  }

})

class PaymentKeepTrack extends Component {

  state = {
    currentMonth: new Date(),
    open: false,
    amount: "",
    selectedDate: new Date(),
    note: "",
    editPayment: false
  }

  componentDidMount() {
    this.fetchPaymentByMonth();
  }

  fetchPaymentByMonth = () => {
    setTimeout(() => {
      this.props.dispatch({
        type: "FETCH_PAYMENT",
        payload: {
          date: this.state.currentMonth
        }
      })
    }, 100)
  }


  nextMonth = () => {
    this.fetchPaymentByMonth();
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1),
      //change the date in datepicker to next month everytime the user click on next month
      selectedDate: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.fetchPaymentByMonth();
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1),
      //change the date in datepicker to next month everytime the user click on prev month
      selectedDate: dateFns.subMonths(this.state.currentMonth, 1)
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
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  }
  handleClose = () => {
    this.setState({
      open: false
    });
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
  }

  handleDateChange = (event) => {
    this.setState({
      selectedDate: event
    });
  }

  handleSave = () => {
    this.setState({
      open: false,
    });
    this.props.dispatch({
      type: 'ADD_PAYMENT',
      payload: {
        amount: this.state.amount,
        note: this.state.note,
        date: moment(this.state.selectedDate).format("L"),
      }
    });
  }




  render() {
    const { classes, reduxState } = this.props;
    let total = reduxState.paymentReducer.reduce((a, b) => a + (b["amount"] || 0), 0)

    return (
      <div>

        <Container maxWidth="md" className={classes.root}  >
          {/* <Grid container spacing={2}> */}
          {/* <Grid item xs={12}> */}
          <TableContainer component={Paper}>
            <Typography className={classes.headerMargin}>{this.renderHeader()}</Typography>
            <Button variant="contained" color="primary" className={classes.margin}
              onClick={this.handleClickOpen}>Add new payment</Button>
            <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Time</TableCell>
                  <TableCell align="center">Note</TableCell>
                  <TableCell align="center">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reduxState.paymentReducer.map((data) => {
                  return (<PaymentKeepTrackDetail
                    data={data}
                    currentMonth={this.state.currentMonth}

                  />)
                })}

                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align="right">${total}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Dialog
            fullWidth={"sm"}
            maxWidth={"sm"}
            open={this.state.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">{"Add payment"}</DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <FormControl fullWidth className={classes.margin} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-amount"
                      value={this.state.amount}
                      onChange={this.handleAmountChange}
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      size="small"
                      type="number"
                      labelWidth={60}
                    />
                  </FormControl>
                  <TextField
                    id="filled-multiline-static"
                    label="Note"
                    value={this.state.note}
                    onChange={this.handleNoteChange}
                    type="number"
                    multiline
                    rows={3}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <DatePicker selected={this.state.selectedDate} onChange={(event) => this.handleDateChange(event)} />
                </Grid>
              </Grid>

            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
          </Button>
              <Button onClick={this.handleSave} color="primary">
                Save
          </Button>
            </DialogActions>
          </Dialog>

        </Container>
        <Chart
          total={total} 
          yearSelected={moment(this.state.currentMonth).format("YYYY")}
        
          />

      </div>
    )
  }
};


const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(withStyles(useStyles)(PaymentKeepTrack));
