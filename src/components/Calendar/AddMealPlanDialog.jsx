import React from "react";
import { connect } from "react-redux";

import {
    Button,
   
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
  
    RadioGroup,
    
    withStyles,
  } from "@material-ui/core";

const useStyles = (theme) => ({
  root: {
    textAlign: "center",
  },
});

const AddMealPlanDialog = (props) => {
  const { classes } = props;
  return (
    <Dialog
            fullWidth={true}
            maxWidth="xs"
            open={props.openAddMealPlan}
            onClose={props.handleClose}
            aria-labelledby="max-width-dialog-title"
          >
            <DialogTitle id="max-width-dialog-title">
              Adding meals here
            </DialogTitle>
            <DialogContent>
              <Button
                color="primary"
                variant="outlined"
                fullwidth
                onClick={props.searchingMeal}
              >
                Searching meal
              </Button>
              <DialogContentText>
                You can search more idea about meals and recipes by click on
                button above.
              </DialogContentText>

              {props.inputFieldTitle}

              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={props.mealType}
                  onChange={props.handleMealTypeChange}
                >
                  {props.showOptionBreakfast}
                  {props.showOptionLunch}
                  {props.showOptionDinner}
                </RadioGroup>
              </FormControl>

              {props.inputFieldDescription}
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={props.addMeal}
              >
                Add
              </Button>
              <Button onClick={props.handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
  );
};


export default connect()(
  withStyles(useStyles)(AddMealPlanDialog)
);
