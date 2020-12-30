import React from "react";
import { connect } from "react-redux";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withStyles,
} from "@material-ui/core";
import CalendarDetail from "../utils/CalendarDetail";

const useStyles = (theme) => ({
    closeButton: {
        position: "absolute",
        top: "0.75em",
        right: "0.75em",
      },
      meals:{
        // display: 'flex',
        // flexDirection: 'column',
        // flexWrap: "wrap",
         flexGrow:1,
         flexShrink:0,
         wordWrap:"break-word",
         flexBasis: 350
        
      }
});

const MealPlanDetailDialog = (props) => {
  const { classes } = props;
  return (
    <Dialog
      fullWidth={true}
      maxWidth="xs"
      open={props.openMealPlanDetail}
      onClose={props.handleDialogMealPlanClose}
      aria-labelledby="max-width-dialog-title"
      TransitionComponent={props.Transition}
    >
      <DialogTitle id="max-width-dialog-title">Detail</DialogTitle>
      <DialogContent>
        <DialogContentText>Let's start planing meals</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props.handleDialogMealPlanClose}
          color="primary"
          className={classes.closeButton}
          size="small"
        >
          Close
        </Button>
        {props.addButtonToggle}
      </DialogActions>

      <div className={classes.meals}>
      {props.getMealPlan.map((meal) => {
        return (
          <div key={meal.id}>
            <CalendarDetail
              openMealPlanDetail={props.openMealPlanDetail}
              meal={meal}
              selectedDate={props.selectedDate}
            />
          </div>
        );
      })}
      </div>
     
    </Dialog>
  );
};

export default connect()(withStyles(useStyles)(MealPlanDetailDialog));
