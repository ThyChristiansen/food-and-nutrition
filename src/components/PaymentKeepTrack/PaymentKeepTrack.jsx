import React, { Component } from 'react';

import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import '../Calendar/Calendar.css'
import { Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, Slide, DialogActions, FormControl, InputLabel, OutlinedInput, InputAdornment, Grid, TextField } from '@material-ui/core';
import * as dateFns from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  }

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
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
  handleChange = (event) => {
    this.setState({
      amount: event.target.value
    });
    // console.log(this.state.amount)
  }
  handleDateChange = (event) => {
    this.setState({
      selectedDate: event
    });
  }

  render() {
    const { classes } = this.props;
    return (
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
                <TableCell align="center">Amount</TableCell>
                <TableCell align="center">Buttons</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow >


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
                    onChange={this.handleChange}
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
            <Button onClick={this.handleClose} color="primary">
              Save
          </Button>
          </DialogActions>
        </Dialog>

      </Container>

    )
  }
};


const putReduxStateToProps = (reduxState) => ({ reduxState });
export default connect(putReduxStateToProps)(withStyles(useStyles)(PaymentKeepTrack));
