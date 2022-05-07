import React from "react";
import { withStyles } from "@mui/styles";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Grid,
  TextField,
  Slide,
} from "@mui/material";

import DateFnsUtils from "@date-io/date-fns";
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker,
// } from "@mui/lab/DatePicker";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PaymentTrackerDialog = (props) => {
  const { classes } = props;
  return (
    <Dialog
      fullwidth="true"
      maxWidth="sm"
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{"Add payment"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormControl
              fullwidth="true"
              className={classes.margin}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-amount">
                Amount
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                value={props.amount}
                onChange={props.handleAmountChange}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                size="small"
                type="number"
                labelWidth={60}
              />
            </FormControl>
            <TextField
              id="filled-multiline-static"
              label="Note"
              value={props.note}
              onChange={props.handleNoteChange}
              type="number"
              multiline
              rows={3}
              fullwidth="true"
            />
          </Grid>
          <Grid item xs={6}>
            {props.isEditPayment ? (
              <p>{props.date}</p>
            ) : (
              <>
                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="space-around">
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      // label="Date"
                      value={props.selectedDate}
                      onChange={(event) => props.handleDateChange(event)}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider> */}
              </>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={props.handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles()(PaymentTrackerDialog);
